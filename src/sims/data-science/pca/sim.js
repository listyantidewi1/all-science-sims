import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

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

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  let points = [];
  let drag = -1;

  function seedElongated() {
    points = [];
    const ang = Math.PI / 6;
    for (let i = 0; i < 50; i++) {
      const u = (Math.random() - 0.5) * 6;
      const v = gaussian() * 0.6;
      const x = u * Math.cos(ang) - v * Math.sin(ang);
      const y = u * Math.sin(ang) + v * Math.cos(ang);
      points.push({ x, y });
    }
  }
  seedElongated();

  function pca(pts) {
    if (pts.length < 2) return null;
    let mx = 0, my = 0;
    for (const p of pts) { mx += p.x; my += p.y; }
    mx /= pts.length; my /= pts.length;
    let sxx = 0, syy = 0, sxy = 0;
    for (const p of pts) {
      sxx += (p.x - mx) ** 2;
      syy += (p.y - my) ** 2;
      sxy += (p.x - mx) * (p.y - my);
    }
    const n = pts.length - 1 || 1;
    sxx /= n; syy /= n; sxy /= n;
    // 2x2 eigendecomposition
    const tr = sxx + syy;
    const det = sxx * syy - sxy * sxy;
    const disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
    const lam1 = tr / 2 + disc;
    const lam2 = tr / 2 - disc;
    // eigenvector for lam1: (sxy, lam1 - sxx) typically; handle when sxy ≈ 0
    let v1x, v1y;
    if (Math.abs(sxy) > 1e-9) { v1x = lam1 - syy; v1y = sxy; }
    else if (sxx >= syy) { v1x = 1; v1y = 0; }
    else { v1x = 0; v1y = 1; }
    const len = Math.hypot(v1x, v1y) || 1;
    return {
      mean: { x: mx, y: my },
      pc1: { x: v1x / len, y: v1y / len, lambda: lam1 },
      pc2: { x: -v1y / len, y: v1x / len, lambda: lam2 },
    };
  }

  const SCALE = 30;
  function w2s(p, W, H) { return { x: W / 2 + p.x * SCALE, y: H / 2 - p.y * SCALE }; }
  function s2w(sx, sy, W, H) { return { x: (sx - W / 2) / SCALE, y: -(sy - H / 2) / SCALE }; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(W / 2 + i * SCALE, 0); ctx.lineTo(W / 2 + i * SCALE, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, H / 2 + i * SCALE); ctx.lineTo(W, H / 2 + i * SCALE); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.stroke();

    // points
    for (let i = 0; i < points.length; i++) {
      const s = w2s(points[i], W, H);
      ctx.fillStyle = i === drag ? '#fbbf24' : '#0ea5e9';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    const r = pca(points);
    if (!r) return;
    const cs = w2s(r.mean, W, H);

    // PC1, PC2 axes
    function drawAxis(vec, lambda, color, label) {
      const len = Math.sqrt(Math.max(0, lambda)) * SCALE * 2;
      const dx = vec.x * len, dy = -vec.y * len;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cs.x - dx, cs.y - dy);
      ctx.lineTo(cs.x + dx, cs.y + dy);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(label, cs.x + dx + 6, cs.y + dy);
    }
    drawAxis(r.pc1, r.pc1.lambda, '#ec4899', 'PC1');
    drawAxis(r.pc2, r.pc2.lambda, '#10b981', 'PC2');

    // mean
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(cs.x, cs.y, 5, 0, Math.PI * 2); ctx.fill();

    // info
    const total = r.pc1.lambda + r.pc2.lambda || 1;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#ec4899';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`PC1 var = ${r.pc1.lambda.toFixed(3)}  (${(r.pc1.lambda / total * 100).toFixed(1)}%)`, 16, 26);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`PC2 var = ${r.pc2.lambda.toFixed(3)}  (${(r.pc2.lambda / total * 100).toFixed(1)}%)`, 16, 44);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`mean (${r.mean.x.toFixed(2)}, ${r.mean.y.toFixed(2)})`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag any point. Click empty space to add.', 12, H - 12);
  }

  // mouse
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    let best = -1, bestD = 14;
    for (let i = 0; i < points.length; i++) {
      const s = w2s(points[i], cv.width, cv.height);
      const d = Math.hypot(p.x - s.x, p.y - s.y);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best >= 0) drag = best;
    else {
      points.push(s2w(p.x, p.y, cv.width, cv.height));
      drag = points.length - 1;
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (drag < 0) return;
    const p = localPos(e);
    points[drag] = s2w(p.x, p.y, cv.width, cv.height);
  });
  window.addEventListener('mouseup', () => { drag = -1; });

  // controls
  const elB = button({ label: 'Elongated cloud', primary: true, onClick: seedElongated });
  const isoB = button({ label: 'Isotropic blob', onClick: () => {
    points = [];
    for (let i = 0; i < 50; i++) points.push({ x: gaussian(), y: gaussian() });
  } });
  const lineB = button({ label: 'Near a line', onClick: () => {
    points = [];
    for (let i = 0; i < 40; i++) {
      const u = (Math.random() - 0.5) * 6;
      points.push({ x: u, y: u * 0.7 + gaussian() * 0.15 });
    }
  } });
  const clearB = button({ label: 'Clear', onClick: () => { points = []; } });
  ctrlPanel.append(row(elB, isoB, lineB, clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
