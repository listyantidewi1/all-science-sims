// minipy — number formatting: CPython float repr, exact decimal rounding, format-spec mini language,
// printf-style '%' formatting and round().
import {
  pyErr, typeName, repr, str, isIntLike, toBig, PyTuple, PyDict, PyList, PyRange, PyDate, floatToRatio, bitLen, ratioToFloat, intToStr, bigToFloat, chrOf, ordOf,
} from './values.js';

export function formatAddr(id) { return '0x' + (0x7f3a5c000000 + (id || 0) * 48).toString(16); }

/** CPython repr(float): shortest round-trip digits, exponent when exp < -4 or exp >= 16 */
export function floatRepr(x) {
  if (x !== x) return 'nan';
  if (x === Infinity) return 'inf';
  if (x === -Infinity) return '-inf';
  if (x === 0) return Object.is(x, -0) ? '-0.0' : '0.0';
  const s = x.toExponential();
  const ei = s.indexOf('e');
  let mant = s.slice(0, ei);
  const exp = +s.slice(ei + 1);
  const neg = mant[0] === '-';
  if (neg) mant = mant.slice(1);
  const digits = mant.length > 1 ? mant[0] + mant.slice(2) : mant;
  return (neg ? '-' : '') + placeDigits(digits, exp + 1, 'r', 17, true);
}

// digits: significant digits (no leading zeros), decpt: position of decimal point relative to digits start.
// mode 'r': exponent if decpt <= -4 or decpt > 16 (repr); always add .0 for integers.
function placeDigits(digits, decpt, mode, precision, addDot0, alt) {
  let useExp;
  if (mode === 'r') useExp = decpt <= -4 || decpt > 16;
  else useExp = decpt <= -4 || decpt > (addDot0 ? precision - 1 : precision);
  if (alt && digits.length < precision) digits = digits + '0'.repeat(precision - digits.length);
  if (useExp) {
    const e = decpt - 1;
    let m = digits[0];
    if (digits.length > 1 || alt) m += '.' + digits.slice(1);
    return m + 'e' + (e < 0 ? '-' : '+') + String(Math.abs(e)).padStart(2, '0');
  }
  let out;
  if (decpt <= 0) out = '0.' + '0'.repeat(-decpt) + digits;
  else if (decpt >= digits.length) {
    out = digits + '0'.repeat(decpt - digits.length);
    if (addDot0) out += '.0'; else if (alt) out += '.';
  } else out = digits.slice(0, decpt) + '.' + digits.slice(decpt);
  return out;
}

// ---------------------------------------------------------------- exact decimal arithmetic
const P5 = [1n];
function pow5(n) { while (P5.length <= n) P5.push(P5[P5.length - 1] * 5n); return P5[n]; }
const P10 = [1n];
export function pow10(n) { if (n < 400) { while (P10.length <= n) P10.push(P10[P10.length - 1] * 10n); return P10[n]; } return 10n ** BigInt(n); }
/** |x| = D * 10**k exactly (finite x) */
export function exactDecimal(x) {
  let [m, e] = floatToRatio(x);
  if (m < 0n) m = -m;
  if (e >= 0) return [m << BigInt(e), 0];
  return [m * pow5(-e), e];
}
/** round D*10**k to a multiple of 10**-p, half-even → integer N (value ≈ N * 10**-p) */
function roundFrac(D, k, p) {
  const s = k + p;
  if (s >= 0) return D * pow10(s);
  const div = pow10(-s);
  let q = D / div;
  const r = D - q * div;
  const t = r * 2n;
  if (t > div || (t === div && (q & 1n))) q++;
  return q;
}
/** fixed-point string of |x| with p decimals (correctly rounded, half-even on the exact binary value) */
export function fixedDigits(x, p, alt) {
  const [D, k] = exactDecimal(x);
  let s = roundFrac(D, k, p).toString();
  if (p > 0) { if (s.length <= p) s = '0'.repeat(p - s.length + 1) + s; return s.slice(0, s.length - p) + '.' + s.slice(s.length - p); }
  return alt ? s + '.' : s;
}
/** round |x| (x != 0) to n significant digits → [digits(string, length n), decpt] */
function sigDigits(x, n) {
  const [D, k] = exactDecimal(x);
  const nd = D.toString().length;
  let e10 = nd - 1 + k;
  let N = roundFrac(D, k, n - 1 - e10);
  if (N >= pow10(n)) { e10++; N = N / 10n; }
  return [N.toString().padStart(n, '0'), e10 + 1];
}
function expFormat(x, p, alt, upper) {
  let digits, decpt;
  if (x === 0) { digits = '0'.repeat(p + 1); decpt = 1; } else [digits, decpt] = sigDigits(x, p + 1);
  const e = decpt - 1;
  let m = digits[0];
  if (p > 0 || alt) m += '.' + digits.slice(1);
  const s = m + 'e' + (e < 0 ? '-' : '+') + String(Math.abs(e)).padStart(2, '0');
  return upper ? s.toUpperCase() : s;
}
function gFormat(x, p, alt, addDot0, upper) {
  if (p === 0) p = 1;
  let digits, decpt;
  if (x === 0) { digits = '0'; decpt = 1; } else {
    [digits, decpt] = sigDigits(x, p);
    digits = digits.replace(/0+$/, '') || '0';
  }
  const s = placeDigits(digits, decpt, 'g', p, addDot0, alt);
  return upper ? s.toUpperCase() : s;
}

