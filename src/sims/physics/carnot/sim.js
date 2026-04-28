import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  // 1 mole of ideal gas
  const params = {
    Th: 600,    // K hot
    Tc: 300,    // K cold
    V1: 1,      // m^3
    V2: 2,      // expansion ratio (1→2 isothermal at Th)
    gamma: 1.4,
  };

  const R = 8.314;

  function compute() {
    const { Th, Tc, V1, V2, gamma } = params;
    const n = 1;
    // State 1: V1, Th
    const P1 = n * R * Th / V1;
    // State 2: V2, Th (isothermal)
    const P2 = n * R * Th / V2;
    // State 3: adiabatic from Th, V2 → Tc, V3 where Tc * V3^(γ-1) = Th * V2^(γ-1)
    const V3 = V2 * Math.pow(Th / Tc, 1 / (gamma - 1));
    const P3 = n * R * Tc / V3;
    // State 4: V4, Tc (isothermal compression to V4 such that adiabatic 4→1 lands at Th, V1)
    const V4 = V1 * Math.pow(Th / Tc, 1 / (gamma - 1));
    const P4 = n * R * Tc / V4;
    return { P1, P2, P3, P4, V3, V4 };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const c = compute();
    const Vmax = Math.max(c.V3, params.V2) * 1.1;
    const Vmin = Math.min(params.V1, c.V4) * 0.9;
    const Pmax = c.P1 * 1.1;
    const Pmin = c.P3 * 0.9;
    const x2 = (V) => padX + ((V - Vmin) / (Vmax - Vmin)) * gW;
    const y2 = (P) => padY + gH - ((P - Pmin) / (Pmax - Pmin)) * gH;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 0; i <= 5; i++) {
      const v = Vmin + (i / 5) * (Vmax - Vmin);
      ctx.beginPath(); ctx.moveTo(x2(v), padY); ctx.lineTo(x2(v), padY + gH); ctx.stroke();
    }

    // Cycle: 1→2 isothermal at Th, 2→3 adiabatic, 3→4 isothermal at Tc, 4→1 adiabatic
    function isotherm(V_a, V_b, T, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const V = V_a + (V_b - V_a) * i / steps;
        const P = R * T / V;
        const sx = x2(V), sy = y2(P);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    function adiabat(V_a, P_a, V_b, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const V = V_a + (V_b - V_a) * i / steps;
        const P = P_a * Math.pow(V_a / V, params.gamma);
        const sx = x2(V), sy = y2(P);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Fill cycle area
    ctx.fillStyle = 'rgba(251,191,36,0.18)';
    ctx.beginPath();
    const steps = 30;
    // 1→2 isothermal Th
    for (let i = 0; i <= steps; i++) {
      const V = params.V1 + (params.V2 - params.V1) * i / steps;
      const P = R * params.Th / V;
      if (i === 0) ctx.moveTo(x2(V), y2(P)); else ctx.lineTo(x2(V), y2(P));
    }
    // 2→3 adiabat
    for (let i = 0; i <= steps; i++) {
      const V = params.V2 + (c.V3 - params.V2) * i / steps;
      const P = c.P2 * Math.pow(params.V2 / V, params.gamma);
      ctx.lineTo(x2(V), y2(P));
    }
    // 3→4 isothermal Tc
    for (let i = 0; i <= steps; i++) {
      const V = c.V3 + (c.V4 - c.V3) * i / steps;
      const P = R * params.Tc / V;
      ctx.lineTo(x2(V), y2(P));
    }
    // 4→1 adiabat
    for (let i = 0; i <= steps; i++) {
      const V = c.V4 + (params.V1 - c.V4) * i / steps;
      const P = c.P4 * Math.pow(c.V4 / V, params.gamma);
      ctx.lineTo(x2(V), y2(P));
    }
    ctx.closePath();
    ctx.fill();

    // Curves
    isotherm(params.V1, params.V2, params.Th, '#ef4444');     // hot
    adiabat(params.V2, c.P2, c.V3, 'rgba(120,130,150,0.6)');
    isotherm(c.V3, c.V4, params.Tc, '#3b82f6');               // cold
    adiabat(c.V4, c.P4, params.V1, 'rgba(120,130,150,0.6)');

    // State points
    const states = [
      { name: '1', V: params.V1, P: c.P1 },
      { name: '2', V: params.V2, P: c.P2 },
      { name: '3', V: c.V3, P: c.P3 },
      { name: '4', V: c.V4, P: c.P4 },
    ];
    for (const s of states) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x2(s.V), y2(s.P), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(s.name, x2(s.V) + 6, y2(s.P) - 4);
    }

    // Efficiency
    const eta = 1 - params.Tc / params.Th;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`η = 1 − T_c/T_h = ${(eta*100).toFixed(2)}%`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`T_h = ${params.Th} K   T_c = ${params.Tc} K`, 16, 46);

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Volume V →', padX + gW - 80, padY + gH + 14);
    ctx.save(); ctx.translate(20, padY + gH / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Pressure P', 0, 0); ctx.restore();
  }

  // controls
  const ThS = slider({ label: 'Hot reservoir T_h (K)', min: 300, max: 2000, step: 10, value: params.Th,
    onInput: (v) => { params.Th = v; } });
  const TcS = slider({ label: 'Cold reservoir T_c (K)', min: 50, max: 500, step: 5, value: params.Tc,
    onInput: (v) => { params.Tc = v; } });
  const v1S = slider({ label: 'V₁ (m³)', min: 0.5, max: 2, step: 0.05, value: params.V1, format: (v) => v.toFixed(2),
    onInput: (v) => { params.V1 = v; } });
  const v2S = slider({ label: 'V₂ (m³)', min: 1, max: 5, step: 0.1, value: params.V2, format: (v) => v.toFixed(2),
    onInput: (v) => { params.V2 = Math.max(v, params.V1 + 0.1); } });
  ctrlPanel.append(ThS.el, TcS.el, v1S.el, v2S.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
