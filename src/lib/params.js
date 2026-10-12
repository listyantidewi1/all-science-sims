/**
 * params — deep-link registry for sim controls.
 *
 * Controls built with src/lib/controls.js register themselves here under a
 * stable key (explicit `key` option, else a slug of the label). The sim page
 * then:
 *   1. calls resetParams() right before mounting a sim,
 *   2. mounts the sim (controls register as they are created),
 *   3. calls applyParams(urlSearchParams) so `#/physics/pendulum?length-m=2`
 *      sets the "Length (m)" slider to 2 and fires its onInput.
 *
 * serializeParams() does the reverse for the "Copy link" button: it emits
 * every registered control whose value differs from its initial value.
 *
 * Reserved query keys (never treated as control keys): autostart, lang.
 */
export const RESERVED_KEYS = new Set(['autostart', 'lang']);

let registry = new Map();

export function slugify(label) {
  return String(label ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'param';
}

export function resetParams() {
  registry = new Map();
}

/**
 * Register a control. `api` is { get(), set(stringValue), initial }.
 * Returns the key actually used (deduplicated with -2, -3, ... on collision).
 */
export function registerParam(key, api) {
  let k = slugify(key);
  if (RESERVED_KEYS.has(k)) k = `${k}-param`;
  if (registry.has(k)) {
    let i = 2;
    while (registry.has(`${k}-${i}`)) i++;
    k = `${k}-${i}`;
  }
  registry.set(k, api);
  return k;
}

export function applyParams(searchParams) {
  if (!searchParams) return 0;
  let applied = 0;
  for (const [k, v] of searchParams.entries()) {
    if (RESERVED_KEYS.has(k)) continue;
    const api = registry.get(k);
    if (!api) continue;
    try { api.set(v); applied++; } catch (e) { console.warn('params: could not apply', k, e); }
  }
  return applied;
}

/** URLSearchParams of every control whose value differs from its initial value. */
export function serializeParams() {
  const out = new URLSearchParams();
  for (const [k, api] of registry) {
    const v = api.get();
    if (String(v) === String(api.initial)) continue;
    out.set(k, String(v));
  }
  return out;
}

export function registeredKeys() {
  return [...registry.keys()];
}
