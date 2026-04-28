import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Lovelock & Watson Daisyworld (1983), simplified.
// State: αw (white daisy fraction), αb (black daisy fraction). Bare ground αg = 1 - αw - αb.
// Albedos: Aw = 0.75 (white), Ab = 0.25 (black), Ag = 0.5 (bare).
// Local temps differ from planetary by an "absorption" factor q (rough heat redistribution).
// Growth rate β(T) = 1 - 0.003265*(295.5 - T)² for T ∈ [278, 313], else 0.
// dα/dt = α * (αg * β(T_local) - γ), γ = death rate.

const Aw = 0.75, Ab = 0.25, Ag = 0.5, gamma = 0.3, sigma = 5.67e-8, S0 = 917;

function localTemp(Tplanet, Apatch, Aplanet, q) {
  const flux = (Aplanet - Apatch) * q;
  return Math.pow(Math.max(1e-3, Tplanet * Tplanet * Tplanet * Tplanet + flux), 0.25);
}
function growth(T) {
  if (T < 278 || T > 313) return 0;
  return Math.max(0, 1 - 0.003265 * (295.5 - T) ** 2);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    L: 1.0,           // luminosity (multiplier on S0)
    auto: true,
    LSweep: 0,        // sweep direction (1.0 -> 1.5 -> 0.6 -> ...)
    onlyWhite: false,
    onlyBlack: false,
  };

  let state = { αw: 0.01, αb: 0.01, T: 295 };
  let chartRect = null;
  let history = []; // {L, T, αw, αb}

  function reset() {
    state = { αw: 0.01, αb: 0.01, T: 295 };
    history = [];
  }
  reset();

  function step(dt) {
    // Sub-step the ODE for stability.
    const sub = 0.05;
    let remaining = Math.min(0.2, dt * 4);
    while (remaining > 0) {
      const h = Math.min(sub, remaining);
      const αg = Math.max(0, 1 - state.αw - state.αb);
      const Aplanet = state.αw * Aw + state.αb * Ab + αg * Ag;
      const TbarN = Math.pow(params.L * S0 * (1 - Aplanet) / sigma, 0.25);
      const Tw = localTemp(TbarN, Aw, Aplanet, 20);
      const Tb = localTemp(TbarN, Ab, Aplanet, 20);
      const dαw = state.αw * (αg * growth(Tw) - gamma);
      const dαb = state.αb * (αg * growth(Tb) - gamma);
      state.αw = Math.max(0.001, state.αw + h * (params.onlyBlack ? 0 : dαw));
      state.αb = Math.max(0.001, state.αb + h * (params.onlyWhite ? 0 : dαb));
      state.T = TbarN;
      remaining -= h;
    }
    if (params.auto) {
      params.L += params.LSweep * dt * 0.05;
      if (params.L > 1.6) params.LSweep = -1;
      if (params.L < 0.6) params.LSweep = +1;
      params.L = Math.max(0.6, Math.min(1.6, params.L));
      LS.value = params.L;
    }
    history.push({ L: params.L, T: state.T, αw: state.αw, αb: state.αb });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Layout: planet patch on left, T-vs-L curve on right
    const halfW = W * 0.45;

    // Planet visualization — circle made of 3 wedges
    const cx = halfW / 2, cy = H / 2, r = Math.min(halfW, H) * 0.32;
    drawPlanet(ctx, cx, cy, r);

    // Chart on right
    const chx = halfW + 30, chy = 40, chw = W - chx - 30, chh = H - chy - 60;
    chartRect = { x: chx, y: chy, w: chw, h: chh };
    drawChart(ctx, chx, chy, chw, chh);

    // Hover crosshair
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });

    // Top readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`L = ${params.L.toFixed(3)} S₀`, 16, 28);
    ctx.font = '12px var(--font-mono)';
    ctx.fillStyle = (state.T > 273 && state.T < 313) ? '#10b981' : '#ef4444';
    ctx.fillText(`T = ${(state.T - 273.15).toFixed(2)} °C`, 16, 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`α_white ${(state.αw * 100).toFixed(1)}%   α_black ${(state.αb * 100).toFixed(1)}%`, 16, 62);
  }

  function drawPlanet(ctx, cx, cy, r) {
    const αg = Math.max(0, 1 - state.αw - state.αb);
    const segs = [
      { f: state.αw, color: '#f1f5f9', label: 'white' },
      { f: state.αb, color: '#1f2937', label: 'black' },
      { f: αg,       color: '#a16207', label: 'bare' },
    ];
    let a0 = -Math.PI / 2;
    for (const s of segs) {
      const a1 = a0 + s.f * Math.PI * 2;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fill();
      a0 = a1;
    }
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Planetary surface fractions', cx - 80, cy + r + 18);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Temperature vs solar luminosity (history)', x + 6, y - 6);

    const Lmin = 0.6, Lmax = 1.6;
    const Tmin = 250, Tmax = 320;
    const x2 = (L) => x + ((L - Lmin) / (Lmax - Lmin)) * w;
    const y2 = (T) => y + h - ((T - Tmin) / (Tmax - Tmin)) * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let T = 260; T <= 320; T += 10) {
      ctx.beginPath(); ctx.moveTo(x, y2(T)); ctx.lineTo(x + w, y2(T)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${(T - 273.15).toFixed(0)}°C`, x - 32, y2(T) + 3);
    }
    for (let L = 0.6; L <= 1.6; L += 0.2) {
      ctx.beginPath(); ctx.moveTo(x2(L), y); ctx.lineTo(x2(L), y + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(L.toFixed(1), x2(L) - 8, y + h + 14);
    }

    // Bare-planet T = (L * S0 * (1-Ag) / σ)^(1/4) — what T would be without daisies
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const L = Lmin + (i / 100) * (Lmax - Lmin);
      const Tbare = Math.pow(L * S0 * (1 - Ag) / sigma, 0.25);
      const sx = x2(L), sy = y2(Tbare);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // History trace
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const h_ = history[i];
      const sx = x2(h_.L), sy = y2(h_.T);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Current point
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(params.L), y2(state.T), 6, 0, Math.PI * 2);
    ctx.fill();
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    if (sx < chartRect.x || sx > chartRect.x + chartRect.w || sy < chartRect.y || sy > chartRect.y + chartRect.h) return null;
    const L = 0.6 + ((sx - chartRect.x) / chartRect.w) * 1.0;
    const T = 250 + ((chartRect.y + chartRect.h - 8 - sy) / (chartRect.h - 16)) * 70;
    return { x: sx, y: sy, label: [`L = ${L.toFixed(3)} S₀`, `T = ${(T - 273.15).toFixed(2)} °C`] };
  });

  // controls
  const LS = slider({ label: 'Solar luminosity (×S₀)', min: 0.6, max: 1.6, step: 0.005, value: params.L, format: (v) => v.toFixed(3),
    onInput: (v) => { params.L = v; params.auto = false; autoT.value = false; } });
  const autoT = toggle({ label: 'Auto-sweep luminosity', value: params.auto, onChange: (v) => {
    params.auto = v; if (v && params.LSweep === 0) params.LSweep = 1;
  } });
  const onlyWT = toggle({ label: 'Disable black daisies', value: params.onlyWhite, onChange: (v) => { params.onlyWhite = v; if (v) state.αb = 0.001; } });
  const onlyBT = toggle({ label: 'Disable white daisies', value: params.onlyBlack, onChange: (v) => { params.onlyBlack = v; if (v) state.αw = 0.001; } });
  const resetB = button({ label: 'Reset planet', primary: true, onClick: reset });

  ctrlPanel.append(LS.el, autoT.el, onlyWT.el, onlyBT.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
