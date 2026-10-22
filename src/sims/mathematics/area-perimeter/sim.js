import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Area and perimeter on a unit grid, for grades 4-6.
// Rectangle mode: one rectangle with four draggable corners.
// L-shape mode: two rectangles; the shaded region is their union, counted once.
// Triangle mode: half of the rectangle, cut along the diagonal.
const COLS = 12, ROWS = 8;
const CHALLENGE_TARGETS = [12, 16, 18, 20, 24, 30, 36];
const T = (en, id) => (getLocale() === 'id' ? id : en);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

const DEFAULT_RECTS = () => ({
  A: { x0: 2, y0: 2, x1: 7, y1: 5 },
  B: { x0: 5, y0: 4, x1: 8, y1: 7 },
});

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const rects = DEFAULT_RECTS();
  const state = {
    mode: 'rect',          // rect | L | tri
    fill: 0,               // how many unit squares have been "counted" so far (animation)
    shapeKey: '',          // changes whenever the shape changes -> restart counting
    walk: { on: false, dist: 0, done: false },
    challenge: null,       // { target, perims: [] }
    flash: 0,              // seconds left of the "new perimeter found" flash
    now: 0,
  };

  // ---- geometry helpers ------------------------------------------------
  const activeIds = () => (state.mode === 'L' ? ['A', 'B'] : ['A']);
  function layout() {
    const W = cv.width, H = cv.height;
    const gw = W * 0.64, gh = H * 0.92;
    const cell = Math.max(4, Math.min(gw / COLS, gh / ROWS));
    const ox = W * 0.03, oy = (H - ROWS * cell) / 2;
    return { W, H, cell, ox, oy, px: ox + COLS * cell + W * 0.03, pw: W - (ox + COLS * cell + W * 0.03) - W * 0.03 };
  }
  // 0 = empty, 1 = only A, 2 = only B, 3 = both
  function cellGrid() {
    const g = new Uint8Array(COLS * ROWS);
    activeIds().forEach((id, i) => {
      const r = rects[id];
      for (let y = r.y0; y < r.y1; y++) for (let x = r.x0; x < r.x1; x++) g[y * COLS + x] |= (1 << i);
    });
    return g;
  }
  function measure() {
    const g = cellGrid();
    let area = 0, perim = 0;
    let minX = COLS, minY = ROWS, maxX = 0, maxY = 0;
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (!g[y * COLS + x]) continue;
      area++;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x + 1);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y + 1);
      if (y === 0 || !g[(y - 1) * COLS + x]) perim++;
      if (y === ROWS - 1 || !g[(y + 1) * COLS + x]) perim++;
      if (x === 0 || !g[y * COLS + x - 1]) perim++;
      if (x === COLS - 1 || !g[y * COLS + x + 1]) perim++;
    }
    const w = Math.max(0, maxX - minX), h = Math.max(0, maxY - minY);
    if (state.mode === 'tri') {
      const hyp = Math.sqrt(w * w + h * h);
      return { g, area: (w * h) / 2, perim: w + h + hyp, hyp, w, h, exact: false };
    }
    return { g, area, perim, hyp: 0, w, h, exact: true };
  }
  // Boundary of the shaded cells as closed loops of grid points (clockwise on screen).
  function traceLoops(g) {
    const edges = [];
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (!g[y * COLS + x]) continue;
      if (y === 0 || !g[(y - 1) * COLS + x]) edges.push([x, y, x + 1, y]);
      if (x === COLS - 1 || !g[y * COLS + x + 1]) edges.push([x + 1, y, x + 1, y + 1]);
      if (y === ROWS - 1 || !g[(y + 1) * COLS + x]) edges.push([x + 1, y + 1, x, y + 1]);
      if (x === 0 || !g[y * COLS + x - 1]) edges.push([x, y + 1, x, y]);
    }
    const byStart = new Map();
    edges.forEach((e, i) => { const k = e[0] + ',' + e[1]; if (!byStart.has(k)) byStart.set(k, []); byStart.get(k).push(i); });
    const used = new Uint8Array(edges.length);
    const loops = [];
    for (let i = 0; i < edges.length; i++) {
      if (used[i]) continue;
      const loop = [[edges[i][0], edges[i][1]]];
      let cur = i, guard = 0;
      while (!used[cur] && guard++ < edges.length + 1) {
        used[cur] = 1;
        const e = edges[cur];
        loop.push([e[2], e[3]]);
        const next = (byStart.get(e[2] + ',' + e[3]) || []).find((j) => !used[j]);
        if (next == null) break;
        cur = next;
      }
      loops.push(loop);
    }
    return loops;
  }
  function trianglePts() {
    const r = rects.A;
    return [[r.x0, r.y1], [r.x1, r.y1], [r.x1, r.y0], [r.x0, r.y1]];
  }
  // The polylines (grid units) that the runner follows, one per boundary loop.
  // Two separated rectangles give two loops; the runner finishes one, then
  // jumps to the next without the gap counting as distance.
  function walkPath(m) {
    if (state.mode === 'tri') return [trianglePts()];
    return traceLoops(m.g);
  }
  function pointAt(loops, d) {
    let left = d;
    let last = [0, 0];
    for (const path of loops) {
      for (let i = 0; i < path.length - 1; i++) {
        const [ax, ay] = path[i], [bx, by] = path[i + 1];
        const len = Math.hypot(bx - ax, by - ay);
        if (len <= 0) continue;
        if (left <= len) { const f = left / len; return [ax + (bx - ax) * f, ay + (by - ay) * f]; }
        left -= len;
      }
      if (path.length) last = path[path.length - 1];
    }
    return last;
  }
  function shapeKey() {
    return state.mode + '|' + activeIds().map((id) => { const r = rects[id]; return `${r.x0},${r.y0},${r.x1},${r.y1}`; }).join('|');
  }

  // ---- per-frame update --------------------------------------------------
  function step(dt) {
    const m = measure();
    const key = shapeKey();
    if (key !== state.shapeKey) {
      state.shapeKey = key;
      state.fill = 0;
      state.walk.on = false; state.walk.dist = 0; state.walk.done = false;
    }
    const target = state.mode === 'tri' ? m.w * m.h : m.area;
    if (state.fill < target) state.fill = Math.min(target, state.fill + Math.max(14, target * 1.6) * dt);
    if (state.walk.on) {
      state.walk.dist += dt * 3;
      if (state.walk.dist >= m.perim) { state.walk.dist = m.perim; state.walk.on = false; state.walk.done = true; }
    }
    if (state.challenge && Number.isInteger(m.area) && m.area === state.challenge.target) {
      const p = Math.round(m.perim * 10) / 10;
      if (!state.challenge.perims.includes(p)) { state.challenge.perims.push(p); state.flash = 1.5; }
    }
    state.flash = Math.max(0, state.flash - dt);
    return m;
  }

  // ---- drawing -------------------------------------------------------------
  function draw(m) {
    const ctx = cv.ctx;
    const { W, H, cell, ox, oy, px, pw } = layout();
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const font = (s, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(s))}px system-ui, -apple-system, Roboto, sans-serif`;

    // Grid paper
    ctx.fillStyle = '#111c33';
    ctx.fillRect(ox, oy, COLS * cell, ROWS * cell);
    ctx.strokeStyle = 'rgba(148,163,184,0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= COLS; x++) { ctx.moveTo(ox + x * cell, oy); ctx.lineTo(ox + x * cell, oy + ROWS * cell); }
    for (let y = 0; y <= ROWS; y++) { ctx.moveTo(ox, oy + y * cell); ctx.lineTo(ox + COLS * cell, oy + y * cell); }
    ctx.stroke();

    // Shaded cells, appearing one by one (row-major) so the count is visible.
    const colors = { 1: 'rgba(56,189,248,0.78)', 2: 'rgba(167,139,250,0.78)', 3: 'rgba(52,211,153,0.85)' };
    let n = 0;
    const showNums = cell >= 22;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = font(cell * 0.42, true);
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const v = m.g[y * COLS + x];
      if (!v) continue;
      n++;
      if (n > state.fill) continue;
      const cx = ox + x * cell, cy = oy + y * cell;
      ctx.fillStyle = state.mode === 'tri' ? 'rgba(56,189,248,0.22)' : colors[v];
      ctx.fillRect(cx + 1, cy + 1, cell - 2, cell - 2);
      if (showNums && state.mode !== 'tri') {
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fillText(String(n), cx + cell / 2, cy + cell / 2);
      }
    }
    const toPx = ([gx, gy]) => [ox + gx * cell, oy + gy * cell];

    // Triangle: shade the half, draw the diagonal.
    if (state.mode === 'tri') {
      const pts = trianglePts().map(toPx);
      const frac = m.w * m.h > 0 ? state.fill / (m.w * m.h) : 1;
      ctx.fillStyle = `rgba(56,189,248,${0.15 + 0.6 * frac})`;
      ctx.beginPath(); ctx.moveTo(...pts[0]); ctx.lineTo(...pts[1]); ctx.lineTo(...pts[2]); ctx.closePath(); ctx.fill();
      const r = rects.A;
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2;
      ctx.strokeRect(ox + r.x0 * cell, oy + r.y0 * cell, (r.x1 - r.x0) * cell, (r.y1 - r.y0) * cell);
      ctx.setLineDash([]);
      // right-angle mark at the bottom-right corner
      const s = Math.min(cell * 0.4, 16);
      const [bx, by] = pts[1];
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx - s, by); ctx.lineTo(bx - s, by - s); ctx.lineTo(bx, by - s); ctx.stroke();
    }

    // Boundary (perimeter) in yellow, with a marching dash while the runner walks.
    const path = walkPath(m);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = Math.max(3, cell * 0.11);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (state.walk.on) { ctx.setLineDash([cell * 0.5, cell * 0.3]); ctx.lineDashOffset = -state.now * cell * 2; }
    for (const loop of path) {
      ctx.beginPath(); loop.forEach((p, i) => { const q = toPx(p); if (i === 0) ctx.moveTo(...q); else ctx.lineTo(...q); }); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.lineDashOffset = 0;

    // Side-length labels (whole units) on the bounding box when it is a plain rectangle.
    if (state.mode !== 'L') {
      const r = rects.A;
      ctx.fillStyle = '#fde68a'; ctx.font = font(Math.max(11, cell * 0.38), true);
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(String(r.x1 - r.x0), ox + ((r.x0 + r.x1) / 2) * cell, oy + r.y0 * cell - cell * 0.15);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(String(r.y1 - r.y0), ox + r.x0 * cell - cell * 0.2, oy + ((r.y0 + r.y1) / 2) * cell);
      if (state.mode === 'tri' && m.hyp > 0) {
        const [mx, my] = toPx([(r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2]);
        ctx.textAlign = 'left'; ctx.fillStyle = '#fde68a';
        ctx.fillText('≈ ' + m.hyp.toFixed(1), mx + cell * 0.15, my - cell * 0.2);
      }
    }

    // Runner
    if (state.walk.on || state.walk.done) {
      const [rx, ry] = toPx(pointAt(path, state.walk.dist));
      const rad = Math.max(7, cell * 0.22);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(rx, ry, rad, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = font(rad * 1.3, true);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(Math.floor(state.walk.dist + 1e-6)), rx, ry - rad * 2.2);
    }

    // Handles
    const hr = Math.max(8, cell * 0.22);
    for (const id of activeIds()) {
      const r = rects[id];
      const corners = [[r.x0, r.y0], [r.x1, r.y0], [r.x0, r.y1], [r.x1, r.y1]];
      for (const c of corners) {
        const [hx, hy] = toPx(c);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = id === 'A' ? '#0284c7' : '#7c3aed'; ctx.lineWidth = 3; ctx.stroke();
      }
      // move handle in the middle
      const [mx, my] = toPx([(r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2]);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(mx, my, hr * 1.1, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mx - hr * 0.7, my); ctx.lineTo(mx + hr * 0.7, my);
      ctx.moveTo(mx, my - hr * 0.7); ctx.lineTo(mx, my + hr * 0.7);
      ctx.stroke();
      if (state.mode === 'L') {
        ctx.fillStyle = '#0b1220'; ctx.font = font(hr * 1.1, true);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(id, mx + hr * 1.9, my);
      }
    }

    // ---- right-hand readout panel ----
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.roundRect(px, oy, pw, ROWS * cell, 12); ctx.fill();
    const pad = pw * 0.07;
    let ty = oy + pad;
    const big = Math.min(pw * 0.17, H * 0.085), small = Math.min(pw * 0.085, H * 0.045);
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';

    ctx.fillStyle = '#94a3b8'; ctx.font = font(small);
    const modeName = state.mode === 'rect' ? T('Rectangle', 'Persegi panjang') : state.mode === 'L' ? T('L-shape', 'Bentuk L') : T('Triangle', 'Segitiga');
    ctx.fillText(modeName, px + pad, ty); ty += small * 1.6;

    ctx.fillStyle = '#38bdf8'; ctx.font = font(small, true);
    ctx.fillText(T('AREA', 'LUAS'), px + pad, ty); ty += small * 1.3;
    ctx.fillStyle = '#fff'; ctx.font = font(big, true);
    const counted = state.mode === 'tri' ? Math.min(m.area, Math.round(state.fill) / 2) : Math.min(m.area, Math.floor(state.fill));
    const areaStr = Number.isInteger(counted) ? String(counted) : counted.toFixed(1);
    ctx.fillText(areaStr, px + pad, ty);
    const areaW = ctx.measureText(areaStr).width;
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(small);
    ctx.fillText(T('squares', 'persegi'), px + pad + areaW + big * 0.3, ty + big * 0.45);
    ty += big * 1.25;
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(small);
    if (state.mode === 'rect') ctx.fillText(`${m.w} × ${m.h} = ${m.area}`, px + pad, ty);
    else if (state.mode === 'tri') ctx.fillText(T(`half of ${m.w} × ${m.h}`, `setengah dari ${m.w} × ${m.h}`), px + pad, ty);
    else ctx.fillText(T('overlap counted once', 'tumpang tindih dihitung sekali'), px + pad, ty);
    ty += small * 2.0;

    ctx.fillStyle = '#facc15'; ctx.font = font(small, true);
    ctx.fillText(T('PERIMETER', 'KELILING'), px + pad, ty); ty += small * 1.3;
    ctx.fillStyle = '#fff'; ctx.font = font(big, true);
    const perStr = m.exact ? String(m.perim) : '≈ ' + m.perim.toFixed(1);
    ctx.fillText(perStr, px + pad, ty);
    ty += big * 1.25;
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(small);
    if (state.walk.on) ctx.fillText(T(`step ${Math.floor(state.walk.dist)} of ${m.exact ? m.perim : m.perim.toFixed(1)}`, `langkah ${Math.floor(state.walk.dist)} dari ${m.exact ? m.perim : m.perim.toFixed(1)}`), px + pad, ty);
    else if (state.walk.done) ctx.fillText(T('all the way around!', 'sudah satu putaran!'), px + pad, ty);
    else ctx.fillText(T('units around the edge', 'satuan di sekeliling tepi'), px + pad, ty);
    ty += small * 2.0;

    // Challenge box
    if (state.challenge) {
      const ch = state.challenge;
      const boxH = Math.min(oy + ROWS * cell - ty - pad, small * 6.5);
      if (boxH > small * 3) {
        ctx.fillStyle = state.flash > 0 ? 'rgba(52,211,153,0.35)' : 'rgba(250,204,21,0.12)';
        ctx.beginPath(); ctx.roundRect(px + pad * 0.5, ty, pw - pad, boxH, 10); ctx.fill();
        ctx.fillStyle = '#fde68a'; ctx.font = font(small, true);
        ctx.fillText(T(`Challenge: area ${ch.target}`, `Tantangan: luas ${ch.target}`), px + pad, ty + small * 0.5);
        ctx.fillStyle = '#fff'; ctx.font = font(small);
        const list = ch.perims.length ? ch.perims.join(', ') : '—';
        ctx.fillText(T('Perimeters found: ', 'Keliling ditemukan: ') + list, px + pad, ty + small * 1.9);
        ctx.fillStyle = ch.perims.length >= 2 ? '#6ee7b7' : '#cbd5e1';
        const msg = ch.perims.length >= 2
          ? T('Same area, different perimeter!', 'Luas sama, keliling berbeda!')
          : ch.perims.length === 1
            ? T('Now make another shape with area ' + ch.target, 'Sekarang buat bangun lain dengan luas ' + ch.target)
            : T('Build a shape with exactly this area', 'Buat bangun dengan luas tepat ini');
        ctx.fillText(msg, px + pad, ty + small * 3.3);
      }
    }
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- dragging ----------------------------------------------------------
  let grab = null;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const { cell, ox, oy } = layout();
      const hr = Math.max(12, cell * 0.3);
      for (const id of [...activeIds()].reverse()) {
        const r = rects[id];
        const corners = { tl: [r.x0, r.y0], tr: [r.x1, r.y0], bl: [r.x0, r.y1], br: [r.x1, r.y1] };
        for (const [k, [gx, gy]] of Object.entries(corners)) {
          if (Math.hypot(x - (ox + gx * cell), y - (oy + gy * cell)) <= hr) return `${id}-${k}`;
        }
      }
      for (const id of [...activeIds()].reverse()) {
        const r = rects[id];
        const gx = (x - ox) / cell, gy = (y - oy) / cell;
        if (gx > r.x0 && gx < r.x1 && gy > r.y0 && gy < r.y1) return `${id}-mv`;
      }
      return null;
    },
    onStart(id, x, y) {
      const [rid, part] = id.split('-');
      const r = rects[rid];
      // A keyboard nudge starts exactly on the handle (see handles()); a pointer
      // never lands on that exact float. Nudges then move one whole cell per
      // press, however small keyStep is compared with the cell size.
      const { cell, ox, oy } = layout();
      const hx = part === 'mv' ? (r.x0 + r.x1) / 2 : part[1] === 'l' ? r.x0 : r.x1;
      const hy = part === 'mv' ? (r.y0 + r.y1) / 2 : part[0] === 't' ? r.y0 : r.y1;
      const exact = x === ox + hx * cell && y === oy + hy * cell;
      grab = { x, y, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1, exact };
    },
    onDrag(id, x, y) {
      const { cell, ox, oy } = layout();
      const [rid, part] = id.split('-');
      const r = rects[rid];
      if (!grab) return;
      const cells = (d) => (grab.exact ? Math.sign(d) * Math.max(1, Math.round(Math.abs(d) / cell)) : Math.round(d / cell));
      if (part === 'mv') {
        const w = grab.x1 - grab.x0, h = grab.y1 - grab.y0;
        const dx = cells(x - grab.x), dy = cells(y - grab.y);
        r.x0 = clamp(grab.x0 + dx, 0, COLS - w); r.x1 = r.x0 + w;
        r.y0 = clamp(grab.y0 + dy, 0, ROWS - h); r.y1 = r.y0 + h;
        return;
      }
      const cx0 = part[1] === 'l' ? grab.x0 : grab.x1, cy0 = part[0] === 't' ? grab.y0 : grab.y1;
      const gx = clamp(grab.exact ? cx0 + cells(x - grab.x) : Math.round((x - ox) / cell), 0, COLS);
      const gy = clamp(grab.exact ? cy0 + cells(y - grab.y) : Math.round((y - oy) / cell), 0, ROWS);
      if (part[1] === 'l') r.x0 = Math.min(gx, r.x1 - 1); else r.x1 = Math.max(gx, r.x0 + 1);
      if (part[0] === 't') r.y0 = Math.min(gy, r.y1 - 1); else r.y1 = Math.max(gy, r.y0 + 1);
    },
    onEnd() { grab = null; },
    handles: () => {
      const { cell, ox, oy } = layout();
      const out = [];
      for (const id of activeIds()) {
        const r = rects[id];
        const name = state.mode === 'L' ? `rectangle ${id}` : 'shape';
        out.push({ id: `${id}-tl`, x: ox + r.x0 * cell, y: oy + r.y0 * cell, label: `Top-left corner of ${name}` });
        out.push({ id: `${id}-tr`, x: ox + r.x1 * cell, y: oy + r.y0 * cell, label: `Top-right corner of ${name}` });
        out.push({ id: `${id}-bl`, x: ox + r.x0 * cell, y: oy + r.y1 * cell, label: `Bottom-left corner of ${name}` });
        out.push({ id: `${id}-br`, x: ox + r.x1 * cell, y: oy + r.y1 * cell, label: `Bottom-right corner of ${name}` });
        out.push({ id: `${id}-mv`, x: ox + ((r.x0 + r.x1) / 2) * cell, y: oy + ((r.y0 + r.y1) / 2) * cell, label: `Move ${name}` });
      }
      return out;
    },
    keyStep: 30,
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls ----------------------------------------------------------
  const modeSel = select({
    label: T('Shape', 'Bangun'),
    key: 'mode',
    options: [
      { value: 'rect', label: T('Rectangle', 'Persegi panjang') },
      { value: 'L', label: T('L-shape (two rectangles)', 'Bentuk L (dua persegi panjang)') },
      { value: 'tri', label: T('Triangle (half a rectangle)', 'Segitiga (setengah persegi panjang)') },
    ],
    value: 'rect',
    onChange: (v) => { state.mode = v; },
  });
  const walkBtn = bigBtn(T('Walk the edge', 'Jalan keliling tepi'), () => {
    state.walk.on = true; state.walk.dist = 0; state.walk.done = false;
  }, true);
  const chalBtn = bigBtn(T('Challenge', 'Tantangan'), () => {
    const pool = CHALLENGE_TARGETS.filter((t) => !state.challenge || t !== state.challenge.target);
    const target = pool[Math.floor(Math.random() * pool.length)];
    state.challenge = { target, perims: [] };
  });
  const resetBtn = bigBtn(T('Reset shape', 'Atur ulang'), () => {
    Object.assign(rects, DEFAULT_RECTS());
    state.challenge = null;
  });
  ctrlPanel.append(modeSel.el, row(walkBtn, chalBtn, resetBtn));

  const lab = labPanel({
    title: 'Area and perimeter table',
    filename: 'area-perimeter-data.csv',
    columns: [
      { key: 'shape', label: 'Shape' },
      { key: 'w', label: 'Width (units)' },
      { key: 'h', label: 'Height (units)' },
      { key: 'area', label: 'Area (squares)', format: (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1)) },
      { key: 'perimeter', label: 'Perimeter (units)', format: (v) => (Number.isInteger(v) ? String(v) : v.toFixed(1)) },
    ],
    procedure: [
      'Make a 4 by 3 rectangle. Count the squares, then press Record.',
      'Make a 6 by 2 rectangle. Record it. Is the area the same? Is the perimeter the same?',
      'Try 12 by 1. Record it. Which rectangle with area 12 has the longest perimeter?',
      'Switch to Triangle and cut the 4 by 3 rectangle in half. Record the area.',
    ],
    predict: 'Two shapes have the same area. Must they have the same perimeter? Write yes or no and why.',
    source: () => {
      const m = measure();
      if (!(m.area > 0)) return null;
      const shape = state.mode === 'rect' ? 'rectangle' : state.mode === 'L' ? 'L-shape' : 'triangle';
      return { shape, w: m.w, h: m.h, area: m.area, perimeter: Math.round(m.perim * 10) / 10 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.now = t; const m = step(dt); draw(m); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
