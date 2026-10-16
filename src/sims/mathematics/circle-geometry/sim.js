import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const R_MIN = 1, R_MAX = 10;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // ---- state ---------------------------------------------------------------
  const params = { r: 5, theta: 90, unit: 'cm', pi: 'exact' };
  const unroll = { on: false, u: 0, running: false };
  let now = 0;

  const PI = () => (params.pi === '3.14' ? 3.14 : params.pi === '22/7' ? 22 / 7 : Math.PI);
  const piLabel = () => (params.pi === '3.14' ? '3.14' : params.pi === '22/7' ? '22/7' : 'π');
  const num = (v, d = 2) => {
    if (!Number.isFinite(v)) return '–';
    const s = v.toFixed(d).replace(/\.?0+$/, '');
    return getLocale() === 'id' ? s.replace('.', ',') : s;
  };
  const values = () => {
    const r = params.r, th = params.theta, p = PI();
    const C = 2 * p * r, A = p * r * r;
    return { r, th, d: 2 * r, C, A, arc: (th / 360) * C, sector: (th / 360) * A };
  };

  // ---- geometry on screen --------------------------------------------------
  // The drawn radius grows with r but never shrinks to nothing, so a radius of 1 is still visible.
  function circleGeom() {
    const W = cv.width, H = cv.height;
    const Rmax = Math.min(H * 0.3, W * 0.14);
    const Rpx = Rmax * (0.18 + 0.82 * (params.r - R_MIN) / (R_MAX - R_MIN));
    const cx = unroll.on ? W * 0.08 + Rpx + unroll.u * 2 * Math.PI * Rpx : W * 0.28;
    const cy = unroll.on ? H * 0.5 - Rpx : H * 0.46;
    return { cx, cy, Rpx };
  }
  function handlePos() {
    const g = circleGeom();
    const a = (params.theta * Math.PI) / 180;
    return { x: g.cx + g.Rpx * Math.cos(a), y: g.cy - g.Rpx * Math.sin(a) };
  }

  // ---- unroll animation ----------------------------------------------------
  function startUnroll() { unroll.on = true; unroll.u = 0; unroll.running = true; }
  function stopUnroll() { unroll.on = false; unroll.running = false; unroll.u = 0; }
  function step(dt) {
    if (unroll.running) {
      unroll.u = Math.min(1, unroll.u + dt / 4);
      if (unroll.u >= 1) unroll.running = false;
    }
  }

  // ---- drawing -------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawCircle(ctx) {
    const { cx, cy, Rpx } = circleGeom();
    const th = (params.theta * Math.PI) / 180;
    const rot = unroll.on ? unroll.u * 2 * Math.PI : 0; // rolling to the right turns clockwise
    // Sector fill (angle measured anticlockwise from the +x axis; canvas y is down, so negate)
    ctx.fillStyle = 'rgba(245,158,11,0.3)';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, Rpx, rot, rot - th, true); ctx.closePath(); ctx.fill();
    // Disc outline
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = Math.max(2, Rpx * 0.04);
    ctx.beginPath(); ctx.arc(cx, cy, Rpx, 0, Math.PI * 2); ctx.stroke();
    // Arc highlight
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(3, Rpx * 0.07);
    ctx.beginPath(); ctx.arc(cx, cy, Rpx, rot, rot - th, true); ctx.stroke();
    // Radii of the sector
    ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Rpx * Math.cos(rot), cy + Rpx * Math.sin(rot)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Rpx * Math.cos(rot - th), cy + Rpx * Math.sin(rot - th)); ctx.stroke();
    // Angle marker
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, Math.min(Rpx * 0.3, 26), rot, rot - th, true); ctx.stroke();
    // Centre
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
    // Labels: r along the fixed radius, θ near the centre
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, Rpx * 0.16)); ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    if (!unroll.on) {
      ctx.fillText(`r = ${num(params.r)} ${params.unit}`, cx + Rpx * 0.5, cy - 4);
      ctx.fillStyle = '#fbbf24'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
      const mid = -th / 2;
      const lr = Math.min(Rpx * 0.3, 26) + Rpx * 0.22;
      ctx.fillText(`θ = ${num(params.theta, 0)}°`, cx + lr * Math.cos(mid), cy + lr * Math.sin(mid));
      // Draggable handle on the rim
      const h = handlePos();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(h.x, h.y, Math.max(7, Rpx * 0.09), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = font(Math.max(10, Rpx * 0.12)); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(T('drag to change θ', 'geser untuk mengubah θ'), h.x, h.y + Math.max(7, Rpx * 0.09) + 3);
    } else {
      // A marker on the rim shows the point that touched the ground at the start.
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.arc(cx + Rpx * Math.cos(Math.PI / 2 + rot), cy + Rpx * Math.sin(Math.PI / 2 + rot), Math.max(5, Rpx * 0.08), 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawUnroll(ctx) {
    const W = cv.width, H = cv.height;
    const { cx, cy, Rpx } = circleGeom();
    const x0 = W * 0.08 + Rpx;          // where the marker first touched the ground
    const yG = H * 0.5;                 // ground line
    const Cpx = 2 * Math.PI * Rpx, Dpx = 2 * Rpx;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W * 0.04, yG); ctx.lineTo(W * 0.96, yG); ctx.stroke();
    // Unrolled part of the circumference
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = Math.max(4, Rpx * 0.1); ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(x0, yG); ctx.lineTo(x0 + unroll.u * Cpx, yG); ctx.stroke();
    // Diameter tick marks underneath
    ctx.font = font(Math.max(10, H * 0.035)); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let k = 0; k <= 3; k++) {
      const x = x0 + k * Dpx;
      if (x > x0 + unroll.u * Cpx + 1) break;
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, yG + 4); ctx.lineTo(x, yG + H * 0.05); ctx.stroke();
      ctx.fillStyle = '#93c5fd';
      if (k > 0) ctx.fillText(`${k}d`, x - Dpx / 2, yG + H * 0.055);
    }
    if (unroll.u > 0.96) {
      const xe = x0 + Cpx;
      ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(xe, yG + 4); ctx.lineTo(xe, yG + H * 0.05); ctx.stroke();
      ctx.fillStyle = '#f9a8d4';
      ctx.fillText(T('0.14d', '0,14d'), x0 + 3 * Dpx + (Cpx - 3 * Dpx) / 2, yG + H * 0.055);
    }
    // Explanation line
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.min(H * 0.05, W * 0.03), true); ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    const txt = unroll.u < 1
      ? T('Rolling one full turn… the pink line is the circumference being unrolled.', 'Menggelinding satu putaran penuh… garis merah muda adalah keliling yang dibentangkan.')
      : T(`One turn covers 3 diameters and a bit more: C ÷ d = ${num(Math.PI, 4)} = π`, `Satu putaran menempuh 3 diameter dan sedikit lebih: K ÷ d = ${num(Math.PI, 4)} = π`);
    ctx.fillText(txt, W * 0.04, H * 0.66);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(Math.min(H * 0.042, W * 0.026));
    ctx.fillText(T('This ratio is the same for every circle, whatever its radius — that is what π means.', 'Rasio ini sama untuk setiap lingkaran, apa pun jari-jarinya — itulah arti π.'), W * 0.04, H * 0.74);
    ctx.fillText(T('Press "Back to circle" to continue exploring.', 'Tekan "Kembali ke lingkaran" untuk melanjutkan.'), W * 0.04, H * 0.8);
    // Mark the diameter inside the rolling circle
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - Rpx, cy); ctx.lineTo(cx + Rpx, cy); ctx.stroke();
    ctx.fillStyle = '#93c5fd'; ctx.font = font(Math.max(10, Rpx * 0.16)); ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('d', cx, cy - 4);
  }

  function drawReadouts(ctx) {
    const W = cv.width, H = cv.height;
    const v = values();
    const u = params.unit, u2 = `${u}²`;
    const x = W * 0.5, w = W * 0.48;
    const fs = Math.min(H * 0.047, w * 0.052);
    const lineH = fs * 1.45;
    let y = H * 0.08;
    const p = piLabel();
    const rows = [
      ['#60a5fa', T('Circumference', 'Keliling'), `C = 2${p}r = 2 × ${p} × ${num(v.r)} = ${num(v.C)} ${u}`],
      ['#60a5fa', T('Area', 'Luas'), `A = ${p}r² = ${p} × ${num(v.r)}² = ${num(v.A)} ${u2}`],
      ['#f59e0b', T('Arc length', 'Panjang busur'), `${T('arc', 'busur')} = θ/360 × C = ${num(v.th, 0)}/360 × ${num(v.C)} = ${num(v.arc)} ${u}`],
      ['#f59e0b', T('Sector area', 'Luas juring'), `${T('sector', 'juring')} = θ/360 × A = ${num(v.th, 0)}/360 × ${num(v.A)} = ${num(v.sector)} ${u2}`],
    ];
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    for (const [col, title, formula] of rows) {
      ctx.fillStyle = col; ctx.font = font(fs, true);
      ctx.fillText(title, x, y);
      y += lineH;
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.92);
      ctx.fillText(formula, x, y);
      y += lineH * 1.35;
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85);
    ctx.fillText(T(`d = 2r = ${num(v.d)} ${u};  C ÷ d = ${num(v.C / v.d, 4)}`, `d = 2r = ${num(v.d)} ${u};  K ÷ d = ${num(v.C / v.d, 4)}`), x, y);
    y += lineH;
    ctx.fillText(T(`fraction of the circle: ${num(v.th, 0)}/360 = ${num(v.th / 360, 3)}`, `bagian lingkaran: ${num(v.th, 0)}/360 = ${num(v.th / 360, 3)}`), x, y);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    if (unroll.on) {
      drawUnroll(ctx);
      drawCircle(ctx);
    } else {
      drawCircle(ctx);
      drawReadouts(ctx);
      ctx.fillStyle = '#64748b'; ctx.font = font(H * 0.034); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText(T('Blue = whole circle (C, A). Orange = the sector cut off by the central angle θ (arc, sector area).', 'Biru = seluruh lingkaran (K, L). Oranye = juring yang dipotong sudut pusat θ (busur, luas juring).'), W * 0.03, H * 0.975);
    }
  }

  // ---- dragging the central angle -------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (unroll.on) return null;
      const h = handlePos();
      const g = circleGeom();
      return Math.hypot(x - h.x, y - h.y) < Math.max(14, g.Rpx * 0.16) ? 'theta' : null;
    },
    onDrag(id, x, y) {
      const g = circleGeom();
      let a = Math.atan2(-(y - g.cy), x - g.cx) * 180 / Math.PI;
      if (a < 0) a += 360;
      // Snap to 5° and let the student reach exactly 360° without wrapping to 0 prematurely.
      let deg = Math.round(a / 5) * 5;
      if (deg >= 360) deg = params.theta > 180 ? 360 : 0;
      if (params.theta > 300 && deg < 60) deg = 360;
      if (params.theta < 60 && deg > 300) deg = 0;
      params.theta = clamp(deg, 0, 360);
      thSl.value = params.theta;
    },
    handles: () => (unroll.on ? [] : [{ id: 'theta', ...handlePos(), label: T('Central angle handle (drag around the rim)', 'Pegangan sudut pusat (geser mengitari tepi)') }]),
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- controls ------------------------------------------------------------
  const rSl = slider({ label: T('Radius r', 'Jari-jari r'), key: 'r', min: R_MIN, max: R_MAX, step: 0.5, value: params.r, format: (v) => `${num(v)} ${params.unit}`, onInput: (v) => { params.r = v; } });
  const thSl = slider({ label: T('Central angle θ', 'Sudut pusat θ'), key: 'theta', min: 0, max: 360, step: 5, value: params.theta, format: (v) => `${v}°`, onInput: (v) => { params.theta = v; } });
  const unitSel = select({
    label: T('Unit', 'Satuan'), key: 'unit', value: 'cm',
    options: [{ value: 'cm', label: 'cm' }, { value: 'm', label: 'm' }, { value: 'mm', label: 'mm' }],
    onChange: (v) => { params.unit = v; rSl.value = params.r; },
  });
  const piSel = select({
    label: T('Value of π', 'Nilai π'), key: 'pi', value: 'exact',
    options: [{ value: 'exact', label: T('exact π (3.14159…)', 'π eksak (3,14159…)') }, { value: '3.14', label: '3.14' }, { value: '22/7', label: '22/7' }],
    onChange: (v) => { params.pi = v; },
  });
  const unrollBtn = button({ label: T('Unroll the circumference', 'Bentangkan keliling'), primary: true, onClick: () => { if (unroll.on && !unroll.running) stopUnroll(); else startUnroll(); syncLabel(); } });
  function syncLabel() { unrollBtn.label = unroll.on ? T('Back to circle', 'Kembali ke lingkaran') : T('Unroll the circumference', 'Bentangkan keliling'); }
  const quarter = button({ label: '90°', onClick: () => { params.theta = 90; thSl.value = 90; } });
  const half = button({ label: '180°', onClick: () => { params.theta = 180; thSl.value = 180; } });
  const full = button({ label: '360°', onClick: () => { params.theta = 360; thSl.value = 360; } });
  ctrlPanel.append(row(rSl, thSl), row(unitSel, piSel), row(unrollBtn, quarter, half, full));

  const lab = labPanel({
    title: 'Arc and sector lab',
    filename: 'circle-geometry-data.csv',
    columns: [
      { key: 'r', label: 'r', format: (v) => Number(v).toFixed(1) },
      { key: 'theta', label: 'θ (°)', format: (v) => Number(v).toFixed(0) },
      { key: 'C', label: 'C', format: (v) => Number(v).toFixed(2) },
      { key: 'arc', label: 'Arc length', format: (v) => Number(v).toFixed(2) },
      { key: 'sector', label: 'Sector area', format: (v) => Number(v).toFixed(2) },
    ],
    procedure: [
      'Set r = 5 and θ = 90°. Record. Then θ = 180°, 270° and 360°. How does the arc length grow with θ?',
      'Keep θ = 90° and record r = 2, 4, 6, 8. Does the arc length double when r doubles? Does the sector area?',
      'Compare the arc length at 360° with C. Compare the sector area at 360° with A.',
      'Divide each arc length by C. What fraction do you get for 90°, 180°, 270°?',
    ],
    predict: 'If you double the radius but keep the angle, what happens to the arc length? To the sector area?',
    source: () => {
      const v = values();
      return { r: v.r, theta: v.th, C: v.C, arc: v.arc, sector: v.sector };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
