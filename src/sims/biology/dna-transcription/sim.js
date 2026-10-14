import { button, row, slider, toggle } from '../../../lib/controls.js';

const CODON_TABLE = {
  UUU:'Phe', UUC:'Phe', UUA:'Leu', UUG:'Leu',
  CUU:'Leu', CUC:'Leu', CUA:'Leu', CUG:'Leu',
  AUU:'Ile', AUC:'Ile', AUA:'Ile', AUG:'Met',
  GUU:'Val', GUC:'Val', GUA:'Val', GUG:'Val',
  UCU:'Ser', UCC:'Ser', UCA:'Ser', UCG:'Ser',
  CCU:'Pro', CCC:'Pro', CCA:'Pro', CCG:'Pro',
  ACU:'Thr', ACC:'Thr', ACA:'Thr', ACG:'Thr',
  GCU:'Ala', GCC:'Ala', GCA:'Ala', GCG:'Ala',
  UAU:'Tyr', UAC:'Tyr', UAA:'STOP', UAG:'STOP',
  CAU:'His', CAC:'His', CAA:'Gln', CAG:'Gln',
  AAU:'Asn', AAC:'Asn', AAA:'Lys', AAG:'Lys',
  GAU:'Asp', GAC:'Asp', GAA:'Glu', GAG:'Glu',
  UGU:'Cys', UGC:'Cys', UGA:'STOP', UGG:'Trp',
  CGU:'Arg', CGC:'Arg', CGA:'Arg', CGG:'Arg',
  AGU:'Ser', AGC:'Ser', AGA:'Arg', AGG:'Arg',
  GGU:'Gly', GGC:'Gly', GGA:'Gly', GGG:'Gly',
};

const BASE_COLOR = { A: '#ef4444', T: '#3b82f6', U: '#06b6d4', G: '#10b981', C: '#f59e0b' };

const DNA_COMPLEMENT = { A: 'T', T: 'A', G: 'C', C: 'G' };

/** The typed strand is the coding (sense) strand 5'→3'. The template strand is its complement, read 3'→5'. */
function templateStrand(coding) {
  return coding.replace(/[ATGC]/g, (b) => DNA_COMPLEMENT[b] || b);
}

