// minipy — CPython's random module core: MT19937 (Modules/_randommodule.c) and the pure-Python
// algorithms of Lib/random.py (3.13) that sit on top of it. Ints are BigInt where Python ints can be large.
// Licensing: MT19937 Copyright (C) 1997-2002 Makoto Matsumoto and Takuji Nishimura (BSD-3-Clause), Lib/random.py PSF-2.0;
// see THIRD-PARTY-NOTICES.md.

const N = 624, M = 397;
const MATRIX_A = 0x9908b0df, UPPER_MASK = 0x80000000, LOWER_MASK = 0x7fffffff;

export class MersenneTwister {
  constructor() { this.mt = new Uint32Array(N); this.mti = N + 1; this.gaussNext = null; }

  initGenrand(s) {
    const mt = this.mt;
    mt[0] = s >>> 0;
    for (let i = 1; i < N; i++) {
      const prev = mt[i - 1] ^ (mt[i - 1] >>> 30);
      // 1812433253 * prev + i  (mod 2^32)
      mt[i] = (Math.imul(1812433253, prev) + i) >>> 0;
    }
    this.mti = N;
  }

  initByArray(key) {
    const mt = this.mt;
    this.initGenrand(19650218);
    let i = 1, j = 0;
    const len = key.length;
    let k = N > len ? N : len;
    for (; k; k--) {
      const prev = mt[i - 1] ^ (mt[i - 1] >>> 30);
      mt[i] = ((mt[i] ^ Math.imul(prev, 1664525)) + key[j] + j) >>> 0;
      i++; j++;
      if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
      if (j >= len) j = 0;
    }
    for (k = N - 1; k; k--) {
      const prev = mt[i - 1] ^ (mt[i - 1] >>> 30);
      mt[i] = ((mt[i] ^ Math.imul(prev, 1566083941)) - i) >>> 0;
      i++;
      if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
    }
    mt[0] = 0x80000000;
    this.mti = N;
  }

  genrandUint32() {
    const mt = this.mt;
    let y;
    if (this.mti >= N) {
      if (this.mti === N + 1) this.initGenrand(5489);
      let kk = 0;
      for (; kk < N - M; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + M] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      }
      for (; kk < N - 1; kk++) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      }
      y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ ((y & 1) ? MATRIX_A : 0);
      this.mti = 0;
    }
    y = mt[this.mti++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
    return y >>> 0;
  }

  /** random.seed(n) for a Python int n (BigInt) */
  seedInt(n) {
    if (n < 0n) n = -n;
    const key = [];
    if (n === 0n) key.push(0);
    while (n > 0n) { key.push(Number(n & 0xffffffffn)); n >>= 32n; }
    this.initByArray(key);
    this.gaussNext = null;
  }
  seedTime() {
    const t = BigInt(Date.now()) * 1000003n + BigInt(Math.floor(Math.random() * 2 ** 31));
    this.seedInt(t);
  }

  /** random.random(): 53-bit float in [0, 1) */
  random() {
    const a = this.genrandUint32() >>> 5, b = this.genrandUint32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }

  /** getrandbits(k) → BigInt */
  getrandbits(k) {
    if (k <= 32) return BigInt(this.genrandUint32() >>> (32 - k));
    // little-endian 32-bit words, last word truncated
    let result = 0n, shift = 0n;
    let remaining = k;
    while (remaining > 0) {
      let r = this.genrandUint32();
      if (remaining < 32) r >>>= (32 - remaining);
      result |= BigInt(r) << shift;
      shift += 32n;
      remaining -= 32;
    }
    return result;
  }

  /** _randbelow_with_getrandbits(n) for BigInt n > 0 */
  randbelow(n) {
    const k = bitLength(n);
    let r = this.getrandbits(k);
    while (r >= n) r = this.getrandbits(k);
    return r;
  }

  getstate() { return { mt: Array.from(this.mt), mti: this.mti, gaussNext: this.gaussNext }; }
  setstate(s) { this.mt = Uint32Array.from(s.mt); this.mti = s.mti; this.gaussNext = s.gaussNext; }
}

export function bitLength(n) { if (n < 0n) n = -n; return n === 0n ? 0 : n.toString(2).length; }

