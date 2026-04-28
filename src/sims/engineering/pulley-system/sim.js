import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Block-and-tackle with N supporting rope segments.
// Mechanical advantage = N. Pull rope by Δ, load rises by Δ/N.
// Effort force = weight / N (no friction).

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 10 });

  const params = {
    N: 2,           // mechanical advantage (rope segments supporting load)
    weight: 100,    // kg
    pulled: 0,      // total rope pulled (m)
  };

  const ROPE_MAX = 8; // total rope budget
  let lastDragY = null; // track relative drag

  function loadHeight() {
    return Math.min(ROPE_MAX / params.N, params.pulled / params.N);
  }

  function effortForce() {
    return params.weight * 9.8 / params.N;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Layout
    const ceilY = 60;
    const floorY = H - 80;
    const leftX = W * 0.5 - 80;
    const rightX = W * 0.5 + 80;
    const span = rightX - leftX;
    const N = params.N;
    const lift = loadHeight();
    const pixelLift = (lift / 4) * (floorY - ceilY - 60); // map up to 4 m

    // Ceiling
    ctx.fillStyle = '#475569';
    ctx.fillRect(W * 0.4 - 60, ceilY - 12, 280, 8);
    ctx.strokeStyle = '#64748b';
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(W * 0.4 - 60 + i * 24, ceilY - 12);
      ctx.lineTo(W * 0.4 - 64 + i * 24, ceilY - 20);
      ctx.stroke();
    }

    // Top fixed pulleys (positions across the ceiling, alternating left/right)
    const topPulleys = Math.ceil(N / 2);
    const botPulleys = Math.floor(N / 2);
    const topY = ceilY + 12;
    const botY = floorY - 60 - pixelLift;
    const topXs = [];
    const botXs = [];
    for (let i = 0; i < topPulleys; i++) {
      const x = leftX + (i / Math.max(1, topPulleys - 1 || 1)) * span * 0.4;
      topXs.push(x);
    }
    for (let i = 0; i < botPulleys; i++) {
      const x = leftX + 30 + (i / Math.max(1, botPulleys - 1 || 1)) * span * 0.3;
      botXs.push(x);
    }
    if (topPulleys === 1) topXs[0] = (leftX + rightX) / 2;
    if (botPulleys === 1) botXs[0] = (leftX + rightX) / 2;

    // Draw rope path: alternating top/bottom pulleys, ending at the effort hand
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    // Anchor at ceiling
    let x = W * 0.4 + 230, y = ceilY - 4;
    ctx.moveTo(x, y);
    let topIdx = 0, botIdx = 0;
    let nextDown = true;
    for (let seg = 0; seg < N; seg++) {
      if (nextDown) {
        const bx = botXs[botIdx++ % Math.max(1, botPulleys)];
        ctx.lineTo(bx, botY);
        nextDown = false;
      } else {
        const tx = topXs[topIdx++ % Math.max(1, topPulleys)];
        ctx.lineTo(tx, topY);
        nextDown = true;
      }
    }
    // Effort end: route to the right edge then down
    const handX = rightX + 60;
    const handY = ceilY + 60 + (params.pulled / ROPE_MAX) * (floorY - ceilY - 80);
    ctx.lineTo(handX, ceilY);
    ctx.lineTo(handX, handY);
    ctx.stroke();

    // Pulleys
    for (const tx of topXs) drawPulley(ctx, tx, topY);
    for (const bx of botXs) drawPulley(ctx, bx, botY);

    // Load block
    const loadW = 90, loadH = 50;
    const loadX = (leftX + rightX) / 2 - loadW / 2;
    const loadY = botY + 15;
    ctx.fillStyle = '#0ea5e9';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.fillRect(loadX, loadY, loadW, loadH);
    ctx.strokeRect(loadX, loadY, loadW, loadH);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${params.weight} kg`, loadX + loadW / 2, loadY + 30);
    ctx.textAlign = 'left';

    // Effort hand grip
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(handX, handY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('pull', handX, handY + 4);
    ctx.textAlign = 'left';

    // Floor
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, floorY, W, H - floorY);

    // Readouts
    const F = effortForce();
    const Win = F * params.pulled;
    const Wout = params.weight * 9.8 * lift;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Mechanical advantage: ${N}×`, 16, 28);
    ctx.font = '12px var(--font-mono)';
    ctx.fillStyle = '#10b981';
    ctx.fillText(`Effort force F = mg/N = ${F.toFixed(1)} N`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Pulled: ${params.pulled.toFixed(2)} m   Lifted: ${lift.toFixed(2)} m`, 16, 62);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`W_in ≈ ${Win.toFixed(0)} J   W_out ≈ ${Wout.toFixed(0)} J`, 16, 78);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red grip downward to pull the rope', 16, H - 10);
  }

  function drawPulley(ctx, cx, cy) {
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0b1220';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Drag the red grip vertically to pull the rope.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      const W = cv.width, H = cv.height;
      const ceilY = 60, floorY = H - 80;
      const rightX = W * 0.5 + 80;
      const handX = rightX + 60;
      const handY = ceilY + 60 + (params.pulled / ROPE_MAX) * (floorY - ceilY - 80);
      if (Math.hypot(sx - handX, sy - handY) < 24) return 'grip';
      return null;
    },
    onStart(_id, _sx, sy) { lastDragY = sy; },
    onDrag(_id, _sx, sy) {
      const W = cv.width, H = cv.height;
      const ceilY = 60, floorY = H - 80;
      const span = floorY - ceilY - 80;
      const dy = sy - lastDragY;
      lastDragY = sy;
      params.pulled = Math.max(0, Math.min(ROPE_MAX, params.pulled + dy / span * ROPE_MAX));
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const NS = select({
    label: 'Mechanical advantage',
    options: [
      { value: '1', label: '1× (single fixed pulley)' },
      { value: '2', label: '2×' },
      { value: '3', label: '3×' },
      { value: '4', label: '4×' },
      { value: '5', label: '5×' },
      { value: '6', label: '6×' },
    ],
    value: String(params.N),
    onChange: (v) => { params.N = Number(v); params.pulled = 0; },
  });
  const wS = slider({ label: 'Load weight (kg)', min: 10, max: 500, step: 5, value: params.weight,
    onInput: (v) => { params.weight = v; } });
  const resetB = button({ label: 'Lower load', primary: true, onClick: () => { params.pulled = 0; } });

  ctrlPanel.append(NS.el, wS.el, row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