/** mRNA has the same sequence as the coding strand, with U in place of T (it is the complement of the template). */
function codingToRna(coding) {
  return coding.replace(/T/g, 'U');
}

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-3)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const state = {
    dna: 'ATGGCATTGGCCGAATAA',   // coding strand 5'→3': Met-Ala-Leu-Ala-Glu-stop
    progress: 0,           // index in DNA
    autoplay: true,
    speed: 2.5,            // bases per second
  };

  const dnaInput = document.createElement('input');
  dnaInput.type = 'text';
  dnaInput.value = state.dna;
  dnaInput.spellcheck = false;
  dnaInput.setAttribute('aria-label', "DNA coding strand (5' to 3')");
  dnaInput.style.cssText = `
    width: 100%; font-family: var(--font-mono); font-size: 14px;
    padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 8px;
    background: var(--color-surface-2); color: var(--color-fg); letter-spacing: 2px;
    margin-bottom: var(--space-3);
  `;
  dnaInput.addEventListener('input', () => {
    state.dna = dnaInput.value.toUpperCase().replace(/[^ATGC]/g, '');
    dnaInput.value = state.dna;
    state.progress = Math.min(state.progress, state.dna.length);
    render();
  });
  stage.appendChild(dnaInput);

  const display = document.createElement('div');
  display.style.cssText = `
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2);
    padding: var(--space-4);
    overflow-x: auto;
  `;
  stage.appendChild(display);

  function baseSpan(b, opts = {}) {
    const c = BASE_COLOR[b] || '#94a3b8';
    const muted = opts.muted ? '0.25' : '1';
    const ring = opts.ring ? 'box-shadow:0 0 0 2px #fbbf24;' : '';
    const idx = opts.index != null ? `data-base-index="${opts.index}"` : '';
    return `<span ${idx} style="
      display:inline-flex;align-items:center;justify-content:center;
      width:28px;height:32px;margin:1px;border-radius:6px;
      background:${c};color:white;font-family:var(--font-mono);font-weight:700;
      opacity:${muted};cursor:pointer;${ring}
    ">${b}</span>`;
  }

  const emptySlot = `<span style="display:inline-flex;width:28px;height:32px;margin:1px;border-radius:6px;border:1px dashed var(--color-border)"></span>`;

  function render() {
    const dna = state.dna;
    const template = templateStrand(dna);
    const fullRna = codingToRna(dna);
    const transcribed = fullRna.slice(0, state.progress);

    // Translation starts at the first AUG and runs in frame until the first stop codon.
    const startIdx = transcribed.indexOf('AUG');
    const codons = [];
    let stopEnd = -1;           // index just past the stop codon, once reached
    if (startIdx >= 0) {
      for (let i = startIdx; i + 2 < transcribed.length; i += 3) {
        const codon = transcribed.slice(i, i + 3);
        codons.push(codon);
        if (CODON_TABLE[codon] === 'STOP') { stopEnd = i + 3; break; }
      }
    }

    // Highlight the codon currently being read (in frame from the start AUG);
    // nothing is ringed before the start codon appears or after the stop codon.
    let codonStart = -1;
    if (startIdx >= 0 && state.progress > startIdx && (stopEnd < 0 || state.progress <= stopEnd)) {
      codonStart = startIdx + Math.floor((state.progress - 1 - startIdx) / 3) * 3;
    }
    const inCodon = (i) => codonStart >= 0 && i >= codonStart && i < codonStart + 3 && i < state.progress;

    let codingHTML = '';
    let templateHTML = '';
    for (let i = 0; i < dna.length; i++) {
      codingHTML += baseSpan(dna[i], { muted: i >= state.progress, ring: inCodon(i), index: i });
      templateHTML += baseSpan(template[i], { muted: i >= state.progress, index: i });
    }

    let rnaHTML = '';
    for (let i = 0; i < dna.length; i++) {
      const b = i < state.progress ? fullRna[i] : '';
      rnaHTML += b ? baseSpan(b, { ring: inCodon(i) }) : emptySlot;
    }

    let aaHTML = '';
    for (const codon of codons) {
      const aa = CODON_TABLE[codon] || '?';
      const bg = aa === 'STOP' ? '#0b1220' : '#8b5cf6';
      aaHTML += `
        <div style="display:flex;flex-direction:column;align-items:center;margin:0 2px">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${codon}</span>
          <span style="
            margin-top:4px;padding:6px 10px;border-radius:6px;
            background:${bg};color:#fff;font-weight:700;font-size:12px;
          ">${aa}</span>
        </div>
      `;
    }
    const aaEmpty = startIdx < 0
      ? 'Waiting for an AUG start codon in the mRNA'
      : 'Start codon found — reading the first codon';

    // Polymerase cursor position
    const polyPos = state.progress;
    const labelStyle = 'color:var(--color-muted);font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase';

    display.innerHTML = `
      <div style="margin-bottom:6px;${labelStyle}">
        DNA coding strand (5' → 3') — typed above
      </div>
      <div style="position:relative">
        <div style="display:flex;flex-wrap:wrap">${codingHTML}</div>
        <div style="position:absolute;top:-2px;left:${polyPos * 30}px;height:36px;width:32px;border:2px solid #f59e0b;border-radius:8px;pointer-events:none;transition:left 0.18s ease"></div>
      </div>
      <div style="margin:10px 0 6px;${labelStyle}">
        DNA template strand (3' → 5') — read by RNA polymerase
      </div>
      <div style="display:flex;flex-wrap:wrap">${templateHTML}</div>
      <div style="margin:14px 0 6px;${labelStyle}">
        mRNA (5' → 3') — complement of the template, same as coding strand with U for T
      </div>
      <div style="display:flex;flex-wrap:wrap">${rnaHTML}</div>
      <div style="margin:14px 0 6px;${labelStyle}">
        Polypeptide — from the first AUG to the first stop codon
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start">${aaHTML || `<span style="color:var(--color-muted);font-size:13px">${aaEmpty}</span>`}</div>
    `;
  }

  // controls
  const scrubS = slider({
    label: 'Scrub position', min: 0, max: 1, step: 1, value: 0,
    onInput: (v) => { state.progress = Math.max(0, Math.min(state.dna.length, v)); state.autoplay = false; playT.value = false; render(); },
  });
  function refreshScrub() {
    scrubS.el.querySelector('input').max = state.dna.length;
    scrubS.value = state.progress;
  }

  const playT = toggle({ label: 'Auto-advance', value: state.autoplay, onChange: (v) => { state.autoplay = v; } });
  const speedS = slider({
    label: 'Bases / second', min: 0.5, max: 10, step: 0.5, value: state.speed,
    onInput: (v) => { state.speed = v; },
  });
  const stepB = button({ label: 'Step', onClick: () => { state.progress = Math.min(state.dna.length, state.progress + 1); render(); } });
  const back1B = button({ label: '◀ Step', onClick: () => { state.progress = Math.max(0, state.progress - 1); render(); } });
  const resetB = button({ label: 'Reset', onClick: () => { state.progress = 0; render(); } });
  const fullB = button({ label: 'Skip to end', primary: true, onClick: () => { state.progress = state.dna.length; render(); } });
  const exB = button({ label: 'Example: insulin signal', onClick: () => {
    // Coding strand of the human preproinsulin signal peptide: MALWMRLLPLLALLA
    state.dna = 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCC';
    dnaInput.value = state.dna;
    state.progress = 0;
    render();
  } });

  // Click any base in the strand to jump the polymerase there.
  display.addEventListener('click', (e) => {
    const t = e.target.closest('[data-base-index]');
    if (!t) return;
    const idx = Number(t.getAttribute('data-base-index'));
    if (Number.isFinite(idx)) {
      state.progress = idx + 1;
      state.autoplay = false;
      playT.value = false;
      render();
    }
  });

  ctrlPanel.append(scrubS.el, speedS.el, playT.el, row(back1B, stepB, resetB, fullB), row(exB));

  let raf = 0, last = 0, acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    if (state.autoplay && state.progress < state.dna.length) {
      acc += dt * state.speed;
      while (acc >= 1) {
        state.progress = Math.min(state.dna.length, state.progress + 1);
        acc -= 1;
      }
      render();
    }
    refreshScrub();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  render();
  refreshScrub();

  return () => { cancelAnimationFrame(raf); };
}
