import { t } from '../i18n/index.js';
import { findSim } from '../catalog/index.js';
import { buildSimShell } from '../components/sim-shell.js';

let currentCleanup = null;

/**
 * Render a sim page. Returns a cleanup fn the router can call on navigation away.
 */
export async function renderSim(main, subjectId, simId) {
  const sim = findSim(subjectId, simId);
  if (!sim) {
    main.innerHTML = `<p style="padding:48px 0;text-align:center;color:var(--color-muted)">${t('sim.notFound')}</p>`;
    return () => {};
  }

  const { root, stageEl } = buildSimShell(sim);
  main.appendChild(root);

  let cleanup = () => {};
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

  currentCleanup = cleanup;
  return cleanup;
}

export function disposeCurrentSim() {
  if (currentCleanup) {
    try { currentCleanup(); } catch (e) { console.error(e); }
    currentCleanup = null;
  }
}
