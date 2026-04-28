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
    z: { x: 1.2, y: 0.6 },
    showSquare: true,
    showCube: false,
    showInv: true,
    showExp: false,
    showConj: false,
  };
  let drag = false;

  const SCALE = 50;
  function w2s(p, W, H) { return { x: W / 2 + p.x * SCALE, y: H / 2 - p.y * SCALE }; }
  function s2w(sx, sy, W, H) { return { x: (sx - W / 2) / SCALE, y: -(sy - H / 2) / SCALE }; }

  function cMul(a, b) { return { x: a.x * b.x - a.y * b.y, y: a.x * b.y + a.y * b.x }; }
  function cInv(z) { const m = z.x * z.x + z.y * z.y; return m > 1e-9 ? { x: z.x / m, y: -z.y / m } : null; }
  function cExp(z) { const e = Math.exp(z.x); return { x: e * Math.cos(z.y), y: e * Math.sin(z.y) }; }
  function conj(z) { return { x: z.x, y: -z.y }; }

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
    // unit circle
    ctx.strokeStyle = 'rgba(245,158,11,0.4)';
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, SCALE, 0, Math.PI * 2);
    ctx.stroke();

    // labels for axes
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('Re', W - 18, H / 2 - 4);
    ctx.fillText('Im', W / 2 + 6, 12);

    // points
    function plot(p, color, label) {
      if (!p) return;
      const s = w2s(p, W, H);
      // line from origin
      ctx.strokeStyle = color + '88';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2, H / 2); ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(label, s.x + 8, s.y - 6);
    }

    if (params.showSquare) plot(cMul(params.z, params.z), '#10b981', 'z²');
    if (params.showCube) plot(cMul(cMul(params.z, params.z), params.z), '#f59e0b', 'z³');
    if (params.showInv) plot(cInv(params.z), '#ec4899', '1/z');
    if (params.showExp) plot(cExp(params.z), '#a78bfa', 'e^z');
    if (params.showConj) plot(conj(params.z), '#22d3ee', 'z̄');
    // z itself last
    plot(params.z, '#0ea5e9', 'z');

    // info
    const r = Math.hypot(params.z.x, params.z.y);
    const theta = Math.atan2(params.z.y, params.z.x) * 180 / Math.PI;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`z = ${params.z.x.toFixed(2)} + ${params.z.y.toFixed(2)}i`, 16, 26);
    ctx.fillText(`|z| = ${r.toFixed(2)}    arg = ${theta.toFixed(1)}°`, 16, 44);
    ctx.fillText(`z² has |·|=${(r*r).toFixed(2)} arg=${(theta*2).toFixed(1)}°`, 16, 62);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', () => { drag = true; });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params.z = s2w(p.x, p.y, cv.width, cv.height);
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const sqT = toggle({ label: 'Show z²', value: params.showSquare, onChange: (v) => { params.showSquare = v; } });
  const cuT = toggle({ label: 'Show z³', value: params.showCube, onChange: (v) => { params.showCube = v; } });
  const invT = toggle({ label: 'Show 1/z', value: params.showInv, onChange: (v) => { params.showInv = v; } });
  const expT = toggle({ label: 'Show e^z', value: params.showExp, onChange: (v) => { params.showExp = v; } });
  const conjT = toggle({ label: 'Show conjugate z̄', value: params.showConj, onChange: (v) => { params.showConj = v; } });
  const unitB = button({ label: 'Snap to unit circle', primary: true, onClick: () => {
    const r = Math.hypot(params.z.x, params.z.y) || 1;
    params.z = { x: params.z.x / r, y: params.z.y / r };
  } });
  ctrlPanel.append(sqT.el, cuT.el, invT.el, expT.el, conjT.el, row(unitB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
