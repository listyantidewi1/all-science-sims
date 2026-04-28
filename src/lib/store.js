const PREFIX = 'ass.';

export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
}

const FAV_KEY = 'favorites';
const favListeners = new Set();

export function getFavorites() {
  const arr = get(FAV_KEY, []);
  return Array.isArray(arr) ? arr : [];
}

export function isFavorite(simKey) {
  return getFavorites().includes(simKey);
}

export function toggleFavorite(simKey) {
  const list = getFavorites();
  const i = list.indexOf(simKey);
  if (i >= 0) list.splice(i, 1);
  else list.push(simKey);
  set(FAV_KEY, list);
  favListeners.forEach((fn) => { try { fn(list); } catch {} });
  return i < 0;
}

export function onFavoritesChange(fn) {
  favListeners.add(fn);
  return () => favListeners.delete(fn);
}
