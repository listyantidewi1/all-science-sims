import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const EPS0 = 8.85e-12;          // F/m
const E_BREAK_AIR = 3e6;        // V/m
const DIELECTRICS = [
  { id: 'air', k: 1.0006, label: { en: 'Air (κ = 1.0006)', id: 'Udara (κ = 1,0006)' }, color: 'rgba(148,163,184,0.08)' },
  { id: 'paper', k: 3.7, label: { en: 'Paper (κ = 3.7)', id: 'Kertas (κ = 3,7)' }, color: 'rgba(250,204,21,0.22)' },
  { id: 'glass', k: 6.0, label: { en: 'Glass (κ = 6.0)', id: 'Kaca (κ = 6,0)' }, color: 'rgba(56,189,248,0.22)' },
  { id: 'water', k: 80.4, label: { en: 'Water (κ = 80.4)', id: 'Air murni (κ = 80,4)' }, color: 'rgba(59,130,246,0.35)' },
];

function fmtSI(v, unit, digits = 3) {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a === 0) return `0 ${unit}`;
  const table = [[1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'μ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f']];
  for (const [f, p] of table) if (a >= f * 0.9995) {
    const n = v / f;
    // toPrecision would print 100 with 2 digits as "1.0e+2"; never show an exponent here
    return `${Math.abs(n) >= 10 ** digits ? n.toFixed(0) : n.toPrecision(digits)} ${p}${unit}`;
  }
  return `${v.toExponential(2)} ${unit}`;
}

