import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    n: 100,
    fraction: 0.1,         // fraction of poorer's wealth at stake
    tax: 0,                // wealth tax rate (per "year")
    speed: 5000,           // trades per second
    autoplay: false,
  };

  let wealth = [];
  let trades = 0;

  function reset() {
    wealth = new Array(params.n).fill(100);
    trades = 0;
  }
  reset();

  function step(dt) {
    if (!params.autoplay) return;
    const t = Math.floor(params.speed * dt);
    for (let k = 0; k < t; k++) {
      const i = Math.floor(Math.random() * params.n);
      let j = Math.floor(Math.random() * params.n);
      while (j === i) j = Math.floor(Math.random() * params.n);
      const stake = params.fraction * Math.min(wealth[i], wealth[j]);
      if (Math.random() < 0.5) {
        wealth[i] += stake; wealth[j] -= stake;
      } else {
        wealth[i] -= stake; wealth[j] += stake;
      }
      // ensure non-negative
      if (wealth[j] < 0) { wealth[i] += wealth[j]; wealth[j] = 0; }
      if (wealth[i] < 0) { wealth[j] += wealth[i]; wealth[i] = 0; }
      trades++;
    }
    // Apply wealth tax (annual, but applied per second of sim time)
    if (params.tax > 0) {
      const yearFraction = dt;
      const total = wealth.reduce((s, v) => s + v, 0);
      const taxRate = params.tax * yearFraction * 0.05;  // dampened
      for (let i = 0; i < wealth.length; i++) wealth[i] *= (1 - taxRate);
      const collected = wealth.reduce((s, v) => s + v, 0);
      const refund = (total - collected) / wealth.length;
      for (let i = 0; i < wealth.length; i++) wealth[i] += refund;
    }
  }

  function gini(arr) {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;
    const total = sorted.reduce((s, v) => s + v, 0);
    if (total === 0) return 0;
    let cum = 0;
    let area = 0;
    for (let i = 0; i < n; i++) {
      cum += sorted[i];
      area += cum / total;
    }
    return 1 - 2 * (area / n - 0.5 / n);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Sort and bar-chart wealth
    const sorted = [...wealth].sort((a, b) => a - b);
    const padX = 30, padY = 60;
    const gW = W - padX * 2, gH = H - padY - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);
    const max = Math.max(...sorted, 1);
    const bw = gW / sorted.length;
    for (let i = 0; i < sorted.length; i++) {
      const h = (sorted[i] / max) * gH;
      ctx.fillStyle = `hsl(${280 - 220 * (i / sorted.length)}, 70%, 50%)`;
      ctx.fillRect(padX + i * bw, padY + gH - h, Math.max(0.5, bw - 0.5), h);
    }

    const g = gini(wealth);
    const top10 = sorted.slice(-Math.ceil(params.n * 0.1)).reduce((s, v) => s + v, 0);
    const total = sorted.reduce((s, v) => s + v, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Trades: ${trades.toLocaleString()}    Gini: ${g.toFixed(3)}`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Top 10% own ${(top10 / total * 100).toFixed(1)}% of wealth`, 16, 46);
  }

  // controls
  const nS = slider({ label: 'People', min: 20, max: 500, step: 10, value: params.n,
    onInput: (v) => { params.n = v; reset(); } });
  const fS = slider({ label: 'Stake fraction (of poorer)', min: 0.01, max: 0.5, step: 0.01, value: params.fraction, format: (v) => v.toFixed(2),
    onInput: (v) => { params.fraction = v; } });
  const taxS = slider({ label: 'Wealth-tax rate', min: 0, max: 0.20, step: 0.005, value: params.tax, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.tax = v; } });
  const speedS = slider({ label: 'Trades / sec', min: 100, max: 50000, step: 100, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const playT = toggle({ label: 'Run', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const stepB = button({ label: 'Step 1000 trades', onClick: () => {
    const orig = params.autoplay; params.autoplay = true;
    step(1000 / params.speed);
    params.autoplay = orig;
  } });
  const resetB = button({ label: 'Reset (everyone $100)', primary: true, onClick: reset });

  ctrlPanel.append(nS.el, fS.el, taxS.el, speedS.el, playT.el, row(stepB, resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
