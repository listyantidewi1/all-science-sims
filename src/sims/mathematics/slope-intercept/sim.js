import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Two points on the line.
  const params = { p1: { x: -3, y: -1 }, p2: { x: 3, y: 4 } };
  let chart = null;

  function slope() {
    const dx = params.p2.x - params.p1.x;
    if (Math.abs(dx) < 1e-9) return null;
    return (params.p2.y - params.p1.y) / dx;
  }
  function intercept() {
    const m = slope();
    if (m === null) return null;
    return params.p1.y - m * params.p1.x;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50, padY = 30;
    const w = W - padX - 30, h = H - padY - 60;
    chart = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const xMin = -10, xMax = 10, yMin = -7, yMax = 7;
    const x2 = (x) => padX + ((x - xMin) / (xMax - xMin)) * w;
    const y2 = (y) => padY + h - ((y - yMin) / (yMax - yMin)) * h;

    // Grid
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = xMin; i <= xMax; i++) {
      ctx.beginPath(); ctx.moveTo(x2(i), padY); ctx.lineTo(x2(i), padY + h); ctx.stroke();
    }
    for (let i = Math.ceil(yMin); i <= Math.floor(yMax); i++) {
      ctx.beginPath(); ctx.moveTo(padX, y2(i)); ctx.lineTo(padX + w, y2(i)); ctx.stroke();
    }
    // Axes
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + w, y2(0));
    ctx.moveTo(x2(0), padY); ctx.lineTo(x2(0), padY + h);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (let i = xMin; i <= xMax; i += 2) if (i !== 0) ctx.fillText(i, x2(i) - 6, y2(0) + 14);
    for (let i = Math.ceil(yMin); i <= Math.floor(yMax); i += 2) if (i !== 0) ctx.fillText(i, x2(0) - 22, y2(i) + 4);

    // Line — extend through both points
    const m = slope(), b = intercept();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (m === null) {
      ctx.moveTo(x2(params.p1.x), padY); ctx.lineTo(x2(params.p1.x), padY + h);
    } else {
      ctx.moveTo(x2(xMin), y2(m * xMin + b));
      ctx.lineTo(x2(xMax), y2(m * xMax + b));
    }
    ctx.stroke();

    // Rise/run triangle between the two points
    if (m !== null) {
      ctx.strokeStyle = 'rgba(251,191,36,0.7)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x2(params.p1.x), y2(params.p1.y));
      ctx.lineTo(x2(params.p2.x), y2(params.p1.y)); // run
      ctx.lineTo(x2(params.p2.x), y2(params.p2.y)); // rise
      ctx.stroke();
      ctx.setLineDash([]);
      const dx = params.p2.x - params.p1.x;
      const dy = params.p2.y - params.p1.y;
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(`run Δx = ${dx.toFixed(2)}`, (x2(params.p1.x) + x2(params.p2.x)) / 2 - 30, y2(params.p1.y) + 16);
      ctx.fillText(`rise Δy = ${dy.toFixed(2)}`, x2(params.p2.x) + 6, (y2(params.p1.y) + y2(params.p2.y)) / 2);
    }

    // Y-intercept marker
    if (b !== null) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(x2(0), y2(b), 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(`b = ${b.toFixed(2)}`, x2(0) + 12, y2(b) - 6);
    }

    // The two draggable points
    drawPoint(ctx, x2(params.p1.x), y2(params.p1.y), '#ef4444');
    drawPoint(ctx, x2(params.p2.x), y2(params.p2.y), '#a855f7');

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-mono)';
    if (m !== null && b !== null) {
      ctx.fillText(`y = ${m.toFixed(3)} x ${b >= 0 ? '+' : '−'} ${Math.abs(b).toFixed(3)}`, 16, 32);
    } else {
      ctx.fillText(`x = ${params.p1.x.toFixed(2)}  (vertical line)`, 16, 32);
    }
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`m = Δy/Δx = ${m === null ? 'undefined' : m.toFixed(3)}`, 16, 50);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`b = ${b === null ? 'undefined' : b.toFixed(3)}`, 200, 50);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  function drawPoint(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const xMin = -10, xMax = 10, yMin = -7, yMax = 7;
    const xv = xMin + ((sx - x) / w) * (xMax - xMin);
    const m = slope(), b = intercept();
    if (m === null) return { x: sx, y: sy, label: [`vertical x = ${params.p1.x.toFixed(2)}`] };
    return { x: sx, y: sy, label: [`x = ${xv.toFixed(2)}`, `y = m·x + b = ${(m * xv + b).toFixed(2)}`] };
  });

  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const x2 = (xv) => chart.x + ((xv - (-10)) / 20) * chart.w;
      const y2 = (yv) => chart.y + chart.h - ((yv - (-7)) / 14) * chart.h;
      if (Math.hypot(sx - x2(params.p1.x), sy - y2(params.p1.y)) < 14) return 'p1';
      if (Math.hypot(sx - x2(params.p2.x), sy - y2(params.p2.y)) < 14) return 'p2';
      return null;
    },
    onDrag(id, sx, sy) {
      const xv = -10 + ((sx - chart.x) / chart.w) * 20;
      const yv = -7 + ((chart.y + chart.h - sy) / chart.h) * 14;
      params[id] = { x: Math.round(xv * 4) / 4, y: Math.round(yv * 4) / 4 };
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls — slider for the slope and intercept directly (alternative)
  const mS = slider({ label: 'Slope m', min: -5, max: 5, step: 0.05, value: 0.83, format: (v) => v.toFixed(2),
    onInput: (v) => { recomputeFromMB(v, intercept() ?? 0); } });
  const bS = slider({ label: 'Intercept b', min: -7, max: 7, step: 0.1, value: 1.5, format: (v) => v.toFixed(2),
    onInput: (v) => { recomputeFromMB(slope() ?? 0, v); } });
  function recomputeFromMB(m, b) {
    params.p1 = { x: -3, y: -3 * m + b };
    params.p2 = { x: 3, y: 3 * m + b };
  }
  ctrlPanel.append(mS.el, bS.el);

  const animator = loop(() => {
    const m = slope(), b = intercept();
    if (m !== null) { mS.value = m; bS.value = b; }
    draw();
  });
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
