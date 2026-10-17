import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const E_CH = 1.602e-19;        // C
const U_KG = 1.6605e-27;       // kg per atomic mass unit
const M_E = 9.109e-31;
const COLORS = ['#fbbf24', '#38bdf8', '#a78bfa', '#f472b6', '#4ade80'];
const PRESETS = [
  { id: 'electron', label: { en: 'Electron e⁻', id: 'Elektron e⁻' }, parts: [{ name: 'e⁻', q: -1, m: M_E }], v: 1e7, B: 1e-3 },
  { id: 'proton', label: { en: 'Proton p⁺', id: 'Proton p⁺' }, parts: [{ name: 'p⁺', q: 1, m: 1.673e-27 }], v: 1e5, B: 0.1 },
  { id: 'alpha', label: { en: 'Alpha particle α (2e, 4u)', id: 'Partikel alfa α (2e, 4u)' }, parts: [{ name: 'α', q: 2, m: 6.645e-27 }], v: 1e5, B: 0.1 },
  { id: 'custom', label: { en: 'Custom q and m', id: 'q dan m buatan sendiri' }, parts: null, v: 1e5, B: 0.1 },
  { id: 'ms-ne', label: { en: 'Mass spectrometer: Ne-20, Ne-21, Ne-22', id: 'Spektrometer massa: Ne-20, Ne-21, Ne-22' }, parts: [{ name: '²⁰Ne⁺', q: 1, m: 19.992 * U_KG }, { name: '²¹Ne⁺', q: 1, m: 20.994 * U_KG }, { name: '²²Ne⁺', q: 1, m: 21.991 * U_KG }], v: 1e5, B: 0.5, selector: true },
  { id: 'ms-u', label: { en: 'Mass spectrometer: U-235, U-238', id: 'Spektrometer massa: U-235, U-238' }, parts: [{ name: '²³⁵U⁺', q: 1, m: 235.04 * U_KG }, { name: '²³⁸U⁺', q: 1, m: 238.05 * U_KG }], v: 1e5, B: 0.5, selector: true },
];

