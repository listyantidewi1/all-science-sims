// minipy — operators, subscripting, slicing, iteration and unpacking with CPython semantics and messages.
import {
  T, STOP, pyErr, typeName, typeOf, isIntLike, isNumber, toBig, toFloat, bitLen, ratioToFloat,
  PyList, PyTuple, PyDict, PySet, PyRange, PyDeque, PySlice, PyIter, PyDictView, PyHost, PyDate, PyDateTime, PyTimedelta, PyTime,
  PyType, PyGenericAlias, PyUnionType, unionOr,
  rangeLen, strLen, strChars, hasSurrogates, compare, eq, truthy, counterOrder, daysInMonth, ordinalToDate, indexSsize, SSIZE_MAX,
  setUnionInto, setIntersection, setDifference, setDifferenceUpdate, setSymDiff, setSymDiffUpdate, isSetView, setViewItems,
  hostDunder, hostBinary, HOST_HOOKS,
} from './values.js';
import { percentFormat } from './numfmt.js';
import { contains, repr } from './values.js';
import { powPos } from './crmath.js';

export const unsupported = (op, a, b) => pyErr('TypeError', `unsupported operand type(s) for ${op}: '${typeName(a)}' and '${typeName(b)}'`);

// ------------------------------------------------------------------ arithmetic
export function add(a, b) {
  const ta = typeof a, tb = typeof b;
  if (ta === 'bigint' && tb === 'bigint') return a + b;
  if (ta === 'string' && tb === 'string') return a + b;
  if (ta === 'number' && tb === 'number') return a + b;
  if (isNumber(a) && isNumber(b)) {
    if (ta === 'number' || tb === 'number') return toFloat(a) + toFloat(b);
    return toBig(a) + toBig(b);
  }
  if (ta === 'string') throw pyErr('TypeError', `can only concatenate str (not "${typeName(b)}") to str`);
  if (a instanceof PyList) { if (b instanceof PyList) return new PyList(a.items.concat(b.items)); throw pyErr('TypeError', `can only concatenate list (not "${typeName(b)}") to list`); }
  if (a instanceof PyTuple) { if (b instanceof PyTuple) return new PyTuple(a.items.concat(b.items)); throw pyErr('TypeError', `can only concatenate tuple (not "${typeName(b)}") to tuple`); }
  if (a instanceof PyDeque) { if (b instanceof PyDeque) { const all = a.items.concat(b.items); return new PyDeque(a.maxlen != null ? all.slice(Math.max(0, all.length - a.maxlen)) : all, a.maxlen); } throw pyErr('TypeError', `can only concatenate deque (not "${typeName(b)}") to deque`); }
  if (a instanceof PyDict && a.ctype === T.Counter && b instanceof PyDict && b.ctype === T.Counter) return counterCombine(a, b, (x, y) => add(x, y), true);
  if (a instanceof PyTimedelta || b instanceof PyTimedelta || a instanceof PyDate || b instanceof PyDate) { const r = dateArith('+', a, b); if (r !== undefined) return r; }
  throw unsupported('+', a, b);
}
export function sub(a, b) {
  const ta = typeof a, tb = typeof b;
  if (ta === 'bigint' && tb === 'bigint') return a - b;
  if (ta === 'number' && tb === 'number') return a - b;
  if (isNumber(a) && isNumber(b)) {
    if (ta === 'number' || tb === 'number') return toFloat(a) - toFloat(b);
    return toBig(a) - toBig(b);
  }
  if (a instanceof PySet && b instanceof PySet) return setDifference(a, b, arr);
  if (a instanceof PyDict && a.ctype === T.Counter && b instanceof PyDict && b.ctype === T.Counter) return counterCombine(a, b, (x, y) => sub(x, y), false);
  if (a instanceof PyTimedelta || b instanceof PyTimedelta || a instanceof PyDate || b instanceof PyDate) { const r = dateArith('-', a, b); if (r !== undefined) return r; }
  throw unsupported('-', a, b);
}
function seqRepeat(seq, n, b) {
  if (!isIntLike(n)) throw pyErr('TypeError', `can't multiply sequence by non-int of type '${typeName(n === seq ? b : n)}'`);
  const kb = indexSsize(toBig(n), 'OverflowError');
  const len = typeof seq === 'string' ? strLen(seq) : seq.items.length;
  if (kb <= 0n || len === 0) return typeof seq === 'string' ? '' : seq instanceof PyList ? new PyList([]) : seq instanceof PyTuple ? new PyTuple([]) : new PyDeque([], seq.maxlen);
  if (typeof seq === 'string' && BigInt(len) * kb > SSIZE_MAX) throw pyErr('OverflowError', 'repeated string is too long');
  if (BigInt(len) * kb > 100000000n) throw pyErr('MemoryError', '');
  const k = Number(kb);
  if (typeof seq === 'string') return seq.repeat(k);
  const items = seq.items;
  if (items.length * k > 1e7) throw pyErr('MemoryError', '');
  const out = [];
  for (let i = 0; i < k; i++) for (const x of items) out.push(x);
  if (seq instanceof PyList) return new PyList(out);
  if (seq instanceof PyTuple) return new PyTuple(out);
  return new PyDeque(seq.maxlen != null ? out.slice(Math.max(0, out.length - seq.maxlen)) : out, seq.maxlen);
}
const isSeq = (v) => typeof v === 'string' || v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque;
export function mul(a, b) {
  const ta = typeof a, tb = typeof b;
  if (ta === 'bigint' && tb === 'bigint') return a * b;
  if (ta === 'number' && tb === 'number') return a * b;
  if (isNumber(a) && isNumber(b)) {
    if (ta === 'number' || tb === 'number') return toFloat(a) * toFloat(b);
    return toBig(a) * toBig(b);
  }
  if (isSeq(a)) { if (isIntLike(b)) return seqRepeat(a, b); if (isSeq(b) || typeof b === 'number' || b === null || typeof b === 'object') { if (isNumber(b) || isSeq(b) || b instanceof PyDict || b instanceof PySet) throw pyErr('TypeError', `can't multiply sequence by non-int of type '${typeName(b)}'`); } throw pyErr('TypeError', `can't multiply sequence by non-int of type '${typeName(b)}'`); }
  if (isSeq(b)) { if (isIntLike(a)) return seqRepeat(b, a); throw pyErr('TypeError', `can't multiply sequence by non-int of type '${typeName(a)}'`); }
  if (a instanceof PyTimedelta && isNumber(b)) return new PyTimedelta(Math.round(a.us * toFloat(b)));
  if (b instanceof PyTimedelta && isNumber(a)) return new PyTimedelta(Math.round(b.us * toFloat(a)));
  throw unsupported('*', a, b);
}
export function truediv(a, b) {
  const ta = typeof a, tb = typeof b;
  if (isNumber(a) && isNumber(b)) {
    if (ta !== 'number' && tb !== 'number') {
      const x = toBig(a), y = toBig(b);
      if (y === 0n) throw pyErr('ZeroDivisionError', 'division by zero');
      if (x === 0n) return y < 0n ? -0 : 0;   // 0 / -7 == -0.0 in CPython
      const r = ratioToFloat(x, y);
      if (!isFinite(r)) throw pyErr('OverflowError', 'integer division result too large for a float');
      return r;
    }
    const x = toFloat(a), y = toFloat(b);
    if (y === 0) throw pyErr('ZeroDivisionError', 'float division by zero');
    return x / y;
  }
  if (a instanceof PyTimedelta && isNumber(b)) { const y = toFloat(b); if (y === 0) throw pyErr('ZeroDivisionError', 'division by zero'); return new PyTimedelta(Math.round(a.us / y)); }
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) { if (b.us === 0) throw pyErr('ZeroDivisionError', 'division by zero'); return a.us / b.us; }
  throw unsupported('/', a, b);
}
function floatDivMod(vx, wx) {
  // C semantics: `if (mod)` / `if (div)` are true for NaN
  let mod = vx % wx;
  let div = (vx - mod) / wx;
  if (mod !== 0) {
    if ((wx < 0) !== (mod < 0)) { mod += wx; div -= 1.0; }
  } else mod = wx < 0 ? -0.0 : 0.0;
  let floordiv;
  if (div !== 0) { floordiv = Math.floor(div); if (div - floordiv > 0.5) floordiv += 1.0; } else floordiv = (vx / wx) < 0 || Object.is(vx / wx, -0) ? -0.0 : 0.0;
  return [floordiv, mod];
}
export function bigFloorDiv(x, y) {
  let q = x / y;
  if ((x % y !== 0n) && ((x < 0n) !== (y < 0n))) q -= 1n;
  return q;
}
export function bigMod(x, y) {
  let r = x % y;
  if (r !== 0n && ((r < 0n) !== (y < 0n))) r += y;
  return r;
}
export function floordiv(a, b) {
  if (isNumber(a) && isNumber(b)) {
    if (typeof a !== 'number' && typeof b !== 'number') {
      const y = toBig(b);
      if (y === 0n) throw pyErr('ZeroDivisionError', 'integer division or modulo by zero');
      return bigFloorDiv(toBig(a), y);
    }
    const x = toFloat(a), y = toFloat(b);
    if (y === 0) throw pyErr('ZeroDivisionError', 'float floor division by zero');
    return floatDivMod(x, y)[0];
  }
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) { if (b.us === 0) throw pyErr('ZeroDivisionError', 'integer division or modulo by zero'); return BigInt(Math.floor(a.us / b.us)); }
  if (a instanceof PyTimedelta && isIntLike(b)) return new PyTimedelta(Math.floor(a.us / Number(toBig(b))));
  throw unsupported('//', a, b);
}
export function mod(a, b) {
  if (typeof a === 'string') return percentFormat(a, b);
  if (isNumber(a) && isNumber(b)) {
    if (typeof a !== 'number' && typeof b !== 'number') {
      const y = toBig(b);
      if (y === 0n) throw pyErr('ZeroDivisionError', 'integer modulo by zero');
      return bigMod(toBig(a), y);
    }
    const x = toFloat(a), y = toFloat(b);
    if (y === 0) throw pyErr('ZeroDivisionError', 'float modulo by zero');
    let m = x % y;
    if (m !== 0) { if ((y < 0) !== (m < 0)) m += y; } else m = y < 0 ? -0.0 : 0.0;
    return m;
  }
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) {
    if (b.us === 0) throw pyErr('ZeroDivisionError', 'integer modulo by zero');
    return new PyTimedelta(Number(bigMod(BigInt(a.us), BigInt(b.us))));
  }
  throw unsupported('%', a, b);
}
export function divmod(a, b) {
  if (isNumber(a) && isNumber(b)) {
    if (typeof a !== 'number' && typeof b !== 'number') {
      const y = toBig(b);
      if (y === 0n) throw pyErr('ZeroDivisionError', 'integer division or modulo by zero');
      const x = toBig(a);
      return new PyTuple([bigFloorDiv(x, y), bigMod(x, y)]);
    }
    const x = toFloat(a), y = toFloat(b);
    if (y === 0) throw pyErr('ZeroDivisionError', 'float divmod()');
    const [d, m] = floatDivMod(x, y);
    return new PyTuple([d, m]);
  }
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) {
    if (b.us === 0) throw pyErr('ZeroDivisionError', 'integer division or modulo by zero');
    const x = BigInt(a.us), y = BigInt(b.us);
    return new PyTuple([bigFloorDiv(x, y), new PyTimedelta(Number(bigMod(x, y)))]);
  }
  throw unsupported('divmod()', a, b);
}

