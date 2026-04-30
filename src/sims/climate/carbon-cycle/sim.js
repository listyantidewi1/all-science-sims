import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { labPanel } from '../../../lib/lab.js';

// Four-box carbon cycle model in GtC.
// Pools: A (atmosphere), Os (ocean surface), Od (deep ocean), L (land biosphere).
// Linear exchange flux from i to j: k_ij * Pool_i.
// Pre-industrial values approx (Sarmiento & Gruber-style): A0=600, Os0=900, Od0=37000, L0=2300.
// Anthropogenic emissions injected into A.

const POOLS = ['atmosphere', 'ocean-surface', 'deep-ocean', 'land'];
const POOL_LABELS = { atmosphere: 'Atmosphere', 'ocean-surface': 'Surface ocean', 'deep-ocean': 'Deep ocean', land: 'Land biosphere' };
const COLORS = { atmosphere: '#fbbf24', 'ocean-surface': '#0ea5e9', 'deep-ocean': '#1e3a8a', land: '#10b981' };

// Rate constants in 1/yr (chosen so equilibrium values roughly match observed pools).
// k_AOs (atmosphere → surface), k_OsA (back), etc.
const k = {
  AOs: 0.10, OsA: 0.067,
  OsOd: 0.005, OdOs: 0.000122,
  AL: 0.10, LA: 0.026,
};

