import { t, tr } from '../i18n/index.js';
import { SUBJECTS } from '../catalog/subjects.js';
import { SIMS, simsBySubject } from '../catalog/index.js';
import { simCard } from '../components/sim-card.js';

export function renderHome(main) {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <h1>${t('site.title')}</h1>
    <p>${t('site.tagline')}</p>
  `;
  main.appendChild(hero);

  const titleRow = document.createElement('div');
  titleRow.className = 'section-title';
  titleRow.innerHTML = `<h2>${t('home.subjects')}</h2><small>${t('home.subjectsHint')}</small>`;
  main.appendChild(titleRow);

  const grid = document.createElement('div');
  grid.className = 'grid';
  for (const s of SUBJECTS) {
    const a = document.createElement('a');
    a.className = 'subject-card';
    a.href = `#/${s.id}`;
    a.dataset.subject = s.id;
    a.style.setProperty('--accent', `var(--subj-${s.id})`);
    const count = simsBySubject(s.id).length;
    a.innerHTML = `
      <span class="icon" aria-hidden="true">${s.icon}</span>
      <h3>${tr(s.name)}</h3>
      <p>${tr(s.description)}</p>
      <p style="margin-top:8px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:var(--accent)">
        ${t('subject.simsCount', { n: count })}
      </p>
    `;
    grid.appendChild(a);
  }
  main.appendChild(grid);

  // Featured sims (all of them, since v1 has just 7)
  const fTitle = document.createElement('div');
  fTitle.className = 'section-title';
  fTitle.innerHTML = `<h2>${t('home.featured')}</h2>`;
  main.appendChild(fTitle);

  const fGrid = document.createElement('div');
  fGrid.className = 'grid';
  for (const sim of SIMS) fGrid.appendChild(simCard(sim));
  main.appendChild(fGrid);
}
