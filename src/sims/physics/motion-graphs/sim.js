import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SANS = 'system-ui, -apple-system, Roboto, sans-serif';
const TMAX = 20;       // s, length of one run
const VMIN = -10, VMAX = 20;
const SAMPLE = 0.1;    // s between graph samples

// Velocity presets: v(t) in m/s.
const PRESETS = {
  manual: null,
  constant: () => 8,
  speeding: (t) => Math.min(VMAX, 1.0 * t),
  slowing: (t) => Math.max(0, 16 - 0.8 * t),
  stopgo: (t) => (Math.floor(t / 5) % 2 === 0 ? 10 : 0),
};
// "Match the graph" targets: x(t) in metres.
const TARGETS = {
  t1: { x: (t) => 6 * t, en: 'Target 1: steady 6 m/s', id: 'Target 1: tetap 6 m/s' },
  t2: { x: (t) => (t < 6 ? 0 : 12 * (t - 6)), en: 'Target 2: wait 6 s, then 12 m/s', id: 'Target 2: diam 6 s, lalu 12 m/s' },
  t3: { x: (t) => 0.4 * t * t, en: 'Target 3: faster and faster', id: 'Target 3: makin cepat' },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { v: 8, preset: 'manual', target: 'none' };
  const st = { running: false, t: 0, x: 0, v: 8, hist: [], nextSample: 0, marks: [], errSum: 0, errN: 0, sampleAcc: 0 };
  const fmt = (v, dp) => (getLocale() === 'id' ? v.toFixed(dp).replace('.', ',') : v.toFixed(dp));

  function reset() {
    st.running = false; st.t = 0; st.x = 0; st.marks = []; st.errSum = 0; st.errN = 0; st.sampleAcc = 0;
    st.v = p.preset === 'manual' ? p.v : PRESETS[p.preset](0);
    st.hist = [{ t: 0, x: 0, v: st.v }];
    startBtn.label = T('Start', 'Mulai');
  }

  function step(dt) {
    if (!st.running) return;
    let rem = dt;
    while (rem > 1e-9) {
      const h = Math.max(1e-6, Math.min(rem, 1 / 120, TMAX - st.t));
      st.v = p.preset === 'manual' ? p.v : PRESETS[p.preset](st.t);
      st.x += st.v * h;
      st.t += h; rem -= h; st.sampleAcc += h;
      if (st.sampleAcc >= SAMPLE - 1e-9) {
        st.sampleAcc = 0;
        st.hist.push({ t: st.t, x: st.x, v: st.v });
        if (p.target !== 'none') { st.errSum += Math.abs(st.x - TARGETS[p.target].x(st.t)); st.errN++; }
      }
      if (st.t >= TMAX - 1e-9) { st.running = false; startBtn.label = T('Start', 'Mulai'); break; }
    }
  }

  const score = () => (st.errN ? Math.max(0, 100 * (1 - (st.errSum / st.errN) / 20)) : null);

  // ---- drawing ----
  function axes(ctx, g, xlab, ylab, ymin, ymax, fs, yfmt) {
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(g.x - fs * 3, g.y - fs * 1.6, g.w + fs * 4, g.h + fs * 3.6, 8); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    const nY = 4;
    for (let i = 0; i <= nY; i++) {
      const yv = ymin + (ymax - ymin) * i / nY, yy = g.y + g.h - (i / nY) * g.h;
      ctx.beginPath(); ctx.moveTo(g.x, yy); ctx.lineTo(g.x + g.w, yy); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px ${MONO}`; ctx.textAlign = 'right'; ctx.fillText(yfmt(yv), g.x - 4, yy + 4);
    }
    for (let s = 0; s <= TMAX; s += 5) {
      const xx = g.x + (s / TMAX) * g.w; ctx.beginPath(); ctx.moveTo(xx, g.y); ctx.lineTo(xx, g.y + g.h); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.fillText(String(s), xx, g.y + g.h + fs);
    }
    // zero line
    if (ymin < 0 && ymax > 0) {
      const y0 = g.y + g.h - ((0 - ymin) / (ymax - ymin)) * g.h;
      ctx.strokeStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(g.x, y0); ctx.lineTo(g.x + g.w, y0); ctx.stroke();
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(ylab, g.x, g.y - fs * 0.5);
    ctx.textAlign = 'right'; ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.9}px ${SANS}`; ctx.fillText(xlab, g.x + g.w, g.y + g.h + fs * 2.2);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = Math.max(10, W * 0.016);

    // x range for the road and the x–t graph
    let xmax = 200, xmin = 0;
    for (const q of st.hist) { if (q.x > xmax) xmax = q.x; if (q.x < xmin) xmin = q.x; }
    if (p.target !== 'none') xmax = Math.max(xmax, TARGETS[p.target].x(TMAX));
    xmax = Math.ceil(xmax / 50) * 50; xmin = Math.floor(xmin / 50) * 50;

    // ---- road ----
    const rx0 = W * 0.06, rx1 = W * 0.7, ry = H * 0.2, rh = H * 0.07;
    const X = (x) => rx0 + ((x - xmin) / (xmax - xmin)) * (rx1 - rx0);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(rx0 - 10, ry, rx1 - rx0 + 20, rh);
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([10, 10]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(rx0 - 10, ry + rh / 2); ctx.lineTo(rx1 + 10, ry + rh / 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px ${MONO}`; ctx.textAlign = 'center';
    const stepM = (xmax - xmin) > 300 ? 100 : 50;
    for (let m = xmin; m <= xmax; m += stepM) { ctx.fillRect(X(m) - 0.5, ry + rh, 1, 6); ctx.fillText(`${m} m`, X(m), ry + rh + fs * 1.3); }
    // car
    const cx = X(st.x), cw = Math.max(26, W * 0.05), ch = rh * 0.7, cy = ry + rh / 2 - ch / 2;
    const flip = st.v < 0 ? -1 : 1;
    ctx.save(); ctx.translate(cx, cy + ch / 2); ctx.scale(flip, 1);
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 5); ctx.fill();
    ctx.fillStyle = '#93c5fd'; ctx.fillRect(cw * 0.05, -ch / 2 + 2, cw * 0.3, ch * 0.4);
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.arc(-cw * 0.3, ch / 2, ch * 0.25, 0, Math.PI * 2); ctx.arc(cw * 0.3, ch / 2, ch * 0.25, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // readout line
    ctx.fillStyle = '#e2e8f0'; ctx.font = `${fs}px ${MONO}`; ctx.textAlign = 'left';
    ctx.fillText(`t = ${fmt(st.t, 1)} s    x = ${fmt(st.x, 1)} m    v = ${fmt(st.v, 1)} m/s`, rx0, H * 0.08);
    if (p.target !== 'none') {
      const sc = score();
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'right';
      ctx.fillText(`${T(TARGETS[p.target].en, TARGETS[p.target].id)}  ${sc == null ? '' : `${T('match', 'kecocokan')} ${fmt(sc, 0)}%`}`, rx1, H * 0.08);
    }

    // ---- speedometer ----
    const sx = W * 0.86, sy = H * 0.24, sr = Math.min(W * 0.1, H * 0.16);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = sr * 0.18;
    ctx.beginPath(); ctx.arc(sx, sy, sr, Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.strokeStyle = st.v < 0 ? '#f87171' : '#38bdf8';
    const frac = Math.min(1, Math.abs(st.v) / VMAX);
    ctx.beginPath(); ctx.arc(sx, sy, sr, Math.PI, Math.PI + frac * Math.PI); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs * 1.2}px ${MONO}`; ctx.textAlign = 'center';
    ctx.fillText(`${fmt(Math.abs(st.v), 1)} m/s`, sx, sy - 4);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.8}px ${SANS}`;
    ctx.fillText(st.v < 0 ? T('backwards', 'mundur') : T('speedometer', 'spidometer'), sx, sy + fs * 1.2);

    // ---- graphs ----
    const gy = H * 0.42, gh = H * 0.46;
    const g1 = { x: W * 0.09, y: gy, w: W * 0.36, h: gh };
    const g2 = { x: W * 0.59, y: gy, w: W * 0.36, h: gh };
    axes(ctx, g1, 't (s)', T('position x (m)', 'posisi x (m)'), xmin, xmax, fs, (v) => fmt(v, 0));
    axes(ctx, g2, 't (s)', T('velocity v (m/s)', 'kecepatan v (m/s)'), VMIN, VMAX, fs, (v) => fmt(v, 0));
    const X1 = (t) => g1.x + (t / TMAX) * g1.w, Y1 = (x) => g1.y + g1.h - ((x - xmin) / (xmax - xmin)) * g1.h;
    const X2 = (t) => g2.x + (t / TMAX) * g2.w, Y2 = (v) => g2.y + g2.h - ((v - VMIN) / (VMAX - VMIN)) * g2.h;
    // target on x–t
    if (p.target !== 'none') {
      ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([6, 4]); ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 80; i++) { const t = TMAX * i / 80; const xx = X1(t), yy = Y1(TARGETS[p.target].x(t)); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
      ctx.stroke(); ctx.setLineDash([]);
    }
    // area under v–t = displacement
    const y0v = Y2(0);
    for (let i = 1; i < st.hist.length; i++) {
      const a = st.hist[i - 1], b = st.hist[i];
      ctx.fillStyle = a.v >= 0 ? 'rgba(56,189,248,0.3)' : 'rgba(248,113,113,0.35)';
      ctx.fillRect(X2(a.t), Math.min(y0v, Y2(a.v)), Math.max(1, X2(b.t) - X2(a.t)), Math.abs(Y2(a.v) - y0v));
    }
    // v–t line (step-wise: v held over each sample)
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5; ctx.beginPath();
    st.hist.forEach((q, i) => { const xx = X2(q.t), yy = Y2(q.v); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); });
    ctx.stroke();
    // x–t line
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2.5; ctx.beginPath();
    st.hist.forEach((q, i) => { const xx = X1(q.t), yy = Y1(q.x); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); });
    ctx.stroke();
    // current points
    ctx.fillStyle = '#34d399'; ctx.beginPath(); ctx.arc(X1(st.t), Y1(st.x), 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(X2(st.t), Y2(st.v), 4, 0, Math.PI * 2); ctx.fill();
    // marks and the segment slope
    ctx.font = `${fs * 0.85}px ${MONO}`;
    st.marks.forEach((m, i) => {
      ctx.fillStyle = '#f472b6'; ctx.beginPath(); ctx.arc(X1(m.t), Y1(m.x), 5, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'left'; ctx.fillText(i === 0 ? 'A' : 'B', X1(m.t) + 7, Y1(m.x) - 6);
      ctx.strokeStyle = 'rgba(244,114,182,0.6)'; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X2(m.t), g2.y); ctx.lineTo(X2(m.t), g2.y + g2.h); ctx.stroke(); ctx.setLineDash([]);
    });
    if (st.marks.length === 2) {
      const [A, B] = st.marks, dt = B.t - A.t, dx = B.x - A.x;
      ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(X1(A.t), Y1(A.x)); ctx.lineTo(X1(B.t), Y1(A.x)); ctx.lineTo(X1(B.t), Y1(B.x)); ctx.stroke();
      ctx.fillStyle = '#f472b6'; ctx.textAlign = 'left';
      const slope = Math.abs(dt) > 1e-6 ? dx / dt : 0;
      ctx.fillText(`${T('slope', 'kemiringan')} = Δx/Δt = ${fmt(dx, 1)}/${fmt(dt, 1)} = ${fmt(slope, 1)} m/s`, g1.x + 4, g1.y + g1.h - 6);
    }
    // area readout
    ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'left'; ctx.font = `${fs * 0.85}px ${MONO}`;
    ctx.fillText(`${T('shaded area', 'luas arsiran')} = Σ v·Δt = ${fmt(st.x, 1)} m = Δx`, g2.x + 4, g2.y + g2.h - 6);
    ctx.textAlign = 'left';
  }

  // ---- controls ----
  const vS = slider({ label: T('Velocity v (m/s)', 'Kecepatan v (m/s)'), key: 'v', min: VMIN, max: VMAX, step: 0.5, value: p.v, format: (v) => v.toFixed(1), onInput: (v) => {
    p.v = v;
    if (p.preset !== 'manual') { p.preset = 'manual'; presetSel.value = 'manual'; }
    if (!st.running) st.v = v;
  } });
  const presetSel = select({
    label: T('Drive', 'Cara mengemudi'), key: 'preset',
    options: [
      { value: 'manual', label: T('Manual (use the slider)', 'Manual (pakai slider)') },
      { value: 'constant', label: T('Constant speed 8 m/s', 'Kelajuan tetap 8 m/s') },
      { value: 'speeding', label: T('Speeding up (a = 1 m/s²)', 'Makin cepat (a = 1 m/s²)') },
      { value: 'slowing', label: T('Slowing down from 16 m/s', 'Melambat dari 16 m/s') },
      { value: 'stopgo', label: T('Stop and go', 'Jalan–berhenti') },
    ],
    value: 'manual',
    onChange: (v) => { p.preset = v; reset(); },
  });
  const targetSel = select({
    label: T('Match the graph', 'Cocokkan grafik'), key: 'target',
    options: [
      { value: 'none', label: T('No challenge', 'Tanpa tantangan') },
      { value: 't1', label: T(TARGETS.t1.en, TARGETS.t1.id) },
      { value: 't2', label: T(TARGETS.t2.en, TARGETS.t2.id) },
      { value: 't3', label: T(TARGETS.t3.en, TARGETS.t3.id) },
    ],
    value: 'none',
    onChange: (v) => { p.target = v; if (v !== 'none') { p.preset = 'manual'; presetSel.value = 'manual'; } reset(); },
  });
  const startBtn = button({ label: T('Start', 'Mulai'), primary: true, onClick: () => {
    if (st.t >= TMAX - 1e-6) reset();
    st.running = !st.running;
    startBtn.label = st.running ? T('Pause', 'Jeda') : T('Start', 'Mulai');
  } });
  const resetBtn = button({ label: 'Reset', onClick: reset });
  const markBtn = button({ label: T('Mark point (A, B)', 'Tandai titik (A, B)'), onClick: () => {
    if (st.marks.length >= 2) st.marks = [];
    st.marks.push({ t: st.t, x: st.x, v: st.v });
  } });
  ctrlPanel.append(vS.el, presetSel.el, targetSel.el, row(startBtn, resetBtn, markBtn));

  const lab = labPanel({
    title: 'Lab — slope of x–t = velocity',
    filename: 'motion-graphs-data.csv',
    columns: [
      { key: 'segment', label: 'Segment (s)' },
      { key: 'dx', label: 'Δx (m)', format: (v) => v.toFixed(1) },
      { key: 'dt', label: 'Δt (s)', format: (v) => v.toFixed(1) },
      { key: 'slope', label: 'Δx/Δt (m/s)', format: (v) => v.toFixed(2) },
      { key: 'vEnd', label: 'speedometer at B (m/s)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Choose "Constant speed 8 m/s" and Start. Press Mark point at about 2 s and again at about 10 s. Record.',
      'Compare Δx/Δt with the speedometer. Then check: is the shaded area under v–t equal to x?',
      'Choose "Speeding up". Mark a segment near the start and record; then a segment near the end. Which slope is bigger?',
      'Choose "Stop and go". Mark A and B inside a flat part of x–t. What is the slope?',
      'Pick a Match-the-graph target and drive with the slider. Try to score above 80%.',
    ],
    predict: 'For a car speeding up, how will the x–t graph look: straight, curving upward, or curving downward?',
    source: () => {
      if (st.marks.length < 2) return null;
      const [A, B] = st.marks;
      const dt = B.t - A.t, dx = B.x - A.x;
      if (Math.abs(dt) < 1e-6) return null;
      return { segment: `${A.t.toFixed(1)}–${B.t.toFixed(1)}`, dx, dt, slope: dx / dt, vEnd: B.v };
    },
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
