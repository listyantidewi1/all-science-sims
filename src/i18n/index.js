import en from './en.json';
import id from './id.json';

const dictionaries = { en, id };
const SUPPORTED = ['en', 'id'];
const STORAGE_KEY = 'ass.locale';

function detectInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {}
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('id')) return 'id';
  return 'en';
}

let locale = detectInitial();
const listeners = new Set();

export function getLocale() { return locale; }

export function setLocale(next) {
  if (!SUPPORTED.includes(next) || next === locale) return;
  locale = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  document.documentElement.lang = next;
  listeners.forEach(fn => fn(next));
}

export function onLocaleChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(key, vars) {
  const dict = dictionaries[locale] || dictionaries.en;
  let str = dict[key];
  if (str === undefined) str = dictionaries.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g'), String(v));
    }
  }
  return str;
}

/** Resolve a {en, id} bilingual field from a sim manifest. */
export function tr(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[locale] ?? field.en ?? '';
}

document.documentElement.lang = locale;
