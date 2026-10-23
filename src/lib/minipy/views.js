// minipy — plain, serialisable "views" of Python values for snapshots and events.
import {
  typeOf, repr, reprCapped, PyList, PyTuple, PyDict, PySet, PyDeque, PyRange, PyFunction, PyBuiltin, PyModule, PyType, setReprHook, defaultObjRepr, PyHost,
  PyIter, PyBoundMethod, orderedLocals, currentIdSpaces, currentViewIdSpace, isReprContainer, reprFrame, getIntMaxStrDigits, PyNsDict,
  PyDate, PyTime, PyTimedelta, PySlice, PyGenericAlias, PyUnionType, ELLIPSIS, NOT_IMPLEMENTED, T,
} from './values.js';
import { objId, viewId } from './builtins.js';

const CATEGORY = {
  int: 'int', bool: 'bool', float: 'float', str: 'str', NoneType: 'NoneType', list: 'list', tuple: 'tuple', dict: 'dict', Counter: 'dict',
  defaultdict: 'dict', OrderedDict: 'dict', deque: 'deque', set: 'set', frozenset: 'set', range: 'range', function: 'function',
  builtin_function_or_method: 'function', module: 'module',
};
export const MAX_ITEMS = 200;

// stable addresses in reprs such as <function luas at 0x7f3a5c0000c0>
setReprHook((v, isStr) => {
  // a builtin method shows the address of its object (id(obj)), like CPython
  if (v instanceof PyBuiltin && v.self !== null && typeof v.self === 'object' && !(v.self instanceof PyModule)) return defaultObjRepr(v, objId(v), objId(v.self));
  if (v instanceof PyFunction || v instanceof PyBuiltin || v instanceof PyModule || v instanceof PyIter || v instanceof PyBoundMethod) return defaultObjRepr(v, objId(v));
  if (v instanceof PyHost) {
    // str() / print / f-strings use the host's __str__ when it has one (like CPython), repr() its __repr__
    if (isStr && typeof v.obj.__str__ === 'function') return String(v.obj.__str__());
    if (typeof v.obj.__repr__ === 'function') return String(v.obj.__repr__());
    return defaultObjRepr(v, objId(v));
  }
  if (v && typeof v === 'object' && v.pytype) return `<${v.pytype.qualName} object at 0x${(0x7f3a5c000000 + objId(v) * 48).toString(16)}>`;
  return undefined;
});

/** repr for a View: containers are cut after REPR_MAX characters (then '...' and reprTruncated: true) */
export const REPR_MAX = 5000;
function safeRepr(v, trace) {
  try { return reprCapped(v, REPR_MAX, trace); } catch (e) {
    if (trace) trace.failed = true;
    if (typeof v === 'bigint') return [`<int with ${v.toString().length} digits>`, false];
    return ['<?>', false];
  }
}

// hidden (non-enumerable, not serialised) links from a View to the live object, so evalExpression() can use a View
// of a function, module, type, defaultdict factory... made in this session
export const LIVE = Symbol('minipy.live'), FACTORY = Symbol('minipy.factory'), IDS = Symbol('minipy.ids');

const isContainer = (v) => v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque || v instanceof PySet || v instanceof PyDict;

// ------------------------------------------------------------------ View cache
// A container's View is kept (CACHE: container → entry) and given again by the next snapshot when nothing it shows
// has changed, so stepping a program that holds a long list does not rebuild a 5000-character repr on every step.
// An entry records what the View was built from: for every container the repr walk entered, the kids it showed
// (and their number when the walk wrote the closing bracket), plus the first MAX_ITEMS kids behind `items` /
// `entries`. It is valid while those kids are the same values / objects (Object.is) and every container among the
// items still has the same View. Objects whose repr can change without a Python-visible mutation of a container
// (host objects, dict views, exceptions...) make a View uncacheable. Appending to a list or deque extends its
// cached View instead of rebuilding it, and a list whose repr is already cut only needs its new length.
const CACHE = new WeakMap();
const validating = new Set();
let cacheOn = true;
/** tests: switch the View cache off (every snapshot builds its Views from scratch) or on again */
export function setViewCache(on) { cacheOn = !!on; }
let cyclicMade = 0;   // counts Views marked cyclic (such Views depend on where they were reached: not cached)