/** CPython round(x, n) for floats: correctly rounded (half-even on exact value) */
export function roundFloat(x, n) {
  if (!isFinite(x) || x === 0) return x;
  if (n > 323) return x;
  if (n < -308) return 0.0 * x;
  const neg = x < 0;
  const [D, k] = exactDecimal(x);
  const N = roundFrac(D, k, n);
  let r = n >= 0 ? Number(N.toString() + 'e-' + n) : Number(N.toString() + 'e' + (-n));
  if (!isFinite(r)) throw pyErr('OverflowError', 'rounded value too large to represent');
  return neg ? -r : (r === 0 && neg ? -0 : r);
}
export function roundHalfEvenInt(x) {
  // round(x) → int, banker's rounding
  let r = Math.round(x);
  if (Math.abs(x - Math.trunc(x)) === 0.5) r = 2 * Math.round(x / 2);
  return r;
}

// ---------------------------------------------------------------- format spec mini-language
/**
 * Format-spec mini language, parsed like CPython's parse_internal_render_format_spec.
 * defaultAlign: '<' for str, '>' for numbers; defaultType: 's' for str, 'd' for int, '' for float.
 */
export function parseSpec(spec, v, defaultAlign = '>', defaultType = '') {
  const r = { fill: ' ', align: null, sign: '', z: false, alt: false, width: -1, grouping: null, precision: -1, type: defaultType, zeroPad: false };
  let i = 0;
  const chars = Array.from(spec);
  const isAlign = (c) => c === '<' || c === '>' || c === '^' || c === '=';
  let fillSpecified = false;
  if (chars.length >= 2 && isAlign(chars[1])) { r.fill = chars[0]; r.align = chars[1]; fillSpecified = true; i = 2; } else if (chars.length >= 1 && isAlign(chars[0])) { r.align = chars[0]; i = 1; }
  if (chars[i] === '+' || chars[i] === '-' || chars[i] === ' ') r.sign = chars[i++];
  if (chars[i] === 'z') { r.z = true; i++; }
  if (chars[i] === '#') { r.alt = true; i++; }
  // '0' before the width: fill with '0' unless a fill was given; '=' alignment only for numbers without an alignment
  if (!fillSpecified && chars[i] === '0') { r.fill = '0'; if (!r.align && defaultAlign === '>') r.align = '='; i++; }
  // get_integer(): more digits than fit a Py_ssize_t are an error
  const digits = () => {
    let acc = 0n, n = 0;
    while (i < chars.length && chars[i] >= '0' && chars[i] <= '9') {
      acc = acc * 10n + BigInt(chars[i++].charCodeAt(0) - 48); n++;
      if (acc > 9223372036854775807n) throw pyErr('ValueError', 'Too many decimal digits in format string');
    }
    return n ? Number(acc) : null;
  };
  const w = digits();
  if (w !== null) r.width = w;
  if (chars[i] === ',') { r.grouping = ','; i++; }
  if (chars[i] === '_') { if (r.grouping) throw pyErr('ValueError', "Cannot specify both ',' and '_'."); r.grouping = '_'; i++; }
  if (chars[i] === ',' && r.grouping === '_') throw pyErr('ValueError', "Cannot specify both ',' and '_'.");
  if (chars[i] === '.') {
    i++;
    const p = digits();
    if (p === null) throw pyErr('ValueError', 'Format specifier missing precision');
    r.precision = p;
  }
  if (chars.length - i > 1) throw pyErr('ValueError', `Invalid format specifier '${spec}' for object of type '${typeName(v)}'`);
  if (i < chars.length) r.type = chars[i];
  if (r.grouping) {
    if ('defgEG%F'.includes(r.type) && r.type !== '') { /* allowed */ } else if (r.type === '') { /* allowed */ } else if ('boxX'.includes(r.type) && r.grouping === '_') { /* every four digits */ } else {
      const t = r.type;
      const code = t.codePointAt(0);
      throw pyErr('ValueError', code > 32 && code < 128 ? `Cannot specify '${r.grouping}' with '${t}'.` : `Cannot specify '${r.grouping}' with '\\x${code.toString(16)}'.`);
    }
  }
  r.zeroPad = r.fill === '0' && r.align === '=';
  return r;
}
function groupDigits(intDigits, sep, every, minWidth) {
  // insert separators; pad with zeros (that are also grouped) to reach minWidth when zero-padding
  let n = intDigits.length;
  if (minWidth > 0) {
    let want = n;
    while (want + Math.floor((want - 1) / every) < minWidth) want++;
    if (want > n) { intDigits = '0'.repeat(want - n) + intDigits; n = want; }
  }
  let out = '';
  for (let i = 0; i < n; i++) {
    if (i > 0 && (n - i) % every === 0) out += sep;
    out += intDigits[i];
  }
  return out;
}
function pad(body, sign, r, defaultAlign, prefix = '') {
  const content = sign + prefix + body;
  const len = Array.from(content).length;
  if (r.width <= len) return content;
  const n = r.width - len;
  const align = r.align || defaultAlign;
  const fill = r.fill;
  switch (align) {
    case '<': return content + fill.repeat(n);
    case '>': return fill.repeat(n) + content;
    case '^': { const left = Math.floor(n / 2); return fill.repeat(left) + content + fill.repeat(n - left); }
    case '=': return sign + prefix + fill.repeat(n) + body;
  }
  return content;
}
function signStr(neg, r) { return neg ? '-' : r.sign === '+' ? '+' : r.sign === ' ' ? ' ' : ''; }