/** CPython's float_pow (Objects/floatobject.c): IEEE specials first, then libm pow (glibc, libm.js) */
export function floatPow(x, y) {
  if (y === 0) return 1.0;
  if (x !== x) return x;
  if (y !== y) return x === 1 ? 1.0 : y;
  const oddInt = Number.isInteger(y) && Math.abs(y) % 2 === 1;
  if (!isFinite(y)) {
    const ax = Math.abs(x);
    if (ax === 1) return 1.0;
    return (y > 0) === (ax > 1) ? Infinity : 0.0;
  }
  if (!isFinite(x)) {
    if (y > 0) return oddInt ? x : Math.abs(x);
    return oddInt ? (x < 0 ? -0.0 : 0.0) : 0.0;
  }
  if (x === 0) {
    if (y < 0) throw pyErr('ZeroDivisionError', '0.0 cannot be raised to a negative power');
    return oddInt ? x : 0.0;
  }
  if (x < 0 && !Number.isInteger(y)) throw pyErr('ValueError', 'minipy does not support complex numbers (negative number raised to a fractional power)');
  // a negative base with an odd integer exponent negates pow(|x|, y); glibc's pow (libm.js, bit-exact) is not
  // always correctly rounded (7.67 ** 3 == 451.217663, x ** 0.5 != sqrt(x) for some x), exactly like CPython
  const neg = x < 0 && oddInt;
  const ax = Math.abs(x);
  if (ax === 1) return neg ? -1.0 : 1.0;
  let r = powPos(ax, y);
  if (neg) r = -r;
  if (!isFinite(r)) throw pyErr('OverflowError', "(34, 'Numerical result out of range')");
  return r;
}
export function pow(a, b) {
  const ta = typeof a, tb = typeof b;
  if (isNumber(a) && isNumber(b)) {
    if (ta !== 'number' && tb !== 'number') {
      const x = toBig(a), y = toBig(b);
      if (y < 0n) {
        if (x === 0n) throw pyErr('ZeroDivisionError', '0.0 cannot be raised to a negative power');
        // CPython (long_pow): a negative exponent converts both operands to float and uses float_pow
        return floatPow(toFloat(x), toFloat(y));
      }
      if (x === 0n || x === 1n) return y === 0n ? 1n : x;
      if (x === -1n) return (y & 1n) ? -1n : 1n;
      if (bitLen(x) * Number(y) > 4e7) throw pyErr('MemoryError', '');
      return x ** y;
    }
    return floatPow(toFloat(a), toFloat(b));
  }
  throw unsupported('** or pow()', a, b);
}
function intOnly(op, a, b) {
  if (!isIntLike(a) || !isIntLike(b)) throw unsupported(op, a, b);
  return [toBig(a), toBig(b)];
}
// dict.keys() / dict.items() operators (Objects/dictobject.c dictviews_*): the result is a set
function viewSet(v) {
  if (v instanceof PySet) return v.copy(false);
  const s = new PySet();
  if (v instanceof PyDictView && v.kind === 'keys') s.mergeDictKeys(v.dict);
  else if (v instanceof PyDict) s.mergeDictKeys(v);
  else for (const x of v instanceof PyDictView ? setViewItems(v) : arr(v)) s.add(x);
  return s;
}
function viewOp(op, a, b) {
  if (op === '&') {
    let self = a, other = b;
    if (!isSetView(self)) { self = b; other = a; }
    const lenSelf = self.dict.size;
    if (other instanceof PySet && !other.frozen && lenSelf <= other.used) return setIntersection(other, viewSet(self), arr);
    if (isSetView(other) && other.dict.size > lenSelf) { const t = other; other = self; self = t; }
    const r = new PySet();
    for (const x of other instanceof PyDictView ? setViewItems(other) : arr(other)) if (contains(self, x)) r.add(x);
    return r;
  }
  const r = viewSet(a);
  if (op === '|') return setUnionInto(r, b, arr);
  if (op === '-') return setDifferenceUpdate(r, b, arr);
  return setSymDiffUpdate(r, b, arr);
}
const HOST_OPS = {
  '+': ['__add__', '__radd__'], '-': ['__sub__', '__rsub__'], '*': ['__mul__', '__rmul__'], '/': ['__truediv__', '__rtruediv__'],
  '//': ['__floordiv__', '__rfloordiv__'], '%': ['__mod__', '__rmod__'], '**': ['__pow__', '__rpow__'], '@': ['__matmul__', '__rmatmul__'],
  '&': ['__and__', '__rand__'], '|': ['__or__', '__ror__'], '^': ['__xor__', '__rxor__'], '<<': ['__lshift__', '__rlshift__'], '>>': ['__rshift__', '__rrshift__'],
};
export function binop(op, a, b) {
  // host objects (opts.modules) with __add__ / __radd__ ... methods
  if ((a instanceof PyHost || b instanceof PyHost) && HOST_OPS[op]) { const r = hostBinary(a, b, HOST_OPS[op][0], HOST_OPS[op][1]); if (r !== undefined) return r; }
  // builtin-implemented Python classes (statistics.NormalDist): their own operators, then the reflected ones
  if (typeof a === 'object' && a !== null && typeof a.pyBinop === 'function') { const r = a.pyBinop(op, b, false); if (r !== undefined) return r; }
  if (typeof b === 'object' && b !== null && typeof b.pyBinop === 'function') { const r = b.pyBinop(op, a, true); if (r !== undefined) return r; }
  if (op === '|' && (a instanceof PyType || b instanceof PyType || a instanceof PyGenericAlias || b instanceof PyGenericAlias || a instanceof PyUnionType || b instanceof PyUnionType)) {
    const u = unionOr(a, b);
    if (u !== undefined) return u;
  }
  if ((op === '&' || op === '|' || op === '-' || op === '^') && (isSetView(a) || isSetView(b))) {
    // a set on the left with a view on the right also ends up in the view's slot (set ops return NotImplemented)
    return viewOp(op, a, b);
  }
  switch (op) {
    case '+': return add(a, b);
    case '-': return sub(a, b);
    case '*': return mul(a, b);
    case '/': return truediv(a, b);
    case '//': return floordiv(a, b);
    case '%': return mod(a, b);
    case '**': return pow(a, b);
    case '&': {
      if (typeof a === 'boolean' && typeof b === 'boolean') return a && b;
      if (a instanceof PySet && b instanceof PySet) return setOp('&', a, b);
      if (a instanceof PyDict && a.ctype === T.Counter && b instanceof PyDict && b.ctype === T.Counter) return counterMinMax(a, b, false);
      const [x, y] = intOnly('&', a, b); return x & y;
    }
    case '|': {
      if (typeof a === 'boolean' && typeof b === 'boolean') return a || b;
      if (a instanceof PySet && b instanceof PySet) return setOp('|', a, b);
      if (a instanceof PyDict && b instanceof PyDict) {
        if (a.ctype === T.Counter && b.ctype === T.Counter) return counterMinMax(a, b, true);
        // Counter.__or__ only takes a Counter (NotImplemented otherwise), so dict's own | makes a plain dict merge
        const ctype = a.ctype === T.Counter || b.ctype === T.Counter ? null : a.ctype;
        const r = new PyDict(ctype);
        if (ctype === T.defaultdict) r.factory = a.factory;
        for (const [k, v] of a.entries()) r.set(k, v); for (const [k, v] of b.entries()) r.set(k, v); return r;
      }
      const [x, y] = intOnly('|', a, b); return x | y;
    }
    case '^': {
      if (typeof a === 'boolean' && typeof b === 'boolean') return a !== b;
      if (a instanceof PySet && b instanceof PySet) return setOp('^', a, b);
      const [x, y] = intOnly('^', a, b); return x ^ y;
    }
    case '<<': {
      const [x, y] = intOnly('<<', a, b);
      if (y < 0n) throw pyErr('ValueError', 'negative shift count');
      if (y > 10000000n) throw pyErr('OverflowError', 'too many digits in integer');
      return x << y;
    }
    case '>>': {
      const [x, y] = intOnly('>>', a, b);
      if (y < 0n) throw pyErr('ValueError', 'negative shift count');
      return x >> y;
    }
    case '@': throw unsupported('@', a, b);
  }
  throw new Error('bad op ' + op);
}
/** augmented assignment: in-place for mutable containers */
export function inplace(op, a, b, I) {
  if (a instanceof PyList) {
    if (op === '+') { const items = I.iterToArray(b); for (const x of items) a.items.push(x); return a; }
    if (op === '*') { const r = seqRepeat(a, b); a.items = r.items; return a; }
  }
  if (a instanceof PySet && b instanceof PySet && (op === '|' || op === '&' || op === '-' || op === '^')) {
    if (op === '|') { setUnionInto(a, b, arr); a.mut++; return a; }
    if (op === '&') { a.swapFrom(setIntersection(a, b, arr)); return a; }
    if (op === '-') return setDifferenceUpdate(a, b, arr);
    return setSymDiffUpdate(a, b, arr);
  }
  // dict |= x accepts whatever dict.update() accepts (a mapping or an iterable of pairs)
  if (a instanceof PyDict && op === '|' && !(a.ctype === T.Counter)) { I.dictUpdate(a, b); return a; }
  if (a instanceof PyDict && a.ctype === T.Counter && b instanceof PyDict && (op === '+' || op === '-' || op === '|' || op === '&')) {
    // Counter.__iadd__ / __isub__ / __ior__ / __iand__ (Lib/collections): any mapping on the right, then
    // _keep_positive()
    const cur = (k) => { const v = a.get(k); return v === undefined ? 0n : v; };
    if (op === '+' || op === '-') for (const [k, v] of b.entries()) a.set(k, op === '+' ? add(cur(k), v) : sub(cur(k), v));
    else if (op === '|') for (const [k, v] of b.entries()) { if (compare('>', v, cur(k))) a.set(k, v); }
    else for (const [k, v] of a.entries()) { const o = getitem(b, k, I); if (compare('<', o, v)) a.set(k, o); }
    for (const [k, v] of a.entries()) if (!compare('>', v, 0n)) a.delete(k);
    return a;
  }
  if (a instanceof PyDeque && op === '+') { const items = I.iterToArray(b); for (const x of items) dequeAppend(a, x); return a; }
  try {
    return binop(op, a, b);
  } catch (e) {
    // CPython names the augmented operator: "unsupported operand type(s) for +=: 'int' and 'str'"
    if (e && e.type && e.type.name === 'TypeError' && typeof e.args[0] === 'string' && e.args[0].startsWith(`unsupported operand type(s) for ${op === '**' ? '** or pow()' : op}:`)) {
      e.args[0] = e.args[0].replace(op === '**' ? '** or pow():' : op + ':', op + '=:');
    }
    throw e;
  }
}
export function dequeAppend(d, x) { d.items.push(x); d.mut++; if (d.maxlen != null && d.items.length > d.maxlen) d.items.shift(); }

