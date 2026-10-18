import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Three fruit classes, each described by two features in [0, 1]:
//   size (x axis, small → big) and hue (y axis, yellow → red).
const CLASSES = [
  { id: 'apple',  color: '#dc2626', name: () => T('Apple', 'Apel'),   size: 0.75, hue: 0.85, sdS: 0.10, sdH: 0.07 },
  { id: 'orange', color: '#f97316', name: () => T('Orange', 'Jeruk'), size: 0.50, hue: 0.50, sdS: 0.10, sdH: 0.07 },
  { id: 'lemon',  color: '#facc15', name: () => T('Lemon', 'Lemon'),  size: 0.30, hue: 0.15, sdS: 0.08, sdH: 0.07 },
];
const TAU = 0.12; // softmax "temperature" for the confidence readout

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function gauss() {
  // Box–Muller, guarded against log(0).
  const u = Math.max(1e-12, Math.random()), v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function fruitColor(hue) {
  // hue 0 → yellow (52°), hue 1 → red (0°)
  const deg = 52 - 52 * clamp(hue, 0, 1);
  return `hsl(${deg.toFixed(0)} 88% 50%)`;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    examples: [],        // { size, hue, label (class index given by the pupil), truth }
    current: null,       // unlabelled fruit waiting for the pupil's label
    mystery: null,       // { size, hue, truth, pred, conf, probs, revealAt, revealed }
    showRegions: true,
    biased: false,
    message: '',
  };
  let now = 0;

  function makeFruit(ci, opts = {}) {
    const c = CLASSES[ci];
    const sizeMean = opts.sizeMean ?? c.size, sdS = opts.sdS ?? c.sdS;
    return {
      size: clamp(sizeMean + gauss() * sdS, 0.05, 0.95),
      hue: clamp(c.hue + gauss() * c.sdH, 0.05, 0.95),
      truth: ci,
    };
  }
  function nextCurrent() {
    state.current = makeFruit(Math.floor(Math.random() * 3));
  }

  // --- the "learning": one centroid per label ---------------------------
  function centroids() {
    const out = [null, null, null];
    for (let ci = 0; ci < 3; ci++) {
      let sx = 0, sy = 0, n = 0;
      for (const e of state.examples) if (e.label === ci) { sx += e.size; sy += e.hue; n++; }
      if (n > 0) out[ci] = { size: sx / n, hue: sy / n, n };
    }
    return out;
  }
  function predict(f, cents) {
    const d = cents.map((c) => (c ? Math.hypot(f.size - c.size, f.hue - c.hue) : Infinity));
    let best = -1, bestD = Infinity;
    for (let i = 0; i < 3; i++) if (d[i] < bestD) { bestD = d[i]; best = i; }
    if (best < 0) return null;
    // softmax over -distance/TAU, only over classes that exist
    let sum = 0;
    const w = d.map((di) => (Number.isFinite(di) ? Math.exp(-(di - bestD) / TAU) : 0));
    for (const x of w) sum += x;
    const probs = w.map((x) => (sum > 0 ? x / sum : 0));
    return { pred: best, conf: probs[best], probs, d };
  }

  // --- actions ------------------------------------------------------------
  function labelCurrent(ci) {
    // While a mystery test is on screen the waiting fruit is hidden, so a tap on a name
    // only dismisses the test; the next tap labels the fruit the pupil can actually see.
    if (state.mystery) { state.mystery = null; return; }
    if (!state.current) return;
    state.examples.push({ ...state.current, label: ci });
    state.message = '';
    nextCurrent();
  }
  function testMystery() {
    const cents = centroids();
    if (!cents.some(Boolean)) {
      state.message = T('Teach me first! Tap a fruit name.', 'Ajari aku dulu! Ketuk nama buah.');
      return;
    }
    const f = makeFruit(Math.floor(Math.random() * 3));
    const p = predict(f, cents);
    state.mystery = { ...f, ...p, revealAt: now + 1.6, revealed: false };
    state.message = '';
  }
  function biasedData() {
    state.examples = [];
    state.mystery = null;
    state.biased = true;
    // All training apples are SMALL; oranges and lemons are normal.
    for (let i = 0; i < 8; i++) state.examples.push({ ...makeFruit(0, { sizeMean: 0.2, sdS: 0.06 }), label: 0 });
    for (let i = 0; i < 8; i++) state.examples.push({ ...makeFruit(1), label: 1 });
    for (let i = 0; i < 8; i++) state.examples.push({ ...makeFruit(2), label: 2 });
    state.message = T('Biased data loaded: every apple the machine saw was small. Now test a few mystery fruits.',
      'Data bias dimuat: semua apel yang dilihat mesin berukuran kecil. Sekarang uji beberapa buah misteri.');
  }
  function restart() {
    state.examples = [];
    state.mystery = null;
    state.biased = false;
    state.message = '';
    nextCurrent();
  }
  nextCurrent();

  // --- drawing --------------------------------------------------------------
  function plotRect() {
    const W = cv.width, H = cv.height;
    const left = W * 0.10, top = H * 0.14, right = W * 0.97, bottom = H * 0.86;
    return { x: left, y: top, w: right - left, h: bottom - top };
  }
  const toPx = (R, f) => ({ x: R.x + f.size * R.w, y: R.y + (1 - f.hue) * R.h });

  function drawFruit(ctx, x, y, f, r, outline) {
    ctx.fillStyle = fruitColor(f.hue);
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    // little stem + leaf so it reads as a fruit
    ctx.strokeStyle = '#4d7c0f'; ctx.lineWidth = Math.max(1.5, r * 0.18);
    ctx.beginPath(); ctx.moveTo(x, y - r * 0.9); ctx.lineTo(x + r * 0.15, y - r * 1.35); ctx.stroke();
    ctx.fillStyle = '#65a30d';
    ctx.beginPath(); ctx.ellipse(x + r * 0.45, y - r * 1.15, r * 0.35, r * 0.18, -0.5, 0, Math.PI * 2); ctx.fill();
    if (outline) {
      ctx.strokeStyle = outline; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x, y, r + 3, 0, Math.PI * 2); ctx.stroke();
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const R = plotRect();
    const fs = Math.max(11, Math.round(H * 0.032));
    const font = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    const cents = centroids();

    // regions: shade each grid cell by nearest centroid
    if (state.showRegions && cents.some(Boolean)) {
      const cols = 48, rows = 27;
      const cw = R.w / cols, ch = R.h / rows;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const f = { size: (i + 0.5) / cols, hue: 1 - (j + 0.5) / rows };
        const p = predict(f, cents);
        if (!p) continue;
        ctx.fillStyle = CLASSES[p.pred].color;
        ctx.globalAlpha = 0.10 + 0.14 * clamp((p.conf - 0.34) / 0.66, 0, 1);
        ctx.fillRect(R.x + i * cw, R.y + j * ch, cw + 0.5, ch + 0.5);
      }
      ctx.globalAlpha = 1;
    }

    // axes
    ctx.strokeStyle = 'rgba(148,163,184,0.7)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(R.x, R.y); ctx.lineTo(R.x, R.y + R.h); ctx.lineTo(R.x + R.w, R.y + R.h); ctx.stroke();
    // hue bar along the y axis
    const grad = ctx.createLinearGradient(0, R.y + R.h, 0, R.y);
    grad.addColorStop(0, fruitColor(0)); grad.addColorStop(0.5, fruitColor(0.5)); grad.addColorStop(1, fruitColor(1));
    ctx.fillStyle = grad;
    ctx.fillRect(R.x - W * 0.022, R.y, W * 0.012, R.h);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(T('Size: small → big', 'Ukuran: kecil → besar'), R.x + R.w / 2, H * 0.95);
    ctx.save();
    ctx.translate(W * 0.035, R.y + R.h / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(T('Colour: yellow → red', 'Warna: kuning → merah'), 0, 0);
    ctx.restore();

    // labelled examples
    const rBase = Math.min(W, H) * 0.012;
    for (const e of state.examples) {
      const p = toPx(R, e);
      drawFruit(ctx, p.x, p.y, e, rBase + e.size * rBase * 2.2, CLASSES[e.label].color);
    }
    // centroids
    for (let ci = 0; ci < 3; ci++) {
      const c = cents[ci]; if (!c) continue;
      const p = toPx(R, c);
      ctx.strokeStyle = CLASSES[ci].color; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, rBase * 3.2, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, rBase * 3.2, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${CLASSES[ci].name()} (${c.n})`, p.x, p.y - rBase * 4.2);
    }

    // the fruit waiting to be labelled: pulsing white ring + "?"
    if (state.current && !state.mystery) {
      const p = toPx(R, state.current);
      const r = rBase + state.current.size * rBase * 2.2 + 3;
      const pulse = 1 + 0.12 * Math.sin(now * 5);
      drawFruit(ctx, p.x, p.y, state.current, r - 3, null);
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.arc(p.x, p.y, (r + 5) * pulse, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff'; ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(T('What is this? Tap a name.', 'Buah apa ini? Ketuk namanya.'), p.x, p.y - r - fs * 0.9);
    }

    // mystery fruit with prediction and (after a pause) the truth
    if (state.mystery) {
      const m = state.mystery;
      if (!m.revealed && now >= m.revealAt) m.revealed = true;
      const p = toPx(R, m);
      const r = rBase + m.size * rBase * 2.2 + 3;
      drawFruit(ctx, p.x, p.y, m, r - 3, null);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2); ctx.stroke();
      // dashed lines to each centroid, the winner solid
      for (let ci = 0; ci < 3; ci++) {
        const c = cents[ci]; if (!c) continue;
        const q = toPx(R, c);
        ctx.strokeStyle = CLASSES[ci].color; ctx.lineWidth = ci === m.pred ? 3 : 1.2;
        ctx.setLineDash(ci === m.pred ? [] : [4, 6]);
        ctx.globalAlpha = ci === m.pred ? 0.95 : 0.5;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      // speech bubble
      const lines = [T(`I think: ${CLASSES[m.pred].name()}  (${Math.round(m.conf * 100)}% sure)`, `Tebakanku: ${CLASSES[m.pred].name()}  (${Math.round(m.conf * 100)}% yakin)`)];
      if (m.revealed) {
        const ok = m.pred === m.truth;
        lines.push(T(`Really: ${CLASSES[m.truth].name()}  ${ok ? '✓ correct' : '✗ wrong'}`, `Sebenarnya: ${CLASSES[m.truth].name()}  ${ok ? '✓ benar' : '✗ salah'}`));
      } else {
        lines.push(T('Checking…', 'Memeriksa…'));
      }
      ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
      let bw = 0; for (const ln of lines) bw = Math.max(bw, ctx.measureText(ln).width);
      bw += fs * 1.4;
      const bh = fs * 1.5 * lines.length + fs * 0.8;
      let bx = p.x + r + 12, by = p.y - bh / 2;
      if (bx + bw > W - 6) bx = p.x - r - 12 - bw;
      by = clamp(by, R.y, R.y + R.h - bh);
      ctx.fillStyle = 'rgba(15,23,42,0.94)';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 10); ctx.fill();
      ctx.strokeStyle = m.revealed ? (m.pred === m.truth ? '#22c55e' : '#ef4444') : '#94a3b8';
      ctx.lineWidth = 2; ctx.stroke();
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      lines.forEach((ln, i) => {
        ctx.fillStyle = i === 1 && m.revealed ? (m.pred === m.truth ? '#4ade80' : '#f87171') : '#e2e8f0';
        ctx.fillText(ln, bx + fs * 0.7, by + fs * 0.5 + i * fs * 1.5);
      });
      ctx.textBaseline = 'alphabetic';
    }

    // status line
    const counts = cents.map((c) => (c ? c.n : 0));
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(
      T(`Examples taught: ${state.examples.length}  (apple ${counts[0]}, orange ${counts[1]}, lemon ${counts[2]})`,
        `Contoh yang diajarkan: ${state.examples.length}  (apel ${counts[0]}, jeruk ${counts[1]}, lemon ${counts[2]})`),
      W * 0.02, H * 0.06,
    );
    if (state.biased) {
      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'right';
      ctx.fillText(T('BIASED DATA: small apples only', 'DATA BIAS: hanya apel kecil'), W * 0.98, H * 0.06);
    }
    if (state.message) {
      ctx.fillStyle = '#fbbf24'; ctx.font = font; ctx.textAlign = 'left';
      ctx.fillText(state.message, W * 0.02, H * 0.11);
    }
    ctx.textAlign = 'left';
  }

  // --- controls -------------------------------------------------------------
  const labelBtns = CLASSES.map((c, ci) => {
    const b = bigBtn(c.name(), () => labelCurrent(ci), true);
    b.el.style.borderColor = c.color;
    b.el.style.boxShadow = `inset 0 -4px 0 ${c.color}`;
    return b;
  });
  const testB = bigBtn(T('Test a mystery fruit', 'Uji buah misteri'), testMystery);
  const biasB = bigBtn(T('Biased data (small apples)', 'Data bias (apel kecil)'), biasedData);
  const resetB = bigBtn(T('Start again', 'Mulai lagi'), restart);
  const regionsT = toggle({ label: T('Show the machine\'s regions', 'Tampilkan wilayah mesin'), key: 'regions', value: true, onChange: (v) => { state.showRegions = v; } });

  ctrlPanel.append(row(...labelBtns), row(testB, biasB, resetB), row(regionsT));

  const describe = (f) => {
    const s = f.size < 0.4 ? T('small', 'kecil') : f.size < 0.62 ? T('medium', 'sedang') : T('big', 'besar');
    const h = f.hue < 0.33 ? T('yellow', 'kuning') : f.hue < 0.67 ? T('orange', 'oranye') : T('red', 'merah');
    return `${s}, ${h}`;
  };
  const lab = labPanel({
    title: 'Teaching log',
    filename: 'teachable-classifier-data.csv',
    columns: [
      { key: 'n', label: 'Examples taught' },
      { key: 'biased', label: 'Biased?' },
      { key: 'item', label: 'Mystery fruit' },
      { key: 'pred', label: 'Machine said' },
      { key: 'conf', label: 'Confidence', format: (v) => `${Math.round(v * 100)}%` },
      { key: 'truth', label: 'Really was' },
      { key: 'correct', label: 'Correct?' },
    ],
    procedure: [
      'Label 2 fruits of each kind. Press Test a mystery fruit and wait for the answer. Record.',
      'Repeat the test 5 times. How many did the machine get right?',
      'Label 5 more of each kind, then test 5 more times. Record each. Did the score improve?',
      'Press Biased data (small apples). Test until a big red apple appears. Record what the machine says.',
    ],
    predict: 'Will the machine guess better with 6 examples or with 20? What will happen to big apples after the biased data?',
    source: () => {
      const m = state.mystery;
      if (!m || !m.revealed) return null;
      return {
        n: state.examples.length,
        biased: state.biased ? 'yes' : 'no',
        item: describe(m),
        pred: CLASSES[m.pred].name(),
        conf: m.conf,
        truth: CLASSES[m.truth].name(),
        correct: m.pred === m.truth ? 'yes' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
