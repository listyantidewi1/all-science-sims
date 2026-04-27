import { createCanvas } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

const COLORS = ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316'];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const state = {
    points: [],
    centroids: [],
    assignments: [],
    k: 3,
    iter: 0,
    converged: false,
  };

  function seedClusters() {
    state.points = [];
    const k = state.k;
    for (let c = 0; c < k; c++) {
      const cx = 0.15 + 0.7 * Math.random();
      const cy = 0.15 + 0.7 * Math.random();
      for (let i = 0; i < 30; i++) {
        state.points.push({
          x: cx + (Math.random() - 0.5) * 0.16,
          y: cy + (Math.random() - 0.5) * 0.16,
        });
      }
    }
    initCentroids();
  }

  function initCentroids() {
    state.centroids = [];
    state.assignments = state.points.map(() => -1);
    state.iter = 0;
    state.converged = false;
    for (let c = 0; c < state.k; c++) {
      // pick random existing point
      if (state.points.length) {
        const p = state.points[Math.floor(Math.random() * state.points.length)];
        state.centroids.push({ x: p.x, y: p.y });
      } else {
        state.centroids.push({ x: Math.random(), y: Math.random() });
      }
    }
  }

  function stepAssign() {
    let changed = false;
    for (let i = 0; i < state.points.length; i++) {
      let best = 0, bestD = Infinity;
      for (let c = 0; c < state.centroids.length; c++) {
        const d = (state.points[i].x - state.centroids[c].x) ** 2 + (state.points[i].y - state.centroids[c].y) ** 2;
        if (d < bestD) { bestD = d; best = c; }
      }
      if (state.assignments[i] !== best) { state.assignments[i] = best; changed = true; }
    }
    return changed;
  }

  function stepUpdate() {
    let moved = false;
    for (let c = 0; c < state.centroids.length; c++) {
      let sx = 0, sy = 0, n = 0;
      for (let i = 0; i < state.points.length; i++) {
        if (state.assignments[i] === c) { sx += state.points[i].x; sy += state.points[i].y; n++; }
      }
      if (n > 0) {
        const nx = sx / n, ny = sy / n;
        if (Math.abs(nx - state.centroids[c].x) > 1e-5 || Math.abs(ny - state.centroids[c].y) > 1e-5) moved = true;
        state.centroids[c] = { x: nx, y: ny };
      }
    }
    return moved;
  }

  function iterate() {
    if (state.converged) return;
    const aChanged = stepAssign();
    const cMoved = stepUpdate();
    state.iter++;
    if (!aChanged && !cMoved) state.converged = true;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const x2 = (x) => 20 + x * (W - 40);
    const y2 = (y) => 20 + y * (H - 40);

    // points
    for (let i = 0; i < state.points.length; i++) {
      const p = state.points[i];
      const c = state.assignments[i];
      ctx.fillStyle = c >= 0 ? COLORS[c % COLORS.length] : '#94a3b8';
      ctx.beginPath();
      ctx.arc(x2(p.x), y2(p.y), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    // centroids
    for (let c = 0; c < state.centroids.length; c++) {
      const cn = state.centroids[c];
      ctx.strokeStyle = COLORS[c % COLORS.length];
      ctx.fillStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x2(cn.x), y2(cn.y), 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = COLORS[c % COLORS.length];
      ctx.fillRect(x2(cn.x) - 1, y2(cn.y) - 8, 2, 16);
      ctx.fillRect(x2(cn.x) - 8, y2(cn.y) - 1, 16, 2);
    }
    // header
    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`k = ${state.k}    iter = ${state.iter}    ${state.converged ? '✓ converged' : ''}`, 12, 18);
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '12px var(--font-sans)';
    ctx.fillText('Click empty space to add · drag any point or centroid · right-click to remove', W - 460, H - 12);
  }

  // Mouse / drag — supports points and centroids
  let drag = null; // {kind: 'point'|'centroid', idx}
  function cursor(e) {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    return {
      sx, sy,
      // inverse of x2/y2: x2(x) = 20 + x*(W-40); y2(y) = 20 + y*(H-40)
      x: (sx - 20) / (cv.width - 40),
      y: (sy - 20) / (cv.height - 40),
    };
  }
  function findHit(c) {
    // Check centroids first (drawn on top)
    for (let i = 0; i < state.centroids.length; i++) {
      const cn = state.centroids[i];
      const cx = 20 + cn.x * (cv.width - 40);
      const cy = 20 + cn.y * (cv.height - 40);
      if (Math.hypot(c.sx - cx, c.sy - cy) < 14) return { kind: 'centroid', idx: i };
    }
    for (let i = 0; i < state.points.length; i++) {
      const p = state.points[i];
      const px = 20 + p.x * (cv.width - 40);
      const py = 20 + p.y * (cv.height - 40);
      if (Math.hypot(c.sx - px, c.sy - py) < 8) return { kind: 'point', idx: i };
    }
    return null;
  }
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.canvas.addEventListener('mousedown', (e) => {
    const c = cursor(e);
    if (c.x < 0 || c.x > 1 || c.y < 0 || c.y > 1) return;
    const hit = findHit(c);
    if (e.button === 2) {
      if (hit && hit.kind === 'point') {
        state.points.splice(hit.idx, 1);
        state.assignments.splice(hit.idx, 1);
        state.converged = false;
      }
      return;
    }
    if (hit) {
      drag = hit;
      cv.canvas.style.cursor = 'grabbing';
    } else {
      state.points.push({ x: c.x, y: c.y });
      state.assignments.push(-1);
      state.converged = false;
      drag = { kind: 'point', idx: state.points.length - 1 };
      cv.canvas.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const c = cursor(e);
    const x = Math.max(0, Math.min(1, c.x));
    const y = Math.max(0, Math.min(1, c.y));
    if (drag.kind === 'point') state.points[drag.idx] = { x, y };
    else state.centroids[drag.idx] = { x, y };
    state.converged = false;
  });
  window.addEventListener('mouseup', () => {
    drag = null;
    cv.canvas.style.cursor = 'crosshair';
  });

  // controls
  const kS = slider({ label: 'k (clusters)', min: 2, max: 8, step: 1, value: state.k,
    onInput: (v) => { state.k = v; initCentroids(); } });
  const stepB = button({ label: 'Step', primary: true, onClick: iterate });
  const runB = button({ label: 'Run to convergence', onClick: () => {
    let safety = 100;
    while (!state.converged && safety-- > 0) iterate();
  } });
  const seedB = button({ label: 'Random clusters', onClick: seedClusters });
  const reinitB = button({ label: 'Reinit centroids', onClick: initCentroids });
  const clearB = button({ label: 'Clear', onClick: () => { state.points = []; initCentroids(); } });

  ctrlPanel.append(kS.el, row(stepB, runB), row(seedB, reinitB, clearB));

  seedClusters();

  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