const arr = (v) => toArray(v, null);
function setOp(op, a, b) {
  if (op === '|') return setUnionInto(a.copy(), b, arr);
  if (op === '&') return setIntersection(a, b, arr);
  if (op === '^') return setSymDiff(a, b, arr);
  return setDifference(a, b, arr);
}
function counterCombine(a, b, f, plus) {
  const r = new PyDict(T.Counter);
  for (const [k, v] of a.entries()) {
    const w = b.get(k);
    const nv = f(v, w === undefined ? 0n : w);
    if (compare('>', nv, 0n)) r.set(k, nv);
  }
  for (const [k, v] of b.entries()) {
    if (a.has(k)) continue;
    const nv = plus ? v : sub(0n, v);
    if (compare('>', nv, 0n)) r.set(k, nv);
  }
  return r;
}
function counterMinMax(a, b, isMax) {
  const r = new PyDict(T.Counter);
  for (const [k, v] of a.entries()) {
    const w = b.get(k) ?? 0n;
    const nv = isMax ? (compare('<', v, w) ? w : v) : (compare('<', v, w) ? v : w);
    if (compare('>', nv, 0n)) r.set(k, nv);
  }
  if (isMax) for (const [k, v] of b.entries()) if (!a.has(k) && compare('>', v, 0n)) r.set(k, v);
  return r;
}
function dateArith(op, a, b) {
  if (a instanceof PyTimedelta && b instanceof PyTimedelta) return new PyTimedelta(op === '+' ? a.us + b.us : a.us - b.us);
  if (a instanceof PyDate && b instanceof PyTimedelta) return shiftDate(a, op === '+' ? b.us : -b.us);
  if (op === '+' && a instanceof PyTimedelta && b instanceof PyDate) return shiftDate(b, a.us);
  if (op === '-' && a instanceof PyDate && b instanceof PyDate && (a instanceof PyDateTime) === (b instanceof PyDateTime)) return new PyTimedelta(a.ordinalKey() - b.ordinalKey());
  return undefined;
}
function shiftDate(d, us) {
  if (d instanceof PyDateTime) {
    const total = d.ordinalKey() + us;
    const days = Math.floor(total / 86400e6);
    let rem = total - days * 86400e6;
    const [y, m, dd] = ordinalToDate(days);
    const h = Math.floor(rem / 3600e6); rem -= h * 3600e6;
    const mi = Math.floor(rem / 60e6); rem -= mi * 60e6;
    const s = Math.floor(rem / 1e6); rem -= s * 1e6;
    return new PyDateTime(y, m, dd, h, mi, s, Math.round(rem));
  }
  const days = Math.floor(us / 86400e6);
  const [y, m, dd] = ordinalToDate(d.ordinal() + days);
  if (y < 1 || y > 9999) throw pyErr('OverflowError', 'date value out of range');
  void daysInMonth;
  return new PyDate(y, m, dd);
}

