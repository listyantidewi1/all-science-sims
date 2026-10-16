import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const COLS = 8, ROWS = 6;
const RIVER_COL = 4, BRIDGE_ROW = 3;
const STEP_TIME = 0.28; // seconds per square

const PLACES = {
  home: { x: 1, y: 1, en: 'Home', id: 'Rumah' },
  school: { x: 6, y: 1, en: 'School', id: 'Sekolah' },
  market: { x: 1, y: 4, en: 'Market', id: 'Pasar' },
  mosque: { x: 7, y: 4, en: 'Mosque', id: 'Masjid' },
};
const PUZZLES = [
  { start: 'home', target: 'market' },
  { start: 'home', target: 'school' },
  { start: 'market', target: 'mosque' },
];
const DIRS = {
  N: { dx: 0, dy: -1, en: 'North', id: 'Utara', short: ['N', 'U'], arrow: '↑' },
  E: { dx: 1, dy: 0, en: 'East', id: 'Timur', short: ['E', 'T'], arrow: '→' },
  S: { dx: 0, dy: 1, en: 'South', id: 'Selatan', short: ['S', 'S'], arrow: '↓' },
  W: { dx: -1, dy: 0, en: 'West', id: 'Barat', short: ['W', 'B'], arrow: '←' },
};
const EIGHT_EN = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
const EIGHT_ID = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
const EIGHT_SHORT_EN = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const EIGHT_SHORT_ID = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'];
const TREES = [[3, 0], [0, 5], [3, 5], [6, 5], [7, 0], [0, 3], [6, 3], [2, 2]];

const isRiver = (x, y) => x === RIVER_COL && y !== BRIDGE_ROW;
const inMap = (x, y) => x >= 0 && x < COLS && y >= 0 && y < ROWS;

