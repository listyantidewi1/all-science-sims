// minipy — importable modules: math, random, statistics, time, collections, datetime, string, sys, copy,
// plus host modules supplied through createRun({ modules }).
import {
  T, EXC, STOP, PyExc, pyErr, typeName, isIntLike, isNumber, toBig, toFloat, floatToRatio, ratioToFloat, bitLen, pyHash,
  PyList, PyTuple, PyDict, PySet, PyRange, PyDeque, PyModule, PyBuiltin, PyFunction, PyHost, PyType, PyDate, PyDateTime, PyTimedelta, PyTime,
  daysInMonth,
  truthy, compare, lt, eq, repr, counterOrder, isinstance, PyIter, getIntMaxStrDigits, setIntMaxStrDigits, surrogateWriteError,
  CallRefusedError, HOST_HOOKS, HOST_CLASS_TYPES, PyDictView, PySlice, NOT_IMPLEMENTED,
} from './values.js';
import { getIter, toArray, add, sub, mul, truediv, floatPow, getitem, setitem, mod as pyMod } from './ops.js';
import { asIndex, isCallable, callType, pySort, pyFuncArgs, pyBind, strftime as strftimeFn, getAttribute, attrError } from './builtins.js';
import { strSeedToInt, MersenneTwister } from './random_mt.js';
import * as CR from './crmath.js';
import { fma as libmFma, fmaBig } from './libm.js';
import { STDLIB_MODULE_NAMES } from './pydata.js';
import { KEYWORDS as KW_LIST, SOFT_KEYWORDS as SOFT_KW_LIST } from './tokenizer.js';

const STDLIB = new Set(STDLIB_MODULE_NAMES);
const PYLIB = '/usr/lib/python3.13/';
const FILES = { random: PYLIB + 'random.py', statistics: PYLIB + 'statistics.py', collections: PYLIB + 'collections/__init__.py', datetime: PYLIB + 'datetime.py', string: PYLIB + 'string.py', copy: PYLIB + 'copy.py' };

