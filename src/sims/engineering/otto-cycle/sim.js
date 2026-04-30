import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Idealized Otto cycle, four corners:
//   1: BDC, V_max, P1                  (after intake)
//   2: TDC, V_min, P2 = P1 r^γ          (adiabatic compression)
//   3: TDC, V_min, P3 = P2 (T3/T2)      (constant-V heat addition)
//   4: BDC, V_max, P4 = P3 / r^γ        (adiabatic expansion)
// Strokes: 0→0.25 intake (BDC), 0.25→0.5 compression, 0.5→0.75 power, 0.75→1.0 exhaust.

const gamma = 1.4;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    r: 8,
    rpm: 1500,
    heat: 1.5,    // T3/T2 ratio (heat-addition strength)
    running: true,
  };

  let phase = 0;          // 0..1 over a complete 4-stroke (= 2 crank revolutions)
  let pvChart = null;

  function vAt(phi) {
    // 0..0.25 intake: V_max constant
    // 0.25..0.5 compression: V max → min
    // 0.5..0.75 power: V min → max
    // 0.75..1.0 exhaust: V_max constant
    if (phi < 0.25) return 1;
    if (phi < 0.50) return 1 - ((phi - 0.25) / 0.25) * (1 - 1 / params.r);
    if (phi < 0.75) return (1 / params.r) + ((phi - 0.50) / 0.25) * (1 - 1 / params.r);
    return 1;
  }
  function pAt(phi) {
    const r = params.r;
    if (phi < 0.25) return 1;          // intake at P0
    if (phi < 0.50) {
      const f = (phi - 0.25) / 0.25;
      const v = 1 - f * (1 - 1 / r);
      return Math.pow(1 / v, gamma);
    }
    // After ignition: P3 = (r^γ) * heat-ratio at TDC
    if (phi < 0.75) {
      const f = (phi - 0.50) / 0.25;
      const v = 1 / r + f * (1 - 1 / r);
      const P3 = Math.pow(r, gamma) * params.heat;
      return P3 * Math.pow((1 / r) / v, gamma);
    }
    // exhaust at low pressure
    return 1;
  }
  function efficiency() { return 1 - 1 / Math.pow(params.r, gamma - 1); }

  function step(dt) {
    if (!params.running) return;
    // 1 cycle = 2 revolutions, so cycles/sec = rpm / 60 / 2.
    phase = (phase + dt * (params.rpm / 60) / 2) % 1;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Engine schematic on the left, P-V on the right
    drawEngine(ctx, 30, 30, W * 0.4 - 30, H - 60);
    pvChart = { x: W * 0.42, y: 30, w: W - W * 0.42 - 30, h: H - 80 };
    drawPV(ctx, pvChart.x, pvChart.y, pvChart.w, pvChart.h);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: pvChart, color: '#fbbf24', label: probe.label });

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 56);
    const stroke = phase < 0.25 ? 'Intake' : phase < 0.50 ? 'Compression' : phase < 0.75 ? 'Power' : 'Exhaust';
    const eta = efficiency();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Stroke: ${stroke}    r = ${params.r.toFixed(1)}`, 16, 28);
    ctx.fillStyle = '#10b981';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`η_Otto = 1 − 1/r^(γ−1) = ${(eta * 100).toFixed(1)}%`, 16, 48);
    if (params.r > 12) {
      ctx.fillStyle = '#ef4444';
      ctx.fillText('⚠ knock-prone for gasoline', 16, 64);
    }
  }

  function drawEngine(ctx, x, y, w, h) {
    const cylX = x + w / 2;
    const cylY = y + 50;
    const cylW = 100;
    const cylH = h - 100;

    // Cylinder walls
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cylX - cylW / 2, cylY);
    ctx.lineTo(cylX - cylW / 2, cylY + cylH);
    ctx.moveTo(cylX + cylW / 2, cylY);
    ctx.lineTo(cylX + cylW / 2, cylY + cylH);
    ctx.stroke();

    // Piston position based on phase
    const v = vAt(phase);
    const stroke = (1 - 1 / params.r);
    const fracDown = (1 - v) / stroke;
    const pistonY = cylY + 40 + fracDown * (cylH - 80);

    // Charge color (intake = blue, compressed/hot = orange/red)
    let chargeColor;
    if (phase < 0.25) chargeColor = 'rgba(59,130,246,0.5)';        // intake
    else if (phase < 0.50) chargeColor = 'rgba(251,191,36,0.5)';    // compression heating
    else if (phase < 0.75) chargeColor = 'rgba(239,68,68,0.65)';    // power (combustion)
    else chargeColor = 'rgba(120,130,150,0.4)';                     // exhaust

    ctx.fillStyle = chargeColor;
    ctx.fillRect(cylX - cylW / 2 + 4, cylY + 4, cylW - 8, pistonY - cylY - 4);

    // Piston
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cylX - cylW / 2 + 4, pistonY, cylW - 8, 30);
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 1;
    ctx.strokeRect(cylX - cylW / 2 + 4, pistonY, cylW - 8, 30);

    // Connecting rod + crank
    const crankY = cylY + cylH + 60;
    const crankR = 28;
    const crankAng = -Math.PI / 2 + phase * 2 * Math.PI * 2; // 2 crank rev per cycle
    const crankPx = cylX + Math.cos(crankAng) * crankR;
    const crankPy = crankY + Math.sin(crankAng) * crankR;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cylX, pistonY + 30); ctx.lineTo(crankPx, crankPy);
    ctx.stroke();
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(cylX, crankY, crankR + 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(crankPx, crankPy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Spark / valve indicators
    if (phase >= 0.50 && phase < 0.51) {
      ctx.fillStyle = '#fef9c3';
      ctx.beginPath();
      ctx.arc(cylX, cylY + 8, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('TDC', cylX + cylW / 2 + 14, cylY + 8);
    ctx.fillText('BDC', cylX + cylW / 2 + 14, cylY + cylH - 4);
    ctx.textAlign = 'left';
  }

  function drawPV(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('P–V diagram', x + 6, y - 6);
    ctx.fillText('V →', x + w - 30, y + h + 16);
    ctx.save(); ctx.translate(x - 24, y + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('P ↑', 0, 0); ctx.restore();

    const Vmin = 1 / params.r;
    const Vmax = 1.05;
    const Pmax = Math.pow(params.r, gamma) * params.heat * 1.05;
    const x2 = (V) => x + ((V - 0) / (Vmax - 0)) * w;
    const y2 = (P) => y + h - ((P - 0) / Pmax) * (h - 16) - 8;

    // Cycle path
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const N = 200;
    for (let i = 0; i <= N; i++) {
      const phi = (i / N);
      // skip the constant-V vertical segments by sampling more points
      const sx = x2(vAt(phi));
      const sy = y2(pAt(phi));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Current point
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x2(vAt(phase)), y2(pAt(phase)), 6, 0, Math.PI * 2);
    ctx.fill();

    // 4 corner labels
    function corner(label, V, P) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText(label, x2(V) + 4, y2(P) - 4);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(x2(V), y2(P), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    corner('1', 1, 1);
    corner('2', 1 / params.r, Math.pow(params.r, gamma));
    corner('3', 1 / params.r, Math.pow(params.r, gamma) * params.heat);
    corner('4', 1, params.heat);
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!pvChart) return null;
    if (sx < pvChart.x || sx > pvChart.x + pvChart.w || sy < pvChart.y || sy > pvChart.y + pvChart.h) return null;
    const Vmax = 1.05;
    const V = ((sx - pvChart.x) / pvChart.w) * Vmax;
    return { x: sx, y: sy, label: [`V = ${V.toFixed(3)}`, `(normalized: V_max = 1)`] };
  });

  // controls
  const rS = slider({ label: 'Compression ratio r', min: 4, max: 18, step: 0.1, value: params.r, format: (v) => v.toFixed(1),
    onInput: (v) => { params.r = v; } });
  const rpmS = slider({ label: 'Engine speed (rpm)', min: 100, max: 5000, step: 50, value: params.rpm,
    onInput: (v) => { params.rpm = v; } });
  const hS = slider({ label: 'Heat input ratio T₃/T₂', min: 1.05, max: 4, step: 0.05, value: params.heat, format: (v) => v.toFixed(2),
    onInput: (v) => { params.heat = v; } });
  const runT = toggle({ label: 'Running', value: params.running, onChange: (v) => { params.running = v; } });
  ctrlPanel.append(rS.el, rpmS.el, hS.el, runT.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
