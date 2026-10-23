// minipy — libm functions for the math module. CPython calls the platform libm; on x86-64 Linux that is glibc, so
// exp/log/log2/exp2/expm1/log1p/pow/sin/cos/tan/asin/acos/atan/atan2 are bit-exact ports of glibc 2.39 (libm.js); log10,
// sinh/cosh/tanh, cbrt, erf/erfc (ports of glibc's algorithms) and gamma/lgamma (CPython's own code) call them.
// Licensing: the glibc-derived functions are LGPL-2.1-or-later, gamma/lgamma PSF-2.0; see THIRD-PARTY-NOTICES.md.
import { exp, log, log2, exp2, pow, sin, cos, tan, asin, acos, atan, atan2, expm1, log1p } from './libm.js';

export { exp, log, log2, exp2, sin, cos, tan, asin, acos, atan, atan2, expm1, log1p };
/** x ** y for finite x > 0 (glibc pow) */
export const powPos = (x, y) => pow(x, y);

function ldexp(x, e) {
  while (e > 1000) { x *= 2 ** 1000; e -= 1000; }
  while (e < -1000) { x *= 2 ** -1000; e += 1000; }
  return x * 2 ** e;
}
const F64 = new Float64Array(1), U32 = new Uint32Array(F64.buffer);
const LE = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
const HI = LE ? 1 : 0;
// glibc's __ieee754_log10 (e_log10.c, fdlibm algorithm on top of glibc's log; no FMA build)
const IVLN10 = 4.34294481903251816668e-01, LOG10_2HI = 3.01029995663611771306e-01, LOG10_2LO = 3.69423907715893078616e-13;
export function log10(x) {
  if (!(x > 0) || !isFinite(x)) return Math.log10(x);
  let k = 0;
  if (x < 2.2250738585072014e-308) { k -= 54; x *= 18014398509481984; }
  F64[0] = x;
  let hx = U32[HI] | 0;
  k += (hx >> 20) - 1023;
  const i = k < 0 ? 1 : 0;
  hx = (hx & 0x000fffff) | ((0x3ff - i) << 20);
  U32[HI] = hx;
  const xm = F64[0];
  const y = k + i;
  const z = y * LOG10_2LO + IVLN10 * log(xm);
  return z + y * LOG10_2HI;
}
// ------------------------------------------------------------------ hyperbolic, cbrt (ports of glibc 2.39's algorithms)
function highWord(x) { F64[0] = x; return U32[HI] | 0; }
export function sinh(x) {
  if (!isFinite(x)) return x + x;
  const jx = highWord(x), ix = jx & 0x7fffffff;
  const h = jx < 0 ? -0.5 : 0.5;
  if (ix < 0x40360000) {
    if (ix < 0x3e300000) return x;
    const t = expm1(Math.abs(x));
    if (ix < 0x3ff00000) return h * (2.0 * t - t * t / (t + 1.0));
    return h * (t + t / (t + 1.0));
  }
  if (ix < 0x40862e42) return h * exp(Math.abs(x));
  const w = exp(0.5 * Math.abs(x));
  const t = h * w;
  return t * w;
}
export function cosh(x) {
  if (!isFinite(x)) return x * x;
  const ix = highWord(x) & 0x7fffffff;
  if (ix < 0x40360000) {
    if (ix < 0x3fd62e43) {
      if (ix < 0x3c800000) return 1.0;
      const t = expm1(Math.abs(x));
      const w = 1.0 + t;
      return 1.0 + (t * t) / (w + w);
    }
    const t = exp(Math.abs(x));
    return 0.5 * t + 0.5 / t;
  }
  if (ix < 0x40862e42) return 0.5 * exp(Math.abs(x));
  const w = exp(0.5 * Math.abs(x));
  const t = 0.5 * w;
  return t * w;
}
export function tanh(x) {
  if (x !== x) return x;
  if (!isFinite(x)) return x > 0 ? 1 : -1;
  const jx = highWord(x), ix = jx & 0x7fffffff;
  let z;
  if (ix < 0x40360000) {
    if (x === 0) return x;
    if (ix < 0x3c800000) return x * (1.0 + x);
    if (ix >= 0x3ff00000) { const t = expm1(2 * Math.abs(x)); z = 1.0 - 2.0 / (t + 2.0); } else { const t = expm1(-2 * Math.abs(x)); z = -t / (t + 2.0); }
  } else z = 1.0;
  return jx >= 0 ? z : -z;
}
// asinh / acosh / atanh: glibc 2.39 s_asinh.c, e_acosh.c, e_atanh.c (no FMA builds; they call glibc's log and log1p)
const LN2_D = 6.93147180559945286227e-01;
export function asinh(x) {
  const ix = highWord(x) & 0x7fffffff;
  if (ix < 0x3e300000) return x;
  let w;
  if (ix > 0x41b00000) {
    if (ix >= 0x7ff00000) return x + x;
    w = log(Math.abs(x)) + LN2_D;
  } else {
    const xa = Math.abs(x);
    if (ix > 0x40000000) w = log(2.0 * xa + 1.0 / (Math.sqrt(xa * xa + 1.0) + xa));
    else { const t = xa * xa; w = log1p(xa + t / (1.0 + Math.sqrt(1.0 + t))); }
  }
  return (x < 0 || Object.is(x, -0)) ? -Math.abs(w) : Math.abs(w);
}
export function acosh(x) {
  if (x !== x) return x + x;
  if (x > 2) {
    if (x >= 268435456) return x === Infinity ? x + x : log(x) + LN2_D;
    const t = x * x;
    return log(2.0 * x - 1.0 / (x + Math.sqrt(t - 1.0)));
  }
  if (x > 1) { const t = x - 1.0; return log1p(t + Math.sqrt(2.0 * t + t * t)); }
  if (x === 1) return 0.0;
  return NaN;
}
export function atanh(x) {
  const xa = Math.abs(x);
  let t;
  if (xa < 0.5) {
    if (xa < 2 ** -28) return x;
    t = xa + xa;
    t = 0.5 * log1p(t + t * xa / (1.0 - xa));
  } else if (xa < 1.0) t = 0.5 * log1p((xa + xa) / (1.0 - xa));
  else if (xa > 1.0 || xa !== xa) return NaN;
  else return x / 0.0;
  return (x < 0 || Object.is(x, -0)) ? -Math.abs(t) : Math.abs(t);
}
const CBRT2 = 1.2599210498948731648, SQR_CBRT2 = 1.5874010519681994748;
const CBRT_FACTOR = [1.0 / SQR_CBRT2, 1.0 / CBRT2, 1.0, CBRT2, SQR_CBRT2];
/** C frexp: x = m * 2**e with 0.5 <= |m| < 1 (exact, subnormals included) */
function frexp(x) {
  if (x === 0 || !isFinite(x)) return [x, 0];
  let e = 0;
  if (Math.abs(x) < 2 ** -1000) { x *= 2 ** 64; e = -64; }
  F64[0] = x;
  const hx = U32[HI];
  e += ((hx >>> 20) & 0x7ff) - 1022;
  U32[HI] = (hx & 0x800fffff) | (1022 << 20);
  return [F64[0], e];
}
export function cbrt(x) {
  if (x === 0 || !isFinite(x)) return x + x;
  const [xm0, xe] = frexp(Math.abs(x));
  const xm = xm0;
  const u = (0.354895765043919860
    + ((1.50819193781584896
      + ((-2.11499494167371287
        + ((2.44693122563534430
          + ((-1.83469277483613086
            + (0.784932344976639262 - 0.145263899385486377 * xm) * xm)
            * xm))
          * xm))
        * xm))
      * xm));
  const t2 = u * u * u;
  const ym = u * (t2 + 2.0 * xm) / (2.0 * t2 + xm) * CBRT_FACTOR[2 + (xe % 3)];
  return ldexp(x > 0.0 ? ym : -ym, Math.trunc(xe / 3));
}

