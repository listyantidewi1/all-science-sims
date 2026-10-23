// minipy — bit-exact ports of the glibc 2.39 libm functions CPython calls on x86-64 Linux.
//
// glibc picks the "-fma" builds of these functions at run time (ifunc) on CPUs with FMA (every x86-64 CPU since
// ~2013); GCC contracts a*b+c into fused multiply-adds in those builds. The ports below follow GCC 13's output for
// sysdeps/ieee754/dbl-64/{e_pow,e_exp,e_log,e_log2,s_sin,s_tan,e_asin,s_atan,e_atan2,s_expm1,s_log1p}.c compiled
// with -O2 -mfma -mavx2 (fma() is emulated exactly), and e_exp2.c / branred.c without FMA (glibc has no FMA build of
// them). They were checked bit for bit against the system libm (python3's math module) on ~20 million arguments.
// The data tables are the raw glibc tables (libm-tables.js).
//
// Licensing: derived from the GNU C Library 2.39 (LGPL-2.1-or-later). exp/exp2/log/log2/pow are ARM's
// optimized-routines code (upstream also MIT OR Apache-2.0 WITH LLVM-exception); sin/cos/tan/asin/acos/atan/atan2
// come from the IBM Accurate Mathematical Library (LGPL-2.1-or-later); expm1/log1p are fdlibm (Sun's permissive notice).
// This file and libm-tables.js are LGPL-2.1-or-later; see THIRD-PARTY-NOTICES.md and licenses/LGPL-2.1.txt.
import { TABLES } from './libm-tables.js';

const F = new Float64Array(1), U = new Uint32Array(F.buffer);
const LE = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
const HI = LE ? 1 : 0, LO = LE ? 0 : 1;
const hiWord = (x) => { F[0] = x; return U[HI]; };
const loWord = (x) => { F[0] = x; return U[LO]; };
const fromWords = (h, l) => { U[HI] = h; U[LO] = l; return F[0]; };

// ------------------------------------------------------------------ tables (decoded on first use)
const cache = {};
function table(name) {
  let t = cache[name];
  if (t) return t;
  const s = TABLES[name];
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const val = new Uint8Array(128);
  for (let i = 0; i < 64; i++) val[A.charCodeAt(i)] = i;
  let n = (s.length / 4) * 3;
  if (s.endsWith('==')) n -= 2; else if (s.endsWith('=')) n -= 1;
  const bytes = new Uint8Array(n);
  for (let i = 0, j = 0; i < s.length; i += 4) {
    const v = (val[s.charCodeAt(i)] << 18) | (val[s.charCodeAt(i + 1)] << 12) | (val[s.charCodeAt(i + 2)] << 6) | val[s.charCodeAt(i + 3)];
    if (j < n) bytes[j++] = v >>> 16;
    if (j < n) bytes[j++] = (v >>> 8) & 255;
    if (j < n) bytes[j++] = v & 255;
  }
  if (!LE) for (let i = 0; i < n; i += 8) bytes.subarray(i, i + 8).reverse();
  t = { f: new Float64Array(bytes.buffer), u: new Uint32Array(bytes.buffer) };
  cache[name] = t;
  return t;
}

// ------------------------------------------------------------------ exact fused multiply-add
const SPLIT = 134217729;
/** round-to-odd of x + y */
function addOdd(x, y) {
  const s = x + y, bb = s - x, e = (x - (s - bb)) + (y - bb);
  if (e === 0) return s;
  F[0] = s;
  if (U[LO] & 1) return s;
  if ((e > 0) === (s > 0)) { if (++U[LO] === 0) U[HI]++; } else if (U[LO]-- === 0) U[HI]--;
  return F[0];
}
/**
 * fma(a, b, c) = a*b + c with a single rounding (Boldo & Melquiond, "Emulation of FMA and correctly rounded sums:
 * proved algorithms using rounding to odd"); exact BigInt fallback near the ends of the exponent range.
 */
export function fma(a, b, c) {
  const p = a * b;
  if (p === 0 || p - p !== 0 || c - c !== 0) return p + c;
  const ap = Math.abs(p);
  if (ap < 1e-280 || ap > 1e290 || Math.abs(a) > 1e290 || Math.abs(b) > 1e290) return fmaBig(a, b, c);
  let t = SPLIT * a; const ah = t - (t - a), al = a - ah;
  t = SPLIT * b; const bh = t - (t - b), bl = b - bh;
  const pl = ((ah * bh - p) + ah * bl + al * bh) + al * bl;
  const th = c + p, bb = th - c, tl = (c - (th - bb)) + (p - bb);
  if (th !== 0 && Math.abs(th) < 1e-280) return fmaBig(a, b, c);
  return th + addOdd(tl, pl);
}
function toRat(x) {
  F[0] = x;
  const h = U[HI], l = U[LO];
  let ex = (h >>> 20) & 0x7ff;
  let m = (BigInt(h & 0xfffff) << 32n) | BigInt(l);
  if (ex === 0) ex = 1; else m |= 1n << 52n;
  return [h >>> 31 ? -m : m, ex - 1075];
}
export function fmaBig(a, b, c) {
  if (c === 0) return a * b;
  const [ma, ea] = toRat(a), [mb, eb] = toRat(b), [mc, ec] = toRat(c);
  const ep = ea + eb, e = Math.min(ep, ec);
  const sum = ((ma * mb) << BigInt(ep - e)) + (mc << BigInt(ec - e));
  if (sum === 0n) return 0;
  let m = sum < 0n ? -sum : sum, ex = e;
  const len = m.toString(2).length;
  const shift = Math.max(len - 53, -1074 - ex);
  if (shift > 0) {
    const sh = BigInt(shift);
    let q = m >> sh;
    const rem = m - (q << sh), half = 1n << (sh - 1n);
    if (rem > half || (rem === half && (q & 1n))) q++;
    m = q; ex += shift;
  }
  let r = Number(m);
  while (ex > 900) { r *= 2 ** 900; ex -= 900; }
  while (ex < -900) { r *= 2 ** -900; ex += 900; }
  r *= 2 ** ex;
  return sum < 0n ? -r : r;
}
const fms = (a, b, c) => fma(a, b, -c);     // a*b - c
const fnma = (a, b, c) => fma(-a, b, c);    // c - a*b

