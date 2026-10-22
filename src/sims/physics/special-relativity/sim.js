import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const C = 3.0e8;            // m/s
const H_CLOCK = 1.5;        // m, mirror separation → T0 = 2h/c = 10.0 ns
const T0_NS = (2 * H_CLOCK) / C * 1e9;
const TICK_VIS = 2.0;       // seconds of animation per proper tick
const MUON_TAU = 2.2;       // μs
const MUON_ALT = 10.0;      // km
const MUON_RATE = 10;       // μs of ground time per second of animation → a 33 μs fall takes ≈ 3.3 s

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const p = { beta: 0.6, L0: 10, scene: 'clock', paused: false };
  const st = { t: 0, muonT: 0, muonHold: 0 };
  const gamma = () => 1 / Math.sqrt(Math.max(1e-12, 1 - p.beta * p.beta));

  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(10, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const fmt = (v, d = 2) => (Number.isFinite(v) ? v.toFixed(d) : '—');

  // ---- shared: header + γ–v graph -------------------------------------
  function drawHeader(ctx, W, H) {
    const fs = H * 0.033, g = gamma();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    ctx.fillText(`v = ${p.beta.toFixed(2)} c = ${fmt(p.beta * C / 1e6, 0)} × 10⁶ m/s`, W * 0.03, H * 0.065);
    ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.95, true);
    ctx.fillText(`γ = 1/√(1 − v²/c²) = ${fmt(g, 3)}`, W * 0.03, H * 0.12);
  }
  function drawGammaGraph(ctx, x, y, w, h) {
    const fs = h * 0.11;
    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
    const gx0 = x + w * 0.16, gx1 = x + w * 0.95, gy0 = y + h * 0.88, gy1 = y + h * 0.12;
    const gMax = 8;
    const X = (b) => gx0 + b * (gx1 - gx0);
    const Y = (gm) => gy0 - ((clamp(gm, 1, gMax) - 1) / (gMax - 1)) * (gy0 - gy1);
    ctx.strokeStyle = '#475569';
    ctx.beginPath(); ctx.moveTo(gx0, gy1); ctx.lineTo(gx0, gy0); ctx.lineTo(gx1, gy0); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs); ctx.textAlign = 'right';
    for (const gm of [1, 2, 4, 6, 8]) { ctx.fillText(String(gm), gx0 - 3, Y(gm) + fs * 0.35); }
    ctx.textAlign = 'center';
    for (const b of [0, 0.5, 1]) ctx.fillText(b.toFixed(1), X(b), gy0 + fs * 1.1);
    ctx.fillText('v/c', (gx0 + gx1) / 2, y + h - 2);
    ctx.textAlign = 'left'; ctx.fillText('γ', x + 4, gy1 + fs * 0.3);
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const b = i / 100 * 0.995;
      const gm = 1 / Math.sqrt(1 - b * b);
      const yy = Y(gm);
      i ? ctx.lineTo(X(b), yy) : ctx.moveTo(X(b), yy);
    }
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(X(p.beta), Y(gamma()), Math.max(3, w * 0.02), 0, Math.PI * 2); ctx.fill();
  }

  // ---- scene 1: light clock in two frames ------------------------------
  function drawClockPanel(ctx, x, y, w, h, ground) {
    const g = gamma(), fs = h * 0.07;
    ctx.fillStyle = 'rgba(15,23,42,0.6)'; ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true); ctx.textAlign = 'left';
    ctx.fillText(ground ? T('Ground frame', 'Kerangka tanah') : T('Ship frame', 'Kerangka pesawat'), x + fs * 0.6, y + fs * 1.3);
    const mirrorW = w * 0.14;
    const top = y + h * 0.26, bot = y + h * 0.78, hpx = bot - top;
    const cVis = (2 * hpx) / TICK_VIS;                   // px per second
    // clock phase: proper time τ; in the ground frame proper time runs at t/γ
    const tau = ground ? st.t / g : st.t;
    const phase = (tau % TICK_VIS) / TICK_VIS;          // 0..1 over one tick
    const up = phase < 0.5;
    const frac = up ? phase * 2 : (phase - 0.5) * 2;
    const photonY = up ? bot - frac * hpx : top + frac * hpx;
    let cx;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    if (ground) {
      const vVis = p.beta * cVis;
      const travel = w * 0.9;
      cx = x + w * 0.1 + ((vVis * st.t) % Math.max(1, travel));
      // zigzag path for the current tick (from the last tick start)
      const xs = cx - vVis * (tau % TICK_VIS) * g;         // where this tick started
      const xMid = xs + (vVis * TICK_VIS * g) / 2, xEnd = xs + vVis * TICK_VIS * g;
      ctx.strokeStyle = 'rgba(251,191,36,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(xs, bot); ctx.lineTo(xMid, top); ctx.lineTo(xEnd, bot); ctx.stroke(); ctx.setLineDash([]);
      // ghost mirrors at tick start
      ctx.fillStyle = 'rgba(148,163,184,0.25)';
      ctx.fillRect(xs - mirrorW / 2, top - 4, mirrorW, 4); ctx.fillRect(xs - mirrorW / 2, bot, mirrorW, 4);
      // velocity arrow
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - mirrorW * 0.6, y + h * 0.9); ctx.lineTo(cx + mirrorW * 0.6, y + h * 0.9); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + mirrorW * 0.6, y + h * 0.9); ctx.lineTo(cx + mirrorW * 0.6 - 6, y + h * 0.9 - 4); ctx.lineTo(cx + mirrorW * 0.6 - 6, y + h * 0.9 + 4); ctx.closePath(); ctx.fillStyle = '#60a5fa'; ctx.fill();
      // light path within the current leg
      const legStart = up ? xs : xMid, legStartY = up ? bot : top;
      const px = legStart + frac * (xMid - xs);
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(legStart, legStartY); ctx.lineTo(px, photonY); ctx.stroke();
      ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(px, photonY, Math.max(3, w * 0.012), 0, Math.PI * 2); ctx.fill();
    } else {
      cx = x + w / 2;
      ctx.strokeStyle = 'rgba(251,191,36,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, bot); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, up ? bot : top); ctx.lineTo(cx, photonY); ctx.stroke();
      ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(cx, photonY, Math.max(3, w * 0.012), 0, Math.PI * 2); ctx.fill();
      // h label
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - mirrorW, top); ctx.lineTo(cx - mirrorW, bot); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85); ctx.textAlign = 'right';
      ctx.fillText(`h = ${H_CLOCK} m`, cx - mirrorW - 4, (top + bot) / 2);
    }
    // mirrors
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(cx - mirrorW / 2, top - 4, mirrorW, 4);
    ctx.fillRect(cx - mirrorW / 2, bot, mirrorW, 4);
    ctx.restore();
    // readouts
    const ticks = Math.floor(tau / TICK_VIS);
    const narrow = w < 260;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    const lx = x + fs * 0.6;
    if (ground) {
      ctx.fillText(T(`ground time: ${(st.t / TICK_VIS * T0_NS).toFixed(1)} ns`, `waktu tanah: ${(st.t / TICK_VIS * T0_NS).toFixed(1)} ns`), lx, y + h * 0.96);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(narrow
        ? T(`${ticks} ticks, Δt = γΔt₀ = ${(g * T0_NS).toFixed(2)} ns`, `${ticks} detak, Δt = γΔt₀ = ${(g * T0_NS).toFixed(2)} ns`)
        : T(`ship clock: ${ticks} ticks, Δt = γ·Δt₀ = ${(g * T0_NS).toFixed(2)} ns`, `jam pesawat: ${ticks} detak, Δt = γ·Δt₀ = ${(g * T0_NS).toFixed(2)} ns`), lx, y + h * 0.96 - fs * 1.1);
    } else {
      ctx.fillText(T(`ship time: ${(tau / TICK_VIS * T0_NS).toFixed(1)} ns`, `waktu pesawat: ${(tau / TICK_VIS * T0_NS).toFixed(1)} ns`), lx, y + h * 0.96);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(narrow
        ? T(`${ticks} ticks, Δt₀ = ${T0_NS.toFixed(2)} ns`, `${ticks} detak, Δt₀ = ${T0_NS.toFixed(2)} ns`)
        : T(`${ticks} ticks, Δt₀ = 2h/c = ${T0_NS.toFixed(2)} ns`, `${ticks} detak, Δt₀ = 2h/c = ${T0_NS.toFixed(2)} ns`), lx, y + h * 0.96 - fs * 1.1);
    }
  }

  function drawClockScene(ctx, W, H) {
    const pw = W * 0.44, ph = H * 0.56, py = H * 0.17;
    drawClockPanel(ctx, W * 0.03, py, pw, ph, false);
    drawClockPanel(ctx, W * 0.53, py, pw, ph, true);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.03); ctx.textAlign = 'left';
    ctx.fillText(W < 560
      ? T('Same c, longer path → moving clock ticks slower: Δt = γΔt₀', 'c sama, lintasan lebih panjang → jam bergerak lebih lambat: Δt = γΔt₀')
      : T('Same light pulse, same speed c, longer path → the moving clock ticks slower: Δt = γΔt₀', 'Pulsa cahaya yang sama, laju c yang sama, lintasan lebih panjang → jam yang bergerak berdetak lebih lambat: Δt = γΔt₀'), W * 0.03, H * 0.79);
  }

  // ---- scene 2: length contraction -------------------------------------
  function drawRodScene(ctx, W, H) {
    const g = gamma(), fs = H * 0.033;
    const x0 = W * 0.08, x1 = W * 0.72;
    const pxPerM = (x1 - x0) / 10;  // 10 m fits the track
    const drawRuler = (y) => {
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'center';
      for (let m = 0; m <= 10; m++) {
        const x = x0 + m * pxPerM;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 6); ctx.stroke();
        ctx.fillText(`${m} m`, x, y + fs * 1.2);
      }
    };
    const drawRod = (y, len, color, label) => {
      const hh = H * 0.045;
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.roundRect(x0, y - hh, len * pxPerM, hh * 2, 6); ctx.fill();
      ctx.fillStyle = '#0b1220'; ctx.font = font(fs * 0.85, true); ctx.textAlign = 'center';
      if (len * pxPerM > fs * 6) ctx.fillText(label, x0 + (len * pxPerM) / 2, y + fs * 0.35);
      else { ctx.fillStyle = color; ctx.textAlign = 'left'; ctx.fillText(label, x0 + len * pxPerM + 8, y + fs * 0.35); }
    };
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9); ctx.textAlign = 'left';
    ctx.fillText(T('Rod in its own rest frame (proper length)', 'Batang dalam kerangka diamnya (panjang sejati)'), x0, H * 0.24);
    drawRod(H * 0.32, p.L0, '#3b82f6', `L₀ = ${p.L0.toFixed(2)} m`);
    drawRuler(H * 0.39);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9); ctx.textAlign = 'left';
    ctx.fillText(T(`Same rod measured from the ground as it passes at ${p.beta.toFixed(2)}c`, `Batang yang sama diukur dari tanah saat melintas pada ${p.beta.toFixed(2)}c`), x0, H * 0.56);
    const L = p.L0 / g;
    drawRod(H * 0.64, L, '#f59e0b', `L = L₀/γ = ${L.toFixed(2)} m`);
    drawRuler(H * 0.71);
    // motion streaks
    ctx.strokeStyle = 'rgba(245,158,11,0.35)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const yy = H * 0.64 - H * 0.03 + i * H * 0.02;
      const off = ((st.t * 300 + i * 37) % 60);
      ctx.beginPath(); ctx.moveTo(x0 - 10 - off, yy); ctx.lineTo(x0 - 40 - off, yy); ctx.stroke();
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    ctx.fillText(T('Only the length along the motion shrinks; the thickness is unchanged.', 'Hanya panjang searah gerak yang menyusut; tebalnya tidak berubah.'), x0, H * 0.84);
  }

  // ---- scene 3: muon ---------------------------------------------------
  function drawMuonScene(ctx, W, H) {
    const g = gamma(), fs = H * 0.033;
    const beta = Math.max(0.01, p.beta);
    const tFall = (MUON_ALT * 1e3) / (beta * C) * 1e6;  // μs ground time to reach the ground
    const t = Math.min(st.muonT, tFall);
    const altNow = MUON_ALT * (1 - t / tFall);
    const survRel = Math.exp(-t / (g * MUON_TAU));
    const survNon = Math.exp(-t / MUON_TAU);
    // atmosphere column
    const cx = W * 0.14, top = H * 0.2, bot = H * 0.9, cw = W * 0.08;
    const grad = ctx.createLinearGradient(0, top, 0, bot);
    grad.addColorStop(0, 'rgba(30,41,59,0.9)'); grad.addColorStop(1, 'rgba(56,89,140,0.9)');
    ctx.fillStyle = grad; ctx.fillRect(cx - cw / 2, top, cw, bot - top);
    ctx.fillStyle = '#365314'; ctx.fillRect(cx - cw, bot, cw * 2, H * 0.03);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'left';
    for (let km = 0; km <= 10; km += 2) {
      const y = bot - (km / MUON_ALT) * (bot - top);
      ctx.beginPath(); ctx.moveTo(cx + cw / 2, y); ctx.lineTo(cx + cw / 2 + 6, y); ctx.stroke();
      ctx.fillText(`${km} km`, cx + cw / 2 + 9, y + fs * 0.3);
    }
    // muon
    const my = bot - (altNow / MUON_ALT) * (bot - top);
    ctx.fillStyle = '#f472b6';
    ctx.beginPath(); ctx.arc(cx, my, Math.max(4, W * 0.008), 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(244,114,182,0.4)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, my); ctx.stroke();
    ctx.fillStyle = '#f472b6'; ctx.font = font(fs * 0.8, true);
    ctx.fillText('μ⁻', cx + W * 0.012, my - 6);
    // text column
    const narrow = W < 560;
    const tx = narrow ? W * 0.3 : W * 0.34, lh = fs * 1.5;
    const rangeRel = (beta * C * g * MUON_TAU * 1e-6 / 1e3).toFixed(2), rangeNon = (beta * C * MUON_TAU * 1e-6 / 1e3).toFixed(2);
    let y = H * 0.21;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9, true);
    ctx.fillText(T('Ground frame', 'Kerangka tanah'), tx, y); y += lh;
    ctx.font = font(fs * 0.85); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(narrow ? `t = ${t.toFixed(1)} μs / ${tFall.toFixed(1)} μs (10 km)` : T(`time elapsed t = ${t.toFixed(1)} μs of ${tFall.toFixed(1)} μs to fall 10 km`, `waktu berlalu t = ${t.toFixed(1)} μs dari ${tFall.toFixed(1)} μs untuk turun 10 km`), tx, y); y += lh;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(narrow ? `γτ₀ = ${(g * MUON_TAU).toFixed(1)} μs → vγτ₀ = ${rangeRel} km` : T(`dilated lifetime γτ₀ = ${(g * MUON_TAU).toFixed(1)} μs → mean range vγτ₀ = ${rangeRel} km`, `umur terdilatasi γτ₀ = ${(g * MUON_TAU).toFixed(1)} μs → jangkauan rata-rata vγτ₀ = ${rangeRel} km`), tx, y); y += lh;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(narrow ? `τ₀ = 2.2 μs → vτ₀ = ${rangeNon} km` : T(`without relativity: τ₀ = 2.2 μs → range vτ₀ = ${rangeNon} km`, `tanpa relativitas: τ₀ = 2,2 μs → jangkauan vτ₀ = ${rangeNon} km`), tx, y); y += lh * 1.2;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9, true);
    ctx.fillText(T('Muon frame', 'Kerangka muon'), tx, y); y += lh;
    ctx.font = font(fs * 0.85); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(narrow ? `10 km/γ = ${(MUON_ALT / g).toFixed(2)} km, τ = ${(tFall / g).toFixed(1)} μs` : T(`atmosphere contracted to 10 km/γ = ${(MUON_ALT / g).toFixed(2)} km; proper time to pass it: ${(tFall / g).toFixed(1)} μs`, `atmosfer terkontraksi menjadi 10 km/γ = ${(MUON_ALT / g).toFixed(2)} km; waktu sejati melewatinya: ${(tFall / g).toFixed(1)} μs`), tx, y); y += lh * 1.3;
    // survival bars
    const bx = tx, bw = narrow ? W * 0.97 - tx : W * 0.55, bh = fs * 0.9;
    const bar = (label, frac, color) => {
      ctx.fillStyle = '#1e293b'; ctx.fillRect(bx, y, bw, bh);
      ctx.fillStyle = color; ctx.fillRect(bx, y, bw * clamp(frac, 0, 1), bh);
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.8);
      const pct = frac >= 0.001 ? `${(frac * 100).toFixed(1)} %` : frac.toExponential(1);
      ctx.fillText(`${label}: N/N₀ = ${pct}`, bx, y - 4);
      y += bh + lh * 0.9;
    };
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9, true);
    ctx.fillText(T('Surviving muons so far', 'Muon yang bertahan sejauh ini'), tx, y); y += lh * 0.9;
    bar(narrow ? 'exp(−t/γτ₀)' : T('with relativity, exp(−t/γτ₀)', 'dengan relativitas, exp(−t/γτ₀)'), survRel, '#22c55e');
    bar(narrow ? 'exp(−t/τ₀)' : T('without relativity, exp(−t/τ₀)', 'tanpa relativitas, exp(−t/τ₀)'), survNon, '#ef4444');
    if (st.muonT >= tFall) {
      ctx.fillStyle = '#4ade80'; ctx.font = font(fs * 0.9, true);
      ctx.fillText(narrow
        ? T(`Ground: ${(survRel * 100).toFixed(1)} % vs ${survNon.toExponential(1)}`, `Tanah: ${(survRel * 100).toFixed(1)} % vs ${survNon.toExponential(1)}`)
        : T(`Reached the ground: ${(survRel * 100).toFixed(1)} % arrive (relativity) vs ${survNon.toExponential(1)} (classical)`, `Mencapai tanah: ${(survRel * 100).toFixed(1)} % tiba (relativitas) vs ${survNon.toExponential(1)} (klasik)`), tx, y + fs * 0.4);
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawHeader(ctx, W, H);
    if (p.scene === 'clock') drawClockScene(ctx, W, H);
    else if (p.scene === 'rod') drawRodScene(ctx, W, H);
    else drawMuonScene(ctx, W, H);
    const gw = W * 0.22, gh = H * 0.3;
    if (p.scene === 'rod') drawGammaGraph(ctx, W * 0.75, H * 0.2, gw, gh * 1.2);
    else drawGammaGraph(ctx, W * 0.76, H * 0.745, W * 0.21, H * 0.175);
    // formulas strip
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.028); ctx.textAlign = 'right';
    ctx.fillText(`Δt = γΔt₀ = ${fmt(gamma() * T0_NS, 2)} ns      L = L₀/γ = ${fmt(p.L0 / gamma(), 2)} m`, W * 0.97, H * 0.96);
    ctx.textAlign = 'left';
  }

  // ---- controls ---------------------------------------------------------
  const sceneSel = select({
    label: 'Scenario', key: 'scene', value: p.scene,
    options: [
      { value: 'clock', label: 'Light clock (ship vs ground)' },
      { value: 'rod', label: 'Length contraction' },
      { value: 'muon', label: 'Muon decay (10 km, τ₀ = 2.2 μs)' },
    ],
    onChange: (v) => { p.scene = v; st.muonT = 0; st.muonHold = 0; L0S.el.style.display = v === 'rod' ? '' : 'none'; },
  });
  const betaS = slider({ label: 'Speed v/c', key: 'beta', min: 0, max: 0.99, step: 0.01, value: p.beta, format: (v) => v.toFixed(2), onInput: (v) => { p.beta = v; st.muonT = 0; st.muonHold = 0; } });
  const L0S = slider({ label: 'Rod proper length L₀ (m)', key: 'L0', min: 1, max: 10, step: 0.5, value: p.L0, format: (v) => v.toFixed(1), onInput: (v) => { p.L0 = v; } });
  L0S.el.style.display = 'none';
  const pauseT = toggle({ label: 'Pause', key: 'pause', value: false, onChange: (v) => { p.paused = v; } });
  const resetB = button({ label: 'Reset clocks', onClick: () => { st.t = 0; st.muonT = 0; st.muonHold = 0; } });
  ctrlPanel.append(sceneSel.el, betaS.el, L0S.el, row(pauseT, resetB));

  const lab = labPanel({
    title: 'Relativity lab — γ, dilated time and contracted length',
    filename: 'special-relativity-data.csv',
    columns: [
      { key: 'beta', label: 'v/c', format: (v) => v.toFixed(2) },
      { key: 'gamma', label: 'γ', format: (v) => v.toFixed(3) },
      { key: 'T0', label: 'Δt₀ (ns)', format: (v) => v.toFixed(2) },
      { key: 'Tdil', label: 'Δt = γΔt₀ (ns)', format: (v) => v.toFixed(2) },
      { key: 'L0', label: 'L₀ (m)', format: (v) => v.toFixed(1) },
      { key: 'L', label: 'L = L₀/γ (m)', format: (v) => v.toFixed(2) },
      { key: 'muon', label: 'Muon survival (10 km)', format: (v) => (v >= 0.001 ? (v * 100).toFixed(1) + ' %' : v.toExponential(1)) },
    ],
    procedure: [
      'Record at v/c = 0, 0.20, 0.40, 0.60, 0.80, 0.90, 0.95, 0.99.',
      'Plot γ against v/c. Is the curve linear? Where does it start to rise steeply?',
      'Check one row by hand: γ = 1/√(1 − (v/c)²). For 0.60c you should get 1.25.',
      'Compute L₀/L and Δt/Δt₀ for each row. Both should equal γ.',
      'From the muon column, find the lowest speed at which more than 1 % of muons reach the ground.',
    ],
    predict: 'At v = 0.5c, by what percentage do you think the moving clock slows? Guess first, then measure.',
    source: () => {
      const g = gamma(), beta = Math.max(0.01, p.beta);
      const tFall = (MUON_ALT * 1e3) / (beta * C) * 1e6;
      return { beta: p.beta, gamma: g, T0: T0_NS, Tdil: g * T0_NS, L0: p.L0, L: p.L0 / g, muon: Math.exp(-tFall / (g * MUON_TAU)) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    if (!p.paused) {
      st.t += dt;
      if (st.t > 1e5) st.t = 0;
      const beta = Math.max(0.01, p.beta);
      const tFall = (MUON_ALT * 1e3) / (beta * C) * 1e6;
      if (st.muonT < tFall) st.muonT += dt * MUON_RATE;
      else { st.muonHold += dt; if (st.muonHold > 2.5) { st.muonT = 0; st.muonHold = 0; } }
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
