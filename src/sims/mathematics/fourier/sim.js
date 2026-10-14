import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, toggle } from '../../../lib/controls.js';

// Fourier series for various waveforms (period 2π)
function squareTarget(x) { return Math.sin(x) >= 0 ? 1 : -1; }
// Sawtooth x/π on (−π, π): rises from −1 at −π to 1 at π, jumps at odd multiples of π
function sawTarget(x) { let t = ((x / Math.PI + 1) % 2 + 2) % 2; return t - 1; }
// Triangle: peak +1 at x = 0, trough −1 at x = ±π (even function → cosine series)
function triTarget(x) { let t = ((x / Math.PI) % 2 + 2) % 2; return Math.abs(t - 1) * 2 - 1; }

function squarePartial(x, N) {
  let s = 0;
  for (let n = 1; n <= N; n += 2) s += Math.sin(n * x) / n;
  return s * 4 / Math.PI;
}
function sawPartial(x, N) {
  let s = 0;
  for (let n = 1; n <= N; n++) s += (n % 2 === 0 ? -1 : 1) * Math.sin(n * x) / n; // (−1)^(n+1)
  return s * 2 / Math.PI;
}
function triPartial(x, N) {
  let s = 0;
  for (let k = 1; k <= N; k += 2) s += Math.cos(k * x) / (k * k); // odd harmonics up to N, like the square wave
  return s * 8 / (Math.PI * Math.PI);
}

// n-th term of each series (with its Fourier coefficient); 0 when the harmonic is absent
function squareTerm(x, n) { return n % 2 === 1 ? (4 / Math.PI) * Math.sin(n * x) / n : 0; }
function sawTerm(x, n) { return (2 / Math.PI) * (n % 2 === 0 ? -1 : 1) * Math.sin(n * x) / n; }
function triTerm(x, n) { return n % 2 === 1 ? (8 / (Math.PI * Math.PI)) * Math.cos(n * x) / (n * n) : 0; }

const SHAPES = {
  square: { label: 'Square wave',    target: squareTarget, partial: squarePartial, term: squareTerm },
  saw:    { label: 'Sawtooth wave',  target: sawTarget,    partial: sawPartial,    term: sawTerm },
  triangle:{ label: 'Triangle wave', target: triTarget,    partial: triPartial,    term: triTerm },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { shape: 'square', N: 5, showHarmonics: true };

  const X_MIN = -2 * Math.PI, X_MAX = 2 * Math.PI, Y_MIN = -1.5, Y_MAX = 1.5;
  function w2sX(x, W) { return 50 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 70); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 60); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    ctx.lineWidth = 1;
    for (let x = X_MIN; x <= X_MAX; x += Math.PI / 2) {
      ctx.beginPath(); ctx.moveTo(w2sX(x, W), 30); ctx.lineTo(w2sX(x, W), H - 30); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.beginPath();
    ctx.moveTo(50, w2sY(0, H)); ctx.lineTo(W - 20, w2sY(0, H));
    ctx.stroke();

    // target (gray)
    ctx.strokeStyle = 'rgba(120,130,150,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 800; i++) {
      const x = X_MIN + (i / 800) * (X_MAX - X_MIN);
      const y = SHAPES[params.shape].target(x);
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // individual harmonics, faded
    if (params.showHarmonics) {
      ctx.lineWidth = 1;
      const N = params.N;
      const term = SHAPES[params.shape].term;
      for (let n = 1; n <= N; n++) {
        if (term(1, n) === 0) continue; // harmonic absent from this series (sin n, cos n ≠ 0 for integer n)
        ctx.strokeStyle = `hsla(${(n * 50) % 360}, 70%, 60%, 0.3)`;
        ctx.beginPath();
        let s = false;
        for (let i = 0; i <= 600; i++) {
          const x = X_MIN + (i / 600) * (X_MAX - X_MIN);
          // the actual n-th term of the series, scaled by its Fourier coefficient
          const y = term(x, n);
          const sx = w2sX(x, W), sy = w2sY(y, H);
          if (!s) { ctx.moveTo(sx, sy); s = true; } else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
    }

    // partial sum
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    started = false;
    for (let i = 0; i <= 800; i++) {
      const x = X_MIN + (i / 800) * (X_MAX - X_MIN);
      const y = SHAPES[params.shape].partial(x, params.N);
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`${SHAPES[params.shape].label} — ${params.N} term${params.N === 1 ? '' : 's'}`, 16, 28);
  }

  // controls
  const shapeSel = select({
    label: 'Target waveform',
    options: Object.entries(SHAPES).map(([k, v]) => ({ value: k, label: v.label })),
    value: params.shape,
    onChange: (v) => { params.shape = v; },
  });
  const NS = slider({ label: 'Number of harmonics N', min: 1, max: 50, step: 1, value: params.N,
    onInput: (v) => { params.N = v; } });
  const harmT = toggle({ label: 'Show individual harmonics', value: params.showHarmonics, onChange: (v) => { params.showHarmonics = v; } });

  ctrlPanel.append(shapeSel.el, NS.el, harmT.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
