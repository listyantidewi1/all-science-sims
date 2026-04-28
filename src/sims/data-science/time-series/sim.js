import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    pattern: 'sine-trend',
    n: 200,
    noise: 0.4,
    window: 10,
    alpha: 0.2,
    showMA: true,
    showEMA: true,
    showTrue: true,
  };

  let series = [];

  function regen() {
    series = [];
    for (let i = 0; i < params.n; i++) {
      const t = i / params.n;
      let truth;
      if (params.pattern === 'sine-trend') truth = Math.sin(t * Math.PI * 4) + t;
      else if (params.pattern === 'step') truth = t < 0.5 ? -0.5 : 0.5;
      else if (params.pattern === 'random-walk') {
        truth = i === 0 ? 0 : series[i - 1].truth + gaussian() * 0.05;
      } else truth = 0;
      series.push({ t: i, truth, value: truth + gaussian() * params.noise });
    }
  }
  regen();

  function movingAverage(values, w) {
    const out = [];
    for (let i = 0; i < values.length; i++) {
      const lo = Math.max(0, i - Math.floor(w / 2));
      const hi = Math.min(values.length, i + Math.ceil(w / 2));
      let s = 0;
      for (let j = lo; j < hi; j++) s += values[j];
      out.push(s / (hi - lo));
    }
    return out;
  }
  function ema(values, alpha) {
    const out = [];
    let s = values[0] || 0;
    for (let i = 0; i < values.length; i++) {
      s = alpha * values[i] + (1 - alpha) * s;
      out.push(s);
    }
    return out;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    if (series.length === 0) return;
    const padX = 40, padY = 30;
    const gW = W - padX - 30, gH = H - padY - 50;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(padX, padY, gW, gH);

    const allVals = [...series.map((s) => s.value), ...series.map((s) => s.truth)];
    const min = Math.min(...allVals);
    const max = Math.max(...allVals);
    const x2 = (i) => padX + (i / (series.length - 1)) * gW;
    const y2 = (v) => padY + gH - ((v - min) / (max - min || 1)) * (gH - 16) - 8;

    // raw points
    ctx.fillStyle = 'rgba(120,130,150,0.5)';
    for (const s of series) {
      ctx.beginPath();
      ctx.arc(x2(s.t), y2(s.value), 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // true signal
    if (params.showTrue) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < series.length; i++) {
        const sx = x2(series[i].t), sy = y2(series[i].truth);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    const values = series.map((s) => s.value);

    // MA
    if (params.showMA) {
      const ma = movingAverage(values, params.window);
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < ma.length; i++) {
        const sx = x2(i), sy = y2(ma[i]);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // EMA
    if (params.showEMA) {
      const e = ema(values, params.alpha);
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < e.length; i++) {
        const sx = x2(i), sy = y2(e[i]);
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 76);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(16, 22 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText('true signal', 36, 26);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(16, 44 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`moving average (w=${params.window})`, 36, 44);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(16, 62 - 6, 12, 4);
    ctx.fillStyle = '#fff';
    ctx.fillText(`EMA (α=${params.alpha.toFixed(2)})`, 36, 62);
  }

  // controls
  const pSel = select({
    label: 'Underlying signal',
    options: [
      { value: 'sine-trend', label: 'Sine + linear trend' },
      { value: 'step', label: 'Step function' },
      { value: 'random-walk', label: 'Random walk' },
    ],
    value: params.pattern,
    onChange: (v) => { params.pattern = v; regen(); },
  });
  const noiseS = slider({ label: 'Noise σ', min: 0, max: 1.5, step: 0.05, value: params.noise, format: (v) => v.toFixed(2),
    onInput: (v) => { params.noise = v; regen(); } });
  const wS = slider({ label: 'Moving-average window', min: 1, max: 60, step: 1, value: params.window,
    onInput: (v) => { params.window = v; } });
  const aS = slider({ label: 'EMA α', min: 0.01, max: 1, step: 0.01, value: params.alpha, format: (v) => v.toFixed(2),
    onInput: (v) => { params.alpha = v; } });
  const trueT = toggle({ label: 'Show true signal', value: params.showTrue, onChange: (v) => { params.showTrue = v; } });
  const reB = button({ label: 'Resample noise', primary: true, onClick: regen });

  ctrlPanel.append(pSel.el, noiseS.el, wS.el, aS.el, trueT.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
