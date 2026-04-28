import { t, tr, getLocale } from '../i18n/index.js';
import { SUBJECTS, SUBJECT_BY_ID } from '../catalog/subjects.js';
import { SIMS, simsBySubject, findSim } from '../catalog/index.js';
import { simCard } from '../components/sim-card.js';
import { getFavorites, onFavoritesChange } from '../lib/store.js';

const FEATURED_IDS = [
  'physics/electric-field',
  'chemistry/titration',
  'biology/dna-transcription',
  'earth-space/moon-phases',
  'computer-science/logic-gates',
  'data-science/bayes-theorem',
  'social-science/schelling-segregation',
];

function matchSim(sim, q) {
  const hay = [
    tr(sim.title), tr(sim.description),
    sim.title.en, sim.title.id,
    sim.id,
    tr(SUBJECT_BY_ID[sim.subject].name),
    ...(sim.topics || []),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

export function renderHome(main) {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML = `
    <h1>${t('site.title')}</h1>
    <p>${t('site.tagline')}</p>
  `;
  main.appendChild(hero);

  // Search bar — searches across the whole catalog.
  const searchWrap = document.createElement('div');
  searchWrap.className = 'search';
  searchWrap.innerHTML = `
    <input type="search" class="search__input" placeholder="${t('search.placeholder')}"
      aria-label="${t('search.placeholder')}" autocomplete="off" />
    <span class="search__count" aria-live="polite"></span>
  `;
  main.appendChild(searchWrap);
  const searchInput = searchWrap.querySelector('input');
  const searchCount = searchWrap.querySelector('.search__count');

  // Containers
  const resultsTitle = document.createElement('div');
  resultsTitle.className = 'section-title';
  resultsTitle.style.display = 'none';
  resultsTitle.innerHTML = `<h2>${t('search.results')}</h2>`;
  main.appendChild(resultsTitle);

  const resultsGrid = document.createElement('div');
  resultsGrid.className = 'grid';
  resultsGrid.style.display = 'none';
  main.appendChild(resultsGrid);

  // Subject grid — hidden when searching.
  const subjTitle = document.createElement('div');
  subjTitle.className = 'section-title';
  subjTitle.innerHTML = `<h2>${t('home.subjects')}</h2><small>${t('home.subjectsHint')}</small>`;
  main.appendChild(subjTitle);

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

  // Favorites section — appears only if any are starred.
  const favTitle = document.createElement('div');
  favTitle.className = 'section-title';
  favTitle.innerHTML = `<h2>${t('home.favorites')}</h2><small>${t('home.favoritesHint')}</small>`;
  const favGrid = document.createElement('div');
  favGrid.className = 'grid';
  main.appendChild(favTitle);
  main.appendChild(favGrid);

  function renderFavorites() {
    const keys = getFavorites();
    const sims = keys.map((k) => {
      const [s, i] = k.split('/');
      return findSim(s, i);
    }).filter(Boolean);
    favGrid.innerHTML = '';
    if (sims.length === 0) {
      favTitle.style.display = 'none';
      favGrid.style.display = 'none';
    } else {
      favTitle.style.display = '';
      favGrid.style.display = '';
      for (const sim of sims) favGrid.appendChild(simCard(sim));
    }
  }
  renderFavorites();
  const offFav = onFavoritesChange(renderFavorites);

  // Featured (curated handful, one per subject).
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

  // Search wiring
  function applySearch() {
    const q = searchInput.value.trim().toLowerCase();
    const browseSections = [subjTitle, grid, favTitle, favGrid, fTitle, fGrid];
    if (!q) {
      resultsTitle.style.display = 'none';
      resultsGrid.style.display = 'none';
      searchCount.textContent = '';
      browseSections.forEach((el) => { el.style.display = ''; });
      renderFavorites();
      return;
    }
    const hits = SIMS.filter((s) => matchSim(s, q));
    resultsGrid.innerHTML = '';
    for (const sim of hits) resultsGrid.appendChild(simCard(sim));
    resultsTitle.style.display = '';
    resultsGrid.style.display = '';
    searchCount.textContent = t('search.matches', { n: hits.length });
    browseSections.forEach((el) => { el.style.display = 'none'; });
  }
  searchInput.addEventListener('input', applySearch);
  // Re-render favorites grid in search mode if user toggles a star
  // (simply re-apply the search to refresh stars on cards).
  const offSearchFav = onFavoritesChange(() => { if (searchInput.value.trim()) applySearch(); });

  // Cleanup when route changes (main is re-rendered, listeners would otherwise leak across navigations).
  // Wire to hashchange — main.js re-renders on route change.
  const cleanup = () => { offFav(); offSearchFav(); window.removeEventListener('hashchange', cleanup); };
  window.addEventListener('hashchange', cleanup, { once: true });

  // Locale-aware rendering: getLocale used implicitly via tr/t — main re-renders on locale change.
  void getLocale;
}