// ------------------------------------------------------------------ SHA-512 (for random.seed(str), version 2)
const K512 = [
  '428a2f98d728ae22', '7137449123ef65cd', 'b5c0fbcfec4d3b2f', 'e9b5dba58189dbbc', '3956c25bf348b538', '59f111f1b605d019', '923f82a4af194f9b', 'ab1c5ed5da6d8118',
  'd807aa98a3030242', '12835b0145706fbe', '243185be4ee4b28c', '550c7dc3d5ffb4e2', '72be5d74f27b896f', '80deb1fe3b1696b1', '9bdc06a725c71235', 'c19bf174cf692694',
  'e49b69c19ef14ad2', 'efbe4786384f25e3', '0fc19dc68b8cd5b5', '240ca1cc77ac9c65', '2de92c6f592b0275', '4a7484aa6ea6e483', '5cb0a9dcbd41fbd4', '76f988da831153b5',
  '983e5152ee66dfab', 'a831c66d2db43210', 'b00327c898fb213f', 'bf597fc7beef0ee4', 'c6e00bf33da88fc2', 'd5a79147930aa725', '06ca6351e003826f', '142929670a0e6e70',
  '27b70a8546d22ffc', '2e1b21385c26c926', '4d2c6dfc5ac42aed', '53380d139d95b3df', '650a73548baf63de', '766a0abb3c77b2a8', '81c2c92e47edaee6', '92722c851482353b',
  'a2bfe8a14cf10364', 'a81a664bbc423001', 'c24b8b70d0f89791', 'c76c51a30654be30', 'd192e819d6ef5218', 'd69906245565a910', 'f40e35855771202a', '106aa07032bbd1b8',
  '19a4c116b8d2d0c8', '1e376c085141ab53', '2748774cdf8eeb99', '34b0bcb5e19b48a8', '391c0cb3c5c95a63', '4ed8aa4ae3418acb', '5b9cca4f7763e373', '682e6ff3d6b2b8a3',
  '748f82ee5defb2fc', '78a5636f43172f60', '84c87814a1f0ab72', '8cc702081a6439ec', '90befffa23631e28', 'a4506cebde82bde9', 'bef9a3f7b2c67915', 'c67178f2e372532b',
  'ca273eceea26619c', 'd186b8c721c0c207', 'eada7dd6cde0eb1e', 'f57d4f7fee6ed178', '06f067aa72176fba', '0a637dc5a2c898a6', '113f9804bef90dae', '1b710b35131c471b',
  '28db77f523047d84', '32caab7b40c72493', '3c9ebe0a15c9bebc', '431d67c49c100d4c', '4cc5d4becb3e42b6', '597f299cfc657e2a', '5fcb6fab3ad6faec', '6c44198c4a475817',
].map((h) => BigInt('0x' + h));
const H512 = ['6a09e667f3bcc908', 'bb67ae8584caa73b', '3c6ef372fe94f82b', 'a54ff53a5f1d36f1', '510e527fade682d1', '9b05688c2b3e6c1f', '1f83d9abfb41bd6b', '5be0cd19137e2179'].map((h) => BigInt('0x' + h));
const M64 = (1n << 64n) - 1n;
const rotr = (x, n) => ((x >> n) | (x << (64n - n))) & M64;
export function sha512(bytes) {
  const len = bytes.length;
  const padLen = ((len + 17 + 127) >> 7) << 7;
  const buf = new Uint8Array(padLen);
  buf.set(bytes);
  buf[len] = 0x80;
  const bitLen = BigInt(len) * 8n;
  for (let i = 0; i < 16; i++) buf[padLen - 1 - i] = Number((bitLen >> BigInt(8 * i)) & 0xffn);
  const H = H512.slice();
  const W = new Array(80);
  for (let off = 0; off < padLen; off += 128) {
    for (let t = 0; t < 16; t++) {
      let w = 0n;
      for (let b = 0; b < 8; b++) w = (w << 8n) | BigInt(buf[off + t * 8 + b]);
      W[t] = w;
    }
    for (let t = 16; t < 80; t++) {
      const s0 = rotr(W[t - 15], 1n) ^ rotr(W[t - 15], 8n) ^ (W[t - 15] >> 7n);
      const s1 = rotr(W[t - 2], 19n) ^ rotr(W[t - 2], 61n) ^ (W[t - 2] >> 6n);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) & M64;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 80; t++) {
      const S1 = rotr(e, 14n) ^ rotr(e, 18n) ^ rotr(e, 41n);
      const ch = (e & f) ^ (~e & M64 & g);
      const t1 = (h + S1 + ch + K512[t] + W[t]) & M64;
      const S0 = rotr(a, 28n) ^ rotr(a, 34n) ^ rotr(a, 39n);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) & M64;
      h = g; g = f; f = e; e = (d + t1) & M64; d = c; c = b; b = a; a = (t1 + t2) & M64;
    }
    H[0] = (H[0] + a) & M64; H[1] = (H[1] + b) & M64; H[2] = (H[2] + c) & M64; H[3] = (H[3] + d) & M64;
    H[4] = (H[4] + e) & M64; H[5] = (H[5] + f) & M64; H[6] = (H[6] + g) & M64; H[7] = (H[7] + h) & M64;
  }
  const out = new Uint8Array(64);
  for (let i = 0; i < 8; i++) for (let b = 0; b < 8; b++) out[i * 8 + b] = Number((H[i] >> BigInt(56 - 8 * b)) & 0xffn);
  return out;
}
/** random.seed(s) for str s (version 2): int.from_bytes(s.encode() + sha512(s.encode()).digest()) */
export function strSeedToInt(s) {
  const enc = new TextEncoder().encode(s);
  const dig = sha512(enc);
  const all = new Uint8Array(enc.length + 64);
  all.set(enc); all.set(dig, enc.length);
  let n = 0n;
  for (const b of all) n = (n << 8n) | BigInt(b);
  return n;
}
