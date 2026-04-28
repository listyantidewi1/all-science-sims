import { createCanvas, loop } from '../../../lib/canvas.js';
import { toggle, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    a: { x: 3, y: 1 },
    b: { x: 1, y: 2 },
    showSum: true,
    showDiff: false,
    showProj: true,
  };
  let drag = null; // 'a' | 'b'

  const SCALE = 40;
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
    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.stroke();

    const aS = w2s(params.a, W, H), bS = w2s(params.b, W, H);
    const O = { x: W / 2, y: H / 2 };

    // sum
    if (params.showSum) {
      const sum = { x: params.a.x + params.b.x, y: params.a.y + params.b.y };
      const sumS = w2s(sum, W, H);
      drawArrow(ctx, O.x, O.y, sumS.x, sumS.y, '#10b981', 3);
      // parallelogram
      ctx.strokeStyle = 'rgba(16,185,129,0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(aS.x, aS.y); ctx.lineTo(sumS.x, sumS.y);
      ctx.moveTo(bS.x, bS.y); ctx.lineTo(sumS.x, sumS.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (params.showDiff) {
      const diff = { x: params.a.x - params.b.x, y: params.a.y - params.b.y };
      const dS = w2s(diff, W, H);
      drawArrow(ctx, O.x, O.y, dS.x, dS.y, '#fbbf24', 2);
    }
    // projection of a onto b
    if (params.showProj) {
      const dot = params.a.x * params.b.x + params.a.y * params.b.y;
      const bMag2 = params.b.x * params.b.x + params.b.y * params.b.y;
      if (bMag2 > 1e-6) {
        const k = dot / bMag2;
        const proj = { x: k * params.b.x, y: k * params.b.y };
        const pS = w2s(proj, W, H);
        ctx.strokeStyle = 'rgba(168,139,250,0.6)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(aS.x, aS.y); ctx.lineTo(pS.x, pS.y);
        ctx.stroke();
        ctx.setLineDash([]);
        drawArrow(ctx, O.x, O.y, pS.x, pS.y, '#a78bfa', 2);
      }
    }

    // a and b
    drawArrow(ctx, O.x, O.y, aS.x, aS.y, '#0ea5e9', 4);
    drawArrow(ctx, O.x, O.y, bS.x, bS.y, '#ec4899', 4);

    // labels
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText('a', aS.x + 6, aS.y - 6);
    ctx.fillStyle = '#ec4899';
    ctx.fillText('b', bS.x + 6, bS.y - 6);

    // info
    const dot = params.a.x * params.b.x + params.a.y * params.b.y;
    const aMag = Math.hypot(params.a.x, params.a.y);
    const bMag = Math.hypot(params.b.x, params.b.y);
    const cos = (aMag * bMag) > 0 ? dot / (aMag * bMag) : 0;
    const ang = Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
    const cross = params.a.x * params.b.y - params.a.y * params.b.x;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 80);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`a = (${params.a.x.toFixed(1)}, ${params.a.y.toFixed(1)})    |a| = ${aMag.toFixed(2)}`, 16, 26);
    ctx.fillText(`b = (${params.b.x.toFixed(1)}, ${params.b.y.toFixed(1)})    |b| = ${bMag.toFixed(2)}`, 16, 44);
    ctx.fillText(`a · b = ${dot.toFixed(2)}    angle = ${ang.toFixed(1)}°`, 16, 62);
    ctx.fillText(`a × b (z-comp) = ${cross.toFixed(2)}`, 16, 80);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the tip of either vector', 12, H - 12);
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, lw) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 9;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.45), y2 - sz * Math.sin(ang - 0.45));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.45), y2 - sz * Math.sin(ang + 0.45));
    ctx.closePath();
    ctx.fill();
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const aS = w2s(params.a, cv.width, cv.height);
    const bS = w2s(params.b, cv.width, cv.height);
    if (Math.hypot(p.x - aS.x, p.y - aS.y) < 18) drag = 'a';
    else if (Math.hypot(p.x - bS.x, p.y - bS.y) < 18) drag = 'b';
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    const w = s2w(p.x, p.y, cv.width, cv.height);
    params[drag] = w;
  });
  window.addEventListener('mouseup', () => { drag = null; });

  // controls
  const sumT = toggle({ label: 'Show a + b', value: params.showSum, onChange: (v) => { params.showSum = v; } });
  const diffT = toggle({ label: 'Show a − b', value: params.showDiff, onChange: (v) => { params.showDiff = v; } });
  const projT = toggle({ label: 'Show projection of a onto b', value: params.showProj, onChange: (v) => { params.showProj = v; } });
  const perpB = button({ label: 'Make perpendicular', primary: true, onClick: () => {
    params.b = { x: -params.a.y, y: params.a.x };
  } });
  ctrlPanel.append(sumT.el, diffT.el, projT.el, row(perpB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
