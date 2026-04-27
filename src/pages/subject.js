import { t, tr } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';
import { simsBySubject } from '../catalog/index.js';
import { simCard } from '../components/sim-card.js';

export function renderSubject(main, subjectId) {
  const subj = SUBJECT_BY_ID[subjectId];
  if (!subj) {
    main.innerHTML = `<p style="padding:48px 0;text-align:center;color:var(--color-muted)">${t('subject.notFound')}</p>`;
    return;
  }

  const sims = simsBySubject(subjectId);

  const crumbs = document.createElement('nav');
  crumbs.className = 'crumbs';
  crumbs.innerHTML = `<a href="#/">${t('nav.home')}</a><span>›</span><span>${tr(subj.name)}</span>`;
  main.appendChild(crumbs);

  const heading = document.createElement('section');
  heading.style.padding = 'var(--space-5) 0 var(--space-4)';
  heading.style.setProperty('--accent', `var(--subj-${subj.id})`);
  heading.innerHTML = `
    <h1 style="display:flex;align-items:center;gap:12px">
      <span style="font-size:36px;line-height:1" aria-hidden="true">${subj.icon}</span>
      <span style="background:linear-gradient(135deg,var(--accent),var(--color-fg));-webkit-background-clip:text;background-clip:text;color:transparent">${tr(subj.name)}</span>
    </h1>
    <p style="color:var(--color-muted);max-width:60ch">${tr(subj.description)}</p>
  `;
  main.appendChild(heading);

  const titleRow = document.createElement('div');
  titleRow.className = 'section-title';
  titleRow.innerHTML = `<h2>${t('subject.simsCount', { n: sims.length })}</h2>`;
  main.appendChild(titleRow);

  const grid = document.createElement('div');
  grid.className = 'grid';
  if (sims.length === 0) {
    grid.innerHTML = `<p style="color:var(--color-muted)">—</p>`;
  } else {
    for (const sim of sims) grid.appendChild(simCard(sim));
  }
  main.appendChild(grid);
}
