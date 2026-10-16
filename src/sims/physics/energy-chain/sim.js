import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Energy-form cards. Positions are fractions of the canvas (0..1).
const CARDS = [
  { id: 'sun', en: 'sun', id_: 'matahari', color: '#fbbf24' },
  { id: 'battery', en: 'battery', id_: 'baterai', color: '#22c55e' },
  { id: 'food', en: 'food', id_: 'makanan', color: '#ef4444' },
  { id: 'moving', en: 'moving', id_: 'gerak', color: '#38bdf8' },
  { id: 'heat', en: 'heat', id_: 'panas', color: '#f97316' },
  { id: 'light', en: 'light', id_: 'cahaya', color: '#fde68a' },
  { id: 'sound', en: 'sound', id_: 'bunyi', color: '#c084fc' },
  { id: 'electric', en: 'electric', id_: 'listrik', color: '#facc15' },
];
const DEVICES = [
  { id: 'torch', en: 'Torch', id_: 'Senter', chain: ['battery', 'electric', 'light'] },
  { id: 'kettle', en: 'Kettle', id_: 'Ketel listrik', chain: ['electric', 'heat'] },
  { id: 'radio', en: 'Radio', id_: 'Radio', chain: ['battery', 'electric', 'sound'] },
  { id: 'plant', en: 'Plant and runner', id_: 'Tumbuhan dan pelari', chain: ['sun', 'food', 'moving'] },
  { id: 'bike', en: 'Bicycle with lamp', id_: 'Sepeda berlampu', chain: ['food', 'moving', 'electric', 'light'] },
];
const TRAY_Y = 0.84;
const SLOT_Y = 0.36;
const CHAIN_X0 = 0.36, CHAIN_X1 = 0.98;

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

  const cards = CARDS.map((c, i) => ({
    ...c, home: { x: 0.03 + (i + 0.5) * (0.94 / CARDS.length), y: TRAY_Y },
    x: 0, y: 0, slot: null, shakeAt: -10, glowAt: -10, dragging: false,
  }));
  cards.forEach((c) => { c.x = c.home.x; c.y = c.home.y; });
  const state = { dev: DEVICES[0], slots: [], msg: null, msgAt: -10, msgGood: true, doneAt: -10, hintAt: -10, selected: null };
  let now = 0;

  const cardW = () => cv.width * 0.105;
  const cardH = () => cv.height * 0.22;
  const nSlots = () => state.dev.chain.length;
  const slotX = (i) => CHAIN_X0 + (i + 0.5) * ((CHAIN_X1 - CHAIN_X0) / nSlots());
  const isDone = () => state.slots.length === nSlots() && state.slots.every((s) => s != null);

  function setDevice(id) {
    state.dev = DEVICES.find((d) => d.id === id) || DEVICES[0];
    state.slots = new Array(nSlots()).fill(null);
    cards.forEach((c) => { c.slot = null; c.x = c.home.x; c.y = c.home.y; c.glowAt = -10; });
    state.msg = null; state.doneAt = -10; state.selected = null;
  }
  setDevice('torch');

  function say(text, good) { state.msg = text; state.msgAt = now; state.msgGood = good; }

  function tryPlace(card, slotIdx) {
    const want = state.dev.chain[slotIdx];
    if (state.slots[slotIdx] != null) { say(T('That slot is full.', 'Kotak itu sudah terisi.'), false); return false; }
    if (card.id !== want) {
      card.shakeAt = now;
      card.x = card.home.x; card.y = card.home.y;
      say(T('Hmm, not that one. Try another card.', 'Hmm, bukan yang itu. Coba kartu lain.'), false);
      return false;
    }
    state.slots[slotIdx] = card.id;
    card.slot = slotIdx; card.glowAt = now;
    card.x = slotX(slotIdx); card.y = SLOT_Y;
    const prev = slotIdx > 0 ? cardById(state.dev.chain[slotIdx - 1]) : null;
    if (prev && state.slots[slotIdx - 1] != null) say(`${T('Yes!', 'Ya!')} ${name(prev)} → ${name(card)}`, true);
    else say(`${T('Yes!', 'Ya!')} ${name(card)}`, true);
    if (isDone()) { state.doneAt = now; say(T('Energy chain complete! The device works.', 'Rantai energi lengkap! Alatnya bekerja.'), true); }
    return true;
  }
  const cardById = (id) => cards.find((c) => c.id === id);
  const name = (c) => (getLocale() === 'id' ? c.id_ : c.en);

  function nearestSlot(x, y) {
    let best = -1, bd = Infinity;
    for (let i = 0; i < nSlots(); i++) {
      const dx = (x - slotX(i)) * cv.width, dy = (y - SLOT_Y) * cv.height;
      const d = Math.hypot(dx, dy);
      if (dx * dx < (cardW() * 0.8) ** 2 && Math.abs(dy) < cardH() * 0.8 && d < bd) { best = i; bd = d; }
    }
    return best;
  }

  // ---- drawing ----------------------------------------------------------
  function roundCard(ctx, x, y, w, h, fill, stroke, lw) {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, Math.min(12, w * 0.15)); ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  }

  function drawIcon(ctx, id, x, y, s) {
    // s = icon size in px; icon drawn centred on x,y
    ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round';
    if (id === 'sun') {
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = s * 0.07;
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(Math.cos(a) * s * 0.36, Math.sin(a) * s * 0.36); ctx.lineTo(Math.cos(a) * s * 0.48, Math.sin(a) * s * 0.48); ctx.stroke(); }
    } else if (id === 'battery') {
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.roundRect(-s * 0.42, -s * 0.22, s * 0.74, s * 0.44, s * 0.06); ctx.fill();
      ctx.fillRect(s * 0.32, -s * 0.1, s * 0.1, s * 0.2);
      ctx.fillStyle = '#052e16'; ctx.font = `bold ${s * 0.3}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillText('+', -s * 0.18, s * 0.11);
    } else if (id === 'food') {
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(0, s * 0.05, s * 0.36, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.ellipse(s * 0.14, -s * 0.36, s * 0.18, s * 0.08, -0.6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = s * 0.05; ctx.beginPath(); ctx.moveTo(0, -s * 0.3); ctx.lineTo(0, -s * 0.45); ctx.stroke();
    } else if (id === 'moving') {
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = s * 0.08;
      ctx.beginPath(); ctx.arc(s * 0.12, 0, s * 0.26, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.12, 0); ctx.lineTo(s * 0.12 + Math.cos(now * 6) * s * 0.22, Math.sin(now * 6) * s * 0.22); ctx.stroke();
      ctx.lineWidth = s * 0.06;
      [[-0.45, -0.18, -0.25], [-0.5, 0, -0.22], [-0.45, 0.18, -0.25]].forEach(([a, b, c]) => { ctx.beginPath(); ctx.moveTo(a * s, b * s); ctx.lineTo(c * s, b * s); ctx.stroke(); });
    } else if (id === 'heat') {
      const f = 1 + 0.05 * Math.sin(now * 9);
      ctx.fillStyle = '#f97316'; ctx.beginPath();
      ctx.moveTo(0, s * 0.42); ctx.bezierCurveTo(-s * 0.45, s * 0.3, -s * 0.3, -s * 0.1 * f, 0, -s * 0.45 * f);
      ctx.bezierCurveTo(s * 0.1, -s * 0.1, s * 0.45, s * 0.1, 0, s * 0.42); ctx.fill();
      ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.moveTo(0, s * 0.38); ctx.bezierCurveTo(-s * 0.2, s * 0.25, -s * 0.1, 0, 0, -s * 0.1 * f); ctx.bezierCurveTo(s * 0.12, s * 0.05, s * 0.2, s * 0.25, 0, s * 0.38); ctx.fill();
    } else if (id === 'light') {
      ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(0, -s * 0.08, s * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#94a3b8'; ctx.fillRect(-s * 0.14, s * 0.18, s * 0.28, s * 0.2);
      ctx.strokeStyle = '#fde68a'; ctx.lineWidth = s * 0.06;
      [[-0.75, -0.75], [0.75, -0.75], [0, -1]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(a * s * 0.36, b * s * 0.36 - s * 0.08); ctx.lineTo(a * s * 0.48, b * s * 0.48 - s * 0.08); ctx.stroke(); });
    } else if (id === 'sound') {
      ctx.fillStyle = '#c084fc'; ctx.beginPath(); ctx.moveTo(-s * 0.4, -s * 0.15); ctx.lineTo(-s * 0.2, -s * 0.15); ctx.lineTo(0, -s * 0.35); ctx.lineTo(0, s * 0.35); ctx.lineTo(-s * 0.2, s * 0.15); ctx.lineTo(-s * 0.4, s * 0.15); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#c084fc'; ctx.lineWidth = s * 0.07;
      for (let i = 1; i <= 2; i++) { ctx.beginPath(); ctx.arc(s * 0.02, 0, s * 0.18 * i, -0.9, 0.9); ctx.stroke(); }
    } else {
      ctx.fillStyle = '#facc15'; ctx.beginPath();
      ctx.moveTo(s * 0.1, -s * 0.48); ctx.lineTo(-s * 0.28, s * 0.05); ctx.lineTo(-s * 0.02, s * 0.05); ctx.lineTo(-s * 0.12, s * 0.48); ctx.lineTo(s * 0.3, -s * 0.08); ctx.lineTo(s * 0.04, -s * 0.08); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  function drawCard(ctx, c) {
    const W = cv.width, H = cv.height, w = cardW(), h = cardH();
    let px = c.x * W, py = c.y * H;
    const sh = now - c.shakeAt;
    if (sh < 0.6) px += Math.sin(sh * 45) * w * 0.12 * (1 - sh / 0.6);
    const glow = now - c.glowAt < 0.8 ? 1 - (now - c.glowAt) / 0.8 : 0;
    const hint = now - state.hintAt < 2 && c.id === nextWanted();
    const sel = state.selected === c.id;
    if (glow > 0) { ctx.shadowColor = c.color; ctx.shadowBlur = 30 * glow; }
    const stroke = sel ? '#ffffff' : hint ? (Math.sin(now * 10) > 0 ? '#ffffff' : c.color) : c.slot != null ? c.color : 'rgba(255,255,255,0.25)';
    roundCard(ctx, px, py, w, h, c.slot != null ? '#1e293b' : '#111c33', stroke, sel || hint ? 4 : 2);
    ctx.shadowBlur = 0;
    drawIcon(ctx, c.id, px, py - h * 0.12, Math.min(w, h) * 0.72);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.max(9, Math.round(h * 0.17))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(name(c), px, py + h * 0.42);
  }

  function nextWanted() {
    const i = state.slots.findIndex((s) => s == null);
    return i < 0 ? null : state.dev.chain[i];
  }

  function drawDevice(ctx) {
    const W = cv.width, H = cv.height;
    const cx = W * 0.18, cy = H * 0.36, s = Math.min(W * 0.26, H * 0.5);
    const on = isDone();
    const k = on ? Math.min(1, (now - state.doneAt) / 0.5) : 0;
    ctx.save(); ctx.translate(cx, cy); ctx.lineCap = 'round';
    const d = state.dev.id;
    if (d === 'torch') {
      if (on) { ctx.fillStyle = `rgba(253,230,138,${0.35 * k})`; ctx.beginPath(); ctx.moveTo(s * 0.25, -s * 0.12); ctx.lineTo(s * 0.75, -s * 0.45); ctx.lineTo(s * 0.75, s * 0.45); ctx.lineTo(s * 0.25, s * 0.12); ctx.closePath(); ctx.fill(); }
      ctx.fillStyle = '#475569'; ctx.beginPath(); ctx.roundRect(-s * 0.45, -s * 0.1, s * 0.6, s * 0.2, s * 0.04); ctx.fill();
      ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(s * 0.1, -s * 0.12); ctx.lineTo(s * 0.25, -s * 0.2); ctx.lineTo(s * 0.25, s * 0.2); ctx.lineTo(s * 0.1, s * 0.12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = on ? '#fde68a' : '#1e293b'; ctx.fillRect(s * 0.25, -s * 0.2, s * 0.04, s * 0.4);
    } else if (d === 'kettle') {
      ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.roundRect(-s * 0.3, -s * 0.15, s * 0.6, s * 0.45, s * 0.06); ctx.fill();
      ctx.beginPath(); ctx.moveTo(s * 0.28, -s * 0.05); ctx.lineTo(s * 0.45, -s * 0.3); ctx.lineTo(s * 0.5, -s * 0.25); ctx.lineTo(s * 0.3, s * 0.05); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = s * 0.05; ctx.beginPath(); ctx.arc(-s * 0.3, s * 0.05, s * 0.14, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke();
      ctx.fillStyle = '#334155'; ctx.fillRect(-s * 0.25, -s * 0.22, s * 0.5, s * 0.08);
      ctx.fillStyle = on ? '#ef4444' : '#1e293b'; ctx.beginPath(); ctx.arc(0, s * 0.1, s * 0.05, 0, Math.PI * 2); ctx.fill();
      if (on) {
        ctx.strokeStyle = `rgba(226,232,240,${0.7 * k})`; ctx.lineWidth = s * 0.03;
        for (let i = 0; i < 3; i++) {
          const ph = now * 2 + i * 2, y0 = -s * 0.32 - ((now * 0.25 + i * 0.33) % 1) * s * 0.25;
          ctx.beginPath(); ctx.moveTo(s * 0.47 + i * s * 0.03, y0); ctx.quadraticCurveTo(s * 0.5 + Math.sin(ph) * s * 0.06, y0 - s * 0.08, s * 0.47 + i * s * 0.03, y0 - s * 0.16); ctx.stroke();
        }
      }
    } else if (d === 'radio') {
      ctx.fillStyle = '#7c3aed'; ctx.beginPath(); ctx.roundRect(-s * 0.4, -s * 0.22, s * 0.8, s * 0.48, s * 0.06); ctx.fill();
      ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.arc(-s * 0.18, s * 0.02, s * 0.14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c4b5fd'; ctx.fillRect(s * 0.06, -s * 0.12, s * 0.26, s * 0.1);
      ctx.beginPath(); ctx.arc(s * 0.19, s * 0.1, s * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = s * 0.03; ctx.beginPath(); ctx.moveTo(s * 0.3, -s * 0.22); ctx.lineTo(s * 0.42, -s * 0.45); ctx.stroke();
      if (on) {
        ctx.strokeStyle = `rgba(192,132,252,${0.8 * k})`; ctx.lineWidth = s * 0.03;
        for (let i = 1; i <= 3; i++) { const r = s * (0.18 + 0.1 * i) + Math.sin(now * 8) * s * 0.02; ctx.beginPath(); ctx.arc(-s * 0.18, s * 0.02, r, -0.8, 0.8); ctx.stroke(); }
      }
    } else if (d === 'plant') {
      // sun top-left, plant left, runner right
      ctx.fillStyle = on ? '#fbbf24' : '#78350f'; ctx.beginPath(); ctx.arc(-s * 0.38, -s * 0.38, s * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#22c55e'; ctx.lineWidth = s * 0.04;
      ctx.beginPath(); ctx.moveTo(-s * 0.25, s * 0.45); ctx.lineTo(-s * 0.25, s * 0.0); ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath(); ctx.ellipse(-s * 0.35, s * 0.15, s * 0.12, s * 0.05, -0.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-s * 0.15, s * 0.28, s * 0.12, s * 0.05, 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(-s * 0.25, -s * 0.02, s * 0.06, 0, Math.PI * 2); ctx.fill();
      // runner stick figure
      const run = on ? now * 10 : 0, bob = on ? Math.abs(Math.sin(run)) * s * 0.03 : 0;
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = s * 0.045; ctx.fillStyle = '#e2e8f0';
      const hx = s * 0.22, hy = -s * 0.3 - bob;
      ctx.beginPath(); ctx.arc(hx, hy, s * 0.07, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.07); ctx.lineTo(hx, hy + s * 0.35); ctx.stroke();
      const a1 = Math.sin(run) * 0.9, a2 = -Math.sin(run) * 0.9;
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.35); ctx.lineTo(hx + Math.sin(a1) * s * 0.25, hy + s * 0.35 + Math.cos(a1) * s * 0.25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.35); ctx.lineTo(hx + Math.sin(a2) * s * 0.25, hy + s * 0.35 + Math.cos(a2) * s * 0.25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.15); ctx.lineTo(hx + Math.sin(a2) * s * 0.2, hy + s * 0.15 + Math.cos(a2 + 1.2) * s * 0.15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx, hy + s * 0.15); ctx.lineTo(hx + Math.sin(a1) * s * 0.2, hy + s * 0.15 + Math.cos(a1 + 1.2) * s * 0.15); ctx.stroke();
    } else {
      // bike
      const spin = on ? now * 8 : 0;
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = s * 0.035;
      [[-s * 0.28, s * 0.2], [s * 0.28, s * 0.2]].forEach(([x, y]) => {
        ctx.beginPath(); ctx.arc(x, y, s * 0.17, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 4; i++) { const a = spin + i * Math.PI / 4; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * s * 0.17, y - Math.sin(a) * s * 0.17); ctx.lineTo(x + Math.cos(a) * s * 0.17, y + Math.sin(a) * s * 0.17); ctx.stroke(); }
      });
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = s * 0.045;
      ctx.beginPath(); ctx.moveTo(-s * 0.28, s * 0.2); ctx.lineTo(-s * 0.05, -s * 0.12); ctx.lineTo(s * 0.2, -s * 0.12); ctx.lineTo(s * 0.28, s * 0.2); ctx.lineTo(s * 0.02, s * 0.2); ctx.lineTo(-s * 0.05, -s * 0.12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.2, -s * 0.12); ctx.lineTo(s * 0.26, -s * 0.28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-s * 0.05, -s * 0.12); ctx.lineTo(-s * 0.1, -s * 0.24); ctx.stroke();
      // lamp
      ctx.fillStyle = on ? '#fde68a' : '#334155'; ctx.beginPath(); ctx.arc(s * 0.3, -s * 0.28, s * 0.05, 0, Math.PI * 2); ctx.fill();
      if (on) { ctx.fillStyle = `rgba(253,230,138,${0.3 * k})`; ctx.beginPath(); ctx.moveTo(s * 0.33, -s * 0.3); ctx.lineTo(s * 0.62, -s * 0.45); ctx.lineTo(s * 0.62, -s * 0.08); ctx.closePath(); ctx.fill(); }
    }
    ctx.restore();
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.max(12, Math.round(H * 0.05))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(getLocale() === 'id' ? state.dev.id_ : state.dev.en, cx, H * 0.66);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // tray
    ctx.fillStyle = '#131f38'; ctx.beginPath(); ctx.roundRect(W * 0.02, H * 0.7, W * 0.96, H * 0.28, 14); ctx.fill();
    // slots + arrows
    const w = cardW(), h = cardH();
    for (let i = 0; i < nSlots(); i++) {
      const x = slotX(i) * W, y = SLOT_Y * H;
      ctx.setLineDash([6, 5]); ctx.strokeStyle = state.slots[i] ? 'rgba(255,255,255,0.0)' : 'rgba(255,255,255,0.45)'; ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath(); ctx.roundRect(x - w * 0.6, y - h * 0.6, w * 1.2, h * 1.2, 12); ctx.fill(); ctx.stroke();
      ctx.setLineDash([]);
      if (!state.slots[i]) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = `bold ${Math.round(h * 0.5)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillText('?', x, y + h * 0.18); }
      if (i < nSlots() - 1) {
        const x1 = x + w * 0.65, x2 = slotX(i + 1) * W - w * 0.65;
        const flowing = state.slots[i] && state.slots[i + 1];
        ctx.strokeStyle = flowing ? '#facc15' : 'rgba(255,255,255,0.35)'; ctx.lineWidth = flowing ? 4 : 2;
        if (flowing) { ctx.setLineDash([8, 6]); ctx.lineDashOffset = -now * 40; }
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2 - 6, y); ctx.stroke();
        ctx.setLineDash([]); ctx.lineDashOffset = 0;
        ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.moveTo(x2, y); ctx.lineTo(x2 - 10, y - 7); ctx.lineTo(x2 - 10, y + 7); ctx.closePath(); ctx.fill();
      }
    }
    // chain label
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${Math.max(11, Math.round(H * 0.04))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(T('Energy goes in →', 'Energi masuk →'), CHAIN_X0 * W, H * 0.12);
    ctx.textAlign = 'right';
    ctx.fillText(T('→ energy comes out', '→ energi keluar'), CHAIN_X1 * W, H * 0.12);
    drawDevice(ctx);
    // cards: slotted first, then tray, dragging on top
    const order = [...cards].sort((a, b) => (a.dragging ? 1 : 0) - (b.dragging ? 1 : 0));
    for (const c of order) drawCard(ctx, c);
    // message
    const fs = Math.max(12, Math.round(H * 0.048));
    ctx.textAlign = 'center';
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    if (state.msg && now - state.msgAt < 4) {
      ctx.fillStyle = state.msgGood ? '#4ade80' : '#fb923c';
      ctx.fillText(state.msg, W * 0.5, H * 0.045 + fs * 0.4);
    } else {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T('Drag a card into a "?" slot. Or tap a card, then tap a slot.', 'Seret kartu ke kotak "?". Atau ketuk kartu, lalu ketuk kotak.'), W * 0.5, H * 0.045 + fs * 0.4);
    }
    ctx.textAlign = 'left';
  }

  // ---- interaction ------------------------------------------------------
  let startPos = null, moved = 0;
  const drag = dragHandle(cv.canvas, {
    hitTest(px, py) {
      const W = cv.width, H = cv.height, w = cardW(), h = cardH();
      for (const c of [...cards].reverse()) {
        if (Math.abs(px - c.x * W) < w * 0.6 && Math.abs(py - c.y * H) < h * 0.6) return c.id;
      }
      for (let i = 0; i < nSlots(); i++) {
        if (Math.abs(px - slotX(i) * W) < w * 0.65 && Math.abs(py - SLOT_Y * H) < h * 0.65) return `slot:${i}`;
      }
      return null;
    },
    onStart(id, px, py) {
      startPos = { x: px, y: py }; moved = 0;
      if (String(id).startsWith('slot:')) return;
      const c = cardById(id);
      if (c.slot != null) { state.slots[c.slot] = null; c.slot = null; state.doneAt = -10; }
      c.dragging = true;
    },
    onDrag(id, px, py) {
      if (String(id).startsWith('slot:')) return;
      const c = cardById(id);
      moved = Math.max(moved, Math.hypot(px - startPos.x, py - startPos.y));
      c.x = Math.max(0.04, Math.min(0.96, px / cv.width));
      c.y = Math.max(0.1, Math.min(0.95, py / cv.height));
    },
    onEnd(id) {
      if (String(id).startsWith('slot:')) {
        const i = Number(String(id).slice(5));
        if (state.selected) { const c = cardById(state.selected); state.selected = null; tryPlace(c, i); }
        else say(T('Tap a card first.', 'Ketuk sebuah kartu dulu.'), false);
        return;
      }
      const c = cardById(id);
      c.dragging = false;
      if (moved < 6) {
        // a tap: select / deselect this card
        state.selected = state.selected === c.id ? null : c.id;
        c.x = c.home.x; c.y = c.home.y;
        if (state.selected) say(`${name(c)} — ${T('now tap a "?" slot', 'sekarang ketuk kotak "?"')}`, true);
        return;
      }
      state.selected = null;
      // Dropped near a slot: try it. Otherwise the card stays where it is, so a
      // keyboard user can keep nudging it towards a slot.
      const i = nearestSlot(c.x, c.y);
      if (i >= 0) tryPlace(c, i);
    },
    handles: () => cards.map((c) => ({ id: c.id, x: c.x * cv.width, y: c.y * cv.height, label: `${name(c)} card (arrows to move, or press to select then move to a slot)` })),
    keyStep: 12,
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Controls
  const devSel = select({
    label: T('Which device?', 'Alat mana?'), key: 'device',
    options: DEVICES.map((d) => ({ value: d.id, label: getLocale() === 'id' ? d.id_ : d.en })),
    value: 'torch',
    onChange: (v) => setDevice(v),
  });
  const hintB = bigBtn(T('Hint', 'Petunjuk'), () => {
    state.hintAt = now;
    const want = nextWanted();
    if (want) say(T('Look for the card that is blinking.', 'Cari kartu yang berkedip.'), true);
  }, true);
  const resetB = bigBtn(T('Start again', 'Mulai lagi'), () => setDevice(state.dev.id));
  ctrlPanel.append(devSel.el, row(hintB, resetB));

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
