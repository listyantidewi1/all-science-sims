import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    r: 0.4,
    K: 1000,
    N0: 10,
    Tmax: 30,
    showExp: true,
  };

  let chart = null;

  function logistic(t) {
    const A = (params.K - params.N0) / params.N0;
    return params.K / (1 + A * Math.exp(-params.r * t));
  }
  function exponential(t) { return params.N0 * Math.exp(params.r * t); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const w = W - padX - 30, h = H - padY - 60;
    chart = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const Nmax = params.K * 1.3;
    const x2 = (t) => padX + (t / params.Tmax) * w;
    const y2 = (N) => padY + h - (N / Nmax) * h;

    // Carrying capacity line
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padX, y2(params.K)); ctx.lineTo(padX + w, y2(params.K));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`K = ${params.K}`, padX + 6, y2(params.K) - 4);

    // Exponential reference
    if (params.showExp) {
      ctx.strokeStyle = 'rgba(120,130,150,0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const t = (i / 200) * params.Tmax;
        const N = exponential(t);
        if (N > Nmax) break;
        const sx = x2(t), sy = y2(N);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Logistic
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * params.Tmax;
      const N = logistic(t);
      const sx = x2(t), sy = y2(N);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Inflection point at N = K/2
    const tInfl = Math.log((params.K - params.N0) / params.N0) / params.r;
    if (tInfl < params.Tmax) {
      ctx.fillStyle = '#ec4899';
      ctx.beginPath(); ctx.arc(x2(tInfl), y2(params.K / 2), 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ec4899';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText('inflection (fastest growth)', x2(tInfl) + 10, y2(params.K / 2) - 6);
    }

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (let t = 0; t <= params.Tmax; t += params.Tmax / 6) {
      ctx.fillText(t.toFixed(0), x2(t) - 6, padY + h + 14);
    }
    for (let i = 0; i <= 4; i++) {
      const N = (i / 4) * Nmax;
      ctx.fillText(N.toFixed(0), padX - 40, y2(N) + 4);
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`dN/dt = rN(1 − N/K)`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillStyle = '#10b981';
    ctx.fillText(`r = ${params.r.toFixed(2)}    K = ${params.K}    N₀ = ${params.N0}`, 16, 46);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`inflection at t = ${tInfl.toFixed(2)}`, 16, 62);

    const probe = hover.get();
    if (probe) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    const { x, y, w, h } = chart;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return null;
    const t = ((sx - x) / w) * params.Tmax;
    const Nl = logistic(t);
    const Ne = exponential(t);
    return {
      x: sx,
      y: y + h - (Nl / (params.K * 1.3)) * h,
      label: [`t = ${t.toFixed(2)}`, `logistic N = ${Nl.toFixed(1)}`, `exp N = ${Ne.toFixed(1)}`],
    };
  });

  // controls
  const rS = slider({ label: 'r (growth rate)', min: 0.05, max: 1.5, step: 0.01, value: params.r, format: (v) => v.toFixed(2),
    onInput: (v) => { params.r = v; } });
  const KS = slider({ label: 'K (carrying capacity)', min: 100, max: 5000, step: 50, value: params.K,
    onInput: (v) => { params.K = v; } });
  const N0S = slider({ label: 'N₀ (initial)', min: 1, max: 1000, step: 1, value: params.N0,
    onInput: (v) => { params.N0 = v; } });
  const tS = slider({ label: 'Time horizon', min: 5, max: 100, step: 1, value: params.Tmax,
    onInput: (v) => { params.Tmax = v; } });
  const expT = toggle({ label: 'Show exponential reference', value: params.showExp, onChange: (v) => { params.showExp = v; } });

  ctrlPanel.append(rS.el, KS.el, N0S.el, tS.el, expT.el);

  // Lab — verify the inflection at K/2 and the doubling-time.
  const lab = labPanel({
    title: 'Logistic growth lab — inflection at K/2',
    filename: 'logistic-growth-lab.csv',
    columns: [
      { key: 'r',      label: 'r',         format: (v) => v.toFixed(2) },
      { key: 'K',      label: 'K' },
      { key: 'N0',     label: 'N₀' },
      { key: 't',      label: 't',         format: (v) => v.toFixed(1) },
      { key: 'N',      label: 'N(t)',      format: (v) => v.toFixed(1) },
      { key: 'tInfl',  label: 't_inflect', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'r = 0.4, K = 1000, N₀ = 10. Sweep t = 0, 5, 10, 15, 20, 30. Record N at each.',
      'Find when N = K/2 = 500 — that\'s the inflection point.',
      'Predicted: t_infl = ln((K-N₀)/N₀) / r ≈ 11.5 with these parameters.',
      'Plot N vs t — classic S-curve. dN/dt vs N is a downward parabola with peak at K/2.',
      'Compare with exponential reference (toggle on) — they overlap for small N, diverge near K.',
    ],
    predict: 'A bacteria culture with r = 1 hour⁻¹, K = 1 million, N₀ = 100. When does it reach 500k?',
    source: () => {
      const tInfl = Math.log((params.K - params.N0) / params.N0) / params.r;
      // Use t = horizon as "current" sample
      const t = params.Tmax / 2;
      const N = logistic(t);
      return {
        r: params.r,
        K: params.K,
        N0: params.N0,
        t,
        N,
        tInfl,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