/** a non-container value whose repr cannot change while it is the same object */
function stableLeaf(x) {
  if (x === null || typeof x !== 'object') return true;
  if (x instanceof PyFunction || x instanceof PyModule || x instanceof PyType || x instanceof PyRange || x instanceof PyIter) return true;
  if (x instanceof PyBuiltin) return x.pyKind !== 'method';
  return x instanceof PyDate || x instanceof PyTime || x instanceof PyTimedelta || x instanceof PySlice
    || x instanceof PyGenericAlias || x instanceof PyUnionType || x === ELLIPSIS || x === NOT_IMPLEMENTED;
}
/** the kids of a container in the order the View's items / entries list them (dicts flattened: k0, v0, k1, ...) */
function itemKidsOf(v, max = Infinity) {
  if (v instanceof PyDict) {
    const r = [];
    for (const e of v.map.values()) { if (r.length >= max) break; r.push(e[0], e[1]); }
    return r;
  }
  if (v instanceof PySet) return v.keys();
  return v.items;
}
/** at least the first n kids in repr order (all of them for a set or Counter), and how many there are */
function reprKids(o, n) {
  if (o instanceof PyList || o instanceof PyTuple || o instanceof PyDeque) return [o.items, o.items.length];
  if (o instanceof PyDict && o.ctype !== T.Counter) return [itemKidsOf(o, n), 2 * o.size];
  const k = reprFrame(o).kids;
  return [k, k.length];
}
const kidCount = (v) => (v instanceof PyDict ? v.size : v instanceof PySet ? v.used : v.items.length);
const currentViewSpace = currentViewIdSpace;

function depValid(d) {
  const o = d.o;
  const [kids, len] = reprKids(o, d.n);
  if (d.done ? len !== d.klen : len < d.n) return false;
  const snap = d.kids;
  for (let i = 0; i < d.n; i++) if (!Object.is(kids[i], snap[i])) return false;
  if (o instanceof PyDict && o.factory !== d.factory) return false;
  return true;
}
/** the View a container kid has in this snapshot (from `shown` or a still-valid cache entry), or null */
function kidView(x, shown) {
  if (shown.has(x)) return shown.get(x);
  return cachedView(x, shown);
}
/**
 * a container kid the parent's repr walk showed in full, so the parent's checked deps cover all of it: its View
 * from the parent is still right. Registers it (and the containers among its items) in `shown`; false if one of
 * them already has another View in this snapshot.
 */
function adoptNested(x, view, shown) {
  if (shown.has(x)) return shown.get(x) === view;
  shown.set(x, view);
  if (view.cyclic) return false;
  const kv = view.entries ? view.entries.flat() : view.items;
  if (!kv) return true;
  const ik = itemKidsOf(x, kv.length);
  for (let i = 0; i < kv.length; i++) {
    const y = ik[i];
    if (y !== null && typeof y === 'object' && isContainer(y) && !adoptNested(y, kv[i], shown)) return false;
  }
  return true;
}
/** a still-valid cached View of container v (registered in `shown`), or null */
function cachedView(v, shown) {
  const e = cacheOn ? CACHE.get(v) : undefined;
  if (!e || e.vs !== currentViewSpace() || e.digits !== getIntMaxStrDigits() || validating.has(v)) return null;
  validating.add(v);
  try {
    const deps = e.deps;
    for (let i = 1; i < deps.length; i++) if (!depValid(deps[i])) return null;
    const root = deps[0];
    const L = kidCount(v);
    // the part of the repr that was shown is unchanged
    const rk = v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque ? v.items : null;
    if (v instanceof PyDict && v.factory !== root.factory) return null;
    const per = v instanceof PyDict ? 2 : 1;
    const [kids, klen] = reprKids(v, Math.max(root.n, MAX_ITEMS * 2));
    if (klen < root.n) return null;
    for (let i = 0; i < root.n; i++) if (!Object.is(kids[i], root.kids[i])) return null;
    const grown = root.done && klen !== root.klen;
    const extendable = (rk && !(v instanceof PyTuple)) || (v instanceof PyDict && v.ctype !== T.Counter);
    if (grown && !(extendable && klen > root.klen)) return null;
    // the items / entries behind the View (a Counter's repr is in count order, its entries in insertion order)
    const ik = rk || (v instanceof PyDict && v.ctype === T.Counter ? itemKidsOf(v, MAX_ITEMS * 2) : v instanceof PyDict ? kids : v.keys());
    const nOld = e.itemKids.length, nNow = Math.min(MAX_ITEMS * per, v instanceof PyDict ? 2 * v.size : ik.length);
    for (let i = 0; i < nOld && i < nNow; i++) if (!Object.is(ik[i], e.itemKids[i])) return null;
    const view = e.view;
    const kv = view.entries ? view.entries.flat() : view.items;
    const full = e.full || (e.full = new Set(deps.filter((d) => d.done).map((d) => d.o)));
    for (let i = 0; i < nOld && i < nNow; i++) {
      const x = ik[i];
      if (x === null || typeof x !== 'object' || !isContainer(x)) continue;
      if (full.has(x) && !shown.has(x)) { if (!adoptNested(x, kv[i], shown)) return null; continue; }
      if (kidView(x, shown) !== kv[i]) return null;
    }
    if (!grown && L === e.L) { shown.set(v, view); return view; }
    if (!grown) {
      // the repr was already cut: only the length (and nothing among the items) changed
      if (root.done || nNow !== nOld) return null;
      const nv = copyView(view, { truncated: L > MAX_ITEMS ? L : undefined });
      e.view = nv; e.L = L;
      shown.set(v, nv);
      return nv;
    }
    return extendView(v, e, shown);
  } finally { validating.delete(v); }
}
/** a changed copy of a container View, with its keys in makeView's order (so JSON stays the same) */
function copyView(view, ch) {
  const g = (k) => (k in ch ? ch[k] : view[k]);
  const nv = { type: view.type, typeName: view.typeName, repr: g('repr'), id: view.id };
  if (g('reprTruncated')) nv.reprTruncated = true;
  if (view[FACTORY] !== undefined) Object.defineProperty(nv, FACTORY, { value: view[FACTORY] });
  if (view.entries) nv.entries = g('entries'); else nv.items = g('items');
  const tr = g('truncated');
  if (tr !== undefined) nv.truncated = tr;
  if (view.maxlen !== undefined) nv.maxlen = view.maxlen;
  return nv;
}
/**
 * a list / deque / dict (not a Counter) that only grew at its end (append, extend, +=, a new key) since its View was
 * made: extend that View instead of building it again
 */
