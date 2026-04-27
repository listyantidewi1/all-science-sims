import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  let points = [3, 4, 5, 5, 6, 6, 7, 8];
  let drag = -1;

  const X_MIN = 0, X_MAX = 100;

  function mean(arr) { return arr.reduce((s, v) => s + v, 0) / Math.max(1, arr.length); }
  function median(arr) {
    const s = [...arr].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  function stddev(arr) {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((s, v) => s + (v - m) * (v - m), 0) / Math.max(1, arr.length));
  }

  function w2sX(v, W) { return 60 + ((v - X_MIN) / (X_MAX - X_MIN)) * (W - 90); }
  function s2wX(sx, W) { return X_MIN + ((sx - 60) / (W - 90)) * (X_MAX - X_MIN); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const cy = H / 2 + 30;

    // axis
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, cy); ctx.lineTo(W - 30, cy);
    ctx.stroke();
    for (let v = 0; v <= 100; v += 10) {
      const x = w2sX(v, W);
      ctx.beginPath();
      ctx.moveTo(x, cy - 4); ctx.lineTo(x, cy + 4);
      ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(String(v), x - 6, cy + 16);
    }

    // mean / median lines
    const mn = mean(points);
    const md = median(points);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(w2sX(mn, W), 30); ctx.lineTo(w2sX(mn, W), cy - 10);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`mean = ${mn.toFixed(2)}`, w2sX(mn, W) + 6, 50);

    ctx.strokeStyle = '#10b981';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(w2sX(md, W), 60); ctx.lineTo(w2sX(md, W), cy - 10);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`median = ${md.toFixed(2)}`, w2sX(md, W) + 6, 80);

    // stddev band around mean
    const sd = stddev(points);
    ctx.fillStyle = 'rgba(59,130,246,0.18)';
    ctx.fillRect(w2sX(mn - sd, W), cy - 24, w2sX(mn + sd, W) - w2sX(mn - sd, W), 18);
    ctx.fillStyle = '#3b82f6';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText(`σ = ${sd.toFixed(2)}`, w2sX(mn, W) + 6, cy - 10);

    // points
    for (let i = 0; i < points.length; i++) {
      const x = w2sX(points[i], W);
      ctx.fillStyle = i === drag ? '#fbbf24' : '#a78bfa';
      ctx.beginPath();
      ctx.arc(x, cy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag any point. Right-click to remove. Click empty space to add.', 12, H - 12);
  }

  // mouse
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  function findPoint(sx, sy) {
    const cy = cv.height / 2 + 30;
    if (Math.abs(sy - cy) > 14) return -1;
    let best = -1, bestD = 14;
    for (let i = 0; i < points.length; i++) {
      const x = w2sX(points[i], cv.width);
      const d = Math.abs(sx - x);
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const idx = findPoint(p.x, p.y);
    if (e.button === 2) {
      if (idx >= 0) points.splice(idx, 1);
      return;
    }
    if (idx >= 0) {
      drag = idx;
    } else {
      const v = s2wX(p.x, cv.width);
      if (v >= X_MIN && v <= X_MAX) {
        points.push(v);
        drag = points.length - 1;
      }
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (drag < 0) return;
    const p = localPos(e);
    const v = s2wX(p.x, cv.width);
    points[drag] = Math.max(X_MIN, Math.min(X_MAX, v));
  });
  window.addEventListener('mouseup', () => { drag = -1; });

  // controls
  const symB = button({ label: 'Symmetric data', primary: true, onClick: () => {
    points = [3, 4, 5, 5, 6, 6, 7, 8];
  } });
  const oneB = button({ label: 'Add 1 outlier', onClick: () => points.push(95) });
  const skewB = button({ label: 'Income-like', onClick: () => {
    points = [10, 12, 13, 13, 14, 15, 15, 16, 17, 95];
  } });
  const clearB = button({ label: 'Clear', onClick: () => { points = []; } });
  ctrlPanel.append(row(symB, oneB, skewB, clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
