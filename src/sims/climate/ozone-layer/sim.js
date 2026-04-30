import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

// Steady-state O3 column from a simple production-loss balance.
// Production rate from O2+UV chemistry (constant for fixed UV).
// Loss = natural Chapman + catalytic Cl chains.
// Cl loss rate ∝ CFC concentration (chlorine activation).

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    cfc: 1.0,    // CFC ppb
    uv: 1.0,     // UV multiplier
    polar: false,
    running: true,
  };

  const baselineDU = 300;
  let state = { du: baselineDU, t: 0, history: [] };
  function reset() { state = { du: baselineDU, t: 0, history: [] }; }
  reset();

  function targetDU() {
    // Polar vortex amplifies CFC effect ~3×
    const cfcMult = params.polar ? 3 : 1;
    const lossFactor = 1 + cfcMult * params.cfc * 0.6;
    return baselineDU * params.uv / lossFactor;
  }

  function step(dt) {
    if (!params.running) return;
    const target = targetDU();
    const k = 0.4;
    state.du += (target - state.du) * k * dt;
    state.t += dt;
    state.history.push({ t: state.t, du: state.du });
    if (state.history.length > 1500) state.history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    drawColumn(ctx, 30, 30, W * 0.4, H - 80);
    drawHistory(ctx, W * 0.45, 30, W * 0.55 - 60, H - 80);

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Ozone column: ${state.du.toFixed(0)} DU`, 16, 28);
    ctx.fillStyle = state.du > 250 ? '#10b981' : state.du > 200 ? '#fbbf24' : '#ef4444';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(state.du > 220 ? 'normal' : state.du > 150 ? 'depleted' : '"hole"', 16, 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`CFC = ${params.cfc.toFixed(2)} ppb${params.polar ? ' (polar vortex)' : ''}`, 16, 64);
  }

  function drawColumn(ctx, x, y, w, h) {
    // Atmospheric column with ozone "shading" intensity proportional to du.
    const layers = ['Troposphere', 'Lower strat', 'Mid strat (ozone)', 'Upper strat', 'Mesosphere'];
    const colors = ['rgba(59,130,246,0.3)', 'rgba(168,139,250,0.3)', 'rgba(168,85,247,0.55)', 'rgba(168,85,247,0.25)', 'rgba(120,130,150,0.2)'];
    const layerH = h / layers.length;
    for (let i = 0; i < layers.length; i++) {
      ctx.fillStyle = colors[i];
      if (i === 2) {
        // Ozone layer: opacity scales with du
        const opacity = Math.min(0.85, state.du / 350 * 0.85);
        ctx.fillStyle = `rgba(168,85,247,${opacity})`;
      }
      ctx.fillRect(x, y + i * layerH, w, layerH);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.strokeRect(x, y + i * layerH, w, layerH);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(layers[i], x + 6, y + i * layerH + 14);
    }

    // UV photons coming in from the top
    const uvBlocked = state.du / 350;
    const uvCount = Math.round(8 * params.uv);
    for (let i = 0; i < uvCount; i++) {
      const xx = x + 10 + (i / uvCount) * (w - 20);
      const stopY = y + (uvBlocked > 0.5 ? layerH * 2.5 : h);   // stop in ozone layer if intact
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(xx, y); ctx.lineTo(xx, stopY);
      ctx.stroke();
      // arrowhead at bottom of incoming
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(xx, stopY); ctx.lineTo(xx - 3, stopY - 6); ctx.lineTo(xx + 3, stopY - 6);
      ctx.closePath();
      ctx.fill();
    }
    // CFC molecules drifting in mid stratosphere
    const cfcCount = Math.round(20 * params.cfc);
    for (let i = 0; i < cfcCount; i++) {
      const xx = x + 20 + (i * 137) % (w - 40);
      const yy = y + layerH * 2 + ((i * 91) % layerH);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(xx - 1, yy - 1, 3, 3);
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText('UV ↓', x + w - 40, y - 4);
    ctx.fillStyle = '#10b981';
    ctx.fillText('CFC ●', x + w - 90, y - 4);
  }

  function drawHistory(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Ozone column over time (DU)', x + 6, y - 6);

    const tNow = state.t;
    const tWin = 30;
    const t0 = Math.max(0, tNow - tWin);
    const x2 = (t) => x + ((t - t0) / tWin) * w;
    const Dmin = 100, Dmax = 400;
    const y2 = (D) => y + h - ((D - Dmin) / (Dmax - Dmin)) * h;

    // Reference 220 DU (hole threshold)
    ctx.strokeStyle = 'rgba(239,68,68,0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x, y2(220)); ctx.lineTo(x + w, y2(220));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px var(--font-mono)';
    ctx.fillText('220 DU (hole)', x + 6, y2(220) - 4);

    // History
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h_ of state.history) {
      if (h_.t < t0) continue;
      const sx = x2(h_.t), sy = y2(h_.du);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    for (const D of [100, 200, 300, 400]) {
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${D}`, x - 28, y2(D) + 3);
    }
  }

  // controls
  const cS = slider({ label: 'CFC concentration (ppb)', min: 0, max: 4, step: 0.05, value: params.cfc, format: (v) => v.toFixed(2),
    onInput: (v) => { params.cfc = v; } });
  const uvS = slider({ label: 'UV intensity (×)', min: 0.5, max: 1.5, step: 0.01, value: params.uv, format: (v) => v.toFixed(2),
    onInput: (v) => { params.uv = v; } });
  const polarT = toggle({ label: 'Polar vortex (3× CFC effect)', value: params.polar, onChange: (v) => { params.polar = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Pre-CFC', { cfc: 0 }], ['1990 peak', { cfc: 3 }], ['2024 today', { cfc: 1.5 }], ['Future', { cfc: 0.3 }]]) {
    const b = button({ label: n, onClick: () => { Object.assign(params, p); cS.value = params.cfc; } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });

  ctrlPanel.append(cS.el, uvS.el, polarT.el, presetRow, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
