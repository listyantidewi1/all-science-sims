import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Inverting op-amp: V_out = -(R_f / R_in) * V_in, clipped to ±supply.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    Rin: 10,    // kΩ
    Rf: 50,     // kΩ
    Vin: 1.0,   // peak input voltage
    freq: 1.0,  // Hz
    supply: 15, // ±V
  };

  let chartRect = null;

  function gain() { return -params.Rf / params.Rin; }
  function vout(vin) { return Math.max(-params.supply, Math.min(params.supply, gain() * vin)); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Schematic in top half
    drawSchematic(ctx, 30, 30, W - 60, H * 0.4);

    // Waveform plot in bottom half
    const px = 50, py = H * 0.5 + 10, pw = W - px - 30, ph = H * 0.4;
    chartRect = { x: px, y: py, w: pw, h: ph };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(px, py, pw, ph);

    // axes
    const yMid = py + ph / 2;
    const yScale = (ph / 2 - 8) / params.supply;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.beginPath();
    ctx.moveTo(px, yMid); ctx.lineTo(px + pw, yMid);
    ctx.stroke();
    // supply rails
    ctx.strokeStyle = 'rgba(239,68,68,0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(px, yMid - params.supply * yScale); ctx.lineTo(px + pw, yMid - params.supply * yScale);
    ctx.moveTo(px, yMid + params.supply * yScale); ctx.lineTo(px + pw, yMid + params.supply * yScale);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(239,68,68,0.7)';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(`+${params.supply}V rail`, px + 6, yMid - params.supply * yScale - 4);
    ctx.fillText(`−${params.supply}V rail`, px + 6, yMid + params.supply * yScale + 12);

    // input wave
    const t0 = Date.now() / 1000;
    const samples = 400;
    const drawWave = (color, fn, lw) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * 4; // 4 seconds visible
        const sx = px + (i / samples) * pw;
        const sy = yMid - fn(t) * yScale;
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    };
    drawWave('#0ea5e9', (t) => params.Vin * Math.sin(2 * Math.PI * params.freq * (t + t0 % 10)), 1.6);
    drawWave('#10b981', (t) => vout(params.Vin * Math.sin(2 * Math.PI * params.freq * (t + t0 % 10))), 2.5);

    // Legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(px + 8, py + 8, 220, 56);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(px + 16, py + 22, 20, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('V_in (input wave)', px + 42, py + 26);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(px + 16, py + 40, 20, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('V_out = −(R_f/R_in)·V_in', px + 42, py + 44);

    // Big readouts
    const G = gain();
    const ampOut = Math.abs(G) * params.Vin;
    const clipped = ampOut > params.supply;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W - 240, py + 8, 230, 60);
    ctx.fillStyle = clipped ? '#ef4444' : '#fbbf24';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(`Gain = ${G.toFixed(2)}`, W - 230, py + 30);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`peak V_out = ${ampOut.toFixed(2)} V`, W - 230, py + 50);
    if (clipped) ctx.fillText('— clipping at rails!', W - 230, py + 64);

    // Hover crosshair on the waveform plot
    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chartRect, color: '#fbbf24', label: probe.label });
  }

  function drawSchematic(ctx, x, y, w, h) {
    // Op-amp triangle in the middle.
    const ax = x + w / 2 - 30, ay = y + h / 2;
    const tw = 80, th = 70;
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ax, ay - th / 2);
    ctx.lineTo(ax + tw, ay);
    ctx.lineTo(ax, ay + th / 2);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText('−', ax + 8, ay - 14);
    ctx.fillText('+', ax + 8, ay + 22);

    // input signal source on the left
    const srcX = x + 60, srcY = ay - 20;
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(srcX, srcY, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#0ea5e9';
    ctx.font = '14px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText('~', srcX, srcY + 4);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`V_in = ${params.Vin.toFixed(2)}V`, srcX, srcY - 24);
    ctx.textAlign = 'left';

    // R_in (signal → inverting input)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(srcX + 18, srcY); ctx.lineTo(srcX + 60, srcY);
    ctx.stroke();
    drawResistor(ctx, srcX + 60, srcY, srcX + 130, srcY, `R_in = ${params.Rin}kΩ`, '#ef4444');
    ctx.beginPath();
    ctx.moveTo(srcX + 130, srcY); ctx.lineTo(ax, ay - 14); // to inverting input
    ctx.stroke();

    // R_f feedback (output → inverting input)
    const outX = ax + tw + 40, outY = ay;
    ctx.beginPath();
    ctx.moveTo(ax + tw, ay); ctx.lineTo(outX, outY);
    ctx.stroke();
    // up over the top
    const fbY = ay - 60;
    ctx.beginPath();
    ctx.moveTo(outX - 20, ay); ctx.lineTo(outX - 20, fbY); ctx.lineTo(srcX + 130, fbY); ctx.lineTo(srcX + 130, srcY);
    ctx.stroke();
    drawResistor(ctx, srcX + 130 + 20, fbY, outX - 20 - 20, fbY, `R_f = ${params.Rf}kΩ`, '#fbbf24');

    // non-inverting input to ground
    ctx.beginPath();
    ctx.moveTo(ax, ay + 22); ctx.lineTo(ax - 30, ay + 22); ctx.lineTo(ax - 30, ay + 60);
    ctx.stroke();
    // ground symbol
    ctx.beginPath();
    ctx.moveTo(ax - 40, ay + 60); ctx.lineTo(ax - 20, ay + 60);
    ctx.moveTo(ax - 36, ay + 64); ctx.lineTo(ax - 24, ay + 64);
    ctx.moveTo(ax - 32, ay + 68); ctx.lineTo(ax - 28, ay + 68);
    ctx.stroke();

    // output label
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('V_out', outX - 6, outY - 10);
  }

  function drawResistor(ctx, x1, y1, x2, y2, label, color) {
    const dx = x2 - x1, dy = y2 - y1;
    const L = Math.hypot(dx, dy);
    const ux = dx / L, uy = dy / L;
    const px = -uy, py = ux;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const N = 8;
    for (let i = 0; i < N; i++) {
      const t = (i + 1) / (N + 1);
      const cx = x1 + dx * t;
      const cy = y1 + dy * t;
      const off = (i % 2 === 0 ? 1 : -1) * 6;
      ctx.lineTo(cx + px * off, cy + py * off);
    }
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = '10px var(--font-mono)';
    ctx.fillText(label, (x1 + x2) / 2 - 30, (y1 + y2) / 2 - 10);
  }

  // Hover the waveform chart for time-aligned (V_in, V_out) at a given t.
  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chartRect) return null;
    const { x, y, w, h } = chartRect;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const tFrac = (sx - x) / w;
    const t0 = Date.now() / 1000;
    const t = tFrac * 4;
    const vin = params.Vin * Math.sin(2 * Math.PI * params.freq * (t + t0 % 10));
    const vout_ = vout(vin);
    return {
      x: sx, y: sy,
      label: [`V_in = ${vin.toFixed(2)} V`, `V_out = ${vout_.toFixed(2)} V`],
    };
  });

  // controls
  const RinS = slider({ label: 'R_in (kΩ)', min: 1, max: 100, step: 1, value: params.Rin,
    onInput: (v) => { params.Rin = v; } });
  const RfS = slider({ label: 'R_f (kΩ)', min: 1, max: 500, step: 1, value: params.Rf,
    onInput: (v) => { params.Rf = v; } });
  const VinS = slider({ label: 'V_in peak (V)', min: 0.1, max: 5, step: 0.1, value: params.Vin, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Vin = v; } });
  const fS = slider({ label: 'Frequency (Hz)', min: 0.1, max: 4, step: 0.1, value: params.freq, format: (v) => v.toFixed(1),
    onInput: (v) => { params.freq = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Unity gain', { Rin: 10, Rf: 10 }], ['×10', { Rin: 10, Rf: 100 }], ['×100', { Rin: 1, Rf: 100 }]]) {
    const b = button({ label: n, onClick: () => {
      Object.assign(params, p);
      RinS.value = params.Rin; RfS.value = params.Rf;
    } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(RinS.el, RfS.el, VinS.el, fS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
