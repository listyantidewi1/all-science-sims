import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

const MATERIALS = {
  vacuum: { name: 'Vacuum', n: 1.000 },
  air:    { name: 'Air',     n: 1.0003 },
  water:  { name: 'Water',   n: 1.333 },
  glass:  { name: 'Glass',   n: 1.50 },
  diamond:{ name: 'Diamond', n: 2.42 },
  oil:    { name: 'Olive oil', n: 1.47 },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    medium1: 'air',
    medium2: 'glass',
    angle: 30,   // degrees from normal
  };
  let drag = false;

  function n1() { return MATERIALS[params.medium1].n; }
  function n2() { return MATERIALS[params.medium2].n; }

  function refract(theta1Deg) {
    const sinT1 = Math.sin(theta1Deg * Math.PI / 180);
    const ratio = n1() / n2();
    const sinT2 = ratio * sinT1;
    if (Math.abs(sinT2) > 1) return null;  // total internal reflection
    return Math.asin(sinT2) * 180 / Math.PI;
  }

  function criticalAngle() {
    if (n1() <= n2()) return null;
    return Math.asin(n2() / n1()) * 180 / Math.PI;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cy = H / 2;
    const cx = W / 2;

    // medium colors / fills
    ctx.fillStyle = `hsla(${200 + n1() * 30}, 50%, ${15 + n1() * 5}%, 1)`;
    ctx.fillRect(0, 0, W, cy);
    ctx.fillStyle = `hsla(${200 + n2() * 30}, 50%, ${15 + n2() * 5}%, 1)`;
    ctx.fillRect(0, cy, W, cy);

    // interface
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(W, cy);
    ctx.stroke();

    // normal line
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx, 30); ctx.lineTo(cx, H - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    const t1 = params.angle * Math.PI / 180;
    const t2deg = refract(params.angle);
    const RAY_LEN = Math.min(W, H) * 0.4;

    // Incident ray: from upper-left, hitting (cx, cy) at angle t1 from normal
    const ix = cx - Math.sin(t1) * RAY_LEN;
    const iy = cy - Math.cos(t1) * RAY_LEN;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ix, iy); ctx.lineTo(cx, cy);
    ctx.stroke();
    // arrow
    drawArrow(ctx, cx - 30 * Math.sin(t1), cy - 30 * Math.cos(t1), cx, cy, '#fbbf24');

    // Reflected ray (always)
    const reflX = cx + Math.sin(t1) * RAY_LEN;
    const reflY = cy - Math.cos(t1) * RAY_LEN;
    ctx.strokeStyle = 'rgba(251,191,36,0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy); ctx.lineTo(reflX, reflY);
    ctx.stroke();

    // Refracted ray (if exists)
    if (t2deg != null) {
      const t2 = t2deg * Math.PI / 180;
      const rx = cx + Math.sin(t2) * RAY_LEN;
      const ry = cy + Math.cos(t2) * RAY_LEN;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy); ctx.lineTo(rx, ry);
      ctx.stroke();
      drawArrow(ctx, cx + 30 * Math.sin(t2), cy + 30 * Math.cos(t2), rx, ry, '#10b981');
    } else {
      // Total internal reflection — make the reflected ray prominent
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy); ctx.lineTo(reflX, reflY);
      ctx.stroke();
      drawArrow(ctx, cx + 30 * Math.sin(t1), cy - 30 * Math.cos(t1), reflX, reflY, '#ef4444');
    }

    // Angle arcs
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, -Math.PI / 2, -Math.PI / 2 + t1);
    ctx.stroke();
    if (t2deg != null) {
      ctx.beginPath();
      ctx.arc(cx, cy, 26, Math.PI / 2 - (t2deg * Math.PI / 180), Math.PI / 2);
      ctx.stroke();
    }

    // Labels in each medium
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`${MATERIALS[params.medium1].name} (n₁=${n1().toFixed(2)})`, 16, 24);
    ctx.fillText(`${MATERIALS[params.medium2].name} (n₂=${n2().toFixed(2)})`, 16, H - 14);

    // Info panel
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(W - 280, 8, 270, 76);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`θ₁ = ${params.angle.toFixed(1)}°`, W - 270, 28);
    if (t2deg != null) {
      ctx.fillText(`θ₂ = ${t2deg.toFixed(1)}°`, W - 270, 46);
    } else {
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Total internal reflection!`, W - 270, 46);
    }
    const crit = criticalAngle();
    if (crit != null) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`θ_c = ${crit.toFixed(1)}°`, W - 270, 70);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the incident ray (yellow)', cx - 100, cy - 8);
  }

  function drawArrow(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.4), y2 - sz * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.4), y2 - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
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
    const cx = cv.width / 2, cy = cv.height / 2;
    if (p.y >= cy) return;
    const dx = cx - p.x, dy = cy - p.y;
    const ang = Math.atan2(dx, dy) * 180 / Math.PI;
    params.angle = Math.max(0, Math.min(89, ang));
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // controls
  const m1 = select({
    label: 'Medium 1 (top)',
    options: Object.entries(MATERIALS).map(([k, v]) => ({ value: k, label: `${v.name} (n=${v.n})` })),
    value: params.medium1,
    onChange: (v) => { params.medium1 = v; },
  });
  const m2 = select({
    label: 'Medium 2 (bottom)',
    options: Object.entries(MATERIALS).map(([k, v]) => ({ value: k, label: `${v.name} (n=${v.n})` })),
    value: params.medium2,
    onChange: (v) => { params.medium2 = v; },
  });
  const aS = slider({ label: 'Angle of incidence (°)', min: 0, max: 89, step: 0.5, value: params.angle, format: (v) => v.toFixed(1),
    onInput: (v) => { params.angle = v; } });

  ctrlPanel.append(m1.el, m2.el, aS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
