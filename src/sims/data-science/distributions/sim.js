import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

function gaussian() {
  // Box-Muller
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    dist: 'normal',  // normal | uniform | exponential | binomial
    n: 1000,
    p1: 0,           // mean for normal, low for uniform, lambda for exp, p for binomial
    p2: 1,           // sigma for normal, high for uniform, n for binomial (ignored exp)
    bins: 40,
  };

  let samples = [];

  function sample() {
    samples = [];
    for (let i = 0; i < params.n; i++) samples.push(drawOne());
  }

  function drawOne() {
    if (params.dist === 'normal') return params.p1 + gaussian() * params.p2;
    if (params.dist === 'uniform') return params.p1 + Math.random() * (params.p2 - params.p1);
    if (params.dist === 'exponential') {
      const lam = Math.max(0.01, params.p1);
      return -Math.log(1 - Math.random()) / lam;
    }
    if (params.dist === 'binomial') {
      const trials = Math.round(Math.max(1, params.p2));
      const p = Math.max(0, Math.min(1, params.p1));
      let k = 0;
      for (let i = 0; i < trials; i++) if (Math.random() < p) k++;
      return k;
    }
    return 0;
  }

  function pdf(x) {
    if (params.dist === 'normal') {
      const s = params.p2;
      return Math.exp(-0.5 * ((x - params.p1) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
    }
    if (params.dist === 'uniform') {
      const w = params.p2 - params.p1;
      return x >= params.p1 && x <= params.p2 ? 1 / w : 0;
    }
    if (params.dist === 'exponential') {
      const lam = Math.max(0.01, params.p1);
      return x >= 0 ? lam * Math.exp(-lam * x) : 0;
    }
    if (params.dist === 'binomial') {
      const trials = Math.round(Math.max(1, params.p2));
      const p = Math.max(0, Math.min(1, params.p1));
      const k = Math.round(x);
      if (k < 0 || k > trials) return 0;
      // binomial PMF; we treat it as a "density per unit" of width 1
      let logC = 0;
      for (let i = 0; i < k; i++) logC += Math.log(trials - i) - Math.log(i + 1);
      return Math.exp(logC + k * Math.log(p || 1e-12) + (trials - k) * Math.log(1 - p || 1e-12));
    }
    return 0;
  }

  function range() {
    if (params.dist === 'normal') return [params.p1 - 4 * params.p2, params.p1 + 4 * params.p2];
    if (params.dist === 'uniform') return [params.p1 - 0.1, params.p2 + 0.1];
    if (params.dist === 'exponential') return [0, 5 / Math.max(0.01, params.p1)];
    if (params.dist === 'binomial') return [0, Math.round(params.p2)];
    return [0, 1];
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const padX = 40, padY = 40;
    const [a, b] = range();
    const bins = Math.max(5, params.dist === 'binomial' ? Math.round(params.p2) + 1 : params.bins);
    const binW = (b - a) / bins;
    const counts = new Array(bins).fill(0);
    for (const s of samples) {
      const idx = Math.floor((s - a) / binW);
      if (idx >= 0 && idx < bins) counts[idx]++;
    }
    // density per bin
    const densities = counts.map((c) => c / (samples.length * binW || 1));
    const maxD = Math.max(...densities, ...sampledPdf(a, b)) || 1;

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.beginPath();
    ctx.moveTo(padX, H - padY);
    ctx.lineTo(W - padX, H - padY);
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, H - padY);
    ctx.stroke();

    // bars
    const x2s = (x) => padX + ((x - a) / (b - a)) * (W - padX * 2);
    const y2s = (y) => H - padY - (y / maxD) * (H - padY * 2);
    for (let i = 0; i < bins; i++) {
      const x0 = x2s(a + i * binW);
      const x1 = x2s(a + (i + 1) * binW);
      const y0 = y2s(densities[i]);
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(x0 + 1, y0, Math.max(1, x1 - x0 - 1), H - padY - y0);
    }

    // theoretical PDF
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const samples2 = 200;
    for (let i = 0; i <= samples2; i++) {
      const x = a + (i / samples2) * (b - a);
      const y = pdf(x);
      const sx = x2s(x);
      const sy = y2s(y);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // header
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    let label = '';
    if (params.dist === 'normal')      label = `Normal(μ=${params.p1.toFixed(2)}, σ=${params.p2.toFixed(2)})`;
    if (params.dist === 'uniform')     label = `Uniform(${params.p1.toFixed(2)}, ${params.p2.toFixed(2)})`;
    if (params.dist === 'exponential') label = `Exp(λ=${params.p1.toFixed(2)})`;
    if (params.dist === 'binomial')    label = `Binomial(n=${Math.round(params.p2)}, p=${params.p1.toFixed(2)})`;
    ctx.fillText(`${label}    samples: ${samples.length}`, padX, 24);
  }

  function sampledPdf(a, b) {
    const out = [];
    for (let i = 0; i <= 50; i++) out.push(pdf(a + (i / 50) * (b - a)));
    return out;
  }

  // Controls
  const distSel = select({
    label: 'Distribution',
    options: [
      { value: 'normal', label: 'Normal' },
      { value: 'uniform', label: 'Uniform' },
      { value: 'exponential', label: 'Exponential' },
      { value: 'binomial', label: 'Binomial' },
    ],
    value: params.dist,
    onChange: (v) => { params.dist = v; defaultsForDist(); rebuildParams(); sample(); },
  });

  const p1S = slider({ label: 'Param 1', min: -5, max: 10, step: 0.05, value: params.p1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.p1 = v; sample(); } });
  const p2S = slider({ label: 'Param 2', min: 0.01, max: 5, step: 0.01, value: params.p2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.p2 = v; sample(); } });
  const nS = slider({ label: 'Sample size', min: 50, max: 50000, step: 50, value: params.n,
    onInput: (v) => { params.n = v; sample(); } });
  const binsS = slider({ label: 'Bins', min: 10, max: 80, step: 1, value: params.bins,
    onInput: (v) => { params.bins = v; } });
  const resampleB = button({ label: 'Resample', primary: true, onClick: sample });

  function defaultsForDist() {
    if (params.dist === 'normal')      { params.p1 = 0;   params.p2 = 1; }
    if (params.dist === 'uniform')     { params.p1 = 0;   params.p2 = 1; }
    if (params.dist === 'exponential') { params.p1 = 1;   params.p2 = 1; }
    if (params.dist === 'binomial')    { params.p1 = 0.5; params.p2 = 20; }
  }
  function rebuildParams() {
    p1S.value = params.p1;
    p2S.value = params.p2;
  }

  ctrlPanel.append(distSel.el, p1S.el, p2S.el, nS.el, binsS.el, row(resampleB));

  sample();
  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
