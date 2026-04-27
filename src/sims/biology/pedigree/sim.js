import { select, button, row } from '../../../lib/controls.js';

// 3-generation pedigree.
// Generation 1: P1 (M) - P2 (F)
// Generation 2: their children C1, C2, C3 + spouses S1, S2 (married in)
// Generation 3: grandchildren G1..G6 (children of C1+S1, C2 alone if no spouse, C3+S2)
// We'll use a simple fixed family layout.

const FAMILY = {
  generations: [
    [
      { id: 'P1', sex: 'M', x: 0.30, y: 0.20 },
      { id: 'P2', sex: 'F', x: 0.50, y: 0.20 },
    ],
    [
      { id: 'C1', sex: 'F', x: 0.18, y: 0.50, parents: ['P1', 'P2'] },
      { id: 'S1', sex: 'M', x: 0.30, y: 0.50, marriedIn: true, partner: 'C1' },
      { id: 'C2', sex: 'M', x: 0.45, y: 0.50, parents: ['P1', 'P2'] },
      { id: 'C3', sex: 'M', x: 0.60, y: 0.50, parents: ['P1', 'P2'] },
      { id: 'S2', sex: 'F', x: 0.72, y: 0.50, marriedIn: true, partner: 'C3' },
    ],
    [
      { id: 'G1', sex: 'F', x: 0.16, y: 0.80, parents: ['C1', 'S1'] },
      { id: 'G2', sex: 'M', x: 0.28, y: 0.80, parents: ['C1', 'S1'] },
      { id: 'G3', sex: 'F', x: 0.58, y: 0.80, parents: ['C3', 'S2'] },
      { id: 'G4', sex: 'M', x: 0.70, y: 0.80, parents: ['C3', 'S2'] },
    ],
  ],
};

