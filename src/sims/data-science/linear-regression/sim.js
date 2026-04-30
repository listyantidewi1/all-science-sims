import { createCanvas } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const state = {
    points: seedPoints(),
    userSlope: 1,
    userIntercept: 0,
    showResiduals: true,
    showBestFit: true,
  };

  // World ranges
  const X_MIN = 0, X_MAX = 10, Y_MIN = 0, Y_MAX = 10;

  function seedPoints() {
    // Default scatter around y = 0.7x + 1.5
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const x = 1 + Math.random() * 8;
      const y = 0.7 * x + 1.5 + (Math.random() - 0.5) * 1.5;
      pts.push({ x, y });
    }
    return pts;
  }

  function bestFit(pts) {
    if (pts.length < 2) return null;
    const n = pts.length;
    let sx = 0, sy = 0, sxy = 0, sxx = 0;
    for (const p of pts) { sx += p.x; sy += p.y; sxy += p.x * p.y; sxx += p.x * p.x; }
    const mx = sx / n, my = sy / n;
    const denom = sxx - n * mx * mx;
    if (Math.abs(denom) < 1e-9) return { m: 0, b: my };
    const m = (sxy - n * mx * my) / denom;
    const b = my - m * mx;
    return { m, b };
  }

  function ssr(pts, m, b) {
    let s = 0;
    for (const p of pts) {
      const e = p.y - (m * p.x + b);
      s += e * e;
    }
    return s;
  }

  function w2sX(x, W) { return ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 80) + 60; }
  function w2sY(y, H) { return H - 40 - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H - 60); }
  function s2wX(sx, W) { return X_MIN + (sx - 60) / (W - 80) * (X_MAX - X_MIN); }
  function s2wY(sy, H) { return Y_MIN + (H - 40 - sy) / (H - 60) * (Y_MAX - Y_MIN); }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = w2sX(i, W);
      ctx.beginPath();
      ctx.moveTo(x, w2sY(0, H));
      ctx.lineTo(x, w2sY(10, H));
      ctx.stroke();
      const y = w2sY(i, H);
      ctx.beginPath();
      ctx.moveTo(w2sX(0, W), y);
      ctx.lineTo(w2sX(10, W), y);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,130,150,0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w2sX(0, W), w2sY(0, H));
    ctx.lineTo(w2sX(10, W), w2sY(0, H));
    ctx.moveTo(w2sX(0, W), w2sY(0, H));
    ctx.lineTo(w2sX(0, W), w2sY(10, H));
    ctx.stroke();

    // residuals (user line)
    if (state.showResiduals) {
      ctx.strokeStyle = 'rgba(236,72,153,0.4)';
      ctx.lineWidth = 1;
      for (const p of state.points) {
        const yhat = state.userSlope * p.x + state.userIntercept;
        ctx.beginPath();
        ctx.moveTo(w2sX(p.x, W), w2sY(p.y, H));
        ctx.lineTo(w2sX(p.x, W), w2sY(yhat, H));
        ctx.stroke();
      }
    }

    // user line
    drawLine(ctx, state.userSlope, state.userIntercept, '#ec4899', W, H, 3);

    // best-fit line
    const bf = bestFit(state.points);
    if (state.showBestFit && bf) {
      drawLine(ctx, bf.m, bf.b, '#10b981', W, H, 2.5, [6, 4]);
    }

    // points
    ctx.fillStyle = 'var(--color-fg)';
    for (const p of state.points) {
      ctx.beginPath();
      ctx.arc(w2sX(p.x, W), w2sY(p.y, H), 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // readout
    ctx.fillStyle = 'rgba(120,130,150,0.9)';
    ctx.font = '13px var(--font-sans)';
    const myErr = ssr(state.points, state.userSlope, state.userIntercept).toFixed(2);
    let txt = `Your line: y = ${state.userSlope.toFixed(2)}x + ${state.userIntercept.toFixed(2)}    SSR = ${myErr}`;
    ctx.fillText(txt, 12, 18);
    if (bf) {
      const bestErr = ssr(state.points, bf.m, bf.b).toFixed(2);
      ctx.fillStyle = 'rgba(16,185,129,0.95)';
      ctx.fillText(`Best fit:  y = ${bf.m.toFixed(2)}x + ${bf.b.toFixed(2)}    SSR = ${bestErr}`, 12, 36);
    }
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.fillText('Click to add point   ·   Right-click to remove nearest', 12, H - 12);
  }

  function drawLine(ctx, m, b, color, W, H, lw = 2, dash = []) {
    const x0 = X_MIN, x1 = X_MAX;
    const y0 = m * x0 + b;
    const y1 = m * x1 + b;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(w2sX(x0, W), w2sY(y0, H));
    ctx.lineTo(w2sX(x1, W), w2sY(y1, H));
    ctx.stroke();
    ctx.restore();
  }

  // Interactions: click to add, drag to move, right-click to remove
  let draggingIdx = -1;
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  function cursor(e) {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    return { sx, sy, x: s2wX(sx, cv.width), y: s2wY(sy, cv.height) };
  }
  function findNearest(x, y, threshold = 0.5) {
    let best = -1, bestD = threshold;
    for (let i = 0; i < state.points.length; i++) {
      const d = Math.hypot(state.points[i].x - x, state.points[i].y - y);
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  }
  cv.canvas.addEventListener('mousedown', (e) => {
    const c = cursor(e);
    if (c.x < X_MIN || c.x > X_MAX || c.y < Y_MIN || c.y > Y_MAX) return;
    if (e.button === 2) {
      const idx = findNearest(c.x, c.y, 0.5);
      if (idx >= 0) state.points.splice(idx, 1);
      return;
    }
    const idx = findNearest(c.x, c.y, 0.4);
    if (idx >= 0) {
      draggingIdx = idx;
      cv.canvas.style.cursor = 'grabbing';
    } else {
      state.points.push({ x: c.x, y: c.y });
      draggingIdx = state.points.length - 1;
      cv.canvas.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (draggingIdx < 0) return;
    const c = cursor(e);
    state.points[draggingIdx] = {
      x: Math.max(X_MIN, Math.min(X_MAX, c.x)),
      y: Math.max(Y_MIN, Math.min(Y_MAX, c.y)),
    };
  });
  window.addEventListener('mouseup', () => {
    draggingIdx = -1;
    cv.canvas.style.cursor = 'crosshair';
  });

  // Controls
  const slopeS = slider({
    label: 'Your slope (m)', min: -2, max: 3, step: 0.05, value: state.userSlope, format: (v) => v.toFixed(2),
    onInput: (v) => { state.userSlope = v; },
  });
  const intS = slider({
    label: 'Your intercept (b)', min: -3, max: 8, step: 0.05, value: state.userIntercept, format: (v) => v.toFixed(2),
    onInput: (v) => { state.userIntercept = v; },
  });
  const resT = toggle({ label: 'Show residuals', value: state.showResiduals, onChange: (v) => { state.showResiduals = v; } });
  const bfT = toggle({ label: 'Show best-fit line', value: state.showBestFit, onChange: (v) => { state.showBestFit = v; } });
  const newB = button({ label: 'New random points', onClick: () => { state.points = seedPoints(); } });
  const clearB = button({ label: 'Clear', onClick: () => { state.points = []; } });
  const matchB = button({ label: 'Match best fit', primary: true, onClick: () => {
    const bf = bestFit(state.points);
    if (bf) { state.userSlope = bf.m; state.userIntercept = bf.b; slopeS.value = bf.m; intS.value = bf.b; }
  } });

  ctrlPanel.append(slopeS.el, intS.el, resT.el, bfT.el, row(newB, clearB, matchB));

  // Lab — find the line that minimizes SSR; compare your fit to least squares.
  function ssr(pts, m, b) {
    let s = 0;
    for (const p of pts) { const e = p.y - (m * p.x + b); s += e * e; }
    return s;
  }
  const lab = labPanel({
    title: 'Linear regression lab — least-squares fit',
    filename: 'linear-regression-lab.csv',
    columns: [
      { key: 'n',     label: 'n points' },
      { key: 'mUser', label: 'your slope', format: (v) => v.toFixed(3) },
      { key: 'bUser', label: 'your int',   format: (v) => v.toFixed(3) },
      { key: 'ssrUser', label: 'your SSR', format: (v) => v.toFixed(1) },
      { key: 'mBest', label: 'OLS slope', format: (v) => v == null ? '–' : v.toFixed(3) },
      { key: 'bBest', label: 'OLS int',   format: (v) => v == null ? '–' : v.toFixed(3) },
      { key: 'ssrBest', label: 'OLS SSR', format: (v) => v == null ? '–' : v.toFixed(1) },
    ],
    procedure: [
      'Click "New" to generate scatter data. Adjust your slope/intercept to minimize SSR.',
      'Record your best attempt. Then click "Match best fit" — the OLS line.',
      'Notice: SSR_OLS ≤ SSR_yours always. Least squares is the unique minimum.',
      'Generate scatterier data — eyeballing gets harder; the math still works.',
      'Plot residuals to check for patterns; ideal residuals are random.',
    ],
    predict: 'Five points: (1,2), (2,3), (3,5), (4,6), (5,8). Estimate the slope by eye, then compute OLS.',
    source: () => {
      const bf = bestFit(state.points);
      return {
        n: state.points.length,
        mUser: state.userSlope,
        bUser: state.userIntercept,
        ssrUser: ssr(state.points, state.userSlope, state.userIntercept),
        mBest: bf ? bf.m : null,
        bBest: bf ? bf.b : null,
        ssrBest: bf ? ssr(state.points, bf.m, bf.b) : null,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    cv.destroy();
  };
}
