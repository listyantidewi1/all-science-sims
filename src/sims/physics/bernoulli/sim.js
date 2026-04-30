import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

const rho = 1000; // kg/m³

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    A1: 1.0,        // m² (fixed at left/right ends)
    A2: 0.4,        // m² narrow middle
    v1: 1.0,        // m/s at wide section
    P1: 100000,     // Pa, reference at left
  };

  let particles = [];
  function spawn(n) {
    for (let i = 0; i < n; i++) particles.push({ x: Math.random() * 0.1, y: Math.random() });
  }
  spawn(150);

  function pipeProfile(xfrac) {
    // Smooth narrowing: A as function of x, with A=A1 at edges, A=A2 in the middle.
    const t = Math.max(0, 1 - Math.abs(xfrac - 0.5) * 4);   // 0..1, peaks at center
    return params.A1 + (params.A2 - params.A1) * t;
  }
  function v(xfrac) { return params.v1 * params.A1 / pipeProfile(xfrac); }
  function P(xfrac) { return params.P1 + 0.5 * rho * (params.v1 * params.v1 - v(xfrac) * v(xfrac)); }

  function step(dt) {
    for (const p of particles) {
      const speed = v(p.x);
      p.x += speed * 0.05 * dt;
      if (p.x > 1.05) { p.x = -0.05; p.y = Math.random(); }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const pipeY = H * 0.4;
    const pipeMaxH = H * 0.5;
    const x0 = 50, x1 = W - 50;
    const pipeW = x1 - x0;

    // Pipe walls
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(x0, pipeY - pipeMaxH * params.A1 / 2);
    for (let i = 0; i <= 100; i++) {
      const u = i / 100;
      const A = pipeProfile(u);
      ctx.lineTo(x0 + u * pipeW, pipeY - pipeMaxH * A / 2);
    }
    for (let i = 100; i >= 0; i--) {
      const u = i / 100;
      const A = pipeProfile(u);
      ctx.lineTo(x0 + u * pipeW, pipeY + pipeMaxH * A / 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Particles (water flow)
    for (const p of particles) {
      const A = pipeProfile(p.x);
      const yScale = pipeMaxH * A / 2 - 4;
      const px = x0 + p.x * pipeW;
      const py = pipeY + (p.y * 2 - 1) * yScale;
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pressure gauges at three points (0.1, 0.5, 0.9)
    function gauge(u, label) {
      const px = x0 + u * pipeW;
      const A = pipeProfile(u);
      const top = pipeY - pipeMaxH * A / 2;
      ctx.strokeStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(px, top); ctx.lineTo(px, top - 60);
      ctx.stroke();
      const Pval = P(u);
      const Pnorm = (Pval - 50000) / 100000;
      const radius = 8 + Pnorm * 14;
      ctx.fillStyle = `rgba(251,191,36,${0.4 + Pnorm * 0.5})`;
      ctx.beginPath();
      ctx.arc(px, top - 70, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(`${(Pval / 1000).toFixed(1)} kPa`, px, top - 88);
      ctx.fillText(`v = ${v(u).toFixed(2)} m/s`, px, top - 100);
      ctx.fillText(label, px, top + 22);
      ctx.textAlign = 'left';
    }
    gauge(0.10, 'wide A');
    gauge(0.50, 'narrow B');
    gauge(0.90, 'wide C');

    // Header
    const v_mid = v(0.5);
    const P_mid = P(0.5);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Continuity:  A₁ v₁ = A₂ v₂`, 16, 28);
    ctx.fillStyle = '#10b981';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`v_middle = v₁ · (A₁/A₂) = ${v_mid.toFixed(2)} m/s`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`P_middle = P₁ + ½ρ(v₁² − v_middle²) = ${(P_mid / 1000).toFixed(2)} kPa`, 16, 62);
  }

  // controls
  const A2S = slider({ label: 'Narrow section A₂ (m²)', min: 0.05, max: 1.0, step: 0.01, value: params.A2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.A2 = v; } });
  const v1S = slider({ label: 'Inlet speed v₁ (m/s)', min: 0.1, max: 5, step: 0.05, value: params.v1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.v1 = v; } });
  const P1S = slider({ label: 'Inlet pressure P₁ (kPa)', min: 50, max: 200, step: 1, value: params.P1 / 1000,
    onInput: (v) => { params.P1 = v * 1000; } });
  ctrlPanel.append(A2S.el, v1S.el, P1S.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
