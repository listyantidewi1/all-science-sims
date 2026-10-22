import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const DAY = 720;   // minutes on a 12-hour dial

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

const pad = (n) => String(n).padStart(2, '0');
// digital text: 07:35 (Indonesian schools write 07.35)
function digital(total) {
  const h = Math.floor(total / 60), m = total % 60;
  const hh = h === 0 ? 12 : h;
  return getLocale() === 'id' ? `${pad(hh)}.${pad(m)}` : `${pad(hh)}:${pad(m)}`;
}
// the time in words, the way children say it
function words(total) {
  const h = Math.floor(total / 60), m = total % 60;
  const hh = h === 0 ? 12 : h, next = hh === 12 ? 1 : hh + 1;
  if (getLocale() === 'id') {
    if (m === 0) return `pukul ${hh} tepat`;
    if (m === 30) return `pukul setengah ${next}`;
    if (m === 15) return `pukul ${hh} lewat seperempat`;
    if (m === 45) return `pukul ${next} kurang seperempat`;
    if (m < 30) return `pukul ${hh} lewat ${m} menit`;
    return `pukul ${next} kurang ${60 - m} menit`;
  }
  if (m === 0) return `${hh} o'clock`;
  if (m === 30) return `half past ${hh}`;
  if (m === 15) return `quarter past ${hh}`;
  if (m === 45) return `quarter to ${next}`;
  if (m < 30) return `${m} past ${hh}`;
  return `${60 - m} to ${next}`;
}
function duration(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  const hs = h ? T(`${h} hour${h === 1 ? '' : 's'}`, `${h} jam`) : '';
  const ms = m ? T(`${m} minute${m === 1 ? '' : 's'}`, `${m} menit`) : '';
  if (!hs && !ms) return T('0 minutes', '0 menit');
  return [hs, ms].filter(Boolean).join(' ');
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const ctx = cv.ctx;

  const state = {
    mode: 'free',           // free | set | elapsed
    easy: false,
    times: [7 * 60 + 30, 9 * 60 + 15],   // clock 0 (start) and clock 1 (end)
    cur: 0,                 // which clock the buttons move
    target: 3 * 60,
    solvedAt: -10,
    streak: 0,
  };
  let now = 0;
  const wrap = (t) => ((t % DAY) + DAY) % DAY;

  function newTarget() {
    const stepMin = state.easy ? 30 : 5;
    let t = state.target;
    while (t === state.target || t === state.times[0]) t = Math.floor(Math.random() * (DAY / stepMin)) * stepMin;
    state.target = t;
    state.solvedAt = -10;
  }
  newTarget();

  // ---- geometry -----------------------------------------------------------
  function clocks() {
    const W = cv.width, H = cv.height;
    if (state.mode === 'elapsed') {
      // smaller clocks leave room for the question and answer above and the timeline below
      const r = Math.min(H * 0.26, W * 0.17);
      return [{ cx: W * 0.25, cy: H * 0.47, r }, { cx: W * 0.75, cy: H * 0.47, r }];
    }
    const r = Math.min(H * 0.42, W * 0.27);
    return [{ cx: W * 0.30, cy: H * 0.5, r }];
  }
  const handAngle = (total, hand) => (hand === 'm' ? (total % 60) / 60 : total / DAY) * Math.PI * 2;
  function tip(c, total, hand) {
    const a = handAngle(total, hand);
    const len = hand === 'm' ? c.r * 0.78 : c.r * 0.5;
    return { x: c.cx + Math.sin(a) * len, y: c.cy - Math.cos(a) * len };
  }

  // ---- drawing ------------------------------------------------------------
  function font(px, bold = true) {
    return `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  }
  function drawClock(c, total, label, active) {
    const { cx, cy, r } = c;
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = active ? '#facc15' : '#475569'; ctx.lineWidth = Math.max(3, r * 0.06);
    ctx.stroke();
    // minute marks
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const big = i % 5 === 0;
      const r1 = big ? r * 0.86 : r * 0.92;
      ctx.strokeStyle = big ? '#0f172a' : '#94a3b8';
      ctx.lineWidth = big ? Math.max(2, r * 0.025) : 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1);
      ctx.lineTo(cx + Math.sin(a) * r * 0.96, cy - Math.cos(a) * r * 0.96);
      ctx.stroke();
    }
    // hour numbers, and small minute numbers outside
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f172a';
    ctx.font = font(r * 0.17);
    for (let n = 1; n <= 12; n++) {
      const a = (n / 12) * Math.PI * 2;
      ctx.fillText(String(n), cx + Math.sin(a) * r * 0.70, cy - Math.cos(a) * r * 0.70 + r * 0.06);
    }
    if (r > 70) {
      ctx.fillStyle = '#ef4444';
      ctx.font = font(r * 0.085, false);
      for (let n = 1; n <= 12; n++) {
        const a = (n / 12) * Math.PI * 2;
        ctx.fillText(String(n * 5 === 60 ? 0 : n * 5), cx + Math.sin(a) * r * 1.09, cy - Math.cos(a) * r * 1.09 + r * 0.03);
      }
    }
    // hands
    const ht = tip(c, total, 'h'), mt = tip(c, total, 'm');
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = Math.max(5, r * 0.075);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ht.x, ht.y); ctx.stroke();
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = Math.max(4, r * 0.05);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mt.x, mt.y); ctx.stroke();
    ctx.lineCap = 'butt';
    // grab knobs at the tips
    const kr = knobR(c);
    ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(ht.x, ht.y, kr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(mt.x, mt.y, kr, 0, Math.PI * 2); ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(cx, cy, Math.max(3, r * 0.04), 0, Math.PI * 2); ctx.fill();
    if (label) {
      ctx.fillStyle = active ? '#facc15' : '#cbd5e1';
      ctx.font = font(Math.max(11, r * 0.16));
      ctx.fillText(label, cx, cy - r - Math.max(8, r * 0.14));
    }
  }
  const knobR = (c) => Math.max(10, c.r * 0.09);

  function drawTimeline(W, H) {
    const t0 = state.times[0], t1 = state.times[1];
    const el = wrap(t1 - t0);
    const y = H * 0.90, xa = W * 0.12, xb = W * 0.88;
    const span = Math.max(el, 60);
    const xOf = (m) => xa + (xb - xa) * (m / span);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xOf(el), y); ctx.stroke();
    ctx.font = font(Math.max(10, H * 0.04), false);
    ctx.textAlign = 'center';
    // hour jumps then the minutes
    const hours = Math.floor(el / 60), mins = el % 60;
    const arc = (a, b, col, text) => {
      const x1 = xOf(a), x2 = xOf(b);
      const h = H * 0.05;
      ctx.strokeStyle = col; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.quadraticCurveTo((x1 + x2) / 2, y - 2 * h, x2, y); ctx.stroke();
      ctx.fillStyle = col;
      if (x2 - x1 > 28) ctx.fillText(text, (x1 + x2) / 2, y - h - 4);
    };
    for (let i = 0; i < hours; i++) arc(i * 60, (i + 1) * 60, '#f59e0b', T('+1 h', '+1 jam'));
    if (mins) arc(hours * 60, el, '#22c55e', `+${mins} ${T('min', 'mnt')}`);
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i <= hours; i++) {
      const x = xOf(i * 60);
      ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); ctx.stroke();
      if (hours <= 6 || i % 2 === 0) ctx.fillText(digital(wrap(t0 + i * 60)), x, y + H * 0.055);
    }
    if (mins) {
      const x = xOf(el);
      ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.fillText(digital(t1), x, y + H * 0.055);
    }
  }

  function draw() {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const cs = clocks();
    ctx.textAlign = 'center';

    if (state.mode === 'elapsed') {
      drawClock(cs[0], state.times[0], T('Start', 'Mulai'), state.cur === 0);
      drawClock(cs[1], state.times[1], T('End', 'Selesai'), state.cur === 1);
      const fs = Math.max(12, Math.min(W * 0.03, H * 0.06));
      ctx.fillStyle = '#fff'; ctx.font = font(fs);
      ctx.fillText(digital(state.times[0]), cs[0].cx, cs[0].cy + cs[0].r + fs * 1.1);
      ctx.fillText(digital(state.times[1]), cs[1].cx, cs[1].cy + cs[1].r + fs * 1.1);
      const el = wrap(state.times[1] - state.times[0]);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8, false);
      ctx.fillText(T('How long from start to end?', 'Berapa lama dari mulai sampai selesai?'), W / 2, H * 0.07);
      ctx.fillStyle = '#facc15'; ctx.font = font(fs * 1.25);
      ctx.fillText(duration(el), W / 2, H * 0.155);
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7, false);
      ctx.fillText('→', W / 2, H * 0.47);
      drawTimeline(W, H);
      return;
    }

    const c = cs[0];
    drawClock(c, state.times[0], '', false);
    // right-hand panel: digital time and words
    const px = W * 0.62, pw = W * 0.35;
    const fsBig = Math.max(20, Math.min(pw * 0.3, H * 0.19));
    ctx.fillStyle = '#111827';
    ctx.beginPath(); ctx.roundRect(px, H * 0.16, pw, fsBig * 1.5, 12); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#4ade80';
    ctx.font = `bold ${Math.round(fsBig)}px ui-monospace, Menlo, Consolas, monospace`;
    ctx.fillText(digital(state.times[0]), px + pw / 2, H * 0.16 + fsBig * 1.1);
    ctx.fillStyle = '#e2e8f0';
    let wf = Math.max(12, Math.min(pw * 0.11, H * 0.06));
    ctx.font = font(wf);
    while (wf > 11 && ctx.measureText(words(state.times[0])).width > pw) { wf -= 1; ctx.font = font(wf); }   // e.g. 'pukul 12 kurang seperempat'
    ctx.fillText(words(state.times[0]), px + pw / 2, H * 0.16 + fsBig * 1.5 + H * 0.08);
    // legend
    const ls = Math.max(10, Math.min(pw * 0.08, H * 0.045));
    ctx.font = font(ls, false);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#3b82f6'; ctx.fillText(T('short hand = hour', 'jarum pendek = jam'), px, H * 0.80);
    ctx.fillStyle = '#ef4444'; ctx.fillText(T('long hand = minutes', 'jarum panjang = menit'), px, H * 0.80 + ls * 1.4);
    ctx.fillStyle = '#94a3b8'; ctx.fillText(T('drag the round knobs', 'geser bulatan di ujung jarum'), px, H * 0.80 + ls * 2.8);
    ctx.textAlign = 'center';

    if (state.mode === 'set') {
      const solved = state.times[0] === state.target;
      if (solved && state.solvedAt < 0) { state.solvedAt = now; state.streak += 1; }
      if (solved && now - state.solvedAt > 2.2) newTarget();
      const bx = px, by = H * 0.57, bw = pw, bh = H * 0.19;   // below the words line, above the legend
      ctx.fillStyle = solved ? 'rgba(34,197,94,0.9)' : 'rgba(250,204,21,0.15)';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 12); ctx.fill();
      ctx.strokeStyle = solved ? '#22c55e' : '#facc15'; ctx.lineWidth = 2; ctx.stroke();
      const tf = Math.max(11, Math.min(pw * 0.095, H * 0.05));
      ctx.font = font(tf, false);
      ctx.fillStyle = solved ? '#052e16' : '#facc15';
      if (solved) {
        ctx.font = font(tf * 1.3);
        ctx.fillText(T('Correct!', 'Benar!'), bx + bw / 2, by + bh * 0.45);
        ctx.font = font(tf, false);
        ctx.fillText(T(`${state.streak} in a row`, `${state.streak} berturut-turut`), bx + bw / 2, by + bh * 0.8);
      } else {
        ctx.fillText(T('Set the clock to', 'Atur jam ke'), bx + bw / 2, by + bh * 0.3);
        ctx.font = font(tf * 1.4);
        ctx.fillStyle = '#fff';
        ctx.fillText(digital(state.target), bx + bw / 2, by + bh * 0.62);
        ctx.font = font(tf * 0.85, false);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(words(state.target), bx + bw / 2, by + bh * 0.9);
      }
    }
    ctx.textAlign = 'left';
  }

  // ---- dragging the hands ---------------------------------------------------
  const angleOf = (c, x, y) => {
    const a = Math.atan2(x - c.cx, -(y - c.cy));   // 0 at 12 o'clock, clockwise
    return a < 0 ? a + Math.PI * 2 : a;
  };
  const parseId = (id) => ({ hand: id[0], ci: Number(id[1]) });
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const cs = clocks();
      for (let ci = 0; ci < cs.length; ci++) {
        const c = cs[ci];
        const hit = knobR(c) * 1.8;
        const mt = tip(c, state.times[ci], 'm');
        if (Math.hypot(x - mt.x, y - mt.y) < hit) return `m${ci}`;
        const ht = tip(c, state.times[ci], 'h');
        if (Math.hypot(x - ht.x, y - ht.y) < hit) return `h${ci}`;
      }
      return null;
    },
    onStart(id) { const { ci } = parseId(id); state.cur = ci; state.solvedAt = -10; },
    onDrag(id, x, y) {
      const { hand, ci } = parseId(id);
      const c = clocks()[ci];
      if (!c) return;
      const a = angleOf(c, x, y) / (Math.PI * 2);   // 0..1 of a turn
      const snap = state.easy || state.mode === 'set' ? 5 : 1;   // targets are 5-minute times, so snap to them in the challenge
      const old = state.times[ci];
      if (hand === 'm') {
        let m = Math.round((a * 60) / snap) * snap;
        if (m >= 60) m = 0;
        const prevM = old % 60;
        let h = Math.floor(old / 60);
        if (prevM > 45 && m < 15) h += 1;       // went past the 12 forwards
        else if (prevM < 15 && m > 45) h -= 1;  // went past the 12 backwards
        state.times[ci] = wrap(h * 60 + m);
      } else {
        const total = Math.round((a * DAY) / 5) * 5;
        state.times[ci] = wrap(total);
      }
    },
    handles: () => {
      const cs = clocks();
      const out = [];
      cs.forEach((c, ci) => {
        const mt = tip(c, state.times[ci], 'm'), ht = tip(c, state.times[ci], 'h');
        const who = cs.length > 1 ? (ci === 0 ? T(' of the start clock', ' jam mulai') : T(' of the end clock', ' jam selesai')) : '';
        out.push({ id: `m${ci}`, x: mt.x, y: mt.y, label: T(`Minute hand${who} (arrow keys turn it)`, `Jarum menit${who} (tombol panah memutarnya)`) });
        out.push({ id: `h${ci}`, x: ht.x, y: ht.y, label: T(`Hour hand${who} (arrow keys turn it)`, `Jarum jam${who} (tombol panah memutarnya)`) });
      });
      return out;
    },
    keyStep: 14,
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls ---------------------------------------------------------------
  const move = (d) => { state.times[state.cur] = wrap(state.times[state.cur] + d); state.solvedAt = -10; };
  const m5 = bigBtn(T('−5 min', '−5 menit'), () => move(-5));
  const p5 = bigBtn(T('+5 min', '+5 menit'), () => move(5));
  const p60 = bigBtn(T('+1 hour', '+1 jam'), () => move(60));
  const mode = select({
    label: T('What to do', 'Kegiatan'), key: 'mode',
    options: [
      { value: 'free', label: T('Explore the clock', 'Jelajahi jam') },
      { value: 'set', label: T('Set the clock to…', 'Atur jam ke…') },
      { value: 'elapsed', label: T('Elapsed time (two clocks)', 'Lama waktu (dua jam)') },
    ],
    value: 'free',
    onChange: (v) => { state.mode = v; state.cur = 0; state.solvedAt = -10; if (v === 'set') newTarget(); },
  });
  const easy = toggle({ label: T('Easy: hours and half hours', 'Mudah: jam dan setengah jam'), key: 'easy', value: false, onChange: (v) => { state.easy = v; if (state.mode === 'set') newTarget(); } });
  const next = bigBtn(T('New time', 'Waktu baru'), () => { if (state.mode === 'set') newTarget(); else { state.times[state.cur] = Math.floor(Math.random() * 144) * 5; } });
  ctrlPanel.append(row(m5, p5, p60, next), mode.el, easy.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
