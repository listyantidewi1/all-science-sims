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
    n: 30,
    nBoots: 2000,
    trueMu: 5,
    trueSd: 2,
  };

  let sample = [];
  let bootMeans = [];

  function regenerate() {
    sample = [];
    for (let i = 0; i < params.n; i++) sample.push(params.trueMu + gaussian() * params.trueSd);
    runBootstrap();
  }

  function runBootstrap() {
    bootMeans = [];
    for (let b = 0; b < params.nBoots; b++) {
      let s = 0;
      for (let i = 0; i < params.n; i++) s += sample[Math.floor(Math.random() * params.n)];
      bootMeans.push(s / params.n);
    }
    bootMeans.sort((a, b) => a - b);
  }
  regenerate();

  function ci95() {
    if (bootMeans.length < 10) return null;
    const lo = bootMeans[Math.floor(0.025 * bootMeans.length)];
    const hi = bootMeans[Math.floor(0.975 * bootMeans.length)];
    return { lo, hi };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W * 0.4;
    drawSample(ctx, 30, 30, halfW - 60, H - 60);
    drawBoot(ctx, halfW + 30, 30, W - halfW - 60, H - 60);

    const sMean = sample.reduce((s, v) => s + v, 0) / sample.length;
    const sSd = Math.sqrt(sample.reduce((s, v) => s + (v - sMean) ** 2, 0) / (sample.length - 1));
    const seParam = sSd / Math.sqrt(sample.length);
    const ci = ci95();

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 360, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Sample x̄ = ${sMean.toFixed(2)}    s = ${sSd.toFixed(2)}`, 16, 26);
    if (ci) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Bootstrap 95% CI: [${ci.lo.toFixed(2)}, ${ci.hi.toFixed(2)}]`, 16, 44);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`Parametric SE = s/√n = ${seParam.toFixed(2)} → ±${(1.96 * seParam).toFixed(2)}`, 16, 62);
    }
  }

  function drawSample(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (sample.length === 0) return;
    const min = Math.min(...sample) - 1;
    const max = Math.max(...sample) + 1;
    const x2 = (v) => x + ((v - min) / (max - min)) * w;
    const yLine = y + h - 20;
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.beginPath(); ctx.moveTo(x + 10, yLine); ctx.lineTo(x + w - 10, yLine); ctx.stroke();
    for (const v of sample) {
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(x2(v), yLine - 4 - Math.random() * 30, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`Sample (n=${sample.length})`, x + 6, y + 14);
  }

  function drawBoot(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (bootMeans.length === 0) return;
    const min = bootMeans[0];
    const max = bootMeans[bootMeans.length - 1];
    const range = max - min || 1;
    const bins = 40;
    const binW = range / bins;
    const counts = new Array(bins).fill(0);
    for (const v of bootMeans) {
      const idx = Math.min(bins - 1, Math.max(0, Math.floor((v - min) / binW)));
      counts[idx]++;
    }
    const peak = Math.max(...counts, 1);
    const bw = w / bins;
    for (let i = 0; i < bins; i++) {
      const bh = (counts[i] / peak) * (h - 16);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x + i * bw + 1, y + h - bh, bw - 1, bh);
    }
    // CI lines
    const ci = ci95();
    if (ci) {
      const x2 = (v) => x + ((v - min) / range) * w;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x2(ci.lo), y); ctx.lineTo(x2(ci.lo), y + h);
      ctx.moveTo(x2(ci.hi), y); ctx.lineTo(x2(ci.hi), y + h);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`Bootstrap means (${bootMeans.length})`, x + 6, y + 14);
  }

  // controls
  const nS = slider({ label: 'Sample size n', min: 5, max: 200, step: 1, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); } });
  const muS = slider({ label: 'True µ', min: 0, max: 10, step: 0.1, value: params.trueMu, format: (v) => v.toFixed(1),
    onInput: (v) => { params.trueMu = v; regenerate(); } });
  const sdS = slider({ label: 'True σ', min: 0.1, max: 5, step: 0.1, value: params.trueSd, format: (v) => v.toFixed(1),
    onInput: (v) => { params.trueSd = v; regenerate(); } });
  const bS = slider({ label: 'Bootstrap iterations', min: 100, max: 10000, step: 100, value: params.nBoots,
    onInput: (v) => { params.nBoots = v; runBootstrap(); } });
  const newSampleB = button({ label: 'New random sample', primary: true, onClick: regenerate });
  const reB = button({ label: 'Re-bootstrap', onClick: runBootstrap });
  ctrlPanel.append(nS.el, muS.el, sdS.el, bS.el, row(newSampleB, reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
