import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const SURFACES = {
  bowl: {
    name: 'Convex bowl',
    f: (x, y) => 0.5 * (x * x + y * y),
    grad: (x, y) => [x, y],
  },
  banana: {
    name: 'Rosenbrock (banana)',
    f: (x, y) => (1 - x) * (1 - x) + 5 * (y - x * x) * (y - x * x),
    grad: (x, y) => [-2 * (1 - x) - 20 * x * (y - x * x), 10 * (y - x * x)],
  },
  multimodal: {
    name: 'Multi-modal',
    f: (x, y) => Math.sin(x * 1.5) * Math.cos(y * 1.5) + 0.05 * (x * x + y * y),
    grad: (x, y) => [
      1.5 * Math.cos(x * 1.5) * Math.cos(y * 1.5) + 0.1 * x,
      -1.5 * Math.sin(x * 1.5) * Math.sin(y * 1.5) + 0.1 * y,
    ],
  },
  saddle: {
    name: 'Saddle point',
    f: (x, y) => x * x - y * y,
    grad: (x, y) => [2 * x, -2 * y],
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    surface: 'bowl',
    lr: 0.05,
    momentum: 0,
    speed: 30,
  };

  let particle = null; // {x, y, vx, vy, history}
  const RANGE = 4; // [-4, 4] in world coords

  function w2sX(x) { return cv.width / 2 + (x / RANGE) * cv.width / 2; }
  function w2sY(y) { return cv.height / 2 - (y / RANGE) * cv.height / 2; }
  function s2wX(sx) { return ((sx - cv.width / 2) / (cv.width / 2)) * RANGE; }
  function s2wY(sy) { return -((sy - cv.height / 2) / (cv.height / 2)) * RANGE; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    const surf = SURFACES[params.surface];

    // Sample loss surface as heatmap
    const cell = 4;
    const samples = [];
    let min = Infinity, max = -Infinity;
    for (let sy = 0; sy < H; sy += cell) {
      const row = [];
      for (let sx = 0; sx < W; sx += cell) {
        const v = surf.f(s2wX(sx), s2wY(sy));
        row.push(v);
        if (v < min) min = v;
        if (v > max) max = v;
      }
      samples.push(row);
    }
    for (let i = 0, sy = 0; sy < H; sy += cell, i++) {
      for (let j = 0, sx = 0; sx < W; sx += cell, j++) {
        const v = samples[i][j];
        const t = (v - min) / (max - min + 1e-6);
        const r = Math.round(40 + t * 200);
        const g = Math.round(60 + (1 - t) * 150);
        const b = Math.round(150 - t * 100);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(sx, sy, cell, cell);
      }
    }

    // Contour lines (very coarse)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    const levels = 6;
    for (let li = 1; li < levels; li++) {
      const target = min + (max - min) * li / levels;
      // sample-and-mark approach
      for (let sy = 0; sy + cell < H; sy += cell) {
        for (let sx = 0; sx + cell < W; sx += cell) {
          const i = sy / cell, j = sx / cell;
          if (i + 1 >= samples.length || j + 1 >= samples[0].length) continue;
          const a = samples[i][j];
          const b = samples[i][j + 1];
          if ((a - target) * (b - target) < 0) {
            ctx.beginPath();
            ctx.moveTo(sx, sy + cell / 2);
            ctx.lineTo(sx + cell, sy + cell / 2);
            ctx.stroke();
          }
        }
      }
    }

    // particle path
    if (particle && particle.history.length > 1) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < particle.history.length; i++) {
        const p = particle.history[i];
        if (i === 0) ctx.moveTo(w2sX(p.x), w2sY(p.y));
        else ctx.lineTo(w2sX(p.x), w2sY(p.y));
      }
      ctx.stroke();
    }
    if (particle) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w2sX(particle.x), w2sY(particle.y), 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(SURFACES[params.surface].name + (particle ? `   loss=${surf.f(particle.x, particle.y).toFixed(3)}` : ''), 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`lr=${params.lr}    momentum=${params.momentum}    steps=${particle?.history.length ?? 0}`, 16, 42);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click anywhere to drop a particle', 12, H - 12);
  }

  function step() {
    if (!particle) return;
    const surf = SURFACES[params.surface];
    const [gx, gy] = surf.grad(particle.x, particle.y);
    particle.vx = params.momentum * particle.vx - params.lr * gx;
    particle.vy = params.momentum * particle.vy - params.lr * gy;
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (Math.abs(particle.x) > RANGE * 1.2 || Math.abs(particle.y) > RANGE * 1.2) {
      particle = null; return;
    }
    particle.history.push({ x: particle.x, y: particle.y });
    if (particle.history.length > 1000) particle.history.shift();
  }

  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    particle = { x: s2wX(sx), y: s2wY(sy), vx: 0, vy: 0, history: [{ x: s2wX(sx), y: s2wY(sy) }] };
  });

  // controls
  const surfSel = select({
    label: 'Loss surface',
    options: Object.entries(SURFACES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.surface,
    onChange: (v) => { params.surface = v; particle = null; },
  });
  const lrS = slider({ label: 'Learning rate', min: 0.001, max: 0.5, step: 0.001, value: params.lr, format: (v) => v.toFixed(3),
    onInput: (v) => { params.lr = v; } });
  const momS = slider({ label: 'Momentum', min: 0, max: 0.95, step: 0.01, value: params.momentum, format: (v) => v.toFixed(2),
    onInput: (v) => { params.momentum = v; } });
  const speedS = slider({ label: 'Steps / sec', min: 1, max: 120, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const clearB = button({ label: 'Clear', onClick: () => { particle = null; } });
  ctrlPanel.append(surfSel.el, lrS.el, momS.el, speedS.el, row(clearB));

  // Lab — explore convergence vs learning rate.
  const lab = labPanel({
    title: 'Gradient descent lab — convergence vs learning rate',
    filename: 'gradient-descent-lab.csv',
    columns: [
      { key: 'surface',  label: 'surface' },
      { key: 'lr',       label: 'learning rate', format: (v) => v.toFixed(3) },
      { key: 'momentum', label: 'momentum', format: (v) => v.toFixed(2) },
      { key: 'steps',    label: 'steps' },
      { key: 'loss',     label: 'final loss', format: (v) => v.toFixed(4) },
    ],
    procedure: [
      'Convex bowl, lr = 0.1, momentum = 0. Click somewhere off-center; let it converge. Record.',
      'Reset; lr = 0.5 — overshoots, may oscillate or diverge. Record outcome.',
      'lr = 0.01 — slow but stable. Record steps to convergence.',
      'Now Rosenbrock (banana). Bowl-shaped lr fails; momentum helps a lot.',
      'Multi-modal: gradient descent gets stuck in local minima. Try different start points.',
    ],
    predict: 'For a smooth convex function, what happens as you crank lr up? At what value does it become unstable?',
    source: () => {
      const surf = SURFACES[params.surface];
      const loss = particle ? surf.f(particle.x, particle.y) : 0;
      return {
        surface: surf.name,
        lr: params.lr,
        momentum: params.momentum,
        steps: particle?.history.length ?? 0,
        loss,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  let acc = 0;
  const animator = loop((dt) => {
    acc += dt * params.speed;
    while (acc >= 1) { step(); acc -= 1; if (!particle) break; }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
