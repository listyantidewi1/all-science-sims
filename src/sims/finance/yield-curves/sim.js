import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Tenors (years) and yield (%)
  let curve = [
    { t: 0.25, y: 4.0 },
    { t: 0.5,  y: 4.1 },
    { t: 1,    y: 4.3 },
    { t: 2,    y: 4.5 },
    { t: 5,    y: 4.7 },
    { t: 10,   y: 5.0 },
    { t: 20,   y: 5.2 },
    { t: 30,   y: 5.3 },
  ];
  let drag = -1;

  const Y_MIN = 0, Y_MAX = 8;
  const T_MIN = 0, T_MAX = 30;

  function w2sX(t, W) { return 60 + (t / T_MAX) * (W - 90); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 80); }

  function shape() {
    const y2 = curve.find((p) => p.t === 2)?.y ?? 0;
    const y10 = curve.find((p) => p.t === 10)?.y ?? 0;
    const spread = y10 - y2;
    if (spread > 0.3) return { name: 'Normal (steep)', color: '#10b981', spread };
    if (spread > -0.05) return { name: 'Flat / mildly inverted', color: '#fbbf24', spread };
    return { name: 'Inverted (recession warning)', color: '#ef4444', spread };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (let y = 0; y <= 8; y++) {
      ctx.beginPath(); ctx.moveTo(60, w2sY(y, H)); ctx.lineTo(W - 30, w2sY(y, H)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${y}%`, 30, w2sY(y, H) + 3);
    }
    for (const t of [0, 1, 2, 5, 10, 20, 30]) {
      ctx.beginPath(); ctx.moveTo(w2sX(t, W), 30); ctx.lineTo(w2sX(t, W), H - 50); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${t}y`, w2sX(t, W) - 8, H - 36);
    }

    // curve
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < curve.length; i++) {
      const sx = w2sX(curve[i].t, W), sy = w2sY(curve[i].y, H);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // points
    for (let i = 0; i < curve.length; i++) {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(w2sX(curve[i].t, W), w2sY(curve[i].y, H), 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // shape diagnosis
    const s = shape();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = s.color;
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(s.name, 16, 28);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`10y − 2y spread: ${s.spread >= 0 ? '+' : ''}${s.spread.toFixed(2)}%`, 16, 46);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Maturity →', W - 100, H - 12);
    ctx.save(); ctx.translate(20, H / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Yield (%)', 0, 0); ctx.restore();
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    let best = -1, bestD = 18;
    for (let i = 0; i < curve.length; i++) {
      const d = Math.hypot(p.x - w2sX(curve[i].t, cv.width), p.y - w2sY(curve[i].y, cv.height));
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best >= 0) drag = best;
  });
  window.addEventListener('mousemove', (e) => {
    if (drag < 0) return;
    const p = localPos(e);
    const newY = ((cv.height - 50 - p.y) / (cv.height - 80)) * (Y_MAX - Y_MIN);
    curve[drag].y = Math.max(0, Math.min(Y_MAX, newY));
  });
  window.addEventListener('mouseup', () => { drag = -1; });

  // controls
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, ys] of [
    ['Normal',     [4.0, 4.1, 4.3, 4.5, 4.7, 5.0, 5.2, 5.3]],
    ['Steep',      [3.0, 3.1, 3.3, 3.6, 4.2, 5.0, 5.6, 5.8]],
    ['Flat',       [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5]],
    ['Inverted',   [5.5, 5.4, 5.2, 5.0, 4.7, 4.5, 4.4, 4.3]],
    ['Humped',     [4.0, 4.3, 4.7, 5.2, 5.0, 4.7, 4.5, 4.4]],
  ]) {
    const b = button({ label: name, onClick: () => {
      ys.forEach((y, i) => { if (curve[i]) curve[i].y = y; });
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
