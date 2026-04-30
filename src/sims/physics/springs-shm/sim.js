import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    m: 1.0,        // kg
    k: 8.0,        // N/m
    damping: 0.0,
    g: 9.8,        // gravity (used to find equilibrium offset)
    amplitude: 1.0, // initial displacement
  };

  let y = 0, vy = 0, t = 0;
  let history = []; // {t, y}
  let dragging = false;
  let dragOffset = 0;

  function reset() {
    y = params.amplitude;
    vy = 0;
    t = 0;
    history = [];
  }
  reset();

  function step(dt) {
    if (dragging) { history.push({ t, y }); if (history.length > 800) history.shift(); t += dt; return; }
    const sub = 4;
    const h = dt / sub;
    for (let s = 0; s < sub; s++) {
      const a = -(params.k / params.m) * y - params.damping * vy;
      vy += a * h;
      y += vy * h;
    }
    t += dt;
    history.push({ t, y });
    if (history.length > 800) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // split: left third = spring, right two-thirds = graph
    const leftW = W * 0.34;
    const cx = leftW / 2;
    const ceilY = 30;
    const equil = H / 2 + 20;
    const scale = 60; // px per unit displacement

    // Ceiling
    ctx.fillStyle = 'rgba(120,130,150,0.5)';
    ctx.fillRect(cx - 60, ceilY - 8, 120, 6);
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 60 + i * 17, ceilY - 8);
      ctx.lineTo(cx - 60 + i * 17 - 6, ceilY - 16);
      ctx.stroke();
    }

    // Mass position
    const massY = equil + y * scale;
    // Spring zigzag from ceiling to mass
    drawSpring(ctx, cx, ceilY, cx, massY - 22);

    // Mass
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(cx - 26, massY - 22, 52, 44);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 26, massY - 22, 52, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText(`${params.m.toFixed(1)} kg`, cx, massY + 5);
    ctx.textAlign = 'left';

    // Equilibrium reference
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx - 60, equil); ctx.lineTo(cx + 60, equil);
    ctx.stroke();
    ctx.setLineDash([]);

    // Graph (right)
    drawGraph(ctx, leftW + 20, 30, W - leftW - 40, H - 60);

    // Info
    const T = 2 * Math.PI * Math.sqrt(params.m / params.k);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(8, 8, 230, 38);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`T = 2π√(m/k) = ${T.toFixed(2)} s`, 16, 28);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the blue mass up or down', 12, H - 12);
  }

  function drawSpring(ctx, x1, y1, x2, y2) {
    const segs = 16;
    const dx = (x2 - x1) / segs;
    const dy = (y2 - y1) / segs;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i < segs; i++) {
      const px = x1 + dx * i + (i % 2 === 0 ? -8 : 8);
      const py = y1 + dy * i;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawGraph(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    if (history.length < 2) return;
    const tWindow = 8;
    const tEnd = history[history.length - 1].t;
    const tStart = Math.max(0, tEnd - tWindow);
    const yMax = 1.5 * Math.max(0.5, params.amplitude);
    const x2 = (tt) => x + ((tt - tStart) / tWindow) * w;
    const y2 = (yy) => y + h / 2 + (yy / yMax) * (h / 2 - 8);

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.beginPath();
    ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2);
    ctx.stroke();
    // y-axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('+A', x + 4, y + h * 0.15);
    ctx.fillText('0', x + 4, y + h / 2 + 12);
    ctx.fillText('−A', x + 4, y + h * 0.85);
    ctx.fillText('time →', x + w - 50, y + h - 4);

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h_ of history) {
      if (h_.t < tStart) continue;
      const sx = x2(h_.t), sy = y2(h_.y);
      if (!started) { ctx.moveTo(sx, sy); started = true; }
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  // Drag the mass
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const cx = cv.width * 0.34 / 2;
    const equil = cv.height / 2 + 20;
    const massY = equil + y * 60;
    if (p.x > cx - 30 && p.x < cx + 30 && Math.abs(p.y - massY) < 28) {
      dragging = true;
      dragOffset = p.y - massY;
      vy = 0;
      cv.canvas.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const p = localPos(e);
    const equil = cv.height / 2 + 20;
    y = (p.y - dragOffset - equil) / 60;
    y = Math.max(-2.5, Math.min(2.5, y));
    vy = 0;
  });
  window.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; cv.canvas.style.cursor = 'grab'; vy = 0; t = 0; history = []; }
  });

  // controls
  const mS = slider({ label: 'Mass m (kg)', min: 0.1, max: 5, step: 0.1, value: params.m, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m = v; reset(); } });
  const kS = slider({ label: 'Stiffness k (N/m)', min: 1, max: 30, step: 0.5, value: params.k, format: (v) => v.toFixed(1),
    onInput: (v) => { params.k = v; reset(); } });
  const dS = slider({ label: 'Damping', min: 0, max: 2, step: 0.05, value: params.damping, format: (v) => v.toFixed(2),
    onInput: (v) => { params.damping = v; } });
  const ampS = slider({ label: 'Initial displacement', min: 0.1, max: 2, step: 0.05, value: params.amplitude, format: (v) => v.toFixed(2),
    onInput: (v) => { params.amplitude = v; reset(); } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(mS.el, kS.el, dS.el, ampS.el, row(resetB));

  // Lab — verify T = 2π√(m/k) and that amplitude doesn't affect period.
  const lab = labPanel({
    title: 'Spring SHM lab — period vs mass and stiffness',
    filename: 'springs-shm-lab.csv',
    columns: [
      { key: 'm',       label: 'm (kg)',  format: (v) => v.toFixed(2) },
      { key: 'k',       label: 'k (N/m)', format: (v) => v.toFixed(1) },
      { key: 'amp',     label: 'A₀',      format: (v) => v.toFixed(2) },
      { key: 'T_theory', label: 'T = 2π√(m/k)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Set m = 1, k = 8, no damping. Predict T = 2π√(1/8) ≈ 2.22 s. Record.',
      'Quadruple mass (m = 4): predicts T to double. Record.',
      'Quadruple k instead (k = 32): predicts T to halve. Record.',
      'Vary amplitude only (m, k fixed) — T should not change.',
      'Add damping — T (period of decaying oscillation) is barely affected for light damping.',
    ],
    predict: 'If m = 2 kg and k = 50 N/m, what is T? Now what if you double both?',
    source: () => ({
      m: params.m, k: params.k, amp: params.amplitude,
      T_theory: 2 * Math.PI * Math.sqrt(params.m / params.k),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
