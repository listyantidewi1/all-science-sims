import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// First 30 bases of the human HBB (β-globin) coding sequence.
const HBB = 'ATGGTGCACCTGACTCCTGAGGAGAAGTCT';
// Standard genetic code, mRNA codons, base order U C A G for each position.
const AA1 = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const IDX = { U: 0, C: 1, A: 2, G: 3 };
const NAME3 = { A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly', H: 'His', I: 'Ile', L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val', '*': 'Stop' };
const PROP = { hydrophobic: 'AVLIMFWPG', polar: 'STNQCY', positive: 'KRH', negative: 'DE' };
const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
const translateCodon = (c) => (c.length === 3 ? AA1[16 * IDX[c[0]] + 4 * IDX[c[1]] + IDX[c[2]]] : null);
const toRNA = (dna) => dna.replace(/T/g, 'U');
function translate(rna) {
  const out = [];
  for (let i = 0; i + 3 <= rna.length; i += 3) {
    const c = rna.slice(i, i + 3), a = translateCodon(c);
    out.push({ codon: c, aa: a });
    if (a === '*') break;
  }
  const rem = rna.length - 3 * out.length;
  return { aas: out, partial: out.length && out[out.length - 1].aa === '*' ? '' : rna.slice(rna.length - (rem % 3 || 0)).slice(0, rem % 3) };
}

