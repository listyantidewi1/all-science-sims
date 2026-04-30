import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Lotka-Volterra:
//   dx/dt = α x − β x y     (prey)
//   dy/dt = δ x y − γ y     (predator)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { alpha: 1.0, beta: 0.4, delta: 0.2, gamma: 0.6, dt: 0.01 };
  let prey = 10, pred = 5, t = 0;
  let history = [];

  function reset() { prey = 10; pred = 5; t = 0; history = []; }

  function step(realDt) {
    const sub = 30; // sub-steps per frame for stability
    for (let s = 0; s < sub; s++) {
      const dx = params.alpha * prey - params.beta * prey * pred;
      const dy = params.delta * prey * pred - params.gamma * pred;
      prey += dx * params.dt;
      pred += dy * params.dt;
      if (prey < 0) prey = 0;
      if (pred < 0) pred = 0;
      t += params.dt;
    }
    history.push({ t, prey, pred });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const gW = W / 2 - 30, gH = H - 60;

    // Time series (left)
    drawSeries(ctx, 20, 30, gW, gH);
    // Phase plot (right)
    drawPhase(ctx, W / 2 + 10, 30, gW, gH);

    // header
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`prey = ${prey.toFixed(2)}    predator = ${pred.toFixed(2)}    t = ${t.toFixed(1)}`, 20, 22);
  }

  function drawSeries(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const tMin = history[0].t;
    const tMax = history[history.length - 1].t || 1;
    const max = Math.max(...history.map((p) => Math.max(p.prey, p.pred)), 5);
    const x2 = (tt) => x + ((tt - tMin) / (tMax - tMin || 1)) * w;
    const y2 = (v)  => y + h - (v / max) * (h - 8);
    // prey
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(p.t), y2(p.prey)) : ctx.lineTo(x2(p.t), y2(p.prey)));
    ctx.stroke();
    // predator
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(p.t), y2(p.pred)) : ctx.lineTo(x2(p.t), y2(p.pred)));
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('prey', x + 8, y + 16);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('predator', x + 8, y + 32);
  }

  function drawPhase(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const xMax = Math.max(...history.map((p) => p.prey), 5);
    const yMax = Math.max(...history.map((p) => p.pred), 5);
    const x2 = (v) => x + (v / xMax) * (w - 20) + 10;
    const y2 = (v) => y + h - (v / yMax) * (h - 20) - 10;
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    history.forEach((p, i) => i === 0 ? ctx.moveTo(x2(p.prey), y2(p.pred)) : ctx.lineTo(x2(p.prey), y2(p.pred)));
    ctx.stroke();
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(x2(prey), y2(pred), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('predator', x + 4, y + 14);
    ctx.fillText('prey →', x + w - 50, y + h - 6);
  }

  // controls
  const aS = slider({ label: 'α prey birth', min: 0, max: 3, step: 0.05, value: params.alpha, format: (v) => v.toFixed(2),
    onInput: (v) => { params.alpha = v; } });
  const bS = slider({ label: 'β predation rate', min: 0, max: 2, step: 0.02, value: params.beta, format: (v) => v.toFixed(2),
    onInput: (v) => { params.beta = v; } });
  const dS = slider({ label: 'δ predator gain', min: 0, max: 1, step: 0.01, value: params.delta, format: (v) => v.toFixed(2),
    onInput: (v) => { params.delta = v; } });
  const gS = slider({ label: 'γ predator death', min: 0, max: 2, step: 0.02, value: params.gamma, format: (v) => v.toFixed(2),
    onInput: (v) => { params.gamma = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(aS.el, bS.el, dS.el, gS.el, row(resetB));

  // Lab — Lotka-Volterra cycles.
  const lab = labPanel({
    title: 'Lotka-Volterra lab — predator-prey cycles',
    filename: 'population-dynamics-lab.csv',
    columns: [
      { key: 'alpha', label: 'α (prey growth)', format: (v) => v.toFixed(2) },
      { key: 'beta',  label: 'β (predation)',   format: (v) => v.toFixed(2) },
      { key: 'delta', label: 'δ (pred. growth)', format: (v) => v.toFixed(2) },
      { key: 'gamma', label: 'γ (pred. death)',  format: (v) => v.toFixed(2) },
      { key: 't',     label: 't',                format: (v) => v.toFixed(1) },
      { key: 'prey',  label: 'prey',             format: (v) => v.toFixed(2) },
      { key: 'pred',  label: 'predators',        format: (v) => v.toFixed(2) },
      { key: 'eqPrey', label: 'equilibrium prey', format: (v) => v.toFixed(2) },
      { key: 'eqPred', label: 'equilibrium pred.', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Reset. Watch the cycles. Record at the first peak and trough.',
      'Compute equilibrium: x* = γ/δ, y* = α/β.',
      'Verify the populations cycle around (x*, y*) but never exactly settle there.',
      'Increase α (faster prey growth) — equilibrium predator population rises.',
      'Decrease γ (longer predator lifespan) — equilibrium prey falls. The wolves can sustain themselves better.',
    ],
    predict: 'If you wipe out predators (γ → ∞), what happens to prey? If prey die out (β → ∞), to predators?',
    source: () => ({
      alpha: params.alpha,
      beta: params.beta,
      delta: params.delta,
      gamma: params.gamma,
      t,
      prey, pred,
      eqPrey: params.gamma / params.delta,
      eqPred: params.alpha / params.beta,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