// ------------------------------------------------------------------ exp / pow / log (ARM optimized-routines code)
// exp_data: invln2N, shift, negln2hiN, negln2loN, poly[4], exp2_shift, exp2_poly[5], invlog10_2N, neglog10_2hiN,
//           neglog10_2loN, exp10_poly[5], tab[2*128] (uint64)
const EXP_TAB = 22;
const OFLOW = Infinity;
/** scale*(1+tmp) near the ends of the exponent range (e_exp.c / e_pow.c specialcase, FMA build) */
function expSpecial(tmp, sh, sl, k) {
  if (k >= 0) {
    // k > 0: the exponent of scale might have overflowed by <= 460
    const scale = fromWords((sh - (1009 << 20)) >>> 0, sl);
    return 2 ** 1009 * fma(tmp, scale, scale);
  }
  const sh2 = (sh + (1022 << 20)) >>> 0;
  const scale = fromWords(sh2, sl);
  const st = tmp * scale;
  let y = scale + st;
  if (Math.abs(y) < 1.0) {
    const one = y < 0.0 ? -1.0 : 1.0;
    let lo = st + (scale - y);
    const hi = y + one;
    lo = lo + (y + (one - hi));
    y = (hi + lo) - one;
    if (y === 0) y = (sh2 >>> 31) ? -0 : 0;
  }
  return y * 2 ** -1022;
}
/** sign_bias ? -exp(x + xtail) : exp(x + xtail), the exp_inline of e_pow.c (FMA build) */
function expInline(x, xtail, signBias) {
  const E = table('exp').f, EU = table('exp').u;
  let abstop = (hiWord(x) >>> 20) & 0x7ff;
  if (((abstop - 0x3c9) >>> 0) >= 0x3f) {
    if (((abstop - 0x3c9) >>> 0) >= 0x80000000) { const one = 1.0 + x; return signBias ? -one : one; }
    if (abstop >= 0x409) return (hiWord(x) >>> 31) ? (signBias ? -0 : 0) : (signBias ? -OFLOW : OFLOW);
    abstop = 0;
  }
  let kd = fma(E[0], x, E[1]);
  F[0] = kd;
  const k = U[LO] | 0;
  kd -= E[1];
  let r = fma(kd, E[2], x);
  r = fma(kd, E[3], r);
  r = xtail + r;
  const idx = 2 * (k & 127);
  const tail = E[EXP_TAB + idx];
  const sl = EU[2 * (EXP_TAB + idx + 1) + LO];
  const sh = (EU[2 * (EXP_TAB + idx + 1) + HI] + ((k + (signBias ? 0x40000 : 0)) << 13)) >>> 0;
  const r2 = r * r;
  const a = r + tail;
  const b = fma(r2, fma(r, E[5], E[4]), a);
  const tmp = fma(r2 * r2, fma(r, E[7], E[6]), b);
  if (abstop === 0) return expSpecial(tmp, sh, sl, k);
  const scale = fromWords(sh, sl);
  return fma(tmp, scale, scale);
}

/** glibc exp (e_exp.c, FMA build) */
export function exp(x) {
  const E = table('exp').f, EU = table('exp').u;
  let abstop = (hiWord(x) >>> 20) & 0x7ff;
  if (((abstop - 0x3c9) >>> 0) >= 0x3f) {
    if (((abstop - 0x3c9) >>> 0) >= 0x80000000) return 1.0 + x;
    if (abstop >= 0x409) {
      if (x === -Infinity) return 0.0;
      if (abstop >= 0x7ff) return 1.0 + x;
      return (hiWord(x) >>> 31) ? 0 : OFLOW;
    }
    abstop = 0;
  }
  let kd = fma(E[0], x, E[1]);
  F[0] = kd;
  const k = U[LO] | 0;
  kd -= E[1];
  let r = fma(E[2], kd, x);
  r = fma(E[3], kd, r);
  const idx = 2 * (k & 127);
  const tail = E[EXP_TAB + idx];
  const sl = EU[2 * (EXP_TAB + idx + 1) + LO];
  const sh = (EU[2 * (EXP_TAB + idx + 1) + HI] + (k << 13)) >>> 0;
  const r2 = r * r;
  const a = r + tail;
  const b = fma(fma(E[5], r, E[4]), r2, a);
  const tmp = fma(r2 * r2, fma(E[7], r, E[6]), b);
  if (abstop === 0) return expSpecial(tmp, sh, sl, k);
  const scale = fromWords(sh, sl);
  return fma(tmp, scale, scale);
}

/** glibc exp2 (e_exp2.c; glibc has no FMA build of it, so plain arithmetic) */
export function exp2(x) {
  const E = table('exp').f, EU = table('exp').u;
  let abstop = (hiWord(x) >>> 20) & 0x7ff;
  if (((abstop - 0x3c9) >>> 0) >= 0x3f) {
    if (((abstop - 0x3c9) >>> 0) >= 0x80000000) return 1.0 + x;
    if (abstop >= 0x409) {
      if (x === -Infinity) return 0.0;
      if (abstop >= 0x7ff) return 1.0 + x;
      if (!(hiWord(x) >>> 31)) return OFLOW;
      if (x <= -1075.0) return 0;
    }
    if (Math.abs(x) > 928.0) abstop = 0;
  }
  let kd = x + E[8];
  F[0] = kd;
  const k = U[LO] | 0;
  kd -= E[8];
  const r = x - kd;
  const idx = 2 * (k & 127);
  const tail = E[EXP_TAB + idx];
  const sl = EU[2 * (EXP_TAB + idx + 1) + LO];
  const sh = (EU[2 * (EXP_TAB + idx + 1) + HI] + (k << 13)) >>> 0;
  const r2 = r * r;
  const tmp = tail + r * E[9] + r2 * (E[10] + r * E[11]) + r2 * r2 * (E[12] + r * E[13]);
  if (abstop === 0) {
    if (k >= 0) {
      const scale = fromWords((sh - (1 << 20)) >>> 0, sl);
      return 2 * (scale + scale * tmp);
    }
    const scale = fromWords((sh + (1022 << 20)) >>> 0, sl);
    let y = scale + scale * tmp;
    if (y < 1.0) {
      let lo = scale - y + scale * tmp;
      const hi = 1.0 + y;
      lo = 1.0 - hi + y + lo;
      y = (hi + lo) - 1.0;
      if (y === 0) y = 0;
    }
    return 2 ** -1022 * y;
  }
  const scale = fromWords(sh, sl);
  return scale + scale * tmp;
}

/** 0 if not an integer, 1 if odd, 2 if even (y finite, nonzero) */
function checkint(y) {
  if (!Number.isInteger(y)) return 0;
  return Math.abs(y) < 2 ** 53 && Math.abs(y) % 2 === 1 ? 1 : 2;
}

