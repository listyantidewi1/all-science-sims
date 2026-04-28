import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    type: 'concave',  // concave | convex
    f: 80,            // focal length, in canvas px (sign chosen by type)
    d_o: 200,         // object distance from mirror (px)
    objectHeight: 60, // px
  };

  function focal() { return params.type === 'concave' ? params.f : -params.f; }
  function imageDist() {
    const f = focal();
    if (params.d_o === f) return Infinity;
    return 1 / (1 / f - 1 / params.d_o);
  }
  function magnification() {
    const di = imageDist();
    return -di / params.d_o;
  }

  let geom = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W * 0.65;
    const cy = H / 2;
    const f = focal();
    geom = { cx, cy };

    // Principal axis
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W - 20, cy); ctx.stroke();

    // Mirror — draw as an arc with center on axis at (cx + R, cy) for concave (R = 2f), faces left.
    drawMirror(ctx, cx, cy);

    // Focal point and center of curvature markers
    const fx = cx - f;     // for concave (f>0) this is to the left; for convex (f<0) to the right
    const cx_ = cx - 2 * f;
    ctx.fillStyle = '#fbbf24';
    dotLabel(ctx, fx, cy, 'F');
    if (params.type === 'concave') dotLabel(ctx, cx_, cy, 'C');

    // Object — vertical arrow
    const objX = cx - params.d_o;
    const objY = cy - params.objectHeight;
    drawArrow(ctx, objX, cy, objX, objY, '#0ea5e9', 'object');

    // Image
    const di = imageDist();
    const m = magnification();
    const imgX = cx - di;
    const imgH = params.objectHeight * m;
    if (Number.isFinite(di)) {
      drawArrow(ctx, imgX, cy, imgX, cy - imgH, di > 0 ? '#10b981' : '#a855f7', di > 0 ? 'real' : 'virtual');
    }

    // Two principal rays
    drawPrincipalRays(ctx, cx, cy, objX, objY, fx, di, imgX);

    // Readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`${params.type} mirror   f = ${f.toFixed(1)} px`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`d_o = ${params.d_o.toFixed(1)} px`, 16, 46);
    ctx.fillStyle = di > 0 ? '#10b981' : '#a855f7';
    ctx.fillText(`d_i = ${Number.isFinite(di) ? di.toFixed(1) : '∞'} px (${di > 0 ? 'real' : 'virtual'})`, 16, 62);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`m = -d_i/d_o = ${Number.isFinite(m) ? m.toFixed(3) : '∞'}    ${m < 0 ? 'inverted' : 'upright'}`, 16, 78);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.fillText(`|m| > 1 ⇒ enlarged   |m| < 1 ⇒ reduced`, 16, 94);

    // Hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the object arrow horizontally · drag tip vertically to change height', 16, H - 12);
  }

  function drawMirror(ctx, cx, cy) {
    const R = Math.abs(2 * params.f);
    const arcX = params.type === 'concave' ? cx + R : cx - R;
    const halfAng = 0.5;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (params.type === 'concave') {
      ctx.arc(arcX, cy, R, Math.PI - halfAng, Math.PI + halfAng);
    } else {
      ctx.arc(arcX, cy, R, -halfAng, halfAng);
    }
    ctx.stroke();
    // hatching on the back side
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const yy = cy - 70 + i * 18;
      const x1 = cx + 4;
      ctx.beginPath();
      ctx.moveTo(x1, yy); ctx.lineTo(x1 + 12, yy + 8);
      ctx.stroke();
    }
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, label) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const sz = 8;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - sz * Math.cos(ang - 0.4), y2 - sz * Math.sin(ang - 0.4));
    ctx.lineTo(x2 - sz * Math.cos(ang + 0.4), y2 - sz * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 10px var(--font-mono)';
    ctx.fillText(label, x2 + 6, y2 - 2);
  }

  function drawPrincipalRays(ctx, cx, cy, objX, objY, fx, di, imgX) {
    // Ray 1 — parallel from object tip to mirror, then through F
    ctx.strokeStyle = 'rgba(251,191,36,0.7)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(objX, objY); ctx.lineTo(cx, objY);
    ctx.stroke();
    ctx.beginPath();
    if (params.type === 'concave') {
      ctx.moveTo(cx, objY); ctx.lineTo(fx, cy);
      // continue beyond
      const dx = fx - cx, dy = cy - objY;
      ctx.lineTo(fx + dx * 1.2, cy + dy * 1.2);
    } else {
      // For convex, parallel ray reflects as if coming from F (which is behind)
      const dx = cx - fx, dy = objY - cy;
      // Reflected ray goes leftward from mirror with slope (cy - objY)/(cx - fx)
      const slope = (objY - cy) / (cx - fx);
      // ray from (cx, objY) heading left
      ctx.moveTo(cx, objY);
      ctx.lineTo(cx - 200, objY + slope * (cx - (cx - 200)));
      // dashed extension behind mirror to F
      ctx.stroke();
      ctx.strokeStyle = 'rgba(251,191,36,0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, objY); ctx.lineTo(fx, cy);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }
    ctx.stroke();

    // Ray 2 — through F to mirror, then parallel
    ctx.strokeStyle = 'rgba(168,139,250,0.7)';
    ctx.beginPath();
    ctx.moveTo(objX, objY); ctx.lineTo(fx, cy);
    // continue to mirror
    const slope2 = (cy - objY) / (fx - objX);
    const xMirror = cx;
    const yMirror = objY + slope2 * (xMirror - objX);
    ctx.lineTo(xMirror, yMirror);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xMirror, yMirror); ctx.lineTo(0, yMirror);
    ctx.stroke();
  }

  function dotLabel(ctx, x, y, label) {
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(label, x - 4, y + 18);
  }

  // Drag the object
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!geom) return null;
      const objX = geom.cx - params.d_o;
      // hit-test the arrow line
      if (sx < geom.cx - 20 && Math.abs(sx - objX) < 24 && sy > geom.cy - params.objectHeight - 10 && sy < geom.cy + 10) return 'obj';
      return null;
    },
    onDrag(_id, sx, sy) {
      if (!geom) return;
      params.d_o = Math.max(20, geom.cx - sx);
      params.objectHeight = Math.max(10, geom.cy - sy);
      doS.value = params.d_o;
      hS.value = params.objectHeight;
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // controls
  const typeSel = select({
    label: 'Mirror type',
    options: [
      { value: 'concave', label: 'Concave (converging)' },
      { value: 'convex',  label: 'Convex (diverging)' },
    ],
    value: params.type,
    onChange: (v) => { params.type = v; },
  });
  const fS = slider({ label: 'Focal length |f| (px)', min: 30, max: 250, step: 1, value: params.f,
    onInput: (v) => { params.f = v; } });
  const doS = slider({ label: 'Object distance d_o (px)', min: 20, max: 500, step: 1, value: params.d_o,
    onInput: (v) => { params.d_o = v; } });
  const hS = slider({ label: 'Object height (px)', min: 10, max: 150, step: 1, value: params.objectHeight,
    onInput: (v) => { params.objectHeight = v; } });

  ctrlPanel.append(typeSel.el, fS.el, doS.el, hS.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
