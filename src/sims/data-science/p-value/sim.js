import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Standard normal pdf and right-tail cumulative.
function pdf(x) { return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI); }
// Approximation of the standard normal CDF (Abramowitz & Stegun 26.2.17)
function cdf(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const a = [0.319381530, -0.356563782, 1.781477937, -1.821255978, 1.330274429];
  let p = 0;
  let tk = t;
  for (let i = 0; i < 5; i++) { p += a[i] * tk; tk *= t; }
  const phi = pdf(Math.abs(x));
  const c = 1 - phi * p;
  return x >= 0 ? c : 1 - c;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { z: 1.7, alpha: 0.05, tail: 'one' };
  let chart = null;

  function pValue() {
    if (params.tail === 'two') return 2 * (1 - cdf(Math.abs(params.z)));
    return 1 - cdf(params.z);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 60, padY = 40;
    const w = W - padX - 30, h = H - padY - 80;
    chart = { x: padX, y: padY, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    const xMin = -4, xMax = 4;
    const x2 = (z) => padX + ((z - xMin) / (xMax - xMin)) * w;
    const y2 = (y) => padY + h - (y / 0.45) * (h - 16) - 8;

    // Rejection region (α)
    let zCrit;
    if (params.tail === 'two') {
      // alpha/2 in each tail
      zCrit = inverseCdf(1 - params.alpha / 2);
      ctx.fillStyle = 'rgba(239,68,68,0.18)';
      ctx.beginPath();
      ctx.moveTo(x2(xMin), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = xMin + (i / 100) * (-zCrit - xMin);
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(-zCrit), y2(0));
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x2(zCrit), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = zCrit + (i / 100) * (xMax - zCrit);
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(xMax), y2(0));
      ctx.closePath();
      ctx.fill();
    } else {
      zCrit = inverseCdf(1 - params.alpha);
      ctx.fillStyle = 'rgba(239,68,68,0.18)';
      ctx.beginPath();
      ctx.moveTo(x2(zCrit), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = zCrit + (i / 100) * (xMax - zCrit);
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(xMax), y2(0));
      ctx.closePath();
      ctx.fill();
    }

    // p-value tail (yellow), beyond observed
    const obs = params.z;
    ctx.fillStyle = 'rgba(251,191,36,0.45)';
    if (params.tail === 'two') {
      ctx.beginPath();
      ctx.moveTo(x2(Math.abs(obs)), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = Math.abs(obs) + (i / 100) * (xMax - Math.abs(obs));
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(xMax), y2(0));
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x2(xMin), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = xMin + (i / 100) * (-Math.abs(obs) - xMin);
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(-Math.abs(obs)), y2(0));
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x2(obs), y2(0));
      for (let i = 0; i <= 100; i++) {
        const z = obs + (i / 100) * (xMax - obs);
        ctx.lineTo(x2(z), y2(pdf(z)));
      }
      ctx.lineTo(x2(xMax), y2(0));
      ctx.closePath();
      ctx.fill();
    }

    // Standard normal pdf
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const z = xMin + (i / 200) * (xMax - xMin);
      const sx = x2(z), sy = y2(pdf(z));
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Observed marker
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x2(obs), y2(pdf(obs)), 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.beginPath();
    ctx.moveTo(x2(obs), y2(pdf(obs))); ctx.lineTo(x2(obs), y2(0));
    ctx.stroke();

    // x-axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px var(--font-mono)';
    for (let z = -4; z <= 4; z += 1) {
      ctx.fillText(`${z}`, x2(z) - 4, padY + h + 14);
    }

    // Header
    const p = pValue();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`Observed z = ${obs.toFixed(2)}    ${params.tail}-tailed`, 16, 28);
    ctx.fillStyle = p < params.alpha ? '#10b981' : '#ef4444';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`p-value = ${p.toFixed(4)}     ${p < params.alpha ? '< α: REJECT H₀' : '≥ α: fail to reject H₀'}`, 16, 50);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`α = ${params.alpha.toFixed(3)}    z_crit = ±${zCrit.toFixed(3)}`, 16, 66);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Yellow = p-value tail. Red = α rejection region. Drag the observed point to scan.', padX, H - 12);
  }

  function inverseCdf(p) {
    // Newton-style inverse via bisection
    let lo = -6, hi = 6;
    for (let i = 0; i < 60; i++) {
      const m = (lo + hi) / 2;
      if (cdf(m) < p) lo = m; else hi = m;
    }
    return (lo + hi) / 2;
  }

  // Drag the observed marker
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!chart) return null;
      const x2 = (z) => chart.x + ((z - (-4)) / 8) * chart.w;
      if (Math.hypot(sx - x2(params.z), sy - chart.y - chart.h / 2) < 30) return 'z';
      // anywhere on chart
      if (sx >= chart.x && sx <= chart.x + chart.w && sy >= chart.y && sy <= chart.y + chart.h) return 'z';
      return null;
    },
    onDrag(_id, sx) {
      params.z = -4 + ((sx - chart.x) / chart.w) * 8;
      zS.value = params.z;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const zS = slider({ label: 'Observed z', min: -4, max: 4, step: 0.01, value: params.z, format: (v) => v.toFixed(2),
    onInput: (v) => { params.z = v; } });
  const aS = slider({ label: 'Significance α', min: 0.001, max: 0.20, step: 0.001, value: params.alpha, format: (v) => v.toFixed(3),
    onInput: (v) => { params.alpha = v; } });
  const tailSel = select({
    label: 'Test type',
    options: [{ value: 'one', label: 'One-tailed (right)' }, { value: 'two', label: 'Two-tailed' }],
    value: params.tail,
    onChange: (v) => { params.tail = v; },
  });

  ctrlPanel.append(zS.el, aS.el, tailSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