function fmtSI(v, unit, digits = 3) {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a === 0) return `0 ${unit}`;
  const table = [[1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'μ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f']];
  for (const [f, p] of table) if (a >= f * 0.9995) return `${(v / f).toPrecision(digits)} ${p}${unit}`;
  return `${v.toExponential(2)} ${unit}`;
}
const sci = (v, d = 2) => (Number.isFinite(v) ? v.toExponential(d).replace('e+', '×10^').replace('e-', '×10^-') : '—');

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { preset: 'proton', qe: 1, logM: 0, logV: 5, logB: -1, bOut: true, selector: false, logE: 4, autoFit: true };
  const state = { scale: 1000, particles: [], done: false, timeFactor: 1 };

  const v = () => 10 ** params.logV;
  const B = () => 10 ** params.logB;                 // magnitude (T)
  const Bz = () => (params.bOut ? 1 : -1) * B();      // +z = out of page
  const Efield = () => (params.selector ? 10 ** params.logE : 0);
  function partList() {
    const p = PRESETS.find((x) => x.id === params.preset) || PRESETS[1];
    if (p.parts) return p.parts;
    return [{ name: 'q,m', q: params.qe, m: 10 ** params.logM * U_KG }];
  }
  const radius = (q, m) => (q === 0 ? Infinity : m * v() / (Math.abs(q) * E_CH * B()));
  const rMax = () => { let r = 0; for (const p of partList()) { const rr = radius(p.q, p.m); if (Number.isFinite(rr)) r = Math.max(r, rr); } return r; };

  // ---- geometry (canvas px) ------------------------------------------------
  function geom() {
    const W = cv.width, H = cv.height;
    const selW = params.selector ? W * 0.26 : 0;
    const x0 = W * 0.05;                       // launch x
    const selX0 = W * 0.12, selX1 = selX0 + selW;
    const bX0 = params.selector ? selX1 + W * 0.02 : W * 0.3;
    const bX1 = W * 0.985;
    const top = H * 0.07, bottom = H * 0.93;
    return { W, H, x0, y0: H * 0.5, selX0, selX1, bX0, bX1, top, bottom };
  }
  function fitScale() {
    const g = geom();
    const r = rMax();
    if (!Number.isFinite(r) || r <= 0) return state.scale;
    return (g.H * 0.19) / r;                    // r_max → 19% of height
  }

  // ---- particles ---------------------------------------------------------
  function launch() {
    if (params.autoFit) state.scale = fitScale();
    const g = geom();
    state.particles = partList().map((p, i) => ({
      name: p.name, q: p.q * E_CH, m: p.m, color: COLORS[i % COLORS.length],
      x: 0, y: 0, vx: v(), vy: 0, alive: true, trail: [], inB: false, land: null, t: 0,
    }));
    // physical seconds per real second: cross ~55% of the width in 2.5 s
    const pxPerSec = (g.W * 0.55) / 2.5;
    state.timeFactor = pxPerSec / Math.max(v() * state.scale, 1e-30);
    state.done = false;
  }
  const toPx = (p) => { const g = geom(); return { px: g.x0 + p.x * state.scale, py: g.y0 - p.y * state.scale }; };
  function fieldsAt(px, py) {
    const g = geom();
    const inSel = params.selector && px >= g.selX0 && px <= g.selX1 && py >= g.top && py <= g.bottom;
    const inB = px >= g.bX0 && px <= g.bX1 && py >= g.top && py <= g.bottom;
    // E points +y (up) for B out of page so that v = E/B goes straight for any sign of q
    return { Ey: inSel ? Efield() * (params.bOut ? 1 : -1) : 0, Bz: (inSel || inB) ? Bz() : 0, inB };
  }
  function step(dt) {
    if (state.done) return;
    const g = geom();
    const dtp = dt * state.timeFactor;
    let anyAlive = false;
    for (const p of state.particles) {
      if (!p.alive) continue;
      anyAlive = true;
      const omega = Math.abs(p.q) * B() / p.m;
      const n = clamp(Math.ceil(omega * dtp / 0.03), 1, 1500);
      const h = dtp / n;
      for (let i = 0; i < n; i++) {
        const { px, py } = toPx(p);
        const f = fieldsAt(px, py);
        // Boris pusher (exact circle for pure B)
        const qm = p.q / p.m;
        let vx = p.vx + qm * 0 * h / 2, vy = p.vy + qm * f.Ey * h / 2;
        const tt = qm * f.Bz * h / 2, s = 2 * tt / (1 + tt * tt);
        const vpx = vx + vy * tt, vpy = vy - vx * tt;
        vx = vx + vpy * s; vy = vy - vpx * s;
        vy += qm * f.Ey * h / 2;
        p.vx = vx; p.vy = vy;
        const wasInB = p.inB; p.inB = f.inB;
        p.x += vx * h; p.y += vy * h; p.t += h;
        // landing on the detector (left wall of the B region) after being inside
        const np = toPx(p);
        if (wasInB && np.px < g.bX0 && !p.land) { p.land = { py: np.py, t: p.t }; p.alive = false; break; }
        if (np.px < -20 || np.px > g.W + 20 || np.py < -20 || np.py > g.H + 20) { p.alive = false; break; }
        if (p.vx === 0 && p.vy === 0) { p.alive = false; break; }
      }
      const q = toPx(p);
      const last = p.trail[p.trail.length - 1];
      if (!last || Math.hypot(q.px - last.px, q.py - last.py) > 1.5) { p.trail.push(q); if (p.trail.length > 1500) p.trail.shift(); }
    }
    if (!anyAlive) state.done = true;
  }

  // ---- drawing -----------------------------------------------------------
  function drawArrow(ctx, x0, y0, x1, y1, color, width = 1.5) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, hs = 6;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * hs * 0.6, y1 - uy * hs * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * hs - uy * hs * 0.5, y1 - uy * hs + ux * hs * 0.5);
    ctx.lineTo(x1 - ux * hs + uy * hs * 0.5, y1 - uy * hs - ux * hs * 0.5); ctx.closePath(); ctx.fill();
  }
  function drawBSymbols(ctx, x0, x1, y0, y1, fs) {
    const sp = clamp(cv.width * 0.055, 22, 44);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.2;
    for (let y = y0 + sp / 2; y < y1; y += sp) for (let x = x0 + sp / 2; x < x1; x += sp) {
      if (params.bOut) { ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.beginPath(); ctx.moveTo(x - 3.5, y - 3.5); ctx.lineTo(x + 3.5, y + 3.5); ctx.moveTo(x + 3.5, y - 3.5); ctx.lineTo(x - 3.5, y + 3.5); ctx.stroke(); }
    }
  }
  function niceScaleBar(W) {
    // choose a nice length in metres whose px length is 12–30% of W
    const target = W * 0.2 / state.scale;
    const exp = Math.floor(Math.log10(Math.max(target, 1e-30)));
    for (const m of [5, 2, 1]) { const L = m * 10 ** exp; if (L * state.scale <= W * 0.3) return L; }
    return 10 ** exp;
  }

  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    const fs = clamp(W * 0.024, 10, 14), lh = fs * 1.4;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // B region
    ctx.fillStyle = 'rgba(30,41,59,0.6)'; ctx.fillRect(g.bX0, g.top, g.bX1 - g.bX0, g.bottom - g.top);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1; ctx.strokeRect(g.bX0, g.top, g.bX1 - g.bX0, g.bottom - g.top); ctx.setLineDash([]);
    drawBSymbols(ctx, g.bX0, g.bX1, g.top, g.bottom, fs);
    // detector plate = left wall of B region
    ctx.fillStyle = '#64748b'; ctx.fillRect(g.bX0 - 4, g.top, 4, g.bottom - g.top);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'right';
    ctx.fillText(`B = ${fmtSI(B(), 'T')} ${params.bOut ? T('(out of page ·)', '(keluar bidang ·)') : T('(into page ×)', '(masuk bidang ×)')}`, g.bX1 - 6, g.top + fs * 1.2);
    ctx.save(); ctx.translate(g.bX0 - 8, (g.top + g.bottom) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center';
    ctx.fillText(T('detector', 'detektor'), 0, 0); ctx.restore();

    // selector region
    if (params.selector) {
      ctx.fillStyle = 'rgba(30,41,59,0.6)'; ctx.fillRect(g.selX0, g.top, g.selX1 - g.selX0, g.bottom - g.top);
      drawBSymbols(ctx, g.selX0, g.selX1, g.top, g.bottom, fs);
      // plates
      const up = params.bOut;        // E points up (phys) when B out of page
      ctx.fillStyle = up ? '#3b82f6' : '#ef4444'; ctx.fillRect(g.selX0, g.top - 6, g.selX1 - g.selX0, 6);
      ctx.fillStyle = up ? '#ef4444' : '#3b82f6'; ctx.fillRect(g.selX0, g.bottom, g.selX1 - g.selX0, 6);
      const nE = 5;
      for (let i = 0; i < nE; i++) {
        const x = g.selX0 + (g.selX1 - g.selX0) * (i + 0.5) / nE;
        if (up) drawArrow(ctx, x, g.bottom - 10, x, g.top + 10, 'rgba(245,158,11,0.55)', 1.2);
        else drawArrow(ctx, x, g.top + 10, x, g.bottom - 10, 'rgba(245,158,11,0.55)', 1.2);
      }
      ctx.fillStyle = '#f59e0b'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
      ctx.fillText(`E = ${fmtSI(Efield(), 'V/m')}`, (g.selX0 + g.selX1) / 2, g.top + fs * 1.3);
      ctx.fillText(`v = E/B = ${sci(Efield() / B(), 2)} m/s`, (g.selX0 + g.selX1) / 2, g.bottom - fs * 0.6);
    }

    // predicted circles (straight entry) for each particle
    for (const p of state.particles) {
      const r = p.q === 0 ? Infinity : p.m * v() / (Math.abs(p.q) * B());
      const rp = r * state.scale;
      if (!Number.isFinite(rp) || rp > 1e5) continue;
      const side = Math.sign(p.q * Bz()) || 1;       // + → force −y phys (down on canvas)
      const cy = g.y0 + side * rp;
      ctx.strokeStyle = p.color; ctx.globalAlpha = 0.35; ctx.setLineDash([4, 5]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(g.bX0, cy, rp, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }

    // launch gun
    ctx.fillStyle = '#475569'; ctx.fillRect(g.x0 - W * 0.04, g.y0 - 7, W * 0.04, 14);
    drawArrow(ctx, g.x0, g.y0 - 20, g.x0 + 28, g.y0 - 20, '#f59e0b', 1.5);
    ctx.fillStyle = '#f59e0b'; ctx.textAlign = 'left'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(`v = ${sci(v(), 2)} m/s`, g.x0, g.y0 - 26);

    // trails and particles
    for (const p of state.particles) {
      if (p.trail.length > 1) {
        ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.beginPath();
        p.trail.forEach((q, i) => (i ? ctx.lineTo(q.px, q.py) : ctx.moveTo(q.px, q.py)));
        ctx.stroke();
      }
      const { px, py } = toPx(p);
      if (p.alive) {
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
        // force arrow
        const f = fieldsAt(px, py);
        const Fx = p.q * (p.vy * f.Bz), Fy = p.q * (f.Ey - p.vx * f.Bz);
        const Fm = Math.hypot(Fx, Fy);
        if (Fm > 0) drawArrow(ctx, px, py, px + 26 * Fx / Fm, py - 26 * Fy / Fm, '#22c55e', 2);
      }
      if (p.land) {
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(g.bX0 - 2, p.land.py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.textAlign = 'right'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
        const d = Math.abs(p.land.py - g.y0) / state.scale;
        ctx.fillText(`${p.name}  2r = ${fmtSI(d, 'm')}`, g.bX0 - 10, p.land.py + fs * 0.35);
      }
    }

    // scale bar
    const Lbar = niceScaleBar(W);
    const bx1 = W - 10, bx0 = bx1 - Lbar * state.scale, by = H - 12;
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx1, by); ctx.moveTo(bx0, by - 4); ctx.lineTo(bx0, by + 4); ctx.moveTo(bx1, by - 4); ctx.lineTo(bx1, by + 4); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'right'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(fmtSI(Lbar, 'm', 1), bx1, by - 6);

    // readout (top-left)
    ctx.textAlign = 'left'; ctx.font = `${fs}px system-ui, sans-serif`;
    const p0 = state.particles[0];
    let ty = lh;
    const line = (txt, color = '#e2e8f0') => { ctx.fillStyle = color; ctx.fillText(txt, 8, ty); ty += lh; };
    if (p0) {
      const r = p0.q === 0 ? Infinity : p0.m * v() / (Math.abs(p0.q) * B());
      const period = p0.q === 0 ? Infinity : 2 * Math.PI * p0.m / (Math.abs(p0.q) * B());
      line(`${p0.name}: q = ${sci(p0.q, 3)} C, m = ${sci(p0.m, 3)} kg`, '#cbd5e1');
      line(`r = mv/(qB) = ${Number.isFinite(r) ? fmtSI(r, 'm') : T('∞ (no force)', '∞ (tanpa gaya)')}`, '#fbbf24');
      line(`F = qvB = ${fmtSI(Math.abs(p0.q) * v() * B(), 'N')}   T = 2πm/(qB) = ${fmtSI(period, 's')}`, '#94a3b8');
      if (state.particles.length > 1) {
        for (let i = 1; i < state.particles.length; i++) {
          const p = state.particles[i];
          line(`${p.name}: r = ${fmtSI(p.m * v() / (Math.abs(p.q) * B()), 'm')}`, p.color);
        }
      }
    }
    ctx.textAlign = 'left';
  }

  // ---- controls ----------------------------------------------------------
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const presetSel = select({
    label: 'Particle', key: 'particle', value: params.preset,
    options: PRESETS.map((p) => ({ value: p.id, label: p.label[lang] })),
    onChange: (id) => {
      params.preset = id;
      const p = PRESETS.find((x) => x.id === id);
      params.logV = Math.log10(p.v); vS.value = params.logV;
      params.logB = Math.log10(p.B); bS.value = params.logB;
      const custom = id === 'custom';
      qS.el.style.display = custom ? '' : 'none'; mS.el.style.display = custom ? '' : 'none';
      if (p.selector) { params.selector = true; selT.value = true; params.logE = Math.log10(p.v * p.B); eS.value = params.logE; eRow.style.display = ''; }
      launch();
    },
  });
  const qS = slider({ label: 'Custom charge q (× e)', key: 'q-e', min: -5, max: 5, step: 1, value: params.qe, format: (x) => (x > 0 ? '+' : '') + x + ' e', onInput: (x) => { params.qe = x; launch(); } });
  const mS = slider({ label: 'Custom mass m', key: 'log-m-u', min: -3.5, max: 2.5, step: 0.05, value: params.logM, format: (x) => fmtSI(10 ** x * U_KG, 'kg', 2) + ` (${(10 ** x).toPrecision(3)} u)`, onInput: (x) => { params.logM = x; launch(); } });
  qS.el.style.display = 'none'; mS.el.style.display = 'none';
  const vS = slider({ label: 'Speed v (m/s)', key: 'log-v', min: 4, max: 7.5, step: 0.05, value: params.logV, format: (x) => sci(10 ** x, 2), onInput: (x) => { params.logV = x; launch(); } });
  const bS = slider({ label: 'Field B (T)', key: 'log-b', min: -3, max: 0.3, step: 0.05, value: params.logB, format: (x) => fmtSI(10 ** x, 'T', 2), onInput: (x) => { params.logB = x; launch(); } });
  const dirT = toggle({ label: 'B out of page (· ) / into page (×)', key: 'b-out', value: true, onChange: (on) => { params.bOut = on; launch(); } });
  const fitT = toggle({ label: 'Auto-fit view', key: 'autofit', value: true, onChange: (on) => { params.autoFit = on; if (on) launch(); } });
  const selT = toggle({ label: 'Velocity selector (E ⟂ B)', key: 'selector', value: false, onChange: (on) => { params.selector = on; eRow.style.display = on ? '' : 'none'; launch(); } });
  const eS = slider({ label: 'Field E (V/m)', key: 'log-e', min: 1, max: 7.5, step: 0.05, value: params.logE, format: (x) => sci(10 ** x, 2), onInput: (x) => { params.logE = x; launch(); } });
  const tuneB = button({ label: 'Set E = vB', onClick: () => { params.logE = clamp(Math.log10(v() * B()), 1, 7.5); eS.value = params.logE; launch(); } });
  const eRow = document.createElement('div');
  eRow.append(eS.el, row(tuneB));
  eRow.style.display = 'none';
  const fireB = button({ label: 'Fire again', primary: true, onClick: launch });
  ctrlPanel.append(presetSel.el, qS.el, mS.el, vS.el, bS.el, row(dirT, fitT), row(selT, fireB), eRow);

  const lab = labPanel({
    title: 'Lorentz force lab — radius vs v, B, q, m',
    filename: 'lorentz-force-data.csv',
    columns: [
      { key: 'name', label: 'Particle' },
      { key: 'q', label: 'q (C)', format: (x) => x.toExponential(3) },
      { key: 'm', label: 'm (kg)', format: (x) => x.toExponential(3) },
      { key: 'v', label: 'v (m/s)', format: (x) => x.toExponential(2) },
      { key: 'B', label: 'B (T)', format: (x) => x.toPrecision(3) },
      { key: 'r', label: 'r = mv/(qB) (m)', format: (x) => x.toExponential(3) },
      { key: 'period', label: 'T (s)', format: (x) => x.toExponential(3) },
    ],
    procedure: [
      'Pick the proton, B = 0.10 T. Record r at v = 1×10⁵, 2×10⁵, 4×10⁵ m/s. Is r ∝ v?',
      'Keep v = 1×10⁵ m/s. Record r at B = 0.05, 0.10, 0.20, 0.40 T. Is r ∝ 1/B?',
      'At the same v and B, record the proton and the alpha particle. Explain the ratio of radii using q and m.',
      'Record the electron at the same v and B. Compare its radius with the proton: what ratio do you expect?',
      'Load a mass-spectrometer preset and record each isotope; check that the landing distance on the detector is 2r.',
    ],
    predict: 'If you double the speed of the proton, what happens to the radius? And to the time for one full circle?',
    source: () => {
      const p = state.particles[0];
      if (!p || p.q === 0) return null;
      const r = p.m * v() / (Math.abs(p.q) * B());
      return { name: p.name, q: p.q, m: p.m, v: v(), B: B(), r, period: 2 * Math.PI * p.m / (Math.abs(p.q) * B()) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  launch();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