function formatNumberBody(digits, r, neg, prefix, every = 3) {
  // digits may contain a '.' / exponent part; grouping applies to the leading integer digits
  let intPart = digits, rest = '';
  const m = (every === 4 ? /^([0-9a-fA-F]*)(.*)$/s : /^(\d*)(.*)$/s).exec(digits);
  if (m) { intPart = m[1]; rest = m[2]; }
  const sign = signStr(neg, r);
  if (r.grouping) {
    let minW = 0;
    if (r.zeroPad && r.width > 0) minW = Math.max(0, r.width - sign.length - prefix.length - Array.from(rest).length);
    intPart = groupDigits(intPart, r.grouping, every, minW);
    return pad(intPart + rest, sign, r, '>', prefix);
  }
  return pad(intPart + rest, sign, r, '>', prefix);
}

export function formatInt(v, r) {
  let n = toBig(v);
  let t = r.type || 'd';
  if ('eEfFgG%'.includes(t)) return formatFloat(bigToFloat(n), r);
  if (!'bcdoxXn'.includes(t)) throw pyErr('ValueError', `Unknown format code '${t}' for object of type '${typeName(v)}'`);
  if (r.precision >= 0) throw pyErr('ValueError', 'Precision not allowed in integer format specifier');
  if (r.z) throw pyErr('ValueError', 'Negative zero coercion (z) not allowed in integer format specifier');
  if (t === 'c') {
    if (r.sign) throw pyErr('ValueError', "Sign not allowed with integer format specifier 'c'");
    if (r.alt) throw pyErr('ValueError', "Alternate form (#) not allowed with integer format specifier 'c'");
    if (n < 0n || n > 0x10ffffn) throw pyErr('OverflowError', '%c arg not in range(0x110000)');
    return pad(chrOf(Number(n)), '', r, '<');
  }
  const neg = n < 0n; if (neg) n = -n;
  let digits, prefix = '', every = 3;
  switch (t) {
    case 'd': case 'n': digits = intToStr(n); break;
    case 'b': digits = n.toString(2); prefix = r.alt ? '0b' : ''; every = 4; break;
    case 'o': digits = n.toString(8); prefix = r.alt ? '0o' : ''; every = 4; break;
    case 'x': digits = n.toString(16); prefix = r.alt ? '0x' : ''; every = 4; break;
    case 'X': digits = n.toString(16).toUpperCase(); prefix = r.alt ? '0X' : ''; every = 4; break;
    default: throw pyErr('ValueError', `Unknown format code '${t}' for object of type '${typeName(v)}'`);
  }
  if (r.grouping === ',' && 'boxX'.includes(t)) throw pyErr('ValueError', "Cannot specify ',' with '" + t + "'.");
  return formatNumberBody(digits, r, neg, prefix, every);
}