const ALL_PEOPLE = FAMILY.generations.flat();

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.cssText = 'padding:var(--space-3);display:grid;grid-template-columns:1fr 280px;gap:var(--space-3);min-height:380px';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const svgWrap = document.createElement('div');
  svgWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);position:relative';
  stage.appendChild(svgWrap);

  const detail = document.createElement('div');
  detail.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);font-size:13px';
  stage.appendChild(detail);

  const state = {
    affected: new Set(),
    mode: 'autosomal-recessive',
  };

  function render() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 600 380');
    svg.setAttribute('width', '100%');

    // Marriage lines
    function findP(id) { return ALL_PEOPLE.find((p) => p.id === id); }
    function px(p) { return p.x * 600; }
    function py(p) { return p.y * 380; }

    // P1-P2 marriage line
    drawMarriage(svg, FAMILY.generations[0][0], FAMILY.generations[0][1]);
    // C1-S1, C3-S2
    drawMarriage(svg, findP('C1'), findP('S1'));
    drawMarriage(svg, findP('C3'), findP('S2'));

    // Sibling lines from parents
    drawSiblings(svg, [findP('P1'), findP('P2')], [findP('C1'), findP('C2'), findP('C3')]);
    drawSiblings(svg, [findP('C1'), findP('S1')], [findP('G1'), findP('G2')]);
    drawSiblings(svg, [findP('C3'), findP('S2')], [findP('G3'), findP('G4')]);

    // Symbols
    for (const p of ALL_PEOPLE) {
      const cx = px(p), cy = py(p);
      const size = 22;
      const aff = state.affected.has(p.id);
      const fill = aff ? '#ef4444' : '#1e293b';
      let shape;
      if (p.sex === 'M') {
        shape = document.createElementNS(ns, 'rect');
        shape.setAttribute('x', cx - size); shape.setAttribute('y', cy - size);
        shape.setAttribute('width', size * 2); shape.setAttribute('height', size * 2);
      } else {
        shape = document.createElementNS(ns, 'circle');
        shape.setAttribute('cx', cx); shape.setAttribute('cy', cy);
        shape.setAttribute('r', size);
      }
      shape.setAttribute('fill', fill);
      shape.setAttribute('stroke', '#cbd5e1');
      shape.setAttribute('stroke-width', '2');
      shape.style.cursor = 'pointer';
      shape.addEventListener('click', () => {
        if (state.affected.has(p.id)) state.affected.delete(p.id);
        else state.affected.add(p.id);
        render();
      });
      svg.appendChild(shape);

      const t = document.createElementNS(ns, 'text');
      t.setAttribute('x', cx); t.setAttribute('y', cy + size + 14);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', 'rgba(120,130,150,0.85)');
      t.setAttribute('font-size', '10');
      t.setAttribute('font-family', 'var(--font-mono)');
      t.textContent = p.id;
      svg.appendChild(t);
    }

    svgWrap.innerHTML = '';
    svgWrap.appendChild(svg);

    function drawMarriage(svg, a, b) {
      const ns = 'http://www.w3.org/2000/svg';
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', a.x * 600 + 22);
      line.setAttribute('y1', a.y * 380);
      line.setAttribute('x2', b.x * 600 - 22);
      line.setAttribute('y2', b.y * 380);
      line.setAttribute('stroke', '#cbd5e1');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
    }

    function drawSiblings(svg, parents, kids) {
      const ns = 'http://www.w3.org/2000/svg';
      const cx = (parents[0].x + parents[1].x) / 2 * 600;
      const cy = parents[0].y * 380;
      const childY = kids[0].y * 380;
      const midY = (cy + childY) / 2;
      // vertical down from couple
      let line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', cx); line.setAttribute('y2', midY);
      line.setAttribute('stroke', '#cbd5e1');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
      // horizontal across kids
      const xs = kids.map((k) => k.x * 600);
      line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', Math.min(...xs)); line.setAttribute('y1', midY);
      line.setAttribute('x2', Math.max(...xs)); line.setAttribute('y2', midY);
      line.setAttribute('stroke', '#cbd5e1');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
      // verticals to each kid
      for (const k of kids) {
        const ll = document.createElementNS(ns, 'line');
        ll.setAttribute('x1', k.x * 600); ll.setAttribute('y1', midY);
        ll.setAttribute('x2', k.x * 600); ll.setAttribute('y2', childY - 22);
        ll.setAttribute('stroke', '#cbd5e1');
        ll.setAttribute('stroke-width', '2');
        svg.appendChild(ll);
      }
    }

    renderDetail();
  }

  function consistencyCheck() {
    // Returns label per mode plus best fit.
    const aff = state.affected;
    const results = [];
    // Autosomal Dominant: every affected has at least one affected parent (founder ok)
    let autoDomViol = false;
    for (const p of ALL_PEOPLE) {
      if (!aff.has(p.id)) continue;
      if (!p.parents) continue; // founders/married-ins are allowed
      const parentsAff = p.parents.some((id) => aff.has(id));
      if (!parentsAff) {
        // Check if a married-in might have brought it
        // Simple: in autosomal dominant, affected child requires affected parent
        autoDomViol = true;
      }
    }
    results.push({ mode: 'autosomal-dominant', label: 'Autosomal dominant', ok: !autoDomViol });

    // Autosomal Recessive: affected children of unaffected parents implies parents are carriers (no problem)
    // Violation: affected parent with all unaffected kids when partner could be aa? Skipping detailed math; instead rule of thumb:
    // - Affected can skip generations (good).
    // - Trait often shows in siblings.
    let autoRecOk = true;
    // crude: if aff is sparse (≤ 60% non-founder affected) it's compatible
    const nonFounder = ALL_PEOPLE.filter((p) => p.parents);
    const affNF = nonFounder.filter((p) => aff.has(p.id)).length;
    if (affNF / nonFounder.length > 0.6) autoRecOk = false;
    results.push({ mode: 'autosomal-recessive', label: 'Autosomal recessive', ok: autoRecOk });

    // X-linked recessive: more males affected; no male-to-male transmission
    const affMales = [...aff].filter((id) => ALL_PEOPLE.find((p) => p.id === id).sex === 'M').length;
    const affFemales = [...aff].filter((id) => ALL_PEOPLE.find((p) => p.id === id).sex === 'F').length;
    let xRecOk = aff.size === 0 || affMales >= affFemales;
    // Forbid male-to-male
    for (const p of ALL_PEOPLE) {
      if (!aff.has(p.id) || p.sex !== 'M' || !p.parents) continue;
      const dad = ALL_PEOPLE.find((x) => p.parents.includes(x.id) && x.sex === 'M');
      if (dad && aff.has(dad.id)) xRecOk = false;
    }
    results.push({ mode: 'x-linked-recessive', label: 'X-linked recessive', ok: xRecOk });

    // X-linked dominant: every affected has affected parent (similar to dominant)
    let xDomOk = true;
    for (const p of ALL_PEOPLE) {
      if (!aff.has(p.id) || !p.parents) continue;
      const parentsAff = p.parents.some((id) => aff.has(id));
      if (!parentsAff) xDomOk = false;
    }
    results.push({ mode: 'x-linked-dominant', label: 'X-linked dominant', ok: xDomOk });

    return results;
  }

  function renderDetail() {
    const checks = consistencyCheck();
    let html = `<h3 style="margin:0 0 var(--space-3);font-size:var(--type-md)">Consistency check</h3>`;
    html += '<div style="display:grid;gap:6px">';
    for (const c of checks) {
      const isCurrent = c.mode === state.mode;
      html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:${isCurrent ? 'rgba(139,92,246,0.18)' : 'transparent'}">
        <span style="width:14px;height:14px;border-radius:7px;background:${c.ok ? '#10b981' : '#ef4444'};display:inline-block;flex:0 0 14px"></span>
        <span style="font-size:12px">${c.label}</span>
        <span style="margin-left:auto;font-size:11px;color:var(--color-muted)">${c.ok ? 'consistent' : 'no'}</span>
      </div>`;
    }
    html += '</div>';
    html += `<p style="font-size:12px;color:var(--color-muted);margin-top:var(--space-3)">Click any family member to toggle their affected status. Squares = male, circles = female.</p>`;
    detail.innerHTML = html;
  }

  // controls
  const modeSel = select({
    label: 'Inheritance mode',
    options: [
      { value: 'autosomal-dominant', label: 'Autosomal dominant' },
      { value: 'autosomal-recessive', label: 'Autosomal recessive' },
      { value: 'x-linked-recessive', label: 'X-linked recessive' },
      { value: 'x-linked-dominant', label: 'X-linked dominant' },
    ],
    value: state.mode,
    onChange: (v) => { state.mode = v; render(); },
  });
  const clearB = button({ label: 'Clear', onClick: () => { state.affected = new Set(); render(); } });
  const exDom = button({ label: 'Try dominant pattern', primary: true, onClick: () => {
    state.affected = new Set(['P1', 'C2', 'C3', 'G3']);
    render();
  } });
  const exRec = button({ label: 'Try recessive pattern', onClick: () => {
    state.affected = new Set(['G2', 'G4']);
    render();
  } });
  const exX = button({ label: 'Try X-linked pattern', onClick: () => {
    state.affected = new Set(['P1', 'G2', 'G4']);
    render();
  } });
  ctrlPanel.append(modeSel.el, row(clearB), row(exDom, exRec, exX));

  render();
  return () => {};
}
