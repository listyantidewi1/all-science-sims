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
    total: 12000,
    months: 12,    // DCA duration
    horizon: 24,   // total months tracked
    mu: 0.08,
    sigma: 0.18,
    runs: 200,
  };

  let results = [];

  function simulate() {
    results = [];
    const dt = 1 / 12;
    for (let r = 0; r < params.runs; r++) {
      // generate price path for `horizon` months
      const prices = [100];
      for (let i = 1; i <= params.horizon; i++) {
        const z = gaussian();
        const next = prices[i - 1] * Math.exp((params.mu - 0.5 * params.sigma * params.sigma) * dt + params.sigma * Math.sqrt(dt) * z);
        prices.push(next);
      }
      // Lump sum: buy total at month 0
      const lumpShares = params.total / prices[0];
      const lumpFinal = lumpShares * prices[params.horizon];
      // DCA: buy total/months each month for `months` months
      const monthly = params.total / params.months;
      let dcaShares = 0;
      for (let i = 0; i < params.months; i++) {
        dcaShares += monthly / prices[i];
      }
      const dcaFinal = dcaShares * prices[params.horizon];
      results.push({ lump: lumpFinal, dca: dcaFinal });
    }
  }
  simulate();

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    if (results.length === 0) return;

    // Histogram of lump - dca
    const diffs = results.map((r) => r.lump - r.dca);
    const lumpWins = diffs.filter((d) => d > 0).length;
    const dcaWins = diffs.length - lumpWins;
    const minD = Math.min(...diffs), maxD = Math.max(...diffs);

    const padX = 50, padY = 50;
    const gW = W - padX - 30, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const bins = 40;
    const binW = (maxD - minD) / bins;
    const counts = new Array(bins).fill(0);
    for (const d of diffs) {
      const idx = Math.min(bins - 1, Math.max(0, Math.floor((d - minD) / binW)));
      counts[idx]++;
    }
    const peak = Math.max(...counts, 1);
    const x2 = (i) => padX + (i / bins) * gW;
    const y2 = (c) => padY + gH - (c / peak) * (gH - 16);
    for (let i = 0; i < bins; i++) {
      const center = minD + (i + 0.5) * binW;
      ctx.fillStyle = center > 0 ? '#0ea5e9' : '#ec4899';
      ctx.fillRect(x2(i) + 1, y2(counts[i]), gW / bins - 1, padY + gH - y2(counts[i]));
    }

    // Zero line
    if (minD < 0 && maxD > 0) {
      const zx = padX + ((0 - minD) / (maxD - minD)) * gW;
      ctx.strokeStyle = '#fbbf24';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(zx, padY); ctx.lineTo(zx, padY + gH);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Lump-sum final − DCA final ($)', padX + gW / 2 - 80, padY + gH + 14);

    // Stats
    const lumpAvg = results.reduce((s, r) => s + r.lump, 0) / results.length;
    const dcaAvg = results.reduce((s, r) => s + r.dca, 0) / results.length;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 360, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Lump avg $${lumpAvg.toFixed(0)}    DCA avg $${dcaAvg.toFixed(0)}`, 16, 26);
    const wp = (lumpWins / diffs.length) * 100;
    ctx.fillStyle = wp > 50 ? '#0ea5e9' : '#ec4899';
    ctx.fillText(`Lump-sum wins ${lumpWins}/${diffs.length} (${wp.toFixed(1)}%)`, 16, 42);
  }

  // controls
  const muS = slider({ label: 'Drift μ (annual)', min: -0.20, max: 0.30, step: 0.005, value: params.mu, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.mu = v; } });
  const sgS = slider({ label: 'Volatility σ (annual)', min: 0.05, max: 0.50, step: 0.005, value: params.sigma, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.sigma = v; } });
  const mS = slider({ label: 'DCA spread (months)', min: 1, max: 24, step: 1, value: params.months,
    onInput: (v) => { params.months = v; } });
  const hS = slider({ label: 'Horizon (months)', min: 12, max: 60, step: 1, value: params.horizon,
    onInput: (v) => { params.horizon = v; } });
  const reB = button({ label: 'Resimulate', primary: true, onClick: simulate });

  ctrlPanel.append(muS.el, sgS.el, mS.el, hS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
