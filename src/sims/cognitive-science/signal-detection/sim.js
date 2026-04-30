import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

function pdf(x, mu, sigma) {
  return Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));
}
function cdf(x, mu, sigma) {
  // approximate
  const z = (x - mu) / sigma;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const a = [0.319381530, -0.356563782, 1.781477937, -1.821255978, 1.330274429];
  let p = 0;
  let tk = t;
  for (let i = 0; i < 5; i++) { p += a[i] * tk; tk *= t; }
  const phi = pdf(Math.abs(z), 0, 1);
  const c = 1 - phi * p;
  return z >= 0 ? c : 1 - c;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { dPrime: 1.5, sigma: 1, criterion: 0.5 };

  let chartTop = null, chartROC = null;

  function metrics() {
    const muN = 0, muS = params.dPrime;
    const hit = 1 - cdf(params.criterion, muS, params.sigma);
    const miss = 1 - hit;
    const fa = 1 - cdf(params.criterion, muN, params.sigma);
    const cr = 1 - fa;
    return { hit, miss, fa, cr };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Top: distributions
    chartTop = { x: 30, y: 30, w: W * 0.6 - 30, h: H * 0.6 };
    drawDistributions(ctx, chartTop.x, chartTop.y, chartTop.w, chartTop.h);

    // Right: ROC curve
    chartROC = { x: W * 0.62, y: 30, w: W * 0.38 - 50, h: H * 0.6 };
    drawROC(ctx, chartROC.x, chartROC.y, chartROC.w, chartROC.h);

    // Bottom: confusion matrix
    const m = metrics();
    drawConfusion(ctx, 30, H * 0.65, W - 60, H * 0.3, m);
  }

  function drawDistributions(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    const xMin = -3, xMax = 3 + params.dPrime;
    const x2 = (v) => x + ((v - xMin) / (xMax - xMin)) * w;
    const yMax = 0.6;
    const y2 = (p) => y + h - (p / yMax) * (h - 16) - 8;

    // Noise
    ctx.fillStyle = 'rgba(14,165,233,0.25)';
    ctx.beginPath();
    ctx.moveTo(x2(xMin), y2(0));
    for (let i = 0; i <= 200; i++) {
      const v = xMin + (i / 200) * (xMax - xMin);
      ctx.lineTo(x2(v), y2(pdf(v, 0, params.sigma)));
    }
    ctx.lineTo(x2(xMax), y2(0));
    ctx.closePath(); ctx.fill();

    // Signal
    ctx.fillStyle = 'rgba(239,68,68,0.25)';
    ctx.beginPath();
    ctx.moveTo(x2(xMin), y2(0));
    for (let i = 0; i <= 200; i++) {
      const v = xMin + (i / 200) * (xMax - xMin);
      ctx.lineTo(x2(v), y2(pdf(v, params.dPrime, params.sigma)));
    }
    ctx.lineTo(x2(xMax), y2(0));
    ctx.closePath(); ctx.fill();

    // Outlines
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const v = xMin + (i / 200) * (xMax - xMin);
      const sx = x2(v), sy = y2(pdf(v, 0, params.sigma));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.strokeStyle = '#ef4444';
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const v = xMin + (i / 200) * (xMax - xMin);
      const sx = x2(v), sy = y2(pdf(v, params.dPrime, params.sigma));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Criterion line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x2(params.criterion), y); ctx.lineTo(x2(params.criterion), y + h);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`β = ${params.criterion.toFixed(2)}`, x2(params.criterion) + 4, y + 14);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Noise (no signal)', x + 8, y - 6);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('Noise + Signal', x + w - 110, y - 6);
  }

  function drawROC(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('ROC curve', x + 6, y - 6);
    ctx.fillText('false alarm →', x + w - 70, y + h + 14);
    ctx.save(); ctx.translate(x - 14, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('hit rate ↑', 0, 0); ctx.restore();

    // ROC: parametric in criterion β
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const beta = -3 + (i / 200) * (3 + params.dPrime + 3);
      const fa = 1 - cdf(beta, 0, params.sigma);
      const hit = 1 - cdf(beta, params.dPrime, params.sigma);
      const sx = x + fa * w;
      const sy = y + h - hit * h;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // Diagonal
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y + h); ctx.lineTo(x + w, y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Operating point
    const m = metrics();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x + m.fa * w, y + h - m.hit * h, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawConfusion(ctx, x, y, w, h) {
    const cellH = (h - 30) / 2;
    const cellW = (w - 80) / 2;
    const startX = x + 80, startY = y + 30;
    const labels = [['Hit', '#10b981'], ['Miss', '#fbbf24'], ['False alarm', '#ef4444'], ['Correct rej.', '#0ea5e9']];
    const m = metrics();
    const vals = [m.hit, m.miss, m.fa, m.cr];
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Confusion matrix (probabilities)', x, y);
    ctx.fillText('respond YES', startX + cellW * 0.3, y + 24);
    ctx.fillText('respond NO',  startX + cellW + cellW * 0.3, y + 24);
    ctx.save(); ctx.translate(x + 4, startY + cellH); ctx.rotate(-Math.PI / 2);
    ctx.fillText('signal     none   ', 0, 0);
    ctx.restore();

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const idx = r * 2 + (1 - c);
        const cx = startX + c * cellW, cy = startY + r * cellH;
        ctx.fillStyle = labels[idx][1] + '33';
        ctx.fillRect(cx, cy, cellW, cellH);
        ctx.strokeStyle = labels[idx][1];
        ctx.strokeRect(cx, cy, cellW, cellH);
        ctx.fillStyle = labels[idx][1];
        ctx.font = 'bold 13px var(--font-mono)';
        ctx.fillText(labels[idx][0], cx + 8, cy + 18);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px var(--font-mono)';
        ctx.fillText(`${(vals[idx] * 100).toFixed(1)}%`, cx + 8, cy + cellH - 12);
      }
    }
  }

  // Drag the criterion line
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartTop) return null;
      if (sx >= chartTop.x && sx <= chartTop.x + chartTop.w && sy >= chartTop.y && sy <= chartTop.y + chartTop.h) return 'beta';
      return null;
    },
    onDrag(_id, sx) {
      const xMin = -3, xMax = 3 + params.dPrime;
      const u = (sx - chartTop.x) / chartTop.w;
      params.criterion = xMin + u * (xMax - xMin);
      cS.value = params.criterion;
    },
    cursor: 'ew-resize',
    hoverCursor: 'ew-resize',
  });

  // controls
  const dS = slider({ label: 'd′ (sensitivity)', min: 0, max: 4, step: 0.05, value: params.dPrime, format: (v) => v.toFixed(2),
    onInput: (v) => { params.dPrime = v; } });
  const cS = slider({ label: 'Criterion β', min: -3, max: 5, step: 0.05, value: params.criterion, format: (v) => v.toFixed(2),
    onInput: (v) => { params.criterion = v; } });

  ctrlPanel.append(dS.el, cS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
