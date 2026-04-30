import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

// Each review at time t_i resets retention to 1, but with a longer time-constant τ_i (memory consolidation).

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    tau0: 1.0,           // initial decay constant in days
    consolidate: 1.7,    // each review multiplies tau by this factor
    horizon: 30,         // days
    reviews: [0.04, 1, 3, 7, 14],   // review days
  };

  let chart = null;

  function retention(t) {
    // Walk through reviews chronologically
    let lastT = 0, tau = params.tau0, R = 1;
    const events = params.reviews.filter((r) => r <= t).sort((a, b) => a - b);
    for (const r of events) {
      // Decay until r
      R = R * Math.exp(-(r - lastT) / tau);
      // Review resets to max(R, 1) and consolidates
      R = 1;
      tau *= params.consolidate;
      lastT = r;
    }
    R = R * Math.exp(-(t - lastT) / tau);
    return R;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 50;
    const w = W - padX - 30, h = H - padY - 80;
    chart = { x: padX, y: padY, w, h };

    const x2 = (t) => padX + (t / params.horizon) * w;
    const y2 = (R) => padY + h - R * (h - 16) - 8;

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    // 80% / 50% lines
    for (const r of [0.8, 0.5, 0.2]) {
      ctx.strokeStyle = 'rgba(120,130,150,0.2)';
      ctx.beginPath();
      ctx.moveTo(padX, y2(r)); ctx.lineTo(padX + w, y2(r));
      ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${(r * 100).toFixed(0)}%`, padX - 32, y2(r) + 3);
    }

    // No-review reference (decay with tau0)
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * params.horizon;
      const r = Math.exp(-t / params.tau0);
      const sx = x2(t), sy = y2(r);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // With reviews
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * params.horizon;
      const r = retention(t);
      const sx = x2(t), sy = y2(r);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Review markers
    for (const r of params.reviews) {
      ctx.strokeStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(x2(r), padY); ctx.lineTo(x2(r), padY + h);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x2(r), y2(1), 7, 0, Math.PI * 2);
      ctx.fill();
    }

    // x-axis
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let d = 0; d <= params.horizon; d += params.horizon / 6) {
      ctx.fillText(`${d.toFixed(0)}d`, x2(d) - 8, padY + h + 14);
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`Retention curve over ${params.horizon} days`, 16, 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Reviews at: ${params.reviews.map((r) => r.toFixed(2) + 'd').join(', ')}`, 16, 48);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const t = ((sx - x) / w) * params.horizon;
    const r = retention(t);
    return { x: sx, y: sy, label: [`day ${t.toFixed(2)}`, `retention ${(r * 100).toFixed(1)}%`] };
  });

  // Drag review markers
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const x2 = (t) => chart.x + (t / params.horizon) * chart.w;
      for (let i = 0; i < params.reviews.length; i++) {
        const px = x2(params.reviews[i]);
        if (Math.hypot(sx - px, sy - chart.y - 10) < 14) return i;
      }
      return null;
    },
    onDrag(idx, sx) {
      const t = Math.max(0.01, Math.min(params.horizon, ((sx - chart.x) / chart.w) * params.horizon));
      params.reviews[idx] = t;
      params.reviews.sort((a, b) => a - b);
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const tauS = slider({ label: 'Initial decay τ (days)', min: 0.2, max: 5, step: 0.1, value: params.tau0, format: (v) => v.toFixed(1),
    onInput: (v) => { params.tau0 = v; } });
  const cS = slider({ label: 'Consolidation per review', min: 1.1, max: 3, step: 0.05, value: params.consolidate, format: (v) => `×${v.toFixed(2)}`,
    onInput: (v) => { params.consolidate = v; } });
  const hS = slider({ label: 'Time horizon (days)', min: 5, max: 120, step: 1, value: params.horizon,
    onInput: (v) => { params.horizon = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, r] of [
    ['No review', []],
    ['One day', [1]],
    ['Spaced (1, 3, 7, 14d)', [0.04, 1, 3, 7, 14]],
    ['Cramming', [0.05, 0.1, 0.15, 0.2]],
  ]) {
    const b = button({ label: n, onClick: () => { params.reviews = r.slice(); } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(tauS.el, cS.el, hS.el, presetRow);

  // Lab — measure retention at fixed time-points; design a study schedule.
  const lab = labPanel({
    title: 'Forgetting curve lab — design a study schedule',
    filename: 'forgetting-curve-lab.csv',
    columns: [
      { key: 'tau0',   label: 'τ₀ (days)',     format: (v) => v.toFixed(1) },
      { key: 'cons',   label: 'consolidation', format: (v) => v.toFixed(2) },
      { key: 'reviews', label: 'review days' },
      { key: 't',      label: 'check t (days)', format: (v) => v.toFixed(1) },
      { key: 'R',      label: 'retention',     format: (v) => (v * 100).toFixed(1) + '%' },
    ],
    procedure: [
      'No reviews. Check retention at t = 1 day, 7 days, 30 days. Record each.',
      'Add a single review at day 1. Re-check t = 7, 30. Retention is much higher.',
      'Add reviews at 1, 3, 7, 14 days (spaced repetition). Check at t = 30. Should be > 80%.',
      'Vary consolidation factor — higher = each review gives more lasting memory.',
      'Apply: design a study schedule for an exam in 30 days. When to review?',
    ],
    predict: 'You learn vocabulary today. With no review, what fraction will you remember in 7 days? With one review at day 3?',
    source: () => {
      const tCheck = params.horizon;
      return {
        tau0: params.tau0,
        cons: params.consolidate,
        reviews: params.reviews.map((r) => r.toFixed(1)).join(', '),
        t: tCheck,
        R: retention(tCheck),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
