// minipy — runtime value model (Python objects as JS values).
//   int → bigint, bool → boolean, float → number, str → string, None → null,
//   everything else → instances of the classes below.
import { floatRepr, formatAddr } from './numfmt.js';
import { uflags, U_PRINTABLE } from './unidata.js';

export const STOP = Symbol('StopIteration');

// ---------------------------------------------------------------- types
export class PyType {
  constructor(name, base, opts = {}) {
    this.name = name;
    this.base = base || null;
    this.module = opts.module || 'builtins';
    this.call = opts.call || null;          // (interp, args, kwargs) => value
    this.methods = opts.methods || Object.create(null);
    this.attrs = opts.attrs || Object.create(null);
    this.isExc = !!opts.isExc;
    this.dirName = opts.dirName || name;    // key into DIRS for suggestions
    this.tpName = opts.tpName || name;      // CPython's tp_name (used in error messages: 'collections.deque')
  }
  get qualName() { return this.module === 'builtins' ? this.name : this.module + '.' + this.name; }
  isSubOf(t) { for (let x = this; x; x = x.base) if (x === t) return true; return false; }
  findMethod(name) { for (let x = this; x; x = x.base) { const m = x.methods[name]; if (m) return m; } return null; }
}

export const T = Object.create(null);
function mk(name, base, opts) { const t = new PyType(name, base, opts); T[name] = t; return t; }
mk('object', null);
mk('type', T.object);
mk('int', T.object);
mk('bool', T.int);
mk('float', T.object);
mk('str', T.object);
mk('list', T.object);
mk('tuple', T.object);
mk('dict', T.object);
mk('set', T.object);
mk('frozenset', T.object);
mk('range', T.object);
mk('NoneType', T.object);
mk('function', T.object);
mk('builtin_function_or_method', T.object);
mk('method_descriptor', T.object);
mk('method', T.object);
mk('module', T.object);
mk('slice', T.object);
mk('ellipsis', T.object);
mk('deque', T.object, { module: 'collections', tpName: 'collections.deque' });
mk('Counter', T.dict, { module: 'collections' });
mk('defaultdict', T.dict, { module: 'collections', tpName: 'collections.defaultdict' });
mk('OrderedDict', T.dict, { module: 'collections', tpName: 'collections.OrderedDict' });
mk('dict_keys', T.object);
mk('dict_values', T.object);
mk('dict_items', T.object);
for (const n of ['list_iterator', 'list_reverseiterator', 'tuple_iterator', 'range_iterator', 'str_ascii_iterator', 'str_iterator',
  'dict_keyiterator', 'dict_valueiterator', 'dict_itemiterator', 'set_iterator', 'enumerate', 'zip', 'map', 'filter', 'reversed',
  'generator', 'collections._deque_iterator', 'callable_iterator', 'itertools.chain', 'dict_reversekeyiterator']) mk(n, T.object);
mk('date', T.object, { module: 'datetime', tpName: 'datetime.date' });
mk('datetime', T.date, { module: 'datetime', tpName: 'datetime.datetime' });
mk('timedelta', T.object, { module: 'datetime', tpName: 'datetime.timedelta' });
mk('time', T.object, { module: 'datetime', tpName: 'datetime.time' });
mk('NotImplementedType', T.object);
mk('TextIOWrapper', T.object, { module: '_io', tpName: '_io.TextIOWrapper' });   // sys.stdin / stdout / stderr
mk('GenericAlias', T.object, { module: 'types', tpName: 'types.GenericAlias' });
mk('UnionType', T.object, { module: 'types', tpName: 'types.UnionType' });

// exception hierarchy
export const EXC = Object.create(null);
function mkExc(name, base, module) { const t = new PyType(name, base, { isExc: true, module, dirName: 'exception' }); EXC[name] = t; return t; }
mkExc('BaseException', T.object);
mkExc('SystemExit', EXC.BaseException);
mkExc('KeyboardInterrupt', EXC.BaseException);
mkExc('GeneratorExit', EXC.BaseException);
mkExc('Exception', EXC.BaseException);
mkExc('ArithmeticError', EXC.Exception);
mkExc('FloatingPointError', EXC.ArithmeticError);
mkExc('OverflowError', EXC.ArithmeticError);
mkExc('ZeroDivisionError', EXC.ArithmeticError);
mkExc('AssertionError', EXC.Exception);
mkExc('AttributeError', EXC.Exception);
mkExc('BufferError', EXC.Exception);
mkExc('EOFError', EXC.Exception);
mkExc('ImportError', EXC.Exception);
mkExc('ModuleNotFoundError', EXC.ImportError);
mkExc('LookupError', EXC.Exception);
mkExc('IndexError', EXC.LookupError);
mkExc('KeyError', EXC.LookupError);
mkExc('MemoryError', EXC.Exception);
mkExc('NameError', EXC.Exception);
mkExc('UnboundLocalError', EXC.NameError);
mkExc('OSError', EXC.Exception);
mkExc('FileNotFoundError', EXC.OSError);
mkExc('RuntimeError', EXC.Exception);
mkExc('NotImplementedError', EXC.RuntimeError);
mkExc('RecursionError', EXC.RuntimeError);
mkExc('StopIteration', EXC.Exception);
mkExc('SyntaxError', EXC.Exception);
mkExc('IndentationError', EXC.SyntaxError);
mkExc('TabError', EXC.IndentationError);
mkExc('SystemError', EXC.Exception);
mkExc('TypeError', EXC.Exception);
mkExc('ValueError', EXC.Exception);
mkExc('UnicodeError', EXC.ValueError);
mkExc('UnicodeEncodeError', EXC.UnicodeError);
mkExc('UnicodeDecodeError', EXC.UnicodeError);
mkExc('Warning', EXC.Exception);
mkExc('UserWarning', EXC.Warning);
mkExc('DeprecationWarning', EXC.Warning);
mkExc('StatisticsError', EXC.ValueError, 'statistics');

// ---------------------------------------------------------------- objects
export class PyList { constructor(items) { this.items = items || []; } }
export class PyTuple { constructor(items) { this.items = items || []; } }
export class PyRange { constructor(start, stop, step) { this.start = start; this.stop = stop; this.step = step; } }
export class PyDeque { constructor(items, maxlen) { this.items = items || []; this.maxlen = maxlen == null ? null : maxlen; this.mut = 0; } }
export class PySlice { constructor(start, stop, step) { this.start = start; this.stop = stop; this.step = step; } }
export class PyModule { constructor(name, dict, opts = {}) { this.name = name; this.dict = dict || new Map(); this.file = opts.file || null; this.dirName = opts.dirName || name; this.host = !!opts.host; } }
export class PyBuiltin {
  // fn(interp, args, kwargs) => value.  self → bound method of a builtin object.
  constructor(name, fn, opts = {}) { this.name = name; this.fn = fn; this.self = opts.self === undefined ? undefined : opts.self; this.gen = !!opts.gen; this.ownerType = opts.ownerType || null; this.module = opts.module || null; }
}
// ---------------------------------------------------------------- object ids
/**
 * Object numbers, assigned on first use (functions, iterators and host objects when they are created, since their
 * reprs show an address). Each run has two spaces: one for id() and the addresses in reprs (<function f at 0x...>),
 * one for the View ids of snapshots and events, so a host taking snapshots does not change what the program
 * prints, and running a program again gives the same numbers.
 */
export class IdSpace {
  constructor() { this.ids = new WeakMap(); this.seq = 0; this.prim = new Map(); }
  get(v) {
    if (v !== null && typeof v === 'object' || typeof v === 'function') {
      let id = this.ids.get(v);
      if (id === undefined) { id = ++this.seq; this.ids.set(v, id); }
      return id;
    }
    return 0;
  }
}
let pySpace = new IdSpace(), viewSpace = new IdSpace();
/** make [pySpace, viewSpace] current; returns the previous pair */
export function useIdSpaces(pair) { const prev = [pySpace, viewSpace]; [pySpace, viewSpace] = pair; return prev; }
export function currentIdSpaces() { return [pySpace, viewSpace]; }
/** the current View id space alone (no allocation; the snapshot View cache checks it) */
export function currentViewIdSpace() { return viewSpace; }
/** id spaces that see the numbers of `pair` but number new objects on their own (evalExpression with Views) */
export function forkIdSpaces(pair) {
  return pair.map((base) => {
    const f = new IdSpace();
    f.seq = base.seq;
    for (const [k, v] of base.prim) f.prim.set(k, v);
    const own = f.get.bind(f);
    f.get = (v) => { if (v !== null && typeof v === 'object' || typeof v === 'function') { const id = base.ids.get(v); if (id !== undefined) return id; } return own(v); };
    return f;
  });
}
export function objId(v) { return pySpace.get(v); }
export function viewId(v) { return viewSpace.get(v); }
/** value returned by id(): object address-like number; equal scalars share an id */
export function pyId(v) {
  if (v !== null && typeof v === 'object') return BigInt(0x7f3a5c000000 + objId(v) * 48);
  const key = typeof v + ':' + String(v);
  let id = pySpace.prim.get(key);
  if (id === undefined) { id = ++pySpace.seq; pySpace.prim.set(key, id); }
  return BigInt(0x7f3a5c000000 + id * 48);
}

/**
 * [name, value] pairs of a frame like CPython's frame.f_locals / locals(): co_varnames order, then cell variables,
 * then the free variables read from enclosing functions (compiler.js localsOrder); other frames: insertion order
 */
