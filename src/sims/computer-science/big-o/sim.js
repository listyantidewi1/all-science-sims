import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';

const FUNCS = [
  { name: 'O(1)',       f: (n) => 1,                       color: '#10b981' },
  { name: 'O(log n)',   f: (n) => Math.log2(Math.max(1, n)), color: '#22d3ee' },
  { name: 'O(n)',       f: (n) => n,                        color: '#0ea5e9' },
  { name: 'O(n log n)', f: (n) => n * Math.log2(Math.max(1, n)), color: '#a78bfa' },
  { name: 'O(n²)',      f: (n) => n * n,                    color: '#fbbf24' },
  { name: 'O(2ⁿ)',      f: (n) => Math.pow(2, n),           color: '#fb923c' },
  { name: 'O(n!)',      f: (n) => { let p = 1; for (let i = 2; i <= n; i++) p *= i; return p; }, color: '#ef4444' },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { nMax: 20, n: 10, logScale: true };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 30;
    const gW = W - padX - 250, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    // y-axis values
    let maxY = 0;
    for (const f of FUNCS) {
      const v = f.f(params.nMax);
      if (Number.isFinite(v) && v > maxY) maxY = v;
    }
    if (params.logScale) maxY = Math.log10(maxY + 1);
    const yMin = params.logScale ? 0 : 0;
    const x2 = (n) => padX + (n / params.nMax) * gW;
    const y2 = (v) => {
      const yv = params.logScale ? Math.log10(Math.max(1, v)) : v;
      return padY + gH - ((yv - yMin) / (maxY - yMin || 1)) * gH;
    };

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let i = 0; i <= 5; i++) {
      const n = (i / 5) * params.nMax;
      ctx.beginPath(); ctx.moveTo(x2(n), padY); ctx.lineTo(x2(n), padY + gH); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${n.toFixed(0)}`, x2(n) - 6, padY + gH + 14);
    }

    // curves
    for (const f of FUNCS) {
      ctx.strokeStyle = f.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 200; i++) {
        const n = (i / 200) * params.nMax;
        const v = f.f(n);
        if (!Number.isFinite(v)) { started = false; continue; }
        const sx = x2(n), sy = y2(v);
        if (sy < padY || sy > padY + gH) { started = false; continue; }
        if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // legend on the right with values at current n
    const legX = padX + gW + 20;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(legX, padY, 200, FUNCS.length * 22 + 16);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`At n = ${params.n}`, legX + 8, padY + 16);
    for (let i = 0; i < FUNCS.length; i++) {
      const f = FUNCS[i];
      const yy = padY + 32 + i * 22;
      ctx.fillStyle = f.color;
      ctx.fillRect(legX + 8, yy - 8, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-mono)';
      const v = f.f(params.n);
      const display = v > 1e9 ? v.toExponential(2) : v >= 1 ? v.toLocaleString(undefined, { maximumFractionDigits: 0 }) : v.toFixed(2);
      ctx.fillText(`${f.name}  ${display}`, legX + 26, yy);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('n →', padX + gW - 30, padY + gH + 14);
    ctx.fillText(`${params.logScale ? 'log scale' : 'linear scale'}`, padX + 6, padY + gH + 14);
  }

  // controls
  const nMaxS = slider({ label: 'n max', min: 5, max: 50, step: 1, value: params.nMax,
    onInput: (v) => { params.nMax = v; if (params.n > v) params.n = v; } });
  const nS = slider({ label: 'n (current)', min: 1, max: 30, step: 1, value: params.n,
    onInput: (v) => { params.n = v; } });
  const logT = toggle({ label: 'Log scale', value: params.logScale, onChange: (v) => { params.logScale = v; } });
  ctrlPanel.append(nMaxS.el, nS.el, logT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
