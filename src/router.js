import { renderHome } from './pages/home.js';
import { renderSubject } from './pages/subject.js';
import { renderSim, disposeCurrentSim } from './pages/sim.js';
import { renderAbout } from './pages/about.js';
import { getLocale, setLocale } from './i18n/index.js';

/**
 * Hash routes:
 *   #/                                   home
 *   #/about                              about
 *   #/<subject>                          subject page
 *   #/<subject>/<sim>[?k=v&...]          sim page; k=v presets its controls (deep link)
 *   #/embed/<subject>/<sim>[?k=v&...]    stage-only view for <iframe> embedding
 *
 * Reserved query keys: autostart=1 skips the Start gate; lang=en|id sets the UI language.
 */
export function parseHash(hash = location.hash) {
  const raw = (hash || '#/').replace(/^#\/?/, '');
  const qIdx = raw.indexOf('?');
  const path = qIdx >= 0 ? raw.slice(0, qIdx) : raw;
  const query = new URLSearchParams(qIdx >= 0 ? raw.slice(qIdx + 1) : '');
  const parts = path.split('/').filter(Boolean);
  const embed = parts[0] === 'embed';
  if (embed) parts.shift();
  return { parts, query, embed };
}

export async function renderRoute(mainEl) {
  disposeCurrentSim();
  mainEl.innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'instant' });

  const { parts, query, embed } = parseHash();

  // ?lang=id — switch language first; the locale listener re-renders everything.
  const lang = query.get('lang');
  if (lang && lang !== getLocale()) {
    setLocale(lang);
    if (getLocale() === lang) return;
  }

  document.body.classList.toggle('is-embed', embed && parts.length >= 2);

  if (parts.length === 0) {
    renderHome(mainEl);
  } else if (parts[0] === 'about') {
    renderAbout(mainEl);
  } else if (parts.length === 1) {
    renderSubject(mainEl, parts[0]);
  } else {
    await renderSim(mainEl, parts[0], parts[1], { query, embed });
  }
}
