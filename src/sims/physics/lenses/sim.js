import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // World units: arbitrary cm-like; rendered at "scale" px per unit.
  const params = {
    f: 6,           // focal length (sign reflects converging/diverging)
    type: 'converging', // converging | diverging
    objX: -10,      // object distance from lens (negative = left of lens)
    objH: 3,        // object height
    showRays: true,
  };

  let drag = null; // 'object' | 'lens'
  let lensX_world = 0;

  function recomputeF() {
    return params.type === 'converging' ? Math.abs(params.f) : -Math.abs(params.f);
  }

  function imageDist(obj_d, f) {
    // 1/f = 1/d_o + 1/d_i  with d_o positive for object to the left.
    // Here we use d_o = -objX (so objX = -10 => d_o = 10 to the left).
    if (Math.abs(obj_d - f) < 1e-6) return Infinity;
    return (obj_d * f) / (obj_d - f);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const cy = H / 2;
    const scale = Math.min(W / 32, H / 16);  // px per world unit
    const cx = W / 2;
    lensX_world = 0;

    // axis
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(W, cy);
    ctx.stroke();

    // ticks every unit
    ctx.fillStyle = 'rgba(120,130,150,0.5)';
    ctx.font = '10px var(--font-mono)';
    for (let u = -16; u <= 16; u++) {
      const x = cx + u * scale;
      if (x < 0 || x > W) continue;
      ctx.fillRect(x, cy - 3, 1, 6);
      if (u % 4 === 0 && u !== 0) ctx.fillText(String(u), x - 4, cy + 16);
    }

    // focal points
    const f = recomputeF();
    const Fx1 = cx - Math.abs(f) * scale, Fx2 = cx + Math.abs(f) * scale;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(Fx1, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(Fx2, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('F', Fx1 - 4, cy + 28);
    ctx.fillText('F', Fx2 - 4, cy + 28);

    // 2F markers
    ctx.fillStyle = 'rgba(120,130,150,0.5)';
    ctx.beginPath(); ctx.arc(cx - 2 * Math.abs(f) * scale, cy, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 2 * Math.abs(f) * scale, cy, 2, 0, Math.PI * 2); ctx.fill();

    // lens
    const lensX = cx;
    const lensH = scale * 6;
    if (params.type === 'converging') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(lensX, cy, scale * 0.5, lensH / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(59,130,246,0.18)';
      ctx.fill();
      // arrows top/bottom
      drawArrow(ctx, lensX, cy - lensH / 2, lensX, cy - lensH / 2 + 8, '#3b82f6');
      drawArrow(ctx, lensX, cy + lensH / 2, lensX, cy + lensH / 2 - 8, '#3b82f6');
    } else {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(59,130,246,0.12)';
      ctx.beginPath();
      ctx.moveTo(lensX - 4, cy - lensH / 2);
      ctx.lineTo(lensX + 4, cy - lensH / 2);
      ctx.lineTo(lensX + 4, cy - lensH / 4);
      ctx.bezierCurveTo(lensX, cy - lensH / 8, lensX, cy + lensH / 8, lensX + 4, cy + lensH / 4);
      ctx.lineTo(lensX + 4, cy + lensH / 2);
      ctx.lineTo(lensX - 4, cy + lensH / 2);
      ctx.lineTo(lensX - 4, cy + lensH / 4);
      ctx.bezierCurveTo(lensX, cy + lensH / 8, lensX, cy - lensH / 8, lensX - 4, cy - lensH / 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      drawArrow(ctx, lensX, cy - lensH / 2, lensX, cy - lensH / 2 - 6, '#3b82f6');
      drawArrow(ctx, lensX, cy + lensH / 2, lensX, cy + lensH / 2 + 6, '#3b82f6');
    }

    // object (arrow up from axis)
    const oXs = cx + params.objX * scale;
    const oTop = cy - params.objH * scale;
    drawArrow(ctx, oXs, cy, oXs, oTop, '#10b981', 8, true);
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(oXs, oTop, 5, 0, Math.PI * 2); ctx.fill();

    // image
    const obj_d = -params.objX;  // distance from lens (positive)
    const di = imageDist(obj_d, f);
    const isReal = di > 0 && Number.isFinite(di);
    const M = -di / obj_d;       // magnification (negative => inverted)
    const imgX_world = di;
    const imgH = params.objH * M;
    const iXs = cx + imgX_world * scale;
    const iTop = cy - imgH * scale;
    if (Number.isFinite(di)) {
      const color = isReal ? '#ef4444' : 'rgba(239,68,68,0.6)';
      ctx.save();
      if (!isReal) ctx.setLineDash([4, 3]);
      drawArrow(ctx, iXs, cy, iXs, iTop, color, 8, true);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(iXs, iTop, 5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // principal rays
    if (params.showRays && Number.isFinite(di)) {
      ctx.lineWidth = 1.2;

      // Ray 1: parallel to axis, then through far focal point (converging) or appears to come from near focal point (diverging)
      drawRay(ctx, oXs, oTop, lensX, oTop, '#fbbf24');
      if (params.type === 'converging') {
        const targetX = (di > 0 ? iXs : extend(lensX, oTop, Fx2, cy, 600).x);
        const targetY = (di > 0 ? iTop : extend(lensX, oTop, Fx2, cy, 600).y);
        drawRay(ctx, lensX, oTop, targetX, targetY, '#fbbf24');
        if (di < 0) drawRay(ctx, lensX, oTop, Fx2, cy, 'rgba(251,191,36,0.4)', true);
      } else {
        // diverging: ray bends as if coming from near focal point on object side (Fx1)
        const e = extend(Fx1, cy, lensX, oTop, 600);
        drawRay(ctx, lensX, oTop, e.x, e.y, '#fbbf24');
        // virtual extension (back)
        drawRay(ctx, lensX, oTop, Fx1, cy, 'rgba(251,191,36,0.4)', true);
      }

      // Ray 2: through center, undeviated
      drawRay(ctx, oXs, oTop, lensX, cy, '#a78bfa');
      const c = extend(oXs, oTop, lensX, cy, 800);
      drawRay(ctx, lensX, cy, c.x, c.y, '#a78bfa');

      // Ray 3: through near focal point, exits parallel
      if (params.type === 'converging') {
        // ray from object through Fx1 to lens
        const hitY = oTop + (cy - oTop) * (lensX - oXs) / (Fx1 - oXs);
        drawRay(ctx, oXs, oTop, lensX, hitY, '#22d3ee');
        // exits parallel to axis
        drawRay(ctx, lensX, hitY, W, hitY, '#22d3ee');
      }
    }

    // info panel
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(8, 8, 280, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`f = ${f.toFixed(1)}    object dist = ${obj_d.toFixed(1)}`, 14, 26);
    if (Number.isFinite(di)) {
      ctx.fillText(`image dist = ${di.toFixed(2)}    M = ${M.toFixed(2)}`, 14, 44);
      ctx.fillText(`${isReal ? 'Real' : 'Virtual'} · ${M < 0 ? 'inverted' : 'upright'} · ${Math.abs(M) > 1 ? 'enlarged' : 'reduced'}`, 14, 62);
    } else {
      ctx.fillText(`Object at focal point — image at infinity`, 14, 44);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the object (green) or move sliders to explore.', 12, H - 12);
  }

  function drawArrow(ctx, x1, y1, x2, y2, color, sz = 8, withHead = true) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
    if (withHead) {
      const ang = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - sz * Math.cos(ang - 0.45), y2 - sz * Math.sin(ang - 0.45));
      ctx.lineTo(x2 - sz * Math.cos(ang + 0.45), y2 - sz * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawRay(ctx, x1, y1, x2, y2, color, dashed = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    if (dashed) ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function extend(x1, y1, x2, y2, dist) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    return { x: x2 + dx / len * dist, y: y2 + dy / len * dist };
  }

  // dragging
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * cv.width / rect.width,
      y: (e.clientY - rect.top) * cv.height / rect.height,
    };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const cx = cv.width / 2;
    const cy = cv.height / 2;
    const scale = Math.min(cv.width / 32, cv.height / 16);
    const oXs = cx + params.objX * scale;
    const oTop = cy - params.objH * scale;
    if (Math.hypot(p.x - oXs, p.y - oTop) < 14 || Math.hypot(p.x - oXs, p.y - cy) < 12) {
      drag = 'object';
      cv.canvas.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    const p = localPos(e);
    const cx = cv.width / 2;
    const cy = cv.height / 2;
    const scale = Math.min(cv.width / 32, cv.height / 16);
    if (drag === 'object') {
      const newX = (p.x - cx) / scale;
      params.objX = Math.min(-0.3, Math.max(-15, newX));
      const newH = (cy - p.y) / scale;
      params.objH = Math.max(0.5, Math.min(5, newH));
      objXS.value = params.objX;
      objHS.value = params.objH;
    }
  });
  window.addEventListener('mouseup', () => {
    drag = null;
    cv.canvas.style.cursor = 'grab';
  });

  // controls
  const typeSel = select({
    label: 'Lens type',
    options: [{ value: 'converging', label: 'Converging (+f)' }, { value: 'diverging', label: 'Diverging (−f)' }],
    value: params.type,
    onChange: (v) => { params.type = v; },
  });
  const fS = slider({
    label: 'Focal length |f|', min: 1, max: 12, step: 0.1, value: params.f, format: (v) => v.toFixed(1),
    onInput: (v) => { params.f = v; },
  });
  const objXS = slider({
    label: 'Object position', min: -15, max: -0.3, step: 0.1, value: params.objX, format: (v) => v.toFixed(1),
    onInput: (v) => { params.objX = v; },
  });
  const objHS = slider({
    label: 'Object height', min: 0.5, max: 5, step: 0.1, value: params.objH, format: (v) => v.toFixed(1),
    onInput: (v) => { params.objH = v; },
  });
  const raysT = toggle({ label: 'Show principal rays', value: params.showRays, onChange: (v) => { params.showRays = v; } });

  ctrlPanel.append(typeSel.el, fS.el, objXS.el, objHS.el, raysT.el);

  // Lab — verify the thin-lens equation 1/d_o + 1/d_i = 1/f.
  const lab = labPanel({
    title: 'Thin-lens equation lab — 1/d_o + 1/d_i = 1/f',
    filename: 'lenses-lab.csv',
    columns: [
      { key: 'type',  label: 'lens' },
      { key: 'f',     label: 'f (units)',   format: (v) => v.toFixed(2) },
      { key: 'do',    label: 'd_o',          format: (v) => v.toFixed(2) },
      { key: 'di',    label: 'd_i',          format: (v) => Number.isFinite(v) ? v.toFixed(2) : '∞' },
      { key: 'm',     label: 'magnif. m',    format: (v) => Number.isFinite(v) ? v.toFixed(3) : '–' },
      { key: 'kind',  label: 'image' },
    ],
    procedure: [
      'Converging lens, f = 6. Set d_o = 12 (= 2f). Record — image at 2f, m = −1 (inverted, same size).',
      'Set d_o = 18. Record — closer image, smaller, real, inverted.',
      'Set d_o = 8 (between f and 2f) — magnified, real, inverted.',
      'Set d_o = 4 (inside focal length) — virtual, upright, magnified (this is a magnifying glass).',
      'Switch to diverging lens — always virtual, upright, smaller.',
    ],
    predict: 'For a converging lens with f = 10, where will the image form when d_o = 30? Will it be real or virtual?',
    source: () => {
      const f = recomputeF();
      const do_ = Math.abs(params.objX);
      // Thin-lens: 1/d_i = 1/f - 1/d_o; sign convention: real image is on far side (positive d_i).
      const inv = 1 / f - 1 / do_;
      const di = Math.abs(inv) < 1e-6 ? Infinity : 1 / inv;
      const m = Number.isFinite(di) ? -di / do_ : Infinity;
      const kind = di > 0 ? (m < 0 ? 'real, inverted' : 'real, upright') : (m > 0 ? 'virtual, upright' : 'virtual, inverted');
      return { type: params.type, f, do: do_, di, m, kind };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
