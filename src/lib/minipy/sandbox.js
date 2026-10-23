// minipy — running a program's own functions from evalExpression / reduceExpression without touching the program.
//
// A function View given to evalExpression is the program's live function object. Calling it as it is would run the
// student's code against the program's real globals, closures and random state (`log.append(x)` inside it would
// change what the program prints later). Instead, the first time the expression calls a function of another run,
// the part of that run the function can reach is copied: its globals, the frames it closes over, default values,
// containers (aliasing kept), the random module's generator state; the standard modules it uses are this
// interpreter's own instances and the builtins (print...) are this interpreter's, so its output goes to the
// expression's output. Shared, not copied: host objects and functions (JS state), iterators and generators, and
// objects of library classes (random.Random(...) instances, exceptions).
import {
  PyList, PyTuple, PyDict, PyNsDict, PySet, PyDeque, PyFunction, PyBuiltin, PyModule, PyBoundMethod, PyDictView, PyCell,
} from './values.js';
import { importModule } from './modules.js';

/** copies of the parts of other runs that interpreter I needs (one copy per object) */
export function makeSandbox(I, FrameClass) {
  const memo = new Map();
  const lazy = new Map();   // foreign module attribute / builtin → () => the matching object of I
  const prepared = new Set();
  function prepare(src) {
    if (prepared.has(src)) return;
    prepared.add(src);
    // the random module of the copy continues from the program's generator state
    if (src.rng && I.rng && !I.modules.has('random')) {
      const r = I.rng;
      r.mt = Uint32Array.from(src.rng.mt);
      r.mti = src.rng.mti;
      r.gaussNext = src.rng.gaussNext;
    }
    if (src.builtins) for (const [k, v] of src.builtins) if (I.builtins.has(k)) memo.set(v, I.builtins.get(k));
    if (src.builtinsModule && I.builtinsModule) memo.set(src.builtinsModule, I.builtinsModule);
    for (const [name, mod] of src.modules || []) {
      if (!(mod instanceof PyModule) || mod.host) continue;
      lazy.set(mod, () => importModule(I, name));
      for (const [k, v] of mod.dict) {
        if (v !== null && typeof v === 'object' && !lazy.has(v) && !(v instanceof PyModule)) {
          lazy.set(v, () => { const m = importModule(I, name); const w = m.dict.get(k); return w === undefined ? v : w; });
        }
      }
    }
  }
  const cloneMap = (m) => {
    if (memo.has(m)) return memo.get(m);
    const out = new Map();
    memo.set(m, out);
    for (const [k, v] of m) out.set(k, clone(v));
    return out;
  };
  function cloneObj(v) {
    const o = Object.create(Object.getPrototypeOf(v));
    memo.set(v, o);
    Object.assign(o, v);
    return o;
  }
  function clone(v) {
    if (v === null || typeof v !== 'object') return v;
    if (memo.has(v)) return memo.get(v);
    if (v instanceof Map) return cloneMap(v);
    const lz = lazy.get(v);
    if (lz) { const w = lz(); memo.set(v, w); return w; }
    let r;
    if (v instanceof PyList) { r = new PyList([]); memo.set(v, r); for (const x of v.items) r.items.push(clone(x)); return r; }
    if (v instanceof PyTuple) {
      r = cloneObj(v);
      r.items = v.items.map(clone);
      return r;
    }
    if (v instanceof PyDeque) { r = new PyDeque([], v.maxlen); memo.set(v, r); for (const x of v.items) r.items.push(clone(x)); return r; }
    if (v instanceof PyNsDict) {
      r = new PyNsDict(cloneMap(v.ns)); memo.set(v, r);
      for (const [k, x] of v.other.entries()) r.other.set(clone(k), clone(x));
      return r;
    }
    if (v instanceof PyDict) {
      r = new PyDict(v.ctype); memo.set(v, r);
      r.factory = clone(v.factory);
      for (const [k, x] of v.entries()) r.set(clone(k), clone(x));
      return r;
    }
    if (v instanceof PySet) { r = new PySet(v.frozen); memo.set(v, r); for (const k of v.keys()) r.add(clone(k)); return r; }
    if (v instanceof PyCell) { r = new PyCell(undefined); memo.set(v, r); r.v = clone(v.v); return r; }
    if (v instanceof PyDictView) { r = new PyDictView(null, v.kind); memo.set(v, r); r.dict = clone(v.dict); return r; }
    if (v instanceof PyBoundMethod) { r = new PyBoundMethod(null, null); memo.set(v, r); r.self = clone(v.self); r.fn = clone(v.fn); return r; }
    if (v instanceof PyFunction) return cloneFunction(v);
    if (v instanceof PyBuiltin) {
      // a method bound to one of the program's objects (lst.append): bound to the copy of that object
      if (v.hostFn || v.self === undefined || v.self === null || typeof v.self !== 'object' || v.self instanceof PyModule) return v;
      r = cloneObj(v);
      r.self = clone(v.self);
      return r;
    }
    if (FrameClass && v instanceof FrameClass) return cloneFrame(v);
    return v;   // immutable values, types, modules of the host, iterators, host objects, library objects: shared
  }
  function cloneFrame(f) {
    const r = cloneObj(f);
    r.globals = cloneMap(f.globals);
    r.locals = f.locals === f.globals ? r.globals : cloneMap(f.locals);
    r.func = clone(f.func);
    r.cv = (f.cv || []).map((m) => cloneMap(m));
    r.ret = null;
    return r;
  }
  function cloneFunction(fn) {
    if (fn.interp && fn.interp !== I) prepare(fn.interp);
    const r = cloneObj(fn);
    r.interp = I;
    r.globals = fn.globals ? cloneMap(fn.globals) : fn.globals;
    r.closure = clone(fn.closure);
    r.defaults = (fn.defaults || []).map(clone);
    if (Array.isArray(fn.kwdefaults)) r.kwdefaults = fn.kwdefaults.map(clone);
    else if (fn.kwdefaults instanceof Map) r.kwdefaults = cloneMap(fn.kwdefaults);
    if (fn.cv) r.cv = fn.cv.map((m) => cloneMap(m));
    if (fn.dict) r.dict = clone(fn.dict);
    return r;
  }
  return {
    /** the copy of a function of another run, to call instead of it */
    adopt(fn) { if (fn.interp) prepare(fn.interp); return clone(fn); },
    /** a standard module of another run → this interpreter's instance (random continues from the run's state) */
    mapModule(m) {
      if (!(m instanceof PyModule) || m.host || !m.ownerInterp || m.ownerInterp === I) return m;
      prepare(m.ownerInterp);
      return clone(m);
    },
  };
}
