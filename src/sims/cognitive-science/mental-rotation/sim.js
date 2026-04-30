import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// "Letter R" shape — easy to tell rotation vs mirror.
function drawR(ctx, cx, cy, size, angle, mirror) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  if (mirror) ctx.scale(-1, 1);
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 5;
  ctx.beginPath();
  // Vertical stem
  ctx.moveTo(-size * 0.4, -size); ctx.lineTo(-size * 0.4, size);
  // Bowl
  ctx.moveTo(-size * 0.4, -size); ctx.lineTo(size * 0.2, -size); ctx.lineTo(size * 0.4, -size * 0.6); ctx.lineTo(size * 0.2, -size * 0.2); ctx.lineTo(-size * 0.4, -size * 0.2);
  // Leg
  ctx.moveTo(0, -size * 0.2); ctx.lineTo(size * 0.4, size);
  ctx.stroke();
  ctx.restore();
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    angle: 0,        // rotation of the right-side shape (radians)
    mirror: false,   // whether right shape is mirrored
    startTime: 0,
    trials: [],      // {angle (deg), mirror, correct, ms}
    result: null,
  };

  function newTrial() {
    state.angle = (Math.random() * 6 - 3) * (Math.PI / 180) * 60;   // a multiple of 30° from -180..180
    state.mirror = Math.random() < 0.5;
    state.startTime = performance.now();
    state.result = null;
  }
  newTrial();

  function answer(sayMirror) {
    const ms = performance.now() - state.startTime;
    const correct = sayMirror === state.mirror;
    state.trials.push({ angle: Math.abs(state.angle * 180 / Math.PI), mirror: state.mirror, correct, ms });
    state.result = { correct, ms };
    setTimeout(newTrial, 800);
  }

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Two shapes side by side
    drawR(ctx, W * 0.30, H * 0.4, 60, 0, false);
    drawR(ctx, W * 0.55, H * 0.4, 60, state.angle, state.mirror);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('reference', W * 0.30 - 32, H * 0.4 + 100);
    ctx.fillText('test (rotated?)', W * 0.55 - 32, H * 0.4 + 100);

    // Chart of RT vs angle
    chartRect = { x: W * 0.7, y: 30, w: W - W * 0.7 - 30, h: H - 100 };
    drawChart(ctx, chartRect.x, chartRect.y, chartRect.w, chartRect.h);

    if (state.result) {
      ctx.fillStyle = state.result.correct ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.fillRect(W * 0.30, H * 0.7, W * 0.35, 56);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(`${state.result.correct ? '✓' : '✗'}  ${state.result.ms.toFixed(0)} ms`, W * 0.30 + W * 0.175, H * 0.7 + 32);
      ctx.textAlign = 'left';
    }

    const probe = hover.get();
    if (probe && chartRect) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('RT (ms) vs rotation angle', x + 6, y - 6);

    const angMax = 180;
    const msMax = 5000;
    const x2 = (a) => x + (a / angMax) * w;
    const y2 = (m) => y + h - (m / msMax) * (h - 16) - 8;

    for (const t of state.trials) {
      ctx.fillStyle = t.correct ? (t.mirror ? '#a855f7' : '#0ea5e9') : '#ef4444';
      ctx.beginPath();
      ctx.arc(x2(t.angle), y2(t.ms), 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Axis ticks
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let a = 0; a <= 180; a += 30) ctx.fillText(`${a}°`, x2(a) - 8, y + h + 14);
    for (let m = 0; m <= 5000; m += 1000) ctx.fillText(`${m}ms`, x - 36, y2(m) + 3);
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const a = ((sx - x) / w) * 180;
    const ms = (1 - (sy - y) / h) * 5000;
    return { x: sx, y: sy, label: [`angle ~ ${a.toFixed(0)}°`, `RT ~ ${ms.toFixed(0)} ms`] };
  });

  // controls
  const sameB = button({ label: 'Same (rotated)', primary: true, onClick: () => answer(false) });
  const mirrorB = button({ label: 'Mirror image', onClick: () => answer(true) });
  const resetB = button({ label: 'Reset trials', onClick: () => { state.trials = []; newTrial(); } });
  ctrlPanel.append(row(sameB, mirrorB), row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
