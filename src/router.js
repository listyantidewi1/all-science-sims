import { renderHome } from './pages/home.js';
import { renderSubject } from './pages/subject.js';
import { renderSim, disposeCurrentSim } from './pages/sim.js';
import { renderAbout } from './pages/about.js';

function parseHash() {
  const raw = (location.hash || '#/').replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  return parts;
}

export async function renderRoute(mainEl) {
  disposeCurrentSim();
  mainEl.innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'instant' });

  const parts = parseHash();
  if (parts.length === 0) {
    renderHome(mainEl);
  } else if (parts[0] === 'about') {
    renderAbout(mainEl);
  } else if (parts.length === 1) {
    renderSubject(mainEl, parts[0]);
  } else if (parts.length >= 2) {
    await renderSim(mainEl, parts[0], parts[1]);
  } else {
    renderHome(mainEl);
  }
}
