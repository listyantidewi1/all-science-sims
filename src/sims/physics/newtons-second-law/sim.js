import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SANS = 'system-ui, -apple-system, Roboto, sans-serif';
const TRACK = 12;      // m
const G = 9.8;         // m/s²
const MU = 0.20;       // friction coefficient when friction is on
const TICK = 0.1;      // s between ticker-tape dots
const TMAX = 8;        // s shown on the v–t graph

export function mount(rootEl) {
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { F: 10, m: 2, friction: false };
  const st = { running: false, t: 0, x: 0, v: 0, dots: [], samples: [], nextDot: 0, nextSample: 0, done: false, wheel: 0 };
  const fmt = (v, dp) => (getLocale() === 'id' ? v.toFixed(dp).replace('.', ',') : v.toFixed(dp));

  function forces() {
    const fMax = p.friction ? MU * p.m * G : 0;
    // static friction holds the cart if the push is too small and it is not already moving
    let f = 0;
    if (p.friction) f = (st.v > 1e-6 || p.F > fMax) ? fMax : p.F;
    const Fnet = Math.max(0, p.F - f);
    return { f, Fnet, a: Fnet / p.m };
  }

  function reset() {
    st.running = false; st.t = 0; st.x = 0; st.v = 0; st.dots = [0]; st.samples = [{ t: 0, v: 0 }];
    st.nextDot = TICK; st.nextSample = TICK; st.done = false;
    startBtn.label = T('Start', 'Mulai');
  }

  function step(dt) {
    if (!st.running || st.done) return;
    // fixed substeps so the ticker dots land exactly on 0.1 s
    let rem = dt;
    while (rem > 1e-9) {
      const h = Math.max(1e-6, Math.min(rem, st.nextDot - st.t, 1 / 240));
      const { a } = forces();
      st.v += a * h; st.x += st.v * h; st.t += h;
      st.wheel += st.v * h;
      rem -= h;
      if (st.t >= st.nextDot - 1e-9) {
        st.dots.push(st.x); st.samples.push({ t: st.t, v: st.v });
        st.nextDot += TICK;
      }
      if (st.x >= TRACK) { st.x = TRACK; st.done = true; st.running = false; startBtn.label = T('Start', 'Mulai'); break; }
    }
  }

  // least-squares slope of v against t over the recorded samples
  function measuredA() {
    const s = st.samples;
    if (s.length < 4) return null;
    let st_ = 0, sv = 0, stt = 0, stv = 0;
    for (const q of s) { st_ += q.t; sv += q.v; stt += q.t * q.t; stv += q.t * q.v; }
    const n = s.length, den = n * stt - st_ * st_;
    if (Math.abs(den) < 1e-12) return null;
    return (n * stv - st_ * sv) / den;
  }

  function arrow(ctx, x1, y1, x2, y2, color, width) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, hd = Math.min(12, len * 0.5);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hd, y2 - uy * hd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * hd - uy * hd * 0.6, y2 - uy * hd + ux * hd * 0.6);
    ctx.lineTo(x2 - ux * hd + uy * hd * 0.6, y2 - uy * hd - ux * hd * 0.6); ctx.closePath(); ctx.fill();
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const { f, Fnet, a } = forces();
    const x0 = W * 0.06, x1 = W * 0.94, pxm = (x1 - x0) / TRACK;
    const fs = Math.max(10, W * 0.017);

    // ---- track scene ----
    const groundY = H * 0.36;
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, groundY, W, H * 0.035);
    ctx.fillStyle = '#64748b'; ctx.font = `${fs}px ${SANS}`; ctx.textAlign = 'center';
    for (let m = 0; m <= TRACK; m += 2) { ctx.fillRect(x0 + m * pxm - 0.5, groundY, 1, H * 0.035); ctx.fillText(`${m} m`, x0 + m * pxm, groundY + H * 0.07); }
    if (p.friction) {
      ctx.fillStyle = '#7c2d12';
      for (let xx = x0; xx < x1; xx += 9) ctx.fillRect(xx, groundY, 4, 3);
    }
    // cart: size grows a little with mass
    const cw = W * (0.06 + 0.012 * p.m), ch = H * (0.07 + 0.012 * p.m);
    const cx = x0 + st.x * pxm, cy = groundY - ch - H * 0.02;
    ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.roundRect(cx - cw / 2, cy, cw, ch, 6); ctx.fill();
    ctx.fillStyle = '#1e3a8a';
    const wr = H * 0.018;
    for (const wx of [cx - cw * 0.3, cx + cw * 0.3]) {
      ctx.beginPath(); ctx.arc(wx, groundY - wr, wr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 2; const ang = st.wheel * pxm / wr;
      ctx.beginPath(); ctx.moveTo(wx, groundY - wr); ctx.lineTo(wx + Math.cos(ang) * wr * 0.8, groundY - wr + Math.sin(ang) * wr * 0.8); ctx.stroke();
    }
    ctx.fillStyle = '#fff'; ctx.font = `bold ${fs}px ${SANS}`; ctx.textAlign = 'center';
    ctx.fillText(`${fmt(p.m, 1)} kg`, cx, cy + ch / 2 + fs * 0.35);
    // force arrows (1 N = scale px)
    const sc = W * 0.006;
    const ay = cy + ch * 0.5;
    if (p.F > 0) { arrow(ctx, cx + cw / 2, ay, cx + cw / 2 + p.F * sc, ay, '#22c55e', 4); ctx.fillStyle = '#22c55e'; ctx.textAlign = 'left'; ctx.fillText(`F = ${fmt(p.F, 0)} N`, cx + cw / 2 + p.F * sc + 6, ay - 6); }
    if (f > 0) { arrow(ctx, cx - cw / 2, ay, cx - cw / 2 - f * sc, ay, '#f97316', 4); ctx.fillStyle = '#f97316'; ctx.textAlign = 'right'; ctx.fillText(`f = ${fmt(f, 1)} N`, cx - cw / 2 - f * sc - 6, ay - 6); }
    // net force arrow above the cart
    if (Fnet > 0) { arrow(ctx, cx, cy - H * 0.05, cx + Fnet * sc, cy - H * 0.05, '#fbbf24', 3); ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'left'; ctx.fillText(`F_net = ${fmt(Fnet, 1)} N`, cx + Fnet * sc + 6, cy - H * 0.05 + 4); }
    else if (p.friction && p.F > 0 && st.v < 1e-6) { ctx.fillStyle = '#f97316'; ctx.textAlign = 'center'; ctx.fillText(T('Push too small: static friction holds the cart (F_net = 0)', 'Dorongan terlalu kecil: gesekan statis menahan kereta (F_net = 0)'), W / 2, H * 0.06); }
    // readouts
    ctx.fillStyle = '#e2e8f0'; ctx.font = `${fs}px ${MONO}`; ctx.textAlign = 'left';
    ctx.fillText(`t = ${fmt(st.t, 2)} s   x = ${fmt(st.x, 2)} m   v = ${fmt(st.v, 2)} m/s`, x0, H * 0.04 + fs);
    if (st.done) { ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right'; ctx.fillText(T('end of track — press Reset', 'ujung lintasan — tekan Reset'), x1, H * 0.04 + fs); }

    // ---- ticker tape ----
    const ty = H * 0.47, th = H * 0.08;
    ctx.fillStyle = '#f1f5f9'; ctx.fillRect(x0 - 10, ty, x1 - x0 + 20, th);
    ctx.fillStyle = '#475569'; ctx.font = `${fs * 0.9}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(T(`ticker tape: one dot every ${TICK} s (same scale as the track)`, `pita ketik: satu titik tiap ${TICK} s (skala sama dengan lintasan)`), x0, ty - 5);
    ctx.fillStyle = '#0f172a';
    for (let i = 0; i < st.dots.length; i++) {
      const dx = x0 + st.dots[i] * pxm;
      ctx.beginPath(); ctx.arc(dx, ty + th / 2, 3, 0, Math.PI * 2); ctx.fill();
      if (i % 5 === 0) { ctx.fillStyle = '#334155'; ctx.font = `${fs * 0.8}px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText(`${fmt(i * TICK, 1)}`, dx, ty + th - 3); ctx.fillStyle = '#0f172a'; }
    }
    // show spacing between the last two dots
    const n = st.dots.length;
    if (n >= 3) {
      const d1 = st.dots[n - 1] - st.dots[n - 2];
      ctx.fillStyle = '#b91c1c'; ctx.font = `${fs * 0.85}px ${MONO}`; ctx.textAlign = 'right';
      ctx.fillText(`Δx = ${fmt(d1, 3)} m → v ≈ Δx/Δt = ${fmt(d1 / TICK, 2)} m/s`, x1, ty - 5);
    }

    // ---- v–t graph ----
    const gx = W * 0.08, gy = H * 0.62, gw = W * 0.5, gh = H * 0.32;
    const vmax = Math.max(2, Math.ceil((Math.max(st.v, a * TMAX * 0.5, 1) * 1.15) / 2) * 2);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const yy = gy + gh - (i / 4) * gh; ctx.beginPath(); ctx.moveTo(gx, yy); ctx.lineTo(gx + gw, yy); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px ${MONO}`; ctx.textAlign = 'right'; ctx.fillText(fmt(vmax * i / 4, 1), gx - 4, yy + 4);
    }
    for (let s = 0; s <= TMAX; s += 2) {
      const xx = gx + (s / TMAX) * gw; ctx.beginPath(); ctx.moveTo(xx, gy); ctx.lineTo(xx, gy + gh); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.fillText(`${s}`, xx, gy + gh + fs);
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs * 0.9}px ${SANS}`; ctx.textAlign = 'left';
    ctx.fillText(T('v (m/s)', 'v (m/s)'), gx, gy - 6);
    ctx.textAlign = 'right'; ctx.fillText(T('t (s)', 't (s)'), gx + gw, gy + gh + fs * 2.1);
    // theoretical line (dashed) and the recorded samples
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx, gy + gh);
    const tEnd = Math.min(TMAX, a > 0 ? vmax / a : TMAX);
    ctx.lineTo(gx + (tEnd / TMAX) * gw, gy + gh - Math.min(1, a * tEnd / vmax) * gh); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5; ctx.beginPath();
    st.samples.forEach((q, i) => {
      const xx = gx + Math.min(1, q.t / TMAX) * gw, yy = gy + gh - Math.min(1, q.v / vmax) * gh;
      i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
    });
    ctx.stroke();
    // slope triangle on the last second of data
    const am = measuredA();
    if (am != null && st.t > 0.5) {
      const t2 = Math.min(st.t, TMAX), t1 = Math.max(0, t2 - 1), v1 = Math.min(vmax, am * t1), v2 = Math.min(vmax, am * t2);
      const X = (t) => gx + (t / TMAX) * gw, Y = (v) => gy + gh - (v / vmax) * gh;
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(X(t1), Y(v1)); ctx.lineTo(X(t2), Y(v1)); ctx.lineTo(X(t2), Y(v2)); ctx.stroke();
      ctx.fillStyle = '#fbbf24'; ctx.font = `${fs * 0.85}px ${MONO}`; ctx.textAlign = 'left';
      ctx.fillText(`Δv/Δt = ${fmt(am, 2)} m/s²`, X(t2) + 6, (Y(v1) + Y(v2)) / 2 + 4);
    }

    // ---- formula box ----
    const bx = W * 0.63, by = H * 0.6, bw = W * 0.35;
    const lh = fs * 1.6;
    const lines = [
      [T('Newton\'s second law', 'Hukum II Newton'), '#e2e8f0', true, SANS],
      ['a = F_net / m', '#fbbf24', true, MONO],
      [`F_net = F − f = ${fmt(p.F, 0)} − ${fmt(f, 1)} = ${fmt(Fnet, 1)} N`, '#e2e8f0', false, MONO],
      [`a = ${fmt(Fnet, 1)} N / ${fmt(p.m, 1)} kg = ${fmt(a, 2)} m/s²`, '#e2e8f0', false, MONO],
      [am == null ? T('measured a: run the cart…', 'a terukur: jalankan kereta…') : `${T('measured slope', 'kemiringan terukur')}: ${fmt(am, 2)} m/s²`, '#38bdf8', false, MONO],
      [p.friction ? `f = μ·m·g = ${MU} × ${fmt(p.m, 1)} × ${G} = ${fmt(MU * p.m * G, 1)} N` : T('friction off: f = 0', 'gesekan mati: f = 0'), '#f97316', false, MONO],
    ];
    ctx.fillStyle = 'rgba(17,28,51,0.95)'; ctx.beginPath(); ctx.roundRect(bx, by, bw, lh * lines.length + 14, 8); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
    ctx.textAlign = 'left';
    lines.forEach(([txt, col, bold, font], i) => {
      ctx.fillStyle = col; ctx.font = `${bold ? 'bold ' : ''}${fs * (bold ? 1.05 : 0.92)}px ${font}`;
      ctx.fillText(txt, bx + 10, by + 10 + lh * (i + 0.8));
    });
    ctx.textAlign = 'left';
  }

  // ---------- controls ----------
  const forceS = slider({ label: T('Applied force F (N)', 'Gaya dorong F (N)'), key: 'force', min: 0, max: 50, step: 1, value: p.F, onInput: (v) => { p.F = v; } });
  const massS = slider({ label: T('Mass m (kg)', 'Massa m (kg)'), key: 'mass', min: 1, max: 10, step: 0.5, value: p.m, format: (v) => v.toFixed(1), onInput: (v) => { p.m = v; } });
  const fricT = toggle({ label: T(`Friction (μ = ${MU})`, `Gesekan (μ = ${MU})`), key: 'friction', value: false, onChange: (v) => { p.friction = v; } });
  const startBtn = button({ label: T('Start', 'Mulai'), primary: true, onClick: () => {
    if (st.done) reset();
    st.running = !st.running;
    startBtn.label = st.running ? T('Pause', 'Jeda') : T('Start', 'Mulai');
  } });
  const resetBtn = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(forceS.el, massS.el, row(fricT, startBtn, resetBtn));

  const lab = labPanel({
    title: 'Lab — does a = F_net / m?',
    filename: 'newtons-second-law-data.csv',
    columns: [
      { key: 'F', label: 'F (N)', format: (v) => v.toFixed(0) },
      { key: 'm', label: 'm (kg)', format: (v) => v.toFixed(1) },
      { key: 'friction', label: 'Friction' },
      { key: 'Fnet', label: 'F_net (N)', format: (v) => v.toFixed(1) },
      { key: 'aTheory', label: 'F_net/m (m/s²)', format: (v) => v.toFixed(2) },
      { key: 'aMeas', label: 'a measured (m/s²)', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Friction off, m = 2 kg, F = 10 N. Start, let the cart run at least 1 s, then Record.',
      'Keep m = 2 kg; repeat with F = 20 N, 30 N and 40 N. How does a change when F doubles?',
      'Keep F = 20 N; repeat with m = 1, 2, 4 and 8 kg. How does a change when m doubles?',
      'Turn friction on with m = 4 kg and F = 5 N. Why does nothing happen? Raise F until it moves and Record.',
      'Plot a against F (fixed m) and a against 1/m (fixed F). Are they straight lines?',
    ],
    predict: 'If you double the force on the same cart, what happens to its acceleration? If you double the mass with the same force?',
    source: () => {
      const am = measuredA();
      if (am == null) return null;
      const { Fnet, a } = forces();
      return { F: p.F, m: p.m, friction: p.friction ? 'on' : 'off', Fnet, aTheory: a, aMeas: am };
    },
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
