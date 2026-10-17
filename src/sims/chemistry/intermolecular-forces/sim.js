import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Real data: molar mass (g/mol), boiling point at 1 atm (°C), dipole moment (D), hydrogen bonding.
// force: dominant intermolecular force — 'hbond', 'dipole', 'dispersion'.
const MOLECULES = [
  { id: 'CH4',   f: 'CH₄',   name: ['Methane', 'Metana'],            M: 16.04,  bp: -161.5, mu: 0,    force: 'dispersion' },
  { id: 'C2H6',  f: 'C₂H₆',  name: ['Ethane', 'Etana'],              M: 30.07,  bp: -88.6,  mu: 0,    force: 'dispersion' },
  { id: 'C3H8',  f: 'C₃H₈',  name: ['Propane', 'Propana'],           M: 44.10,  bp: -42.1,  mu: 0.08, force: 'dispersion' },
  { id: 'HCl',   f: 'HCl',   name: ['Hydrogen chloride', 'Hidrogen klorida'], M: 36.46, bp: -85.0, mu: 1.08, force: 'dipole' },
  { id: 'HBr',   f: 'HBr',   name: ['Hydrogen bromide', 'Hidrogen bromida'],  M: 80.91, bp: -66.8, mu: 0.82, force: 'dipole' },
  { id: 'HI',    f: 'HI',    name: ['Hydrogen iodide', 'Hidrogen iodida'],    M: 127.91, bp: -35.4, mu: 0.44, force: 'dipole' },
  { id: 'H2O',   f: 'H₂O',   name: ['Water', 'Air'],                 M: 18.02,  bp: 100.0,  mu: 1.85, force: 'hbond' },
  { id: 'NH3',   f: 'NH₃',   name: ['Ammonia', 'Amonia'],            M: 17.03,  bp: -33.3,  mu: 1.47, force: 'hbond' },
  { id: 'HF',    f: 'HF',    name: ['Hydrogen fluoride', 'Hidrogen fluorida'], M: 20.01, bp: 19.5, mu: 1.83, force: 'hbond' },
  { id: 'CH3OH', f: 'CH₃OH', name: ['Methanol', 'Metanol'],          M: 32.04,  bp: 64.7,   mu: 1.69, force: 'hbond' },
  { id: 'CO2',   f: 'CO₂',   name: ['Carbon dioxide', 'Karbon dioksida'], M: 44.01, bp: -78.5, mu: 0, force: 'dispersion', note: ['sublimes at 1 atm; −78.5 °C is the sublimation point', 'menyublim pada 1 atm; −78,5 °C adalah titik sublimasi'] },
  { id: 'Ne',    f: 'Ne',    name: ['Neon', 'Neon'],                 M: 20.18,  bp: -246.1, mu: 0,    force: 'dispersion' },
  { id: 'Ar',    f: 'Ar',    name: ['Argon', 'Argon'],               M: 39.95,  bp: -185.8, mu: 0,    force: 'dispersion' },
];
// Hydride boiling points (°C) by group and period, for the trend chart.
const HYDRIDES = [
  { group: 14, color: '#94a3b8', pts: [['CH₄', 2, -161.5], ['SiH₄', 3, -111.8], ['GeH₄', 4, -88.1], ['SnH₄', 5, -52.0]] },
  { group: 15, color: '#60a5fa', pts: [['NH₃', 2, -33.3], ['PH₃', 3, -87.7], ['AsH₃', 4, -62.5], ['SbH₃', 5, -17.0]] },
  { group: 16, color: '#f87171', pts: [['H₂O', 2, 100.0], ['H₂S', 3, -60.3], ['H₂Se', 4, -41.3], ['H₂Te', 5, -2.0]] },
  { group: 17, color: '#4ade80', pts: [['HF', 2, 19.5], ['HCl', 3, -85.0], ['HBr', 4, -66.8], ['HI', 5, -35.4]] },
];
const FORCE_COLOR = { hbond: '#f87171', dipole: '#fbbf24', dispersion: '#38bdf8' };
const R_GAS = 8.314;
const N_PART = 36;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const L = getLocale() === 'id' ? 1 : 0;
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = { mol: MOLECULES[6], temp: 25, chart: 'hydrides', links: true, now: 0 };
  // Particles live in box coordinates [0,1]². Liquid molecules sit near a home slot at the bottom.
  const parts = Array.from({ length: N_PART }, (_, i) => ({
    i, x: 0, y: 0, vx: 0, vy: 0, gas: false, hx: 0, hy: 0, ph: i * 1.7, lerp: 1,
  }));
  // Deterministic pseudo-random (no Math.random streams that could differ across frames).
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  function homes() {
    // 3 rows × 12 columns hex-ish packing at the bottom of the box
    const cols = 12, rows = 3;
    parts.forEach((p, k) => {
      const r = Math.floor(k / cols), c = k % cols;
      p.hx = (c + 0.5 + (r % 2) * 0.5) / (cols + 0.5);
      p.hy = 1 - (r + 0.6) * 0.11;
    });
  }
  function resetParticles() {
    homes();
    for (const p of parts) { p.x = p.hx; p.y = p.hy; p.gas = false; p.lerp = 1; p.vx = 0; p.vy = 0; }
    state.gasCount = 0;
  }
  resetParticles();

  const Tk = () => state.temp + 273.15;
  const bpK = () => state.mol.bp + 273.15;
  const vrms = () => Math.sqrt(3 * R_GAS * Math.max(Tk(), 0.01) / (state.mol.M / 1000)); // m/s
  // Target fraction of molecules in the gas phase: all above bp, a small vapour below.
  function gasTarget() {
    const dT = state.temp - state.mol.bp;
    if (dT >= 0) return 1;
    return 0.12 * Math.exp(dT / 40);
  }

  function step(dt) {
    const target = Math.round(gasTarget() * N_PART);
    let gasN = parts.reduce((s, p) => s + (p.gas ? 1 : 0), 0);
    const rate = clamp(Math.abs(state.temp - state.mol.bp) / 15 + 0.5, 0.5, 6); // molecules per second changing phase
    if (gasN < target && rnd() < rate * dt) {
      // evaporate: the liquid molecule nearest the surface (smallest y among liquids)
      let best = null;
      for (const p of parts) if (!p.gas && (!best || p.hy < best.hy || (p.hy === best.hy && rnd() < 0.5))) best = p;
      if (best) {
        best.gas = true; best.lerp = 1;
        const sp = 0.25 + 0.5 * Math.sqrt(Tk() / 300) * Math.sqrt(18 / state.mol.M);
        const a = -Math.PI / 2 + (rnd() - 0.5) * 1.6;
        best.vx = Math.cos(a) * sp; best.vy = Math.sin(a) * sp;
      }
    } else if (gasN > target && rnd() < rate * dt) {
      // condense: the lowest gas molecule returns to its home slot
      let best = null;
      for (const p of parts) if (p.gas && (!best || p.y > best.y)) best = p;
      if (best) { best.gas = false; best.lerp = 0; }
    }
    const jit = 0.012 * Math.sqrt(clamp(Tk() / bpK(), 0, 1.2)); // thermal jiggle in the liquid
    const speedScale = 0.45 * Math.sqrt(Tk() / 300) * Math.sqrt(18 / state.mol.M); // box widths per second, ∝ v_rms
    for (const p of parts) {
      if (p.gas) {
        const v = Math.hypot(p.vx, p.vy) || 1e-6;
        const want = speedScale * (0.7 + 0.6 * ((p.i * 37) % 11) / 10);
        const f = 1 + (want / v - 1) * Math.min(1, dt * 2); // relax speed toward kinetic-theory value
        p.vx *= f; p.vy *= f;
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0.03) { p.x = 0.03; p.vx = Math.abs(p.vx); }
        if (p.x > 0.97) { p.x = 0.97; p.vx = -Math.abs(p.vx); }
        if (p.y < 0.04) { p.y = 0.04; p.vy = Math.abs(p.vy); }
        if (p.y > 0.96) { p.y = 0.96; p.vy = -Math.abs(p.vy); }
      } else {
        const tx = p.hx + Math.sin(state.now * 3.1 + p.ph) * jit, ty = p.hy + Math.cos(state.now * 2.3 + p.ph * 1.3) * jit;
        if (p.lerp < 1) { p.lerp = Math.min(1, p.lerp + dt * 1.5); p.x += (tx - p.x) * Math.min(1, dt * 4); p.y += (ty - p.y) * Math.min(1, dt * 4); }
        else { p.x = tx; p.y = ty; }
      }
    }
  }

  // ---------- drawing ----------
  function drawMolecule(ctx, x, y, r, mol) {
    const col = FORCE_COLOR[mol.force];
    if (mol.mu > 0.3) {
      // polar: two-tone circle, δ− darker side
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, Math.PI / 2, 3 * Math.PI / 2); ctx.fill();
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2); ctx.fill();
    } else {
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawBox(ctx, X, Y, Wb, Hb) {
    const mol = state.mol, fs = Math.max(10, Math.round(cv.width * 0.018));
    ctx.fillStyle = '#111a2e'; ctx.fillRect(X, Y, Wb, Hb);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5; ctx.strokeRect(X, Y, Wb, Hb);
    const r = clamp(Wb * 0.018 * Math.cbrt(mol.M / 18), Wb * 0.014, Wb * 0.034);
    // attraction links between neighbouring liquid molecules
    if (state.links) {
      ctx.lineWidth = mol.force === 'hbond' ? 2 : 1;
      ctx.strokeStyle = mol.force === 'hbond' ? 'rgba(248,113,113,0.7)' : (mol.force === 'dipole' ? 'rgba(251,191,36,0.5)' : 'rgba(56,189,248,0.35)');
      ctx.setLineDash(mol.force === 'hbond' ? [4, 3] : [2, 3]);
      ctx.beginPath();
      for (let a = 0; a < N_PART; a++) {
        const p = parts[a]; if (p.gas) continue;
        for (let b = a + 1; b < N_PART; b++) {
          const q = parts[b]; if (q.gas) continue;
          const dx = (p.x - q.x) * Wb, dy = (p.y - q.y) * Hb, d = Math.hypot(dx, dy);
          if (d < r * 3.2 && d > 0) { ctx.moveTo(X + p.x * Wb, Y + p.y * Hb); ctx.lineTo(X + q.x * Wb, Y + q.y * Hb); }
        }
      }
      ctx.stroke(); ctx.setLineDash([]);
    }
    for (const p of parts) drawMolecule(ctx, X + p.x * Wb, Y + p.y * Hb, r, mol);
    // Labels
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = `${fs}px system-ui, sans-serif`;
    const gasN = parts.reduce((s, p) => s + (p.gas ? 1 : 0), 0);
    const phase = state.temp >= mol.bp ? T('gas', 'gas') : (gasN > 0 ? T('liquid + vapour', 'cairan + uap') : T('liquid', 'cairan'));
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${mol.f}  ·  T = ${state.temp.toFixed(0)} °C  ·  ${phase}`, X + 8, Y + fs * 1.4);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T(`v_rms = √(3RT/M) = ${vrms().toFixed(0)} m/s`, `v_rms = √(3RT/M) = ${vrms().toFixed(0)} m/s`), X + 8, Y + fs * 2.8);
    ctx.fillText(T(`boiling point ${mol.bp.toFixed(1)} °C (${(mol.bp + 273.15).toFixed(0)} K)`, `titik didih ${mol.bp.toFixed(1)} °C (${(mol.bp + 273.15).toFixed(0)} K)`), X + 8, Y + fs * 4.2);
    // Thermometer strip at the right edge of the box
    const tx = X + Wb - 14, ty0 = Y + Hb * 0.12, ty1 = Y + Hb * 0.88;
    const yOf = (t) => ty1 - (ty1 - ty0) * clamp((t + 270) / 420, 0, 1);
    ctx.fillStyle = 'rgba(148,163,184,0.25)'; ctx.fillRect(tx - 3, ty0, 6, ty1 - ty0);
    ctx.fillStyle = state.temp >= mol.bp ? '#f87171' : '#60a5fa'; ctx.fillRect(tx - 3, yOf(state.temp), 6, ty1 - yOf(state.temp));
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx - 9, yOf(mol.bp)); ctx.lineTo(tx + 9, yOf(mol.bp)); ctx.stroke();
    ctx.textAlign = 'right'; ctx.fillStyle = '#fff'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.fillText(T('b.p.', 't.d.'), tx - 11, yOf(mol.bp) + 4);
  }

  function drawChart(ctx, X, Y, Wc, Hc) {
    const fs = Math.max(10, Math.round(cv.width * 0.017));
    const padL = fs * 3.2, padB = fs * 2.6, padT = fs * 2.2, padR = fs * 1.2;
    const x0 = X + padL, x1 = X + Wc - padR, y0 = Y + padT, y1 = Y + Hc - padB;
    const tMin = -270, tMax = 120;
    const yOf = (t) => y1 - (y1 - y0) * clamp((t - tMin) / (tMax - tMin), 0, 1);
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
    ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (let t = -250; t <= 100; t += 50) {
      ctx.beginPath(); ctx.moveTo(x0, yOf(t)); ctx.lineTo(x1, yOf(t)); ctx.stroke();
      ctx.fillText(`${t}`, x0 - 4, yOf(t));
    }
    ctx.save(); ctx.translate(X + fs * 0.9, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center';
    ctx.fillText(T('boiling point (°C)', 'titik didih (°C)'), 0, 0); ctx.restore();
    // current temperature line
    ctx.strokeStyle = state.temp >= state.mol.bp ? 'rgba(248,113,113,0.8)' : 'rgba(96,165,250,0.8)'; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x0, yOf(state.temp)); ctx.lineTo(x1, yOf(state.temp)); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left'; ctx.fillStyle = ctx.strokeStyle;
    ctx.fillText(`T = ${state.temp.toFixed(0)} °C`, x0 + 4, yOf(state.temp) - fs * 0.7);
    ctx.textBaseline = 'alphabetic';
    if (state.chart === 'hydrides') {
      const xOf = (per) => x0 + (x1 - x0) * ((per - 2) / 3 * 0.84 + 0.08);
      ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
      for (let p = 2; p <= 5; p++) ctx.fillText(`${p}`, xOf(p), y1 + fs * 1.3);
      ctx.fillText(T('period of the central atom', 'periode atom pusat'), (x0 + x1) / 2, y1 + fs * 2.4);
      ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px system-ui, sans-serif`;
      ctx.fillText(T('Boiling points of the group 14–17 hydrides', 'Titik didih hidrida golongan 14–17'), (x0 + x1) / 2, Y + fs * 1.2);
      ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      for (const s of HYDRIDES) {
        ctx.strokeStyle = s.color; ctx.lineWidth = 2; ctx.beginPath();
        s.pts.forEach(([, per, bp], i) => { const x = xOf(per), y = yOf(bp); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
        ctx.stroke();
        // dashed "expected" extrapolation from period 3 back to period 2 for groups 15–17
        if (s.group !== 14) {
          const [, , b3] = s.pts[1], [, , b4] = s.pts[2];
          const expected = b3 - (b4 - b3);
          ctx.setLineDash([3, 4]); ctx.strokeStyle = s.color; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(xOf(3), yOf(b3)); ctx.lineTo(xOf(2), yOf(expected)); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(xOf(2), yOf(expected), 3, 0, Math.PI * 2); ctx.stroke();
        }
        s.pts.forEach(([lab, per, bp]) => {
          const x = xOf(per), y = yOf(bp);
          const sel = state.mol.f === lab;
          ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(x, y, sel ? 6 : 3.5, 0, Math.PI * 2); ctx.fill();
          if (sel) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }
          ctx.fillStyle = sel ? '#fff' : s.color; ctx.textAlign = per === 2 ? 'right' : 'left';
          ctx.fillText(lab, x + (per === 2 ? -8 : 8), y + (s.group === 15 && per > 2 ? fs : -fs * 0.4));
        });
      }
      ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
      ctx.fillText(T('dashed: value expected from the dispersion trend alone', 'putus-putus: nilai yang diharapkan dari tren dispersi saja'), x0 + 4, Y + fs * 2.3);
    } else {
      const mMax = 140;
      const xOf = (M) => x0 + (x1 - x0) * clamp(M / mMax, 0, 1);
      ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
      for (let m = 0; m <= 140; m += 20) ctx.fillText(`${m}`, xOf(m), y1 + fs * 1.3);
      ctx.fillText(T('molar mass (g/mol)', 'massa molar (g/mol)'), (x0 + x1) / 2, y1 + fs * 2.4);
      ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px system-ui, sans-serif`;
      ctx.fillText(T('Boiling point vs molar mass', 'Titik didih vs massa molar'), (x0 + x1) / 2, Y + fs * 1.2);
      ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      // dispersion-only trend: connect the non-polar molecules in order of M
      const np = MOLECULES.filter((m) => m.force === 'dispersion').sort((a, b) => a.M - b.M);
      ctx.strokeStyle = 'rgba(56,189,248,0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath();
      np.forEach((m, i) => { if (i === 0) ctx.moveTo(xOf(m.M), yOf(m.bp)); else ctx.lineTo(xOf(m.M), yOf(m.bp)); }); ctx.stroke(); ctx.setLineDash([]);
      for (const m of MOLECULES) {
        const x = xOf(m.M), y = yOf(m.bp), sel = m === state.mol;
        ctx.fillStyle = FORCE_COLOR[m.force]; ctx.beginPath(); ctx.arc(x, y, sel ? 6.5 : 4, 0, Math.PI * 2); ctx.fill();
        if (sel) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }
        ctx.fillStyle = sel ? '#fff' : FORCE_COLOR[m.force]; ctx.textAlign = 'left';
        const dy = (m.id === 'Ne' || m.id === 'C2H6' || m.id === 'HCl' || m.id === 'NH3') ? fs * 1.1 : -fs * 0.5;
        ctx.fillText(m.f, x + 7, y + dy);
      }
      // legend
      ctx.textAlign = 'left'; let lx = x0 + 4, ly = Y + fs * 2.3;
      for (const [k, lab] of [['hbond', T('hydrogen bonding', 'ikatan hidrogen')], ['dipole', T('dipole–dipole', 'dipol–dipol')], ['dispersion', T('dispersion only', 'dispersi saja')]]) {
        ctx.fillStyle = FORCE_COLOR[k]; ctx.fillRect(lx, ly - fs * 0.7, fs * 0.7, fs * 0.7);
        ctx.fillStyle = '#94a3b8'; ctx.fillText(lab, lx + fs, ly); lx += ctx.measureText(lab).width + fs * 2;
      }
    }
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = Math.max(10, Math.round(W * 0.018));
    const mol = state.mol;
    // Header card
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.4)}px system-ui, sans-serif`;
    ctx.fillText(`${mol.f} — ${mol.name[L]}`, W * 0.02, H * 0.07);
    ctx.font = `${fs}px system-ui, sans-serif`; ctx.fillStyle = '#cbd5e1';
    const forceName = { hbond: T('hydrogen bonding (+ dipole–dipole + dispersion)', 'ikatan hidrogen (+ dipol–dipol + dispersi)'), dipole: T('dipole–dipole (+ dispersion)', 'dipol–dipol (+ dispersi)'), dispersion: T('London dispersion only', 'dispersi London saja') }[mol.force];
    ctx.fillText(`M = ${mol.M.toFixed(2)} g/mol  ·  μ = ${mol.mu.toFixed(2)} D  ·  ${mol.mu > 0.3 ? T('polar', 'polar') : T('non-polar', 'nonpolar')}`, W * 0.02, H * 0.07 + fs * 1.6);
    ctx.fillStyle = FORCE_COLOR[mol.force];
    ctx.fillText(T('Dominant force: ', 'Gaya dominan: ') + forceName, W * 0.02, H * 0.07 + fs * 3.2);
    if (mol.note) { ctx.fillStyle = '#fbbf24'; ctx.font = `italic ${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.fillText(mol.note[L], W * 0.02, H * 0.07 + fs * 4.7); }
    // Particle box (left) and chart (right)
    drawBox(ctx, W * 0.02, H * 0.26, W * 0.42, H * 0.7);
    drawChart(ctx, W * 0.46, H * 0.2, W * 0.52, H * 0.78);
  }

  // ---------- controls ----------
  const molSel = select({
    label: T('Molecule', 'Molekul'), key: 'molecule',
    options: MOLECULES.map((m) => ({ value: m.id, label: `${m.f} — ${m.name[L]} (M ${m.M.toFixed(1)}, b.p. ${m.bp.toFixed(1)} °C)` })),
    value: state.mol.id, onChange: (v) => { state.mol = MOLECULES.find((m) => m.id === v) || MOLECULES[0]; },
  });
  const tempS = slider({ label: T('Temperature (°C) — heat it', 'Suhu (°C) — panaskan'), key: 'temp', min: -270, max: 150, step: 1, value: state.temp, format: (v) => `${v} °C`, onInput: (v) => { state.temp = v; } });
  const chartSel = select({
    label: T('Chart', 'Grafik'), key: 'chart',
    options: [{ value: 'hydrides', label: T('Hydride trends (groups 14–17)', 'Tren hidrida (golongan 14–17)') }, { value: 'mass', label: T('Boiling point vs molar mass', 'Titik didih vs massa molar') }],
    value: 'hydrides', onChange: (v) => { state.chart = v; },
  });
  const linksT = toggle({ label: T('Show attractions', 'Tampilkan tarikan'), key: 'links', value: true, onChange: (v) => { state.links = v; } });
  const toBp = button({ label: T('Set T just below b.p.', 'Atur T tepat di bawah t.d.'), onClick: () => tempS.apply(Math.round(state.mol.bp - 10)) });
  const toBp2 = button({ label: T('Set T just above b.p.', 'Atur T tepat di atas t.d.'), onClick: () => tempS.apply(Math.round(state.mol.bp + 10)) });
  const resetB = button({ label: T('Condense all', 'Kondensasi semua'), onClick: resetParticles });
  ctrlPanel.append(row(molSel, chartSel), tempS.el, row(toBp, toBp2, resetB, linksT));

  const lab = labPanel({
    title: 'Intermolecular forces lab — what sets the boiling point?',
    filename: 'intermolecular-forces-data.csv',
    columns: [
      { key: 'molecule', label: 'Molecule' },
      { key: 'M', label: 'M (g/mol)', format: (v) => v.toFixed(2) },
      { key: 'mu', label: 'μ (D)', format: (v) => v.toFixed(2) },
      { key: 'force', label: 'Dominant force' },
      { key: 'bp', label: 'b.p. (°C)', format: (v) => v.toFixed(1) },
      { key: 'temp', label: 'T (°C)', format: (v) => v.toFixed(0) },
      { key: 'vrms', label: 'v_rms (m/s)', format: (v) => v.toFixed(0) },
      { key: 'phase', label: 'Phase' },
    ],
    procedure: [
      'Series 1 (dispersion vs size): record CH₄, C₂H₆, C₃H₈. How does b.p. change as M grows, with no dipole?',
      'Series 2 (noble gases): record Ne and Ar. Same trend?',
      'Series 3 (hydrogen halides): record HCl, HBr, HI. The dipole moment falls but the b.p. rises — which force wins?',
      'Series 4 (hydrogen bonding): record H₂O, HF, NH₃ and CH₃OH. Compare H₂O (M = 18) with CH₄ (M = 16) and Ne (M = 20).',
      'Switch the chart to "Hydride trends". For groups 15–17, estimate the b.p. the period-2 hydride "should" have from the dashed line, and how far above it the real value sits.',
      'Set T = 25 °C and record every molecule\'s phase. Which are gases at room temperature, and why?',
    ],
    predict: 'H₂O (M = 18) and CH₄ (M = 16) have almost the same molar mass. Predict which boils higher and by roughly how many degrees, and name the force responsible.',
    source: () => ({
      molecule: state.mol.f, M: state.mol.M, mu: state.mol.mu,
      force: { hbond: 'hydrogen bonding', dipole: 'dipole-dipole', dispersion: 'dispersion' }[state.mol.force],
      bp: state.mol.bp, temp: state.temp, vrms: vrms(), phase: state.temp >= state.mol.bp ? 'gas' : 'liquid',
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
