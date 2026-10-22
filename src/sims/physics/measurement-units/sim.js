import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SANS = 'system-ui, -apple-system, Roboto, sans-serif';

// Instruments: smallest division and the uncertainty we teach (half a division).
const INSTR = {
  ruler:   { unit: 'mm', div: 1,   unc: 0.5, dp: 0, max: 150 },
  caliper: { unit: 'mm', div: 0.1, unc: 0.05, dp: 1, max: 70 },
  balance: { unit: 'g',  div: 5,   unc: 2.5, dp: 0, max: 200 },
};

// Objects the pupil may be asked to measure. Lengths / widths in mm, mass in g.
const OBJECTS = {
  ruler: [
    { en: 'eraser', id: 'penghapus', lo: 35, hi: 60, color: '#f472b6' },
    { en: 'paper clip', id: 'penjepit kertas', lo: 28, hi: 50, color: '#cbd5e1' },
    { en: 'pencil stub', id: 'potongan pensil', lo: 70, hi: 120, color: '#fbbf24' },
    { en: 'house key', id: 'kunci rumah', lo: 50, hi: 75, color: '#a3a3a3' },
    { en: 'AA battery', id: 'baterai AA', lo: 49, hi: 51, color: '#34d399' },
    { en: 'matchstick', id: 'batang korek api', lo: 40, hi: 48, color: '#d97706' },
  ],
  caliper: [
    { en: 'marble', id: 'kelereng', lo: 12, hi: 18, color: '#60a5fa' },
    { en: 'coin', id: 'koin', lo: 20, hi: 27, color: '#f59e0b' },
    { en: 'bolt', id: 'baut', lo: 6, hi: 12, color: '#9ca3af' },
    { en: 'bottle cap', id: 'tutup botol', lo: 28, hi: 31, color: '#ef4444' },
    { en: 'dice', id: 'dadu', lo: 14, hi: 17, color: '#f8fafc' },
    { en: 'AA battery', id: 'baterai AA', lo: 13.8, hi: 14.5, color: '#34d399' },
  ],
  balance: [
    { en: 'apple', id: 'apel', lo: 120, hi: 180, color: '#ef4444' },
    { en: 'egg', id: 'telur', lo: 50, hi: 65, color: '#fde68a' },
    { en: 'phone', id: 'ponsel', lo: 150, hi: 195, color: '#1f2937' },
    { en: 'eraser', id: 'penghapus', lo: 10, hi: 22, color: '#f472b6' },
    { en: 'small book', id: 'buku kecil', lo: 90, hi: 140, color: '#60a5fa' },
    { en: 'house key', id: 'kunci rumah', lo: 25, hi: 40, color: '#a3a3a3' },
  ],
};

