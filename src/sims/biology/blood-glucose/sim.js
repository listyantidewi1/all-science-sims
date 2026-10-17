import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Model units: glucose G in mmol/L (15 L pool; 1 g glucose ≈ 0.37 mmol/L), hormones 0..1 (relative),
// liver glycogen S in grams, meal carbohydrate in the stomach/gut in grams. One model step = 1 minute.
const G_PER_MMOL = 2.7;       // grams of glucose per 1 mmol/L change of the 15 L pool
const S_MAX = 120;
const LO = 4, HI = 7;         // normal range band (mmol/L)
const INJECT_DOSE = 4.0;      // relative units added to the subcutaneous depot per injection

const C = {
  bg: '#0b1220', text: '#e5e7eb', dim: '#94a3b8', grid: 'rgba(148,163,184,0.18)',
  glucose: '#facc15', insulin: '#38bdf8', glucagon: '#f59e0b', band: 'rgba(34,197,94,0.14)', bandLine: 'rgba(34,197,94,0.5)',
  ok: '#22c55e', hi: '#f59e0b', lo: '#ef4444', sleep: 'rgba(99,102,241,0.15)', glycogen: '#a78bfa', box: 'rgba(255,255,255,0.06)',
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { speed: 10, type1: false, paused: false };
  const m = { G: 5.0, I: 0.15, Gl: 0.15, Iinj: 0, Idep: 0, S: 100, stom: 0, gut: 0 };
  const flux = { U: 0, Sto: 0, Rel: 0, GNG: 0, gutIn: 0, Itot: 0.15 };
  const state = {
    tMin: 7 * 60,            // clock starts at 07:00
    acc: 0,                  // fractional minutes accumulated
    day: 1,
    hist: [],                // one sample per minute: {t, G, I, Gl}
    events: [],              // markers {t, label}
    exUntil: -1, sleepUntil: -1,
    episode: null, lastEpisode: null,
    flash: { ins: 0, glu: 0, inj: 0 },
  };
  let now = 0;

  function modelStep() {
    const ex = state.tMin < state.exUntil;
    const emp = m.stom * 0.02; m.stom -= emp; m.gut += emp;              // stomach emptying
    const absorb = m.gut * 0.03; m.gut -= absorb;                        // intestinal absorption (g/min)
    const gutIn = absorb / G_PER_MMOL;
    const It = params.type1 ? 0 : 1 / (1 + Math.exp(-(m.G - 6.6) / 0.6)); // β-cell insulin target
    const Gt = 1 / (1 + Math.exp((m.G - 4.3) / 0.4));                      // α-cell glucagon target
    m.I += (It - m.I) / 10; m.Gl += (Gt - m.Gl) / 10;
    const kin = m.Idep * 0.025; m.Idep -= kin; m.Iinj += kin - m.Iinj / 70; // injected insulin: depot → blood → cleared
    const Itot = Math.min(2.0, m.I + m.Iinj);
    const U = 0.012 * m.G + 0.10 * Itot * (m.G / 5) + (ex ? 0.12 : 0) + Math.max(0, m.G - 10) * 0.05; // uptake + renal loss
    const Sto = 0.15 * Itot * Math.max(0, m.G - 5.5);                    // glycogenesis
    const Rel = m.S > 0 ? 0.18 * m.Gl + (ex ? 0.04 : 0) : 0;             // glycogenolysis
    const GNG = 0.03 + 0.06 * m.Gl * (1 - 0.5 * m.S / S_MAX);             // gluconeogenesis
    m.S = clamp(m.S + (Sto - Rel) * G_PER_MMOL, 0, S_MAX);
    m.G = Math.max(1.5, m.G + gutIn - U - Sto + Rel + GNG);
    Object.assign(flux, { U, Sto, Rel, GNG, gutIn, Itot });
  }

  function pushHistory() {
    state.hist.push({ t: state.tMin, G: m.G, I: flux.Itot, Gl: m.Gl });
  }

  function startEpisode(label) {
    if (state.episode) finishEpisode(true);
    state.episode = { event: label, type1: params.type1 ? 'yes' : 'no', gBefore: m.G, extreme: m.G, t0: state.tMin, left: false, tBack: null, done: false };
    state.lastEpisode = state.episode;
    state.events.push({ t: state.tMin, label });
  }
  function finishEpisode(force) {
    const e = state.episode; if (!e) return;
    e.done = true; if (!e.left) e.tBack = 0;
    if (force && e.left && e.tBack == null) e.tBack = null;
    state.episode = null;
  }
  function updateEpisode(prevT) {
    const e = state.episode; if (!e) return;
    const age = state.tMin - e.t0;
    if (Math.abs(m.G - e.gBefore) > Math.abs(e.extreme - e.gBefore)) e.extreme = m.G;
    const inRange = m.G >= LO && m.G <= HI;
    if (!inRange) e.left = true;
    else if (e.left && e.tBack == null) { e.tBack = age; finishEpisode(false); return; }
    if (age >= 360) finishEpisode(false);
  }

  function minuteTick() {
    const prevT = state.tMin;
    modelStep();
    state.tMin += 1;
    pushHistory();
    updateEpisode(prevT);
    if (state.tMin >= 1440) {
      state.tMin -= 1440; state.day += 1;
      state.hist = []; state.events = [];
      if (state.exUntil > 0) state.exUntil -= 1440;
      if (state.sleepUntil > 0) state.sleepUntil -= 1440;
      if (state.episode) state.episode.t0 -= 1440;
    }
  }

  function step(dt) {
    if (params.paused) return;
    const asleep = state.tMin < state.sleepUntil;
    state.acc += dt * params.speed * (asleep ? 4 : 1);
    let n = 0;
    while (state.acc >= 1 && n < 400) { state.acc -= 1; minuteTick(); n++; }
    // Visual intensity of the feedback arrows
    state.flash.ins = flux.Itot; state.flash.glu = m.Gl; state.flash.inj = m.Iinj;
  }

  // ---------- actions ----------
  function eat(g, label) { m.stom += g; startEpisode(label); }
  function exercise() { state.exUntil = state.tMin + 30; startEpisode('Exercise 30 min'); }
  function sleep() { state.sleepUntil = state.tMin + 480; startEpisode('Sleep 8 h'); }
  function inject() { m.Idep += INJECT_DOSE; startEpisode('Insulin injection'); }
  function resetDay() {
    Object.assign(m, { G: 5.0, I: params.type1 ? 0 : 0.15, Gl: 0.15, Iinj: 0, Idep: 0, S: 100, stom: 0, gut: 0 });
    state.tMin = 7 * 60; state.acc = 0; state.hist = []; state.events = []; state.exUntil = -1; state.sleepUntil = -1;
    state.episode = null; state.lastEpisode = null; state.day = 1;
  }

  // ---------- drawing ----------
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  const hhmm = (t) => { const tt = ((t % 1440) + 1440) % 1440; return `${String(Math.floor(tt / 60)).padStart(2, '0')}:${String(Math.floor(tt % 60)).padStart(2, '0')}`; };
  function arrow(ctx, x1, y1, x2, y2, color, w) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1), hs = 5 + w * 1.5;
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hs * Math.cos(a - 0.45), y2 - hs * Math.sin(a - 0.45)); ctx.lineTo(x2 - hs * Math.cos(a + 0.45), y2 - hs * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
  }

  function drawGlucoseChart(ctx, x, y, w, h, fs) {
    const gMax = 16;
    const X = (t) => x + (t / 1440) * w;
    const Y = (g) => y + h - (clamp(g, 0, gMax) / gMax) * h;
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(x, y, w, h);
    // sleep shading
    if (state.sleepUntil > 0) {
      const s0 = Math.max(0, state.sleepUntil - 480), s1 = Math.min(1440, state.sleepUntil);
      ctx.fillStyle = C.sleep; ctx.fillRect(X(s0), y, X(Math.min(s1, Math.max(s0, state.tMin))) - X(s0), h);
    }
    // normal band
    ctx.fillStyle = C.band; ctx.fillRect(x, Y(HI), w, Y(LO) - Y(HI));
    ctx.strokeStyle = C.bandLine; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x, Y(HI)); ctx.lineTo(x + w, Y(HI)); ctx.moveTo(x, Y(LO)); ctx.lineTo(x + w, Y(LO)); ctx.stroke(); ctx.setLineDash([]);
    // grid + axes
    ctx.strokeStyle = C.grid; ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'right';
    for (let g = 0; g <= gMax; g += 4) { ctx.beginPath(); ctx.moveTo(x, Y(g)); ctx.lineTo(x + w, Y(g)); ctx.stroke(); ctx.fillText(String(g), x - 4, Y(g) + fs * 0.35); }
    ctx.textAlign = 'center';
    for (let hr = 0; hr <= 24; hr += 3) { const xx = X(hr * 60); ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke(); ctx.fillText(`${String(hr % 24).padStart(2, '0')}:00`, xx, y + h + fs * 1.1); }
    ctx.textAlign = 'left'; ctx.fillStyle = C.text; ctx.font = font(fs);
    ctx.fillText(T('Blood glucose (mmol/L)', 'Glukosa darah (mmol/L)'), x + 4, y - fs * 0.5);
    ctx.fillStyle = C.ok; ctx.font = font(fs * 0.85); ctx.fillText(T('normal 4–7', 'normal 4–7'), x + w - fs * 5, Y(HI) - 3);
    // trace
    if (state.hist.length > 1) {
      ctx.strokeStyle = C.glucose; ctx.lineWidth = 2; ctx.beginPath();
      state.hist.forEach((p, i) => (i ? ctx.lineTo(X(p.t), Y(p.G)) : ctx.moveTo(X(p.t), Y(p.G))));
      ctx.stroke();
    }
    // event markers
    ctx.font = font(fs * 0.8); ctx.textAlign = 'center';
    state.events.forEach((e, i) => {
      const xx = X(e.t);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx, y + h); ctx.stroke();
      ctx.fillStyle = C.text; ctx.fillText(e.label.split(' ')[0], xx, y + fs * (1 + (i % 2) * 1.1));
    });
    // current point
    const gx = X(state.tMin), gy = Y(m.G);
    ctx.fillStyle = m.G < LO ? C.lo : m.G > HI ? C.hi : C.ok;
    ctx.beginPath(); ctx.arc(gx, gy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.textAlign = 'left';
  }

  function drawHormoneChart(ctx, x, y, w, h, fs) {
    const X = (t) => x + (t / 1440) * w;
    const Y = (v) => y + h - clamp(v, 0, 1.2) / 1.2 * h;
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = C.grid; ctx.beginPath(); ctx.moveTo(x, Y(0.5)); ctx.lineTo(x + w, Y(0.5)); ctx.moveTo(x, Y(1)); ctx.lineTo(x + w, Y(1)); ctx.stroke();
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'right'; ctx.fillText('1', x - 4, Y(1) + fs * 0.35); ctx.fillText('0', x - 4, Y(0) + fs * 0.35);
    ctx.textAlign = 'left';
    const trace = (key, color) => {
      if (state.hist.length < 2) return;
      ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.beginPath();
      state.hist.forEach((p, i) => (i ? ctx.lineTo(X(p.t), Y(p[key])) : ctx.moveTo(X(p.t), Y(p[key]))));
      ctx.stroke();
    };
    trace('I', C.insulin); trace('Gl', C.glucagon);
    ctx.font = font(fs * 0.9); ctx.fillStyle = C.insulin; ctx.fillText(T('insulin', 'insulin'), x + 4, y + fs);
    ctx.fillStyle = C.glucagon; ctx.fillText(T('glucagon', 'glukagon'), x + fs * 5, y + fs);
    ctx.fillStyle = C.dim; ctx.fillText(T('(relative level)', '(kadar relatif)'), x + fs * 11, y + fs);
  }

  function drawDiagram(ctx, x, y, w, h, fs) {
    const bw = w * 0.82, bx = x + (w - bw) / 2, bh = fs * 3;
    const box = (yy, title, sub, color, alpha) => {
      ctx.fillStyle = color ? `${color},${alpha})` : C.box;
      ctx.beginPath(); ctx.roundRect(bx, yy, bw, bh, 8); ctx.fill();
      ctx.strokeStyle = color ? `${color})` : 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = C.text; ctx.font = font(fs, true); ctx.textAlign = 'center';
      ctx.fillText(title, bx + bw / 2, yy + fs * 1.25);
      ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.fillText(sub, bx + bw / 2, yy + fs * 2.4);
      ctx.textAlign = 'left';
    };
    const ins = clamp(state.flash.ins, 0, 1), glu = clamp(state.flash.glu, 0, 1);
    const status = m.G < LO ? T('LOW', 'RENDAH') : m.G > HI ? T('HIGH', 'TINGGI') : T('in range', 'normal');
    const gcol = m.G < LO ? C.lo : m.G > HI ? C.hi : C.ok;
    const yG = y + h * 0.40;
    // central glucose box
    ctx.fillStyle = C.box; ctx.beginPath(); ctx.roundRect(bx, yG, bw, bh * 1.2, 8); ctx.fill();
    ctx.strokeStyle = gcol; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = gcol; ctx.font = mono(fs * 1.8, true); ctx.textAlign = 'center';
    ctx.fillText(`${m.G.toFixed(1)} mmol/L`, bx + bw / 2, yG + fs * 1.9);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.9); ctx.fillText(T('Blood glucose', 'Glukosa darah') + ` · ${status}`, bx + bw / 2, yG + fs * 3.1);
    ctx.textAlign = 'left';
    // top: insulin branch
    const yP = y + fs * 0.6;
    const insCol = params.type1 ? 'rgb(100,116,139' : 'rgb(56,189,248';
    box(yP, T('Pancreas β cells → insulin', 'Sel β pankreas → insulin'), params.type1 ? T('type 1: no insulin made', 'tipe 1: insulin tidak dibuat') : `${T('insulin level', 'kadar insulin')} ${ins.toFixed(2)}`, insCol, 0.12 + 0.5 * (params.type1 ? 0 : ins));
    if (params.type1) { ctx.strokeStyle = C.lo; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + 8, yP + 6); ctx.lineTo(bx + bh, yP + bh - 6); ctx.moveTo(bx + bh, yP + 6); ctx.lineTo(bx + 8, yP + bh - 6); ctx.stroke(); }
    const yE1 = yP + bh + fs * 2.2;
    box(yE1, T('Cells take up glucose · liver stores glycogen', 'Sel menyerap glukosa · hati menyimpan glikogen'), `${T('uptake', 'penyerapan')} ${flux.U.toFixed(2)} · ${T('storage', 'penyimpanan')} ${flux.Sto.toFixed(2)} mmol/L/min`, 'rgb(56,189,248', 0.08 + 0.4 * ins);
    // arrows: glucose high → β cells (left side up), β → effector, effector → glucose down
    const aIns = 0.15 + 0.85 * ins, wIns = 1.5 + 3 * ins;
    arrow(ctx, bx - 2, yG + 6, bx - fs * 0.9, yP + bh + 4, `rgba(250,204,21,${m.G > HI ? 0.9 : 0.25})`, m.G > HI ? 3 : 1.5);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.8); ctx.save(); ctx.translate(bx - fs * 1.1, (yG + yP + bh) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(T('glucose high?', 'glukosa tinggi?'), 0, 0); ctx.restore(); ctx.textAlign = 'left';
    arrow(ctx, bx + bw / 2, yP + bh, bx + bw / 2, yE1 - 2, `rgba(56,189,248,${aIns})`, wIns);
    arrow(ctx, bx + bw / 2, yE1 + bh, bx + bw / 2, yG - 2, `rgba(56,189,248,${aIns})`, wIns);
    ctx.fillStyle = C.insulin; ctx.font = font(fs * 0.85); ctx.fillText(T('glucose ↓', 'glukosa ↓'), bx + bw / 2 + 8, (yE1 + bh + yG) / 2 + fs * 0.3);
    if (m.Iinj > 0.05) { ctx.fillStyle = '#f472b6'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'right'; ctx.fillText(T(`injected insulin ${m.Iinj.toFixed(2)}`, `insulin suntikan ${m.Iinj.toFixed(2)}`), bx + bw, yE1 - fs * 0.6); ctx.textAlign = 'left'; }
    // bottom: glucagon branch
    const yE2 = yG + bh * 1.2 + fs * 2.2;
    const yA = yE2 + bh + fs * 2.2;
    box(yE2, T('Liver: glycogen → glucose', 'Hati: glikogen → glukosa'), `${T('release', 'pelepasan')} ${flux.Rel.toFixed(2)} · ${T('new glucose', 'glukosa baru')} ${flux.GNG.toFixed(2)} mmol/L/min`, 'rgb(245,158,11', 0.08 + 0.4 * glu);
    box(yA, T('Pancreas α cells → glucagon', 'Sel α pankreas → glukagon'), `${T('glucagon level', 'kadar glukagon')} ${glu.toFixed(2)}`, 'rgb(245,158,11', 0.12 + 0.5 * glu);
    const aG = 0.15 + 0.85 * glu, wG = 1.5 + 3 * glu;
    arrow(ctx, bx - 2, yG + bh * 1.2 - 6, bx - fs * 0.9, yA - 4, `rgba(250,204,21,${m.G < LO ? 0.9 : 0.25})`, m.G < LO ? 3 : 1.5);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.8); ctx.save(); ctx.translate(bx - fs * 1.1, (yG + bh * 1.2 + yA) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(T('glucose low?', 'glukosa rendah?'), 0, 0); ctx.restore(); ctx.textAlign = 'left';
    arrow(ctx, bx + bw / 2, yA, bx + bw / 2, yE2 + bh + 2, `rgba(245,158,11,${aG})`, wG);
    arrow(ctx, bx + bw / 2, yE2, bx + bw / 2, yG + bh * 1.2 + 2, `rgba(245,158,11,${aG})`, wG);
    ctx.fillStyle = C.glucagon; ctx.font = font(fs * 0.85); ctx.fillText(T('glucose ↑', 'glukosa ↑'), bx + bw / 2 + 8, (yE2 + yG + bh * 1.2) / 2 + fs * 0.3);
    // glycogen store bar (right of the liver box)
    const gbX = bx + bw + fs * 0.4, gbH = yA + bh - yP, gbW = Math.max(6, fs * 0.8);
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(gbX, yP, gbW, gbH);
    const fill = m.S / S_MAX; ctx.fillStyle = C.glycogen; ctx.fillRect(gbX, yP + gbH * (1 - fill), gbW, gbH * fill);
    ctx.save(); ctx.translate(gbX + gbW + fs * 0.9, yP + gbH / 2); ctx.rotate(Math.PI / 2); ctx.textAlign = 'center'; ctx.fillStyle = C.glycogen; ctx.font = font(fs * 0.85);
    ctx.fillText(T(`liver glycogen ${m.S.toFixed(0)} g`, `glikogen hati ${m.S.toFixed(0)} g`), 0, 0); ctx.restore(); ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const fs = clamp(W * 0.014, 9, 14);
    const leftW = W * 0.58, pad = fs * 2.2;
    // header
    ctx.fillStyle = C.text; ctx.font = mono(fs * 1.5, true);
    const asleep = state.tMin < state.sleepUntil, ex = state.tMin < state.exUntil;
    ctx.fillText(`${T('Day', 'Hari')} ${state.day}  ${hhmm(state.tMin)}`, pad, fs * 1.8);
    ctx.font = font(fs); ctx.fillStyle = C.dim;
    const flags = [asleep ? T('sleeping', 'tidur') : '', ex ? T('exercising', 'berolahraga') : '', m.stom + m.gut > 1 ? T(`digesting ${(m.stom + m.gut).toFixed(0)} g carbs`, `mencerna ${(m.stom + m.gut).toFixed(0)} g karbohidrat`) : ''].filter(Boolean).join(' · ');
    ctx.fillText(flags || T('fasting', 'puasa'), pad + fs * 11, fs * 1.8);
    if (m.G < 3) { ctx.fillStyle = C.lo; ctx.font = font(fs, true); ctx.fillText(T('Severe hypoglycaemia! Eat something.', 'Hipoglikemia berat! Makan sesuatu.'), pad + fs * 11, fs * 3.2); }
    else if (m.G > 10) { ctx.fillStyle = C.hi; ctx.font = font(fs, true); ctx.fillText(T('Hyperglycaemia: kidneys losing glucose to urine.', 'Hiperglikemia: ginjal membuang glukosa ke urine.'), pad + fs * 11, fs * 3.2); }
    // charts
    const cx = pad * 1.3, cw = leftW - cx - fs;
    drawGlucoseChart(ctx, cx, fs * 5, cw, H * 0.50, fs);
    drawHormoneChart(ctx, cx, fs * 5 + H * 0.50 + fs * 2.6, cw, H * 0.22, fs);
    // diagram
    drawDiagram(ctx, leftW, fs * 1.2, W - leftW - fs * 0.5, H - fs * 2, fs);
  }

  // ---------- controls ----------
  const smallB = button({ label: 'Small meal (30 g carbs)', onClick: () => eat(30, 'Small meal') });
  const largeB = button({ label: 'Large meal (90 g carbs)', primary: true, onClick: () => eat(90, 'Large meal') });
  const exB = button({ label: 'Exercise 30 min', onClick: exercise });
  const sleepB = button({ label: 'Sleep 8 h', onClick: sleep });
  const injB = button({ label: 'Insulin injection', onClick: inject });
  const resetB = button({ label: 'Reset day', onClick: resetDay });
  const t1 = toggle({ label: 'Type 1 diabetes (no insulin produced)', key: 'type1', value: false, onChange: (v) => { params.type1 = v; } });
  const pauseT = toggle({ label: 'Pause', key: 'pause', value: false, onChange: (v) => { params.paused = v; } });
  const speedS = slider({ label: 'Speed (sim minutes per second)', key: 'speed', min: 1, max: 60, step: 1, value: params.speed, onInput: (v) => { params.speed = v; } });
  ctrlPanel.append(row(smallB, largeB), row(exB, sleepB), row(injB, resetB), t1.el, speedS.el, pauseT.el);

  const lab = labPanel({
    title: 'Glucose lab — event, before, peak, time back in range',
    filename: 'blood-glucose-data.csv',
    columns: [
      { key: 'event', label: 'Event' },
      { key: 'type1', label: 'Type 1?' },
      { key: 'gBefore', label: 'Glucose before (mmol/L)', format: (v) => v.toFixed(1) },
      { key: 'extreme', label: 'Peak / trough (mmol/L)', format: (v) => v.toFixed(1) },
      { key: 'tBack', label: 'Back in 4–7 after (min)', format: (v) => (v === 0 ? 'stayed in range' : v.toFixed(0)) },
      { key: 'status', label: 'Status' },
    ],
    procedure: [
      'Healthy body: press Small meal. Wait until glucose is back in the green band (or 6 h pass), then Record.',
      'Press Large meal and record again. Compare the peaks and recovery times.',
      'Press Exercise 30 min on an empty stomach and record. Which hormone rose?',
      'Press Sleep 8 h and watch the glycogen bar. Record.',
      'Switch on Type 1 diabetes, repeat the Large meal and record. Then repeat with an Insulin injection pressed at the same time as the meal.',
      'Type 1: inject insulin with no meal and record the trough.',
    ],
    predict: 'Will a 90 g meal raise glucose three times as much as a 30 g meal? What will happen to glucose after a meal if no insulin can be made?',
    source: () => {
      const e = state.lastEpisode; if (!e) return null;
      return { event: e.event, type1: e.type1, gBefore: e.gBefore, extreme: e.extreme, tBack: e.done ? (e.left ? e.tBack : 0) : null, status: e.done ? (e.left && e.tBack == null ? 'not back within 6 h' : 'complete') : 'in progress' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
