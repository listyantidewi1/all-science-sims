import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Molar masses in g/mol; solubility in g per litre of water at ~20 °C.
const SOLUTES = {
  nacl:    { name: 'NaCl',     label: 'NaCl (table salt)',          Mr: 58.44,  tint: null,           dot: '#e2e8f0', solubility: 360 },
  glucose: { name: 'C₆H₁₂O₆',  label: 'Glucose C₆H₁₂O₆',            Mr: 180.16, tint: null,           dot: '#fde68a', solubility: 900 },
  cuso4:   { name: 'CuSO₄',    label: 'CuSO₄ (copper(II) sulfate)', Mr: 159.61, tint: [37, 110, 235], dot: '#93c5fd', solubility: 200 },
};
const VOLUMES = [100, 250, 500, 1000];
const PHASES = { idle: 0, draw: 1.1, move: 1.1, release: 1.1, fill: 1.6, done: 0 };

// Fixed pseudo-random points (unit square) reused every frame for the particle view.
const DOTS = (() => {
  const out = [];
  let seed = 12345;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (let i = 0; i < 600; i++) out.push({ x: rnd(), y: rnd() });
  return out;
})();

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { solute: 'nacl', mass: 5.85, V: 1000, V1: 25, V2: 250 };
  const anim = { phase: 'idle', t: 0 };
  let M2 = null; // result of the last completed dilution (mol/L)

  const sol = () => SOLUTES[p.solute];
  const massMax = () => sol().solubility * p.V / 1000;          // g that can dissolve
  const dissolved = () => Math.min(p.mass, massMax());
  const nStock = () => dissolved() / sol().Mr;                    // mol
  const M1 = () => nStock() / (p.V / 1000);                       // mol/L
  const M2theory = () => (M1() * p.V1) / p.V2;

  function resetDilution() { anim.phase = 'idle'; anim.t = 0; M2 = null; }

  function step(dt) {
    if (anim.phase === 'idle' || anim.phase === 'done') return;
    anim.t += dt;
    const dur = PHASES[anim.phase];
    if (anim.t >= dur) {
      anim.t = 0;
      const order = ['draw', 'move', 'release', 'fill', 'done'];
      anim.phase = order[order.indexOf(anim.phase) + 1];
      if (anim.phase === 'done') M2 = M2theory();
    }
  }
  const prog = () => (PHASES[anim.phase] ? Math.min(1, anim.t / PHASES[anim.phase]) : 1);
  const ease = (x) => x * x * (3 - 2 * x);

  // ---- colour model --------------------------------------------------------
  function liquidColor(M) {
    const t = sol().tint;
    if (!t) return 'rgba(140,190,240,0.30)';
    const a = 1 - Math.exp(-Math.max(0, M) * 2.2);           // 0.1 M → 0.20, 1 M → 0.89
    return `rgba(${t[0]},${t[1]},${t[2]},${(0.22 + 0.78 * a).toFixed(3)})`;
  }

  // ---- geometry ------------------------------------------------------------
  function flaskGeom(cx, V) {
    const W = cv.width, H = cv.height;
    const sMax = Math.min(H * 0.17, W * 0.11);
    const s = sMax * Math.cbrt(V / 1000);
    const floor = H * 0.9;
    const bc = floor - s * 0.88;             // bulb centre
    const neckW = s * 0.42;
    const a = neckW / 2;
    const dy = Math.sqrt(Math.max(1, s * s - a * a));
    const joinY = bc - dy;
    const neckH = s * 1.35;
    const neckTop = joinY - neckH;
    const markY = neckTop + neckH * 0.35;
    return { cx, s, bc, floor, neckW, a, dy, joinY, neckTop, markY, V };
  }
  function flaskPath(ctx, g) {
    const { cx, s, bc, a, dy, neckTop } = g;
    const leftJoin = Math.atan2(-dy, -a);
    const rightJoin = Math.atan2(-dy, a);
    const fl = Math.asin(0.88);
    ctx.beginPath();
    ctx.moveTo(cx - a, neckTop);
    ctx.lineTo(cx - a, bc - dy);
    ctx.arc(cx, bc, s, leftJoin, Math.PI - fl, true);
    ctx.lineTo(cx + s * Math.cos(fl), bc + s * 0.88);
    ctx.arc(cx, bc, s, fl, rightJoin, true);
    ctx.lineTo(cx + a, neckTop);
    ctx.closePath();
  }
  // Liquid surface height for a fraction f (0..1) of the flask's nominal volume.
  const levelY = (g, f) => g.floor - Math.max(0, Math.min(1, f)) * (g.floor - g.markY);

  function drawFlask(ctx, g, fillFrac, color, M, label) {
    const { cx, s, floor, neckW, neckTop, markY } = g;
    // liquid
    if (fillFrac > 0) {
      ctx.save();
      flaskPath(ctx, g); ctx.clip();
      const ly = levelY(g, fillFrac);
      ctx.fillStyle = color;
      ctx.fillRect(cx - s - 2, ly, 2 * s + 4, floor - ly + 2);
      // particle view for every solute: dot density ∝ molarity
      const sMax = Math.min(cv.height * 0.17, cv.width * 0.11);
      const n = Math.min(DOTS.length, Math.round(260 * Math.min(M, 2) * (s / sMax) * (s / sMax)));
      ctx.fillStyle = sol().dot;
      const r = Math.max(1.2, s * 0.035);
      for (let i = 0; i < n; i++) {
        const d = DOTS[i];
        const x = cx - s + d.x * 2 * s;
        const y = ly + d.y * (floor - ly);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      // surface highlight
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(cx - s - 2, ly, 2 * s + 4, 2);
      ctx.restore();
    }
    // glass
    flaskPath(ctx, g);
    ctx.strokeStyle = 'rgba(226,232,240,0.85)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // calibration mark
    ctx.strokeStyle = '#f8fafc';
    ctx.beginPath(); ctx.moveTo(cx - neckW / 2 - 6, markY); ctx.lineTo(cx + neckW / 2 + 6, markY); ctx.stroke();
    const fs = Math.max(10, Math.min(14, cv.width / 48));
    ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'left';
    ctx.fillText(`${g.V} mL`, cx + neckW / 2 + 9, markY + fs * 0.35);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(label, cx, floor + fs * 1.4);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('stopper', 'tutup'), cx, neckTop - 4);
  }

  function drawPipette(ctx, x, tipY, len, fillFrac, color) {
    const w = Math.max(6, cv.width * 0.014);
    const top = tipY - len;
    // bulb
    ctx.fillStyle = '#334155';
    ctx.beginPath(); ctx.arc(x, top - w * 1.3, w * 1.5, 0, Math.PI * 2); ctx.fill();
    // tube
    ctx.fillStyle = 'rgba(226,232,240,0.18)';
    ctx.fillRect(x - w / 2, top, w, len);
    if (fillFrac > 0) {
      const h = len * 0.75 * fillFrac;
      ctx.fillStyle = color;
      ctx.fillRect(x - w / 2 + 1, tipY - h, w - 2, h);
    }
    ctx.strokeStyle = 'rgba(226,232,240,0.9)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x - w / 2, top, w, len);
    // graduation line
    ctx.beginPath(); ctx.moveTo(x - w, tipY - len * 0.75); ctx.lineTo(x + w, tipY - len * 0.75); ctx.stroke();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';

    const gS = flaskGeom(W * 0.2, p.V);
    const gD = flaskGeom(W * 0.8, p.V2);
    const s = sol();
    const m1 = M1();
    const ph = anim.phase;
    const pr = ease(prog());

    // ---- stock flask (fraction of liquid removed by pipette is tiny; keep it full) ----
    const undissolved = p.mass > massMax() + 1e-9;
    drawFlask(ctx, gS, 1, liquidColor(m1), m1, T('stock solution', 'larutan induk'));
    if (undissolved) {
      // solid heap at the bottom
      ctx.fillStyle = s.tint ? '#3b82f6' : '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(gS.cx, gS.floor - 3, gS.s * 0.45, gS.s * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // ---- dilution flask ----
    let dFrac = 0, dColor = liquidColor(0), dM = 0;
    const v1 = p.V1 / p.V2; // fraction of V2 that is the stock aliquot
    if (ph === 'release') { dFrac = v1 * pr; dM = m1; dColor = liquidColor(m1); }
    else if (ph === 'fill') {
      dFrac = v1 + (1 - v1) * pr;
      const volNow = dFrac * p.V2;                     // mL now in the flask
      dM = (m1 * p.V1) / Math.max(volNow, 1e-6);        // moles fixed, volume growing
      dColor = liquidColor(dM);
    } else if (ph === 'done') { dFrac = 1; dM = M2theory(); dColor = liquidColor(dM); }
    drawFlask(ctx, gD, dFrac, dColor, dM, T('diluted solution', 'larutan encer'));

    // water stream during fill
    if (ph === 'fill') {
      ctx.fillStyle = 'rgba(147,197,253,0.6)';
      const ly = levelY(gD, dFrac);
      ctx.fillRect(gD.cx - 2, gD.neckTop - H * 0.08, 4, ly - gD.neckTop + H * 0.08);
    }

    // ---- pipette ----
    const len = H * 0.34;
    if (ph === 'draw') drawPipette(ctx, gS.cx, gS.markY + gS.s * 0.3, len, pr, liquidColor(m1));
    else if (ph === 'move') {
      const x = gS.cx + (gD.cx - gS.cx) * pr;
      const lift = Math.sin(pr * Math.PI) * H * 0.12;
      drawPipette(ctx, x, gS.neckTop - 6 - lift, len, 1, liquidColor(m1));
    } else if (ph === 'release') drawPipette(ctx, gD.cx, gD.neckTop - 6, len, 1 - pr, liquidColor(m1));
    else if (ph === 'idle') {
      // hint arrow
      ctx.strokeStyle = 'rgba(148,163,184,0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(W * 0.33, H * 0.42); ctx.lineTo(W * 0.66, H * 0.42); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(148,163,184,0.5)';
      ctx.beginPath(); ctx.moveTo(W * 0.68, H * 0.42); ctx.lineTo(W * 0.66, H * 0.40); ctx.lineTo(W * 0.66, H * 0.44); ctx.fill();
    }

    // ---- readouts ----
    const fs = Math.max(10, Math.min(15, W / 44));
    ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.textAlign = 'left';
    const lx = W * 0.03;
    let y = fs * 1.5;
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`${s.name}: Mr = ${s.Mr} g/mol`, lx, y); y += fs * 1.4;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`n = m / Mr = ${dissolved().toFixed(2)} g / ${s.Mr} = ${fmt(nStock())} mol`, lx, y); y += fs * 1.4;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`M₁ = n / V = ${fmt(nStock())} / ${(p.V / 1000).toFixed(3)} L = ${fmt(m1)} mol/L`, lx, y); y += fs * 1.4;
    if (undissolved) {
      ctx.fillStyle = '#f87171';
      ctx.fillText(T(`Saturated: only ${massMax().toFixed(1)} g dissolves in ${p.V} mL`, `Jenuh: hanya ${massMax().toFixed(1)} g larut dalam ${p.V} mL`), lx, y);
      y += fs * 1.4;
    }

    // right-hand block: dilution
    const rx = W * 0.97;
    ctx.textAlign = 'right';
    y = fs * 1.5;
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(T('Dilution', 'Pengenceran') + `: V₁ = ${p.V1} mL → V₂ = ${p.V2} mL`, rx, y); y += fs * 1.4;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${T('moles taken', 'mol yang dipipet')} = M₁V₁ = ${fmt(m1 * p.V1 / 1000)} mol`, rx, y); y += fs * 1.4;
    if (ph === 'done') {
      ctx.fillStyle = '#34d399';
      ctx.fillText(`M₂ = M₁V₁ / V₂ = ${fmt(m1)} × ${p.V1} / ${p.V2} = ${fmt(M2)} mol/L`, rx, y); y += fs * 1.4;
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(T(`diluted ${(p.V2 / p.V1).toFixed(1)}×`, `diencerkan ${(p.V2 / p.V1).toFixed(1)}×`), rx, y);
    } else if (ph === 'fill') {
      ctx.fillStyle = '#34d399';
      ctx.fillText(`M = ${fmt(dM)} mol/L ${T('(water being added)', '(air ditambahkan)')}`, rx, y);
    } else {
      ctx.fillStyle = '#64748b';
      ctx.fillText(T('press "Pipette & dilute"', 'tekan "Pipet & encerkan"'), rx, y);
    }
    ctx.textAlign = 'left';
  }
  function fmt(x) {
    if (!Number.isFinite(x)) return '—';
    if (x === 0) return '0';
    if (x < 0.01) return x.toExponential(2);
    return x.toFixed(x < 1 ? 4 : 3);
  }

  // ---- controls --------------------------------------------------------------
  const soluteSel = select({
    label: 'Solute', key: 'solute',
    options: Object.entries(SOLUTES).map(([value, s]) => ({ value, label: s.label })),
    value: p.solute,
    onChange: (v) => { p.solute = v; resetDilution(); },
  });
  const massS = slider({
    label: 'Mass of solute (g)', key: 'mass', min: 0.5, max: 120, step: 0.05, value: p.mass,
    format: (v) => v.toFixed(2),
    onInput: (v) => { p.mass = v; resetDilution(); },
  });
  const volSel = select({
    label: 'Volumetric flask V (mL)', key: 'v',
    options: VOLUMES.map((v) => ({ value: String(v), label: `${v} mL` })),
    value: String(p.V),
    onChange: (v) => { p.V = Number(v); resetDilution(); },
  });
  const v1S = slider({
    label: 'Pipette V₁ (mL)', key: 'v1', min: 1, max: 100, step: 1, value: p.V1,
    onInput: (v) => { p.V1 = v; resetDilution(); },
  });
  const v2Sel = select({
    label: 'Dilution flask V₂ (mL)', key: 'v2',
    options: VOLUMES.map((v) => ({ value: String(v), label: `${v} mL` })),
    value: String(p.V2),
    onChange: (v) => { p.V2 = Number(v); resetDilution(); },
  });
  const goB = button({
    label: 'Pipette & dilute', primary: true,
    onClick: () => { if (anim.phase === 'idle' || anim.phase === 'done') { M2 = null; anim.phase = 'draw'; anim.t = 0; } },
  });
  const resetB = button({ label: 'Reset dilution', onClick: resetDilution });
  ctrlPanel.append(soluteSel.el, massS.el, volSel.el, v1S.el, v2Sel.el, row(goB, resetB));

  const lab = labPanel({
    title: 'Molarity lab — making and diluting a standard solution',
    filename: 'molarity-dilution-data.csv',
    columns: [
      { key: 'solute', label: 'Solute' },
      { key: 'mass',   label: 'm (g)',       format: (v) => v.toFixed(2) },
      { key: 'n',      label: 'n (mol)',     format: (v) => v.toFixed(4) },
      { key: 'V',      label: 'V (mL)',      format: (v) => v.toFixed(0) },
      { key: 'M1',     label: 'M₁ (mol/L)',  format: (v) => v.toFixed(4) },
      { key: 'V1',     label: 'V₁ (mL)',     format: (v) => v.toFixed(0) },
      { key: 'V2',     label: 'V₂ (mL)',     format: (v) => v.toFixed(0) },
      { key: 'M2',     label: 'M₂ (mol/L)',  format: (v) => v == null ? '–' : v.toFixed(4) },
    ],
    procedure: [
      'Choose NaCl, 1000 mL flask. Set the mass to 5.85 g: M₁ should read 0.100 mol/L. Record.',
      'Keep the mass, switch to the 250 mL flask. Predict M₁ before you look, then record.',
      'Switch to CuSO₄ and set 0.10, 0.50 and 1.00 mol/L in a 500 mL flask (compute the mass first). Record each; note how the colour deepens.',
      'Pipette V₁ = 25 mL of a 1.00 mol/L stock into a 250 mL flask. Press "Pipette & dilute", wait for the fill, record M₂.',
      'Repeat with V₁ = 50 mL and V₂ = 1000 mL. Check M₁V₁ = M₂V₂ for every row.',
    ],
    predict: 'If you take 25 mL of a 1.0 mol/L solution and dilute it to 250 mL, what will the new molarity be? Does the number of moles change?',
    source: () => ({
      solute: sol().name,
      mass: dissolved(),
      n: nStock(),
      V: p.V,
      M1: M1(),
      V1: p.V1,
      V2: p.V2,
      M2: anim.phase === 'done' ? M2 : null,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