function extendView(v, e, shown) {
  e.full = null;
  const root = e.deps[0];
  const isDict = v instanceof PyDict;
  const fr = reprFrame(v);
  const kids = isDict ? fr.kids : v.items;   // (fr for the open / close / separators)
  const from = root.klen, K = kids.length;
  for (let i = from; i < K; i++) { const x = kids[i]; if (x !== null && typeof x === 'object' && !isReprContainer(x) && !stableLeaf(x)) return null; }
  const view = e.view;
  let text = view.repr.slice(0, view.repr.length - fr.close.length);
  if (isDict && from === 0) text = fr.open;   // {} / defaultdict(..., {}) : the empty form has no separate close
  let cut = false;
  const newDeps = [];
  for (let i = from; i < K; i++) {
    const x = kids[i];
    let r;
    text += fr.sep(i);
    if (text.length > REPR_MAX) { cut = true; break; }
    if (isReprContainer(x)) {
      // a new container item: its repr walk (cut where the whole repr would be cut) and the containers it entered
      const tr = { deps: [], cyclic: false };
      let c;
      try { [r, c] = reprCapped(x, REPR_MAX - text.length, tr); } catch (err) { return null; }
      if (tr.cyclic || tr.deps.some((d) => d.o === v)) return null;   // it contains the list itself: build again
      if (!convertDeps(tr.deps, newDeps)) return null;
      text += r;
      if (c) { cut = true; break; }
    } else {
      try { r = repr(x); } catch (err) { return null; }
      text += r;
    }
    if (text.length > REPR_MAX) { cut = true; break; }
  }
  for (const d of newDeps) e.deps.push(d);
  const ch = {};
  if (cut) { ch.repr = text.slice(0, REPR_MAX) + '...'; ch.reprTruncated = true; root.done = false; root.n = K; root.kids = kids.slice(0, K); }
  else {
    ch.repr = text + fr.close; root.n = K; root.klen = K;
    for (let i = from; i < K; i++) root.kids.push(kids[i]);
  }
  const per = isDict ? 2 : 1;
  const L = kidCount(v);
  if (e.itemKids.length < MAX_ITEMS * per) {
    if (isDict) {
      ch.entries = view.entries.slice();
      for (let i = e.itemKids.length; i < K && i < MAX_ITEMS * 2; i += 2) {
        ch.entries.push([makeView(kids[i], null, shown), makeView(kids[i + 1], null, shown)]);
        e.itemKids.push(kids[i], kids[i + 1]);
      }
    } else {
      ch.items = view.items.slice();
      for (let i = e.itemKids.length; i < K && i < MAX_ITEMS; i++) { ch.items.push(makeView(kids[i], null, shown)); e.itemKids.push(kids[i]); }
    }
  }
  ch.truncated = L > MAX_ITEMS ? L : undefined;
  const nv = copyView(view, ch);
  e.view = nv; e.L = L;
  shown.set(v, nv);
  return nv;
}
/** after building container v's View: keep it when everything it shows can be checked cheaply next time */
/** the containers a repr walk entered, as checkable deps (snapshots of the kids shown); null if one cannot be checked */
function convertDeps(traceDeps, deps = []) {
  for (const d of traceDeps) {
    const n = d.n;
    const kids = d.kids.slice(0, n);
    for (let i = 0; i < n; i++) {
      const x = kids[i];
      if (x === null || typeof x !== 'object' || isReprContainer(x) || stableLeaf(x)) continue;
      // an empty set shows as set(): it must stay empty
      if (x instanceof PySet) { deps.push({ o: x, kids: [], n: 0, done: true, klen: 0 }); continue; }
      return null;
    }
    const dep = { o: d.o, kids, n, done: d.done, klen: d.kids.length };
    if (d.o instanceof PyDict) { if (typeof d.o.pyRepr === 'function' || d.o instanceof PyNsDict) return null; dep.factory = d.o.factory; }
    deps.push(dep);
  }
  return deps;
}
function storeEntry(v, view, trace, cyclicBefore) {
  if (trace.cyclic || trace.failed || cyclicMade !== cyclicBefore || v instanceof PyNsDict) { CACHE.delete(v); return; }
  const deps = convertDeps(trace.deps);
  if (!deps || !deps.length || deps[0].o !== v) { CACHE.delete(v); return; }
  const per = v instanceof PyDict ? 2 : 1;
  const itemKids = itemKidsOf(v).slice(0, MAX_ITEMS * per);
  for (const x of itemKids) if (x !== null && typeof x === 'object' && !isContainer(x) && !stableLeaf(x)) { CACHE.delete(v); return; }
  CACHE.set(v, { view, vs: currentViewSpace(), digits: getIntMaxStrDigits(), deps, itemKids, L: kidCount(v) });
}

