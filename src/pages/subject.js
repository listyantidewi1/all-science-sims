import { t, tr } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';
import { simsBySubject } from '../catalog/index.js';
import { simCard } from '../components/sim-card.js';

function matchSim(sim, q) {
  const hay = [
    tr(sim.title), tr(sim.description),
    sim.title.en, sim.title.id,
    sim.id,
    ...(sim.topics || []),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}

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

  // Search bar — filters within this subject.
  const searchWrap = document.createElement('div');
  searchWrap.className = 'search';
  searchWrap.innerHTML = `
    <input type="search" class="search__input" placeholder="${t('search.placeholderSubject')}"
      aria-label="${t('search.placeholderSubject')}" autocomplete="off" />
    <span class="search__count" aria-live="polite"></span>
  `;
  main.appendChild(searchWrap);
  const searchInput = searchWrap.querySelector('input');
  const searchCount = searchWrap.querySelector('.search__count');

  const titleRow = document.createElement('div');
  titleRow.className = 'section-title';
  titleRow.innerHTML = `<h2>${t('subject.simsCount', { n: sims.length })}</h2>`;
  main.appendChild(titleRow);

  const grid = document.createElement('div');
  grid.className = 'grid';
  main.appendChild(grid);

  function render(filtered) {
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = `<p style="color:var(--color-muted)">—</p>`;
      return;
    }
    for (const sim of filtered) grid.appendChild(simCard(sim));
  }
  render(sims);

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      titleRow.querySelector('h2').textContent = t('subject.simsCount', { n: sims.length });
      searchCount.textContent = '';
      render(sims);
      return;
    }
    const hits = sims.filter((s) => matchSim(s, q));
    titleRow.querySelector('h2').textContent = t('subject.simsCount', { n: hits.length });
    searchCount.textContent = t('search.matches', { n: hits.length });
    render(hits);
  });
}