// Fewest steps from a to b walking only on land (breadth-first search).
function shortest(a, b) {
  const seen = new Set([`${a.x},${a.y}`]);
  let frontier = [[a.x, a.y]], d = 0;
  while (frontier.length) {
    const next = [];
    for (const [x, y] of frontier) {
      if (x === b.x && y === b.y) return d;
      for (const k of Object.keys(DIRS)) {
        const nx = x + DIRS[k].dx, ny = y + DIRS[k].dy, key = `${nx},${ny}`;
        if (inMap(nx, ny) && !isRiver(nx, ny) && !seen.has(key)) { seen.add(key); next.push([nx, ny]); }
      }
    }
    frontier = next; d++;
    if (d > COLS * ROWS) break;
  }
  return -1;
}

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = {
    puzzle: 0, start: 'home', target: 'market',
    pos: { x: 1, y: 1 },          // logical square
    drawPos: { x: 1, y: 1 },      // animated position
    queue: [], moving: null,      // pending steps, current step {from, to, t}
    route: [],                    // [{dir, n}]
    steps: 0, reached: false, reachedAt: -1, stepsPer: 1,
    message: null, messageUntil: -1,
  };
  let now = 0;

  function loadPuzzle(i) {
    const p = PUZZLES[i];
    state.puzzle = i; state.start = p.start; state.target = p.target;
    const s = PLACES[p.start];
    state.pos = { x: s.x, y: s.y }; state.drawPos = { x: s.x, y: s.y };
    state.queue = []; state.moving = null; state.route = []; state.steps = 0;
    state.reached = false; state.reachedAt = -1; state.message = null;
    puzzleBtns.forEach((b, k) => b.el.classList.toggle('btn--primary', k === i));
  }

  function say(en, id, secs = 2) { state.message = T(en, id); state.messageUntil = now + secs; }

  function move(dirKey) {
    if (state.reached) return;
    const n = state.stepsPer;
    for (let k = 0; k < n; k++) state.queue.push(dirKey);
    const last = state.route[state.route.length - 1];
    if (last && last.dir === dirKey) last.n += n; else state.route.push({ dir: dirKey, n });
  }

  function undo() {
    if (state.moving || state.queue.length) return;
    const last = state.route[state.route.length - 1];
    if (!last) return;
    const d = DIRS[last.dir];
    // walk back the whole last move
    for (let k = 0; k < last.n; k++) {
      const nx = state.pos.x - d.dx, ny = state.pos.y - d.dy;
      if (inMap(nx, ny)) { state.pos = { x: nx, y: ny }; state.steps = Math.max(0, state.steps - 1); }
    }
    state.drawPos = { ...state.pos };
    state.route.pop();
    state.reached = false;
  }

  function step(dt) {
    if (state.moving) {
      state.moving.t += dt / STEP_TIME;
      if (state.moving.t >= 1) {
        state.pos = { ...state.moving.to };
        state.drawPos = { ...state.pos };
        state.moving = null;
        state.steps++;
        const tgt = PLACES[state.target];
        if (state.pos.x === tgt.x && state.pos.y === tgt.y) {
          state.reached = true; state.reachedAt = now; state.queue = [];
        } else if (isRiver(state.pos.x, state.pos.y)) {
          say('Splash! Use the bridge. Back to the start.', 'Byur! Lewat jembatan. Kembali ke awal.', 2.5);
          const s = PLACES[state.start];
          state.pos = { x: s.x, y: s.y }; state.drawPos = { ...state.pos };
          state.queue = []; state.route = []; state.steps = 0;
        }
      } else {
        const m = state.moving;
        state.drawPos = { x: m.from.x + (m.to.x - m.from.x) * m.t, y: m.from.y + (m.to.y - m.from.y) * m.t };
      }
      return;
    }
    if (state.queue.length) {
      const d = DIRS[state.queue.shift()];
      const to = { x: state.pos.x + d.dx, y: state.pos.y + d.dy };
      if (!inMap(to.x, to.y)) {
        say('Oops! That is the edge of the map.', 'Ups! Itu tepi peta.', 2);
        state.queue = [];
        // trim the route of the steps that could not be taken
        const last = state.route[state.route.length - 1];
        if (last) { last.n -= 1; if (last.n <= 0) state.route.pop(); }
        return;
      }
      state.moving = { from: { ...state.pos }, to, t: 0 };
    }
  }

  // bearing from Adi to the target: 0 = North, clockwise
  function bearing() {
    const t = PLACES[state.target];
    const dx = t.x - state.pos.x, dy = t.y - state.pos.y;
    if (dx === 0 && dy === 0) return null;
    let deg = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (deg < 0) deg += 360;
    return deg;
  }
  const eightIndex = (deg) => Math.round(deg / 45) % 8;

  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawIcon(ctx, key, cx, cy, s) {
    ctx.lineWidth = 2;
    if (key === 'home') {
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(cx - s * 0.3, cy - s * 0.05, s * 0.6, s * 0.38);
      ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(cx - s * 0.38, cy - s * 0.05); ctx.lineTo(cx, cy - s * 0.38); ctx.lineTo(cx + s * 0.38, cy - s * 0.05); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#7c2d12'; ctx.fillRect(cx - s * 0.08, cy + s * 0.1, s * 0.16, s * 0.23);
    } else if (key === 'school') {
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(cx - s * 0.36, cy - s * 0.1, s * 0.72, s * 0.42);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(cx - s * 0.4, cy - s * 0.18, s * 0.8, s * 0.1);
      ctx.fillStyle = '#3b82f6';
      for (let k = -1; k <= 1; k++) ctx.fillRect(cx + k * s * 0.22 - s * 0.06, cy, s * 0.12, s * 0.14);
      ctx.strokeStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(cx - s * 0.3, cy - s * 0.18); ctx.lineTo(cx - s * 0.3, cy - s * 0.42); ctx.stroke();
      ctx.fillStyle = '#ef4444'; ctx.fillRect(cx - s * 0.3, cy - s * 0.42, s * 0.14, s * 0.09);
    } else if (key === 'market') {
      ctx.fillStyle = '#92400e'; ctx.fillRect(cx - s * 0.34, cy - s * 0.02, s * 0.68, s * 0.3);
      for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#f8fafc' : '#16a34a'; ctx.fillRect(cx - s * 0.42 + k * s * 0.14, cy - s * 0.22, s * 0.14, s * 0.2); }
      ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(cx - s * 0.15, cy + s * 0.06, s * 0.07, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(cx + s * 0.05, cy + s * 0.06, s * 0.07, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(cx + s * 0.23, cy + s * 0.06, s * 0.07, 0, Math.PI * 2); ctx.fill();
    } else if (key === 'mosque') {
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(cx - s * 0.3, cy, s * 0.6, s * 0.3);
      ctx.fillStyle = '#16a34a'; ctx.beginPath(); ctx.arc(cx, cy, s * 0.26, Math.PI, 0); ctx.fill();
      ctx.fillRect(cx + s * 0.3, cy - s * 0.3, s * 0.08, s * 0.6);
      ctx.beginPath(); ctx.moveTo(cx + s * 0.28, cy - s * 0.3); ctx.lineTo(cx + s * 0.34, cy - s * 0.44); ctx.lineTo(cx + s * 0.4, cy - s * 0.3); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(cx, cy - s * 0.26); ctx.lineTo(cx, cy - s * 0.4); ctx.stroke();
    }
  }

  function drawTree(ctx, cx, cy, s) {
    ctx.fillStyle = '#7c2d12'; ctx.fillRect(cx - s * 0.04, cy, s * 0.08, s * 0.25);
    ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(cx, cy - s * 0.05, s * 0.2, 0, Math.PI * 2); ctx.fill();
  }

  function drawAdi(ctx, cx, cy, s) {
    const bob = state.moving ? Math.abs(Math.sin(state.moving.t * Math.PI * 2)) * s * 0.05 : 0;
    ctx.fillStyle = '#2563eb'; ctx.beginPath(); ctx.roundRect(cx - s * 0.16, cy - s * 0.02 - bob, s * 0.32, s * 0.3, s * 0.08); ctx.fill();
    ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.arc(cx, cy - s * 0.18 - bob, s * 0.17, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(cx, cy - s * 0.26 - bob, s * 0.17, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#1f2937';
    ctx.beginPath(); ctx.arc(cx - s * 0.06, cy - s * 0.18 - bob, s * 0.02, 0, Math.PI * 2); ctx.arc(cx + s * 0.06, cy - s * 0.18 - bob, s * 0.02, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy - s * 0.14 - bob, s * 0.06, 0.2, Math.PI - 0.2); ctx.stroke();
  }

  function drawCompass(ctx, cx, cy, R) {
    const shortN = getLocale() === 'id' ? EIGHT_SHORT_ID : EIGHT_SHORT_EN;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
    const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    for (let i = 0; i < 8; i++) {
      const deg = i * 45, major = i % 2 === 0;
      const len = major ? R * 0.8 : R * 0.5, wid = major ? 16 : 22;
      const [tx, ty] = pt(deg, len), [ax, ay] = pt(deg + wid, R * 0.14), [bx, by] = pt(deg - wid, R * 0.14);
      ctx.fillStyle = i === 0 ? '#ef4444' : major ? '#e2e8f0' : '#64748b';
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ax, ay); ctx.lineTo(bx, by); ctx.closePath(); ctx.fill();
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < 8; i++) {
      const major = i % 2 === 0;
      const [lx, ly] = pt(i * 45, major ? R * 0.93 : R * 0.72);
      ctx.fillStyle = i === 0 ? '#fca5a5' : '#f8fafc';
      ctx.font = font(major ? R * 0.2 : R * 0.13);
      ctx.fillText(shortN[i], lx, ly);
    }
    // arrow to the target
    const b = bearing();
    if (b != null) {
      const [ex, ey] = pt(b, R * 0.62);
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(3, R * 0.06); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.fillStyle = '#fde047';
      ctx.save(); ctx.translate(ex, ey); ctx.rotate((b - 90) * Math.PI / 180);
      ctx.beginPath(); ctx.moveTo(R * 0.12, 0); ctx.lineTo(-R * 0.04, R * 0.09); ctx.lineTo(-R * 0.04, -R * 0.09); ctx.closePath(); ctx.fill();
      ctx.restore(); ctx.lineCap = 'butt';
    }
    ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.07, 0, Math.PI * 2); ctx.fill();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // map area: left 64 % of the width
    const mapW = W * 0.64, mapH = H * 0.84;
    const cell = Math.min(mapW / COLS, mapH / ROWS);
    const ox = W * 0.02 + (mapW - cell * COLS) / 2, oy = H * 0.14 + (mapH - cell * ROWS) / 2;
    const cx = (x) => ox + (x + 0.5) * cell, cy = (y) => oy + (y + 0.5) * cell;
    // grass
    ctx.fillStyle = '#365314'; ctx.fillRect(ox, oy, cell * COLS, cell * ROWS);
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#4d7c0f' : '#3f6212';
      ctx.fillRect(ox + x * cell, oy + y * cell, cell, cell);
    }
    // river
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(ox + RIVER_COL * cell + cell * 0.1, oy, cell * 0.8, cell * ROWS);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      for (let j = 0; j <= 24; j++) { const yy = oy + j * cell * ROWS / 24; const xx = ox + RIVER_COL * cell + cell * (0.3 + 0.2 * k) + Math.sin(j * 0.8 + now * 2 + k) * cell * 0.06; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.stroke();
    }
    // bridge
    ctx.fillStyle = '#92400e'; ctx.fillRect(ox + RIVER_COL * cell, oy + BRIDGE_ROW * cell + cell * 0.2, cell, cell * 0.6);
    ctx.strokeStyle = '#fcd34d'; ctx.lineWidth = 2;
    for (let k = 1; k < 5; k++) { const xx = ox + RIVER_COL * cell + k * cell / 5; ctx.beginPath(); ctx.moveTo(xx, oy + BRIDGE_ROW * cell + cell * 0.2); ctx.lineTo(xx, oy + BRIDGE_ROW * cell + cell * 0.8); ctx.stroke(); }
    // grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(ox + x * cell, oy); ctx.lineTo(ox + x * cell, oy + ROWS * cell); ctx.stroke(); }
    for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(ox, oy + y * cell); ctx.lineTo(ox + COLS * cell, oy + y * cell); ctx.stroke(); }
    // trees
    for (const [tx, ty] of TREES) drawTree(ctx, cx(tx), cy(ty), cell);
    // target highlight
    const tgt = PLACES[state.target];
    const glow = 0.25 + 0.15 * Math.sin(now * 4);
    ctx.fillStyle = `rgba(253,224,71,${glow})`; ctx.fillRect(ox + tgt.x * cell, oy + tgt.y * cell, cell, cell);
    ctx.strokeStyle = '#fde047'; ctx.lineWidth = 3; ctx.strokeRect(ox + tgt.x * cell + 1.5, oy + tgt.y * cell + 1.5, cell - 3, cell - 3);
    // places
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    for (const key of Object.keys(PLACES)) {
      const p = PLACES[key];
      drawIcon(ctx, key, cx(p.x), cy(p.y), cell);
      ctx.fillStyle = '#f8fafc'; ctx.font = font(Math.max(9, cell * 0.2));
      ctx.fillText(T(p.en, p.id), cx(p.x), oy + (p.y + 1) * cell - 3);
    }
    // route trail
    if (state.route.length) {
      const s = PLACES[state.start];
      let x = s.x, y = s.y;
      ctx.strokeStyle = 'rgba(253,224,71,0.8)'; ctx.lineWidth = Math.max(3, cell * 0.08); ctx.setLineDash([cell * 0.25, cell * 0.15]);
      ctx.beginPath(); ctx.moveTo(cx(x), cy(y));
      for (const r of state.route) { x += DIRS[r.dir].dx * r.n; y += DIRS[r.dir].dy * r.n; ctx.lineTo(cx(x), cy(y)); }
      ctx.stroke(); ctx.setLineDash([]);
    }
    // Adi
    drawAdi(ctx, cx(state.drawPos.x), cy(state.drawPos.y), cell);
    // map edge labels (N at top)
    ctx.fillStyle = '#fca5a5'; ctx.font = font(Math.max(11, cell * 0.28));
    ctx.fillText(T('N', 'U'), ox + COLS * cell / 2, oy - 6);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(T('S', 'S'), ox + COLS * cell / 2, oy + ROWS * cell + cell * 0.3);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText(T('W', 'B'), ox - 6, oy + ROWS * cell / 2);
    ctx.textAlign = 'left'; ctx.fillText(T('E', 'T'), ox + COLS * cell + 6, oy + ROWS * cell / 2);

    // right panel: compass + info
    const px = W * 0.83, R = Math.min(W * 0.12, H * 0.22);
    drawCompass(ctx, px, H * 0.36, R);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const b = bearing();
    const tName = T(tgt.en, tgt.id);
    ctx.font = font(Math.max(11, W * 0.019), false); ctx.fillStyle = '#e2e8f0';
    if (b != null) {
      const i = eightIndex(b);
      ctx.fillText(T(`The ${tName.toLowerCase()} is to the`, `${tName} ada di arah`), px, H * 0.66);
      ctx.fillStyle = '#fde047'; ctx.font = font(Math.max(13, W * 0.024));
      ctx.fillText((getLocale() === 'id' ? EIGHT_ID : EIGHT_EN)[i], px, H * 0.72);
      ctx.fillStyle = '#cbd5e1'; ctx.font = font(Math.max(10, W * 0.017), false);
      ctx.fillText(`${Math.round(b)}° ${T('from North', 'dari Utara')}`, px, H * 0.77);
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.019), false);
    ctx.fillText(T(`Steps: ${state.steps}`, `Langkah: ${state.steps}`), px, H * 0.86);
    // route as text
    const shortN = getLocale() === 'id' ? 1 : 0;
    const routeTxt = state.route.map((r) => `${DIRS[r.dir].short[shortN]}${r.n}`).join('  ');
    ctx.fillStyle = '#fde68a'; ctx.font = font(Math.max(10, W * 0.017));
    ctx.fillText(routeTxt || T('(no moves yet)', '(belum ada langkah)'), px, H * 0.92);

    // headline
    ctx.font = font(Math.max(13, W * 0.026));
    if (state.reached) {
      const age = now - state.reachedAt;
      ctx.fillStyle = '#fde047';
      ctx.font = font(Math.max(16, W * 0.034 * (1 + 0.05 * Math.sin(age * 6))));
      const best = shortest(PLACES[state.start], tgt);
      const txt = state.steps <= best
        ? T(`You made it in ${state.steps} steps - the shortest way!`, `Sampai dalam ${state.steps} langkah - jalan terpendek!`)
        : T(`You made it in ${state.steps} steps! Shortest is ${best}.`, `Sampai dalam ${state.steps} langkah! Terpendek ${best}.`);
      ctx.fillText(txt, W * 0.34, H * 0.08);
      ctx.fillStyle = '#fde68a';
      for (let k = 0; k < 6; k++) { const a = age * 2 + k; ctx.beginPath(); ctx.arc(W * 0.34 + Math.cos(a) * W * 0.22, H * 0.075 + Math.sin(a * 1.3) * H * 0.03, 3, 0, Math.PI * 2); ctx.fill(); }
    } else if (state.message && now < state.messageUntil) {
      ctx.fillStyle = '#f87171'; ctx.fillText(state.message, W * 0.34, H * 0.08);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T(`Puzzle ${state.puzzle + 1}: take Adi to the ${tName.toLowerCase()}`, `Tekateki ${state.puzzle + 1}: antar Adi ke ${tName.toLowerCase()}`), W * 0.34, H * 0.08);
    }
    ctx.textAlign = 'left';
  }

  // controls
  const puzzleBtns = PUZZLES.map((_, i) => bigBtn(`${T('Puzzle', 'Tekateki')} ${i + 1}`, () => loadPuzzle(i)));
  const stepsS = slider({ label: T('Steps per move', 'Langkah per gerakan'), key: 'steps', min: 1, max: 5, step: 1, value: 1, format: (v) => `${v}`, onInput: (v) => { state.stepsPer = v; } });
  const dirBtn = (k) => bigBtn(`${DIRS[k].arrow} ${T(DIRS[k].en, DIRS[k].id)}`, () => move(k), true);
  const nBtn = dirBtn('N'), sBtn = dirBtn('S'), eBtn = dirBtn('E'), wBtn = dirBtn('W');
  const undoBtn = bigBtn(T('Undo', 'Batalkan'), undo);
  const resetBtn = bigBtn(T('Start again', 'Mulai lagi'), () => loadPuzzle(state.puzzle));
  ctrlPanel.append(row(...puzzleBtns), stepsS.el, row(nBtn, sBtn, eBtn, wBtn), row(undoBtn, resetBtn));
  loadPuzzle(0);

  const lab = labPanel({
    title: 'Routes on the map',
    filename: 'compass-map-data.csv',
    columns: [
      { key: 'start', label: 'Start' },
      { key: 'target', label: 'Target' },
      { key: 'direction', label: 'Direction of target at start' },
      { key: 'route', label: 'Route' },
      { key: 'steps', label: 'Steps taken' },
      { key: 'fewest', label: 'Fewest possible' },
      { key: 'reached', label: 'Reached?' },
    ],
    procedure: [
      'Choose Puzzle 1. Look at the compass: which direction is the target? Write it down.',
      'Walk Adi to the target. Press Record when he arrives.',
      'Press Start again and try a different route. Record it too. Which is shorter?',
      'Do the same for Puzzle 2 and Puzzle 3. Remember the bridge!',
    ],
    predict: 'How many steps will the shortest route to the market take?',
    source: () => {
      const s = PLACES[state.start], t = PLACES[state.target];
      const dx = t.x - s.x, dy = t.y - s.y;
      let deg = Math.atan2(dx, -dy) * 180 / Math.PI; if (deg < 0) deg += 360;
      return {
        start: s.en, target: t.en,
        direction: EIGHT_EN[eightIndex(deg)],
        route: state.route.map((r) => `${r.dir}${r.n}`).join(' ') || '-',
        steps: state.steps, fewest: shortest(s, t),
        reached: state.reached ? 'yes' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
