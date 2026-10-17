import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Schematic hormone curves (each scaled 0..1 to its own cycle peak) for a 28-day cycle.
const gauss = (d, mu, sg) => Math.exp(-0.5 * ((d - mu) / sg) ** 2);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function hormones(d, fert) {
  const lh = clamp(0.12 + 0.88 * gauss(d, 13.5, 0.7) + 0.05 * gauss(d, 13.5, 2.5), 0, 1);
  const fsh = clamp(0.30 + 0.22 * gauss(d, 3, 2.5) - 0.08 * gauss(d, 10, 2) + 0.35 * gauss(d, 13.5, 0.9) - 0.12 * clamp((d - 15) / 6, 0, 1) + (fert ? 0 : 0.15 * gauss(d, 28, 1.5)), 0.08, 1);
  let e2 = 0.12 + 0.78 * gauss(d, 12.2, 1.9) + 0.42 * gauss(d, 21.5, 3.2);
  let p4 = 0.04 + 0.96 * gauss(d, 21.5, 3.4);
  if (fert && d > 21.5) { p4 = 0.04 + 0.96 * (1 + 0.04 * (d - 21.5)); e2 = 0.12 + 0.42 * (1 + 0.03 * (d - 21.5)); }
  return { fsh, lh, e2, p4 };
}
function endometrium(d, fert) {
  if (d <= 5) return 10 - 8 * (d - 1) / 4;
  if (d <= 14) return 2 + 6 * (d - 5) / 9;
  if (d <= 24) return 8 + 4 * (d - 14) / 10;
  return fert ? 12 + 0.2 * (d - 24) : 12 - 2 * (d - 24) / 4;
}
// Representative clinical units (for the readout only).
const units = (h) => ({ fsh: 3 + 12 * h.fsh, lh: 4 + 56 * h.lh, e2: 100 + 1200 * h.e2, p4: 1 + 50 * h.p4 });

