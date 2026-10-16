import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Presets: each side is { x: number of x-bags, c: unit weights }; rel is '=', '<' or '>'.
const PRESETS = [
  { id: 'p1', L: { x: 3, c: 2 }, R: { x: 0, c: 11 }, rel: '=' },   // x = 3
  { id: 'p2', L: { x: 2, c: 5 }, R: { x: 1, c: 9 }, rel: '=' },    // x = 4
  { id: 'p3', L: { x: 5, c: 0 }, R: { x: 0, c: 10 }, rel: '=' },   // x = 2
  { id: 'p4', L: { x: 4, c: 3 }, R: { x: 2, c: 11 }, rel: '=' },   // x = 4
  { id: 'p5', L: { x: 1, c: 8 }, R: { x: 3, c: 2 }, rel: '=' },    // x = 3 (bags on the right)
  { id: 'p6', L: { x: 2, c: 3 }, R: { x: 0, c: 11 }, rel: '<' },   // x < 4
];

function sideText(s) {
  const parts = [];
  if (s.x > 0) parts.push(s.x === 1 ? 'x' : `${s.x}x`);
  if (s.c > 0 || parts.length === 0) parts.push(String(s.c));
  return parts.join(' + ');
}
function flipRel(rel) { return rel === '<' ? '>' : rel === '>' ? '<' : '='; }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // ---- state ---------------------------------------------------------------
  const state = {
    L: { x: 3, c: 2 }, R: { x: 0, c: 11 }, rel: '=',
    history: [], undo: [], start: null,
    msg: '', msgAt: -10, tilt: 0, wobble: 0,
  };
  let now = 0;

  function load(p) {
    state.L = { ...p.L }; state.R = { ...p.R }; state.rel = p.rel;
    state.start = { L: { ...p.L }, R: { ...p.R }, rel: p.rel };
    state.history = []; state.undo = []; state.msg = ''; state.wobble = 0.6;
  }
  function equationStr() { return `${sideText(state.L)} ${state.rel} ${sideText(state.R)}`; }
  function solved() {
    const { L, R } = state;
    if (L.x === 1 && L.c === 0 && R.x === 0) return { rel: state.rel, value: R.c };
    if (R.x === 1 && R.c === 0 && L.x === 0) return { rel: flipRel(state.rel), value: L.c };
    return null;
  }
  function flash(msg) { state.msg = msg; state.msgAt = now; }
  function push(label) {
    state.undo.push({ L: { ...state.L }, R: { ...state.R }, rel: state.rel, history: state.history.slice() });
    state.history.push(label);
    state.wobble = 0.5;
  }

  // ---- the four legal moves ------------------------------------------------
  function addBoth(kind, n) {
    if (solved()) return;
    push(T(`add ${n === 1 ? '' : n}${kind} to both sides`, `tambah ${n === 1 ? '' : n}${kind} di kedua sisi`));
    state.L[kind === 'x' ? 'x' : 'c'] += n; state.R[kind === 'x' ? 'x' : 'c'] += n;
  }
  function removeBoth(kind) {
    const k = kind === 'x' ? 'x' : 'c';
    if (state.L[k] < 1 || state.R[k] < 1) {
      const side = state.L[k] < 1 ? T('left', 'kiri') : T('right', 'kanan');
      flash(kind === 'x' ? T(`No x-bag on the ${side} pan to take away.`, `Tidak ada kantong x di piringan ${side} untuk diambil.`)
        : T(`No unit weight on the ${side} pan to take away.`, `Tidak ada beban satuan di piringan ${side} untuk diambil.`));
      return;
    }
    if (solved()) return;
    push(T(`take ${kind === 'x' ? 'one x' : '1'} from both sides`, `ambil ${kind === 'x' ? 'satu x' : '1'} dari kedua sisi`));
    state.L[k]--; state.R[k]--;
  }
  function divideBoth(n) {
    const { L, R } = state;
    if (L.x % n || L.c % n || R.x % n || R.c % n) {
      flash(T(`Cannot split both pans into ${n} equal groups — something would have to be cut.`, `Kedua piringan tidak bisa dibagi ${n} kelompok sama — ada yang harus dipotong.`));
      return;
    }
    if (L.x + L.c + R.x + R.c === 0 || solved()) return;
    push(T(`divide both sides by ${n}`, `bagi kedua sisi dengan ${n}`));
    L.x /= n; L.c /= n; R.x /= n; R.c /= n;
  }
  function undo() {
    const s = state.undo.pop();
    if (!s) return;
    state.L = s.L; state.R = s.R; state.rel = s.rel; state.history = s.history; state.wobble = 0.3;
  }

  function randomProblem(rel) {
    const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
    const x = rnd(1, 6);
    const diff = rnd(1, 4);            // net number of bags
    const c = rnd(0, 2);               // bags on the lighter-in-x side
    let b = rnd(0, 6);
    const d = b + diff * x;            // units on the other side
    if (d > 20) b = Math.max(0, b - (d - 20));
    const A = { x: c + diff, c: b }, B = { x: c, c: b + diff * x };
    const swap = Math.random() < 0.3;
    if (rel === '=') load({ L: swap ? B : A, R: swap ? A : B, rel: '=' });
    else {
      // x-heavy side A, units-heavy side B. If A < B then x < solution; if A > B then x > solution.
      const r = Math.random() < 0.5 ? '<' : '>';
      load(swap ? { L: B, R: A, rel: flipRel(r) } : { L: A, R: B, rel: r });
    }
  }

  // ---- drawing -------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  function step(dt) {
    const target = state.rel === '=' ? 0 : state.rel === '<' ? -0.14 : 0.14; // positive = left pan down
    state.tilt += (target - state.tilt) * Math.min(1, dt * 4);
    if (state.wobble > 0) state.wobble = Math.max(0, state.wobble - dt);
  }

  function drawItems(ctx, side, cx, panY, panW, unit) {
    // Lay out bags first, then unit cubes, in rows of `perRow` from the pan floor upward.
    const items = [];
    for (let i = 0; i < side.x; i++) items.push('x');
    for (let i = 0; i < side.c; i++) items.push('1');
    const perRow = Math.max(3, Math.floor(panW / (unit * 1.15)));
    items.forEach((it, i) => {
      const r = Math.floor(i / perRow), col = i % perRow;
      const rowCount = Math.min(perRow, items.length - r * perRow);
      const x = cx - (rowCount - 1) * unit * 1.15 / 2 + col * unit * 1.15;
      const y = panY - unit * 0.5 - r * unit * 1.1;
      if (it === 'x') {
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.moveTo(x - unit * 0.5, y + unit * 0.5);
        ctx.quadraticCurveTo(x - unit * 0.6, y - unit * 0.25, x - unit * 0.18, y - unit * 0.3);
        ctx.lineTo(x - unit * 0.18, y - unit * 0.5); ctx.lineTo(x + unit * 0.18, y - unit * 0.5); ctx.lineTo(x + unit * 0.18, y - unit * 0.3);
        ctx.quadraticCurveTo(x + unit * 0.6, y - unit * 0.25, x + unit * 0.5, y + unit * 0.5);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#e9d5ff'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#faf5ff'; ctx.font = font(unit * 0.5, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('x', x, y + unit * 0.12);
      } else {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.roundRect(x - unit * 0.42, y - unit * 0.42, unit * 0.84, unit * 0.9, unit * 0.12); ctx.fill();
        ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#451a03'; ctx.font = font(unit * 0.45, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('1', x, y + unit * 0.05);
      }
    });
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const sol = solved();

    // Equation
    ctx.fillStyle = '#f8fafc'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.font = font(Math.min(H * 0.11, W * 0.07), true);
    ctx.fillText(equationStr(), W / 2, H * 0.04);
    if (sol) {
      ctx.fillStyle = '#34d399'; ctx.font = font(Math.min(H * 0.07, W * 0.045), true);
      const rel = sol.rel === '=' ? '=' : sol.rel;
      ctx.fillText(T('Solved: ', 'Selesai: ') + `x ${rel} ${sol.value}`, W / 2, H * 0.17);
    } else if (state.rel !== '=') {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.04);
      ctx.fillText(state.rel === '<' ? T('The right pan is heavier, so the scale tilts right.', 'Piringan kanan lebih berat, jadi timbangan miring ke kanan.') : T('The left pan is heavier, so the scale tilts left.', 'Piringan kiri lebih berat, jadi timbangan miring ke kiri.'), W / 2, H * 0.17);
    } else {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.04);
      ctx.fillText(T('Balanced: both pans weigh the same.', 'Seimbang: kedua piringan sama beratnya.'), W / 2, H * 0.17);
    }

    // Balance geometry
    const px = W / 2, py = H * 0.6;
    const half = W * 0.34;
    const tilt = state.tilt + (state.wobble > 0 ? Math.sin(now * 14) * state.wobble * 0.03 : 0);
    const unit = Math.min(W * 0.034, H * 0.062);
    const panW = W * 0.28;
    // Base and pillar
    ctx.fillStyle = '#334155';
    ctx.beginPath(); ctx.moveTo(px - W * 0.08, H * 0.95); ctx.lineTo(px + W * 0.08, H * 0.95); ctx.lineTo(px + W * 0.015, py); ctx.lineTo(px - W * 0.015, py); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.roundRect(px - W * 0.12, H * 0.94, W * 0.24, H * 0.035, 6); ctx.fill();
    // Beam
    const lx = px - half * Math.cos(tilt), ly = py + half * Math.sin(tilt);   // left end (positive tilt = left pan down)
    const rx = px + half * Math.cos(tilt), ry = py - half * Math.sin(tilt);   // right end
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = Math.max(4, H * 0.014); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.arc(px, py, Math.max(5, H * 0.016), 0, Math.PI * 2); ctx.fill();
    // Pans hang vertically from the beam ends
    const hang = H * 0.2;
    for (const [ex, ey, side, label] of [[lx, ly, state.L, T('left side', 'ruas kiri')], [rx, ry, state.R, T('right side', 'ruas kanan')]]) {
      const panY = ey + hang;
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - panW / 2, panY); ctx.moveTo(ex, ey); ctx.lineTo(ex + panW / 2, panY); ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.beginPath(); ctx.roundRect(ex - panW / 2 - 6, panY, panW + 12, Math.max(4, H * 0.014), 4); ctx.fill();
      drawItems(ctx, side, ex, panY, panW, unit);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.036); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(label + ': ' + sideText(side), ex, panY + H * 0.03);
    }

    // History (left) and message (right)
    ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.font = font(H * 0.036);
    const hist = state.history.slice(-5);
    ctx.fillStyle = '#64748b';
    ctx.fillText(T('Steps', 'Langkah') + (state.history.length > 5 ? ` (${state.history.length})` : ''), W * 0.02, H * 0.3);
    hist.forEach((h, i) => { ctx.fillStyle = '#cbd5e1'; ctx.fillText(`${state.history.length - hist.length + i + 1}. ${h}`, W * 0.02, H * 0.35 + i * H * 0.05); });
    if (state.msg && now - state.msgAt < 3) {
      ctx.fillStyle = '#fca5a5'; ctx.font = font(H * 0.04, true); ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(state.msg, W / 2, H * 0.3);
    }
    if (!sol && state.history.length === 0) {
      ctx.fillStyle = '#64748b'; ctx.font = font(H * 0.036); ctx.textAlign = 'right'; ctx.textBaseline = 'top';
      const hint = T('Goal: leave one x-bag alone on a pan.', 'Tujuan: sisakan satu kantong x sendirian di satu piringan.');
      ctx.fillText(hint, W * 0.98, H * 0.3);
    }
  }

  // ---- controls ------------------------------------------------------------
  const presetSel = select({
    label: T('Equation', 'Persamaan'), key: 'preset', value: 'p1',
    options: PRESETS.map((p) => ({ value: p.id, label: `${sideText(p.L)} ${p.rel} ${sideText(p.R)}` })),
    onChange: (v) => { const p = PRESETS.find((q) => q.id === v); if (p) load(p); },
  });
  const randEq = button({ label: T('Random equation', 'Persamaan acak'), onClick: () => randomProblem('=') });
  const randIneq = button({ label: T('Random inequality', 'Pertidaksamaan acak'), onClick: () => randomProblem('<') });
  const mk = (label, fn, primary = false) => { const b = button({ label, primary, onClick: fn }); b.el.style.minHeight = '40px'; return b; };
  const take1 = mk(T('− 1 both sides', '− 1 kedua sisi'), () => removeBoth('1'), true);
  const takeX = mk(T('− x both sides', '− x kedua sisi'), () => removeBoth('x'), true);
  const add1 = mk(T('+ 1 both sides', '+ 1 kedua sisi'), () => addBoth('1', 1));
  const addX = mk(T('+ x both sides', '+ x kedua sisi'), () => addBoth('x', 1));
  const div2 = mk('÷ 2', () => divideBoth(2), true);
  const div3 = mk('÷ 3', () => divideBoth(3), true);
  const div5 = mk('÷ 5', () => divideBoth(5), true);
  const undoB = mk(T('Undo', 'Urungkan'), undo);
  const resetB = mk(T('Restart', 'Mulai lagi'), () => { if (state.start) load(state.start); });
  ctrlPanel.append(row(presetSel, randEq, randIneq), row(take1, takeX, add1, addX), row(div2, div3, div5, undoB, resetB));

  load(PRESETS[0]);
  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