export function orderedLocals(f) {
  const def = f.func && f.func.def;
  if (!def || !def.varOrder || f.locals === f.globals) return [...f.locals];
  const out = [], done = new Set();
  for (const k of def.varOrder) { const v = f.locals.get(k); if (v !== undefined) { out.push([k, v]); done.add(k); } }
  for (const [k, v] of f.locals) if (!done.has(k)) { out.push([k, v]); done.add(k); }
  for (const fv of def.freeVarList || []) {
    let fr = f;
    for (let d = 0; d < fv.depth && fr; d++) fr = fr.func ? fr.func.closure : null;
    const v = fr && fr.locals.get(fv.id);
    if (v !== undefined && !done.has(fv.id)) out.push([fv.id, v]);
  }
  return out;
}
export class PyFunction {
  constructor(def, closure, interp) {
    this.def = def;          // FunctionDef / Lambda AST node
    this.name = def.name;
    this.qualname = def.qualname || def.name;
    this.closure = closure;  // defining scope (Scope)
    this.defaults = [];      // values for trailing positional params
    this.kwdefaults = null;  // Map name → value for kw-only params
    this.interp = interp;
    this.dict = null;
    objId(this);
  }
}
export class PyBoundMethod { constructor(self, fn) { this.self = self; this.fn = fn; } }   // user function bound to host obj (rare)
export class PyDictView { constructor(dict, kind) { this.dict = dict; this.kind = kind; } }
export class PyIter {
  // next() → value | STOP
  constructor(type, next, opts) { this.type = type; this.next = next; if (opts) Object.assign(this, opts); objId(this); }
}
export class PyHost { constructor(obj, name) { this.obj = obj; this.name = name || 'object'; objId(this); } }
/**
 * Python protocols of host objects, filled in by minipy/modules.js (which converts values to and from JS):
 * dunder(h, '__len__', args) → Python value, or undefined when the JS object has no such method or it returned
 * undefined (NotImplemented); iter(h) → () => value | STOP, or null when it cannot be iterated.
 * HOST_CLASS_TYPES: JS class → its Python type (a class a host module exposes, e.g. turtle.Turtle).
 */
export const HOST_HOOKS = { dunder: null, iter: null };
export const HOST_CLASS_TYPES = new WeakMap();
export function hostDunder(h, name, args) { return HOST_HOOKS.dunder && h instanceof PyHost ? HOST_HOOKS.dunder(h, name, args || []) : undefined; }
/** a rich comparison / binary operation with a host operand: a.m(b), else b.rm(a); undefined when neither applies */
export function hostBinary(a, b, m, rm) {
  if (a instanceof PyHost) { const r = hostDunder(a, m, [b]); if (r !== undefined && r !== NOT_IMPLEMENTED) return r; }
  if (b instanceof PyHost && rm) { const r = hostDunder(b, rm, [a]); if (r !== undefined && r !== NOT_IMPLEMENTED) return r; }
  return undefined;
}
export class PyCell { constructor(v) { this.v = v; } }
/**
 * thrown (not a Python exception) when evalExpression / reduceExpression run with { calls: false } would call one of
 * the program's own functions or a host function
 */
export class CallRefusedError {
  constructor(name) {
    this.callRefused = true;
    this.name = name;
    this.message = `${name}() was not called: calls: false keeps the program's own functions and host functions from running here`;
  }
}
/** types.GenericAlias: list[int], dict[str, list[int]] (origin: a PyType, args: array) */
export class PyGenericAlias { constructor(origin, args) { this.origin = origin; this.args = args; } }
/** types.UnionType: int | None (args: deduplicated array, None stored as NoneType) */
export class PyUnionType { constructor(args) { this.args = args; } }
/** X | Y for type hints (_Py_union_type_or): undefined when an operand is not unionable */
export function unionOr(a, b) {
  const ok = (x) => x === null || x instanceof PyType || x instanceof PyGenericAlias || x instanceof PyUnionType;
  if (!ok(a) || !ok(b)) return undefined;
  const flat = [];
  for (const x of [a, b]) {
    if (x instanceof PyUnionType) flat.push(...x.args); else flat.push(x === null ? T.NoneType : x);
  }
  const out = [];
  for (const x of flat) {
    if (!out.some((y) => (x instanceof PyGenericAlias && y instanceof PyGenericAlias ? eq(x, y) : x === y))) out.push(x);
  }
  return out.length === 1 ? out[0] : new PyUnionType(out);
}
/** repr of one type-hint item (ga_repr_item / union_repr_item) */
function hintRepr(p, union) {
  if (p === ELLIPSIS) return '...';
  if (union && p === T.NoneType) return 'None';
  if (p instanceof PyGenericAlias || p instanceof PyUnionType) return repr(p);
  if (p instanceof PyType) return p.module === 'builtins' ? p.name : p.module + '.' + p.name;
  if (p instanceof PyFunction) return '__main__.' + p.qualname;
  return repr(p);
}
function genericAliasRepr(g) {
  const items = g.args.map((x) => (x instanceof PyList ? '[' + x.items.map((y) => hintRepr(y, false)).join(', ') + ']' : hintRepr(x, false)));
  return hintRepr(g.origin, false) + '[' + (items.length ? items.join(', ') : '()') + ']';
}
export const ELLIPSIS = { ellipsis: true };
export const NOT_IMPLEMENTED = { notImplemented: true };

// ---------------------------------------------------------------- exceptions
export class PyExc {
  constructor(type, args) {
    this.type = type;
    this.args = args || [];
    this.tb = [];          // [{frame, name, line}] built while unwinding (outermost first)
    this.tbFrame = null;   // frame object of the innermost entry recorded so far
    this.pendLine = null;  // innermost line in the frame currently being unwound
    this.suggestion = null;// text appended to the traceback message (". Did you mean: 'x'?")
    this.context = null;
    this.dict = null;      // extra attributes (e.g. name / obj for suggestions)
  }
}
export function pyErr(typeName, msg) {
  const t = typeof typeName === 'string' ? EXC[typeName] : typeName;
  if (!t) throw new Error('unknown exception type ' + typeName);
  return new PyExc(t, msg === undefined ? [] : [msg]);
}
export function excStr(e) {
  const a = e.args;
  if (e.syntaxInfo && a.length === 1) return `${str(a[0])} (${e.syntaxInfo.filename}, line ${e.syntaxInfo.line})`;
  if (e.type.isSubOf(EXC.KeyError) && a.length === 1) return repr(a[0]);
  if (a.length === 0) return '';
  if (a.length === 1) return str(a[0]);
  return repr(new PyTuple(a));
}
export function excLine(e) {
  const s = excStr(e);
  const name = e.type.qualName;
  return (s === '' ? name : name + ': ' + s) + (e.suggestion || '');
}

// ---------------------------------------------------------------- type helpers
export function typeOf(v) {
  switch (typeof v) {
    case 'bigint': return T.int;
    case 'boolean': return T.bool;
    case 'number': return T.float;
    case 'string': return T.str;
    case 'object':
      if (v === null) return T.NoneType;
      if (v instanceof PyList) return T.list;
      if (v instanceof PyDict) return v.ctype || T.dict;
      if (v instanceof PyTuple) return v.nt || T.tuple;
      if (v instanceof PySet) return v.frozen ? T.frozenset : T.set;
      if (v instanceof PyRange) return T.range;
      if (v instanceof PyFunction) return T.function;
      if (v instanceof PyBuiltin) return v.pyKind ? T[v.pyKind] : v.descr ? T.method_descriptor : T.builtin_function_or_method;
      if (v instanceof PyGenericAlias) return T.GenericAlias;
      if (v instanceof PyUnionType) return T.UnionType;
      if (v instanceof PyType) return T.type;
      if (v instanceof PyExc) return v.type;
      if (v instanceof PyModule) return T.module;
      if (v instanceof PyDeque) return T.deque;
      if (v instanceof PyIter) return v.type;
      if (v instanceof PyDictView) return T['dict_' + v.kind];
      if (v instanceof PySlice) return T.slice;
      if (v instanceof PyBoundMethod) return T.method;
      if (v instanceof PyDateTime) return T.datetime;
      if (v instanceof PyDate) return T.date;
      if (v instanceof PyTimedelta) return T.timedelta;
      if (v instanceof PyTime) return T.time;
      if (v.pytype) return v.pytype;
      if (v === ELLIPSIS) return T.ellipsis;
      if (v === NOT_IMPLEMENTED) return T.NotImplementedType;
      if (v instanceof PyHost) return hostType(v);
      return T.object;
  }
  return T.object;
}
const hostTypes = new Map();
function hostType(h) {
  const proto = h.obj !== null && (typeof h.obj === 'object' || typeof h.obj === 'function') ? Object.getPrototypeOf(h.obj) : null;
  const ct = proto && proto.constructor ? HOST_CLASS_TYPES.get(proto.constructor) : undefined;
  if (ct) return ct;
  let t = hostTypes.get(h.name);
  if (!t) { const parts = h.name.split('.'); t = new PyType(parts.pop(), T.object, { module: parts.join('.') || 'builtins' }); hostTypes.set(h.name, t); }
  return t;
}
/** type name as CPython's error messages print it (tp_name: 'collections.deque', 'datetime.date') */
export function typeName(v) { return typeOf(v).tpName; }
/** the type's __name__ ('deque') */
export function shortTypeName(v) { return typeOf(v).name; }
export const isIntLike = (v) => typeof v === 'bigint' || typeof v === 'boolean';
export const isNumber = (v) => typeof v === 'bigint' || typeof v === 'boolean' || typeof v === 'number';
export const toBig = (v) => typeof v === 'boolean' ? (v ? 1n : 0n) : v;
export function isinstance(v, t) { return typeOf(v).isSubOf(t); }