/** glibc pow (e_pow.c, FMA build). Python's float ** float, float ** int and math.pow all end here. */
export function pow(x, y) {
  let signBias = 0;
  F[0] = x;
  let ixh = U[HI], ixl = U[LO];
  F[0] = y;
  const iyh = U[HI];
  let topx = ixh >>> 20;
  const topy = iyh >>> 20;
  if (((topx - 1) >>> 0) >= 0x7fe || (((topy & 0x7ff) - 0x3be) >>> 0) >= 0x80) {
    if (y === 0 || y - y !== 0) {
      if (y === 0) return 1.0;
      if (x === 1) return 1.0;
      if (x !== x || y !== y) return x + y;
      if (Math.abs(x) === 1) return 1.0;
      if ((Math.abs(x) < 1) === (y > 0)) return 0.0;
      return y * y;
    }
    if (x === 0 || x - x !== 0) {
      let x2 = x * x;
      if ((ixh >>> 31) && checkint(y) === 1) x2 = -x2;
      return y < 0 ? 1 / x2 : x2;
    }
    // x and y are nonzero finite
    if (ixh >>> 31) {
      const yint = checkint(y);
      if (yint === 0) return NaN;
      if (yint === 1) signBias = 1;
      ixh &= 0x7fffffff;
      topx &= 0x7ff;
    }
    if ((((topy & 0x7ff) - 0x3be) >>> 0) >= 0x80) {
      if (ixh === 0x3ff00000 && ixl === 0) return 1.0;
      const gt1 = ixh > 0x3ff00000 || (ixh === 0x3ff00000 && ixl > 0);
      if ((topy & 0x7ff) < 0x3be) return gt1 ? 1.0 + y : 1.0 - y;
      return gt1 === (topy < 0x800) ? OFLOW : 0;
    }
    if (topx === 0) {
      // normalise a subnormal x so the exponent becomes negative
      F[0] = x * 2 ** 52;
      ixh = ((U[HI] & 0x7fffffff) - (52 << 20)) >>> 0;
      ixl = U[LO];
    }
  }
  // log_inline: hi + lo = log(x)
  const P = table('powLog').f;
  const tmph = (ixh - 0x3fe69555) | 0;
  const i = (tmph >>> 13) & 127;
  const k = tmph >> 20;
  const z = fromWords((ixh - (tmph & 0xfff00000)) >>> 0, ixl);
  const kd = k;
  const invc = P[9 + 4 * i], logc = P[11 + 4 * i], logctail = P[12 + 4 * i];
  const r = fma(z, invc, -1.0);
  const t1 = fma(kd, P[0], logc);
  const t2 = r + t1;
  const lo1 = fma(kd, P[1], logctail);
  const lo2 = r + (t1 - t2);
  const ar = r * P[2];
  const ar2 = r * ar;
  const ar3 = r * ar2;
  const hi = t2 + ar2;
  const lo3 = fms(r, ar, ar2);
  const lo4 = ar2 + (t2 - hi);
  const q = fma(ar2, fma(ar2, fma(r, P[8], P[7]), fma(r, P[6], P[5])), fma(r, P[4], P[3]));
  const lo = fma(ar3, q, lo4 + (lo3 + (lo1 + lo2)));
  const ly = hi + lo;
  const ltail = lo + (hi - ly);
  // exp(y * log(x))
  const ehi = y * ly;
  const elo = fma(y, ltail, fms(y, ly, ehi));
  return expInline(ehi, elo, signBias);
}

const LOG_LO = 1 - 1 / 16, LOG_HI = 1 + (1 + 9 / 256) / 16;                                 // 1 - 0x1p-4, 1 + 0x1.09p-4
const LOG2_LO = 1 - (1 + 0x5b51 / 65536) / 32, LOG2_HI = 1 + (1 + 0x6ab2 / 65536) / 32;     // 1 - 0x1.5b51p-5, 1 + 0x1.6ab2p-5
/** glibc log (e_log.c, FMA build) */
export function log(x) {
  const L = table('log').f;
  F[0] = x;
  let ixh = U[HI], ixl = U[LO];
  const top = ixh >>> 16;
  if (x >= LOG_LO && x < LOG_HI) {
    if (x === 1.0) return 0;
    const r = x - 1.0;
    const r2 = r * r, r3 = r * r2;
    const B = (j) => L[7 + j];
    const p1 = fma(B(2), r, B(1)), p2 = fma(B(3), r2, p1);
    const q1 = fma(B(5), r, B(4)), q2 = fma(B(6), r2, q1);
    const s1 = fma(B(8), r, B(7)), s2 = fma(B(9), r2, s1), s3 = fma(B(10), r3, s2);
    const P = fma(fma(s3, r3, q2), r3, p2);
    const w0 = fma(r, 134217728, r);
    const rhi = fnma(r, 134217728, w0);
    const rlo = r - rhi;
    const rr = rhi * rhi;
    const hi = fma(rr, B(0), r);
    let lo = fma(rr, B(0), r - hi);
    lo = fma(B(0) * rlo, r + rhi, lo);
    const y = fma(P, r3, lo);
    return hi + y;
  }
  if (((top - 0x0010) >>> 0) >= 0x7ff0 - 0x0010) {
    if (x === 0) return -Infinity;
    if (x === Infinity) return x;
    if ((top & 0x8000) || (top & 0x7ff0) === 0x7ff0) return NaN;
    F[0] = x * 2 ** 52;
    ixh = (U[HI] - (52 << 20)) >>> 0;
    ixl = U[LO];
  }
  const tmph = (ixh - 0x3fe60000) | 0;
  const i = (tmph >>> 13) & 127;
  const k = tmph >> 20;
  const z = fromWords((ixh - (tmph & 0xfff00000)) >>> 0, ixl);
  const invc = L[18 + 2 * i], logc = L[19 + 2 * i];
  const r = fma(invc, z, -1.0);
  const kd = k;
  const w = fma(L[0], kd, logc);
  const hi = r + w;
  const lo = fma(L[1], kd, (w - hi) + r);
  const r2 = r * r;
  const a = fma(L[2], r2, lo);
  const q = fma(fma(L[6], r, L[5]), r2, fma(L[4], r, L[3]));
  return fma(r * r2, q, a) + hi;
}

