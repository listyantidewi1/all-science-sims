import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Angle Explorer, grades 5-6.
// one   : a fixed arm and a rotating arm with a protractor; classify the angle.
// tri   : three draggable vertices; the three angles always add to 180 degrees.
// cross : two lines through one point; opposite (vertical) angles are equal.
const T = (en, id) => (getLocale() === 'id' ? id : en);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DEG = 180 / Math.PI;
const norm360 = (d) => ((d % 360) + 360) % 360;

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

function classify(deg) {
  if (deg === 0) return { key: 'zero', color: '#94a3b8' };
  if (deg < 90) return { key: 'acute', color: '#34d399' };
  if (deg === 90) return { key: 'right', color: '#38bdf8' };
  if (deg < 180) return { key: 'obtuse', color: '#fb923c' };
  if (deg === 180) return { key: 'straight', color: '#a78bfa' };
  return { key: 'reflex', color: '#f472b6' };
}
const CLASS_NAME = {
  zero: ['Zero angle', 'Sudut nol'],
  acute: ['Acute angle', 'Sudut lancip'],
  right: ['Right angle', 'Sudut siku-siku'],
  obtuse: ['Obtuse angle', 'Sudut tumpul'],
  straight: ['Straight angle', 'Sudut lurus'],
  reflex: ['Reflex angle', 'Sudut refleks'],
};
const CLASS_RULE = {
  zero: ['the arms lie on top of each other', 'kedua lengan berimpit'],
  acute: ['less than 90°', 'kurang dari 90°'],
  right: ['exactly 90°, a square corner', 'tepat 90°, sudut siku'],
  obtuse: ['between 90° and 180°', 'antara 90° dan 180°'],
  straight: ['exactly 180°, a straight line', 'tepat 180°, garis lurus'],
  reflex: ['more than 180°', 'lebih dari 180°'],
};

