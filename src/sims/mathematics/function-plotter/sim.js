import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const KINDS = {
  cubic:    { label: 'Cubic ax³+bx²+cx+d', f: (p, x) => p.a * x * x * x + p.b * x * x + p.c * x + p.d, params: ['a', 'b', 'c', 'd'] },
  quadratic:{ label: 'Quadratic ax²+bx+c', f: (p, x) => p.a * x * x + p.b * x + p.c, params: ['a', 'b', 'c'] },
  sine:     { label: 'A·sin(ωx + φ) + d', f: (p, x) => p.a * Math.sin(p.b * x + p.c) + p.d, params: ['a', 'b', 'c', 'd'] },
  cosine:   { label: 'A·cos(ωx + φ) + d', f: (p, x) => p.a * Math.cos(p.b * x + p.c) + p.d, params: ['a', 'b', 'c', 'd'] },
  expo:     { label: 'a·e^(b·x) + d',     f: (p, x) => p.a * Math.exp(p.b * x) + p.d, params: ['a', 'b', 'd'] },
  log:      { label: 'a·ln(x) + d (x>0)',  f: (p, x) => x > 0 ? p.a * Math.log(x) + p.d : NaN, params: ['a', 'd'] },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { kind: 'cubic', a: 1, b: 0, c: -4, d: 0 };

  const X_MIN = -6, X_MAX = 6, Y_MIN = -6, Y_MAX = 6;
  function w2sX(x, W) { return 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 60); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 60); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    ctx.lineWidth = 1;
    for (let x = X_MIN; x <= X_MAX; x++) {
      ctx.beginPath(); ctx.moveTo(w2sX(x, W), 30); ctx.lineTo(w2sX(x, W), H - 30); ctx.stroke();
    }
    for (let y = Y_MIN; y <= Y_MAX; y++) {
      ctx.beginPath(); ctx.moveTo(40, w2sY(y, H)); ctx.lineTo(W - 20, w2sY(y, H)); ctx.stroke();
    }

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, w2sY(0, H)); ctx.lineTo(W - 20, w2sY(0, H));
    ctx.moveTo(w2sX(0, W), 30); ctx.lineTo(w2sX(0, W), H - 30);
    ctx.stroke();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (let x = X_MIN; x <= X_MAX; x++) if (x !== 0) ctx.fillText(String(x), w2sX(x, W) - 4, w2sY(0, H) + 12);
    for (let y = Y_MIN; y <= Y_MAX; y++) if (y !== 0) ctx.fillText(String(y), w2sX(0, W) + 4, w2sY(y, H) + 3);

    // function curve
    const kind = KINDS[params.kind];
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 600; i++) {
      const x = X_MIN + (i / 600) * (X_MAX - X_MIN);
      const y = kind.f(params, x);
      if (!Number.isFinite(y) || y < Y_MIN * 4 || y > Y_MAX * 4) { started = false; continue; }
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // formula
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(formula(), 16, 28);
  }

  function formula() {
    const k = params.kind;
    if (k === 'cubic') return `f(x) = ${params.a}x³ + ${params.b}x² + ${params.c}x + ${params.d}`;
    if (k === 'quadratic') return `f(x) = ${params.a}x² + ${params.b}x + ${params.c}`;
    if (k === 'sine') return `f(x) = ${params.a}·sin(${params.b}x + ${params.c}) + ${params.d}`;
    if (k === 'cosine') return `f(x) = ${params.a}·cos(${params.b}x + ${params.c}) + ${params.d}`;
    if (k === 'expo') return `f(x) = ${params.a}·e^(${params.b}x) + ${params.d}`;
    if (k === 'log') return `f(x) = ${params.a}·ln(x) + ${params.d}`;
    return '';
  }

  function rebuild() {
    ctrlPanel.innerHTML = '';
    const kindSel = select({
      label: 'Function',
      options: Object.entries(KINDS).map(([k, v]) => ({ value: k, label: v.label })),
      value: params.kind,
      onChange: (v) => { params.kind = v; rebuild(); },
    });
    ctrlPanel.appendChild(kindSel.el);
    const used = KINDS[params.kind].params;
    for (const name of used) {
      const isFreq = (params.kind === 'sine' || params.kind === 'cosine') && name === 'b';
      const isExpoB = params.kind === 'expo' && name === 'b';
      const min = isFreq ? 0 : isExpoB ? -2 : -5;
      const max = isFreq ? 6 : isExpoB ? 2 : 5;
      const step = isExpoB ? 0.05 : 0.1;
      const s = slider({
        label: name, min, max, step, value: params[name] || 0, format: (v) => v.toFixed(2),
        onInput: (v) => { params[name] = v; },
      });
      ctrlPanel.appendChild(s.el);
    }
  }
  rebuild();

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