export function formatFloat(x, r, tname = 'float') {
  let t = r.type;
  // PyOS_double_to_string refuses precisions near INT_MAX
  if (r.precision > 2147482623) throw pyErr('ValueError', 'precision too big');
  let neg = x < 0 || Object.is(x, -0);
  let a = Math.abs(x);
  let body;
  let addPct = false;
  if (t === '%') { a *= 100; t = 'f'; addPct = true; }
  const upper = t === 'F' || t === 'E' || t === 'G';
  if (!['', 'f', 'F', 'e', 'E', 'g', 'G', 'n'].includes(t)) throw pyErr('ValueError', `Unknown format code '${t}' for object of type '${tname}'`);
  if (!isFinite(a)) {
    body = a !== a ? 'nan' : 'inf';
    if (upper) body = body.toUpperCase();
    if (addPct) body += '%';
    if (a !== a) neg = false;
    return formatNumberBody(body, { ...r, grouping: null }, neg, '');
  }
  const p = r.precision;
  switch (t) {
    case '':
      // repr rules ('r' mode); '#' keeps a decimal point in the exponent form too: 1.e-10
      if (p < 0) { body = floatRepr(a); if (r.alt && !body.includes('.')) body = body.replace('e', '.e'); } else body = gFormat(a, p, r.alt, true, false);
      break;
    case 'f': case 'F': body = fixedDigits(a, p < 0 ? 6 : p, r.alt); break;
    case 'e': case 'E': body = expFormat(a, p < 0 ? 6 : p, r.alt, upper); break;
    case 'g': case 'G': case 'n': body = gFormat(a, p < 0 ? 6 : p, r.alt, false, upper); break;
    default: throw pyErr('ValueError', `Unknown format code '${t}' for object of type '${tname}'`);
  }
  if (r.z && neg && /^[0.]*$/.test(body.replace(/[eE].*$/, ''))) neg = false;
  if (addPct) body += '%';
  return formatNumberBody(body, r, neg, '');
}

export function formatStr(s, r) {
  if (r.type && r.type !== 's') throw pyErr('ValueError', `Unknown format code '${r.type}' for object of type 'str'`);
  if (r.sign) throw pyErr('ValueError', r.sign === ' ' ? 'Space not allowed in string format specifier' : 'Sign not allowed in string format specifier');
  if (r.z) throw pyErr('ValueError', 'Negative zero coercion (z) not allowed in string format specifier');
  if (r.alt) throw pyErr('ValueError', 'Alternate form (#) not allowed in string format specifier');
  if (r.align === '=') throw pyErr('ValueError', "'=' alignment not allowed in string format specifier");
  if (r.precision >= 0) { const cs = Array.from(s); if (cs.length > r.precision) s = cs.slice(0, r.precision).join(''); }
  return pad(s, '', r, '<');
}

/** format(value, spec) for builtin values; `strftime` is supplied for dates */
export function formatValue(v, spec, strftime) {
  if (typeof v === 'string') return spec === '' ? v : formatStr(v, parseSpec(spec, v, '<', 's'));
  if (typeof v === 'bigint') return spec === '' ? intToStr(v) : formatInt(v, parseSpec(spec, v, '>', 'd'));
  if (typeof v === 'boolean') return spec === '' ? (v ? 'True' : 'False') : formatInt(v, parseSpec(spec, v, '>', 'd'));
  if (typeof v === 'number') return spec === '' ? floatRepr(v) : formatFloat(v, parseSpec(spec, v, '>', ''));
  if ((v instanceof PyDate || (v && v.constructor && v.constructor.name === 'PyTime')) && strftime) return spec === '' ? str(v) : strftime(v, spec);
  if (spec !== '') throw pyErr('TypeError', `unsupported format string passed to ${typeName(v)}.__format__`);
  return str(v);
}