// ------------------------------------------------------------------ unary
export function unary(op, a) {
  if (typeof a === 'object' && a !== null && typeof a.pyUnary === 'function') { const r = a.pyUnary(op); if (r !== undefined) return r; }
  if (a instanceof PyHost && op !== 'not') { const r = hostDunder(a, op === '-' ? '__neg__' : op === '+' ? '__pos__' : '__invert__'); if (r !== undefined) return r; }
  switch (op) {
    case 'not': return !truthy(a);
    case '-':
      if (typeof a === 'bigint') return -a;
      if (typeof a === 'number') return -a;
      if (typeof a === 'boolean') return a ? -1n : 0n;
      if (a instanceof PyTimedelta) return new PyTimedelta(-a.us);
      if (a instanceof PyDict && a.ctype === T.Counter) { const r = new PyDict(T.Counter); for (const [k, v] of a.entries()) if (compare('<', v, 0n)) r.set(k, sub(0n, v)); return r; }
      break;
    case '+':
      if (typeof a === 'bigint' || typeof a === 'number') return a;
      if (typeof a === 'boolean') return a ? 1n : 0n;
      if (a instanceof PyTimedelta) return a;
      if (a instanceof PyDict && a.ctype === T.Counter) { const r = new PyDict(T.Counter); for (const [k, v] of a.entries()) if (compare('>', v, 0n)) r.set(k, v); return r; }
      break;
    case '~':
      if (typeof a === 'bigint') return -a - 1n;
      if (typeof a === 'boolean') return a ? -2n : -1n;
      break;
  }
  throw pyErr('TypeError', `bad operand type for unary ${op}: '${typeName(a)}'`);
}

