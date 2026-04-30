import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { labPanel } from '../../../lib/lab.js';

// Thermal model:
//   C dT/dt = P_in - (T - T_amb) / R_theta
// Steady state T_ss = T_amb + P_in * R_theta
// Time constant tau = R_theta * C

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    P: 65,           // W
    Rtheta: 0.5,     // K/W
    Tamb: 25,        // °C
    C: 30,           // J/K (thermal capacitance)
    running: true,
  };

  let state = { T: params.Tamb, t: 0, history: [] };
  function reset() { state = { T: params.Tamb, t: 0, history: [] }; }
  reset();

  function step(dt) {
    if (!params.running) return;
    const sub = 0.05;
    let remaining = Math.min(0.2, dt * 4);
    while (remaining > 0) {
      const h = Math.min(sub, remaining);
      const flux = (state.T - params.Tamb) / params.Rtheta;
      state.T += h * (params.P - flux) / params.C;
      state.t += h;
      remaining -= h;
    }
    state.history.push({ t: state.t, T: state.T });
    if (state.history.length > 1500) state.history.shift();
  }

  let chartRect = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Diagram on the left: chip + heatsink
    drawDiagram(ctx, 30, 30, W * 0.35, H - 60);

    // Time chart on the right
    chartRect = { x: W * 0.4, y: 30, w: W - W * 0.4 - 30, h: H - 80 };
    drawChart(ctx, chartRect.x, chartRect.y, chartRect.w, chartRect.h);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  function drawDiagram(ctx, x, y, w, h) {
    const cx = x + w / 2;
    // Heatsink with fins
    const sinkY = y + 50, sinkW = w - 80, sinkH = h - 200;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cx - sinkW / 2, sinkY, sinkW, 30);
    const fins = Math.max(4, Math.min(16, Math.round(20 / params.Rtheta)));
    for (let i = 0; i < fins; i++) {
      const fx = cx - sinkW / 2 + 8 + i * (sinkW - 16) / (fins - 1);
      ctx.fillRect(fx, sinkY - sinkH + 30, 6, sinkH - 30);
    }
    // Chip
    const chipY = sinkY + 30, chipW = sinkW * 0.7, chipH = 36;
    const T = state.T;
    const tNorm = Math.max(0, Math.min(1, (T - 20) / 100));
    const r = Math.round(50 + tNorm * 200);
    ctx.fillStyle = `rgb(${r}, ${Math.round(50 + (1 - tNorm) * 100)}, 60)`;
    ctx.fillRect(cx - chipW / 2, chipY, chipW, chipH);
    ctx.fillStyle = '#0b1220';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`${T.toFixed(1)} °C`, cx, chipY + 22);
    ctx.textAlign = 'left';
    // PCB
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - sinkW / 2, chipY + chipH, sinkW, 16);

    // Heat-flux arrows up through heatsink
    if (state.T > params.Tamb + 0.5) {
      ctx.strokeStyle = `rgba(239,68,68,${0.3 + tNorm * 0.5})`;
      ctx.lineWidth = 2;
      const t = Date.now() / 700;
      for (let i = 0; i < 4; i++) {
        const xx = cx - 30 + i * 20;
        const ph = (t + i * 0.3) % 1;
        const yy = sinkY - sinkH * (0.2 + 0.8 * ph);
        ctx.beginPath();
        ctx.moveTo(xx, yy + 12); ctx.lineTo(xx, yy);
        ctx.lineTo(xx - 4, yy + 4); ctx.moveTo(xx, yy); ctx.lineTo(xx + 4, yy + 4);
        ctx.stroke();
      }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, 240, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`P = ${params.P} W`, x + 16, y + 28);
    ctx.fillText(`R_θ = ${params.Rtheta.toFixed(2)} K/W`, x + 16, y + 46);
    const Tss = params.Tamb + params.P * params.Rtheta;
    ctx.fillStyle = Tss > 90 ? '#ef4444' : Tss > 70 ? '#fbbf24' : '#10b981';
    ctx.fillText(`T_ss = ${Tss.toFixed(1)} °C`, x + 16, y + 64);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Chip temperature vs time', x + 6, y - 6);
    ctx.fillText('time (s) →', x + w - 50, y + h + 16);

    const Tmin = 20, Tmax = 150;
    const tNow = state.t;
    const tWin = 60;
    const t0 = Math.max(0, tNow - tWin);
    const x2 = (t) => x + ((t - t0) / tWin) * w;
    const y2 = (T) => y + h - ((T - Tmin) / (Tmax - Tmin)) * h;

    // gridlines
    for (let T = 25; T <= 150; T += 25) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(T)); ctx.lineTo(x + w, y2(T)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${T}°C`, x - 32, y2(T) + 3);
    }

    // Throttle / damage zones
    ctx.fillStyle = 'rgba(251,191,36,0.10)';
    ctx.fillRect(x, y2(95), w, y2(105) - y2(95));
    ctx.fillStyle = 'rgba(239,68,68,0.10)';
    ctx.fillRect(x, y, w, y2(105) - y);

    // Steady-state line
    const Tss = params.Tamb + params.P * params.Rtheta;
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x, y2(Tss)); ctx.lineTo(x + w, y2(Tss));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`T_ss = ${Tss.toFixed(1)}°C`, x + 6, y2(Tss) - 4);

    // History
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h of state.history) {
      if (h.t < t0) continue;
      const sx = x2(h.t), sy = y2(h.T);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    if (sx < chartRect.x || sx > chartRect.x + chartRect.w || sy < chartRect.y || sy > chartRect.y + chartRect.h) return null;
    const tt = state.t - 60 + ((sx - chartRect.x) / chartRect.w) * 60;
    return { x: sx, y: sy, label: [`t = ${tt.toFixed(1)} s`] };
  });

  // controls
  const PS = slider({ label: 'Power dissipated P (W)', min: 1, max: 300, step: 1, value: params.P,
    onInput: (v) => { params.P = v; } });
  const rS = slider({ label: 'Thermal resistance R_θ (K/W)', min: 0.05, max: 5, step: 0.01, value: params.Rtheta, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Rtheta = v; } });
  const aS = slider({ label: 'Ambient T (°C)', min: -10, max: 60, step: 1, value: params.Tamb,
    onInput: (v) => { params.Tamb = v; } });
  const cS = slider({ label: 'Thermal capacitance C (J/K)', min: 5, max: 200, step: 1, value: params.C,
    onInput: (v) => { params.C = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Stock cooler', { Rtheta: 1.5 }], ['Big heatsink', { Rtheta: 0.4 }], ['Liquid cooling', { Rtheta: 0.15 }]]) {
    const b = button({ label: n, onClick: () => { Object.assign(params, p); rS.value = params.Rtheta; } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(PS.el, rS.el, aS.el, cS.el, presetRow, row(resetB));

  // Lab — verify T_chip = T_amb + P·R_θ in steady state.
  const lab = labPanel({
    title: 'Heat sink lab — thermal resistance and steady-state',
    filename: 'heat-sink-lab.csv',
    columns: [
      { key: 'P',    label: 'P (W)' },
      { key: 'R',    label: 'R_θ (K/W)', format: (v) => v.toFixed(2) },
      { key: 'Tamb', label: 'T_amb (°C)' },
      { key: 'Tss',  label: 'T_ss predicted (°C)', format: (v) => v.toFixed(1) },
      { key: 'Tlive', label: 'T live (°C)',         format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'P = 65 W, R_θ = 0.5 K/W, T_amb = 25°C. Predicted T_ss = 25 + 65·0.5 = 57.5°C. Wait, record.',
      'Switch to "Stock cooler" (R_θ = 1.5). New T_ss = 25 + 97.5 = 122.5°C. Chip throttles or fries.',
      'Drop P to 30 W with the stock cooler — T_ss = 70°C, OK.',
      'Crank ambient to 40°C — every cooler runs hotter by 15°C.',
      'For a chip-cooler design problem: given P_max and T_max, solve for required R_θ.',
    ],
    predict: 'A 100 W chip needs to stay below 90°C in a 30°C room. What thermal resistance does the cooler need?',
    source: () => ({
      P: params.P,
      R: params.Rtheta,
      Tamb: params.Tamb,
      Tss: params.Tamb + params.P * params.Rtheta,
      Tlive: state.T,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