/**
 * View of a Python value: { type, typeName, repr, id, items?, entries?, truncated?, cyclic?, reprTruncated? }.
 * `shown` (one per snapshot, or per top-level View) holds the Views of the containers described so far: a container
 * that appears again (an alias, a shared sub-list, the same list in many frames) gets the same View object, so a
 * snapshot costs time and memory in proportion to the distinct objects shown. A container that has not changed
 * since an earlier snapshot gets that snapshot's View object again (see CACHE above).
 */
export function makeView(v, seen, shown) {
  const t = typeOf(v);
  const tn = t.name;
  const type = CATEGORY[tn] || 'object';
  const isObj = v !== null && typeof v === 'object';
  if (!shown) shown = new Map();
  if (isObj && shown.has(v) && !(seen && seen.has(v))) return shown.get(v);
  const cont = isObj && isContainer(v);
  if (cont && !(seen && seen.has(v))) { const hit = cachedView(v, shown); if (hit) return hit; }
  const trace = cont ? { deps: [], cyclic: false } : null;
  const cyclicBefore = cyclicMade;
  const [r, cut] = safeRepr(v, trace);
  const view = { type, typeName: tn, repr: cut ? r + '...' : r, id: isObj ? viewId(v) : 0 };
  if (cut) view.reprTruncated = true;
  if (!isObj) return view;
  if (!cont) {
    Object.defineProperty(view, LIVE, { value: v });
    Object.defineProperty(view, IDS, { value: currentIdSpaces() });   // the run's object numbers (evalExpression)
  }
  if (v instanceof PyDict && v.factory !== undefined && v.factory !== null) Object.defineProperty(view, FACTORY, { value: v.factory });
  if (cont) {
    if (!seen) seen = new Set();
    if (seen.has(v)) { view.cyclic = true; cyclicMade++; return view; }
    seen.add(v);
    shown.set(v, view);
    if (v instanceof PyDict) {
      const ents = v.entries();
      view.entries = ents.slice(0, MAX_ITEMS).map(([k, x]) => [makeView(k, seen, shown), makeView(x, seen, shown)]);
      if (ents.length > MAX_ITEMS) view.truncated = ents.length;
    } else {
      const items = v instanceof PySet ? v.keys() : v.items;
      view.items = items.slice(0, MAX_ITEMS).map((x) => makeView(x, seen, shown));
      if (items.length > MAX_ITEMS) view.truncated = items.length;
      if (v instanceof PyDeque && v.maxlen != null) view.maxlen = v.maxlen;
    }
    seen.delete(v);
    storeEntry(v, view, trace, cyclicBefore);
  } else if (v instanceof PyFunction) {
    view.name = v.name;
  } else if (v instanceof PyModule) {
    view.name = v.name;
  } else if (v instanceof PyType) {
    view.name = v.name;
  } else if (v instanceof PyRange) {
    view.start = Number(v.start); view.stop = Number(v.stop); view.step = Number(v.step);
  }
  return view;
}

/**
 * locals of a frame as [{ name, value: View }] (module frame: user globals only; function frames in CPython's order);
 * `shown` is shared by all frames of one snapshot
 */
export function frameLocals(f, isModule, shown) {
  const out = [];
  if (!isModule) { for (const [k, v] of orderedLocals(f)) out.push({ name: k, value: makeView(v, null, shown) }); return out; }
  for (const [k, v] of f.locals) {
    if (k.startsWith('__') && k.endsWith('__')) continue;
    out.push({ name: k, value: makeView(v, null, shown) });
  }
  return out;
}