/** glibc log2 (e_log2.c, FMA build) */
export function log2(x) {
  const L = table('log2').f;
  F[0] = x;
  let ixh = U[HI], ixl = U[LO];
  const top = ixh >>> 16;
  if (x >= LOG2_LO && x < LOG2_HI) {
    if (x === 1.0) return 0;
    const r = x - 1.0;
    const hi = L[0] * r;
    const lo0 = fma(L[1], r, fms(L[0], r, hi));
    const r2 = r * r, r4 = r2 * r2;
    const B = (j) => L[8 + j];
    const b01 = fma(B(1), r, B(0));
    const y = fma(b01, r2, hi);
    let lo = fma(b01, r2, hi - y) + lo0;
    const c1 = fma(fma(B(5), r, B(4)), r2, fma(B(3), r, B(2)));
    const c2 = fma(fma(B(9), r, B(8)), r2, fma(B(7), r, B(6)));
    lo = fma(fma(c2, r4, c1), r4, lo);
    return y + lo;
  }
  if (((top - 0x0010) >>> 0) >= 0x7ff0 - 0x0010) {
    if (x === 0) return -Infinity;
    if (x === Infinity) return x;
    if ((top & 0x8000) || (top & 0x7ff0) === 0x7ff0) return NaN;
    F[0] = x * 2 ** 52;
    ixh = (U[HI] - (52 << 20)) >>> 0;
    ixl = U[LO];
  }
  const tmph = (ixh - 0x3fe60000) | 0;
  const i = (tmph >>> 14) & 63;
  const k = tmph >> 20;
  const z = fromWords((ixh - (tmph & 0xfff00000)) >>> 0, ixl);
  const invc = L[18 + 2 * i], logc = L[19 + 2 * i];
  const kd = k;
  const r = fma(invc, z, -1.0);
  const t1 = L[0] * r;
  const t2 = fma(L[1], r, fms(L[0], r, t1));
  const t3 = logc + kd;
  const hi = t1 + t3;
  const lo = ((t3 - hi) + t1) + t2;
  const r2 = r * r, r4 = r2 * r2;
  const A = (j) => L[2 + j];
  const p = fma(fma(A(5), r, A(4)), r4, fma(fma(A(3), r, A(2)), r2, fma(A(1), r, A(0))));
  return fma(r2, p, lo) + hi;
}

// ------------------------------------------------------------------ sin / cos (s_sin.c, FMA build)
const SN3 = -1.666666666666648810579687278732308186590671539306640625e-1, SN5 = 8.33333214285722316538862486368088866584002971649169921875e-3;
const CS2 = 5.0e-1, CS4 = -4.1666666666666442309097106999615789391100406646728515625e-2, CS6 = 1.38888874007937605271900682879504529410041868686676025391e-3;
const S1 = -1.666666666666666574148081281236954964697360992431640625e-1, S2 = 8.3333333333323288127925110302385292015969753265380859375e-3;
const S3 = -1.98412698344146423354295016849846433615311980247497558594e-4, S4 = 2.75572980686077103221827584722536386152569320984184741974e-6;
const S5 = -2.50220148483183976603384807016819402214480305701727047563e-8;
const BIG = 52776558133248, HP0 = 1.5707963267948965579989817342720925807952880859375, HP1 = 6.12323399573676603586882014729198302312846062338790031898e-17;
const HPINV = 6.3661977236758138243288840385503135621547698974609375e-1, TOINT = 6755399441055744;
const MP1 = 1.5707963407039642333984375, MP2 = -1.390906756437715330321225337684154510498046875e-8;
const PP3 = -4.97899623147990989791272092856999620380520354956388473511e-17, PP4 = -1.90348896201932661116335227284100374573176274961831123692e-25;

function doCos(x, dx) {
  if (x < 0) dx = -dx;
  const ax = Math.abs(x), u = ax + BIG;
  x = (ax - (u - BIG)) + dx;
  const xx = x * x;
  const s = fma(x * xx, fma(xx, SN5, SN3), x);
  const c = xx * fma(xx, fma(xx, CS6, CS4), CS2);
  const k = loWord(u) << 2;
  const T = table('sincos').f;
  const sn = T[k], ssn = T[k + 1], cs = T[k + 2], ccs = T[k + 3];
  const cor = fnma(s, sn, fnma(c, cs, fnma(s, ssn, ccs)));
  return cs + cor;
}
function doSin(x, dx) {
  const xold = x;
  if (Math.abs(x) < 0.126) {
    const xx = x * x;
    const p = fma(xx, fma(xx, fma(xx, fma(xx, S5, S4), S3), S2), S1);
    const t = fma(xx, fms(p, x, 0.5 * dx), dx);
    return x + t;
  }
  if (x <= 0) dx = -dx;
  const ax = Math.abs(x), u = ax + BIG;
  x = ax - (u - BIG);
  const xx = x * x;
  const s = x + fma(x * xx, fma(xx, SN5, SN3), dx);
  const c = fma(x, dx, xx * fma(xx, fma(xx, CS6, CS4), CS2));
  const k = loWord(u) << 2;
  const T = table('sincos').f;
  const sn = T[k], ssn = T[k + 1], cs = T[k + 2], ccs = T[k + 3];
  const cor = fma(s, cs, fnma(c, sn, fma(s, ccs, ssn)));
  const r = sn + cor;
  return (xold < 0 || Object.is(xold, -0)) ? -Math.abs(r) : Math.abs(r);
}
/** reduce |x| < 105414350 modulo pi/2: [n, a, da] */
function reduceSinCos(x) {
  const t = fma(x, HPINV, TOINT);
  const xn = t - TOINT;
  const y = fnma(xn, MP2, fnma(xn, MP1, x));
  const n = loWord(t) & 3;
  const t2 = fnma(xn, PP3, y);
  let db = fnma(xn, PP3, y - t2);
  const b = fnma(xn, PP4, t2);
  db = db + fnma(xn, PP4, t2 - b);
  return [n, b, db];
}
function doSinCos(a, da, n) {
  const r = (n & 1) ? doCos(a, da) : doSin(a, da);
  return (n & 2) ? -r : r;
}
const TOVERP = [10680707, 7228996, 1387004, 2578385, 16069853, 12639074, 9804092, 4427841, 16666979, 11263675, 12935607, 2387514,
  4345298, 14681673, 3074569, 13734428, 16653803, 1880361, 10960616, 8533493, 3062596, 8710556, 7349940, 6258241, 3772886, 3769171,
  3798172, 8675211, 12450088, 3874808, 9961438, 366607, 15675153, 9132554, 7151469, 3571407, 2607881, 12013382, 4155038, 6285869,
  7677882, 13102053, 15825725, 473591, 9065106, 15363067, 6271263, 9264392, 5636912, 4652155, 7056368, 13614112, 10155062, 1944035,
  9527646, 15080200, 6658437, 6231200, 6832269, 16767104, 5075751, 3212806, 1398474, 7579849, 6349435, 12618859, 4703257, 12806093,
  14477321, 2786137, 12875403, 9837734, 14528324, 13719321, 343717];
