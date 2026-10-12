import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

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
      ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
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
    ctx.font = 'bold 12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`At n = ${params.n}`, legX + 8, padY + 16);
    for (let i = 0; i < FUNCS.length; i++) {
      const f = FUNCS[i];
      const yy = padY + 32 + i * 22;
      ctx.fillStyle = f.color;
      ctx.fillRect(legX + 8, yy - 8, 12, 4);
      ctx.fillStyle = '#fff';
      ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
      const v = f.f(params.n);
      const display = v > 1e9 ? v.toExponential(2) : v >= 1 ? v.toLocaleString(undefined, { maximumFractionDigits: 0 }) : v.toFixed(2);
      ctx.fillText(`${f.name}  ${display}`, legX + 26, yy);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
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

  // Lab — n vs operation counts for the growth functions above.
  const fmtCount = (v) => (v > 1e9 ? v.toExponential(2) : v.toLocaleString(undefined, { maximumFractionDigits: 2 }));
  const fnByName = (name) => FUNCS.find((f) => f.name === name).f;
  const lab = labPanel({
    title: 'Big-O lab — n vs operation counts',
    filename: 'big-o-lab.csv',
    columns: [
      { key: 'n',      label: 'n' },
      { key: 'logn',   label: 'log₂ n',  format: fmtCount },
      { key: 'nlogn',  label: 'n log n', format: fmtCount },
      { key: 'n2',     label: 'n²',      format: fmtCount },
      { key: 'exp',    label: '2ⁿ',      format: fmtCount },
      { key: 'fact',   label: 'n!',      format: fmtCount },
    ],
    procedure: [
      'Set n (current) = 1 and Record. Then record n = 2, 4, 8, 16, 30.',
      'Between consecutive rows n doubles. For each column, by what factor did the count grow?',
      'Which column grows by a constant factor when n doubles (polynomial)? Which grows by a factor that itself grows (exponential)?',
      'Toggle the log scale off and on. Which curves disappear off the top of the chart first?',
      'If one operation takes 1 ns, how long would 2ⁿ and n! take at n = 30? Compare with n log n.',
    ],
    predict: 'When n doubles from 8 to 16, by what factor do n², 2ⁿ and n! each grow?',
    source: () => {
      const n = params.n;
      return {
        n,
        logn: fnByName('O(log n)')(n),
        nlogn: fnByName('O(n log n)')(n),
        n2: fnByName('O(n²)')(n),
        exp: fnByName('O(2ⁿ)')(n),
        fact: fnByName('O(n!)')(n),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
