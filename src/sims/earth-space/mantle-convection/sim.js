import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

const W = 80, H = 40;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: W / H });

  const params = {
    Ra: 5000,
    diffusion: 0.1,
  };

  let T = new Float32Array(W * H);
  let psi = new Float32Array(W * H);
  let mouse = null;
  let mouseHot = true;

  function reset() {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const f = 1 - y / H;
        const noise = (Math.random() - 0.5) * 0.05;
        T[y * W + x] = f + noise;
      }
    }
    psi.fill(0);
  }
  reset();

  function step(dt) {
    // boundary conditions
    for (let x = 0; x < W; x++) {
      T[x] = 0;
      T[(H - 1) * W + x] = 1;
    }
    if (mouse) {
      const cxg = Math.floor(mouse.x * W);
      const cyg = Math.floor(mouse.y * H);
      const radius = 4;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue;
          const xx = ((cxg + dx) + W) % W;
          const yy = Math.max(0, Math.min(H - 1, cyg + dy));
          T[yy * W + xx] = mouseHot ? 1 : 0;
        }
      }
    }

    // relax stream function
    const newPsi = new Float32Array(psi.length);
    for (let iter = 0; iter < 8; iter++) {
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const dTdx = (T[y * W + (x + 1)] - T[y * W + (x - 1)]) * 0.5;
          const right = psi[y * W + (x + 1)];
          const left = psi[y * W + (x - 1)];
          const up = psi[(y - 1) * W + x];
          const down = psi[(y + 1) * W + x];
          newPsi[y * W + x] = (right + left + up + down + params.Ra * 0.0001 * dTdx) * 0.25;
        }
      }
      for (let x = 0; x < W; x++) { newPsi[x] = 0; newPsi[(H - 1) * W + x] = 0; }
      for (let y = 0; y < H; y++) { newPsi[y * W] = 0; newPsi[y * W + (W - 1)] = 0; }
      psi.set(newPsi);
    }

    // semi-Lagrangian advection
    const newT = new Float32Array(T.length);
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const u = (psi[(y + 1) * W + x] - psi[(y - 1) * W + x]) * 0.5;
        const v = -(psi[y * W + (x + 1)] - psi[y * W + (x - 1)]) * 0.5;
        const px = x - u * dt * 60;
        const py = y - v * dt * 60;
        const xi = Math.max(0, Math.min(W - 1, px));
        const yi = Math.max(0, Math.min(H - 1, py));
        const x0 = Math.floor(xi), x1 = Math.min(W - 1, x0 + 1);
        const y0 = Math.floor(yi), y1 = Math.min(H - 1, y0 + 1);
        const fx = xi - x0, fy = yi - y0;
        const tA = T[y0 * W + x0] * (1 - fx) + T[y0 * W + x1] * fx;
        const tB = T[y1 * W + x0] * (1 - fx) + T[y1 * W + x1] * fx;
        newT[y * W + x] = tA * (1 - fy) + tB * fy;
      }
    }
    for (let x = 0; x < W; x++) { newT[x] = 0; newT[(H - 1) * W + x] = 1; }
    for (let y = 0; y < H; y++) { newT[y * W] = T[y * W]; newT[y * W + (W - 1)] = T[y * W + (W - 1)]; }

    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const lap = T[y * W + (x + 1)] + T[y * W + (x - 1)] + T[(y - 1) * W + x] + T[(y + 1) * W + x] - 4 * T[y * W + x];
        newT[y * W + x] += params.diffusion * dt * lap;
      }
    }
    T = newT;
  }

  function colorFor(t) {
    const r = Math.min(255, Math.max(0, t * 255 + 30));
    const g = Math.min(255, Math.max(0, 80 + (1 - Math.abs(t - 0.5) * 2) * 100));
    const b = Math.min(255, Math.max(0, (1 - t) * 220 + 30));
    return `rgb(${r|0},${g|0},${b|0})`;
  }

  function draw() {
    const ctx = cv.ctx;
    const cw = cv.width / W, ch = cv.height / H;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        ctx.fillStyle = colorFor(T[y * W + x]);
        ctx.fillRect(x * cw, y * ch, cw + 1, ch + 1);
      }
    }
    // crust strip on top
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, cv.width, ch * 1.5);
    // surface velocity arrows
    for (let x = 1; x < W - 1; x += 4) {
      const u = (psi[(2) * W + x] - psi[(1) * W + x]) * 6;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x * cw + cw / 2, ch);
      ctx.lineTo(x * cw + cw / 2 + u * 30, ch);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, ch * 2, 280, 22);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Left-click: heat   ·   Right-click: cool', 16, ch * 2 + 16);
  }

  function pos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  }
  cv.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  cv.canvas.addEventListener('mousedown', (e) => {
    mouse = pos(e);
    mouseHot = e.button !== 2;
  });
  cv.canvas.addEventListener('mousemove', (e) => {
    if (mouse) mouse = pos(e);
  });
  window.addEventListener('mouseup', () => { mouse = null; });

  const RaS = slider({ label: 'Rayleigh-like number', min: 500, max: 50000, step: 250, value: params.Ra,
    onInput: (v) => { params.Ra = v; } });
  const dS = slider({ label: 'Thermal diffusion', min: 0, max: 0.5, step: 0.01, value: params.diffusion, format: (v) => v.toFixed(2),
    onInput: (v) => { params.diffusion = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(RaS.el, dS.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
