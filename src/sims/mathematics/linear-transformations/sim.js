import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    e1: { x: 1, y: 0 },
    e2: { x: 0, y: 1 },
    showShape: true,
  };
  let drag = null;

  const SCALE = 50;
  function w2s(p, W, H) { return { x: W / 2 + p.x * SCALE, y: H / 2 - p.y * SCALE }; }
  function s2w(sx, sy, W, H) { return { x: (sx - W / 2) / SCALE, y: -(sy - H / 2) / SCALE }; }

  function transform(p) {
    return {
      x: params.e1.x * p.x + params.e2.x * p.y,
      y: params.e1.y * p.x + params.e2.y * p.y,
    };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Original grid (faded)
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(W / 2 + i * SCALE, 0); ctx.lineTo(W / 2 + i * SCALE, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, H / 2 + i * SCALE); ctx.lineTo(W, H / 2 + i * SCALE); ctx.stroke();
    }

    // Transformed grid lines
    ctx.strokeStyle = 'rgba(14,165,233,0.5)';
    ctx.lineWidth = 1.5;
    for (let i = -8; i <= 8; i++) {
      // horizontal lines (x-direction in domain) → maps to e2 stretched
      const start = transform({ x: -8, y: i });
      const end = transform({ x: 8, y: i });
      const s1 = w2s(start, W, H), s2 = w2s(end, W, H);
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y);
      ctx.stroke();
    }
    for (let i = -8; i <= 8; i++) {
      const start = transform({ x: i, y: -8 });
      const end = transform({ x: i, y: 8 });
      const s1 = w2s(start, W, H), s2 = w2s(end, W, H);
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y);
      ctx.stroke();
    }

    // Sample shape: smiley square or just unit square
    if (params.showShape) {
      const corners = [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 },
      ].map(transform).map((p) => w2s(p, W, H));
      ctx.fillStyle = 'rgba(245,158,11,0.4)';
      ctx.beginPath();
      for (let i = 0; i < corners.length; i++) {
        if (i === 0) ctx.moveTo(corners[i].x, corners[i].y);
        else ctx.lineTo(corners[i].x, corners[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.stroke();
      // mark the (0,0) corner with a dot, and (1,0) with a small triangle
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(corners[0].x, corners[0].y, 4, 0, Math.PI * 2); ctx.fill();
    }

    // Basis vectors
    const e1S = w2s(params.e1, W, H);
    const e2S = w2s(params.e2, W, H);
    const O = w2s({ x: 0, y: 0 }, W, H);
    drawArrow(ctx, O.x, O.y, e1S.x, e1S.y, '#0ea5e9');
    drawArrow(ctx, O.x, O.y, e2S.x, e2S.y, '#ec4899');
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText('Ae₁', e1S.x + 6, e1S.y - 6);
    ctx.fillStyle = '#ec4899';
    ctx.fillText('Ae₂', e2S.x + 6, e2S.y - 6);

    // Info
    const det = params.e1.x * params.e2.y - params.e1.y * params.e2.x;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 300, 64);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`A = [ ${params.e1.x.toFixed(2)}  ${params.e2.x.toFixed(2)} ]`, 16, 26);
    ctx.fillText(`    [ ${params.e1.y.toFixed(2)}  ${params.e2.y.toFixed(2)} ]`, 16, 42);
    ctx.fillStyle = det < 0 ? '#fbbf24' : '#10b981';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`det A = ${det.toFixed(2)}${det < 0 ? ' (orientation flipped)' : ''}`, 16, 62);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the blue (e₁) or pink (e₂) arrowhead', 12, H - 12);
  }

  function drawArrow(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 10;
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
    const e1S = w2s(params.e1, cv.width, cv.height);
    const e2S = w2s(params.e2, cv.width, cv.height);
    if (Math.hypot(p.x - e1S.x, p.y - e1S.y) < 18) drag = 'e1';
    else if (Math.hypot(p.x - e2S.x, p.y - e2S.y) < 18) drag = 'e2';
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params[drag] = s2w(p.x, p.y, cv.width, cv.height);
  });
  window.addEventListener('mouseup', () => { drag = null; });

  // controls
  const shapeT = toggle({ label: 'Show unit-square image', value: params.showShape, onChange: (v) => { params.showShape = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  const presets = [
    ['Identity', { x: 1, y: 0 }, { x: 0, y: 1 }],
    ['Rotate 90°', { x: 0, y: 1 }, { x: -1, y: 0 }],
    ['Reflect x', { x: 1, y: 0 }, { x: 0, y: -1 }],
    ['Shear x', { x: 1, y: 0 }, { x: 1, y: 1 }],
    ['Scale 2×', { x: 2, y: 0 }, { x: 0, y: 2 }],
    ['Singular', { x: 1, y: 1 }, { x: 1, y: 1 }],
  ];
  for (const [name, e1, e2] of presets) {
    const b = button({ label: name, onClick: () => { params.e1 = { ...e1 }; params.e2 = { ...e2 }; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(shapeT.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