// Angle at vertex p between arms to q and r, in degrees (0-180).
function angleAt(p, q, r) {
  const ax = q.x - p.x, ay = q.y - p.y, bx = r.x - p.x, by = r.y - p.y;
  const la = Math.hypot(ax, ay), lb = Math.hypot(bx, by);
  if (la < 1e-9 || lb < 1e-9) return 0;
  const c = clamp((ax * bx + ay * by) / (la * lb), -1, 1);
  return Math.acos(c) * DEG;
}
// Round three angles to whole degrees so they still add to exactly 180.
function roundTo180(angles) {
  const ints = angles.map((a) => Math.round(a));
  let diff = 180 - ints.reduce((s, v) => s + v, 0);
  while (diff !== 0) {
    let best = 0, bestErr = -Infinity;
    for (let i = 0; i < 3; i++) {
      const err = (angles[i] - ints[i]) * Math.sign(diff);
      if (err > bestErr) { bestErr = err; best = i; }
    }
    ints[best] += Math.sign(diff);
    diff -= Math.sign(diff);
  }
  return ints;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = {
    mode: 'one',
    degrees: true,
    theta: 50,                              // one-angle mode, degrees counter-clockwise from the fixed arm
    tri: [{ u: 0.2, v: 0.8 }, { u: 0.8, v: 0.8 }, { u: 0.4, v: 0.18 }], // normalised in the drawing box
    cross: { t1: 0, t2: 60 },
    now: 0,
  };
  const TRI_NAMES = ['A', 'B', 'C'];
  const TRI_COLORS = ['#38bdf8', '#fb923c', '#a78bfa'];

  // ---- layout ---------------------------------------------------------------
  function layout() {
    const W = cv.width, H = cv.height;
    const dx = W * 0.02, dy = H * 0.04, dw = W * 0.62, dh = H * 0.92;
    const px = dx + dw + W * 0.03, pw = W - px - W * 0.02;
    return { W, H, dx, dy, dw, dh, cx: dx + dw / 2, cy: dy + dh / 2, R: Math.min(dw, dh) * 0.4, px, pw };
  }
  const triPx = (L) => state.tri.map((p) => ({ x: L.dx + p.u * L.dw, y: L.dy + p.v * L.dh }));
  const dir = (deg) => ({ x: Math.cos(deg / DEG), y: -Math.sin(deg / DEG) }); // screen y points down

  function triAngles(L) {
    const P = triPx(L);
    const raw = [angleAt(P[0], P[1], P[2]), angleAt(P[1], P[2], P[0]), angleAt(P[2], P[0], P[1])];
    return { raw, ints: roundTo180(raw), P };
  }
  function crossAngles() {
    const a = norm360(state.cross.t2 - state.cross.t1) % 180;
    return { a, b: 180 - a };
  }

  // ---- drawing helpers ------------------------------------------------------
  const font = (s, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(s))}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawProtractor(ctx, cx, cy, R, startDeg) {
    // full-circle protractor, zero along the fixed arm (startDeg), counter-clockwise
    ctx.save();
    ctx.strokeStyle = 'rgba(203,213,225,0.5)';
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, 0, Math.PI * 2); ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let d = 0; d < 360; d += 5) {
      const major = d % 30 === 0, mid = d % 10 === 0;
      const len = major ? R * 0.14 : mid ? R * 0.09 : R * 0.05;
      const v = dir(d + startDeg);
      ctx.strokeStyle = major ? 'rgba(248,250,252,0.85)' : 'rgba(203,213,225,0.5)';
      ctx.lineWidth = major ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(cx + v.x * (R - len), cy + v.y * (R - len));
      ctx.lineTo(cx + v.x * R, cy + v.y * R);
      ctx.stroke();
      if (major && state.degrees) {
        ctx.fillStyle = '#e2e8f0';
        ctx.font = font(R * 0.085, true);
        ctx.fillText(String(d), cx + v.x * R * 1.1, cy + v.y * R * 1.1);
      }
    }
    ctx.restore();
  }
  function drawSector(ctx, cx, cy, r, fromDeg, toDeg, color, alpha = 0.35) {
    // from fromDeg counter-clockwise to toDeg (both in protractor degrees)
    ctx.fillStyle = color.replace(')', `,${alpha})`).replace('rgb(', 'rgba(');
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -fromDeg / DEG, -toDeg / DEG, true);
    ctx.closePath();
    ctx.fill();
  }
  const hexToRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgb(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255})`;
  };
  function drawRightMark(ctx, cx, cy, size, aDeg, bDeg) {
    const u = dir(aDeg), v = dir(bDeg);
    ctx.beginPath();
    ctx.moveTo(cx + u.x * size, cy + u.y * size);
    ctx.lineTo(cx + (u.x + v.x) * size, cy + (u.y + v.y) * size);
    ctx.lineTo(cx + v.x * size, cy + v.y * size);
    ctx.stroke();
  }
  function drawHandle(ctx, x, y, r, color) {
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.stroke();
  }
  function degLabel(ctx, x, y, text, size, color) {
    ctx.font = font(size, true);
    const w = ctx.measureText(text).width + size * 0.8;
    ctx.fillStyle = 'rgba(11,18,32,0.85)';
    ctx.beginPath(); ctx.roundRect(x - w / 2, y - size * 0.75, w, size * 1.5, size * 0.4); ctx.fill();
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  }

  // ---- modes ---------------------------------------------------------------
  function drawOne(ctx, L) {
    const { cx, cy, R } = L;
    const th = state.theta;
    const cls = classify(th);
    const rgb = hexToRgb(cls.color);
    drawSector(ctx, cx, cy, R * 0.6, 0, th, rgb, 0.4);
    drawProtractor(ctx, cx, cy, R, 0);
    // arms
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = Math.max(4, R * 0.04);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * 0.95, cy); ctx.stroke();
    const v = dir(th);
    ctx.strokeStyle = cls.color;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + v.x * R * 0.95, cy + v.y * R * 0.95); ctx.stroke();
    // arc with arrow direction
    ctx.strokeStyle = cls.color; ctx.lineWidth = Math.max(2, R * 0.02);
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.6, 0, -th / DEG, true); ctx.stroke();
    if (cls.key === 'right') { ctx.lineWidth = 3; drawRightMark(ctx, cx, cy, R * 0.18, 0, 90); }
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(cx, cy, Math.max(4, R * 0.03), 0, Math.PI * 2); ctx.fill();
    drawHandle(ctx, cx + v.x * R * 0.95, cy + v.y * R * 0.95, Math.max(10, R * 0.07), cls.color);
    if (state.degrees) {
      const mid = dir(th / 2);
      degLabel(ctx, cx + mid.x * R * 0.38, cy + mid.y * R * 0.38, `${th}°`, Math.max(12, R * 0.1), cls.color);
    }
  }

  function drawTri(ctx, L) {
    const { raw, ints, P } = triAngles(L);
    // fill
    ctx.fillStyle = 'rgba(148,163,184,0.12)';
    ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = Math.max(3, L.R * 0.03); ctx.lineJoin = 'round'; ctx.stroke();
    const r = Math.max(18, L.R * 0.22);
    for (let i = 0; i < 3; i++) {
      const p = P[i], q = P[(i + 1) % 3], s = P[(i + 2) % 3];
      const a1 = Math.atan2(q.y - p.y, q.x - p.x), a2 = Math.atan2(s.y - p.y, s.x - p.x);
      // draw the smaller arc between the two arms
      let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      ctx.fillStyle = hexToRgb(TRI_COLORS[i]).replace('rgb(', 'rgba(').replace(')', ',0.45)');
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, r, a1, a1 + d, d < 0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = TRI_COLORS[i]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(p.x, p.y, r, a1, a1 + d, d < 0); ctx.stroke();
      if (ints[i] === 90) {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
        drawRightMark(ctx, p.x, p.y, r * 0.5, -a1 * DEG, -a2 * DEG);
      }
      // name outside, degrees inside
      const mid = a1 + d / 2;
      const out = { x: -Math.cos(mid), y: -Math.sin(mid) };
      ctx.fillStyle = TRI_COLORS[i]; ctx.font = font(Math.max(14, L.R * 0.11), true);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(TRI_NAMES[i], p.x + out.x * r * 0.9, p.y + out.y * r * 0.9);
      if (state.degrees && raw[i] > 0.5) {
        degLabel(ctx, p.x + Math.cos(mid) * r * 1.5, p.y + Math.sin(mid) * r * 1.5, `${ints[i]}°`, Math.max(12, L.R * 0.085), '#fff');
      }
      drawHandle(ctx, p.x, p.y, Math.max(10, L.R * 0.06), TRI_COLORS[i]);
    }
    return ints;
  }

  function drawCross(ctx, L) {
    const { cx, cy, R } = L;
    const { a, b } = crossAngles();
    const t1 = state.cross.t1;
    const t2 = t1 + a; // direction of the second line (or its opposite) that is a degrees ccw from line 1
    const colA = hexToRgb('#fb923c'), colB = hexToRgb('#2dd4bf');
    const sectors = [[t1, t2, colA, a], [t2, t1 + 180, colB, b], [t1 + 180, t2 + 180, colA, a], [t2 + 180, t1 + 360, colB, b]];
    for (const [f, t, c] of sectors) drawSector(ctx, cx, cy, R * 0.5, f, t, c, 0.35);
    drawProtractor(ctx, cx, cy, R, t1);
    ctx.lineCap = 'round'; ctx.lineWidth = Math.max(4, R * 0.04);
    const d1 = dir(t1), d2 = dir(state.cross.t2);
    ctx.strokeStyle = '#e2e8f0';
    ctx.beginPath(); ctx.moveTo(cx - d1.x * R * 1.05, cy - d1.y * R * 1.05); ctx.lineTo(cx + d1.x * R * 1.05, cy + d1.y * R * 1.05); ctx.stroke();
    ctx.strokeStyle = '#fde68a';
    ctx.beginPath(); ctx.moveTo(cx - d2.x * R * 1.05, cy - d2.y * R * 1.05); ctx.lineTo(cx + d2.x * R * 1.05, cy + d2.y * R * 1.05); ctx.stroke();
    if (a === 90) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; drawRightMark(ctx, cx, cy, R * 0.15, t1, t1 + 90); }
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(cx, cy, Math.max(4, R * 0.03), 0, Math.PI * 2); ctx.fill();
    const names = ['a', 'b', 'c', 'd'];
    sectors.forEach(([f, t, c, val], i) => {
      const m = dir((f + t) / 2);
      const txt = state.degrees ? `${names[i]} = ${val}°` : names[i];
      if (val > 0) degLabel(ctx, cx + m.x * R * 0.72, cy + m.y * R * 0.72, txt, Math.max(12, R * 0.085), c);
    });
    drawHandle(ctx, cx + d1.x * R * 1.05, cy + d1.y * R * 1.05, Math.max(10, R * 0.07), '#94a3b8');
    drawHandle(ctx, cx + d2.x * R * 1.05, cy + d2.y * R * 1.05, Math.max(10, R * 0.07), '#f59e0b');
    return { a, b };
  }

  // ---- right-hand panel -----------------------------------------------------
  function drawPanel(ctx, L, info) {
    const { px, pw, dy, dh } = L;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.roundRect(px, dy, pw, dh, 12); ctx.fill();
    const pad = pw * 0.07;
    const big = Math.min(pw * 0.2, L.H * 0.11), small = Math.min(pw * 0.085, L.H * 0.046);
    let ty = dy + pad;
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    const line = (txt, color, size, bold = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = font(size, bold);
      ctx.fillText(txt, px + pad, ty); ty += size * gap;
    };
    if (state.mode === 'one') {
      const cls = classify(state.theta);
      line(T('Angle', 'Sudut'), '#94a3b8', small);
      line(state.degrees ? `${state.theta}°` : '?', '#fff', big, true, 1.35);
      line(T(...CLASS_NAME[cls.key]), cls.color, small * 1.15, true, 1.4);
      line(T(...CLASS_RULE[cls.key]), '#cbd5e1', small * 0.9, false, 1.8);
      // legend: the five kinds of angle, current one highlighted
      const keys = ['acute', 'right', 'obtuse', 'straight', 'reflex'];
      const sample = { acute: 45, right: 90, obtuse: 135, straight: 180, reflex: 270 };
      for (const k of keys) {
        const c = classify(sample[k]);
        ctx.fillStyle = c.color;
        ctx.beginPath(); ctx.arc(px + pad + small * 0.4, ty + small * 0.5, small * 0.3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = k === cls.key ? '#fff' : '#94a3b8'; ctx.font = font(small * 0.85, k === cls.key);
        ctx.fillText(T(...CLASS_NAME[k]), px + pad + small * 1.1, ty);
        ty += small * 1.35;
      }
    } else if (state.mode === 'tri') {
      const ints = info;
      line(T('Triangle angles', 'Sudut segitiga'), '#94a3b8', small);
      for (let i = 0; i < 3; i++) line(`${TRI_NAMES[i]} = ${state.degrees ? ints[i] + '°' : '?'}`, TRI_COLORS[i], small * 1.25, true, 1.45);
      ty += small * 0.4;
      line('A + B + C', '#94a3b8', small);
      line(state.degrees ? `= ${ints[0] + ints[1] + ints[2]}°` : '= ?', '#fff', big, true, 1.35);
      line(T('always 180°,', 'selalu 180°,'), '#6ee7b7', small * 0.9, false, 1.3);
      line(T('however you pull!', 'bagaimana pun ditarik!'), '#6ee7b7', small * 0.9, false, 1.8);
      const mx = Math.max(...ints);
      const kind = mx > 90 ? T('obtuse triangle', 'segitiga tumpul') : mx === 90 ? T('right triangle', 'segitiga siku-siku') : T('acute triangle', 'segitiga lancip');
      line(kind, '#cbd5e1', small * 0.95, true);
    } else {
      const { a, b } = info;
      line(T('Two crossing lines', 'Dua garis berpotongan'), '#94a3b8', small);
      line(`a = c = ${state.degrees ? a + '°' : '?'}`, '#fb923c', small * 1.25, true, 1.45);
      line(`b = d = ${state.degrees ? b + '°' : '?'}`, '#2dd4bf', small * 1.25, true, 1.7);
      line(T('Opposite angles', 'Sudut bertolak belakang'), '#fff', small * 0.95, true, 1.3);
      line(T('are equal', 'sama besar'), '#fff', small * 0.95, true, 1.7);
      line(`a + b = ${state.degrees ? a + b + '°' : '?'}`, '#cbd5e1', small * 1.1, true, 1.45);
      line(T('neighbours add up', 'sudut bersebelahan'), '#94a3b8', small * 0.85, false, 1.3);
      line(T('to a straight line', 'membentuk garis lurus'), '#94a3b8', small * 0.85, false, 1.8);
      if (a === 90) { line(T('All four are', 'Keempatnya'), '#38bdf8', small, true, 1.3); line(T('right angles!', 'sudut siku-siku!'), '#38bdf8', small, true); }
    }
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  function draw() {
    const ctx = cv.ctx;
    const L = layout();
    if (L.W < 10 || L.H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, L.W, L.H);
    let info = null;
    if (state.mode === 'one') drawOne(ctx, L);
    else if (state.mode === 'tri') info = drawTri(ctx, L);
    else info = drawCross(ctx, L);
    drawPanel(ctx, L, info);
  }

  // ---- dragging ---------------------------------------------------------------
  function snapDeg(deg, snaps, tol) {
    for (const s of snaps) if (Math.abs(norm360(deg - s + 180) - 180) <= tol) return s;
    return Math.round(norm360(deg));
  }
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const L = layout();
      const hr = Math.max(16, L.R * 0.1);
      if (state.mode === 'one') {
        const v = dir(state.theta);
        return Math.hypot(x - (L.cx + v.x * L.R * 0.95), y - (L.cy + v.y * L.R * 0.95)) <= hr ? 'arm' : null;
      }
      if (state.mode === 'tri') {
        const P = triPx(L);
        for (let i = 0; i < 3; i++) if (Math.hypot(x - P[i].x, y - P[i].y) <= hr) return `v${i}`;
        return null;
      }
      const d1 = dir(state.cross.t1), d2 = dir(state.cross.t2);
      if (Math.hypot(x - (L.cx + d2.x * L.R * 1.05), y - (L.cy + d2.y * L.R * 1.05)) <= hr) return 'l2';
      if (Math.hypot(x - (L.cx + d1.x * L.R * 1.05), y - (L.cy + d1.y * L.R * 1.05)) <= hr) return 'l1';
      return null;
    },
    onDrag(id, x, y) {
      const L = layout();
      if (id === 'arm') {
        const deg = Math.atan2(-(y - L.cy), x - L.cx) * DEG;
        state.theta = snapDeg(deg, [0, 90, 180, 270], 2.5);
      } else if (id[0] === 'v') {
        const i = Number(id[1]);
        state.tri[i].u = clamp((x - L.dx) / L.dw, 0.03, 0.97);
        state.tri[i].v = clamp((y - L.dy) / L.dh, 0.05, 0.95);
      } else {
        const deg = Math.atan2(-(y - L.cy), x - L.cx) * DEG;
        if (id === 'l1') state.cross.t1 = snapDeg(deg, [0, 90, 180, 270], 2.5);
        else {
          // snap so that the angle between the lines hits 90 or 0 cleanly
          const rel = norm360(deg - state.cross.t1);
          const snappedRel = snapDeg(rel, [0, 90, 180, 270], 2.5);
          state.cross.t2 = norm360(state.cross.t1 + snappedRel);
        }
      }
    },
    handles: () => {
      const L = layout();
      if (state.mode === 'one') {
        const v = dir(state.theta);
        return [{ id: 'arm', x: L.cx + v.x * L.R * 0.95, y: L.cy + v.y * L.R * 0.95, label: 'Rotating arm (drag to change the angle)' }];
      }
      if (state.mode === 'tri') return triPx(L).map((p, i) => ({ id: `v${i}`, x: p.x, y: p.y, label: `Triangle corner ${TRI_NAMES[i]}` }));
      const d1 = dir(state.cross.t1), d2 = dir(state.cross.t2);
      return [
        { id: 'l1', x: L.cx + d1.x * L.R * 1.05, y: L.cy + d1.y * L.R * 1.05, label: 'First line (drag to rotate)' },
        { id: 'l2', x: L.cx + d2.x * L.R * 1.05, y: L.cy + d2.y * L.R * 1.05, label: 'Second line (drag to rotate)' },
      ];
    },
    keyStep: 6,
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls ---------------------------------------------------------------
  const modeSel = select({
    label: T('Mode', 'Mode'),
    key: 'mode',
    options: [
      { value: 'one', label: T('One angle', 'Satu sudut') },
      { value: 'tri', label: T('Triangle: angles add to 180°', 'Segitiga: jumlah sudut 180°') },
      { value: 'cross', label: T('Two crossing lines', 'Dua garis berpotongan') },
    ],
    value: 'one',
    onChange: (v) => { state.mode = v; },
  });
  const degT = toggle({ label: T('Show degrees', 'Tampilkan derajat'), key: 'degrees', value: true, onChange: (v) => { state.degrees = v; } });
  const randBtn = bigBtn(T('Surprise me', 'Acak'), () => {
    if (state.mode === 'one') state.theta = Math.floor(Math.random() * 360);
    else if (state.mode === 'tri') {
      state.tri = state.tri.map(() => ({ u: 0.1 + Math.random() * 0.8, v: 0.1 + Math.random() * 0.8 }));
    } else {
      state.cross.t1 = Math.floor(Math.random() * 180);
      state.cross.t2 = norm360(state.cross.t1 + 15 + Math.floor(Math.random() * 150));
    }
  }, true);
  ctrlPanel.append(modeSel.el, row(degT, randBtn));

  const lab = labPanel({
    title: 'Triangle angles table',
    filename: 'angles-data.csv',
    columns: [
      { key: 'A', label: 'Angle A (°)' },
      { key: 'B', label: 'Angle B (°)' },
      { key: 'C', label: 'Angle C (°)' },
      { key: 'sum', label: 'A + B + C (°)' },
    ],
    procedure: [
      'Choose the Triangle mode.',
      'Drag one corner and press Record.',
      'Make a very flat triangle, then a very tall one. Record each.',
      'Press Surprise me three times and record each triangle. Look at the last column.',
    ],
    predict: 'If you make one angle of a triangle bigger, what happens to the other two? What will A + B + C be?',
    source: () => {
      if (state.mode !== 'tri') return null;
      const { ints } = triAngles(layout());
      return { A: ints[0], B: ints[1], C: ints[2], sum: ints[0] + ints[1] + ints[2] };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.now = t; draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
