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
    N1: 100,
    N2: 200,
    V1peak: 120,
    R_load: 100,
    freq: 60,
  };

  function v2() { return params.V1peak * params.N2 / params.N1; }
  function i2() { return v2() / params.R_load; }
  function i1() { return i2() * params.N2 / params.N1; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    // Core: rectangle in the middle with two windings.
    const coreW = 220, coreH = 200;
    ctx.fillStyle = '#475569';
    ctx.fillRect(cx - coreW / 2, cy - coreH / 2, coreW, coreH);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - coreW / 2 + 30, cy - coreH / 2 + 30, coreW - 60, coreH - 60);

    // Primary winding (left)
    drawWinding(ctx, cx - coreW / 2 - 15, cy, params.N1, '#0ea5e9', 'left');
    // Secondary winding (right)
    drawWinding(ctx, cx + coreW / 2 - 15, cy, params.N2, '#10b981', 'right');

    // Phase animates the AC current pulses
    const t = Date.now() / 1000;
    const phase = Math.sin(2 * Math.PI * params.freq * t / 60); // slow visual

    // Primary side wires + battery
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - coreW / 2 - 50, cy - 50); ctx.lineTo(cx - coreW / 2 - 50, cy - 80); ctx.lineTo(cx - 250, cy - 80);
    ctx.moveTo(cx - coreW / 2 - 50, cy + 50); ctx.lineTo(cx - coreW / 2 - 50, cy + 80); ctx.lineTo(cx - 250, cy + 80);
    ctx.stroke();
    // AC source on primary
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx - 250, cy, 22, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText('~', cx - 254, cy + 5);
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`V₁ = ${params.V1peak}V`, cx - 280, cy + 40);

    // Secondary side wires + load
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx + coreW / 2 + 50, cy - 50); ctx.lineTo(cx + coreW / 2 + 50, cy - 80); ctx.lineTo(cx + 250, cy - 80); ctx.lineTo(cx + 250, cy);
    ctx.moveTo(cx + coreW / 2 + 50, cy + 50); ctx.lineTo(cx + coreW / 2 + 50, cy + 80); ctx.lineTo(cx + 250, cy + 80); ctx.lineTo(cx + 250, cy);
    ctx.stroke();
    // Resistor load
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(cx + 250, cy - 14);
    ctx.lineTo(cx + 240, cy - 8); ctx.lineTo(cx + 260, cy);
    ctx.lineTo(cx + 240, cy + 8); ctx.lineTo(cx + 260, cy + 14);
    ctx.stroke();
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`R = ${params.R_load}Ω`, cx + 270, cy + 5);

    // Animated current arrows
    function arrow(x, y, dir, color) {
      const sz = 6 * (0.4 + Math.abs(phase) * 0.6);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - sz * dir, y - sz);
      ctx.lineTo(x - sz * dir, y + sz);
      ctx.closePath();
      ctx.fill();
    }
    arrow(cx - 220, cy - 80, phase >= 0 ? 1 : -1, '#0ea5e9');
    arrow(cx + 220, cy - 80, phase >= 0 ? 1 : -1, '#10b981');

    // Header readout
    const ratio = params.N2 / params.N1;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Turns ratio N₂/N₁ = ${params.N2}/${params.N1} = ${ratio.toFixed(2)}`, 16, 28);
    ctx.fillStyle = ratio > 1 ? '#10b981' : ratio < 1 ? '#ef4444' : '#fbbf24';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`${ratio > 1 ? 'STEP-UP' : ratio < 1 ? 'STEP-DOWN' : 'ISOLATION'}`, 16, 48);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`V₂ = V₁ · N₂/N₁ = ${v2().toFixed(1)} V`, 16, 66);
    ctx.fillText(`I₂ = V₂/R = ${(i2() * 1000).toFixed(2)} mA    I₁ = I₂·N₂/N₁ = ${(i1() * 1000).toFixed(2)} mA`, 16, 82);
  }

  function drawWinding(ctx, x, cy, N, color, side) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    const top = cy - 50;
    const btm = cy + 50;
    const turns = Math.min(20, Math.max(3, Math.round(N / 50)));
    for (let i = 0; i < turns; i++) {
      const yy = top + (i / (turns - 1)) * (btm - top);
      ctx.beginPath();
      if (side === 'left') ctx.arc(x, yy, 14, -Math.PI / 2, Math.PI / 2);
      else ctx.arc(x + 30, yy, 14, Math.PI / 2, 3 * Math.PI / 2);
      ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(`N = ${N}`, x + (side === 'left' ? -6 : 14), btm + 18);
  }

  // controls
  const N1S = slider({ label: 'Primary turns N₁', min: 10, max: 2000, step: 10, value: params.N1,
    onInput: (v) => { params.N1 = v; } });
  const N2S = slider({ label: 'Secondary turns N₂', min: 10, max: 2000, step: 10, value: params.N2,
    onInput: (v) => { params.N2 = v; } });
  const VS = slider({ label: 'V₁ peak (V)', min: 10, max: 240, step: 1, value: params.V1peak,
    onInput: (v) => { params.V1peak = v; } });
  const RS = slider({ label: 'Load R (Ω)', min: 1, max: 1000, step: 1, value: params.R_load,
    onInput: (v) => { params.R_load = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['1:1', { N1: 100, N2: 100 }], ['Step-up 10×', { N1: 100, N2: 1000 }], ['Step-down 20×', { N1: 1000, N2: 50 }]]) {
    const b = button({ label: n, onClick: () => {
      Object.assign(params, p); N1S.value = params.N1; N2S.value = params.N2;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(N1S.el, N2S.el, VS.el, RS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