// ------------------------------------------------------------------ indexing
function indexValue(key, what) {
  if (typeof key === 'bigint') return key;
  if (typeof key === 'boolean') return key ? 1n : 0n;
  throw pyErr('TypeError', what(typeName(key)));
}
export function normIndex(key, len, kind, assign) {
  let i = indexValue(key, (tn) => kind === 'str' ? `string indices must be integers, not '${tn}'` : kind === 'deque' ? `sequence index must be integer, not '${tn}'` : kind === 'range' ? `range indices must be integers or slices, not ${tn}` : `${kind} indices must be integers or slices, not ${tn}`);
  if (kind !== 'range') indexSsize(i, 'IndexError');
  if (i < 0n) i += BigInt(len);
  if (i < 0n || i >= BigInt(len)) {
    const what = kind === 'str' ? 'string' : kind === 'range' ? 'range object' : kind;
    throw pyErr('IndexError', `${what} ${assign && kind !== 'deque' ? 'assignment ' : ''}index out of range`);
  }
  return Number(i);
}
function sliceIndex(v) {
  if (v === null) return null;
  if (typeof v === 'bigint') return v;
  if (typeof v === 'boolean') return v ? 1n : 0n;
  throw pyErr('TypeError', 'slice indices must be integers or None or have an __index__ method');
}
/** PySlice_GetIndicesEx → [start, stop, step, length] as Numbers */
export function sliceIndices(sl, len) {
  return sliceIndicesBig(sl, BigInt(len)).map(Number);
}
/** the same with BigInt length and results (ranges can be longer than 2**53) */
export function sliceIndicesBig(sl, L) {
  let step = sliceIndex(sl.step);
  if (step === null) step = 1n;
  if (step === 0n) throw pyErr('ValueError', 'slice step cannot be zero');
  let start = sliceIndex(sl.start), stop = sliceIndex(sl.stop);
  const neg = step < 0n;
  const lower = neg ? -1n : 0n, upper = neg ? L - 1n : L;
  if (start === null) start = neg ? upper : lower;
  else { if (start < 0n) { start += L; if (start < lower) start = lower; } else if (start > upper) start = upper; }
  if (stop === null) stop = neg ? lower : upper;
  else { if (stop < 0n) { stop += L; if (stop < lower) stop = lower; } else if (stop > upper) stop = upper; }
  let n;
  if (neg) n = stop < start ? (start - stop - 1n) / (-step) + 1n : 0n;
  else n = start < stop ? (stop - start - 1n) / step + 1n : 0n;
  return [start, stop, step, n];
}
function sliceArray(arr, sl) {
  const [start, , step, n] = sliceIndices(sl, arr.length);
  if (step === 1) return arr.slice(start, start + n);
  const out = new Array(n);
  for (let i = 0, j = start; i < n; i++, j += step) out[i] = arr[j];
  return out;
}

