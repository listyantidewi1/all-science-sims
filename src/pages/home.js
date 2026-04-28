import { t, tr } from '../i18n/index.js';
import { SUBJECTS } from '../catalog/subjects.js';
import { simsBySubject, findSim } from '../catalog/index.js';
import { simCard } from '../components/sim-card.js';

// Hand-picked featured sims — one per subject, chosen for immediate visual interest.
const FEATURED_IDS = [
  'physics/electric-field',
  'chemistry/titration',
  'biology/dna-transcription',
  'earth-space/moon-phases',
  'computer-science/logic-gates',
  'data-science/bayes-theorem',
  'social-science/schelling-segregation',
];

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

  // Featured sims — a curated handful, one per subject. Pick a subject card above
  // (or use the nav) to browse the full catalog.
  const fTitle = document.createElement('div');
  fTitle.className = 'section-title';
  fTitle.innerHTML = `<h2>${t('home.featured')}</h2><small>${t('home.featuredHint')}</small>`;
  main.appendChild(fTitle);

  const fGrid = document.createElement('div');
  fGrid.className = 'grid';
  for (const key of FEATURED_IDS) {
    const [subj, id] = key.split('/');
    const sim = findSim(subj, id);
    if (sim) fGrid.appendChild(simCard(sim));
  }
  main.appendChild(fGrid);
}
