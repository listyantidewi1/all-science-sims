import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const MAX_C = 8;
const ROOT = { en: ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct'], id: ['', 'met', 'et', 'prop', 'but', 'pent', 'heks', 'hept', 'okt'] };
const MULT = ['', '', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca', 'undeca', 'dodeca'];
// Number of structural isomers of the alkanes C_nH_(2n+2), n = 1…8 (OEIS A000602).
const ALKANE_ISOMERS = [0, 1, 1, 1, 2, 3, 5, 9, 18];
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n) => (n === 1 ? '' : String(n).split('').map((d) => SUB[Number(d)]).join(''));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Molecule model: n chain carbons, bonds[i] = order of bond between C(i+1) and C(i+2),
// branches[i] = number of methyl groups (0–2) on chain carbon i+1 (only on inner carbons).
function analyse(n, bonds, branches) {
  const used = Array.from({ length: n }, (_, i) => (i > 0 ? bonds[i - 1] : 0) + (i < n - 1 ? bonds[i] : 0) + branches[i]);
  const H = used.reduce((s, u) => s + (4 - u), 0) + 3 * branches.reduce((s, b) => s + b, 0);
  const C = n + branches.reduce((s, b) => s + b, 0);
  const nDouble = bonds.filter((b) => b === 2).length, nTriple = bonds.filter((b) => b === 3).length;
  const saturated = nDouble + nTriple === 0;
  const unsat = (2 * C + 2 - H) / 2; // degrees of unsaturation
  return { used, H, C, nDouble, nTriple, saturated, unsat };
}

// IUPAC name. Chooses the numbering direction that gives the lowest locants to
// multiple bonds first (double before triple on a tie), then to substituents.
function iupacName(n, bonds, branches, lang) {
  const dirs = [false, true].map((rev) => {
    const pos = (i) => (rev ? n - i : i + 1); // chain index → locant
    const dbl = [], trp = [], subs = [];
    bonds.forEach((b, i) => { if (b > 1) { const lo = Math.min(pos(i), pos(i + 1)); (b === 2 ? dbl : trp).push(lo); } });
    branches.forEach((k, i) => { for (let m = 0; m < k; m++) subs.push(pos(i)); });
    const mult = [...dbl, ...trp].sort((a, b) => a - b);
    return { dbl: dbl.sort((a, b) => a - b), trp: trp.sort((a, b) => a - b), subs: subs.sort((a, b) => a - b), mult };
  });
  const cmp = (a, b) => { for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i]; return 0; };
  let d = dirs[0];
  const c1 = cmp(dirs[0].mult, dirs[1].mult);
  if (c1 > 0) d = dirs[1];
  else if (c1 === 0) {
    const c2 = cmp(dirs[0].dbl, dirs[1].dbl);
    if (c2 > 0) d = dirs[1];
    else if (c2 === 0 && cmp(dirs[0].subs, dirs[1].subs) > 0) d = dirs[1];
  }
  const root = ROOT[lang][n];
  let prefix = '';
  if (d.subs.length) prefix = `${d.subs.join(',')}-${MULT[d.subs.length]}${lang === 'id' ? 'metil' : 'methyl'}`;
  let stem;
  const isId = lang === 'id';
  if (!d.dbl.length && !d.trp.length) stem = root + (isId ? 'ana' : 'ane');
  else {
    // "a" is inserted before a multiplying prefix (buta-1,3-diene)
    const ene = isId ? 'ena' : 'ene', yne = isId ? 'una' : 'yne';
    // Locants are omitted when the position is unambiguous (ethene, propyne, 2-methylpropene).
    const loc = (arr) => (n <= 3 && d.dbl.length + d.trp.length === 1 ? '' : `-${arr.join(',')}-`);
    let s = root;
    if (d.dbl.length) {
      s += (d.dbl.length > 1 ? 'a' : '') + loc(d.dbl) + MULT[d.dbl.length] + (d.trp.length ? 'en' : ene);
    } else if (d.trp.length > 1) s += 'a';
    if (d.trp.length) s += loc(d.trp) + MULT[d.trp.length] + yne;
    stem = s;
  }
  return prefix + stem;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const lang = getLocale() === 'id' ? 'id' : 'en';
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = { n: 4, bonds: [1, 1, 1], branches: [0, 0, 0, 0], msg: '', msgAt: -10, now: 0 };

  function setN(k) {
    k = clamp(Math.round(k), 1, MAX_C);
    const bonds = Array.from({ length: k - 1 }, (_, i) => state.bonds[i] || 1);
    const branches = Array.from({ length: k }, (_, i) => (i === 0 || i === k - 1 ? 0 : (state.branches[i] || 0)));
    state.n = k; state.bonds = bonds; state.branches = branches;
    // re-validate valences (a shrunk chain can leave a carbon with too many bonds)
    for (let i = 0; i < k; i++) while (analyse(k, state.bonds, state.branches).used[i] > 4) {
      if (state.branches[i] > 0) state.branches[i]--; else if (i < k - 1 && state.bonds[i] > 1) state.bonds[i]--; else if (i > 0 && state.bonds[i - 1] > 1) state.bonds[i - 1]--; else break;
    }
    rebuildEditor();
  }
  function flash(msg) { state.msg = msg; state.msgAt = state.now; }
  function cycleBond(i) {
    const cur = state.bonds[i];
    let skipped = 0;
    for (let k = 1; k <= 3; k++) {
      const next = ((cur - 1 + k) % 3) + 1;
      const trial = state.bonds.slice(); trial[i] = next;
      const a = analyse(state.n, trial, state.branches);
      if (a.used[i] <= 4 && a.used[i + 1] <= 4) { state.bonds = trial; break; }
      skipped = next;
    }
    if (state.bonds[i] === cur) flash(T('No room: each carbon can make only 4 bonds', 'Tidak muat: tiap karbon hanya dapat membentuk 4 ikatan'));
    else if (skipped) flash(T(`A ${skipped === 3 ? 'triple' : 'double'} bond here was skipped: a carbon would need more than 4 bonds`, `Ikatan ${skipped === 3 ? 'rangkap tiga' : 'rangkap dua'} di sini dilewati: ada karbon yang akan melebihi 4 ikatan`));
    syncEditor();
  }
  function toggleBranch(i, slot) {
    if (i === 0 || i === state.n - 1) { flash(T('A methyl on an end carbon just makes the chain longer — extend the chain instead', 'Metil pada karbon ujung hanya memperpanjang rantai — perpanjang rantainya saja')); return; }
    const has = state.branches[i] > slot;
    const trial = state.branches.slice();
    if (has) trial[i] = slot; else trial[i] = slot + 1;
    if (analyse(state.n, state.bonds, trial).used[i] > 4) { flash(T('No room: this carbon already has 4 bonds', 'Tidak muat: karbon ini sudah memiliki 4 ikatan')); return; }
    state.branches = trial; syncEditor();
  }

  // Keyboard path: 0 → 1 → 2 → 0 methyls on inner carbon i (falls back to 0 when valence is full).
  function cycleBranch(i) {
    const next = (state.branches[i] + 1) % 3;
    const trial = state.branches.slice(); trial[i] = next;
    state.branches = analyse(state.n, state.bonds, trial).used[i] > 4 ? trial.map((v, k) => (k === i ? 0 : v)) : trial;
    syncEditor();
  }

  // ---------- geometry ----------
  const cellW = () => (cv.width * 0.92) / MAX_C;
  const colX = (i) => cv.width * 0.04 + cellW() * (i + 0.5);
  const rowY = (r) => cv.height * (r === 0 ? 0.33 : r === 1 ? 0.5 : 0.67);

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const { n, bonds, branches } = state;
    const a = analyse(n, bonds, branches);
    const name = iupacName(n, bonds, branches, lang);
    const fs = Math.max(10, Math.round(W * 0.02));
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // Header
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.9)}px system-ui, sans-serif`;
    ctx.fillText(`C${sub(a.C)}H${sub(a.H)}`, W * 0.04, H * 0.1);
    ctx.font = `bold ${Math.round(fs * 1.4)}px system-ui, sans-serif`; ctx.fillStyle = '#fde047';
    ctx.fillText(name, W * 0.04 + fs * 7, H * 0.1);
    ctx.font = `${fs}px system-ui, sans-serif`; ctx.fillStyle = '#cbd5e1';
    const cls = a.saturated ? T('saturated — alkane, fits CₙH₂ₙ₊₂', 'jenuh — alkana, memenuhi CₙH₂ₙ₊₂')
      : a.nTriple === 0 ? T(`unsaturated — alkene, ${a.nDouble} double bond${a.nDouble > 1 ? 's' : ''}`, `tak jenuh — alkena, ${a.nDouble} ikatan rangkap dua`)
      : a.nDouble === 0 ? T(`unsaturated — alkyne, ${a.nTriple} triple bond${a.nTriple > 1 ? 's' : ''}`, `tak jenuh — alkuna, ${a.nTriple} ikatan rangkap tiga`)
      : T('unsaturated — enyne (double and triple bonds)', 'tak jenuh — enuna (ikatan rangkap dua dan tiga)');
    ctx.fillText(cls + T(`  ·  degrees of unsaturation: ${a.unsat}`, `  ·  derajat ketidakjenuhan: ${a.unsat}`), W * 0.04, H * 0.1 + fs * 1.8);
    const branchTotal = branches.reduce((s, b) => s + b, 0);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T(`${n} chain carbons + ${branchTotal} methyl ${branchTotal === 1 ? 'branch' : 'branches'}  ·  H = Σ(4 − bonds on each C)`, `${n} karbon rantai + ${branchTotal} cabang metil  ·  H = Σ(4 − ikatan tiap C)`), W * 0.04, H * 0.1 + fs * 3.3);
    // Grid cells
    const cw = cellW(), cellH = H * 0.13;
    ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < MAX_C; i++) {
      for (let r = 0; r < 3; r++) {
        const x = colX(i), y = rowY(r);
        const inner = i > 0 && i < n - 1;
        const active = r === 1 ? i < n : (inner && branches[i] > (r === 0 ? 0 : 1));
        if (active) continue;
        const clickable = r === 1 ? true : inner;
        ctx.strokeStyle = clickable ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.1)';
        ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
        ctx.strokeRect(x - cw * 0.4, y - cellH * 0.4, cw * 0.8, cellH * 0.8); ctx.setLineDash([]);
        if (clickable) { ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.fillText(r === 1 ? (i === n ? '+C' : (i < n ? '' : '+')) : '+CH₃', x, y); }
      }
    }
    // Bonds between chain carbons (clickable midpoints)
    for (let i = 0; i < n - 1; i++) {
      const x1 = colX(i) + cw * 0.22, x2 = colX(i + 1) - cw * 0.22, y = rowY(1);
      const order = bonds[i];
      ctx.strokeStyle = order === 1 ? '#e2e8f0' : (order === 2 ? '#4ade80' : '#f472b6'); ctx.lineWidth = 2.5;
      for (let b = 0; b < order; b++) {
        const off = (b - (order - 1) / 2) * 6;
        ctx.beginPath(); ctx.moveTo(x1, y + off); ctx.lineTo(x2, y + off); ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(253,224,71,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.arc((x1 + x2) / 2, y, Math.min(cw * 0.22, 16), 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    }
    // Chain carbons: condensed labels CH₃ / CH₂ / CH / C
    const big = `bold ${Math.round(fs * 1.25)}px system-ui, sans-serif`;
    for (let i = 0; i < n; i++) {
      const x = colX(i), y = rowY(1);
      const h = 4 - a.used[i];
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(x - cw * 0.3, y - cellH * 0.36, cw * 0.6, cellH * 0.72, 6); ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = big;
      ctx.fillText(h === 0 ? 'C' : (h === 1 ? 'CH' : `CH${sub(h)}`), x, y);
      ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`;
      ctx.fillText(`C${i + 1}`, x, y + cellH * 0.55);
      // branches
      for (let s = 0; s < branches[i]; s++) {
        const by = rowY(s === 0 ? 0 : 2);
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x, y + (s === 0 ? -1 : 1) * cellH * 0.36); ctx.lineTo(x, by + (s === 0 ? 1 : -1) * cellH * 0.36); ctx.stroke();
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(x - cw * 0.3, by - cellH * 0.36, cw * 0.6, cellH * 0.72, 6); ctx.fill();
        ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#e2e8f0'; ctx.font = big; ctx.fillText('CH₃', x, by);
      }
    }
    // Hint / flash message
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
    if (state.now - state.msgAt < 2.5) { ctx.fillStyle = '#fbbf24'; ctx.fillText(state.msg, W * 0.04, H * 0.78); }
    else { ctx.fillStyle = '#64748b'; fitText(ctx, T('Click +C to extend the chain (click the last C to remove it) · click a bond to cycle – = ≡ · click +CH₃ to add a branch', 'Klik +C untuk memperpanjang rantai (klik C terakhir untuk menghapus) · klik ikatan untuk mengubah – = ≡ · klik +CH₃ untuk menambah cabang'), W * 0.04, H * 0.78, W * 0.92); }
    // Isomer table
    const ty = H * 0.86, tw = W * 0.92, cx0 = W * 0.04, colW = tw / (MAX_C + 1);
    ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8'; ctx.fillText(T('alkane', 'alkana'), cx0 + colW / 2, ty);
    ctx.fillText(T('isomers', 'isomer'), cx0 + colW / 2, ty + fs * 1.6);
    for (let k = 1; k <= MAX_C; k++) {
      const x = cx0 + colW * (k + 0.5);
      const hit = a.saturated && a.C === k;
      if (hit) { ctx.fillStyle = 'rgba(253,224,71,0.18)'; ctx.fillRect(x - colW / 2 + 2, ty - fs * 1.1, colW - 4, fs * 3.2); }
      ctx.fillStyle = hit ? '#fde047' : '#cbd5e1';
      ctx.fillText(`C${sub(k)}H${sub(2 * k + 2)}`, x, ty);
      ctx.font = `bold ${fs}px system-ui, sans-serif`; ctx.fillText(String(ALKANE_ISOMERS[k]), x, ty + fs * 1.6);
      ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
    }
    ctx.textAlign = 'left'; ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`;
    ctx.fillText(a.saturated
      ? T(`${a.C > 8 ? 'beyond the table' : ALKANE_ISOMERS[a.C] + ' structural isomer' + (ALKANE_ISOMERS[a.C] > 1 ? 's' : '')} share the formula C${sub(a.C)}H${sub(a.H)} — can you build another one?`, `${a.C > 8 ? 'di luar tabel' : ALKANE_ISOMERS[a.C] + ' isomer struktur'} memiliki rumus C${sub(a.C)}H${sub(a.H)} — bisakah kamu membangun yang lain?`)
      : T('isomer counts are for alkanes only; alkenes also have position and cis/trans isomers', 'jumlah isomer hanya untuk alkana; alkena juga punya isomer posisi dan cis/trans'), W * 0.04, H * 0.975);
  }

  function fitText(ctx, txt, x, y, maxW) {
    const w = ctx.measureText(txt).width;
    if (w > maxW && maxW > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(maxW / w, 1); ctx.fillText(txt, 0, 0); ctx.restore(); }
    else ctx.fillText(txt, x, y);
  }

  // ---------- pointer ----------
  cv.canvas.style.touchAction = 'none'; cv.canvas.style.cursor = 'pointer';
  const onDown = (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * cv.width / rect.width, y = (e.clientY - rect.top) * cv.height / rect.height;
    const cw = cellW(), cellH = cv.height * 0.13;
    // bond midpoints first
    for (let i = 0; i < state.n - 1; i++) {
      const mx = (colX(i) + colX(i + 1)) / 2;
      if (Math.hypot(x - mx, y - rowY(1)) < Math.min(cw * 0.24, 18)) { cycleBond(i); return; }
    }
    for (let i = 0; i < MAX_C; i++) {
      if (Math.abs(x - colX(i)) > cw * 0.4) continue;
      for (let r = 0; r < 3; r++) {
        if (Math.abs(y - rowY(r)) > cellH * 0.4) continue;
        if (r === 1) {
          if (i >= state.n) setN(i + 1);
          else if (i === state.n - 1) setN(state.n - 1);
          else setN(i + 1);
        } else toggleBranch(i, r === 0 ? 0 : 1);
        return;
      }
    }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // ---------- controls ----------
  const nS = slider({ label: T('Chain length (C atoms)', 'Panjang rantai (atom C)'), key: 'n', min: 1, max: MAX_C, step: 1, value: state.n, onInput: (v) => setN(v) });
  const editor = document.createElement('div');
  editor.setAttribute('role', 'group');
  editor.setAttribute('aria-label', T('Keyboard editor: bonds and methyl branches', 'Editor papan ketik: ikatan dan cabang metil'));
  editor.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px';
  const BOND_SYM = ['', '–', '=', '≡'];
  let editorBtns = [];
  function rebuildEditor() {
    nS.value = state.n;
    editor.innerHTML = ''; editorBtns = [];
    for (let i = 0; i < state.n - 1; i++) {
      const b = button({ label: '', onClick: () => cycleBond(i) }); b.el.style.minHeight = '40px';
      editorBtns.push({ el: b, text: () => `C${i + 1}${BOND_SYM[state.bonds[i]]}C${i + 2}` });
      editor.appendChild(b.el);
    }
    for (let i = 1; i < state.n - 1; i++) {
      const b = button({ label: '', onClick: () => cycleBranch(i) });
      b.el.style.minHeight = '40px';
      editorBtns.push({ el: b, text: () => T(`C${i + 1}: ${state.branches[i]} methyl`, `C${i + 1}: ${state.branches[i]} metil`) });
      editor.appendChild(b.el);
    }
    syncEditor();
  }
  function syncEditor() { for (const b of editorBtns) b.el.label = b.text(); }
  const presets = [
    ['CH₄', () => { state.bonds = []; state.branches = [0]; setN(1); }],
    ['C₂H₂', () => { state.bonds = [3]; state.branches = [0, 0]; setN(2); }],
    [T('2-methylpropane', '2-metilpropana'), () => { state.bonds = [1, 1]; state.branches = [0, 1, 0]; setN(3); }],
    [T('2,2-dimethylbutane', '2,2-dimetilbutana'), () => { state.bonds = [1, 1, 1]; state.branches = [0, 2, 0, 0]; setN(4); }],
    [T('Clear', 'Hapus'), () => { state.bonds = [1, 1, 1]; state.branches = [0, 0, 0, 0]; setN(4); }],
  ].map(([label, fn]) => button({ label, onClick: fn }));
  const hint = document.createElement('div'); hint.style.cssText = 'font-size:0.8rem;color:var(--color-muted)';
  hint.textContent = T('Keyboard: Tab to a bond or carbon button and press Enter. Methyl branches are allowed only on inner carbons; the sim keeps every carbon at 4 bonds.', 'Papan ketik: Tab ke tombol ikatan atau karbon lalu tekan Enter. Cabang metil hanya pada karbon dalam; simulasi menjaga setiap karbon tetap 4 ikatan.');
  ctrlPanel.append(nS.el, row(...presets), editor, hint);

  const lab = labPanel({
    title: 'Hydrocarbon lab — formula, name, isomers',
    filename: 'hydrocarbon-isomers-data.csv',
    columns: [
      { key: 'formula', label: 'Formula' },
      { key: 'name', label: 'IUPAC name' },
      { key: 'C', label: 'C' }, { key: 'H', label: 'H' },
      { key: 'kind', label: 'Class' },
      { key: 'isomers', label: 'Alkane isomers' },
    ],
    procedure: [
      'Build straight chains of 1 to 8 carbons with single bonds only. Record each. Check that H = 2C + 2 every time.',
      'Set the chain to 3 carbons and add a methyl on C2. Record. Compare with butane: same formula C₄H₁₀, different name — structural isomers.',
      'Build all three C₅H₁₂ isomers (pentane, 2-methylbutane, 2,2-dimethylpropane) and record them. Does the table agree?',
      'Make a 4-carbon chain and set one bond to double. Record but-1-ene and but-2-ene. How many H atoms were lost per double bond?',
      'Set a bond to triple. Record. Then try 2,2-dimethyl on a carbon next to a triple bond: why does the sim refuse?',
      'Build 2-methylbut-1-ene, then move the methyl to C3. Which carbon gets number 1, and why does the name change?',
    ],
    predict: 'How many different alkanes have the formula C₆H₁₄? Sketch your guesses before using the table.',
    source: () => {
      const a = analyse(state.n, state.bonds, state.branches);
      return {
        formula: `C${sub(a.C)}H${sub(a.H)}`, name: iupacName(state.n, state.bonds, state.branches, 'en'), C: a.C, H: a.H,
        kind: a.saturated ? 'alkane (saturated)' : (a.nTriple ? (a.nDouble ? 'enyne' : 'alkyne') : 'alkene') + ' (unsaturated)',
        isomers: a.saturated && a.C <= 8 ? ALKANE_ISOMERS[a.C] : null,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  rebuildEditor();
  const animator = loop((dt, t) => { state.now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