// ------------------------------------------------------------------ erf / erfc (glibc 2.39 sysdeps/ieee754/dbl-64/s_erf.c)
const ERF_BUF = new DataView(new ArrayBuffer(8));
const erfHighWord = (x) => { ERF_BUF.setFloat64(0, x); return ERF_BUF.getInt32(0); };
const clearLowWord = (x) => { ERF_BUF.setFloat64(0, x); ERF_BUF.setUint32(4, 0); return ERF_BUF.getFloat64(0); };
const ERX = 8.45062911510467529297e-01, EFX = 1.28379167095512586316e-01, TINY = 1e-300;
const PP = [1.28379167095512558561e-01, -3.25042107247001499370e-01, -2.84817495755985104766e-02, -5.77027029648944159157e-03, -2.37630166566501626084e-05];
const QQ = [0.0, 3.97917223959155352819e-01, 6.50222499887672944485e-02, 5.08130628187576562776e-03, 1.32494738004321644526e-04, -3.96022827877536812320e-06];
const PA = [-2.36211856075265944077e-03, 4.14856118683748331666e-01, -3.72207876035701323847e-01, 3.18346619901161753674e-01, -1.10894694282396677476e-01, 3.54783043256182359371e-02, -2.16637559486879084300e-03];
const QA = [0.0, 1.06420880400844228286e-01, 5.40397917702171048937e-01, 7.18286544141962662868e-02, 1.26171219808761642112e-01, 1.36370839120290507362e-02, 1.19844998467991074170e-02];
const RA = [-9.86494403484714822705e-03, -6.93858572707181764372e-01, -1.05586262253232909814e+01, -6.23753324503260060396e+01, -1.62396669462573470355e+02, -1.84605092906711035994e+02, -8.12874355063065934246e+01, -9.81432934416914548592e+00];
const SA = [0.0, 1.96512716674392571292e+01, 1.37657754143519042600e+02, 4.34565877475229228821e+02, 6.45387271733267880336e+02, 4.29008140027567833386e+02, 1.08635005541779435134e+02, 6.57024977031928170135e+00, -6.04244152148580987438e-02];
const RB = [-9.86494292470009928597e-03, -7.99283237680523006574e-01, -1.77579549177547519889e+01, -1.60636384855821916062e+02, -6.37566443368389627722e+02, -1.02509513161107724954e+03, -4.83519191608651397019e+02];
const SB = [0.0, 3.03380607434824582924e+01, 3.25792512996573918826e+02, 1.53672958608443695994e+03, 3.19985821950859553908e+03, 2.55305040643316442583e+03, 4.74528541206955367215e+02, -2.24409524465858183362e+01];
function erfSmall(z) {   // R/S on [0, 0.84375]
  const r1 = PP[0] + z * PP[1], z2 = z * z, r2 = PP[2] + z * PP[3], z4 = z2 * z2;
  const s1 = 1 + z * QQ[1], s2 = QQ[2] + z * QQ[3], s3 = QQ[4] + z * QQ[5];
  return (r1 + z2 * r2 + z4 * PP[4]) / (s1 + z2 * s2 + z4 * s3);
}
function erfPQ(s) {      // P/Q on [0.84375, 1.25]
  const P1 = PA[0] + s * PA[1], s2 = s * s, Q1 = 1 + s * QA[1], s4 = s2 * s2, P2 = PA[2] + s * PA[3], s6 = s4 * s2;
  const Q2 = QA[2] + s * QA[3], P3 = PA[4] + s * PA[5], Q3 = QA[4] + s * QA[5];
  return (P1 + s2 * P2 + s4 * P3 + s6 * PA[6]) / (Q1 + s2 * Q2 + s4 * Q3 + s6 * QA[6]);
}
function erfcTail(x, ix) {  // exp(-x*x - 0.5625 + R/S) for 1.25 <= x < 28 (x > 0)
  const s = 1 / (x * x);
  let R, S;
  if (ix < 0x4006DB6E) {
    const R1 = RA[0] + s * RA[1], s2 = s * s, S1 = 1 + s * SA[1], s4 = s2 * s2, R2 = RA[2] + s * RA[3], s6 = s4 * s2;
    const S2 = SA[2] + s * SA[3], s8 = s4 * s4, R3 = RA[4] + s * RA[5], S3 = SA[4] + s * SA[5], R4 = RA[6] + s * RA[7], S4 = SA[6] + s * SA[7];
    R = R1 + s2 * R2 + s4 * R3 + s6 * R4;
    S = S1 + s2 * S2 + s4 * S3 + s6 * S4 + s8 * SA[8];
  } else {
    const R1 = RB[0] + s * RB[1], s2 = s * s, S1 = 1 + s * SB[1], s4 = s2 * s2, R2 = RB[2] + s * RB[3], s6 = s4 * s2;
    const S2 = SB[2] + s * SB[3], R3 = RB[4] + s * RB[5], S3 = SB[4] + s * SB[5], S4 = SB[6] + s * SB[7];
    R = R1 + s2 * R2 + s4 * R3 + s6 * RB[6];
    S = S1 + s2 * S2 + s4 * S3 + s6 * S4;
  }
  const z = clearLowWord(x);
  return exp(-z * z - 0.5625) * exp((z - x) * (z + x) + R / S);
}
export function erf(x) {
  const hx = erfHighWord(x), ix = hx & 0x7fffffff;
  if (ix >= 0x7ff00000) return (hx < 0 ? -1 : 1) + 1 / x;
  if (ix < 0x3feb0000) {
    if (ix < 0x3e300000) return ix < 0x00800000 ? 0.0625 * (16.0 * x + (16.0 * EFX) * x) : x + EFX * x;
    return x + x * erfSmall(x * x);
  }
  if (ix < 0x3ff40000) { const pq = erfPQ(Math.abs(x) - 1); return hx >= 0 ? ERX + pq : -ERX - pq; }
  if (ix >= 0x40180000) return hx >= 0 ? 1 - TINY : TINY - 1;
  const ax = Math.abs(x);
  const r = erfcTail(ax, ix);
  return hx >= 0 ? 1 - r / ax : r / ax - 1;
}
export function erfc(x) {
  const hx = erfHighWord(x), ix = hx & 0x7fffffff;
  if (ix >= 0x7ff00000) return (hx < 0 ? 2 : 0) + 1 / x;
  if (ix < 0x3feb0000) {
    if (ix < 0x3c700000) return 1 - x;
    const y = erfSmall(x * x);
    if (hx < 0x3fd00000) return 1 - (x + x * y);
    let r = x * y;
    r += (x - 0.5);
    return 0.5 - r;
  }
  if (ix < 0x3ff40000) { const pq = erfPQ(Math.abs(x) - 1); if (hx >= 0) return (1 - ERX) - pq; return 1 + (ERX + pq); }
  if (ix < 0x403c0000) {
    if (hx < 0 && ix >= 0x40180000) return 2 - TINY;
    const ax = Math.abs(x);
    const r = erfcTail(ax, ix < 0x4006DB6D ? 0 : 0x7fffffff);
    return hx > 0 ? r / ax : 2 - r / ax;
  }
  return hx > 0 ? TINY * TINY : 2 - TINY;
}

