import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select } from '../../../lib/controls.js';

const FUNCS = {
  parab:  { label: 'x²',                   f: (x) => x * x,                       integral: (a, b) => (b ** 3 - a ** 3) / 3 },
  cubic:  { label: 'x³ − x',               f: (x) => x * x * x - x,                integral: (a, b) => (b ** 4 - a ** 4) / 4 - (b * b - a * a) / 2 },
  sine:   { label: 'sin(x) (positive half)', f: (x) => Math.sin(x),                integral: (a, b) => -Math.cos(b) + Math.cos(a) },
  bell:   { label: 'e^(−x²)',               f: (x) => Math.exp(-x * x),            integral: null },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { kind: 'parab', a: -1, b: 2, N: 12, rule: 'left' };

  const X_MIN = -3, X_MAX = 3, Y_MIN = -3, Y_MAX = 9;
  function w2sX(x, W) { return 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 60); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 60); }

  function rsum() {
    const f = FUNCS[params.kind].f;
    const dx = (params.b - params.a) / params.N;
    let s = 0;
    for (let i = 0; i < params.N; i++) {
      const xi = params.a + i * dx;
      let y;
      if (params.rule === 'left') y = f(xi);
      else if (params.rule === 'right') y = f(xi + dx);
      else if (params.rule === 'midpoint') y = f(xi + dx / 2);
      else y = (f(xi) + f(xi + dx)) / 2;
      s += y * dx;
    }
    return s;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // grid + axes
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (let x = X_MIN; x <= X_MAX; x++) { ctx.beginPath(); ctx.moveTo(w2sX(x, W), 30); ctx.lineTo(w2sX(x, W), H - 30); ctx.stroke(); }
    for (let y = Y_MIN; y <= Y_MAX; y += 2) { ctx.beginPath(); ctx.moveTo(40, w2sY(y, H)); ctx.lineTo(W - 20, w2sY(y, H)); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, w2sY(0, H)); ctx.lineTo(W - 20, w2sY(0, H));
    ctx.moveTo(w2sX(0, W), 30); ctx.lineTo(w2sX(0, W), H - 30);
    ctx.stroke();

    // rectangles
    const f = FUNCS[params.kind].f;
    const dx = (params.b - params.a) / params.N;
    for (let i = 0; i < params.N; i++) {
      const xi = params.a + i * dx;
      let y;
      let sampleX;
      if (params.rule === 'left') { y = f(xi); sampleX = xi; }
      else if (params.rule === 'right') { y = f(xi + dx); sampleX = xi + dx; }
      else if (params.rule === 'midpoint') { y = f(xi + dx / 2); sampleX = xi + dx / 2; }
      else { y = (f(xi) + f(xi + dx)) / 2; sampleX = xi + dx / 2; }
      const x1 = w2sX(xi, W);
      const x2 = w2sX(xi + dx, W);
      const yTop = w2sY(y, H);
      const yBase = w2sY(0, H);
      ctx.fillStyle = y >= 0 ? 'rgba(14,165,233,0.45)' : 'rgba(239,68,68,0.45)';
      ctx.fillRect(x1, Math.min(yTop, yBase), x2 - x1, Math.abs(yBase - yTop));
      ctx.strokeStyle = y >= 0 ? '#0ea5e9' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.strokeRect(x1, Math.min(yTop, yBase), x2 - x1, Math.abs(yBase - yTop));
    }

    // function curve on top
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 600; i++) {
      const x = X_MIN + (i / 600) * (X_MAX - X_MIN);
      const y = f(x);
      if (!Number.isFinite(y)) { started = false; continue; }
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // bounds markers
    ctx.strokeStyle = '#10b981';
    ctx.setLineDash([4, 4]);
    for (const x of [params.a, params.b]) {
      ctx.beginPath();
      ctx.moveTo(w2sX(x, W), 30); ctx.lineTo(w2sX(x, W), H - 30);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // info
    const approx = rsum();
    const exact = FUNCS[params.kind].integral ? FUNCS[params.kind].integral(params.a, params.b) : null;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Riemann sum (${params.rule}): ${approx.toFixed(4)}`, 16, 26);
    if (exact != null) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Exact integral: ${exact.toFixed(4)}    error: ${(approx - exact).toFixed(4)}`, 16, 44);
    }
  }

  // controls
  const kindSel = select({
    label: 'f(x)',
    options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.label })),
    value: params.kind,
    onChange: (v) => { params.kind = v; },
  });
  const aS = slider({ label: 'Lower bound a', min: X_MIN, max: X_MAX, step: 0.1, value: params.a, format: (v) => v.toFixed(1),
    onInput: (v) => { params.a = Math.min(v, params.b - 0.1); } });
  const bS = slider({ label: 'Upper bound b', min: X_MIN, max: X_MAX, step: 0.1, value: params.b, format: (v) => v.toFixed(1),
    onInput: (v) => { params.b = Math.max(v, params.a + 0.1); } });
  const NS = slider({ label: 'Number of rectangles N', min: 1, max: 200, step: 1, value: params.N,
    onInput: (v) => { params.N = v; } });
  const ruleSel = select({
    label: 'Rule',
    options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }, { value: 'midpoint', label: 'Midpoint' }, { value: 'trap', label: 'Trapezoidal' }],
    value: params.rule,
    onChange: (v) => { params.rule = v; },
  });

  ctrlPanel.append(kindSel.el, aS.el, bS.el, NS.el, ruleSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
