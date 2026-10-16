import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const DEG = 180 / Math.PI;
const MAX_BOUNCES = 8;

// Positions are fractions of the canvas width (x) and height (y). Angles in
// degrees, measured clockwise on screen (y points down). Walls are rectangles.
const PUZZLES = [
  {
    torch: { x: 0.07, y: 0.5, angle: 0 },
    target: { x: 0.86, y: 0.14 },
    mirrors: [{ x: 0.5, y: 0.5, angle: 90 }, { x: 0.5, y: 0.88, angle: 0 }],
    walls: [],
  },
  {
    torch: { x: 0.07, y: 0.8, angle: 0 },
    target: { x: 0.88, y: 0.8 },
    mirrors: [{ x: 0.3, y: 0.8, angle: 90 }, { x: 0.6, y: 0.16, angle: 0 }],
    walls: [{ x: 0.46, y: 0.5, w: 0.06, h: 0.5 }],
  },
  {
    torch: { x: 0.1, y: 0.12, angle: 90 },
    target: { x: 0.88, y: 0.14 },
    mirrors: [{ x: 0.1, y: 0.8, angle: 0 }, { x: 0.5, y: 0.84, angle: 0 }, { x: 0.88, y: 0.84, angle: 0 }],
    walls: [{ x: 0.47, y: 0, w: 0.06, h: 0.6 }],
  },
];

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

// Ray p + t*d against segment a→b. Returns t or null.
function raySeg(px, py, dx, dy, ax, ay, bx, by) {
  const ex = bx - ax, ey = by - ay;
  const den = dx * ey - dy * ex;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((ax - px) * ey - (ay - py) * ex) / den;
  const s = ((ax - px) * dy - (ay - py) * dx) / den;
  if (t > 1e-6 && s >= 0 && s <= 1) return t;
  return null;
}

