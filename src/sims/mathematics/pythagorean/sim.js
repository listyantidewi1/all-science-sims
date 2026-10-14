import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  // Triangle vertices: A (right angle), B, C
  // We place A at the bottom-left, B horizontally to the right, C vertically up.
  // a = AC (vertical), b = AB (horizontal), c = BC (hypotenuse)
  const params = {
    a: 4,   // vertical leg
    b: 3,   // horizontal leg
  };
  let drag = null; // 'B' (horizontal extent) | 'C' (vertical extent)

  const MAX_SCALE = 30, MAX_LEG = 16;
  let dragScale = null; // scale frozen during a drag so the handle stays under the pointer
  function center() { return { x: cv.width * 0.45, y: cv.height * 0.55 }; }
  // Pixels per unit: shrink the drawing (never the numbers) so the triangle and all three
  // outward squares fit the stage. They extend a left of A, b below A, and a+b right of / above A.
  function scale() {
    if (dragScale != null) return dragScale;
    const o = center(), a = params.a, b = params.b, m = 24;
    return Math.min(MAX_SCALE, (o.x - m) / a, (cv.height - o.y - m) / b, (cv.width - o.x - m) / (a + b), (o.y - m) / (a + b));
  }

  function points() {
    const o = center(), s = scale();
    return {
      A: { x: o.x, y: o.y },
      B: { x: o.x + params.b * s, y: o.y },
      C: { x: o.x, y: o.y - params.a * s },
    };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const p = points();
    const SCALE = scale();
    const a = params.a, b = params.b, c = Math.hypot(a, b);
    const aPx = a * SCALE, bPx = b * SCALE, cPx = c * SCALE;

    // Square on side b (below the horizontal leg)
    ctx.fillStyle = 'rgba(14,165,233,0.35)';
    ctx.fillRect(p.A.x, p.A.y, bPx, bPx);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.strokeRect(p.A.x, p.A.y, bPx, bPx);

    // Square on side a (left of vertical leg)
    ctx.fillStyle = 'rgba(236,72,153,0.35)';
    ctx.fillRect(p.A.x - aPx, p.C.y, aPx, aPx);
    ctx.strokeStyle = '#ec4899';
    ctx.strokeRect(p.A.x - aPx, p.C.y, aPx, aPx);

    // Square on hypotenuse — rotated; local +y (after rotate) points away from A, so the square sits outside
    const hypAngle = Math.atan2(p.C.y - p.B.y, p.C.x - p.B.x);
    ctx.save();
    ctx.translate(p.B.x, p.B.y);
    ctx.rotate(hypAngle);
    ctx.fillStyle = 'rgba(16,185,129,0.35)';
    ctx.fillRect(0, 0, cPx, cPx);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(0, 0, cPx, cPx);
    ctx.restore();

    // Triangle on top
    ctx.fillStyle = 'rgba(251,191,36,0.45)';
    ctx.beginPath();
    ctx.moveTo(p.A.x, p.A.y); ctx.lineTo(p.B.x, p.B.y); ctx.lineTo(p.C.x, p.C.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Right angle marker
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(p.A.x, p.A.y - 12, 12, 12);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(p.A.x + 2, p.A.y - 10, 8, 8);

    // Drag handles on B and C
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(p.B.x, p.B.y, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(p.C.x, p.C.y, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath(); ctx.arc(p.B.x, p.B.y, 8, 0, Math.PI * 2); ctx.stroke();

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`a = ${a.toFixed(2)}`, p.A.x - aPx / 2 - 10, p.C.y + aPx / 2);
    ctx.fillText(`b = ${b.toFixed(2)}`, p.A.x + bPx / 2 - 16, p.A.y + bPx / 2 + 6);
    ctx.fillText(`c = ${c.toFixed(2)}`, (p.B.x + p.C.x) / 2 + 10, (p.B.y + p.C.y) / 2);

    // Equation
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`a² + b² = c²`, 16, 28);
    ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`${(a * a).toFixed(2)} + ${(b * b).toFixed(2)} = ${(c * c).toFixed(2)} ✓`, 16, 44);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Drag the red dots at B (right) and C (top)', 12, H - 12);
  }

  // drag handles
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.style.touchAction = 'none'; // let touch drags reach the canvas instead of scrolling
  cv.canvas.addEventListener('pointerdown', (e) => {
    const pos = localPos(e);
    const p = points();
    if (Math.hypot(pos.x - p.B.x, pos.y - p.B.y) < 16) drag = 'B';
    else if (Math.hypot(pos.x - p.C.x, pos.y - p.C.y) < 16) drag = 'C';
    if (drag) dragScale = scale();
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const pos = localPos(e);
    const o = center();
    const s = scale();
    if (drag === 'B') {
      params.b = Math.max(0.5, Math.min(MAX_LEG, (pos.x - o.x) / s));
    } else if (drag === 'C') {
      params.a = Math.max(0.5, Math.min(MAX_LEG, (o.y - pos.y) / s));
    }
  });
  window.addEventListener('pointerup', () => { drag = null; dragScale = null; });

  // controls
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, a, b] of [['3-4-5', 4, 3], ['5-12-13', 12, 5], ['8-15-17', 15, 8], ['Isosceles', 4, 4]]) {
    // exact integer sides; scale() shrinks the drawing so the larger triples still fit
    const btn = button({ label: name, onClick: () => { params.a = a; params.b = b; } });
    presetRow.appendChild(btn.el);
  }
  ctrlPanel.append(presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
