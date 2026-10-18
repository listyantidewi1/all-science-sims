import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const VALENCE = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7, S: 6, P: 5, Cl: 7 };
const COLOR = { H: '#e2e8f0', B: '#f9a8d4', C: '#94a3b8', N: '#60a5fa', O: '#f87171', F: '#86efac', S: '#fde047', P: '#fb923c', Cl: '#4ade80' };
// Terminal-atom directions (unit vectors) for n terminals around the centre.
const DIRS = {
  1: [[1, 0]],
  2: [[-1, 0], [1, 0]],
  3: [[0, -1], [-0.87, 0.5], [0.87, 0.5]],
  4: [[0, -1], [-1, 0], [1, 0], [0, 1]],
  5: [[0, -1], [0, 1], [-1, 0], [0.87, -0.5], [0.87, 0.5]],
};
// atoms[0] is the central atom; every other atom is bonded to it in the skeleton.
// answer: bond orders in terminal order, lone pairs per atom (same order as atoms).
const MOLECULES = [
  { id: 'H2O', formula: 'H₂O', name: ['Water', 'Air'], atoms: ['O', 'H', 'H'], answer: { bonds: [1, 1], lp: [2, 0, 0] } },
  { id: 'CO2', formula: 'CO₂', name: ['Carbon dioxide', 'Karbon dioksida'], atoms: ['C', 'O', 'O'], answer: { bonds: [2, 2], lp: [0, 2, 2] } },
  { id: 'NH3', formula: 'NH₃', name: ['Ammonia', 'Amonia'], atoms: ['N', 'H', 'H', 'H'], answer: { bonds: [1, 1, 1], lp: [1, 0, 0, 0] } },
  { id: 'CH4', formula: 'CH₄', name: ['Methane', 'Metana'], atoms: ['C', 'H', 'H', 'H', 'H'], answer: { bonds: [1, 1, 1, 1], lp: [0, 0, 0, 0, 0] } },
  { id: 'O2', formula: 'O₂', name: ['Oxygen', 'Oksigen'], atoms: ['O', 'O'], answer: { bonds: [2], lp: [2, 2] } },
  { id: 'N2', formula: 'N₂', name: ['Nitrogen', 'Nitrogen'], atoms: ['N', 'N'], answer: { bonds: [3], lp: [1, 1] } },
  { id: 'HCl', formula: 'HCl', name: ['Hydrogen chloride', 'Hidrogen klorida'], atoms: ['Cl', 'H'], answer: { bonds: [1], lp: [3, 0] } },
  { id: 'SO2', formula: 'SO₂', name: ['Sulfur dioxide', 'Belerang dioksida'], atoms: ['S', 'O', 'O'], answer: { bonds: [2, 1], lp: [1, 2, 3] }, note: ['resonance: the double bond can be on either O; S=O on both sides (expanded octet) is also accepted', 'resonansi: ikatan rangkap bisa pada O mana pun; S=O di kedua sisi (oktet berkembang) juga diterima'] },
  { id: 'BF3', formula: 'BF₃', name: ['Boron trifluoride', 'Boron trifluorida'], atoms: ['B', 'F', 'F', 'F'], answer: { bonds: [1, 1, 1], lp: [0, 3, 3, 3] }, note: ['exception: B is stable with only 6 electrons (incomplete octet)', 'pengecualian: B stabil dengan hanya 6 elektron (oktet tak lengkap)'] },
  { id: 'PCl5', formula: 'PCl₅', name: ['Phosphorus pentachloride', 'Fosforus pentaklorida'], atoms: ['P', 'Cl', 'Cl', 'Cl', 'Cl', 'Cl'], answer: { bonds: [1, 1, 1, 1, 1], lp: [0, 3, 3, 3, 3, 3] }, note: ['exception: P holds 10 electrons (expanded octet, period 3)', 'pengecualian: P menampung 10 elektron (oktet berkembang, periode 3)'] },
];
const SHAPES = {
  '2-0': ['Linear', 'Linear'], '3-0': ['Trigonal planar', 'Segitiga datar'], '3-1': ['Bent (V-shaped)', 'Bengkok (bentuk V)'],
  '4-0': ['Tetrahedral', 'Tetrahedral'], '4-1': ['Trigonal pyramidal', 'Piramida segitiga'], '4-2': ['Bent (V-shaped)', 'Bengkok (bentuk V)'],
  '5-0': ['Trigonal bipyramidal', 'Bipiramida segitiga'], '6-0': ['Octahedral', 'Oktahedral'],
};
const ANGLES = { '2-0': '180°', '3-0': '120°', '3-1': '≈119° (SO₂)', '4-0': '109.5°', '4-1': '107° (NH₃)', '4-2': '104.5° (H₂O)', '5-0': '90° / 120°' };

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = { mol: MOLECULES[0], bonds: [], lp: [], flash: 0, now: 0 };
  function load(id) {
    state.mol = MOLECULES.find((m) => m.id === id) || MOLECULES[0];
    state.bonds = state.mol.atoms.slice(1).map(() => 0);
    state.lp = state.mol.atoms.map(() => 0);
    rebuildEditor();
  }

  // ---------- geometry ----------
  function positions() {
    const W = cv.width, H = cv.height, cx = W * 0.5, cy = H * 0.5;
    const n = state.mol.atoms.length - 1;
    const R = Math.min(W, H) * (n >= 5 ? 0.3 : 0.27);
    const dirs = DIRS[n] || DIRS[1];
    return [[cx, cy], ...dirs.map(([dx, dy]) => [cx + dx * R, cy + dy * R * 0.75])];
  }
  const atomR = () => Math.min(cv.width, cv.height) * 0.065;

  // ---------- chemistry ----------
  function analysis() {
    const { mol, bonds, lp } = state;
    const total = mol.atoms.reduce((s, a) => s + VALENCE[a], 0);
    const used = 2 * bonds.reduce((s, b) => s + b, 0) + 2 * lp.reduce((s, l) => s + l, 0);
    const per = mol.atoms.map((sym, i) => {
      const bondOrder = i === 0 ? bonds.reduce((s, b) => s + b, 0) : bonds[i - 1];
      const nBonded = i === 0 ? bonds.filter((b) => b > 0).length : (bonds[i - 1] > 0 ? 1 : 0);
      const electrons = 2 * bondOrder + 2 * lp[i];
      const fc = VALENCE[sym] - 2 * lp[i] - bondOrder;
      let ok, label;
      if (sym === 'H') { ok = electrons === 2; label = electrons === 2 ? T('duet ✓', 'duet ✓') : `${electrons}/2`; }
      else if (sym === 'B' && electrons === 6) { ok = true; label = T('6 (exception)', '6 (pengecualian)'); }
      else if (electrons === 8) { ok = true; label = T('octet ✓', 'oktet ✓'); }
      else if ((sym === 'S' || sym === 'P' || sym === 'Cl') && i === 0 && (electrons === 10 || electrons === 12)) { ok = true; label = T(`${electrons} (expanded)`, `${electrons} (berkembang)`); }
      else { ok = false; label = `${electrons}/8`; }
      return { sym, bondOrder, nBonded, electrons, fc, ok, label };
    });
    const allBonded = bonds.every((b) => b > 0);
    const valid = allBonded && used === total && per.every((p) => p.ok) && per.reduce((s, p) => s + p.fc, 0) === 0;
    const fcSum = per.reduce((s, p) => s + Math.abs(p.fc), 0);
    const ans = mol.answer;
    const ansFc = mol.atoms.reduce((s, sym, i) => {
      const bo = i === 0 ? ans.bonds.reduce((x, b) => x + b, 0) : ans.bonds[i - 1];
      return s + Math.abs(VALENCE[sym] - 2 * ans.lp[i] - bo);
    }, 0);
    const best = valid && fcSum <= ansFc;
    const domains = per[0].nBonded + lp[0];
    const key = `${domains}-${lp[0]}`;
    const shape = mol.atoms.length === 2 ? [T('Linear (diatomic)', 'Linear (diatomik)'), ''] : [SHAPES[key] ? SHAPES[key][getLocale() === 'id' ? 1 : 0] : '—', ANGLES[key] || ''];
    return { total, used, per, valid, best, fcSum, shape, domains };
  }

  // ---------- drawing ----------
  function lonePairSpots(i, pos) {
    // Free directions around atom i: 8 compass points minus those near a bond.
    const [x, y] = pos[i];
    const bondDirs = [];
    if (i === 0) pos.slice(1).forEach(([bx, by]) => bondDirs.push(Math.atan2(by - y, bx - x)));
    else bondDirs.push(Math.atan2(pos[0][1] - y, pos[0][0] - x));
    const spots = [];
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4;
      let minD = Math.PI;
      for (const b of bondDirs) { let d = Math.abs(a - b); d = Math.min(d, 2 * Math.PI - d); minD = Math.min(minD, d); }
      if (minD > Math.PI / 4 + 0.01) spots.push({ a, minD });
    }
    spots.sort((p, q) => q.minD - p.minD);
    return spots.map((s) => s.a);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const pos = positions(), r = atomR(), an = analysis();
    const fs = Math.max(10, Math.round(W * 0.022));
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // Bonds
    pos.slice(1).forEach(([x, y], k) => {
      const [cx, cy] = pos[0];
      const dx = x - cx, dy = y - cy, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const order = state.bonds[k];
      const mx = (cx + x) / 2, my = (cy + y) / 2;
      if (order === 0) {
        ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.setLineDash([4, 6]); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(253,224,71,0.6)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(mx, my, r * 0.45, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(253,224,71,0.8)'; ctx.font = `${fs}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('+', mx, my);
      } else {
        for (let b = 0; b < order; b++) {
          const off = (b - (order - 1) / 2) * r * 0.32;
          const ux = dx / len * r, uy = dy / len * r;
          const x1 = cx + ux * 0.9 + nx * off, y1 = cy + uy * 0.9 + ny * off;
          const x2 = x - ux * 0.9 + nx * off, y2 = y - uy * 0.9 + ny * off;
          // draw bond as electron pair: two dots on a line
          ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          const ex = (x1 + x2) / 2, ey = (y1 + y2) / 2;
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.arc(ex - dx / len * r * 0.22, ey - dy / len * r * 0.22, r * 0.09, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex + dx / len * r * 0.22, ey + dy / len * r * 0.22, r * 0.09, 0, Math.PI * 2); ctx.fill();
        }
      }
    });
    // Atoms + lone pairs + badges
    pos.forEach(([x, y], i) => {
      const sym = state.mol.atoms[i], p = an.per[i];
      ctx.fillStyle = COLOR[sym];
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = p.ok ? '#4ade80' : 'rgba(255,255,255,0.25)'; ctx.lineWidth = p.ok ? 3 : 1.5;
      ctx.beginPath(); ctx.arc(x, y, r + 2, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#0b1220'; ctx.font = `bold ${Math.round(r * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(sym, x, y + 1);
      const spots = lonePairSpots(i, pos);
      for (let k = 0; k < state.lp[i]; k++) {
        const a = spots[k % spots.length] ?? 0;
        const px = x + Math.cos(a) * r * 1.45, py = y + Math.sin(a) * r * 1.45;
        const tx = -Math.sin(a) * r * 0.2, ty = Math.cos(a) * r * 0.2;
        ctx.fillStyle = '#fde047';
        ctx.beginPath(); ctx.arc(px - tx, py - ty, r * 0.1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(px + tx, py + ty, r * 0.1, 0, Math.PI * 2); ctx.fill();
      }
      // electron-count badge below, formal charge above-right
      ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = p.ok ? '#4ade80' : '#fbbf24';
      ctx.fillText(p.label, x, y + r * 2.05 + fs * 0.6);
      if (p.fc !== 0) {
        ctx.fillStyle = '#f472b6'; ctx.font = `bold ${fs}px system-ui, sans-serif`;
        ctx.fillText(p.fc > 0 ? `+${p.fc}` : `${p.fc}`, x + r * 1.1, y - r * 1.1);
      }
    });
    // Readouts
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.4)}px system-ui, sans-serif`;
    ctx.fillText(`${state.mol.formula} — ${state.mol.name[getLocale() === 'id' ? 1 : 0]}`, W * 0.025, H * 0.08);
    ctx.font = `${fs}px system-ui, sans-serif`; ctx.fillStyle = '#cbd5e1';
    const parts = state.mol.atoms.reduce((m, a) => (m[a] = (m[a] || 0) + 1, m), {});
    const sumStr = Object.entries(parts).map(([a, n]) => `${n > 1 ? n + '×' : ''}${a}(${VALENCE[a]})`).join(' + ');
    ctx.fillText(T(`Valence electrons: ${sumStr} = ${an.total}`, `Elektron valensi: ${sumStr} = ${an.total}`), W * 0.025, H * 0.08 + fs * 1.7);
    ctx.fillStyle = an.used === an.total ? '#4ade80' : (an.used > an.total ? '#f87171' : '#fbbf24');
    ctx.fillText(T(`Used: ${an.used} / ${an.total}  (${state.bonds.reduce((s, b) => s + b, 0)} bond pairs, ${state.lp.reduce((s, l) => s + l, 0)} lone pairs)`, `Terpakai: ${an.used} / ${an.total}  (${state.bonds.reduce((s, b) => s + b, 0)} pasangan ikatan, ${state.lp.reduce((s, l) => s + l, 0)} pasangan bebas)`), W * 0.025, H * 0.08 + fs * 3.4);
    // Status (right)
    ctx.textAlign = 'right';
    if (an.best) {
      ctx.fillStyle = '#4ade80'; ctx.font = `bold ${Math.round(fs * 1.3)}px system-ui, sans-serif`;
      ctx.fillText(T('✓ Correct Lewis structure', '✓ Struktur Lewis benar'), W * 0.975, H * 0.08);
    } else if (an.valid) {
      ctx.fillStyle = '#fbbf24'; ctx.font = `bold ${Math.round(fs * 1.1)}px system-ui, sans-serif`;
      ctx.fillText(T('Valid, but formal charges are not minimal', 'Sah, tetapi muatan formal belum minimal'), W * 0.975, H * 0.08);
    } else {
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fs}px system-ui, sans-serif`;
      const hint = !state.bonds.every((b) => b > 0) ? T('Connect every atom with at least one bond', 'Hubungkan setiap atom dengan minimal satu ikatan')
        : an.used < an.total ? T(`${an.total - an.used} electrons still to place`, `${an.total - an.used} elektron belum ditempatkan`)
        : an.used > an.total ? T(`${an.used - an.total} electrons too many`, `${an.used - an.total} elektron terlalu banyak`)
        : T('Check each atom\'s electron count', 'Periksa jumlah elektron tiap atom');
      ctx.fillText(hint, W * 0.975, H * 0.08);
    }
    ctx.font = `${fs}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8';
    if (an.valid && state.mol.atoms.length > 2) {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(T(`${an.domains} electron domains on ${state.mol.atoms[0]}:`, `${an.domains} domain elektron pada ${state.mol.atoms[0]}:`), W * 0.975, H * 0.08 + fs * 1.7);
      ctx.fillText(T(`${an.per[0].nBonded} bonded atoms + ${state.lp[0]} lone pairs`, `${an.per[0].nBonded} atom terikat + ${state.lp[0]} pasangan bebas`), W * 0.975, H * 0.08 + fs * 3.4);
    } else {
      ctx.fillText(T('Click between atoms: bond ∅→–→=→≡', 'Klik di antara atom: ikatan ∅→–→=→≡'), W * 0.975, H * 0.08 + fs * 1.7);
      ctx.fillText(T('Click an atom: add a lone pair', 'Klik sebuah atom: tambah pasangan bebas'), W * 0.975, H * 0.08 + fs * 3.4);
    }
    // Bottom: VSEPR link + note
    ctx.textAlign = 'left';
    if (an.valid) {
      ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${fs}px system-ui, sans-serif`;
      ctx.fillText(T(`VSEPR shape: ${an.shape[0]}${an.shape[1] ? ', ' + an.shape[1] : ''}`, `Bentuk VSEPR: ${an.shape[0]}${an.shape[1] ? ', ' + an.shape[1] : ''}`), W * 0.025, H * 0.93);
    } else {
      ctx.fillStyle = '#64748b'; ctx.font = `${fs}px system-ui, sans-serif`;
      ctx.fillText(T('VSEPR shape appears when the structure is valid. Formal charge = valence − lone electrons − bonds.', 'Bentuk VSEPR muncul jika struktur sah. Muatan formal = valensi − elektron bebas − jumlah ikatan.'), W * 0.025, H * 0.93);
    }
    if (state.mol.note) {
      ctx.fillStyle = '#fbbf24'; ctx.font = `italic ${Math.round(fs * 0.95)}px system-ui, sans-serif`;
      const note = state.mol.note[getLocale() === 'id' ? 1 : 0];
      if (ctx.measureText(note).width <= W * 0.95) ctx.fillText(note, W * 0.025, H * 0.98);
    }
  }

  // ---------- interaction ----------
  function cycleBond(k) { state.bonds[k] = (state.bonds[k] + 1) % 4; syncEditor(); }
  function cycleLP(i) { const max = state.mol.atoms[i] === 'H' ? 1 : 4; state.lp[i] = (state.lp[i] + 1) % (max + 1); syncEditor(); }
  cv.canvas.style.touchAction = 'none';
  cv.canvas.style.cursor = 'pointer';
  const onDown = (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * cv.width / rect.width, y = (e.clientY - rect.top) * cv.height / rect.height;
    const pos = positions(), r = atomR();
    for (let i = 0; i < pos.length; i++) if (Math.hypot(x - pos[i][0], y - pos[i][1]) < r * 1.15) { cycleLP(i); return; }
    for (let k = 1; k < pos.length; k++) {
      const mx = (pos[0][0] + pos[k][0]) / 2, my = (pos[0][1] + pos[k][1]) / 2;
      if (Math.hypot(x - mx, y - my) < r * 0.9) { cycleBond(k - 1); return; }
    }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---------- controls ----------
  const molSel = select({
    label: T('Molecule', 'Molekul'), key: 'molecule',
    options: MOLECULES.map((m) => ({ value: m.id, label: `${m.formula} — ${m.name[getLocale() === 'id' ? 1 : 0]}` })),
    value: state.mol.id, onChange: (v) => load(v),
  });
  const answerB = button({ label: T('Show answer', 'Lihat jawaban'), onClick: () => { state.bonds = state.mol.answer.bonds.slice(); state.lp = state.mol.answer.lp.slice(); syncEditor(); } });
  const clearB = button({ label: T('Clear', 'Hapus'), onClick: () => load(state.mol.id) });
  const editor = document.createElement('div');
  editor.setAttribute('role', 'group');
  editor.setAttribute('aria-label', T('Keyboard editor: bonds and lone pairs', 'Editor papan ketik: ikatan dan pasangan bebas'));
  editor.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px';
  const noteEl = document.createElement('div');
  noteEl.style.cssText = 'font-size:0.85rem;color:#b45309;font-style:italic';
  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:0.8rem;color:var(--color-muted)';
  hint.textContent = T('Keyboard: Tab to a button and press Enter to cycle it. Bond pairs count 2 electrons each; lone pairs count 2 each.', 'Papan ketik: Tab ke tombol lalu tekan Enter untuk mengubahnya. Tiap pasangan ikatan 2 elektron; tiap pasangan bebas 2 elektron.');
  ctrlPanel.append(row(molSel), row(answerB, clearB), noteEl, editor, hint);
  let editorBtns = [];
  const BOND_SYM = ['∅', '–', '=', '≡'];
  function rebuildEditor() {
    noteEl.textContent = state.mol.note ? state.mol.note[getLocale() === 'id' ? 1 : 0] : '';
    noteEl.style.display = state.mol.note ? '' : 'none';
    editor.innerHTML = ''; editorBtns = [];
    const c = state.mol.atoms[0];
    state.mol.atoms.slice(1).forEach((sym, k) => {
      const b = button({ label: '', onClick: () => cycleBond(k) });
      b.el.style.minHeight = '40px';
      editorBtns.push({ el: b, text: () => T(`Bond ${c}${BOND_SYM[state.bonds[k]]}${sym}${state.mol.atoms.length > 2 ? ' #' + (k + 1) : ''}`, `Ikatan ${c}${BOND_SYM[state.bonds[k]]}${sym}${state.mol.atoms.length > 2 ? ' #' + (k + 1) : ''}`) });
      editor.appendChild(b.el);
    });
    state.mol.atoms.forEach((sym, i) => {
      const b = button({ label: '', onClick: () => cycleLP(i) });
      b.el.style.minHeight = '40px';
      editorBtns.push({ el: b, text: () => T(`${sym}${state.mol.atoms.length > 2 && i > 0 ? ' #' + i : ''} lone pairs: ${state.lp[i]}`, `Pasangan bebas ${sym}${state.mol.atoms.length > 2 && i > 0 ? ' #' + i : ''}: ${state.lp[i]}`) });
      editor.appendChild(b.el);
    });
    syncEditor();
  }
  function syncEditor() { for (const b of editorBtns) b.el.label = b.text(); }

  const lab = labPanel({
    title: 'Lewis structure lab',
    filename: 'lewis-structures-data.csv',
    columns: [
      { key: 'molecule', label: 'Molecule' },
      { key: 'valence', label: 'Valence e⁻' },
      { key: 'bondPairs', label: 'Bond pairs' },
      { key: 'lonePairs', label: 'Lone pairs' },
      { key: 'centralE', label: 'e⁻ on centre' },
      { key: 'shape', label: 'VSEPR shape' },
      { key: 'status', label: 'Status' },
    ],
    procedure: [
      'Choose H₂O. Count the valence electrons shown (6 + 2×1 = 8). Add two O–H bonds, then lone pairs until "Used" equals 8. Record.',
      'Repeat for CH₄ and NH₃. Record each. Which has a lone pair on the central atom, and how does the VSEPR shape change?',
      'Build CO₂ with two double bonds, then O₂ and N₂. Record. How many bond pairs does each need to complete every octet?',
      'Build SO₂. Try S=O on both sides, then S=O and S–O. Both are accepted — compare the formal charges and electron count on S.',
      'Build BF₃ and PCl₅. Record the number of electrons around the central atom. Which exception to the octet rule is each?',
      'Check: in every row, bond pairs + lone pairs should equal valence electrons ÷ 2.',
    ],
    predict: 'Before building: which of the ten molecules will NOT be able to give every atom exactly eight electrons? Why?',
    source: () => {
      const an = analysis();
      if (!state.bonds.some((b) => b > 0)) return null;
      return {
        molecule: state.mol.formula, valence: an.total,
        bondPairs: state.bonds.reduce((s, b) => s + b, 0), lonePairs: state.lp.reduce((s, l) => s + l, 0),
        centralE: an.per[0].electrons, shape: an.valid ? an.shape[0] : '–',
        status: an.best ? 'correct' : (an.valid ? 'valid (FC not minimal)' : 'incomplete'),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  load(state.mol.id);
  const animator = loop((dt, t) => { state.now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
