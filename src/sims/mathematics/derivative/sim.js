import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

const FUNCS = {
  cubic:  { label: 'x³ − 3x',           f: (x) => x * x * x - 3 * x,           df: (x) => 3 * x * x - 3 },
  parab:  { label: 'x²',                 f: (x) => x * x,                        df: (x) => 2 * x },
  sine:   { label: 'sin(x)',             f: (x) => Math.sin(x),                  df: (x) => Math.cos(x) },
  expo:   { label: 'e^x − 1',            f: (x) => Math.exp(x) - 1,              df: (x) => Math.exp(x) },
  bumpy:  { label: 'sin(2x) + 0.3·x',    f: (x) => Math.sin(2 * x) + 0.3 * x,    df: (x) => 2 * Math.cos(2 * x) + 0.3 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { kind: 'cubic', x0: 1.0 };
  let drag = false;
  const X_MIN = -3, X_MAX = 3, Y_MIN = -4, Y_MAX = 4;

  function w2sX(x, W) { return 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 60); }
  function w2sY(y, H, halfH, yMin, yMax, yOffset = 0) {
    return yOffset + 20 + ((yMax - y) / (yMax - yMin)) * (halfH - 40);
  }
  function s2wX(sx, W) { return X_MIN + ((sx - 40) / (W - 60)) * (X_MAX - X_MIN); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfH = H / 2;
    drawPanel(ctx, W, halfH, 0, 'f(x)', FUNCS[params.kind].f, false);
    drawPanel(ctx, W, halfH, halfH, "f'(x) — slope of tangent", FUNCS[params.kind].df, true);

    // Big readout
    const x0 = params.x0;
    const y0 = FUNCS[params.kind].f(x0);
    const dy = FUNCS[params.kind].df(x0);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`x = ${x0.toFixed(2)}    f(x) = ${y0.toFixed(2)}    f'(x) = ${dy.toFixed(2)}`, 16, 28);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the red dot horizontally', 12, H - 12);
  }

  function drawPanel(ctx, W, h, yOff, title, fn, isDeriv) {
    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.18)';
    ctx.lineWidth = 1;
    for (let x = X_MIN; x <= X_MAX; x++) {
      ctx.beginPath(); ctx.moveTo(w2sX(x, W), yOff + 20); ctx.lineTo(w2sX(x, W), yOff + h - 20); ctx.stroke();
    }
    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const yZero = w2sY(0, h, h, Y_MIN, Y_MAX, yOff);
    ctx.moveTo(40, yZero); ctx.lineTo(W - 20, yZero);
    ctx.stroke();

    // function curve
    ctx.strokeStyle = isDeriv ? '#f59e0b' : '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= 400; i++) {
      const x = X_MIN + (i / 400) * (X_MAX - X_MIN);
      const y = fn(x);
      if (!Number.isFinite(y)) { started = false; continue; }
      const sx = w2sX(x, W);
      const sy = w2sY(y, h, h, Y_MIN, Y_MAX, yOff);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // tangent line + dot
    const x0 = params.x0;
    const y0 = fn(x0);
    if (!Number.isFinite(y0)) return;
    const sx0 = w2sX(x0, W);
    const sy0 = w2sY(y0, h, h, Y_MIN, Y_MAX, yOff);

    if (!isDeriv) {
      const slope = FUNCS[params.kind].df(x0);
      const dx = 2;
      const yA = y0 + slope * (-dx);
      const yB = y0 + slope * dx;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w2sX(x0 - dx, W), w2sY(yA, h, h, Y_MIN, Y_MAX, yOff));
      ctx.lineTo(w2sX(x0 + dx, W), w2sY(yB, h, h, Y_MIN, Y_MAX, yOff));
      ctx.stroke();
    }

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(sx0, sy0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText(title, 50, yOff + 14);
  }

  // drag
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', () => { drag = true; });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    params.x0 = Math.max(X_MIN + 0.1, Math.min(X_MAX - 0.1, s2wX(p.x, cv.width)));
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const kindSel = select({
    label: 'Function',
    options: Object.entries(FUNCS).map(([k, v]) => ({ value: k, label: v.label })),
    value: params.kind,
    onChange: (v) => { params.kind = v; },
  });
  ctrlPanel.append(kindSel.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
