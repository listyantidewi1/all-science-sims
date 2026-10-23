// minipy — "Did you mean" suggestions, a port of CPython's Python/suggestions.c (used by 3.13's traceback module).
const MAX_CANDIDATE_ITEMS = 750, MAX_STRING_SIZE = 40, MOVE_COST = 2, CASE_COST = 1;
const enc = new TextEncoder();

function lower(c) { return c >= 65 && c <= 90 ? c + 32 : c; }
function substitutionCost(a, b) {
  if (a === b) return 0;
  if (lower(a) === lower(b)) return CASE_COST;
  return MOVE_COST;
}

function levenshtein(a, b, maxCost) {
  // a, b: Uint8Array (UTF-8)
  let aStart = 0, bStart = 0, aSize = a.length, bSize = b.length;
  while (aSize && bSize && a[aStart] === b[bStart]) { aStart++; bStart++; aSize--; bSize--; }
  while (aSize && bSize && a[aStart + aSize - 1] === b[bStart + bSize - 1]) { aSize--; bSize--; }
  if (aSize === 0 || bSize === 0) return (aSize + bSize) * MOVE_COST;
  if (aSize > MAX_STRING_SIZE || bSize > MAX_STRING_SIZE) return maxCost + 1;
  if (bSize < aSize) { [a, b] = [b, a]; [aStart, bStart] = [bStart, aStart]; [aSize, bSize] = [bSize, aSize]; }
  if ((bSize - aSize) * MOVE_COST > maxCost) return maxCost + 1;
  const buffer = new Array(aSize);
  let tmp = MOVE_COST;
  for (let i = 0; i < aSize; i++) { buffer[i] = tmp; tmp += MOVE_COST; }
  let result = 0;
  for (let bi = 0; bi < bSize; bi++) {
    const code = b[bStart + bi];
    let distance = result = bi * MOVE_COST;
    let minimum = Infinity;
    for (let i = 0; i < aSize; i++) {
      const substitute = distance + substitutionCost(code, a[aStart + i]);
      distance = buffer[i];
      const insertDelete = Math.min(result, distance) + MOVE_COST;
      result = Math.min(insertDelete, substitute);
      buffer[i] = result;
      if (result < minimum) minimum = result;
    }
    if (minimum > maxCost) return maxCost + 1;
  }
  return result;
}

/** closest candidate to `name` or null (CPython's _Py_CalculateSuggestions) */
export function suggestName(candidates, name) {
  if (candidates.length >= MAX_CANDIDATE_ITEMS) return null;
  const nb = enc.encode(name);
  let best = null, bestDist = Infinity;
  for (const item of candidates) {
    if (typeof item !== 'string' || item === name) continue;
    const ib = enc.encode(item);
    let maxDistance = Math.floor((nb.length + ib.length + 3) * MOVE_COST / 6);
    maxDistance = Math.min(maxDistance, bestDist - 1);
    const d = levenshtein(nb, ib, maxDistance);
    if (d > maxDistance) continue;
    if (best === null || d < bestDist) { best = item; bestDist = d; }
  }
  return best;
}
