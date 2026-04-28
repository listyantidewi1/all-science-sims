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
    contribution: 5000,    // pre-tax salary contribution
    rate: 0.07,
    years: 30,
    bracketNow: 0.24,
    bracketRetirement: 0.22,
    capGains: 0.15,
  };

  function compute() {
    const taxable = [], trad = [], roth = [];
    let bT = 0, bTr = 0, bR = 0;
    // Roth contributes after-tax, taxable contributes after-tax, trad contributes pre-tax (full amount)
    const afterTax = params.contribution * (1 - params.bracketNow);
    for (let y = 0; y <= params.years; y++) {
      taxable.push(bT);
      trad.push(bTr);
      roth.push(bR);
      // grow then add contribution
      // Taxable: returns are taxed each year at cap gains rate (simplified — only on growth)
      const growthT = bT * params.rate;
      bT = bT * (1 + params.rate * (1 - params.capGains)) + afterTax;
      // Trad: tax-deferred growth
      bTr = bTr * (1 + params.rate) + params.contribution;
      // Roth: tax-free growth
      bR = bR * (1 + params.rate) + afterTax;
    }
    // At withdrawal:
    const finalTaxable = bT;  // already taxed annually
    const finalTrad = bTr * (1 - params.bracketRetirement);  // taxed as ordinary income at withdrawal
    const finalRoth = bR;  // tax-free
    return { taxable, trad, roth, finalTaxable, finalTrad, finalRoth };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const r = compute();
    const padX = 60, padY = 50;
    const gW = W - padX - 220, gH = H - padY - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const max = Math.max(...r.trad, ...r.roth, ...r.taxable);
    const x2 = (y) => padX + (y / params.years) * gW;
    const y2 = (v) => padY + gH - (v / max) * gH;

    function plot(arr, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < arr.length; i++) {
        const sx = x2(i), sy = y2(arr[i]);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    plot(r.taxable, '#94a3b8');
    plot(r.trad, '#0ea5e9');
    plot(r.roth, '#10b981');

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let y = 0; y <= params.years; y += 5) {
      ctx.beginPath(); ctx.moveTo(x2(y), padY); ctx.lineTo(x2(y), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${y}y`, x2(y) - 8, padY + gH + 14);
    }

    // legend with final values
    const lx = padX + gW + 20;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(lx, padY, 190, 100);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Final after-tax balance', lx + 8, padY + 18);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(lx + 12, padY + 28, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Taxable: $${r.finalTaxable.toFixed(0)}`, lx + 30, padY + 32);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(lx + 12, padY + 50, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Traditional: $${r.finalTrad.toFixed(0)}`, lx + 30, padY + 54);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(lx + 12, padY + 72, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Roth: $${r.finalRoth.toFixed(0)}`, lx + 30, padY + 76);

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Years →', padX + gW - 50, padY + gH + 30);
  }

  // controls
  const cS = slider({ label: 'Annual contribution $', min: 1000, max: 25000, step: 500, value: params.contribution,
    onInput: (v) => { params.contribution = v; } });
  const rS = slider({ label: 'Annual return', min: 0.02, max: 0.12, step: 0.005, value: params.rate, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.rate = v; } });
  const yS = slider({ label: 'Years', min: 5, max: 50, step: 1, value: params.years,
    onInput: (v) => { params.years = v; } });
  const bnS = slider({ label: 'Tax bracket now', min: 0.10, max: 0.40, step: 0.01, value: params.bracketNow, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.bracketNow = v; } });
  const brS = slider({ label: 'Tax bracket in retirement', min: 0.10, max: 0.40, step: 0.01, value: params.bracketRetirement, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.bracketRetirement = v; } });
  const cgS = slider({ label: 'Capital gains rate', min: 0, max: 0.30, step: 0.005, value: params.capGains, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.capGains = v; } });

  ctrlPanel.append(cS.el, rS.el, yS.el, bnS.el, brS.el, cgS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
