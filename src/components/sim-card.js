import { tr, t } from '../i18n/index.js';
import { SUBJECT_BY_ID } from '../catalog/subjects.js';
import { isFavorite, toggleFavorite } from '../lib/store.js';

export function simCard(sim) {
  const a = document.createElement('a');
  a.className = 'sim-card';
  a.href = `#/${sim.subject}/${sim.id}`;
  a.dataset.subject = sim.subject;
  a.style.setProperty('--accent', `var(--subj-${sim.subject})`);
  const subjName = tr(SUBJECT_BY_ID[sim.subject].name);
  const key = `${sim.subject}/${sim.id}`;
  const fav = isFavorite(key);
  a.innerHTML = `
    <span class="sim-card__tag">${subjName}</span>
    <button type="button" class="sim-card__fav${fav ? ' is-on' : ''}"
      aria-label="${t('fav.toggle')}" aria-pressed="${fav}">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.08 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"
          fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      </svg>
    </button>
    <h4>${tr(sim.title)}</h4>
    <p>${tr(sim.description)}</p>
  `;
  const favBtn = a.querySelector('.sim-card__fav');
  favBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const now = toggleFavorite(key);
    favBtn.classList.toggle('is-on', now);
    favBtn.setAttribute('aria-pressed', String(now));
    const path = favBtn.querySelector('path');
    if (path) path.setAttribute('fill', now ? 'currentColor' : 'none');
  });
  return a;
}