// Count significant figures in a numeric string as a pupil would write it. Every digit of a
// scale reading was read off the instrument, so a trailing zero (50 mm, 120 g) counts too;
// only leading zeros (0.047) are place-holders.
function sigFigs(str) {
  let s = String(str).trim().replace(/^[-+]/, '');
  if (!/^\d*\.?\d*$/.test(s) || s === '' || s === '.') return 0;
  const digits = s.replace('.', '').replace(/^0+/, '');
  return digits.length;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const st = {
    instr: 'ruler',
    obj: null,        // { name, trueVal, start }
    entered: null,    // number entered by the pupil
    enteredStr: '',
    result: null,     // null | 'ok' | 'off'
    tries: 0,
    showAnswer: false,
    last: null,       // last accepted reading for the lab
    flash: 0,
  };
  let now = 0;

  const rnd = (lo, hi) => lo + Math.random() * (hi - lo);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function newObject() {
    const list = OBJECTS[st.instr];
    const o = list[Math.floor(Math.random() * list.length)];
    const spec = INSTR[st.instr];
    let v = Math.round(rnd(o.lo, o.hi) * 10) / 10;
    // Avoid values that sit exactly on a half-division of the ruler, which would be ambiguous.
    if (st.instr === 'ruler' && Math.abs(v - Math.floor(v) - 0.5) < 0.05) v += 0.2;
    if (st.instr === 'balance' && Math.abs((v % 5) - 2.5) < 0.3) v += 0.6;
    v = clamp(v, 0, spec.max);
    // The ruler object starts at a whole centimetre mark between 0 and 3 cm.
    const start = st.instr === 'ruler' ? 10 * Math.floor(Math.random() * 4) : 0;
    st.obj = { ...o, trueVal: v, start };
    st.entered = null; st.enteredStr = ''; st.result = null; st.tries = 0; st.showAnswer = false;
    input.value = '';
    feedback.textContent = '';
    feedback.className = 'lab-saved-hint';
  }

  // The "correct" reading is the true value rounded to the instrument's division.
  function correctReading() {
    const spec = INSTR[st.instr];
    const v = Math.round(st.obj.trueVal / spec.div) * spec.div;
    return Number(v.toFixed(spec.dp));
  }
  function correctString() { return correctReading().toFixed(INSTR[st.instr].dp); }

  function check() {
    const v = Number(input.value);
    if (input.value.trim() === '' || !Number.isFinite(v)) {
      feedback.textContent = T('Type the number you read on the instrument first.', 'Ketik dulu angka yang kamu baca pada alat ukur.');
      return;
    }
    const spec = INSTR[st.instr];
    st.entered = v; st.enteredStr = input.value.trim(); st.tries++;
    const diff = Math.abs(v - st.obj.trueVal);
    // Accept anything within one uncertainty (half the smallest division). newObject() never
    // generates a value on a half-division, so exactly one scale reading is accepted.
    const ok = diff <= spec.unc + 1e-9;
    st.result = ok ? 'ok' : 'off';
    st.flash = now;
    const sf = sigFigs(st.enteredStr);
    const sfWant = sigFigs(correctString());
    if (ok) {
      st.last = { instrument: st.instr, object: T(st.obj.en, st.obj.id), reading: v, unc: spec.unc, unit: spec.unit, sf };
      let msg = T(
        `Correct! ${correctString()} ${spec.unit} ± ${spec.unc} ${spec.unit} (half of the smallest division, ${spec.div} ${spec.unit}).`,
        `Benar! ${correctString()} ${spec.unit} ± ${spec.unc} ${spec.unit} (setengah skala terkecil, ${spec.div} ${spec.unit}).`,
      );
      if (sf !== sfWant) {
        msg += ' ' + T(
          `Significant figures: you wrote ${sf}, but this instrument gives ${sfWant} (write it as ${correctString()}).`,
          `Angka penting: kamu menulis ${sf}, tetapi alat ini memberi ${sfWant} (tulis sebagai ${correctString()}).`,
        );
      } else {
        msg += ' ' + T(`${sf} significant figure${sf === 1 ? '' : 's'}: the last digit is the uncertain one.`, `${sf} angka penting: digit terakhir adalah digit yang taksir.`);
      }
      feedback.textContent = msg;
      feedback.style.color = '#16a34a';
    } else {
      const hint = diff > spec.div * 3
        ? T('Far off: check which mark the edge lines up with, and that you started from the right zero.', 'Jauh meleset: periksa garis mana yang sejajar dengan ujung benda, dan apakah kamu mulai dari nol yang benar.')
        : T('Close, but outside the uncertainty. Look at the zoomed view and read the last digit again.', 'Hampir, tetapi di luar ketidakpastian. Lihat tampilan perbesaran dan baca lagi digit terakhirnya.');
      feedback.textContent = T(`Not quite (± ${spec.unc} ${spec.unit} allowed). `, `Belum tepat (toleransi ± ${spec.unc} ${spec.unit}). `) + hint;
      feedback.style.color = '#dc2626';
    }
  }

  // ---------- drawing ----------
  function drawRuler(ctx, W, H) {
    const o = st.obj, spec = INSTR.ruler;
    const x0 = W * 0.05, pxmm = (W * 0.9) / spec.max;
    const ry = H * 0.62, rh = H * 0.16;
    // body
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(x0 - 10, ry, W * 0.9 + 20, rh);
    ctx.fillStyle = '#92400e';
    ctx.font = `${Math.max(10, H * 0.03)}px ${SANS}`;
    ctx.textAlign = 'center';
    for (let mm = 0; mm <= spec.max; mm++) {
      const x = x0 + mm * pxmm;
      const len = mm % 10 === 0 ? rh * 0.5 : mm % 5 === 0 ? rh * 0.33 : rh * 0.2;
      ctx.fillRect(x - 0.5, ry, 1, len);
      if (mm % 10 === 0) ctx.fillText(String(mm / 10), x, ry + rh * 0.85);
    }
    ctx.textAlign = 'left';
    ctx.fillText('cm', x0 + 5, ry + rh * 0.85);
    // object
    const ox = x0 + o.start * pxmm, ow = o.trueVal * pxmm, oy = ry - H * 0.14, oh = H * 0.11;
    ctx.fillStyle = o.color;
    ctx.beginPath(); ctx.roundRect(ox, oy, ow, oh, 6); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#0b1220';
    ctx.font = `bold ${Math.max(11, H * 0.03)}px ${SANS}`;
    ctx.textAlign = 'center';
    ctx.fillText(T(o.en, o.id), ox + ow / 2, oy + oh / 2 + 4);
    // guide lines at both ends
    ctx.strokeStyle = 'rgba(248,113,113,0.9)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, ry + rh * 0.5); ctx.moveTo(ox + ow, oy); ctx.lineTo(ox + ow, ry + rh * 0.5); ctx.stroke();
    ctx.setLineDash([]);
    // zoom inset around the far end of the object
    const zoom = 4, zw = W * 0.34, zh = H * 0.2, zx = W * 0.63, zy = W < 640 ? H * 0.24 : H * 0.12;   // lower on narrow canvases, clear of the header
    drawZoomBox(ctx, zx, zy, zw, zh, W < 640 ? T('zoom ×4', 'perbesaran ×4') : T('zoom ×4 at the far end', 'perbesaran ×4 di ujung benda'));
    ctx.save(); ctx.beginPath(); ctx.rect(zx, zy, zw, zh); ctx.clip();
    const cxmm = o.start + o.trueVal, zpx = pxmm * zoom;
    const cx = zx + zw / 2, baseY = zy + zh * 0.55;
    ctx.fillStyle = '#fde68a'; ctx.fillRect(zx, baseY, zw, zh);
    ctx.fillStyle = '#92400e'; ctx.font = `${Math.max(10, H * 0.028)}px ${SANS}`; ctx.textAlign = 'center';
    for (let mm = Math.floor(cxmm - 6); mm <= Math.ceil(cxmm + 6); mm++) {
      if (mm < 0 || mm > spec.max) continue;
      const x = cx + (mm - cxmm) * zpx;
      const len = mm % 10 === 0 ? zh * 0.3 : mm % 5 === 0 ? zh * 0.2 : zh * 0.12;
      ctx.fillRect(x - 1, baseY, 2, len);
      if (mm % 10 === 0) ctx.fillText(String(mm / 10), x, baseY + zh * 0.42);   // cm labels only, as on the ruler
    }
    ctx.fillStyle = o.color;
    ctx.fillRect(zx, zy, cx - zx, baseY - zy - 2);
    ctx.strokeStyle = 'rgba(248,113,113,0.9)'; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(cx, zy); ctx.lineTo(cx, baseY + zh * 0.3); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    // start-mark note
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${Math.max(11, H * 0.03)}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(T(`The ${o.en} starts at the ${o.start / 10} cm mark. Length = end − start.`, `${o.id[0].toUpperCase() + o.id.slice(1)} mulai di tanda ${o.start / 10} cm. Panjang = ujung − awal.`), W * 0.05, H * 0.9);
  }

  function drawCaliper(ctx, W, H) {
    const o = st.obj, spec = INSTR.caliper;
    const x0 = W * 0.08, pxmm = (W * 0.84) / spec.max;
    const my = H * 0.56, mh = H * 0.12;      // main scale bar
    const jawTop = my - H * 0.16;
    const r = o.trueVal;                     // mm
    // main beam
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(x0 - W * 0.04, my, W * 0.84 + W * 0.08, mh);
    ctx.fillStyle = '#1f2937';
    ctx.font = `${Math.max(10, H * 0.028)}px ${SANS}`; ctx.textAlign = 'center';
    for (let mm = 0; mm <= spec.max; mm++) {
      const x = x0 + mm * pxmm;
      const len = mm % 10 === 0 ? mh * 0.5 : mm % 5 === 0 ? mh * 0.35 : mh * 0.2;
      ctx.fillRect(x - 0.6, my, 1.2, len);
      if (mm % 10 === 0) ctx.fillText(mm === spec.max ? 'mm' : String(mm), x, my + mh * 0.85);
    }
    ctx.textAlign = 'left';
    // fixed jaw
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x0 - W * 0.04, jawTop, W * 0.04, my - jawTop);
    // object between the jaws
    const ox = x0, ow = r * pxmm;
    ctx.fillStyle = o.color;
    ctx.beginPath(); ctx.roundRect(ox, jawTop + H * 0.02, ow, my - jawTop - H * 0.04, Math.min(8, ow / 3)); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 1.5; ctx.stroke();
    // sliding jaw + vernier plate (10 divisions over 9 mm)
    const sx = x0 + ow;
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(sx, jawTop, W * 0.04, my - jawTop);
    const vy = my + mh, vh = H * 0.11;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(sx - 6, vy, 9 * pxmm + W * 0.04 + 12, vh);
    ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center';
    for (let k = 0; k <= 10; k++) {
      const x = sx + k * 0.9 * pxmm;
      ctx.fillRect(x - 0.6, vy, 1.2, k % 5 === 0 ? vh * 0.45 : vh * 0.3);
      if (k % 5 === 0) ctx.fillText(String(k), x, vy + vh * 0.85);
    }
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.max(11, H * 0.03)}px ${SANS}`;
    ctx.fillText(T(o.en, o.id), ox + ow / 2, jawTop - 8);
    // zoom inset ×3 of the vernier region
    const narrowZ = W < 640;
    const zoom = 3, zw = W * 0.5, zh = narrowZ ? H * 0.15 : H * 0.26, zx = W * 0.47, zy = narrowZ ? H * 0.24 : H * 0.1;
    drawZoomBox(ctx, zx, zy, zw, zh, narrowZ ? T('zoom ×3', 'perbesaran ×3') : T('zoom ×3: main scale above, vernier below', 'perbesaran ×3: skala utama di atas, nonius di bawah'));
    ctx.save(); ctx.beginPath(); ctx.rect(zx, zy, zw, zh); ctx.clip();
    const zpx = pxmm * zoom;
    const leftMM = r - 1.5;                       // mm shown at the left edge of the inset
    const X = (mm) => zx + (mm - leftMM) * zpx;
    const midY = zy + zh * 0.5;
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(zx, zy, zw, midY - zy);
    ctx.fillStyle = '#1f2937'; ctx.font = `${Math.max(10, H * 0.028)}px ${SANS}`; ctx.textAlign = 'center';
    for (let mm = Math.floor(leftMM); mm <= Math.ceil(leftMM + zw / zpx) + 1; mm++) {
      if (mm < 0) continue;
      const x = X(mm);
      const len = mm % 10 === 0 ? zh * 0.26 : mm % 5 === 0 ? zh * 0.19 : zh * 0.12;
      ctx.fillRect(x - 1, midY - len, 2, len);
      if (mm % 5 === 0) ctx.fillText(String(mm), x, midY - zh * 0.3);
    }
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(zx, midY, zw, zy + zh - midY);
    ctx.fillStyle = '#0f172a';
    for (let k = 0; k <= 10; k++) {
      const x = X(r + k * 0.9);
      ctx.fillRect(x - 1, midY, 2, k % 5 === 0 ? zh * 0.22 : zh * 0.14);
      if (k % 5 === 0) ctx.fillText(String(k), x, midY + zh * 0.4);
    }
    // highlight the coincident line
    const tenth = Math.round((r * 10) % 10 + 10) % 10;    // 0..9
    const kx = X(r + tenth * 0.9);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(kx, midY - zh * 0.2); ctx.lineTo(kx, midY + zh * 0.28); ctx.stroke();
    // zero mark of the vernier
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(r), midY - zh * 0.3); ctx.lineTo(X(r), midY + zh * 0.3); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${Math.max(11, H * 0.03)}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(narrowZ
      ? T('Blue: whole mm. Red: tenths.', 'Biru: mm bulat. Merah: persepuluhan.')
      : T('Blue: vernier zero (main scale reading, whole mm). Red: the vernier line that lines up (tenths).', 'Biru: nol nonius (skala utama, mm bulat). Merah: garis nonius yang berimpit (persepuluhan).'), W * 0.05, H * 0.95);
  }

  function drawBalance(ctx, W, H) {
    const o = st.obj, spec = INSTR.balance;
    const cx = W * 0.3, cy = H * 0.56, R = Math.min(W * 0.22, H * 0.33);
    // dial
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 6; ctx.stroke();
    const a0 = Math.PI * 0.75, sweep = Math.PI * 1.5;   // 0 g at 135°, 200 g at 405°
    const ang = (g) => a0 + (g / spec.max) * sweep;
    ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#0f172a';
    ctx.font = `${Math.max(10, R * 0.11)}px ${SANS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let g = 0; g <= spec.max; g += spec.div) {
      const a = ang(g), major = g % 25 === 0, mid = g % 10 === 0;
      const len = major ? R * 0.16 : mid ? R * 0.11 : R * 0.07;
      ctx.lineWidth = major ? 2.5 : 1.2;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8));
      ctx.lineTo(cx + Math.cos(a) * (R - 8 - len), cy + Math.sin(a) * (R - 8 - len)); ctx.stroke();
      if (major) ctx.fillText(String(g), cx + Math.cos(a) * (R * 0.66), cy + Math.sin(a) * (R * 0.66));
    }
    ctx.font = `${Math.max(10, R * 0.12)}px ${SANS}`;
    ctx.fillText('g', cx, cy + R * 0.4);
    // needle (slightly animated settle)
    const settle = Math.min(1, (now - st.flashNew) / 1.2);
    const shown = o.trueVal * (1 - Math.exp(-6 * settle)) + Math.sin(settle * 18) * 4 * Math.exp(-5 * settle) * (1 - settle);
    const na = ang(clamp(shown, 0, spec.max));
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(na) * (R - 12), cy + Math.sin(na) * (R - 12)); ctx.stroke();
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.06, 0, Math.PI * 2); ctx.fill();
    ctx.textBaseline = 'alphabetic';
    // pan with the object
    const px = W * 0.72, py = H * 0.62, pw = W * 0.3;
    ctx.fillStyle = '#475569'; ctx.fillRect(px - pw / 2, py, pw, H * 0.03);
    ctx.fillRect(px - 8, py, 16, H * 0.25);
    ctx.fillRect(px - pw * 0.6, py + H * 0.25, pw * 1.2, H * 0.05);
    ctx.fillStyle = o.color;
    const ow = pw * 0.5, oh = H * 0.18;
    ctx.beginPath(); ctx.roundRect(px - ow / 2, py - oh, ow, oh, 14); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = o.color === '#1f2937' ? '#e2e8f0' : '#0b1220';
    const objName = T(o.en, o.id);
    // shrink the name so it fits on the object at narrow widths
    ctx.font = `bold ${Math.min(Math.max(11, H * 0.032), (ow * 0.92) / (objName.length * 0.58))}px ${SANS}`; ctx.textAlign = 'center';
    ctx.fillText(objName, px, py - oh / 2 + 4);
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${Math.max(11, H * 0.03)}px ${SANS}`; ctx.textAlign = 'left';
    if (W >= 640) ctx.fillText(T('Dial: 0–200 g, smallest division 5 g, so the uncertainty is ± 2.5 g.', 'Jarum: 0–200 g, skala terkecil 5 g, jadi ketidakpastian ± 2,5 g.'), W * 0.05, H * 0.95);
  }

  function drawZoomBox(ctx, x, y, w, h, label) {
    ctx.fillStyle = '#111c33';
    ctx.beginPath(); ctx.roundRect(x - 2, y - 2, w + 4, h + 4, 6); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.max(10, h * 0.11)}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(label, x, y - 8);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    if (!st.obj) { st.flashNew = now; newObject(); }
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const spec = INSTR[st.instr];
    // header
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.max(13, H * 0.045)}px ${SANS}`; ctx.textAlign = 'left';
    const what = st.instr === 'balance' ? T('mass', 'massa') : st.instr === 'caliper' ? T('width', 'lebar') : T('length', 'panjang');
    ctx.fillText(T(`Read the ${what} of the ${st.obj.en}`, `Bacalah ${what} ${st.obj.id}`), W * 0.05, H * 0.1);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.max(11, H * 0.03)}px ${SANS}`;
    ctx.fillText(T(`Smallest division ${spec.div} ${spec.unit} → uncertainty ± ${spec.unc} ${spec.unit}`, `Skala terkecil ${spec.div} ${spec.unit} → ketidakpastian ± ${spec.unc} ${spec.unit}`), W * 0.05, H * 0.16);

    if (st.instr === 'ruler') drawRuler(ctx, W, H);
    else if (st.instr === 'caliper') drawCaliper(ctx, W, H);
    else drawBalance(ctx, W, H);

    // result stamp (placed in the free area of each instrument's layout)
    const bw = W * 0.22, bh = H * 0.09;
    const bx = st.instr === 'balance' ? W * 0.55 : W * 0.05;
    const by = st.instr === 'ruler' ? H * 0.36 : st.instr === 'caliper' ? H * 0.24 : H * 0.2;
    if (st.result) {
      const age = now - st.flash;
      const ok = st.result === 'ok';
      ctx.fillStyle = ok ? 'rgba(34,197,94,0.92)' : 'rgba(239,68,68,0.92)';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 10); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(12, H * 0.04)}px ${MONO}`; ctx.textAlign = 'center';
      ctx.fillText(ok ? T('Correct', 'Benar') : T('Try again', 'Coba lagi'), bx + bw / 2, by + bh * 0.68);
      if (age < 0.5) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3 * (1 - age * 2); ctx.beginPath(); ctx.roundRect(bx - 3, by - 3, bw + 6, bh + 6, 12); ctx.stroke(); }
    }
    if (st.showAnswer) {
      ctx.fillStyle = '#fbbf24'; ctx.font = `bold ${Math.max(12, H * 0.04)}px ${MONO}`; ctx.textAlign = 'left';
      // caliper: below the vernier plate, because the zoom inset fills the space right of the stamp
      if (st.instr === 'caliper') ctx.fillText(`${correctString()} ± ${spec.unc} ${spec.unit}`, W * 0.05, H * 0.87);
      else ctx.fillText(`${correctString()} ± ${spec.unc} ${spec.unit}`, bx + bw + 12, by + bh * 0.68);
    }
    ctx.textAlign = 'left';
  }

  // ---------- controls ----------
  const instrSel = select({
    label: T('Instrument', 'Alat ukur'), key: 'instrument',
    options: [
      { value: 'ruler', label: T('Ruler (mm)', 'Mistar (mm)') },
      { value: 'caliper', label: T('Vernier caliper (0.1 mm)', 'Jangka sorong (0,1 mm)') },
      { value: 'balance', label: T('Balance (g)', 'Neraca (g)') },
    ],
    value: 'ruler',
    onChange: (v) => { st.instr = v; st.flashNew = now; newObject(); },
  });
  const newBtn = button({ label: T('New object', 'Benda baru'), onClick: () => { st.flashNew = now; newObject(); } });
  const answerT = toggle({ label: T('Show answer', 'Tampilkan jawaban'), key: 'answer', value: false, onChange: (v) => { st.showAnswer = v; } });

  // reading input
  const inWrap = document.createElement('div'); inWrap.className = 'ctrl';
  const inLab = document.createElement('label'); inLab.textContent = T('Your reading (number only)', 'Hasil bacaanmu (angka saja)');
  const unitSpan = document.createElement('span'); unitSpan.className = 'value'; unitSpan.textContent = INSTR.ruler.unit;
  const input = document.createElement('input');
  input.type = 'number'; input.step = 'any'; input.inputMode = 'decimal';
  input.placeholder = T('e.g. 47', 'mis. 47');
  input.className = 'btn'; input.style.gridColumn = '1 / -1'; input.style.width = '100%'; input.style.fontFamily = MONO;
  input.setAttribute('aria-label', inLab.textContent);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  inWrap.append(inLab, unitSpan, input);
  const checkBtn = button({ label: T('Check', 'Periksa'), primary: true, onClick: check });
  const feedback = document.createElement('p'); feedback.className = 'lab-saved-hint'; feedback.style.minHeight = '1.2em';
  feedback.setAttribute('role', 'status');

  ctrlPanel.append(instrSel.el, row(newBtn, answerT), inWrap, row(checkBtn), feedback);
  const origOnChange = instrSel.el.querySelector('select');
  origOnChange.addEventListener('change', () => { unitSpan.textContent = INSTR[st.instr].unit; });

  // ---------- unit conversion panel ----------
  const FAMILIES = {
    length: [['mm', 0.001], ['cm', 0.01], ['m', 1], ['km', 1000]],
    mass: [['g', 0.001], ['kg', 1]],
    volume: [['mL', 0.001], ['L', 1]],
  };
  const convWrap = document.createElement('div'); convWrap.className = 'sim-panel';
  Object.assign(convWrap.style, { marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'color-mix(in srgb, var(--color-fg) 4%, var(--color-surface))', border: '1px solid var(--color-border)', borderLeft: '3px solid var(--accent, var(--color-accent))', borderRadius: 'var(--radius-2)' });
  const convTitle = document.createElement('h4');
  Object.assign(convTitle.style, { margin: '0 0 var(--space-2)', fontSize: 'var(--type-md)', color: 'var(--accent, var(--color-accent))' });
  convTitle.textContent = T('Unit converter', 'Konversi satuan');
  const convRow = document.createElement('div'); convRow.className = 'ctrl-row'; convRow.style.alignItems = 'center';
  const convIn = document.createElement('input'); convIn.type = 'number'; convIn.step = 'any'; convIn.value = '47'; convIn.className = 'btn'; convIn.style.width = '7em'; convIn.style.fontFamily = MONO;
  convIn.setAttribute('aria-label', T('Value to convert', 'Nilai yang dikonversi'));
  const convSel = document.createElement('select'); convSel.className = 'btn';
  convSel.setAttribute('aria-label', T('Unit', 'Satuan'));
  for (const fam of Object.keys(FAMILIES)) for (const [u] of FAMILIES[fam]) { const o = document.createElement('option'); o.value = `${fam}:${u}`; o.textContent = u; convSel.appendChild(o); }
  const useBtn = button({ label: T('Use my reading', 'Pakai bacaanku'), onClick: () => {
    if (st.last) { convIn.value = String(st.last.reading); convSel.value = `${st.last.unit === 'g' ? 'mass' : 'length'}:${st.last.unit}`; renderConv(); }
  } });
  const convOut = document.createElement('div'); convOut.style.fontFamily = MONO; convOut.style.fontSize = '0.95rem'; convOut.style.lineHeight = '1.6';
  convOut.setAttribute('role', 'status');
  function fmt(v) {
    if (!Number.isFinite(v)) return '–';
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 1e6 || a < 1e-4) return v.toExponential(3);
    return String(Number(v.toPrecision(6)));
  }
  function renderConv() {
    const v = Number(convIn.value);
    const [fam, u] = convSel.value.split(':');
    const list = FAMILIES[fam];
    const f = list.find((x) => x[0] === u);
    if (!Number.isFinite(v) || !f) { convOut.textContent = '–'; return; }
    const base = v * f[1];
    convOut.innerHTML = '';
    for (const [uu, k] of list) {
      if (uu === u) continue;
      const line = document.createElement('div');
      line.textContent = `${fmt(v)} ${u} = ${fmt(base / k)} ${uu}`;
      convOut.appendChild(line);
    }
    const note = document.createElement('div'); note.style.color = 'var(--color-muted)'; note.style.fontFamily = SANS; note.style.fontSize = '0.85rem';
    note.textContent = fam === 'length'
      ? T('10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km. Moving to a bigger unit makes the number smaller.', '10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km. Pindah ke satuan lebih besar membuat angkanya lebih kecil.')
      : fam === 'mass' ? T('1000 g = 1 kg.', '1000 g = 1 kg.') : T('1000 mL = 1 L.', '1000 mL = 1 L.');
    convOut.appendChild(note);
  }
  convIn.addEventListener('input', renderConv);
  convSel.addEventListener('change', renderConv);
  convRow.append(convIn, convSel, useBtn.el);
  convWrap.append(convTitle, convRow, convOut);
  ctrlPanel.appendChild(convWrap);
  renderConv();

  // ---------- lab ----------
  const lab = labPanel({
    title: 'Measurement lab — reading and uncertainty',
    filename: 'measurement-units-data.csv',
    columns: [
      { key: 'instrument', label: 'Instrument' },
      { key: 'object', label: 'Object' },
      { key: 'reading', label: 'Reading' },
      { key: 'unc', label: '± uncertainty' },
      { key: 'unit', label: 'Unit' },
      { key: 'sf', label: 'Sig. figs' },
    ],
    procedure: [
      'Choose the ruler. Read the length of the object to the nearest mm, type it and press Check.',
      'When it is correct, press Record. Note the uncertainty (± half the smallest division).',
      'Switch to the vernier caliper and measure three objects. How many more digits can you read?',
      'Switch to the balance and record three masses.',
      'Use the converter to write one reading in cm and one in kg.',
    ],
    predict: 'Which instrument will give the most significant figures: ruler, caliper or balance? Why?',
    source: () => (st.last ? { ...st.last } : null),
  });
  ctrlPanel.appendChild(lab.el);

  st.flashNew = 0;
  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