const BR_BIG = 6755399441055744, BR_BIG1 = 27021597764222976, BR_MP1 = 1.5707963407039642, BR_MP2 = -1.3909067675399456e-08;
/** branred.c (no FMA build): x = n*pi/2 + (a + aa) for huge x; returns [n mod 4, a, aa] */
function branred(x) {
  const r = new Array(6);
  x *= 2 ** -600;
  let t = x * SPLIT;
  const x1 = t - (t - x), x2 = x - x1;
  const part = (xp) => {
    let sum = 0;
    let k = (hiWord(xp) >>> 20) & 2047;
    k = Math.trunc((k - 450) / 24);
    if (k < 0) k = 0;
    let gor = fromWords((hiWord(2 ** 576) - ((k * 24) << 20)) >>> 0, 0);
    for (let i = 0; i < 6; i++) { r[i] = xp * TOVERP[k + i] * gor; gor *= 2 ** -24; }
    for (let i = 0; i < 3; i++) { const s = (r[i] + BR_BIG) - BR_BIG; sum += s; r[i] -= s; }
    let tt = 0;
    for (let i = 0; i < 6; i++) tt += r[5 - i];
    let bb = (((((r[0] - tt) + r[1]) + r[2]) + r[3]) + r[4]) + r[5];
    let s = (tt + BR_BIG) - BR_BIG;
    sum += s;
    tt -= s;
    const b = tt + bb;
    bb = (tt - b) + bb;
    s = (sum + BR_BIG1) - BR_BIG1;
    sum -= s;
    return [b, bb, sum];
  };
  const [b1, bb1, sum1] = part(x1);
  const [b2, bb2, sum2] = part(x2);
  let sum = sum1 + sum2;
  let b = b1 + b2;
  let bb = Math.abs(b1) > Math.abs(b2) ? (b1 - b) + b2 : (b2 - b) + b1;
  if (b > 0.5) { b -= 1.0; sum += 1.0; } else if (b < -0.5) { b += 1.0; sum -= 1.0; }
  let s = b + (bb + bb1 + bb2);
  t = ((b - s) + bb) + (bb1 + bb2);
  b = s * SPLIT;
  const t1 = b - (b - s), t2 = s - t1;
  b = s * HP0;
  bb = (((t1 * BR_MP1 - b) + t1 * BR_MP2) + t2 * BR_MP1) + (t2 * BR_MP2 + s * HP1 + t * HP0);
  s = b + bb;
  t = (b - s) + bb;
  return [Math.trunc(sum) & 3, s, t];
}
/** glibc sin */
export function sin(x) {
  const k = hiWord(x) & 0x7fffffff;
  if (k < 0x3e500000) return x;
  if (k < 0x3feb6000) return doSin(x, 0);
  if (k < 0x400368fd) {
    const t = HP0 - Math.abs(x);
    const r = doCos(t, HP1);
    return x < 0 ? -Math.abs(r) : Math.abs(r);
  }
  if (k < 0x419921fb) { const [n, a, da] = reduceSinCos(x); return doSinCos(a, da, n); }
  if (k < 0x7ff00000) { const [n, a, da] = branred(x); return doSinCos(a, da, n); }
  return x / x;
}
/** glibc cos */
export function cos(x) {
  const k = hiWord(x) & 0x7fffffff;
  if (k < 0x3e400000) return 1.0;
  if (k < 0x3feb6000) return doCos(x, 0);
  if (k < 0x400368fd) {
    const y = HP0 - Math.abs(x);
    const a = y + HP1;
    const da = (y - a) + HP1;
    return doSin(a, da);
  }
  if (k < 0x419921fb) { const [n, a, da] = reduceSinCos(x); return doSinCos(a, da, n + 1); }
  if (k < 0x7ff00000) { const [n, a, da] = branred(x); return doSinCos(a, da, n + 1); }
  return x / x;
}

// ------------------------------------------------------------------ tan (s_tan.c, FMA build)
const TD3 = 3.33333333333333314829616256247390992939472198486328125e-1, TD5 = 1.33333333333267300968572044439497403800487518310546875e-1;
const TD7 = 5.3968254110954329283433850150686339475214481353759765625e-2, TD9 = 2.1869380598167252605090737915816134773194789886474609375e-2;
const TD11 = 8.8965463495349235423237388431516592390835285186767578125e-3;
const TE0 = 3.33333333333225401151622691031661815941333770751953125e-1, TE1 = 1.333335492066991256887575900691444985568523406982421875e-1;
const TG1 = 1.2589993048095493577420711517333984375e-8, TG2 = 6.07999861240386962890625e-2, TG3 = 7.8699970245361328125e-1;
const TMP3 = -4.97899625051479936836749653361622010187153937661209968102e-17;
function tanPoly(a2) { return fma(a2, fma(a2, fma(a2, fma(a2, TD11, TD9), TD7), TD5), TD3); }
/** -cot(a + t2) for small a (DIV2(1, 0, b, db) of dla.h) */
function negCot(a, t2) {
  const b = a + t2;
  const db = Math.abs(a) > Math.abs(t2) ? (a - b) + t2 : (t2 - b) + a;
  const c1 = 1.0 / b;
  const u = c1 * b;
  const uu = fms(c1, b, u);
  const cc = fnma(db, c1, (((1.0 - u) - uu) + 0.0)) / b;
  const c = c1 + cc;
  const dc = (c1 - c) + cc;
  return -(c + dc);
}
/** the table part of (VII)/(IX)/(XI) */
function tanTable(ya, yya, sy, n) {
  const X = table('tanXfg').f;
  const i = Math.trunc(fma(ya, 256, -15.5));
  const z = yya + (ya - X[4 * i]);
  const z2 = z * z;
  const pz = fma(z * z2, fma(z2, TE1, TE0), z);
  const fi = X[4 * i + 1], gi = X[4 * i + 2];
  const num = pz * (fi + gi);
  if (n) return -sy * (gi - num / (pz + fi));
  return sy * (fi + num / (gi - pz));
}
function tanReduced(a, da, n) {
  let ya, yya, sy;
  if (a < 0.0) { ya = -a; yya = -da; sy = -1; } else { ya = a; yya = da; sy = 1; }
  if (ya <= TG2) {
    const a2 = a * a;
    const t2 = fma(a * a2, tanPoly(a2), da);
    if (n) return negCot(a, t2);
    return a + t2;
  }
  return tanTable(ya, yya, sy, n);
}
/** glibc tan */
export function tan(x) {
  const ux = hiWord(x);
  if ((ux & 0x7ff00000) === 0x7ff00000) return x - x;
  const w = x < 0.0 ? -x : x;
  if (w <= TG1) return x;
  if (w <= TG2) {
    const x2 = x * x;
    return fma(x * x2, tanPoly(x2), x);
  }
  if (w <= TG3) {
    const X = table('tanXfg').f;
    const i = Math.trunc(fma(w, 256, -15.5));
    const z = w - X[4 * i];
    const z2 = z * z;
    const s = x < 0.0 ? -1 : 1;
    const pz = fma(z * z2, fma(z2, TE1, TE0), z);
    const fi = X[4 * i + 1], gi = X[4 * i + 2];
    const t2 = ((fi + gi) * pz) / (gi - pz);
    return s * (fi + t2);
  }
  if (w <= 25) {
    const t = fma(x, HPINV, TOINT);
    const xn = t - TOINT;
    const t1 = fnma(xn, MP2, fnma(xn, MP1, x));
    const n = loWord(t) & 1;
    const a = fnma(xn, TMP3, t1);
    const da = fnma(xn, TMP3, t1 - a);
    return tanReduced(a, da, n);
  }
  let a, da, n;
  if (w <= 1e8) {
    const t = fma(x, HPINV, TOINT);
    const xn = t - TOINT;
    const t1 = fnma(xn, MP2, fnma(xn, MP1, x));
    n = loWord(t) & 1;
    const tt = fnma(xn, PP3, t1);
    const d1 = fnma(xn, PP3, t1 - tt);
    const a0 = fnma(xn, PP4, tt);
    const d2 = d1 + fnma(xn, PP4, tt - a0);
    a = a0 + d2;
    da = Math.abs(a0) > Math.abs(d2) ? d2 + (a0 - a) : a0 + (d2 - a);
  } else {
    const [nn, a0, d0] = branred(x);
    n = nn & 1;
    a = a0 + d0;
    da = Math.abs(a0) > Math.abs(d0) ? d0 + (a0 - a) : a0 + (d0 - a);
  }
  return tanReduced(a, da, n);
}

