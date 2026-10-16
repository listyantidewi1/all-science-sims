import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const COLORS = ['#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];
const EPS = 1e-7;

const fmt = (v, d = 2) => (Number.isFinite(v) ? (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(d)) : '—');

// Clip a convex polygon by the half-plane a·x + b·y ≤ c (Sutherland–Hodgman).
function clip(poly, a, b, c) {
  const out = [];
  const inside = (p) => a * p.x + b * p.y <= c + EPS;
  for (let i = 0; i < poly.length; i++) {
    const P = poly[i], Q = poly[(i + 1) % poly.length];
    const pin = inside(P), qin = inside(Q);
    if (pin) out.push(P);
    if (pin !== qin) {
      const fP = a * P.x + b * P.y - c, fQ = a * Q.x + b * Q.y - c;
      const t = fP / (fP - fQ);
      if (Number.isFinite(t)) out.push({ x: P.x + t * (Q.x - P.x), y: P.y + t * (Q.y - P.y) });
    }
  }
  // drop duplicate vertices
  return out.filter((p, i) => { const q = out[(i + 1) % out.length]; return Math.hypot(p.x - q.x, p.y - q.y) > 1e-6 || out.length === 1; });
}

const PRESETS = {
  custom: null,
  bakery: {
    cons: [
      { on: true, a: 2, b: 3, c: 114 },   // flour (hundreds of g): 200 g per bread, 300 g per cake
      { on: true, a: 1, b: 2, c: 70 },    // sugar (tens of g)
      { on: true, a: 1, b: 1, c: 48 },    // oven slots
      { on: false, a: 1, b: 0, c: 40 },
    ],
    p: 3, q: 5, goal: 'max',
  },
  default: {
    cons: [
      { on: true, a: 1, b: 2, c: 16 },
      { on: true, a: 3, b: 1, c: 18 },
      { on: false, a: 1, b: 1, c: 10 },
      { on: false, a: 1, b: -1, c: 4 },
    ],
    p: 2, q: 3, goal: 'max',
  },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const st = {
    cons: PRESETS.default.cons.map((c) => ({ ...c })),
    p: 2, q: 3, goal: 'max', preset: 'custom',
    zLevel: 12,
  };
  let plot = { x0: 0, y0: 0, s: 1, R: 10 };
  let result = { poly: [], corners: [], best: null, unbounded: false };

  function windowSize() {
    let R = 5;
    for (const c of st.cons) {
      if (!c.on) continue;
      if (c.a > 0) R = Math.max(R, c.c / c.a);
      if (c.b > 0) R = Math.max(R, c.c / c.b);
    }
    return Math.min(400, R * 1.15);
  }
  function solve() {
    const R = windowSize();
    const BIG = R * 4;
    let poly = [{ x: 0, y: 0 }, { x: BIG, y: 0 }, { x: BIG, y: BIG }, { x: 0, y: BIG }];
    for (const c of st.cons) {
      if (!c.on) continue;
      if (Math.abs(c.a) < EPS && Math.abs(c.b) < EPS) { if (c.c < 0) poly = []; continue; }
      poly = clip(poly, c.a, c.b, c.c);
      if (poly.length < 3) { poly = []; break; }
    }
    const unbounded = poly.some((v) => v.x > BIG - 1e-6 || v.y > BIG - 1e-6);
    const corners = poly.map((v) => {
      const tight = [];
      if (Math.abs(v.x) < 1e-6) tight.push('x=0');
      if (Math.abs(v.y) < 1e-6) tight.push('y=0');
      st.cons.forEach((c, i) => { if (c.on && Math.abs(c.a * v.x + c.b * v.y - c.c) < 1e-6 * Math.max(1, Math.abs(c.c))) tight.push(`C${i + 1}`); });
      return { x: v.x, y: v.y, z: st.p * v.x + st.q * v.y, tight, edge: v.x > BIG - 1e-6 || v.y > BIG - 1e-6 };
    });
    let best = null;
    for (const k of corners) {
      if (k.edge) continue;
      if (!best || (st.goal === 'max' ? k.z > best.z + 1e-9 : k.z < best.z - 1e-9)) best = k;
    }
    result = { poly, corners, best, unbounded, R };
  }

  const toPx = (x) => plot.x0 + (x / plot.R) * plot.s;
  const toPy = (y) => plot.y0 - (y / plot.R) * plot.s;
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px) => `${Math.round(px)}px ui-monospace, Menlo, Consolas, monospace`;

  // Two points where the line a·x + b·y = c crosses the window box [0,R]².
  function lineInBox(a, b, c, R) {
    const pts = [];
    const add = (x, y) => { if (x >= -1e-9 && x <= R + 1e-9 && y >= -1e-9 && y <= R + 1e-9) pts.push({ x, y }); };
    if (Math.abs(b) > EPS) { add(0, c / b); add(R, (c - a * R) / b); }
    if (Math.abs(a) > EPS) { add(c / a, 0); add((c - b * R) / a, R); }
    const uniq = [];
    for (const q of pts) if (!uniq.some((u) => Math.hypot(u.x - q.x, u.y - q.y) < 1e-6)) uniq.push(q);
    return uniq.length >= 2 ? [uniq[0], uniq[1]] : null;
  }
  // A point on the level line, as close as possible to the window centre (used as the drag handle).
  function levelHandle() {
    const R = plot.R, { p, q } = st;
    const n2 = p * p + q * q;
    if (n2 < EPS) return null;
    const cx = R / 2, cy = R / 2;
    const t = (st.zLevel - p * cx - q * cy) / n2;
    let hx = cx + p * t, hy = cy + q * t;
    const seg = lineInBox(p, q, st.zLevel, R);
    if (!seg) return null;
    // clamp the handle to the visible segment
    const dx = seg[1].x - seg[0].x, dy = seg[1].y - seg[0].y, L2 = dx * dx + dy * dy || 1;
    const u = Math.max(0, Math.min(1, ((hx - seg[0].x) * dx + (hy - seg[0].y) * dy) / L2));
    hx = seg[0].x + u * dx; hy = seg[0].y + u * dy;
    return { x: hx, y: hy };
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    solve();
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = Math.max(9, Math.min(13, W * 0.016));
    const side = Math.min(H * 0.86, W * 0.55);
    const left = W * 0.06, top = (H - side) / 2 + fs * 0.4;
    plot = { x0: left, y0: top + side, s: side, R: result.R };
    const R = plot.R;
    const isBakery = st.preset === 'bakery';
    const xName = isBakery ? T('bread (x)', 'roti (x)') : 'x';
    const yName = isBakery ? T('cake (y)', 'kue (y)') : 'y';

    // grid + axes
    ctx.save();
    ctx.beginPath(); ctx.rect(left, top, side, side); ctx.clip();
    ctx.fillStyle = '#0f172a'; ctx.fillRect(left, top, side, side);
    const stepG = R <= 12 ? 1 : R <= 30 ? 5 : R <= 120 ? 10 : 50;
    ctx.strokeStyle = 'rgba(148,163,184,0.12)'; ctx.lineWidth = 1;
    for (let g = stepG; g <= R; g += stepG) {
      ctx.beginPath(); ctx.moveTo(toPx(g), top); ctx.lineTo(toPx(g), top + side); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, toPy(g)); ctx.lineTo(left + side, toPy(g)); ctx.stroke();
    }
    // feasible region
    if (result.poly.length >= 3) {
      ctx.fillStyle = 'rgba(52,211,153,0.25)';
      ctx.beginPath();
      result.poly.forEach((v, i) => { if (i === 0) ctx.moveTo(toPx(v.x), toPy(v.y)); else ctx.lineTo(toPx(v.x), toPy(v.y)); });
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(52,211,153,0.9)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    // constraint lines
    st.cons.forEach((c, i) => {
      if (!c.on) return;
      const seg = lineInBox(c.a, c.b, c.c, R);
      if (!seg) return;
      ctx.strokeStyle = COLORS[i]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(toPx(seg[0].x), toPy(seg[0].y)); ctx.lineTo(toPx(seg[1].x), toPy(seg[1].y)); ctx.stroke();
      // small ticks pointing to the feasible side
      const n = Math.hypot(c.a, c.b) || 1, nx = -c.a / n, ny = -c.b / n;
      for (let k = 1; k <= 3; k++) {
        const u = k / 4, x = seg[0].x + u * (seg[1].x - seg[0].x), y = seg[0].y + u * (seg[1].y - seg[0].y);
        ctx.beginPath(); ctx.moveTo(toPx(x), toPy(y)); ctx.lineTo(toPx(x) + nx * 9, toPy(y) - ny * 9); ctx.stroke();
      }
      ctx.fillStyle = COLORS[i]; ctx.font = font(fs * 0.85, true);
      const mid = { x: (seg[0].x + seg[1].x) / 2, y: (seg[0].y + seg[1].y) / 2 };
      ctx.fillText(`C${i + 1}`, toPx(mid.x) + 6, toPy(mid.y) - 6);
    });
    // level line of the objective
    const seg = lineInBox(st.p, st.q, st.zLevel, R);
    if (seg) {
      ctx.setLineDash([7, 5]); ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(toPx(seg[0].x), toPy(seg[0].y)); ctx.lineTo(toPx(seg[1].x), toPy(seg[1].y)); ctx.stroke();
      ctx.setLineDash([]);
    }
    const hd = levelHandle();
    if (hd) {
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(toPx(hd.x), toPy(hd.y), 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = mono(fs * 0.9); ctx.fillStyle = '#fde68a'; ctx.textAlign = 'left';
      ctx.fillText(`z = ${fmt(st.zLevel, 1)}`, toPx(hd.x) + 10, toPy(hd.y) - 8);
    }
    // corners
    result.corners.forEach((k) => {
      if (k.edge) return;
      const isBest = result.best === k;
      ctx.fillStyle = isBest ? '#fbbf24' : '#e2e8f0';
      ctx.beginPath(); ctx.arc(toPx(k.x), toPy(k.y), isBest ? 7 : 4.5, 0, Math.PI * 2); ctx.fill();
      if (isBest) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(toPx(k.x), toPy(k.y), 11, 0, Math.PI * 2); ctx.stroke(); }
      ctx.font = mono(fs * 0.85); ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left';
      ctx.fillText(`(${fmt(k.x, 1)}, ${fmt(k.y, 1)})`, toPx(k.x) + 8, toPy(k.y) + fs * 1.1);
    });
    ctx.restore();
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1.2; ctx.strokeRect(left, top, side, side);
    ctx.fillStyle = '#94a3b8'; ctx.font = mono(fs * 0.85); ctx.textAlign = 'center';
    for (let g = 0; g <= R; g += stepG) {
      ctx.fillText(String(g), toPx(g), top + side + fs * 1.1);
      ctx.textAlign = 'right'; ctx.fillText(String(g), left - 4, toPy(g) + fs * 0.35); ctx.textAlign = 'center';
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.9);
    ctx.fillText(xName, left + side / 2, top + side + fs * 2.3);
    ctx.save(); ctx.translate(left - fs * 2.6, top + side / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(yName, 0, 0); ctx.restore();

    // ---- right panel ----
    const px = left + side + W * 0.03, pw = W - px - W * 0.02;
    let yy = top - fs * 0.6;
    const line = (txt, color = '#e2e8f0', bold = false, m = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = m ? mono(fs) : font(fs, bold); ctx.textAlign = 'left';
      ctx.fillText(txt, px, yy += fs * gap, pw);
    };
    line(T('Constraints', 'Kendala') + '  (x ≥ 0, y ≥ 0)', '#e2e8f0', true, false, 1.2);
    st.cons.forEach((c, i) => {
      if (!c.on) return;
      line(`C${i + 1}: ${fmt(c.a)}x + ${fmt(c.b)}y ≤ ${fmt(c.c)}`, COLORS[i], false, true, 1.35);
    });
    if (isBakery) line(T('C1 flour, C2 sugar, C3 oven time', 'C1 tepung, C2 gula, C3 waktu oven'), '#94a3b8', false, false, 1.3);
    yy += fs * 0.4;
    line(`${T('Objective', 'Fungsi tujuan')}: z = ${fmt(st.p)}x + ${fmt(st.q)}y  →  ${st.goal === 'max' ? T('maximise', 'maksimum') : T('minimise', 'minimum')}`, '#fbbf24', true, false, 1.4);
    line(T('Level line (dashed): drag it; z grows toward the arrow (p, q).', 'Garis selidik (putus-putus): seret; z naik searah (p, q).'), '#94a3b8', false, false, 1.3);
    yy += fs * 0.4;
    line(T('Corner points', 'Titik pojok'), '#e2e8f0', true, false, 1.4);
    if (result.poly.length < 3) line(T('No feasible region: constraints contradict.', 'Tidak ada daerah penyelesaian: kendala bertentangan.'), '#f87171');
    const sorted = result.corners.filter((k) => !k.edge).slice().sort((u, v) => (st.goal === 'max' ? v.z - u.z : u.z - v.z));
    sorted.forEach((k) => {
      const isBest = result.best === k;
      line(`${isBest ? '★ ' : '   '}(${fmt(k.x, 1)}, ${fmt(k.y, 1)})  z = ${fmt(k.z, 1)}   ${k.tight.join('∩')}`, isBest ? '#fbbf24' : '#cbd5e1', isBest, true, 1.35);
    });
    if (result.unbounded) line(T('Region is unbounded (open on one side).', 'Daerah tak terbatas (terbuka di satu sisi).'), '#f87171', false, false, 1.4);
    if (result.best) {
      yy += fs * 0.3;
      line(`${T('Optimum', 'Optimum')}: z* = ${fmt(result.best.z, 1)} ${T('at', 'di')} (${fmt(result.best.x, 1)}, ${fmt(result.best.y, 1)})`, '#fbbf24', true, false, 1.5);
      if (isBakery) line(`${fmt(result.best.x, 1)} ${T('loaves', 'roti')} + ${fmt(result.best.y, 1)} ${T('cakes → profit Rp', 'kue → laba Rp')} ${fmt(result.best.z, 1)}k`, '#fde68a', false, false, 1.3);
    }
    ctx.textAlign = 'left';
  }

  // ---- drag the level line ----
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const h = levelHandle();
      return h && Math.hypot(x - toPx(h.x), y - toPy(h.y)) < 18 ? 'level' : null;
    },
    onDrag(id, x, y) {
      const wx = ((x - plot.x0) / plot.s) * plot.R, wy = ((plot.y0 - y) / plot.s) * plot.R;
      st.zLevel = Math.round((st.p * wx + st.q * wy) * 10) / 10;
    },
    handles: () => { const h = levelHandle(); return h ? [{ id: 'level', x: toPx(h.x), y: toPy(h.y), label: `Objective level line, z = ${fmt(st.zLevel, 1)} (drag)` }] : []; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- controls ----
  const consCtl = [];
  const presetS = select({
    label: 'Preset', key: 'preset', value: 'custom',
    options: [{ value: 'custom', label: 'Custom constraints' }, { value: 'bakery', label: 'Bakery: bread & cake (flour, sugar, oven)' }],
    onChange: (v) => { st.preset = v; if (v === 'bakery') applyPreset(PRESETS.bakery); },
  });
  const goalS = select({
    label: 'Goal', key: 'goal', value: st.goal,
    options: [{ value: 'max', label: 'Maximise z' }, { value: 'min', label: 'Minimise z' }],
    onChange: (v) => { st.goal = v; },
  });
  const pS = slider({ label: 'Objective p (coefficient of x)', key: 'p', min: -10, max: 10, step: 0.5, value: st.p, format: (v) => v.toFixed(1), onInput: (v) => { st.p = v; } });
  const qS = slider({ label: 'Objective q (coefficient of y)', key: 'q', min: -10, max: 10, step: 0.5, value: st.q, format: (v) => v.toFixed(1), onInput: (v) => { st.q = v; } });
  const snapB = button({ label: 'Move level line to optimum', primary: true, onClick: () => { if (result.best) st.zLevel = result.best.z; } });
  ctrlPanel.append(presetS.el, goalS.el, pS.el, qS.el, row(snapB));
  st.cons.forEach((c, i) => {
    const on = toggle({ label: `Constraint C${i + 1} on`, key: `c${i + 1}`, value: c.on, onChange: (v) => { st.cons[i].on = v; markCustom(); } });
    const a = slider({ label: `C${i + 1}: a (x coeff)`, key: `a${i + 1}`, min: -10, max: 10, step: 0.5, value: c.a, format: (v) => v.toFixed(1), onInput: (v) => { st.cons[i].a = v; markCustom(); } });
    const b = slider({ label: `C${i + 1}: b (y coeff)`, key: `b${i + 1}`, min: -10, max: 10, step: 0.5, value: c.b, format: (v) => v.toFixed(1), onInput: (v) => { st.cons[i].b = v; markCustom(); } });
    const cc = slider({ label: `C${i + 1}: c (≤ c)`, key: `k${i + 1}`, min: -50, max: 200, step: 1, value: c.c, onInput: (v) => { st.cons[i].c = v; markCustom(); } });
    consCtl.push({ on, a, b, cc });
    ctrlPanel.append(row(on), a.el, b.el, cc.el);
  });
  let applying = false;
  function markCustom() { if (!applying && st.preset === 'bakery') { st.preset = 'custom'; presetS.value = 'custom'; } }
  function applyPreset(P) {
    applying = true;
    P.cons.forEach((c, i) => { consCtl[i].on.apply(c.on); consCtl[i].a.apply(c.a); consCtl[i].b.apply(c.b); consCtl[i].cc.apply(c.c); });
    pS.apply(P.p); qS.apply(P.q); goalS.apply(P.goal);
    applying = false;
    solve();
    st.zLevel = result.best ? Math.round(result.best.z * 0.6) : 10;
  }

  const lab = labPanel({
    title: 'Linear programming lab — corners and the optimum',
    filename: 'linear-programming-data.csv',
    columns: [
      { key: 'constraints', label: 'Constraints' },
      { key: 'objective', label: 'Objective' },
      { key: 'corner', label: 'Optimal corner (x, y)' },
      { key: 'z', label: 'z*', format: (v) => fmt(v, 2) },
      { key: 'level', label: 'level line z', format: (v) => fmt(v, 2) },
    ],
    procedure: [
      'Start with the default two constraints. List every corner from the panel and record the optimum.',
      'Drag the level line slowly upward. Note the last corner it touches before leaving the region. Does it match the star?',
      'Change q from 3 to 1 and record again. Which corner wins now, and why did it move?',
      'Switch to Minimise z and record. Where is the minimum of a positive objective over this region?',
      'Load the bakery preset and record. Then lower the sugar limit (C2: c) to 50 and record the new plan.',
    ],
    predict: 'Can the maximum of z = 2x + 3y over a polygon ever occur strictly inside the region, not on its boundary? Explain before testing.',
    source: () => {
      if (!result.best) return null;
      const cons = st.cons.filter((c) => c.on).map((c) => `${fmt(c.a)}x+${fmt(c.b)}y<=${fmt(c.c)}`).join('; ');
      return {
        constraints: cons,
        objective: `${st.goal} ${fmt(st.p)}x+${fmt(st.q)}y`,
        corner: `(${fmt(result.best.x, 2)}, ${fmt(result.best.y, 2)})`,
        z: result.best.z,
        level: st.zLevel,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  solve();
  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