// ---------------------------------------------------------------- printf-style formatting
export function percentFormat(fmt, args, interp) {
  // a port of CPython's PyUnicode_Format: a tuple supplies the arguments one by one; any other right operand is the
  // single argument (arglen -1), and one with __getitem__ (list, range, dict...) is also the mapping for %(key)
  let items = null, single = args, arglen, argidx;
  if (args instanceof PyTuple) { items = args.items; arglen = items.length; argidx = 0; } else { arglen = -1; argidx = -2; }
  const dict = !(args instanceof PyTuple) && (args instanceof PyDict || args instanceof PyList || args instanceof PyRange) ? args : null;
  const nextArg = () => {
    if (argidx < arglen) { const k = argidx++; return arglen < 0 ? single : items[k]; }
    throw pyErr('TypeError', 'not enough arguments for format string');
  };
  const isLong = (v) => typeof v === 'bigint' || typeof v === 'boolean';
  let out = '';
  const n = fmt.length;
  for (let i = 0; i < n; i++) {
    const c = fmt[i];
    if (c !== '%') { out += c; continue; }
    i++;
    if (fmt[i] === '%') { out += '%'; continue; }
    if (fmt[i] === '(') {
      if (!dict) throw pyErr('TypeError', 'format requires a mapping');
      let depth = 1, j = i + 1;
      while (j < n && depth) { if (fmt[j] === '(') depth++; else if (fmt[j] === ')') depth--; j++; }
      if (depth || j >= n) throw pyErr('ValueError', 'incomplete format key');
      const key = fmt.slice(i + 1, j - 1); i = j;
      single = getitemFor(dict, key); arglen = -1; argidx = -2;
    }
    const r = { fill: ' ', align: '>', sign: '-', alt: false, zero: false, width: -1, precision: -1 };
    for (;;) {
      const f = fmt[i];
      if (f === '-') r.align = '<'; else if (f === '+') r.sign = '+'; else if (f === ' ') { if (r.sign !== '+') r.sign = ' '; } else if (f === '#') r.alt = true; else if (f === '0') r.zero = true; else break;
      i++;
    }
    if (fmt[i] === '*') {
      const w = nextArg();
      if (!isLong(w)) throw pyErr('TypeError', '* wants int');
      const wb = toBig(w);
      if (wb > 9223372036854775807n || wb < -9223372036854775808n) throw pyErr('OverflowError', 'Python int too large to convert to C ssize_t');
      r.width = Number(wb); if (r.width < 0) { r.align = '<'; r.width = -r.width; }
      i++;
    } else if (fmt[i] >= '0' && fmt[i] <= '9') {
      let w = 0n;
      while (i < n && fmt[i] >= '0' && fmt[i] <= '9') { w = w * 10n + BigInt(fmt.charCodeAt(i) - 48); if (w > 9223372036854775807n) throw pyErr('ValueError', 'width too big'); i++; }
      r.width = Number(w);
    }
    if (fmt[i] === '.') {
      i++;
      r.precision = 0;
      if (fmt[i] === '*') {
        const p = nextArg();
        if (!isLong(p)) throw pyErr('TypeError', '* wants int');
        const pb = toBig(p);
        if (pb > 2147483647n || pb < -2147483648n) throw pyErr('OverflowError', 'Python int too large to convert to C int');
        r.precision = Math.max(0, Number(pb));
        i++;
      } else if (fmt[i] >= '0' && fmt[i] <= '9') {
        let p = 0;
        while (i < n && fmt[i] >= '0' && fmt[i] <= '9') { p = p * 10 + (fmt.charCodeAt(i) - 48); if (p > 2147483647) throw pyErr('ValueError', 'precision too big'); i++; }
        r.precision = p;
      }
    }
    if (fmt[i] === 'h' || fmt[i] === 'l' || fmt[i] === 'L') i++;
    if (i >= n) throw pyErr('ValueError', 'incomplete format');
    const t = fmt[i];
    const v = nextArg();
    if (r.zero && r.align !== '<') { r.fill = '0'; r.align = '='; r.zeroPad = true; }
    let s;
    switch (t) {
      case 's': s = interp ? interp.toStr(v) : str(v); if (r.precision >= 0) s = Array.from(s).slice(0, r.precision).join(''); s = pad(s, '', { ...r, fill: ' ', align: r.align === '<' ? '<' : '>' }, '>'); break;
      case 'r': case 'a': s = repr(v); if (t === 'a') s = asciiEscape(s); if (r.precision >= 0) s = Array.from(s).slice(0, r.precision).join(''); s = pad(s, '', { ...r, fill: ' ', align: r.align === '<' ? '<' : '>' }, '>'); break;
      case 'd': case 'i': case 'u': {
        let n;
        if (isIntLike(v)) n = toBig(v);
        else if (typeof v === 'number') { if (!isFinite(v)) throw pyErr(v !== v ? 'ValueError' : 'OverflowError', v !== v ? 'cannot convert float NaN to integer' : 'cannot convert float infinity to integer'); n = BigInt(Math.trunc(v)); }
        else throw pyErr('TypeError', `%${t} format: a real number is required, not ${typeName(v)}`);
        const neg = n < 0n; if (neg) n = -n;
        let digits = intToStr(n);
        if (r.precision > digits.length) digits = '0'.repeat(r.precision - digits.length) + digits;
        s = pad(digits, signStr(neg, r), r, '>');
        break;
      }
      case 'x': case 'X': case 'o': {
        if (!isIntLike(v)) throw pyErr('TypeError', `%${t} format: an integer is required, not ${typeName(v)}`);
        let n = toBig(v); const neg = n < 0n; if (neg) n = -n;
        let digits = n.toString(t === 'o' ? 8 : 16); if (t === 'X') digits = digits.toUpperCase();
        if (r.precision > digits.length) digits = '0'.repeat(r.precision - digits.length) + digits;
        const prefix = r.alt ? (t === 'o' ? '0o' : t === 'x' ? '0x' : '0X') : '';
        s = pad(digits, signStr(neg, r), r, '>', prefix);
        break;
      }
      case 'e': case 'E': case 'f': case 'F': case 'g': case 'G': {
        let x;
        if (typeof v === 'number') x = v; else if (isIntLike(v)) x = bigToFloat(toBig(v));
        else throw pyErr('TypeError', `must be real number, not ${typeName(v)}`);
        const rr = { ...r, type: t, grouping: null, z: false };
        if (rr.precision < 0) rr.precision = 6;
        s = formatFloat(x, rr);
        break;
      }
      case 'c': {
        if (typeof v === 'string') { if (Array.from(v).length !== 1) throw pyErr('TypeError', '%c requires int or char'); s = v; } else if (isIntLike(v)) {
          const n = toBig(v);
          if (n < 0n || n > 0x10ffffn) throw pyErr('OverflowError', '%c arg not in range(0x110000)');
          s = chrOf(Number(n));
        } else throw pyErr('TypeError', '%c requires int or char');
        s = pad(s, '', { ...r, fill: ' ' }, '>');
        break;
      }
      default: {
        const code = t.codePointAt(0);
        throw pyErr('ValueError', `unsupported format character '${t}' (0x${code.toString(16)}) at index ${i}`);
      }
    }
    out += s;
  }
  if (argidx < arglen && !dict) throw pyErr('TypeError', 'not all arguments converted during string formatting');
  return out;
}
/** PyObject_GetItem(mapping, key) for %(key)s */
function getitemFor(m, key) {
  if (m instanceof PyDict) {
    const v = m.get(key);
    if (v === undefined) {
      if (m.ctype && m.ctype.name === 'Counter') return 0n;   // Counter.__missing__
      throw pyErr('KeyError', key);
    }
    return v;
  }
  throw pyErr('TypeError', `${m instanceof PyList ? 'list' : 'range'} indices must be integers or slices, not str`);
}
/** ascii(): escape the non-ASCII characters of a repr like CPython (\xNN, \uNNNN, \UNNNNNNNN) */
function asciiEscape(s) {
  let out = '';
  for (const ch of s) {
    const c = ordOf(ch);
    if (c < 128) out += ch;
    else if (c < 0x100) out += '\\x' + c.toString(16).padStart(2, '0');
    else if (c < 0x10000) out += '\\u' + c.toString(16).padStart(4, '0');
    else out += '\\U' + c.toString(16).padStart(8, '0');
  }
  return out;
}

export { ratioToFloat, bitLen };
