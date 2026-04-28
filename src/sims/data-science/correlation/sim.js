import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  // Points in canvas-local coordinates (CSS pixels).
  let points = [];
  function seed(kind) {
    points = [];
    for (let i = 0; i < 30; i++) {
      const t = (i + Math.random()) / 30;
      const x = 80 + t * (cv.width - 160);
      let y;
      if (kind === 'positive')      y = cv.height - (80 + t * (cv.height - 160) + (Math.random() - 0.5) * 60);
      else if (kind === 'negative') y = 80 + t * (cv.height - 160) + (Math.random() - 0.5) * 60;
      else if (kind === 'none')     y = 80 + Math.random() * (cv.height - 160);
      else if (kind === 'curve')    y = cv.height - (80 + Math.sin(t * Math.PI) * (cv.height - 160) * 0.7 + (Math.random() - 0.5) * 30);
      points.push({ x, y });
    }
  }
  seed('positive');

  function correlation() {
    const n = points.length;
    if (n < 2) return null;
    let mx = 0, my = 0;
    for (const p of points) { mx += p.x; my += p.y; }
    mx /= n; my /= n;
    let sxy = 0, sx2 = 0, sy2 = 0;
    for (const p of points) {
      const dx = p.x - mx, dy = -(p.y - my); // flip Y so up is positive
      sxy += dx * dy;
      sx2 += dx * dx;
      sy2 += dy * dy;
    }
    if (sx2 === 0 || sy2 === 0) return null;
    return { r: sxy / Math.sqrt(sx2 * sy2), mx, my, sxy, sx2, sy2, n };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Axes
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 30); ctx.lineTo(40, H - 30); ctx.lineTo(W - 30, H - 30);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('y →', 14, H / 2);
    ctx.fillText('x →', W - 50, H - 12);

    // Best-fit line
    const c = correlation();
    if (c) {
      const slope = c.sxy / c.sx2;     // dY/dX in math axes
      const intercept = c.my + slope * (-(0)); // not used directly here
      // y = slope*(x - mx) + my, but with flipped y; in screen: y_screen = my - slope*(x - mx)
      const x1 = 40, x2v = W - 30;
      const y1 = c.my - slope * (x1 - c.mx);
      const y2v = c.my - slope * (x2v - c.mx);
      ctx.strokeStyle = 'rgba(251,191,36,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2v, y2v); ctx.stroke();
    }

    // Points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Pearson correlation r = ${c ? c.r.toFixed(3) : '--'}`, 16, 28);
    ctx.fillStyle = c && Math.abs(c.r) > 0.85 ? '#10b981' : c && Math.abs(c.r) > 0.5 ? '#fbbf24' : '#ef4444';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`r² = ${c ? (c.r * c.r).toFixed(3) : '--'}    n = ${points.length}`, 16, 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText('Drag any point · click empty space to add · right-click to remove', 16, 62);
  }

  // Drag a point
  let activeIdx = -1;
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      for (let i = 0; i < points.length; i++) {
        if (Math.hypot(sx - points[i].x, sy - points[i].y) < 12) return i;
      }
      return null;
    },
    onStart(id) { activeIdx = id; },
    onDrag(id, sx, sy) {
      points[id].x = Math.max(40, Math.min(cv.width - 30, sx));
      points[id].y = Math.max(30, Math.min(cv.height - 30, sy));
    },
    onEnd() { activeIdx = -1; },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Add on empty-space click; remove on right-click
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.canvas.addEventListener('mousedown', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    let i = -1;
    for (let k = 0; k < points.length; k++) if (Math.hypot(sx - points[k].x, sy - points[k].y) < 12) { i = k; break; }
    if (e.button === 2) {
      // right-click remove
      if (i >= 0) points.splice(i, 1);
      e.preventDefault();
      return;
    }
    if (i < 0 && sx > 40 && sx < cv.width - 30 && sy > 30 && sy < cv.height - 30) {
      points.push({ x: sx, y: sy });
    }
  });

  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, kind] of [['Positive', 'positive'], ['Negative', 'negative'], ['No corr', 'none'], ['Curve', 'curve']]) {
    const b = button({ label: name, onClick: () => seed(kind) });
    presetRow.appendChild(b.el);
  }
  const clearB = button({ label: 'Clear all', onClick: () => { points = []; } });
  ctrlPanel.append(presetRow, row(clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
