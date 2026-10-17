import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Mini periodic table: groups 1, 2, 13–17, periods 1–4. Pauling electronegativities.
// cap = number of bonds the atom usually makes in a simple binary compound
// (valence electrons for metals, 8 − valence for non-metals, 1 for H).
const ELEMENTS = [
  { sym: 'H',  z: 1,  g: 1,  p: 1, en: 2.20, val: 1, cls: 'nonmetal',  cap: 1, name: ['Hydrogen', 'Hidrogen'] },
  { sym: 'Li', z: 3,  g: 1,  p: 2, en: 0.98, val: 1, cls: 'metal',     cap: 1, name: ['Lithium', 'Litium'] },
  { sym: 'Be', z: 4,  g: 2,  p: 2, en: 1.57, val: 2, cls: 'metal',     cap: 2, name: ['Beryllium', 'Berilium'] },
  { sym: 'B',  z: 5,  g: 13, p: 2, en: 2.04, val: 3, cls: 'metalloid', cap: 3, name: ['Boron', 'Boron'] },
  { sym: 'C',  z: 6,  g: 14, p: 2, en: 2.55, val: 4, cls: 'nonmetal',  cap: 4, name: ['Carbon', 'Karbon'] },
  { sym: 'N',  z: 7,  g: 15, p: 2, en: 3.04, val: 5, cls: 'nonmetal',  cap: 3, name: ['Nitrogen', 'Nitrogen'] },
  { sym: 'O',  z: 8,  g: 16, p: 2, en: 3.44, val: 6, cls: 'nonmetal',  cap: 2, name: ['Oxygen', 'Oksigen'] },
  { sym: 'F',  z: 9,  g: 17, p: 2, en: 3.98, val: 7, cls: 'nonmetal',  cap: 1, name: ['Fluorine', 'Fluorin'] },
  { sym: 'Na', z: 11, g: 1,  p: 3, en: 0.93, val: 1, cls: 'metal',     cap: 1, name: ['Sodium', 'Natrium'] },
  { sym: 'Mg', z: 12, g: 2,  p: 3, en: 1.31, val: 2, cls: 'metal',     cap: 2, name: ['Magnesium', 'Magnesium'] },
  { sym: 'Al', z: 13, g: 13, p: 3, en: 1.61, val: 3, cls: 'metal',     cap: 3, name: ['Aluminium', 'Aluminium'] },
  { sym: 'Si', z: 14, g: 14, p: 3, en: 1.90, val: 4, cls: 'metalloid', cap: 4, name: ['Silicon', 'Silikon'] },
  { sym: 'P',  z: 15, g: 15, p: 3, en: 2.19, val: 5, cls: 'nonmetal',  cap: 3, name: ['Phosphorus', 'Fosfor'] },
  { sym: 'S',  z: 16, g: 16, p: 3, en: 2.58, val: 6, cls: 'nonmetal',  cap: 2, name: ['Sulfur', 'Belerang'] },
  { sym: 'Cl', z: 17, g: 17, p: 3, en: 3.16, val: 7, cls: 'nonmetal',  cap: 1, name: ['Chlorine', 'Klorin'] },
  { sym: 'K',  z: 19, g: 1,  p: 4, en: 0.82, val: 1, cls: 'metal',     cap: 1, name: ['Potassium', 'Kalium'] },
  { sym: 'Ca', z: 20, g: 2,  p: 4, en: 1.00, val: 2, cls: 'metal',     cap: 2, name: ['Calcium', 'Kalsium'] },
  { sym: 'Ga', z: 31, g: 13, p: 4, en: 1.81, val: 3, cls: 'metal',     cap: 3, name: ['Gallium', 'Galium'] },
  { sym: 'Ge', z: 32, g: 14, p: 4, en: 2.01, val: 4, cls: 'metalloid', cap: 4, name: ['Germanium', 'Germanium'] },
  { sym: 'As', z: 33, g: 15, p: 4, en: 2.18, val: 5, cls: 'metalloid', cap: 3, name: ['Arsenic', 'Arsen'] },
  { sym: 'Se', z: 34, g: 16, p: 4, en: 2.55, val: 6, cls: 'nonmetal',  cap: 2, name: ['Selenium', 'Selenium'] },
  { sym: 'Br', z: 35, g: 17, p: 4, en: 2.96, val: 7, cls: 'nonmetal',  cap: 1, name: ['Bromine', 'Bromin'] },
];
const GROUP_COL = { 1: 0, 2: 1, 13: 2, 14: 3, 15: 4, 16: 5, 17: 6 };
const CLASS_COLOR = { metal: '#f59e0b', metalloid: '#a78bfa', nonmetal: '#38bdf8' };
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n) => (n === 1 ? '' : String(n).split('').map((d) => SUB[Number(d)]).join(''));
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const byId = (s) => ELEMENTS.find((e) => e.sym === s);

