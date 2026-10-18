import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MAX_N = 20;

// Number formatting that never shows NaN/Infinity and stays short.
function fmt(v, d = 2) {
  if (!Number.isFinite(v)) return '—';
  const a = Math.abs(v);
  if (a >= 1e9) return v.toExponential(2);
  if (a >= 1e5) return Math.round(v).toLocaleString('en-US');
  if (Number.isInteger(v)) return String(v);
  if (a < 0.005) return v.toPrecision(3);        // tiny terms such as 3·0.5^19 must not print as 0.00
  return v.toFixed(d);
}
function fmtRp(v) {
  if (!Number.isFinite(v)) return '—';
  const s = Math.round(v).toLocaleString('en-US');
  return 'Rp ' + (getLocale() === 'id' ? s.replace(/,/g, '.') : s);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = {
    mode: 'arith',      // 'arith' | 'geom' | 'finance'
    a: 3, d: 2, r: 1.5, n: 8,
    showSums: true,
    fin: 'interest',    // 'interest' | 'annuity'
    P: 10,              // principal, millions of Rp
    rate: 6,            // % per period
    periods: 10,
  };

  // ---- sequence maths ------------------------------------------------
  function term(k) {
    return p.mode === 'geom' ? p.a * Math.pow(p.r, k - 1) : p.a + (k - 1) * p.d;
  }
  function partialSum(k) {
    if (p.mode === 'geom') {
      if (Math.abs(p.r - 1) < 1e-9) return k * p.a;
      return p.a * (1 - Math.pow(p.r, k)) / (1 - p.r);
    }
    return (k / 2) * (2 * p.a + (k - 1) * p.d);
  }
  function terms() {
    const out = [];
    for (let k = 1; k <= p.n; k++) out.push(term(k));
    return out;
  }
  // ---- finance maths -------------------------------------------------
  const principal = () => p.P * 1e6;
  const i = () => p.rate / 100;
  const simpleAt = (t) => principal() * (1 + i() * t);
  const compoundAt = (t) => principal() * Math.pow(1 + i(), t);
  function payment() {
    const P = principal(), r = i(), n = p.periods;
    if (r < 1e-9) return P / n;
    const g = Math.pow(1 + r, n);
    return P * r * g / (g - 1);
  }
  function schedule() {
    const A = payment(), r = i();
    let bal = principal();
    const rows = [];
    for (let t = 1; t <= p.periods; t++) {
      const interest = bal * r;
      const princ = A - interest;
      bal = Math.max(0, bal - princ);
      rows.push({ t, A, interest, princ, bal });
    }
    return rows;
  }

  // ---- drawing helpers -----------------------------------------------
  function font(px, bold = false) {
    return `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  }
  function mono(px) { return `${Math.round(px)}px ui-monospace, Menlo, Consolas, monospace`; }

  function drawHeader(ctx, W, H, lines) {
    const fs = Math.max(10, Math.min(15, W * 0.019));
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = font(fs, true);
    ctx.fillText(lines[0], W * 0.03, H * 0.07);
    ctx.font = mono(fs * 0.95);
    ctx.fillStyle = '#93c5fd';
    for (let k = 1; k < lines.length; k++) ctx.fillText(lines[k], W * 0.03, H * 0.07 + k * fs * 1.45);
  }

  function drawSequence(ctx, W, H) {
    const ts = terms();
    const sums = [];
    for (let k = 1; k <= p.n; k++) sums.push(partialSum(k));
    const un = ts[ts.length - 1], Sn = sums[sums.length - 1];
    const isG = p.mode === 'geom';
    const name = isG ? T('Geometric sequence', 'Barisan geometri') : T('Arithmetic sequence', 'Barisan aritmetika');
    const l1 = isG
      ? `u_n = a·r^(n−1) = ${fmt(p.a)}·${fmt(p.r)}^${p.n - 1} = ${fmt(un)}`
      : `u_n = a + (n−1)d = ${fmt(p.a)} + ${p.n - 1}·${fmt(p.d)} = ${fmt(un)}`;
    let l2 = isG
      ? (Math.abs(p.r - 1) < 1e-9 ? `S_n = n·a = ${p.n}·${fmt(p.a)} = ${fmt(Sn)}` : `S_n = a(1−rⁿ)/(1−r) = ${fmt(Sn)}`)
      : `S_n = n/2·(2a + (n−1)d) = ${p.n}/2·(${fmt(2 * p.a)} + ${p.n - 1}·${fmt(p.d)}) = ${fmt(Sn)}`;
    if (isG && Math.abs(p.r) < 1) l2 += `    S_∞ = a/(1−r) = ${fmt(p.a / (1 - p.r))}`;
    drawHeader(ctx, W, H, [`${name}:  a = ${fmt(p.a)},  ${isG ? 'r' : 'd'} = ${fmt(isG ? p.r : p.d)},  n = ${p.n}`, l1, l2]);

    const top = H * 0.26, bottom = H * 0.9;
    const fs = Math.max(9, Math.min(12, W * 0.015));

    // ---- bars (left) ----
    const bx0 = W * 0.04, bx1 = W * 0.5;
    let lo = Math.min(0, ...ts), hi = Math.max(0, ...ts);
    if (hi - lo < 1e-9) hi = lo + 1;
    const yB = (v) => bottom - ((v - lo) / (hi - lo)) * (bottom - top);
    const slot = (bx1 - bx0) / p.n;
    const bw = slot * 0.68;
    ctx.font = mono(fs);
    ctx.textAlign = 'center';
    ts.forEach((v, idx) => {
      const x = bx0 + slot * idx + (slot - bw) / 2;
      const y0 = yB(0), y1 = yB(v);
      ctx.fillStyle = idx === p.n - 1 ? '#f59e0b' : (isG ? '#a78bfa' : '#38bdf8');
      ctx.fillRect(x, Math.min(y0, y1), bw, Math.max(1, Math.abs(y1 - y0)));
      ctx.fillStyle = '#94a3b8';
      if (p.n <= 12 || (idx % 2 === 0 && idx < p.n - 2) || idx === p.n - 1) {
        ctx.fillText(`u${idx + 1}`, x + bw / 2, bottom + fs * 1.3);
        if (p.n <= 10) {
          // value label outside the bar end, moved inside when it would collide with the title or the axis labels
          let ly = v >= 0 ? y1 - 4 : y1 + fs;
          if (v >= 0 && ly < top + fs * 0.6) ly = y1 + fs;
          if (v < 0 && ly > bottom - 2) ly = y1 - 4;
          ctx.fillText(fmt(v, 1), x + bw / 2, ly);
        }
      }
    });
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(bx0, yB(0)); ctx.lineTo(bx1, yB(0)); ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'left'; ctx.font = font(fs);
    ctx.fillText(T('Terms as bars (u_n in orange)', 'Suku sebagai batang (u_n oranye)'), bx0, top - fs * 0.6);

    // ---- graph (right): points (k, u_k) and optionally (k, S_k) ----
    const gx0 = W * 0.58, gx1 = W * 0.97;
    const series = p.showSums ? [...ts, ...sums] : ts;
    let glo = Math.min(0, ...series), ghi = Math.max(0, ...series);
    if (ghi - glo < 1e-9) ghi = glo + 1;
    const yG = (v) => bottom - ((v - glo) / (ghi - glo)) * (bottom - top);
    const xG = (k) => gx0 + ((k - 0.5) / p.n) * (gx1 - gx0);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)';
    ctx.strokeRect(gx0, top, gx1 - gx0, bottom - top);
    ctx.strokeStyle = 'rgba(148,163,184,0.6)';
    ctx.beginPath(); ctx.moveTo(gx0, yG(0)); ctx.lineTo(gx1, yG(0)); ctx.stroke();
    // smooth guide for the underlying function (line or exponential)
    ctx.setLineDash([4, 4]); ctx.strokeStyle = isG ? 'rgba(167,139,250,0.5)' : 'rgba(56,189,248,0.5)';
    ctx.beginPath();
    for (let s = 0; s <= 60; s++) {
      const k = 1 + (s / 60) * (p.n - 1);
      const v = isG ? p.a * Math.pow(Math.abs(p.r), k - 1) * (p.r < 0 ? NaN : 1) : p.a + (k - 1) * p.d;
      if (!Number.isFinite(v)) { ctx.setLineDash([]); break; }
      const yy = Math.max(top - 2, Math.min(bottom + 2, yG(v)));
      if (s === 0) ctx.moveTo(xG(k), yy); else ctx.lineTo(xG(k), yy);
    }
    ctx.stroke(); ctx.setLineDash([]);
    const rad = Math.max(3, Math.min(6, (gx1 - gx0) / p.n * 0.18));
    if (p.showSums) {
      ctx.fillStyle = '#34d399';
      sums.forEach((v, idx) => { ctx.fillRect(xG(idx + 1) - rad, yG(v) - rad, rad * 2, rad * 2); });
    }
    ts.forEach((v, idx) => {
      ctx.fillStyle = idx === p.n - 1 ? '#f59e0b' : (isG ? '#a78bfa' : '#38bdf8');
      ctx.beginPath(); ctx.arc(xG(idx + 1), yG(v), rad, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = mono(fs); ctx.textAlign = 'center';
    for (let k = 1; k <= p.n; k++) if (p.n <= 12 || (k % 2 === 0 && k < p.n - 1) || k === p.n) ctx.fillText(String(k), xG(k), bottom + fs * 1.3);
    ctx.textAlign = 'right';
    ctx.fillText(fmt(ghi, 0), gx0 - 4, top + fs * 0.4);
    ctx.fillText(fmt(glo, 0), gx0 - 4, bottom);
    ctx.textAlign = 'left'; ctx.font = font(fs); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(T('Graph: ● u_k', 'Grafik: ● u_k') + (p.showSums ? T('   ■ S_k (partial sums)', '   ■ S_k (jumlah parsial)') : ''), gx0, top - fs * 0.6);
    ctx.fillStyle = '#64748b';
    ctx.fillText(T('k (term number)', 'k (nomor suku)'), (gx0 + gx1) / 2 - fs * 3, H * 0.985);
  }

  function drawInterest(ctx, W, H) {
    const n = p.periods, P = principal();
    const S = simpleAt(n), C = compoundAt(n);
    drawHeader(ctx, W, H, [
      T('Simple vs compound interest', 'Bunga tunggal vs bunga majemuk') + `:  M₀ = ${fmtRp(P)},  i = ${p.rate}% ${T('per period', 'per periode')},  n = ${n}`,
      `${T('Simple', 'Tunggal')}:    Mₙ = M₀(1 + i·n) = ${fmtRp(S)}   (${T('arithmetic, d =', 'aritmetika, b =')} ${fmtRp(P * i())})`,
      `${T('Compound', 'Majemuk')}:  Mₙ = M₀(1 + i)ⁿ = ${fmtRp(C)}   (${T('geometric, r =', 'geometri, r =')} ${(1 + i()).toFixed(3)})`,
    ]);
    const fs = Math.max(9, Math.min(12, W * 0.015));
    const hi = Math.max(C, S) * 1.05 || 1;
    ctx.font = mono(fs);
    const gx0 = W * 0.03 + ctx.measureText(fmtRp(hi)).width + 8;   // leave room for the longest Rp axis label
    const top = H * 0.27, bottom = H * 0.9, gx1 = W * 0.96;
    const xG = (t) => gx0 + (t / n) * (gx1 - gx0);
    const yG = (v) => bottom - (v / hi) * (bottom - top);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1;
    ctx.strokeRect(gx0, top, gx1 - gx0, bottom - top);
    // gridlines
    ctx.font = mono(fs); ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right';
    for (let g = 0; g <= 4; g++) {
      const v = (hi * g) / 4, y = yG(v);
      ctx.strokeStyle = 'rgba(148,163,184,0.15)';
      ctx.beginPath(); ctx.moveTo(gx0, y); ctx.lineTo(gx1, y); ctx.stroke();
      ctx.fillText(fmtRp(v), gx0 - 4, y + fs * 0.35);
    }
    ctx.textAlign = 'center';
    for (let t = 0; t <= n; t++) if (n <= 15 || t % 5 === 0) ctx.fillText(String(t), xG(t), bottom + fs * 1.3);
    // curves
    const drawCurve = (f, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
      for (let s = 0; s <= 100; s++) { const t = (s / 100) * n; const y = yG(f(t)); if (s === 0) ctx.moveTo(xG(t), y); else ctx.lineTo(xG(t), y); }
      ctx.stroke();
      ctx.fillStyle = color;
      for (let t = 0; t <= n; t++) { ctx.beginPath(); ctx.arc(xG(t), yG(f(t)), 4, 0, Math.PI * 2); ctx.fill(); }
    };
    drawCurve(simpleAt, '#38bdf8');
    drawCurve(compoundAt, '#f59e0b');
    // gap marker at n
    ctx.strokeStyle = '#34d399'; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(xG(n), yG(S)); ctx.lineTo(xG(n), yG(C)); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = font(fs); ctx.textAlign = 'right';
    ctx.fillStyle = '#34d399';
    ctx.fillText(T('difference', 'selisih') + ` ${fmtRp(C - S)}`, xG(n) - 6, (yG(S) + yG(C)) / 2);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8'; ctx.fillText('● ' + T('simple (straight line)', 'tunggal (garis lurus)'), gx0 + 8, top + fs * 1.4);
    ctx.fillStyle = '#f59e0b'; ctx.fillText('● ' + T('compound (exponential curve)', 'majemuk (kurva eksponensial)'), gx0 + 8, top + fs * 2.8);
    ctx.fillStyle = '#64748b'; ctx.textAlign = 'center';
    ctx.fillText(T('n (periods)', 'n (periode)'), (gx0 + gx1) / 2, H * 0.985);
  }

  function drawAnnuity(ctx, W, H) {
    const rows = schedule();
    const A = payment(), total = A * p.periods, P = principal();
    drawHeader(ctx, W, H, [
      T('Annuity / loan payment', 'Anuitas / angsuran pinjaman') + `:  M₀ = ${fmtRp(P)},  i = ${p.rate}%,  n = ${p.periods}`,
      `A = M₀·i / (1 − (1+i)^−n) = ${fmtRp(A)} ${T('per period', 'per periode')}`,
      `${T('Total paid', 'Total dibayar')} = n·A = ${fmtRp(total)}   ${T('Total interest', 'Total bunga')} = ${fmtRp(total - P)}`,
    ]);
    let fs = Math.max(8, Math.min(11.5, W * 0.0145));
    const top = H * 0.27, bottom = H * 0.95;
    // ---- table (left) ----
    const tx0 = W * 0.03, tx1 = W * 0.6;
    const cols = [T('Period', 'Periode'), T('Payment', 'Angsuran'), T('Interest', 'Bunga'), T('Principal', 'Pokok'), T('Balance', 'Sisa')];
    const cw = [(tx1 - tx0) * 0.12, (tx1 - tx0) * 0.22, (tx1 - tx0) * 0.22, (tx1 - tx0) * 0.22, (tx1 - tx0) * 0.22];
    // shrink the table font when large Rp amounts would not fit their columns
    ctx.font = mono(fs);
    const widest = Math.max(ctx.measureText(fmtRp(A)).width, ctx.measureText(fmtRp(P)).width) + 10;
    if (widest > cw[1]) fs = Math.max(7, fs * cw[1] / widest);
    const rowH = fs * 1.55;
    ctx.font = font(fs, true); ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'right';
    let x = tx0;
    cols.forEach((c, ci) => { x += cw[ci]; ctx.fillText(c, x - 4, top + fs); });
    ctx.strokeStyle = 'rgba(148,163,184,0.4)';
    ctx.beginPath(); ctx.moveTo(tx0, top + fs * 1.4); ctx.lineTo(tx1, top + fs * 1.4); ctx.stroke();
    const maxRows = Math.max(3, Math.floor((bottom - top - fs * 1.6) / rowH));
    let shown;
    if (rows.length <= maxRows) shown = rows;
    else shown = [...rows.slice(0, maxRows - 3), null, ...rows.slice(-2)];
    ctx.font = mono(fs);
    shown.forEach((r, ri) => {
      const y = top + fs * 1.4 + (ri + 1) * rowH;
      if (!r) { ctx.fillStyle = '#64748b'; ctx.textAlign = 'center'; ctx.fillText('⋯', (tx0 + tx1) / 2, y); ctx.textAlign = 'right'; return; }
      const vals = [String(r.t), fmtRp(r.A), fmtRp(r.interest), fmtRp(r.princ), fmtRp(r.bal)];
      const colors = ['#e2e8f0', '#e2e8f0', '#f87171', '#34d399', '#93c5fd'];
      let xx = tx0;
      vals.forEach((v, ci) => { xx += cw[ci]; ctx.fillStyle = colors[ci]; ctx.fillText(v, xx - 4, y); });
    });
    // ---- stacked bars (right): interest vs principal share of each payment ----
    const gx0 = W * 0.66, gx1 = W * 0.97, gtop = top + fs * 1.4, gbot = bottom - fs * 1.6;
    ctx.font = font(fs); ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'left';
    ctx.fillText(T('Each payment: interest vs principal', 'Setiap angsuran: bunga vs pokok'), gx0, top + fs);
    const slot = (gx1 - gx0) / p.periods, bw = Math.max(1, slot * 0.7);
    rows.forEach((r, idx) => {
      const xb = gx0 + slot * idx + (slot - bw) / 2;
      const hInt = A > 0 ? (r.interest / A) * (gbot - gtop) : 0;
      ctx.fillStyle = '#34d399'; ctx.fillRect(xb, gtop + hInt, bw, Math.max(0, gbot - gtop - hInt));
      ctx.fillStyle = '#f87171'; ctx.fillRect(xb, gtop, bw, Math.max(0, hInt));
    });
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.strokeRect(gx0, gtop, gx1 - gx0, gbot - gtop);
    ctx.fillStyle = '#94a3b8'; ctx.font = mono(fs); ctx.textAlign = 'center';
    ctx.fillText('1', gx0 + slot / 2, gbot + fs * 1.2);
    ctx.fillText(String(p.periods), gx1 - slot / 2, gbot + fs * 1.2);
    ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (p.mode === 'finance') { if (p.fin === 'annuity') drawAnnuity(ctx, W, H); else drawInterest(ctx, W, H); }
    else drawSequence(ctx, W, H);
    ctx.textAlign = 'left';
  }

  // ---- controls ------------------------------------------------------
  const modeS = select({
    label: 'Mode', key: 'mode', value: p.mode,
    options: [
      { value: 'arith', label: 'Arithmetic (a, d)' },
      { value: 'geom', label: 'Geometric (a, r)' },
      { value: 'finance', label: 'Finance (interest & annuity)' },
    ],
    onChange: (v) => { p.mode = v; syncVisibility(); },
  });
  const aS = slider({ label: 'First term a', key: 'a', min: -20, max: 20, step: 1, value: p.a, onInput: (v) => { p.a = v; } });
  const dS = slider({ label: 'Common difference d', key: 'd', min: -10, max: 10, step: 0.5, value: p.d, format: (v) => v.toFixed(1), onInput: (v) => { p.d = v; } });
  const rS = slider({ label: 'Common ratio r', key: 'r', min: -2, max: 3, step: 0.1, value: p.r, format: (v) => v.toFixed(1), onInput: (v) => { p.r = v; } });
  const nS = slider({ label: 'Number of terms n', key: 'n', min: 1, max: MAX_N, step: 1, value: p.n, onInput: (v) => { p.n = v; } });
  const sumT = toggle({ label: 'Show partial sums S_k on graph', key: 'sums', value: p.showSums, onChange: (v) => { p.showSums = v; } });
  const finS = select({
    label: 'Finance view', key: 'fin', value: p.fin,
    options: [{ value: 'interest', label: 'Simple vs compound interest' }, { value: 'annuity', label: 'Annuity / loan payments' }],
    onChange: (v) => { p.fin = v; },
  });
  const PS = slider({ label: 'Principal M₀ (million Rp)', key: 'principal', min: 1, max: 500, step: 1, value: p.P, onInput: (v) => { p.P = v; } });
  const rateS = slider({ label: 'Rate i (% per period)', key: 'rate', min: 0, max: 24, step: 0.5, value: p.rate, format: (v) => v.toFixed(1), onInput: (v) => { p.rate = v; } });
  const perS = slider({ label: 'Periods n', key: 'periods', min: 1, max: 36, step: 1, value: p.periods, onInput: (v) => { p.periods = v; } });

  ctrlPanel.append(modeS.el, aS.el, dS.el, rS.el, nS.el, row(sumT), finS.el, PS.el, rateS.el, perS.el);
  function syncVisibility() {
    const seq = p.mode !== 'finance';
    aS.el.style.display = seq ? '' : 'none';
    nS.el.style.display = seq ? '' : 'none';
    sumT.el.style.display = seq ? '' : 'none';
    dS.el.style.display = p.mode === 'arith' ? '' : 'none';
    rS.el.style.display = p.mode === 'geom' ? '' : 'none';
    for (const c of [finS, PS, rateS, perS]) c.el.style.display = seq ? 'none' : '';
  }
  syncVisibility();

  const lab = labPanel({
    title: 'Sequences lab — terms and sums',
    filename: 'sequences-series-data.csv',
    columns: [
      { key: 'type', label: 'Type' },
      { key: 'a', label: 'a (first term)', format: (v) => fmt(v) },
      { key: 'dr', label: 'd or r', format: (v) => fmt(v, 3) },
      { key: 'n', label: 'n' },
      { key: 'un', label: 'u_n (or Mₙ / A)', format: (v) => fmt(v) },
      { key: 'Sn', label: 'S_n (or total paid)', format: (v) => fmt(v) },
      { key: 'note', label: 'Note' },
    ],
    procedure: [
      'Arithmetic: set a = 3, d = 2. Record n = 5, 10, 15, 20. How does S_n grow compared with u_n?',
      'Geometric: set a = 3, r = 1.5. Record the same n values. Compare u_20 with the arithmetic case.',
      'Geometric with |r| < 1: set r = 0.5. Record n = 5, 10, 20. What value does S_n approach?',
      'Finance: set M₀ = 10, i = 6%, n = 10. Record both views. Which interest type is a geometric sequence?',
      'Annuity: keep M₀ and n fixed and double the rate. Does the payment double?',
    ],
    predict: 'For the same a and n, which grows faster in the long run: an arithmetic sequence with d = 2 or a geometric one with r = 1.5? Why?',
    source: () => {
      if (p.mode === 'finance') {
        if (p.fin === 'annuity') {
          const A = payment();
          return { type: 'annuity', a: principal(), dr: 1 + i(), n: p.periods, un: A, Sn: A * p.periods, note: `total interest ${fmt(A * p.periods - principal(), 0)}` };
        }
        return { type: 'compound', a: principal(), dr: 1 + i(), n: p.periods, un: compoundAt(p.periods), Sn: null, note: `simple M_n = ${fmt(simpleAt(p.periods), 0)}` };
      }
      return { type: p.mode === 'geom' ? 'geometric' : 'arithmetic', a: p.a, dr: p.mode === 'geom' ? p.r : p.d, n: p.n, un: term(p.n), Sn: partialSum(p.n), note: '' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