export function getitem(obj, key, I) {
  if (obj instanceof PyList) {
    if (key instanceof PySlice) return new PyList(sliceArray(obj.items, key));
    return obj.items[normIndex(key, obj.items.length, 'list')];
  }
  if (obj instanceof PyDict) {
    const v = obj.get(key);
    if (v !== undefined) return v;
    if (obj.ctype === T.Counter) return 0n;
    if (obj.ctype === T.defaultdict && obj.factory !== null) { const nv = I.callSync(obj.factory, [], null); obj.set(key, nv); return nv; }
    const e = pyErr('KeyError', key);
    throw e;
  }
  if (typeof obj === 'string') {
    if (key instanceof PySlice) {
      const cs = strChars(obj);
      if (!cs) {
        const [start, , step, n] = sliceIndices(key, obj.length);
        if (step === 1) return obj.substr(start, n);
        let s = ''; for (let i = 0, j = start; i < n; i++, j += step) s += obj[j]; return s;
      }
      return sliceArray(cs, key).join('');
    }
    const cs = strChars(obj);
    if (!cs) return obj[normIndex(key, obj.length, 'str')];
    return cs[normIndex(key, cs.length, 'str')];
  }
  if (obj instanceof PyTuple) {
    if (key instanceof PySlice) return new PyTuple(sliceArray(obj.items, key));
    return obj.items[normIndex(key, obj.items.length, 'tuple')];
  }
  if (obj instanceof PyRange) {
    const len = rangeLen(obj);
    if (key instanceof PySlice) {
      const [start, stop, step] = sliceIndicesBig(key, len);
      return new PyRange(obj.start + start * obj.step, obj.start + stop * obj.step, obj.step * step);
    }
    let i = indexValue(key, (tn) => `range indices must be integers or slices, not ${tn}`);
    if (i < 0n) i += len;
    if (i < 0n || i >= len) throw pyErr('IndexError', 'range object index out of range');
    return obj.start + i * obj.step;
  }
  if (obj instanceof PyDeque) {
    if (key instanceof PySlice) throw pyErr('TypeError', "sequence index must be integer, not 'slice'");
    return obj.items[normIndex(key, obj.items.length, 'deque')];
  }
  if (obj instanceof PyHost && Array.isArray(obj.obj)) return I.fromHost(obj.obj[normIndex(key, obj.obj.length, 'list')]);
  if (obj instanceof PyHost) { const r = hostDunder(obj, '__getitem__', [key]); if (r !== undefined) return r; }
  if (obj instanceof PyDictView) throw pyErr('TypeError', `'${typeName(obj)}' object is not subscriptable`);
  if (obj instanceof PyType) {
    // __class_getitem__ of the generic builtin classes: list[int] is a types.GenericAlias
    if (GENERIC_TYPES.has(obj.name) && (obj.module === 'builtins' || obj.module === 'collections')) return new PyGenericAlias(obj, key instanceof PyTuple ? key.items.slice() : [key]);
    throw pyErr('TypeError', `type '${obj.tpName}' is not subscriptable`);
  }
  if (obj instanceof PyGenericAlias) throw pyErr('TypeError', `${repr(obj)} is not a generic class`);
  throw pyErr('TypeError', `'${typeName(obj)}' object is not subscriptable`);
}
const GENERIC_TYPES = new Set(['list', 'dict', 'tuple', 'set', 'frozenset', 'type', 'enumerate', 'deque', 'defaultdict', 'OrderedDict', 'Counter']);

