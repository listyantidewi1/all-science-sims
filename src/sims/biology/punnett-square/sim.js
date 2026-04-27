import { select } from '../../../lib/controls.js';

// Build a Punnett square from two parent genotypes.
// Supports 1-locus (Aa) or 2-locus (AaBb) crosses.
function gametes(geno) {
  // geno like "Aa" or "AaBb" (length even, pairs of alleles).
  const loci = [];
  for (let i = 0; i < geno.length; i += 2) loci.push([geno[i], geno[i + 1]]);
  // Cartesian product, one allele per locus.
  let out = [''];
  for (const [a, b] of loci) {
    const next = [];
    for (const g of out) { next.push(g + a); next.push(g + b); }
    out = next;
  }
  return out;
}

function combine(g1, g2) {
  // Per locus, sort allele pair so e.g. "aA" → "Aa" (uppercase first).
  const out = [];
  for (let i = 0; i < g1.length; i++) {
    const a = g1[i], b = g2[i];
    out.push(a.toUpperCase() === a ? a + b : (b.toUpperCase() === b ? b + a : a + b));
  }
  return out.join('');
}

function phenotype(geno) {
  // Per locus, dominant if any uppercase; tag is uppercase letter ("A-") or lowercase pair ("aa").
  const tags = [];
  for (let i = 0; i < geno.length; i += 2) {
    const a = geno[i], b = geno[i + 1];
    const up = a === a.toUpperCase() ? a : (b === b.toUpperCase() ? b : null);
    tags.push(up ? up + '_' : a + b);
  }
  return tags.join(' ');
}

const MONO_OPTIONS = ['AA', 'Aa', 'aa'];
const DI_OPTIONS = ['AABB', 'AABb', 'AAbb', 'AaBB', 'AaBb', 'Aabb', 'aaBB', 'aaBb', 'aabb'];

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-5)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const state = {
    mode: 'mono', // 'mono' or 'di'
    p1: 'Aa',
    p2: 'Aa',
  };

  function ensureValid() {
    const opts = state.mode === 'mono' ? MONO_OPTIONS : DI_OPTIONS;
    if (!opts.includes(state.p1)) state.p1 = opts[1];
    if (!opts.includes(state.p2)) state.p2 = opts[1];
  }

  function render() {
    ensureValid();
    stage.innerHTML = '';
    const g1 = gametes(state.p1);
    const g2 = gametes(state.p2);

    const heading = document.createElement('h2');
    heading.style.margin = '0 0 var(--space-3)';
    heading.textContent = `${state.p1}  ×  ${state.p2}`;
    stage.appendChild(heading);

    // Grid
    const cols = g2.length + 1;
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `auto repeat(${g2.length}, 1fr)`;
    grid.style.gap = '4px';
    grid.style.maxWidth = '560px';

    const empty = document.createElement('div');
    grid.appendChild(empty);
    for (const g of g2) grid.appendChild(headerCell(g));

    const genoCounts = {};
    const phenoCounts = {};

    for (const a of g1) {
      grid.appendChild(headerCell(a));
      for (const b of g2) {
        const child = combine(a, b);
        genoCounts[child] = (genoCounts[child] || 0) + 1;
        const ph = phenotype(child);
        phenoCounts[ph] = (phenoCounts[ph] || 0) + 1;
        grid.appendChild(dataCell(child));
      }
    }
    stage.appendChild(grid);

    // Ratios
    const ratios = document.createElement('div');
    ratios.style.marginTop = 'var(--space-5)';
    ratios.style.display = 'grid';
    ratios.style.gridTemplateColumns = '1fr 1fr';
    ratios.style.gap = 'var(--space-4)';

    const total = Object.values(genoCounts).reduce((s, v) => s + v, 0);
    ratios.appendChild(ratioBlock('Genotypes', genoCounts, total));
    ratios.appendChild(ratioBlock('Phenotypes', phenoCounts, total));
    stage.appendChild(ratios);
  }

  function headerCell(text) {
    const d = document.createElement('div');
    d.textContent = text;
    d.style.cssText = `
      background: var(--subj-biology); color: white; font-weight: 700;
      padding: 12px; border-radius: 6px; text-align: center; font-family: var(--font-mono);
    `;
    return d;
  }
  function dataCell(text) {
    const d = document.createElement('div');
    d.textContent = text;
    d.style.cssText = `
      background: var(--color-surface-2); color: var(--color-fg);
      padding: 12px; border-radius: 6px; text-align: center; font-family: var(--font-mono);
      border: 1px solid var(--color-border);
    `;
    return d;
  }
  function ratioBlock(title, counts, total) {
    const d = document.createElement('div');
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    d.innerHTML = `<h3 style="margin:0 0 8px;font-size:var(--type-md)">${title}</h3>`;
    const ratioStr = entries.map(([_, n]) => n).join(' : ');
    const list = entries.map(([k, n]) => `<div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:14px"><span>${k}</span><span style="color:var(--color-muted)">${n} / ${total} (${Math.round(n/total*100)}%)</span></div>`).join('');
    d.innerHTML += list + `<div style="margin-top:8px;font-weight:700;color:var(--subj-biology)">Ratio: ${ratioStr}</div>`;
    return d;
  }

  function buildControls() {
    ctrlPanel.innerHTML = '';
    const modeSel = select({
      label: 'Cross type',
      options: [
        { value: 'mono', label: 'Monohybrid (1 gene)' },
        { value: 'di',   label: 'Dihybrid (2 genes)' },
      ],
      value: state.mode,
      onChange: (v) => { state.mode = v; ensureValid(); buildControls(); render(); },
    });

    const opts = state.mode === 'mono' ? MONO_OPTIONS : DI_OPTIONS;
    const p1Sel = select({
      label: 'Parent 1',
      options: opts.map((o) => ({ value: o, label: o })),
      value: state.p1,
      onChange: (v) => { state.p1 = v; render(); },
    });
    const p2Sel = select({
      label: 'Parent 2',
      options: opts.map((o) => ({ value: o, label: o })),
      value: state.p2,
      onChange: (v) => { state.p2 = v; render(); },
    });

    ctrlPanel.append(modeSel.el, p1Sel.el, p2Sel.el);
  }

  buildControls();
  render();

  return () => { /* nothing async to tear down */ };
}
