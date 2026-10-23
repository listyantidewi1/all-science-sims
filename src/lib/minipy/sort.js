// minipy — list.sort() / sorted(): a port of CPython 3.13's timsort (Objects/listobject.c: count_run, binarysort,
// powersort merging with merge_lo / merge_hi and galloping). Only `<` is used, in exactly CPython's order, so the
// results agree for inconsistent orders too (nan), the TypeError of a mixed-type list names the same pair, and a
// sort that fails midway leaves the same partial order (the array is always a permutation of its input).

const MIN_GALLOP = 7;

/** sort array `a` in place with the strict-weak-order predicate isLT(x, y) (which may throw) */
export function timsort(a, isLT) {
  const n = a.length;
  if (n < 2) return;
  const ms = { minGallop: MIN_GALLOP, pending: [], listlen: n };
  let lo = 0, nremaining = n;
  const minrun = computeMinrun(n);
  do {
    let r = countRun(a, lo, nremaining, isLT);
    if (r < minrun) {
      const force = nremaining <= minrun ? nremaining : minrun;
      binarysort(a, lo, force, r, isLT);
      r = force;
    }
    foundNewRun(ms, a, lo, r, isLT);
    ms.pending.push({ base: lo, len: r, power: 0 });
    lo += r;
    nremaining -= r;
  } while (nremaining);
  forceCollapse(ms, a, isLT);
}

function computeMinrun(n) {
  let r = 0;
  while (n >= 64) { r |= n & 1; n >>= 1; }
  return n + r;
}

function reverseSlice(a, lo, hi) {   // a[lo:hi]
  for (hi--; lo < hi; lo++, hi--) { const t = a[lo]; a[lo] = a[hi]; a[hi] = t; }
}

/** binary insertion sort of a[lo:lo+n], a[lo:lo+ok] already sorted */
function binarysort(a, lo, n, ok, isLT) {
  if (!ok) ok = 1;
  for (; ok < n; ok++) {
    let L = 0, R = ok;
    const pivot = a[lo + ok];
    do {
      const M = (L + R) >> 1;
      if (isLT(pivot, a[lo + M])) R = M; else L = M + 1;
    } while (L < R);
    for (let M = ok; M > L; M--) a[lo + M] = a[lo + M - 1];
    a[lo + L] = pivot;
  }
}

/** length of the run starting at a[lo] (made ascending in place); 3.13's version with "equal" runs in descents */
function countRun(a, lo, nremaining, isLT) {
  let n;
  for (n = 1; n < nremaining; n++) if (isLT(a[lo + n], a[lo + n - 1])) break;
  if (n === nremaining) return n;
  if (n > 1) {
    if (isLT(a[lo], a[lo + n - 1])) return n;
    reverseSlice(a, lo, lo + n);
  }
  n++;
  let neq = 0;
  const reverseLastNeq = () => {
    if (neq) { neq++; reverseSlice(a, lo + n - neq, lo + n); neq = 0; }
  };
  for (; n < nremaining; n++) {
    if (isLT(a[lo + n], a[lo + n - 1])) reverseLastNeq();
    else if (isLT(a[lo + n - 1], a[lo + n])) break;
    else neq++;
  }
  reverseLastNeq();
  reverseSlice(a, lo, lo + n);
  for (; n < nremaining; n++) if (isLT(a[lo + n], a[lo + n - 1])) break;
  return n;
}

function powerloop(s1, n1, n2, n) {
  let result = 0;
  let a = 2 * s1 + n1, b = a + n1 + n2;
  for (;;) {
    result++;
    if (a >= n) { a -= n; b -= n; } else if (b >= n) break;
    a *= 2; b *= 2;
  }
  return result;
}

function foundNewRun(ms, a, start, n2, isLT) {
  const p = ms.pending;
  if (p.length) {
    const top = p[p.length - 1];
    const power = powerloop(top.base, top.len, n2, ms.listlen);
    while (p.length > 1 && p[p.length - 2].power > power) mergeAt(ms, a, p.length - 2, isLT);
    p[p.length - 1].power = power;
  }
  void start;
}