// ---------------------------------------------------------------- numbers
export function bitLen(n) { if (n < 0n) n = -n; if (n === 0n) return 0; return n.toString(2).length; }
const F64 = new Float64Array(1), U32 = new Uint32Array(F64.buffer);
const LITTLE = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
/** finite x → [m, e] with x = m * 2**e exactly, m an odd bigint (or 0n) */
export function floatToRatio(x) {
  if (x === 0) return [0n, 0];
  F64[0] = x;
  const hi = U32[LITTLE ? 1 : 0], lo = U32[LITTLE ? 0 : 1];
  const sign = hi >>> 31, bexp = (hi >>> 20) & 0x7ff;
  let mant = (BigInt(hi & 0xfffff) << 32n) | BigInt(lo);
  let e;
  if (bexp === 0) e = -1074; else { mant |= 1n << 52n; e = bexp - 1075; }
  while ((mant & 1n) === 0n) { mant >>= 1n; e++; }
  return [sign ? -mant : mant, e];
}
/** correctly rounded n/d (bigints, d != 0) → float (may be ±Infinity on overflow) */
export function ratioToFloat(n, d) {
  if (d < 0n) { n = -n; d = -d; }
  if (n === 0n) return 0;
  const neg = n < 0n; if (neg) n = -n;
  if (n < 9007199254740992n && d < 9007199254740992n) { const r = Number(n) / Number(d); return neg ? -r : r; }
  let e = bitLen(n) - bitLen(d) - 55;
  if (e < -1076) e = -1076;
  let num = n, den = d;
  if (e > 0) den = d << BigInt(e); else if (e < 0) num = n << BigInt(-e);
  let q = num / den;
  const r = num % den;
  let res;
  if (e === -1076 && q < (1n << 55n)) {
    // possibly subnormal: round q to a multiple of 4 (grid 2**-1074), half-even with sticky
    let low = q & 3n; q >>= 2n;
    if (low > 2n || (low === 2n && (r !== 0n || (q & 1n)))) q++;
    else if (low === 2n && r !== 0n) q++;
    res = Number(q) * Math.pow(2, -1074);
  } else {
    if (r !== 0n) q |= 1n;
    res = scale2(Number(q), e);
  }
  return neg ? -res : res;
}
function scale2(x, e) {
  while (e > 1000) { x *= Math.pow(2, 1000); e -= 1000; if (!isFinite(x)) return x; }
  while (e < -1000) { x *= Math.pow(2, -1000); e += 1000; }
  return x * Math.pow(2, e);
}
export const SSIZE_MAX = 9223372036854775807n, SSIZE_MIN = -9223372036854775808n;
/** Argument Clinic's Py_ssize_t converter (center(), pop(), insert(), split(maxsplit)...) */
export function toSsize(v) {
  const n = toBig(v);
  if (n > SSIZE_MAX || n < SSIZE_MIN) throw pyErr('OverflowError', 'Python int too large to convert to C ssize_t');
  return n;
}
/** PyNumber_AsSsize_t(n, exc): subscripts raise IndexError, repeat counts OverflowError */
export function indexSsize(n, exc) {
  if (n > SSIZE_MAX || n < SSIZE_MIN) throw pyErr(exc, "cannot fit 'int' into an index-sized integer");
  return n;
}
export function bigToFloat(i) {
  const f = Number(i);
  if (!isFinite(f)) throw pyErr('OverflowError', 'int too large to convert to float');
  return f;
}
export function toFloat(v) { return typeof v === 'number' ? v : typeof v === 'boolean' ? (v ? 1 : 0) : bigToFloat(v); }
export function floatToBig(f) {
  if (f !== f) throw pyErr('ValueError', 'cannot convert float NaN to integer');
  if (!isFinite(f)) throw pyErr('OverflowError', 'cannot convert float infinity to integer');
  return BigInt(Math.trunc(f));
}
/** compare two real numbers exactly; returns -1/0/1 or NaN when unordered */
export function numCmp(a, b) {
  if (typeof a === 'boolean') a = a ? 1n : 0n;
  if (typeof b === 'boolean') b = b ? 1n : 0n;
  if (typeof a === 'bigint') {
    if (typeof b === 'bigint') return a < b ? -1 : a > b ? 1 : 0;
    const c = cmpFloatInt(b, a); return c !== c ? NaN : -c;
  }
  if (typeof b === 'bigint') return cmpFloatInt(a, b);
  return a < b ? -1 : a > b ? 1 : a === b ? 0 : NaN;
}
function cmpFloatInt(f, i) {
  if (f !== f) return NaN;
  if (f === Infinity) return 1;
  if (f === -Infinity) return -1;
  if (i > -9007199254740992n && i < 9007199254740992n) { const n = Number(i); return f < n ? -1 : f > n ? 1 : 0; }
  const fl = Math.floor(f), bi = BigInt(fl);
  if (bi < i) return -1;
  if (bi > i) return 1;
  return f > fl ? 1 : 0;
}

// ---------------------------------------------------------------- NaN identity
// Floats are JS numbers and have no object identity. Only NaN needs one (nan != nan, yet `x is x`, `x in [x]`,
// {x: 1}[x] and {x, x} work for the same NaN object in CPython). minipy treats every NaN as one and the same object:
// right for one NaN value used in several places (the usual demonstration), wrong only for two separately created
// NaNs (`float('nan') in [float('nan')]` is True here, False in CPython). NaN payloads cannot carry an identity:
// V8 canonicalises them when it stores them in double arrays.
// A NaN that was just created (float('nan'), nan arithmetic) is a new object: inside withFreshNaN() it is identical
// to nothing, so `float('nan') in [x]` is False like in CPython (interp decides from the operand's syntax).
let freshNaN = false;
export function withFreshNaN(fn) { freshNaN = true; try { return fn(); } finally { freshNaN = false; } }
/** the identity test of `is` / containment shortcuts (`x is e or x == e`) */
/** set.__contains__ / remove / discard look a set argument up as a frozenset (set_contains_key's retry) */
export function setKeyArg(x) {
  if (x instanceof PySet && !x.frozen) { const f = new PySet(true); for (const k of x.keys()) f.add(k); return f; }
  return x;
}
/**
 * Lone surrogates. A Python str is a sequence of code points, so chr(0xD83D) + chr(0xDE00) is two characters; in a
 * UTF-16 JS string they would merge into one astral character. minipy therefore keeps a Python surrogate code point
 * U+D800..U+DFFF as the private-use character U+FD800..U+FDFFF (Plane 15) inside strings: chr(), ord(), escapes,
 * repr / ascii, comparisons and output translate between the two.
 */