const C = {
  bg: '#0b1220', text: '#e5e7eb', dim: '#94a3b8', box: 'rgba(255,255,255,0.08)',
  A: '#22c55e', T: '#ef4444', G: '#f59e0b', C: '#3b82f6', U: '#ef4444',
  hydrophobic: '#d97706', polar: '#059669', positive: '#2563eb', negative: '#db2777', stop: '#7f1d1d', changed: '#f87171', ins: '#22c55e',
};
const aaColor = (a) => (a === '*' ? C.stop : PROP.hydrophobic.includes(a) ? C.hydrophobic : PROP.polar.includes(a) ? C.polar : PROP.positive.includes(a) ? C.positive : C.negative);

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const state = { base: HBB, type: 'sub', pos: 20, nb: 'T', rib: 0, ribT: 0, kept: 0 };
  let now = 0;

  function mutant() {
    const b = state.base, p = clamp(state.pos, 1, b.length);
    if (state.type === 'sub') return b.slice(0, p - 1) + state.nb + b.slice(p);
    if (state.type === 'ins') return b.slice(0, p - 1) + state.nb + b.slice(p - 1);
    if (state.type === 'del') return b.slice(0, p - 1) + b.slice(p);
    return b;
  }
  // Describe the pending mutation relative to the current baseline.
  function analyse() {
    const orig = state.base, mut = mutant();
    const to = translate(toRNA(orig)), tm = translate(toRNA(mut));
    const p = state.pos, ci = Math.floor((p - 1) / 3);
    const res = { type: state.type, pos: p, codonChange: '-', aaChange: '-', cls: 'none', outcome: '', changedIdx: new Set(), orig: to, mut: tm, origSeq: orig, mutSeq: mut };
    if (state.type === 'none' || (state.type === 'sub' && orig[p - 1] === state.nb)) {
      res.type = 'none'; res.cls = T('no change', 'tidak ada perubahan'); res.outcome = T('identical protein', 'protein identik'); return res;
    }
    // compare amino acids position by position
    const n = Math.max(to.aas.length, tm.aas.length);
    let changed = 0, firstStop = null;
    for (let i = 0; i < n; i++) {
      const a = to.aas[i]?.aa, m = tm.aas[i]?.aa;
      if (a !== m) { changed++; res.changedIdx.add(i); }
      if (m === '*' && a !== '*' && firstStop == null) firstStop = i;
    }
    if (state.type === 'sub') {
      const c0 = toRNA(orig.slice(ci * 3, ci * 3 + 3)), c1 = toRNA(mut.slice(ci * 3, ci * 3 + 3));
      const a0 = translateCodon(c0), a1 = translateCodon(c1);
      res.codonChange = `codon ${ci + 1}: ${c0} → ${c1}`;
      res.aaChange = `${NAME3[a0]} → ${NAME3[a1]}`;
      if (a0 === a1) { res.cls = T('silent', 'diam (silent)'); res.outcome = T('identical protein (synonymous codon)', 'protein identik (kodon sinonim)'); }
      else if (a1 === '*') { res.cls = T('nonsense', 'nonsense'); res.outcome = T(`truncated: stop at codon ${ci + 1} (${ci} aa instead of ${to.aas.length}+)`, `terpotong: stop di kodon ${ci + 1} (${ci} aa, bukan ${to.aas.length}+)`); }
      else if (a0 === '*') { res.cls = T('stop lost', 'stop hilang'); res.outcome = T('read-through: protein lengthened', 'terbaca terus: protein memanjang'); }
      else { res.cls = T('missense', 'missense'); res.outcome = T(`1 amino acid changed (${NAME3[a0]}${ci + 1} → ${NAME3[a1]})`, `1 asam amino berubah (${NAME3[a0]}${ci + 1} → ${NAME3[a1]})`); }
    } else {
      const shift = state.type === 'ins' ? '+1' : '−1';
      res.codonChange = T(`from codon ${ci + 1} onward (frame ${shift})`, `dari kodon ${ci + 1} ke hilir (kerangka ${shift})`);
      res.aaChange = T(`${changed} aa differ`, `${changed} aa berbeda`);
      res.cls = T(`frameshift (${shift})`, `pergeseran kerangka (${shift})`);
      const down = to.aas.length - ci;
      res.outcome = firstStop != null
        ? T(`frameshift: ${changed} of ${down} downstream aa changed, premature stop at codon ${firstStop + 1}`, `pergeseran: ${changed} dari ${down} aa hilir berubah, stop prematur di kodon ${firstStop + 1}`)
        : T(`frameshift: ${changed} of ${down} downstream aa changed, no stop within fragment`, `pergeseran: ${changed} dari ${down} aa hilir berubah, tidak ada stop dalam fragmen`);
    }
    return res;
  }

  function restartRibosome() { state.rib = 0; state.ribT = now; }
  function step() {
    const a = analyse();
    const nC = a.mut.aas.length + 1;
    const period = 0.6 + 0.45 * (nC + 2) + 2.5;          // reveal codon by codon, hold, then loop
    const el = (now - state.ribT) % period;
    state.rib = el < 0.6 ? 0 : Math.min(nC + 2, (el - 0.6) / 0.45);
  }

  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(8, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(8, Math.round(px))}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  function layout() {
    const W = cv.width, H = cv.height;
    const left = W * 0.03, aw = W * 0.94;
    const unit = aw / (31 + 11 * 0.5);
    return { W, H, left, unit, box: unit * 0.9, gap: unit * 0.5, fs: clamp(W * 0.013, 8, 13) };
  }
  // x position of base i (0-based) when grouped in codons (frame from index 0)
  const xOf = (L, i) => L.left + i * L.unit + Math.floor(i / 3) * L.gap;

  function drawBases(ctx, L, y, seq, opts) {
    const h = L.box * 1.1;
    for (let i = 0; i < seq.length; i++) {
      const x = xOf(L, i), b = seq[i];
      let fill = opts.dim ? C.box : (C[b] || C.box);
      if (opts.hl && opts.hl.has(i)) { ctx.fillStyle = opts.hlColor || C.changed; ctx.fillRect(x - 2, y - 2, L.box + 4, h + 4); }
      ctx.fillStyle = fill; ctx.globalAlpha = opts.dim ? 1 : 0.85; ctx.fillRect(x, y, L.box, h); ctx.globalAlpha = 1;
      ctx.fillStyle = opts.dim ? C.dim : '#fff'; ctx.font = mono(L.box * 0.75, !opts.dim); ctx.textAlign = 'center';
      ctx.fillText(b, x + L.box / 2, y + h * 0.72);
      if (opts.numbers) { ctx.fillStyle = C.dim; ctx.font = font(L.fs * 0.7); ctx.fillText(String(i + 1), x + L.box / 2, y - 3); }
    }
    if (opts.gapAt != null) { const x = xOf(L, opts.gapAt); ctx.strokeStyle = C.changed; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - L.unit * 0.05 - 1, y - 4); ctx.lineTo(x - L.unit * 0.05 - 1, y + h + 4); ctx.stroke(); }
    if (opts.codonNumbers) { ctx.fillStyle = C.dim; ctx.font = font(L.fs * 0.75); ctx.textAlign = 'center'; for (let c = 0; c * 3 < seq.length; c++) ctx.fillText(String(c + 1), xOf(L, c * 3) + (L.unit * 3 - L.unit + L.box) / 2, y + h + L.fs); }
    ctx.textAlign = 'left';
    return h;
  }
  function drawProtein(ctx, L, y, tr, changedIdx, revealUpTo, partial) {
    const h = L.box * 1.25, w = L.unit * 3 - L.unit + L.box;
    tr.aas.forEach((a, i) => {
      if (revealUpTo != null && i > revealUpTo) return;
      const x = xOf(L, i * 3);
      const chg = changedIdx && changedIdx.has(i);
      ctx.fillStyle = aaColor(a.aa); ctx.beginPath();
      if (a.aa === '*') { const cx = x + w / 2, cy = y + h / 2, r = h / 2; for (let k = 0; k < 8; k++) { const an = Math.PI / 8 + k * Math.PI / 4; k ? ctx.lineTo(cx + r * Math.cos(an), cy + r * Math.sin(an)) : ctx.moveTo(cx + r * Math.cos(an), cy + r * Math.sin(an)); } ctx.closePath(); }
      else ctx.roundRect(x, y, w, h, h / 2);
      ctx.fill();
      if (chg) { ctx.strokeStyle = C.changed; ctx.lineWidth = 3; ctx.stroke(); }
      ctx.fillStyle = '#fff'; ctx.font = font(Math.min(L.fs, w * 0.3), true); ctx.textAlign = 'center';
      ctx.fillText(a.aa === '*' ? 'STOP' : NAME3[a.aa], x + w / 2, y + h * 0.68);
    });
    if (partial && (revealUpTo == null || revealUpTo >= tr.aas.length)) {
      const x = xOf(L, tr.aas.length * 3); ctx.strokeStyle = C.dim; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(x, y, w * 0.6, h, h / 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.dim; ctx.font = font(L.fs * 0.8); ctx.textAlign = 'center'; ctx.fillText(T('incomplete', 'tak lengkap'), x + w * 0.3, y + h * 0.68);
    }
    ctx.textAlign = 'left';
    return h;
  }

  function draw() {
    const ctx = cv.ctx, L = layout();
    const { W, H, fs } = L;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
    const a = analyse();
    const label = (y, txt, col) => { ctx.fillStyle = col || C.dim; ctx.font = font(fs); ctx.textAlign = 'left'; ctx.fillText(txt, L.left, y); };
    let y = fs * 1.6;
    label(y, T('ORIGINAL GENE (human β-globin, first 30 bases) — DNA coding strand 5′→3′', 'GEN ASLI (β-globin manusia, 30 basa pertama) — untai pengode DNA 5′→3′'), C.text);
    y += fs * 1.6;
    let h = drawBases(ctx, L, y, a.origSeq, { numbers: true });
    y += h + 2;
    h = drawBases(ctx, L, y, a.origSeq.split('').map((b) => COMP[b]).join(''), { dim: true });
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.75); ctx.fillText(T('template strand 3′→5′', 'untai cetakan 3′→5′'), xOf(L, a.origSeq.length) + 4, y + h * 0.75);
    y += h + fs * 1.2;
    label(y, T('mRNA (transcription: T → U)', 'mRNA (transkripsi: T → U)'));
    y += fs * 0.5;
    h = drawBases(ctx, L, y, toRNA(a.origSeq), { codonNumbers: true });
    y += h + fs * 2.1; // leave room for the codon numbers under the mRNA row
    label(y, T('protein (translation)', 'protein (translasi)'));
    y += fs * 0.5;
    h = drawProtein(ctx, L, y, a.orig, null, null, a.orig.partial);
    ctx.fillStyle = C.dim; ctx.font = font(fs * 0.8); ctx.fillText(T('… continues (146 aa)', '… berlanjut (146 aa)'), xOf(L, a.orig.aas.length * 3) + 4, y + h * 0.7);
    y += h + fs * 1.0;
    // divider
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(L.left, y); ctx.lineTo(W - L.left, y); ctx.stroke(); ctx.setLineDash([]);
    y += fs * 1.5;
    const title = a.type === 'none' ? T('MUTANT GENE — no mutation selected', 'GEN MUTAN — tidak ada mutasi dipilih')
      : a.type === 'sub' ? T(`MUTANT GENE — substitution at base ${a.pos}: ${a.origSeq[a.pos - 1]} → ${state.nb}`, `GEN MUTAN — substitusi pada basa ${a.pos}: ${a.origSeq[a.pos - 1]} → ${state.nb}`)
        : a.type === 'ins' ? T(`MUTANT GENE — insertion of ${state.nb} before base ${a.pos}`, `GEN MUTAN — insersi ${state.nb} sebelum basa ${a.pos}`)
          : T(`MUTANT GENE — deletion of base ${a.pos} (${a.origSeq[a.pos - 1]})`, `GEN MUTAN — delesi basa ${a.pos} (${a.origSeq[a.pos - 1]})`);
    label(y, title, C.changed);
    y += fs * 1.6;
    const hl = new Set(); let gapAt = null;
    if (a.type === 'sub' || a.type === 'ins') hl.add(a.pos - 1);
    if (a.type === 'del') gapAt = a.pos - 1;
    h = drawBases(ctx, L, y, a.mutSeq, { hl, hlColor: a.type === 'ins' ? C.ins : C.changed, gapAt });
    y += h + fs * 1.2;
    label(y, T('mutant mRNA', 'mRNA mutan'));
    y += fs * 0.5;
    h = drawBases(ctx, L, y, toRNA(a.mutSeq), { codonNumbers: true, hl, hlColor: a.type === 'ins' ? C.ins : C.changed, gapAt });
    // ribosome
    const nC = a.mut.aas.length, ribIdx = Math.floor(state.rib);
    if (ribIdx < nC) {
      const rx = xOf(L, ribIdx * 3) - 4, rw = L.unit * 3 - L.unit + L.box + 8;
      ctx.fillStyle = 'rgba(167,139,250,0.3)'; ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(rx, y - 6, rw, h + fs * 1.4 + L.box * 1.25 + 12, 8); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#a78bfa'; ctx.font = font(fs * 0.8); ctx.textAlign = 'center'; ctx.fillText(T('ribosome', 'ribosom'), rx + rw / 2, y - 8); ctx.textAlign = 'left';
    }
    y += h + fs * 2.1;
    label(y, T('mutant protein', 'protein mutan'));
    y += fs * 0.5;
    h = drawProtein(ctx, L, y, a.mut, a.changedIdx, ribIdx - 1 + (state.rib >= nC ? 2 : 0), a.mut.partial);
    y += h + fs * 1.8;
    // readout
    ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.beginPath(); ctx.roundRect(L.left, y - fs * 1.2, W - 2 * L.left, Math.max(fs * 4.2, H - y + fs * 0.8), 8); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = font(fs, true);
    ctx.fillText(`${T('Class', 'Jenis')}: ${a.cls}`, L.left + fs, y);
    ctx.font = font(fs); ctx.fillStyle = C.dim;
    ctx.fillText(`${T('Codon change', 'Perubahan kodon')}: ${a.codonChange}   ·   ${T('Amino acid', 'Asam amino')}: ${a.aaChange}`, L.left + fs, y + fs * 1.4);
    ctx.fillStyle = C.text; ctx.fillText(`${T('Protein outcome', 'Hasil protein')}: ${a.outcome}`, L.left + fs, y + fs * 2.8);
    if (state.kept) { ctx.fillStyle = C.dim; ctx.textAlign = 'right'; ctx.fillText(T(`${state.kept} kept mutation(s) in baseline`, `${state.kept} mutasi tersimpan di gen dasar`), W - L.left - fs, y); ctx.textAlign = 'left'; }
    // legend
    const leg = [[C.hydrophobic, T('hydrophobic', 'hidrofobik')], [C.polar, T('polar', 'polar')], [C.positive, T('+ charged', 'bermuatan +')], [C.negative, T('− charged', 'bermuatan −')], [C.stop, 'stop']];
    let lx = L.left + fs; const ly = y + fs * 4.2;
    if (ly < H - 2) { ctx.font = font(fs * 0.8); for (const [col, lab] of leg) { ctx.fillStyle = col; ctx.fillRect(lx, ly - fs * 0.7, fs * 0.9, fs * 0.7); ctx.fillStyle = C.dim; ctx.fillText(lab, lx + fs * 1.2, ly); lx += fs * 1.6 + ctx.measureText(lab).width + fs; } }
  }

  // ---------- controls ----------
  const typeSel = select({
    label: 'Mutation type', key: 'type', value: 'sub',
    options: [{ value: 'none', label: 'None (original gene)' }, { value: 'sub', label: 'Substitution (change one base)' }, { value: 'ins', label: 'Insertion (add one base)' }, { value: 'del', label: 'Deletion (remove one base)' }],
    onChange: (v) => { state.type = v; restartRibosome(); },
  });
  const posS = slider({ label: 'Position (base number)', key: 'pos', min: 1, max: 30, step: 1, value: state.pos, onInput: (v) => { state.pos = v; restartRibosome(); } });
  const baseSel = select({ label: 'New base (substitution / insertion)', key: 'base', value: 'T', options: ['A', 'C', 'G', 'T'].map((b) => ({ value: b, label: b })), onChange: (v) => { state.nb = v; restartRibosome(); } });
  const preset = (type, pos, nb) => { typeSel.apply(type); posS.apply(pos); if (nb) baseSel.apply(nb); restartRibosome(); };
  const sickle = button({ label: 'Sickle-cell preset (GAG → GTG)', primary: true, onClick: () => preset('sub', 20, 'T') });
  const silent = button({ label: 'Silent example (CAC → CAT)', onClick: () => preset('sub', 9, 'T') });
  const nonsense = button({ label: 'Nonsense example (GAG → TAG)', onClick: () => preset('sub', 19, 'T') });
  const frame = button({ label: 'Frameshift example (delete base 4)', onClick: () => preset('del', 4) });
  const randomB = button({ label: 'Random mutation', onClick: () => { const t = ['sub', 'ins', 'del'][Math.floor(Math.random() * 3)]; const p = 1 + Math.floor(Math.random() * 30); const b = 'ACGT'[Math.floor(Math.random() * 4)]; preset(t, p, b); } });
  const keepB = button({ label: 'Keep mutation (stack another)', onClick: () => { if (state.type !== 'none') { state.base = mutant(); state.kept++; posS.apply(Math.min(state.pos, state.base.length)); typeSel.apply('none'); } } });
  const resetB = button({ label: 'Reset gene', onClick: () => { state.base = HBB; state.kept = 0; preset('none', 20, 'T'); } });
  ctrlPanel.append(typeSel.el, posS.el, baseSel.el, row(sickle, silent), row(nonsense, frame), row(randomB, keepB, resetB));

  const lab = labPanel({
    title: 'Mutation lab — type, position, codons, protein',
    filename: 'mutations-data.csv',
    columns: [
      { key: 'type', label: 'Mutation type' },
      { key: 'pos', label: 'Position' },
      { key: 'codon', label: 'Codon change' },
      { key: 'aa', label: 'Amino acid change' },
      { key: 'cls', label: 'Class' },
      { key: 'outcome', label: 'Protein outcome' },
    ],
    procedure: [
      'Substitution at position 21: try A, C, G, T in turn and record each. Which are silent?',
      'Press the Sickle-cell preset and record.',
      'Record the Nonsense example. How many amino acids remain?',
      'Record the Frameshift example (delete base 4). Then try a deletion at position 28 and record: how many amino acids change now?',
      'Insert a base at position 4 and record. Compare with the deletion.',
      'From your table: which mutation types changed the most amino acids? Which changed none?',
    ],
    predict: 'Which will change more amino acids: substituting one base in the middle of the gene, or deleting one base near the start? Why?',
    source: () => {
      const a = analyse(); if (a.type === 'none') return null;
      const tn = { sub: 'substitution', ins: 'insertion', del: 'deletion' }[a.type];
      return { type: a.type === 'sub' ? `${tn} ${a.origSeq[a.pos - 1]}→${state.nb}` : a.type === 'ins' ? `${tn} +${state.nb}` : `${tn} −${a.origSeq[a.pos - 1]}`, pos: a.pos, codon: a.codonChange, aa: a.aaChange, cls: a.cls, outcome: a.outcome };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
