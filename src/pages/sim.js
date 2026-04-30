import { t, tr } from '../i18n/index.js';
import { findSim } from '../catalog/index.js';
import { buildSimShell } from '../components/sim-shell.js';

let currentCleanup = null;

/**
 * Render a sim page. Returns a cleanup fn the router can call on navigation away.
 *
 * Sims do NOT auto-run — we render a Start gate over the stage and only call
 * mount() after the user clicks. Keeps tabs quiet, gives users a clear opt-in,
 * and is friendlier to reduced-motion preferences.
 */
export async function renderSim(main, subjectId, simId) {
  const sim = findSim(subjectId, simId);
  if (!sim) {
    main.innerHTML = `<p style="padding:48px 0;text-align:center;color:var(--color-muted)">${t('sim.notFound')}</p>`;
    return () => {};
  }

  const { root, stageEl } = buildSimShell(sim);
  main.appendChild(root);

  const gate = document.createElement('div');
  gate.className = 'sim-start';
  gate.innerHTML = `
    <button type="button" class="sim-start__btn" aria-label="${t('sim.start')}">
      <span class="sim-start__icon" aria-hidden="true">▶</span>
    </button>
    <div class="sim-start__title">${tr(sim.title)}</div>
    <div class="sim-start__hint">${t('sim.startHint')}</div>
  `;
  stageEl.appendChild(gate);

  let cleanup = () => {};
  let started = false;

  const start = async () => {
    if (started) return;
    started = true;
    gate.remove();
    try {
      const mod = await sim.load();
      if (typeof mod.mount === 'function') {
        const r = mod.mount(stageEl);
        if (typeof r === 'function') cleanup = r;
      }
    } catch (err) {
      console.error('Sim failed to load:', err);
      stageEl.innerHTML = `<p style="padding:24px;color:var(--color-danger)">Failed to load this simulation.</p>`;
    }
  };
  gate.querySelector('.sim-start__btn').addEventListener('click', start);

  const outerCleanup = () => { try { cleanup(); } catch (e) { console.error(e); } };
  currentCleanup = outerCleanup;
  return outerCleanup;
}

export function disposeCurrentSim() {
  if (currentCleanup) {
    try { currentCleanup(); } catch (e) { console.error(e); }
    currentCleanup = null;
  }
}