export function setitem(obj, key, value, I) {
  if (obj instanceof PyList) {
    if (key instanceof PySlice) {
      let src;
      try { src = I.iterToArray(value); } catch (e) {
        if (e && e.type && e.type.name === 'TypeError' && typeof e.args[0] === 'string' && /object is not iterable$/.test(e.args[0])) throw pyErr('TypeError', 'must assign iterable to extended slice');
        throw e;
      }
      const [start, stop, step, n] = sliceIndices(key, obj.items.length);
      if (step === 1) {
        const end = Math.max(start, stop);
        obj.items.splice(start, end - start, ...src);
        return;
      }
      if (src.length !== n) throw pyErr('ValueError', `attempt to assign sequence of size ${src.length} to extended slice of size ${n}`);
      for (let i = 0, j = start; i < n; i++, j += step) obj.items[j] = src[i];
      return;
    }
    obj.items[normIndex(key, obj.items.length, 'list', true)] = value;
    return;
  }
  if (obj instanceof PyDict) { obj.set(key, value); return; }
  if (obj instanceof PyDeque) { obj.items[normIndex(key, obj.items.length, 'deque', true)] = value; return; }
  if (obj instanceof PyHost && Array.isArray(obj.obj)) { obj.obj[normIndex(key, obj.obj.length, 'list', true)] = I.toHost(value); return; }
  if (obj instanceof PyHost && typeof obj.obj.__setitem__ === 'function') { hostDunder(obj, '__setitem__', [key, value]); return; }
  throw pyErr('TypeError', `'${typeName(obj)}' object does not support item assignment`);
}

export function delitem(obj, key) {
  if (obj instanceof PyList) {
    if (key instanceof PySlice) {
      const [start, stop, step, n] = sliceIndices(key, obj.items.length);
      if (step === 1) { obj.items.splice(start, Math.max(0, stop - start)); return; }
      const del = new Set(); for (let i = 0, j = start; i < n; i++, j += step) del.add(j);
      obj.items = obj.items.filter((_, i) => !del.has(i));
      return;
    }
    obj.items.splice(normIndex(key, obj.items.length, 'list', true), 1);
    return;
  }
  if (obj instanceof PyDict) {
    // Counter.__delitem__ ignores a missing key
    if (obj.delete(key) === undefined && obj.ctype !== T.Counter) throw pyErr('KeyError', key);
    return;
  }
  if (obj instanceof PyDeque) { obj.items.splice(normIndex(key, obj.items.length, 'deque', true), 1); obj.mut++; return; }
  if (obj instanceof PyHost && typeof obj.obj.__delitem__ === 'function') { hostDunder(obj, '__delitem__', [key]); return; }
  // PySequence_DelItem says "doesn't" (sequence-like types with an integer key); PyObject_DelItem says "does not"
  const seqLike = typeof obj === 'string' || obj instanceof PyTuple || obj instanceof PyRange || obj instanceof PySet || obj instanceof PyDictView;
  throw pyErr('TypeError', `'${typeName(obj)}' object ${seqLike && isIntLike(key) ? "doesn't" : 'does not'} support item deletion`);
}

// ------------------------------------------------------------------ iteration
export function notIterable(v) { return pyErr('TypeError', `'${typeName(v)}' object is not iterable`); }

