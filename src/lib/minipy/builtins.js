// minipy — builtin functions, type constructors, methods of builtin types and attribute access.
import {
  T, EXC, STOP, PyExc, pyErr, typeName, typeOf, isIntLike, isNumber, toBig, toFloat, floatToBig, bigToFloat, isinstance,
  PyList, PyTuple, PyDict, PySet, PyRange, PyDeque, PySlice, PyModule, PyBuiltin, PyFunction, PyIter, PyDictView, PyHost,
  PyType, PyBoundMethod, PyDate, PyDateTime, PyTimedelta, PyTime, PyGenericAlias, PyUnionType, orderedLocals, repr, str, truthy, pyLen, eq, lt, compare, contains, pyHash, toSsize,
  sameObj, getIntMaxStrDigits, PyNsDict, setKeyArg, chrOf, ordOf, surrogateWriteError,
  rangeLen, strLen, hasSurrogates, counterOrder, daysInMonth, isLeap, ordinalToDate, floatToRatio, ratioToFloat, ELLIPSIS,
  setUnionInto, setIntersection, setDifference, setDifferenceUpdate, setSymDiff, setSymDiffUpdate,
} from './values.js';
import { getIter, toArray, add, divmod, pow as powOp, normIndex, sliceIndices, dequeAppend, bigMod, getitem } from './ops.js';
import { roundFloat, formatValue, floatRepr, formatAddr } from './numfmt.js';
import { DIRS } from './pydata.js';
import { suggestName } from './suggest.js';
import { timsort } from './sort.js';
import { PYDOCS } from './pydocs.js';
import { METHOD_DOCS } from './methoddocs.js';
import { pyUpper, pyLower, pyCasefold, pyTitle, pyCapitalize, pySwapcase, pyIsUpper, pyIsLower, pyIsTitle } from './unicase.js';
import { uflags, allHave, decimalValue as decimalValueCp, U_ALPHA, U_DECIMAL, U_DIGIT, U_NUMERIC, U_PRINTABLE, U_XID_START, U_XID_CONT } from './unidata.js';

// ------------------------------------------------------------------ object ids (values.js: IdSpace)
import { objId, viewId, pyId, IdSpace, useIdSpaces } from './values.js';
export { objId, viewId, pyId, IdSpace, useIdSpaces };

// ------------------------------------------------------------------ argument helpers
function noKw(name, kw) {
  if (kw) for (const k in kw) throw pyErr('TypeError', `${name}() takes no keyword arguments`);
}
function exactArgs(name, args, n) {
  if (args.length !== n) {
    if (n === 0) throw pyErr('TypeError', `${name}() takes no arguments (${args.length} given)`);
    if (n === 1) throw pyErr('TypeError', `${name}() takes exactly one argument (${args.length} given)`);
    throw pyErr('TypeError', `${name} expected ${n} arguments, got ${args.length}`);
  }
}
function rangeArgs(name, args, min, max) {
  if (args.length < min) throw pyErr('TypeError', `${name} expected at least ${min} argument${min === 1 ? '' : 's'}, got ${args.length}`);
  if (args.length > max) throw pyErr('TypeError', `${name} expected at most ${max} argument${max === 1 ? '' : 's'}, got ${args.length}`);
}
/** CPython's _PyArg_CheckPositional wording: "center expected at most 2 arguments, got 3" */
export function expectArgs(name, args, min, max) {
  const n = args.length;
  if (n < min) throw pyErr('TypeError', min === max ? `${name} expected ${min} argument${min === 1 ? '' : 's'}, got ${n}` : `${name} expected at least ${min} argument${min === 1 ? '' : 's'}, got ${n}`);
  if (n > max) throw pyErr('TypeError', min === max ? `${name} expected ${max} argument${max === 1 ? '' : 's'}, got ${n}` : `${name} expected at most ${max} argument${max === 1 ? '' : 's'}, got ${n}`);
}
/** arity errors of functions written in Python (random.py, statistics.py, collections): bindArgs wording */
export function pyFuncArgs(qn, args, params, ndefaults = 0, isMethod = false) {
  const off = isMethod ? 1 : 0;
  const given = args.length + off, total = params.length + off;
  if (args.length > params.length) {
    const sig = ndefaults ? `from ${total - ndefaults} to ${total}` : String(total);
    const plural = ndefaults ? true : total !== 1;
    throw pyErr('TypeError', `${qn}() takes ${sig} positional argument${plural ? 's' : ''} but ${given} ${given === 1 ? 'was' : 'were'} given`);
  }
  const required = params.slice(0, params.length - ndefaults);
  if (args.length < required.length) {
    const miss = required.slice(args.length).map((x) => `'${x}'`);
    const list = miss.length === 1 ? miss[0] : miss.length === 2 ? `${miss[0]} and ${miss[1]}` : miss.slice(0, -2).join(', ') + ', ' + miss[miss.length - 2] + ', and ' + miss[miss.length - 1];
    throw pyErr('TypeError', `${qn}() missing ${miss.length} required positional argument${miss.length === 1 ? '' : 's'}: ${list}`);
  }
}
/**
 * Bind the arguments of a library function written in Python (random.py, statistics.py, collections) the way
 * CPython binds a call: keywords first (unexpected → "Did you mean"), then too many positionals, then missing ones.
 * params: positional-or-keyword names (without self), the last `ndefaults` optional; kwonly: keyword-only names.
 * Returns { name: value } (absent optional parameters are left undefined).
 */
export function pyBind(qn, args, kw, params, ndefaults = 0, isMethod = false, kwonly = []) {
  const out = {};
  const n = Math.min(args.length, params.length);
  for (let i = 0; i < n; i++) out[params[i]] = args[i];
  if (kw) {
    for (const k in kw) {
      if (params.includes(k)) {
        if (k in out) throw pyErr('TypeError', `${qn}() got multiple values for argument '${k}'`);
        out[k] = kw[k];
      } else if (kwonly.includes(k)) out[k] = kw[k];
      else throw unexpectedKw(qn, k, [...(isMethod ? ['self'] : []), ...params, ...kwonly]);
    }
  }
  if (args.length > params.length) pyFuncArgs(qn, args, params, ndefaults, isMethod);
  const miss = params.slice(0, params.length - ndefaults).filter((p) => !(p in out)).map((x) => `'${x}'`);
  if (miss.length) {
    const list = miss.length === 1 ? miss[0] : miss.length === 2 ? `${miss[0]} and ${miss[1]}` : miss.slice(0, -2).join(', ') + ', ' + miss[miss.length - 2] + ', and ' + miss[miss.length - 1];
    throw pyErr('TypeError', `${qn}() missing ${miss.length} required positional argument${miss.length === 1 ? '' : 's'}: ${list}`);
  }
  return out;
}
function atMost(name, args, max) {
  if (args.length > max) throw pyErr('TypeError', `${name}() takes at most ${max} argument${max === 1 ? '' : 's'} (${args.length} given)`);
}
/** CPython 3.13 wording: "sort() got an unexpected keyword argument 'keys'. Did you mean 'key'?" */
export function unexpectedKw(name, k, allowed) {
  const sug = suggestName(allowed, k);
  return pyErr('TypeError', `${name}() got an unexpected keyword argument '${k}'` + (sug ? `. Did you mean '${sug}'?` : ''));
}
/** keyword arguments of a builtin: unknown names raise TypeError (with a suggestion); maxKw: keyword-only count */
export function kwArgs(name, kw, allowed, maxKw) {
  const out = {};
  if (!kw) return out;
  const keys = Object.keys(kw);
  if (maxKw !== undefined && keys.length > maxKw) throw pyErr('TypeError', `${name}() takes at most ${maxKw} keyword argument${maxKw === 1 ? '' : 's'} (${keys.length} given)`);
  for (const k of keys) {
    if (!allowed.includes(k)) throw unexpectedKw(name, k, allowed);
    out[k] = kw[k];
  }
  return out;
}
export function asIndex(v, what) {
  if (typeof v === 'bigint') return v;
  if (typeof v === 'boolean') return v ? 1n : 0n;
  throw pyErr('TypeError', what || `'${typeName(v)}' object cannot be interpreted as an integer`);
}
const num = (v) => Number(asIndex(v));
function isIterable(v) {
  return typeof v === 'string' || v instanceof PyList || v instanceof PyTuple || v instanceof PyDict || v instanceof PySet ||
    v instanceof PyRange || v instanceof PyDeque || v instanceof PyIter || v instanceof PyDictView || (v instanceof PyHost && (Array.isArray(v.obj) || typeof v.obj.__iter__ === 'function'));
}

