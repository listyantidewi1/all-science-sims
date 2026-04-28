import { createCanvas } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    cx: -0.5,    // center
    cy: 0,
    zoom: 1,     // 1 = full set view
    maxIter: 100,
  };

  let dirty = true;

  function render() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    const range = 3.0 / params.zoom;
    const xMin = params.cx - range / 2;
    const yMin = params.cy - range / 2;
    const dx = range / W;
    const dy = range / H;

    const img = ctx.createImageData(W, H);
    const data = img.data;
    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const cx = xMin + px * dx;
        const cy = yMin + py * dy;
        let zx = 0, zy = 0;
        let iter = 0;
        while (iter < params.maxIter && zx * zx + zy * zy < 4) {
          const t = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = t;
          iter++;
        }
        const idx = (py * W + px) * 4;
        if (iter === params.maxIter) {
          data[idx] = 0; data[idx + 1] = 0; data[idx + 2] = 0;
        } else {
          const t = iter / params.maxIter;
          data[idx]     = (Math.sin(t * 6 + 0) * 127 + 128) | 0;
          data[idx + 1] = (Math.sin(t * 6 + 2) * 127 + 128) | 0;
          data[idx + 2] = (Math.sin(t * 6 + 4) * 127 + 128) | 0;
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`zoom: ${params.zoom.toFixed(2)}×    center: (${params.cx.toFixed(4)}, ${params.cy.toFixed(4)})    iter: ${params.maxIter}`, 16, 28);

    dirty = false;
  }

  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * cv.width / rect.width, y: (e.clientY - rect.top) * cv.height / rect.height };
  }
  cv.canvas.style.cursor = 'crosshair';
  cv.canvas.addEventListener('click', (e) => {
    const p = localPos(e);
    const range = 3.0 / params.zoom;
    const x = (p.x / cv.width - 0.5) * range + params.cx;
    const y = (p.y / cv.height - 0.5) * range + params.cy;
    params.cx = x;
    params.cy = y;
    params.zoom *= 2;
    dirty = true;
  });

  // controls
  const itS = slider({ label: 'Max iterations', min: 20, max: 500, step: 10, value: params.maxIter,
    onInput: (v) => { params.maxIter = v; dirty = true; } });
  const resetB = button({ label: 'Reset view', primary: true, onClick: () => {
    params.cx = -0.5; params.cy = 0; params.zoom = 1;
    dirty = true;
  } });
  const zoomOutB = button({ label: 'Zoom out 2×', onClick: () => {
    params.zoom = Math.max(0.5, params.zoom / 2);
    dirty = true;
  } });
  ctrlPanel.append(itS.el, row(resetB, zoomOutB));

  let raf = 0;
  function tick() {
    if (dirty) render();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => { cancelAnimationFrame(raf); cv.destroy(); };
}
