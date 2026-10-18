import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Standard enthalpies of formation at 298 K, kJ/mol. Elements in their standard state are 0.
const HF = {
  'H₂O(l)': -285.8, 'H₂O(g)': -241.8, 'CO₂(g)': -393.5, 'CO(g)': -110.5, 'CH₄(g)': -74.8,
  'C₂H₅OH(l)': -277.7, 'NH₃(g)': -45.9, 'NO₂(g)': 33.2, 'CaCO₃(s)': -1206.9, 'CaO(s)': -635.1,
};
const ELEMENTS = ['C(s)', 'O₂(g)', 'H₂(g)', 'N₂(g)', 'Ca(s)'];
const hf = (sp) => (sp in HF ? HF[sp] : 0);

// A step: reactants r, products p (species → coefficient), ΔH in kJ.
const S = (r, p, dH) => ({ r, p, dH });
const PUZZLES = {
  co2: {
    name: ['C + O₂ → CO₂ (via CO)', 'C + O₂ → CO₂ (lewat CO)'],
    target: S({ 'C(s)': 1, 'O₂(g)': 1 }, { 'CO₂(g)': 1 }, -393.5),
    steps: [
      S({ 'C(s)': 1, 'O₂(g)': 0.5 }, { 'CO(g)': 1 }, -110.5),
      S({ 'H₂(g)': 1, 'O₂(g)': 0.5 }, { 'H₂O(l)': 1 }, -285.8),
      S({ 'CO(g)': 1, 'O₂(g)': 0.5 }, { 'CO₂(g)': 1 }, -283.0),
    ],
  },
  ch4: {
    name: ['C + 2H₂ → CH₄ (from combustion data)', 'C + 2H₂ → CH₄ (dari data pembakaran)'],
    target: S({ 'C(s)': 1, 'H₂(g)': 2 }, { 'CH₄(g)': 1 }, -74.8),
    steps: [
      S({ 'CH₄(g)': 1, 'O₂(g)': 2 }, { 'CO₂(g)': 1, 'H₂O(l)': 2 }, -890.3),
      S({ 'C(s)': 1, 'O₂(g)': 1 }, { 'CO₂(g)': 1 }, -393.5),
      S({ 'C(s)': 1, 'O₂(g)': 0.5 }, { 'CO(g)': 1 }, -110.5),
      S({ 'H₂(g)': 2, 'O₂(g)': 1 }, { 'H₂O(l)': 2 }, -571.6),
    ],
  },
  no2: {
    name: ['N₂ + 2O₂ → 2NO₂ (via NO)', 'N₂ + 2O₂ → 2NO₂ (lewat NO)'],
    target: S({ 'N₂(g)': 1, 'O₂(g)': 2 }, { 'NO₂(g)': 2 }, 66.4),
    steps: [
      S({ 'N₂(g)': 1, 'H₂(g)': 3 }, { 'NH₃(g)': 2 }, -91.8),
      S({ 'N₂(g)': 1, 'O₂(g)': 1 }, { 'NO(g)': 2 }, 180.5),
      S({ 'NO(g)': 2, 'O₂(g)': 1 }, { 'NO₂(g)': 2 }, -114.1),
    ],
  },
  caco3: {
    name: ['CaCO₃ → CaO + CO₂ (from ΔH°f)', 'CaCO₃ → CaO + CO₂ (dari ΔH°f)'],
    target: S({ 'CaCO₃(s)': 1 }, { 'CaO(s)': 1, 'CO₂(g)': 1 }, 178.3),
    steps: [
      S({ 'Ca(s)': 1, 'C(s)': 1, 'O₂(g)': 1.5 }, { 'CaCO₃(s)': 1 }, -1206.9),
      S({ 'CO(g)': 1, 'O₂(g)': 0.5 }, { 'CO₂(g)': 1 }, -283.0),
      S({ 'Ca(s)': 1, 'O₂(g)': 0.5 }, { 'CaO(s)': 1 }, -635.1),
      S({ 'C(s)': 1, 'O₂(g)': 1 }, { 'CO₂(g)': 1 }, -393.5),
    ],
  },
};
const CALC_RXNS = {
  ch4: S({ 'CH₄(g)': 1, 'O₂(g)': 2 }, { 'CO₂(g)': 1, 'H₂O(l)': 2 }),
  etoh: S({ 'C₂H₅OH(l)': 1, 'O₂(g)': 3 }, { 'CO₂(g)': 2, 'H₂O(l)': 3 }),
  caco3: S({ 'CaCO₃(s)': 1 }, { 'CaO(s)': 1, 'CO₂(g)': 1 }),
  co: S({ 'CO(g)': 2, 'O₂(g)': 1 }, { 'CO₂(g)': 2 }),
  nh3: S({ 'NH₃(g)': 4, 'O₂(g)': 7 }, { 'NO₂(g)': 4, 'H₂O(g)': 6 }),
  vap: S({ 'H₂O(l)': 1 }, { 'H₂O(g)': 1 }),
};

