import { t, tr } from '../i18n/index.js';
import { findSim } from '../catalog/index.js';
import { buildSimShell, buildEmbedShell } from '../components/sim-shell.js';
import { resetParams, applyParams } from '../lib/params.js';

let currentCleanup = null;

/**
 * Render a sim page. Returns a cleanup fn the router can call on navigation away.
 *
 * Sims do NOT auto-run — we render a Start gate over the stage and only call
 * mount() after the user clicks. Keeps tabs quiet, gives users a clear opt-in,
 * and is friendlier to reduced-motion preferences. `?autostart=1` skips the gate.
 *
 * `query` (URLSearchParams) carries deep-link presets: after mount, every
 * registered control whose key appears in the query is set to that value.
 * `embed` renders the stage only (no header, aside, or breadcrumbs).
 */
export async function renderSim(main, subjectId, simId, { query = new URLSearchParams(), embed = false } = {}) {
  const sim = findSim(subjectId, simId);
  if (!sim) {
    main.innerHTML = `<p style="padding:48px 0;text-align:center;color:var(--color-muted)">${t('sim.notFound')}</p>`;
    return () => {};
  }

  const { root, stageEl } = embed ? buildEmbedShell(sim, query) : buildSimShell(sim, query);
  main.appendChild(root);

  const gate = document.createElement('div');
  gate.className = 'sim-start';
  gate.innerHTML = `
    <button type="button" class="sim-start__btn" aria-label="${t('sim.start')}">
      <span class="sim-start__icon" aria-hidden="true">▶</span>
    </button>
    <div class="sim-start__title">${tr(sim.title)}</div>
    <div class="sim-start__hint">${embed ? t('embed.startHint') : t('sim.startHint')}</div>
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
        resetParams();
        const r = mod.mount(stageEl, { params: query, embed });
        if (typeof r === 'function') cleanup = r;
        applyParams(query);
        stageEl.dispatchEvent(new CustomEvent('sim:started', { bubbles: true }));
      }
    } catch (err) {
      console.error('Sim failed to load:', err);
      stageEl.innerHTML = `<p style="padding:24px;color:var(--color-danger)">Failed to load this simulation.</p>`;
    }
  };
  gate.querySelector('.sim-start__btn').addEventListener('click', start);

  const auto = query.get('autostart');
  if (auto === '1' || auto === 'true') start();

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
