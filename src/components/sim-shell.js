import { t, tr } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';

/**
 * Wraps a sim with the surrounding chrome: breadcrumbs, stage container,
 * intro / objectives / try-this aside.
 *
 * Returns { root, stageEl, cleanup } — the page calls await manifest.load()
 * then mod.mount(stageEl) and stores its cleanup fn.
 */
export function buildSimShell(sim) {
  const subj = SUBJECT_BY_ID[sim.subject];

  const root = document.createElement('div');
  root.dataset.subject = sim.subject;
  root.style.setProperty('--accent', `var(--subj-${sim.subject})`);

  const crumbs = document.createElement('nav');
  crumbs.className = 'crumbs';
  crumbs.innerHTML = `
    <a href="#/">${t('nav.home')}</a>
    <span>›</span>
    <a href="#/${sim.subject}">${tr(subj.name)}</a>
    <span>›</span>
    <span>${tr(sim.title)}</span>
  `;

  const heading = document.createElement('div');
  heading.style.marginBottom = 'var(--space-4)';
  heading.innerHTML = `<h1 style="margin:0">${tr(sim.title)}</h1>`;

  const grid = document.createElement('div');
  grid.className = 'sim-shell';

  const stageEl = document.createElement('div');
  stageEl.className = 'sim-stage';

  const aside = document.createElement('aside');
  aside.className = 'sim-aside';

  const intro = document.createElement('div');
  intro.innerHTML = `
    <h3>${t('sim.about')}</h3>
    <p>${tr(sim.description)}</p>
  `;
  aside.appendChild(intro);

  if (sim.objectives) {
    const objectives = tr(sim.objectives);
    const objList = Array.isArray(objectives) ? objectives : [];
    if (objList.length) {
      const obj = document.createElement('div');
      obj.innerHTML = `
        <h3>${t('sim.objectives')}</h3>
        <ul>${objList.map((o) => `<li>${o}</li>`).join('')}</ul>
      `;
      aside.appendChild(obj);
    }
  }

  if (sim.tryThis) {
    const tryThis = tr(sim.tryThis);
    const tryList = Array.isArray(tryThis) ? tryThis : [];
    if (tryList.length) {
      const tt = document.createElement('div');
      tt.innerHTML = `
        <h3>${t('sim.tryThis')}</h3>
        <ul>${tryList.map((o) => `<li>${o}</li>`).join('')}</ul>
      `;
      aside.appendChild(tt);
    }
  }

  grid.append(stageEl, aside);
  root.append(crumbs, heading, grid);

  return { root, stageEl };
}
