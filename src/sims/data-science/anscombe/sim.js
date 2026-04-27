import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row, toggle } from '../../../lib/controls.js';

const QUARTET = [
  // Set 1: linear relationship
  [[10,8.04],[8,6.95],[13,7.58],[9,8.81],[11,8.33],[14,9.96],[6,7.24],[4,4.26],[12,10.84],[7,4.82],[5,5.68]],
  // Set 2: quadratic
  [[10,9.14],[8,8.14],[13,8.74],[9,8.77],[11,9.26],[14,8.10],[6,6.13],[4,3.10],[12,9.13],[7,7.26],[5,4.74]],
  // Set 3: linear with one outlier (high y)
  [[10,7.46],[8,6.77],[13,12.74],[9,7.11],[11,7.81],[14,8.84],[6,6.08],[4,5.39],[12,8.15],[7,6.42],[5,5.73]],
  // Set 4: vertical x cluster + one influential outlier
  [[8,6.58],[8,5.76],[8,7.71],[8,8.84],[8,8.47],[8,7.04],[8,5.25],[19,12.50],[8,5.56],[8,7.91],[8,6.89]],
];

function stats(pts) {
  const n = pts.length;
  let sx = 0, sy = 0;
  for (const [x, y] of pts) { sx += x; sy += y; }
  const mx = sx / n, my = sy / n;
  let vx = 0, vy = 0, cov = 0;
  for (const [x, y] of pts) {
    vx += (x - mx) ** 2;
    vy += (y - my) ** 2;
    cov += (x - mx) * (y - my);
  }
  const slope = cov / vx;
  const intercept = my - slope * mx;
  const rxy = cov / Math.sqrt(vx * vy);
  return { mx, my, vx: vx / (n - 1), vy: vy / (n - 1), slope, intercept, r: rxy };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const data = QUARTET.map((pts) => pts.map(([x, y]) => ({ x, y })));
  let dragInfo = null;
  let showStats = true;

  function panelRect(idx, W, H) {
    const cols = 2;
    const pw = W / cols;
    const ph = H / 2;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    return { x: col * pw + 20, y: row * ph + 20, w: pw - 40, h: ph - 40 };
  }

  const X_MIN = 0, X_MAX = 20, Y_MIN = 0, Y_MAX = 14;
  function px(p, x) { return p.x + ((x - X_MIN) / (X_MAX - X_MIN)) * p.w; }
  function py(p, y) { return p.y + p.h - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * p.h; }
  function s2x(p, sx) { return X_MIN + ((sx - p.x) / p.w) * (X_MAX - X_MIN); }
  function s2y(p, sy) { return Y_MIN + ((p.y + p.h - sy) / p.h) * (Y_MAX - Y_MIN); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 4; i++) {
      const r = panelRect(i, W, H);
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.strokeRect(r.x, r.y, r.w, r.h);

      const s = stats(data[i].map((p) => [p.x, p.y]));

      // gridlines (faint)
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      for (let xx = 0; xx <= 20; xx += 5) {
        ctx.beginPath();
        ctx.moveTo(px(r, xx), r.y); ctx.lineTo(px(r, xx), r.y + r.h);
        ctx.stroke();
      }
      // best-fit line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px(r, X_MIN), py(r, s.intercept + s.slope * X_MIN));
      ctx.lineTo(px(r, X_MAX), py(r, s.intercept + s.slope * X_MAX));
      ctx.stroke();

      // points
      for (let j = 0; j < data[i].length; j++) {
        const p = data[i][j];
        ctx.fillStyle = (dragInfo && dragInfo.set === i && dragInfo.idx === j) ? '#fbbf24' : '#ec4899';
        ctx.beginPath();
        ctx.arc(px(r, p.x), py(r, p.y), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // header
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(`Dataset ${i + 1}`, r.x + 6, r.y + 16);
      if (showStats) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '10px var(--font-mono)';
        ctx.fillText(`x̄ ${s.mx.toFixed(2)}  ȳ ${s.my.toFixed(2)}`, r.x + 6, r.y + 30);
        ctx.fillText(`var ${s.vx.toFixed(2)},${s.vy.toFixed(2)}`, r.x + 6, r.y + 44);
        ctx.fillText(`r ${s.r.toFixed(3)}`, r.x + 6, r.y + 58);
        ctx.fillText(`y = ${s.slope.toFixed(2)}x + ${s.intercept.toFixed(2)}`, r.x + 6, r.y + 72);
      }
    }
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    for (let i = 0; i < 4; i++) {
      const r = panelRect(i, cv.width, cv.height);
      if (p.x < r.x || p.x > r.x + r.w || p.y < r.y || p.y > r.y + r.h) continue;
      let bestJ = -1, bestD = 12;
      for (let j = 0; j < data[i].length; j++) {
        const dp = data[i][j];
        const sx = px(r, dp.x), sy = py(r, dp.y);
        const d = Math.hypot(p.x - sx, p.y - sy);
        if (d < bestD) { bestD = d; bestJ = j; }
      }
      if (bestJ >= 0) {
        dragInfo = { set: i, idx: bestJ };
        cv.canvas.style.cursor = 'grabbing';
      }
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragInfo) return;
    const p = localPos(e);
    const r = panelRect(dragInfo.set, cv.width, cv.height);
    data[dragInfo.set][dragInfo.idx] = {
      x: Math.max(X_MIN, Math.min(X_MAX, s2x(r, p.x))),
      y: Math.max(Y_MIN, Math.min(Y_MAX, s2y(r, p.y))),
    };
  });
  window.addEventListener('mouseup', () => { dragInfo = null; cv.canvas.style.cursor = 'pointer'; });

  // controls
  const statsT = toggle({ label: 'Show statistics in each panel', value: showStats, onChange: (v) => { showStats = v; } });
  const resetB = button({ label: 'Reset to original Anscombe data', primary: true, onClick: () => {
    QUARTET.forEach((set, i) => {
      data[i].length = 0;
      for (const [x, y] of set) data[i].push({ x, y });
    });
  } });
  ctrlPanel.append(statsT.el, row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