// ------------------------------------------------------------------ gamma / lgamma (CPython 3.13 Modules/mathmodule.c)
// These return { v, errno } with errno 'EDOM' | 'ERANGE' | null like the C code (math_1a turns them into exceptions).
const M_PI = 3.141592653589793238462643383279502884197, LOGPI = 1.144729885849400174143427351353058711647;
const LANCZOS_G = 6.024680040776729583740234375, LANCZOS_G_MINUS_HALF = 5.524680040776729583740234375;
const LANCZOS_NUM = [23531376880.410759688572007674451636754734846804940, 42919803642.649098768957899047001988850926355848959,
  35711959237.355668049440185451547166705960488635843, 17921034426.037209699919755754458931112671403265390,
  6039542586.3520280050642916443072979210699388420708, 1439720407.3117216736632230727949123939715485786772,
  248874557.86205415651146038641322942321632125127801, 31426415.585400194380614231628318205362874684987640,
  2876370.6289353724412254090516208496135991145378768, 186056.26539522349504029498971604569928220784236328,
  8071.6720023658162106380029022722506138218516325024, 210.82427775157934587250973392071336271166969580291,
  2.5066282746310002701649081771338373386264310793408];
const LANCZOS_DEN = [0.0, 39916800.0, 120543840.0, 150917976.0, 105258076.0, 45995730.0, 13339535.0, 2637558.0, 357423.0, 32670.0, 1925.0, 66.0, 1.0];
const GAMMA_INTEGRAL = [1.0, 1.0, 2.0, 6.0, 24.0, 120.0, 720.0, 5040.0, 40320.0, 362880.0, 3628800.0, 39916800.0, 479001600.0,
  6227020800.0, 87178291200.0, 1307674368000.0, 20922789888000.0, 355687428096000.0, 6402373705728000.0,
  121645100408832000.0, 2432902008176640000.0, 51090942171709440000.0, 1124000727777607680000.0];