function forceCollapse(ms, a, isLT) {
  const p = ms.pending;
  while (p.length > 1) {
    let n = p.length - 2;
    if (n > 0 && p[n - 1].len < p[n + 1].len) n--;
    mergeAt(ms, a, n, isLT);
  }
}

function mergeAt(ms, a, i, isLT) {
  const p = ms.pending;
  let baseA = p[i].base, na = p[i].len;
  const baseB = p[i + 1].base;
  let nb = p[i + 1].len;
  p[i].len = na + nb;
  p.splice(i + 1, 1);
  const k = gallopRight(a[baseB], a, baseA, na, 0, isLT);
  baseA += k;
  na -= k;
  if (na === 0) return;
  nb = gallopLeft(a[baseA + na - 1], a, baseB, nb, nb - 1, isLT);
  if (nb <= 0) return;
  if (na <= nb) mergeLo(ms, a, baseA, na, baseB, nb, isLT);
  else mergeHi(ms, a, baseA, na, baseB, nb, isLT);
}

/** leftmost position in arr[base:base+n] where key belongs (a[pos-1] < key <= a[pos]) */
function gallopLeft(key, arr, base, n, hint, isLT) {
  let lastofs = 0, ofs = 1;
  const h = base + hint;
  if (isLT(arr[h], key)) {
    const maxofs = n - hint;
    while (ofs < maxofs) {
      if (isLT(arr[h + ofs], key)) { lastofs = ofs; ofs = (ofs << 1) + 1; } else break;
    }
    if (ofs > maxofs) ofs = maxofs;
    lastofs += hint;
    ofs += hint;
  } else {
    const maxofs = hint + 1;
    while (ofs < maxofs) {
      if (isLT(arr[h - ofs], key)) break;
      lastofs = ofs;
      ofs = (ofs << 1) + 1;
    }
    if (ofs > maxofs) ofs = maxofs;
    const k = lastofs;
    lastofs = hint - ofs;
    ofs = hint - k;
  }
  lastofs++;
  while (lastofs < ofs) {
    const m = lastofs + ((ofs - lastofs) >> 1);
    if (isLT(arr[base + m], key)) lastofs = m + 1; else ofs = m;
  }
  return ofs;
}

/** rightmost position in arr[base:base+n] where key belongs (a[pos-1] <= key < a[pos]) */
function gallopRight(key, arr, base, n, hint, isLT) {
  let lastofs = 0, ofs = 1;
  const h = base + hint;
  if (isLT(key, arr[h])) {
    const maxofs = hint + 1;
    while (ofs < maxofs) {
      if (isLT(key, arr[h - ofs])) { lastofs = ofs; ofs = (ofs << 1) + 1; } else break;
    }
    if (ofs > maxofs) ofs = maxofs;
    const k = lastofs;
    lastofs = hint - ofs;
    ofs = hint - k;
  } else {
    const maxofs = n - hint;
    while (ofs < maxofs) {
      if (isLT(key, arr[h + ofs])) break;
      lastofs = ofs;
      ofs = (ofs << 1) + 1;
    }
    if (ofs > maxofs) ofs = maxofs;
    lastofs += hint;
    ofs += hint;
  }
  lastofs++;
  while (lastofs < ofs) {
    const m = lastofs + ((ofs - lastofs) >> 1);
    if (isLT(key, arr[base + m])) ofs = m; else lastofs = m + 1;
  }
  return ofs;
}