// ------------------------------------------------------------------ asin / acos (e_asin.c, FMA build)
const AF1 = 1.666666666666641039018514902636525221168994903564453125e-1, AF2 = 7.500000000261226873465858488998492248356342315673828125e-2;
const AF3 = 4.46428561421059744152017856322345323860645294189453125e-2, AF4 = 3.03821268582119309586975219872329034842550754547119140625e-2;
const AF5 = 2.23551211026525621650140607243884005583822727203369140625e-2, AF6 = 1.8138290340456504623478650728429784066975116729736328125e-2;
const RT0 = 9.9999999985999077356524367132806219160556793212890625e-1, RT1 = 4.999999994959554161511050551780499517917633056640625e-1;
const RT2 = 3.7501750086734519928910458475002087652683258056640625e-1, RT3 = 3.12523626554518652032044201405369676649570465087890625e-1;
/** (((((f6*x2+f5)*x2+f4)*x2+f3)*x2+f2)*x2+f1) */
function asinPoly(x2) { return fma(fma(fma(fma(fma(x2, AF6, AF5), x2, AF4), x2, AF3), x2, AF2), x2, AF1); }
/** the asncs table branches: [n, number of polynomial coefficients] for 0.125 <= |x| < 0.96875 */
function asinIndex(k) {
  if (k < 0x3fe00000) return [k < 0x3fd00000 ? ((k >> 15) & 31) * 11 : ((k >> 14) & 63) * 11 + 352, 5];
  if (k < 0x3fe80000) return [1056 + ((k >> 11) & 508) * 3, 6];
  if (k < 0x3fed8000) return [992 + ((k >> 13) & 127) * 13, 7];
  if (k < 0x3fee8000) return [884 + ((k >> 13) & 127) * 14, 8];
  return [768 + ((k >> 13) & 127) * 15, 9];
}
/** t = asncs[n+1]*xx + (xx*xx*poly + asncs[n+m+2]) for the table branches; returns [t, asncs[n+m+3]] */
function asinTable(x, m, k) {
  const A = table('asncs').f;
  const [n, deg] = asinIndex(k);
  const xx = (m > 0 ? x : -x) - A[n];
  let p = A[n + deg + 1];
  for (let j = n + deg; j >= n + 2; j--) p = fma(p, xx, A[j]);
  p = fma(xx * xx, p, A[n + deg + 2]);
  return [fma(A[n + 1], xx, p), A[n + deg + 3]];
}
/** near |x| = 1: [y, cc, p, z] with sqrt((1-|x|)/2) = y + cc */
function asinNearOne(x, m, acos) {
  const z = (m > 0 ? 1.0 - x : x + 1.0) * 0.5;
  const kz = hiWord(z);
  const t0 = table('inroot').f[(kz >> 14) & 127] * table('powtwo').f[511 - (kz >> 21)];
  const r = fnma(t0 * t0, z, 1.0);
  const t = fma(fma(fma(r, RT3, RT2), r, RT1), r, RT0) * t0;
  const c = z * t;
  const h = fnma(t * 0.5, c, 1.5);
  const y = acos ? fnma(c, 134217728, fma(c, 134217728, c)) : (c + 16777216) - 16777216;
  const cc = fnma(y, y, z) / fma(h, c, y);
  const p = asinPoly(z) * z;
  return [y, cc, p];
}
/** glibc asin (Python's math.asin) */
export function asin(x) {
  const m = hiWord(x) | 0;
  const k = m & 0x7fffffff;
  if (k < 0x3e500000) return x;
  if (k < 0x3fc00000) {
    const x2 = x * x;
    return fma(asinPoly(x2), x * x2, x);
  }
  if (k < 0x3fef0000) {
    const [t, c] = asinTable(x, m, k);
    const res = c + t;
    return m > 0 ? res : -res;
  }
  if (k < 0x3ff00000) {
    const [y, cc, p] = asinNearOne(x, m, false);
    const cor = fnma((y + cc) * 2.0, p, fnma(cc, 2.0, HP1));
    const res = cor + fnma(y, 2.0, HP0);
    return m > 0 ? res : -res;
  }
  if (k === 0x3ff00000 && loWord(x) === 0) return m > 0 ? HP0 : -HP0;
  return (x - x) / (x - x);
}
/** glibc acos (Python's math.acos) */
export function acos(x) {
  const m = hiWord(x) | 0;
  const k = m & 0x7fffffff;
  if (k < 0x3c880000) return HP0;
  if (k < 0x3fc00000) {
    const x2 = x * x;
    const r = HP0 - x;
    const cor = fnma(asinPoly(x2), x * x2, ((HP0 - r) - x) + HP1);
    return r + cor;
  }
  if (k < 0x3fef0000) {
    const [t, c] = asinTable(x, m, k);
    const y = m > 0 ? HP0 - c : c + HP0;
    const tt = m > 0 ? HP1 - t : t + HP1;
    return tt + y;
  }
  if (k < 0x3ff00000) {
    const [y, cc, p] = asinNearOne(x, m, true);
    const pc = p * (y + cc);
    if (m < 0) return (((HP1 - cc) - pc) + (HP0 - y)) * 2.0;
    return (y + (cc + pc)) * 2.0;
  }
  if (k === 0x3ff00000 && loWord(x) === 0) return m > 0 ? 0 : 2.0 * HP0;
  return (x - x) / (x - x);
}

