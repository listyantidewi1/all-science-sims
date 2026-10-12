import { t, tr } from '../i18n/index.js';
import { LEVELS, getLevelFilter, setLevelFilter, onLevelFilterChange } from '../lib/levels.js';

/**
 * Row of chips: All · Primary · Middle · High · University.
 * `counts` (optional) maps level id → number of sims, shown in each chip.
 * Returns { el, destroy }.
 */
export function levelFilter({ counts = null } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'chips';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', t('level.filterLabel'));

  const options = [{ id: 'all', name: null }, ...LEVELS];
  const buttons = new Map();
  for (const opt of options) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.level = opt.id;
    const label = opt.id === 'all' ? t('level.all') : tr(opt.name);
    const hint = opt.id === 'all' ? '' : `<span class="chip__hint">${tr(opt.hint)}</span>`;
    const n = counts && opt.id !== 'all' ? counts[opt.id] : null;
    b.innerHTML = `<span>${label}</span>${hint}${n != null ? `<span class="chip__count">${n}</span>` : ''}`;
    b.title = opt.id === 'all' ? '' : tr(opt.hint);
    b.addEventListener('click', () => setLevelFilter(opt.id));
    buttons.set(opt.id, b);
    wrap.appendChild(b);
  }

  const sync = (current = getLevelFilter()) => {
    for (const [id, b] of buttons) {
      const on = id === current;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    }
  };
  sync();
  const off = onLevelFilterChange(sync);
  return { el: wrap, destroy: off };
}