/** returns a PyIter (next() → value | STOP) */
export function getIter(v, I) {
  if (v instanceof PyList) { let i = 0; const items = () => v.items; return new PyIter(T.list_iterator, () => { const a = items(); return i < a.length ? a[i++] : STOP; }); }
  if (v instanceof PyRange) {
    let cur = v.start; const stop = v.stop, step = v.step;
    if (step > 0n) return new PyIter(T.range_iterator, () => { if (cur < stop) { const r = cur; cur += step; return r; } return STOP; });
    return new PyIter(T.range_iterator, () => { if (cur > stop) { const r = cur; cur += step; return r; } return STOP; });
  }
  if (typeof v === 'string') {
    if (!hasSurrogates(v)) { let i = 0; return new PyIter(T.str_ascii_iterator, () => i < v.length ? v[i++] : STOP); }
    const it = v[Symbol.iterator]();
    return new PyIter(T.str_iterator, () => { const r = it.next(); return r.done ? STOP : r.value; });
  }
  if (v instanceof PyTuple) { let i = 0; return new PyIter(T.tuple_iterator, () => i < v.items.length ? v.items[i++] : STOP); }
  if (v instanceof PyDict) return dictIter(v, 'keys');
  if (v instanceof PyDictView) return dictIter(v.dict, v.kind);
  if (v instanceof PySet) {
    const ents = v.entries(); const n0 = v.used; let i = 0;
    return new PyIter(T.set_iterator, () => {
      if (v.used !== n0) { throw pyErr('RuntimeError', 'Set changed size during iteration'); }
      return i < ents.length ? ents[i++].k : STOP;
    });
  }
  if (v instanceof PyDeque) {
    let i = 0; const m0 = v.mut;
    return new PyIter(T['collections._deque_iterator'], () => {
      if (v.mut !== m0) throw pyErr('RuntimeError', 'deque mutated during iteration');
      return i < v.items.length ? v.items[i++] : STOP;
    });
  }
  if (v instanceof PyIter) return v;
  if (v instanceof PyHost && Array.isArray(v.obj)) { let i = 0; return new PyIter(T.list_iterator, () => i < v.obj.length ? I.fromHost(v.obj[i++]) : STOP); }
  if (v instanceof PyHost && HOST_HOOKS.iter) { const next = HOST_HOOKS.iter(v); if (next) return new PyIter(T.tuple_iterator, next); }
  if (v && typeof v.pyIter === 'function') return v.pyIter(I);
  throw notIterable(v);
}
function dictIter(d, kind) {
  const it = d.map.values();
  const n0 = d.size;
  const type = kind === 'keys' ? T.dict_keyiterator : kind === 'values' ? T.dict_valueiterator : T.dict_itemiterator;
  // CPython's di->len: an iterator yields at most as many entries as the dict held when it started, so deleting the
  // current key and adding another (same size) is caught too
  let left = n0, dead = false;
  return new PyIter(type, () => {
    if (dead) return STOP;
    if (d.size !== n0) throw pyErr('RuntimeError', 'dictionary changed size during iteration');
    const r = it.next();
    if (r.done) return STOP;
    if (left === 0) { dead = true; throw pyErr('RuntimeError', 'dictionary keys changed during iteration'); }
    left--;
    const e = r.value;
    return kind === 'keys' ? e[0] : kind === 'values' ? e[1] : new PyTuple([e[0], e[1]]);
  });
}
/** fast array of an iterable's items */
export function toArray(v, I) {
  if (v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque) return v.items.slice();
  if (typeof v === 'string') return hasSurrogates(v) ? Array.from(v) : v.split('');
  if (v instanceof PyDict) return v.keys();
  if (v instanceof PyDictView) return v.kind === 'keys' ? v.dict.keys() : v.kind === 'values' ? v.dict.values() : v.dict.entries().map(([k, x]) => new PyTuple([k, x]));
  if (v instanceof PySet) return v.keys();
  if (v instanceof PyRange) {
    const n = rangeLen(v);
    if (n > 10000000n) throw pyErr('MemoryError', '');
    const out = new Array(Number(n)); let c = v.start;
    for (let i = 0; i < out.length; i++) { out[i] = c; c += v.step; }
    return out;
  }
  const it = getIter(v, I);
  const out = [];
  for (let x = it.next(); x !== STOP; x = it.next()) { out.push(x); if (out.length > 10000000) throw pyErr('MemoryError', ''); }
  return out;
}

/** unpack an iterable into n targets with optional starred index */
export function unpack(v, n, star, I) {
  let items;
  if (v instanceof PyList || v instanceof PyTuple) items = v.items;
  else {
    try { getIter(v, I); } catch (e) { if (e.type && e.type.name === 'TypeError' && !(v instanceof PyIter)) throw pyErr('TypeError', `cannot unpack non-iterable ${typeName(v)} object`); throw e; }
    if (star < 0) {
      // stop after n+1 items like CPython
      const it = getIter(v, I);
      items = [];
      for (let x = it.next(); x !== STOP; x = it.next()) { items.push(x); if (items.length > n) break; }
    } else items = toArray(v, I);
  }
  if (star < 0) {
    if (items.length < n) throw pyErr('ValueError', `not enough values to unpack (expected ${n}, got ${items.length})`);
    if (items.length > n) throw pyErr('ValueError', `too many values to unpack (expected ${n})`);
    return items.slice(0, n);
  }
  if (items.length < n - 1) throw pyErr('ValueError', `not enough values to unpack (expected at least ${n - 1}, got ${items.length})`);
  const before = items.slice(0, star);
  const afterCount = n - 1 - star;
  const mid = items.slice(star, items.length - afterCount);
  const after = items.slice(items.length - afterCount);
  return [...before, new PyList(mid), ...after];
}

export { counterOrder, eq, compare, truthy };