function lanczosSum(x) {
  let num = 0.0, den = 0.0;
  if (x < 5.0) {
    for (let i = 13; --i >= 0;) { num = num * x + LANCZOS_NUM[i]; den = den * x + LANCZOS_DEN[i]; }
  } else {
    for (let i = 0; i < 13; i++) { num = num / x + LANCZOS_NUM[i]; den = den / x + LANCZOS_DEN[i]; }
  }
  return num / den;
}
function sinpi(x) {
  const y = Math.abs(x) % 2.0;
  const n = Math.round(2.0 * y);
  let r;
  switch (n) {
    case 0: r = sin(M_PI * y); break;
    case 1: r = cos(M_PI * (y - 0.5)); break;
    case 2: r = sin(M_PI * (1.0 - y)); break;
    case 3: r = -cos(M_PI * (y - 1.5)); break;
    default: r = sin(M_PI * (y - 2.0)); break;
  }
  return (x < 0 || Object.is(x, -0) ? -1 : 1) * r;
}
const cpow = (x, y) => (y === 0 ? 1 : powPos(x, y));
export function tgamma(x) {
  if (!isFinite(x)) { if (x !== x || x > 0) return { v: x, errno: null }; return { v: NaN, errno: 'EDOM' }; }
  if (x === 0) return { v: Object.is(x, -0) ? -Infinity : Infinity, errno: 'EDOM' };
  if (x === Math.floor(x)) {
    if (x < 0) return { v: NaN, errno: 'EDOM' };
    if (x <= 23) return { v: GAMMA_INTEGRAL[x - 1], errno: null };
  }
  const absx = Math.abs(x);
  if (absx < 1e-20) { const r = 1.0 / x; return { v: r, errno: isFinite(r) ? null : 'ERANGE' }; }
  if (absx > 200.0) {
    if (x < 0.0) return { v: 0.0 / sinpi(x), errno: null };
    return { v: Infinity, errno: 'ERANGE' };
  }
  const y = absx + LANCZOS_G_MINUS_HALF;
  let z;
  if (absx > LANCZOS_G_MINUS_HALF) { const q = y - absx; z = q - LANCZOS_G_MINUS_HALF; } else { const q = y - LANCZOS_G_MINUS_HALF; z = q - absx; }
  z = z * LANCZOS_G / y;
  let r;
  if (x < 0.0) {
    r = -M_PI / sinpi(absx) / absx * exp(y) / lanczosSum(absx);
    r -= z * r;
    if (absx < 140.0) r /= cpow(y, absx - 0.5);
    else { const sp = cpow(y, absx / 2.0 - 0.25); r /= sp; r /= sp; }
  } else {
    r = lanczosSum(absx) / exp(y);
    r += z * r;
    if (absx < 140.0) r *= cpow(y, absx - 0.5);
    else { const sp = cpow(y, absx / 2.0 - 0.25); r *= sp; r *= sp; }
  }
  return { v: r, errno: isFinite(r) ? null : 'ERANGE' };
}
export function lgamma(x) {
  if (!isFinite(x)) return { v: x !== x ? x : Infinity, errno: null };
  if (x === Math.floor(x) && x <= 2.0) {
    if (x <= 0.0) return { v: Infinity, errno: 'EDOM' };
    return { v: 0.0, errno: null };
  }
  const absx = Math.abs(x);
  if (absx < 1e-20) return { v: -log(absx), errno: null };
  let r = log(lanczosSum(absx)) - LANCZOS_G;
  r += (absx - 0.5) * (log(absx + LANCZOS_G - 0.5) - 1);
  if (x < 0.0) r = LOGPI - log(Math.abs(sinpi(absx))) - log(absx) - r;
  return { v: r, errno: isFinite(r) ? null : 'ERANGE' };
}