export const LONE_SURROGATE_BASE = 0xF0000;
export function chrOf(cp) { return String.fromCodePoint(cp >= 0xD800 && cp <= 0xDFFF ? LONE_SURROGATE_BASE + cp : cp); }
/** the Python code point of the first character of ch */
export function ordOf(ch) { const c = ch.codePointAt(0); return c >= 0xFD800 && c <= 0xFDFFF ? c - LONE_SURROGATE_BASE : c; }
const LONE_RE = /\uDBB6[\uDC00-\uDFFF]|\uDBB7[\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/;
/** UnicodeEncodeError of writing text with surrogates to the UTF-8 console (null when it has none) */
export function surrogateWriteError(text) {
  if (!LONE_RE.test(text)) return null;
  const cs = Array.from(text);
  const isSur = (c) => { const o = ordOf(c); return o >= 0xD800 && o <= 0xDFFF; };
  let i = 0;
  while (!isSur(cs[i])) i++;
  let j = i + 1;
  while (j < cs.length && isSur(cs[j])) j++;
  const msg = j - i === 1 ? `'utf-8' codec can't encode character '\\u${ordOf(cs[i]).toString(16)}' in position ${i}: surrogates not allowed`
    : `'utf-8' codec can't encode characters in position ${i}-${j - 1}: surrogates not allowed`;
  return pyErr('UnicodeEncodeError', msg);
}
export function sameObj(a, b) { return a === b || (!freshNaN && typeof a === 'number' && typeof b === 'number' && a !== a && b !== b); }

// ---------------------------------------------------------------- strings (code points)
const SURR = /[\uD800-\uDFFF]/;
export const hasSurrogates = (s) => SURR.test(s);
export function strLen(s) { if (!SURR.test(s)) return s.length; let n = 0; for (const _ of s) n++; return n; }
export function strChars(s) { return SURR.test(s) ? Array.from(s) : null; }

// ---------------------------------------------------------------- dict
/** normalised Map key for a hashable Python value */
export function hashKey(v) {
  switch (typeof v) {
    case 'string': return v.length && v.charCodeAt(0) === 0 ? '\u0000s' + v : v;
    case 'bigint': return (v >= -9007199254740991n && v <= 9007199254740991n) ? Number(v) : v;
    case 'boolean': return v ? 1 : 0;
    case 'number':
      if (v !== v) return freshNaN ? { freshNaN: true } : '\u0000nan';
      if (v === 0) return 0;
      if (Number.isInteger(v)) return Number.isSafeInteger(v) ? v : floatToBig(v);
      return '\u0000f' + v;
    case 'object':
      if (v === null) return null;
      if (v instanceof PyTuple) return '\u0000t(' + v.items.map(tupleKeyPart).join('\u0001') + ')';
      if (v instanceof PySet) {
        if (!v.frozen) throw unhashable(v);
        return '\u0000z{' + v.keys().map(tupleKeyPart).sort().join('\u0001') + '}';
      }
      if (v instanceof PyList || v instanceof PyDict || v instanceof PyDeque || v instanceof PyDictView && v.kind !== 'keys') throw unhashable(v);
      if (v instanceof PyRange) {
        // equal ranges are equal sequences: the length, then the start (unless empty), then the step (unless len 1)
        const n = rangeLen(v);
        return '\u0000r' + (n === 0n ? '0' : n === 1n ? '1,' + v.start : n + ',' + v.start + ',' + v.step);
      }
      if (v instanceof PyDate) return '\u0000d' + v.ordinalKey();
      if (v instanceof PyTimedelta) return '\u0000td' + v.us;
      if (v instanceof PyTime) return '\u0000tm' + v.key();
      if (v instanceof PyGenericAlias) return '\u0000ga' + objKey(v.origin) + '(' + v.args.map(tupleKeyPart).join('\u0001') + ')';
      if (typeof v.pyHashKey === 'function') return v.pyHashKey();
      if (v instanceof PyUnionType) return '\u0000u{' + v.args.map(tupleKeyPart).sort().join('\u0001') + '}';
      return v;
  }
  return v;
}
function tupleKeyPart(x) { const k = hashKey(x); return typeof k === 'object' && k !== null ? '\u0000o' + objKey(k) : typeof k + ':' + String(k); }
const objKeys = new WeakMap(); let objKeyN = 0;
function objKey(o) { let k = objKeys.get(o); if (k === undefined) { k = ++objKeyN; objKeys.set(o, k); } return k; }
export function unhashable(v) { return pyErr('TypeError', `unhashable type: '${typeName(v)}'`); }

export class PyDict {
  constructor(ctype) { this.map = new Map(); this.ctype = ctype || null; this.mut = 0; this.factory = null; }
  get size() { return this.map.size; }
  get(k) { const e = this.map.get(hashKey(k)); return e === undefined ? undefined : e[1]; }
  has(k) { return this.map.has(hashKey(k)); }
  set(k, v) { const hk = hashKey(k); const e = this.map.get(hk); if (e) e[1] = v; else { this.map.set(hk, [k, v]); this.mut++; } }
  delete(k) { const hk = hashKey(k); const e = this.map.get(hk); if (!e) return undefined; this.map.delete(hk); this.mut++; return e; }
  keys() { const r = []; for (const e of this.map.values()) r.push(e[0]); return r; }
  values() { const r = []; for (const e of this.map.values()) r.push(e[1]); return r; }
  entries() { return Array.from(this.map.values()); }
  clear() { this.map.clear(); this.mut++; }
}

/**
 * A dict that is a live view of a namespace Map (name → value): globals(), vars() / locals() at module level and
 * vars(module). Reads and writes go to the Map itself, so `globals()['x'] = 1` creates the global x, like CPython
 * where these are the namespace dicts themselves. Keys that are not str live in a side table.
 */
export class PyNsDict extends PyDict {
  constructor(ns) {
    super(null);
    this.ns = ns;
    this.other = new PyDict();
    const self = this;
    // dictIter reads map.values() (live, like iterating the dict)
    this.map = { values: function* () { for (const [k, v] of self.ns) yield [k, v]; yield* self.other.map.values(); } };
  }
  get size() { return this.ns.size + this.other.size; }
  get(k) { return typeof k === 'string' ? this.ns.get(k) : this.other.get(k); }
  has(k) { return typeof k === 'string' ? this.ns.has(k) : this.other.has(k); }
  set(k, v) {
    if (typeof k !== 'string') { this.other.set(k, v); return; }
    if (!this.ns.has(k)) this.mut++;
    this.ns.set(k, v);
  }
  delete(k) {
    if (typeof k !== 'string') return this.other.delete(k);
    if (!this.ns.has(k)) return undefined;
    const e = [k, this.ns.get(k)];
    this.ns.delete(k); this.mut++;
    return e;
  }
  keys() { return [...this.ns.keys(), ...this.other.keys()]; }
  values() { return [...this.ns.values(), ...this.other.values()]; }
  entries() { return [...this.ns.entries(), ...this.other.entries()]; }
  clear() { this.ns.clear(); this.other.clear(); this.mut++; }
}

// ---------------------------------------------------------------- CPython hashes (for set ordering)
const MASK64 = (1n << 64n) - 1n;
const HASH_MOD = (1n << 61n) - 1n;
export function pyHash(v) {
  switch (typeof v) {
    case 'bigint': {
      let h = (v < 0n ? -v : v) % HASH_MOD; if (v < 0n) h = -h;
      return h === -1n ? -2n : h;
    }
    case 'boolean': return v ? 1n : 0n;
    case 'number': {
      if (v !== v) return 0n;
      if (v === Infinity) return 314159n;
      if (v === -Infinity) return -314159n;
      const [m, e] = floatToRatio(v);
      let am = m < 0n ? -m : m;
      let h;
      if (e >= 0) h = (am << BigInt(e)) % HASH_MOD;
      else { const k = (-e) % 61; h = (am % HASH_MOD) * (1n << BigInt((61 - k) % 61)) % HASH_MOD; }
      if (m < 0n) h = -h;
      return h === -1n ? -2n : h;
    }
    case 'string': {
      if (v === '') return 0n;   // hash('') is 0 whatever PYTHONHASHSEED is
      // CPython randomises str hashes per process; any deterministic hash is equally "correct".
      let h1 = 0x811c9dc5, h2 = 0x01000193;
      for (let i = 0; i < v.length; i++) { const c = v.charCodeAt(i); h1 = Math.imul(h1 ^ c, 16777619); h2 = Math.imul(h2 ^ c, 2246822519); }
      let h = BigInt.asIntN(64, (BigInt(h1 >>> 0) << 32n) | BigInt(h2 >>> 0));
      return h === -1n ? -2n : h;
    }
    case 'object': {
      if (v === null) return 4238894112n;
      if (v instanceof PyTuple) {
        const P1 = 11400714785074694791n, P2 = 14029467366897019727n, P5 = 2870177450012600261n;
        let acc = P5;
        for (const it of v.items) {
          const lane = BigInt.asUintN(64, pyHash(it));
          acc = (acc + lane * P2) & MASK64;
          acc = ((acc << 31n) | (acc >> 33n)) & MASK64;
          acc = (acc * P1) & MASK64;
        }
        acc = (acc + (BigInt(v.items.length) ^ (P5 ^ 3527539n))) & MASK64;
        if (acc === MASK64) return 1546275796n;
        return BigInt.asIntN(64, acc);
      }
      if (v instanceof PySet && v.frozen) {
        // frozenset_hash: xor of the shuffled element hashes, then the size and a final dispersion
        const shuffle = (h) => (((h ^ 89869747n) ^ ((h << 16n) & MASK64)) * 3644798167n) & MASK64;
        let h = 0n;
        for (const k of v.keys()) h ^= shuffle(BigInt.asUintN(64, pyHash(k)));
        h ^= (BigInt(v.used + 1) * 1927868237n) & MASK64;
        h ^= (h >> 11n) ^ (h >> 25n);
        h = (h * 69069n + 907133923n) & MASK64;
        if (h === MASK64) h = 590923713n;
        return BigInt.asIntN(64, h);
      }
      if (v instanceof PyUnionType) { const fs = new PySet(true); for (const x of v.args) fs.add(x); return pyHash(fs); }
      if (v instanceof PyGenericAlias) return BigInt.asIntN(64, pyHash(v.origin) ^ pyHash(new PyTuple(v.args)));
      if (v instanceof PyRange) {
        // range_hash: hash((len, start, step)) with None for the parts that do not matter
        const n = rangeLen(v);
        return pyHash(new PyTuple([n, n === 0n ? null : v.start, n <= 1n ? null : v.step]));
      }
      // equal dates / times / timedeltas hash equal (CPython hashes their bytes; the values themselves differ)
      if (v instanceof PyDate || v instanceof PyTime || v instanceof PyTimedelta) return pyHash(hashKey(v));
      hashKey(v); // throws for unhashable
      return BigInt(objKey(v) * 16 + 0x7f0000);
    }
  }
  return 0n;
}

// CPython setobject.c emulation (keeps iteration order identical for ints/floats/tuples)
const DUMMY = { dummy: true };
export class PySet {
  constructor(frozen) { this.frozen = !!frozen; this._reset(8); this.mut = 0; this.finger = 0; }
  _reset(size) { this.mask = size - 1; this.table = new Array(size).fill(null); this.fill = 0; this.used = 0; this.index = new Map(); }
  get size() { return this.used; }
  has(k) { return this.index.has(hashKey(k)); }
  _probeStart(h) { return Number(BigInt.asUintN(32, h)) & this.mask; }
  add(k, h, hk) {
    if (hk === undefined) hk = hashKey(k);
    if (this.index.has(hk)) return;
    if (h === undefined) h = pyHash(k);
    const mask = this.mask, table = this.table;
    let i = Number(BigInt.asUintN(32, h)) & mask;
    let perturb = BigInt.asUintN(64, h);
    let freeslot = -1;
    for (;;) {
      let probes = (i + 9 <= mask) ? 9 : 0;
      let j = i;
      do {
        const e = table[j];
        if (e === null) {
          if (freeslot >= 0) { table[freeslot] = { k, h, hk }; this.index.set(hk, freeslot); this.used++; this.mut++; return; }
          table[j] = { k, h, hk }; this.index.set(hk, j); this.fill++; this.used++; this.mut++;
          if (this.fill * 5 >= mask * 3) this._resize(this.used > 50000 ? this.used * 2 : this.used * 4);
          return;
        }
        if (e === DUMMY) freeslot = j; // CPython 3.13 keeps the LAST dummy seen
        j++;
      } while (probes--);
      perturb >>= 5n;
      i = (i * 5 + 1 + Number(perturb & 0xffffffffn)) & mask;
    }
  }
  _insertClean(table, mask, ent) {
    let i = Number(BigInt.asUintN(32, ent.h)) & mask;
    let perturb = BigInt.asUintN(64, ent.h);
    for (;;) {
      if (table[i] === null) { table[i] = ent; return i; }
      if (i + 9 <= mask) for (let j = 1; j <= 9; j++) if (table[i + j] === null) { table[i + j] = ent; return i + j; }
      perturb >>= 5n;
      i = (i * 5 + 1 + Number(perturb & 0xffffffffn)) & mask;
    }
  }
  _resize(minused) {
    let newsize = 8; while (newsize <= minused) newsize *= 2;
    const old = this.table;
    this.mask = newsize - 1; this.table = new Array(newsize).fill(null); this.index = new Map();
    this.fill = this.used;
    for (const e of old) if (e !== null && e !== DUMMY) this.index.set(e.hk, this._insertClean(this.table, this.mask, e));
  }
  discard(k) {
    const hk = hashKey(k);
    const j = this.index.get(hk);
    if (j === undefined) return false;
    this.table[j] = DUMMY; this.index.delete(hk); this.used--; this.mut++;
    return true;
  }
  pop() {
    if (this.used === 0) return undefined;
    let j = this.finger & this.mask;
    while (this.table[j] === null || this.table[j] === DUMMY) { j++; if (j > this.mask) j = 0; }
    const e = this.table[j];
    this.table[j] = DUMMY; this.index.delete(e.hk); this.used--; this.mut++; this.finger = j + 1;
    return e.k;
  }
  clear() { this._reset(8); this.mut++; }
  entries() { const r = []; for (const e of this.table) if (e !== null && e !== DUMMY) r.push(e); return r; }
  keys() { const r = []; for (const e of this.table) if (e !== null && e !== DUMMY) r.push(e.k); return r; }
  /** set_merge from another PySet */
  merge(other) {
    if (other === this || other.used === 0) return;
    if ((this.fill + other.used) * 5 >= this.mask * 3) this._resize((this.used + other.used) * 2);
    if (this.fill === 0 && this.mask === other.mask && other.fill === other.used) {
      for (let i = 0; i <= other.mask; i++) { const e = other.table[i]; if (e !== null) { this.table[i] = e; this.index.set(e.hk, i); } }
      this.fill = other.fill; this.used = other.used; this.mut++;
      return;
    }
    if (this.fill === 0) {
      this.fill = other.used; this.used = other.used;
      for (const e of other.table) if (e !== null && e !== DUMMY) this.index.set(e.hk, this._insertClean(this.table, this.mask, e));
      this.mut++;
      return;
    }
    for (const e of other.table) if (e !== null && e !== DUMMY) this.add(e.k, e.h, e.hk);
  }
  /** set_update_internal from a dict's keys (one resize up front) */
  mergeDictKeys(d) {
    const n = d.size;
    if ((this.fill + n) * 5 >= this.mask * 3) this._resize((this.used + n) * 2);
    for (const k of d.keys()) this.add(k);
  }
  copy(frozen = this.frozen) { const s = new PySet(frozen); s.merge(this); return s; }
  /** set_swap_bodies: take over another set's table (used by &=, intersection_update) */
  swapFrom(o) { this.mask = o.mask; this.table = o.table; this.fill = o.fill; this.used = o.used; this.index = o.index; this.finger = 0; this.mut++; }
  /** set_difference_update_internal tail: drop dummies when more than 1/4 of the table */
  shrinkDummies() { if ((this.fill - this.used) > Math.floor(this.mask / 4)) this._resize(this.used > 50000 ? this.used * 2 : this.used * 4); }
}
// ---------------------------------------------------------------- CPython set algebra (Objects/setobject.c)
export function setUnionInto(r, other, toArr) {
  if (other instanceof PySet) r.merge(other);
  else if (other instanceof PyDict) r.mergeDictKeys(other);
  else for (const x of toArr(other)) r.add(x);
  return r;
}
export function setIntersection(a, b, toArr) {
  if (a === b) return a.copy();
  const r = new PySet(a.frozen);
  if (b instanceof PySet) {
    let so = a, other = b;
    if (other.used > so.used) { so = b; other = a; }
    for (const e of other.entries()) if (so.index.has(e.hk)) r.add(e.k, e.h, e.hk);
    return r;
  }
  for (const x of toArr(b)) if (a.has(x)) r.add(x);
  return r;
}
export function setDifferenceUpdate(a, other, toArr) {
  if (a === other) { a.clear(); return a; }
  if (other instanceof PySet) {
    let o = other;
    if ((o.used >> 3) > a.used) o = setIntersection(a, o, toArr);
    for (const e of o.entries()) a.discard(e.k);
  } else for (const x of toArr(other)) a.discard(x);
  a.shrinkDummies();
  return a;
}
export function setDifference(a, other, toArr) {
  let otherSize;
  if (other instanceof PySet) otherSize = other.used;
  else if (other instanceof PyDict) otherSize = other.size;
  else return setDifferenceUpdate(a.copy(), other, toArr);
  if ((a.used >> 2) > otherSize) return setDifferenceUpdate(a.copy(), other, toArr);
  const r = new PySet(a.frozen);
  for (const e of a.entries()) if (!other.has(e.k)) r.add(e.k, e.h, e.hk);
  return r;
}
export function setSymDiffUpdate(a, other, toArr) {
  if (a === other) { a.clear(); return a; }
  let o = other;
  if (!(o instanceof PySet)) { o = new PySet(); setUnionInto(o, other, toArr); }
  for (const e of o.entries()) { if (!a.discard(e.k)) a.add(e.k, e.h, e.hk); }
  return a;
}
export function setSymDiff(a, other, toArr) {
  const r = new PySet(a.frozen);
  setUnionInto(r, other, toArr);
  return setSymDiffUpdate(r, a, toArr);
}

// ---------------------------------------------------------------- datetime value classes
export class PyDate {
  constructor(y, m, d) { this.y = y; this.m = m; this.d = d; }
  ordinal() { return daysBeforeYear(this.y) + daysBeforeMonth(this.y, this.m) + this.d; }
  ordinalKey() { return this.ordinal() * 86400 * 1e6 + (this.us0 ? this.us0() : 0); }
}
export class PyDateTime extends PyDate {
  constructor(y, mo, d, h = 0, mi = 0, s = 0, us = 0) { super(y, mo, d); this.h = h; this.mi = mi; this.s = s; this.us = us; }
  us0() { return ((this.h * 60 + this.mi) * 60 + this.s) * 1e6 + this.us; }
}
export class PyTimedelta { constructor(us) { this.us = us; } }   // total microseconds (Number; fine for teaching ranges)
/** datetime.time (naive) */
export class PyTime {
  constructor(h = 0, mi = 0, s = 0, us = 0) { this.h = h; this.mi = mi; this.s = s; this.us = us; }
  key() { return ((this.h * 60 + this.mi) * 60 + this.s) * 1e6 + this.us; }
}
export function isLeap(y) { return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0); }
export function daysInMonth(y, m) { return [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; }
function daysBeforeYear(y) { const p = y - 1; return p * 365 + Math.floor(p / 4) - Math.floor(p / 100) + Math.floor(p / 400); }
function daysBeforeMonth(y, m) { let n = 0; for (let i = 1; i < m; i++) n += daysInMonth(y, i); return n; }
export function ordinalToDate(n) {
  // inverse of PyDate.ordinal (1 = 0001-01-01)
  let y = Math.floor((n - 1) / 365.2425) + 1;
  while (daysBeforeYear(y) >= n) y--;
  while (daysBeforeYear(y + 1) < n) y++;
  let rem = n - daysBeforeYear(y), m = 1;
  while (rem > daysInMonth(y, m)) { rem -= daysInMonth(y, m); m++; }
  return [y, m, rem];
}

// ---------------------------------------------------------------- repr / str
export function strRepr(s) {
  const q = (s.includes("'") && !s.includes('"')) ? '"' : "'";
  let out = q;
  for (const ch of s) {
    const c = ordOf(ch);
    if (ch === q || ch === '\\') out += '\\' + ch;
    else if (c === 10) out += '\\n';
    else if (c === 13) out += '\\r';
    else if (c === 9) out += '\\t';
    else if (c < 32 || c === 127) out += '\\x' + c.toString(16).padStart(2, '0');
    else if (c < 128) out += ch;
    else if (!(uflags(c) & U_PRINTABLE)) {   // Unicode 15.1 data, like CPython 3.13
      if (c < 0x100) out += '\\x' + c.toString(16).padStart(2, '0');
      else if (c < 0x10000) out += '\\u' + c.toString(16).padStart(4, '0');
      else out += '\\U' + c.toString(16).padStart(8, '0');
    } else out += ch;
  }
  return out + q;
}

let reprHook = null; // interp-supplied: (v) => string|undefined (ids for addresses, host reprs)
export function setReprHook(f) { reprHook = f; }
const active = new Set();

// sys.set_int_max_str_digits(): the limit of the run being stepped (minipy.js swaps it in, like the id spaces)
let maxStrDigits = 4300, intStrLimit = 10n ** 4300n;
/** set the current int <-> str digit limit (0 = none); returns the previous one */
export function setIntMaxStrDigits(n) {
  const prev = maxStrDigits;
  if (n !== maxStrDigits) { maxStrDigits = n; intStrLimit = n > 0 ? 10n ** BigInt(n) : null; }
  return prev;
}
export function getIntMaxStrDigits() { return maxStrDigits; }
/** str(int) with CPython's int_max_str_digits limit (default 4300) */
export function intToStr(v) {
  if (intStrLimit !== null && (v >= intStrLimit || v <= -intStrLimit)) throw pyErr('ValueError', `Exceeds the limit (${maxStrDigits} digits) for integer string conversion; use sys.set_int_max_str_digits() to increase the limit`);
  return v.toString();
}
export function repr(v) {
  switch (typeof v) {
    case 'bigint': return intToStr(v);
    case 'boolean': return v ? 'True' : 'False';
    case 'number': return floatRepr(v);
    case 'string': return strRepr(v);
    case 'undefined': return '<undefined>';
  }
  if (v === null) return 'None';
  if (v instanceof PyList || v instanceof PyTuple || (v instanceof PyDict && typeof v.pyRepr !== 'function') || (v instanceof PySet && v.used) || v instanceof PyDeque) return containerRepr(v);
  if (typeof v.pyRepr === 'function') return v.pyRepr();
  if (v instanceof PySet) return v.frozen ? 'frozenset()' : 'set()';
  if (v instanceof PyRange) return v.step === 1n ? `range(${v.start}, ${v.stop})` : `range(${v.start}, ${v.stop}, ${v.step})`;
  if (v instanceof PyType) return `<class '${v.qualName}'>`;
  if (v instanceof PyExc) return v.type.name + '(' + v.args.map(repr).join(', ') + ')';
  if (v instanceof PyDictView) {
    const d = v.dict;
    const items = v.kind === 'keys' ? d.keys().map(repr) : v.kind === 'values' ? d.values().map(repr) : d.entries().map(([k, x]) => '(' + repr(k) + ', ' + repr(x) + ')');
    return 'dict_' + v.kind + '([' + items.join(', ') + '])';
  }
  if (v instanceof PySlice) return `slice(${repr(v.start)}, ${repr(v.stop)}, ${repr(v.step)})`;
  if (v instanceof PyGenericAlias) return genericAliasRepr(v);
  if (v instanceof PyUnionType) return v.args.map((x) => hintRepr(x, true)).join(' | ');
  if (v instanceof PyDateTime) {
    let s = `datetime.datetime(${v.y}, ${v.m}, ${v.d}, ${v.h}, ${v.mi}`;
    if (v.s || v.us) s += ', ' + v.s;
    if (v.us) s += ', ' + v.us;
    return s + ')';
  }
  if (v instanceof PyDate) return `datetime.date(${v.y}, ${v.m}, ${v.d})`;
  if (v instanceof PyTimedelta) return timedeltaRepr(v);
  if (v instanceof PyTime) return `datetime.time(${v.h}, ${v.mi}` + (v.s || v.us ? ', ' + v.s : '') + (v.us ? ', ' + v.us : '') + ')';
  if (v === ELLIPSIS) return 'Ellipsis';
  if (v === NOT_IMPLEMENTED) return 'NotImplemented';
  const h = reprHook && reprHook(v);
  if (h !== undefined) return h;
  return defaultObjRepr(v, 0);
}
export function defaultObjRepr(v, id, selfId) {
  const addr = formatAddr(id);
  if (v instanceof PyFunction) return `<function ${v.qualname} at ${addr}>`;
  if (v instanceof PyBuiltin) {
    // stand-ins for functions written in Python in CPython's library (statistics.mean, random.randint, Counter methods)
    if (v.pyKind === 'function') return `<function ${v.pyQual || v.name} at ${addr}>`;
    if (v.pyKind === 'method') return `<bound method ${v.pyQual || v.name} of ${repr(v.self)}>`;
    if (v.descr) return `<method '${v.name}' of '${v.ownerType.tpName}' objects>`;
    if (v.self !== undefined && !(v.self instanceof PyModule)) return `<built-in method ${v.name} of ${typeName(v.self)} object at ${formatAddr(selfId ?? id + 1)}>`;
    return `<built-in function ${v.name}>`;
  }
  if (v instanceof PyModule) return v.file ? `<module '${v.name}' from '${v.file}'>` : `<module '${v.name}' (built-in)>`;
  if (v instanceof PyIter) return `<${v.type.name === 'generator' ? 'generator object <genexpr>' : v.type.name + ' object'} at ${addr}>`;
  if (v instanceof PyHost) return `<${v.name} object at ${addr}>`;
  if (v instanceof PyBoundMethod) return `<bound method ${v.fn.qualname} of ${repr(v.self)}>`;
  return `<${typeOf(v).qualName} object at ${addr}>`;
}
/**
 * repr of nested lists / tuples / dicts / sets / deques without JS recursion (CPython handles ~10000 levels; its
 * Py_ReprEnter guard prints a container that is being shown already as [...], (...), {...}). Past the limit:
 * RecursionError "maximum recursion depth exceeded while getting the repr of an object".
 */
const REPR_LIMIT = 9998;
let reprDepth = 0;
function reentryRepr(x) {
  if (x instanceof PyList || x instanceof PyDeque) return '[...]';
  if (x instanceof PyTuple) return '(...)';
  if (x instanceof PySet) return (x.frozen ? 'frozenset' : 'set') + '(...)';
  return '{...}';
}
export const isReprContainer = (x) => x !== null && typeof x === 'object' && (x instanceof PyList || x instanceof PyTuple || x instanceof PyDeque || (x instanceof PyDict && typeof x.pyRepr !== 'function') || (x instanceof PySet && x.used > 0));
/** how repr() walks a container: { kids, open, close, sep(i) } (kids in display order: a Counter by count) */
export function reprFrame(x) {
  // open, close and the text before each child, so the repr can be produced as a stream (and cut off early)
  const comma = (i) => (i ? ', ' : '');
  if (x instanceof PyList) return { kids: x.items, open: '[', close: ']', sep: comma };
  if (x instanceof PyTuple) {
    if (x.nt) return { kids: x.items, open: (x.nt.reprName || x.nt.name) + '(', close: ')', sep: (i) => comma(i) + x.nt.fields[i] + '=' };
    return { kids: x.items, open: '(', close: x.items.length === 1 ? ',)' : ')', sep: comma };
  }
  if (x instanceof PyDeque) return { kids: x.items, open: 'deque([', close: ']' + (x.maxlen != null ? ', maxlen=' + x.maxlen : '') + ')', sep: comma };
  if (x instanceof PySet) return { kids: x.keys(), open: x.frozen ? 'frozenset({' : '{', close: x.frozen ? '})' : '}', sep: comma };
  // dict family: keys and values alternate
  const ct = x.ctype;
  const ents = ct === T.Counter ? counterOrder(x) : x.entries();
  const kids = [];
  for (const [k, w] of ents) kids.push(k, w);
  const sep = (i) => (i % 2 ? ': ' : comma(i));
  if (ct === T.Counter) return ents.length ? { kids, open: 'Counter({', close: '})', sep } : { kids, open: 'Counter()', close: '', sep };
  if (ct === T.OrderedDict) return ents.length ? { kids, open: 'OrderedDict({', close: '})', sep } : { kids, open: 'OrderedDict()', close: '', sep };
  if (ct === T.defaultdict) return { kids, open: `defaultdict(${x.factory ? repr(x.factory) : 'None'}, {`, close: '})', sep };
  return { kids, open: '{', close: '}', sep };
}
/**
 * trace (snapshot View cache, minipy/views.js): records every container the walk entered as
 * { o, kids, n, done } (n kids at least partly shown; done: the closing bracket was written, so the text depends on
 * the whole length) and sets trace.cyclic when a container was shown as [...]
 */
function containerRepr(root, limit = Infinity, trace = null) {
  if (active.has(root)) { if (trace) trace.cyclic = true; return reentryRepr(root); }
  const stack = [];
  const out = [];
  let len = 0;
  const emit = (t) => { out.push(t); len += t.length; };
  const push = (x) => {
    if (reprDepth + stack.length >= REPR_LIMIT) throw pyErr('RecursionError', 'maximum recursion depth exceeded while getting the repr of an object');
    active.add(x);
    const fr = reprFrame(x);
    fr.v = x; fr.i = 0;
    if (trace) { fr.dep = { o: x, kids: fr.kids, n: 0, done: false }; trace.deps.push(fr.dep); }
    stack.push(fr);
    emit(fr.open);
  };
  const cut = () => { if (trace) for (const fr of stack) fr.dep.n = fr.i; };
  const base = reprDepth;
  try {
    push(root);
    while (stack.length) {
      if (len > limit) { CAPPED.hit = true; cut(); return out.join('').slice(0, limit); }
      const top = stack[stack.length - 1];
      if (top.i < top.kids.length) {
        const i = top.i++;
        const x = top.kids[i];
        emit(top.sep(i));
        if (isReprContainer(x)) {
          if (active.has(x)) { if (trace) trace.cyclic = true; emit(reentryRepr(x)); } else { reprDepth = base + stack.length; push(x); }
        } else { reprDepth = base + stack.length; emit(repr(x)); }
        continue;
      }
      stack.pop();
      active.delete(top.v);
      if (trace) { top.dep.n = top.kids.length; top.dep.done = true; }
      emit(top.close);
    }
    if (len > limit) { CAPPED.hit = true; return out.join('').slice(0, limit); }
    return out.join('');
  } finally {
    for (const fr of stack) active.delete(fr.v);
    reprDepth = base;
  }
}
const CAPPED = { hit: false };
/**
 * repr(v) cut to about `limit` characters for display (snapshot Views): [text, truncated]. Containers stop being
 * walked once the limit is reached, so a View of a list of a million items stays cheap.
 */
export function reprCapped(v, limit, trace = null) {
  if (!isReprContainer(v)) { const r = repr(v); return r.length > limit ? [r.slice(0, limit), true] : [r, false]; }
  CAPPED.hit = false;
  const r = containerRepr(v, limit, trace);
  const hit = CAPPED.hit;
  CAPPED.hit = false;
  return [r, hit];
}
export function counterOrder(d) {
  // most_common(): sorted by count descending, stable (insertion order for ties)
  const ents = d.entries();
  const idx = ents.map((e, i) => i);
  idx.sort((a, b) => { const c = numCmpSafe(ents[b][1], ents[a][1]); return c !== 0 ? c : a - b; });
  return idx.map((i) => ents[i]);
}
function numCmpSafe(a, b) {
  const isNum = (x) => typeof x === 'bigint' || typeof x === 'number' || typeof x === 'boolean';
  if (isNum(a) && isNum(b)) { const c = numCmp(a, b); return c !== c ? 0 : c; }
  try { return lt(a, b) ? -1 : lt(b, a) ? 1 : 0; } catch (e) { return 0; }
}
function timedeltaRepr(td) {
  let us = td.us;
  const days = Math.floor(us / 86400e6); us -= days * 86400e6;
  const secs = Math.floor(us / 1e6); us -= secs * 1e6;
  const parts = [];
  if (days) parts.push('days=' + days);
  if (secs) parts.push('seconds=' + secs);
  if (us) parts.push('microseconds=' + Math.round(us));
  return 'datetime.timedelta(' + (parts.length ? parts.join(', ') : '0') + ')';
}
export function timedeltaStr(td) {
  let us = td.us;
  const days = Math.floor(us / 86400e6); us -= days * 86400e6;
  const secs = Math.floor(us / 1e6); us = Math.round(us - secs * 1e6);
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
  let out = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  if (us) out += '.' + String(us).padStart(6, '0');
  if (days) out = `${days} day${Math.abs(days) !== 1 ? 's' : ''}, ` + out;
  return out;
}
const p2 = (n) => String(n).padStart(2, '0');
export function timeStr(v) { return `${p2(v.h)}:${p2(v.mi)}:${p2(v.s)}` + (v.us ? '.' + String(v.us).padStart(6, '0') : ''); }
export function dateStr(v) {
  const ds = `${String(v.y).padStart(4, '0')}-${p2(v.m)}-${p2(v.d)}`;
  if (!(v instanceof PyDateTime)) return ds;
  return ds + ` ${p2(v.h)}:${p2(v.mi)}:${p2(v.s)}` + (v.us ? '.' + String(v.us).padStart(6, '0') : '');
}

export function str(v) {
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return floatRepr(v);
  if (v instanceof PyExc) return excStr(v);
  if (v instanceof PyDate) return dateStr(v);
  if (v instanceof PyTimedelta) return timedeltaStr(v);
  if (v instanceof PyTime) return timeStr(v);
  if (v instanceof PyHost && reprHook) { const h = reprHook(v, true); if (h !== undefined) return h; }
  return repr(v);
}
export function truthy(v) {
  switch (typeof v) {
    case 'boolean': return v;
    case 'bigint': return v !== 0n;
    case 'number': return v !== 0;
    case 'string': return v.length > 0;
    case 'undefined': return false;
  }
  if (v === null) return false;
  if (v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque) return v.items.length > 0;
  if (v instanceof PyDict) return v.size > 0;
  if (v instanceof PySet) return v.used > 0;
  if (v instanceof PyRange) return rangeLen(v) > 0n;
  if (v instanceof PyDictView) return v.dict.size > 0;
  if (v instanceof PyTimedelta) return v.us !== 0;
  if (v instanceof PyHost) {
    let r = hostDunder(v, '__bool__');
    if (r !== undefined) return truthy(r);
    r = hostDunder(v, '__len__');
    if (r !== undefined) return truthy(r);
  }
  return true;
}
export function rangeLen(r) {
  const { start, stop, step } = r;
  if (step > 0n) return start < stop ? (stop - start - 1n) / step + 1n : 0n;
  return start > stop ? (start - stop - 1n) / -step + 1n : 0n;
}
/** len() of the builtin sized types (JS number); TypeError for the others */
export function pyLen(v) {
  if (typeof v === 'string') return strLen(v);
  if (v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque) return v.items.length;
  if (v instanceof PyDict) return v.size;
  if (v instanceof PySet) return v.used;
  if (v instanceof PyDictView) return v.dict.size;
  if (v instanceof PyRange) return Number(rangeLen(v));
  if (v instanceof PyHost) {
    const r = hostDunder(v, '__len__');
    if (r !== undefined) {
      if (typeof r !== 'bigint' && typeof r !== 'boolean') throw pyErr('TypeError', `'${typeName(r)}' object cannot be interpreted as an integer`);
      return Number(r);
    }
  }
  throw pyErr('TypeError', `object of type '${typeName(v)}' has no len()`);
}
export function eq(a, b) {
  if (a === b) return typeof a !== 'number' || a === a;
  if (a instanceof PyHost || b instanceof PyHost) {
    const r = hostBinary(a, b, '__eq__', '__eq__');
    if (r !== undefined) return truthy(r);
    return a instanceof PyHost && b instanceof PyHost && a.obj === b.obj;
  }
  const ta = typeof a, tb = typeof b;
  if ((ta === 'bigint' || ta === 'boolean' || ta === 'number') && (tb === 'bigint' || tb === 'boolean' || tb === 'number')) return numCmp(a, b) === 0;
  if (ta !== 'object' || tb !== 'object' || a === null || b === null) return false;
  if (deepEqPair(a, b)) return deepEq(a, b);
  if (a instanceof PyList || a instanceof PyTuple || a instanceof PyDeque) return false;
  if (a instanceof PyDict) {
    if (!(b instanceof PyDict)) return false;
    if (a.ctype === T.Counter && b.ctype === T.Counter) {
      for (const [k, v] of a.entries()) { const w = b.get(k); if (!eq(v, w === undefined ? 0n : w)) return false; }
      for (const [k, v] of b.entries()) { const w = a.get(k); if (!eq(v, w === undefined ? 0n : w)) return false; }
      return true;
    }
    if (a.size !== b.size) return false;
    if (a.ctype === T.OrderedDict && b.ctype === T.OrderedDict) {
      // OrderedDict == OrderedDict is order-sensitive
      const ea = a.entries(), eb = b.entries();
      for (let i = 0; i < ea.length; i++) if (!eq(ea[i][0], eb[i][0]) || !eq(ea[i][1], eb[i][1])) return false;
      return true;
    }
    for (const [k, v] of a.entries()) { const w = b.get(k); if (w === undefined || !eq(v, w)) return false; }
    return true;
  }
  if (a instanceof PySet) {
    if (!(b instanceof PySet) || a.used !== b.used) return false;
    for (const k of a.keys()) if (!b.has(k)) return false;
    return true;
  }
  if (a instanceof PyRange) {
    if (!(b instanceof PyRange)) return false;
    const la = rangeLen(a), lb = rangeLen(b);
    if (la !== lb) return false;
    if (la === 0n) return true;
    if (a.start !== b.start) return false;
    return la === 1n || a.step === b.step;
  }
  if (isSetView(a) && (b instanceof PySet || isSetView(b)) || a instanceof PySet && isSetView(b)) return setLikeCompare('==', a, b);
  if (a instanceof PyDate && b instanceof PyDate) return (a instanceof PyDateTime) === (b instanceof PyDateTime) && a.ordinalKey() === b.ordinalKey();
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) return a.us === b.us;
  if (a instanceof PyTime && b instanceof PyTime) return a.key() === b.key();
  if (a instanceof PySlice && b instanceof PySlice) return eq(a.start, b.start) && eq(a.stop, b.stop) && eq(a.step, b.step);
  if (a instanceof PyHost && b instanceof PyHost) return a.obj === b.obj;
  if (typeof a.pyEq === 'function') { const r = a.pyEq(b); if (r !== undefined) return r; }
  if (typeof b.pyEq === 'function') { const r = b.pyEq(a); if (r !== undefined) return r; }
  if (a instanceof PyGenericAlias) return b instanceof PyGenericAlias && a.origin === b.origin && seqEq(a.args, b.args);
  if (a instanceof PyUnionType) {
    if (!(b instanceof PyUnionType) || a.args.length !== b.args.length) return false;
    return a.args.every((x) => b.args.some((y) => eq(x, y))) && b.args.every((y) => a.args.some((x) => eq(x, y)));
  }
  // bound methods of builtin objects: equal when they are the same method of the same object
  if (a instanceof PyBuiltin && b instanceof PyBuiltin) return a.self !== undefined && a.self === b.self && a.name === b.name && a.fn === b.fn;
  if (a instanceof PyBoundMethod && b instanceof PyBoundMethod) return a.self === b.self && a.fn === b.fn;
  return false;
}
/**
 * == of nested lists / tuples / deques / plain dicts without JS recursion (CPython compares ~10000 levels; past
 * that, or for self-containing containers, RecursionError "maximum recursion depth exceeded in comparison")
 */
