import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const FONT = 'ui-monospace, Menlo, Consolas, monospace';
const MAX_PART = 24;
const MODES = {
  paint: { a: () => T('blue', 'biru'), b: () => T('yellow', 'kuning'), unit: () => T('cups', 'cangkir'), colA: '#2563eb', colB: '#facc15', hueA: 222, hueB: 52 },
  juice: { a: () => T('concentrate', 'sari buah'), b: () => T('water', 'air'), unit: () => T('cups', 'cangkir'), colA: '#ea580c', colB: '#bfdbfe' },
};
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = { mode: 'paint', a: 2, b: 3, challenge: null, note: '' };
  const simplified = (a, b) => { const g = gcd(a, b); return [a / g, b / g]; };

  // Mixed colour: paint blends hue through green; juice fades the orange with water.
  function mixColor(a, b, mode = state.mode) {
    const f = a / (a + b);
    if (mode === 'paint') {
      const m = MODES.paint;
      return `hsl(${m.hueB + (m.hueA - m.hueB) * f}, 80%, ${50 - 8 * f}%)`;
    }
    const lerp = (x, y) => Math.round(x + (y - x) * f);
    return `rgb(${lerp(191, 234)}, ${lerp(219, 88)}, ${lerp(254, 12)})`;
  }

  function setParts(a, b) {
    state.a = Math.max(1, Math.min(MAX_PART, a));
    state.b = Math.max(1, Math.min(MAX_PART, b));
    state.note = '';
    checkChallenge();
  }
  function scale(k) {
    const na = state.a * k, nb = state.b * k;
    if (!Number.isInteger(na) || !Number.isInteger(nb) || na > MAX_PART || nb > MAX_PART || na < 1) {
      state.note = T('That scale does not give whole cups here.', 'Skala itu tidak menghasilkan cangkir bulat di sini.');
      return;
    }
    setParts(na, nb);
  }
  function newChallenge() {
    const pairs = [[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5], [1, 4], [3, 2]];
    const [p, q] = pairs[Math.floor(Math.random() * pairs.length)];
    const k = 2 + Math.floor(Math.random() * Math.floor(Math.min(MAX_PART / p, MAX_PART / q) - 1));
    state.challenge = { p, q, total: k * (p + q), done: false };
    state.note = '';
  }
  function checkChallenge() {
    const c = state.challenge;
    if (!c) return;
    const [sa, sb] = simplified(state.a, state.b);
    c.done = sa === c.p && sb === c.q && state.a + state.b === c.total;
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const m = MODES[state.mode];
    const { a, b } = state;
    const [sa, sb] = simplified(a, b);
    const total = a + b;

    // ---- Left: the mixing cup ----
    const cupX = W * 0.17, cupW = W * 0.16, cupTop = 70, cupBot = H * 0.62;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(cupX - cupW / 2, cupTop, cupW, cupBot - cupTop);
    ctx.fillStyle = mixColor(a, b);
    const fill = (cupBot - cupTop) * (0.35 + 0.6 * total / (2 * MAX_PART));
    ctx.fillRect(cupX - cupW / 2, cupBot - fill, cupW, fill);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cupX - cupW / 2, cupTop, cupW, cupBot - cupTop);
    ctx.lineWidth = 1;
    ctx.fillStyle = '#fff';
    ctx.font = `bold 14px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(T('Your mix', 'Campuranmu'), cupX, cupTop - 14);
    ctx.font = `12px ${FONT}`;
    ctx.fillText(`${total} ${m.unit()}`, cupX, cupBot + 18);
    // Fraction facts
    ctx.font = `11px ${FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(`${m.a()}: ${a}/${total} ${T('of the mix', 'dari campuran')}`, cupX, cupBot + 36);
    ctx.fillText(`${m.b()}: ${b}/${total} ${T('of the mix', 'dari campuran')}`, cupX, cupBot + 52);

    // ---- Right: ratio text + bar model ----
    const rx = W * 0.36, rw = W - rx - 30;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.font = `bold 18px ${FONT}`;
    ctx.fillText(`${a} : ${b}`, rx, 44);
    ctx.font = `13px ${FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const simpleTxt = (sa === a) ? T('(already simplest)', '(sudah paling sederhana)') : `= ${sa} : ${sb}  ${T('(simplest form, divide both by', '(bentuk sederhana, bagi keduanya dengan')} ${a / sa})`;
    ctx.fillText(`${m.a()} : ${m.b()}   ${simpleTxt}`, rx + 90, 44);

    const unitW = Math.min(28, Math.floor(rw / Math.max(total, 1)));
    const barY = 70, barH = 30;
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.font = `11px ${FONT}`;
    ctx.fillText(T('Bar model — one square = one cup', 'Model batang — satu kotak = satu cangkir'), rx, barY - 6);
    for (let i = 0; i < total; i++) {
      ctx.fillStyle = i < a ? m.colA : m.colB;
      ctx.fillRect(rx + i * unitW, barY, unitW - 2, barH);
    }
    ctx.font = `bold 11px ${FONT}`;
    ctx.fillStyle = m.colA;
    ctx.fillText(`■ ${a} ${m.a()}`, rx, barY + barH + 14);
    ctx.fillStyle = m.colB;
    ctx.fillText(`■ ${b} ${m.b()}`, rx + 110, barY + barH + 14);

    // ---- Double number line ----
    const nlY1 = barY + 96, nlY2 = nlY1 + 50, nlX = rx + 10, nlW = rw - 20;
    const steps = Math.floor(MAX_PART / Math.max(sa, sb));
    const stepX = nlW / Math.max(steps, 1);
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.font = `11px ${FONT}`;
    ctx.fillText(T('Double number line — every step keeps the same ratio', 'Garis bilangan ganda — tiap langkah menjaga rasio yang sama'), rx, nlY1 - 22);
    for (const [y, col, unitVal] of [[nlY1, m.colA, sa], [nlY2, m.colB, sb]]) {
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(nlX, y); ctx.lineTo(nlX + nlW, y); ctx.stroke();
      for (let k = 0; k <= steps; k++) {
        const x = nlX + k * stepX;
        ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = `11px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.fillText(String(k * unitVal), x, y === nlY1 ? y - 10 : y + 18);
        ctx.textAlign = 'left';
      }
    }
    ctx.lineWidth = 1;
    const curK = a / sa;
    const curX = nlX + curK * stepX;
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(curX, nlY1 - 6); ctx.lineTo(curX, nlY2 + 6); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fff';
    ctx.font = `bold 11px ${FONT}`;
    ctx.fillText(`${T('you are here', 'kamu di sini')}: ${a} ${T('and', 'dan')} ${b}`, Math.min(curX + 6, nlX + nlW - 150), nlY1 + 28);
    // Totals row
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = `11px ${FONT}`;
    ctx.fillText(`${T('total', 'total')}: ${sa + sb}, ${2 * (sa + sb)}, ${3 * (sa + sb)}, …  ${T('(multiples of', '(kelipatan')} ${sa + sb})`, rx, nlY2 + 40);

    // ---- Same-shade swatches: every multiple of the simplest ratio looks the same ----
    const swY = nlY2 + 58, swW = Math.min(64, (rw - 10) / Math.max(steps, 1) - 6);
    ctx.fillStyle = 'rgba(120,130,150,0.8)';
    ctx.fillText(T('All of these are the same shade:', 'Semua ini warnanya sama:'), rx, swY - 4);
    for (let k = 1; k <= steps; k++) {
      const x = rx + (k - 1) * (swW + 6);
      ctx.fillStyle = mixColor(k * sa, k * sb);
      ctx.fillRect(x, swY, swW, 22);
      ctx.strokeStyle = k === curK ? '#fff' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = k === curK ? 2 : 1;
      ctx.strokeRect(x, swY, swW, 22);
      ctx.fillStyle = '#0b1220';
      ctx.font = `bold 10px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText(`${k * sa}:${k * sb}`, x + swW / 2, swY + 15);
      ctx.textAlign = 'left';
    }
    ctx.lineWidth = 1;

    // ---- Challenge box ----
    const c = state.challenge;
    const boxY = H - 70;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(rx - 6, boxY, rw + 12, 56);
    ctx.font = `bold 12px ${FONT}`;
    if (c) {
      ctx.fillStyle = mixColor(c.p, c.q);
      ctx.fillRect(rx, boxY + 8, 40, 40);
      ctx.strokeStyle = '#fff'; ctx.strokeRect(rx, boxY + 8, 40, 40);
      ctx.fillStyle = c.done ? '#10b981' : '#fbbf24';
      ctx.fillText(c.done
        ? T('Correct! Same shade, new total.', 'Benar! Warna sama, total baru.')
        : `${T('Challenge', 'Tantangan')}: ${T('make this shade', 'buat warna ini')} (${c.p} : ${c.q}) ${T('with', 'dengan')} ${c.total} ${m.unit()}.`, rx + 52, boxY + 22);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = `11px ${FONT}`;
      ctx.fillText(`${T('Hint', 'Petunjuk')}: ${c.total} ÷ ${c.p + c.q} = ?  ${T('Then multiply', 'Lalu kalikan')} ${c.p} ${T('and', 'dan')} ${c.q} ${T('by that.', 'dengan itu.')}`, rx + 52, boxY + 42);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(state.note || T('Change the counters, or press ×2 / ÷2 to scale the recipe.', 'Ubah penghitung, atau tekan ×2 / ÷2 untuk mengubah skala resep.'), rx, boxY + 32);
    }
    if (state.note && c) { ctx.fillStyle = '#f87171'; ctx.font = `11px ${FONT}`; ctx.fillText(state.note, rx, boxY - 6); }
  }

  // ---- Controls: two counters, scale buttons, mode, challenge ----
  function counter(labelFn, get, set) {
    const wrap = document.createElement('div');
    wrap.className = 'ctrl-row';
    const lab = document.createElement('span');
    lab.style.minWidth = '9em';
    const val = document.createElement('strong');
    val.style.minWidth = '2em';
    val.style.textAlign = 'center';
    const refresh = () => { lab.textContent = labelFn(); val.textContent = String(get()); };
    const minus = button({ label: '−', onClick: () => { set(get() - 1); refreshAll(); } });
    const plus = button({ label: '+', onClick: () => { set(get() + 1); refreshAll(); } });
    minus.el.setAttribute('aria-label', `${labelFn()} −1`);
    plus.el.setAttribute('aria-label', `${labelFn()} +1`);
    wrap.append(lab, minus.el, val, plus.el);
    refresh();
    return { el: wrap, refresh };
  }
  const cA = counter(() => `${T('Part A', 'Bagian A')} (${MODES[state.mode].a()})`, () => state.a, (v) => setParts(v, state.b));
  const cB = counter(() => `${T('Part B', 'Bagian B')} (${MODES[state.mode].b()})`, () => state.b, (v) => setParts(state.a, v));
  const refreshAll = () => { cA.refresh(); cB.refresh(); };

  const modeSel = select({ label: T('What are we mixing?', 'Apa yang kita campur?'), key: 'mode', value: 'paint',
    options: [{ value: 'paint', label: T('Paint: blue + yellow → green', 'Cat: biru + kuning → hijau') }, { value: 'juice', label: T('Juice: concentrate + water', 'Jus: sari buah + air') }],
    onChange: (v) => { state.mode = v; refreshAll(); } });
  const scaleRow = row(
    button({ label: '×2', onClick: () => { scale(2); refreshAll(); } }),
    button({ label: '×3', onClick: () => { scale(3); refreshAll(); } }),
    button({ label: '÷2', onClick: () => { scale(1 / 2); refreshAll(); } }),
    button({ label: '÷3', onClick: () => { scale(1 / 3); refreshAll(); } }),
    button({ label: T('New challenge', 'Tantangan baru'), primary: true, onClick: () => { newChallenge(); checkChallenge(); } }),
    button({ label: T('End challenge', 'Selesai tantangan'), onClick: () => { state.challenge = null; } }),
  );
  ctrlPanel.append(modeSel.el, cA.el, cB.el, scaleRow);

  const lab = labPanel({
    title: T('Ratio lab', 'Lab rasio'),
    filename: 'ratio-proportion-lab.csv',
    columns: [
      { key: 'a', label: T('part A', 'bagian A') },
      { key: 'b', label: T('part B', 'bagian B') },
      { key: 'ratio', label: T('ratio simplified', 'rasio sederhana') },
      { key: 'total', label: T('total', 'total') },
    ],
    procedure: [
      T('Set 2 : 3 and record. Press ×2 and record again. Compare the simplified ratios.', 'Atur 2 : 3 dan rekam. Tekan ×2 dan rekam lagi. Bandingkan rasio sederhananya.'),
      T('Press ×2 once more. Does the colour in the cup change? Record.', 'Tekan ×2 sekali lagi. Apakah warna di cangkir berubah? Rekam.'),
      T('Now add 1 to part A only. Record. Is the simplified ratio still 2 : 3?', 'Sekarang tambahkan 1 pada bagian A saja. Rekam. Apakah rasio sederhananya masih 2 : 3?'),
      T('Press New challenge. Use the double number line to find the answer, then record it.', 'Tekan Tantangan baru. Gunakan garis bilangan ganda untuk menemukan jawabannya, lalu rekam.'),
      T('Switch to juice and repeat step 1. Does the maths change?', 'Ganti ke jus dan ulangi langkah 1. Apakah matematikanya berubah?'),
    ],
    predict: T('If you add one cup of blue AND one cup of yellow to a 2 : 3 mix, will the green stay the same? Why?', 'Jika kamu menambahkan satu cangkir biru DAN satu cangkir kuning ke campuran 2 : 3, apakah hijaunya tetap sama? Mengapa?'),
    source: () => {
      const [sa, sb] = simplified(state.a, state.b);
      return { a: state.a, b: state.b, ratio: `${sa} : ${sb}`, total: state.a + state.b };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
