import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Compartment model (per day). P pathogen load (arbitrary units; 30 = symptom threshold), V vaccine antigen,
// Th helper T cells, B naive-derived activated B cells, Bm memory-derived activated B cells,
// Pln/Plm plasma cells, A antibody concentration (arbitrary units), Mi immature memory, M memory B cells.
const ILL = 30;
const H = 0.01;                 // integration step (days)
const C = {
  bg: '#0b1220', text: '#e5e7eb', dim: '#94a3b8', grid: 'rgba(148,163,184,0.18)',
  pathogen: '#ef4444', phag: '#60a5fa', tcell: '#fb923c', bcell: '#22c55e', plasma: '#a78bfa', antibody: '#facc15', memory: '#34d399', vaccine: '#38bdf8', ill: 'rgba(239,68,68,0.18)',
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

  const params = { speed: 2, r: 1.5, paused: false };
  const s = { P: 0, V: 0, Th: 1, B: 0, Bm: 0, Pln: 0, Plm: 0, A: 0, Mi: 0, M: 0 };
  const state = {
    t: 0, acc: 0, hist: [], events: [], exposures: 0, episode: null, lastEpisode: null, phag: 1,
    illDays: 0,
  };
  let now = 0;

  function modelStep() {
    const Ag = s.P + s.V;
    const sigN = Ag / (Ag + 20), sigM = Ag / (Ag + 0.2);
    const Phag = 1 + 2 * s.P / (s.P + 50);
    state.phag = Phag;
    const dP = params.r * s.P * (1 - s.P / 1000) - 0.4 * Phag * s.P - 4 * s.A * s.P;
    const dV = -0.25 * s.V - 0.5 * s.A * s.V;
    const dTh = 2 * sigN * s.Th * (1 - s.Th / 10) - 0.1 * (s.Th - 1);
    const act = sigN * s.Th / (s.Th + 1);
    const dB = 3 * act * (s.B + 0.05) * (1 - s.B / 3) - 0.3 * (1 - sigN) * s.B;
    const cap = 20 * s.M;
    const dBm = 4 * sigM * (s.Bm + s.M) * (1 - s.Bm / Math.max(cap, 1e-6)) - 1.0 * s.Bm;
    const dPln = 1.0 * s.B * act - 0.3 * s.Pln;
    const dPlm = 1.0 * s.Bm - 0.3 * s.Plm;
    const dA = 0.04 * (s.Pln + 3 * s.Plm) - 0.07 * s.A;
    const dMi = 0.3 * s.B * act + 0.1 * s.Bm - 0.1 * s.Mi;
    const dM = 0.1 * s.Mi * (1 - sigN) * (1 - sigM) - 0.001 * s.M;
    s.P = Math.max(0, s.P + dP * H); if (s.P < 1e-3) s.P = 0;
    s.V = Math.max(0, s.V + dV * H); if (s.V < 1e-3) s.V = 0;
    s.Th = clamp(s.Th + dTh * H, 1, 10);
    s.B = Math.max(0, s.B + dB * H); s.Bm = Math.max(0, s.Bm + dBm * H);
    s.Pln = Math.max(0, s.Pln + dPln * H); s.Plm = Math.max(0, s.Plm + dPlm * H);
    s.A = Math.max(0, s.A + dA * H);
    s.Mi = Math.max(0, s.Mi + dMi * H); s.M = clamp(s.M + dM * H, 0, 20);
    state.t += H;
    if (s.P > ILL) state.illDays += H;
    const e = state.episode;
    if (e) {
      const age = state.t - e.t0;
      if (s.A > e.peakA) { e.peakA = s.A; e.tPeak = age; }
      if (s.P > ILL) e.daysIll += H;
      if (e.firstAb == null && s.A > e.A0 * 1.2 + 0.02) e.firstAb = age;
      if ((age > 8 && s.A < 0.8 * e.peakA && s.P < 1) || age > 60) { e.done = true; state.episode = null; }
    }
  }
  function sample() {
    const last = state.hist[state.hist.length - 1];
    if (!last || state.t - last.t >= 0.1) state.hist.push({ t: state.t, A: s.A, P: s.P, M: s.M, ill: s.P > ILL });
    if (state.hist.length > 4000) state.hist.shift();
  }

  function advance(days) {
    let n = Math.round(days / H);
    while (n-- > 0) { modelStep(); if (n % 10 === 0) sample(); }
  }
  function step(dt) {
    if (params.paused) return;
    state.acc += dt * params.speed;
    const whole = Math.floor(state.acc / H) * H;
    if (whole > 0) { advance(Math.min(whole, 2)); state.acc -= whole; }
  }

  function startEpisode(type) {
    if (state.episode) { state.episode.done = true; }
    state.exposures += 1;
    state.episode = { n: state.exposures, type, t0: state.t, peakA: s.A, tPeak: 0, daysIll: 0, firstAb: null, done: false, A0: s.A, M0: s.M };
    state.lastEpisode = state.episode;
    state.events.push({ t: state.t, type, n: state.exposures });
  }
  function expose() { s.P += 1; startEpisode('infection'); }
  function vaccinate() { s.V += 60; startEpisode('vaccine'); }
  function reset() {
    Object.assign(s, { P: 0, V: 0, Th: 1, B: 0, Bm: 0, Pln: 0, Plm: 0, A: 0, Mi: 0, M: 0 });
    Object.assign(state, { t: 0, acc: 0, hist: [], events: [], exposures: 0, episode: null, lastEpisode: null, illDays: 0 });
    seedParticles();
  }

  // ---------- particle scene ----------
  const pool = {};
  const rnd = (a, b) => a + Math.random() * (b - a);
  function seedParticles() {
    for (const k of ['pathogen', 'phag', 'tcell', 'bcell', 'plasma', 'antibody', 'memory']) {
      pool[k] = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), vx: rnd(-0.02, 0.02), vy: rnd(-0.02, 0.02), ph: Math.random() * 6.28 }));
    }
  }
  seedParticles();
  function moveParticles(dt) {
    for (const k in pool) for (const p of pool[k]) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 0.02 || p.x > 0.98) p.vx *= -1; if (p.y < 0.02 || p.y > 0.98) p.vy *= -1;
      p.x = clamp(p.x, 0.02, 0.98); p.y = clamp(p.y, 0.02, 0.98);
    }
  }

  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  function drawY(ctx, x, y, r, color) {
    ctx.strokeStyle = color; ctx.lineWidth = Math.max(1.2, r * 0.35); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y + r); ctx.lineTo(x, y); ctx.lineTo(x - r * 0.8, y - r); ctx.moveTo(x, y); ctx.lineTo(x + r * 0.8, y - r); ctx.stroke();
  }
  function drawScene(ctx, x, y, w, h, fs) {
    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.stroke();
    const u = Math.min(w, h);
    const draw = (k, n, fn) => { n = clamp(Math.round(n), 0, 80); for (let i = 0; i < n; i++) { const p = pool[k][i]; fn(x + p.x * w, y + p.y * h, p); } };
    // antibodies
    draw('antibody', s.A * 4, (px, py) => drawY(ctx, px, py, u * 0.012, C.antibody));
    // pathogens
    draw('pathogen', s.P / 2 + (s.P > 0 ? 1 : 0), (px, py, p) => {
      const r = u * 0.012 + (s.A > 0.3 ? 0 : 0);
      ctx.fillStyle = C.pathogen; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.pathogen; ctx.lineWidth = 1.2;
      for (let a = 0; a < 6; a++) { const an = a * 1.047 + p.ph; ctx.beginPath(); ctx.moveTo(px + Math.cos(an) * r, py + Math.sin(an) * r); ctx.lineTo(px + Math.cos(an) * r * 1.7, py + Math.sin(an) * r * 1.7); ctx.stroke(); }
      if (s.A > 0.2 && Math.sin(now * 3 + p.ph) > 0.6) drawY(ctx, px + r * 1.6, py - r * 1.6, u * 0.011, C.antibody);
    });
    // vaccine antigen
    draw('pathogen', s.V / 3, (px, py) => { ctx.fillStyle = C.vaccine; ctx.beginPath(); ctx.arc(px + u * 0.01, py + u * 0.01, u * 0.008, 0, Math.PI * 2); ctx.fill(); });
    // phagocytes
    draw('phag', 2 + (state.phag - 1) * 4, (px, py, p) => {
      const r = u * 0.03 + Math.sin(now * 2 + p.ph) * u * 0.003;
      ctx.fillStyle = 'rgba(96,165,250,0.5)'; ctx.beginPath(); ctx.ellipse(px, py, r * 1.2, r, p.ph, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1e3a8a'; ctx.beginPath(); ctx.arc(px + r * 0.2, py, r * 0.45, 0, Math.PI * 2); ctx.fill();
    });
    // T helper cells
    draw('tcell', (s.Th - 1) * 1.2 + 1, (px, py) => { ctx.fillStyle = C.tcell; ctx.beginPath(); ctx.arc(px, py, u * 0.016, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#0b1220'; ctx.font = font(u * 0.02, true); ctx.textAlign = 'center'; ctx.fillText('T', px, py + u * 0.007); });
    // B cells (naive-derived and memory-derived)
    draw('bcell', s.B * 4 + s.Bm / 2, (px, py) => { ctx.fillStyle = C.bcell; ctx.beginPath(); ctx.arc(px, py, u * 0.016, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#0b1220'; ctx.font = font(u * 0.02, true); ctx.textAlign = 'center'; ctx.fillText('B', px, py + u * 0.007); });
    // plasma cells with antibodies streaming out
    draw('plasma', (s.Pln + s.Plm) * 1.2, (px, py, p) => {
      ctx.fillStyle = C.plasma; ctx.beginPath(); ctx.ellipse(px, py, u * 0.022, u * 0.016, 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#312e81'; ctx.beginPath(); ctx.arc(px - u * 0.006, py, u * 0.007, 0, Math.PI * 2); ctx.fill();
      const k = (now * 1.5 + p.ph) % 1; drawY(ctx, px + u * 0.03 + k * u * 0.04, py - k * u * 0.02, u * 0.01, C.antibody);
    });
    // memory cells
    draw('memory', s.M * 2, (px, py) => { ctx.fillStyle = C.memory; ctx.beginPath(); ctx.arc(px, py, u * 0.015, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillStyle = '#0b1220'; ctx.font = font(u * 0.018, true); ctx.textAlign = 'center'; ctx.fillText('M', px, py + u * 0.006); });
    ctx.textAlign = 'left';
    // legend
    const items = [[C.pathogen, T('pathogen', 'patogen'), s.P.toFixed(0)], [C.phag, T('phagocytes (innate)', 'fagosit (bawaan)'), `×${state.phag.toFixed(1)}`], [C.tcell, T('helper T cells', 'sel T penolong'), s.Th.toFixed(1)], [C.bcell, T('activated B cells', 'sel B aktif'), (s.B + s.Bm).toFixed(1)], [C.plasma, T('plasma cells', 'sel plasma'), (s.Pln + s.Plm).toFixed(1)], [C.antibody, T('antibodies', 'antibodi'), s.A.toFixed(2)], [C.memory, T('memory cells', 'sel memori'), s.M.toFixed(1)]];
    ctx.font = font(fs * 0.9);
    items.forEach(([col, lab, val], i) => {
      const yy = y + h + fs * 1.4 + i * fs * 1.35;
      ctx.fillStyle = col; ctx.fillRect(x, yy - fs * 0.7, fs * 0.8, fs * 0.8);
      ctx.fillStyle = C.dim; ctx.fillText(lab, x + fs * 1.2, yy);
      ctx.fillStyle = C.text; ctx.font = mono(fs * 0.9); ctx.textAlign = 'right'; ctx.fillText(val, x + w, yy); ctx.textAlign = 'left'; ctx.font = font(fs * 0.9);
    });
  }

  function drawChart(ctx, x, y, w, h, fs) {
    const win = Math.max(120, Math.ceil(state.t / 60) * 60);
    const t0 = 0;
    const X = (t) => x + ((t - t0) / win) * w;
    let aMax = 1.5; for (const p of state.hist) if (p.A > aMax) aMax = p.A;
    aMax = Math.ceil(aMax * 1.1 / 0.5) * 0.5;
    const YA = (a) => y + h - clamp(a / aMax, 0, 1) * h;
    const YP = (p) => y + h - clamp(Math.log10(Math.max(1, p)) / 3, 0, 1) * h;
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fillRect(x, y, w, h);
    // illness shading
    ctx.fillStyle = C.ill;
    let illStart = null;
    for (let i = 0; i < state.hist.length; i++) {
      const p = state.hist[i];
      if (p.ill && illStart == null) illStart = p.t;
      if ((!p.ill || i === state.hist.length - 1) && illStart != null) { ctx.fillRect(X(illStart), y, Math.max(1, X(p.t) - X(illStart)), h); illStart = null; }
    }
    // grid
    ctx.strokeStyle = C.grid; ctx.fillStyle = C.dim; ctx.font = font(fs * 0.85); ctx.textAlign = 'center';
    for (let d = 0; d <= win; d += win / 6) { ctx.beginPath(); ctx.moveTo(X(d), y); ctx.lineTo(X(d), y + h); ctx.stroke(); ctx.fillText(`${Math.round(d)}`, X(d), y + h + fs * 1.1); }
    ctx.fillText(T('time (days)', 'waktu (hari)'), x + w / 2, y + h + fs * 2.3);
    ctx.textAlign = 'right';
    for (let k = 0; k <= 4; k++) { const a = aMax * k / 4; ctx.beginPath(); ctx.moveTo(x, YA(a)); ctx.lineTo(x + w, YA(a)); ctx.stroke(); ctx.fillStyle = C.antibody; ctx.fillText(a.toFixed(1), x - 4, YA(a) + fs * 0.35); }
    ctx.textAlign = 'left'; ctx.fillStyle = C.pathogen;
    for (let k = 0; k <= 3; k++) ctx.fillText(k === 0 ? '1' : `10${'⁰¹²³'[k]}`, x + w + 4, YP(10 ** k) + fs * 0.35);
    ctx.fillStyle = C.antibody; ctx.font = font(fs); ctx.fillText(T('antibody concentration (arbitrary units)', 'konsentrasi antibodi (satuan sembarang)'), x, y - fs * 0.5);
    ctx.fillStyle = C.pathogen; ctx.textAlign = 'right'; ctx.fillText(T('pathogen load (log)', 'beban patogen (log)'), x + w, y - fs * 0.5); ctx.textAlign = 'left';
    // illness threshold line
    ctx.strokeStyle = 'rgba(239,68,68,0.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x, YP(ILL)); ctx.lineTo(x + w, YP(ILL)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(239,68,68,0.8)'; ctx.font = font(fs * 0.8); ctx.fillText(T('symptom threshold', 'ambang gejala'), x + 4, YP(ILL) - 3);
    // traces
    if (state.hist.length > 1) {
      ctx.strokeStyle = C.pathogen; ctx.lineWidth = 1.6; ctx.beginPath();
      state.hist.forEach((p, i) => (i ? ctx.lineTo(X(p.t), YP(p.P)) : ctx.moveTo(X(p.t), YP(p.P)))); ctx.stroke();
      ctx.strokeStyle = C.antibody; ctx.lineWidth = 2.2; ctx.beginPath();
      state.hist.forEach((p, i) => (i ? ctx.lineTo(X(p.t), YA(p.A)) : ctx.moveTo(X(p.t), YA(p.A)))); ctx.stroke();
    }
    // event markers
    ctx.font = font(fs * 0.85); ctx.textAlign = 'center';
    for (const e of state.events) {
      const xx = X(e.t); const col = e.type === 'vaccine' ? C.vaccine : C.pathogen;
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(xx, y + h); ctx.lineTo(xx - 5, y + h + 9); ctx.lineTo(xx + 5, y + h + 9); ctx.closePath(); ctx.fill();
      ctx.fillText(`#${e.n} ${e.type === 'vaccine' ? T('vaccine', 'vaksin') : T('infection', 'infeksi')}`, xx, y - fs * 1.7 + (e.n % 2) * fs);
    }
    // current time
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.moveTo(X(state.t), y); ctx.lineTo(X(state.t), y + h); ctx.stroke();
    ctx.textAlign = 'left';
  }

  function drawReadout(ctx, x, y, w, fs) {
    ctx.fillStyle = C.text; ctx.font = mono(fs * 1.5, true);
    ctx.fillText(`${T('Day', 'Hari')} ${state.t.toFixed(1)}`, x, y);
    const ill = s.P > ILL;
    ctx.fillStyle = ill ? C.pathogen : s.P > 0 ? '#f59e0b' : '#22c55e'; ctx.font = font(fs, true);
    ctx.fillText(ill ? T('ILL (fever, symptoms)', 'SAKIT (demam, gejala)') : s.P > 0 ? T('infected, no symptoms yet', 'terinfeksi, belum bergejala') : T('healthy', 'sehat'), x + fs * 9, y);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.9);
    ctx.fillText(T(`total days ill: ${state.illDays.toFixed(1)} · exposures: ${state.exposures}`, `total hari sakit: ${state.illDays.toFixed(1)} · paparan: ${state.exposures}`), x + fs * 9, y + fs * 1.3);
    const e = state.lastEpisode;
    if (e) {
      ctx.fillStyle = C.text; ctx.font = font(fs * 0.9);
      const txt = T(`Exposure #${e.n} (${e.type}): antibody peak ${e.peakA.toFixed(2)} at day ${e.tPeak.toFixed(1)}, ill ${e.daysIll.toFixed(1)} d${e.done ? '' : ' (in progress)'}`, `Paparan #${e.n} (${e.type === 'vaccine' ? 'vaksin' : 'infeksi'}): puncak antibodi ${e.peakA.toFixed(2)} pada hari ${e.tPeak.toFixed(1)}, sakit ${e.daysIll.toFixed(1)} h${e.done ? '' : ' (berjalan)'}`);
      ctx.fillText(txt, x, y + fs * 2.8);
    }
  }

  function draw(dt) {
    const ctx = cv.ctx, W = cv.width, Hh = cv.height;
    if (W < 10 || Hh < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, Hh);
    const fs = clamp(W * 0.014, 9, 14);
    moveParticles(dt);
    drawReadout(ctx, fs * 1.5, fs * 1.8, W, fs);
    const sceneW = W * 0.36, sceneH = Hh * 0.50;
    drawScene(ctx, fs * 1.5, fs * 4.6, sceneW, sceneH, fs);
    const cx = fs * 1.5 + sceneW + fs * 4.5;
    drawChart(ctx, cx, fs * 6.5, W - cx - fs * 3.5, Hh - fs * 10.5, fs);
  }

  // ---------- controls ----------
  const expB = button({ label: 'Expose to pathogen', primary: true, onClick: expose });
  const vacB = button({ label: 'Vaccinate', onClick: vaccinate });
  const skipB = button({ label: 'Skip 30 days', onClick: () => { advance(30); } });
  const resetB = button({ label: 'Reset (new person)', onClick: reset });
  const speedS = slider({ label: 'Speed (days per second)', key: 'speed', min: 0.5, max: 10, step: 0.5, value: params.speed, format: (v) => v.toFixed(1), onInput: (v) => { params.speed = v; } });
  const rS = slider({ label: 'Pathogen growth rate (per day)', key: 'growth', min: 0.8, max: 2.5, step: 0.1, value: params.r, format: (v) => v.toFixed(1), onInput: (v) => { params.r = v; } });
  const pauseT = toggle({ label: 'Pause', key: 'pause', value: false, onChange: (v) => { params.paused = v; } });
  ctrlPanel.append(row(expB, vacB), row(skipB, resetB), speedS.el, rS.el, pauseT.el);

  const lab = labPanel({
    title: 'Immune response lab — primary vs secondary',
    filename: 'immune-response-data.csv',
    columns: [
      { key: 'n', label: 'Exposure #' },
      { key: 'type', label: 'Type' },
      { key: 'day', label: 'Day of exposure', format: (v) => v.toFixed(1) },
      { key: 'lag', label: 'Days to first antibodies', format: (v) => v.toFixed(1) },
      { key: 'tPeak', label: 'Days to peak', format: (v) => v.toFixed(1) },
      { key: 'peakA', label: 'Peak antibody', format: (v) => v.toFixed(2) },
      { key: 'daysIll', label: 'Days ill', format: (v) => v.toFixed(1) },
      { key: 'status', label: 'Status' },
    ],
    procedure: [
      'Reset. Press Expose to pathogen. Watch until the antibody curve has clearly peaked and started to fall, then Record.',
      'Press Skip 30 days, then Expose again. Wait for the peak and Record. Compare days-to-peak, peak level and days ill.',
      'Reset. Press Vaccinate, wait (or skip 30 days), Record. Then Expose to pathogen and Record.',
      'Reset, set growth rate 2.5/day, expose and record. How do days ill change?',
    ],
    predict: 'Will the second exposure produce more or fewer antibodies than the first, and sooner or later? Will a vaccinated body get ill when it meets the real pathogen?',
    source: () => {
      const e = state.lastEpisode; if (!e) return null;
      return { n: e.n, type: e.type, day: e.t0, lag: e.firstAb, tPeak: e.tPeak, peakA: e.peakA, daysIll: e.daysIll, status: e.done ? 'complete' : 'in progress' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(dt); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
