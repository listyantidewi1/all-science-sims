import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const W = 160, H = 100;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: W / H });

  const params = {
    Du: 0.16, Dv: 0.08,
    F: 0.035, k: 0.065,
    iterPerFrame: 12,
  };

  let U = new Float32Array(W * H);
  let V = new Float32Array(W * H);
  let Unew = new Float32Array(W * H);
  let Vnew = new Float32Array(W * H);
  let mouse = null;

  function reset() {
    for (let i = 0; i < W * H; i++) { U[i] = 1; V[i] = 0; }
    // seed center
    for (let y = H / 2 - 5; y < H / 2 + 5; y++)
      for (let x = W / 2 - 5; x < W / 2 + 5; x++) V[y * W + x] = 1;
  }
  reset();

  function step() {
    if (mouse) {
      const cxg = Math.floor(mouse.x * W);
      const cyg = Math.floor(mouse.y * H);
      for (let dy = -3; dy <= 3; dy++)
        for (let dx = -3; dx <= 3; dx++) {
          const xx = ((cxg + dx) + W) % W;
          const yy = Math.max(0, Math.min(H - 1, cyg + dy));
          V[yy * W + xx] = 1;
        }
    }
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const i = y * W + x;
        const u = U[i], v = V[i];
        const lapU = U[i - 1] + U[i + 1] + U[i - W] + U[i + W] - 4 * u;
        const lapV = V[i - 1] + V[i + 1] + V[i - W] + V[i + W] - 4 * v;
        const uvv = u * v * v;
        Unew[i] = u + (params.Du * lapU - uvv + params.F * (1 - u));
        Vnew[i] = v + (params.Dv * lapV + uvv - (params.F + params.k) * v);
        if (Unew[i] < 0) Unew[i] = 0;
        if (Vnew[i] < 0) Vnew[i] = 0;
      }
    }
    [U, Unew] = [Unew, U];
    [V, Vnew] = [Vnew, V];
  }

  function draw() {
    const ctx = cv.ctx;
    const cw = cv.width / W, ch = cv.height / H;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const v = V[y * W + x];
        const t = Math.max(0, Math.min(1, v * 2.5));
        const r = Math.round(20 + 80 * t);
        const g = Math.round(40 + 200 * t);
        const b = Math.round(180 - 60 * t);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x * cw, y * ch, cw + 1, ch + 1);
      }
    }
  }

  function pos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  }
  cv.canvas.addEventListener('mousedown', (e) => { mouse = pos(e); });
  cv.canvas.addEventListener('mousemove', (e) => { if (mouse) mouse = pos(e); });
  window.addEventListener('mouseup', () => { mouse = null; });

  // controls
  const FS = slider({ label: 'Feed rate F', min: 0.005, max: 0.08, step: 0.001, value: params.F, format: (v) => v.toFixed(3),
    onInput: (v) => { params.F = v; } });
  const kS = slider({ label: 'Kill rate k', min: 0.040, max: 0.075, step: 0.001, value: params.k, format: (v) => v.toFixed(3),
    onInput: (v) => { params.k = v; } });
  const itS = slider({ label: 'Iterations / frame', min: 1, max: 30, step: 1, value: params.iterPerFrame,
    onInput: (v) => { params.iterPerFrame = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, F, k] of [['Spots', 0.035, 0.065], ['Coral', 0.0545, 0.062], ['Maze', 0.029, 0.057], ['Mitosis', 0.0367, 0.0649], ['Worms', 0.078, 0.061]]) {
    const b = button({ label: name, onClick: () => { params.F = F; params.k = k; FS.value = F; kS.value = k; reset(); } });
    presetRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(FS.el, kS.el, itS.el, presetRow, row(resetB));

  const animator = loop(() => {
    for (let i = 0; i < params.iterPerFrame; i++) step();
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
