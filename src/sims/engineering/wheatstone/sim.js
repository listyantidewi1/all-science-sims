import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Wheatstone bridge with battery V across A-C and galvanometer across B-D.
//      A
//    R1   R3
//   B       D
//    R2   R4
//      C
// Battery between A and C; galvanometer measures V_B - V_D.
// V_B = V * R2/(R1+R2);  V_D = V * R4/(R3+R4)
// Vg = V_B - V_D
// I_g (with internal galvanometer resistance Rg, simplified Thevenin -> ignored, just show Vg)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    R: [100, 100, 100, 100],   // R1..R4
    V: 9,
  };

  function vbridge() {
    const Vb = params.V * params.R[1] / (params.R[0] + params.R[1]);
    const Vd = params.V * params.R[3] / (params.R[2] + params.R[3]);
    return { Vb, Vd, Vg: Vb - Vd };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const a = 140; // half-diagonal
    // Diamond corner positions (A top, B left, C bottom, D right)
    const A = { x: cx, y: cy - a };
    const B = { x: cx - a, y: cy };
    const C = { x: cx, y: cy + a };
    const D = { x: cx + a, y: cy };

    // Wires (the diamond)
    drawResistor(ctx, A, B, `R₁ ${params.R[0].toFixed(0)}Ω`, '#ef4444');
    drawResistor(ctx, B, C, `R₂ ${params.R[1].toFixed(0)}Ω`, '#0ea5e9');
    drawResistor(ctx, A, D, `R₃ ${params.R[2].toFixed(0)}Ω`, '#a855f7');
    drawResistor(ctx, D, C, `R₄ ${params.R[3].toFixed(0)}Ω`, '#10b981');

    // Battery (outside, A to C via the long way around)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(A.x, A.y); ctx.lineTo(A.x, A.y - 60); ctx.lineTo(A.x - 200, A.y - 60); ctx.lineTo(A.x - 200, C.y + 60); ctx.lineTo(C.x, C.y + 60); ctx.lineTo(C.x, C.y);
    ctx.stroke();
    // battery body
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(A.x - 210, A.y - 80); ctx.lineTo(A.x - 210, A.y - 40);
    ctx.moveTo(A.x - 200, A.y - 70); ctx.lineTo(A.x - 200, A.y - 50);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`${params.V} V`, A.x - 240, A.y - 90);

    // Galvanometer between B and D
    const gx = (B.x + D.x) / 2, gy = (B.y + D.y) / 2;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(B.x, B.y); ctx.lineTo(gx - 22, gy);
    ctx.moveTo(gx + 22, gy); ctx.lineTo(D.x, D.y);
    ctx.stroke();
    // body
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.arc(gx, gy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();
    // Needle
    const r = vbridge();
    const swing = Math.max(-1, Math.min(1, r.Vg / 2));
    const ang = -Math.PI / 2 + swing * Math.PI / 3;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy); ctx.lineTo(gx + Math.cos(ang) * 18, gy + Math.sin(ang) * 18);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText('G', gx + 28, gy + 4);

    // Labels at corners
    function dot(p, label) {
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(label, p.x + 8, p.y - 6);
    }
    dot(A, 'A'); dot(B, 'B'); dot(C, 'C'); dot(D, 'D');

    // Header readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 80);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`V_B = ${r.Vb.toFixed(3)} V`, 16, 26);
    ctx.fillText(`V_D = ${r.Vd.toFixed(3)} V`, 16, 44);
    ctx.fillStyle = Math.abs(r.Vg) < 0.01 ? '#10b981' : '#fbbf24';
    ctx.fillText(`V_g = V_B − V_D = ${r.Vg.toFixed(4)} V`, 16, 62);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    const ratio = (params.R[0] * params.R[3]) / (params.R[1] * params.R[2]);
    ctx.fillText(`R₁·R₄ / (R₂·R₃) = ${ratio.toFixed(3)}  (balance ⇔ ratio = 1)`, 16, 80);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Adjust resistors with the sliders. Bridge balances when R₁ R₄ = R₂ R₃.', 16, H - 12);
  }

  function drawResistor(ctx, a, b, label, color) {
    const dx = b.x - a.x, dy = b.y - a.y;
    const L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const px = -uy, py = ux;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    const N = 8;
    for (let i = 0; i < N; i++) {
      const t = (i + 1) / (N + 1);
      const cx = a.x + dx * t, cy = a.y + dy * t;
      const off = (i % 2 === 0 ? 1 : -1) * 7;
      ctx.lineTo(cx + px * off, cy + py * off);
    }
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    // label outside
    const mx = (a.x + b.x) / 2 + px * 18;
    const my = (a.y + b.y) / 2 + py * 18;
    ctx.fillStyle = color;
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(label, mx - 30, my);
  }

  // controls
  const sliders = [];
  for (let i = 0; i < 4; i++) {
    const s = slider({
      label: `R${i + 1} (Ω)`, min: 1, max: 1000, step: 1, value: params.R[i],
      onInput: (v) => { params.R[i] = v; },
    });
    sliders.push(s);
    ctrlPanel.appendChild(s.el);
  }
  const VS = slider({ label: 'Battery V', min: 1, max: 24, step: 0.5, value: params.V, format: (v) => v.toFixed(1),
    onInput: (v) => { params.V = v; } });
  ctrlPanel.appendChild(VS.el);
  const balanceB = button({ label: 'Auto-balance R₄', primary: true, onClick: () => {
    params.R[3] = params.R[1] * params.R[2] / params.R[0];
    sliders[3].value = params.R[3];
  } });
  ctrlPanel.appendChild(row(balanceB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
