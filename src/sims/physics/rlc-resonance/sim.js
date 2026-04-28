import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    R: 50,        // ohms
    L: 0.05,      // henrys
    C: 1e-5,      // farads
    Vsrc: 5,      // volts
    freq: 1000,   // Hz
  };

  function f0() { return 1 / (2 * Math.PI * Math.sqrt(params.L * params.C)); }
  function impedance(f) {
    const w = 2 * Math.PI * f;
    const XL = w * params.L;
    const XC = 1 / (w * params.C);
    return { Z: Math.sqrt(params.R * params.R + (XL - XC) ** 2), XL, XC };
  }
  function current(f) { return params.Vsrc / impedance(f).Z; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Two panels: schematic on left, frequency response on right
    const halfW = W * 0.42;

    // Schematic
    const f = params.freq;
    const I = current(f);
    drawSchematic(ctx, 30, 40, halfW - 60, H - 80, I);

    // Frequency response
    drawResponse(ctx, halfW + 30, 30, W - halfW - 60, H - 60);

    const fr = f0();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`f₀ = 1/(2π√(LC)) = ${fr.toFixed(0)} Hz`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    const imp = impedance(f);
    ctx.fillText(`f=${f} Hz   X_L=${imp.XL.toFixed(1)}   X_C=${imp.XC.toFixed(1)}   I=${(I*1000).toFixed(2)} mA`, 16, 44);
  }

  function drawSchematic(ctx, x, y, w, h, I) {
    const cy = y + h / 2;
    // wire path: source → R → L → C → back
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 30);
    ctx.lineTo(x + w - 30, y + 30);
    ctx.lineTo(x + w - 30, y + h - 30);
    ctx.lineTo(x + 30, y + h - 30);
    ctx.lineTo(x + 30, y + 30);
    ctx.stroke();

    // current dots animated
    const t = Date.now() / 1000;
    const dots = 30;
    const len = 2 * (w - 60) + 2 * (h - 60);
    for (let i = 0; i < dots; i++) {
      const u = ((i / dots) + (t * I * 50) % 1) % 1;
      const d = u * len;
      let dx = 0, dy = 0;
      if (d < w - 60) { dx = x + 30 + d; dy = y + 30; }
      else if (d < (w - 60) + (h - 60)) { dx = x + w - 30; dy = y + 30 + (d - (w - 60)); }
      else if (d < 2 * (w - 60) + (h - 60)) { dx = x + w - 30 - (d - ((w - 60) + (h - 60))); dy = y + h - 30; }
      else { dx = x + 30; dy = y + h - 30 - (d - (2 * (w - 60) + (h - 60))); }
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // R (top)
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(x + w * 0.3, y + 22, 60, 16);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(x + w * 0.3, y + 22, 60, 16);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText(`R = ${params.R}Ω`, x + w * 0.3 + 30, y + 14);

    // L (right)
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(x + w - 38, cy - 12, 16, 60);
    ctx.strokeStyle = '#3b82f6';
    ctx.strokeRect(x + w - 38, cy - 12, 16, 60);
    ctx.fillStyle = '#fff';
    ctx.fillText(`L = ${(params.L * 1000).toFixed(1)} mH`, x + w - 30, cy - 22);

    // C (bottom)
    ctx.fillStyle = '#1f2937';
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5 - 12, y + h - 30);
    ctx.lineTo(x + w * 0.5 - 12, y + h - 30 + 16);
    ctx.moveTo(x + w * 0.5 + 12, y + h - 30);
    ctx.lineTo(x + w * 0.5 + 12, y + h - 30 + 16);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.fillText(`C = ${(params.C * 1e6).toFixed(1)} µF`, x + w * 0.5, y + h - 4);

    // AC source (left)
    ctx.beginPath();
    ctx.arc(x + 30, cy, 18, 0, Math.PI * 2);
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '14px var(--font-sans)';
    ctx.fillText('~', x + 30, cy + 5);
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`${params.Vsrc}V`, x + 30, cy + 30);
    ctx.textAlign = 'left';
  }

  function drawResponse(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);

    const fMin = 50, fMax = 50000;
    const x2 = (f) => x + Math.log10(f / fMin) / Math.log10(fMax / fMin) * w;
    const Imax = params.Vsrc / params.R;
    const y2 = (I) => y + h - (I / (Imax * 1.05)) * (h - 16) - 8;

    // current curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const f = fMin * Math.pow(fMax / fMin, i / 200);
      const I = current(f);
      const sx = x2(f), sy = y2(I);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // f0 line
    const fr = f0();
    if (fr >= fMin && fr <= fMax) {
      const sx = x2(fr);
      ctx.strokeStyle = '#fbbf24';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sx, y); ctx.lineTo(sx, y + h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`f₀=${fr.toFixed(0)}`, sx + 4, y + 14);
    }

    // current marker
    const cx = x2(params.freq);
    const cy = y2(current(params.freq));
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Current vs frequency (log)', x + 6, y - 4);
    ctx.fillText('Hz →', x + w - 30, y + h + 14);
  }

  // controls
  const RS = slider({ label: 'R (Ω)', min: 1, max: 500, step: 1, value: params.R,
    onInput: (v) => { params.R = v; } });
  const LS = slider({ label: 'L (mH)', min: 1, max: 200, step: 1, value: params.L * 1000, format: (v) => v.toFixed(0),
    onInput: (v) => { params.L = v / 1000; } });
  const CS = slider({ label: 'C (µF)', min: 0.1, max: 100, step: 0.1, value: params.C * 1e6, format: (v) => v.toFixed(1),
    onInput: (v) => { params.C = v / 1e6; } });
  const fS = slider({ label: 'Drive frequency (Hz)', min: 50, max: 50000, step: 10, value: params.freq,
    onInput: (v) => { params.freq = v; } });
  const tuneB = button({ label: 'Tune to f₀', primary: true, onClick: () => {
    const fr = f0();
    params.freq = Math.min(50000, Math.max(50, fr));
    fS.value = Math.round(params.freq);
  } });

  ctrlPanel.append(RS.el, LS.el, CS.el, fS.el, row(tuneB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
