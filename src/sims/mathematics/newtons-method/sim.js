import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, slider, button, row } from '../../../lib/controls.js';

const FUNCS = {
  cubic1: { label: 'x³ − 2x − 5',     f: (x) => x * x * x - 2 * x - 5,      df: (x) => 3 * x * x - 2 },
  cubic2: { label: 'x³ − x',          f: (x) => x * x * x - x,              df: (x) => 3 * x * x - 1 },
  expoZero:{ label: 'e^x − 2',        f: (x) => Math.exp(x) - 2,             df: (x) => Math.exp(x) },
  cosFn:  { label: 'cos(x) − 0.5x',   f: (x) => Math.cos(x) - 0.5 * x,        df: (x) => -Math.sin(x) - 0.5 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { kind: 'cubic1', maxIter: 8 };
  let history = []; // {x, y}

  const X_MIN = -3, X_MAX = 3, Y_MIN = -8, Y_MAX = 8;
  function w2sX(x, W) { return 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 60); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 60); }
  function s2wX(sx, W) { return X_MIN + ((sx - 40) / (W - 60)) * (X_MAX - X_MIN); }

  function iterate(x0) {
    const fn = FUNCS[params.kind];
    history = [];
    let x = x0;
    history.push({ x, y: fn.f(x) });
    for (let i = 0; i < params.maxIter; i++) {
      const f = fn.f(x), df = fn.df(x);
      if (Math.abs(df) < 1e-9) break;
      const next = x - f / df;
      // record line from (x, f(x)) → (next, 0) → (next, f(next))
      history.push({ x: next, y: 0, tangentFrom: { x, y: f } });
      const nextY = fn.f(next);
      history.push({ x: next, y: nextY });
      x = next;
      if (Math.abs(f) < 1e-10) break;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    for (let x = X_MIN; x <= X_MAX; x++) { ctx.beginPath(); ctx.moveTo(w2sX(x, W), 30); ctx.lineTo(w2sX(x, W), H - 30); ctx.stroke(); }
    for (let y = Y_MIN; y <= Y_MAX; y += 2) { ctx.beginPath(); ctx.moveTo(40, w2sY(y, H)); ctx.lineTo(W - 20, w2sY(y, H)); ctx.stroke(); }
    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, w2sY(0, H)); ctx.lineTo(W - 20, w2sY(0, H));
    ctx.moveTo(w2sX(0, W), 30); ctx.lineTo(w2sX(0, W), H - 30);
    ctx.stroke();

    // function curve
    const fn = FUNCS[params.kind];
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 600; i++) {
      const x = X_MIN + (i / 600) * (X_MAX - X_MIN);
      const y = fn.f(x);
      if (!Number.isFinite(y) || y < Y_MIN * 4 || y > Y_MAX * 4) { started = false; continue; }
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // iteration steps
    if (history.length > 0) {
      ctx.lineWidth = 2;
      for (let i = 1; i < history.length; i++) {
        const a = history[i - 1], b = history[i];
        if (b.tangentFrom) {
          // tangent line from (b.tangentFrom.x, f) to (b.x, 0)
          ctx.strokeStyle = 'rgba(251,191,36,0.7)';
          ctx.beginPath();
          ctx.moveTo(w2sX(b.tangentFrom.x, W), w2sY(b.tangentFrom.y, H));
          ctx.lineTo(w2sX(b.x, W), w2sY(0, H));
          ctx.stroke();
        } else {
          // vertical from (b.x, 0) up to (b.x, f(b.x))
          ctx.strokeStyle = 'rgba(245,158,11,0.4)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(w2sX(a.x, W), w2sY(a.y, H));
          ctx.lineTo(w2sX(b.x, W), w2sY(b.y, H));
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
      // dots
      let iter = 0;
      for (const h of history) {
        if (h.tangentFrom) continue; // skip the on-axis intermediate
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(w2sX(h.x, W), w2sY(h.y, H), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px var(--font-mono)';
        ctx.fillText(`x${iter}`, w2sX(h.x, W) + 7, w2sY(h.y, H) - 4);
        iter++;
      }
    }

    // info
    const xs = history.filter((h) => !h.tangentFrom).map((h) => h.x);
    const lastX = xs.length ? xs[xs.length - 1] : null;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(lastX != null ? `Converged to x ≈ ${lastX.toFixed(6)}    f = ${fn.f(lastX).toExponential(2)}` : 'Click anywhere to start',
      16, 28);
  }

  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const x0 = s2wX(sx, cv.width);
    iterate(x0);
  });

  // controls
  const kindSel = select({
    label: 'f(x)',
    options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.label })),
    value: params.kind,
    onChange: (v) => { params.kind = v; history = []; },
  });
  const itS = slider({ label: 'Max iterations', min: 1, max: 25, step: 1, value: params.maxIter,
    onInput: (v) => { params.maxIter = v; if (history.length > 0) iterate(history[0].x); } });
  const clearB = button({ label: 'Clear', onClick: () => { history = []; } });

  ctrlPanel.append(kindSel.el, itS.el, row(clearB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
