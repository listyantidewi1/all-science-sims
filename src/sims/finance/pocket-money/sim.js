import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const ITEMS = [
  { key: 'pencil', en: 'Pencil', id: 'Pensil', price: 3000, need: true, color: '#facc15' },
  { key: 'notebook', en: 'Notebook', id: 'Buku tulis', price: 8000, need: true, color: '#60a5fa' },
  { key: 'bus', en: 'Bus fare', id: 'Ongkos bus', price: 6000, need: true, color: '#f97316' },
  { key: 'snack', en: 'Snack', id: 'Jajanan', price: 5000, need: false, color: '#fb7185' },
  { key: 'icecream', en: 'Ice cream', id: 'Es krim', price: 7000, need: false, color: '#f9a8d4' },
  { key: 'stickers', en: 'Stickers', id: 'Stiker', price: 4000, need: false, color: '#a78bfa' },
  { key: 'comic', en: 'Comic', id: 'Komik', price: 12000, need: false, color: '#34d399' },
  { key: 'toycar', en: 'Toy car', id: 'Mobil mainan', price: 15000, need: false, color: '#ef4444' },
];
const GOALS = [
  { key: 'game', en: 'Board game', id: 'Permainan papan', price: 45000 },
  { key: 'ball', en: 'Football', id: 'Bola sepak', price: 60000 },
  { key: 'bag', en: 'School bag', id: 'Tas sekolah', price: 90000 },
];
// Indonesian money: value, kind, colour (notes are coloured roughly like the real ones)
const MONEY = [
  { v: 100000, kind: 'note', c: '#b91c1c' },
  { v: 50000, kind: 'note', c: '#1d4ed8' },
  { v: 20000, kind: 'note', c: '#15803d' },
  { v: 10000, kind: 'note', c: '#7e22ce' },
  { v: 5000, kind: 'note', c: '#b45309' },
  { v: 2000, kind: 'note', c: '#6b7280' },
  { v: 1000, kind: 'coin', c: '#d4d4d8' },
  { v: 500, kind: 'coin', c: '#eab308' },
];
const STATUS = ['skip', 'buy', 'later'];

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}
const fmt = (n) => 'Rp ' + String(Math.round(Math.max(0, n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function breakdown(amount) {
  const out = [];
  let left = Math.round(amount / 500) * 500;
  for (const m of MONEY) while (left >= m.v && out.length < 14) { out.push(m); left -= m.v; }
  return out;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tx = (o) => (getLocale() === 'id' ? o.id : o.en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const state = {
    money: 25000, week: 1, saved: 0, goal: GOALS[1],
    status: Object.fromEntries(ITEMS.map((i) => [i.key, 'skip'])),
    lastSpent: 0, lastSaved: 0, msg: null, msgAt: -10, jarAnim: 0, reached: false,
  };
  let now = 0;
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const spent = () => ITEMS.reduce((s, i) => s + (state.status[i.key] === 'buy' ? i.price : 0), 0);
  const leftover = () => state.money - spent();
  const payNote = () => (spent() <= 20000 ? 20000 : spent() <= 50000 ? 50000 : 100000);
  const change = () => Math.max(0, payNote() - spent());
  const weeksToGo = () => {
    const remain = state.goal.price - state.saved, perWeek = leftover();
    if (remain <= 0) return 0;
    if (perWeek <= 0) return Infinity;
    return Math.ceil(remain / perWeek);
  };

  function finishWeek() {
    if (spent() > state.money) { state.msg = T('Not enough money! Skip something or save it for later.', 'Uangnya tidak cukup! Lewati sesuatu atau simpan untuk nanti.'); state.msgAt = now; return; }
    state.lastSpent = spent(); state.lastSaved = leftover();
    state.saved += state.lastSaved;
    state.week++;
    for (const i of ITEMS) if (state.status[i.key] === 'buy') state.status[i.key] = 'skip';
    state.jarAnim = 1;
    if (state.saved >= state.goal.price && !state.reached) { state.reached = true; state.msg = `${T('Hooray! You saved enough for the', 'Hore! Tabunganmu cukup untuk')} ${tx(state.goal)}!`; state.msgAt = now; }
    else { state.msg = `${T('Week done. You saved', 'Minggu selesai. Kamu menabung')} ${fmt(state.lastSaved)}.`; state.msgAt = now; }
  }
  function restart() {
    state.week = 1; state.saved = 0; state.reached = false; state.lastSpent = 0; state.lastSaved = 0; state.msg = null;
    for (const i of ITEMS) state.status[i.key] = 'skip';
  }

  // --- layout ---
  function cardRects() {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.02, y0 = H * 0.16, gw = W * 0.56, gh = H * 0.56, cols = 4, rows = 2;
    const cw = gw / cols, ch = gh / rows;
    return ITEMS.map((it, i) => ({ it, x: x0 + (i % cols) * cw + 4, y: y0 + Math.floor(i / cols) * ch + 4, w: cw - 8, h: ch - 8 }));
  }

  function drawIcon(ctx, key, x, y, s) {
    ctx.save(); ctx.translate(x, y);
    if (key === 'pencil') { ctx.fillStyle = '#facc15'; ctx.fillRect(-s * 0.12, -s * 0.5, s * 0.24, s * 0.8); ctx.fillStyle = '#fcd9b6'; ctx.beginPath(); ctx.moveTo(-s * 0.12, s * 0.3); ctx.lineTo(0, s * 0.55); ctx.lineTo(s * 0.12, s * 0.3); ctx.fill(); ctx.fillStyle = '#f472b6'; ctx.fillRect(-s * 0.12, -s * 0.5, s * 0.24, s * 0.12); }
    else if (key === 'notebook') { ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.roundRect(-s * 0.35, -s * 0.45, s * 0.7, s * 0.9, 4); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-s * 0.2, -s * 0.3, s * 0.4, s * 0.08); ctx.fillRect(-s * 0.2, -s * 0.1, s * 0.4, s * 0.08); }
    else if (key === 'bus') { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.roundRect(-s * 0.5, -s * 0.35, s, s * 0.6, 6); ctx.fill(); ctx.fillStyle = '#bae6fd'; ctx.fillRect(-s * 0.4, -s * 0.25, s * 0.3, s * 0.2); ctx.fillRect(s * 0.1, -s * 0.25, s * 0.3, s * 0.2); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-s * 0.3, s * 0.3, s * 0.1, 0, 7); ctx.arc(s * 0.3, s * 0.3, s * 0.1, 0, 7); ctx.fill(); }
    else if (key === 'snack') { ctx.fillStyle = '#fb7185'; ctx.beginPath(); ctx.roundRect(-s * 0.3, -s * 0.45, s * 0.6, s * 0.9, 6); ctx.fill(); ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(0, 0, s * 0.18, 0, 7); ctx.fill(); }
    else if (key === 'icecream') { ctx.fillStyle = '#d97706'; ctx.beginPath(); ctx.moveTo(-s * 0.25, -s * 0.05); ctx.lineTo(0, s * 0.5); ctx.lineTo(s * 0.25, -s * 0.05); ctx.fill(); ctx.fillStyle = '#f9a8d4'; ctx.beginPath(); ctx.arc(0, -s * 0.15, s * 0.28, 0, 7); ctx.fill(); }
    else if (key === 'stickers') { ['#a78bfa', '#34d399', '#facc15'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(-s * 0.2 + i * s * 0.2, -s * 0.1 + (i % 2) * s * 0.2, s * 0.17, 0, 7); ctx.fill(); }); }
    else if (key === 'comic') { ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.roundRect(-s * 0.35, -s * 0.45, s * 0.7, s * 0.9, 3); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = font(s * 0.3, true); ctx.textAlign = 'center'; ctx.fillText('POW!', 0, s * 0.1); }
    else if (key === 'toycar') { ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.roundRect(-s * 0.5, -s * 0.1, s, s * 0.35, 5); ctx.fill(); ctx.beginPath(); ctx.roundRect(-s * 0.3, -s * 0.35, s * 0.55, s * 0.3, 5); ctx.fill(); ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-s * 0.28, s * 0.3, s * 0.12, 0, 7); ctx.arc(s * 0.28, s * 0.3, s * 0.12, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  function drawMoney(ctx, list, x, y, maxW, h) {
    // notes as rectangles, coins as circles; overlapping stack if many
    let cx = x;
    const nw = h * 1.9, step = list.length > 6 ? Math.max(h * 0.5, (maxW - nw) / Math.max(1, list.length - 1)) : nw + 6;
    for (const m of list) {
      if (m.kind === 'note') {
        ctx.fillStyle = m.c; ctx.beginPath(); ctx.roundRect(cx, y, nw, h, 4); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1; ctx.strokeRect(cx + 3, y + 3, nw - 6, h - 6);
        ctx.fillStyle = '#fff'; ctx.font = font(h * 0.36, true); ctx.textAlign = 'center';
        ctx.fillText(String(m.v / 1000) + (m.v >= 1000 ? '.000' : ''), cx + nw / 2, y + h * 0.62);
      } else {
        ctx.fillStyle = m.c; ctx.beginPath(); ctx.arc(cx + h * 0.5, y + h * 0.5, h * 0.45, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#71717a'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#1f2937'; ctx.font = font(h * 0.3, true); ctx.textAlign = 'center';
        ctx.fillText(m.v === 1000 ? '1.000' : '500', cx + h * 0.5, y + h * 0.6);
      }
      cx += step;
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // header
    ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.05, true); ctx.textAlign = 'left';
    ctx.fillText(`${T('Week', 'Minggu')} ${state.week}  ·  ${T('pocket money', 'uang saku')}: ${fmt(state.money)}`, W * 0.02, H * 0.07);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.032);
    ctx.fillText(T('tap an item: skip → buy now → save for later', 'ketuk barang: lewati → beli sekarang → simpan untuk nanti'), W * 0.02, H * 0.12);
    // wallet (this week's money as notes)
    drawMoney(ctx, breakdown(state.money), W * 0.62, H * 0.03, W * 0.36, H * 0.07);
    // cards
    for (const c of cardRects()) {
      const st = state.status[c.it.key];
      ctx.fillStyle = st === 'buy' ? '#14532d' : st === 'later' ? '#1e3a8a' : '#1e293b';
      ctx.beginPath(); ctx.roundRect(c.x, c.y, c.w, c.h, 10); ctx.fill();
      ctx.strokeStyle = st === 'buy' ? '#4ade80' : st === 'later' ? '#60a5fa' : '#334155'; ctx.lineWidth = st === 'skip' ? 1.5 : 3; ctx.stroke();
      drawIcon(ctx, c.it.key, c.x + c.w / 2, c.y + c.h * 0.36, Math.min(c.w, c.h) * 0.5);
      ctx.fillStyle = '#f8fafc'; ctx.font = font(c.h * 0.13, true); ctx.textAlign = 'center';
      ctx.fillText(tx(c.it), c.x + c.w / 2, c.y + c.h * 0.7);
      ctx.fillStyle = '#fde68a'; ctx.font = font(c.h * 0.12);
      ctx.fillText(fmt(c.it.price), c.x + c.w / 2, c.y + c.h * 0.83);
      // need / want tag
      ctx.fillStyle = c.it.need ? '#f97316' : '#a855f7';
      ctx.beginPath(); ctx.roundRect(c.x + 6, c.y + 6, c.w * 0.42, c.h * 0.14, 6); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = font(c.h * 0.09, true); ctx.textAlign = 'center';
      ctx.fillText(c.it.need ? T('NEED', 'KEBUTUHAN') : T('WANT', 'KEINGINAN'), c.x + 6 + c.w * 0.21, c.y + 6 + c.h * 0.105);
      // status tag
      if (st !== 'skip') {
        ctx.fillStyle = st === 'buy' ? '#4ade80' : '#60a5fa';
        ctx.beginPath(); ctx.roundRect(c.x + c.w * 0.54, c.y + 6, c.w * 0.42, c.h * 0.14, 6); ctx.fill();
        ctx.fillStyle = '#0b1220'; ctx.fillText(st === 'buy' ? T('BUY NOW', 'BELI') : T('LATER', 'NANTI'), c.x + c.w * 0.75, c.y + 6 + c.h * 0.105);
      }
    }
    // totals strip
    const sx = W * 0.02, sy = H * 0.76, sw = W * 0.56, sh = H * 0.2;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 10); ctx.fill();
    const over = spent() > state.money;
    ctx.textAlign = 'left'; ctx.font = font(H * 0.038, true);
    ctx.fillStyle = over ? '#f87171' : '#4ade80';
    ctx.fillText(`${T('buy now', 'beli sekarang')}: ${fmt(spent())}${over ? '  ' + T('(too much!)', '(terlalu banyak!)') : ''}`, sx + 12, sy + sh * 0.25);
    ctx.fillStyle = '#fde68a';
    ctx.fillText(`${T('goes to the jar', 'masuk celengan')}: ${over ? fmt(0) : fmt(leftover())}`, sx + 12, sy + sh * 0.5);
    // change from a note
    if (spent() > 0 && !over) {
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(H * 0.032);
      ctx.fillText(`${T('pay with', 'bayar dengan')} ${fmt(payNote())} → ${T('change', 'kembalian')} ${fmt(change())}:`, sx + 12, sy + sh * 0.75);
      drawMoney(ctx, breakdown(change()), sx + sw * 0.55, sy + sh * 0.6, sw * 0.43, sh * 0.3);
    } else if (!over) {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.032);
      ctx.fillText(T('nothing to pay this week', 'tidak ada yang dibayar minggu ini'), sx + 12, sy + sh * 0.75);
    }
    // jar
    const jx = W * 0.72, jy = H * 0.2, jw = W * 0.18, jh = H * 0.5;
    const fillF = clamp(state.saved / state.goal.price, 0, 1);
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.roundRect(jx + jw * 0.25, jy - jh * 0.08, jw * 0.5, jh * 0.1, 4); ctx.fill();
    ctx.fillStyle = 'rgba(148,163,184,0.2)'; ctx.beginPath(); ctx.roundRect(jx, jy, jw, jh, 16); ctx.fill();
    // coins inside (stack height = fill)
    const coinsH = jh * fillF;
    ctx.save(); ctx.beginPath(); ctx.roundRect(jx, jy, jw, jh, 16); ctx.clip();
    ctx.fillStyle = '#eab308'; ctx.fillRect(jx, jy + jh - coinsH, jw, coinsH);
    ctx.fillStyle = '#ca8a04';
    for (let yy = jy + jh - 4; yy > jy + jh - coinsH; yy -= 8) { for (let k = 0; k < 4; k++) ctx.fillRect(jx + k * jw * 0.25 + 3, yy, jw * 0.25 - 6, 3); }
    if (state.jarAnim > 0) {
      const t = 1 - state.jarAnim; ctx.fillStyle = '#facc15';
      for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(jx + jw * (0.2 + k * 0.2), jy - jh * 0.1 + t * (jh - coinsH + jh * 0.1), 6, 0, Math.PI * 2); ctx.fill(); }
      state.jarAnim = Math.max(0, state.jarAnim - 0.02);
    }
    ctx.restore();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(jx, jy, jw, jh, 16); ctx.stroke();
    // goal line
    ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(jx - 6, jy + 2); ctx.lineTo(jx + jw + 6, jy + 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.04, true); ctx.textAlign = 'center';
    ctx.fillText(fmt(state.saved), jx + jw / 2, jy + jh / 2);
    ctx.font = font(H * 0.03); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${T('goal', 'tujuan')}: ${tx(state.goal)}`, jx + jw / 2, jy + jh + H * 0.05);
    ctx.fillText(fmt(state.goal.price), jx + jw / 2, jy + jh + H * 0.09);
    const wtg = weeksToGo();
    ctx.fillStyle = '#fde68a';
    ctx.fillText(wtg === 0 ? T('goal reached!', 'tujuan tercapai!') : wtg === Infinity ? T('save something to get there', 'tabung sesuatu agar tercapai') : `${wtg} ${T('more week(s) at this rate', 'minggu lagi dengan rencana ini')}`, jx + jw / 2, jy + jh + H * 0.14);
    // message
    if (state.msg && now - state.msgAt < 4) {
      ctx.fillStyle = 'rgba(15,23,42,0.95)'; ctx.beginPath(); ctx.roundRect(W * 0.1, H * 0.4, W * 0.8, H * 0.14, 14); ctx.fill();
      ctx.strokeStyle = state.reached && now - state.msgAt < 4 ? '#facc15' : '#60a5fa'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.045, true); ctx.textAlign = 'center';
      ctx.fillText(state.msg, W * 0.5, H * 0.485);
    }
    ctx.textAlign = 'left';
  }

  // --- input ---
  function localPos(e) {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / Math.max(1, r.width)), y: (e.clientY - r.top) * (cv.height / Math.max(1, r.height)) };
  }
  const onDown = (e) => {
    const p = localPos(e);
    for (const c of cardRects()) if (p.x >= c.x && p.x <= c.x + c.w && p.y >= c.y && p.y <= c.y + c.h) {
      const cur = STATUS.indexOf(state.status[c.it.key]);
      state.status[c.it.key] = STATUS[(cur + 1) % STATUS.length];
      e.preventDefault(); return;
    }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // --- controls ---
  const moneyS = slider({ label: T('Pocket money per week', 'Uang saku per minggu'), key: 'money', min: 10000, max: 50000, step: 5000, value: 25000, format: fmt, onInput: (v) => { state.money = v; } });
  const goalSel = select({
    label: T('Saving goal', 'Tujuan menabung'), key: 'goal', value: 'ball',
    options: GOALS.map((g) => ({ value: g.key, label: `${tx(g)} · ${fmt(g.price)}` })),
    onChange: (v) => { const g = GOALS.find((k) => k.key === v); if (g) { state.goal = g; state.reached = state.saved >= g.price; } },
  });
  goalSel.el.querySelector('select').style.minHeight = '44px';
  const finishB = bigBtn(T('Finish this week', 'Selesaikan minggu ini'), finishWeek, true);
  const restartB = bigBtn(T('Start over', 'Mulai lagi'), restart);
  ctrlPanel.append(moneyS.el, goalSel.el, row(finishB, restartB));

  const lab = labPanel({
    title: 'My savings record',
    filename: 'pocket-money-data.csv',
    columns: [
      { key: 'week', label: 'Week' },
      { key: 'money', label: 'Pocket money (Rp)', format: (v) => v.toLocaleString('id-ID') },
      { key: 'spent', label: 'Spent (Rp)', format: (v) => v.toLocaleString('id-ID') },
      { key: 'saved', label: 'Saved this week (Rp)', format: (v) => v.toLocaleString('id-ID') },
      { key: 'jar', label: 'Jar total (Rp)', format: (v) => v.toLocaleString('id-ID') },
    ],
    procedure: [
      'Choose a goal. Tap the items you want to buy this week, then press "Finish this week" and Record.',
      'Repeat for 4 weeks. Try buying only needs one week and a want the next.',
      'Look at the Jar total column. Is it growing the same amount every week?',
      'How many weeks did it take to reach the goal?',
    ],
    predict: 'How many weeks do you think it will take to fill the jar? Write your guess.',
    source: () => (state.week > 1 ? { week: state.week - 1, money: state.money, spent: state.lastSpent, saved: state.lastSaved, jar: state.saved } : null),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
