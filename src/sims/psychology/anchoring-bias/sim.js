import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

const QUESTIONS = [
  { name: 'Length of the Nile (km)',          truth: 6650 },
  { name: 'Population of Indonesia (millions)', truth: 280 },
  { name: 'Diameter of Jupiter (km)',         truth: 139820 },
  { name: 'Year Einstein won the Nobel',       truth: 1921 },
  { name: 'Distance Earth–Moon (km)',          truth: 384400 },
];

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

  const params = { qIdx: 0, anchor: 1.5, strength: 0.4, popN: 200 };
  // anchor expressed as multiplier of truth (1 = at truth)
  let estimates = [];
  function regenerate() {
    const q = QUESTIONS[params.qIdx];
    estimates = [];
    for (let i = 0; i < params.popN; i++) {
      // True estimate would be ~truth * exp(σ * gaussian()).
      // Anchoring pulls log(estimate) toward log(anchor) by `strength`.
      const logTruth = Math.log(q.truth);
      const logAnchor = Math.log(q.truth * params.anchor);
      const noise = gaussian() * 0.4;
      const logEst = (1 - params.strength) * (logTruth + noise) + params.strength * (logAnchor + gaussian() * 0.1);
      estimates.push(Math.exp(logEst));
    }
  }
  regenerate();

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const q = QUESTIONS[params.qIdx];
    const anchorVal = q.truth * params.anchor;

    const padX = 60, padY = 60;
    const w = W - padX - 30, h = H - padY - 100;
    chartRect = { x: padX, y: padY, w, h };

    // Log-scale: from 0.05*truth to 20*truth
    const lo = q.truth * 0.05, hi = q.truth * 20;
    const x2 = (v) => padX + (Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) * w;

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    // Truth marker
    ctx.strokeStyle = 'rgba(16,185,129,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x2(q.truth), padY); ctx.lineTo(x2(q.truth), padY + h);
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`truth = ${q.truth}`, x2(q.truth) + 6, padY + 14);

    // Anchor marker
    ctx.strokeStyle = '#fbbf24';
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(x2(anchorVal), padY); ctx.lineTo(x2(anchorVal), padY + h);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`anchor = ${anchorVal.toFixed(0)}`, x2(anchorVal) + 6, padY + 30);

    // Histogram
    const bins = 50;
    const counts = new Array(bins).fill(0);
    for (const e of estimates) {
      const b = Math.floor((Math.log(e) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) * bins);
      if (b >= 0 && b < bins) counts[b]++;
    }
    const peak = Math.max(...counts, 1);
    for (let i = 0; i < bins; i++) {
      const bx = padX + (i / bins) * w;
      const bh = (counts[i] / peak) * (h - 30);
      ctx.fillStyle = 'rgba(244,63,94,0.7)';
      ctx.fillRect(bx + 1, padY + h - bh - 6, w / bins - 2, bh);
    }

    // Mean estimate
    const meanEst = estimates.reduce((a, b) => a + b, 0) / estimates.length;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x2(meanEst), padY); ctx.lineTo(x2(meanEst), padY + h);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`avg estimate = ${meanEst.toFixed(0)}`, x2(meanEst) + 6, padY + 50);

    // x-axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (const v of [lo, lo * Math.sqrt(hi / lo), hi]) {
      ctx.fillText(v.toFixed(0), x2(v) - 12, padY + h + 14);
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`Q: ${q.name}`, 16, 30);
    const bias = (meanEst - q.truth) / q.truth * 100;
    ctx.fillStyle = bias > 0 ? '#fbbf24' : '#0ea5e9';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Bias: avg estimate is ${bias > 0 ? '+' : ''}${bias.toFixed(1)}% off the truth`, 16, 50);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the orange anchor — population estimates pull toward it (strength controls "stickiness").', padX, H - 12);
  }

  // Drag the anchor
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartRect) return null;
      const q = QUESTIONS[params.qIdx];
      const lo = q.truth * 0.05, hi = q.truth * 20;
      const ax = chartRect.x + (Math.log(q.truth * params.anchor) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) * chartRect.w;
      if (Math.abs(sx - ax) < 12 && sy >= chartRect.y && sy <= chartRect.y + chartRect.h) return 'anchor';
      // Anywhere in chart starts moving anchor
      if (sx >= chartRect.x && sx <= chartRect.x + chartRect.w && sy >= chartRect.y && sy <= chartRect.y + chartRect.h) return 'anchor';
      return null;
    },
    onDrag(_id, sx) {
      const q = QUESTIONS[params.qIdx];
      const lo = q.truth * 0.05, hi = q.truth * 20;
      const u = (sx - chartRect.x) / chartRect.w;
      const v = lo * Math.exp(u * Math.log(hi / lo));
      params.anchor = v / q.truth;
      regenerate();
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const qSel = select({
    label: 'Question',
    options: QUESTIONS.map((q, i) => ({ value: String(i), label: q.name })),
    value: String(params.qIdx),
    onChange: (v) => { params.qIdx = Number(v); regenerate(); },
  });
  const sS = slider({ label: 'Anchor strength', min: 0, max: 0.9, step: 0.01, value: params.strength, format: (v) => v.toFixed(2),
    onInput: (v) => { params.strength = v; regenerate(); } });
  const reB = button({ label: 'Resample', primary: true, onClick: regenerate });

  ctrlPanel.append(qSel.el, sS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
