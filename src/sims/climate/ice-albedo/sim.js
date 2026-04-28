import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { dragHandle } from '../../../lib/handle.js';

// Energy-balance model: planet has temperature T (K), receives S/4 incoming
// (S = solar constant = 1361 W/m²), reflects fraction α, emits εσT⁴.
// dT/dt = (1/C) * [(1-α(T)) S/4 - εσT⁴]
// Albedo: α(T) = α_ice for T < T_ice (273-Tice_window), α_water otherwise, smooth transition.

const sigma = 5.67e-8;
const S = 1361;

function alpha(T) {
  // Smooth transition: high albedo (0.62) below 263K, low (0.30) above 283K
  const lo = 263, hi = 283;
  const u = Math.max(0, Math.min(1, (T - lo) / (hi - lo)));
  return 0.62 - (0.62 - 0.30) * u;
}

function dTdt(T, Sscale, eps, C) {
  const incoming = (1 - alpha(T)) * Sscale * S / 4;
  const outgoing = eps * sigma * Math.pow(T, 4);
  return (incoming - outgoing) / C;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    T: 285,
    Sscale: 1.0,    // multiplier on solar constant
    eps: 0.61,      // effective emissivity (greenhouse-equivalent)
    C: 4e8,
  };

  let chartRect = null;

  function step(dt) {
    const yearsPerSec = 5e6;
    const t = Math.min(0.1, dt) * yearsPerSec * 365 * 24 * 3600;
    const sub = 1e6 * 365 * 24 * 3600;
    let remaining = t;
    while (remaining > 0) {
      const h = Math.min(sub, remaining);
      params.T += h * dTdt(params.T, params.Sscale, params.eps, params.C);
      remaining -= h;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 60;
    chartRect = { x: padX, y: padY, w: gW, h: gH };

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, gW, gH);

    const Tmin = 220, Tmax = 320;
    const x2 = (T) => padX + ((T - Tmin) / (Tmax - Tmin)) * gW;
    const Fmax = 1e9;
    // Compute incoming - outgoing on a scale (W/m²)
    const fluxOf = (T) => (1 - alpha(T)) * params.Sscale * S / 4 - params.eps * sigma * Math.pow(T, 4);
    let fluxLo = +Infinity, fluxHi = -Infinity;
    for (let i = 0; i <= 200; i++) {
      const T = Tmin + (i / 200) * (Tmax - Tmin);
      const f = fluxOf(T);
      if (f < fluxLo) fluxLo = f;
      if (f > fluxHi) fluxHi = f;
    }
    const fSpan = Math.max(50, fluxHi - fluxLo);
    const y2 = (f) => padY + gH / 2 - (f / fSpan) * (gH / 2 - 16);

    // Zero line (equilibrium)
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(0)); ctx.lineTo(padX + gW, y2(0));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText('net flux = 0  (equilibrium)', padX + 6, y2(0) - 4);

    // Net flux curve: incoming − outgoing as function of T
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const T = Tmin + (i / 200) * (Tmax - Tmin);
      const f = fluxOf(T);
      const sx = x2(T), sy = y2(f);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // T axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    for (let T = 220; T <= 320; T += 20) {
      const sx = x2(T);
      ctx.fillText(`${T}K`, sx - 12, padY + gH + 14);
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(sx, padY); ctx.lineTo(sx, padY + gH); ctx.stroke();
    }

    // Current state ball
    const tx = x2(params.T);
    const ty = y2(fluxOf(params.T));
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(tx, ty, 10, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`${params.T.toFixed(1)} K`, tx + 14, ty - 8);

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`T = ${params.T.toFixed(2)} K  (${(params.T - 273.15).toFixed(2)} °C)`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = 'rgba(120,130,150,0.9)';
    ctx.fillText(`albedo α = ${alpha(params.T).toFixed(3)}`, 16, 46);
    ctx.fillText(`net flux = ${fluxOf(params.T).toFixed(2)} W/m²`, 16, 62);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red ball horizontally to set T · solver pulls T toward zero-crossings (stable equilibria)', padX, H - 12);

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const T = 220 + ((sx - x) / w) * 100;
    const f = (1 - alpha(T)) * params.Sscale * S / 4 - params.eps * sigma * Math.pow(T, 4);
    return {
      x: sx, y: sy,
      label: [`T = ${T.toFixed(1)} K`, `α = ${alpha(T).toFixed(3)}`, `net = ${f.toFixed(2)} W/m²`],
    };
  });

  // Drag the ball horizontally to set T.
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chartRect) return null;
      const tx = chartRect.x + ((params.T - 220) / 100) * chartRect.w;
      const fluxOf = (T) => (1 - alpha(T)) * params.Sscale * S / 4 - params.eps * sigma * Math.pow(T, 4);
      const Fmax = 50;
      const ty = chartRect.y + chartRect.h / 2 - (fluxOf(params.T) / Fmax) * (chartRect.h / 2 - 16);
      // accept anywhere in chart band
      if (sy >= chartRect.y && sy <= chartRect.y + chartRect.h) return 'T';
      return null;
    },
    onDrag(_id, sx) {
      params.T = Math.max(220, Math.min(320, 220 + ((sx - chartRect.x) / chartRect.w) * 100));
      tS.value = params.T;
    },
    cursor: 'pointer',
    hoverCursor: 'grab',
  });

  // controls
  const tS = slider({ label: 'Temperature T (K)', min: 220, max: 320, step: 0.5, value: params.T, format: (v) => v.toFixed(1),
    onInput: (v) => { params.T = v; } });
  const sS = slider({ label: 'Solar input (×S)', min: 0.7, max: 1.3, step: 0.005, value: params.Sscale, format: (v) => v.toFixed(3),
    onInput: (v) => { params.Sscale = v; } });
  const epsS = slider({ label: 'Effective emissivity ε', min: 0.4, max: 1.0, step: 0.005, value: params.eps, format: (v) => v.toFixed(3),
    onInput: (v) => { params.eps = v; } });
  const snowB = button({ label: 'Snowball start', onClick: () => { params.T = 230; tS.value = 230; } });
  const warmB = button({ label: 'Warm start', primary: true, onClick: () => { params.T = 295; tS.value = 295; } });

  ctrlPanel.append(tS.el, sS.el, epsS.el, row(snowB, warmB));

  const animator = loop((dt) => { step(dt); draw(); tS.value = params.T; });
  animator.start();
  return () => { animator.stop(); hover.destroy(); drag.destroy(); cv.destroy(); };
}
