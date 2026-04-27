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

function dnaToRna(d) {
  return d.replace(/[ATGC]/g, (b) => ({ A: 'U', T: 'A', G: 'C', C: 'G' }[b] || b));
}

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-3)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const state = {
    dna: 'ATGGCATTGGCCGAATAA',
    progress: 0,           // index in DNA
    autoplay: true,
    speed: 2.5,            // bases per second
  };

  const dnaInput = document.createElement('input');
  dnaInput.type = 'text';
  dnaInput.value = state.dna;
  dnaInput.spellcheck = false;
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
    return `<span style="
      display:inline-flex;align-items:center;justify-content:center;
      width:28px;height:32px;margin:1px;border-radius:6px;
      background:${c};color:white;font-family:var(--font-mono);font-weight:700;
      opacity:${muted};
    ">${b}</span>`;
  }

  function render() {
    const dna = state.dna;
    const fullRna = dnaToRna(dna);
    const transcribed = fullRna.slice(0, state.progress);
    const codons = [];
    for (let i = 0; i + 2 < transcribed.length; i += 3) codons.push(transcribed.slice(i, i + 3));

    let dnaHTML = '';
    for (let i = 0; i < dna.length; i++) {
      dnaHTML += baseSpan(dna[i], { muted: i >= state.progress });
    }

    let rnaHTML = '';
    for (let i = 0; i < dna.length; i++) {
      const b = i < state.progress ? fullRna[i] : '';
      rnaHTML += b
        ? baseSpan(b)
        : `<span style="display:inline-flex;width:28px;height:32px;margin:1px;border-radius:6px;border:1px dashed var(--color-border)"></span>`;
    }

    let aaHTML = '';
    let stopped = false;
    for (let i = 0; i < codons.length && !stopped; i++) {
      const codon = codons[i];
      if (codon.length < 3) break;
      const aa = CODON_TABLE[codon] || '?';
      const bg = aa === 'STOP' ? '#0b1220' : '#8b5cf6';
      const fg = '#fff';
      aaHTML += `
        <div style="display:flex;flex-direction:column;align-items:center;margin:0 2px">
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${codon}</span>
          <span style="
            margin-top:4px;padding:6px 10px;border-radius:6px;
            background:${bg};color:${fg};font-weight:700;font-size:12px;
          ">${aa}</span>
        </div>
      `;
      if (aa === 'STOP') stopped = true;
    }

    // Polymerase / ribosome cursor positions
    const polyPos = state.progress;

    display.innerHTML = `
      <div style="margin-bottom:6px;color:var(--color-muted);font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">
        DNA template (5' → 3')
      </div>
      <div style="position:relative">
        <div style="display:flex;flex-wrap:wrap">${dnaHTML}</div>
        <div style="position:absolute;top:-2px;left:${polyPos * 30}px;height:36px;width:32px;border:2px solid #f59e0b;border-radius:8px;pointer-events:none;transition:left 0.18s ease"></div>
      </div>
      <div style="margin:14px 0 6px;color:var(--color-muted);font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">
        mRNA
      </div>
      <div style="display:flex;flex-wrap:wrap">${rnaHTML}</div>
      <div style="margin:14px 0 6px;color:var(--color-muted);font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">
        Polypeptide
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start">${aaHTML || '<span style="color:var(--color-muted);font-size:13px">No codons yet</span>'}</div>
    `;
  }

  // controls
  const playT = toggle({ label: 'Auto-advance', value: state.autoplay, onChange: (v) => { state.autoplay = v; } });
  const speedS = slider({
    label: 'Bases / second', min: 0.5, max: 10, step: 0.5, value: state.speed,
    onInput: (v) => { state.speed = v; },
  });
  const stepB = button({ label: 'Step', onClick: () => { state.progress = Math.min(state.dna.length, state.progress + 1); render(); } });
  const resetB = button({ label: 'Reset', onClick: () => { state.progress = 0; render(); } });
  const fullB = button({ label: 'Skip to end', primary: true, onClick: () => { state.progress = state.dna.length; render(); } });
  const exB = button({ label: 'Example: insulin signal', onClick: () => {
    state.dna = 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCC';
    dnaInput.value = state.dna;
    state.progress = 0;
    render();
  } });

  ctrlPanel.append(speedS.el, playT.el, row(stepB, resetB, fullB), row(exB));

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
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  render();

  return () => { cancelAnimationFrame(raf); };
}