// Ion charge of `el` when it pairs with `other` (H is −1 only against a metal).
function ionCharge(el, other) {
  if (el.sym === 'H') return other.cls === 'metal' ? -1 : 1;
  if (el.g === 1) return 1;
  if (el.g === 2) return 2;
  if (el.g === 13) return 3;
  if (el.g === 14) return -4;
  if (el.g === 15) return -3;
  if (el.g === 16) return -2;
  return -1;
}

// Decide bond type and the simplest formula for a pair.
function classify(A, B) {
  const dEN = Math.abs(A.en - B.en);
  const metals = (A.cls === 'metal') + (B.cls === 'metal');
  const same = A.sym === B.sym;
  let type, flag = null;
  if (metals === 2) type = 'metallic';
  else if (dEN < 0.4) type = 'nonpolar';
  else if (dEN < 1.7) type = 'polar';
  else type = 'ionic';
  if (type === 'ionic' && metals === 0) { type = 'polar'; flag = 'noMetal'; }
  if (type === 'polar' && metals === 1 && dEN >= 1.5) flag = 'borderline';
  else if (type === 'polar' && metals === 1) flag = 'metalCovalent';
  if (same && ['B', 'C', 'Si', 'Ge'].includes(A.sym)) { type = 'network'; }
  // Formula
  let formula, cation = null, anion = null, nCat = 1, nAn = 1, order = 1;
  if (type === 'metallic') {
    formula = same ? A.sym : `${A.sym}–${B.sym} (${getLocale() === 'id' ? 'paduan' : 'alloy'})`;
  } else if (type === 'ionic') {
    cation = A.cls === 'metal' ? A : B; anion = cation === A ? B : A;
    const qc = ionCharge(cation, anion), qa = -ionCharge(anion, cation);
    const g = gcd(qc, qa);
    nCat = qa / g; nAn = qc / g;
    formula = `${cation.sym}${sub(nCat)}${anion.sym}${sub(nAn)}`;
  } else if (type === 'network') {
    formula = A.sym + ' (' + (getLocale() === 'id' ? 'jaringan raksasa' : 'giant network') + ')';
  } else {
    const g = gcd(A.cap, B.cap);
    const nA = B.cap / g, nB = A.cap / g;
    formula = same ? `${A.sym}${sub(2)}` : `${A.sym}${sub(nA)}${B.sym}${sub(nB)}`;
    order = same ? Math.min(3, A.cap) : Math.min(3, g);
  }
  return { dEN, type, flag, formula, cation, anion, nCat, nAn, order, same };
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const state = { a: byId('Na'), b: byId('Cl'), slot: 0, t0: 0, now: 0, info: null };
  const sea = Array.from({ length: 26 }, (_, i) => ({
    x: (i * 0.37) % 1, y: (i * 0.61) % 1, vx: 0.08 + 0.06 * ((i * 7) % 5), vy: 0.05 + 0.05 * ((i * 3) % 4), sx: i % 2 ? 1 : -1, sy: i % 3 ? 1 : -1,
  }));
  function recompute() { state.info = classify(state.a, state.b); state.t0 = state.now; }
  recompute();

  // ---------- drawing helpers ----------
  function atomCircle(ctx, x, y, r, el, label, charge) {
    ctx.fillStyle = CLASS_COLOR[el.cls];
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.font = `bold ${Math.round(r * 0.95)}px system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label ?? el.sym, x, y + 1);
    if (charge) {
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.round(r * 0.6)}px system-ui, sans-serif`;
      ctx.fillText(charge, x + r * 0.95, y - r * 0.95);
    }
  }
  function dot(ctx, x, y, r, color = '#fde047') {
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  // Electron positions on 4 sides of an atom (pairs side by side), used for Lewis dots.
  const SIDES = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // top, bottom, left, right

  function drawCovalent(ctx, X0, Y0, Wv, Hv, info) {
    const { a: A, b: B } = state;
    const cx = X0 + Wv * 0.33, cy = Y0 + Hv * 0.5;
    const r = Math.min(Wv, Hv) * 0.11, gap = r * 3.2;
    const more = B.en > A.en ? 1 : (A.en > B.en ? -1 : 0);
    const shift = clamp(info.dEN / 1.7, 0, 1) * r * 0.45 * more; // shared pair drifts toward higher EN
    const ax = cx - gap / 2, bx = cx + gap / 2;
    const dr = Math.max(2.5, r * 0.13);
    // Shared pairs (bond order) between the atoms
    for (let k = 0; k < info.order; k++) {
      const yy = cy + (k - (info.order - 1) / 2) * dr * 4.2;
      dot(ctx, cx + shift - dr * 1.1, yy, dr); dot(ctx, cx + shift + dr * 1.1, yy, dr);
    }
    // Remaining electrons around each atom: pairs first, singles are "bonds to other atoms"
    const place = (x, el, inward) => {
      let left = el.val - info.order;
      const sides = SIDES.filter((s) => s[0] !== inward); // skip the side facing the partner
      let i = 0;
      while (left > 0 && i < sides.length) {
        const [sx, sy] = sides[i];
        const px = x + sx * r * 1.45, py = cy + sy * r * 1.45;
        if (left >= 2) {
          const ox = sy !== 0 ? dr * 1.1 : 0, oy = sx !== 0 ? dr * 1.1 : 0;
          dot(ctx, px - ox, py - oy, dr); dot(ctx, px + ox, py + oy, dr); left -= 2;
        } else { dot(ctx, px, py, dr, '#fb923c'); left -= 1; }
        i++;
      }
    };
    atomCircle(ctx, ax, cy, r, A); atomCircle(ctx, bx, cy, r, B);
    place(ax, A, 1); place(bx, B, -1);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const fs = Math.max(10, Math.round(Wv * 0.028));
    ctx.font = `${fs}px system-ui, sans-serif`;
    if (info.type === 'polar') {
      ctx.fillStyle = '#f87171';
      ctx.fillText(more > 0 ? 'δ+' : 'δ−', ax, cy - r * 2.3);
      ctx.fillText(more > 0 ? 'δ−' : 'δ+', bx, cy - r * 2.3);
      // dipole arrow toward the more electronegative atom
      const y = cy + r * 2.5, x1 = cx - gap * 0.35 * more, x2 = cx + gap * 0.35 * more;
      ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.moveTo(x2 - 7 * more, y - 5); ctx.lineTo(x2, y); ctx.lineTo(x2 - 7 * more, y + 5);
      ctx.moveTo(x1 + 4 * more, y - 5); ctx.lineTo(x1 + 4 * more, y + 5); ctx.stroke();
    }
    ctx.fillStyle = '#cbd5e1';
    const bondWord = ['', T('single', 'tunggal'), T('double', 'rangkap dua'), T('triple', 'rangkap tiga')][info.order];
    const lines = [
      T(`One ${A.sym}–${B.sym} ${bondWord} bond: ${info.order} shared pair${info.order > 1 ? 's' : ''}`, `Satu ikatan ${bondWord} ${A.sym}–${B.sym}: ${info.order} pasangan elektron dipakai bersama`),
      T('yellow = pairs · orange = electron that bonds to another atom', 'kuning = pasangan · oranye = elektron yang berikatan dengan atom lain'),
    ];
    lines.forEach((s, i) => ctx.fillText(s, X0 + Wv * 0.33, Y0 + Hv * 0.93 - (lines.length - 1 - i) * fs * 1.3));
    // Right side: molecule card
    const rx = X0 + Wv * 0.8;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.round(fs * 2.2)}px system-ui, sans-serif`;
    ctx.fillText(info.formula, rx, cy);
    ctx.font = `${fs}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('simplest molecule', 'molekul paling sederhana'), rx, cy + fs * 1.8);
    ctx.fillText(info.type === 'network' ? T('giant covalent network', 'jaringan kovalen raksasa') : (info.type === 'polar' ? T('polar covalent', 'kovalen polar') : T('non-polar covalent', 'kovalen nonpolar')), rx, cy + fs * 3.1);
  }

  function drawIonic(ctx, X0, Y0, Wv, Hv, info) {
    const { cation: C, anion: N, nCat, nAn } = info;
    const prog = clamp((state.now - state.t0 - 0.5) / 1.4, 0, 1); // electron transfer animation
    const r = Math.min(Wv, Hv) * 0.09, dr = Math.max(2.5, r * 0.14);
    const colX = X0 + Wv * 0.16, colN = X0 + Wv * 0.42;
    const rowY = (i, n) => Y0 + Hv * 0.5 + (i - (n - 1) / 2) * r * 3.1;
    const qc = ionCharge(C, N), qa = -ionCharge(N, C);
    // Atoms (cation shrinks, anion grows as electrons move)
    for (let i = 0; i < nCat; i++) atomCircle(ctx, colX, rowY(i, nCat), r * (1 - 0.3 * prog), C, C.sym, prog > 0.95 ? (qc === 1 ? '+' : `${qc}+`) : null);
    for (let i = 0; i < nAn; i++) atomCircle(ctx, colN, rowY(i, nAn), r * (1 + 0.2 * prog), N, N.sym, prog > 0.95 ? (qa === 1 ? '−' : `${qa}−`) : null);
    // Anion's own valence electrons
    for (let i = 0; i < nAn; i++) {
      const y = rowY(i, nAn);
      for (let k = 0; k < N.val; k++) {
        const ang = -Math.PI / 2 + (k * 2 * Math.PI) / 8;
        dot(ctx, colN + Math.cos(ang) * r * 1.5, y + Math.sin(ang) * r * 1.5, dr);
      }
    }
    // Transferred electrons: electron k leaves cation floor(k/qc) and fills an empty slot on anion floor(k/qa)
    const total = nCat * qc;
    for (let k = 0; k < total; k++) {
      const ci = Math.floor(k / qc), ai = Math.floor(k / qa);
      const slotC = k % qc, slotA = N.val + (k % qa);
      const a0 = Math.PI + (slotC - (qc - 1) / 2) * 0.9;
      const sx = colX + Math.cos(a0) * r * 1.5, sy = rowY(ci, nCat) + Math.sin(a0) * r * 1.5;
      const a1 = -Math.PI / 2 + (slotA * 2 * Math.PI) / 8;
      const ex = colN + Math.cos(a1) * r * 1.5, ey = rowY(ai, nAn) + Math.sin(a1) * r * 1.5;
      const p = prog * prog * (3 - 2 * prog);
      dot(ctx, sx + (ex - sx) * p, sy + (ey - sy) * p - Math.sin(p * Math.PI) * r * 0.8, dr, '#fb923c');
    }
    const fs = Math.max(10, Math.round(Wv * 0.028));
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(T(`${total} electron${total > 1 ? 's' : ''} transferred → ions`, `${total} elektron berpindah → ion`), (colX + colN) / 2, Y0 + Hv * 0.93);
    // Lattice snippet on the right
    const lx = X0 + Wv * 0.62, lw = Wv * 0.34, cell = Math.min(lw / 5, Hv * 0.78 / 4);
    const ly = Y0 + Hv * 0.5 - cell * 2;
    ctx.globalAlpha = prog;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
      const isC = (i + j) % 2 === 0;
      const el = isC ? C : N;
      const rr = cell * (isC ? 0.3 : 0.42);
      const x = lx + cell * (i + 0.5), y = ly + cell * (j + 0.5);
      ctx.fillStyle = CLASS_COLOR[el.cls];
      ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0b1220'; ctx.font = `bold ${Math.round(rr * 0.9)}px system-ui, sans-serif`; ctx.textBaseline = 'middle';
      ctx.fillText(isC ? '+' : '−', x, y + 1);
    }
    ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.round(fs * 1.9)}px system-ui, sans-serif`;
    ctx.fillText(info.formula, lx + cell * 2.5, ly - fs * 0.6);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.fillText(T('ionic lattice (ratio shown in formula)', 'kisi ion (perbandingan sesuai rumus)'), lx + cell * 2.5, ly + cell * 4 + fs * 1.2);
    ctx.globalAlpha = 1;
  }

  function drawMetallic(ctx, X0, Y0, Wv, Hv, info) {
    const { a: A, b: B } = state;
    const cols = 6, rows = 3;
    const cell = Math.min(Wv * 0.6 / cols, Hv * 0.8 / rows);
    const gx = X0 + Wv * 0.05, gy = Y0 + Hv * 0.5 - cell * rows / 2;
    ctx.fillStyle = 'rgba(56,189,248,0.08)';
    ctx.fillRect(gx, gy, cell * cols, cell * rows);
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const el = info.same ? A : ((i + j) % 3 === 0 ? B : A);
      atomCircle(ctx, gx + cell * (i + 0.5), gy + cell * (j + 0.5), cell * 0.3, el, el.sym, (el.val === 1 ? '+' : `${el.val}+`));
    }
    const dr = Math.max(2.5, cell * 0.08);
    for (const e of sea) dot(ctx, gx + e.x * cell * cols, gy + e.y * cell * rows, dr, '#fde047');
    const fs = Math.max(10, Math.round(Wv * 0.028));
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(T('cations in a sea of delocalised electrons', 'kation dalam lautan elektron terdelokalisasi'), gx + cell * cols / 2, Y0 + Hv * 0.93);
    const rx = X0 + Wv * 0.82;
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.8)}px system-ui, sans-serif`;
    ctx.fillText(info.same ? A.sym : `${A.sym} + ${B.sym}`, rx, Y0 + Hv * 0.45);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs}px system-ui, sans-serif`;
    ctx.fillText(info.same ? T('pure metal', 'logam murni') : T('alloy', 'paduan logam'), rx, Y0 + Hv * 0.45 + fs * 1.8);
  }

  function properties(info) {
    switch (info.type) {
      case 'ionic': return [
        [T('Melting point', 'Titik leleh'), T('high (typically 600–3000 °C)', 'tinggi (umumnya 600–3000 °C)')],
        [T('Conducts electricity', 'Menghantarkan listrik'), T('solid: no · molten or dissolved: yes', 'padat: tidak · lelehan/larutan: ya')],
        [T('Soluble in water', 'Larut dalam air'), T('often yes (ions separate)', 'sering ya (ion terpisah)')],
      ];
      case 'polar': return [
        [T('Melting point', 'Titik leleh'), T('low (molecular; often below 200 °C)', 'rendah (molekuler; sering di bawah 200 °C)')],
        [T('Conducts electricity', 'Menghantarkan listrik'), T('no (some, e.g. HCl, form ions only in water)', 'tidak (sebagian, mis. HCl, membentuk ion hanya dalam air)')],
        [T('Soluble in water', 'Larut dalam air'), T('often yes (polar dissolves polar)', 'sering ya (polar melarutkan polar)')],
      ];
      case 'nonpolar': return [
        [T('Melting point', 'Titik leleh'), T('very low (molecular; often below 0 °C)', 'sangat rendah (molekuler; sering di bawah 0 °C)')],
        [T('Conducts electricity', 'Menghantarkan listrik'), T('no', 'tidak')],
        [T('Soluble in water', 'Larut dalam air'), T('poorly; dissolves in non-polar solvents', 'sukar; larut dalam pelarut nonpolar')],
      ];
      case 'network': return [
        [T('Melting point', 'Titik leleh'), T('very high (diamond ≈ 3550 °C, Si ≈ 1410 °C)', 'sangat tinggi (intan ≈ 3550 °C, Si ≈ 1410 °C)')],
        [T('Conducts electricity', 'Menghantarkan listrik'), T('no (graphite is the exception)', 'tidak (grafit pengecualian)')],
        [T('Soluble in water', 'Larut dalam air'), T('insoluble', 'tidak larut')],
      ];
      default: return [
        [T('Melting point', 'Titik leleh'), T('varies: Na 98 °C, Al 660 °C, Ca 842 °C', 'bervariasi: Na 98 °C, Al 660 °C, Ca 842 °C')],
        [T('Conducts electricity', 'Menghantarkan listrik'), T('yes, as solid and liquid', 'ya, padat maupun cair')],
        [T('Soluble in water', 'Larut dalam air'), T('no (group 1 and 2 metals react instead)', 'tidak (logam golongan 1 dan 2 justru bereaksi)')],
      ];
    }
  }
  const typeName = (type) => ({
    ionic: T('Ionic bond', 'Ikatan ion'), polar: T('Polar covalent bond', 'Ikatan kovalen polar'),
    nonpolar: T('Non-polar covalent bond', 'Ikatan kovalen nonpolar'), network: T('Covalent network', 'Jaringan kovalen'), metallic: T('Metallic bond', 'Ikatan logam'),
  })[type];

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const info = state.info;
    const { a: A, b: B } = state;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const fs = Math.max(10, Math.round(W * 0.028));
    // Header
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.font = `bold ${Math.round(fs * 1.35)}px system-ui, sans-serif`;
    ctx.fillText(`${A.sym} (EN ${A.en.toFixed(2)}) + ${B.sym} (EN ${B.en.toFixed(2)})`, W * 0.03, H * 0.065);
    ctx.textAlign = 'right';
    ctx.fillStyle = { ionic: '#f87171', polar: '#fbbf24', nonpolar: '#4ade80', network: '#4ade80', metallic: '#38bdf8' }[info.type];
    ctx.fillText(typeName(info.type), W * 0.97, H * 0.065);
    // Visual region
    const X0 = W * 0.03, Y0 = H * 0.1, Wv = W * 0.94, Hv = H * 0.46;
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
    ctx.strokeRect(X0, Y0, Wv, Hv);
    if (info.type === 'ionic') drawIonic(ctx, X0, Y0, Wv, Hv, info);
    else if (info.type === 'metallic') drawMetallic(ctx, X0, Y0, Wv, Hv, info);
    else drawCovalent(ctx, X0, Y0, Wv, Hv, info);
    // ΔEN bar
    const bx = W * 0.08, bw = W * 0.84, by = H * 0.63, bh = H * 0.045, maxEN = 3.3;
    const xOf = (v) => bx + bw * clamp(v / maxEN, 0, 1);
    ctx.fillStyle = 'rgba(74,222,128,0.35)'; ctx.fillRect(bx, by, xOf(0.4) - bx, bh);
    ctx.fillStyle = 'rgba(251,191,36,0.35)'; ctx.fillRect(xOf(0.4), by, xOf(1.7) - xOf(0.4), bh);
    ctx.fillStyle = 'rgba(248,113,113,0.35)'; ctx.fillRect(xOf(1.7), by, bx + bw - xOf(1.7), bh);
    ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('non-polar', 'nonpolar'), (bx + xOf(0.4)) / 2, by - fs * 0.5);
    ctx.fillText(T('polar covalent', 'kovalen polar'), (xOf(0.4) + xOf(1.7)) / 2, by - fs * 0.5);
    ctx.fillText(T('ionic', 'ion'), (xOf(1.7) + bx + bw) / 2, by - fs * 0.5);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    for (const v of [0.4, 1.7]) { ctx.beginPath(); ctx.moveTo(xOf(v), by - 3); ctx.lineTo(xOf(v), by + bh + 3); ctx.stroke(); ctx.fillText(v.toFixed(1), xOf(v), by + bh + fs * 1.1); }
    ctx.fillText('0', bx, by + bh + fs * 1.1); ctx.fillText(maxEN.toFixed(1), bx + bw, by + bh + fs * 1.1);
    // Pointer
    const px = xOf(info.dEN);
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.moveTo(px, by + bh + 2); ctx.lineTo(px - 7, by + bh + 12); ctx.lineTo(px + 7, by + bh + 12); ctx.closePath(); ctx.fill();
    ctx.font = `bold ${fs}px system-ui, sans-serif`;
    ctx.fillText(`ΔEN = ${info.dEN.toFixed(2)}`, clamp(px, bx + fs * 3, bx + bw - fs * 3), by + bh + fs * 2.4);
    ctx.textAlign = 'left'; ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
    ctx.fillText(T('guideline only — real bonding is a continuum', 'hanya pedoman — ikatan nyata berupa rentang kontinu'), bx, by - fs * 1.7);
    // Properties
    let y = H * 0.775;
    ctx.font = `${fs}px system-ui, sans-serif`;
    for (const [k, v] of properties(info)) {
      ctx.fillStyle = '#94a3b8'; ctx.fillText(k + ':', W * 0.03, y);
      ctx.fillStyle = '#e2e8f0'; ctx.fillText(v, W * 0.03 + fs * 10.5, y);
      y += fs * 1.55;
    }
    if (info.flag) {
      ctx.fillStyle = '#fbbf24'; ctx.font = `italic ${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      const msg = {
        noMetal: T('Exception: ΔEN ≥ 1.7 but no metal → still a molecular (polar covalent) compound, e.g. HF.', 'Pengecualian: ΔEN ≥ 1,7 tetapi tanpa logam → tetap senyawa molekuler (kovalen polar), mis. HF.'),
        borderline: T('Borderline: metal + non-metal with ΔEN just under 1.7 → strongly polar, partly ionic (AlCl₃ sublimes at 180 °C; BeCl₂ melts at 399 °C).', 'Perbatasan: logam + nonlogam dengan ΔEN sedikit di bawah 1,7 → sangat polar, sebagian ionik (AlCl₃ menyublim pada 180 °C; BeCl₂ meleleh pada 399 °C).'),
        metalCovalent: T('Note: metal + non-metal, yet ΔEN < 1.7 → the guideline says polar covalent; real compounds range from ionic (NaH) to covalent (GaBr₃).', 'Catatan: logam + nonlogam, tetapi ΔEN < 1,7 → pedoman menyebut kovalen polar; senyawa nyata berkisar dari ionik (NaH) hingga kovalen (GaBr₃).'),
      }[info.flag];
      ctx.fillText(msg, W * 0.03, H * 0.975);
    }
  }

  function step(dt) {
    for (const e of sea) {
      e.x += e.vx * e.sx * dt; e.y += e.vy * e.sy * dt;
      if (e.x < 0.03 || e.x > 0.97) e.sx *= -1;
      if (e.y < 0.05 || e.y > 0.95) e.sy *= -1;
      e.x = clamp(e.x, 0.03, 0.97); e.y = clamp(e.y, 0.05, 0.95);
    }
  }

  // ---------- controls ----------
  const opts = ELEMENTS.map((e) => ({ value: e.sym, label: `${e.sym} — ${e.name[getLocale() === 'id' ? 1 : 0]} (EN ${e.en.toFixed(2)})` }));
  const selA = select({ label: T('Element 1', 'Unsur 1'), key: 'el1', options: opts, value: state.a.sym, onChange: (v) => { state.a = byId(v); recompute(); paintTable(); } });
  const selB = select({ label: T('Element 2', 'Unsur 2'), key: 'el2', options: opts, value: state.b.sym, onChange: (v) => { state.b = byId(v); recompute(); paintTable(); } });
  const swapB = button({ label: T('Swap', 'Tukar'), onClick: () => { const t = state.a; state.a = state.b; state.b = t; selA.value = state.a.sym; selB.value = state.b.sym; recompute(); paintTable(); } });
  const slotBtn = button({ label: '', onClick: () => { state.slot = 1 - state.slot; paintTable(); } });

  // Mini periodic table (DOM buttons, keyboard accessible)
  const table = document.createElement('div');
  table.setAttribute('role', 'group');
  table.setAttribute('aria-label', T('Mini periodic table: click an element', 'Tabel periodik mini: klik sebuah unsur'));
  table.style.cssText = 'display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;max-width:520px';
  const cells = new Map();
  for (const el of ELEMENTS) {
    const c = document.createElement('button');
    c.type = 'button'; c.className = 'btn';
    c.style.cssText = `grid-column:${GROUP_COL[el.g] + 1};grid-row:${el.p};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 2px;min-height:44px;line-height:1.1;border-width:2px;color:#0b1220;background:${CLASS_COLOR[el.cls]}`;
    c.innerHTML = `<span style="font-weight:800;font-size:1.05rem">${el.sym}</span><span style="font-size:0.7rem;opacity:.85">${el.en.toFixed(2)}</span>`;
    c.setAttribute('aria-label', `${el.name[getLocale() === 'id' ? 1 : 0]}, EN ${el.en.toFixed(2)}`);
    c.addEventListener('click', () => {
      if (state.slot === 0) { state.a = el; selA.value = el.sym; } else { state.b = el; selB.value = el.sym; }
      state.slot = 1 - state.slot;
      recompute(); paintTable();
    });
    table.appendChild(c); cells.set(el.sym, c);
  }
  const legend = document.createElement('div');
  legend.style.cssText = 'font-size:0.8rem;color:var(--color-muted)';
  legend.innerHTML = `<span style="color:${CLASS_COLOR.metal}">■</span> ${T('metal', 'logam')} &nbsp; <span style="color:${CLASS_COLOR.metalloid}">■</span> ${T('metalloid', 'metaloid')} &nbsp; <span style="color:${CLASS_COLOR.nonmetal}">■</span> ${T('non-metal', 'nonlogam')} &nbsp;·&nbsp; ${T('number = Pauling electronegativity', 'angka = keelektronegatifan Pauling')}`;
  function paintTable() {
    for (const [sym, c] of cells) {
      const isA = sym === state.a.sym, isB = sym === state.b.sym;
      c.style.outline = isA || isB ? '3px solid #fff' : 'none';
      c.style.boxShadow = isA ? '0 0 0 5px #f87171' : (isB ? '0 0 0 5px #38bdf8' : 'none');
      c.setAttribute('aria-pressed', String(isA || isB));
    }
    slotBtn.label = state.slot === 0 ? T('Next click sets: Element 1', 'Klik berikutnya: Unsur 1') : T('Next click sets: Element 2', 'Klik berikutnya: Unsur 2');
  }
  paintTable();
  ctrlPanel.append(table, legend, row(slotBtn, swapB), row(selA, selB));

  const lab = labPanel({
    title: 'Bond-type lab — electronegativity difference',
    filename: 'chemical-bonding-data.csv',
    columns: [
      { key: 'pair', label: 'Pair' },
      { key: 'enA', label: 'EN 1', format: (v) => v.toFixed(2) },
      { key: 'enB', label: 'EN 2', format: (v) => v.toFixed(2) },
      { key: 'dEN', label: 'ΔEN', format: (v) => v.toFixed(2) },
      { key: 'type', label: 'Bond type' },
      { key: 'formula', label: 'Formula' },
    ],
    procedure: [
      'Pick Na and Cl. Watch the electron transfer, read ΔEN and the predicted type, then Record.',
      'Keep Cl and move the metal across period 3: Mg, Al. Record each. Where does the type change?',
      'Pick H with F, O, N, C in turn. Record. How does ΔEN change along the period?',
      'Pick two identical non-metals (Cl + Cl, O + O, N + N). What is ΔEN and the bond order?',
      'Pick two metals (Na + K, Al + Mg). Record. Which property is unique to metallic bonding?',
      'Sort your table by ΔEN. Does 1.7 separate ionic from covalent perfectly? Note any exceptions (HF, AlCl₃).',
    ],
    predict: 'Before you start: which pair do you expect to be most ionic, and which most covalent? Why?',
    source: () => {
      const i = state.info;
      return { pair: `${state.a.sym}–${state.b.sym}`, enA: state.a.en, enB: state.b.en, dEN: i.dEN, type: i.type, formula: i.formula };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
