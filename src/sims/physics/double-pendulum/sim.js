import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

// Equations of motion for a planar double pendulum.
// State: (theta1, omega1, theta2, omega2). Derivation: standard Lagrangian.
function derivs(s, p) {
  const [t1, w1, t2, w2] = s;
  const m1 = p.m1, m2 = p.m2, L1 = p.L1, L2 = p.L2, g = p.g;
  const dt = t1 - t2;
  const sd = Math.sin(dt), cd = Math.cos(dt);
  const denom1 = (2 * m1 + m2 - m2 * Math.cos(2 * t1 - 2 * t2));
  const num1 = -g * (2 * m1 + m2) * Math.sin(t1)
               - m2 * g * Math.sin(t1 - 2 * t2)
               - 2 * sd * m2 * (w2 * w2 * L2 + w1 * w1 * L1 * cd);
  const a1 = num1 / (L1 * denom1);
  const num2 = 2 * sd * (w1 * w1 * L1 * (m1 + m2)
               + g * (m1 + m2) * Math.cos(t1)
               + w2 * w2 * L2 * m2 * cd);
  const a2 = num2 / (L2 * denom1);
  return [w1, a1, w2, a2];
}

function rk4(s, dt, p) {
  const k1 = derivs(s, p);
  const s2 = s.map((v, i) => v + k1[i] * dt / 2);
  const k2 = derivs(s2, p);
  const s3 = s.map((v, i) => v + k2[i] * dt / 2);
  const k3 = derivs(s3, p);
  const s4 = s.map((v, i) => v + k3[i] * dt);
  const k4 = derivs(s4, p);
  return s.map((v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    m1: 1, m2: 1, L1: 1, L2: 1, g: 9.8,
    showGhost: true,
    showTrail: true,
  };

  // Two systems: "real" and "ghost" with tiny perturbation
  let A = [Math.PI / 2, 0, Math.PI / 2 + 0.01, 0];
  let B = [Math.PI / 2 + 1e-5, 0, Math.PI / 2 + 0.01, 0];
  let trailA = [];
  let trailB = [];
  let dragging = null;  // 'p1' | 'p2' | null

  function reset() {
    A = [Math.PI / 2, 0, Math.PI / 2 + 0.01, 0];
    B = [Math.PI / 2 + 1e-5, 0, Math.PI / 2 + 0.01, 0];
    trailA = []; trailB = [];
  }

  function step(dt) {
    if (dragging) return;
    const sub = 4;
    const h = dt / sub;
    for (let s = 0; s < sub; s++) {
      A = rk4(A, h, params);
      B = rk4(B, h, params);
    }
  }

  function bobPositions(s, scale, cx, cy) {
    const x1 = cx + Math.sin(s[0]) * params.L1 * scale;
    const y1 = cy + Math.cos(s[0]) * params.L1 * scale;
    const x2 = x1 + Math.sin(s[2]) * params.L2 * scale;
    const y2 = y1 + Math.cos(s[2]) * params.L2 * scale;
    return { x1, y1, x2, y2 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H * 0.32;
    const scale = Math.min(W, H) * 0.18;

    // record trails
    const a = bobPositions(A, scale, cx, cy);
    const b = bobPositions(B, scale, cx, cy);
    trailA.push({ x: a.x2, y: a.y2 });
    trailB.push({ x: b.x2, y: b.y2 });
    if (trailA.length > 600) trailA.shift();
    if (trailB.length > 600) trailB.shift();

    // trails
    if (params.showTrail) {
      ctx.lineWidth = 1.5;
      if (params.showGhost) {
        ctx.strokeStyle = 'rgba(239,68,68,0.4)';
        drawTrail(ctx, trailB);
      }
      ctx.strokeStyle = 'rgba(59,130,246,0.6)';
      drawTrail(ctx, trailA);
    }

    // ghost pendulum (B)
    if (params.showGhost) {
      ctx.strokeStyle = 'rgba(239,68,68,0.5)';
      ctx.fillStyle = 'rgba(239,68,68,0.6)';
      drawPendulum(ctx, cx, cy, b.x1, b.y1, b.x2, b.y2, params.m1 * 6, params.m2 * 6);
    }

    // real pendulum (A)
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = '#3b82f6';
    drawPendulum(ctx, cx, cy, a.x1, a.y1, a.x2, a.y2, params.m1 * 6, params.m2 * 6);

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 250, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    const sep = Math.hypot(a.x2 - b.x2, a.y2 - b.y2).toFixed(0);
    ctx.fillText(`Drag a bob to set position.    Δ separation: ${sep} px`, 14, 26);
  }

  function drawPendulum(ctx, cx, cy, x1, y1, x2, y2, r1, r2) {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x1, y1, r1 + 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x2, y2, r2 + 3, 0, Math.PI * 2); ctx.fill();
  }

  function drawTrail(ctx, t) {
    if (t.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(t[0].x, t[0].y);
    for (let i = 1; i < t.length; i++) ctx.lineTo(t[i].x, t[i].y);
    ctx.stroke();
  }

  // Drag handlers
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const cx = cv.width / 2, cy = cv.height * 0.32;
    const scale = Math.min(cv.width, cv.height) * 0.18;
    const a = bobPositions(A, scale, cx, cy);
    if (Math.hypot(p.x - a.x2, p.y - a.y2) < 18) dragging = 'p2';
    else if (Math.hypot(p.x - a.x1, p.y - a.y1) < 18) dragging = 'p1';
    if (dragging) cv.canvas.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const p = localPos(e);
    const cx = cv.width / 2, cy = cv.height * 0.32;
    const scale = Math.min(cv.width, cv.height) * 0.18;
    if (dragging === 'p1') {
      const dx = p.x - cx, dy = p.y - cy;
      A[0] = Math.atan2(dx, dy);
      A[1] = 0; A[3] = 0;
    } else if (dragging === 'p2') {
      const a = bobPositions(A, scale, cx, cy);
      const dx = p.x - a.x1, dy = p.y - a.y1;
      A[2] = Math.atan2(dx, dy);
      A[1] = 0; A[3] = 0;
    }
    // perturb B by tiny amount
    B = [A[0] + 1e-5, 0, A[2], 0];
    trailA = []; trailB = [];
  });
  window.addEventListener('mouseup', () => {
    dragging = null;
    cv.canvas.style.cursor = 'grab';
  });

  // controls
  const m1S = slider({ label: 'Mass 1', min: 0.1, max: 5, step: 0.1, value: params.m1, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m1 = v; } });
  const m2S = slider({ label: 'Mass 2', min: 0.1, max: 5, step: 0.1, value: params.m2, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m2 = v; } });
  const L1S = slider({ label: 'Length 1', min: 0.3, max: 2, step: 0.05, value: params.L1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.L1 = v; } });
  const L2S = slider({ label: 'Length 2', min: 0.3, max: 2, step: 0.05, value: params.L2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.L2 = v; } });
  const ghostT = toggle({ label: 'Ghost (perturbed copy)', value: params.showGhost, onChange: (v) => { params.showGhost = v; } });
  const trailT = toggle({ label: 'Show trail', value: params.showTrail, onChange: (v) => { params.showTrail = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(m1S.el, m2S.el, L1S.el, L2S.el, ghostT.el, trailT.el, row(resetB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
