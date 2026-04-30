import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const ENZYMES = {
  pepsin:    { name: 'Pepsin (stomach)',         optT: 37, sigT: 8,  optPH: 2.0, sigPH: 1.0, color: '#ef4444' },
  trypsin:   { name: 'Trypsin (small intestine)',optT: 37, sigT: 8,  optPH: 8.0, sigPH: 1.0, color: '#3b82f6' },
  amylase:   { name: 'Salivary amylase',         optT: 37, sigT: 7,  optPH: 7.0, sigPH: 0.8, color: '#10b981' },
  catalase:  { name: 'Catalase (liver)',         optT: 37, sigT: 8,  optPH: 7.4, sigPH: 0.6, color: '#f59e0b' },
};

function activity(enz, T, pH, denatured = false, inhibitor = 0) {
  if (denatured) return 0;
  const tFactor = Math.exp(-Math.pow((T - enz.optT) / enz.sigT, 2));
  const pFactor = Math.exp(-Math.pow((pH - enz.optPH) / enz.sigPH, 2));
  // sharp drop above 60 °C (denaturation) regardless of optimum
  const denat = T > 55 ? Math.max(0, 1 - (T - 55) / 10) : 1;
  return tFactor * pFactor * denat * (1 - inhibitor);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Charts populated each frame so hover/drag can hit-test against them.
  const charts = { T: null, pH: null };

  const params = {
    enzyme: 'pepsin',
    T: 37, pH: 7.0,
    inhibitor: 0,
    compareAll: true,
  };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const halfW = W / 2;

    // Temperature curve
    charts.T = { x: 30, y: 30, w: halfW - 50, h: H - 60, min: 0, max: 100 };
    drawCurve(ctx, 30, 30, halfW - 50, H - 60, 'T (°C)', 0, 100, params.T,
      (T) => activity(ENZYMES[params.enzyme], T, params.pH, false, params.inhibitor),
      (enz, T) => activity(enz, T, params.pH, false, params.inhibitor));

    // pH curve
    charts.pH = { x: halfW + 20, y: 30, w: halfW - 50, h: H - 60, min: 0, max: 14 };
    drawCurve(ctx, halfW + 20, 30, halfW - 50, H - 60, 'pH', 0, 14, params.pH,
      (pH) => activity(ENZYMES[params.enzyme], params.T, pH, false, params.inhibitor),
      (enz, pH) => activity(enz, params.T, pH, false, params.inhibitor));

    const probe = hover.get();
    if (probe) {
      const c = probe.kind === 'T' ? charts.T : charts.pH;
      drawCrosshair(ctx, probe, { bounds: c, color: '#fbbf24', label: probe.label });
    }

    // Big readout
    const act = activity(ENZYMES[params.enzyme], params.T, params.pH, false, params.inhibitor);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 220, 38);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`${ENZYMES[params.enzyme].name}: ${(act * 100).toFixed(0)}%`, 16, 30);
  }

  function drawCurve(ctx, x, y, w, h, axisLabel, min, max, current, fnSelected, fnAll) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    const x2 = (v) => x + ((v - min) / (max - min)) * w;
    const y2 = (act) => y + h - act * (h - 10) - 4;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 0; i <= 4; i++) {
      const yy = y + (h / 4) * i;
      ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke();
    }

    // each enzyme
    if (params.compareAll) {
      for (const [k, enz] of Object.entries(ENZYMES)) {
        if (k === params.enzyme) continue;
        ctx.strokeStyle = enz.color + '55';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const v = min + (i / 100) * (max - min);
          const a = fnAll(enz, v);
          const sx = x2(v), sy = y2(a);
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
    }
    const sel = ENZYMES[params.enzyme];
    ctx.strokeStyle = sel.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const v = min + (i / 100) * (max - min);
      const a = fnSelected(v);
      const sx = x2(v), sy = y2(a);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // marker
    const mx = x2(current);
    const my = y2(fnSelected(current));
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(mx, my, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = sel.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // axis label
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(axisLabel, x + w / 2 - 12, y + h + 16);
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`${current.toFixed(axisLabel === 'pH' ? 1 : 0)}`, mx + 8, my - 6);
  }

  // controls
  const enzSel = select({
    label: 'Enzyme',
    options: Object.entries(ENZYMES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.enzyme,
    onChange: (v) => { params.enzyme = v; },
  });
  const tS = slider({
    label: 'Temperature (°C)', min: 0, max: 100, step: 1, value: params.T,
    onInput: (v) => { params.T = v; },
  });
  const pS = slider({
    label: 'pH', min: 0, max: 14, step: 0.1, value: params.pH, format: (v) => v.toFixed(1),
    onInput: (v) => { params.pH = v; },
  });
  const inhS = slider({
    label: 'Inhibitor strength', min: 0, max: 1, step: 0.01, value: params.inhibitor, format: (v) => v.toFixed(2),
    onInput: (v) => { params.inhibitor = v; },
  });
  const cmpT = toggle({ label: 'Compare other enzymes', value: params.compareAll, onChange: (v) => { params.compareAll = v; } });

  ctrlPanel.append(enzSel.el, tS.el, pS.el, inhS.el, cmpT.el);

  // Lab — find optimum T and pH for each enzyme.
  const lab = labPanel({
    title: 'Enzyme activity lab — find the optimum',
    filename: 'enzyme-activity-lab.csv',
    columns: [
      { key: 'enzyme', label: 'enzyme' },
      { key: 'T',      label: 'T (°C)',  format: (v) => v.toFixed(0) },
      { key: 'pH',     label: 'pH',      format: (v) => v.toFixed(1) },
      { key: 'inh',    label: 'inhibitor', format: (v) => v.toFixed(2) },
      { key: 'rate',   label: 'activity (%)', format: (v) => (v * 100).toFixed(1) },
    ],
    procedure: [
      'Pick pepsin. Hold pH = 2 (its optimum). Sweep T from 0 → 70 °C in 10° steps; record each.',
      'Same enzyme. Hold T = 37 °C. Sweep pH from 0 → 14 in steps of 1; record each.',
      'Find the (T, pH) combo with maximum activity — that\'s the optimum.',
      'Switch to trypsin (intestinal, pH ≈ 8). Repeat the pH sweep.',
      'Crank inhibitor up at the optimum — does activity drop linearly?',
    ],
    predict: 'Pepsin works in the stomach, trypsin in the intestine. Predict their pH optima before measuring.',
    source: () => ({
      enzyme: ENZYMES[params.enzyme].name,
      T: params.T,
      pH: params.pH,
      inh: params.inhibitor,
      rate: activity(ENZYMES[params.enzyme], params.T, params.pH, false, params.inhibitor),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  function chartHit(sx, sy) {
    if (charts.T && sx >= charts.T.x && sx <= charts.T.x + charts.T.w &&
        sy >= charts.T.y && sy <= charts.T.y + charts.T.h) return 'T';
    if (charts.pH && sx >= charts.pH.x && sx <= charts.pH.x + charts.pH.w &&
        sy >= charts.pH.y && sy <= charts.pH.y + charts.pH.h) return 'pH';
    return null;
  }
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    const k = chartHit(sx, sy);
    if (!k) return null;
    const c = charts[k];
    const v = c.min + ((sx - c.x) / c.w) * (c.max - c.min);
    const a = k === 'T'
      ? activity(ENZYMES[params.enzyme], v, params.pH, false, params.inhibitor)
      : activity(ENZYMES[params.enzyme], params.T, v, false, params.inhibitor);
    return {
      kind: k,
      x: sx,
      y: c.y + c.h - a * (c.h - 10) - 4,
      label: [k === 'T' ? `T = ${v.toFixed(0)} °C` : `pH = ${v.toFixed(1)}`, `activity = ${(a * 100).toFixed(0)}%`],
    };
  });
  const drag = dragHandle(cv.canvas, {
    hitTest: (sx, sy) => chartHit(sx, sy),
    onDrag(id, sx) {
      const c = charts[id];
      const v = c.min + ((sx - c.x) / c.w) * (c.max - c.min);
      if (id === 'T') { params.T = Math.max(0, Math.min(100, v)); tS.value = params.T; }
      else { params.pH = Math.max(0, Math.min(14, v)); pS.value = params.pH; }
    },
    cursor: 'crosshair',
    hoverCursor: 'ew-resize',
  });

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
