import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
// Indonesian writes 2.345, English 2,345
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, getLocale() === 'id' ? '.' : ',');

// places from left to right: thousands, hundreds, tens, ones
const PLACES = [
  { value: 1000, color: '#a855f7', en: 'thousands', id: 'ribuan' },
  { value: 100, color: '#3b82f6', en: 'hundreds', id: 'ratusan' },
  { value: 10, color: '#f59e0b', en: 'tens', id: 'puluhan' },
  { value: 1, color: '#22c55e', en: 'ones', id: 'satuan' },
];
const LIMIT = 10000;
const TRADE_TIME = 0.9;

function bigBtn(label, onClick, color) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 14px';
  b.el.style.minWidth = '76px';
  if (color) { b.el.style.borderColor = color; b.el.style.boxShadow = `inset 0 -4px 0 ${color}`; }
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
  cv.canvas.style.touchAction = 'none';

  // Two numbers (B only shown in compare mode). digits[p] = how many blocks in that column.
  const nums = [
    { digits: [0, 0, 0, 0], trade: null, pop: [0, 0, 0, 0] },
    { digits: [0, 0, 0, 0], trade: null, pop: [0, 0, 0, 0] },
  ];
  const state = { compare: false, cur: 0, msgAt: -10, msg: '' };
  let now = 0;

  const valueOf = (n) => n.digits.reduce((s, d, p) => s + d * PLACES[p].value, 0);

  function add(ni, p, k) {
    const n = nums[ni];
    const v = valueOf(n) + k * PLACES[p].value;
    if (v > LIMIT) { state.msg = T(`${fmt(LIMIT)} is the biggest number here!`, `${fmt(LIMIT)} adalah bilangan terbesar di sini!`); state.msgAt = now; return; }
    if (v < 0 || n.digits[p] + k < 0) {
      if (n.digits[p] === 0 && valueOf(n) >= PLACES[p].value) {
        // Borrow: break one block of the next place into ten of this place (no animation; keep it simple)
        let q = p - 1;
        while (q >= 0 && n.digits[q] === 0) q--;
        if (q < 0) return;
        n.digits[q] -= 1;
        for (let r = q + 1; r < p; r++) n.digits[r] += 9;
        n.digits[p] += 10 + k;
        state.msg = T(`One ${PLACES[q].en.slice(0, -1)} was broken into smaller blocks.`, `Satu ${PLACES[q].id} dipecah menjadi balok yang lebih kecil.`);
        state.msgAt = now;
      } else {
        state.msg = T('There is nothing to take away.', 'Tidak ada yang bisa diambil.');
        state.msgAt = now;
      }
      return;
    }
    n.digits[p] += k;
    if (k > 0) n.pop[p] = now;
  }

  function step(dt) {
    for (const n of nums) {
      if (n.trade) {
        n.trade.t += dt / TRADE_TIME;
        if (n.trade.t >= 1) {
          const p = n.trade.place;
          n.digits[p] -= 10;
          n.digits[p - 1] += 1;
          n.pop[p - 1] = now;
          n.trade = null;
        }
        continue;
      }
      for (let p = 3; p >= 1; p--) {
        if (n.digits[p] >= 10) { n.trade = { place: p, t: 0 }; break; }
      }
    }
  }

  // ---- layout -----------------------------------------------------------
  // Each number occupies a horizontal band [bx, bx+bw]; columns inside it.
  function bands() {
    const W = cv.width;
    if (!state.compare) return [{ x: W * 0.03, w: W * 0.94 }];
    return [{ x: W * 0.02, w: W * 0.43 }, { x: W * 0.55, w: W * 0.43 }];
  }
  function geom(band) {
    const H = cv.height;
    const colW = band.w / 4;
    const top = H * 0.30, bottom = H * 0.80;
    const s = Math.max(2, Math.min(colW / 13, (bottom - top) / 15));  // size of one small cube
    return { colW, top, bottom, s };
  }
  // Position of block i in column p (count = how many blocks in the column)
  function blockRect(band, g, p, i) {
    const cx = band.x + g.colW * (p + 0.5);
    const s = g.s;
    if (p === 3) return { x: cx - s / 2, y: g.bottom - s * (i + 1) - i * s * 0.25, w: s, h: s };               // ones: stacked
    if (p === 2) { const total = 10 * s + 9 * s * 0.25; return { x: cx - total / 2 + i * s * 1.25, y: g.bottom - 10 * s, w: s, h: 10 * s }; } // tens: side by side
    // hundreds and thousands: pile, each shifted up a little
    return { x: cx - 5 * s, y: g.bottom - 10 * s - i * s * 0.45, w: 10 * s, h: 10 * s };
  }

  function drawBlock(p, r, alpha = 1) {
    const col = PLACES[p].color;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.roundRect(r.x, r.y, r.w, r.h, Math.min(3, r.w / 4)); ctx.fill();
    ctx.strokeStyle = 'rgba(11,18,32,0.6)'; ctx.lineWidth = 1;
    if (p === 2 || p === 1) {
      // rod / flat: show the ten divisions
      const step = r.h / 10;
      ctx.beginPath();
      for (let k = 1; k < 10; k++) { ctx.moveTo(r.x, r.y + k * step); ctx.lineTo(r.x + r.w, r.y + k * step); }
      if (p === 1) { const sw = r.w / 10; for (let k = 1; k < 10; k++) { ctx.moveTo(r.x + k * sw, r.y); ctx.lineTo(r.x + k * sw, r.y + r.h); } }
      ctx.stroke();
    }
    if (p === 0) {
      // thousand: a cube with a top and a side face
      const d = r.w * 0.3;
      ctx.fillStyle = 'rgba(255,255,255,0.28)';
      ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x + d, r.y - d); ctx.lineTo(r.x + r.w + d, r.y - d); ctx.lineTo(r.x + r.w, r.y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath(); ctx.moveTo(r.x + r.w, r.y); ctx.lineTo(r.x + r.w + d, r.y - d); ctx.lineTo(r.x + r.w + d, r.y + r.h - d); ctx.lineTo(r.x + r.w, r.y + r.h); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(11,18,32,0.6)';
      ctx.beginPath(); ctx.roundRect(r.x, r.y, r.w, r.h, 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function font(px, bold = true) {
    return `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  }

  function drawNumber(ni, band, diffPlace) {
    const n = nums[ni];
    const g = geom(band);
    const W = cv.width, H = cv.height;
    const small = state.compare;
    const lerp = (a, b, t) => a + (b - a) * t;

    // active frame in compare mode
    if (small) {
      ctx.strokeStyle = state.cur === ni ? '#facc15' : 'rgba(148,163,184,0.3)';
      ctx.lineWidth = state.cur === ni ? 3 : 1.5;
      ctx.beginPath(); ctx.roundRect(band.x, H * 0.04, band.w, H * 0.92, 12); ctx.stroke();
      ctx.fillStyle = state.cur === ni ? '#facc15' : '#94a3b8';
      ctx.font = font(Math.max(11, H * 0.05));
      ctx.textAlign = 'left';
      ctx.fillText(ni === 0 ? 'A' : 'B', band.x + 10, H * 0.04 + H * 0.06);
    }

    for (let p = 0; p < 4; p++) {
      const cx = band.x + g.colW * (p + 0.5);
      // column background
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath(); ctx.roundRect(cx - g.colW * 0.47, g.top - H * 0.02, g.colW * 0.94, g.bottom - g.top + H * 0.05, 8); ctx.fill();
      if (diffPlace === p) {
        ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(cx - g.colW * 0.47, g.top - H * 0.02, g.colW * 0.94, g.bottom - g.top + H * 0.05, 8); ctx.stroke();
      }
      // header
      ctx.textAlign = 'center';
      ctx.fillStyle = PLACES[p].color;
      ctx.font = font(Math.max(9, Math.min(g.colW * 0.16, H * 0.045)));
      // headers sit just above the column box, below the expanded-form line at 0.19 H
      ctx.fillText(T(PLACES[p].en, PLACES[p].id), cx, g.top - H * 0.062);
      ctx.fillStyle = '#94a3b8';
      ctx.font = font(Math.max(9, Math.min(g.colW * 0.14, H * 0.04)), false);
      ctx.fillText(fmt(PLACES[p].value), cx, g.top - H * 0.025);

      // tap targets: + above the blocks, − below
      const tr = tapRects(band, g, p);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath(); ctx.arc(tr.plus.x, tr.plus.y, tr.r, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(tr.minus.x, tr.minus.y, tr.r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = font(tr.r * 1.5);
      ctx.fillText('+', tr.plus.x, tr.plus.y + tr.r * 0.5);
      ctx.fillText('−', tr.minus.x, tr.minus.y + tr.r * 0.5);

      // blocks
      const count = n.digits[p];
      const trading = n.trade && n.trade.place === p;
      const tt = trading ? n.trade.t : 0;
      const ease = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2;
      const dest = trading ? blockRect(band, g, p - 1, n.digits[p - 1]) : null;
      for (let i = 0; i < count; i++) {
        let r = blockRect(band, g, p, i);
        if (trading && i < 10) {
          r = { x: lerp(r.x, dest.x, ease), y: lerp(r.y, dest.y, ease), w: lerp(r.w, dest.w, ease), h: lerp(r.h, dest.h, ease) };
          drawBlock(p, r, 1 - 0.5 * ease);
          continue;
        }
        if (i === count - 1 && now - n.pop[p] < 0.25) {
          const k = 1 + 0.4 * Math.sin(((now - n.pop[p]) / 0.25) * Math.PI);
          r = { x: r.x - r.w * (k - 1) / 2, y: r.y - r.h * (k - 1) / 2, w: r.w * k, h: r.h * k };
        }
        drawBlock(p, r);
      }
      if (trading) {
        drawBlock(p - 1, dest, 0.35 + 0.65 * ease);
        ctx.fillStyle = '#facc15';
        ctx.font = font(Math.max(10, Math.min(W * 0.022, H * 0.045)));
        ctx.textAlign = 'center';
        ctx.fillText(T(`10 ${PLACES[p].en} = 1 ${PLACES[p - 1].en.slice(0, -1)}`, `10 ${PLACES[p].id} = 1 ${PLACES[p - 1].id}`), band.x + band.w / 2, H * 0.19);
      }

      // digit below
      ctx.fillStyle = count >= 10 ? '#facc15' : '#fff';
      ctx.font = font(Math.max(14, Math.min(g.colW * 0.4, H * 0.1)));
      ctx.textAlign = 'center';
      ctx.fillText(String(count), cx, H * 0.985 - (small ? H * 0.025 : 0));
    }

    // the whole number, and its expanded form
    const v = valueOf(n);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = font(Math.max(18, Math.min(band.w * 0.12, H * 0.13)));
    ctx.fillText(fmt(v), band.x + band.w / 2, H * 0.14);
    // expanded form; hidden while a trade label or a message uses the same line
    if (!small && !n.trade && now - state.msgAt >= 2) {
      const parts = n.digits.map((d, p) => ({ d, p })).filter((o) => o.d > 0);
      const fs = Math.max(11, Math.min(W * 0.03, H * 0.05));
      ctx.font = font(fs, false);
      let text = parts.length ? parts.map((o) => fmt(o.d * PLACES[o.p].value)).join(' + ') : '0';
      const full = `${fmt(v)} = ${text}`;
      ctx.fillStyle = '#cbd5e1';
      if (parts.length > 1) ctx.fillText(full, W / 2, H * 0.19);
      else if (v > 0) ctx.fillText(T(`${fmt(v)} is ${parts[0].d} ${PLACES[parts[0].p].en}`, `${fmt(v)} adalah ${parts[0].d} ${PLACES[parts[0].p].id}`), W / 2, H * 0.19);
      else ctx.fillText(T('Tap + to add a block', 'Ketuk + untuk menambah balok'), W / 2, H * 0.19);
    }
  }

  function tapRects(band, g, p) {
    const cx = band.x + g.colW * (p + 0.5);
    const r = Math.max(10, Math.min(g.colW * 0.16, cv.height * 0.035));
    return { plus: { x: cx + g.colW * 0.33, y: g.top + r * 0.4 }, minus: { x: cx - g.colW * 0.33, y: g.top + r * 0.4 }, r };
  }

  function drawCompare() {
    const W = cv.width, H = cv.height;
    const a = valueOf(nums[0]), b = valueOf(nums[1]);
    const sym = a < b ? '<' : a > b ? '>' : '=';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#facc15';
    ctx.font = font(Math.max(24, H * 0.16));
    ctx.fillText(sym, W / 2, H * 0.52);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = font(Math.max(10, Math.min(W * 0.02, H * 0.04)), false);
    const words = a < b ? T('smaller than', 'lebih kecil dari') : a > b ? T('bigger than', 'lebih besar dari') : T('equal to', 'sama dengan');
    ctx.fillText(T('A is', 'A'), W / 2, H * 0.60);
    ctx.fillText(words, W / 2, H * 0.65);
    ctx.fillText('B', W / 2, H * 0.70);
    ctx.fillStyle = '#fff';
    ctx.font = font(Math.max(11, Math.min(W * 0.024, H * 0.05)));
    ctx.fillText(`${fmt(a)} ${sym} ${fmt(b)}`, W / 2, H * 0.92);
  }

  function firstDiff() {
    if (!state.compare) return -1;
    for (let p = 0; p < 4; p++) if (nums[0].digits[p] !== nums[1].digits[p]) return p;
    return -1;
  }

  function draw() {
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const bs = bands();
    const dp = (nums[0].trade || nums[1].trade) ? -1 : firstDiff();
    bs.forEach((band, i) => drawNumber(i, band, dp));
    if (state.compare) {
      drawCompare();
      if (dp >= 0) {
        ctx.fillStyle = '#facc15';
        ctx.font = font(Math.max(10, Math.min(W * 0.02, H * 0.04)), false);
        ctx.textAlign = 'center';
        ctx.fillText(T(`Look at the ${PLACES[dp].en} first`, `Lihat ${PLACES[dp].id} dahulu`), W / 2, H * 0.40);
      }
    }
    if (now - state.msgAt < 2) {
      ctx.fillStyle = '#f97316';
      ctx.font = font(Math.max(11, H * 0.045));
      ctx.textAlign = 'center';
      ctx.fillText(state.msg, W / 2, H * 0.19);
    }
    ctx.textAlign = 'left';
  }

  // ---- tapping the canvas ----------------------------------------------
  let downAt = null;
  const local = (e) => {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / r.width), y: (e.clientY - r.top) * (cv.height / r.height) };
  };
  const onDown = (e) => { downAt = local(e); };
  const onUp = (e) => {
    if (!downAt) return;
    const p = local(e);
    const moved = Math.hypot(p.x - downAt.x, p.y - downAt.y);
    downAt = null;
    if (moved > 12) return;
    const bs = bands();
    bs.forEach((band, ni) => {
      if (p.x < band.x || p.x > band.x + band.w) return;
      const g = geom(band);
      const pl = Math.floor((p.x - band.x) / g.colW);
      if (pl < 0 || pl > 3) return;
      if (state.compare) { state.cur = ni; which.value = String(ni); }
      const tr = tapRects(band, g, pl);
      const hitR = tr.r * 1.6;
      if (Math.hypot(p.x - tr.minus.x, p.y - tr.minus.y) < hitR) add(ni, pl, -1);
      else if (p.y >= g.top - cv.height * 0.03 && p.y <= cv.height) add(ni, pl, 1);
    });
  };
  cv.canvas.addEventListener('pointerdown', onDown);
  cv.canvas.addEventListener('pointerup', onUp);

  // ---- controls -----------------------------------------------------------
  const plusRow = row(...PLACES.map((pl, p) => bigBtn(`+${fmt(pl.value)}`, () => add(state.cur, p, 1), pl.color)));
  const minusRow = row(...PLACES.map((pl, p) => bigBtn(`−${fmt(pl.value)}`, () => add(state.cur, p, -1), pl.color)));
  const which = select({
    label: T('Which number do the buttons change?', 'Bilangan mana yang diubah tombol?'), key: 'edit',
    options: [{ value: '0', label: 'A' }, { value: '1', label: 'B' }], value: '0',
    onChange: (v) => { state.cur = Number(v) === 1 ? 1 : 0; },
  });
  which.el.style.display = 'none';
  const cmp = toggle({
    label: T('Compare two numbers', 'Bandingkan dua bilangan'), key: 'compare', value: false,
    onChange: (v) => { state.compare = v; which.el.style.display = v ? '' : 'none'; if (!v) { state.cur = 0; which.value = '0'; } },
  });
  const clear = bigBtn(T('Clear', 'Kosongkan'), () => {
    const n = nums[state.cur]; n.digits = [0, 0, 0, 0]; n.trade = null;
  });
  ctrlPanel.append(plusRow, minusRow, row(cmp, clear), which.el);

  const lab = labPanel({
    title: 'Numbers I built',
    filename: 'place-value-data.csv',
    columns: [
      { key: 'number', label: 'Number' },
      { key: 'th', label: 'Thousands' },
      { key: 'h', label: 'Hundreds' },
      { key: 't', label: 'Tens' },
      { key: 'o', label: 'Ones' },
      { key: 'blocks', label: 'Blocks used' },
    ],
    procedure: [
      'Build a number with the + buttons and press Record.',
      'Add 1 to it until a trade happens. Record the new number.',
      'Build the same number again with as few blocks as possible. Record it.',
      'Look at the table: which number needed the fewest blocks? Was it the smallest number?',
    ],
    predict: 'Will the number 1,000 need more blocks or fewer blocks than 999?',
    source: () => {
      const n = nums[state.cur];
      if (n.trade) return null;
      const [th, h, t, o] = n.digits;
      return { number: valueOf(n), th, h, t, o, blocks: th + h + t + o };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => {
    animator.stop();
    cv.canvas.removeEventListener('pointerdown', onDown);
    cv.canvas.removeEventListener('pointerup', onUp);
    cv.destroy();
  };
}
