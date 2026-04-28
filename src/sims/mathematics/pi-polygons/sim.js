import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { n: 6 };

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    // Unit circle
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // Inscribed polygon (radius R)
    const n = params.n;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(16,185,129,0.18)';
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = cx + Math.cos(a) * R;
      const y = cy + Math.sin(a) * R;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.fill();
    ctx.stroke();

    // Circumscribed polygon (radius R / cos(π/n))
    const Rout = R / Math.cos(Math.PI / n);
    ctx.strokeStyle = '#ec4899';
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.PI / n;
      const x = cx + Math.cos(a) * Rout;
      const y = cy + Math.sin(a) * Rout;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Compute perimeters in terms of π estimates
    // inscribed: P_in = 2 n sin(π/n) → P_in / 2 → π
    const piIn = n * Math.sin(Math.PI / n);
    const piOut = n * Math.tan(Math.PI / n);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`n = ${n} sides`, 16, 26);
    ctx.fillStyle = '#10b981';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`Inscribed:    π ≥ ${piIn.toFixed(8)}`, 16, 46);
    ctx.fillStyle = '#ec4899';
    ctx.fillText(`Circumscribed: π ≤ ${piOut.toFixed(8)}`, 16, 64);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`True π =       ${Math.PI.toFixed(8)}`, 16, 82);
  }

  // controls
  const nS = slider({
    label: 'Polygon sides n', min: 3, max: 1000, step: 1, value: params.n,
    onInput: (v) => { params.n = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const v of [3, 6, 12, 24, 48, 96, 384]) {
    const b = button({ label: `${v}`, onClick: () => { params.n = v; nS.value = v; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(nS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