// ------------------------------------------------------------------ atan / atan2 (s_atan.c, e_atan2.c, FMA builds)
const AD3 = -3.33333333333333314829616256247390992939472198486328125e-1, AD5 = 1.999999999999885480495009915102855302393436431884765625e-1;
const AD7 = -1.428571428395316311732443637083633802831172943115234375e-1, AD9 = 1.1111109821886426540782366600979003123939037322998046875e-1;
const AD11 = -9.090424391727987274425260011412319727241992950439453125e-2, AD13 = 7.60183658438073617258368130933376960456371307373046875e-2;
const ATAN_A = 1.29047776908919331617653369903564453125e-8, ATAN_E = 5.805361265115136e+15, TWO52 = 4503599627370496;
const OPI = 3.141592653589793115997963468544185161590576171875, OPI1 = 1.2246467991473532071737640294583966046256921246775800638e-16;
/** d3 + v*(d5 + v*(d7 + v*(d9 + v*(d11 + v*d13)))) */
function atanPoly(v) { return fma(fma(fma(fma(fma(v, AD13, AD11), v, AD9), v, AD7), v, AD5), v, AD3); }
const copysign = (z, y) => ((y < 0 || Object.is(y, -0)) ? -Math.abs(z) : Math.abs(z));
/** cij row index for 1/16 <= u < 1: (int)((2^52 + 256*u) - 2^52) - 16 */
const cijRow = (u) => 7 * ((fma(u, 256, TWO52) - TWO52) - 16);
/** c2 + v*(c3 + v*(c4 + v*(c5 + v*c6))) of a cij row */
function cijPoly(C, i, v) { return fma(fma(fma(fma(C[i + 6], v, C[i + 5]), v, C[i + 4]), v, C[i + 3]), v, C[i + 2]); }
/** glibc atan (Python's math.atan) */
export function atan(x) {
  if (x !== x) return x + x;
  const u = x < 0 ? -x : x;
  if (u < 0.0625) {
    if (u < ATAN_A) return x;
    const v = x * x;
    return fma(x * v, atanPoly(v), x);
  }
  if (u < 1) {
    const C = table('cij').f, i = cijRow(u);
    const z = u - C[i];
    const yy = fma(z, fma(z, fma(z, fma(C[i + 6], z, C[i + 5]), C[i + 4]), C[i + 3]), C[i + 2]);
    return copysign(fma(z, yy, C[i + 1]), x);
  }
  if (u < 16) {
    const C = table('cij').f;
    const w = 1.0 / u;
    const t1 = w * u, t2 = fms(w, u, t1);
    const i = cijRow(w);
    const z = fma((1.0 - t1) - t2, w, w - C[i]);
    const yy = fnma(z, fma(z, fma(z, fma(z, fma(C[i + 6], z, C[i + 5]), C[i + 4]), C[i + 3]), C[i + 2]), HP1);
    return copysign(yy + (HP0 - C[i + 1]), x);
  }
  if (u < ATAN_E) {
    const w = 1.0 / u, v = w * w;
    const t1 = w * u, t2 = fms(w, u, t1);
    const p = atanPoly(v);
    const t3 = HP0 - w;
    const cor = (HP0 - t3) - w;
    const yy = fnma(w * v, p, fnma((1.0 - t1) - t2, w, cor + HP1));
    return copysign(t3 + yy, x);
  }
  return x > 0 ? HP0 : -HP0;
}
/** glibc atan2 (Python's math.atan2) */
export function atan2(y, x) {
  if (x !== x) return x + y;
  if (y !== y) return y + y;
  const negx = x < 0 || Object.is(x, -0);
  if (y === 0) return Object.is(y, -0) ? (negx ? -OPI : -0.0) : (negx ? OPI : 0);
  if (x === 0) return y > 0 ? HP0 : -HP0;
  if (x === Infinity) return y === Infinity ? 0.7853981633974483 : y === -Infinity ? -0.7853981633974483 : (y > 0 ? 0 : -0.0);
  if (x === -Infinity) return y === Infinity ? 2.356194490192345 : y === -Infinity ? -2.356194490192345 : (y > 0 ? OPI : -OPI);
  if (y === Infinity) return HP0;
  if (y === -Infinity) return -HP0;
  let ax = x < 0 ? -x : x, ay = y < 0 ? -y : y;
  const de = (hiWord(y) & 0x7ff00000) - (hiWord(x) & 0x7ff00000);
  if (de >= 59768832) return y > 0 ? HP0 : -HP0;
  if (de <= -59768832) {
    if (x > 0) return copysign(ay / ax, y);
    return y > 0 ? OPI : -OPI;
  }
  const T500 = 3.27339060789614187001318969682759915221664204604306478948e+150, TM500 = 3.05493636349960468205197939321361769978940274057232666389e-151;
  if (ax < TM500 || ay < TM500) { ax *= T500; ay *= T500; }
  if (ax > T500 || ay > T500) { ax *= TM500; ay *= TM500; }
  let u, du;
  if (ay < ax) {
    u = ay / ax;
    const v = u * ax, vv = fms(u, ax, v);
    du = ((ay - v) - vv) / ax;
  } else {
    u = ax / ay;
    const v = u * ay, vv = fms(u, ay, v);
    du = ((ax - v) - vv) / ay;
  }
  const C = u >= 0.0625 ? table('cij').f : null;
  if (x > 0) {
    if (ay < ax) {
      if (u < 0.0625) {
        const v = u * u;
        return copysign(u + fma(u * v, atanPoly(v), du), y);
      }
      const i = cijRow(u);
      const t3 = u - C[i];
      const v = du + t3;
      const dv = Math.abs(t3) > Math.abs(du) ? (t3 - v) + du : (du - v) + t3;
      const t2 = C[i + 2];
      const p = fma(fma(fma(C[i + 6], v, C[i + 5]), v, C[i + 4]), v, C[i + 3]);
      const zz = fma(v, t2, fma(dv, t2, (v * v) * p));
      return copysign(C[i + 1] + zz, y);
    }
    if (u < 0.0625) {
      const v = u * u;
      const zz = (u * v) * atanPoly(v);
      const t2 = HP0 - u;
      const cor = Math.abs(u) < HP0 ? (HP0 - t2) - u : HP0 - (u + t2);
      return copysign(t2 + (((cor + HP1) - du) - zz), y);
    }
    const i = cijRow(u);
    const v = (u - C[i]) + du;
    return copysign(fnma(cijPoly(C, i, v), v, HP1) + (HP0 - C[i + 1]), y);
  }
  if (ax < ay) {
    if (u < 0.0625) {
      const v = u * u;
      const zz = (u * v) * atanPoly(v);
      const t2 = u + HP0;
      const cor = Math.abs(u) < HP0 ? (HP0 - t2) + u : (u - t2) + HP0;
      return copysign(t2 + (((cor + HP1) + du) + zz), y);
    }
    const i = cijRow(u);
    const v = (u - C[i]) + du;
    return copysign(fma(cijPoly(C, i, v), v, HP1) + (C[i + 1] + HP0), y);
  }
  if (u < 0.0625) {
    const v = u * u;
    const zz = (u * v) * atanPoly(v);
    const t2 = OPI - u;
    const cor = Math.abs(u) < OPI ? (OPI - t2) - u : OPI - (u + t2);
    return copysign(t2 + (((cor + OPI1) - du) - zz), y);
  }
  const i = cijRow(u);
  const v = (u - C[i]) + du;
  return copysign(fnma(cijPoly(C, i, v), v, OPI1) + (OPI - C[i + 1]), y);
}