function bf(name, f, module) { return new PyBuiltin(name, f, { module }); }
/** a builtin standing for a function written in Python in CPython's library (type 'function', <function f at ...>) */
function pyFunction(b) { b.pyKind = 'function'; return b; }
function noKw(name, kw) { if (kw) for (const k in kw) throw pyErr('TypeError', `${name}() takes no keyword arguments`); }
function nArgs(name, args, n) {
  if (args.length !== n) {
    if (n === 1) throw pyErr('TypeError', `${name}() takes exactly one argument (${args.length} given)`);
    throw pyErr('TypeError', `${name} expected ${n} arguments, got ${args.length}`);
  }
}
function realArg(v) {
  if (typeof v === 'number') return v;
  if (isIntLike(v)) { const f = Number(toBig(v)); if (!isFinite(f)) throw pyErr('OverflowError', 'int too large to convert to float'); return f; }
  throw pyErr('TypeError', `must be real number, not ${typeName(v)}`);
}
const domain = () => pyErr('ValueError', 'math domain error');
const range = () => pyErr('OverflowError', 'math range error');
function checkResult(r, x) {
  if (r !== r && x === x) throw domain();
  if (!isFinite(r) && isFinite(x)) throw range();
  return r;
}
function floatToIntChecked(x) {
  if (x !== x) throw pyErr('ValueError', 'cannot convert float NaN to integer');
  if (!isFinite(x)) throw pyErr('OverflowError', 'cannot convert float infinity to integer');
  return BigInt(x);
}
// exact rationals [n, d] with d > 0
function fracOf(v) {
  if (typeof v === 'number') {
    const [m, e] = floatToRatio(v);
    return e >= 0 ? [m << BigInt(e), 1n] : [m, 1n << BigInt(-e)];
  }
  if (isIntLike(v)) return [toBig(v), 1n];
  throw pyErr('TypeError', `can't convert type '${typeName(v)}' to numerator/denominator`);
}
function gcdBig(a, b) { if (a < 0n) a = -a; if (b < 0n) b = -b; while (b) { [a, b] = [b, a % b]; } return a; }
function fnorm(n, d) { if (d < 0n) { n = -n; d = -d; } const g = gcdBig(n, d) || 1n; return [n / g, d / g]; }
function fadd(a, b) { return fnorm(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
function isqrtBig(n) {
  if (n < 0n) throw pyErr('ValueError', 'isqrt() argument must be nonnegative');
  if (n < 2n) return n;
  // Newton's method from a power of two >= sqrt(n): the iterates decrease monotonically to floor(sqrt(n))
  let x = 1n << BigInt(Math.ceil(bitLen(n) / 2));
  for (;;) { const y = (x + n / x) >> 1n; if (y >= x) return x; x = y; }
}
/** correctly rounded float sqrt of the rational n/m (statistics._float_sqrt_of_frac) */
function floatSqrtOfFrac(n, m) {
  const rto = (a, b) => { const r = isqrtBig(a / b); return r | ((r * r * b !== a) ? 1n : 0n); };
  const q = Math.floor((bitLen(n) - bitLen(m) - 109) / 2);
  let num, den;
  if (q >= 0) { num = rto(n, m << BigInt(2 * q)) << BigInt(q); den = 1n; } else { num = rto(n << BigInt(-2 * q), m); den = 1n << BigInt(-q); }
  return ratioToFloat(num, den);
}

// ------------------------------------------------------------------ math
/** math.hypot of JS numbers: the correctly rounded sqrt of the exact sum of squares, like CPython */
export function hypotValues(xs) {
  if (xs.some((x) => x === Infinity || x === -Infinity)) return Infinity;
  if (xs.some((x) => x !== x)) return NaN;
  let sum = [0n, 1n];
  for (const x of xs) { const fr = fracOf(x); sum = fadd(sum, [fr[0] * fr[0], fr[1] * fr[1]]); }
  if (sum[0] === 0n) return 0.0;
  return floatSqrtOfFrac(sum[0], sum[1]);
}
function makeMath(I) {
  const d = new Map();
  const f1 = (name, fn) => d.set(name, bf(name, (I2, a, kw) => { noKw('math.' + name, kw); nArgs('math.' + name, a, 1); return fn(a[0]); }, 'math'));
  const real1 = (name, fn) => f1(name, (x) => { const v = realArg(x); return checkResult(fn(v), v); });
  d.set('pi', Math.PI); d.set('e', Math.E); d.set('tau', 2 * Math.PI); d.set('inf', Infinity); d.set('nan', NaN);
  // like CPython's math_1: an int argument is converted to float first (OverflowError when it does not fit)
  f1('sqrt', (x) => { const v = realArg(x); if (v < 0) throw domain(); return Math.sqrt(v); });
  f1('floor', (x) => { if (isIntLike(x)) return toBig(x); return floatToIntChecked(Math.floor(realArg(x))); });
  f1('ceil', (x) => { if (isIntLike(x)) return toBig(x); return floatToIntChecked(Math.ceil(realArg(x))); });
  f1('trunc', (x) => {
    if (isIntLike(x)) return toBig(x);
    if (typeof x !== 'number') throw pyErr('TypeError', `type ${typeName(x)} doesn't define __trunc__ method`);
    return floatToIntChecked(Math.trunc(x));
  });
  // frexp / ldexp / remainder / nextafter / fma: IEEE-754 helpers like the C library CPython calls
  const bits = new DataView(new ArrayBuffer(8));
  const toBits = (x) => { bits.setFloat64(0, x); return bits.getBigUint64(0); };
  const fromBits = (b) => { bits.setBigUint64(0, BigInt.asUintN(64, b)); return bits.getFloat64(0); };
  f1('frexp', (x) => {
    const v = realArg(x);
    if (v === 0 || !isFinite(v)) return new PyTuple([v, 0n]);
    const [m, e] = floatToRatio(v);              // v = m * 2**e, m odd
    const n = bitLen(m < 0n ? -m : m);
    return new PyTuple([ratioToFloat(m, 1n << BigInt(n)), BigInt(e + n)]);
  });
  d.set('ldexp', bf('ldexp', (I2, a, kw) => {
    noKw('math.ldexp', kw); nArgs('ldexp', a, 2);
    const x = realArg(a[0]);
    if (!isIntLike(a[1])) throw pyErr('TypeError', 'Expected an int as second argument to ldexp.');
    let e = toBig(a[1]);
    if (x === 0 || !isFinite(x)) return x;
    if (e > 4000n) throw range();
    if (e < -4000n) return x < 0 ? -0.0 : 0.0;
    const [m, e0] = floatToRatio(x);
    const ex = e0 + Number(e);
    const r = ex >= 0 ? (ex > 1100 ? (x < 0 ? -Infinity : Infinity) : ratioToFloat(m << BigInt(ex), 1n)) : ratioToFloat(m, 1n << BigInt(-ex));
    if (!isFinite(r)) throw range();
    return r === 0 && x < 0 ? -0.0 : r;
  }, 'math'));
  d.set('remainder', bf('remainder', (I2, a, kw) => {
    noKw('math.remainder', kw); nArgs('remainder', a, 2);
    const x = realArg(a[0]), y = realArg(a[1]);
    let r;
    if (isFinite(x) && isFinite(y)) {
      if (y === 0) throw domain();
      const ax = Math.abs(x), ay = Math.abs(y), m = ax % ay, c = ay - m;
      if (m < c) r = m; else if (m > c) r = -c; else r = m - 2.0 * ((0.5 * (ax - m)) % ay);
      r = (x < 0 || Object.is(x, -0) ? -1 : 1) * r;
    } else if (x !== x) r = x;
    else if (y !== y) r = y;
    else if (!isFinite(x)) throw domain();
    else r = x;
    return r;
  }, 'math'));
  d.set('nextafter', bf('nextafter', (I2, a, kw) => {
    const o = pyBind('nextafter', a, kw, ['x', 'y'], 0, false, ['steps']);
    const x = realArg(o.x), y = realArg(o.y);
    let steps = 1n;
    if (o.steps !== undefined && o.steps !== null) {
      steps = asIndex(o.steps);
      if (steps < 0n) throw pyErr('ValueError', 'steps must be a non-negative integer');
      if (steps > 0xffffffffffffffffn) steps = 0xffffffffffffffffn;
      if (steps === 0n) return x;
    }
    if (x !== x) return x;
    if (y !== y) return y;
    if (o.steps === undefined || o.steps === null) {
      // C nextafter()
      if (x === y) return y;
      if (x === 0) return y < 0 ? -5e-324 : 5e-324;
      return fromBits(toBits(x) + ((x < y) === (x > 0) ? 1n : -1n));
    }
    const ux = toBits(x), uy = toBits(y);
    if (ux === uy) return x;
    const SIGN = 1n << 63n;
    const ax = ux & ~SIGN, ay = uy & ~SIGN;
    if ((ux ^ uy) & SIGN) {
      if (ax + ay <= steps) return y;
      if (ax < steps) return fromBits((uy & SIGN) | (steps - ax));
      return fromBits(ux - steps);
    }
    if (ax > ay) return ax - ay >= steps ? fromBits(ux - steps) : y;
    return ay - ax >= steps ? fromBits(ux + steps) : y;
  }, 'math'));
  d.set('fma', bf('fma', (I2, a, kw) => {
    noKw('math.fma', kw); nArgs('fma', a, 3);
    const x = realArg(a[0]), y = realArg(a[1]), z = realArg(a[2]);
    let r;
    if (!isFinite(x) || !isFinite(y) || !isFinite(z) || x === 0 || y === 0) r = x * y + z;
    else { const p = x * y; r = p === 0 || !isFinite(p) ? fmaBig(x, y, z) : libmFma(x, y, z); }
    if (r !== r && x === x && y === y && z === z) throw pyErr('ValueError', 'invalid operation in fma');
    if (!isFinite(r) && r === r && isFinite(x) && isFinite(y) && isFinite(z)) throw pyErr('OverflowError', 'overflow in fma');
    return r;
  }, 'math'));
  f1('fabs', (x) => Math.abs(realArg(x)));
  real1('exp', CR.exp);
  real1('exp2', CR.exp2);
  real1('expm1', CR.expm1);
  // sin/cos/tan(nan) is nan; sin(inf) gives nan from a non-nan input → "math domain error" (checkResult)
  real1('sin', CR.sin);
  real1('cos', CR.cos);
  real1('tan', CR.tan);
  real1('asin', (x) => { if (x < -1 || x > 1) throw domain(); return CR.asin(x); });
  real1('acos', (x) => { if (x < -1 || x > 1) throw domain(); return CR.acos(x); });
  real1('atan', CR.atan);
  real1('sinh', CR.sinh); real1('cosh', CR.cosh); real1('tanh', CR.tanh);
  real1('asinh', CR.asinh); real1('acosh', (x) => { if (x < 1) throw domain(); return CR.acosh(x); }); real1('atanh', (x) => { if (x <= -1 || x >= 1) throw domain(); return CR.atanh(x); });
  real1('cbrt', CR.cbrt);
  real1('log1p', (x) => { if (x <= -1) throw domain(); return CR.log1p(x); });
  f1('radians', (x) => realArg(x) * (Math.PI / 180.0));
  f1('degrees', (x) => realArg(x) * (180.0 / Math.PI));
  // CPython's loghelper: an int that fits a double is converted (then libm); a larger one is split with
  // _PyLong_Frexp into m * 2**e (m in [0.5, 1), correctly rounded) and gives func(m) + func(2.0) * e
  const logHelper = (x, func) => {
    if (isIntLike(x)) {
      const n = toBig(x);
      if (n <= 0n) throw domain();
      const f = Number(n);
      if (isFinite(f)) return func(f);
      let e = bitLen(n);
      let m = ratioToFloat(n, 1n << BigInt(e));
      if (m === 1) { m = 0.5; e++; }
      return func(m) + func(2.0) * e;
    }
    const v = realArg(x);
    if (v <= 0) { if (v !== v) return v; throw domain(); }
    return func(v);
  };
  const logOf = (x) => logHelper(x, CR.log);
  d.set('log', bf('log', (I2, a, kw) => {
    noKw('log', kw);
    if (a.length < 1 || a.length > 2) throw pyErr('TypeError', a.length < 1 ? 'log expected at least 1 argument, got 0' : `log expected at most 2 arguments, got ${a.length}`);
    const num = logOf(a[0]);
    if (a.length === 1) return num;
    const den = logOf(a[1]);
    if (den === 0) throw pyErr('ZeroDivisionError', 'float division by zero');
    return num / den;
  }, 'math'));
  f1('log10', (x) => logHelper(x, CR.log10));
  f1('log2', (x) => logHelper(x, CR.log2));
  d.set('pow', bf('pow', (I2, a, kw) => {
    noKw('pow', kw); nArgs('pow', a, 2);
    const x = realArg(a[0]), y = realArg(a[1]);
    if (x === 0 && y < 0 && isFinite(y)) throw domain();
    if (x < 0 && isFinite(x) && isFinite(y) && !Number.isInteger(y)) throw domain();
    let r;
    try { r = floatPow(x, y); } catch (e) { if (e instanceof PyExc && e.type === EXC.OverflowError) throw range(); throw e; }
    return r;
  }, 'math'));
  d.set('atan2', bf('atan2', (I2, a, kw) => { noKw('atan2', kw); nArgs('atan2', a, 2); return CR.atan2(realArg(a[0]), realArg(a[1])); }, 'math'));
  d.set('copysign', bf('copysign', (I2, a) => { nArgs('copysign', a, 2); const x = realArg(a[0]), y = realArg(a[1]); const neg = y < 0 || Object.is(y, -0); return neg ? -Math.abs(x) : Math.abs(x); }, 'math'));
  d.set('fmod', bf('fmod', (I2, a) => { nArgs('fmod', a, 2); const x = realArg(a[0]), y = realArg(a[1]); if (y === 0 || !isFinite(x)) { if (x !== x || y !== y) return NaN; throw domain(); } return x % y; }, 'math'));
  f1('modf', (x) => { const v = realArg(x); if (!isFinite(v)) return new PyTuple([v !== v ? v : (v > 0 ? 0.0 : -0.0), v]); const ip = Math.trunc(v); const fr = v - ip; return new PyTuple([fr === 0 && (v < 0 || Object.is(v, -0)) ? -0 : fr, ip]); });
  f1('isfinite', (x) => isFinite(realArg(x)));
  f1('isinf', (x) => { const v = realArg(x); return v === Infinity || v === -Infinity; });
  f1('isnan', (x) => { const v = realArg(x); return v !== v; });
  const intArgs = (name, a) => a.map((v) => asIndex(v));
  d.set('gcd', bf('gcd', (I2, a) => { let g = 0n; for (const v of intArgs('gcd', a)) g = gcdBig(g, v); return g; }, 'math'));
  d.set('lcm', bf('lcm', (I2, a) => { let l = 1n; if (!a.length) return 1n; for (const v0 of intArgs('lcm', a)) { const v = v0 < 0n ? -v0 : v0; if (v === 0n) return 0n; l = l / gcdBig(l, v) * v; } return l; }, 'math'));
  f1('factorial', (x) => {
    const n = asIndex(x);
    if (n < 0n) throw pyErr('ValueError', 'factorial() not defined for negative values');
    if (n > 100000n) throw pyErr('OverflowError', 'factorial() argument should not exceed 9223372036854775807');
    let r = 1n; for (let i = 2n; i <= n; i++) r *= i; return r;
  });
  f1('isqrt', (x) => isqrtBig(asIndex(x)));
  d.set('comb', bf('comb', (I2, a) => {
    nArgs('comb', a, 2); const n = asIndex(a[0]); let k = asIndex(a[1]);
    if (n < 0n) throw pyErr('ValueError', 'n must be a non-negative integer');
    if (k < 0n) throw pyErr('ValueError', 'k must be a non-negative integer');
    if (k > n) return 0n;
    if (k > n - k) k = n - k;
    let r = 1n; for (let i = 1n; i <= k; i++) r = r * (n - k + i) / i; return r;
  }, 'math'));
  d.set('perm', bf('perm', (I2, a) => {
    if (a.length < 1 || a.length > 2) throw pyErr('TypeError', `perm expected at most 2 arguments, got ${a.length}`);
    const n = asIndex(a[0]); const k = a.length > 1 && a[1] !== null ? asIndex(a[1]) : n;
    if (n < 0n) throw pyErr('ValueError', 'n must be a non-negative integer');
    if (k < 0n) throw pyErr('ValueError', 'k must be a non-negative integer');
    if (k > n) return 0n;
    let r = 1n; for (let i = 0n; i < k; i++) r *= n - i; return r;
  }, 'math'));
  d.set('hypot', bf('hypot', (I2, a) => hypotValues(a.map(realArg)), 'math'));
  d.set('dist', bf('dist', (I2, a) => {
    nArgs('dist', a, 2);
    const p = toArray(a[0], I).map(realArg), q = toArray(a[1], I).map(realArg);
    if (p.length !== q.length) throw pyErr('ValueError', 'both points must have the same number of dimensions');
    let sum = [0n, 1n];
    for (let i = 0; i < p.length; i++) { const fr = fracOf(Math.abs(p[i] - q[i])); sum = fadd(sum, [fr[0] * fr[0], fr[1] * fr[1]]); }
    return sum[0] === 0n ? 0.0 : floatSqrtOfFrac(sum[0], sum[1]);
  }, 'math'));
  d.set('fsum', bf('fsum', (I2, a, kw) => { noKw('math.fsum', kw); nArgs('fsum', a, 1); return fsumValues(toArray(a[0], I)); }, 'math'));
  d.set('sumprod', bf('sumprod', (I2, a, kw) => {
    noKw('math.sumprod', kw);
    if (a.length !== 2) throw pyErr('TypeError', `sumprod expected 2 arguments, got ${a.length}`);
    return sumprodValues(toArray(a[0], I), toArray(a[1], I));
  }, 'math'));
  d.set('prod', bf('prod', (I2, a, kw) => {
    if (a.length !== 1) throw pyErr('TypeError', `prod() takes exactly 1 positional argument (${a.length} given)`);
    let r = kw && 'start' in kw ? kw.start : 1n;
    for (const v of toArray(a[0], I)) r = mul(r, v);
    return r;
  }, 'math'));
  d.set('isclose', bf('isclose', (I2, a, kw) => {
    if (a.length !== 2) throw pyErr('TypeError', `isclose() takes exactly 2 positional arguments (${a.length} given)`);
    const x = realArg(a[0]), y = realArg(a[1]);
    const rel = kw && 'rel_tol' in kw ? realArg(kw.rel_tol) : 1e-9, abs = kw && 'abs_tol' in kw ? realArg(kw.abs_tol) : 0.0;
    if (rel < 0 || abs < 0) throw pyErr('ValueError', 'tolerances must be non-negative');
    if (x === y) return true;
    if (!isFinite(x) || !isFinite(y)) return false;
    const diff = Math.abs(y - x);
    return (diff <= Math.abs(rel * y)) || (diff <= Math.abs(rel * x)) || (diff <= abs);
  }, 'math'));
  f1('ulp', (x) => { const v = Math.abs(realArg(x)); if (!isFinite(v)) return v; if (v === Number.MAX_VALUE) return 1.9958403095347198e292; const buf = new Float64Array([v]); const u = new BigUint64Array(buf.buffer); u[0] += 1n; return buf[0] - v; });
  // erf/erfc: glibc's algorithms; gamma/lgamma: CPython's own Lanczos code (math_1a error handling)
  const math1a = (fn) => (x) => {
    const { v, errno } = fn(x);
    if (errno === 'EDOM') throw domain();
    if (errno === 'ERANGE' && Math.abs(v) >= 1.5) throw range();
    return v;
  };
  real1('erf', (x) => CR.erf(x));
  real1('erfc', (x) => CR.erfc(x));
  real1('gamma', math1a(CR.tgamma));
  real1('lgamma', math1a(CR.lgamma));
  return new PyModule('math', d);
}
// ------------------------------------------------------------------ random
/** the methods of a random.Random instance using the Mersenne Twister R: name → (I, args, kw) => value */
function randomMethods(I, R) {
  const M = Object.create(null);
  const m = (name, fn) => { M[name] = fn; };
  const index = (v) => asIndex(v);
  const randbelow = (n) => R.randbelow(n);
  m('seed', (I2, a, kw) => {
    const o = pyBind('Random.seed', a, kw, ['a', 'version'], 2, true);
    let x = o.a === undefined ? null : o.a;
    if (typeof x === 'string' && o.version !== undefined && eq(o.version, 1n)) {
      // version 1: the old Python 2 string hash (Lib/random.py)
      const cps = Array.from(x, (c) => BigInt(c.codePointAt(0)));
      let h = cps.length ? cps[0] << 7n : 0n;
      for (const c of cps) h = ((1000003n * h) ^ c) & 0xFFFFFFFFFFFFFFFFn;
      h ^= BigInt(cps.length);
      x = h === -1n ? -2n : h;
    }
    seedRandom(R, x);
    return null;
  });
  m('random', (I2, a, kw) => {
    if (kw) for (const k in kw) { void k; throw pyErr('TypeError', 'Random.random() takes no keyword arguments'); }
    if (a.length) throw pyErr('TypeError', `Random.random() takes no arguments (${a.length} given)`);
    return R.random();
  });
  m('getrandbits', (I2, a) => { nArgs('getrandbits', a, 1); const k = index(a[0]); if (k < 0n) throw pyErr('ValueError', 'number of bits must be non-negative'); return k === 0n ? 0n : R.getrandbits(Number(k)); });
  m('uniform', (I2, a, kw) => { const o = pyBind('Random.uniform', a, kw, ['a', 'b'], 0, true); return add(o.a, mul(sub(o.b, o.a), R.random())); });
  const randrange = (start, stop, step) => {
    const istart = index(start);
    if (stop === undefined || stop === null) {
      if (step !== undefined) throw pyErr('TypeError', 'Missing a non-None stop argument');
      if (istart > 0n) return randbelow(istart);
      throw pyErr('ValueError', 'empty range for randrange()');
    }
    const istop = index(stop);
    const width = istop - istart;
    const istep = step === undefined ? 1n : index(step);
    if (istep === 1n) {
      if (width > 0n) return istart + randbelow(width);
      throw pyErr('ValueError', `empty range in randrange(${repr(start)}, ${repr(stop)})`);
    }
    let n;
    if (istep > 0n) n = floorDiv(width + istep - 1n, istep);
    else if (istep < 0n) n = floorDiv(width + istep + 1n, istep);
    else throw pyErr('ValueError', 'zero step for randrange()');
    if (n <= 0n) throw pyErr('ValueError', `empty range in randrange(${repr(start)}, ${repr(stop)}, ${repr(step)})`);
    return istart + istep * randbelow(n);
  };
  m('randrange', (I2, a, kw) => {
    const o = pyBind('Random.randrange', a, kw, ['start', 'stop', 'step'], 2, true);
    return randrange(o.start, o.stop, o.step);
  });
  m('randint', (I2, a, kw) => {
    const o = pyBind('Random.randint', a, kw, ['a', 'b'], 0, true);
    return randrange(o.a, add(o.b, 1n));
  });
  // len(seq) / seq[i] exactly as random.py does them (works for any sized, subscriptable object)
  const seqLen = (seq) => Number(I.callSync(I.builtins.get('len'), [seq], null));
  const seqGet = (seq, i) => {
    if ((seq instanceof PyList || seq instanceof PyTuple) && i >= 0 && i < seq.items.length) return seq.items[i];
    return getitem(seq, BigInt(i), I);
  };
  m('choice', (I2, a, kw) => {
    const o = pyBind('Random.choice', a, kw, ['seq'], 0, true);
    const n = seqLen(o.seq);
    if (!n) throw pyErr('IndexError', 'Cannot choose from an empty sequence');
    return seqGet(o.seq, Number(randbelow(BigInt(n))));
  });
  m('shuffle', (I2, a, kw) => {
    const o = pyBind('Random.shuffle', a, kw, ['x'], 0, true);
    const x = o.x;
    const n = seqLen(x);
    if (x instanceof PyList) {
      const it = x.items;
      for (let i = n - 1; i >= 1; i--) { const j = Number(randbelow(BigInt(i + 1))); const t = it[i]; it[i] = it[j]; it[j] = t; }
      return null;
    }
    for (let i = n - 1; i >= 1; i--) {
      const j = Number(randbelow(BigInt(i + 1)));
      const xj = getitem(x, BigInt(j), I), xi = getitem(x, BigInt(i), I);
      setitem(x, BigInt(i), xj, I); setitem(x, BigInt(j), xi, I);
    }
    return null;
  });
  m('sample', (I2, a, kw) => {
    const o = pyBind('Random.sample', a, kw, ['population', 'k'], 0, true, ['counts']);
    return sample(o.population, o.k, o.counts === undefined ? null : o.counts);
  });
  const sample = (pop, kArg, counts) => {
    if (!(pop instanceof PyList || pop instanceof PyTuple || typeof pop === 'string' || pop instanceof PyRange || pop instanceof PyDeque)) throw pyErr('TypeError', 'Population must be a sequence.  For dicts or sets, use sorted(d).');
    const n = seqLen(pop);
    if (counts !== null) {
      // repeated elements: sample range(total) and map each pick through the cumulative counts (bisect_right)
      const cum = [];
      let acc = null;
      for (const c of toArray(counts, I)) { acc = acc === null ? c : add(acc, c); cum.push(acc); }
      if (cum.length !== n) throw pyErr('ValueError', 'The number of counts does not match the population');
      const total = cum.length ? cum.pop() : 0n;
      if (!isIntLike(total)) throw pyErr('TypeError', 'Counts must be integers');
      if (compare('<', total, 0n)) throw pyErr('ValueError', 'Counts must be non-negative');
      const sel = sample(new PyRange(0n, toBig(total), 1n), kArg, null);
      return new PyList(sel.items.map((x) => {
        let lo = 0, hi = cum.length;
        while (lo < hi) { const mid = (lo + hi) >> 1; if (compare('<', x, cum[mid])) hi = mid; else lo = mid + 1; }
        return seqGet(pop, lo);
      }));
    }
    const o = { k: kArg };
    if (!(compare('<=', 0n, o.k) && compare('<=', o.k, BigInt(n)))) throw pyErr('ValueError', 'Sample larger than population or is negative');
    const k = Number(index(o.k));
    const result = new Array(k).fill(null);
    let setsize = 21;
    if (k > 5) setsize += 4 ** Math.ceil(CR.log(k * 3) / CR.log(4));
    if (n <= setsize) {
      const pool = toArray(pop, I);
      for (let i = 0; i < k; i++) { const j = Number(randbelow(BigInt(n - i))); result[i] = pool[j]; pool[j] = pool[n - i - 1]; }
    } else {
      const selected = new Set();
      for (let i = 0; i < k; i++) { let j = Number(randbelow(BigInt(n))); while (selected.has(j)) j = Number(randbelow(BigInt(n))); selected.add(j); result[i] = seqGet(pop, j); }
    }
    return new PyList(result);
  };
  m('choices', (I2, a, kw) => {
    const o = pyBind('Random.choices', a, kw, ['population', 'weights'], 1, true, ['cum_weights', 'k']);
    const pop = o.population;
    const weights = o.weights === undefined ? null : o.weights;
    let cum = o.cum_weights === undefined ? null : o.cum_weights;
    const kk = o.k === undefined ? 1n : o.k;
    const n = seqLen(pop);
    const reps = () => { const k = Number(index(kk)); return k < 0 ? 0 : k; };
    const out = [];
    if (cum === null) {
      if (weights === null) { const k = reps(); for (let i = 0; i < k; i++) out.push(seqGet(pop, Math.floor(R.random() * n))); return new PyList(out); }
      cum = []; let acc = null;
      try { for (const w of toArray(weights, I)) { acc = acc === null ? w : add(acc, w); cum.push(acc); } } catch (e) {
        if (e instanceof PyExc && e.type === EXC.TypeError && isIntLike(weights)) throw pyErr('TypeError', `The number of choices must be a keyword argument: k=${repr(weights)}`);
        throw e;
      }
    } else {
      if (weights !== null) throw pyErr('TypeError', 'Cannot specify both weights and cumulative weights');
      cum = toArray(cum, I);
    }
    if (cum.length !== n) throw pyErr('ValueError', 'The number of weights does not match the population');
    const total = toFloat(add(cum[cum.length - 1], 0.0));
    if (total <= 0) throw pyErr('ValueError', 'Total of weights must be greater than zero');
    if (!isFinite(total)) throw pyErr('ValueError', 'Total of weights must be finite');
    const hi = n - 1;
    const k = reps();
    for (let i = 0; i < k; i++) {
      const x = R.random() * total;
      let lo = 0, h = hi;
      while (lo < h) { const mid = (lo + h) >> 1; if (compare('<', x, cum[mid])) h = mid; else lo = mid + 1; }
      out.push(seqGet(pop, lo));
    }
    return new PyList(out);
  });
  const NV_MAGICCONST = 4 * CR.exp(-0.5) / Math.sqrt(2.0);
  const normal = (mu, sigma) => {
    let z;
    for (;;) { const u1 = R.random(); const u2 = 1.0 - R.random(); z = NV_MAGICCONST * (u1 - 0.5) / u2; const zz = z * z / 4.0; if (zz <= -CR.log(u2)) break; }
    return add(mu, mul(z, sigma));
  };
  m('normalvariate', (I2, a, kw) => {
    const o = pyBind('Random.normalvariate', a, kw, ['mu', 'sigma'], 2, true);
    return normal(o.mu === undefined ? 0.0 : o.mu, o.sigma === undefined ? 1.0 : o.sigma);
  });
  // the other distributions of Lib/random.py, with the same draws from random()
  const pyLog = (x) => { if (!(x > 0)) { if (x === 0 || x < 0) throw domain(); } return CR.log(x); };
  m('lognormvariate', (I2, a, kw) => {
    const o = pyBind('Random.lognormvariate', a, kw, ['mu', 'sigma'], 0, true);
    const v = toFloat(normal(o.mu, o.sigma));
    return checkResult(CR.exp(v), v);
  });
  const LOG4 = CR.log(4.0), SG_MAGICCONST = 1.0 + CR.log(4.5), TWOPI = 2.0 * Math.PI;
  const gamma = (alpha, beta) => {
    if (compare('<=', alpha, 0.0) || compare('<=', beta, 0.0)) throw pyErr('ValueError', 'gammavariate: alpha and beta must be > 0.0');
    const al = toFloat(alpha);
    if (al > 1.0) {
      const ainv = Math.sqrt(2.0 * al - 1.0), bbb = al - LOG4, ccc = al + ainv;
      for (;;) {
        const u1 = R.random();
        if (!(1e-7 < u1 && u1 < 0.9999999)) continue;
        const u2 = 1.0 - R.random();
        const v = pyLog(u1 / (1.0 - u1)) / ainv;
        const x = al * CR.exp(v);
        const z = u1 * u1 * u2;
        const r = bbb + ccc * v - x;
        if (r + SG_MAGICCONST - 4.5 * z >= 0.0 || r >= pyLog(z)) return mul(x, beta);
      }
    }
    if (al === 1.0) return mul(-pyLog(1.0 - R.random()), beta);
    let x;
    for (;;) {
      const u = R.random();
      const b = (Math.E + al) / Math.E;
      const p = b * u;
      x = p <= 1.0 ? floatPow(p, 1.0 / al) : -pyLog((b - p) / al);
      const u1 = R.random();
      if (p > 1.0) { if (u1 <= floatPow(x, al - 1.0)) break; } else if (u1 <= CR.exp(-x)) break;
    }
    return mul(x, beta);
  };
  m('gammavariate', (I2, a, kw) => { const o = pyBind('Random.gammavariate', a, kw, ['alpha', 'beta'], 0, true); return gamma(o.alpha, o.beta); });
  m('betavariate', (I2, a, kw) => {
    const o = pyBind('Random.betavariate', a, kw, ['alpha', 'beta'], 0, true);
    const y = gamma(o.alpha, 1.0);
    if (truthy(y)) return truediv(y, add(y, gamma(o.beta, 1.0)));
    return 0.0;
  });
  m('paretovariate', (I2, a, kw) => {
    const o = pyBind('Random.paretovariate', a, kw, ['alpha'], 0, true);
    const u = 1.0 - R.random();
    return floatPow(u, toFloat(truediv(-1.0, o.alpha)));
  });
  m('weibullvariate', (I2, a, kw) => {
    const o = pyBind('Random.weibullvariate', a, kw, ['alpha', 'beta'], 0, true);
    const u = 1.0 - R.random();
    return mul(o.alpha, floatPow(-pyLog(u), toFloat(truediv(1.0, o.beta))));
  });
  m('vonmisesvariate', (I2, a, kw) => {
    const o = pyBind('Random.vonmisesvariate', a, kw, ['mu', 'kappa'], 0, true);
    const kappa = toFloat(o.kappa);
    if (kappa <= 1e-6) return TWOPI * R.random();
    const s = 0.5 / kappa, r = s + Math.sqrt(1.0 + s * s);
    let z;
    for (;;) {
      const u1 = R.random();
      z = CR.cos(Math.PI * u1);
      const dd = z / (r + z);
      const u2 = R.random();
      if (u2 < 1.0 - dd * dd || u2 <= (1.0 - dd) * CR.exp(dd)) break;
    }
    const q = 1.0 / r;
    const f = (q + z) / (1.0 + q * z);
    const u3 = R.random();
    const acos = (v) => { if (v < -1 || v > 1) throw domain(); return CR.acos(v); };
    return u3 > 0.5 ? pyMod(add(o.mu, acos(f)), TWOPI) : pyMod(sub(o.mu, acos(f)), TWOPI);
  });
  const binomial = (n, p) => {
    if (compare('<', n, 0n)) throw pyErr('ValueError', 'n must be non-negative');
    const pf = toFloat(p);
    if (pf <= 0.0 || pf >= 1.0) {
      if (pf === 0.0) return 0n;
      if (pf === 1.0) return n;
      throw pyErr('ValueError', 'p must be in the range 0.0 <= p <= 1.0');
    }
    if (eq(n, 1n)) return R.random() < pf ? 1n : 0n;
    if (pf > 0.5) return sub(n, binomial(n, 1.0 - pf));
    const nf = toFloat(n);
    if (nf * pf < 10.0) {
      let x = 0n, y = 0n;
      const c = CR.log2(1.0 - pf);
      if (!c) return x;
      for (;;) {
        const u = R.random();
        if (u === 0) continue;   // math.log2(0.0) raises ValueError, which the loop skips
        y += floatToIntChecked(Math.floor(CR.log2(u) / c)) + 1n;
        if (compare('>', y, n)) return x;
        x += 1n;
      }
    }
    let setup = false, alpha = 0, lpq = 0, mm = 0, h = 0;
    const spq = Math.sqrt(nf * pf * (1.0 - pf));
    const b = 1.15 + 2.53 * spq;
    const aa = -0.0873 + 0.0248 * b + 0.01 * pf;
    const c = nf * pf + 0.5;
    const vr = 0.92 - 4.2 / b;
    const lg = (x) => CR.lgamma(x).v;
    for (;;) {
      let u = R.random();
      u -= 0.5;
      const us = 0.5 - Math.abs(u);
      if (us === 0) continue;   // ZeroDivisionError → continue
      const k = Math.floor((2.0 * aa / us + b) * u + c);
      if (k < 0 || k > nf) continue;
      let v = R.random();
      if (us >= 0.07 && v <= vr) return BigInt(k);
      if (!setup) {
        alpha = (2.83 + 5.1 / b) * spq;
        lpq = pyLog(pf / (1.0 - pf));
        mm = Math.floor((nf + 1) * pf);
        h = lg(mm + 1) + lg(nf - mm + 1);
        setup = true;
      }
      v *= alpha / (aa / (us * us) + b);
      if (pyLog(v) <= h - lg(k + 1) - lg(nf - k + 1) + (k - mm) * lpq) return BigInt(k);
    }
  };
  m('binomialvariate', (I2, a, kw) => {
    const o = pyBind('Random.binomialvariate', a, kw, ['n', 'p'], 2, true);
    return binomial(o.n === undefined ? 1n : o.n, o.p === undefined ? 0.5 : o.p);
  });
  m('gauss', (I2, a) => {
    const mu = a.length > 0 ? realArg(a[0]) : 0.0, sigma = a.length > 1 ? realArg(a[1]) : 1.0;
    let z = R.gaussNext; R.gaussNext = null;
    if (z === null) { const x2pi = R.random() * (2 * Math.PI); const g2rad = Math.sqrt(-2.0 * CR.log(1.0 - R.random())); z = CR.cos(x2pi) * g2rad; R.gaussNext = CR.sin(x2pi) * g2rad; }
    return mu + z * sigma;
  });
  m('triangular', (I2, a) => {
    let low = a.length > 0 ? realArg(a[0]) : 0.0, high = a.length > 1 ? realArg(a[1]) : 1.0;
    let mode = a.length > 2 && a[2] !== null ? realArg(a[2]) : null;
    let u = R.random();
    let c;
    try { c = mode === null ? 0.5 : (mode - low) / (high - low); } catch (e) { return low; }
    if (high === low) return low;
    if (u > c) { u = 1.0 - u; c = 1.0 - c; [low, high] = [high, low]; }
    return low + (high - low) * Math.sqrt(u * c);
  });
  m('expovariate', (I2, a) => { const lambd = a.length ? realArg(a[0]) : 1.0; return -CR.log(1.0 - R.random()) / lambd; });
  m('getstate', () => new PyTuple([3n, new PyTuple(Array.from(R.mt).map((x) => BigInt(x)).concat([BigInt(R.mti)])), R.gaussNext]));
  m('setstate', (I2, a) => { const st = a[0]; const arr = st.items[1].items.map((x) => Number(x)); R.mt = Uint32Array.from(arr.slice(0, 624)); R.mti = arr[624]; R.gaussNext = st.items[2]; return null; });
  return M;
}
// random.Random: module-level functions are the bound methods of a hidden instance (random._inst); random() and
// getrandbits() are C methods (builtin_function_or_method), the others Python methods (type 'method')
const RANDOM_TYPE = new PyType('Random', T.object, { module: 'random' });
const RANDOM_C_METHODS = new Set(['random', 'getrandbits']);
function randomInstance(I, R) {
  const M = randomMethods(I, R);
  const o = { pytype: RANDOM_TYPE, R };
  const bound = new Map();
  Object.defineProperty(o, 'pyGetAttr', {
    value: (name) => {
      if (!M[name]) return undefined;
      let b = bound.get(name);
      if (!b) {
        const fn = M[name];
        b = new PyBuiltin(name, (I2, self, a, kw) => fn(I2, a, kw), { self: o, module: 'random' });
        if (!RANDOM_C_METHODS.has(name)) { b.pyKind = 'method'; b.pyQual = 'Random.' + name; }
        bound.set(name, b);
      }
      return b;
    },
  });
  return o;
}
function makeRandom(I) {
  const d = new Map();
  const inst = randomInstance(I, I.rng);
  for (const name of ['seed', 'random', 'uniform', 'randint', 'randrange', 'choice', 'choices', 'shuffle', 'sample', 'gauss', 'normalvariate', 'triangular', 'betavariate', 'expovariate', 'lognormvariate', 'vonmisesvariate', 'gammavariate', 'paretovariate', 'weibullvariate', 'binomialvariate', 'getrandbits', 'getstate', 'setstate']) d.set(name, inst.pyGetAttr(name));
  d.set('_inst', inst);
  if (!RANDOM_TYPE.hostCtor) {
    RANDOM_TYPE.hostCtor = (I2, a, kw) => {
      const o = pyBind('Random', a, kw, ['x'], 1, false);
      const R2 = new MersenneTwister();
      seedRandom(R2, o.x === undefined ? null : o.x);
      return randomInstance(I2, R2);
    };
  }
  d.set('Random', RANDOM_TYPE);
  d.set('TWOPI', 2 * Math.PI); d.set('LOG4', CR.log(4.0)); d.set('NV_MAGICCONST', 4 * CR.exp(-0.5) / Math.sqrt(2.0));
  d.set('SG_MAGICCONST', 1.0 + CR.log(4.5)); d.set('BPF', 53n); d.set('RECIP_BPF', 2 ** -53);
  return new PyModule('random', d, { file: FILES.random });
}
/** random.seed(x) (Lib/random.py + _randommodule.c): int → |x|; str → SHA-512; float etc. → (size_t)hash(x) */
export function seedRandom(R, x) {
  if (x === null || x === undefined) R.seedTime();
  else if (isIntLike(x)) R.seedInt(toBig(x));
  else if (typeof x === 'string') R.seedInt(strSeedToInt(x));
  else if (typeof x === 'number') { let h = pyHash(x); if (h < 0n) h += 1n << 64n; R.seedInt(h); } else throw pyErr('TypeError', 'The only supported seed types are:\nNone, int, float, str, bytes, and bytearray.');
  R.gaussNext = null;
}
function floorDiv(a, b) { let q = a / b; if ((a % b !== 0n) && ((a < 0n) !== (b < 0n))) q -= 1n; return q; }

// ------------------------------------------------------------------ math.fsum / math.sumprod (ports of mathmodule.c)
/** ASSIGN_DOUBLE: a float, an int (PyLong_AsDouble) or a TypeError */
function asDouble(v) {
  if (typeof v === 'number') return v;
  if (isIntLike(v)) { const f = Number(toBig(v)); if (!isFinite(f)) throw pyErr('OverflowError', 'int too large to convert to float'); return f; }
  throw pyErr('TypeError', `must be real number, not ${typeName(v)}`);
}
/** math.fsum: Shewchuk's partials with CPython's handling of inf / nan and intermediate overflow */
export function fsumValues(vals) {
  const p = [];
  let specialSum = 0.0, infSum = 0.0, lo = 0.0;
  for (const item of vals) {
    let x = asDouble(item);
    const xsave = x;
    let i = 0;
    for (let j = 0; j < p.length; j++) {
      let y = p[j];
      if (Math.abs(x) < Math.abs(y)) { const t = x; x = y; y = t; }
      const hi = x + y, yr = hi - x;
      lo = y - yr;
      if (lo !== 0.0) p[i++] = lo;
      x = hi;
    }
    p.length = i;
    if (x !== 0.0) {
      if (!isFinite(x)) {
        if (isFinite(xsave)) throw pyErr('OverflowError', 'intermediate overflow in fsum');
        if (xsave === Infinity || xsave === -Infinity) infSum += xsave;
        specialSum += xsave;
        p.length = 0;
      } else p.push(x);
    }
  }
  if (specialSum !== 0.0) {
    if (infSum !== infSum) throw pyErr('ValueError', '-inf + inf in fsum');
    return specialSum;
  }
  let hi = 0.0, n = p.length;
  if (n > 0) {
    hi = p[--n];
    while (n > 0) {
      const x = hi, y = p[--n];
      hi = x + y;
      const yr = hi - x;
      lo = y - yr;
      if (lo !== 0.0) break;
    }
    if (n > 0 && ((lo < 0.0 && p[n - 1] < 0.0) || (lo > 0.0 && p[n - 1] > 0.0))) {
      const y = lo * 2.0, x = hi + y, yr = x - hi;
      if (y === yr) hi = x;
    }
  }
  return hi;
}
// error-free transformations for sumprod's TripleLength accumulator
function dlSum(a, b) { const x = a + b, z = x - a; return [x, (a - (x - z)) + (b - z)]; }
const TWO900 = 2 ** 900, TWOM900 = 2 ** -900;
function dlMul(x, y) {
  const z = x * y;
  if (!isFinite(z)) return [z, -z];
  const az = Math.abs(z), ax = Math.abs(x), ay = Math.abs(y);
  if ((az > TWOM900 || z === 0) && ax < TWO900 && ay < TWO900) {
    // Dekker's product (exact, like fma(x, y, -z), away from overflow / underflow)
    const S = 134217729;
    let t = S * x; const xh = t - (t - x), xl = x - xh;
    t = S * y; const yh = t - (t - y), yl = y - yh;
    return [z, ((xh * yh - z) + xh * yl + xl * yh) + xl * yl];
  }
  // exact rational fallback: fma(x, y, -z) is the correctly rounded x*y - z
  const [mx, ex] = floatToRatio(x), [my, ey] = floatToRatio(y), [mz, ez] = floatToRatio(z);
  const e = Math.min(ex + ey, ez);
  const prod = (mx * my) << BigInt(ex + ey - e), zz = mz << BigInt(ez - e);
  const diff = prod - zz;
  return [z, e >= 0 ? ratioToFloat(diff << BigInt(e), 1n) : ratioToFloat(diff, 1n << BigInt(-e))];
}
function tlFma(x, y, t) {
  const pr = dlMul(x, y), sm = dlSum(t[0], pr[0]), r1 = dlSum(t[1], pr[1]), r2 = dlSum(r1[0], sm[1]);
  return [sm[0], r2[0], t[2] + r1[1] + r2[1]];
}
function tlToD(t) { const last = dlSum(t[1], t[0]); return t[2] + last[1] + last[0]; }
const LONG_MAX = 9223372036854775807n, LONG_MIN = -9223372036854775808n;
/** math.sumprod(p, q): a C-long fast path for ints, extended precision for floats (and float * int), else + and * */
export function sumprodValues(P, Q) {
  let total = 0n;
  let intOn = true, intUsed = false, intTotal = 0n;
  let fltOn = true, fltUsed = false, flt = [0.0, 0.0, 0.0];
  const n = Math.max(P.length, Q.length);
  for (let i = 0; ; i++) {
    const finished = i >= n;
    if (!finished && (i >= P.length || i >= Q.length)) throw pyErr('ValueError', 'Inputs are not the same length');
    const p = finished ? undefined : P[i], q = finished ? undefined : Q[i];
    if (intOn) {
      if (!finished && typeof p === 'bigint' && typeof q === 'bigint' && p >= LONG_MIN && p <= LONG_MAX && q >= LONG_MIN && q <= LONG_MAX) {
        const prod = p * q;
        if (prod >= LONG_MIN && prod <= LONG_MAX && intTotal + prod >= LONG_MIN && intTotal + prod <= LONG_MAX) { intTotal += prod; intUsed = true; continue; }
      }
      intOn = false;
      if (intUsed) { total = add(total, intTotal); intTotal = 0n; intUsed = false; }
    }
    if (fltOn) {
      let ok = false, fp = 0, fq = 0;
      if (!finished) {
        const pf = typeof p === 'number', qf = typeof q === 'number';
        if (pf && qf) { fp = p; fq = q; ok = true; }
        else if (pf && isIntLike(q)) { fp = p; fq = Number(toBig(q)); ok = isFinite(fq); }
        else if (qf && isIntLike(p)) { fq = q; fp = Number(toBig(p)); ok = isFinite(fp); }
      }
      if (ok) {
        const nt = tlFma(fp, fq, flt);
        if (isFinite(nt[0])) { flt = nt; fltUsed = true; continue; }
      }
      fltOn = false;
      if (fltUsed) { total = add(total, tlToD(flt)); flt = [0.0, 0.0, 0.0]; fltUsed = false; }
    }
    if (finished) return total;
    total = add(total, mul(p, q));
  }
}

/** statistics.LinearRegression = namedtuple('LinearRegression', ('slope', 'intercept')) */
let LR_TYPE = null;
function statsLinearRegressionType() {
  if (LR_TYPE) return LR_TYPE;
  LR_TYPE = new PyType('LinearRegression', T.tuple, { module: 'statistics' });
  LR_TYPE.fields = ['slope', 'intercept'];
  LR_TYPE.hostCtor = (I, a, kw) => {
    const o = pyBind('LinearRegression.__new__', a, kw, ['slope', 'intercept'], 0, false);
    const r = new PyTuple([o.slope, o.intercept]);
    r.nt = LR_TYPE;
    return r;
  };
  return LR_TYPE;
}
/** statistics.NormalDist (Lib/statistics.py), as a builtin type */
const NORMAL_DIST_TYPE = new PyType('NormalDist', T.object, { module: 'statistics' });
function normalDistInvCdf(p, mu, sigma) {
  const q = p - 0.5;
  let num, den, r, x;
  if (Math.abs(q) <= 0.425) {
    r = 0.180625 - q * q;
    num = (((((((2.5090809287301226727e+3 * r + 3.3430575583588128105e+4) * r + 6.7265770927008700853e+4) * r + 4.5921953931549871457e+4) * r + 1.3731693765509461125e+4) * r + 1.9715909503065514427e+3) * r + 1.3314166789178437745e+2) * r + 3.3871328727963666080e+0) * q;
    den = (((((((5.2264952788528545610e+3 * r + 2.8729085735721942674e+4) * r + 3.9307895800092710610e+4) * r + 2.1213794301586595867e+4) * r + 5.3941960214247511077e+3) * r + 6.8718700749205790830e+2) * r + 4.2313330701600911252e+1) * r + 1.0);
    x = num / den;
    return mu + (x * sigma);
  }
  r = q <= 0.0 ? p : 1.0 - p;
  r = Math.sqrt(-CR.log(r));
  if (r <= 5.0) {
    r = r - 1.6;
    num = (((((((7.74545014278341407640e-4 * r + 2.27238449892691845833e-2) * r + 2.41780725177450611770e-1) * r + 1.27045825245236838258e+0) * r + 3.64784832476320460504e+0) * r + 5.76949722146069140550e+0) * r + 4.63033784615654529590e+0) * r + 1.42343711074968357734e+0);
    den = (((((((1.05075007164441684324e-9 * r + 5.47593808499534494600e-4) * r + 1.51986665636164571966e-2) * r + 1.48103976427480074590e-1) * r + 6.89767334985100004550e-1) * r + 1.67638483018380384940e+0) * r + 2.05319162663775882187e+0) * r + 1.0);
  } else {
    r = r - 5.0;
    num = (((((((2.01033439929228813265e-7 * r + 2.71155556874348757815e-5) * r + 1.24266094738807843860e-3) * r + 2.65321895265761230930e-2) * r + 2.96560571828504891230e-1) * r + 1.78482653991729133580e+0) * r + 5.46378491116411436990e+0) * r + 6.65790464350110377720e+0);
    den = (((((((2.04426310338993978564e-15 * r + 1.42151175831644588870e-7) * r + 1.84631831751005468180e-5) * r + 7.86869131145613259100e-4) * r + 1.48753612908506148525e-2) * r + 1.36929880922735805310e-1) * r + 5.99832206555887937690e-1) * r + 1.0);
  }
  x = num / den;
  if (q < 0.0) x = -x;
  return mu + (x * sigma);
}
function makeNormalDist(I, serr) {
  const ND = NORMAL_DIST_TYPE;
  const SQRT2 = Math.sqrt(2.0);
  const toF = (v) => callType(I, T.float, [v], null);
  const make = (mu, sigma) => {
    if (compare('<', sigma, 0.0)) throw serr('sigma must be non-negative');
    const o = { pytype: ND, mu: toF(mu), sigma: toF(sigma) };
    Object.defineProperties(o, { pyRepr: { value: ndRepr }, pyEq: { value: ndEq }, pyHashKey: { value: ndKey }, pyBinop: { value: ndBinop }, pyUnary: { value: ndUnary }, pyGetAttr: { value: ndAttr } });
    return o;
  };
  const isND = (v) => v && typeof v === 'object' && v.pytype === ND;
  function ndRepr() { return `NormalDist(mu=${repr(this.mu)}, sigma=${repr(this.sigma)})`; }
  function ndEq(b) { return isND(b) ? this.mu === b.mu && this.sigma === b.sigma : undefined; }
  function ndKey() { return '\u0000nd' + hashKeyStr(this.mu) + ',' + hashKeyStr(this.sigma); }
  function ndBinop(op, other, reflected) {
    const x1 = this;
    const hyp = (a, b) => importModule(I, 'math').dict.get('hypot').fn(I, [a, b], null);
    if (op === '+') return isND(other) ? make(add(x1.mu, other.mu), hyp(x1.sigma, other.sigma)) : make(add(x1.mu, other), x1.sigma);
    if (op === '-') {
      if (reflected) { const t = isND(other) ? make(sub(x1.mu, other.mu), hyp(x1.sigma, other.sigma)) : make(sub(x1.mu, other), x1.sigma); return make(-t.mu, t.sigma); }
      return isND(other) ? make(sub(x1.mu, other.mu), hyp(x1.sigma, other.sigma)) : make(sub(x1.mu, other), x1.sigma);
    }
    if (op === '*' && !isND(other)) return make(mul(x1.mu, other), mul(x1.sigma, Math.abs(asDouble(other))));
    if (op === '/' && !reflected && !isND(other)) return make(truediv(x1.mu, other), truediv(x1.sigma, Math.abs(asDouble(other))));
    return undefined;
  }
  function ndUnary(op) { if (op === '-') return make(-this.mu, this.sigma); if (op === '+') return make(this.mu, this.sigma); return undefined; }
  const cdf = (o, x) => {
    if (!o.sigma) throw serr('cdf() not defined when sigma is zero');
    return 0.5 * (1.0 + CR.erf(asDouble(sub(x, o.mu)) / (o.sigma * SQRT2)));
  };
  const invCdf = (o, p) => {
    if (compare('<=', p, 0.0) || compare('>=', p, 1.0)) throw serr('p must be in the range 0.0 < p < 1.0');
    return normalDistInvCdf(asDouble(p), o.mu, o.sigma);
  };
  const method = (o, name, fn) => new PyBuiltin(name, (I2, self, a, kw) => fn(a, kw), { self: o, ownerType: ND });
  function ndAttr(name) {
    const o = this;
    switch (name) {
      case 'mean': case 'median': case 'mode': return o.mu;
      case 'stdev': return o.sigma;
      case 'variance': return o.sigma * o.sigma;
      case 'pdf': return method(o, name, (a, kw) => {
        const x = pyBind('NormalDist.pdf', a, kw, ['x'], 0, true).x;
        const variance = o.sigma * o.sigma;
        if (!variance) throw serr('pdf() not defined when sigma is zero');
        const diff = asDouble(sub(x, o.mu));
        return CR.exp(diff * diff / (-2.0 * variance)) / Math.sqrt(2 * Math.PI * variance);
      });
      case 'cdf': return method(o, name, (a, kw) => cdf(o, pyBind('NormalDist.cdf', a, kw, ['x'], 0, true).x));
      case 'inv_cdf': return method(o, name, (a, kw) => invCdf(o, pyBind('NormalDist.inv_cdf', a, kw, ['p'], 0, true).p));
      case 'quantiles': return method(o, name, (a, kw) => {
        const b = pyBind('NormalDist.quantiles', a, kw, ['n'], 1, true);
        const n = b.n === undefined ? 4n : asIndex(b.n);
        const out = [];
        for (let i = 1n; i < n; i++) out.push(invCdf(o, truediv(i, n)));
        return new PyList(out);
      });
      case 'zscore': return method(o, name, (a, kw) => {
        const x = pyBind('NormalDist.zscore', a, kw, ['x'], 0, true).x;
        if (!o.sigma) throw serr('zscore() not defined when sigma is zero');
        return truediv(sub(x, o.mu), o.sigma);
      });
      case 'overlap': return method(o, name, (a, kw) => {
        const other = pyBind('NormalDist.overlap', a, kw, ['other'], 0, true).other;
        if (!isND(other)) throw pyErr('TypeError', 'Expected another NormalDist instance');
        let X = o, Y = other;
        if (Y.sigma < X.sigma || (Y.sigma === X.sigma && Y.mu < X.mu)) { X = other; Y = o; }
        const Xv = X.sigma * X.sigma, Yv = Y.sigma * Y.sigma;
        if (!Xv || !Yv) throw serr('overlap() not defined when sigma is zero');
        const dv = Yv - Xv, dm = Math.abs(Y.mu - X.mu);
        if (!dv) return 1.0 - CR.erf(dm / (2.0 * X.sigma * SQRT2));
        const A = X.mu * Yv - Y.mu * Xv;
        const B = X.sigma * Y.sigma * Math.sqrt(dm * dm + dv * CR.log(Yv / Xv));
        const x1 = (A + B) / dv, x2 = (A - B) / dv;
        return 1.0 - (Math.abs(cdf(Y, x1) - cdf(X, x1)) + Math.abs(cdf(Y, x2) - cdf(X, x2)));
      });
      case 'samples': return method(o, name, (a, kw) => {
        const b = pyBind('NormalDist.samples', a, kw, ['n'], 0, true, ['seed']);
        let rnd;
        if (b.seed === undefined || b.seed === null) { const R = I.rng; rnd = () => R.random(); } else { const R = new MersenneTwister(); seedRandom(R, b.seed); rnd = () => R.random(); }
        const n = Number(asIndex(b.n));
        const out = [];
        for (let i = 0; i < n; i++) out.push(normalDistInvCdf(rnd(), o.mu, o.sigma));
        return new PyList(out);
      });
    }
    return undefined;
  }
  ND.hostCtor = (I2, a, kw) => {
    const o = pyBind('NormalDist', a, kw, ['mu', 'sigma'], 2, true);
    return make(o.mu === undefined ? 0.0 : o.mu, o.sigma === undefined ? 1.0 : o.sigma);
  };
  ND.classAttrs = {
    from_samples: new PyBuiltin('from_samples', (I2, a, kw) => {
      const data = list1(pyBind('NormalDist.from_samples', a, kw, ['data'], 0, false).data);
      return make(...meanStdev(data, serr));
    }, { ownerType: ND }),
  };
  const list1 = (v) => toArray(v, I);
  return ND;
}
/** _mean_stdev(data) for NormalDist.from_samples */
function meanStdev(data, serr) {
  let sx = [0n, 1n], sxx = [0n, 1n], special, count = 0;
  for (const x of data) {
    let r;
    if (typeof x === 'number') r = isFinite(x) ? fracOf(x) : null; else r = fracOf(x);
    count++;
    if (r === null) special = special === undefined ? 0 + x : special + x;
    else { sx = fadd(sx, r); sxx = fadd(sxx, [r[0] * r[0], r[1] * r[1]]); }
  }
  if (count < 2) throw serr('stdev requires at least two data points');
  if (special !== undefined) return [special, special / special];
  const N = [BigInt(count), 1n];
  const ssd = fracDiv(fracSub(fracMul(N, sxx), fracMul(sx, sx)), N);
  const xbar = fracDiv(sx, N);
  const mss = fnorm(ssd[0], ssd[1] * BigInt(count - 1));
  return [fracFloat(xbar), mss[0] === 0n ? 0.0 : floatSqrtOfFrac(mss[0], mss[1])];
}
function hashKeyStr(x) { return Object.is(x, -0) ? '0' : String(x); }

// ------------------------------------------------------------------ statistics (a port of Lib/statistics.py 3.13)
// Exact sums are fractions [n, d]; a sum that met inf / nan is that float (partials[None]).
function frac(n, d) { return fnorm(n, d); }
function fracSub(a, b) { return fnorm(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
function fracMul(a, b) { return fnorm(a[0] * b[0], a[1] * b[1]); }
function fracDiv(a, b) { if (b[0] === 0n) throw pyErr('ZeroDivisionError', `Fraction(${a[0]}, 0)`); return fnorm(a[0] * b[1], a[1] * b[0]); }
function fracFloat(f) {
  const r = ratioToFloat(f[0], f[1]);
  if (!isFinite(r)) throw pyErr('OverflowError', 'integer division result too large for a float');
  return r;
}
function makeStatistics(I) {
  const d = new Map();
  const SE = EXC.StatisticsError;
  const serr = (...args) => new PyExc(SE, args);
  // statistics.py functions are Python functions (type 'function')
  const m = (name, fn) => { const f = bf(name, fn, 'statistics'); f.pyKind = 'function'; d.set(name, f); };
  const tname = (v) => (typeof v === 'number' ? 'float' : typeof v === 'boolean' ? 'bool' : typeof v === 'bigint' ? 'int' : null);
  // _coerce for the builtin numeric types: int (and bool) defer to the other type
  const coerce = (Tp, S) => (S === 'int' || S === 'bool' ? Tp : S);
  /** _exact_ratio: [n, d] for a finite number, null for inf / nan */
  const exactRatio = (x) => {
    if (typeof x === 'number') return isFinite(x) ? fracOf(x) : null;
    if (isIntLike(x)) return [toBig(x), 1n];
    throw pyErr('TypeError', `can't convert type '${typeName(x)}' to numerator/denominator`);
  };
  /** _sum(data) → { T, total, count } */
  const _sum = (vals) => {
    let Tp = 'int', count = 0, total = [0n, 1n], special;
    for (const x of vals) {
      const r = exactRatio(x);
      Tp = coerce(Tp, tname(x));
      count++;
      if (r === null) special = special === undefined ? 0 + x : special + x; else total = fadd(total, r);
    }
    return { T: Tp, total: special !== undefined ? special : total, count };
  };
  /** _ss(data, c) → { T, ssd, c, count } */
  const _ss = (vals, c) => {
    if (c !== undefined && c !== null) {
      const r = _sum(vals.map((x) => { const dd = sub(x, c); return mul(dd, dd); }));
      return { T: r.T, ssd: r.total, c, count: r.count };
    }
    let Tp = 'int', count = 0, sx = [0n, 1n], sxx = [0n, 1n], special;
    for (const x of vals) {
      const r = exactRatio(x);
      Tp = coerce(Tp, tname(x));
      count++;
      if (r === null) special = special === undefined ? 0 + x : special + x;
      else { sx = fadd(sx, r); sxx = fadd(sxx, [r[0] * r[0], r[1] * r[1]]); }
    }
    let ssd;
    if (!count) ssd = [0n, 1n];
    else if (special !== undefined) ssd = special;
    else { const N = [BigInt(count), 1n]; ssd = fracDiv(fracSub(fracMul(N, sxx), fracMul(sx, sx)), N); }
    return { T: Tp, ssd, c: ssd, count };
  };
  /** value / n for a fraction or a special float */
  const divN = (v, n) => (typeof v === 'number' ? v / n : fnorm(v[0], v[1] * BigInt(n)));
  /** _convert(value, T) */
  const convert = (v, Tp) => {
    if (typeof v === 'number') return v;
    if ((Tp === 'int' || Tp === 'bool') && v[1] === 1n) return v[0];
    return fracFloat(v);
  };
  const args = (name, a, kw, params, ndefaults = 0, kwonly = []) => pyBind(name, a, kw, params, ndefaults, false, kwonly);
  const list = (v) => toArray(v, I);
  const mathFn = (name) => { const f = importModule(I, 'math').dict.get(name); return (x) => f.fn(I, [x], null); };

  m('mean', (I2, a, kw) => {
    const r = _sum(list(args('mean', a, kw, ['data']).data));
    if (r.count < 1) throw serr('mean requires at least one data point');
    return convert(divN(r.total, r.count), r.T);
  });
  m('fmean', (I2, a, kw) => {
    const o = args('fmean', a, kw, ['data', 'weights'], 1);
    const data = list(o.data);
    if (o.weights === undefined || o.weights === null) {
      const total = fsumValues(data);
      if (!data.length) throw serr('fmean requires at least one data point');
      return total / data.length;
    }
    const w = list(o.weights);
    let num;
    try { num = sumprodValues(data, w); } catch (e) { if (e instanceof PyExc && e.type === EXC.ValueError) throw serr('data and weights must be the same length'); throw e; }
    const den = fsumValues(w);
    if (!den) throw serr('sum of weights must be non-zero');
    return truediv(num, den);
  });
  m('geometric_mean', (I2, a, kw) => {
    const data = list(args('geometric_mean', a, kw, ['data']).data);
    const log = mathFn('log');
    let n = 0, foundZero = false;
    const logs = [];
    for (const x of data) {
      n++;
      if (compare('>', x, 0.0) || (typeof x === 'number' && x !== x)) logs.push(log(x));
      else if (compare('==', x, 0.0)) foundZero = true;
      else throw serr('No negative inputs allowed', x);
    }
    const total = fsumValues(logs);
    if (!n) throw serr('Must have a non-empty dataset');
    if (total !== total) return NaN;
    if (foundZero) return total === Infinity ? NaN : 0.0;
    return CR.exp(total / n);
  });
  m('harmonic_mean', (I2, a, kw) => {
    const o = args('harmonic_mean', a, kw, ['data', 'weights'], 1);
    const data = list(o.data);
    const errmsg = 'harmonic mean does not support negative values';
    const n = data.length;
    const noWeights = o.weights === undefined || o.weights === null;
    if (n < 1) throw serr('harmonic_mean requires at least one data point');
    if (n === 1 && noWeights) {
      const x = data[0];
      if (!isNumber(x)) throw pyErr('TypeError', 'unsupported type');
      if (compare('<', x, 0n)) throw serr(errmsg);
      return x;
    }
    let weights, sumWeights;
    if (noWeights) { weights = new Array(n).fill(1n); sumWeights = [BigInt(n), 1n]; }
    else {
      weights = list(o.weights);
      if (weights.length !== n) throw serr('Number of weights does not match data size');
      for (const w of weights) if (compare('<', w, 0n)) throw serr(errmsg);
      sumWeights = _sum(weights).total;
    }
    // _sum(w / x if w else 0 for w, x in zip(weights, _fail_neg(data))): checks and divisions interleave
    const terms = [];
    try {
      for (let i = 0; i < n; i++) {
        const w = weights[i];
        if (compare('<', data[i], 0n)) throw serr(errmsg);
        terms.push(truthy(w) ? truediv(w, data[i]) : 0n);
      }
    } catch (e) { if (e instanceof PyExc && e.type === EXC.ZeroDivisionError) return 0n; throw e; }
    const r = _sum(terms);
    const total = r.total;
    if (typeof total === 'number' ? total <= 0 : total[0] <= 0n) throw serr('Weighted sum must be positive');
    if (typeof total === 'number') return typeof sumWeights === 'number' ? sumWeights / total : fracFloat(sumWeights) / total;
    if (typeof sumWeights === 'number') return sumWeights / fracFloat(total);
    return convert(fracDiv(sumWeights, total), r.T);
  });
  const sortedData = (vals) => pySort(vals, null, false);
  m('median', (I2, a, kw) => {
    const vals = sortedData(list(args('median', a, kw, ['data']).data));
    const n = vals.length;
    if (!n) throw serr('no median for empty data');
    if (n % 2 === 1) return vals[(n - 1) / 2];
    const i = n / 2;
    return truediv(add(vals[i - 1], vals[i]), 2n);
  });
  m('median_low', (I2, a, kw) => { const vals = sortedData(list(args('median_low', a, kw, ['data']).data)); const n = vals.length; if (!n) throw serr('no median for empty data'); return n % 2 === 1 ? vals[(n - 1) / 2] : vals[n / 2 - 1]; });
  m('median_high', (I2, a, kw) => { const vals = sortedData(list(args('median_high', a, kw, ['data']).data)); const n = vals.length; if (!n) throw serr('no median for empty data'); return vals[Math.floor(n / 2)]; });
  m('median_grouped', (I2, a, kw) => {
    const o = args('median_grouped', a, kw, ['data', 'interval'], 1);
    const data = sortedData(list(o.data));
    const n = data.length;
    if (!n) throw serr('no median for empty data');
    let x = data[Math.floor(n / 2)];
    let lo = 0, hi = n;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (lt(data[mid], x)) lo = mid + 1; else hi = mid; }
    const i = lo;
    hi = n;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (lt(x, data[mid])) hi = mid; else lo = mid + 1; }
    const j = lo;
    let interval = o.interval === undefined ? 1.0 : o.interval;
    try { interval = callType(I, T.float, [interval], null); x = callType(I, T.float, [x], null); } catch (e) {
      if (e instanceof PyExc && e.type === EXC.ValueError) throw pyErr('TypeError', 'Value cannot be converted to a float');
      throw e;
    }
    const L = x - interval / 2.0;
    return L + interval * (n / 2 - i) / (j - i);
  });
  const counts = (vals) => { const c = new PyDict(T.Counter); for (const v of vals) { const cur = c.get(v); c.set(v, (cur === undefined ? 0n : cur) + 1n); } return c; };
  m('mode', (I2, a, kw) => {
    const c = counts(list(args('mode', a, kw, ['data']).data));
    if (!c.size) throw serr('no mode for empty data');
    return counterOrder(c)[0][0];
  });
  m('multimode', (I2, a, kw) => {
    const c = counts(list(args('multimode', a, kw, ['data']).data));
    if (!c.size) return new PyList([]);
    let max = 0n; for (const v of c.values()) if (v > max) max = v;
    return new PyList(c.entries().filter(([, v]) => v === max).map(([k]) => k));
  });
  m('quantiles', (I2, a, kw) => {
    const o = args('quantiles', a, kw, ['data'], 0, ['n', 'method']);
    const nq = o.n === undefined ? 4n : o.n;
    if (compare('<', nq, 1n)) throw serr('n must be at least 1');
    const method = o.method === undefined ? 'exclusive' : o.method;
    const data = sortedData(list(o.data));
    const ld = data.length;
    if (ld < 2) {
      if (ld === 1) return mul(new PyList(data), sub(nq, 1n));
      throw serr('must have at least one data point');
    }
    const n = asIndex(nq);
    const result = [];
    if (method === 'inclusive') {
      const M = BigInt(ld - 1);
      for (let i = 1n; i < n; i++) {
        const j = (i * M) / n, delta = (i * M) % n;
        result.push(truediv(add(mul(data[Number(j)], n - delta), mul(data[Number(j) + 1], delta)), n));
      }
      return new PyList(result);
    }
    if (method === 'exclusive') {
      const M = BigInt(ld + 1);
      for (let i = 1n; i < n; i++) {
        let j = (i * M) / n;
        j = j < 1n ? 1n : j > BigInt(ld - 1) ? BigInt(ld - 1) : j;
        const delta = i * M - j * n;
        result.push(truediv(add(mul(data[Number(j) - 1], n - delta), mul(data[Number(j)], delta)), n));
      }
      return new PyList(result);
    }
    throw pyErr('ValueError', `Unknown method: ${repr(method)}`);
  });
  const varianceLike = (name, a, kw, pop, sqrt) => {
    const o = args(name, a, kw, ['data', pop ? 'mu' : 'xbar'], 1);
    const r = _ss(list(o.data), o[pop ? 'mu' : 'xbar']);
    if (pop ? r.count < 1 : r.count < 2) throw serr(`${name} requires at least ${pop ? 'one data point' : 'two data points'}`);
    const msv = divN(r.ssd, pop ? r.count : r.count - 1);
    if (sqrt) {
      if (typeof msv === 'number') throw pyErr('ValueError', 'inf or nan encountered in data');
      return msv[0] === 0n ? 0.0 : floatSqrtOfFrac(msv[0], msv[1]);
    }
    return convert(msv, r.T);
  };
  m('variance', (I2, a, kw) => varianceLike('variance', a, kw, false, false));
  m('pvariance', (I2, a, kw) => varianceLike('pvariance', a, kw, true, false));
  m('stdev', (I2, a, kw) => varianceLike('stdev', a, kw, false, true));
  m('pstdev', (I2, a, kw) => varianceLike('pstdev', a, kw, true, true));
  /** _sqrtprod(x, y): sqrt(x * y) with a differential correction, rescaled on overflow / underflow */
  const sqrtprod = (x, y) => {
    const h = Math.sqrt(x * y);
    if (!isFinite(h)) {
      if ((h === Infinity || h === -Infinity) && isFinite(x) && isFinite(y)) { const sc = 2.0 ** -512; return sqrtprod(sc * x, sc * y) / sc; }
      return h;
    }
    if (!h) {
      if (x && y) { const sc = 2.0 ** 537; return sqrtprod(sc * x, sc * y) / sc; }
      return h;
    }
    const dd = sumprodValues([x, h], [y, -h]);
    return h + dd / (2.0 * h);
  };
  const pair = (name, a, kw, kwonly) => {
    const o = args(name, a, kw, ['x', 'y'], 0, kwonly);
    const x = list(o.x), y = list(o.y);
    const what = name === 'linear_regression' ? 'linear regression' : name;
    if (y.length !== x.length) throw serr(`${what} requires that both inputs have same number of data points`);
    if (x.length < 2) throw serr(`${what} requires at least two data points`);
    return { o, x, y, n: x.length };
  };
  m('covariance', (I2, a, kw) => {
    const { x, y, n } = pair('covariance', a, kw, []);
    const xbar = fsumValues(x) / n, ybar = fsumValues(y) / n;
    const sxy = sumprodValues(x.map((v) => sub(v, xbar)), y.map((v) => sub(v, ybar)));
    return truediv(sxy, BigInt(n - 1));
  });
  const rank = (data, start) => {
    // _rank(): ties get the average rank
    const pos = data.map((v, i) => new PyTuple([v, BigInt(i)]));
    const vp = pySort(pos, null, false);
    let i = start - 1;
    const result = new Array(vp.length).fill(0n);
    for (let k = 0; k < vp.length;) {
      let e = k + 1;
      while (e < vp.length && eq(vp[e].items[0], vp[k].items[0])) e++;
      const size = e - k, rk = i + (size + 1) / 2;
      for (let q = k; q < e; q++) result[Number(vp[q].items[1])] = rk;
      i += size;
      k = e;
    }
    return result;
  };
  m('correlation', (I2, a, kw) => {
    const P = pair('correlation', a, kw, ['method']);
    const { o, n } = P;
    let { x, y } = P;
    const method = o.method === undefined ? 'linear' : o.method;
    if (method !== 'linear' && method !== 'ranked') throw pyErr('ValueError', `Unknown method: ${repr(method)}`);
    if (method === 'ranked') { const st = (n - 1) / -2; x = rank(x, st); y = rank(y, st); } else {
      const xbar = fsumValues(x) / n, ybar = fsumValues(y) / n;
      x = x.map((v) => sub(v, xbar)); y = y.map((v) => sub(v, ybar));
    }
    const sxy = sumprodValues(x, y), sxx = sumprodValues(x, x), syy = sumprodValues(y, y);
    const den = sqrtprod(asDouble(sxx), asDouble(syy));
    if (den === 0) throw serr('at least one of the inputs is constant');
    return truediv(sxy, den);
  });
  const LR = statsLinearRegressionType();
  m('linear_regression', (I2, a, kw) => {
    const P = pair('linear_regression', a, kw, ['proportional']);
    const { o, n } = P;
    let { x, y } = P;
    const proportional = o.proportional !== undefined && truthy(o.proportional);
    let xbar = 0, ybar = 0;
    if (!proportional) {
      xbar = fsumValues(x) / n; ybar = fsumValues(y) / n;
      x = x.map((v) => sub(v, xbar)); y = y.map((v) => sub(v, ybar));
    }
    const sxy = add(sumprodValues(x, y), 0.0), sxx = sumprodValues(x, x);
    if (compare('==', sxx, 0n)) throw serr('x is constant');
    const slope = truediv(sxy, sxx);
    const intercept = proportional ? 0.0 : sub(ybar, mul(slope, xbar));
    const r = new PyTuple([slope, intercept]);
    r.nt = LR;
    return r;
  });
  d.set('LinearRegression', LR);
  d.set('NormalDist', makeNormalDist(I, serr));
  d.set('StatisticsError', SE);
  return new PyModule('statistics', d, { file: FILES.statistics });
}

// ------------------------------------------------------------------ others
function makeTime() {
  const d = new Map();
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  d.set('time', bf('time', () => Date.now() / 1000, 'time'));
  d.set('time_ns', bf('time_ns', () => BigInt(Date.now()) * 1000000n, 'time'));
  d.set('perf_counter', bf('perf_counter', () => ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0) / 1000, 'time'));
  d.set('monotonic', bf('monotonic', () => ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0) / 1000, 'time'));
  d.set('process_time', bf('process_time', () => ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0) / 1000, 'time'));
  d.set('sleep', bf('sleep', (I, a) => {
    nArgs('time.sleep', a, 1);
    const s = a[0];
    if (!isNumber(s)) throw pyErr('TypeError', `'${typeName(s)}' object cannot be interpreted as an integer`);
    if (toFloat(s) < 0) throw pyErr('ValueError', 'sleep length must be non-negative');
    return null;
  }, 'time'));
  // struct_time: gmtime() is UTC; localtime() / mktime() use the host's time zone (CPython: the machine's)
  const secsArg = (name, a) => {
    if (a.length > 1) throw pyErr('TypeError', `${name}() takes at most 1 argument (${a.length} given)`);
    const v = a.length ? a[0] : null;
    if (v === null) return Math.floor(Date.now() / 1000);
    if (!isNumber(v)) throw pyErr('TypeError', `'${typeName(v)}' object cannot be interpreted as an integer`);
    const x = toFloat(v);
    if (!Number.isFinite(x)) throw pyErr(x !== x ? 'ValueError' : 'OverflowError', x !== x ? 'Invalid value NaN (not a number)' : 'timestamp too large to convert to C _PyTime_t');
    return Math.floor(x);
  };
  const yday = (y, m, dd) => new PyDate(y, m, dd).ordinal() - new PyDate(y, 1, 1).ordinal() + 1;
  const fromDate = (dt, utc) => {
    const g = (k) => dt[(utc ? 'getUTC' : 'get') + k]();
    const y = g('FullYear'), mo = g('Month') + 1, dd = g('Date');
    const off = utc ? 0 : -dt.getTimezoneOffset() * 60;
    let isdst = 0, zone = 'GMT';
    if (!utc) {
      const jan = new Date(y, 0, 1).getTimezoneOffset(), jul = new Date(y, 6, 1).getTimezoneOffset();
      isdst = jan !== jul && dt.getTimezoneOffset() === Math.min(jan, jul) ? 1 : 0;
      try { zone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(dt).find((p) => p.type === 'timeZoneName').value; } catch (e) { zone = off === 0 ? 'UTC' : 'UTC'; }
      if (off === 0 && /^(GMT|UTC)$/.test(zone)) zone = 'UTC';
    }
    return structSeq(STRUCT_TIME, [y, mo, dd, g('Hours'), g('Minutes'), g('Seconds'), (g('Day') + 6) % 7, yday(y, mo, dd), isdst].map((x) => BigInt(x)), { tm_zone: zone, tm_gmtoff: BigInt(off) });
  };
  const tupleArg = (name, a) => {
    if (!a.length || a[0] === null) return fromDate(new Date(), false);
    const t = a[0];
    if (!(t instanceof PyTuple)) throw pyErr('TypeError', 'Tuple or struct_time argument required');
    if (t.items.length !== 9) throw pyErr('TypeError', `${name}(): illegal time tuple argument`);
    const v = t.items.map((x) => { if (!isIntLike(x)) throw pyErr('TypeError', `'${typeName(x)}' object cannot be interpreted as an integer`); return Number(toBig(x)); });
    return { v, zone: t.extra ? t.extra.tm_zone : null, off: t.extra ? Number(t.extra.tm_gmtoff) : 0 };
  };
  const asTuple = (x) => (x instanceof PyTuple ? { v: x.items.map((n) => Number(n)), zone: x.extra.tm_zone, off: Number(x.extra.tm_gmtoff) } : x);
  d.set('struct_time', STRUCT_TIME);
  d.set('gmtime', bf('gmtime', (I2, a) => fromDate(new Date(secsArg('gmtime', a) * 1000), true), 'time'));
  d.set('localtime', bf('localtime', (I2, a) => fromDate(new Date(secsArg('localtime', a) * 1000), false), 'time'));
  d.set('mktime', bf('mktime', (I2, a) => {
    nArgs('mktime', a, 1);
    const { v } = asTuple(tupleArg('mktime', a));
    return new Date(v[0], v[1] - 1, v[2], v[3], v[4], v[5]).getTime() / 1000;
  }, 'time'));
  const asctime = (t) => {
    const { v } = asTuple(t);
    const DN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const p2 = (n) => String(n).padStart(2, '0');
    return `${DN[((v[6] % 7) + 7) % 7]} ${MN[((v[1] - 1) % 12 + 12) % 12]} ${String(v[2]).padStart(2, ' ')} ${p2(v[3])}:${p2(v[4])}:${p2(v[5])} ${v[0]}`;
  };
  d.set('asctime', bf('asctime', (I2, a) => { if (a.length > 1) throw pyErr('TypeError', `asctime expected at most 1 argument, got ${a.length}`); return asctime(tupleArg('asctime', a)); }, 'time'));
  d.set('ctime', bf('ctime', (I2, a) => asctime(fromDate(new Date(secsArg('ctime', a) * 1000), false)), 'time'));
  d.set('strftime', bf('strftime', (I2, a) => {
    if (!a.length || a.length > 2) throw pyErr('TypeError', `strftime expected 1 or 2 arguments, got ${a.length}`);
    if (typeof a[0] !== 'string') throw pyErr('TypeError', `strftime() argument 1 must be str, not ${typeName(a[0])}`);
    const { v, zone, off } = asTuple(tupleArg('strftime', a.slice(1)));
    if (v[1] < 1 || v[1] > 12) throw pyErr('ValueError', 'month out of range');
    if (v[2] < 1 || v[2] > 31) throw pyErr('ValueError', 'day of month out of range');
    if (v[3] < 0 || v[3] > 23) throw pyErr('ValueError', 'hour out of range');
    if (v[4] < 0 || v[4] > 59) throw pyErr('ValueError', 'minute out of range');
    if (v[5] < 0 || v[5] > 61) throw pyErr('ValueError', 'seconds out of range');
    const dt = new PyDateTime(v[0], v[1], Math.min(v[2], daysInMonth(v[0], v[1])), v[3], v[4], Math.min(v[5], 59), 0);
    const sign = off < 0 ? '-' : '+', ao = Math.abs(off);
    const fmt = a[0].replace(/%%|%Z|%z/g, (m) => (m === '%Z' ? (zone || '').replace(/%/g, '%%') : m === '%z' ? sign + String(Math.floor(ao / 3600)).padStart(2, '0') + String(Math.floor(ao % 3600 / 60)).padStart(2, '0') : m));
    return strftimeFn(dt, fmt);
  }, 'time'));
  d.set('strptime', bf('strptime', (I2, a) => {
    if (a.length < 1 || a.length > 2) throw pyErr('TypeError', `strptime() takes at most 2 arguments (${a.length} given)`);
    const fmt = a.length > 1 ? a[1] : '%a %b %d %H:%M:%S %Y';
    for (let i = 0; i < a.length; i++) if (typeof a[i] !== 'string') throw pyErr('TypeError', `strptime() argument ${i} must be str, not ${typeName(a[i])}`);
    const r = strptimeParse(a[0], fmt);
    return structSeq(STRUCT_TIME, [r[0], r[1], r[2], r[3], r[4], r[5], r[7], r[8], -1].map((x) => BigInt(x)), { tm_zone: null, tm_gmtoff: null });
  }, 'time'));
  d.set('timezone', BigInt(new Date(2000, 0, 1).getTimezoneOffset() * 60));
  return new PyModule('time', d);
}
function makeCollections() {
  const d = new Map();
  d.set('deque', T.deque); d.set('Counter', T.Counter); d.set('defaultdict', T.defaultdict);
  d.set('OrderedDict', T.OrderedDict);
  d.set('namedtuple', bf('namedtuple', () => { throw pyErr('TypeError', 'minipy does not support namedtuple yet'); }, 'collections'));
  return new PyModule('collections', d, { file: FILES.collections });
}
// ------------------------------------------------------------------ strptime (a port of Lib/_strptime.py, C locale)
const F_WEEKDAY = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const A_WEEKDAY = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const F_MONTH = ['', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const A_MONTH = ['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const seqRe = (seq, name) => `(?<${name}>${seq.filter(Boolean).slice().sort((a, b) => b.length - a.length).join('|')})`;
const STRPTIME_RE = {
  d: '(?<d>3[0-1]|[1-2]\\d|0[1-9]|[1-9]| [1-9])', f: '(?<f>[0-9]{1,6})', H: '(?<H>2[0-3]|[0-1]\\d|\\d| \\d)',
  I: '(?<I>1[0-2]|0[1-9]|[1-9]| [1-9])', G: '(?<G>\\d\\d\\d\\d)',
  j: '(?<j>36[0-6]|3[0-5]\\d|[1-2]\\d\\d|0[1-9]\\d|00[1-9]|[1-9]\\d|0[1-9]|[1-9])', m: '(?<m>1[0-2]|0[1-9]|[1-9])',
  M: '(?<M>[0-5]\\d|\\d)', S: '(?<S>6[0-1]|[0-5]\\d|\\d)', U: '(?<U>5[0-3]|[0-4]\\d|\\d)', W: '(?<W>5[0-3]|[0-4]\\d|\\d)',
  w: '(?<w>[0-6])', u: '(?<u>[1-7])', y: '(?<y>\\d\\d)', Y: '(?<Y>\\d\\d\\d\\d)',
  A: seqRe(F_WEEKDAY, 'A'), a: seqRe(A_WEEKDAY, 'a'), B: seqRe(F_MONTH, 'B'), b: seqRe(A_MONTH, 'b'), p: seqRe(['am', 'pm'], 'p'), '%': '%',
};
STRPTIME_RE.e = STRPTIME_RE.d; STRPTIME_RE.k = STRPTIME_RE.H; STRPTIME_RE.l = STRPTIME_RE.I; STRPTIME_RE.P = STRPTIME_RE.p; STRPTIME_RE.h = STRPTIME_RE.b;
const STRPTIME_ALIAS = { T: '%H:%M:%S', R: '%H:%M', r: '%I:%M:%S %p', X: '%H:%M:%S', x: '%m/%d/%y', c: '%a %b %d %H:%M:%S %Y', D: '%m/%d/%y', F: '%Y-%m-%d' };
/** datetime.strptime / time.strptime: [year, month, day, hour, minute, second, microsecond, weekday, yday] */
export function strptimeParse(data, fmt) {
  const pattern = (f) => {
    let out = '';
    for (let i = 0; i < f.length; i++) {
      const c = f[i];
      if (c === '%') {
        let j = i + 1;
        while (j < f.length && '-_0^#'.includes(f[j])) j++;
        while (j < f.length && f[j] >= '0' && f[j] <= '9') j++;
        let dir = f[j] ?? '';
        if ((dir === 'O' || dir === 'E') && j + 1 < f.length) dir = f[++j];
        if (dir === '' || /\s/.test(dir)) throw pyErr('ValueError', `stray % in format '${fmt}'`);
        if (STRPTIME_ALIAS[dir]) out += pattern(STRPTIME_ALIAS[dir]);
        else if (STRPTIME_RE[dir]) out += STRPTIME_RE[dir];
        else throw pyErr('ValueError', `'${dir}' is a bad directive in format '${fmt}'`);
        i = j;
      } else if (/\s/.test(c)) { while (i + 1 < f.length && /\s/.test(f[i + 1])) i++; out += '\\s+'; }
      else if (c === "'") out += "['\u02bc]";
      else out += c.replace(/[\\.^$*+?()[\]{}|\/-]/g, '\\$&');
    }
    return out;
  };
  let re;
  try { re = new RegExp('^(?:' + pattern(fmt) + ')', 'i'); } catch (e) {
    if (e instanceof PyExc) throw e;
    throw pyErr('ValueError', `time data ${repr(data)} does not match format ${repr(fmt)}`);   // a repeated directive
  }
  const found = re.exec(data);
  if (!found) throw pyErr('ValueError', `time data ${repr(data)} does not match format ${repr(fmt)}`);
  if (found[0].length !== data.length) throw pyErr('ValueError', `unconverted data remains: ${data.slice(found[0].length)}`);
  const g = found.groups || {};
  let year = null, month = 1, day = 1, hour = 0, minute = 0, second = 0, fraction = 0, weekday = null, julian = null;
  if (g.y !== undefined) { year = parseInt(g.y, 10); year += year <= 68 ? 2000 : 1900; }
  if (g.Y !== undefined) year = parseInt(g.Y, 10);
  if (g.m !== undefined) month = parseInt(g.m, 10);
  if (g.B !== undefined) month = F_MONTH.indexOf(g.B.toLowerCase());
  if (g.b !== undefined) month = A_MONTH.indexOf(g.b.toLowerCase());
  if (g.d !== undefined) day = parseInt(g.d, 10);
  if (g.H !== undefined) hour = parseInt(g.H, 10);
  if (g.I !== undefined) {
    hour = parseInt(g.I, 10);
    const ampm = (g.p || '').toLowerCase();
    if (ampm === '' || ampm === 'am') { if (hour === 12) hour = 0; } else if (hour !== 12) hour += 12;
  }
  if (g.M !== undefined) minute = parseInt(g.M, 10);
  if (g.S !== undefined) second = parseInt(g.S, 10);
  if (g.f !== undefined) fraction = parseInt(g.f.padEnd(6, '0'), 10);
  if (g.A !== undefined) weekday = F_WEEKDAY.indexOf(g.A.toLowerCase());
  if (g.a !== undefined) weekday = A_WEEKDAY.indexOf(g.a.toLowerCase());
  if (g.w !== undefined) { weekday = parseInt(g.w, 10); weekday = weekday === 0 ? 6 : weekday - 1; }
  if (g.u !== undefined) weekday = parseInt(g.u, 10) - 1;
  if (g.j !== undefined) julian = parseInt(g.j, 10);
  if (g.G !== undefined) {
    if (julian !== null) throw pyErr('ValueError', "Day of the year directive '%j' is not compatible with ISO year directive '%G'. Use '%Y' instead.");
    throw pyErr('ValueError', "ISO year directive '%G' must be used with the ISO week directive '%V' and a weekday directive ('%A', '%a', '%w', or '%u').");
  }
  if (year === null) year = month === 2 && day === 29 ? 1904 : 1900;
  if (julian === null && weekday !== null && (g.U !== undefined || g.W !== undefined)) {
    // _calc_julian_from_U_or_W
    const weekOfYear = parseInt(g.U !== undefined ? g.U : g.W, 10), startsMon = g.U === undefined;
    let firstWd = (new PyDate(year, 1, 1).ordinal() + 6) % 7;
    let wd = weekday;
    if (!startsMon) { firstWd = (firstWd + 1) % 7; wd = (wd + 1) % 7; }
    const weekZeroLen = (7 - firstWd) % 7;
    julian = weekOfYear === 0 ? 1 + wd - firstWd : weekZeroLen + 7 * (weekOfYear - 1) + 1 + wd;
    if (julian <= 0) { year -= 1; julian += (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365; }
  }
  const checkDay = (y, m, dd) => {
    if (m < 1 || m > 12) throw pyErr('ValueError', 'month must be in 1..12');
    if (dd < 1 || dd > daysInMonth(y, m)) throw pyErr('ValueError', 'day is out of range for month');
  };
  if (julian === null) { checkDay(year, month, day); julian = new PyDate(year, month, day).ordinal() - new PyDate(year, 1, 1).ordinal() + 1; } else {
    const o = new PyDate(year, 1, 1).ordinal() + julian - 1;
    const dt = ordinalToYmd(o);
    year = dt[0]; month = dt[1]; day = dt[2];
  }
  if (weekday === null) weekday = (new PyDate(year, month, day).ordinal() + 6) % 7;
  if (year === 1904 && g.Y === undefined && g.y === undefined) { year = 1900; checkDay(year, month, day); }   // leap_year_fix
  return [year, month, day, hour, minute, second, fraction, weekday, julian];
}
function ordinalToYmd(n) {
  let y = Math.floor((n - 1) / 365.2425) + 1;
  const before = (yy) => { const z = yy - 1; return z * 365 + Math.floor(z / 4) - Math.floor(z / 100) + Math.floor(z / 400); };
  while (before(y) >= n) y--;
  while (before(y + 1) < n) y++;
  let rem = n - before(y), m = 1;
  while (rem > daysInMonth(y, m)) { rem -= daysInMonth(y, m); m++; }
  return [y, m, rem];
}
function makeDatetime(I) {
  const d = new Map();
  d.set('date', T.date); d.set('datetime', T.datetime); d.set('timedelta', T.timedelta); d.set('time', T.time);
  d.set('MINYEAR', 1n); d.set('MAXYEAR', 9999n);
  I.dateClassAttr = (t, name) => {
    const now = () => { const n = new Date(); return new PyDateTime(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds() * 1000); };
    if (name === 'today') return bf('today', () => { const x = now(); return t === T.datetime ? x : new PyDate(x.y, x.m, x.d); });
    if (name === 'now' && t === T.datetime) return bf('now', () => now());
    if (name === 'combine' && t === T.datetime) return bf('combine', (I2, a, kw) => {
      const o = pyBind('combine', a, kw, ['date', 'time', 'tzinfo'], 1, false);
      if (!(o.date instanceof PyDate)) throw pyErr('TypeError', `combine() argument 1 must be datetime.date, not ${typeName(o.date)}`);
      if (!(o.time instanceof PyTime)) throw pyErr('TypeError', `combine() argument 2 must be datetime.time, not ${typeName(o.time)}`);
      return new PyDateTime(o.date.y, o.date.m, o.date.d, o.time.h, o.time.mi, o.time.s, o.time.us);
    });
    if (name === 'strptime' && t === T.datetime) return bf('strptime', (I2, a, kw) => {
      noKw('strptime', kw);
      if (a.length !== 2) throw pyErr('TypeError', `strptime expected 2 arguments, got ${a.length}`);
      for (let i = 0; i < 2; i++) if (typeof a[i] !== 'string') throw pyErr('TypeError', `strptime() argument ${i + 1} must be str, not ${typeName(a[i])}`);
      const r = strptimeParse(a[0], a[1]);
      return new PyDateTime(r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
    });
    if (name === 'fromisoformat') return bf('fromisoformat', (I2, a) => {
      const s = a[0];
      const mm = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(typeof s === 'string' ? s : '');
      if (!mm) throw pyErr('ValueError', `Invalid isoformat string: ${repr(s)}`);
      if (t === T.datetime) return new PyDateTime(+mm[1], +mm[2], +mm[3], +(mm[4] || 0), +(mm[5] || 0), +(mm[6] || 0));
      return new PyDate(+mm[1], +mm[2], +mm[3]);
    });
    return undefined;
  };
  return new PyModule('datetime', d, { file: FILES.datetime });
}
// string.Template (Lib/string.py): $name, ${name}, $$; the pattern is matched with re.IGNORECASE
const TEMPLATE_TYPE = new PyType('Template', T.object, { module: 'string' });
const TEMPLATE_RE = /\$(?:(\$)|([_a-z][_a-z0-9]*)|\{([_a-z][_a-z0-9]*)\}|())/gi;
function makeTemplate(I, template) {
  const o = { pytype: TEMPLATE_TYPE, template };
  const each = (fn) => {
    if (typeof template !== 'string') throw pyErr('TypeError', `expected string or bytes-like object, got '${typeName(template)}'`);
    TEMPLATE_RE.lastIndex = 0;
    return template.replace(TEMPLATE_RE, (m, esc, named, braced, invalid, index) => fn({ m, esc, named: named ?? braced, invalid: invalid !== undefined, index }));
  };
  const mapping = (a, kw, name) => {
    if (a.length > 1) throw pyErr('TypeError', `Template.${name}() takes from 1 to 2 positional arguments but ${a.length + 1} were given`);
    const kws = new PyDict();
    if (kw) for (const k in kw) kws.set(k, kw[k]);
    if (!a.length) return (key) => getitem(kws, key, I);
    const m = a[0];
    return (key) => (kws.has(key) ? kws.get(key) : getitem(m, key, I));
  };
  const invalidErr = (i) => {
    // _invalid(): i = mo.start('invalid') (just after the '$'); line and column from template[:i].splitlines()
    const before = Array.from(template.slice(0, i + 1));
    let lineno = 1, lastStart = 0;
    for (let k = 0; k < before.length; k++) {
      const c = before[k];
      if (c === '\r' && before[k + 1] === '\n') k++;
      else if (!'\n\r\v\f\x1c\x1d\x1e\x85\u2028\u2029'.includes(c)) continue;
      lineno++; lastStart = k + 1;
    }
    return pyErr('ValueError', `Invalid placeholder in string: line ${lineno}, col ${before.length - lastStart}`);
  };
  const method = (name, fn) => new PyBuiltin(name, (I2, self, a, kw) => fn(a, kw), { self: o, module: 'string' });
  Object.defineProperties(o, {
    pyGetAttr: {
      value: (name) => {
        switch (name) {
          case 'template': return template;
          case 'delimiter': return '$';
          case 'substitute': return method(name, (a, kw) => {
            const get = mapping(a, kw, 'substitute');
            return each((x) => {
              if (x.named !== undefined) return I.toStr(get(x.named));
              if (x.esc !== undefined) return '$';
              throw invalidErr(x.index);
            });
          });
          case 'safe_substitute': return method(name, (a, kw) => {
            const get = mapping(a, kw, 'safe_substitute');
            return each((x) => {
              if (x.named !== undefined) {
                try { return I.toStr(get(x.named)); } catch (e) { if (e instanceof PyExc && e.type === EXC.KeyError) return x.m; throw e; }
              }
              if (x.esc !== undefined) return '$';
              return x.m;
            });
          });
          case 'get_identifiers': return method(name, () => {
            const ids = [];
            each((x) => { if (x.named !== undefined && !ids.includes(x.named)) ids.push(x.named); return x.m; });
            return new PyList(ids);
          });
          case 'is_valid': return method(name, () => {
            let ok = true;
            each((x) => { if (x.invalid) ok = false; return x.m; });
            return ok;
          });
        }
        return undefined;
      },
    },
  });
  return o;
}
function makeString() {
  const d = new Map();
  const lower = 'abcdefghijklmnopqrstuvwxyz', upper = lower.toUpperCase();
  d.set('ascii_lowercase', lower); d.set('ascii_uppercase', upper); d.set('ascii_letters', lower + upper);
  d.set('digits', '0123456789'); d.set('hexdigits', '0123456789abcdefABCDEF'); d.set('octdigits', '01234567');
  d.set('punctuation', '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'); d.set('whitespace', ' \t\n\r\x0b\x0c');
  d.set('printable', '0123456789' + lower + upper + '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' + ' \t\n\r\x0b\x0c');
  // capwords(s, sep=None) = (sep or ' ').join(map(str.capitalize, s.split(sep)))  (a Python function)
  d.set('capwords', pyFunction(bf('capwords', (I, a, kw) => {
    const o = pyBind('capwords', a, kw, ['s', 'sep'], 1, false);
    const sep = o.sep === undefined ? null : o.sep;
    const parts = getAttribute(I, o.s, 'split');
    const words = I.callSync(parts, sep === null ? [] : [sep], null);
    const caps = words.items.map((w) => I.callSync(getAttribute(I, w, 'capitalize'), [], null));
    return I.callSync(getAttribute(I, sep === null ? ' ' : sep, 'join'), [new PyList(caps)], null);
  }, 'string')));
  d.set('Template', TEMPLATE_TYPE);
  if (!TEMPLATE_TYPE.hostCtor) {
    TEMPLATE_TYPE.hostCtor = (I2, a, kw) => {
      const o = pyBind('Template.__init__', a, kw, ['template'], 0, true);
      return makeTemplate(I2, o.template);
    };
    TEMPLATE_TYPE.classAttrs = { delimiter: '$', idpattern: '(?a:[_a-z][_a-z0-9]*)', braceidpattern: null };
  }
  return new PyModule('string', d, { file: FILES.string });
}
/** a struct sequence type (sys.float_info, sys.version_info, time.struct_time): a tuple subclass with named fields */
function structSeqType(name, module, fields) {
  const t = new PyType(name, T.tuple, { module });
  t.fields = fields;
  t.reprName = module + '.' + name;
  return t;
}
function structSeq(t, values, extra) { const r = new PyTuple(values); r.nt = t; if (extra) r.extra = extra; return r; }
const FLOAT_INFO = structSeqType('float_info', 'sys', ['max', 'max_exp', 'max_10_exp', 'min', 'min_exp', 'min_10_exp', 'dig', 'mant_dig', 'epsilon', 'radix', 'rounds']);
const VERSION_INFO = structSeqType('version_info', 'sys', ['major', 'minor', 'micro', 'releaselevel', 'serial']);
const INT_INFO = structSeqType('int_info', 'sys', ['bits_per_digit', 'sizeof_digit', 'default_max_str_digits', 'str_digits_check_threshold']);
const NAMESPACE = new PyType('SimpleNamespace', T.object, { module: 'types' });
const STRUCT_TIME = structSeqType('struct_time', 'time', ['tm_year', 'tm_mon', 'tm_mday', 'tm_hour', 'tm_min', 'tm_sec', 'tm_wday', 'tm_yday', 'tm_isdst']);

// sys.stdin / sys.stdout / sys.stderr (io.TextIOWrapper): stdout and stderr write to the console (stderr text is in
// run.output but not run.stdout); stdin reads the run's input lines like input(), keeping the '\n' ('' at EOF)
function* stdinReadline(I) {
  if (I.stdinPending) { const rest = I.stdinPending; I.stdinPending = ''; return rest; }   // after readline(size)
  if (I.stdinEof) return '';
  let value = I.takeInput('');
  if (value === undefined) {
    if (I.syncDepth > 0) throw pyErr('RuntimeError', 'sys.stdin cannot wait for typed input inside this call (provide the inputs in advance)');
    value = yield { kind: 'input', prompt: '', wait: true };
  } else yield { kind: 'input', prompt: '', value };
  if (value === null || value === undefined) { I.stdinEof = true; return ''; }
  value = String(value);
  if (value.endsWith('\n')) value = value.slice(0, -1);
  if (I.echoInput) { const ev = I.emitOutput(value + '\n'); ev.echo = true; yield ev; }
  return value + '\n';
}
function makeStream(I, which) {
  const o = { pytype: T.TextIOWrapper, which };
  const fd = which === 'stdin' ? 0n : which === 'stdout' ? 1n : 2n;
  const reading = which === 'stdin';
  const unsupported = (what) => pyErr('OSError', what);
  const m = (name, fn, gen) => new PyBuiltin(name, fn, { self: o, ownerType: T.TextIOWrapper, gen });
  const strArg = (name, a) => {
    if (a.length !== 1) throw pyErr('TypeError', `${name}() takes exactly one argument (${a.length} given)`);
    if (typeof a[0] !== 'string') throw pyErr('TypeError', `${name}() argument must be str, not ${typeName(a[0])}`);
    return a[0];
  };
  function* write(I2, self, a) {
    const s = strArg('write', a);
    if (reading) throw unsupported('not writable');
    const bad = surrogateWriteError(s);
    if (bad) throw bad;
    if (s) yield which === 'stderr' ? I.emitStderr(s) : I.emitOutput(s);
    return BigInt(Array.from(s).length);
  }
  function* writelines(I2, self, a) {
    if (a.length !== 1) throw pyErr('TypeError', `writelines() takes exactly one argument (${a.length} given)`);
    if (reading) throw unsupported('not writable');
    for (const x of toArray(a[0], I)) {
      if (typeof x !== 'string') throw pyErr('TypeError', `write() argument must be str, not ${typeName(x)}`);
      if (x) yield which === 'stderr' ? I.emitStderr(x) : I.emitOutput(x);
    }
    return null;
  }
  function* readline(I2, self, a) {
    if (!reading) throw unsupported('not readable');
    if (a.length > 1) throw pyErr('TypeError', `readline expected at most 1 argument, got ${a.length}`);
    const line = yield stdinReadline(I);
    const n = a.length && a[0] !== null ? Number(asIndex(a[0])) : -1;
    if (n >= 0 && n < line.length) { I.stdinPending = line.slice(n); return line.slice(0, n); }
    return line;
  }
  function* readAll(I2, self, a, asList) {
    if (!reading) throw unsupported('not readable');
    const out = [];
    for (;;) { const line = yield stdinReadline(I); if (!line) break; out.push(line); }
    return asList ? new PyList(out) : out.join('');
  }
  Object.defineProperties(o, {
    pyRepr: { value: () => `<_io.TextIOWrapper name='<${which}>' mode='${reading ? 'r' : 'w'}' encoding='utf-8'>` },
    pyGetAttr: {
      value: (name) => {
        switch (name) {
          case 'write': return m('write', write, true);
          case 'writelines': return m('writelines', writelines, true);
          case 'flush': return m('flush', (I2, self, a) => { if (a.length) throw pyErr('TypeError', `flush() takes no arguments (${a.length} given)`); return null; });
          case 'readline': return m('readline', readline, true);
          case 'readlines': return m('readlines', function* (I2, self, a) { return yield readAll(I2, self, a, true); }, true);
          case 'read': return m('read', function* (I2, self, a) { return yield readAll(I2, self, a, false); }, true);
          case 'isatty': return m('isatty', () => false);
          case 'readable': return m('readable', () => reading);
          case 'writable': return m('writable', () => !reading);
          case 'fileno': return m('fileno', () => fd);
          case 'close': return m('close', () => null);
          case 'name': return `<${which}>`;
          case 'mode': return reading ? 'r' : 'w';
          case 'encoding': return 'utf-8';
          case 'errors': return which === 'stderr' ? 'backslashreplace' : 'strict';
          case 'closed': return false;
          case 'line_buffering': return which !== 'stdin';
          case 'newlines': return null;
        }
        return undefined;
      },
    },
    // for line in sys.stdin: the lines that are already available (the loop cannot wait for typed input)
    pyIter: {
      value: () => new PyIter(T.TextIOWrapper, () => {
        if (!reading) throw unsupported('not readable');
        if (I.stdinEof) return STOP;
        const v = I.takeInput('');
        if (v === undefined) throw pyErr('RuntimeError', 'minipy cannot wait for typed input while iterating over sys.stdin (provide the inputs in advance)');
        if (v === null) { I.stdinEof = true; return STOP; }
        const line = String(v).replace(/\n$/, '');
        if (I.echoInput) I.pending.push(I.emitOutput(line + '\n'));
        return line + '\n';
      }),
    },
  });
  return o;
}
function makeSys(I) {
  const d = new Map();
  d.set('maxsize', 9223372036854775807n);
  d.set('version', '3.13.0 (minipy)');
  const versionInfo = structSeq(VERSION_INFO, [3n, 13n, 0n, 'final', 0n]);
  d.set('version_info', versionInfo);
  d.set('hexversion', 0x030D00F0n);
  const impl = { pytype: NAMESPACE, attrs: new Map([['name', 'cpython'], ['cache_tag', 'cpython-313'], ['version', versionInfo], ['hexversion', 0x030D00F0n], ['_multiarch', 'x86_64-linux-gnu']]) };
  Object.defineProperties(impl, {
    pyRepr: { value() { return 'namespace(' + [...this.attrs].map(([k, v]) => k + '=' + repr(v)).join(', ') + ')'; } },
    pyGetAttr: { value(name) { return this.attrs.get(name); } },
  });
  d.set('implementation', impl);
  d.set('argv', new PyList([I.filename]));
  d.set('platform', 'linux');
  d.set('byteorder', 'little');
  d.set('executable', '/usr/bin/python3');
  d.set('float_info', structSeq(FLOAT_INFO, [Number.MAX_VALUE, 1024n, 308n, 2.2250738585072014e-308, -1021n, -307n, 15n, 53n, Number.EPSILON, 2n, 1n]));
  d.set('int_info', structSeq(INT_INFO, [30n, 4n, 4300n, 640n]));
  d.set('path', new PyList(['/usr/lib/python313.zip', '/usr/lib/python3.13', '/usr/lib/python3.13/lib-dynload']));
  // sys.modules: the modules imported so far (importModule keeps it up to date)
  const mods = new PyDict();
  mods.set('sys', null);
  for (const [k, v] of I.modules) mods.set(k, v);
  I.sysModules = mods;
  d.set('modules', mods);
  d.set('stdin', makeStream(I, 'stdin'));
  d.set('stdout', makeStream(I, 'stdout'));
  d.set('stderr', makeStream(I, 'stderr'));
  d.set('exit', bf('exit', (I2, a) => { throw new PyExc(EXC.SystemExit, a.slice(0, 1)); }, 'sys'));
  d.set('getrecursionlimit', bf('getrecursionlimit', () => BigInt(I.recLimit), 'sys'));
  d.set('setrecursionlimit', bf('setrecursionlimit', (I2, a) => { const n = Number(asIndex(a[0])); if (n < 1) throw pyErr('ValueError', 'recursion limit must be greater or equal than 1'); I.recLimit = Math.min(n, 3000); return null; }, 'sys'));
  d.set('get_int_max_str_digits', bf('get_int_max_str_digits', (I2, a, kw) => {
    noKw('get_int_max_str_digits', kw);
    if (a.length) throw pyErr('TypeError', `sys.get_int_max_str_digits() takes no arguments (${a.length} given)`);
    return BigInt(getIntMaxStrDigits());
  }, 'sys'));
  d.set('set_int_max_str_digits', bf('set_int_max_str_digits', (I2, a, kw) => {
    const o = pyBind('set_int_max_str_digits', a, kw, ['maxdigits'], 0, false);
    const n = asIndex(o.maxdigits);
    if (n !== 0n && (n < 640n)) throw pyErr('ValueError', 'maxdigits must be 0 or larger than 640');
    if (n > 2147483647n) throw pyErr('OverflowError', 'Python int too large to convert to C int');
    I.intMaxStrDigits = Number(n);
    setIntMaxStrDigits(Number(n));
    return null;
  }, 'sys'));
  return new PyModule('sys', d);
}
function makeCopy(I) {
  const d = new Map();
  const shallow = (v) => {
    if (v instanceof PyList) return new PyList(v.items.slice());
    if (v instanceof PyDict) { const r = new PyDict(v.ctype); r.factory = v.factory; for (const [k, x] of v.entries()) r.set(k, x); return r; }
    if (v instanceof PySet) return v.copy();
    if (v instanceof PyDeque) return new PyDeque(v.items.slice(), v.maxlen);
    return v;
  };
  const deep = (v, memo = new Map()) => {
    if (v === null || typeof v !== 'object') return v;
    if (memo.has(v)) return memo.get(v);
    let r;
    if (v instanceof PyList) { r = new PyList([]); memo.set(v, r); r.items = v.items.map((x) => deep(x, memo)); } else if (v instanceof PyTuple) { r = new PyTuple(v.items.map((x) => deep(x, memo))); } else if (v instanceof PyDict) { r = new PyDict(v.ctype); r.factory = v.factory; memo.set(v, r); for (const [k, x] of v.entries()) r.set(deep(k, memo), deep(x, memo)); } else if (v instanceof PySet) { r = new PySet(v.frozen); for (const k of v.keys()) r.add(deep(k, memo)); } else if (v instanceof PyDeque) { r = new PyDeque(v.items.map((x) => deep(x, memo)), v.maxlen); } else r = v;
    memo.set(v, r);
    return r;
  };
  d.set('copy', pyFunction(bf('copy', (I2, a) => shallow(a[0]), 'copy')));
  d.set('deepcopy', pyFunction(bf('deepcopy', (I2, a) => deep(a[0]), 'copy')));
  return new PyModule('copy', d, { file: FILES.copy });
}

// ------------------------------------------------------------------ keyword
function makeKeyword() {
  const d = new Map();
  const kw = new PyList(KW_LIST.map((k) => k)), soft = new PyList(SOFT_KW_LIST.map((k) => k));
  const kwSet = new PySet(true), softSet = new PySet(true);
  for (const k of KW_LIST) kwSet.add(k);
  for (const k of SOFT_KW_LIST) softSet.add(k);
  // iskeyword = frozenset(kwlist).__contains__
  const contains = (set) => (I2, self, a, kw2) => { noKw('frozenset.__contains__', kw2); nArgs('frozenset.__contains__', a, 1); return set.has(a[0]); };
  d.set('__all__', new PyList(['iskeyword', 'issoftkeyword', 'kwlist', 'softkwlist']));
  d.set('kwlist', kw);
  d.set('softkwlist', soft);
  d.set('iskeyword', new PyBuiltin('__contains__', contains(kwSet), { self: kwSet }));
  d.set('issoftkeyword', new PyBuiltin('__contains__', contains(softSet), { self: softSet }));
  return new PyModule('keyword', d, { file: PYLIB + 'keyword.py' });
}
const FACTORIES = { math: makeMath, random: makeRandom, statistics: makeStatistics, time: makeTime, collections: makeCollections, datetime: makeDatetime, string: makeString, sys: makeSys, copy: makeCopy, keyword: makeKeyword };
export const SUPPORTED_MODULES = Object.keys(FACTORIES);

export function importModule(I, name) {
  const cached = I.modules.get(name);
  if (cached) return cached;
  let mod;
  if (Object.prototype.hasOwnProperty.call(I.hostModules, name)) mod = wrapHostModule(I, name, I.hostModules[name]);
  else if (FACTORIES[name]) mod = FACTORIES[name](I);
  else if (Object.keys(I.hostModules).some((k) => k.startsWith(name + '.'))) {
    // package for dotted host modules, e.g. 'matplotlib' for 'matplotlib.pyplot'
    mod = new PyModule(name, new Map(), { host: true });
    I.modules.set(name, mod);
    // its submodules / subpackages: 'a.b.c' makes 'a' a package with a subpackage 'b'
    for (const k of Object.keys(I.hostModules)) {
      if (!k.startsWith(name + '.')) continue;
      const child = k.slice(name.length + 1).split('.')[0];
      if (!mod.dict.has(child)) mod.dict.set(child, importModule(I, name + '.' + child));
    }
    return mod;
  } else if (name.includes('.')) {
    const parts = name.split('.');
    const parent = parts.slice(0, -1).join('.');
    const pm = importModule(I, parent);
    const sub = pm.dict.get(parts[parts.length - 1]);
    if (sub instanceof PyModule) return sub;
    throw pyErr('ModuleNotFoundError', `No module named '${name}'; '${parent}' is not a package`);
  } else if (STDLIB.has(name)) {
    const e = pyErr('ModuleNotFoundError', `minipy does not support the '${name}' module yet`);
    e.name = name;
    throw e;
  } else {
    const e = pyErr('ModuleNotFoundError', `No module named '${name}'`);
    e.name = name;
    throw e;
  }
  I.modules.set(name, mod);
  if (!mod.host) Object.defineProperty(mod, 'ownerInterp', { value: I, configurable: true });   // evalExpression's sandbox
  if (I.sysModules) I.sysModules.set(name, mod);
  if (name === 'sys') mod.dict.get('modules').set('sys', mod);
  if (name.includes('.')) {
    const parent = name.split('.').slice(0, -1).join('.');
    try { const pm = importModule(I, parent); pm.dict.set(name.split('.').pop(), mod); } catch (e) { /* ignore */ }
  }
  return mod;
}

// ------------------------------------------------------------------ host interop
export function wrapHostModule(I, name, obj) {
  const d = new Map();
  const mod = new PyModule(name, d, { host: true });
  mod.hostObj = obj;   // attribute reads and writes go to the JS object itself (m.pos = 10 is seen by its methods)
  mod.hostSeen = new Map();
  for (const key of Object.keys(obj)) {
    if (key.startsWith('__')) continue;
    const v = obj[key];
    d.set(key, typeof v === 'function' ? hostCallable(I, key, v, obj, name) : fromHost(I, v));
    if (v !== null && typeof v === 'object') mod.hostSeen.set(key, v);
  }
  // the names a module object has on its class (methods of a module written as a JS class instance)
  for (const key of hostAttrNames(obj)) if (!d.has(key) && !key.startsWith('__')) { try { const v = obj[key]; if (typeof v === 'function') d.set(key, hostCallable(I, key, v, obj, name)); } catch (e) { /* a getter that throws: read later */ } }
  return mod;
}
/** a JS function of a host: a JS class becomes a Python type (turtle.Turtle), any other function a callable */
function hostCallable(I, name, fn, thisArg, modName) {
  if (isJsConstructor(fn) && !(I && I.pyOfJsFn && I.pyOfJsFn.get(fn))) return hostClassType(fn, modName);
  return hostFunction(I, name, fn, thisArg, modName);
}
/** module.attr of a host module: the JS property as it is now (null when the module has no such property) */
export function hostModuleGetAttr(I, mod, name) {
  const o = mod.hostObj;
  // own properties and those of the object's class (not Object.prototype's toString, constructor...)
  if (name.startsWith('__') || !(Object.prototype.hasOwnProperty.call(o, name) || (name in o && !(name in Object.prototype)))) return undefined;
  let v;
  try { v = o[name]; } catch (e) { throw hostError(e, mod.name); }
  if (v === undefined) return undefined;
  if (typeof v === 'function') return hostCallable(I, name, v, o, mod.name);
  // an array / data object converted at import (or at an earlier read) stays the same Python object while the
  // property holds the same JS value, so changes made from Python are kept
  const prev = mod.dict.get(name);
  if (v !== null && typeof v === 'object') {
    const seen = mod.hostSeen || (mod.hostSeen = new Map());
    if (seen.get(name) === v && prev !== undefined) return prev;
    seen.set(name, v);
  }
  const pv = fromHost(I, v);
  mod.dict.set(name, pv);
  return pv;
}
const NO_THIS = {};
/** the Python callable for a JS function (one per function and `this`, so `m.f is m.f` and identity round trips) */
export function hostFunction(I, name, fn, thisArg, modName) {
  // a JS wrapper made by toHost() for a Python function comes back as that function
  const back = I && I.pyOfJsFn && I.pyOfJsFn.get(fn);
  if (back) return back;
  const cache = I && (I.hostFnCache || (I.hostFnCache = new WeakMap()));
  let per = cache && cache.get(fn);
  const key = thisArg === null || thisArg === undefined || typeof thisArg !== 'object' ? NO_THIS : thisArg;
  if (per) { const hit = per.get(key); if (hit) return hit; } else if (cache) { per = new WeakMap(); cache.set(fn, per); }
  const b = makeHostFunction(I, name, fn, thisArg, modName);
  b.hostFn = fn;
  if (per) per.set(key, b);
  return b;
}
/** a JS class (or an old-style constructor with prototype methods) is called with `new`, like turtle.Turtle() */
function isJsConstructor(fn) {
  if (typeof fn !== 'function' || !fn.prototype) return false;
  if (/^class[\s{]/.test(Function.prototype.toString.call(fn))) return true;
  return Object.getOwnPropertyNames(fn.prototype).length > 1;
}
function makeHostFunction(I, name, fn, thisArg, modName) {
  const ctor = isJsConstructor(fn);
  return new PyBuiltin(name, (I2, args, kw) => {
    if (I2 && I2.callsRefused) throw new CallRefusedError(name);
    const jsArgs = hostArgs(I, args, kw);
    let r;
    try { r = ctor ? new fn(...jsArgs) : fn.apply(thisArg, jsArgs); } catch (e) { throw hostError(e, modName); }
    return fromHost(I, r);
  }, { module: modName });
}
function hostArgs(I, args, kw) {
  const jsArgs = args.map((a) => toHost(I, a));
  if (kw && Object.keys(kw).length) { const k = {}; for (const key in kw) k[key] = toHost(I, kw[key]); jsArgs.push({ __kwargs: k }); }
  return jsArgs;
}
/**
 * a JS error thrown by the host → the Python exception to raise: an instance of a host exception class (a JS class
 * extending Error that a module exposes, e.g. turtle.TurtleGraphicsError), or e.pyType naming a builtin exception, or
 * e.pyType naming the host's own exception class (created once per module and name, base e.pyBase or Exception,
 * module e.pyModule or the host module the call belongs to); anything else is a RuntimeError
 */
export function hostError(e, modName) {
  if (e instanceof PyExc) return e;
  if (e && e.pyExc instanceof PyExc) return e.pyExc;   // a Python callback that failed inside the host call
  if (e instanceof CallRefusedError || (e && e.callRefused)) return e;
  const msg = e && e.message !== undefined ? String(e.message) : String(e);
  const ct = e && typeof e === 'object' && e.constructor ? HOST_CLASS_TYPES.get(e.constructor) : undefined;
  if (ct && ct.isExc) return new PyExc(ct, msg === '' ? [] : [msg]);
  const tn = e && e.pyType;
  if (typeof tn === 'string' && tn) {
    if (EXC[tn]) return pyErr(tn, msg);
    const short = tn.split('.').pop();
    const mod = e.pyModule || (tn.includes('.') ? tn.split('.').slice(0, -1).join('.') : modName) || 'builtins';
    return new PyExc(hostExcType(mod, short, e.pyBase), msg === '' ? [] : [msg]);
  }
  return pyErr('RuntimeError', msg);
}
const HOST_EXC_BY_NAME = new Map();   // 'turtle.TurtleGraphicsError' → its type (also the class a module exposes)
function hostExcType(mod, name, baseName) {
  const key = mod + '.' + name;
  let t = HOST_EXC_BY_NAME.get(key);
  if (!t) {
    const base = baseName && EXC[baseName] ? EXC[baseName] : baseName && HOST_EXC_BY_NAME.get(baseName) ? HOST_EXC_BY_NAME.get(baseName) : EXC.Exception;
    t = new PyType(name, base, { isExc: true, module: mod, dirName: 'exception' });
    HOST_EXC_BY_NAME.set(key, t);
  }
  return t;
}
/**
 * the Python type of a JS class a host exposes (one per class): calling it constructs with `new`, isinstance() and
 * type() know its instances, its methods can be read from it (turtle.Turtle.forward) and called with an instance;
 * a class extending Error is an exception class (base: the static pyBase name, else Exception)
 */
export function hostClassType(ctor, modName) {
  let t = HOST_CLASS_TYPES.get(ctor);
  if (t) return t;
  const isErr = ctor === Error || (ctor.prototype instanceof Error);
  let full = typeof ctor.__pyname === 'string' ? ctor.__pyname : null;
  if (!full && ctor.prototype) {
    try { const pd = Object.getOwnPropertyDescriptor(ctor.prototype, '__pyname'); if (pd && typeof pd.value === 'string') full = pd.value; } catch (e) { /* ignore */ }
  }
  const name = full ? full.split('.').pop() : ctor.name || 'object';
  const module = full && full.includes('.') ? full.split('.').slice(0, -1).join('.') : (modName || 'builtins');
  if (isErr) {
    const key = module + '.' + name;
    t = HOST_EXC_BY_NAME.get(key);
    if (!t) {
      const parent = Object.getPrototypeOf(ctor);
      const base = typeof parent === 'function' && parent !== Error && parent.prototype instanceof Error ? hostClassType(parent, modName)
        : (typeof ctor.pyBase === 'string' && EXC[ctor.pyBase]) || EXC.Exception;
      t = new PyType(name, base, { isExc: true, module, dirName: 'exception' });
      HOST_EXC_BY_NAME.set(key, t);
    }
  } else {
    const parent = Object.getPrototypeOf(ctor);
    const base = typeof parent === 'function' && parent !== Function.prototype && isJsConstructor(parent) ? hostClassType(parent, modName) : T.object;
    t = new PyType(name, base, { module });
    t.hostCtor = (I2, args, kw) => {
      if (I2 && I2.callsRefused) throw new CallRefusedError(name);
      const jsArgs = hostArgs(I2, args, kw);
      let r;
      try { r = new ctor(...jsArgs); } catch (e) { throw hostError(e, module); }
      return fromHost(I2, r);
    };
  }
  t.hostClass = ctor;
  HOST_CLASS_TYPES.set(ctor, t);
  return t;
}
/** turtle.Turtle.forward: static members of the class, or its methods as functions taking the instance first */
export function hostTypeGetAttr(I, t, name) {
  const ctor = t.hostClass;
  if (!ctor || name.startsWith('__')) return undefined;
  if (Object.prototype.hasOwnProperty.call(ctor, name) && !['length', 'name', 'prototype'].includes(name)) {
    const v = ctor[name];
    return typeof v === 'function' ? hostCallable(I, name, v, ctor, t.module) : fromHost(I, v);
  }
  const proto = ctor.prototype;
  if (!proto || !(name in proto) || name in Object.prototype) return undefined;
  let m;
  try { m = proto[name]; } catch (e) { return undefined; }
  if (typeof m !== 'function') return undefined;
  const b = new PyBuiltin(name, (I2, args, kw) => {
    if (!args.length) throw pyErr('TypeError', `unbound method ${t.name}.${name}() needs an argument`);
    const self = args[0];
    if (!(self instanceof PyHost && self.obj instanceof ctor)) throw pyErr('TypeError', `descriptor '${name}' for '${t.name}' objects doesn't apply to a '${typeName(self)}' object`);
    if (I2 && I2.callsRefused) throw new CallRefusedError(name);
    let r;
    try { r = m.apply(self.obj, hostArgs(I, args.slice(1), kw)); } catch (e) { throw hostError(e, t.module); }
    return fromHost(I, r);
  }, { module: t.module });
  b.pyKind = 'function';
  b.pyQual = `${t.name}.${name}`;
  return b;
}
/** the attribute names of a host object, like dir(): its own properties and the methods of its classes */
export function hostAttrNames(o) {
  const names = new Set();
  if (o === null || (typeof o !== 'object' && typeof o !== 'function')) return [];
  try {
    for (const k of Object.keys(o)) names.add(k);
    for (let p = Object.getPrototypeOf(o); p && p !== Object.prototype && p !== Function.prototype; p = Object.getPrototypeOf(p)) {
      for (const k of Object.getOwnPropertyNames(p)) names.add(k);
    }
  } catch (e) { /* a Proxy or exotic object */ }
  names.delete('constructor');
  // JS-side conventions of minipy (__pyname, __kwargs...) are not Python attributes; dunder methods are
  return [...names].filter((k) => !k.startsWith('__') || (k.endsWith('__') && k.length > 4)).sort();
}
/** a host object's dunder method (Python protocols: __len__, __iter__, __eq__, __add__...): undefined when it has none */
function hostDunderCall(h, name, args) {
  const o = h.obj;
  if (o === null || (typeof o !== 'object' && typeof o !== 'function')) return undefined;
  let f;
  try { f = o[name]; } catch (e) { throw hostError(e, null); }
  if (typeof f !== 'function') return undefined;
  const I = h.I || null;
  let r;
  try { r = f.apply(o, args.map((a) => toHost(I, a))); } catch (e) { throw hostError(e, hostModuleOf(h)); }
  if (r === undefined) return undefined;
  if (r !== null && typeof r === 'object' && r.__notImplemented === true) return NOT_IMPLEMENTED;
  return fromHost(I, r);
}
const hostModuleOf = (h) => (h.name && h.name.includes('.') ? h.name.split('.').slice(0, -1).join('.') : null);
/** iterating a host object: its __iter__ gives an Array, a JS iterator (next() → { value, done }) or iterable */
function hostIter(h) {
  const o = h.obj;
  if (o === null || typeof o !== 'object' || typeof o.__iter__ !== 'function') return null;
  const I = h.I || null;
  let r;
  try { r = o.__iter__(); } catch (e) { throw hostError(e, hostModuleOf(h)); }
  if (Array.isArray(r)) { let i = 0; return () => (i < r.length ? fromHost(I, r[i++]) : STOP); }
  if (r && typeof r.next !== 'function' && typeof r[Symbol.iterator] === 'function') r = r[Symbol.iterator]();
  if (r && typeof r.next === 'function') {
    return () => {
      let x;
      try { x = r.next(); } catch (e) { throw hostError(e, hostModuleOf(h)); }
      return !x || x.done ? STOP : fromHost(I, x.value);
    };
  }
  const v = fromHost(I, r);
  if (v instanceof PyList || v instanceof PyTuple) { let i = 0; return () => (i < v.items.length ? v.items[i++] : STOP); }
  return null;
}
HOST_HOOKS.dunder = hostDunderCall;
HOST_HOOKS.iter = hostIter;
export { hostDunderCall };
export function toHost(I, v) {
  const typed = !!(I && I.hostArgsTyped);
  switch (typeof v) {
    case 'bigint': return v >= -9007199254740991n && v <= 9007199254740991n ? Number(v) : v;
    // hostArgs: 'typed': a float with an integral value (80.0, -0.0) arrives as { __float: x }, like a host returns it
    case 'number': return typed && (Number.isInteger(v) || Object.is(v, -0)) ? { __float: v } : v;
    case 'string': case 'boolean': return v;
  }
  if (v === null || v === undefined) return null;
  if (v instanceof PyTuple && typed) return { __tuple: v.items.map((x) => toHost(I, x)) };
  if (v instanceof PyList || v instanceof PyTuple || v instanceof PyDeque) return v.items.map((x) => toHost(I, x));
  if (v instanceof PySet) return v.keys().map((x) => toHost(I, x));
  if (v instanceof PyRange) return toArray(v, I).map((x) => toHost(I, x));
  // dict views and iterators (map, zip, filter, reversed, enumerate, generator expressions) become Arrays, like list()
  if (v instanceof PyDictView) {
    if (v.kind === 'keys') return v.dict.keys().map((x) => toHost(I, x));
    if (v.kind === 'values') return v.dict.values().map((x) => toHost(I, x));
    return v.dict.entries().map(([k, x]) => toHost(I, new PyTuple([k, x])));
  }
  if (v instanceof PyIter) return toArray(v, I).map((x) => toHost(I, x));
  if (v instanceof PySlice) return { __slice: [toHost(I, v.start), toHost(I, v.stop), toHost(I, v.step)] };
  if (v instanceof PyDict) { const o = {}; for (const [k, x] of v.entries()) o[typeof k === 'string' ? k : repr(k)] = toHost(I, x); return o; }
  if (v instanceof PyHost) return v.obj;
  if (v instanceof PyBuiltin && v.hostFn) return v.hostFn;   // a host function goes back as itself
  if (v instanceof PyFunction || v instanceof PyBuiltin) {
    // one JS wrapper per Python function, remembered so that it comes back as the same Python object
    const cache = I.jsOfPyFn || (I.jsOfPyFn = new WeakMap());
    let w = cache.get(v);
    if (!w) {
      // a Python error in the callback reaches the host as a JS Error (message, name = exception type, pyError =
      // the PyError with its traceback, pyExc = the exception, rethrown as itself if it comes back into Python)
      w = (...args) => {
        const leave = I.enterHost ? I.enterHost() : null;
        try { return toHost(I, I.callSync(v, args.map((a) => fromHost(I, a)), null)); } catch (e) {
          if (!(e instanceof PyExc)) throw e;
          const pe = I.pyErrorOf ? I.pyErrorOf(e) : { type: e.type.name, message: '' };
          const err = new Error(pe.message);
          err.name = pe.type;
          err.pyError = pe;
          err.pyExc = e;
          throw err;
        } finally { if (leave) leave(); }
      };
      cache.set(v, w);
      (I.pyOfJsFn || (I.pyOfJsFn = new WeakMap())).set(w, v);
    }
    return w;
  }
  return v;
}
export function fromHost(I, x) {
  if (x === undefined || x === null) return null;
  switch (typeof x) {
    case 'boolean': return x;
    case 'number': return Number.isInteger(x) && !Object.is(x, -0) ? BigInt(x) : x;
    case 'bigint': return x;
    case 'string': return x;
    case 'function': return (I && I.pyOfJsFn && I.pyOfJsFn.get(x)) || hostCallable(I, x.name || 'function', x, null, null);
  }
  if (Array.isArray(x)) return new PyList(x.map((y) => fromHost(I, y)));
  if (typeof x === 'object') {
    if (x instanceof PyHost || x instanceof PyList || x instanceof PyTuple || x instanceof PyDict || x instanceof PyExc) return x;
    if ('__float' in x) return Number(x.__float);
    if ('__tuple' in x) return new PyTuple((x.__tuple || []).map((y) => fromHost(I, y)));
    const proto = Object.getPrototypeOf(x);
    let hasFn = false;
    for (const k in x) if (typeof x[k] === 'function') { hasFn = true; break; }
    if (!hasFn && (proto === Object.prototype || proto === null)) {
      const d = new PyDict(); for (const k of Object.keys(x)) d.set(k, fromHost(I, x[k])); return d;
    }
    // the same JS object always becomes the same Python object (turtle.Screen() is turtle.Screen(); id() and the
    // View ids of the snapshot agree)
    const cache = I && I.hostObjs;
    let h = cache && cache.get(x);
    if (!h) {
      h = new PyHost(x, x.__pyname || (proto && proto.constructor && proto.constructor.name !== 'Object' ? proto.constructor.name : 'object'));
      Object.defineProperty(h, 'I', { value: I, configurable: true });   // for its protocols (__len__, __eq__...)
      if (cache) cache.set(x, h);
    }
    return h;
  }
  return null;
}
export function hostGetAttr(I, h, name) {
  const o = h.obj;
  let has, v;
  // a getter that throws an Error with pyType raises that exception (like a host function call)
  try { has = name in o; if (has) v = o[name]; } catch (e) { throw hostError(e, hostModuleOf(h)); }
  if (!has) throw attrError(h, name);   // with CPython's "Did you mean" from the object's own and class attributes
  if (typeof v === 'function') {
    if (isJsConstructor(v) && !(I && I.pyOfJsFn && I.pyOfJsFn.get(v))) return hostClassType(v, hostModuleOf(h));
    return hostMethod(I, name, v, h);
  }
  return fromHost(I, v);
}
/** a method of a host object: a bound method, <bound method Turtle.forward of <turtle.Turtle object at 0x...>> */
function hostMethod(I, name, fn, h) {
  const o = h.obj;
  const cache = I && (I.hostMethCache || (I.hostMethCache = new WeakMap()));
  let per = cache && cache.get(fn);
  if (per) { const hit = per.get(o); if (hit) return hit; } else if (cache) { per = new WeakMap(); cache.set(fn, per); }
  const back = I && I.pyOfJsFn && I.pyOfJsFn.get(fn);
  if (back) return back;   // a Python function stored on the host object
  const modName = hostModuleOf(h);
  const b = new PyBuiltin(name, (I2, self, args, kw) => {
    if (I2 && I2.callsRefused) throw new CallRefusedError(name);
    const jsArgs = hostArgs(I, args, kw);
    let r;
    try { r = fn.apply(o, jsArgs); } catch (e) { throw hostError(e, modName); }
    return fromHost(I, r);
  }, { self: h, module: modName });
  // the class that defines it names it (Turtle.forward)
  let owner = o;
  try { while (owner && !Object.prototype.hasOwnProperty.call(owner, name)) owner = Object.getPrototypeOf(owner); } catch (e) { owner = null; }
  let cls = h.name.split('.').pop();
  if (owner && owner !== o && owner.constructor) {
    const t = HOST_CLASS_TYPES.get(owner.constructor);
    if (t) cls = t.name;
    else { try { const pd = Object.getOwnPropertyDescriptor(owner, '__pyname'); cls = pd && typeof pd.value === 'string' ? pd.value.split('.').pop() : owner.constructor.name || cls; } catch (e) { /* keep */ } }
  }
  b.pyKind = 'method';
  b.pyQual = `${cls}.${name}`;
  b.hostFn = (...a) => fn.apply(o, a);   // handed back to the host: still bound to its object
  if (per) per.set(o, b);
  return b;
}
export function hostSetAttr(I, h, name, v) { h.obj[name] = toHost(I, v); }
export function hostModuleSetAttr(I, mod, name, v) {
  mod.dict.set(name, v);
  const jv = toHost(I, v);
  mod.hostObj[name] = jv;
  if (mod.hostSeen) { if (jv !== null && typeof jv === 'object') mod.hostSeen.set(name, jv); else mod.hostSeen.delete(name); }
}

void STOP; void sub; void lt; void eq; void isinstance; void isCallable; void callType; void getIter; void truthy; void PyType;
