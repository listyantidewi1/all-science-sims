import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

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
    drawCurve(ctx, 30, 30, halfW - 50, H - 60, 'T (°C)', 0, 100, params.T,
      (T) => activity(ENZYMES[params.enzyme], T, params.pH, false, params.inhibitor),
      (enz, T) => activity(enz, T, params.pH, false, params.inhibitor));

    // pH curve
    drawCurve(ctx, halfW + 20, 30, halfW - 50, H - 60, 'pH', 0, 14, params.pH,
      (pH) => activity(ENZYMES[params.enzyme], params.T, pH, false, params.inhibitor),
      (enz, pH) => activity(enz, params.T, pH, false, params.inhibitor));

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

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