const coef = (c) => (c === 1 ? '' : c === 0.5 ? '½' : c === 1.5 ? '1½' : String(c));
const side = (o) => Object.entries(o).map(([sp, c]) => coef(c) + sp).join(' + ');
const eqStr = (s, rev = false) => (rev ? `${side(s.p)} → ${side(s.r)}` : `${side(s.r)} → ${side(s.p)}`);
const sgn = (x) => (x > 0 ? '+' : x < 0 ? '−' : '') + Math.abs(x).toFixed(1);

// Net species change of a list of oriented steps: products − reactants.
function netOf(items) {
  const net = {};
  for (const { step, rev } of items) {
    for (const [sp, c] of Object.entries(step.p)) net[sp] = (net[sp] || 0) + (rev ? -c : c);
    for (const [sp, c] of Object.entries(step.r)) net[sp] = (net[sp] || 0) - (rev ? -c : c);
  }
  for (const k of Object.keys(net)) if (Math.abs(net[k]) < 1e-9) delete net[k];
  return net;
}
function sameNet(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) if (Math.abs((a[k] || 0) - (b[k] || 0)) > 1e-9) return false;
  return true;
}
// Brute-force the correct orientation/selection (≤ 3^4 combos) for "Show solution".
function solve(puzzle) {
  const n = puzzle.steps.length;
  const target = netOf([{ step: puzzle.target, rev: false }]);
  const total = Math.pow(3, n);
  for (let code = 0; code < total; code++) {
    const items = []; let c = code;
    for (let i = 0; i < n; i++) { const d = c % 3; c = Math.floor(c / 3); if (d) items.push({ i, rev: d === 2 }); }
    if (sameNet(netOf(items.map(({ i, rev }) => ({ step: puzzle.steps[i], rev }))), target)) return items;
  }
  return [];
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const p = { mode: 'path', puzzle: 'co2', calc: 'ch4' };
  // cards[i] = { zone: 'bank' | 'path', rev, order }
  let cards = [];
  const drag = { id: null, x: 0, y: 0, sx: 0, sy: 0, moved: false };
  let flash = 0; // seconds of "matched" glow left

  const puzzle = () => PUZZLES[p.puzzle];
  function resetCards() {
    cards = puzzle().steps.map(() => ({ zone: 'bank', rev: false, order: 0 }));
    flash = 0;
  }
  resetCards();
  const pathItems = () => cards.map((c, i) => ({ ...c, i })).filter((c) => c.zone === 'path').sort((a, b) => a.order - b.order);
  const bankItems = () => cards.map((c, i) => ({ ...c, i })).filter((c) => c.zone === 'bank');
  const pathTotal = () => pathItems().reduce((s, c) => s + (c.rev ? -1 : 1) * puzzle().steps[c.i].dH, 0);
  const pathMatches = () => {
    const items = pathItems();
    if (!items.length) return false;
    return sameNet(netOf(items.map((c) => ({ step: puzzle().steps[c.i], rev: c.rev }))), netOf([{ step: puzzle().target, rev: false }]));
  };
  let wasMatched = false;

  const calcRxn = () => CALC_RXNS[p.calc];
  const sumHf = (o) => Object.entries(o).reduce((s, [sp, c]) => s + c * hf(sp), 0);
  const calcDH = () => sumHf(calcRxn().p) - sumHf(calcRxn().r);

  // ---- layout -----------------------------------------------------------------
  function layout() {
    const W = cv.width, H = cv.height;
    const fs = Math.max(9, Math.min(14, W / 46));
    const RX = W * 0.50, RW = W * 0.48;
    const pathZone = { x: RX, y: H * 0.13, w: RW, h: H * 0.40 };
    const bankZone = { x: RX, y: H * 0.57, w: RW, h: H * 0.41 };
    const head = fs * 1.6;
    const cardH = Math.min(H * 0.085, (pathZone.h - head - 3 * 4) / 4);
    const diagram = { x: W * 0.05, y: H * 0.16, w: W * 0.40, h: H * 0.76 };
    return { W, H, fs, pathZone, bankZone, head, cardH, gap: 4, diagram };
  }
  function cardRect(L, zone, idx) {
    return { x: zone.x, y: zone.y + L.head + idx * (L.cardH + L.gap), w: zone.w, h: L.cardH };
  }
  const inRect = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  function cardAt(i) {
    const L = layout();
    const c = cards[i];
    if (c.zone === 'path') return cardRect(L, L.pathZone, pathItems().findIndex((it) => it.i === i));
    return cardRect(L, L.bankZone, bankItems().findIndex((it) => it.i === i));
  }
  const flipBox = (r) => ({ x: r.x + r.w - r.h, y: r.y, w: r.h, h: r.h });

  // ---- drawing --------------------------------------------------------------------
  function drawCard(ctx, r, step, rev, inPath, L, ghost) {
    const exo = (rev ? -step.dH : step.dH) < 0;
    ctx.fillStyle = ghost ? 'rgba(30,41,59,0.9)' : inPath ? (exo ? 'rgba(251,146,60,0.18)' : 'rgba(96,165,250,0.18)') : '#1e293b';
    ctx.strokeStyle = inPath ? (exo ? '#fb923c' : '#60a5fa') : 'rgba(148,163,184,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(r.x, r.y, r.w, r.h, 6); else ctx.rect(r.x, r.y, r.w, r.h);
    ctx.fill(); ctx.stroke();
    const textW = inPath ? r.w - r.h - 10 : r.w - 10;
    ctx.fillStyle = '#f1f5f9';
    ctx.textAlign = 'left';
    ctx.font = `${L.fs}px system-ui, sans-serif`;
    fitText(ctx, eqStr(step, rev), r.x + 6, r.y + r.h * 0.42, textW);
    ctx.fillStyle = exo ? '#fdba74' : '#93c5fd';
    ctx.fillText(`ΔH = ${sgn(rev ? -step.dH : step.dH)} kJ`, r.x + 6, r.y + r.h * 0.85);
    if (inPath) {
      const f = flipBox(r);
      ctx.fillStyle = 'rgba(148,163,184,0.25)';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.font = `${L.fs * 1.3}px system-ui, sans-serif`;
      ctx.fillText('⇄', f.x + f.w / 2, f.y + f.h * 0.68);
      ctx.font = `${L.fs}px system-ui, sans-serif`;
    }
  }
  function fitText(ctx, txt, x, y, maxW) {
    const w = ctx.measureText(txt).width;
    if (w > maxW && maxW > 0) {
      ctx.save(); ctx.translate(x, y); ctx.scale(maxW / w, 1); ctx.fillText(txt, 0, 0); ctx.restore();
    } else ctx.fillText(txt, x, y);
  }
  function arrowV(ctx, x, y0, y1, color, dashed) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.setLineDash(dashed ? [5, 4] : []);
    ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();
    ctx.setLineDash([]);
    const d = y1 > y0 ? 1 : -1;
    if (Math.abs(y1 - y0) > 8) {
      ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x - 5, y1 - 8 * d); ctx.lineTo(x + 5, y1 - 8 * d); ctx.fill();
    }
  }
  function yScale(D, values) {
    let lo = Math.min(...values), hi = Math.max(...values);
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) { lo = -100; hi = 100; }
    if (hi - lo < 50) { hi += 50; lo -= 50; }
    const pad = (hi - lo) * 0.12;
    hi += pad; lo -= pad;
    return (v) => D.y + ((hi - v) / (hi - lo)) * D.h;
  }
  function axis(ctx, D, L) {
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(D.x, D.y); ctx.lineTo(D.x, D.y + D.h); ctx.stroke();
    ctx.save();
    ctx.translate(D.x - L.fs * 0.9, D.y + D.h / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.font = `${L.fs}px system-ui, sans-serif`;
    ctx.fillText(T('enthalpy H (kJ)', 'entalpi H (kJ)'), 0, 0);
    ctx.restore();
  }

  function drawPathMode(ctx, L) {
    const { W, H, fs, pathZone, bankZone, diagram: D } = L;
    const pz = puzzle();
    const items = pathItems();
    const total = pathTotal();
    const matched = pathMatches();

    // header
    ctx.textAlign = 'left'; ctx.fillStyle = '#f8fafc';
    ctx.font = `bold ${fs * 1.15}px system-ui, sans-serif`;
    ctx.fillText(T('Target: ', 'Target: ') + eqStr(pz.target), W * 0.03, fs * 1.6);
    ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.fillStyle = matched ? '#34d399' : '#fbbf24';
    const steps = items.map((c) => sgn((c.rev ? -1 : 1) * pz.steps[c.i].dH)).join(' ');
    ctx.fillText(items.length
      ? `ΣΔH = ${steps} = ${sgn(total)} kJ` + (matched ? T('   ✓ matches target', '   ✓ sesuai target') : '')
      : T('Drag or tap step cards into the pathway. Tap ⇄ to reverse a step.', 'Seret atau ketuk kartu tahap ke lintasan. Ketuk ⇄ untuk membalik tahap.'), W * 0.03, fs * 3.0);
    if (items.length && !matched) {
      const net = netOf(items.map((c) => ({ step: pz.steps[c.i], rev: c.rev })));
      const lhs = Object.entries(net).filter(([, c]) => c < 0).map(([s, c]) => coef(-c) + s).join(' + ') || '—';
      const rhs = Object.entries(net).filter(([, c]) => c > 0).map(([s, c]) => coef(c) + s).join(' + ') || '—';
      ctx.fillStyle = '#94a3b8';
      fitText(ctx, T('net so far: ', 'hasil bersih: ') + `${lhs} → ${rhs}`, W * 0.03, fs * 4.3, W * 0.94);
    }

    // zones
    for (const [z, label] of [[pathZone, T('Pathway (steps add up)', 'Lintasan (tahap dijumlahkan)')], [bankZone, T('Step bank', 'Bank tahap')]]) {
      ctx.strokeStyle = z === pathZone && matched ? '#34d399' : 'rgba(148,163,184,0.35)';
      ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5;
      ctx.strokeRect(z.x, z.y, z.w, z.h); ctx.setLineDash([]);
      ctx.fillStyle = '#cbd5e1'; ctx.textAlign = 'left';
      ctx.fillText(label, z.x + 6, z.y + fs * 1.1);
    }
    items.forEach((c, k) => { if (drag.id !== `card:${c.i}`) drawCard(ctx, cardRect(L, pathZone, k), pz.steps[c.i], c.rev, true, L, false); });
    bankItems().forEach((c, k) => { if (drag.id !== `card:${c.i}`) drawCard(ctx, cardRect(L, bankZone, k), pz.steps[c.i], false, false, L, false); });

    // enthalpy diagram
    axis(ctx, D, L);
    const cum = [0];
    for (const c of items) cum.push(cum[cum.length - 1] + (c.rev ? -1 : 1) * pz.steps[c.i].dH);
    const y = yScale(D, [...cum, pz.target.dH]);
    const n = Math.max(1, items.length);
    const colTarget = D.w * 0.18;
    const colW = (D.w - colTarget) / n;
    // start level
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(D.x + 4, y(0)); ctx.lineTo(D.x + D.w, y(0)); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left';
    fitText(ctx, side(pz.target.r) + '  (0)', D.x + 6, y(0) - 4, D.w - 10);
    // target arrow (dashed)
    const tx = D.x + colTarget * 0.45;
    arrowV(ctx, tx, y(0), y(pz.target.dH), 'rgba(226,232,240,0.7)', true);
    ctx.strokeStyle = 'rgba(226,232,240,0.7)'; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(D.x + 4, y(pz.target.dH)); ctx.lineTo(D.x + D.w, y(pz.target.dH)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#e2e8f0';
    fitText(ctx, side(pz.target.p) + `  (${sgn(pz.target.dH)})`, D.x + 6, y(pz.target.dH) + (pz.target.dH < 0 ? fs * 1.1 : -4), D.w - 10);
    // steps
    items.forEach((c, k) => {
      const dH = (c.rev ? -1 : 1) * pz.steps[c.i].dH;
      const x = D.x + colTarget + colW * (k + 0.5);
      const col = dH < 0 ? '#fb923c' : '#60a5fa';
      arrowV(ctx, x, y(cum[k]), y(cum[k + 1]), col, false);
      ctx.strokeStyle = col; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(x - colW * 0.4, y(cum[k + 1])); ctx.lineTo(x + colW * 0.4, y(cum[k + 1])); ctx.stroke();
      ctx.fillStyle = col; ctx.textAlign = 'center';
      ctx.fillText(`${sgn(dH)}`, x, (y(cum[k]) + y(cum[k + 1])) / 2 - 3);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`${k + 1}`, x, D.y + D.h + fs * 1.1);
    });
    if (items.length) {
      ctx.fillStyle = matched ? '#34d399' : '#fbbf24'; ctx.textAlign = 'right';
      ctx.fillText(`ΣΔH = ${sgn(total)} kJ`, D.x + D.w, y(cum[cum.length - 1]) + (total <= pz.target.dH ? fs * 1.1 : -fs * 0.4));
    }
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('orange ↓ exothermic   blue ↑ endothermic', 'oranye ↓ eksoterm   biru ↑ endoterm'), D.x, H - fs * 0.4);

    // dragged card on top
    if (drag.id && drag.id.startsWith('card:')) {
      const i = Number(drag.id.slice(5));
      const r = { x: drag.x - pathZone.w / 2, y: drag.y - L.cardH / 2, w: pathZone.w, h: L.cardH };
      drawCard(ctx, r, pz.steps[i], cards[i].rev, cards[i].zone === 'path', L, true);
    }
  }

  function drawCalcMode(ctx, L) {
    const { W, H, fs, diagram: D } = L;
    const rx = calcRxn();
    const Hr = sumHf(rx.r), Hp = sumHf(rx.p), dH = Hp - Hr;
    ctx.textAlign = 'left'; ctx.fillStyle = '#f8fafc';
    ctx.font = `bold ${fs * 1.15}px system-ui, sans-serif`;
    fitText(ctx, eqStr(rx), W * 0.03, fs * 1.6, W * 0.94);
    ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.fillStyle = '#e2e8f0';
    fitText(ctx, `ΣΔH°f(${T('products', 'produk')}) = ${Object.entries(rx.p).map(([s, c]) => `${c}(${hf(s).toFixed(1)})`).join(' + ')} = ${Hp.toFixed(1)} kJ`, W * 0.03, fs * 3.0, W * 0.94);
    fitText(ctx, `ΣΔH°f(${T('reactants', 'pereaksi')}) = ${Object.entries(rx.r).map(([s, c]) => `${c}(${hf(s).toFixed(1)})`).join(' + ')} = ${Hr.toFixed(1)} kJ`, W * 0.03, fs * 4.3, W * 0.94);
    ctx.fillStyle = dH < 0 ? '#fdba74' : '#93c5fd';
    ctx.fillText(`ΔH°rxn = ${Hp.toFixed(1)} − (${Hr.toFixed(1)}) = ${sgn(dH)} kJ  ${dH < 0 ? T('(exothermic)', '(eksoterm)') : T('(endothermic)', '(endoterm)')}`, W * 0.03, fs * 5.6);

    // table
    const tx = W * 0.52, tw = W * 0.45, ty = H * 0.2, rowH = Math.min(fs * 1.9, (H * 0.76) / 12);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(T('ΔH°f (kJ/mol), 298 K', 'ΔH°f (kJ/mol), 298 K'), tx, ty - 6);
    const rows = [...Object.entries(HF), [T('elements (C, O₂, H₂, N₂, Ca)', 'unsur (C, O₂, H₂, N₂, Ca)'), 0]];
    rows.forEach(([sp, v], k) => {
      const yy = ty + k * rowH;
      const inR = sp in rx.r, inP = sp in rx.p;
      if (inR || inP) { ctx.fillStyle = inP ? 'rgba(52,211,153,0.18)' : 'rgba(251,191,36,0.18)'; ctx.fillRect(tx, yy, tw, rowH); }
      ctx.fillStyle = inP ? '#6ee7b7' : inR ? '#fcd34d' : '#e2e8f0';
      ctx.textAlign = 'left'; fitText(ctx, sp, tx + 6, yy + rowH * 0.7, tw * 0.62);
      ctx.textAlign = 'right'; ctx.fillText(v.toFixed(1), tx + tw - 6, yy + rowH * 0.7);
      ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.beginPath(); ctx.moveTo(tx, yy + rowH); ctx.lineTo(tx + tw, yy + rowH); ctx.stroke();
    });
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('yellow = reactant, green = product', 'kuning = pereaksi, hijau = produk'), tx, ty + rows.length * rowH + fs * 1.2);

    // diagram: elements at 0, reactants, products
    const D2 = { x: D.x, y: H * 0.26, w: D.w, h: H * 0.62 };
    axis(ctx, D2, L);
    const y = yScale(D2, [0, Hr, Hp]);
    const lvl = (v, x0, x1, color, label, above) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(x0, y(v)); ctx.lineTo(x1, y(v)); ctx.stroke();
      ctx.fillStyle = color; ctx.textAlign = 'center';
      fitText(ctx, label, (x0 + x1) / 2, y(v) + (above ? -5 : fs * 1.1), x1 - x0 + 30);
    };
    const c1 = D2.x + D2.w * 0.05, c2 = D2.x + D2.w * 0.36, c3 = D2.x + D2.w * 0.64, c4 = D2.x + D2.w * 0.98;
    ctx.textAlign = 'center';
    lvl(0, c2, c3, '#e2e8f0', T('elements (0)', 'unsur (0)'), Hr > 0 || Hp > 0 ? false : true);
    // the dashed arrow from the elements arrives from above when ΔH°f < 0, so put the label below the level then
    lvl(Hr, c1, c2 - 4, '#fcd34d', `${T('reactants', 'pereaksi')} ${Hr.toFixed(1)}`, Hr > 0);
    lvl(Hp, c3 + 4, c4, '#6ee7b7', `${T('products', 'produk')} ${Hp.toFixed(1)}`, Hp > 0);
    arrowV(ctx, (c2 + c1) / 2 + D2.w * 0.08, y(0), y(Hr), '#fcd34d', true);
    arrowV(ctx, (c3 + c4) / 2 - D2.w * 0.08, y(0), y(Hp), '#6ee7b7', true);
    // reaction arrow from reactants level to products level
    const ax = (c2 + c3) / 2;
    arrowV(ctx, ax, y(Hr), y(Hp), dH < 0 ? '#fb923c' : '#60a5fa', false);
    ctx.fillStyle = dH < 0 ? '#fb923c' : '#60a5fa'; ctx.textAlign = 'left';
    ctx.fillText(`ΔH°rxn ${sgn(dH)}`, ax + 8, (y(Hr) + y(Hp)) / 2 + fs * 0.35 - (Math.abs(y(Hr) - y(Hp)) < fs * 2 ? fs * 1.2 : 0));
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('Both routes start at the elements, so ΔH°rxn = ΣΔH°f(prod) − ΣΔH°f(react).', 'Kedua rute mulai dari unsur, jadi ΔH°rxn = ΣΔH°f(prod) − ΣΔH°f(pereaksi).'), W * 0.03, H - fs * 0.4);
  }

  function draw() {
    const ctx = cv.ctx;
    const L = layout();
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, L.W, L.H);
    ctx.textBaseline = 'alphabetic';
    ctx.font = `${L.fs}px system-ui, sans-serif`;
    if (p.mode === 'path') drawPathMode(ctx, L); else drawCalcMode(ctx, L);
    if (flash > 0) {
      ctx.fillStyle = `rgba(52,211,153,${(0.25 * flash).toFixed(3)})`;
      ctx.fillRect(0, 0, L.W, L.H);
    }
  }

  // ---- dragging ---------------------------------------------------------------------
  let nextOrder = 1;
  const dragger = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (p.mode !== 'path') return null;
      for (let i = 0; i < cards.length; i++) {
        const r = cardAt(i);
        if (!inRect(r, x, y)) continue;
        if (cards[i].zone === 'path' && inRect(flipBox(r), x, y)) return `flip:${i}`;
        return `card:${i}`;
      }
      return null;
    },
    onStart(id, x, y) { drag.id = id; drag.x = x; drag.y = y; drag.sx = x; drag.sy = y; drag.moved = false; },
    onDrag(id, x, y) { drag.x = x; drag.y = y; if (Math.hypot(x - drag.sx, y - drag.sy) > 6) drag.moved = true; },
    onEnd(id) {
      const i = Number(id.slice(5));
      const L = layout();
      if (id.startsWith('flip:')) { cards[i].rev = !cards[i].rev; }
      else if (!drag.moved) toggleZone(i);
      else if (inRect(L.pathZone, drag.x, drag.y) || (drag.x > L.pathZone.x && drag.y < L.pathZone.y)) setZone(i, 'path');
      else if (inRect(L.bankZone, drag.x, drag.y) || (drag.x > L.bankZone.x && drag.y > L.bankZone.y)) setZone(i, 'bank');
      else if (drag.x < L.pathZone.x) setZone(i, 'path'); // dropping on the diagram also adds it
      drag.id = null;
    },
    handles: () => {
      if (p.mode !== 'path') return [];
      const out = [];
      cards.forEach((c, i) => {
        const r = cardAt(i);
        const eq = eqStr(puzzle().steps[i], c.rev);
        out.push({ id: `card:${i}`, x: r.x + r.w * 0.4, y: r.y + r.h / 2, label: c.zone === 'path' ? T(`${eq}: in pathway, arrow key removes it`, `${eq}: di lintasan, tombol panah mengeluarkannya`) : T(`${eq}: in bank, arrow key adds it to pathway`, `${eq}: di bank, tombol panah menambahkannya ke lintasan`) });
        if (c.zone === 'path') { const f = flipBox(r); out.push({ id: `flip:${i}`, x: f.x + f.w / 2, y: f.y + f.h / 2, label: T(`Reverse step ${eq}`, `Balik tahap ${eq}`) }); }
      });
      return out;
    },
  });
  function setZone(i, zone) { if (cards[i].zone !== zone) { cards[i].zone = zone; cards[i].order = nextOrder++; if (zone === 'bank') cards[i].rev = false; } }
  function toggleZone(i) { setZone(i, cards[i].zone === 'path' ? 'bank' : 'path'); }

  // ---- controls -----------------------------------------------------------------------
  const modeSel = select({
    label: T('Mode', 'Mode'), key: 'mode',
    options: [{ value: 'path', label: T('Build a pathway (Hess cycle)', 'Susun lintasan (siklus Hess)') }, { value: 'calc', label: T('ΔH°f calculator', 'Kalkulator ΔH°f') }],
    value: p.mode, onChange: (v) => { p.mode = v; },
  });
  const puzzleSel = select({
    label: T('Target reaction', 'Reaksi target'), key: 'target',
    options: Object.entries(PUZZLES).map(([value, pz]) => ({ value, label: pz.name[getLocale() === 'id' ? 1 : 0] })),
    value: p.puzzle, onChange: (v) => { p.puzzle = v; resetCards(); },
  });
  const calcSel = select({
    label: T('Calculator reaction', 'Reaksi kalkulator'), key: 'rxn',
    options: Object.entries(CALC_RXNS).map(([value, r]) => ({ value, label: eqStr(r) })),
    value: p.calc, onChange: (v) => { p.calc = v; },
  });
  const clearB = button({ label: T('Clear pathway', 'Kosongkan lintasan'), onClick: resetCards });
  const solveB = button({
    label: T('Show solution', 'Tampilkan solusi'),
    onClick: () => {
      resetCards();
      solve(puzzle()).forEach(({ i, rev }) => { cards[i].zone = 'path'; cards[i].rev = rev; cards[i].order = nextOrder++; });
    },
  });
  ctrlPanel.append(modeSel.el, puzzleSel.el, calcSel.el, row(clearB, solveB));

  const lab = labPanel({
    title: "Hess's law lab — adding enthalpy changes",
    filename: 'hess-law-data.csv',
    columns: [
      { key: 'mode',     label: 'Mode' },
      { key: 'reaction', label: 'Reaction' },
      { key: 'steps',    label: 'ΔH steps (kJ)' },
      { key: 'total',    label: 'ΔH total (kJ)', format: (v) => v.toFixed(1) },
      { key: 'ref',      label: 'Reference ΔH (kJ)', format: (v) => v.toFixed(1) },
      { key: 'match',    label: 'Net matches?' },
    ],
    procedure: [
      'Target C + O₂ → CO₂. Drag the two steps that go via CO into the pathway (ignore the decoy). Record when the net equation matches.',
      'Target C + 2H₂ → CH₄. Use the three combustion steps; reverse the CH₄ combustion with ⇄. Record ΣΔH and compare with −74.8 kJ.',
      'Target N₂ + 2O₂ → 2NO₂. Build the path and note that one step is endothermic (blue, up) and one exothermic (orange, down).',
      'Target CaCO₃ → CaO + CO₂. Build it from formation steps, then switch to calculator mode and compute the same reaction from the ΔH°f table. Record both.',
      'In calculator mode, record ΔH° for the combustion of ethanol and of methane. Which releases more energy per mole? Per gram?',
    ],
    predict: 'If a reaction is carried out in two steps instead of one, is the total ΔH larger, smaller, or the same? Why?',
    source: () => {
      if (p.mode === 'calc') {
        const rx = calcRxn(); const dH = calcDH();
        return { mode: 'ΔH°f', reaction: eqStr(rx), steps: `${sumHf(rx.p).toFixed(1)} − (${sumHf(rx.r).toFixed(1)})`, total: dH, ref: dH, match: 'n/a' };
      }
      const items = pathItems();
      if (!items.length) return null;
      const pz = puzzle();
      return {
        mode: 'pathway',
        reaction: eqStr(pz.target),
        steps: items.map((c) => sgn((c.rev ? -1 : 1) * pz.steps[c.i].dH)).join(' '),
        total: pathTotal(),
        ref: pz.target.dH,
        match: pathMatches() ? 'yes' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    const m = p.mode === 'path' && pathMatches();
    if (m && !wasMatched) flash = 1;
    wasMatched = m;
    flash = Math.max(0, flash - dt * 1.5);
    draw();
  });
  animator.start();
  return () => { animator.stop(); dragger.destroy(); cv.destroy(); };
}