// ------------------------------------------------------------------ expm1 / log1p (s_expm1.c, s_log1p.c, FMA builds)
const LN2_HI = 6.9314718036912381649017333984375e-1, LN2_LO = 1.90821492927058770002199338712968283704451977200733381324e-10;
const INVLN2 = 1.442695040888963387004650940070860087871551513671875;
const Q1 = -3.33333333333331316428171930965618230402469635009765625e-2, Q2 = 1.58730158725481460164907776544396256213076412677764892578e-3;
const Q3 = -7.93650757867487942473147533029020905814832076430320739746e-5, Q4 = 4.00821782732936239551516446888435041273623937740921974182e-6;
const Q5 = -2.01099218183624371326080290146853801758197732851840555668e-7;
/** add k to the exponent of y (SET_HIGH_WORD (y, high + (k << 20))) */
function addExp(y, k) { F[0] = y; U[HI] = (U[HI] + (k << 20)) >>> 0; return F[0]; }
/** glibc expm1 (Python's math.expm1; also used by sinh/cosh/tanh) */
export function expm1(x) {
  const hx0 = hiWord(x);
  const neg = (hx0 >>> 31) !== 0;
  const hx = hx0 & 0x7fffffff;
  if (hx >= 0x4043687a) {
    if (hx >= 0x40862e42) {
      if (hx >= 0x7ff00000) {
        if (x !== x) return x + x;
        return neg ? -1.0 : x;
      }
      if (x > 7.097827128933839730962063185870647430419921875e+2) return Infinity;
    }
    if (neg) return 1e-300 - 1.0;
  }
  let k, c = 0;
  if (hx > 0x3fd62e42) {
    let hi, lo;
    if (hx < 0x3ff0a2b2) {
      if (!neg) { hi = x - LN2_HI; lo = LN2_LO; k = 1; } else { hi = x + LN2_HI; lo = -LN2_LO; k = -1; }
    } else {
      k = Math.trunc((neg ? -0.5 : 0.5) + x * INVLN2);
      const t = k;
      hi = fnma(t, LN2_HI, x);
      lo = t * LN2_LO;
    }
    x = hi - lo;
    c = (hi - x) - lo;
  } else if (hx < 0x3c900000) {
    return x;
  } else k = 0;
  const hfx = x * 0.5, hxs = x * hfx;
  const h2 = hxs * hxs, h4 = h2 * h2;
  const r1 = fma(h4, fma(hxs, Q5, Q4), fma(h2, fma(hxs, Q3, Q2), fma(hxs, Q1, 1.0)));
  const t = fnma(hfx, r1, 3.0);
  let e = ((r1 - t) / fnma(x, t, 6.0)) * hxs;
  if (k === 0) return x - fms(x, e, hxs);
  e = fms(e - c, x, c);
  e -= hxs;
  if (k === -1) return fma(x - e, 0.5, -0.5);
  if (k === 1) {
    if (x < -0.25) return (e - (x + 0.5)) * -2.0;
    return fma(x - e, 2.0, 1.0);
  }
  if (k <= -2 || k > 56) return addExp(1.0 - (e - x), k) - 1.0;
  if (k < 20) {
    const t1 = fromWords(0x3ff00000 - (0x200000 >> k), 0);
    return addExp(t1 - (e - x), k);
  }
  const t2 = fromWords((0x3ff - k) << 20, 0);
  return addExp((x - (e + t2)) + 1.0, k);
}
const LP1 = 6.6666666666667351304198518846533261239528656005859375e-1, LP2 = 3.999999999940941908249669722863472998142242431640625e-1;
const LP3 = 2.85714287436623914917532829349511303007602691650390625e-1, LP4 = 2.222219843214978396428449514132807962596416473388671875e-1;
const LP5 = 1.81835721616180501225557009092881344258785247802734375e-1, LP6 = 1.531383769920937332198462854648823849856853485107421875e-1;
const LP7 = 1.4798198605116585913066273860749788582324981689453125e-1;
/** glibc log1p (Python's math.log1p) */
export function log1p(x) {
  const hx = hiWord(x) | 0;
  const ax = hx & 0x7fffffff;
  let k = 1, f, c = 0, hu = 0, hfsq;
  if (hx < 0x3fda827a) {
    if (ax >= 0x3ff00000) {
      if (x === -1.0) return -Infinity;
      return NaN;
    }
    if (ax < 0x3e200000) {
      if (ax < 0x3c900000) return x;
      return fnma(x * x, 0.5, x);
    }
    if (hx > 0 || hx <= (0xbfd2bec3 | 0)) { k = 0; f = x; hu = 1; hfsq = x * (x * 0.5); }
  } else if (hx >= 0x7ff00000) return x + x;
  if (k !== 0) {
    let u;
    if (hx < 0x43400000) {
      u = 1.0 + x;
      hu = hiWord(u) | 0;
      k = (hu >> 20) - 1023;
      c = (k > 0 ? 1.0 - (u - x) : x - (u - 1.0)) / u;
    } else {
      u = x;
      hu = hx;
      k = (hu >> 20) - 1023;
      c = 0;
    }
    hu &= 0x000fffff;
    if (hu < 0x6a09e) {
      u = fromWords(hu | 0x3ff00000, loWord(u));
    } else {
      k += 1;
      u = fromWords(hu | 0x3fe00000, loWord(u));
      hu = (0x00100000 - hu) >> 2;
    }
    f = u - 1.0;
    hfsq = (f * 0.5) * f;
    if (hu === 0) {
      if (f === 0) {
        if (k === 0) return 0;
        return fma(k, LN2_HI, fma(k, LN2_LO, c));
      }
      const R = fnma(f, 0.66666666666666666, 1.0) * hfsq;
      if (k === 0) return f - R;
      return fms(k, LN2_HI, (R - fma(k, LN2_LO, c)) - f);
    }
  }
  const s = f / (2.0 + f);
  const z = s * s, z2 = z * z, z4 = z2 * z2, z6 = z2 * z4;
  const R = fma(z6, fma(z, LP7, LP6), fma(z4, fma(z, LP5, LP4), fma(z, LP1, z2 * fma(z, LP3, LP2))));
  const sr = s * (R + hfsq);
  if (k === 0) return f - (hfsq - sr);
  return fms(k, LN2_HI, (hfsq - (fma(k, LN2_LO, c) + sr)) - f);
}
