import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { theta: Math.PI / 6, showTraces: true };
  let drag = false;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Layout: unit circle on left, sine wave on right
    const halfW = W * 0.45;
    const cx = halfW / 2 + 30, cy = H / 2;
    const R = Math.min(halfW, H) * 0.4;
    const t = params.theta;
    const px = cx + Math.cos(t) * R;
    const py = cy - Math.sin(t) * R;

    // Axes (left)
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R - 30, cy); ctx.lineTo(cx + R + 30, cy);
    ctx.moveTo(cx, cy - R - 30); ctx.lineTo(cx, cy + R + 30);
    ctx.stroke();

    // Unit circle
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // Sin (vertical drop) and cos (horizontal drop)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, py); ctx.lineTo(px, cy);
    ctx.stroke();
    ctx.strokeStyle = '#0ea5e9';
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(px, cy);
    ctx.stroke();

    // radius
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(px, py);
    ctx.stroke();

    // angle arc
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, -t, t > 0);
    ctx.stroke();

    // point
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();

    // labels
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('sin θ', px + 8, (py + cy) / 2);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillText('cos θ', (cx + px) / 2 - 14, cy + 16);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('θ', cx + 28, cy - 6);

    // Sine wave on right
    const rx = halfW + 30, ry = 30, rw = W - rx - 30, rh = H - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(rx, ry, rw, rh);
    // x-axis at y=0
    ctx.beginPath();
    ctx.moveTo(rx, ry + rh / 2); ctx.lineTo(rx + rw, ry + rh / 2);
    ctx.stroke();
    // sin curve up to current θ
    const tEnd = t;
    const X_MAX = 4 * Math.PI;
    const x2 = (a) => rx + (a / X_MAX) * rw;
    const y2 = (v) => ry + rh / 2 - v * (rh / 2 - 10);

    // sine curve full
    ctx.strokeStyle = 'rgba(16,185,129,0.5)';
    ctx.beginPath();
    for (let i = 0; i <= 600; i++) {
      const x = (i / 600) * X_MAX;
      const y = Math.sin(x);
      if (i === 0) ctx.moveTo(x2(x), y2(y)); else ctx.lineTo(x2(x), y2(y));
    }
    ctx.stroke();
    // cos curve
    ctx.strokeStyle = 'rgba(14,165,233,0.5)';
    ctx.beginPath();
    for (let i = 0; i <= 600; i++) {
      const x = (i / 600) * X_MAX;
      const y = Math.cos(x);
      if (i === 0) ctx.moveTo(x2(x), y2(y)); else ctx.lineTo(x2(x), y2(y));
    }
    ctx.stroke();

    // marker on sine at current θ (modulo 2π for display position)
    const tt = ((t % X_MAX) + X_MAX) % X_MAX;
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(x2(tt), y2(Math.sin(tt)), 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0ea5e9';
    ctx.beginPath(); ctx.arc(x2(tt), y2(Math.cos(tt)), 5, 0, Math.PI * 2); ctx.fill();

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    for (let m = 0; m <= 4; m++) {
      const xx = x2(m * Math.PI);
      ctx.fillText(`${m}π`, xx - 6, ry + rh / 2 + 14);
    }

    // Readout
    const sinV = Math.sin(t), cosV = Math.cos(t), tanV = Math.tan(t);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    const deg = (t * 180 / Math.PI) % 360;
    ctx.fillText(`θ = ${deg.toFixed(1)}° (${(t / Math.PI).toFixed(3)}π)`, 16, 26);
    ctx.fillStyle = '#10b981';
    ctx.fillText(`sin θ = ${sinV.toFixed(3)}`, 16, 44);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillText(`cos θ = ${cosV.toFixed(3)}`, 130, 44);
    ctx.fillStyle = '#ec4899';
    ctx.fillText(`tan θ = ${Math.abs(cosV) < 0.01 ? '±∞' : tanV.toFixed(3)}`, 16, 62);
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
    const halfW = cv.width * 0.45;
    const cx = halfW / 2 + 30, cy = cv.height / 2;
    if (p.x > halfW) return; // dragging on the right wave panel: ignore
    params.theta = Math.atan2(cy - p.y, p.x - cx);
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const tS = slider({
    label: 'Angle θ (°)', min: 0, max: 720, step: 0.5, value: 30, format: (v) => v.toFixed(1),
    onInput: (v) => { params.theta = v * Math.PI / 180; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, deg] of [['0°', 0], ['30°', 30], ['45°', 45], ['60°', 60], ['90°', 90], ['180°', 180], ['270°', 270]]) {
    const b = button({ label: name, onClick: () => { params.theta = deg * Math.PI / 180; tS.value = deg; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(tS.el, presetRow);

  const animator = loop(() => {
    tS.value = (params.theta * 180 / Math.PI + 360) % 720;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
