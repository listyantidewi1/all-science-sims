import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Two lines as y = m*x + b
  const params = { m1: 1, b1: 1, m2: -0.5, b2: 3 };
  let chart = null;

  function intersection() {
    const dm = params.m1 - params.m2;
    if (Math.abs(dm) < 1e-9) {
      if (Math.abs(params.b1 - params.b2) < 1e-9) return { kind: 'infinite' };
      return { kind: 'none' };
    }
    const x = (params.b2 - params.b1) / dm;
    const y = params.m1 * x + params.b1;
    return { kind: 'unique', x, y };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const w = W - padX - 30, h = H - padY - 80;
    chart = { x: padX, y: padY, w, h };

    const xMin = -10, xMax = 10, yMin = -8, yMax = 8;
    const x2 = (x) => padX + ((x - xMin) / (xMax - xMin)) * w;
    const y2 = (y) => padY + h - ((y - yMin) / (yMax - yMin)) * h;

    // Grid
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = xMin; i <= xMax; i++) {
      ctx.beginPath(); ctx.moveTo(x2(i), padY); ctx.lineTo(x2(i), padY + h); ctx.stroke();
    }
    for (let i = yMin; i <= yMax; i++) {
      ctx.beginPath(); ctx.moveTo(padX, y2(i)); ctx.lineTo(padX + w, y2(i)); ctx.stroke();
    }
    // Axes
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + w, y2(0));
    ctx.moveTo(x2(0), padY); ctx.lineTo(x2(0), padY + h);
    ctx.stroke();

    // Two lines
    function drawLine(m, b, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x2(xMin), y2(m * xMin + b));
      ctx.lineTo(x2(xMax), y2(m * xMax + b));
      ctx.stroke();
    }
    drawLine(params.m1, params.b1, '#0ea5e9');
    drawLine(params.m2, params.b2, '#a855f7');

    // Intersection
    const r = intersection();
    if (r.kind === 'unique') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x2(r.x), y2(r.y), 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`(${r.x.toFixed(2)}, ${r.y.toFixed(2)})`, x2(r.x) + 14, y2(r.y) - 6);
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 80);
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`y = ${params.m1.toFixed(2)} x ${params.b1 >= 0 ? '+' : '−'} ${Math.abs(params.b1).toFixed(2)}`, 16, 30);
    ctx.fillStyle = '#a855f7';
    ctx.fillText(`y = ${params.m2.toFixed(2)} x ${params.b2 >= 0 ? '+' : '−'} ${Math.abs(params.b2).toFixed(2)}`, 16, 50);
    ctx.fillStyle = r.kind === 'unique' ? '#10b981' : r.kind === 'none' ? '#ef4444' : '#fbbf24';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(r.kind === 'unique' ? 'one solution' : r.kind === 'none' ? 'no solution (parallel)' : 'infinitely many (same line)', 16, 70);
  }

  // Drag a control point on each line to set m, b
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const x2 = (xv) => chart.x + ((xv - (-10)) / 20) * chart.w;
      const y2 = (yv) => chart.y + chart.h - ((yv - (-8)) / 16) * chart.h;
      // Two control points: (0, b1) and (3, m1*3 + b1) for line 1; ditto for line 2.
      const p1 = { x: x2(3), y: y2(params.m1 * 3 + params.b1) };
      const p2 = { x: x2(3), y: y2(params.m2 * 3 + params.b2) };
      if (Math.hypot(sx - p1.x, sy - p1.y) < 14) return 'p1';
      if (Math.hypot(sx - p2.x, sy - p2.y) < 14) return 'p2';
      return null;
    },
    onDrag(id, sx, sy) {
      const xv = -10 + ((sx - chart.x) / chart.w) * 20;
      const yv = -8 + ((chart.y + chart.h - sy) / chart.h) * 16;
      // Force x = 3 for the control point — adjust m to fit (xv, yv) given fixed b.
      // Better: free both — set m so the line passes through the dragged point AND the y-intercept stays.
      if (id === 'p1') {
        params.m1 = (yv - params.b1) / Math.max(0.1, xv);
        m1S.value = params.m1;
      } else {
        params.m2 = (yv - params.b2) / Math.max(0.1, xv);
        m2S.value = params.m2;
      }
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const m1S = slider({ label: 'Line 1 slope m₁', min: -5, max: 5, step: 0.05, value: params.m1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.m1 = v; } });
  const b1S = slider({ label: 'Line 1 intercept b₁', min: -8, max: 8, step: 0.1, value: params.b1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.b1 = v; } });
  const m2S = slider({ label: 'Line 2 slope m₂', min: -5, max: 5, step: 0.05, value: params.m2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.m2 = v; } });
  const b2S = slider({ label: 'Line 2 intercept b₂', min: -8, max: 8, step: 0.1, value: params.b2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.b2 = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [
    ['Unique', { m1: 1, b1: 1, m2: -0.5, b2: 3 }],
    ['Parallel', { m1: 0.5, b1: 1, m2: 0.5, b2: -1 }],
    ['Same line', { m1: 1, b1: 2, m2: 1, b2: 2 }],
  ]) {
    const b = button({ label: n, onClick: () => {
      Object.assign(params, p);
      m1S.value = p.m1; b1S.value = p.b1; m2S.value = p.m2; b2S.value = p.b2;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(m1S.el, b1S.el, m2S.el, b2S.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
