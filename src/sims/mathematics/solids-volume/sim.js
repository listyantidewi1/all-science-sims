import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const EDGE = '#e2e8f0', HIDDEN = 'rgba(148,163,184,0.45)', FACE = 'rgba(56,189,248,0.16)', NET_FILL = 'rgba(56,189,248,0.18)', NET_EDGE = '#38bdf8';
const N_CIRC = 48;
const PI = Math.PI;
const f2 = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));

// Volume, surface area and the printable formula steps for each solid.
export function measure(solid, p) {
  const { l, w, h, r, s, b, t } = p;
  switch (solid) {
    case 'box': return {
      V: l * w * h, A: 2 * (l * w + l * h + w * h),
      vSteps: ['V = l × w × h', `= ${f2(l)} × ${f2(w)} × ${f2(h)}`],
      aSteps: ['A = 2(lw + lh + wh)', `= 2(${f2(l * w)} + ${f2(l * h)} + ${f2(w * h)})`],
      faces: [['l×w', l * w, 2], ['l×h', l * h, 2], ['w×h', w * h, 2]],
    };
    case 'tprism': {
      const c = Math.hypot(b / 2, t);
      return {
        V: 0.5 * b * t * l, A: b * t + (b + 2 * c) * l, c,
        vSteps: ['V = ½ × b × t × L', `= ½ × ${f2(b)} × ${f2(t)} × ${f2(l)}`],
        aSteps: ['A = 2(½bt) + (b + 2c)L,  c = √((b/2)² + t²)', `= ${f2(b * t)} + (${f2(b)} + 2 × ${f2(c)}) × ${f2(l)}`],
        faces: [['½bt', 0.5 * b * t, 2], ['b×L', b * l, 1], ['c×L', c * l, 2]],
      };
    }
    case 'cylinder': return {
      V: PI * r * r * h, A: 2 * PI * r * r + 2 * PI * r * h,
      vSteps: ['V = π r² h', `= π × ${f2(r)}² × ${f2(h)}`],
      aSteps: ['A = 2πr² + 2πrh', `= ${f2(2 * PI * r * r)} + ${f2(2 * PI * r * h)}`],
      faces: [['πr²', PI * r * r, 2], ['2πr×h', 2 * PI * r * h, 1]],
    };
    case 'sphere': return {
      V: 4 / 3 * PI * r ** 3, A: 4 * PI * r * r,
      vSteps: ['V = 4⁄3 π r³', `= 4⁄3 × π × ${f2(r)}³`],
      aSteps: ['A = 4 π r²', `= 4 × π × ${f2(r)}²`],
      faces: [],
    };
    case 'pyramid': {
      const sl = Math.hypot(h, s / 2);
      return {
        V: s * s * h / 3, A: s * s + 2 * s * sl, sl,
        vSteps: ['V = ⅓ × s² × h', `= ⅓ × ${f2(s)}² × ${f2(h)}`],
        aSteps: ['A = s² + 4(½ s ℓ),  ℓ = √(h² + (s/2)²)', `= ${f2(s * s)} + 4 × ½ × ${f2(s)} × ${f2(sl)}`],
        faces: [['s²', s * s, 1], ['½sℓ', 0.5 * s * sl, 4]],
      };
    }
    case 'cone': {
      const sl = Math.hypot(h, r);
      return {
        V: PI * r * r * h / 3, A: PI * r * r + PI * r * sl, sl,
        vSteps: ['V = ⅓ π r² h', `= ⅓ × π × ${f2(r)}² × ${f2(h)}`],
        aSteps: ['A = πr² + πrℓ,  ℓ = √(h² + r²)', `= ${f2(PI * r * r)} + π × ${f2(r)} × ${f2(sl)}`],
        faces: [['πr²', PI * r * r, 1], ['πrℓ', PI * r * sl, 1]],
      };
    }
    default: return { V: 0, A: 0, vSteps: [], aSteps: [], faces: [] };
  }
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 20);

  const state = {
    solid: 'cylinder', view: '3d',
    yaw: -0.6, pitch: 0.45,
    p: { l: 6, w: 4, h: 8, r: 3, s: 5, b: 6, t: 4 },
  };
  const NAMES = {
    box: ['Rectangular prism (box)', 'Balok (prisma persegi panjang)'],
    tprism: ['Triangular prism', 'Prisma segitiga'],
    cylinder: ['Cylinder', 'Tabung'],
    sphere: ['Sphere', 'Bola'],
    pyramid: ['Square pyramid', 'Limas persegi'],
    cone: ['Cone', 'Kerucut'],
  };
  const DIMS = {
    box: ['l', 'w', 'h'], tprism: ['b', 't', 'l'], cylinder: ['r', 'h'], sphere: ['r'], pyramid: ['s', 'h'], cone: ['r', 'h'],
  };

  // ---- 3-D geometry ----------------------------------------------------
  function rot(v) {
    const [cy, sy] = [Math.cos(state.yaw), Math.sin(state.yaw)];
    const [cp, sp] = [Math.cos(state.pitch), Math.sin(state.pitch)];
    const x1 = v[0] * cy + v[2] * sy, z1 = -v[0] * sy + v[2] * cy, y1 = v[1];
    return [x1, y1 * cp - z1 * sp, y1 * sp + z1 * cp];   // z toward the viewer
  }
  function circle(y, r) { const out = []; for (let i = 0; i < N_CIRC; i++) { const a = i / N_CIRC * 2 * PI; out.push([r * Math.cos(a), y, r * Math.sin(a)]); } return out; }
  function polyhedron() {
    const { l, w, h, s, b, t } = state.p;
    if (state.solid === 'box') {
      const V = [];
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) V.push([sx * l / 2, sy * h / 2, sz * w / 2]);
      // indices: x*4 + y*2 + z (0 for -, 1 for +)
      const F = [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]];
      return { V, F };
    }
    if (state.solid === 'tprism') {
      const V = [];
      for (const sz of [-1, 1]) V.push([-b / 2, -t / 2, sz * l / 2], [b / 2, -t / 2, sz * l / 2], [0, t / 2, sz * l / 2]);
      const F = [[0, 1, 2], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]];
      return { V, F };
    }
    if (state.solid === 'pyramid') {
      const V = [[-s / 2, -h / 2, -s / 2], [s / 2, -h / 2, -s / 2], [s / 2, -h / 2, s / 2], [-s / 2, -h / 2, s / 2], [0, h / 2, 0]];
      const F = [[0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];
      return { V, F };
    }
    return null;
  }
  function boundRadius() {
    const { l, w, h, r, s, b, t } = state.p;
    switch (state.solid) {
      case 'box': return Math.hypot(l, w, h) / 2;
      case 'tprism': return Math.hypot(b, t, l) / 2;
      case 'cylinder': return Math.hypot(2 * r, h) / 2;
      case 'sphere': return r;
      case 'pyramid': return Math.hypot(s, s, h) / 2;
      case 'cone': return Math.hypot(2 * r, h) / 2;
      default: return 5;
    }
  }

  // Region used by the 3-D view / net: the left part of the canvas.
  function viewRect() { const W = cv.width, H = cv.height; return { x: 0, y: 0, w: W * 0.58, h: H }; }

  function draw3D(ctx) {
    const R = viewRect();
    const cx = R.x + R.w / 2, cy = R.y + R.h / 2 + R.h * 0.03;
    const scale = Math.min(R.w, R.h) * 0.42 / Math.max(boundRadius(), 0.1);
    const P = (v) => { const q = rot(v); return { x: cx + q[0] * scale, y: cy - q[1] * scale, z: q[2] }; };
    ctx.lineWidth = 2; ctx.lineJoin = 'round';
    const poly = polyhedron();
    if (poly) {
      const pts = poly.V.map(P);
      // outward normals: fix winding using the solid's centre (origin)
      const front = poly.F.map((f) => {
        const a = poly.V[f[0]], b2 = poly.V[f[1]], c = poly.V[f[2]];
        let n = cross(sub(b2, a), sub(c, a));
        const cen = f.reduce((acc, i) => add(acc, poly.V[i]), [0, 0, 0]).map((v) => v / f.length);
        if (dot(n, cen) < 0) n = n.map((v) => -v);
        return rot(n)[2] > 0;
      });
      // faces
      poly.F.forEach((f, i) => {
        if (!front[i]) return;
        ctx.fillStyle = FACE; ctx.beginPath();
        f.forEach((vi, k) => (k ? ctx.lineTo(pts[vi].x, pts[vi].y) : ctx.moveTo(pts[vi].x, pts[vi].y)));
        ctx.closePath(); ctx.fill();
      });
      // edges: visible if any adjacent face is front-facing
      const edges = new Map();
      poly.F.forEach((f, fi) => {
        for (let k = 0; k < f.length; k++) {
          const a = f[k], b2 = f[(k + 1) % f.length];
          const key = a < b2 ? `${a}-${b2}` : `${b2}-${a}`;
          if (!edges.has(key)) edges.set(key, { a, b: b2, vis: false });
          if (front[fi]) edges.get(key).vis = true;
        }
      });
      for (const e of edges.values()) {
        ctx.strokeStyle = e.vis ? EDGE : HIDDEN; ctx.setLineDash(e.vis ? [] : [5, 5]);
        ctx.beginPath(); ctx.moveTo(pts[e.a].x, pts[e.a].y); ctx.lineTo(pts[e.b].x, pts[e.b].y); ctx.stroke();
      }
      ctx.setLineDash([]);
      drawDimLabels3D(ctx, P);
      return;
    }
    const { r, h } = state.p;
    const strokeCircle = (c3, faceFront) => {
      const pp = c3.map(P);
      for (let i = 0; i < pp.length; i++) {
        const a = pp[i], b2 = pp[(i + 1) % pp.length];
        const vis = faceFront || (a.z + b2.z) / 2 > 0;
        ctx.strokeStyle = vis ? EDGE : HIDDEN; ctx.setLineDash(vis ? [] : [5, 5]);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b2.x, b2.y); ctx.stroke();
      }
      ctx.setLineDash([]);
      return pp;
    };
    const extremes = (pp) => { let lo = 0, hi = 0; pp.forEach((q, i) => { if (q.x < pp[lo].x) lo = i; if (q.x > pp[hi].x) hi = i; }); return [lo, hi]; };
    const fillPoly = (pp) => { ctx.fillStyle = FACE; ctx.beginPath(); pp.forEach((q, k) => (k ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y))); ctx.closePath(); ctx.fill(); };
    if (state.solid === 'cylinder') {
      const upFront = rot([0, 1, 0])[2] > 0;
      const top = circle(h / 2, r).map(P), bot = circle(-h / 2, r).map(P);
      const [lo, hi] = extremes(top);
      // side fill: front half between silhouettes
      ctx.fillStyle = FACE; ctx.beginPath();
      ctx.moveTo(top[lo].x, top[lo].y); ctx.lineTo(bot[lo].x, bot[lo].y); ctx.lineTo(bot[hi].x, bot[hi].y); ctx.lineTo(top[hi].x, top[hi].y); ctx.closePath(); ctx.fill();
      fillPoly(upFront ? top : bot);
      strokeCircle(circle(h / 2, r), upFront); strokeCircle(circle(-h / 2, r), !upFront);
      ctx.strokeStyle = EDGE;
      for (const i of [lo, hi]) { ctx.beginPath(); ctx.moveTo(top[i].x, top[i].y); ctx.lineTo(bot[i].x, bot[i].y); ctx.stroke(); }
    } else if (state.solid === 'cone') {
      const upFront = rot([0, 1, 0])[2] > 0;
      const base = circle(-h / 2, r).map(P), apex = P([0, h / 2, 0]);
      const [lo, hi] = extremes(base);
      ctx.fillStyle = FACE; ctx.beginPath(); ctx.moveTo(apex.x, apex.y); ctx.lineTo(base[lo].x, base[lo].y); ctx.lineTo(base[hi].x, base[hi].y); ctx.closePath(); ctx.fill();
      if (!upFront) fillPoly(base);
      strokeCircle(circle(-h / 2, r), !upFront);
      ctx.strokeStyle = EDGE;
      for (const i of [lo, hi]) { ctx.beginPath(); ctx.moveTo(apex.x, apex.y); ctx.lineTo(base[i].x, base[i].y); ctx.stroke(); }
      // height and slant, dashed
      const foot = P([0, -h / 2, 0]);
      ctx.strokeStyle = '#f59e0b'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(apex.x, apex.y); ctx.lineTo(foot.x, foot.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(foot.x, foot.y); ctx.lineTo(base[hi].x, base[hi].y); ctx.stroke();
      ctx.setLineDash([]);
    } else if (state.solid === 'sphere') {
      ctx.fillStyle = FACE; ctx.beginPath(); ctx.arc(cx, cy, r * scale, 0, 2 * PI); ctx.fill();
      ctx.strokeStyle = EDGE; ctx.beginPath(); ctx.arc(cx, cy, r * scale, 0, 2 * PI); ctx.stroke();
      strokeCircle(circle(0, r), false);
      const merid = []; for (let i = 0; i < N_CIRC; i++) { const a = i / N_CIRC * 2 * PI; merid.push([r * Math.cos(a), r * Math.sin(a), 0]); }
      strokeCircle(merid, false);
      const c0 = P([0, 0, 0]), rp = P([r, 0, 0]);
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c0.x, c0.y); ctx.lineTo(rp.x, rp.y); ctx.stroke();
    }
    drawDimLabels3D(ctx, P);
  }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

  function drawDimLabels3D(ctx, P) {
    const { l, w, h, r, s, b, t } = state.p;
    const fs = fontPx(0.017);
    ctx.font = `bold ${fs}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const label = (txt, v3, col = '#fbbf24') => { const q = P(v3); ctx.fillStyle = 'rgba(11,18,32,0.7)'; const wdt = ctx.measureText(txt).width + 8; ctx.fillRect(q.x - wdt / 2, q.y - fs * 0.7, wdt, fs * 1.4); ctx.fillStyle = col; ctx.fillText(txt, q.x, q.y); };
    switch (state.solid) {
      case 'box': label(`l = ${f2(l)}`, [0, -h / 2, w / 2]); label(`w = ${f2(w)}`, [l / 2, -h / 2, 0]); label(`h = ${f2(h)}`, [l / 2, 0, w / 2]); break;
      case 'tprism': label(`b = ${f2(b)}`, [0, -t / 2, l / 2]); label(`t = ${f2(t)}`, [0, 0, l / 2]); label(`L = ${f2(l)}`, [b / 2, -t / 2, 0]); break;
      case 'cylinder': label(`r = ${f2(r)}`, [r / 2, h / 2, 0]); label(`h = ${f2(h)}`, [r, 0, 0]); break;
      case 'sphere': label(`r = ${f2(r)}`, [r / 2, 0.08 * r, 0]); break;
      case 'pyramid': label(`s = ${f2(s)}`, [0, -h / 2, s / 2]); label(`h = ${f2(h)}`, [0, 0, 0]); break;
      case 'cone': label(`r = ${f2(r)}`, [r / 2, -h / 2, 0]); label(`h = ${f2(h)}`, [0, 0, 0]); label(`ℓ = ${f2(Math.hypot(h, r))}`, [r / 2, 0, 0], '#4ade80'); break;
    }
  }

  // ---- nets ----------------------------------------------------------
  // Each net is a list of shapes in cm: {type:'poly', pts:[[x,y]..], label} | {type:'circle', c:[x,y], r} | {type:'sector', c, r, a0, a1}
  function netShapes() {
    const { l, w, h, r, s, b, t } = state.p;
    const M = measure(state.solid, state.p);
    const rect = (x, y, wd, ht, label) => ({ type: 'poly', pts: [[x, y], [x + wd, y], [x + wd, y + ht], [x, y + ht]], label });
    const out = [];
    switch (state.solid) {
      case 'box': {
        // cross-shaped net: front, bottom, back, top stacked in a column; the two w×h sides attached to the bottom face
        const lw = `l×w = ${f2(l * w)}`, lhL = `l×h = ${f2(l * h)}`, wh = `w×h = ${f2(w * h)}`;
        out.push(rect(h, 0, l, h, lhL), rect(h, h, l, w, lw), rect(h, h + w, l, h, lhL), rect(h, 2 * h + w, l, w, lw),
          rect(0, h, h, w, wh), rect(h + l, h, h, w, wh));
        break;
      }
      case 'tprism': {
        const c = M.c;
        out.push(rect(0, t, b, l, `b×L = ${f2(b * l)}`), rect(b, t, c, l, `c×L = ${f2(c * l)}`), rect(b + c, t, c, l, `c×L = ${f2(c * l)}`));
        out.push({ type: 'poly', pts: [[0, t], [b, t], [b / 2, 0]], label: `½bt = ${f2(0.5 * b * t)}` });
        out.push({ type: 'poly', pts: [[0, t + l], [b, t + l], [b / 2, t + l + t]], label: `½bt = ${f2(0.5 * b * t)}` });
        break;
      }
      case 'cylinder': {
        const C = 2 * PI * r;
        out.push(rect(0, r * 2, C, h, `2πr × h = ${f2(C)} × ${f2(h)} = ${f2(C * h)}`));
        out.push({ type: 'circle', c: [C / 2, r], r, label: `πr² = ${f2(PI * r * r)}` });
        out.push({ type: 'circle', c: [C / 2, 2 * r + h + r], r, label: `πr² = ${f2(PI * r * r)}` });
        break;
      }
      case 'pyramid': {
        const sl = M.sl;
        out.push(rect(sl, sl, s, s, `s² = ${f2(s * s)}`));
        const tri = `½sℓ = ${f2(0.5 * s * sl)}`;
        out.push({ type: 'poly', pts: [[sl, sl], [sl + s, sl], [sl + s / 2, 0]], label: tri });
        out.push({ type: 'poly', pts: [[sl, sl + s], [sl + s, sl + s], [sl + s / 2, sl + s + sl]], label: tri });
        out.push({ type: 'poly', pts: [[sl, sl], [sl, sl + s], [0, sl + s / 2]], label: tri });
        out.push({ type: 'poly', pts: [[sl + s, sl], [sl + s, sl + s], [sl + s + sl, sl + s / 2]], label: tri });
        break;
      }
      case 'cone': {
        const sl = M.sl, ang = 2 * PI * r / sl;   // sector angle in radians
        // sector centred at (sl, sl) opening downward, circle attached below the arc
        const a0 = PI / 2 - ang / 2, a1 = PI / 2 + ang / 2;
        out.push({ type: 'sector', c: [sl, sl], r: sl, a0, a1, label: `πrℓ = ${f2(PI * r * sl)}` });
        out.push({ type: 'circle', c: [sl, sl + sl + r], r, label: `πr² = ${f2(PI * r * r)}` });
        break;
      }
      default: break;
    }
    return out;
  }
  function netBounds(shapes) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const take = (x, y) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
    for (const s of shapes) {
      if (s.type === 'poly') s.pts.forEach(([x, y]) => take(x, y));
      else if (s.type === 'circle') { take(s.c[0] - s.r, s.c[1] - s.r); take(s.c[0] + s.r, s.c[1] + s.r); }
      else if (s.type === 'sector') { take(s.c[0], s.c[1]); for (let k = 0; k <= 24; k++) { const a = s.a0 + (s.a1 - s.a0) * k / 24; take(s.c[0] + s.r * Math.cos(a), s.c[1] + s.r * Math.sin(a)); } }
    }
    if (!Number.isFinite(x0)) return { x0: 0, y0: 0, x1: 1, y1: 1 };
    return { x0, y0, x1, y1 };
  }
  function drawNet(ctx) {
    const R = viewRect();
    const shapes = netShapes();
    const fs = fontPx(0.014);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (!shapes.length) {
      ctx.fillStyle = '#cbd5e1'; ctx.font = `${fontPx(0.018)}px ${FONT}`;
      ctx.fillText(T('A sphere has no net:', 'Bola tidak memiliki jaring-jaring:'), R.x + R.w / 2, R.y + R.h * 0.42);
      ctx.fillText(T('it cannot be unfolded flat without stretching.', 'tidak dapat dibuka datar tanpa meregang.'), R.x + R.w / 2, R.y + R.h * 0.42 + fontPx(0.018) * 1.5);
      return;
    }
    const B = netBounds(shapes);
    const pad = fs * 2;
    const sc = Math.min((R.w - 2 * pad) / Math.max(B.x1 - B.x0, 1e-6), (R.h - 2 * pad) / Math.max(B.y1 - B.y0, 1e-6));
    const ox = R.x + (R.w - (B.x1 - B.x0) * sc) / 2 - B.x0 * sc, oy = R.y + (R.h - (B.y1 - B.y0) * sc) / 2 - B.y0 * sc;
    const X = (x) => ox + x * sc, Y = (y) => oy + y * sc;
    ctx.lineWidth = 1.5; ctx.font = `${fs}px ${FONT}`;
    for (const s of shapes) {
      ctx.fillStyle = NET_FILL; ctx.strokeStyle = NET_EDGE;
      let lx, ly;
      if (s.type === 'poly') {
        ctx.beginPath(); s.pts.forEach(([x, y], k) => (k ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)))); ctx.closePath(); ctx.fill(); ctx.stroke();
        lx = X(s.pts.reduce((a, p) => a + p[0], 0) / s.pts.length); ly = Y(s.pts.reduce((a, p) => a + p[1], 0) / s.pts.length);
      } else if (s.type === 'circle') {
        ctx.beginPath(); ctx.arc(X(s.c[0]), Y(s.c[1]), s.r * sc, 0, 2 * PI); ctx.fill(); ctx.stroke();
        lx = X(s.c[0]); ly = Y(s.c[1]);
      } else {
        ctx.beginPath(); ctx.moveTo(X(s.c[0]), Y(s.c[1])); ctx.arc(X(s.c[0]), Y(s.c[1]), s.r * sc, s.a0, s.a1); ctx.closePath(); ctx.fill(); ctx.stroke();
        const am = (s.a0 + s.a1) / 2;
        lx = X(s.c[0] + s.r * 0.6 * Math.cos(am)); ly = Y(s.c[1] + s.r * 0.6 * Math.sin(am));
        ctx.fillStyle = '#4ade80'; ctx.font = `${fs}px ${FONT}`;
        ctx.fillText(`ℓ = ${f2(s.r)}`, X(s.c[0] + s.r * 0.5 * Math.cos(s.a0)) - fs * 1.5, Y(s.c[1] + s.r * 0.5 * Math.sin(s.a0)));
        ctx.font = `${fs}px ${FONT}`;
      }
      if (s.label) {
        ctx.fillStyle = '#f8fafc';
        const lines = s.label.split(' = ').length > 2 ? [s.label.split(' = ')[0] + ' =', s.label.split(' = ').slice(1).join(' = ')] : [s.label];
        lines.forEach((ln, k) => ctx.fillText(ln, lx, ly + (k - (lines.length - 1) / 2) * fs * 1.2));
      }
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fontPx(0.012)}px ${FONT}`; ctx.textBaseline = 'bottom';
    ctx.fillText(T('net: every face laid flat (areas in cm²)', 'jaring-jaring: setiap sisi dibuka datar (luas dalam cm²)'), R.x + R.w / 2, R.y + R.h - 4);
  }

  // ---- text panel --------------------------------------------------------
  function drawPanel(ctx) {
    const W = cv.width, H = cv.height;
    const R = viewRect();
    const x0 = R.w + W * 0.02, maxW = W - x0 - W * 0.015;
    const M = measure(state.solid, state.p);
    const fs = fontPx(0.017), fh = fontPx(0.02), lh = fs * 1.45;
    ctx.fillStyle = 'rgba(15,23,42,0.75)';
    ctx.fillRect(R.w, 0, W - R.w, H);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    let y = H * 0.04;
    const put = (txt, col = '#e2e8f0', bold = false, size = fs) => {
      ctx.font = `${bold ? 'bold ' : ''}${size}px ${FONT}`; ctx.fillStyle = col;
      // wrap on spaces when too wide
      const words = String(txt).split(' '); let line = '';
      for (const wd of words) {
        const test = line ? line + ' ' + wd : wd;
        if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x0, y); y += size * 1.3; line = wd; }
        else line = test;
      }
      ctx.fillText(line, x0, y); y += lh;
    };
    put(T(NAMES[state.solid][0], NAMES[state.solid][1]), '#38bdf8', true, fh);
    const dimTxt = DIMS[state.solid].map((k) => `${k === 'l' && state.solid === 'tprism' ? 'L' : k} = ${f2(state.p[k])} cm`).join(',  ');
    put(dimTxt, '#fbbf24');
    y += lh * 0.3;
    put(T('Volume', 'Volume'), '#a5b4fc', true);
    for (const s of M.vSteps) put(s, '#e2e8f0');
    put(`= ${M.V.toFixed(2)} cm³`, '#4ade80', true);
    y += lh * 0.3;
    put(T('Surface area', 'Luas permukaan'), '#a5b4fc', true);
    for (const s of M.aSteps) put(s, '#e2e8f0');
    put(`= ${M.A.toFixed(2)} cm²`, '#4ade80', true);
    if (M.faces.length && y < H - lh * 2) {
      y += lh * 0.3;
      put(T('Faces in the net:', 'Sisi pada jaring-jaring:'), '#94a3b8');
      for (const [name, area, count] of M.faces) {
        if (y > H - lh) break;
        put(`${count} × ${name} = ${count} × ${f2(area)} = ${f2(count * area)}`, '#cbd5e1', false, fontPx(0.015));
      }
    }
    ctx.fillStyle = '#64748b'; ctx.font = `${fontPx(0.012)}px ${FONT}`; ctx.textBaseline = 'bottom';
    ctx.fillText(state.view === '3d' ? T('drag the solid to rotate it', 'seret bangun untuk memutarnya') : T('net view · switch back to 3-D to rotate', 'tampilan jaring-jaring · kembali ke 3-D untuk memutar'), x0, H - 4);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (state.view === '3d') draw3D(ctx); else drawNet(ctx);
    drawPanel(ctx);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.setLineDash([]);
  }

  // ---- rotation drag ------------------------------------------------------
  let start = null;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) { const R = viewRect(); return state.view === '3d' && x >= R.x && x <= R.x + R.w && y >= R.y && y <= R.y + R.h ? 'rot' : null; },
    onStart(id, x, y) { start = { x, y, yaw: state.yaw, pitch: state.pitch }; },
    onDrag(id, x, y) {
      if (!start) return;
      const k = 2.4 / Math.max(cv.width, 1);   // radians per px, scaled to the canvas
      state.yaw = start.yaw + (x - start.x) * k * 2;
      state.pitch = clamp(start.pitch + (y - start.y) * k * 2, -PI / 2 + 0.05, PI / 2 - 0.05);
    },
    onEnd() { start = null; },
    handles: () => (state.view === '3d' ? [{ id: 'rot', x: viewRect().w / 2, y: viewRect().h / 2, label: 'Rotate the solid (arrow keys)' }] : []),
    keyStep: 12,
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls -------------------------------------------------------------
  const solidSel = select({
    label: 'Solid', key: 'solid', value: state.solid,
    options: [
      { value: 'box', label: 'Rectangular prism (box)' },
      { value: 'tprism', label: 'Triangular prism' },
      { value: 'cylinder', label: 'Cylinder' },
      { value: 'sphere', label: 'Sphere' },
      { value: 'pyramid', label: 'Square pyramid' },
      { value: 'cone', label: 'Cone' },
    ],
    onChange: (v) => { state.solid = v; showSliders(); },
  });
  const viewSel = select({
    label: 'View', key: 'view', value: '3d',
    options: [{ value: '3d', label: '3-D wireframe (drag to rotate)' }, { value: 'net', label: 'Net (unfolded faces)' }],
    onChange: (v) => { state.view = v; },
  });
  const sliders = {};
  const mk = (k, label) => { sliders[k] = slider({ label, key: k, min: 1, max: 12, step: 0.5, value: state.p[k], format: (v) => f2(v), onInput: (v) => { state.p[k] = v; } }); return sliders[k].el; };
  const sliderBox = document.createElement('div');
  sliderBox.append(mk('l', 'Length l / L (cm)'), mk('w', 'Width w (cm)'), mk('h', 'Height h (cm)'), mk('r', 'Radius r (cm)'), mk('s', 'Base side s (cm)'), mk('b', 'Triangle base b (cm)'), mk('t', 'Triangle height t (cm)'));
  function showSliders() { const on = DIMS[state.solid]; for (const k of Object.keys(sliders)) sliders[k].el.style.display = on.includes(k) ? '' : 'none'; }
  showSliders();
  const resetB = button({ label: 'Reset view', onClick: () => { state.yaw = -0.6; state.pitch = 0.45; } });
  ctrlPanel.append(solidSel.el, viewSel.el, sliderBox, row(resetB));

  const lab = labPanel({
    title: 'Volume and surface area of solids',
    filename: 'solids-volume-data.csv',
    columns: [
      { key: 'solid', label: 'Solid' },
      { key: 'dims', label: 'Dimensions (cm)' },
      { key: 'V', label: 'V (cm³)', format: (v) => v.toFixed(2) },
      { key: 'A', label: 'A (cm²)', format: (v) => v.toFixed(2) },
      { key: 'ratio', label: 'A / V (1/cm)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Choose the box and set l = w = h = 4 cm. Record. Then set all three to 8 cm and Record. Compare V and A.',
      'Choose the cylinder with r = 3, h = 6 and Record. Choose the cone with the same r and h and Record. Divide the two volumes.',
      'Choose the sphere with r = 3 and Record. Compare with the cylinder r = 3, h = 6 from step 2.',
      'Choose the square pyramid, keep s = 6 and record h = 2, 4, 8. Which grows faster, V or A?',
    ],
    predict: 'If every dimension of a solid is doubled, by what factor will V change? And A? Write your guess before measuring.',
    source: () => {
      const M = measure(state.solid, state.p);
      return {
        solid: NAMES[state.solid][0],
        dims: DIMS[state.solid].map((k) => `${k} = ${f2(state.p[k])}`).join('; '),
        V: M.V, A: M.A, ratio: M.V > 0 ? M.A / M.V : 0,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