const C = {
  bg: '#0b1220', text: '#e5e7eb', dim: '#94a3b8', grid: 'rgba(148,163,184,0.18)',
  fsh: '#38bdf8', lh: '#f59e0b', e2: '#ec4899', p4: '#a78bfa',
  mens: 'rgba(239,68,68,0.12)', lut: 'rgba(167,139,250,0.08)', ovul: 'rgba(250,204,21,0.6)',
  tissue: '#7f1d1d', endo: '#f87171', follicle: '#fbcfe8', luteum: '#facc15',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);

  const state = { day: 1, playing: false, rate: 1.5, fert: false };
  let now = 0;
  let chart = { x: 0, y: 0, w: 1, h: 1 };
  const X = (d) => chart.x + (d - 1) / 27 * chart.w;
  const dayAt = (x) => clamp(1 + (x - chart.x) / chart.w * 27, 1, 28);

  function phase(d) {
    if (d <= 5) return { key: 'menstrual', en: 'Menstrual phase (days 1–5)', id: 'Fase menstruasi (hari 1–5)' };
    if (d < 13.5) return { key: 'follicular', en: 'Follicular / proliferative phase', id: 'Fase folikular / proliferasi' };
    if (d <= 14.5) return { key: 'ovulation', en: 'Ovulation (LH surge → follicle ruptures)', id: 'Ovulasi (lonjakan LH → folikel pecah)' };
    if (state.fert && d >= 21) return { key: 'pregnant', en: 'Luteal phase — embryo implanted (hCG)', id: 'Fase luteal — embrio berimplantasi (hCG)' };
    return { key: 'luteal', en: 'Luteal / secretory phase', id: 'Fase luteal / sekresi' };
  }
  function dominant(h) {
    const arr = [['FSH', h.fsh], ['LH', h.lh], [T('oestrogen', 'estrogen'), h.e2], [T('progesterone', 'progesteron'), h.p4]];
    arr.sort((a, b) => b[1] - a[1]); return arr[0][0];
  }
  const bbt = (h) => 36.4 + 0.4 * clamp((h.p4 - 0.1) / 0.3, 0, 1);

  function step(dt) {
    if (!state.playing) return;
    state.day += dt * state.rate;
    if (state.day > 28) {
      if (state.fert) { state.day = 28; state.playing = false; playT.value = false; }
      else state.day -= 27;
    }
    daySlider.value = Math.round(state.day * 2) / 2;
  }

  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  function drawChart(ctx, fs) {
    const { x, y, w, h } = chart;
    const Y = (v) => y + h - clamp(v, 0, 1.3) / 1.3 * h;
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = C.mens; ctx.fillRect(X(1), y, X(5) - X(1), h);
    ctx.fillStyle = C.lut; ctx.fillRect(X(15), y, X(28) - X(15), h);
    ctx.fillStyle = C.ovul; ctx.fillRect(X(14) - 1.5, y, 3, h);
    ctx.strokeStyle = C.grid; ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'center';
    for (let d = 1; d <= 28; d++) {
      if (d % 7 === 1 || d === 28 || d === 14) { ctx.beginPath(); ctx.moveTo(X(d), y); ctx.lineTo(X(d), y + h); ctx.stroke(); }
      if (d % 2 === 1 || d === 28 || d === 14) ctx.fillText(String(d), X(d), y + h + fs * 1.1);
    }
    ctx.fillText(T('day of cycle', 'hari siklus'), x + w / 2, y + h + fs * 2.3);
    ctx.font = font(fs * 0.85);
    ctx.fillText(T('menstrual', 'menstruasi'), X(3), y + fs); ctx.fillText(T('follicular', 'folikular'), X(9.5), y + fs);
    ctx.fillText(T('ovulation', 'ovulasi'), X(14), y - fs * 0.4); ctx.fillText(T('luteal', 'luteal'), X(21.5), y + fs);
    ctx.textAlign = 'left';
    const curves = [['fsh', C.fsh, 'FSH'], ['lh', C.lh, 'LH'], ['e2', C.e2, T('oestrogen', 'estrogen')], ['p4', C.p4, T('progesterone', 'progesteron')]];
    for (const [k, col, lab] of curves) {
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let d = 1; d <= 28.001; d += 0.1) { const v = hormones(d, state.fert)[k]; d <= 1.05 ? ctx.moveTo(X(d), Y(v)) : ctx.lineTo(X(d), Y(v)); }
      ctx.stroke();
    }
    // legend
    ctx.font = font(fs * 0.9);
    curves.forEach(([k, col, lab], i) => { const lx = x + w - fs * 22 + i * fs * 5.5; ctx.fillStyle = col; ctx.fillRect(lx, y - fs * 1.35, fs * 1.4, fs * 0.35); ctx.fillText(lab, lx + fs * 1.7, y - fs * 1.0); });
    ctx.fillStyle = C.dim; ctx.save(); ctx.translate(x - fs * 1.1, y + h / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(T('relative level (each scaled to own peak)', 'kadar relatif (tiap diskalakan ke puncaknya)'), 0, 0); ctx.restore();
    // day marker
    const mx = X(state.day), h0 = hormones(state.day, state.fert);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(mx, y - fs * 0.6); ctx.lineTo(mx, y + h); ctx.stroke(); ctx.setLineDash([]);
    for (const [k, col] of curves) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(mx, Y(h0[k]), 4, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(mx, y - fs * 0.5); ctx.lineTo(mx - 7, y - fs * 1.4); ctx.lineTo(mx + 7, y - fs * 1.4); ctx.closePath(); ctx.fill();
  }

  function drawOvary(ctx, x, y, w, h, fs) {
    const d = state.day;
    ctx.fillStyle = C.dim; ctx.font = font(fs, true); ctx.fillText(T('Ovary', 'Ovarium'), x, y + fs);
    const cx = x + w / 2, cy = y + h * 0.55, rx = w * 0.42, ry = h * 0.3;
    ctx.fillStyle = 'rgba(251,207,232,0.12)'; ctx.strokeStyle = '#f9a8d4'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    const mmToPx = ry * 1.4 / 24;
    let label = '';
    if (d < 14) {
      const diam = 2 + 18 * clamp((d - 1) / 12.5, 0, 1); const r = diam * mmToPx;
      ctx.fillStyle = C.follicle; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#be185d'; ctx.beginPath(); ctx.arc(cx + r * 0.45, cy - r * 0.3, Math.max(2, r * 0.18), 0, Math.PI * 2); ctx.fill();
      for (let i = 0; i < 3; i++) { ctx.fillStyle = 'rgba(251,207,232,0.5)'; ctx.beginPath(); ctx.arc(cx + Math.cos(i * 2.1) * rx * 0.65, cy + Math.sin(i * 2.1) * ry * 0.6, 2.5 * mmToPx, 0, Math.PI * 2); ctx.fill(); }
      label = T(`follicle ${diam.toFixed(0)} mm (oocyte inside)`, `folikel ${diam.toFixed(0)} mm (oosit di dalam)`);
    } else if (d <= 14.5) {
      const r = 20 * mmToPx;
      ctx.fillStyle = C.follicle; ctx.beginPath(); ctx.arc(cx, cy, r, 0.5, Math.PI * 2 - 0.5); ctx.lineTo(cx, cy); ctx.fill();
      const k = (d - 14) / 0.5; const ox = cx + r + 6 + k * w * 0.12, oy = cy - k * h * 0.15;
      ctx.fillStyle = '#be185d'; ctx.beginPath(); ctx.arc(ox, oy, Math.max(3, r * 0.2), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.lh; ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(cx + r * 0.9, cy + i * 8); ctx.lineTo(cx + r * 1.3, cy + i * 14); ctx.stroke(); }
      label = T('ovulation: oocyte released', 'ovulasi: oosit dilepaskan');
    } else {
      const alive = state.fert || d <= 26;
      const fade = state.fert ? 1 : clamp(1 - (d - 24) / 4, 0.25, 1);
      const r = (state.fert ? 20 + (d - 14) * 0.3 : 18 * fade + 3) * mmToPx;
      ctx.fillStyle = `rgba(250,204,21,${0.35 + 0.6 * fade})`; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(234,179,8,${fade})`; ctx.lineWidth = 2; ctx.stroke();
      label = alive && fade > 0.5 ? T('corpus luteum → progesterone', 'korpus luteum → progesteron') : T('corpus luteum degenerating', 'korpus luteum berdegenerasi');
      if (state.fert && d >= 21) label = T('corpus luteum kept alive by hCG', 'korpus luteum dijaga hCG');
    }
    ctx.fillStyle = C.text; ctx.font = font(fs * 0.9); ctx.textAlign = 'center'; ctx.fillText(label, cx, y + h - fs * 0.3); ctx.textAlign = 'left';
  }

  function drawUterus(ctx, x, y, w, h, fs) {
    const d = state.day, mm = endometrium(d, state.fert);
    ctx.fillStyle = C.dim; ctx.font = font(fs, true); ctx.fillText(T('Uterus (section)', 'Uterus (penampang)'), x, y + fs);
    const bx = x + w * 0.2, by = y + fs * 1.8, bw = w * 0.6, bh = h - fs * 3.2;
    // muscle wall
    ctx.fillStyle = C.tissue; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 14); ctx.fill();
    const wall = bw * 0.12;
    const px = (bw / 2 - wall) * clamp(mm / 14, 0, 1) * 0.9;
    // endometrium lining on both sides of the cavity
    ctx.fillStyle = C.endo;
    ctx.fillRect(bx + wall, by + wall, px, bh - 2 * wall);
    ctx.fillRect(bx + bw - wall - px, by + wall, px, bh - 2 * wall);
    if (state.fert && d >= 21) { ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(bx + wall + px + 4, by + bh * 0.35, Math.max(4, fs * 0.5), 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = C.text; ctx.font = font(fs * 0.8); ctx.fillText(T('embryo', 'embrio'), bx + wall + px + 10, by + bh * 0.35 - fs * 0.6); }
    // cavity
    ctx.fillStyle = '#0b1220'; ctx.fillRect(bx + wall + px, by + wall, bw - 2 * wall - 2 * px, bh - 2 * wall);
    if (d <= 5) { ctx.fillStyle = '#ef4444'; for (let i = 0; i < 4; i++) { const k = ((now * 0.6 + i * 0.25) % 1); ctx.beginPath(); ctx.arc(bx + bw / 2 + (i - 1.5) * fs * 0.6, by + bh * 0.4 + k * bh * 0.6, 3, 0, Math.PI * 2); ctx.fill(); } }
    ctx.fillStyle = C.text; ctx.font = font(fs * 0.9); ctx.textAlign = 'center';
    ctx.fillText(T(`endometrium ${mm.toFixed(1)} mm`, `endometrium ${mm.toFixed(1)} mm`), x + w / 2, y + h - fs * 0.3);
    ctx.textAlign = 'left';
    // thickness scale bar
    ctx.strokeStyle = C.dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx + bw + 6, by + wall); ctx.lineTo(bx + bw + 6, by + wall + (bw / 2 - wall) * 0.9); ctx.stroke();
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.75); ctx.fillText('14 mm', bx + bw + 9, by + wall + (bw / 2 - wall) * 0.9 + fs * 0.3); ctx.fillText('0', bx + bw + 9, by + wall + fs * 0.3);
  }

  function drawReadout(ctx, x, y, w, h, fs) {
    const d = state.day, hh = hormones(d, state.fert), u = units(hh), ph = phase(d);
    ctx.fillStyle = C.text; ctx.font = mono(fs * 1.6, true); ctx.fillText(`${T('Day', 'Hari')} ${d.toFixed(1)}`, x, y + fs * 1.5);
    ctx.fillStyle = ph.key === 'ovulation' ? C.lh : ph.key === 'menstrual' ? '#f87171' : ph.key === 'pregnant' ? '#fde68a' : C.text; ctx.font = font(fs, true);
    ctx.fillText(T(ph.en, ph.id), x, y + fs * 3);
    const rows = [[C.fsh, 'FSH', `${u.fsh.toFixed(1)} IU/L`, hh.fsh], [C.lh, 'LH', `${u.lh.toFixed(1)} IU/L`, hh.lh], [C.e2, T('Oestrogen', 'Estrogen'), `${u.e2.toFixed(0)} pmol/L`, hh.e2], [C.p4, T('Progesterone', 'Progesteron'), `${u.p4.toFixed(1)} nmol/L`, hh.p4]];
    let yy = y + fs * 4.6; const barW = w * 0.35;
    ctx.font = font(fs * 0.9);
    for (const [col, lab, val, rel] of rows) {
      ctx.fillStyle = col; ctx.fillText(lab, x, yy);
      ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(x + w * 0.32, yy - fs * 0.75, barW, fs * 0.8);
      ctx.fillStyle = col; ctx.fillRect(x + w * 0.32, yy - fs * 0.75, barW * clamp(rel / 1.3, 0, 1), fs * 0.8);
      ctx.fillStyle = C.text; ctx.font = mono(fs * 0.85); ctx.fillText(val, x + w * 0.32 + barW + 6, yy); ctx.font = font(fs * 0.9);
      yy += fs * 1.5;
    }
    ctx.fillStyle = C.dim;
    ctx.fillText(T(`highest (relative): ${dominant(hh)}`, `tertinggi (relatif): ${dominant(hh)}`), x, yy + fs * 0.2);
    ctx.fillText(T(`endometrium ${endometrium(d, state.fert).toFixed(1)} mm · basal temp ${bbt(hh).toFixed(1)} °C`, `endometrium ${endometrium(d, state.fert).toFixed(1)} mm · suhu basal ${bbt(hh).toFixed(1)} °C`), x, yy + fs * 1.6);
    if (state.fert) { ctx.fillStyle = '#fde68a'; ctx.fillText(T('fertilisation on: hCG keeps progesterone high, no menstruation', 'fertilisasi: hCG menjaga progesteron tinggi, tidak ada menstruasi'), x, yy + fs * 3); }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.014, 9, 14);
    chart = { x: fs * 3, y: fs * 2.4, w: W - fs * 4.5, h: H * 0.42 };
    drawChart(ctx, fs);
    const by = chart.y + chart.h + fs * 3.2, bh = H - by - fs * 0.6;
    drawOvary(ctx, fs * 1.5, by, W * 0.27, bh, fs);
    drawUterus(ctx, W * 0.30, by, W * 0.27, bh, fs);
    drawReadout(ctx, W * 0.60, by, W * 0.39, bh, fs);
  }

  // Drag the day marker on the chart (also keyboard-accessible through handles()).
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) { return y >= chart.y - 20 && y <= chart.y + chart.h && Math.abs(x - X(state.day)) < 18 ? 'day' : (y >= chart.y && y <= chart.y + chart.h ? 'day' : null); },
    onStart(id, x) { setDay(dayAt(x)); },
    onDrag(id, x) { setDay(dayAt(x)); },
    handles: () => [{ id: 'day', x: X(state.day), y: chart.y - 10, label: `Day marker (day ${state.day.toFixed(1)})` }],
    cursor: 'ew-resize', hoverCursor: 'ew-resize',
  });
  function setDay(d) { state.day = clamp(Math.round(d * 2) / 2, 1, 28); daySlider.value = state.day; }

  const daySlider = slider({ label: 'Day of cycle', key: 'day', min: 1, max: 28, step: 0.5, value: 1, format: (v) => v.toFixed(1), onInput: (v) => { state.day = v; } });
  const playT = toggle({ label: 'Play (auto-advance)', key: 'play', value: false, onChange: (v) => { state.playing = v; } });
  const rateS = slider({ label: 'Play speed (days per second)', key: 'rate', min: 0.5, max: 4, step: 0.5, value: 1.5, format: (v) => v.toFixed(1), onInput: (v) => { state.rate = v; } });
  const fertT = toggle({ label: 'Fertilisation occurs (embryo implants ~day 21)', key: 'fert', value: false, onChange: (v) => { state.fert = v; } });
  const resetB = button({ label: 'Back to day 1', onClick: () => setDay(1) });
  const ovB = button({ label: 'Jump to ovulation (day 14)', onClick: () => setDay(14) });
  ctrlPanel.append(daySlider.el, row(playT, rateS), fertT.el, row(resetB, ovB));

  const lab = labPanel({
    title: 'Cycle lab — day, phase, hormones, endometrium',
    filename: 'menstrual-cycle-data.csv',
    columns: [
      { key: 'day', label: 'Day', format: (v) => v.toFixed(1) },
      { key: 'phase', label: 'Phase' },
      { key: 'dominant', label: 'Highest hormone (relative)' },
      { key: 'fsh', label: 'FSH (%)', format: (v) => v.toFixed(0) },
      { key: 'lh', label: 'LH (%)', format: (v) => v.toFixed(0) },
      { key: 'e2', label: 'Oestrogen (%)', format: (v) => v.toFixed(0) },
      { key: 'p4', label: 'Progesterone (%)', format: (v) => v.toFixed(0) },
      { key: 'endo', label: 'Endometrium (mm)', format: (v) => v.toFixed(1) },
      { key: 'bbt', label: 'Basal temp (°C)', format: (v) => v.toFixed(1) },
      { key: 'fert', label: 'Fertilised?' },
    ],
    procedure: [
      'Set the day to 1, 3, 5. Record each. Which hormone is highest, and what is happening to the endometrium?',
      'Record days 8, 11, 12 and 13. Which hormone rises first, and which one surges?',
      'Record day 14 (ovulation) and days 17, 21, 24, 28.',
      'Switch on Fertilisation and record days 24 and 28 again. Compare progesterone and endometrium with the earlier rows.',
      'From your table, state the day of each hormone\'s peak and the order in which they occur.',
    ],
    predict: 'Which hormone will peak first: oestrogen, LH or progesterone? On which day will the endometrium be thickest?',
    source: () => {
      const d = state.day, hh = hormones(d, state.fert), ph = phase(d);
      return { day: d, phase: ph.en, dominant: dominant(hh), fsh: hh.fsh * 100, lh: hh.lh * 100, e2: hh.e2 * 100, p4: hh.p4 * 100, endo: endometrium(d, state.fert), bbt: bbt(hh), fert: state.fert ? 'yes' : 'no' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
