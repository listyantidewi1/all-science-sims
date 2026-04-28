import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// We classify conic by the angle θ of the cutting plane:
//   θ = 0°  → circle (perpendicular to axis)
//   0 < θ < 45 → ellipse
//   θ = 45° → parabola (parallel to a side)
//   θ > 45° → hyperbola (cuts both nappes)
// Cone has half-angle 45° in our setup.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { tilt: 20 };  // degrees of plane from horizontal

  function classify(deg) {
    if (deg < 1) return 'Circle';
    if (deg < 44) return 'Ellipse';
    if (Math.abs(deg - 45) < 1) return 'Parabola';
    return 'Hyperbola';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Layout: left half is the cone-with-plane diagram; right half shows the resulting curve in 2D
    const halfW = W * 0.5;

    drawConeWithPlane(ctx, 30, 30, halfW - 60, H - 60);
    drawResultCurve(ctx, halfW + 30, 30, halfW - 60, H - 60);

    const t = params.tilt;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Plane tilt ${t.toFixed(1)}° → ${classify(t)}`, 16, 28);
  }

  function drawConeWithPlane(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    const apex = { x: cx, y: cy };
    const coneR = w * 0.32;
    const coneH = h * 0.40;

    // Lower nappe
    ctx.fillStyle = 'rgba(14,165,233,0.18)';
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(cx - coneR, cy + coneH);
    ctx.lineTo(cx + coneR, cy + coneH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.stroke();
    // base ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy + coneH, coneR, coneR * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Upper nappe
    ctx.fillStyle = 'rgba(14,165,233,0.10)';
    ctx.beginPath();
    ctx.moveTo(apex.x, apex.y);
    ctx.lineTo(cx - coneR, cy - coneH);
    ctx.lineTo(cx + coneR, cy - coneH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(14,165,233,0.5)';
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy - coneH, coneR, coneR * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Cutting plane (drawn as a filled rectangle in perspective)
    const tilt = params.tilt * Math.PI / 180;
    const planeY = cy + coneH * 0.3;  // anchor point along axis
    const dx = Math.cos(tilt) * w * 0.42;
    const dy = Math.sin(tilt) * h * 0.42;
    const pts = [
      { x: cx - dx, y: planeY + dy },
      { x: cx + dx, y: planeY - dy },
      { x: cx + dx, y: planeY - dy - 30 },
      { x: cx - dx, y: planeY + dy - 30 },
    ];
    ctx.fillStyle = 'rgba(251,191,36,0.35)';
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Cone (rotational)', x, y + 14);
  }

  function drawResultCurve(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(x, y, w, h);
    const cx = x + w / 2, cy = y + h / 2;
    const t = params.tilt;

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#fbbf24';
    ctx.beginPath();
    if (t < 1) {
      // circle
      ctx.arc(cx, cy, Math.min(w, h) * 0.3, 0, Math.PI * 2);
    } else if (t < 44) {
      // ellipse — squashed by cos(tilt)
      const a = Math.min(w, h) * 0.35;
      const b = a * Math.cos(t * Math.PI / 180);
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
    } else if (Math.abs(t - 45) < 1.5) {
      // parabola y = x²/2 (rotated to face right)
      const k = 0.04;
      let started = false;
      for (let xx = -w * 0.45; xx <= w * 0.45; xx += 4) {
        const yy = k * xx * xx - h * 0.3;
        if (!started) { ctx.moveTo(cx + xx, cy + yy); started = true; } else ctx.lineTo(cx + xx, cy + yy);
      }
    } else {
      // hyperbola: x²/a² - y²/b² = 1
      const a = w * 0.18, b = h * 0.25;
      // right branch
      let s = false;
      for (let yy = -h * 0.45; yy <= h * 0.45; yy += 4) {
        const xx = a * Math.sqrt(1 + (yy / b) ** 2);
        if (!s) { ctx.moveTo(cx + xx, cy + yy); s = true; } else ctx.lineTo(cx + xx, cy + yy);
      }
      ctx.stroke();
      ctx.beginPath();
      s = false;
      for (let yy = -h * 0.45; yy <= h * 0.45; yy += 4) {
        const xx = -a * Math.sqrt(1 + (yy / b) ** 2);
        if (!s) { ctx.moveTo(cx + xx, cy + yy); s = true; } else ctx.lineTo(cx + xx, cy + yy);
      }
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(classify(t), x + 6, y + 16);
  }

  // controls
  const tS = slider({
    label: 'Plane tilt (°)', min: 0, max: 75, step: 0.5, value: params.tilt, format: (v) => v.toFixed(1),
    onInput: (v) => { params.tilt = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, deg] of [['Circle', 0], ['Ellipse', 25], ['Parabola', 45], ['Hyperbola', 60]]) {
    const b = button({ label: name, onClick: () => { params.tilt = deg; tS.value = deg; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(tS.el, presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