/** merge a[pa:pa+na] and a[pb:pb+nb] (pb === pa + na), na <= nb, with a temp copy of the first run */
function mergeLo(ms, a, pa, na, pb, nb, isLT) {
  const t = a.slice(pa, pa + na);
  let dest = pa, ia = 0, ib = pb;
  let how = 'fail';
  a[dest++] = a[ib++];
  nb--;
  try {
    if (nb === 0) { how = 'done'; return; }
    if (na === 1) { how = 'copyB'; return; }
    let minGallop = ms.minGallop;
    for (;;) {
      let acount = 0, bcount = 0;
      for (;;) {
        if (isLT(a[ib], t[ia])) {
          a[dest++] = a[ib++]; bcount++; acount = 0; nb--;
          if (nb === 0) { how = 'done'; return; }
          if (bcount >= minGallop) break;
        } else {
          a[dest++] = t[ia++]; acount++; bcount = 0; na--;
          if (na === 1) { how = 'copyB'; return; }
          if (acount >= minGallop) break;
        }
      }
      minGallop++;
      do {
        if (minGallop > 1) minGallop--;
        ms.minGallop = minGallop;
        let k = gallopRight(a[ib], t, ia, na, 0, isLT);
        acount = k;
        if (k) {
          for (let j = 0; j < k; j++) a[dest + j] = t[ia + j];
          dest += k; ia += k; na -= k;
          if (na === 1) { how = 'copyB'; return; }
          if (na === 0) { how = 'done'; return; }
        }
        a[dest++] = a[ib++]; nb--;
        if (nb === 0) { how = 'done'; return; }
        k = gallopLeft(t[ia], a, ib, nb, 0, isLT);
        bcount = k;
        if (k) {
          for (let j = 0; j < k; j++) a[dest + j] = a[ib + j];
          dest += k; ib += k; nb -= k;
          if (nb === 0) { how = 'done'; return; }
        }
        a[dest++] = t[ia++]; na--;
        if (na === 1) { how = 'copyB'; return; }
      } while (acount >= MIN_GALLOP || bcount >= MIN_GALLOP);
      minGallop++;
      ms.minGallop = minGallop;
    }
  } finally {
    if (how === 'copyB') {
      for (let j = 0; j < nb; j++) a[dest + j] = a[ib + j];
      a[dest + nb] = t[ia];
    } else for (let j = 0; j < na; j++) a[dest + j] = t[ia + j];
  }
}

/** merge a[pa:pa+na] and a[pb:pb+nb] (pb === pa + na), na > nb, with a temp copy of the second run */
function mergeHi(ms, a, pa, na, pb, nb, isLT) {
  const t = a.slice(pb, pb + nb);
  let dest = pb + nb - 1, ia = pa + na - 1, ib = nb - 1;
  let how = 'fail';
  a[dest--] = a[ia--];
  na--;
  try {
    if (na === 0) { how = 'done'; return; }
    if (nb === 1) { how = 'copyA'; return; }
    let minGallop = ms.minGallop;
    for (;;) {
      let acount = 0, bcount = 0;
      for (;;) {
        if (isLT(t[ib], a[ia])) {
          a[dest--] = a[ia--]; acount++; bcount = 0; na--;
          if (na === 0) { how = 'done'; return; }
          if (acount >= minGallop) break;
        } else {
          a[dest--] = t[ib--]; bcount++; acount = 0; nb--;
          if (nb === 1) { how = 'copyA'; return; }
          if (bcount >= minGallop) break;
        }
      }
      minGallop++;
      do {
        if (minGallop > 1) minGallop--;
        ms.minGallop = minGallop;
        let k = gallopRight(t[ib], a, pa, na, na - 1, isLT);
        k = na - k;
        acount = k;
        if (k) {
          dest -= k; ia -= k;
          for (let j = k; j >= 1; j--) a[dest + j] = a[ia + j];
          na -= k;
          if (na === 0) { how = 'done'; return; }
        }
        a[dest--] = t[ib--]; nb--;
        if (nb === 1) { how = 'copyA'; return; }
        k = gallopLeft(a[ia], t, 0, nb, nb - 1, isLT);
        k = nb - k;
        bcount = k;
        if (k) {
          dest -= k; ib -= k;
          for (let j = 1; j <= k; j++) a[dest + j] = t[ib + j];
          nb -= k;
          if (nb === 1) { how = 'copyA'; return; }
          if (nb === 0) { how = 'done'; return; }
        }
        a[dest--] = a[ia--]; na--;
        if (na === 0) { how = 'done'; return; }
      } while (acount >= MIN_GALLOP || bcount >= MIN_GALLOP);
      minGallop++;
      ms.minGallop = minGallop;
    }
  } finally {
    if (how === 'copyA') {
      for (let j = 0; j >= 1 - na; j--) a[dest + j] = a[ia + j];
      dest -= na; ia -= na;
      a[dest] = t[ib];
    } else for (let j = 0; j < nb; j++) a[dest - (nb - 1) + j] = t[j];
  }
}
