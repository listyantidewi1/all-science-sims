import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Solve linear system A x = b via Gauss-Jordan (n is small)
function solve(A, b) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let i = 0; i < n; i++) {
    let pivot = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[pivot][i])) pivot = r;
    [M[i], M[pivot]] = [M[pivot], M[i]];
    if (Math.abs(M[i][i]) < 1e-12) return null;
    for (let r = 0; r < n; r++) {
      if (r === i) continue;
      const f = M[r][i] / M[i][i];
      for (let c = i; c <= n; c++) M[r][c] -= f * M[i][c];
    }
  }
  const x = new Array(n);
  for (let i = 0; i < n; i++) x[i] = M[i][n] / M[i][i];
  return x;
}

function fitPoly(points, degree) {
  // build normal equations
  const n = degree + 1;
  const A = Array.from({ length: n }, () => new Array(n).fill(0));
  const b = new Array(n).fill(0);
  for (const p of points) {
    const xs = [1];
    for (let i = 1; i < n; i++) xs.push(xs[i - 1] * p.x);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) A[i][j] += xs[i] * xs[j];
      b[i] += xs[i] * p.y;
    }
  }
  return solve(A, b) || new Array(n).fill(0);
}
function evalPoly(coefs, x) {
  let y = 0, p = 1;
  for (const c of coefs) { y += c * p; p *= x; }
  return y;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { degree: 3, n: 15, noise: 0.4 };
  let points = [];

  function trueFn(x) { return Math.sin(x) + 0.3 * x; }
  function regenerate() {
    points = [];
    for (let i = 0; i < params.n; i++) {
      const x = -Math.PI + (i + Math.random() * 0.4) * (2 * Math.PI / params.n);
      const y = trueFn(x) + gaussian() * params.noise;
      points.push({ x, y });
    }
  }
  regenerate();

  const X_MIN = -Math.PI - 0.3, X_MAX = Math.PI + 0.3, Y_MIN = -3, Y_MAX = 3;
  function w2sX(x, W) { return 50 + ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 80); }
  function w2sY(y, H) { return 30 + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * (H - 60); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(120,130,150,0.2)';
    for (let yy = -2; yy <= 2; yy++) {
      ctx.beginPath();
      ctx.moveTo(50, w2sY(yy, H)); ctx.lineTo(W - 30, w2sY(yy, H));
      ctx.stroke();
    }

    // true curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const x = X_MIN + (i / 200) * (X_MAX - X_MIN);
      const y = trueFn(x);
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // fitted polynomial
    const coefs = fitPoly(points, params.degree);
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let bad = false;
    for (let i = 0; i <= 200; i++) {
      const x = X_MIN + (i / 200) * (X_MAX - X_MIN);
      const y = evalPoly(coefs, x);
      if (!Number.isFinite(y) || y < Y_MIN * 4 || y > Y_MAX * 4) { bad = true; continue; }
      const sx = w2sX(x, W), sy = w2sY(y, H);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // points
    ctx.fillStyle = '#fbbf24';
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(w2sX(p.x, W), w2sY(p.y, H), 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // train error vs underlying (test) error
    let trainErr = 0;
    for (const p of points) trainErr += (evalPoly(coefs, p.x) - p.y) ** 2;
    trainErr /= points.length;
    let testErr = 0;
    const testN = 80;
    for (let i = 0; i < testN; i++) {
      const x = X_MIN + (i / (testN - 1)) * (X_MAX - X_MIN);
      const v = evalPoly(coefs, x) - trueFn(x);
      if (Number.isFinite(v)) testErr += v * v;
    }
    testErr /= testN;

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Polynomial degree ${params.degree}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Train MSE: ${trainErr.toFixed(3)}`, 16, 44);
    ctx.fillText(`Test MSE (vs true curve): ${testErr.toFixed(3)}`, 16, 60);

    // verdict
    let verdict = '';
    if (params.degree <= 1) verdict = 'Underfitting (high bias)';
    else if (params.degree >= 8) verdict = 'Overfitting (high variance)';
    else verdict = 'Good fit';
    ctx.fillStyle = verdict.includes('Under') ? '#fbbf24' : verdict.includes('Over') ? '#ef4444' : '#10b981';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(verdict, W - 200, 26);
  }

  // controls
  const dS = slider({ label: 'Polynomial degree', min: 0, max: 15, step: 1, value: params.degree,
    onInput: (v) => { params.degree = v; } });
  const nS = slider({ label: 'Number of training points', min: 5, max: 40, step: 1, value: params.n,
    onInput: (v) => { params.n = v; regenerate(); } });
  const noiseS = slider({ label: 'Noise σ', min: 0, max: 1.5, step: 0.05, value: params.noise, format: (v) => v.toFixed(2),
    onInput: (v) => { params.noise = v; regenerate(); } });
  const reB = button({ label: 'Resample noise', primary: true, onClick: regenerate });
  ctrlPanel.append(dS.el, nS.el, noiseS.el, row(reB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
