import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const JUMP_TIME = 0.45;   // seconds per hop
const MAX = 100;

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1.05rem';
  b.el.style.padding = '10px 18px';
  b.el.style.minWidth = '72px';
  return b;
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
    pos: 0,            // where the frog sits (integer 0..100)
    from: 0, to: 0,    // current hop
    hopT: 1,           // 0..1 progress of the hop (1 = landed)
    target: 0,
    blocks: false,     // "tens and ones" mode
    start: 0,          // start of the current journey (for the lab)
    jumps: [],         // list of +10 / -1 … since the start
    reachedAt: -10,    // time when the target was reached
    bumpAt: -10,       // time of the last "too far" bump
    bumpDir: 0,
    hint: '',
  };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function newTarget() {
    let t = state.pos;
    while (t === state.pos) t = Math.floor(Math.random() * (MAX + 1));
    state.target = t;
    state.start = state.pos;
    state.jumps = [];
    state.reachedAt = -10;
  }
  newTarget();

  function jump(d) {
    const landed = state.hopT >= 1 ? state.pos : state.to;
    const next = landed + d;
    if (next < 0 || next > MAX) {
      state.bumpAt = now; state.bumpDir = Math.sign(d);
      return;
    }
    state.pos = landed;
    state.from = landed; state.to = next; state.hopT = 0;
    state.jumps.push(d);
    if (state.jumps.length > 60) state.start += state.jumps.shift();   // keep the drawn arcs anchored to the right place
  }

  function step(dt) {
    if (state.hopT < 1) {
      state.hopT = Math.min(1, state.hopT + dt / JUMP_TIME);
      if (state.hopT >= 1) {
        state.pos = state.to;
        if (state.pos === state.target && state.reachedAt < 0) state.reachedAt = now;
      }
    }
  }

  // ---- geometry -------------------------------------------------------
  const lineY = () => cv.height * (state.blocks ? 0.50 : 0.62);
  const x0 = () => cv.width * 0.06;
  const x1 = () => cv.width * 0.94;
  const xOf = (n) => x0() + (x1() - x0()) * (n / MAX);
  const unit = () => (x1() - x0()) / MAX;

  function frogPos() {
    if (state.hopT >= 1) return { x: xOf(state.pos), y: lineY() };
    const p = state.hopT;
    const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const xa = xOf(state.from), xb = xOf(state.to);
    const dist = Math.abs(state.to - state.from);
    const h = Math.min(cv.height * 0.22, cv.height * (dist >= 10 ? 0.2 : 0.09));
    return { x: xa + (xb - xa) * ease, y: lineY() - Math.sin(Math.PI * p) * h };
  }

  function font(px, bold = true) {
    return `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  }

  function drawFrog(x, y, r) {
    // body
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.ellipse(x, y - r * 0.9, r * 1.15, r * 0.9, 0, 0, Math.PI * 2); ctx.fill();
    // eyes
    for (const s of [-1, 1]) {
      ctx.fillStyle = '#22c55e';
      ctx.beginPath(); ctx.arc(x + s * r * 0.6, y - r * 1.7, r * 0.42, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x + s * r * 0.6, y - r * 1.72, r * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0b1220';
      ctx.beginPath(); ctx.arc(x + s * r * 0.66, y - r * 1.72, r * 0.13, 0, Math.PI * 2); ctx.fill();
    }
    // smile
    ctx.strokeStyle = '#14532d'; ctx.lineWidth = Math.max(1.5, r * 0.12); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(x, y - r * 0.95, r * 0.55, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    // feet
    ctx.fillStyle = '#16a34a';
    ctx.beginPath(); ctx.ellipse(x - r * 0.8, y - r * 0.1, r * 0.5, r * 0.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + r * 0.8, y - r * 0.1, r * 0.5, r * 0.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.lineCap = 'butt';
  }

  function drawFlag(x, y, h) {
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + h * 0.6, y - h * 0.8); ctx.lineTo(x, y - h * 0.6); ctx.closePath(); ctx.fill();
  }

  function drawBlocks(W, H) {
    // tens as long rods, ones as small cubes; shown while the frog sits still
    const n = state.hopT >= 1 ? state.pos : state.from;
    const tens = Math.floor(n / 10), ones = n % 10;
    const top = H * 0.60, bottom = H * 0.95;
    const cube = Math.min(W * 0.022, (bottom - top) / 11);
    const gap = cube * 0.35;
    let x = W * 0.08;
    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < tens; i++) {
      ctx.beginPath(); ctx.roundRect(x, bottom - cube * 10, cube, cube * 10, 3); ctx.fill();
      x += cube + gap;
    }
    if (tens > 0) x += cube;
    ctx.fillStyle = '#22c55e';
    for (let i = 0; i < ones; i++) {
      ctx.beginPath(); ctx.roundRect(x, bottom - cube * (i + 1) - gap * i, cube, cube, 3); ctx.fill();
    }
    // the sentence 47 = 40 + 7
    const fs = Math.max(14, H * 0.07);
    ctx.textAlign = 'right';
    ctx.font = font(fs);
    const tx = W * 0.94, ty = top + fs * 1.2;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${n} = `, tx - fs * 4.2, ty);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`${tens * 10}`, tx - fs * 2.4, ty);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('+', tx - fs * 1.4, ty);
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`${ones}`, tx - fs * 0.2, ty);
    ctx.font = font(fs * 0.5, false);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(T(`${tens} tens`, `${tens} puluhan`), tx - fs * 2.4, ty + fs * 0.8);
    ctx.fillStyle = '#22c55e';
    ctx.fillText(T(`${ones} ones`, `${ones} satuan`), tx - fs * 0.2, ty + fs * 0.8);
    ctx.textAlign = 'left';
  }

  function draw() {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const ly = lineY();
    const u = unit();

    // Faint arcs for the recent jumps
    let p = state.start;
    ctx.lineWidth = 2;
    for (const d of state.jumps) {
      const q = p + d;
      const xa = xOf(p), xb = xOf(q);
      const h = Math.abs(d) >= 10 ? H * 0.12 : H * 0.05;
      ctx.strokeStyle = Math.abs(d) >= 10 ? 'rgba(245,158,11,0.45)' : 'rgba(34,197,94,0.45)';
      ctx.beginPath(); ctx.moveTo(xa, ly); ctx.quadraticCurveTo((xa + xb) / 2, ly - 2 * h, xb, ly); ctx.stroke();
      p = q;
    }

    // Number line
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x0(), ly); ctx.lineTo(x1(), ly); ctx.stroke();
    const showOnes = u >= 4;
    for (let n = 0; n <= MAX; n++) {
      const big = n % 10 === 0, mid = n % 5 === 0;
      if (!big && !mid && !showOnes) continue;
      const x = xOf(n);
      ctx.lineWidth = big ? 3 : 1.5;
      ctx.strokeStyle = big ? '#e2e8f0' : 'rgba(226,232,240,0.55)';
      const len = big ? H * 0.045 : mid ? H * 0.03 : H * 0.018;
      ctx.beginPath(); ctx.moveTo(x, ly - len); ctx.lineTo(x, ly + len); ctx.stroke();
    }
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.font = font(Math.max(10, Math.min(W * 0.028, H * 0.06)), false);
    for (let n = 0; n <= MAX; n += 10) ctx.fillText(String(n), xOf(n), ly + H * 0.11);

    // Target flag
    drawFlag(xOf(state.target), ly, H * 0.13);
    ctx.fillStyle = '#ef4444';
    ctx.font = font(Math.max(11, H * 0.045));
    ctx.fillText(String(state.target), Math.min(W - H * 0.05, xOf(state.target) + H * 0.09), ly - H * 0.14);   // keep '100' on screen

    // Frog
    const f = frogPos();
    const r = Math.max(8, Math.min(W * 0.03, H * 0.055));
    drawFrog(f.x, f.y, r);

    // "Too far" bump
    if (now - state.bumpAt < 1.2) {
      ctx.fillStyle = '#f97316';
      ctx.font = font(Math.max(12, H * 0.05));
      ctx.textAlign = state.bumpDir > 0 ? 'right' : 'left';
      ctx.fillText(T('Too far! The line ends here.', 'Terlalu jauh! Garisnya habis.'), state.bumpDir > 0 ? x1() : x0(), ly - H * 0.2);
      ctx.textAlign = 'center';
    }

    // Big number at the top
    const fsBig = Math.max(22, H * 0.16);
    ctx.font = font(fsBig);
    ctx.fillStyle = '#fff';
    ctx.fillText(String(state.hopT >= 1 ? state.pos : state.from), W * 0.5, H * 0.17);
    ctx.font = font(Math.max(11, H * 0.045), false);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('the frog is here', 'katak ada di sini'), W * 0.5, H * 0.17 + fsBig * 0.45);

    // Jump count, left; target, right
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = font(Math.max(11, H * 0.045), false);
    ctx.fillText(T(`Jumps: ${state.jumps.length}`, `Lompatan: ${state.jumps.length}`), W * 0.04, H * 0.08);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fca5a5';
    ctx.fillText(T(`Target: ${state.target}`, `Sasaran: ${state.target}`), W * 0.96, H * 0.08);
    const diff = state.target - (state.hopT >= 1 ? state.pos : state.to);
    if (diff !== 0 && state.hopT >= 1) {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(diff > 0 ? T(`${diff} more to go →`, `kurang ${diff} lagi →`) : T(`← ${-diff} back`, `← mundur ${-diff}`), W * 0.96, H * 0.14);
    }
    ctx.textAlign = 'center';

    // Success banner
    if (state.reachedAt >= 0 && state.hopT >= 1 && state.pos === state.target) {
      const age = now - state.reachedAt;
      const pulse = 1 + 0.05 * Math.sin(age * 6);
      ctx.fillStyle = 'rgba(34,197,94,0.92)';
      const bw = Math.min(W * 0.7, 420) * pulse, bh = H * 0.13;
      ctx.beginPath(); ctx.roundRect(W / 2 - bw / 2, H * 0.27 - bh / 2, bw, bh, 14); ctx.fill();
      ctx.fillStyle = '#052e16';
      const msg = T(`Hooray! You landed on ${state.target} in ${state.jumps.length} jumps.`, `Hore! Kamu mendarat di ${state.target} dengan ${state.jumps.length} lompatan.`);
      let fs = Math.max(13, bh * 0.45);
      ctx.font = font(fs);
      while (fs > 11 && ctx.measureText(msg).width > bw - 24) { fs -= 1; ctx.font = font(fs); }   // shrink to fit the banner
      ctx.fillText(msg, W / 2, H * 0.27 + bh * 0.17);
      // little stars
      for (let i = 0; i < 8; i++) {
        const a = age * 2 + i * Math.PI / 4;
        const rr = bw * 0.55 + Math.sin(age * 4 + i) * 10;
        ctx.fillStyle = ['#facc15', '#f472b6', '#38bdf8', '#a3e635'][i % 4];
        ctx.beginPath(); ctx.arc(W / 2 + Math.cos(a) * rr, H * 0.27 + Math.sin(a) * bh * 0.9, 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    if (state.blocks) drawBlocks(W, H);
    ctx.textAlign = 'left';
  }

  // ---- controls -------------------------------------------------------
  const b10 = bigBtn('+10', () => jump(10), true);
  const b1 = bigBtn('+1', () => jump(1), true);
  const m1 = bigBtn('−1', () => jump(-1));
  const m10 = bigBtn('−10', () => jump(-10));
  b10.el.style.background = '#f59e0b'; b10.el.style.color = '#1c1917'; b10.el.style.borderColor = '#f59e0b';
  b1.el.style.background = '#22c55e'; b1.el.style.color = '#052e16'; b1.el.style.borderColor = '#22c55e';
  const target = bigBtn(T('New target', 'Sasaran baru'), () => newTarget());
  const home = bigBtn(T('Back to 0', 'Kembali ke 0'), () => {
    state.pos = 0; state.from = 0; state.to = 0; state.hopT = 1;
    state.start = 0; state.jumps = []; state.reachedAt = -10;
    if (state.target === 0) newTarget();
  });
  const blocksT = toggle({ label: T('Tens and ones', 'Puluhan dan satuan'), key: 'blocks', value: false, onChange: (v) => { state.blocks = v; } });
  ctrlPanel.append(row(m10, m1, b1, b10), row(target, home, blocksT));

  const lab = labPanel({
    title: 'Frog journeys',
    filename: 'number-line-data.csv',
    columns: [
      { key: 'start', label: 'Start' },
      { key: 'jumps', label: 'Jumps' },
      { key: 'count', label: 'How many jumps' },
      { key: 'end', label: 'End' },
    ],
    procedure: [
      'Press New target and read the target number.',
      'Plan your jumps out loud: how many +10 and how many +1?',
      'Make the jumps. When the frog lands on the flag, press Record.',
      'Try the same target again with fewer jumps. Which plan was shortest?',
    ],
    predict: 'From 23 to 55: how many jumps do you need? Write your plan.',
    source: () => {
      if (state.jumps.length === 0 || state.hopT < 1) return null;
      const jumps = state.jumps.map((d) => (d > 0 ? `+${d}` : `−${-d}`)).join(' ');
      return { start: state.start, jumps, count: state.jumps.length, end: state.pos };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