/** 4 significant figures without scientific notation (lab table). */
function fmtNum(v) {
  if (!Number.isFinite(v)) return '—';
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e4) return v.toFixed(0);
  if (a < 1e-3) return v.toExponential(3);
  return Number(v.toPrecision(4)).toString();
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { A_cm2: 100, d_mm: 1.0, diel: 'air', V: 100, rc: false, logR: 6 };
  // RC state: physical time t (s), capacitor voltage follows analytic solution from (Vstart, target)
  const rc = { t: 0, Vstart: 0, target: 0, running: false, trace: [] };

  const diel = () => DIELECTRICS.find((d) => d.id === params.diel) || DIELECTRICS[0];
  function calc() {
    const A = params.A_cm2 * 1e-4, d = params.d_mm * 1e-3, k = diel().k;
    const C = k * EPS0 * A / Math.max(d, 1e-9);
    const R = 10 ** params.logR;
    const tau = R * C;
    const Vc = params.rc ? rcVoltage() : params.V;
    const Q = C * Vc, U = 0.5 * C * Vc * Vc, E = Vc / Math.max(d, 1e-9);
    const I = params.rc ? (rc.target - Vc) / R : 0;
    return { A, d, k, C, R, tau, Vc, Q, U, E, I };
  }
  function rcVoltage() {
    const { tau } = tauOnly();
    const x = tau > 0 ? rc.t / tau : 1e9;
    return rc.target + (rc.Vstart - rc.target) * Math.exp(-Math.min(x, 700));
  }
  function tauOnly() {
    const A = params.A_cm2 * 1e-4, d = params.d_mm * 1e-3, k = diel().k;
    const C = k * EPS0 * A / Math.max(d, 1e-9);
    return { C, tau: 10 ** params.logR * C };
  }
  function startRC(target) {
    rc.Vstart = params.rc ? rcVoltage() : 0;
    rc.target = target;
    rc.t = 0;
    rc.running = true;
    rc.trace = [];
  }
  function resetRC() { rc.Vstart = 0; rc.target = 0; rc.t = 0; rc.running = false; rc.trace = []; }

  function step(dt) {
    if (!params.rc || !rc.running) return;
    const { tau } = tauOnly();
    rc.t += dt * tau;                       // one τ per real second
    const Vc = rcVoltage();
    rc.trace.push({ t: rc.t, V: Vc });
    if (rc.trace.length > 1200) rc.trace.shift();
    if (rc.t > 6.5 * tau) rc.running = false;
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

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const c = calc();
    const fs = clamp(W * 0.024, 10, 14);
    const lh = fs * 1.4;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // ---- left: capacitor side view --------------------------------------
    const leftW = W * 0.54;
    const cx = leftW * 0.5;
    const plateW = leftW * (0.35 + 0.4 * (Math.sqrt(params.A_cm2) - Math.sqrt(10)) / (Math.sqrt(1000) - Math.sqrt(10)));
    const gap = H * (0.08 + 0.3 * (Math.log10(params.d_mm) + 1) / 2);     // 0.1 mm → 0.08H, 10 mm → 0.38H
    const plateT = clamp(H * 0.025, 6, 14);
    const midY = H * 0.46;
    const topY = midY - gap / 2 - plateT, botY = midY + gap / 2;
    const x0 = cx - plateW / 2, x1 = cx + plateW / 2;

    // dielectric
    ctx.fillStyle = diel().color; ctx.fillRect(x0, topY + plateT, plateW, gap);
    // field lines, density ∝ E
    const nLines = clamp(Math.round(c.E / 2.5e4), 0, 40);
    if (nLines > 0 && gap > 14) {
      for (let i = 0; i < nLines; i++) {
        const x = x0 + plateW * (i + 0.5) / nLines;
        drawArrow(ctx, x, topY + plateT + 3, x, botY - 3, 'rgba(245,158,11,0.85)', 1.3);
      }
    }
    // plates
    const pos = c.Vc >= 0;
    ctx.fillStyle = pos ? '#ef4444' : '#3b82f6'; ctx.fillRect(x0, topY, plateW, plateT);
    ctx.fillStyle = pos ? '#3b82f6' : '#ef4444'; ctx.fillRect(x0, botY, plateW, plateT);
    // charges: count ∝ Q (κ·E), capped
    const nQ = clamp(Math.round(c.E / 2.5e4 * Math.min(c.k, 12)), 0, 60);
    ctx.fillStyle = '#fff'; ctx.font = `bold ${Math.max(8, plateT * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < nQ; i++) {
      const x = x0 + plateW * (i + 0.5) / nQ;
      ctx.fillText('+', x, topY + plateT / 2 + 0.5);
      ctx.fillText('−', x, botY + plateT / 2 + 0.5);
    }
    ctx.textBaseline = 'alphabetic';
    // dimension labels
    ctx.strokeStyle = 'rgba(148,163,184,0.7)'; ctx.lineWidth = 1; ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.beginPath(); ctx.moveTo(x0, topY - fs); ctx.lineTo(x1, topY - fs); ctx.moveTo(x0, topY - fs - 4); ctx.lineTo(x0, topY - fs + 4); ctx.moveTo(x1, topY - fs - 4); ctx.lineTo(x1, topY - fs + 4); ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(`A = ${params.A_cm2} cm²`, cx, topY - fs * 1.4);
    const dx = x1 + fs * 0.9;
    ctx.beginPath(); ctx.moveTo(dx, topY + plateT); ctx.lineTo(dx, botY); ctx.moveTo(dx - 4, topY + plateT); ctx.lineTo(dx + 4, topY + plateT); ctx.moveTo(dx - 4, botY); ctx.lineTo(dx + 4, botY); ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillText(`d = ${params.d_mm.toFixed(1)} mm`, dx + 6, midY + fs * 0.35);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(`κ = ${c.k}`, x0 + 6, botY - 6);
    ctx.textAlign = 'right';
    ctx.fillText(T('not to scale', 'tidak sesuai skala'), leftW - 8, H - 8);

    // circuit wires: battery (and resistor) to the left of the plates
    const wx = leftW * 0.08;
    // battery half-height: never taller than the wire gap, so the symbol stays between the two wires
    const bh = Math.min(H * 0.08, (botY - topY) / 2 - 2);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x0, topY + plateT / 2); ctx.lineTo(wx, topY + plateT / 2); ctx.lineTo(wx, midY - bh);
    ctx.moveTo(x0, botY + plateT / 2); ctx.lineTo(wx, botY + plateT / 2); ctx.lineTo(wx, midY + bh);
    ctx.stroke();
    // battery symbol
    const bl = H * 0.028;
    ctx.beginPath();
    ctx.moveTo(wx - bl, midY - bh); ctx.lineTo(wx + bl, midY - bh);
    ctx.moveTo(wx - bl * 0.5, midY - bh + 6); ctx.lineTo(wx + bl * 0.5, midY - bh + 6);
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
    ctx.fillText(`${params.rc ? 'V₀' : 'V'} = ${params.V} V`, wx + bl + 4, midY + fs * 0.35);
    if (params.rc) {
      // resistor zigzag on the top wire
      const rx0 = wx + (x0 - wx) * 0.35, rx1 = wx + (x0 - wx) * 0.65, ry = topY + plateT / 2;
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(rx0, ry); ctx.lineTo(rx1, ry); ctx.stroke();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx0, ry);
      const n = 6, seg = (rx1 - rx0) / n;
      for (let i = 0; i < n; i++) ctx.lineTo(rx0 + seg * (i + 0.5), ry + (i % 2 ? 6 : -6));
      ctx.lineTo(rx1, ry); ctx.stroke();
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'center';
      ctx.fillText(`R = ${fmtSI(c.R, 'Ω', 3)}`, (rx0 + rx1) / 2, ry - 10);
      // switch state / current arrow
      if (rc.running && Math.abs(c.I) > 1e-15) {
        const dir = c.I > 0 ? 1 : -1;
        const ax = wx + (x0 - wx) * 0.85;
        drawArrow(ctx, ax - dir * 12, ry + 12, ax + dir * 12, ry + 12, '#22c55e', 2);
        ctx.fillStyle = '#22c55e'; ctx.textAlign = 'right';
        ctx.fillText(`I = ${fmtSI(c.I, 'A')}`, x0 - 6, ry + 12 + fs);
      }
    } else {
      // gap between battery and the lower wire (the "connected" state is implied)
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left';
    }
    ctx.lineWidth = 1;

    // ---- right: readouts and graph ----------------------------------------
    const rx = leftW + W * 0.03, rw = W - rx - W * 0.03;
    ctx.textAlign = 'left'; ctx.font = `${fs}px system-ui, sans-serif`;
    let ty = lh;
    const line = (txt, color = '#e2e8f0') => { ctx.fillStyle = color; ctx.fillText(txt, rx, ty); ty += lh; };
    line(`C = κε₀A/d = ${fmtSI(c.C, 'F')}`, '#fbbf24');
    const narrow = rw < 330;
    if (narrow) { line(`ε₀ = 8.85×10⁻¹² F/m`, '#94a3b8'); line(`A = ${c.A.toExponential(2)} m², d = ${c.d.toExponential(1)} m`, '#94a3b8'); }
    else line(`ε₀ = 8.85×10⁻¹² F/m, A = ${c.A.toExponential(2)} m², d = ${c.d.toExponential(1)} m`, '#94a3b8');
    line(`Q = CV = ${fmtSI(c.Q, 'C')}`);
    line(`E = V/d = ${fmtSI(c.E, 'V/m')}` + (c.E > E_BREAK_AIR && params.diel === 'air' ? '  ' + T('⚠ air breaks down!', '⚠ udara tembus!') : ''), c.E > E_BREAK_AIR && params.diel === 'air' ? '#ef4444' : '#e2e8f0');
    line(`U = ½CV² = ${fmtSI(c.U, 'J')}`);
    if (params.rc) {
      if (narrow) { line(`τ = RC = ${fmtSI(c.tau, 's')}`, '#38bdf8'); line(`V_C = ${c.Vc.toFixed(2)} V   t = ${fmtSI(rc.t, 's')}`, '#38bdf8'); }
      else line(`τ = RC = ${fmtSI(c.tau, 's')}   V_C = ${c.Vc.toFixed(2)} V   t = ${fmtSI(rc.t, 's')}`, '#38bdf8');
      // graph
      const gx = rx, gy = ty + fs * 0.6, gw = rw, gh = H - gy - fs * 2.6;
      if (gh > 30) drawGraph(ctx, c, gx, gy, gw, gh, fs);
    } else {
      // energy bar relative to 1 mJ log scale? show simple bars: C, Q, U as log bars with values
      const gx = rx, gy = ty + fs * 0.8, gw = rw;
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
      ctx.fillText(T('Stored energy (log scale, 1 pJ … 1 J)', 'Energi tersimpan (skala log, 1 pJ … 1 J)'), gx, gy);
      const frac = clamp((Math.log10(Math.max(c.U, 1e-13)) + 12) / 12, 0, 1);
      ctx.fillStyle = '#1e293b'; ctx.fillRect(gx, gy + 8, gw, fs * 1.1);
      ctx.fillStyle = '#22c55e'; ctx.fillRect(gx, gy + 8, gw * frac, fs * 1.1);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(fmtSI(c.U, 'J'), gx + 4, gy + 8 + fs * 0.85);
      let yy = gy + fs * 3.2;
      ctx.fillStyle = '#94a3b8';
      const notes = [
        T('• Double A → C doubles. Halve d → C doubles.', '• Gandakan A → C dua kali. Perkecil d setengah → C dua kali.'),
        T('• Dielectric κ → C and Q grow ×κ; E = V/d unchanged.', '• Dielektrik κ → C dan Q naik ×κ; E = V/d tetap.'),
        T('• Double V → Q doubles, U quadruples.', '• Gandakan V → Q dua kali, U empat kali.'),
        T('• Field-line count ∝ E; ± count ∝ Q.', '• Jumlah garis medan ∝ E; jumlah ± ∝ Q.'),
      ];
      for (const n of notes) { if (yy < H - fs) ctx.fillText(n, gx, yy); yy += lh; }
    }
    ctx.textAlign = 'left';
  }

  function drawGraph(ctx, c, gx, gy, gw, gh, fs) {
    const tau = c.tau, tMax = 6 * tau, Vmax = Math.max(params.V, rc.Vstart, 1);
    const X = (t) => gx + clamp(t / tMax, 0, 1) * gw;
    const Y = (V) => gy + gh - clamp(V / Vmax, 0, 1.05) * gh;
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.8}px system-ui, sans-serif`; ctx.textAlign = 'center';
    for (let i = 0; i <= 6; i++) { const x = X(i * tau); ctx.beginPath(); ctx.moveTo(x, gy + gh); ctx.lineTo(x, gy + gh + 4); ctx.stroke(); ctx.fillText(i === 0 ? '0' : `${i}τ`, x, gy + gh + fs); }
    ctx.textAlign = 'left';
    ctx.fillText(`V (V)   ${T('t axis in units of τ', 'sumbu t dalam satuan τ')} = ${fmtSI(tau, 's')}`, gx + 4, gy - 4);
    // V0 line and 63% marker
    ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(148,163,184,0.5)';
    ctx.beginPath(); ctx.moveTo(gx, Y(params.V)); ctx.lineTo(gx + gw, Y(params.V)); ctx.stroke();
    const V63 = rc.target + (rc.Vstart - rc.target) * Math.exp(-1);
    ctx.strokeStyle = 'rgba(56,189,248,0.7)';
    ctx.beginPath(); ctx.moveTo(X(tau), gy + gh); ctx.lineTo(X(tau), Y(V63)); ctx.lineTo(gx, Y(V63)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'left';
    ctx.fillText(`${rc.target > rc.Vstart ? '63%' : '37%'}: ${V63.toFixed(1)} V`, X(tau) + 4, Y(V63) - 3);
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right'; ctx.fillText(`V₀ = ${params.V} V`, gx + gw - 2, Y(params.V) - 3);
    // theoretical curve for the current run
    if (rc.trace.length || rc.running) {
      ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i <= 100; i++) { const t = tMax * i / 100; const V = rc.target + (rc.Vstart - rc.target) * Math.exp(-t / Math.max(tau, 1e-30)); i ? ctx.lineTo(X(t), Y(V)) : ctx.moveTo(X(t), Y(V)); }
      ctx.stroke();
    }
    // live trace
    if (rc.trace.length > 1) {
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.beginPath();
      rc.trace.forEach((p, i) => { i ? ctx.lineTo(X(p.t), Y(p.V)) : ctx.moveTo(X(p.t), Y(p.V)); });
      ctx.stroke();
      const last = rc.trace[rc.trace.length - 1];
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(X(last.t), Y(last.V), 4, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#64748b'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
      ctx.fillText(T('Press Charge to start', 'Tekan Charge untuk mulai'), gx + gw / 2, gy + gh / 2);
    }
    ctx.textAlign = 'left';
  }

  // ---- controls ----------------------------------------------------------
  const aS = slider({ label: 'Plate area A (cm²)', key: 'area-cm2', min: 10, max: 1000, step: 10, value: params.A_cm2, onInput: (v) => { params.A_cm2 = v; } });
  const dS = slider({ label: 'Gap d (mm)', key: 'gap-mm', min: 0.1, max: 10, step: 0.1, value: params.d_mm, format: (v) => v.toFixed(1), onInput: (v) => { params.d_mm = v; } });
  const kSel = select({
    label: 'Dielectric', key: 'dielectric', value: params.diel,
    options: DIELECTRICS.map((d) => ({ value: d.id, label: d.label[getLocale() === 'id' ? 'id' : 'en'] })),
    onChange: (v) => { params.diel = v; },
  });
  const vS = slider({ label: 'Battery V (V)', key: 'volts', min: 0, max: 400, step: 1, value: params.V, onInput: (v) => { params.V = v; if (params.rc && rc.running && rc.target > 0) startRC(v); } });
  const rcT = toggle({ label: 'RC charging mode', key: 'rc', value: false, onChange: (v) => { params.rc = v; rcRow.style.display = v ? '' : 'none'; rS.el.style.display = v ? '' : 'none'; resetRC(); } });
  const rS = slider({ label: 'Resistor R', key: 'log-r', min: 3, max: 8, step: 0.1, value: params.logR, format: (v) => fmtSI(10 ** v, 'Ω', 2), onInput: (v) => { params.logR = v; } });
  const chargeB = button({ label: 'Charge', primary: true, onClick: () => { if (params.rc) startRC(params.V); } });
  const dischargeB = button({ label: 'Discharge', onClick: () => { if (params.rc) startRC(0); } });
  const resetB = button({ label: 'Reset', onClick: resetRC });
  const rcRow = row(chargeB, dischargeB, resetB);
  rcRow.style.display = 'none'; rS.el.style.display = 'none';
  ctrlPanel.append(aS.el, dS.el, kSel.el, vS.el, row(rcT), rS.el, rcRow);

  const lab = labPanel({
    title: 'Capacitor lab — what sets C?',
    filename: 'capacitor-data.csv',
    columns: [
      { key: 'A', label: 'A (cm²)', format: (v) => v.toFixed(0) },
      { key: 'd', label: 'd (mm)', format: (v) => v.toFixed(1) },
      { key: 'k', label: 'κ', format: (v) => v.toFixed(1) },
      { key: 'V', label: 'V (V)', format: (v) => v.toFixed(0) },
      { key: 'C', label: 'C (pF)', format: fmtNum },
      { key: 'Q', label: 'Q (nC)', format: fmtNum },
      { key: 'U', label: 'U (μJ)', format: fmtNum },
      { key: 'tau', label: 'τ = RC (μs)', format: fmtNum },
    ],
    procedure: [
      'Air, d = 1.0 mm, V = 100 V. Record C at A = 100, 200, 400 and 800 cm². Is C ∝ A?',
      'A = 200 cm². Record C at d = 0.5, 1.0, 2.0 and 4.0 mm. Is C ∝ 1/d?',
      'A = 200 cm², d = 1.0 mm. Record for air, paper, glass and water. Divide each C by the air value: do you get κ?',
      'Keep one capacitor and record at V = 50, 100, 200 V. How do Q and U scale with V?',
      'Switch on RC mode with R = 1 MΩ. Record τ for two different capacitors and check τ = R × C.',
    ],
    predict: 'If you double the plate area AND double the gap, what happens to C? What happens to the stored energy if you double only V?',
    source: () => {
      const c = calc();
      if (!Number.isFinite(c.C)) return null;
      return { A: params.A_cm2, d: params.d_mm, k: c.k, V: params.V, C: c.C * 1e12, Q: c.C * params.V * 1e9, U: 0.5 * c.C * params.V * params.V * 1e6, tau: c.tau * 1e6 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