const CMP_LIMIT = 9999;
let cmpDepth = 0;
const plainDict = (x) => x instanceof PyDict && (x.ctype === null || x.ctype === T.defaultdict) && typeof x.pyRepr !== 'function';
function deepEqPair(a, b) {
  return (a instanceof PyList && b instanceof PyList) || (a instanceof PyTuple && b instanceof PyTuple) || (a instanceof PyDeque && b instanceof PyDeque) || (plainDict(a) && plainDict(b));
}
function deepEq(a, b) {
  const stack = [];
  const base = cmpDepth;
  const open = (x, y) => {
    if (base + stack.length >= CMP_LIMIT) throw pyErr('RecursionError', 'maximum recursion depth exceeded in comparison');
    if (x instanceof PyDict) {
      if (x.size !== y.size) return false;
      stack.push({ d: true, ents: x.entries(), y, i: 0 });
    } else {
      if (x.items.length !== y.items.length) return false;
      stack.push({ x: x.items, y: y.items, i: 0 });
    }
    return true;
  };
  try {
    if (!open(a, b)) return false;
    while (stack.length) {
      const f = stack[stack.length - 1];
      let x, y;
      if (f.d) {
        if (f.i >= f.ents.length) { stack.pop(); continue; }
        const e = f.ents[f.i++];
        y = f.y.get(e[0]);
        if (y === undefined) return false;
        x = e[1];
      } else {
        if (f.i >= f.x.length || f.i >= f.y.length) { stack.pop(); continue; }
        x = f.x[f.i]; y = f.y[f.i]; f.i++;
      }
      if (sameObj(x, y)) continue;
      if (x !== null && y !== null && typeof x === 'object' && typeof y === 'object' && deepEqPair(x, y)) { if (!open(x, y)) return false; continue; }
      cmpDepth = base + stack.length;
      if (!eq(x, y)) return false;
    }
    return true;
  } finally { cmpDepth = base; }
}
function seqEq(x, y) {
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) if (!sameObj(x[i], y[i]) && !eq(x[i], y[i])) return false;
  return true;
}
export function cmpErr(op, a, b) {
  return pyErr('TypeError', `'${op}' not supported between instances of '${typeName(a)}' and '${typeName(b)}'`);
}
function strCmp(a, b) {
  if (SURR.test(a) || SURR.test(b)) {
    const x = Array.from(a), y = Array.from(b);
    const n = Math.min(x.length, y.length);
    for (let i = 0; i < n; i++) { const c = ordOf(x[i]) - ordOf(y[i]); if (c) return c < 0 ? -1 : 1; }
    return x.length < y.length ? -1 : x.length > y.length ? 1 : 0;
  }
  return a < b ? -1 : a > b ? 1 : 0;
}
/** 3-way ordering for '<' etc.; returns -1/0/1, NaN (unordered) or throws TypeError */
function order(op, a, b) {
  const ta = typeof a, tb = typeof b;
  if ((ta === 'bigint' || ta === 'boolean' || ta === 'number') && (tb === 'bigint' || tb === 'boolean' || tb === 'number')) return numCmp(a, b);
  if (ta === 'string' && tb === 'string') return strCmp(a, b);
  if (a instanceof PyList && b instanceof PyList || a instanceof PyTuple && b instanceof PyTuple || a instanceof PyDeque && b instanceof PyDeque) {
    const x = a.items, y = b.items, n = Math.min(x.length, y.length);
    for (let i = 0; i < n; i++) {
      if (sameObj(x[i], y[i]) || eq(x[i], y[i])) continue;
      return lt(x[i], y[i], op) ? -1 : (lt(y[i], x[i], op) ? 1 : NaN);
    }
    return x.length < y.length ? -1 : x.length > y.length ? 1 : 0;
  }
  if (a instanceof PyDate && b instanceof PyDate && (a instanceof PyDateTime) === (b instanceof PyDateTime)) { const x = a.ordinalKey(), y = b.ordinalKey(); return x < y ? -1 : x > y ? 1 : 0; }
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) return a.us < b.us ? -1 : a.us > b.us ? 1 : 0;
  if (a instanceof PyTime && b instanceof PyTime) { const x = a.key(), y = b.key(); return x < y ? -1 : x > y ? 1 : 0; }
  throw cmpErr(op, a, b);
}
function setSub(a, b) { if (a.used > b.used) return false; for (const k of a.keys()) if (!b.has(k)) return false; return true; }
// dict.keys() / dict.items() are set-like (dictview_richcompare): comparisons with sets and other such views
const isSetView = (v) => v instanceof PyDictView && v.kind !== 'values';
export { isSetView };
const setLikeLen = (v) => (v instanceof PySet ? v.used : v.dict.size);
export function setViewItems(v) { return v.kind === 'keys' ? v.dict.keys() : v.dict.entries().map(([k, x]) => new PyTuple([k, x])); }
function allContainedIn(a, b) {
  for (const x of a instanceof PySet ? a.keys() : setViewItems(a)) if (!contains(b, x)) return false;
  return true;
}
function setLikeCompare(op, a, b) {
  const la = setLikeLen(a), lb = setLikeLen(b);
  switch (op) {
    case '==': return la === lb && allContainedIn(a, b);
    case '!=': return !(la === lb && allContainedIn(a, b));
    case '<': return la < lb && allContainedIn(a, b);
    case '<=': return la <= lb && allContainedIn(a, b);
    case '>': return la > lb && allContainedIn(b, a);
    default: return la >= lb && allContainedIn(b, a);
  }
}
// Counter rich comparisons (3.10+): multiset inclusion, missing counts are 0
function counterCompare(op, a, b) {
  const all = (test) => { for (const c of [a, b]) for (const k of c.keys()) { const x = a.get(k), y = b.get(k); if (!test(x === undefined ? 0n : x, y === undefined ? 0n : y)) return false; } return true; };
  const le = () => all((x, y) => compare('<=', x, y)), ge = () => all((x, y) => compare('>=', x, y));
  switch (op) {
    case '<=': return le();
    case '<': return le() && !eq(a, b);
    case '>=': return ge();
    default: return ge() && !eq(a, b);
  }
}
const HOST_CMP = { '!=': ['__ne__', '__ne__'], '<': ['__lt__', '__gt__'], '<=': ['__le__', '__ge__'], '>': ['__gt__', '__lt__'], '>=': ['__ge__', '__le__'] };
export function lt(a, b, op = '<') {
  if (a instanceof PySet && b instanceof PySet) return a.used < b.used && setSub(a, b);
  if (a instanceof PyHost || b instanceof PyHost) { const r = hostBinary(a, b, '__lt__', '__gt__'); if (r !== undefined) return truthy(r); }
  return order(op, a, b) < 0;
}
export function compare(op, a, b) {
  if (op !== 'is' && op !== 'is not' && op !== 'in' && op !== 'not in' && typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    if (isSetView(a) && (b instanceof PySet || isSetView(b)) || a instanceof PySet && isSetView(b)) return setLikeCompare(op, a, b);
    if (op !== '==' && op !== '!=' && a instanceof PyDict && b instanceof PyDict && a.ctype === T.Counter && b.ctype === T.Counter) return counterCompare(op, a, b);
  }
  if ((a instanceof PyHost || b instanceof PyHost) && op !== 'is' && op !== 'is not' && op !== 'in' && op !== 'not in' && op !== '==') {
    const H = HOST_CMP[op];
    const r = hostBinary(a, b, H[0], H[1]);
    if (r !== undefined) return truthy(r);
  }
  switch (op) {
    case '==': return eq(a, b);
    case '!=': return !eq(a, b);
    case '<': if (a instanceof PySet && b instanceof PySet) return a.used < b.used && setSub(a, b); return order('<', a, b) < 0;
    case '<=': if (a instanceof PySet && b instanceof PySet) return setSub(a, b); return order('<=', a, b) <= 0;
    case '>': if (a instanceof PySet && b instanceof PySet) return b.used < a.used && setSub(b, a); return order('>', a, b) > 0;
    case '>=': if (a instanceof PySet && b instanceof PySet) return setSub(b, a); return order('>=', a, b) >= 0;
    case 'is': return isSame(a, b);
    case 'is not': return !isSame(a, b);
    case 'in': return contains(b, a);
    case 'not in': return !contains(b, a);
  }
  throw new Error('bad compare op ' + op);
}
export function isSame(a, b) {
  if (a === b) return !(typeof a === 'number' && Object.is(a, -b) && a === 0);
  if (sameObj(a, b)) return true;
  // small ints and interned short strings behave as identical in CPython
  if (typeof a === 'bigint' && typeof b === 'bigint') return a === b && a >= -5n && a <= 256n;
  return false;
}
export function contains(container, item) {
  if (typeof container === 'string') {
    if (typeof item !== 'string') throw pyErr('TypeError', `'in <string>' requires string as left operand, not ${typeName(item)}`);
    return container.includes(item);
  }
  if (container instanceof PyList || container instanceof PyTuple || container instanceof PyDeque) {
    for (const x of container.items) if (sameObj(x, item) || eq(x, item)) return true;
    return false;
  }
  if (container instanceof PyDict) return container.has(item);
  if (container instanceof PySet) return container.has(setKeyArg(item));
  if (container instanceof PyRange) {
    if (!isNumber(item)) return false;
    let v;
    if (typeof item === 'number') { if (!Number.isInteger(item)) return false; v = BigInt(item); } else v = toBig(item);
    const { start, stop, step } = container;
    if (step > 0n ? (v < start || v >= stop) : (v > start || v <= stop)) return false;
    return (v - start) % step === 0n;
  }
  if (container instanceof PyDictView) {
    if (container.kind === 'keys') return container.dict.has(item);
    if (container.kind === 'values') { for (const x of container.dict.values()) if (sameObj(x, item) || eq(x, item)) return true; return false; }
    if (!(item instanceof PyTuple) || item.items.length !== 2) return false;
    const w = container.dict.get(item.items[0]);
    return w !== undefined && eq(w, item.items[1]);
  }
  if (container instanceof PyIter) {
    for (let x = container.next(); x !== STOP; x = container.next()) if (eq(x, item)) return true;
    return false;
  }
  if (container instanceof PyHost) {
    const r = hostDunder(container, '__contains__', [item]);
    if (r !== undefined) return truthy(r);
    const next = HOST_HOOKS.iter ? HOST_HOOKS.iter(container) : null;
    if (next) { for (let x = next(); x !== STOP; x = next()) if (sameObj(x, item) || eq(x, item)) return true; return false; }
  }
  throw pyErr('TypeError', `argument of type '${typeName(container)}' is not iterable`);
}