// Equilibrium check (with these rates the system has a steady state we use as initial).
function equilibrium() {
  return { atmosphere: 600, 'ocean-surface': 900, 'deep-ocean': 37000, land: 2300 };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    emit: 10,         // GtC/yr human emissions to atmosphere
    speed: 4,         // years simulated per real second
    showAll: true,
  };

  let state = equilibrium();
  let t = 0;
  let history = []; // {t, pools{...}}
  let chartRect = null;

  function reset() {
    state = equilibrium();
    t = 0;
    history = [{ t: 0, pools: { ...state } }];
  }
  reset();

  function step(dt) {
    // Sub-step for stability
    const years = dt * params.speed;
    const sub = 0.05;
    let remaining = Math.min(2, years);
    while (remaining > 0) {
      const h = Math.min(sub, remaining);
      const A = state.atmosphere;
      const Os = state['ocean-surface'];
      const Od = state['deep-ocean'];
      const L = state.land;

      const fAOs = k.AOs * A - k.OsA * Os;
      const fOsOd = k.OsOd * Os - k.OdOs * Od;
      const fAL = k.AL * A - k.LA * L;

      state.atmosphere       += h * (-fAOs - fAL + params.emit);
      state['ocean-surface'] += h * ( fAOs - fOsOd);
      state['deep-ocean']    += h * ( fOsOd);
      state.land             += h * ( fAL);

      t += h;
      remaining -= h;
    }
    history.push({ t, pools: { ...state } });
    if (history.length > 4000) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Top: pool reservoirs as bars
    const topH = H * 0.42;
    const padX = 30;
    const slotW = (W - padX * 2) / POOLS.length;
    const eq = equilibrium();
    for (let i = 0; i < POOLS.length; i++) {
      const k = POOLS[i];
      const x = padX + i * slotW + 8;
      const wid = slotW - 16;
      const yTop = 30, yBot = topH - 30;
      const h = yBot - yTop;
      const v = state[k];
      const ratio = v / eq[k];
      // bar
      const barH = Math.min(1.6, ratio) * h * 0.6;
      ctx.fillStyle = COLORS[k];
      ctx.globalAlpha = 0.75;
      ctx.fillRect(x, yBot - barH, wid, barH);
      ctx.globalAlpha = 1;
      // baseline (equilibrium)
      const baseY = yBot - h * 0.6;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, baseY); ctx.lineTo(x + wid, baseY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(POOL_LABELS[k], x, yTop + 14);
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`${v.toFixed(0)} GtC`, x, yTop + 30);
      ctx.fillStyle = ratio > 1 ? '#ef4444' : '#10b981';
      const delta = v - eq[k];
      ctx.fillText(`${delta >= 0 ? '+' : ''}${delta.toFixed(0)} vs preindustrial`, x, yTop + 46);
    }

    // Bottom: history line chart of fractional anomaly
    const cx = padX, cy = topH + 30, cw = W - padX * 2, ch = H - topH - 80;
    chartRect = { x: cx, y: cy, w: cw, h: ch };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(cx, cy, cw, ch);

    const tWindow = 100;
    const tNow = history.length ? history[history.length - 1].t : 0;
    const t0 = Math.max(0, tNow - tWindow);
    const x2 = (tt) => cx + ((tt - t0) / tWindow) * cw;
    const y2 = (anom) => cy + ch - ((anom + 0.2) / 1.4) * ch; // anomaly range -0.2..1.2

    // zero line
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, y2(0)); ctx.lineTo(cx + cw, y2(0));
    ctx.stroke();
    ctx.setLineDash([]);

    for (const k of POOLS) {
      ctx.strokeStyle = COLORS[k];
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (const h of history) {
        if (h.t < t0) continue;
        const anom = (h.pools[k] - eq[k]) / eq[k];
        const sx = x2(h.t), sy = y2(anom);
        if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(cx + 8, cy + 8, 220, 70);
    let yy = cy + 22;
    for (const k of POOLS) {
      ctx.fillStyle = COLORS[k];
      ctx.fillRect(cx + 16, yy - 8, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(POOL_LABELS[k], cx + 34, yy - 2);
      yy += 16;
    }

    // labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`Year ${tNow.toFixed(0)} since start (${tWindow}-year window)`, cx + cw - 200, cy - 4);
    ctx.fillText('Fractional anomaly vs preindustrial →', cx + 6, cy - 4);

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    if (history.length < 2) return null;
    const tNow = history[history.length - 1].t;
    const t0 = Math.max(0, tNow - 100);
    const tt = t0 + ((sx - x) / w) * 100;
    let lo = 0, hi = history.length - 1;
    while (lo < hi - 1) { const m = (lo + hi) >> 1; if (history[m].t <= tt) lo = m; else hi = m; }
    const eq = equilibrium();
    const lines = [`year ${tt.toFixed(1)}`];
    for (const k of POOLS) {
      const v = history[lo].pools[k];
      const a = (v - eq[k]) / eq[k] * 100;
      lines.push(`${POOL_LABELS[k]}: ${v.toFixed(0)} GtC (${a >= 0 ? '+' : ''}${a.toFixed(1)}%)`);
    }
    return { x: sx, y: sy, label: lines };
  });

  // controls
  const eS = slider({ label: 'Emissions (GtC/yr)', min: 0, max: 20, step: 0.1, value: params.emit, format: (v) => v.toFixed(1),
    onInput: (v) => { params.emit = v; } });
  const spS = slider({ label: 'Sim speed (years/sec)', min: 1, max: 20, step: 0.5, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, e] of [['Pre-industrial (0)', 0], ['Today (~10)', 10], ['Crisis (15)', 15], ['Net zero (0)', 0]]) {
    const b = button({ label: name, onClick: () => { params.emit = e; eS.value = e; } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(eS.el, spS.el, presetRow, row(resetB));

  // Lab — track pool sizes over emission scenarios.
  const lab = labPanel({
    title: 'Carbon cycle lab — where does emitted CO₂ go?',
    filename: 'carbon-cycle-lab.csv',
    columns: [
      { key: 't',     label: 't (yr)',          format: (v) => v.toFixed(1) },
      { key: 'emit',  label: 'emit (GtC/yr)',   format: (v) => v.toFixed(1) },
      { key: 'A',     label: 'atmosphere (GtC)', format: (v) => v.toFixed(0) },
      { key: 'Os',    label: 'surface ocean',    format: (v) => v.toFixed(0) },
      { key: 'Od',    label: 'deep ocean',       format: (v) => v.toFixed(0) },
      { key: 'L',     label: 'land',             format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Reset. Set emit = 0. After equilibrium, record t = 0 baseline.',
      'Set emit = 10 GtC/yr (today). Let run 50 simulated years; record.',
      'Continue 50 more years; record. Atmosphere grows; ocean lags but absorbs.',
      'Now set emit = 0 (net zero). Atmosphere slowly falls as ocean absorbs.',
      'Compare with emit = 5 (half) — atmosphere stabilizes faster than full zero.',
    ],
    predict: 'If we cut emissions to zero today, will CO₂ in atmosphere stop rising? Drop fast? Drop slow?',
    source: () => ({
      t,
      emit: params.emit,
      A: state.atmosphere,
      Os: state['ocean-surface'],
      Od: state['deep-ocean'],
      L: state.land,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
