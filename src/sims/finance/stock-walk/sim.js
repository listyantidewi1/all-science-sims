import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

function gaussian() {
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
    S0: 100,
    mu: 0.08,        // annual drift
    sigma: 0.20,     // annual vol
    years: 5,
    nPaths: 30,
  };

  let paths = [];

  function simulate() {
    paths = [];
    const stepsPerYear = 252;
    const steps = params.years * stepsPerYear;
    const dt = 1 / stepsPerYear;
    for (let p = 0; p < params.nPaths; p++) {
      const path = [params.S0];
      let S = params.S0;
      for (let i = 0; i < steps; i++) {
        const z = gaussian();
        S = S * Math.exp((params.mu - 0.5 * params.sigma * params.sigma) * dt + params.sigma * Math.sqrt(dt) * z);
        path.push(S);
      }
      paths.push(path);
    }
  }
  simulate();

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    if (paths.length === 0) return;
    const padX = 50, padY = 40;
    const gW = W - padX - 30, gH = H - padY - 40;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    // find min/max
    let lo = Infinity, hi = -Infinity;
    for (const p of paths) for (const v of p) {
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
    const margin = (hi - lo) * 0.1;
    lo -= margin; hi += margin;

    const x2 = (i, len) => padX + (i / (len - 1)) * gW;
    const y2 = (v) => padY + gH - ((v - lo) / (hi - lo)) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let y = Math.ceil(lo / 50) * 50; y <= hi; y += 50) {
      ctx.beginPath(); ctx.moveTo(padX, y2(y)); ctx.lineTo(padX + gW, y2(y)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`$${y}`, 10, y2(y) + 3);
    }

    // initial level
    ctx.strokeStyle = 'rgba(245,158,11,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(params.S0)); ctx.lineTo(padX + gW, y2(params.S0));
    ctx.stroke();
    ctx.setLineDash([]);

    // paths
    ctx.lineWidth = 1;
    for (let p = 0; p < paths.length; p++) {
      const path = paths[p];
      ctx.strokeStyle = `hsla(${(p * 17) % 360}, 60%, 60%, 0.5)`;
      ctx.beginPath();
      for (let i = 0; i < path.length; i++) {
        const sx = x2(i, path.length), sy = y2(path[i]);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Final values stats
    const finals = paths.map((p) => p[p.length - 1]);
    const mean = finals.reduce((s, v) => s + v, 0) / finals.length;
    const sd = Math.sqrt(finals.reduce((s, v) => s + (v - mean) ** 2, 0) / finals.length);
    const min = Math.min(...finals);
    const max = Math.max(...finals);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Final values across ${paths.length} paths:`, 16, 26);
    ctx.fillText(`mean $${mean.toFixed(0)}    sd $${sd.toFixed(0)}`, 16, 44);
    ctx.fillText(`min $${min.toFixed(0)}    max $${max.toFixed(0)}`, 16, 62);
  }

  // controls
  const muS = slider({ label: 'Drift μ (annual)', min: -0.20, max: 0.30, step: 0.005, value: params.mu, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.mu = v; } });
  const sgS = slider({ label: 'Volatility σ (annual)', min: 0, max: 0.80, step: 0.005, value: params.sigma, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sigma = v; } });
  const yS = slider({ label: 'Years', min: 1, max: 30, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const nS = slider({ label: 'Paths', min: 1, max: 100, step: 1, value: params.nPaths,
    onInput: (v) => { params.nPaths = v; } });
  const reB = button({ label: 'Resimulate', primary: true, onClick: simulate });

  ctrlPanel.append(muS.el, sgS.el, yS.el, nS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