// ------------------------------------------------------------------ strings: Python whitespace, digits, case
const PY_WS = new Set([' ', '\t', '\n', '\r', '\x0b', '\x0c', '\x1c', '\x1d', '\x1e', '\x1f', '\x85', '\xa0', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', '\u2028', '\u2029', ' ', ' ', '　']);
export const isPySpace = (c) => PY_WS.has(c);
export function pyStrip(s, chars, left = true, right = true) {
  const test = chars == null ? isPySpace : (c) => chars.includes(c);
  const cs = hasSurrogates(s) ? Array.from(s) : null;
  const arr = cs || s;
  let i = 0, j = arr.length;
  if (left) while (i < j && test(arr[i])) i++;
  if (right) while (j > i && test(arr[j - 1])) j--;
  return cs ? cs.slice(i, j).join('') : s.slice(i, j);
}
/** Py_UNICODE_TODECIMAL (Unicode 15.1 data) */
function decimalValue(c) { return decimalValueCp(c.codePointAt(0)); }
/** the text int() / float() parse: _PyUnicode_TransformDecimalAndSpaceToASCII (non-ASCII spaces become ' ',
 * Unicode digits ASCII digits), then only the C whitespace ' \t\n\v\f\r' is stripped */
function numText(s) {
  let out = '';
  if (/^[\x00-\x7e]*$/.test(s)) out = s;
  else {
    for (const c of s) {
      if (c.codePointAt(0) < 127) { out += c; continue; }
      if (isPySpace(c)) { out += ' '; continue; }
      const d = decimalValue(c);
      if (d < 0) { out += '?'; break; }
      out += String(d);
    }
  }
  return out.replace(/^[ \t\n\v\f\r]+/, '').replace(/[ \t\n\v\f\r]+$/, '');
}
// ------------------------------------------------------------------ number parsing
const INT_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
export function parseIntStr(orig, base, I) {
  // CPython formats the literal with %.200R: its repr cut to 200 characters
  const fail = () => pyErr('ValueError', `invalid literal for int() with base ${base}: ${Array.from(repr(orig)).slice(0, 200).join('')}`);
  let s = numText(orig);
  let neg = false;
  if (s[0] === '+' || s[0] === '-') { neg = s[0] === '-'; s = s.slice(1); }
  let b = base;
  if (b === 0) {
    if (/^0[xX]/.test(s)) { b = 16; s = s.slice(2); if (s[0] === '_') s = s.slice(1); } else if (/^0[oO]/.test(s)) { b = 8; s = s.slice(2); if (s[0] === '_') s = s.slice(1); } else if (/^0[bB]/.test(s)) { b = 2; s = s.slice(2); if (s[0] === '_') s = s.slice(1); } else {
      b = 10;
      if (/^0+[1-9]/.test(s.replace(/_/g, ''))) throw fail();
    }
  } else if ((b === 16 && /^0[xX]/.test(s)) || (b === 8 && /^0[oO]/.test(s)) || (b === 2 && /^0[bB]/.test(s))) { s = s.slice(2); if (s[0] === '_') s = s.slice(1); }
  if (!s || s[0] === '_' || s[s.length - 1] === '_' || s.includes('__')) throw fail();
  const digits = s.replace(/_/g, '').toLowerCase();
  for (const c of digits) { const d = INT_CHARS.indexOf(c); if (d < 0 || d >= b) throw fail(); }
  const maxd = getIntMaxStrDigits();
  if (b === 10 && maxd > 0 && digits.length > maxd) throw pyErr('ValueError', `Exceeds the limit (${maxd} digits) for integer string conversion: value has ${digits.length} digits; use sys.set_int_max_str_digits() to increase the limit`);
  let v;
  if (b === 10) v = BigInt(digits);
  else if (b === 16) v = BigInt('0x' + digits);
  else if (b === 8) v = BigInt('0o' + digits);
  else if (b === 2) v = BigInt('0b' + digits);
  else { v = 0n; const B = BigInt(b); for (const c of digits) v = v * B + BigInt(INT_CHARS.indexOf(c)); }
  void I;
  return neg ? -v : v;
}
export function parseFloatStr(orig) {
  const s0 = numText(orig);
  const fail = () => pyErr('ValueError', `could not convert string to float: ${repr(orig)}`);
  const m = /^([+-]?)(?:(inf|infinity)|(nan))$/i.exec(s0);
  if (m) return m[3] ? NaN : (m[1] === '-' ? -Infinity : Infinity);
  if (!/^[+-]?(?:\d(?:_?\d)*(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?$/.test(s0)) throw fail();
  return Number(s0.replace(/_/g, ''));
}

// ------------------------------------------------------------------ sorting (CPython's timsort, '<' only: minipy/sort.js)
/**
 * arr: values; keys: comparison keys (same length) or null. Returns a new sorted array. Like CPython's list.sort, a
 * reverse sort reverses, sorts stably and reverses back; when a comparison raises, onFail(partial) receives the
 * values in the order reached so far (still a permutation) before the error propagates.
 */
export function pySort(arr, keys, reverse, onFail) {
  const work = keys ? arr.map((v, i) => [keys[i], v]) : arr.slice();
  const isLT = keys ? (x, y) => lt(x[0], y[0]) : (x, y) => lt(x, y);
  if (reverse) work.reverse();
  try { timsort(work, isLT); } catch (e) {
    if (onFail) { if (reverse) work.reverse(); onFail(keys ? work.map((p) => p[1]) : work); }
    throw e;
  }
  if (reverse) work.reverse();
  return keys ? work.map((p) => p[1]) : work;
}
function sortWithKey(I, items, key, reverse, onFail) {
  const keys = key === null || key === undefined ? null : items.map((x) => I.callSync(key, [x], null));
  return pySort(items, keys, truthy(reverse ?? false), onFail);
}

// ------------------------------------------------------------------ min / max / sum
function minmax(I, name, args, kw, isMax) {
  const o = kwArgs(name, kw, ['key', 'default'], 2);
  let items;
  if (args.length === 0) throw pyErr('TypeError', `${name} expected at least 1 argument, got 0`);
  if (args.length === 1) {
    items = toArray(args[0], I);
    if (!items.length) {
      if ('default' in o) return o.default;
      throw pyErr('ValueError', `${name}() iterable argument is empty`);
    }
  } else {
    if ('default' in o) throw pyErr('TypeError', `Cannot specify a default for ${name}() with multiple positional arguments`);
    items = args;
  }
  const key = o.key ?? null;
  let best = items[0], bestKey = key ? I.callSync(key, [best], null) : best;
  for (let i = 1; i < items.length; i++) {
    const x = items[i], kx = key ? I.callSync(key, [x], null) : x;
    if (isMax ? compare('>', kx, bestKey) : compare('<', kx, bestKey)) { best = x; bestKey = kx; }
  }
  return best;
}
const LONG_MAX = 9223372036854775807n, LONG_MIN = -9223372036854775808n;
function pySum(I, args, kw) {
  const o = kwArgs('sum', kw, ['start']);
  if (args.length < 1) throw pyErr('TypeError', 'sum() takes at least 1 positional argument (0 given)');
  if (args.length > 2) throw pyErr('TypeError', `sum() takes at most 2 arguments (${args.length} given)`);
  let result = args.length > 1 ? args[1] : ('start' in o ? o.start : 0n);
  if (typeof result === 'string') throw pyErr('TypeError', "sum() can't sum strings [use ''.join(seq) instead]");
  const it = getIter(args[0], I);
  let item;
  // CPython builtin_sum_impl: an int phase while the total fits a C long, then a float phase (Neumaier
  // compensation for float items only; int items are added as plain doubles), then generic additions
  if (typeof result === 'bigint' && result <= LONG_MAX && result >= LONG_MIN) {
    let i = result;
    for (;;) {
      item = it.next();
      if (item === STOP) return i;
      if (typeof item === 'bigint' || typeof item === 'boolean') {
        const b = toBig(item);
        if (b <= LONG_MAX && b >= LONG_MIN && (i >= 0n ? b <= LONG_MAX - i : b >= LONG_MIN - i)) { i += b; continue; }
      }
      result = add(i, item);
      break;
    }
  }
  if (typeof result === 'number') {
    let f = result, c = 0.0;
    for (;;) {
      item = it.next();
      if (item === STOP) { if (c && isFinite(c)) f += c; return f; }
      if (typeof item === 'number') {
        const t = f + item;
        if (Math.abs(f) >= Math.abs(item)) c += (f - t) + item; else c += (item - t) + f;
        f = t;
        continue;
      }
      if ((typeof item === 'bigint' && item <= LONG_MAX && item >= LONG_MIN) || typeof item === 'boolean') { f += Number(toBig(item)); continue; }
      if (c && isFinite(c)) f += c;
      result = add(f, item);
      break;
    }
  }
  for (;;) {
    item = it.next();
    if (item === STOP) return result;
    result = add(result, item);
  }
}

// ------------------------------------------------------------------ round
function cRound(x) { const t = Math.trunc(x); return Math.abs(x - t) >= 0.5 ? t + Math.sign(x) : t; }
function pyRound(I, args, kw) {
  const o = kwArgs('round', kw, ['number', 'ndigits']);
  const x = args.length ? args[0] : o.number;
  if (args.length > 2) throw pyErr('TypeError', `round() takes at most 2 arguments (${args.length} given)`);
  if (x === undefined) throw pyErr('TypeError', "round() missing required argument 'number' (pos 1)");
  let nd = args.length > 1 ? args[1] : ('ndigits' in o ? o.ndigits : null);
  if (typeof x === 'number') {
    if (nd === null) {
      if (x !== x) throw pyErr('ValueError', 'cannot convert float NaN to integer');
      if (!isFinite(x)) throw pyErr('OverflowError', 'cannot convert float infinity to integer');
      let r = cRound(x);
      if (Math.abs(x - r) === 0.5) r = 2 * cRound(x / 2);
      return BigInt(r);
    }
    return roundFloat(x, Number(asIndex(nd)));
  }
  if (isIntLike(x)) {
    const v = toBig(x);
    if (nd === null) return v;
    const n = asIndex(nd);
    if (n >= 0n) return v;
    const p = 10n ** (-n);
    let q = v / p, r = v % p;
    if (r < 0n) { r += p; q -= 1n; }
    const twice = r * 2n;
    if (twice > p || (twice === p && (q & 1n))) q += 1n;
    return q * p;
  }
  throw pyErr('TypeError', `type ${typeName(x)} doesn't define __round__ method`);
}

// ------------------------------------------------------------------ str.format (port of Objects/stringlib/unicode_format.h)
function asciiOf(r) {
  let s = '';
  for (const ch of r) { const c = ordOf(ch); s += c < 128 ? ch : c < 0x100 ? '\\x' + c.toString(16).padStart(2, '0') : c < 0x10000 ? '\\u' + c.toString(16).padStart(4, '0') : '\\U' + c.toString(16).padStart(8, '0'); }
  return s;
}
/** get_integer(): a run of decimal digits → number, anything else → -1 */
function fmtInteger(s) {
  if (!s.length || !/^[0-9]+$/.test(s)) return -1;
  const n = Number(s);
  if (!Number.isSafeInteger(n)) throw pyErr('ValueError', 'Too many decimal digits in format string');
  return n;
}
/**
 * str.format / str.format_map. args: positional values (null for format_map: positional fields are an error);
 * kw: plain object of keyword values, or getKw(name) for format_map.
 */
export function strFormat(I, fmt, args, kw, getKw) {
  const auto = { state: 0, n: 0 };   // 0 init, 1 auto, 2 manual (shared with nested format specs)
  return buildString(I, fmt, args, kw, getKw, 2, auto);
}
function buildString(I, fmt, args, kw, getKw, depth, auto) {
  if (depth <= 0) throw pyErr('ValueError', 'Max string recursion exceeded');
  let out = '';
  let pos = 0;
  const end = fmt.length;
  while (pos < end) {
    // MarkupIterator_next: literal text up to the first '{' or '}'
    const start = pos;
    let c = '', markup = false;
    while (pos < end) { c = fmt[pos++]; if (c === '{' || c === '}') { markup = true; break; } }
    const atEnd = pos >= end;
    let len = pos - start;
    if (markup && c === '}' && (atEnd || fmt[pos] !== '}')) throw pyErr('ValueError', "Single '}' encountered in format string");
    if (markup && atEnd && c === '{') throw pyErr('ValueError', "Single '{' encountered in format string");
    if (markup && !atEnd) {
      if (fmt[pos] === c) { pos++; markup = false; } else len--;
    }
    out += fmt.slice(start, start + len);
    if (!markup) continue;
    // parse_field
    const nameStart = pos;
    let ch = '';
    while (pos < end) {
      ch = fmt[pos++];
      if (ch === '{') throw pyErr('ValueError', "unexpected '{' in field name");
      if (ch === '[') { while (pos < end && fmt[pos] !== ']') pos++; continue; }
      if (ch === '}' || ch === ':' || ch === '!') break;
    }
    const fieldName = fmt.slice(nameStart, pos - 1);
    let conversion = '', spec = '', needsExpanding = false;
    if (ch === '!' || ch === ':') {
      let specOnly = false;
      if (ch === '!') {
        if (pos >= end) throw pyErr('ValueError', 'end of string while looking for conversion specifier');
        conversion = fmt[pos++];
        if (pos < end) {
          const c2 = fmt[pos++];
          if (c2 === '}') specOnly = true;
          else if (c2 !== ':') throw pyErr('ValueError', "expected ':' after conversion specifier");
        }
      }
      if (!specOnly) {
        const specStart = pos;
        let count = 1, closed = false;
        while (pos < end) {
          const c3 = fmt[pos++];
          if (c3 === '{') { needsExpanding = true; count++; } else if (c3 === '}') { count--; if (count === 0) { spec = fmt.slice(specStart, pos - 1); closed = true; break; } }
        }
        if (!closed) throw pyErr('ValueError', "unmatched '{' in format spec");
      }
    } else if (ch !== '}') throw pyErr('ValueError', "expected '}' before end of string");
    // output_markup: the field object first, then the conversion, then the (nested) format spec
    let v = fieldObject(I, fieldName, args, kw, getKw, auto);
    if (conversion) {
      if (conversion === 'r') v = repr(v);
      else if (conversion === 's') v = I ? I.toStr(v) : str(v);
      else if (conversion === 'a') v = asciiOf(repr(v));
      else {
        const code = conversion.codePointAt(0);
        throw pyErr('ValueError', code > 32 && code < 127 ? `Unknown conversion specifier ${conversion}` : `Unknown conversion specifier \\x${code.toString(16)}`);
      }
    }
    if (needsExpanding) spec = buildString(I, spec, args, kw, getKw, depth - 1, auto);
    out += I ? I.format(v, spec) : formatValue(v, spec);
  }
  return out;
}
function fieldObject(I, fieldName, args, kw, getKw, auto) {
  // field_name_split: the first part up to '.' or '['
  let i = 0;
  while (i < fieldName.length && fieldName[i] !== '.' && fieldName[i] !== '[') i++;
  const first = fieldName.slice(0, i);
  let idx = fmtInteger(first);
  const empty = first === '';
  const numeric = empty || idx !== -1;
  if (auto.state === 0 && numeric) auto.state = empty ? 1 : 2;
  if (numeric) {
    if (auto.state === 2 && empty) throw pyErr('ValueError', 'cannot switch from manual field specification to automatic field numbering');
    if (auto.state === 1 && !empty) throw pyErr('ValueError', 'cannot switch from automatic field numbering to manual field specification');
  }
  if (empty) idx = auto.n++;
  let v;
  if (idx === -1) {
    if (getKw) v = getKw(first);
    else { if (!kw || !Object.prototype.hasOwnProperty.call(kw, first)) throw pyErr('KeyError', first); v = kw[first]; }
  } else {
    if (args === null) throw pyErr('ValueError', 'Format string contains positional fields');
    if (idx >= args.length) throw pyErr('IndexError', `Replacement index ${idx} out of range for positional args tuple`);
    v = args[idx];
  }
  // FieldNameIterator: .attr and [key] parts
  let pos = i;
  while (pos < fieldName.length) {
    const c = fieldName[pos++];
    let name;
    if (c === '.') {
      const st = pos;
      while (pos < fieldName.length && fieldName[pos] !== '.' && fieldName[pos] !== '[') pos++;
      name = fieldName.slice(st, pos);
      if (!name) throw pyErr('ValueError', 'Empty attribute in format string');
      v = getAttribute(I, v, name);
    } else if (c === '[') {
      const st = pos;
      while (pos < fieldName.length && fieldName[pos] !== ']') pos++;
      if (pos >= fieldName.length) throw pyErr('ValueError', "Missing ']' in format string");
      name = fieldName.slice(st, pos);
      pos++;
      if (!name) throw pyErr('ValueError', 'Empty attribute in format string');
      const k = fmtInteger(name);
      v = getitem(v, k === -1 ? name : BigInt(k), I);
    } else throw pyErr('ValueError', "Only '.' or '[' may follow ']' in format field specifier");
  }
  return v;
}

// ------------------------------------------------------------------ iterator factories
function mkIter(typeName, next) { return new PyIter(T[typeName] || T.generator, next); }
function enumerateIter(I, args, kw) {
  if (kw) for (const k in kw) if (k !== 'iterable' && k !== 'start') throw pyErr('TypeError', `'${k}' is an invalid keyword argument for enumerate()`);
  const o = kwArgs('enumerate', kw, ['iterable', 'start']);
  if (args.length > 2) throw pyErr('TypeError', `enumerate() takes at most 2 arguments (${args.length} given)`);
  const iterable = args.length ? args[0] : o.iterable;
  if (iterable === undefined) throw pyErr('TypeError', "enumerate() missing required argument 'iterable'");
  let i = args.length > 1 ? asIndex(args[1]) : 'start' in o ? asIndex(o.start) : 0n;
  const it = getIter(iterable, I);
  return mkIter('enumerate', () => { const x = it.next(); if (x === STOP) return STOP; const r = new PyTuple([i, x]); i += 1n; return r; });
}
function zipIter(I, args, kw) {
  const o = kwArgs('zip', kw, ['strict'], 1);
  const strict = truthy(o.strict ?? false);
  const its = args.map((a, k) => { try { return getIter(a, I); } catch (e) { if (e instanceof PyExc && e.type === EXC.TypeError) throw pyErr('TypeError', `'${typeName(a)}' object is not iterable`); throw e; } void k; });
  if (!its.length) return mkIter('zip', () => STOP);
  let done = false;
  return mkIter('zip', () => {
    if (done) return STOP;
    const row = [];
    for (let k = 0; k < its.length; k++) {
      const x = its[k].next();
      if (x === STOP) {
        done = true;
        if (strict) {
          if (k > 0) throw pyErr('ValueError', `zip() argument ${k + 1} is shorter than argument${k > 1 ? 's 1-' + k : ' 1'}`);
          for (let m = 1; m < its.length; m++) if (its[m].next() !== STOP) throw pyErr('ValueError', `zip() argument ${m + 1} is longer than argument${m > 1 ? 's 1-' + m : ' 1'}`);
        }
        return STOP;
      }
      row.push(x);
    }
    return new PyTuple(row);
  });
}
function mapIter(I, args, kw) {
  noKw('map', kw);
  if (args.length < 2) throw pyErr('TypeError', 'map() must have at least two arguments.');
  const fn = args[0];
  const its = args.slice(1).map((a) => getIter(a, I));
  return mkIter('map', () => {
    const vals = [];
    for (const it of its) { const x = it.next(); if (x === STOP) return STOP; vals.push(x); }
    return I.callSync(fn, vals, null);
  });
}
function callableIter(I, fn, sentinel) {
  if (!isCallable(fn)) throw pyErr('TypeError', 'iter(v, w): v must be callable');
  let done = false;
  return mkIter('callable_iterator', () => {
    if (done) return STOP;
    I.tick();
    let r;
    try { r = I.callSync(fn, [], null); } catch (e) {
      if (e instanceof PyExc && e.type.isSubOf(EXC.StopIteration)) { done = true; return STOP; }
      throw e;
    }
    if (eq(sentinel, r)) { done = true; return STOP; }
    return r;
  });
}
function filterIter(I, args, kw) {
  noKw('filter', kw);
  if (args.length !== 2) throw pyErr('TypeError', `filter expected 2 arguments, got ${args.length}`);
  const fn = args[0];
  const it = getIter(args[1], I);
  return mkIter('filter', () => {
    for (;;) {
      const x = it.next();
      if (x === STOP) return STOP;
      if (fn === null ? truthy(x) : truthy(I.callSync(fn, [x], null))) return x;
    }
  });
}
function reversedIter(I, args, kw) {
  noKw('reversed', kw);
  expectArgs('reversed', args, 1, 1);
  const v = args[0];
  let items;
  if (v instanceof PyList) {
    let i = v.items.length - 1;
    return mkIter('list_reverseiterator', () => { if (i >= 0 && i < v.items.length) return v.items[i--]; i = -1; return STOP; });
  }
  if (v instanceof PyTuple || v instanceof PyDeque) items = v.items.slice();
  else if (typeof v === 'string') items = Array.from(v);
  else if (v instanceof PyRange) items = toArray(v, I);
  else if (v instanceof PyDict) items = v.keys();
  else if (v instanceof PyDictView) items = toArray(v, I);
  else throw pyErr('TypeError', `'${typeName(v)}' object is not reversible`);
  let i = items.length - 1;
  const tn = v instanceof PyRange ? 'range_iterator' : v instanceof PyTuple ? 'reversed' : v instanceof PyDict ? 'dict_reversekeyiterator' : 'reversed';
  return mkIter(tn, () => i >= 0 ? items[i--] : STOP);
}

// ------------------------------------------------------------------ input / print
function* printFn(I, args, kw) {
  let sep = ' ', end = '\n', file = null;
  if (kw) for (const k in kw) {
    const v = kw[k];
    if (k === 'sep' || k === 'end') {
      if (v !== null && typeof v !== 'string') throw pyErr('TypeError', `${k} must be None or a string, not ${typeName(v)}`);
      if (v !== null) { if (k === 'sep') sep = v; else end = v; }
    } else if (k === 'file') file = v;
    else if (k === 'flush') { /* output is never buffered */ } else throw unexpectedKw('print', k, ['sep', 'end', 'file', 'flush']);
  }
  const std = file === null || (file && file.pytype === T.TextIOWrapper && file.which !== 'stdin');
  if (!std) {
    // any other file object: print() calls file.write() for each piece (str(arg), sep, ..., end)
    const write = getAttribute(I, file, 'write');
    for (let i = 0; i < args.length; i++) {
      if (i) yield I.callG(write, [sep], null, null);
      yield I.callG(write, [I.toStr(args[i])], null, null);
    }
    yield I.callG(write, [end], null, null);
    return null;
  }
  // print() writes str(arg), sep, ..., end one by one; a lone surrogate cannot be encoded for the UTF-8 console
  const pieces = [];
  for (let i = 0; i < args.length; i++) { if (i) pieces.push(sep); pieces.push(I.toStr(args[i])); }
  pieces.push(end);
  let s = '', err = null;
  for (const p of pieces) { err = surrogateWriteError(p); if (err) break; s += p; }
  if (s) yield file && file.which === 'stderr' ? I.emitStderr(s) : I.emitOutput(s);
  if (err) throw err;
  return null;
}
function* inputFn(I, args, kw) {
  noKw('input', kw);
  if (args.length > 1) throw pyErr('TypeError', `input expected at most 1 argument, got ${args.length}`);
  const prompt = args.length ? I.toStr(args[0]) : '';
  if (prompt) yield I.emitOutput(prompt);
  let value = I.takeInput(prompt);
  if (value === undefined) {
    if (I.syncDepth > 0) throw pyErr('RuntimeError', 'input() cannot wait for typed input inside this call (provide the inputs in advance)');
    value = yield { kind: 'input', prompt, wait: true };
  } else yield { kind: 'input', prompt, value };
  if (value === null || value === undefined) throw pyErr('EOFError', 'EOF when reading a line');
  value = String(value);
  if (value.endsWith('\n')) value = value.slice(0, -1);
  if (I.echoInput) { const ev = I.emitOutput(value + '\n'); ev.echo = true; yield ev; }
  return value;
}

// ------------------------------------------------------------------ type constructors
function toInt(I, args, kw) {
  const o = kwArgs('int', kw, ['base']);
  if (args.length > 2) throw pyErr('TypeError', `int expected at most 2 arguments, got ${args.length}`);
  if (args.length === 0) { if ('base' in o) throw pyErr('TypeError', "int() missing string argument"); return 0n; }
  const x = args[0];
  const baseArg = args.length > 1 ? args[1] : o.base;
  if (baseArg !== undefined) {
    const b = Number(asIndex(baseArg));
    if (!(b === 0 || (b >= 2 && b <= 36))) throw pyErr('ValueError', 'int() base must be >= 2 and <= 36, or 0');
    if (typeof x !== 'string') throw pyErr('TypeError', "int() can't convert non-string with explicit base");
    return parseIntStr(x, b, I);
  }
  if (typeof x === 'bigint') return x;
  if (typeof x === 'boolean') return x ? 1n : 0n;
  if (typeof x === 'number') return floatToBig(x);
  if (typeof x === 'string') return parseIntStr(x, 10, I);
  throw pyErr('TypeError', `int() argument must be a string, a bytes-like object or a real number, not '${typeName(x)}'`);
}
function toFloatCall(I, args, kw) {
  noKw('float', kw);
  if (args.length > 1) throw pyErr('TypeError', `float expected at most 1 argument, got ${args.length}`);
  if (!args.length) return 0.0;
  const x = args[0];
  if (typeof x === 'number') return x;
  if (isIntLike(x)) return bigToFloat(toBig(x));
  if (typeof x === 'string') return parseFloatStr(x);
  throw pyErr('TypeError', `float() argument must be a string or a real number, not '${typeName(x)}'`);
}
function toStrCall(I, args, kw) {
  if (kw) { for (const k in kw) if (k !== 'object' && k !== 'encoding' && k !== 'errors') throw unexpectedKw('str', k, ['object', 'encoding', 'errors']); }
  if (args.length > 3) throw pyErr('TypeError', `str expected at most 3 arguments, got ${args.length}`);
  if (!args.length) return kw && 'object' in kw ? I.toStr(kw.object) : '';
  if (args.length > 1) {
    for (let i = 1; i < args.length; i++) if (typeof args[i] !== 'string') throw pyErr('TypeError', `str() argument '${i === 1 ? 'encoding' : 'errors'}' must be str, not ${typeName(args[i])}`);
    if (typeof args[0] === 'string') throw pyErr('TypeError', 'decoding str is not supported');
    throw pyErr('TypeError', `decoding to str: need a bytes-like object, ${typeName(args[0])} found`);
  }
  return I.toStr(args[0]);
}
function rangeCall(I, args, kw) {
  noKw('range', kw);
  if (args.length === 0) throw pyErr('TypeError', 'range expected at least 1 argument, got 0');
  if (args.length > 3) throw pyErr('TypeError', `range expected at most 3 arguments, got ${args.length}`);
  const v = args.map((a) => asIndex(a));
  if (v.length === 1) return new PyRange(0n, v[0], 1n);
  const step = v.length === 3 ? v[2] : 1n;
  if (step === 0n) throw pyErr('ValueError', 'range() arg 3 must not be zero');
  return new PyRange(v[0], v[1], step);
}
export function dictFromArgs(I, d, args, kw, name = 'dict') {
  if (args.length > 1) throw pyErr('TypeError', `${name} expected at most 1 argument, got ${args.length}`);
  if (args.length) {
    const src = args[0];
    if (src instanceof PyDict) { for (const [k, v] of src.entries()) d.set(k, v); } else {
      const it = getIter(src, I);
      let i = 0;
      for (let x = it.next(); x !== STOP; x = it.next(), i++) {
        let pair;
        try { pair = toArray(x, I); } catch (e) { throw pyErr('TypeError', `cannot convert dictionary update sequence element #${i} to a sequence`); }
        if (pair.length !== 2) throw pyErr('ValueError', `dictionary update sequence element #${i} has length ${pair.length}; 2 is required`);
        d.set(pair[0], pair[1]);
      }
    }
  }
  if (kw) for (const k in kw) d.set(k, kw[k]);
  return d;
}
function counterUpdate(I, d, src, sign) {
  if (src instanceof PyDict) { for (const [k, v] of src.entries()) { const cur = d.get(k); d.set(k, cur === undefined ? (sign > 0 ? v : add(0n, negate(v))) : (sign > 0 ? add(cur, v) : add(cur, negate(v)))); } return; }
  const it = getIter(src, I);
  for (let x = it.next(); x !== STOP; x = it.next()) { const cur = d.get(x); d.set(x, (cur === undefined ? 0n : cur) + (sign > 0 ? 1n : -1n)); }
}
function negate(v) { return typeof v === 'bigint' ? -v : typeof v === 'number' ? -v : typeof v === 'boolean' ? (v ? -1n : 0n) : v; }

export function callType(I, t, args, kw) {
  if (t.isExc) {
    if (kw) for (const k in kw) throw pyErr('TypeError', `${t.name}() takes no keyword arguments`);
    return new PyExc(t, args.slice());
  }
  if (t.hostCtor) return t.hostCtor(I, args, kw);
  switch (t.name) {
    case 'int': return toInt(I, args, kw);
    case 'float': return toFloatCall(I, args, kw);
    case 'str': return toStrCall(I, args, kw);
    case 'bool': noKw('bool', kw); expectArgs('bool', args, 0, 1); return args.length ? truthy(args[0]) : false;
    case 'list': noKw('list', kw); if (args.length > 1) throw pyErr('TypeError', `list expected at most 1 argument, got ${args.length}`); return new PyList(args.length ? toArray(args[0], I) : []);
    case 'tuple': noKw('tuple', kw); if (args.length > 1) throw pyErr('TypeError', `tuple expected at most 1 argument, got ${args.length}`); return new PyTuple(args.length ? toArray(args[0], I) : []);
    case 'set': case 'frozenset': {
      noKw(t.name, kw);
      if (args.length > 1) throw pyErr('TypeError', `${t.name} expected at most 1 argument, got ${args.length}`);
      const s = new PySet(t.name === 'frozenset');
      if (args.length) {
        const src = args[0];
        if (src instanceof PySet) s.merge(src);
        else if (src instanceof PyDict) s.mergeDictKeys(src);
        else for (const x of toArray(src, I)) s.add(x);
      }
      return s;
    }
    case 'dict': return dictFromArgs(I, new PyDict(), args, kw);
    case 'range': return rangeCall(I, args, kw);
    case 'type': {
      noKw('type', kw);
      if (args.length === 1) return typeOf(args[0]);
      if (args.length === 3) {
        // CPython validates the arguments of type(name, bases, dict) first
        const want = [['str', (v) => typeof v === 'string'], ['tuple', (v) => v instanceof PyTuple], ['dict', (v) => v instanceof PyDict]];
        want.forEach(([tn, ok], k) => { if (!ok(args[k])) throw pyErr('TypeError', `type.__new__() argument ${k + 1} must be ${tn}, not ${typeName(args[k])}`); });
        throw pyErr('TypeError', 'minipy does not support creating classes with type()');
      }
      throw pyErr('TypeError', 'type() takes 1 or 3 arguments');
    }
    case 'object': return { pytype: T.object };
    case 'slice': { noKw('slice', kw); rangeArgs('slice', args, 1, 3); return args.length === 1 ? new PySlice(null, args[0], null) : new PySlice(args[0], args[1], args.length > 2 ? args[2] : null); }
    case 'deque': {
      const o = kwArgs('deque', kw, ['iterable', 'maxlen']);
      if (args.length > 2) throw pyErr('TypeError', `deque() takes at most 2 arguments (${args.length} given)`);
      const src = args.length ? args[0] : o.iterable;
      const ml = args.length > 1 ? args[1] : o.maxlen;
      let maxlen = null;
      if (ml !== undefined && ml !== null) { maxlen = Number(asIndex(ml, 'an integer is required')); if (maxlen < 0) throw pyErr('ValueError', 'maxlen must be non-negative'); }
      const d = new PyDeque([], maxlen);
      if (src !== undefined) for (const x of toArray(src, I)) dequeAppend(d, x);
      d.mut = 0;
      return d;
    }
    case 'Counter': {
      if (args.length > 1) throw pyErr('TypeError', `expected at most 1 argument, got ${args.length}`);
      const d = new PyDict(T.Counter);
      if (args.length && args[0] !== null) counterUpdate(I, d, args[0], 1);
      if (kw) for (const k in kw) d.set(k, kw[k]);
      return d;
    }
    case 'defaultdict': {
      const d = new PyDict(T.defaultdict);
      let rest = args;
      if (args.length) {
        const fct = args[0];
        if (fct !== null && !isCallable(fct)) throw pyErr('TypeError', 'first argument must be callable or None');
        d.factory = fct; rest = args.slice(1);
      }
      return dictFromArgs(I, d, rest, kw, 'defaultdict');
    }
    case 'OrderedDict': return dictFromArgs(I, new PyDict(T.OrderedDict), args, kw, 'OrderedDict');
    case 'date': {
      const o = kwArgs('date', kw, ['year', 'month', 'day']);
      const a = [...args, o.year, o.month, o.day].filter((x) => x !== undefined);
      if (a.length !== 3) throw pyErr('TypeError', `function missing required argument '${['year', 'month', 'day'][a.length]}' (pos ${a.length + 1})`);
      const [y, m, d] = a.map((x) => Number(asIndex(x)));
      checkDate(y, m, d);
      return new PyDate(y, m, d);
    }
    case 'datetime': {
      const names = ['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond'];
      const o = kwArgs('datetime', kw, names);
      const a = args.slice();
      for (let i = args.length; i < names.length; i++) if (names[i] in o) a[i] = o[names[i]];
      if (a.length < 3 || a[0] === undefined || a[1] === undefined || a[2] === undefined) throw pyErr('TypeError', `function missing required argument '${names[Math.min(a.length, 2)]}' (pos ${Math.min(a.length, 2) + 1})`);
      const v = names.map((_, i) => a[i] === undefined ? 0 : Number(asIndex(a[i])));
      checkDate(v[0], v[1], v[2]);
      checkTime(v[3], v[4], v[5], v[6]);
      return new PyDateTime(...v);
    }
    case 'time': {
      const names = ['hour', 'minute', 'second', 'microsecond'];
      const o = kwArgs('time', kw, [...names, 'tzinfo', 'fold']);
      if (args.length > 6) throw pyErr('TypeError', `function takes at most 6 arguments (${args.length} given)`);
      if ((o.tzinfo !== undefined && o.tzinfo !== null) || (args.length > 4 && args[4] !== null)) throw pyErr('TypeError', 'minipy does not support time zones (tzinfo) yet');
      const v = names.map((n, i) => (i < args.length ? Number(asIndex(args[i])) : n in o ? Number(asIndex(o[n])) : 0));
      checkTime(v[0], v[1], v[2], v[3]);
      return new PyTime(...v);
    }
    case 'timedelta': {
      const names = ['days', 'seconds', 'microseconds', 'milliseconds', 'minutes', 'hours', 'weeks'];
      const o = kwArgs('timedelta', kw, names);
      const a = args.slice();
      const get = (i) => a[i] !== undefined ? toFloat(a[i]) : names[i] in o ? toFloat(o[names[i]]) : 0;
      const us = get(0) * 86400e6 + get(1) * 1e6 + get(2) + get(3) * 1e3 + get(4) * 60e6 + get(5) * 3600e6 + get(6) * 7 * 86400e6;
      return new PyTimedelta(Math.round(us));
    }
  }
  throw pyErr('TypeError', `cannot create '${t.name}' instances`);
}
function checkDate(y, m, d) {
  if (y < 1 || y > 9999) throw pyErr('ValueError', `year ${y} is out of range`);
  if (m < 1 || m > 12) throw pyErr('ValueError', 'month must be in 1..12');
  if (d < 1 || d > daysInMonth(y, m)) throw pyErr('ValueError', 'day is out of range for month');
}
export function isCallable(v) {
  return v instanceof PyFunction || v instanceof PyBuiltin || v instanceof PyType || v instanceof PyBoundMethod || v instanceof PyGenericAlias || (v instanceof PyHost && typeof v.obj === 'function');
}

// ------------------------------------------------------------------ builtins namespace
export function makeBuiltins(I) {
  const B = new Map();
  const fn = (name, f, gen) => B.set(name, new PyBuiltin(name, f, { gen }));
  fn('print', printFn, true);
  fn('input', inputFn, true);
  fn('len', (I2, args, kw) => {
    noKw('len', kw); exactArgs('len', args, 1);
    const v = args[0];
    if (v instanceof PyHost && Array.isArray(v.obj)) return BigInt(v.obj.length);
    if (v instanceof PyIter) throw pyErr('TypeError', `object of type '${typeName(v)}' has no len()`);
    if (v instanceof PyRange) return toSsize(rangeLen(v));
    return BigInt(pyLen(v));
  });
  fn('abs', (I2, args, kw) => {
    noKw('abs', kw); exactArgs('abs', args, 1);
    const v = args[0];
    if (typeof v === 'bigint') return v < 0n ? -v : v;
    if (typeof v === 'boolean') return v ? 1n : 0n;
    if (typeof v === 'number') return Math.abs(v);
    if (v instanceof PyTimedelta) return new PyTimedelta(Math.abs(v.us));
    if (v instanceof PyHost) { const r = I2.hostDunder(v, '__abs__'); if (r !== undefined) return r; }
    throw pyErr('TypeError', `bad operand type for abs(): '${typeName(v)}'`);
  });
  fn('round', pyRound);
  fn('min', (I2, args, kw) => minmax(I, 'min', args, kw, false));
  fn('max', (I2, args, kw) => minmax(I, 'max', args, kw, true));
  fn('sum', (I2, args, kw) => pySum(I, args, kw));
  fn('sorted', (I2, args, kw) => {
    const o = kwArgs('sort', kw, ['key', 'reverse'], 2);
    if (args.length !== 1) throw pyErr('TypeError', args.length ? `sorted expected 1 argument, got ${args.length}` : 'sorted expected 1 argument, got 0');
    return new PyList(sortWithKey(I, toArray(args[0], I), o.key, o.reverse));
  });
  fn('reversed', (I2, args, kw) => reversedIter(I, args, kw));
  fn('enumerate', (I2, args, kw) => enumerateIter(I, args, kw));
  fn('zip', (I2, args, kw) => zipIter(I, args, kw));
  fn('map', (I2, args, kw) => mapIter(I, args, kw));
  fn('filter', (I2, args, kw) => filterIter(I, args, kw));
  fn('isinstance', (I2, args, kw) => {
    noKw('isinstance', kw);
    if (args.length !== 2) throw pyErr('TypeError', `isinstance expected 2 arguments, got ${args.length}`);
    const check = (t) => {
      if (t instanceof PyType) return isinstance(args[0], t);
      if (t instanceof PyTuple) return t.items.some(check);
      if (t instanceof PyUnionType) return t.args.some(check);
      if (t instanceof PyGenericAlias) throw pyErr('TypeError', 'isinstance() argument 2 cannot be a parameterized generic');
      throw pyErr('TypeError', 'isinstance() arg 2 must be a type, a tuple of types, or a union');
    };
    return check(args[1]);
  });
  fn('issubclass', (I2, args, kw) => {
    noKw('issubclass', kw);
    if (args.length !== 2) throw pyErr('TypeError', `issubclass expected 2 arguments, got ${args.length}`);
    if (!(args[0] instanceof PyType)) throw pyErr('TypeError', 'issubclass() arg 1 must be a class');
    const check = (t) => {
      if (t instanceof PyType) return args[0].isSubOf(t);
      if (t instanceof PyTuple) return t.items.some(check);
      if (t instanceof PyUnionType) return t.args.some(check);
      if (t instanceof PyGenericAlias) throw pyErr('TypeError', 'issubclass() argument 2 cannot be a parameterized generic');
      throw pyErr('TypeError', 'issubclass() arg 2 must be a class, a tuple of classes, or a union');
    };
    return check(args[1]);
  });
  fn('chr', (I2, args, kw) => {
    noKw('chr', kw); exactArgs('chr', args, 1);
    const n = asIndex(args[0]);
    if (n < 0n || n > 0x10ffffn) throw pyErr('ValueError', 'chr() arg not in range(0x110000)');
    return chrOf(Number(n));
  });
  fn('ord', (I2, args, kw) => {
    noKw('ord', kw); exactArgs('ord', args, 1);
    const s = args[0];
    if (typeof s !== 'string') throw pyErr('TypeError', `ord() expected string of length 1, but ${typeName(s)} found`);
    const n = strLen(s);
    if (n !== 1) throw pyErr('TypeError', `ord() expected a character, but string of length ${n} found`);
    return BigInt(ordOf(s));
  });
  fn('any', (I2, args, kw) => { noKw('any', kw); exactArgs('any', args, 1); const it = getIter(args[0], I); for (let x = it.next(); x !== STOP; x = it.next()) if (truthy(x)) return true; return false; });
  fn('all', (I2, args, kw) => { noKw('all', kw); exactArgs('all', args, 1); const it = getIter(args[0], I); for (let x = it.next(); x !== STOP; x = it.next()) if (!truthy(x)) return false; return true; });
  const based = (name, prefix, radix) => fn(name, (I2, args, kw) => {
    noKw(name, kw); exactArgs(name, args, 1);
    const n = asIndex(args[0]);
    return (n < 0n ? '-' : '') + prefix + (n < 0n ? -n : n).toString(radix);
  });
  based('hex', '0x', 16); based('oct', '0o', 8); based('bin', '0b', 2);
  fn('divmod', (I2, args, kw) => { noKw('divmod', kw); if (args.length !== 2) throw pyErr('TypeError', `divmod expected 2 arguments, got ${args.length}`); return divmod(args[0], args[1]); });
  fn('pow', (I2, args, kw) => {
    const o = kwArgs('pow', kw, ['base', 'exp', 'mod']);
    if (args.length > 3) throw pyErr('TypeError', `pow() takes at most 3 arguments (${args.length} given)`);
    const a = [...args];
    if (a.length < 2) { if ('base' in o) a[0] = o.base; if ('exp' in o) a[1] = o.exp; }
    const m = a.length > 2 ? a[2] : o.mod;
    if (a.length < 2) throw pyErr('TypeError', `pow() missing required argument '${a.length ? 'exp' : 'base'}' (pos ${a.length + 1})`);
    if (m !== undefined && m !== null) {
      if (!isIntLike(a[0]) || !isIntLike(a[1]) || !isIntLike(m)) {
        // ternary_op: float's nb_power refuses any modulus; with no float involved, the operand types are listed
        if ([a[0], a[1], m].some((x) => typeof x === 'number')) throw pyErr('TypeError', 'pow() 3rd argument not allowed unless all arguments are integers');
        throw pyErr('TypeError', `unsupported operand type(s) for ** or pow(): '${typeName(a[0])}', '${typeName(a[1])}', '${typeName(m)}'`);
      }
      // CPython long_pow with a modulus: negative modulus → result in (m, 0]; negative exponent → modular inverse
      let b = toBig(a[0]), e = toBig(a[1]); let mod = toBig(m);
      if (mod === 0n) throw pyErr('ValueError', 'pow() 3rd argument cannot be 0');
      const negOut = mod < 0n;
      if (negOut) mod = -mod;
      if (mod === 1n) return 0n;
      b = bigMod(b, mod);
      if (e < 0n) {
        // extended Euclid: inverse of b modulo mod
        let [r0, r1, s0, s1] = [b, mod, 1n, 0n];
        while (r1 !== 0n) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; }
        if (r0 !== 1n) throw pyErr('ValueError', 'base is not invertible for the given modulus');
        b = bigMod(s0, mod); e = -e;
      }
      let r = 1n;
      while (e > 0n) { if (e & 1n) r = (r * b) % mod; b = (b * b) % mod; e >>= 1n; }
      r = bigMod(r, mod);
      return negOut && r !== 0n ? r - mod : r;
    }
    return powOp(a[0], a[1]);
  });
  fn('hash', (I2, args, kw) => { noKw('hash', kw); exactArgs('hash', args, 1); return pyHash(args[0]); });
  fn('id', (I2, args, kw) => { noKw('id', kw); exactArgs('id', args, 1); return pyId(args[0]); });
  fn('callable', (I2, args, kw) => { noKw('callable', kw); exactArgs('callable', args, 1); return isCallable(args[0]); });
  fn('iter', (I2, args, kw) => { noKw('iter', kw); rangeArgs('iter', args, 1, 2); if (args.length === 2) return callableIter(I, args[0], args[1]); return getIter(args[0], I); });
  fn('next', (I2, args, kw) => {
    noKw('next', kw); rangeArgs('next', args, 1, 2);
    const it = args[0];
    if (!(it instanceof PyIter)) throw pyErr('TypeError', `'${typeName(it)}' object is not an iterator`);
    const x = it.next();
    if (x === STOP) { if (args.length > 1) return args[1]; throw new PyExc(EXC.StopIteration, []); }
    return x;
  });
  fn('getattr', (I2, args, kw) => {
    noKw('getattr', kw); rangeArgs('getattr', args, 2, 3);
    if (typeof args[1] !== 'string') throw pyErr('TypeError', `attribute name must be string, not '${typeName(args[1])}'`);
    try { return getAttribute(I, args[0], args[1]); } catch (e) { if (args.length > 2 && e instanceof PyExc && e.type === EXC.AttributeError) return args[2]; throw e; }
  });
  fn('hasattr', (I2, args, kw) => {
    noKw('hasattr', kw); exactArgs('hasattr', args, 2);
    if (typeof args[1] !== 'string') throw pyErr('TypeError', `attribute name must be string, not '${typeName(args[1])}'`);
    try { getAttribute(I, args[0], args[1]); return true; } catch (e) { if (e instanceof PyExc && e.type === EXC.AttributeError) return false; throw e; }
  });
  fn('setattr', (I2, args, kw) => { noKw('setattr', kw); exactArgs('setattr', args, 3); if (typeof args[1] !== 'string') throw pyErr('TypeError', `attribute name must be string, not '${typeName(args[1])}'`); setAttribute(I, args[0], args[1], args[2]); return null; });
  fn('repr', (I2, args, kw) => { noKw('repr', kw); exactArgs('repr', args, 1); return repr(args[0]); });
  fn('ascii', (I2, args, kw) => { noKw('ascii', kw); exactArgs('ascii', args, 1); let s = ''; for (const ch of repr(args[0])) { const c = ordOf(ch); s += c < 128 ? ch : c < 0x100 ? '\\x' + c.toString(16).padStart(2, '0') : c < 0x10000 ? '\\u' + c.toString(16).padStart(4, '0') : '\\U' + c.toString(16).padStart(8, '0'); } return s; });
  fn('format', (I2, args, kw) => { noKw('format', kw); rangeArgs('format', args, 1, 2); const spec = args.length > 1 ? args[1] : ''; if (typeof spec !== 'string') throw pyErr('TypeError', `format() argument 2 must be str, not ${clinicType(spec)}`); return I.format(args[0], spec); });
  fn('open', () => { throw pyErr('OSError', 'minipy does not support files (open) yet'); });
  fn('eval', (I2, args, kw) => I.evalBuiltin(args, kw));
  fn('exec', () => { throw pyErr('RuntimeError', 'minipy does not support exec() yet'); });
  // globals() (and locals() / vars() at module level, vars(module)) is the namespace itself: writes create variables;
  // inside a function locals() is a snapshot (PEP 667)
  const nsDict = (m) => { const c = I.nsDicts || (I.nsDicts = new WeakMap()); let d = c.get(m); if (!d) { d = new PyNsDict(m); c.set(m, d); } return d; };
  const frameNs = () => {
    const f = I.frames[I.frames.length - 1];
    if (f.locals === f.globals) return nsDict(f.globals);
    const d = new PyDict(); for (const [k, v] of orderedLocals(f)) d.set(k, v); return d;
  };
  fn('globals', (I2, args) => { if (args.length) throw pyErr('TypeError', `globals() takes no arguments (${args.length} given)`); return nsDict(I.frames[I.frames.length - 1].globals); });
  fn('locals', (I2, args) => { if (args.length) throw pyErr('TypeError', `locals() takes no arguments (${args.length} given)`); return frameNs(); });
  fn('vars', (I2, args) => { if (!args.length) return frameNs(); if (args[0] instanceof PyModule && !args[0].hostObj) return nsDict(args[0].dict); if (args[0] instanceof PyModule) { const d = new PyDict(); for (const [k, v] of args[0].dict) d.set(k, v); return d; } throw pyErr('TypeError', 'vars() argument must have __dict__ attribute'); });
  fn('dir', (I2, args) => {
    if (!args.length) return new PyList([...I.frames[I.frames.length - 1].locals.keys()].sort());
    const v = args[0];
    if (v instanceof PyModule) return new PyList([...v.dict.keys()].sort());
    if (v instanceof PyHost) return new PyList(I2.hostAttrNames(v));
    const t = typeOf(v);
    return new PyList((DIRS[t.dirName || t.name] || []).slice());
  });
  const exitFn = (I2, args) => { throw new PyExc(EXC.SystemExit, args.slice(0, 1)); };
  fn('exit', exitFn); fn('quit', exitFn);
  fn('breakpoint', () => null);
  fn('help', helpFn, true);
  // types
  for (const n of ['int', 'float', 'str', 'bool', 'list', 'tuple', 'dict', 'set', 'frozenset', 'range', 'type', 'object', 'slice']) B.set(n, T[n]);
  for (const n of Object.keys(EXC)) if (!EXC[n].module || EXC[n].module === 'builtins') B.set(n, EXC[n]);
  B.set('Ellipsis', ELLIPSIS);
  B.set('NotImplemented', null);
  B.delete('NotImplemented');
  I.builtinsModule = new PyModule('builtins', B);
  return B;
}

// ------------------------------------------------------------------ methods of builtin types
// each method: (I, self, args, kw) => value
// Argument Clinic wording: "find() argument 1 must be str, not None" (None, not NoneType)
const clinicType = (v) => (v === null ? 'None' : typeName(v));
const strArg = (name, v, pos = 1) => { if (typeof v !== 'string') throw pyErr('TypeError', `${name}() argument ${pos} must be str, not ${clinicType(v)}`); return v; };
const optIdx = (v) => (v === undefined || v === null ? null : asIndex(v, 'slice indices must be integers or None or have an __index__ method'));
function cpArr(s) { return hasSurrogates(s) ? Array.from(s) : null; }
// CPython's ADJUST_INDICES (start is not clamped to the length)
function adjustIndices(start, end, len) {
  let st = start === null || start === undefined ? 0 : Number(start);
  let en = end === null || end === undefined ? len : Number(end);
  if (en > len) en = len; else if (en < 0) { en += len; if (en < 0) en = 0; }
  if (st < 0) { st += len; if (st < 0) st = 0; }
  return [st, en];
}
function strFind(s, sub, start, end, rev) {
  const a = cpArr(s) || s, b = hasSurrogates(sub) ? Array.from(sub) : sub;
  const [lo, hi] = adjustIndices(start, end, a.length);
  if (hi - lo < b.length) return -1;
  if (typeof a === 'string' && typeof b === 'string') {
    if (rev) { const i = a.lastIndexOf(b, hi - b.length); return i >= lo ? i : -1; }
    const i = a.indexOf(b, lo); return i >= 0 && i + b.length <= hi ? i : -1;
  }
  const A = Array.from(a), B = Array.from(b);
  const at = (i) => B.every((c, k) => A[i + k] === c);
  if (rev) { for (let i = hi - B.length; i >= lo; i--) if (at(i)) return i; return -1; }
  for (let i = lo; i + B.length <= hi; i++) if (at(i)) return i;
  return -1;
}
function splitWhitespace(s, maxsplit) {
  const out = [];
  const cs = Array.from(s);
  let i = 0, n = cs.length;
  while (i < n && isPySpace(cs[i])) i++;
  while (i < n) {
    if (maxsplit >= 0 && out.length === maxsplit) { out.push(cs.slice(i).join('')); return out; }
    let j = i; while (j < n && !isPySpace(cs[j])) j++;
    out.push(cs.slice(i, j).join(''));
    i = j; while (i < n && isPySpace(cs[i])) i++;
  }
  return out;
}
function rsplitWhitespace(s, maxsplit) {
  const out = [];
  const cs = Array.from(s);
  let j = cs.length;
  while (j > 0 && isPySpace(cs[j - 1])) j--;
  while (j > 0) {
    if (maxsplit >= 0 && out.length === maxsplit) { out.push(cs.slice(0, j).join('')); break; }
    let i = j; while (i > 0 && !isPySpace(cs[i - 1])) i--;
    out.push(cs.slice(i, j).join(''));
    j = i; while (j > 0 && isPySpace(cs[j - 1])) j--;
  }
  return out.reverse();
}
function strCount(s, sub, start, end) {
  const A = Array.from(s), B = Array.from(sub);
  const [lo, hi] = adjustIndices(start, end, A.length);
  if (hi - lo < B.length) return 0n;
  if (!B.length) return BigInt(hi - lo + 1);
  const seg = A.slice(lo, hi).join('');
  let c = 0, i = 0;
  while ((i = seg.indexOf(sub, i)) >= 0) { c++; i += sub.length; }
  return BigInt(c);
}
function prefixCheck(name, s, prefix, start, end, isEnd) {
  const A = Array.from(s);
  const test = (p) => {
    if (typeof p !== 'string') throw pyErr('TypeError', `tuple for ${name} must only contain str, not ${typeName(p)}`);
    const P = Array.from(p);
    let [lo, hi] = adjustIndices(start, end, A.length);
    hi -= P.length;
    if (hi < lo) return false;
    if (!P.length) return true;
    const at = isEnd ? hi : lo;
    return P.every((c, k) => A[at + k] === c);
  };
  if (prefix instanceof PyTuple) return prefix.items.some(test);
  if (typeof prefix !== 'string') throw pyErr('TypeError', `${name} first arg must be str or a tuple of str, not ${typeName(prefix)}`);
  return test(prefix);
}
/** a width or count that must become a JS string length: ssize_t overflow → OverflowError, too big → MemoryError */
function strSize(v) {
  const n = toSsize(asIndex(v));
  if (n > 100000000n) throw pyErr('MemoryError', '');
  return Number(n);
}
function padStr(name, s, args, how) {
  expectArgs(name, args, 1, 2);
  const width = strSize(args[0]);
  let fill = ' ';
  if (args.length > 1) {
    fill = args[1];
    if (typeof fill !== 'string') throw pyErr('TypeError', `The fill character must be a unicode character, not ${typeName(fill)}`);
    if (strLen(fill) !== 1) throw pyErr('TypeError', 'The fill character must be exactly one character long');
  }
  const n = strLen(s);
  if (width <= n) return s;
  const marg = width - n;
  if (how === 'l') return s + fill.repeat(marg);
  if (how === 'r') return fill.repeat(marg) + s;
  const left = Math.floor(marg / 2) + (marg & width & 1);
  return fill.repeat(left) + s + fill.repeat(marg - left);
}
// the str predicates use CPython 3.13's Unicode 15.1 data (unidata.js), not the JS engine's \p{...} classes
const ALNUM = U_ALPHA | U_DECIMAL | U_DIGIT | U_NUMERIC;
function isIdentifierStr(s) {
  if (!s) return false;
  let first = true;
  for (let i = 0; i < s.length; i++) {
    const c = s.codePointAt(i);
    if (c > 0xffff) i++;
    if (!(uflags(c) & (first ? U_XID_START : U_XID_CONT))) return false;
    first = false;
  }
  return true;
}

/** str.maketrans(x[, y[, z]]): a dict of ordinals for str.translate() */
function strMaketrans(I, a, kw) {
  noKw('str.maketrans', kw);
  if (!a.length) throw pyErr('TypeError', 'maketrans() takes at least 1 argument (0 given)');
  if (a.length > 3) throw pyErr('TypeError', `maketrans() takes at most 3 arguments (${a.length} given)`);
  const d = new PyDict();
  if (a.length === 1) {
    const x = a[0];
    if (!(x instanceof PyDict)) throw pyErr('TypeError', 'if you give only one argument to maketrans it must be a dict');
    for (const [k, v] of x.entries()) {
      if (typeof k === 'string') {
        const cs = Array.from(k);
        if (cs.length !== 1) throw pyErr('ValueError', 'string keys in translate table must be of length 1');
        d.set(BigInt(ordOf(cs[0])), v);
      } else if (isIntLike(k)) d.set(k, v);
      else throw pyErr('TypeError', 'keys in translate table must be strings or integers');
    }
    return d;
  }
  for (let i = 0; i < a.length; i++) if (typeof a[i] !== 'string') throw pyErr('TypeError', `maketrans() argument ${i + 1} must be str, not ${typeName(a[i])}`);
  const xs = Array.from(a[0]), ys = Array.from(a[1]);
  if (xs.length !== ys.length) throw pyErr('ValueError', 'the first two maketrans arguments must have equal length');
  for (let i = 0; i < xs.length; i++) d.set(BigInt(ordOf(xs[i])), BigInt(ordOf(ys[i])));
  if (a.length === 3) for (const c of a[2]) d.set(BigInt(ordOf(c)), null);
  return d;
}
/** str.translate(table): table[ord(c)] via __getitem__; LookupError keeps c, None deletes it */
function strTranslate(I, s, table) {
  let out = '';
  for (const c of s) {
    let r;
    try { r = getitem(table, BigInt(ordOf(c)), I); } catch (e) {
      if (e instanceof PyExc && e.type.isSubOf(EXC.LookupError)) { out += c; continue; }
      throw e;
    }
    if (r === null) continue;
    if (typeof r === 'string') out += r;
    else if (isIntLike(r)) {
      const n = toBig(r);
      if (n < 0n || n > 0x10ffffn) throw pyErr('ValueError', 'character mapping must be in range(0x110000)');
      out += chrOf(Number(n));
    } else throw pyErr('TypeError', 'character mapping must return integer, None or str');
  }
  return out;
}
const STR = {
  maketrans: (I, s, a, kw) => strMaketrans(I, a, kw),
  translate: (I, s, a) => { exactArgs('str.translate', a, 1); return strTranslate(I, s, a[0]); },
  upper: (I, s, a, kw) => { noKw('str.upper', kw); exactArgs('str.upper', a, 0); return pyUpper(s); },
  lower: (I, s, a, kw) => { noKw('str.lower', kw); exactArgs('str.lower', a, 0); return pyLower(s); },
  casefold: (I, s, a) => { exactArgs('str.casefold', a, 0); return pyCasefold(s); },
  title: (I, s, a) => { exactArgs('str.title', a, 0); return pyTitle(s); },
  capitalize: (I, s, a) => { exactArgs('str.capitalize', a, 0); return pyCapitalize(s); },
  swapcase: (I, s, a) => { exactArgs('str.swapcase', a, 0); return pySwapcase(s); },
  strip: (I, s, a, kw) => { noKw('strip', kw); expectArgs('strip', a, 0, 1); const c = a[0] ?? null; if (c !== null && typeof c !== 'string') throw pyErr('TypeError', `strip arg must be None or str`); return pyStrip(s, c, true, true); },
  lstrip: (I, s, a, kw) => { noKw('lstrip', kw); expectArgs('lstrip', a, 0, 1); const c = a[0] ?? null; if (c !== null && typeof c !== 'string') throw pyErr('TypeError', `lstrip arg must be None or str`); return pyStrip(s, c, true, false); },
  rstrip: (I, s, a, kw) => { noKw('rstrip', kw); expectArgs('rstrip', a, 0, 1); const c = a[0] ?? null; if (c !== null && typeof c !== 'string') throw pyErr('TypeError', `rstrip arg must be None or str`); return pyStrip(s, c, false, true); },
  split: (I, s, a, kw) => {
    const o = kwArgs('split', kw, ['sep', 'maxsplit']);
    atMost('split', a, 2);
    const sep = a.length > 0 ? a[0] : (o.sep ?? null);
    let max = a.length > 1 ? Number(toSsize(asIndex(a[1]))) : 'maxsplit' in o ? Number(toSsize(asIndex(o.maxsplit))) : -1;
    if (sep === null) return new PyList(splitWhitespace(s, max));
    if (typeof sep !== 'string') throw pyErr('TypeError', `must be str or None, not ${typeName(sep)}`);
    if (sep === '') throw pyErr('ValueError', 'empty separator');
    const parts = s.split(sep);
    if (max >= 0 && parts.length > max + 1) { const head = parts.slice(0, max); head.push(parts.slice(max).join(sep)); return new PyList(head); }
    return new PyList(parts);
  },
  rsplit: (I, s, a, kw) => {
    const o = kwArgs('rsplit', kw, ['sep', 'maxsplit']);
    atMost('rsplit', a, 2);
    const sep = a.length > 0 ? a[0] : (o.sep ?? null);
    const max = a.length > 1 ? Number(toSsize(asIndex(a[1]))) : 'maxsplit' in o ? Number(toSsize(asIndex(o.maxsplit))) : -1;
    if (sep === null) return new PyList(rsplitWhitespace(s, max));
    if (typeof sep !== 'string') throw pyErr('TypeError', `must be str or None, not ${typeName(sep)}`);
    if (sep === '') throw pyErr('ValueError', 'empty separator');
    const parts = s.split(sep);
    if (max >= 0 && parts.length > max + 1) { const tail = parts.slice(parts.length - max); tail.unshift(parts.slice(0, parts.length - max).join(sep)); return new PyList(tail); }
    return new PyList(parts);
  },
  splitlines: (I, s, a, kw) => {
    const o = kwArgs('splitlines', kw, ['keepends']);
    atMost('splitlines', a, 1);
    const keep = truthy(a.length ? a[0] : (o.keepends ?? false));
    const out = []; const re = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;
    let last = 0, m;
    while ((m = re.exec(s))) { out.push(s.slice(last, keep ? m.index + m[0].length : m.index)); last = m.index + m[0].length; }
    if (last < s.length) out.push(s.slice(last));
    return new PyList(out);
  },
  join: (I, s, a, kw) => {
    noKw('str.join', kw); exactArgs('str.join', a, 1);
    if (!isIterable(a[0])) throw pyErr('TypeError', 'can only join an iterable');
    const items = toArray(a[0], I);
    for (let i = 0; i < items.length; i++) if (typeof items[i] !== 'string') throw pyErr('TypeError', `sequence item ${i}: expected str instance, ${typeName(items[i])} found`);
    return items.join(s);
  },
  replace: (I, s, a, kw) => {
    const o = kwArgs('replace', kw, ['count']);
    if (a.length < 2) throw pyErr('TypeError', `replace() takes at least 2 positional arguments (${a.length} given)`);
    if (a.length > 3) throw pyErr('TypeError', `replace() takes at most 3 arguments (${a.length} given)`);
    const old = strArg('replace', a[0], 1), nw = strArg('replace', a[1], 2);
    let count = a.length > 2 ? Number(toSsize(asIndex(a[2]))) : 'count' in o ? Number(toSsize(asIndex(o.count))) : -1;
    if (old === '') {
      const cs = Array.from(s);
      let out = '', n = 0;
      for (let i = 0; i <= cs.length; i++) { if (count < 0 || n < count) { out += nw; n++; } if (i < cs.length) out += cs[i]; }
      return out;
    }
    if (count < 0) return s.split(old).join(nw);
    let out = '', i = 0, n = 0;
    while (n < count) { const j = s.indexOf(old, i); if (j < 0) break; out += s.slice(i, j) + nw; i = j + old.length; n++; }
    return out + s.slice(i);
  },
  find: (I, s, a) => { rangeArgs('find', a, 1, 3); return BigInt(strFind(s, strArg('find', a[0]), optIdx(a[1]), optIdx(a[2]), false)); },
  rfind: (I, s, a) => { rangeArgs('rfind', a, 1, 3); return BigInt(strFind(s, strArg('rfind', a[0]), optIdx(a[1]), optIdx(a[2]), true)); },
  index: (I, s, a) => { rangeArgs('index', a, 1, 3); const i = strFind(s, strArg('index', a[0]), optIdx(a[1]), optIdx(a[2]), false); if (i < 0) throw pyErr('ValueError', 'substring not found'); return BigInt(i); },
  rindex: (I, s, a) => { rangeArgs('rindex', a, 1, 3); const i = strFind(s, strArg('rindex', a[0]), optIdx(a[1]), optIdx(a[2]), true); if (i < 0) throw pyErr('ValueError', 'substring not found'); return BigInt(i); },
  count: (I, s, a) => { rangeArgs('count', a, 1, 3); return strCount(s, strArg('count', a[0]), optIdx(a[1]), optIdx(a[2])); },
  startswith: (I, s, a) => { rangeArgs('startswith', a, 1, 3); return prefixCheck('startswith', s, a[0], optIdx(a[1]), optIdx(a[2]), false); },
  endswith: (I, s, a) => { rangeArgs('endswith', a, 1, 3); return prefixCheck('endswith', s, a[0], optIdx(a[1]), optIdx(a[2]), true); },
  isdigit: (I, s, a) => { exactArgs('str.isdigit', a, 0); return allHave(s, U_DIGIT); },
  isdecimal: (I, s, a) => { exactArgs('str.isdecimal', a, 0); return allHave(s, U_DECIMAL); },
  isnumeric: (I, s, a) => { exactArgs('str.isnumeric', a, 0); return allHave(s, U_NUMERIC); },
  isalpha: (I, s, a) => { exactArgs('str.isalpha', a, 0); return allHave(s, U_ALPHA); },
  isalnum: (I, s, a) => { exactArgs('str.isalnum', a, 0); return allHave(s, ALNUM); },
  isspace: (I, s, a) => { exactArgs('str.isspace', a, 0); if (!s) return false; for (const c of s) if (!isPySpace(c)) return false; return true; },
  isupper: (I, s, a) => { exactArgs('str.isupper', a, 0); return pyIsUpper(s); },
  islower: (I, s, a) => { exactArgs('str.islower', a, 0); return pyIsLower(s); },
  istitle: (I, s, a) => { exactArgs('str.istitle', a, 0); return pyIsTitle(s); },
  isidentifier: (I, s, a) => { exactArgs('str.isidentifier', a, 0); return isIdentifierStr(s); },
  isascii: (I, s, a) => { exactArgs('str.isascii', a, 0); return /^[\x00-\x7f]*$/.test(s); },
  isprintable: (I, s, a) => { exactArgs('str.isprintable', a, 0); return !s || allHave(s, U_PRINTABLE); },
  center: (I, s, a, kw) => { noKw('center', kw); return padStr('center', s, a, 'c'); },
  ljust: (I, s, a, kw) => { noKw('ljust', kw); return padStr('ljust', s, a, 'l'); },
  rjust: (I, s, a, kw) => { noKw('rjust', kw); return padStr('rjust', s, a, 'r'); },
  zfill: (I, s, a) => {
    exactArgs('str.zfill', a, 1);
    const w = strSize(a[0]);
    const n = strLen(s);
    if (w <= n) return s;
    const fill = '0'.repeat(w - n);
    if (s[0] === '+' || s[0] === '-') return s[0] + fill + s.slice(1);
    return fill + s;
  },
  format: (I, s, a, kw) => strFormat(I, s, a, kw),
  format_map: (I, s, a) => { exactArgs('str.format_map', a, 1); const d = a[0]; return strFormat(I, s, null, null, (k) => getitem(d, k, I)); },
  partition: (I, s, a) => { exactArgs('str.partition', a, 1); const sep = a[0]; if (typeof sep !== 'string') throw pyErr('TypeError', `must be str, not ${typeName(sep)}`); if (!sep) throw pyErr('ValueError', 'empty separator'); const i = s.indexOf(sep); return i < 0 ? new PyTuple([s, '', '']) : new PyTuple([s.slice(0, i), sep, s.slice(i + sep.length)]); },
  rpartition: (I, s, a) => { exactArgs('str.rpartition', a, 1); const sep = a[0]; if (typeof sep !== 'string') throw pyErr('TypeError', `must be str, not ${typeName(sep)}`); if (!sep) throw pyErr('ValueError', 'empty separator'); const i = s.lastIndexOf(sep); return i < 0 ? new PyTuple(['', '', s]) : new PyTuple([s.slice(0, i), sep, s.slice(i + sep.length)]); },
  removeprefix: (I, s, a) => { exactArgs('str.removeprefix', a, 1); const p = a[0]; if (typeof p !== 'string') throw pyErr('TypeError', `removeprefix() argument must be str, not ${clinicType(p)}`); return p && s.startsWith(p) ? s.slice(p.length) : s; },
  removesuffix: (I, s, a) => { exactArgs('str.removesuffix', a, 1); const p = a[0]; if (typeof p !== 'string') throw pyErr('TypeError', `removesuffix() argument must be str, not ${clinicType(p)}`); return p && s.endsWith(p) ? s.slice(0, s.length - p.length) : s; },
  expandtabs: (I, s, a, kw) => {
    const o = kwArgs('expandtabs', kw, ['tabsize']);
    atMost('expandtabs', a, 1);
    const ts = a.length ? Number(asIndex(a[0])) : 'tabsize' in o ? Number(asIndex(o.tabsize)) : 8;
    let out = '', col = 0;
    for (const c of s) {
      if (c === '\t') { if (ts > 0) { const k = ts - (col % ts); out += ' '.repeat(k); col += k; } } else if (c === '\n' || c === '\r') { out += c; col = 0; } else { out += c; col++; }
    }
    return out;
  },
  encode: () => { throw pyErr('TypeError', 'minipy does not support bytes (str.encode) yet'); },
};

function listIndexArgs(name, a) { rangeArgs(name, a, 1, 3); }
const LIST = {
  append: (I, l, a, kw) => { noKw('list.append', kw); if (a.length !== 1) throw pyErr('TypeError', `list.append() takes exactly one argument (${a.length} given)`); l.items.push(a[0]); return null; },
  extend: (I, l, a, kw) => { noKw('list.extend', kw); if (a.length !== 1) throw pyErr('TypeError', `list.extend() takes exactly one argument (${a.length} given)`); const items = toArray(a[0], I); for (const x of items) l.items.push(x); return null; },
  insert: (I, l, a, kw) => {
    noKw('insert', kw);
    if (a.length !== 2) throw pyErr('TypeError', `insert expected 2 arguments, got ${a.length}`);
    let i = toSsize(asIndex(a[0]));
    const n = BigInt(l.items.length);
    if (i < 0n) { i += n; if (i < 0n) i = 0n; } else if (i > n) i = n;
    l.items.splice(Number(i), 0, a[1]);
    return null;
  },
  pop: (I, l, a, kw) => {
    noKw('pop', kw);
    if (a.length > 1) throw pyErr('TypeError', `pop expected at most 1 argument, got ${a.length}`);
    let i = a.length ? toSsize(asIndex(a[0])) : -1n;
    if (!l.items.length) throw pyErr('IndexError', 'pop from empty list');
    if (!a.length) return l.items.pop();
    const n = BigInt(l.items.length);
    if (i < 0n) i += n;
    if (i < 0n || i >= n) throw pyErr('IndexError', 'pop index out of range');
    return l.items.splice(Number(i), 1)[0];
  },
  remove: (I, l, a, kw) => {
    noKw('list.remove', kw); if (a.length !== 1) throw pyErr('TypeError', `list.remove() takes exactly one argument (${a.length} given)`);
    for (let i = 0; i < l.items.length; i++) if (sameObj(l.items[i], a[0]) || eq(l.items[i], a[0])) { l.items.splice(i, 1); return null; }
    throw pyErr('ValueError', 'list.remove(x): x not in list');
  },
  index: (I, l, a, kw) => {
    noKw('index', kw); listIndexArgs('index', a);
    const n = l.items.length;
    const [lo, hi] = subRangeN(n, a[1], a[2]);
    for (let i = lo; i < Math.min(hi, l.items.length); i++) if (sameObj(l.items[i], a[0]) || eq(l.items[i], a[0])) return BigInt(i);
    throw pyErr('ValueError', `${repr(a[0])} is not in list`);
  },
  count: (I, l, a, kw) => { noKw('list.count', kw); if (a.length !== 1) throw pyErr('TypeError', `list.count() takes exactly one argument (${a.length} given)`); let c = 0; for (const x of l.items) if (sameObj(x, a[0]) || eq(x, a[0])) c++; return BigInt(c); },
  sort: (I, l, a, kw) => {
    if (a.length + (kw ? Object.keys(kw).length : 0) > 2) throw pyErr('TypeError', `sort() takes at most 2 arguments (${a.length + (kw ? Object.keys(kw).length : 0)} given)`);
    if (a.length) throw pyErr('TypeError', 'sort() takes no positional arguments');
    const o = kwArgs('sort', kw, ['key', 'reverse'], 2);
    // like CPython the list is empty while it is sorted; changes made meanwhile (by a key function) are discarded
    // and reported as "list modified during sort"
    const items = l.items;
    const during = [];
    l.items = during;
    let sorted, partial = items;
    // a failed key call leaves the list as it was; a failed comparison leaves the partial order (in place in CPython)
    try { sorted = sortWithKey(I, items, o.key, o.reverse, (p) => { partial = p; }); } catch (e) { l.items = partial; throw e; }
    const modified = l.items !== during || during.length !== 0;
    l.items = sorted;
    if (modified) throw pyErr('ValueError', 'list modified during sort');
    return null;
  },
  reverse: (I, l, a) => { exactArgs('list.reverse', a, 0); l.items.reverse(); return null; },
  clear: (I, l, a) => { exactArgs('list.clear', a, 0); l.items.length = 0; return null; },
  copy: (I, l, a) => { exactArgs('list.copy', a, 0); return new PyList(l.items.slice()); },
};
function subRangeN(n, start, end) {
  const sl = sliceIndices(new PySlice(start === undefined ? null : asIndex(start, 'slice indices must be integers or have an __index__ method'), end === undefined ? null : asIndex(end, 'slice indices must be integers or have an __index__ method'), null), n);
  return [sl[0], Math.max(sl[0], sl[1])];
}
const TUPLE = {
  count: (I, t, a) => { if (a.length !== 1) throw pyErr('TypeError', `tuple.count() takes exactly one argument (${a.length} given)`); let c = 0; for (const x of t.items) if (sameObj(x, a[0]) || eq(x, a[0])) c++; return BigInt(c); },
  index: (I, t, a) => {
    rangeArgs('index', a, 1, 3);
    const [lo, hi] = subRangeN(t.items.length, a[1], a[2]);
    for (let i = lo; i < hi; i++) if (sameObj(t.items[i], a[0]) || eq(t.items[i], a[0])) return BigInt(i);
    throw pyErr('ValueError', 'tuple.index(x): x not in tuple');
  },
};
const DICT = {
  get: (I, d, a, kw) => {
    noKw('get', kw);
    if (a.length < 1) throw pyErr('TypeError', `get expected at least 1 argument, got ${a.length}`);
    if (a.length > 2) throw pyErr('TypeError', `get expected at most 2 arguments, got ${a.length}`);
    const v = d.get(a[0]);
    return v === undefined ? (a.length > 1 ? a[1] : null) : v;
  },
  keys: (I, d, a) => { exactArgs('dict.keys', a, 0); return new PyDictView(d, 'keys'); },
  values: (I, d, a) => { exactArgs('dict.values', a, 0); return new PyDictView(d, 'values'); },
  items: (I, d, a) => { exactArgs('dict.items', a, 0); return new PyDictView(d, 'items'); },
  pop: (I, d, a, kw) => {
    noKw('pop', kw);
    if (a.length < 1) throw pyErr('TypeError', `pop expected at least 1 argument, got ${a.length}`);
    if (a.length > 2) throw pyErr('TypeError', `pop expected at most 2 arguments, got ${a.length}`);
    const e = d.delete(a[0]);
    if (e === undefined) { if (a.length > 1) return a[1]; throw pyErr('KeyError', a[0]); }
    return e[1];
  },
  popitem: (I, d, a) => {
    exactArgs('dict.popitem', a, 0);
    if (!d.size) throw pyErr('KeyError', 'popitem(): dictionary is empty');
    const ents = d.entries(); const [k, v] = ents[ents.length - 1]; d.delete(k);
    return new PyTuple([k, v]);
  },
  update: (I, d, a, kw) => {
    if (d.ctype === T.Counter) { pyFuncArgs('Counter.update', a, ['iterable'], 1, true); if (a.length && a[0] !== null) counterUpdate(I, d, a[0], 1); if (kw) for (const k in kw) { const cur = d.get(k); d.set(k, cur === undefined ? kw[k] : add(cur, kw[k])); } return null; }
    if (a.length > 1) throw pyErr('TypeError', `update expected at most 1 argument, got ${a.length}`);
    dictFromArgs(I, d, a, kw, 'update');
    return null;
  },
  setdefault: (I, d, a, kw) => {
    noKw('setdefault', kw); rangeArgs('setdefault', a, 1, 2);
    const v = d.get(a[0]);
    if (v !== undefined) return v;
    const dv = a.length > 1 ? a[1] : null;
    d.set(a[0], dv);
    return dv;
  },
  clear: (I, d, a) => { exactArgs('dict.clear', a, 0); d.clear(); return null; },
  copy: (I, d, a) => { exactArgs('dict.copy', a, 0); const r = new PyDict(d.ctype); r.factory = d.factory; for (const [k, v] of d.entries()) r.set(k, v); return r; },
  // Counter
  most_common: (I, d, a, kw) => {
    if (d.ctype !== T.Counter) return undefined;
    const o = kwArgs('Counter.most_common', kw, ['n']);
    pyFuncArgs('Counter.most_common', a, ['n'], 1, true);
    const n = a.length ? a[0] : ('n' in o ? o.n : null);
    const ents = counterOrder(d);
    const mk = (es) => new PyList(es.map(([k, v]) => new PyTuple([k, v])));
    if (n === null) return mk(ents);
    // heapq.nlargest(n, items, key=itemgetter(1)) semantics
    if (eq(n, 1n)) return mk(ents.slice(0, 1));
    if (compare('>=', n, BigInt(d.size))) {
      if (typeof n !== 'bigint' && typeof n !== 'boolean') throw pyErr('TypeError', 'slice indices must be integers or None or have an __index__ method');
      return mk(ents.slice(0, Number(toBig(n))));
    }
    const k = Number(asIndex(n));
    return mk(k <= 0 ? [] : ents.slice(0, k));
  },
  elements: (I, d, a) => {
    if (d.ctype !== T.Counter) return undefined;
    pyFuncArgs('Counter.elements', a, [], 0, true);
    const out = [];
    for (const [k, v] of d.entries()) { const c = isIntLike(v) ? Number(toBig(v)) : 0; for (let i = 0; i < c; i++) out.push(k); }
    let i = 0;
    return mkIter('itertools.chain', () => i < out.length ? out[i++] : STOP);
  },
  total: (I, d, a) => { if (d.ctype !== T.Counter) return undefined; pyFuncArgs('Counter.total', a, [], 0, true); let s = 0n; for (const v of d.values()) s = add(s, v); return s; },
  subtract: (I, d, a, kw) => { if (d.ctype !== T.Counter) return undefined; pyFuncArgs('Counter.subtract', a, ['iterable'], 1, true); if (a.length && a[0] !== null) counterUpdate(I, d, a[0], -1); if (kw) for (const k in kw) { const cur = d.get(k); d.set(k, cur === undefined ? negate(kw[k]) : add(cur, negate(kw[k]))); } return null; },
};
const SET = {
  add: (I, s, a) => { if (a.length !== 1) throw pyErr('TypeError', `set.add() takes exactly one argument (${a.length} given)`); s.add(a[0]); return null; },
  remove: (I, s, a) => { if (a.length !== 1) throw pyErr('TypeError', `set.remove() takes exactly one argument (${a.length} given)`); if (!s.discard(setKeyArg(a[0]))) throw pyErr('KeyError', a[0]); return null; },
  discard: (I, s, a) => { if (a.length !== 1) throw pyErr('TypeError', `set.discard() takes exactly one argument (${a.length} given)`); s.discard(setKeyArg(a[0])); return null; },
  pop: (I, s, a) => { exactArgs('set.pop', a, 0); const v = s.pop(); if (v === undefined) throw pyErr('KeyError', 'pop from an empty set'); return v; },
  clear: (I, s, a) => { exactArgs('set.clear', a, 0); s.clear(); return null; },
  copy: (I, s, a) => { exactArgs('set.copy', a, 0); return s.copy(); },
  union: (I, s, a) => { const r = s.copy(); for (const o of a) mergeInto(I, r, o); return r; },
  update: (I, s, a) => { for (const o of a) mergeInto(I, s, o); return null; },
  intersection: (I, s, a) => { if (!a.length) return s.copy(); let r = s; for (const o of a) r = setIntersection(r, o, (v) => toArray(v, I)); return r === s ? s.copy() : r; },
  intersection_update: (I, s, a) => { let r = s; for (const o of a) r = setIntersection(r, o, (v) => toArray(v, I)); if (r !== s) s.swapFrom(r); return null; },
  difference: (I, s, a) => { if (!a.length) return s.copy(); const r = setDifference(s, a[0], (v) => toArray(v, I)); for (const o of a.slice(1)) setDifferenceUpdate(r, o, (v) => toArray(v, I)); return r; },
  difference_update: (I, s, a) => { for (const o of a) setDifferenceUpdate(s, o, (v) => toArray(v, I)); return null; },
  symmetric_difference: (I, s, a) => { exactArgs('set.symmetric_difference', a, 1); return setSymDiff(s, a[0], (v) => toArray(v, I)); },
  symmetric_difference_update: (I, s, a) => { exactArgs('set.symmetric_difference_update', a, 1); setSymDiffUpdate(s, a[0], (v) => toArray(v, I)); return null; },
  issubset: (I, s, a) => { exactArgs('set.issubset', a, 1); const o = asSet(I, a[0]); return s.keys().every((k) => o.has(k)); },
  issuperset: (I, s, a) => { exactArgs('set.issuperset', a, 1); const o = asSet(I, a[0]); return o.keys().every((k) => s.has(k)); },
  isdisjoint: (I, s, a) => { exactArgs('set.isdisjoint', a, 1); const o = asSet(I, a[0]); return !s.keys().some((k) => o.has(k)); },
};
function asSet(I, o) { if (o instanceof PySet) return o; const s = new PySet(); for (const x of toArray(o, I)) s.add(x); return s; }
function mergeInto(I, s, o) { setUnionInto(s, o, (v) => toArray(v, I)); }
const DEQUE = {
  append: (I, d, a) => { if (a.length !== 1) throw pyErr('TypeError', `deque.append() takes exactly one argument (${a.length} given)`); dequeAppend(d, a[0]); return null; },
  appendleft: (I, d, a) => { if (a.length !== 1) throw pyErr('TypeError', `deque.appendleft() takes exactly one argument (${a.length} given)`); d.items.unshift(a[0]); d.mut++; if (d.maxlen != null && d.items.length > d.maxlen) d.items.pop(); return null; },
  pop: (I, d, a) => { exactArgs('deque.pop', a, 0); if (!d.items.length) throw pyErr('IndexError', 'pop from an empty deque'); d.mut++; return d.items.pop(); },
  popleft: (I, d, a) => { exactArgs('deque.popleft', a, 0); if (!d.items.length) throw pyErr('IndexError', 'pop from an empty deque'); d.mut++; return d.items.shift(); },
  extend: (I, d, a) => { exactArgs('deque.extend', a, 1); for (const x of toArray(a[0], I)) dequeAppend(d, x); return null; },
  extendleft: (I, d, a) => { exactArgs('deque.extendleft', a, 1); for (const x of toArray(a[0], I)) { d.items.unshift(x); d.mut++; if (d.maxlen != null && d.items.length > d.maxlen) d.items.pop(); } return null; },
  clear: (I, d, a) => { exactArgs('deque.clear', a, 0); d.items.length = 0; d.mut++; return null; },
  copy: (I, d, a) => { exactArgs('deque.copy', a, 0); return new PyDeque(d.items.slice(), d.maxlen); },
  count: (I, d, a) => { exactArgs('deque.count', a, 1); let c = 0; for (const x of d.items) if (sameObj(x, a[0]) || eq(x, a[0])) c++; return BigInt(c); },
  index: (I, d, a) => { rangeArgs('index', a, 1, 3); const [lo, hi] = subRangeN(d.items.length, a[1], a[2]); for (let i = lo; i < hi; i++) if (sameObj(d.items[i], a[0]) || eq(d.items[i], a[0])) return BigInt(i); throw pyErr('ValueError', `${repr(a[0])} is not in deque`); },
  remove: (I, d, a) => { exactArgs('deque.remove', a, 1); for (let i = 0; i < d.items.length; i++) if (sameObj(d.items[i], a[0]) || eq(d.items[i], a[0])) { d.items.splice(i, 1); d.mut++; return null; } throw pyErr('ValueError', `${repr(a[0])} is not in deque`); },
  insert: (I, d, a) => { if (a.length !== 2) throw pyErr('TypeError', `insert expected 2 arguments, got ${a.length}`); if (d.maxlen != null && d.items.length >= d.maxlen) throw pyErr('IndexError', 'deque already at its maximum size'); let i = Number(asIndex(a[0])); const n = d.items.length; if (i < 0) { i += n; if (i < 0) i = 0; } else if (i > n) i = n; d.items.splice(i, 0, a[1]); d.mut++; return null; },
  reverse: (I, d, a) => { exactArgs('deque.reverse', a, 0); d.items.reverse(); d.mut++; return null; },
  rotate: (I, d, a) => { expectArgs('rotate', a, 0, 1); const n = d.items.length; if (!n) return null; let k = a.length ? Number(asIndex(a[0])) : 1; k = ((k % n) + n) % n; if (k) d.items = d.items.slice(n - k).concat(d.items.slice(0, n - k)); d.mut++; return null; },
};
const INT = {
  bit_length: (I, v, a) => { exactArgs('int.bit_length', a, 0); let n = toBig(v); if (n < 0n) n = -n; return BigInt(n === 0n ? 0 : n.toString(2).length); },
  bit_count: (I, v, a) => { exactArgs('int.bit_count', a, 0); let n = toBig(v); if (n < 0n) n = -n; return BigInt([...n.toString(2)].filter((c) => c === '1').length); },
  is_integer: (I, v, a) => { exactArgs('int.is_integer', a, 0); return true; },
  conjugate: (I, v) => toBig(v),
  as_integer_ratio: (I, v) => new PyTuple([toBig(v), 1n]),
};
const FLOAT = {
  is_integer: (I, v, a) => { exactArgs('float.is_integer', a, 0); return isFinite(v) && Math.floor(v) === v; },
  as_integer_ratio: (I, v, a) => {
    exactArgs('float.as_integer_ratio', a, 0);
    if (v !== v) throw pyErr('ValueError', 'cannot convert NaN to integer ratio');
    if (!isFinite(v)) throw pyErr('OverflowError', 'cannot convert Infinity to integer ratio');
    const [m, e] = floatToRatio(v);
    return e >= 0 ? new PyTuple([m << BigInt(e), 1n]) : new PyTuple([m, 1n << BigInt(-e)]);
  },
  conjugate: (I, v) => v,
  hex: (I, v) => floatHex(v),
};
const RANGE = {
  count: (I, r, a) => { exactArgs('range.count', a, 1); return contains(r, a[0]) ? 1n : 0n; },
  index: (I, r, a) => {
    exactArgs('range.index', a, 1);
    if (!isIntLike(a[0])) {
      // generic sequence search (e.g. 2.0 in range(5))
      let i = 0n; const it = getIter(r);
      for (let x = it.next(); x !== STOP; x = it.next(), i++) if (eq(x, a[0])) return i;
      throw pyErr('ValueError', 'sequence.index(x): x not in sequence');
    }
    if (!contains(r, a[0])) throw pyErr('ValueError', `${repr(a[0])} is not in range`);
    return (toBig(a[0]) - r.start) / r.step;
  },
};
const DATE = {
  weekday: (I, d) => BigInt((d.ordinal() + 6) % 7),
  isoweekday: (I, d) => BigInt((d.ordinal() + 6) % 7 + 1),
  strftime: (I, d, a) => { exactArgs('strftime', a, 1); return strftime(d, strArg('strftime', a[0])); },
  isoformat: (I, d) => str(d).replace(' ', 'T'),
  toordinal: (I, d) => BigInt(d.ordinal()),
  date: (I, d) => new PyDate(d.y, d.m, d.d),
  replace: (I, d, a, kw) => {
    const o = kwArgs('replace', kw, ['year', 'month', 'day', 'hour', 'minute', 'second', 'microsecond']);
    const g = (k, def) => (k in o ? Number(asIndex(o[k])) : def);
    if (d instanceof PyDateTime) return new PyDateTime(g('year', d.y), g('month', d.m), g('day', d.d), g('hour', d.h), g('minute', d.mi), g('second', d.s), g('microsecond', d.us));
    return new PyDate(g('year', d.y), g('month', d.m), g('day', d.d));
  },
};
const ORDERED_DICT = {
  move_to_end: (I, d, a, kw) => {
    const o = kwArgs('move_to_end', kw, ['key', 'last']);
    rangeArgs('move_to_end', a, 1, 2);
    const last = truthy(a.length > 1 ? a[1] : ('last' in o ? o.last : true));
    const e = d.delete(a[0]);
    if (e === undefined) throw pyErr('KeyError', a[0]);
    if (last) d.set(e[0], e[1]);
    else { const rest = d.entries(); d.clear(); d.set(e[0], e[1]); for (const [k, v] of rest) d.set(k, v); }
    return null;
  },
  popitem: (I, d, a, kw) => {
    const o = kwArgs('popitem', kw, ['last']);
    atMost('popitem', a, 1);
    const last = truthy(a.length ? a[0] : ('last' in o ? o.last : true));
    if (!d.size) throw pyErr('KeyError', 'dictionary is empty');
    const ents = d.entries(); const [k, v] = last ? ents[ents.length - 1] : ents[0]; d.delete(k);
    return new PyTuple([k, v]);
  },
};
const DICT_VIEW = {
  isdisjoint: (I, v, a) => {
    exactArgs('isdisjoint', a, 1);
    let self = v, other = a[0];
    if (self === other) return self.dict.size === 0;
    const setLike = (x) => x instanceof PySet || (x instanceof PyDictView && x.kind !== 'values');
    if (setLike(other) && pyLen(other) > self.dict.size) { const t = other; other = self; self = t; }
    for (const x of toArray(other, I)) if (contains(self, x)) return false;
    return true;
  },
};
const TIMEDELTA = { total_seconds: (I, td) => td.us / 1e6 };
const DATETIME = {
  time: (I, d, a) => { exactArgs('time', a, 0); return new PyTime(d.h, d.mi, d.s, d.us); },
  timestamp: (I, d, a) => { exactArgs('timestamp', a, 0); return new Date(d.y, d.m - 1, d.d, d.h, d.mi, d.s).getTime() / 1000 + d.us / 1e6; },
};
const TIME = {
  strftime: (I, t, a) => { exactArgs('strftime', a, 1); return strftime(t, strArg('strftime', a[0])); },
  isoformat: (I, t, a) => { if (a.length) throw pyErr('TypeError', 'minipy does not support time.isoformat(timespec) yet'); return str(t); },
  replace: (I, t, a, kw) => {
    const o = kwArgs('replace', kw, ['hour', 'minute', 'second', 'microsecond']);
    const g = (k, def) => (k in o ? Number(asIndex(o[k])) : def);
    const v = [g('hour', t.h), g('minute', t.mi), g('second', t.s), g('microsecond', t.us)];
    checkTime(...v);
    return new PyTime(...v);
  },
};
function checkTime(h, mi, s, us) {
  if (h < 0 || h > 23) throw pyErr('ValueError', 'hour must be in 0..23');
  if (mi < 0 || mi > 59) throw pyErr('ValueError', 'minute must be in 0..59');
  if (s < 0 || s > 59) throw pyErr('ValueError', 'second must be in 0..59');
  if (us < 0 || us > 999999) throw pyErr('ValueError', 'microsecond must be in 0..999999');
}
const EXC_METHODS = { with_traceback: (I, e) => e, add_note: (I, e, a) => { (e.notes || (e.notes = [])).push(a[0]); return null; } };

// methods that accept keyword arguments; every other method of a builtin type raises
// "list.pop() takes no keyword arguments" like CPython's METH_O / METH_VARARGS / positional-only clinic methods
const KW_METHODS = {
  str: ['split', 'rsplit', 'splitlines', 'replace', 'expandtabs', 'encode', 'format'],
  list: ['sort'],
  dict: ['update', 'most_common', 'subtract'],
  OrderedDict: ['move_to_end', 'popitem'],
  date: null, timedelta: null, time: null, datetime: null,
};
function withKwPolicy(typeName, table) {
  const ok = KW_METHODS[typeName];
  if (ok === null) return table;
  const out = {};
  for (const name of Object.keys(table)) {
    const m = table[name];
    if (ok && ok.includes(name)) { out[name] = m; continue; }
    out[name] = (I, self, a, kw) => {
      if (kw) for (const k in kw) { void k; throw pyErr('TypeError', `${typeName}.${name}() takes no keyword arguments`); }
      return m(I, self, a, kw);
    };
  }
  return out;
}
export const METHODS = { str: STR, list: LIST, tuple: TUPLE, dict: DICT, OrderedDict: ORDERED_DICT, set: SET, frozenset: SET, deque: DEQUE, dict_keys: DICT_VIEW, dict_items: DICT_VIEW, int: INT, float: FLOAT, range: RANGE, date: DATE, datetime: DATETIME, time: TIME, timedelta: TIMEDELTA };
for (const k of Object.keys(METHODS)) METHODS[k] = withKwPolicy(k === 'frozenset' ? 'frozenset' : k, METHODS[k]);
const FROZEN_OK = new Set(['copy', 'union', 'intersection', 'difference', 'symmetric_difference', 'issubset', 'issuperset', 'isdisjoint']);

// ------------------------------------------------------------------ attribute access
function dirFor(t) {
  if (t.isExc) return ['add_note', 'args', 'with_traceback'];
  const key = t === T.datetime ? 'datetime.datetime' : t.dirName || t.name;
  return DIRS[key] || [];
}
function attrError(obj, name) {
  let msg, cands;
  if (obj instanceof PyModule) { msg = `module '${obj.name}' has no attribute '${name}'`; cands = [...obj.dict.keys()].sort(); } else if (obj instanceof PyType) { msg = `type object '${obj.name}' has no attribute '${name}'`; cands = dirFor(obj).slice(); } else {
    const t = typeOf(obj);
    msg = `'${t.tpName}' object has no attribute '${name}'`;
    cands = obj instanceof PyHost && obj.I ? obj.I.hostAttrNames(obj) : obj instanceof PyHost ? Object.keys(obj.obj).sort() : dirFor(t).slice();
  }
  const e = pyErr('AttributeError', msg);
  e.name = name;
  if (!name.startsWith('_')) cands = cands.filter((c) => !c.startsWith('_'));
  const sug = suggestName(cands, name);
  if (sug) e.suggestion = `. Did you mean: '${sug}'?`;
  return e;
}
export { attrError };

export function getAttribute(I, obj, name) {
  if (obj instanceof PyModule) {
    if (obj.hostObj) { const hv = I.hostModuleGetAttr(obj, name); if (hv !== undefined) return hv; }
    const v = obj.dict.get(name);
    if (v !== undefined) return v;
    if (name === '__name__') return obj.name;
    throw attrError(obj, name);
  }
  if (obj instanceof PyHost) return I.hostGetAttr(obj, name);
  if (obj instanceof PyType) return typeAttr(I, obj, name);
  if (obj instanceof PyGenericAlias) {
    if (name === '__origin__') return obj.origin;
    if (name === '__args__') return new PyTuple(obj.args.slice());
    if (name === '__parameters__') return new PyTuple([]);
    if (name === '__class__') return T.GenericAlias;
    return typeAttr(I, obj.origin, name);   // ga_getattro: everything else comes from the origin class
  }
  if (obj instanceof PyUnionType) {
    if (name === '__args__') return new PyTuple(obj.args.slice());
    if (name === '__parameters__') return new PyTuple([]);
    if (name === '__class__') return T.UnionType;
    throw attrError(obj, name);
  }
  if (obj instanceof PyFunction) {
    if (name === '__name__') return obj.name;
    if (name === '__qualname__') return obj.qualname;
    if (name === '__doc__') return docOf(obj);
    if (name === '__defaults__') return obj.defaults.length ? new PyTuple(obj.defaults) : null;
    if (obj.dict && obj.dict.has(name)) return obj.dict.get(name);
    throw attrError(obj, name);
  }
  if (obj instanceof PyBuiltin) {
    if (name === '__name__') return obj.name;
    if (name === '__qualname__') {
      if (obj.pyKind) return obj.pyQual || obj.name;
      if (!obj.ownerType && obj.self && obj.self.pytype) return `${obj.self.pytype.name}.${obj.name}`;
      // a method of a type (str.upper, "a".upper) is qualified by the type that defines it
      if (obj.ownerType && (obj.descr || (obj.self !== undefined && !(obj.self instanceof PyModule)))) return `${methodOwner(obj).name}.${obj.name}`;
      return obj.name;
    }
    if (name === '__doc__') { const ent = builtinDoc(obj); return ent ? ent[2] : null; }
    if (name === '__objclass__' && obj.descr) return methodOwner(obj);
    if (name === '__self__' && !obj.descr) return obj.self === undefined ? I.builtinsModule || null : obj.self;
    if (name === '__module__' && (obj.self === undefined || obj.pyKind)) return obj.module || 'builtins';
    if (name === '__func__' && obj.pyKind === 'method') { const f = new PyBuiltin(obj.name, (I2, a, kw) => obj.fn(I2, a[0], a.slice(1), kw), { module: obj.module }); f.pyKind = 'function'; f.pyQual = obj.pyQual; return f; }
    if (name === '__class__') return typeOf(obj);
    throw attrError(obj, name);
  }
  if (obj instanceof PyExc) {
    if (name === 'args') return new PyTuple(obj.args);
    if (name === '__context__') return obj.context || null;
    if (name === '__cause__') return obj.cause || null;
    if (name === '__suppress_context__') return !!obj.causeSet;
    if (name === '__notes__' && obj.notes) return new PyList(obj.notes);
    if (name === 'value' && obj.type.isSubOf(EXC.StopIteration)) return obj.args.length ? obj.args[0] : null;
    if (name === 'code' && obj.type === EXC.SystemExit) return obj.args.length ? obj.args[0] : null;
    if (obj.type.isSubOf(EXC.SyntaxError) && !(obj.dict && obj.dict.has(name))) {
      const si = obj.syntaxInfo;
      const num = (v) => (v == null ? null : BigInt(v));
      switch (name) {
        case 'msg': return obj.args.length ? obj.args[0] : null;
        case 'filename': return si ? si.filename : null;
        case 'lineno': return si ? num(si.line) : null;
        case 'offset': return si ? num(si.col) : null;
        case 'end_lineno': return si ? num(si.endLine) : null;
        case 'end_offset': return si ? num(si.endCol) : null;
        case 'text': return si ? si.text : null;
        case 'print_file_and_line': return null;
      }
    }
    if (obj.dict && obj.dict.has(name)) return obj.dict.get(name);
    if (EXC_METHODS[name]) return new PyBuiltin(name, EXC_METHODS[name], { self: obj });
    if (name === '__class__') return obj.type;
    throw attrError(obj, name);
  }
  if (obj !== null && typeof obj === 'object' && typeof obj.pyGetAttr === 'function') { const r = obj.pyGetAttr(name); if (r !== undefined) return r; }
  const t = typeOf(obj);
  if (t.fields && obj instanceof PyTuple) {
    const fi = t.fields.indexOf(name);
    if (fi >= 0) return obj.items[fi];
    if (obj.extra && name in obj.extra) return obj.extra[name];   // struct_time's tm_zone / tm_gmtoff
    if (name === '_fields') return new PyTuple(t.fields.slice());
  }
  if ((name === 'fromkeys' && obj instanceof PyDict) || (name === 'fromhex' && t === T.float)) return typeAttr(I, t, name);   // classmethod through an instance
  for (let x = t; x; x = x.base) {
    const tbl = METHODS[x.name];
    const m = tbl && tbl[name];
    if (m) {
      if (x.name === 'dict' && (name === 'most_common' || name === 'elements' || name === 'total' || name === 'subtract') && obj.ctype !== T.Counter) break;
      if (t === T.frozenset && !FROZEN_OK.has(name)) break;
      const b = new PyBuiltin(name, m, { self: obj, ownerType: t });
      if (t === T.Counter && COUNTER_PY_METHODS.has(name)) { b.pyKind = 'method'; b.pyQual = 'Counter.' + name; b.module = 'collections'; }
      return b;
    }
  }
  // data attributes
  switch (t.name) {
    case 'int': case 'bool':
      if (name === 'real' || name === 'numerator') return toBig(obj);
      if (name === 'imag') return 0n;
      if (name === 'denominator') return 1n;
      break;
    case 'float': if (name === 'real') return obj; if (name === 'imag') return 0.0; break;
    case 'range': if (name === 'start') return obj.start; if (name === 'stop') return obj.stop; if (name === 'step') return obj.step; break;
    case 'slice': if (name === 'start') return obj.start; if (name === 'stop') return obj.stop; if (name === 'step') return obj.step; break;
    case 'deque': if (name === 'maxlen') return obj.maxlen === null ? null : BigInt(obj.maxlen); break;
    case 'defaultdict': if (name === 'default_factory') return obj.factory; break;
    case 'date': case 'datetime':
      if (name === 'year') return BigInt(obj.y);
      if (name === 'month') return BigInt(obj.m);
      if (name === 'day') return BigInt(obj.d);
      if (obj instanceof PyDateTime) { if (name === 'hour') return BigInt(obj.h); if (name === 'minute') return BigInt(obj.mi); if (name === 'second') return BigInt(obj.s); if (name === 'microsecond') return BigInt(obj.us); }
      break;
    case 'time':
      if (name === 'hour') return BigInt(obj.h);
      if (name === 'minute') return BigInt(obj.mi);
      if (name === 'second') return BigInt(obj.s);
      if (name === 'microsecond') return BigInt(obj.us);
      if (name === 'tzinfo') return null;
      if (name === 'fold') return 0n;
      break;
    case 'timedelta': {
      const days = Math.floor(obj.us / 86400e6), rest = obj.us - days * 86400e6;
      if (name === 'days') return BigInt(days);
      if (name === 'seconds') return BigInt(Math.floor(rest / 1e6));
      if (name === 'microseconds') return BigInt(Math.round(rest % 1e6));
      break;
    }
    case 'dict_keys': case 'dict_values': case 'dict_items': if (name === 'mapping') return obj.dict; break;
  }
  if (name === '__class__') return t;
  if (name === '__doc__') return null;
  const dunder = dunderMethod(I, obj, name);
  if (dunder) return dunder;
  throw attrError(obj, name);
}
// the few special methods programs probe with hasattr()/getattr()
function dunderMethod(I, obj, name) {
  const iterable = typeof obj === 'string' || obj instanceof PyList || obj instanceof PyTuple || obj instanceof PyDict || obj instanceof PySet || obj instanceof PyRange || obj instanceof PyDeque || obj instanceof PyIter || obj instanceof PyDictView;
  const sized = iterable && !(obj instanceof PyIter);
  const b = (f) => new PyBuiltin(name, (I2, self, a) => f(a), { self: obj });
  switch (name) {
    case '__iter__': return iterable ? b(() => getIter(obj, I)) : null;
    case '__next__': return obj instanceof PyIter ? b(() => { const x = obj.next(); if (x === STOP) throw new PyExc(EXC.StopIteration, []); return x; }) : null;
    case '__len__': return sized ? b(() => BigInt(pyLen(obj))) : null;
    case '__contains__': return sized ? b((a) => contains(obj, a[0])) : null;
    case '__getitem__': return sized && !(obj instanceof PySet) ? b((a) => getitem(obj, a[0], I)) : null;
    case '__str__': return b(() => str(obj));
    case '__repr__': return b(() => repr(obj));
  }
  return null;
}
export function docOf(fn) {
  const b = fn.def.body;
  if (Array.isArray(b) && b[0] && b[0].t === 'Expr' && b[0].value.t === 'Const' && typeof b[0].value.value === 'string') {
    if (b[0].cleanDoc === undefined) b[0].cleanDoc = cleanDoc(b[0].value.value);
    return b[0].cleanDoc;
  }
  return null;
}
function expandTabs(s, ts = 8) {
  let out = '', col = 0;
  for (const c of s) {
    if (c === '\t') { const k = ts - (col % ts); out += ' '.repeat(k); col += k; } else if (c === '\n' || c === '\r') { out += c; col = 0; } else { out += c; col++; }
  }
  return out;
}
/** CPython 3.13 compiles docstrings through _PyCompile_CleanDoc: tabs expanded, the common indentation of the lines
 * after the first removed, the first line's leading spaces removed (trailing blank lines are kept) */
export function cleanDoc(doc) {
  doc = expandTabs(doc);
  const lines = doc.split('\n');
  let margin = Infinity;
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    const ind = l.length - l.replace(/^ +/, '').length;
    if (ind < l.length) margin = Math.min(margin, ind);
  }
  if (margin === Infinity) margin = 0;
  const first = lines[0].replace(/^ +/, '');
  if (first.length === lines[0].length && margin === 0) return doc;
  const out = [first];
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    let k = 0;
    while (k < margin && l[k] === ' ') k++;
    out.push(l.slice(k));
  }
  return out.join('\n');
}
/** inspect.cleandoc (pydoc): like cleanDoc, then leading and trailing blank lines dropped */
function inspectCleandoc(doc) {
  const lines = cleanDoc(doc).split('\n');
  while (lines.length && !lines[lines.length - 1]) lines.pop();
  while (lines.length && !lines[0]) lines.shift();
  return lines.join('\n');
}
/** str(inspect.signature(fn)) for a function defined in the program */
function signatureText(fn) {
  const p = fn.def.params;
  const ann = (a) => {
    if (!a) return '';
    if (a.t === 'Const') return repr(a.value);
    return unparseAnn(a);
  };
  const parts = [];
  const nargs = p.args.length, firstDefault = nargs - fn.defaults.length;
  let annotated = false;
  const one = (a, dflt) => {
    let t = a.name;
    if (a.annotation) { annotated = true; t += ': ' + ann(a.annotation); }
    if (dflt !== undefined) t += (a.annotation ? ' = ' : '=') + repr(dflt);
    return t;
  };
  p.args.forEach((a, i) => {
    parts.push(one(a, i >= firstDefault ? fn.defaults[i - firstDefault] : undefined));
    if (p.posonly && i === p.posonly - 1) parts.push('/');
  });
  if (p.vararg) parts.push('*' + one(p.vararg));
  else if (p.kwonly.length) parts.push('*');
  p.kwonly.forEach((a, i) => parts.push(one(a, fn.kwdefaults ? fn.kwdefaults[i] : undefined)));
  if (p.kwarg) parts.push('**' + one(p.kwarg));
  let sig = '(' + parts.join(', ') + ')';
  if (fn.def.returns) { annotated = true; sig += ' -> ' + ann(fn.def.returns); }
  return { sig, annotated };
}
function unparseAnn(n) {
  switch (n.t) {
    case 'Name': return n.id;
    case 'Attribute': return unparseAnn(n.value) + '.' + n.attr;
    case 'Subscript': return unparseAnn(n.value) + '[' + (n.slice.t === 'Tuple' ? n.slice.elts.map(unparseAnn).join(', ') : unparseAnn(n.slice)) + ']';
    case 'Const': return repr(n.value);
    case 'BinOp': return unparseAnn(n.left) + ' ' + n.op + ' ' + unparseAnn(n.right);
    default: return '...';
  }
}
/** [kind, signature, __doc__] of a function of builtins / math / random / statistics (minipy/pydocs.js) */
function builtinDoc(fn) {
  if (fn.descr || (fn.self !== undefined && !(fn.self instanceof PyModule) && fn.module !== 'random')) return null;
  const ent = PYDOCS[(fn.module || 'builtins') + '.' + fn.name];
  return ent || null;
}
/** help() of a method of a builtin type (str.upper, "x".upper, dict.fromkeys) or of Counter: pydoc's page, or null */
function methodHelp(obj) {
  let owner = null;
  if (obj.pyKind && obj.pyQual && obj.pyQual.startsWith('Counter.')) owner = T.Counter;
  else if (obj.ownerType) owner = obj.ownerType.name === 'Counter' ? T.dict : methodOwner(obj);
  if (!owner) return null;
  const ent = METHOD_DOCS[owner.name + '.' + obj.name];
  if (!ent) return null;
  const [kind, unbound, bound, raw] = ent;
  const qual = owner.module === 'builtins' ? 'builtins.' + owner.name : owner.qualName;
  const name = obj.name;
  let head, decl;
  if (kind === 'f') {
    if (obj.pyKind === 'method') { head = `Help on method ${name} in module collections:`; decl = `${name}${bound || '(...)'} method of collections.Counter instance`; } else { head = `Help on function ${name} in module collections:`; decl = `${name}${unbound || '(...)'}`; }
  } else if (kind === 'k') { head = `Help on built-in function ${name}:`; decl = `${name}${bound || '(...)'} class method of ${qual}`; } else if (kind === 's') { head = `Help on built-in function ${name}:`; decl = `${name}${bound || '(...)'}`; } else if (obj.descr) { head = 'Help on method_descriptor:'; decl = `${name}${unbound || '(...)'} unbound ${qual} method`; } else { head = `Help on built-in function ${name}:`; decl = `${name}${bound || '(...)'} method of ${qual} instance`; }
  const doc = raw ? raw.split('\n').map((l) => ('    ' + l).replace(/\s+$/, '')).join('\n').replace(/\s+$/, '') + '\n' : '';
  return head + '\n\n' + decl + '\n' + doc + '\n';
}
/** help(function): pydoc's plain-text page (Helper.help → render_doc → TextDoc.docroutine) */
function* helpFn(I, args, kw) {
  if (kw) for (const k in kw) if (k !== 'request') throw unexpectedKw('help', k, ['request']);
  const obj = args.length ? args[0] : kw && kw.request;
  if (obj === undefined) throw pyErr('RuntimeError', 'minipy does not support the interactive help() yet');
  if (obj instanceof PyBuiltin) {
    const page = methodHelp(obj);
    if (page !== null) { yield I.emitOutput(page); return null; }
    const ent = builtinDoc(obj);
    if (!ent) throw pyErr('RuntimeError', `minipy's help() has no documentation for ${obj.name}()`);
    const [kind, sig, raw] = ent;
    const mod = obj.module || 'builtins';
    const head = kind === 'c' ? `Help on built-in function ${obj.name}:` : `Help on ${kind === 'b' ? 'built-in function' : kind === 'm' ? 'method' : 'function'} ${obj.name} in module ${mod}:`;
    const decl = obj.name + (sig || '(...)') + (kind === 'm' || kind === 'c' ? ' method of random.Random instance' : '');
    const doc = raw ? inspectCleandoc(raw) : '';
    yield I.emitOutput(head + '\n\n' + decl + '\n' + (doc ? doc.split('\n').map((l) => ('    ' + l).replace(/\s+$/, '')).join('\n').replace(/\s+$/, '') + '\n' : '') + '\n');
    return null;
  }
  if (!(obj instanceof PyFunction)) throw pyErr('RuntimeError', "minipy's help() only shows functions defined in the program and the functions of builtins, math, random and statistics");
  const { sig, annotated } = signatureText(obj);
  const decl = obj.name === '<lambda>' ? '<lambda> lambda ' + (annotated ? sig : sig.slice(1, -1)) : obj.name + sig;
  const raw = docOf(obj);
  const doc = raw ? inspectCleandoc(raw) : '';
  const body = decl + '\n' + (doc ? doc.split('\n').map((l) => ('    ' + l).replace(/\s+$/, '')).join('\n').replace(/\s+$/, '') + '\n' : '');
  yield I.emitOutput(`Help on function ${obj.name} in module __main__:\n\n` + body + '\n');
  return null;
}
/** float.hex(): CPython's float_hex, always 13 hex digits after the point; subnormals as 0x0.<digits>p-1022 */
function floatHex(v) {
  if (v !== v || !isFinite(v)) return floatRepr(v);
  if (v === 0) return Object.is(v, -0) ? '-0x0.0p+0' : '0x0.0p+0';
  const [m0, e0] = floatToRatio(Math.abs(v));
  // value = m0 * 2**e0; scale the mantissa to 53 bits (normal) or to the 2**-1074 grid (subnormal)
  let m = m0, e = e0;
  const bl = m.toString(2).length;
  m <<= BigInt(53 - bl); e -= 53 - bl;   // now 2**52 <= m < 2**53, value = m * 2**e
  let lead = '1', exp = e + 52;
  if (exp < -1022) { m >>= BigInt(-1022 - exp); exp = -1022; lead = '0'; }
  const frac = (m & ((1n << 52n) - 1n)).toString(16).padStart(13, '0');
  return (v < 0 ? '-' : '') + '0x' + lead + '.' + frac + 'p' + (exp >= 0 ? '+' : '') + exp;
}
/** float.fromhex(s): CPython's float_fromhex (correctly rounded, half to even) */
function floatFromHex(I, args) {
  exactArgs('fromhex', args, 1);
  const src = args[0];
  if (typeof src !== 'string') throw pyErr('TypeError', `bad argument type for built-in operation`);
  const bad = () => pyErr('ValueError', 'invalid hexadecimal floating-point string');
  const t = src.replace(/^[ \t\n\v\f\r]+/, '').replace(/[ \t\n\v\f\r]+$/, '');
  let m = /^([+-]?)(inf|infinity|nan)$/i.exec(t);
  if (m) { const x = m[2].toLowerCase() === 'nan' ? NaN : Infinity; return m[1] === '-' ? -x : x; }
  m = /^([+-]?)(?:0[xX])?([0-9a-fA-F]*)(?:\.([0-9a-fA-F]*))?(?:[pP]([+-]?[0-9]+))?$/.exec(t);
  if (!m) throw bad();
  const ip = m[2], fp = m[3] || '';
  if (!(ip + fp).length) throw bad();
  const neg = m[1] === '-';
  const N = BigInt('0x' + ip + fp);
  if (N === 0n) return neg ? -0 : 0;
  const E = BigInt(m[4] || '0') - BigInt(4 * fp.length);
  const top = BigInt(N.toString(2).length) + E;
  let x;
  if (top > 1100n) x = Infinity;
  else if (top < -1100n) x = 0;
  else { const e = Number(E); x = e >= 0 ? ratioToFloat(N << BigInt(e), 1n) : ratioToFloat(N, 1n << BigInt(-e)); }
  if (!isFinite(x)) throw pyErr('OverflowError', 'hexadecimal value too large to represent as a float');
  return neg ? -x : x;
}
function typeAttr(I, t, name) {
  if (t.hostClass && I.hostTypeGetAttr) { const v = I.hostTypeGetAttr(t, name); if (v !== undefined) return v; }
  if (t.classAttrs && t.classAttrs[name]) return t.classAttrs[name];
  if (t.fields && name === '_fields') return new PyTuple(t.fields.slice());
  if (t.name === 'float' && name === 'fromhex') return new PyBuiltin('fromhex', floatFromHex, { ownerType: T.float });
  if (name === '__name__') return t.name;
  if (name === '__qualname__') return t.name;
  if (name === '__module__') return t.module;
  if (name === '__doc__') return null;
  if (t.name === 'Counter' && name === 'fromkeys') return new PyBuiltin('fromkeys', () => { throw pyErr('NotImplementedError', 'Counter.fromkeys() is undefined.  Use Counter(iterable) instead.'); });
  if ((t === T.dict || t === T.OrderedDict || t === T.defaultdict) && name === 'fromkeys') {
    // a classmethod: the new mapping has the class it was reached through (dict.fromkeys, {}.fromkeys, OrderedDict...)
    return new PyBuiltin('fromkeys', (I2, a) => {
      rangeArgs('fromkeys', a, 1, 2);
      const d = new PyDict(t === T.dict ? null : t);
      for (const k of toArray(a[0], I)) d.set(k, a.length > 1 ? a[1] : null);
      return d;
    }, { ownerType: t });
  }
  if (t === T.Counter && COUNTER_PY_METHODS.has(name)) {
    // Counter's own methods are Python functions in Lib/collections
    const m = METHODS.dict[name];
    const f = new PyBuiltin(name, (I2, a, kw) => {
      if (!a.length) throw pyErr('TypeError', `Counter.${name}() missing 1 required positional argument: 'self'`);
      return m(I, a[0], a.slice(1), kw);
    }, { module: 'collections' });
    f.pyKind = 'function'; f.pyQual = 'Counter.' + name;
    return f;
  }
  if ((t.name === 'date' || t.name === 'datetime') && I.dateClassAttr) { const v = I.dateClassAttr(t, name); if (v !== undefined) return v; }
  if (t === T.str && name === 'maketrans') return new PyBuiltin('maketrans', strMaketrans, { ownerType: T.str });   // a staticmethod
  for (let x = t; x; x = x.base) {
    const tbl = METHODS[x.name];
    const m = tbl && tbl[name];
    if (m) {
      // a method_descriptor: <method 'upper' of 'str' objects>
      const md = new PyBuiltin(name, (I2, a, kw) => {
        if (!a.length) throw pyErr('TypeError', `unbound method ${x.name}.${name}() needs an argument`);
        if (!isinstance(a[0], x)) throw pyErr('TypeError', `descriptor '${name}' for '${x.tpName}' objects doesn't apply to a '${typeName(a[0])}' object`);
        return m(I, a[0], a.slice(1), kw);
      }, { ownerType: x });
      md.descr = true;
      return md;
    }
  }
  throw attrError(t, name);
}

/** the type whose method table defines a builtin method */
function methodOwner(fn) {
  let t = fn.ownerType;
  for (let x = t; x; x = x.base) if (METHODS[x.name] && METHODS[x.name][fn.name]) return x;
  return t;
}
export function setAttribute(I, obj, name, v) {
  if (obj instanceof PyModule) { if (obj.hostObj) I.hostModuleSetAttr(obj, name, v); else obj.dict.set(name, v); return; }
  if (obj instanceof PyHost) { I.hostSetAttr(obj, name, v); return; }
  if (obj instanceof PyFunction) { if (!obj.dict) obj.dict = new Map(); obj.dict.set(name, v); return; }
  if (obj instanceof PyExc) {
    const excOrNone = (what) => {
      if (v !== null && !(v instanceof PyExc)) throw pyErr('TypeError', `exception ${what} must be None or derive from BaseException`);
    };
    if (name === '__context__') { excOrNone('context'); obj.context = v; return; }
    if (name === '__cause__') { excOrNone('cause'); obj.cause = v; obj.causeSet = true; return; }
    if (name === '__suppress_context__') { obj.causeSet = truthy(v); return; }
    if (name === 'args') { obj.args = toArray(v, I); return; }
    if (!obj.dict) obj.dict = new Map(); obj.dict.set(name, v); return;
  }
  if (obj instanceof PyType) throw pyErr('TypeError', `cannot set '${name}' attribute of immutable type '${obj.name}'`);
  if (obj instanceof PyDict && obj.ctype === T.defaultdict && name === 'default_factory') { obj.factory = v; return; }
  throw attrWriteError(I, obj, name);
}
// getset descriptors without a setter / read-only member descriptors of the builtin types
const GETSET_RO = {
  int: ['real', 'imag', 'numerator', 'denominator'], float: ['real', 'imag'], deque: ['maxlen'], date: ['year', 'month', 'day'],
  datetime: ['hour', 'minute', 'second', 'microsecond'], time: ['hour', 'minute', 'second', 'microsecond', 'tzinfo', 'fold'], dict_keys: ['mapping'], dict_values: ['mapping'], dict_items: ['mapping'],
};
const MEMBER_RO = { range: ['start', 'stop', 'step'], slice: ['start', 'stop', 'step'], timedelta: ['days', 'seconds', 'microseconds'] };
/** object.__setattr__ / __delattr__ on an instance of a builtin type (no __dict__) */
function attrWriteError(I, obj, name) {
  const t = typeOf(obj);
  for (let x = t; x; x = x.base) {
    if (GETSET_RO[x.name] && GETSET_RO[x.name].includes(name)) return pyErr('AttributeError', `attribute '${name}' of '${x.tpName}' objects is not writable`);
    if (MEMBER_RO[x.name] && MEMBER_RO[x.name].includes(name)) return pyErr('AttributeError', 'readonly attribute');
  }
  // a method or other attribute found on the type (a non-data descriptor): read-only
  let found = false;
  if (name !== '__class__') { try { getAttribute(I, obj, name); found = true; } catch (e) { if (!(e instanceof PyExc)) throw e; } }
  if (found) return pyErr('AttributeError', `'${t.tpName}' object attribute '${name}' is read-only`);
  return pyErr('AttributeError', `'${t.tpName}' object has no attribute '${name}' and no __dict__ for setting new attributes`);
}
export function delAttribute(I, obj, name) {
  if (obj instanceof PyModule) { if (!obj.dict.delete(name)) throw attrError(obj, name); return; }
  if (obj instanceof PyHost) { delete obj.obj[name]; return; }
  if (obj instanceof PyFunction) { if (obj.dict && obj.dict.delete(name)) return; throw attrError(obj, name); }
  if (obj instanceof PyExc) { if (obj.dict && obj.dict.delete(name)) return; throw attrError(obj, name); }
  if (obj instanceof PyType) throw pyErr('TypeError', `cannot delete '${name}' attribute of immutable type '${obj.name}'`);
  if (obj instanceof PyBuiltin || obj instanceof PyIter) throw attrError(obj, name);
  if (obj instanceof PyDict && obj.ctype === T.defaultdict && name === 'default_factory') { obj.factory = null; return; }
  throw attrWriteError(I, obj, name);
}

const COUNTER_PY_METHODS = new Set(['most_common', 'elements', 'total', 'subtract', 'update', 'copy']);

// ------------------------------------------------------------------ strftime
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function strftime(d, fmt) {
  if (d instanceof PyTime) d = new PyDateTime(1900, 1, 1, d.h, d.mi, d.s, d.us);   // a time's date fields are 1900-01-01
  const p2 = (n) => String(n).padStart(2, '0');
  const wd = (d.ordinal() + 6) % 7;
  const isDT = d instanceof PyDateTime;
  const h = isDT ? d.h : 0, mi = isDT ? d.mi : 0, s = isDT ? d.s : 0, us = isDT ? d.us : 0;
  const yday = d.ordinal() - new PyDate(d.y, 1, 1).ordinal() + 1;
  return fmt.replace(/%(.)/g, (m, c) => {
    switch (c) {
      case 'Y': return String(d.y).padStart(4, '0');
      case 'y': return p2(d.y % 100);
      case 'm': return p2(d.m);
      case 'd': return p2(d.d);
      case 'H': return p2(h);
      case 'I': return p2(h % 12 === 0 ? 12 : h % 12);
      case 'p': return h < 12 ? 'AM' : 'PM';
      case 'M': return p2(mi);
      case 'S': return p2(s);
      case 'f': return String(us).padStart(6, '0');
      case 'A': return DAY_NAMES[wd];
      case 'a': return DAY_NAMES[wd].slice(0, 3);
      case 'B': return MONTH_NAMES[d.m - 1];
      case 'b': case 'h': return MONTH_NAMES[d.m - 1].slice(0, 3);
      case 'j': return String(yday).padStart(3, '0');
      case 'w': return String((wd + 1) % 7);
      case 'u': return String(wd + 1);
      case 'e': return String(d.d).padStart(2, ' ');
      case 'D': return `${p2(d.m)}/${p2(d.d)}/${p2(d.y % 100)}`;
      case 'F': return `${String(d.y).padStart(4, '0')}-${p2(d.m)}-${p2(d.d)}`;
      case 'T': return `${p2(h)}:${p2(mi)}:${p2(s)}`;
      case 'c': return `${DAY_NAMES[wd].slice(0, 3)} ${MONTH_NAMES[d.m - 1].slice(0, 3)} ${String(d.d).padStart(2, ' ')} ${p2(h)}:${p2(mi)}:${p2(s)} ${d.y}`;
      case 'x': return `${p2(d.m)}/${p2(d.d)}/${p2(d.y % 100)}`;
      case 'X': return `${p2(h)}:${p2(mi)}:${p2(s)}`;
      case '%': return '%';
      default: return m;
    }
  });
}
void isLeap; void ordinalToDate; void rangeLen; void normIndex; void ratioToFloat; void floatRepr; void formatAddr; void lt;