// Ray (unit d) against circle. Returns t of the first crossing or null.
function rayCircle(px, py, dx, dy, cx, cy, r) {
  const ox = px - cx, oy = py - cy;
  const b = ox * dx + oy * dy;
  const c = ox * ox + oy * oy - r * r;
  const disc = b * b - c;
  if (disc < 0) return null;
  const t = -b - Math.sqrt(disc);
  return t > 1e-6 ? t : null;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = {
    puzzle: 0,
    torch: { x: 0.07, y: 0.5, angle: 0 },
    target: { x: 0.86, y: 0.14 },
    mirrors: [],
    walls: [],
    showAngles: true,
    trace: { points: [], bounces: [], hit: false },
    hitSince: -1,
    solved: [false, false, false],
  };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mirrorLen = () => cv.width * 0.17;
  const targetR = () => cv.width * 0.035;

  function loadPuzzle(i) {
    const p = PUZZLES[i];
    state.puzzle = i;
    state.torch = { ...p.torch };
    state.target = { ...p.target };
    state.mirrors = p.mirrors.map((m) => ({ ...m }));
    state.walls = p.walls.map((w) => ({ ...w }));
    state.hitSince = -1;
    if (torchSlider) torchSlider.value = p.torch.angle;
    puzzleBtns.forEach((b, k) => b.el.classList.toggle('btn--primary', k === i));
  }

  function mirrorEnds(m) {
    const W = cv.width, H = cv.height, L = mirrorLen() / 2;
    const a = m.angle / DEG;
    const cx = m.x * W, cy = m.y * H;
    return { cx, cy, ax: cx - Math.cos(a) * L, ay: cy - Math.sin(a) * L, bx: cx + Math.cos(a) * L, by: cy + Math.sin(a) * L };
  }

  function wallSegments(w) {
    const W = cv.width, H = cv.height;
    const x0 = w.x * W, y0 = w.y * H, x1 = (w.x + w.w) * W, y1 = (w.y + w.h) * H;
    return [[x0, y0, x1, y0], [x1, y0, x1, y1], [x1, y1, x0, y1], [x0, y1, x0, y0]];
  }

  function trace() {
    const W = cv.width, H = cv.height;
    let px = state.torch.x * W, py = state.torch.y * H;
    const a0 = state.torch.angle / DEG;
    let dx = Math.cos(a0), dy = Math.sin(a0);
    const points = [{ x: px, y: py }];
    const bounces = [];
    let hit = false;
    let lastMirror = -1;
    for (let b = 0; b <= MAX_BOUNCES; b++) {
      let bestT = Infinity, kind = 'edge', idx = -1;
      // canvas edges
      if (Math.abs(dx) > 1e-9) { const t = ((dx > 0 ? W : 0) - px) / dx; if (t > 0 && t < bestT) bestT = t; }
      if (Math.abs(dy) > 1e-9) { const t = ((dy > 0 ? H : 0) - py) / dy; if (t > 0 && t < bestT) bestT = t; }
      // walls
      state.walls.forEach((w) => {
        for (const s of wallSegments(w)) {
          const t = raySeg(px, py, dx, dy, s[0], s[1], s[2], s[3]);
          if (t != null && t < bestT) { bestT = t; kind = 'wall'; }
        }
      });
      // target
      const tt = rayCircle(px, py, dx, dy, state.target.x * W, state.target.y * H, targetR());
      if (tt != null && tt < bestT) { bestT = tt; kind = 'target'; }
      // mirrors
      state.mirrors.forEach((m, i) => {
        if (i === lastMirror) return;
        const e = mirrorEnds(m);
        const t = raySeg(px, py, dx, dy, e.ax, e.ay, e.bx, e.by);
        if (t != null && t < bestT) { bestT = t; kind = 'mirror'; idx = i; }
      });
      if (!Number.isFinite(bestT)) break;
      const hx = px + dx * bestT, hy = py + dy * bestT;
      points.push({ x: hx, y: hy });
      if (kind === 'target') { hit = true; break; }
      if (kind !== 'mirror') break;
      // reflect
      const e = mirrorEnds(state.mirrors[idx]);
      const ex = e.bx - e.ax, ey = e.by - e.ay;
      const len = Math.hypot(ex, ey) || 1;
      let nx = -ey / len, ny = ex / len;
      const dot = dx * nx + dy * ny;
      if (dot > 0) { nx = -nx; ny = -ny; }           // normal points toward the incoming side
      const inc = Math.acos(clamp(Math.abs(dot), 0, 1)) * DEG;
      const ndx = dx - 2 * dot * nx, ndy = dy - 2 * dot * ny;
      const ref = Math.acos(clamp(Math.abs(ndx * nx + ndy * ny), 0, 1)) * DEG;
      bounces.push({ x: hx, y: hy, nx, ny, inx: -dx, iny: -dy, outx: ndx, outy: ndy, inc, ref, mirror: idx + 1 });
      dx = ndx; dy = ndy; px = hx; py = hy;
      lastMirror = idx;
    }
    state.trace = { points, bounces, hit };
    if (hit) {
      if (state.hitSince < 0) state.hitSince = now;
      state.solved[state.puzzle] = true;
    } else state.hitSince = -1;
  }

  function font(px, bold = true) {
    return `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  }

  function drawArc(ctx, x, y, r, fromX, fromY, toX, toY, color) {
    const a0 = Math.atan2(fromY, fromX), a1 = Math.atan2(toY, toX);
    let diff = a1 - a0;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, r, a0, a1, diff < 0); ctx.stroke();
    const mid = a0 + diff / 2;
    return { x: x + Math.cos(mid) * (r + 14), y: y + Math.sin(mid) * (r + 14) };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    // floor grid for a hint of a room
    ctx.strokeStyle = 'rgba(148,163,184,0.08)'; ctx.lineWidth = 1;
    const g = W / 16;
    for (let x = g; x < W; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = g; y < H; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // walls
    for (const w of state.walls) {
      const x = w.x * W, y = w.y * H, ww = w.w * W, hh = w.h * H;
      ctx.fillStyle = '#7c2d12';
      ctx.fillRect(x, y, ww, hh);
      ctx.strokeStyle = '#fdba74'; ctx.lineWidth = 1.5;
      const bh = Math.max(10, H * 0.05);
      for (let yy = y; yy < y + hh; yy += bh) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + ww, yy); ctx.stroke(); }
      ctx.strokeStyle = '#fed7aa'; ctx.lineWidth = 3; ctx.strokeRect(x, y, ww, hh);
    }

    // target
    const tx = state.target.x * W, ty = state.target.y * H, tr = targetR();
    const hit = state.trace.hit;
    if (hit) {
      const pulse = 1 + 0.15 * Math.sin((now - state.hitSince) * 8);
      ctx.fillStyle = 'rgba(250,204,21,0.25)';
      ctx.beginPath(); ctx.arc(tx, ty, tr * 1.9 * pulse, 0, Math.PI * 2); ctx.fill();
    }
    const rings = ['#ef4444', '#ffffff', '#ef4444', '#ffffff'];
    rings.forEach((c, i) => {
      ctx.fillStyle = hit ? (i % 2 ? '#fef08a' : '#f59e0b') : c;
      ctx.beginPath(); ctx.arc(tx, ty, tr * (1 - i * 0.25), 0, Math.PI * 2); ctx.fill();
    });

    // mirrors
    state.mirrors.forEach((m, i) => {
      const e = mirrorEnds(m);
      const a = m.angle / DEG;
      const nx = -Math.sin(a), ny = Math.cos(a);
      const th = Math.max(5, W * 0.01);
      // dark backing then shiny face
      ctx.strokeStyle = '#475569'; ctx.lineWidth = th * 2; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(e.ax, e.ay); ctx.lineTo(e.bx, e.by); ctx.stroke();
      ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = th;
      ctx.beginPath(); ctx.moveTo(e.ax, e.ay); ctx.lineTo(e.bx, e.by); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(e.ax + nx * th * 0.3, e.ay + ny * th * 0.3); ctx.lineTo(e.bx + nx * th * 0.3, e.by + ny * th * 0.3); ctx.stroke();
      ctx.lineCap = 'butt';
      // move handle
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.arc(e.cx, e.cy, Math.max(10, W * 0.018), 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0b1220';
      ctx.font = font(Math.max(11, W * 0.02));
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), e.cx, e.cy + 1);
      // rotate handle (ring at end B)
      ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(e.bx, e.by, Math.max(8, W * 0.015), 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#0b1220';
      ctx.beginPath(); ctx.arc(e.bx, e.by, Math.max(8, W * 0.015) - 3, 0, Math.PI * 2); ctx.fill();
    });

    // beam
    const pts = state.trace.points;
    if (pts.length > 1) {
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(250,204,21,0.25)'; ctx.lineWidth = Math.max(8, W * 0.016);
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (const p of pts) ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(3, W * 0.006);
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (const p of pts) ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.lineCap = 'butt';
    }

    // normals and angles
    if (state.showAngles) {
      const nl = W * 0.07, ar = W * 0.045;
      ctx.font = font(Math.max(11, W * 0.019));
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const b of state.trace.bounces) {
        ctx.setLineDash([6, 5]);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x - b.nx * nl * 0.3, b.y - b.ny * nl * 0.3); ctx.lineTo(b.x + b.nx * nl, b.y + b.ny * nl); ctx.stroke();
        ctx.setLineDash([]);
        const li = drawArc(ctx, b.x, b.y, ar, b.nx, b.ny, b.inx, b.iny, '#38bdf8');
        const lr = drawArc(ctx, b.x, b.y, ar * 0.8, b.nx, b.ny, b.outx, b.outy, '#a78bfa');
        if (b.inc > 3) {
          ctx.fillStyle = '#38bdf8'; ctx.fillText(`${T('in', 'masuk')} ${Math.round(b.inc)}°`, li.x, li.y);
          ctx.fillStyle = '#c4b5fd'; ctx.fillText(`${T('out', 'keluar')} ${Math.round(b.ref)}°`, lr.x, lr.y);
        } else {
          ctx.fillStyle = '#e2e8f0'; ctx.fillText(`${T('in', 'masuk')} = ${T('out', 'keluar')} = 0°`, b.x + b.nx * (nl + 16), b.y + b.ny * (nl + 16));
        }
      }
    }

    // torch
    const tox = state.torch.x * W, toy = state.torch.y * H;
    const ta = state.torch.angle / DEG;
    const tl = W * 0.07, tw = W * 0.025;
    ctx.save();
    ctx.translate(tox, toy); ctx.rotate(ta);
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.roundRect(-tl, -tw / 2, tl * 0.75, tw, 5); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(-tl * 0.25, -tw / 2); ctx.lineTo(0, -tw * 0.8); ctx.lineTo(0, tw * 0.8); ctx.lineTo(-tl * 0.25, tw / 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fef9c3';
    ctx.beginPath(); ctx.arc(0, 0, tw * 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // message
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    if (hit) {
      const age = now - state.hitSince;
      const scale = 1 + 0.08 * Math.sin(age * 6);
      ctx.font = font(Math.max(22, W * 0.07 * scale));
      ctx.fillStyle = '#facc15';
      ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 12;
      ctx.fillText(T('Hit!', 'Kena!'), W / 2, H * 0.5);
      ctx.shadowBlur = 0;
      // stars
      ctx.fillStyle = '#fde68a';
      for (let k = 0; k < 8; k++) {
        const ang = age * 1.5 + k * Math.PI / 4;
        const rr = W * 0.12 + Math.sin(age * 4 + k) * W * 0.01;
        ctx.beginPath(); ctx.arc(W / 2 + Math.cos(ang) * rr, H * 0.47 + Math.sin(ang) * rr * 0.6, Math.max(3, W * 0.006), 0, Math.PI * 2); ctx.fill();
      }
    } else {
      ctx.font = font(Math.max(11, W * 0.022), false);
      ctx.fillStyle = 'rgba(226,232,240,0.85)';
      ctx.fillText(T('Turn the mirrors so the light hits the target', 'Putar cermin agar cahaya mengenai sasaran'), W / 2, H * 0.06);
    }
    ctx.font = font(Math.max(10, W * 0.018), false);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${T('Puzzle', 'Tekateki')} ${state.puzzle + 1}  ${state.solved.map((s) => (s ? '★' : '☆')).join(' ')}`, W * 0.02, H * 0.96);
  }

  // --- dragging -------------------------------------------------------
  let grabDX = 0, grabDY = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const rr = Math.max(14, cv.width * 0.022);
      for (let i = state.mirrors.length - 1; i >= 0; i--) {
        const e = mirrorEnds(state.mirrors[i]);
        if (Math.hypot(x - e.bx, y - e.by) < rr) return `r${i}`;
        if (Math.hypot(x - e.cx, y - e.cy) < rr) return `m${i}`;
      }
      return null;
    },
    onStart(id, x, y) {
      if (id[0] === 'm') {
        const e = mirrorEnds(state.mirrors[Number(id.slice(1))]);
        grabDX = e.cx - x; grabDY = e.cy - y;
      }
    },
    onDrag(id, x, y) {
      const m = state.mirrors[Number(id.slice(1))];
      if (!m) return;
      if (id[0] === 'm') {
        m.x = clamp((x + grabDX) / cv.width, 0.03, 0.97);
        m.y = clamp((y + grabDY) / cv.height, 0.04, 0.96);
      } else {
        const e = mirrorEnds(m);
        const ang = Math.atan2(y - e.cy, x - e.cx) * DEG;
        if (Number.isFinite(ang)) m.angle = ang;
      }
    },
    handles: () => state.mirrors.flatMap((m, i) => {
      const e = mirrorEnds(m);
      return [
        { id: `m${i}`, x: e.cx, y: e.cy, label: `Mirror ${i + 1}: move (arrow keys)` },
        { id: `r${i}`, x: e.bx, y: e.by, label: `Mirror ${i + 1}: turn (arrow keys move this end)` },
      ];
    }),
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // --- controls -------------------------------------------------------
  const puzzleBtns = PUZZLES.map((_, i) => bigBtn(`${T('Puzzle', 'Tekateki')} ${i + 1}`, () => loadPuzzle(i)));
  const resetBtn = bigBtn(T('Start again', 'Mulai lagi'), () => loadPuzzle(state.puzzle));
  const anglesT = toggle({ label: T('Show angles', 'Tampilkan sudut'), key: 'angles', value: true, onChange: (v) => { state.showAngles = v; } });
  const torchSlider = slider({
    label: T('Torch direction (°)', 'Arah senter (°)'), key: 'torch', min: -180, max: 180, step: 1, value: 0,
    format: (v) => `${v}°`,
    onInput: (v) => { state.torch.angle = v; },
  });
  ctrlPanel.append(row(...puzzleBtns), row(resetBtn, anglesT), torchSlider.el);
  loadPuzzle(0);

  const lab = labPanel({
    title: 'Angle in, angle out',
    filename: 'mirror-reflection-data.csv',
    columns: [
      { key: 'puzzle', label: 'Puzzle' },
      { key: 'mirror', label: 'Mirror' },
      { key: 'inc', label: 'Angle in (°)', format: (v) => v.toFixed(0) },
      { key: 'ref', label: 'Angle out (°)', format: (v) => v.toFixed(0) },
      { key: 'hit', label: 'Hits target?' },
    ],
    procedure: [
      'Turn on "Show angles". Make the beam hit a mirror.',
      'Read the "in" and "out" angles at the first bounce. Press Record.',
      'Turn the mirror a little and record again. Do this 5 times.',
      'Compare the two angle columns. What do you notice?',
    ],
    predict: 'If the light comes in at 20°, what angle will it leave at? Bigger, smaller or the same?',
    source: () => {
      const b = state.trace.bounces[0];
      if (!b) return null;
      return { puzzle: state.puzzle + 1, mirror: b.mirror, inc: b.inc, ref: b.ref, hit: state.trace.hit ? 'yes' : 'no' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; trace(); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
