import { select, button, row } from '../../../lib/controls.js';

const GATES = {
  AND:  (a, b) => a & b,
  OR:   (a, b) => a | b,
  XOR:  (a, b) => a ^ b,
  NAND: (a, b) => 1 - (a & b),
  NOR:  (a, b) => 1 - (a | b),
  XNOR: (a, b) => 1 - (a ^ b),
  NOT:  (a)    => 1 - a,
};

// Each circuit is a function (inputs) → outputs.
// We also describe layout for visualization.
const CIRCUITS = {
  oneGate: {
    name: 'Single 2-input gate',
    inputs: ['A', 'B'],
    outputs: ['Out'],
    gates: ['G'],
    defaults: { G: 'AND' },
    eval: (i, gate) => ({ Out: GATES[gate.G](i.A, i.B) }),
    edges: [
      { from: 'A', to: 'G:a' },
      { from: 'B', to: 'G:b' },
      { from: 'G', to: 'Out' },
    ],
    pos: { A: [0.05, 0.3], B: [0.05, 0.7], G: [0.5, 0.5], Out: [0.92, 0.5] },
  },
  notGate: {
    name: 'NOT (inverter)',
    inputs: ['A'],
    outputs: ['Out'],
    gates: [],
    defaults: {},
    eval: (i) => ({ Out: 1 - i.A }),
    edges: [
      { from: 'A', to: '*INV*' },
    ],
    pos: { A: [0.1, 0.5], '*INV*': [0.5, 0.5], Out: [0.9, 0.5] },
  },
  halfAdder: {
    name: 'Half-adder (XOR + AND)',
    inputs: ['A', 'B'],
    outputs: ['Sum', 'Carry'],
    gates: ['G1', 'G2'],
    defaults: { G1: 'XOR', G2: 'AND' },
    eval: (i, gate) => ({
      Sum: GATES[gate.G1](i.A, i.B),
      Carry: GATES[gate.G2](i.A, i.B),
    }),
    edges: [
      { from: 'A', to: 'G1:a' }, { from: 'B', to: 'G1:b' },
      { from: 'A', to: 'G2:a' }, { from: 'B', to: 'G2:b' },
      { from: 'G1', to: 'Sum' }, { from: 'G2', to: 'Carry' },
    ],
    pos: { A: [0.05, 0.25], B: [0.05, 0.75], G1: [0.5, 0.3], G2: [0.5, 0.7], Sum: [0.92, 0.3], Carry: [0.92, 0.7] },
  },
  fullAdder: {
    name: 'Full-adder',
    inputs: ['A', 'B', 'Cin'],
    outputs: ['Sum', 'Cout'],
    gates: [],
    defaults: {},
    eval: (i) => {
      const s1 = i.A ^ i.B;
      return {
        Sum:  s1 ^ i.Cin,
        Cout: (i.A & i.B) | (s1 & i.Cin),
      };
    },
    edges: [],
    pos: { A: [0.05, 0.2], B: [0.05, 0.5], Cin: [0.05, 0.8], Sum: [0.92, 0.35], Cout: [0.92, 0.65] },
  },
};

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.cssText = 'padding:var(--space-4);display:grid;grid-template-columns:1fr 280px;gap:var(--space-4)';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const svgWrap = document.createElement('div');
  svgWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);min-height:340px';
  stage.appendChild(svgWrap);

  const tableWrap = document.createElement('div');
  tableWrap.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);overflow:auto';
  stage.appendChild(tableWrap);

  const state = {
    circuit: 'oneGate',
    inputs: { A: 0, B: 0, Cin: 0 },
    gates: { G: 'AND', G1: 'XOR', G2: 'AND' },
  };

  function applyDefaults() {
    const c = CIRCUITS[state.circuit];
    state.gates = { ...state.gates, ...c.defaults };
  }
  applyDefaults();

  function evalCircuit(inputs) {
    const c = CIRCUITS[state.circuit];
    return c.eval(inputs, state.gates);
  }

  function render() {
    const c = CIRCUITS[state.circuit];
    const out = evalCircuit(state.inputs);

    // SVG circuit
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 600 360');
    svg.setAttribute('width', '100%');
    svg.style.aspectRatio = '5/3';
    svg.style.cursor = 'default';

    function P(name) {
      const p = c.pos[name];
      if (!p) return null;
      return { x: p[0] * 600, y: p[1] * 360 };
    }

    // Draw input switches
    for (const name of c.inputs) {
      const p = P(name);
      const v = state.inputs[name];
      // wire stub
      drawWireSeg(svg, p.x, p.y, p.x + 60, p.y, !!v);
      // switch
      const g = document.createElementNS(ns, 'g');
      g.style.cursor = 'pointer';
      g.setAttribute('data-input', name);
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', p.x - 25); r.setAttribute('y', p.y - 18);
      r.setAttribute('width', 50); r.setAttribute('height', 36);
      r.setAttribute('rx', 6);
      r.setAttribute('fill', v ? '#10b981' : '#475569');
      r.setAttribute('stroke', '#fff'); r.setAttribute('stroke-width', '2');
      g.appendChild(r);
      const t = document.createElementNS(ns, 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', p.y + 5);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', '#fff'); t.setAttribute('font-weight', '700');
      t.setAttribute('font-family', 'var(--font-mono)');
      t.textContent = `${name}=${v}`;
      g.appendChild(t);
      svg.appendChild(g);
      g.addEventListener('click', () => { state.inputs[name] = 1 - state.inputs[name]; render(); });
    }

    // Draw outputs
    for (const name of c.outputs) {
      const p = P(name);
      const v = out[name];
      drawWireSeg(svg, p.x - 60, p.y, p.x, p.y, !!v);
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', p.x - 25); r.setAttribute('y', p.y - 18);
      r.setAttribute('width', 50); r.setAttribute('height', 36);
      r.setAttribute('rx', 6);
      r.setAttribute('fill', v ? '#10b981' : '#1e293b');
      r.setAttribute('stroke', v ? '#fff' : '#475569'); r.setAttribute('stroke-width', '2');
      svg.appendChild(r);
      const t = document.createElementNS(ns, 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', p.y + 5);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', '#fff'); t.setAttribute('font-weight', '700');
      t.setAttribute('font-family', 'var(--font-mono)');
      t.textContent = `${name}=${v}`;
      svg.appendChild(t);
    }

    // Draw gates and wires
    if (state.circuit === 'oneGate') {
      const g = P('G');
      drawGate(svg, g.x, g.y, state.gates.G);
      drawWire(svg, P('A').x + 25, P('A').y, g.x - 30, g.y - 12, state.inputs.A);
      drawWire(svg, P('B').x + 25, P('B').y, g.x - 30, g.y + 12, state.inputs.B);
      drawWire(svg, g.x + 30, g.y, P('Out').x - 25, P('Out').y, out.Out);
    } else if (state.circuit === 'notGate') {
      const g = P('*INV*');
      drawGate(svg, g.x, g.y, 'NOT');
      drawWire(svg, P('A').x + 25, P('A').y, g.x - 30, g.y, state.inputs.A);
      drawWire(svg, g.x + 30, g.y, P('Out').x - 25, P('Out').y, out.Out);
    } else if (state.circuit === 'halfAdder') {
      const g1 = P('G1'), g2 = P('G2');
      drawGate(svg, g1.x, g1.y, state.gates.G1);
      drawGate(svg, g2.x, g2.y, state.gates.G2);
      drawWire(svg, P('A').x + 25, P('A').y, g1.x - 30, g1.y - 12, state.inputs.A);
      drawWire(svg, P('B').x + 25, P('B').y, g1.x - 30, g1.y + 12, state.inputs.B);
      drawWire(svg, P('A').x + 25, P('A').y, g2.x - 30, g2.y - 12, state.inputs.A);
      drawWire(svg, P('B').x + 25, P('B').y, g2.x - 30, g2.y + 12, state.inputs.B);
      drawWire(svg, g1.x + 30, g1.y, P('Sum').x - 25, P('Sum').y, out.Sum);
      drawWire(svg, g2.x + 30, g2.y, P('Carry').x - 25, P('Carry').y, out.Carry);
    } else if (state.circuit === 'fullAdder') {
      // Draw 5 gates explicitly
      const positions = {
        X1: { x: 240, y: 130 }, X2: { x: 380, y: 200 },
        A1: { x: 240, y: 240 }, A2: { x: 380, y: 280 },
        OR: { x: 480, y: 240 },
      };
      const a = state.inputs.A, b = state.inputs.B, ci = state.inputs.Cin;
      const s1 = a ^ b;
      const c1 = a & b;
      const c2 = s1 & ci;
      drawGate(svg, positions.X1.x, positions.X1.y, 'XOR');
      drawGate(svg, positions.X2.x, positions.X2.y, 'XOR');
      drawGate(svg, positions.A1.x, positions.A1.y, 'AND');
      drawGate(svg, positions.A2.x, positions.A2.y, 'AND');
      drawGate(svg, positions.OR.x, positions.OR.y, 'OR');
      // input wires
      drawWire(svg, P('A').x + 25, P('A').y, positions.X1.x - 30, positions.X1.y - 12, a);
      drawWire(svg, P('B').x + 25, P('B').y, positions.X1.x - 30, positions.X1.y + 12, b);
      drawWire(svg, P('A').x + 25, P('A').y, positions.A1.x - 30, positions.A1.y - 12, a);
      drawWire(svg, P('B').x + 25, P('B').y, positions.A1.x - 30, positions.A1.y + 12, b);
      // X1 -> X2 (sum branch)
      drawWire(svg, positions.X1.x + 30, positions.X1.y, positions.X2.x - 30, positions.X2.y - 12, s1);
      // Cin -> X2
      drawWire(svg, P('Cin').x + 25, P('Cin').y, positions.X2.x - 30, positions.X2.y + 12, ci);
      // X1 -> A2
      drawWire(svg, positions.X1.x + 30, positions.X1.y, positions.A2.x - 30, positions.A2.y - 12, s1);
      // Cin -> A2
      drawWire(svg, P('Cin').x + 25, P('Cin').y, positions.A2.x - 30, positions.A2.y + 12, ci);
      // A1 -> OR
      drawWire(svg, positions.A1.x + 30, positions.A1.y, positions.OR.x - 30, positions.OR.y - 12, c1);
      // A2 -> OR
      drawWire(svg, positions.A2.x + 30, positions.A2.y, positions.OR.x - 30, positions.OR.y + 12, c2);
      // X2 -> Sum
      drawWire(svg, positions.X2.x + 30, positions.X2.y, P('Sum').x - 25, P('Sum').y, out.Sum);
      // OR -> Cout
      drawWire(svg, positions.OR.x + 30, positions.OR.y, P('Cout').x - 25, P('Cout').y, out.Cout);
    }

    svgWrap.innerHTML = '';
    svgWrap.appendChild(svg);

    // Truth table
    renderTable();
  }

  function renderTable() {
    const c = CIRCUITS[state.circuit];
    const inputs = c.inputs;
    const outputs = c.outputs;
    const total = 1 << inputs.length;
    let html = `
      <h3 style="margin:0 0 var(--space-3);font-size:var(--type-md)">Truth table</h3>
      <table style="border-collapse:collapse;width:100%;font-family:var(--font-mono);font-size:13px">
        <thead><tr>${
          inputs.map((n) => `<th style="padding:6px 8px;border-bottom:1px solid var(--color-border);text-align:center">${n}</th>`).join('')
        }${outputs.map((n) => `<th style="padding:6px 8px;border-bottom:1px solid var(--color-border);text-align:center;color:var(--color-accent)">${n}</th>`).join('')}</tr></thead>
        <tbody>
    `;
    for (let i = 0; i < total; i++) {
      const inp = {};
      inputs.forEach((n, idx) => { inp[n] = (i >> (inputs.length - 1 - idx)) & 1; });
      const isCurrent = inputs.every((n) => state.inputs[n] === inp[n]);
      const out = c.eval(inp, state.gates);
      html += `<tr style="${isCurrent ? 'background:rgba(139,92,246,0.18)' : ''}">`;
      for (const n of inputs) html += `<td style="padding:5px 8px;text-align:center">${inp[n]}</td>`;
      for (const n of outputs) {
        const v = out[n];
        html += `<td style="padding:5px 8px;text-align:center;color:${v ? '#10b981' : 'var(--color-muted)'};font-weight:700">${v}</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table>`;
    tableWrap.innerHTML = html;
  }

  function drawGate(svg, x, y, kind) {
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(${x}, ${y})`);
    g.style.cursor = 'pointer';
    // shape
    let shape;
    if (kind === 'AND' || kind === 'NAND') {
      shape = document.createElementNS(ns, 'path');
      shape.setAttribute('d', 'M -30 -22 L -30 22 L 0 22 A 22 22 0 0 0 0 -22 Z');
    } else if (kind === 'OR' || kind === 'NOR' || kind === 'XOR' || kind === 'XNOR') {
      shape = document.createElementNS(ns, 'path');
      shape.setAttribute('d', 'M -30 -22 Q -10 0 -30 22 Q 0 22 24 0 Q 0 -22 -30 -22 Z');
    } else { // NOT
      shape = document.createElementNS(ns, 'path');
      shape.setAttribute('d', 'M -30 -20 L -30 20 L 18 0 Z');
    }
    shape.setAttribute('fill', '#1e293b');
    shape.setAttribute('stroke', '#cbd5e1');
    shape.setAttribute('stroke-width', '2');
    g.appendChild(shape);
    // bubble for negated outputs
    if (kind.startsWith('N') && kind !== 'NOT') {
      const bub = document.createElementNS(ns, 'circle');
      bub.setAttribute('cx', '30'); bub.setAttribute('cy', '0');
      bub.setAttribute('r', '5');
      bub.setAttribute('fill', '#1e293b');
      bub.setAttribute('stroke', '#cbd5e1');
      bub.setAttribute('stroke-width', '2');
      g.appendChild(bub);
    }
    if (kind === 'NOT') {
      const bub = document.createElementNS(ns, 'circle');
      bub.setAttribute('cx', '24'); bub.setAttribute('cy', '0');
      bub.setAttribute('r', '5');
      bub.setAttribute('fill', '#1e293b');
      bub.setAttribute('stroke', '#cbd5e1');
      bub.setAttribute('stroke-width', '2');
      g.appendChild(bub);
    }
    // XOR has a curved bar in front
    if (kind === 'XOR' || kind === 'XNOR') {
      const bar = document.createElementNS(ns, 'path');
      bar.setAttribute('d', 'M -36 -22 Q -20 0 -36 22');
      bar.setAttribute('fill', 'none');
      bar.setAttribute('stroke', '#cbd5e1');
      bar.setAttribute('stroke-width', '2');
      g.appendChild(bar);
    }
    // label
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', '-8'); t.setAttribute('y', '5');
    t.setAttribute('font-size', '11');
    t.setAttribute('font-family', 'var(--font-mono)');
    t.setAttribute('font-weight', '700');
    t.setAttribute('fill', '#cbd5e1');
    t.textContent = kind;
    g.appendChild(t);

    svg.appendChild(g);
  }

  function drawWire(svg, x1, y1, x2, y2, value) {
    drawWireSeg(svg, x1, y1, x2, y2, !!value);
  }
  function drawWireSeg(svg, x1, y1, x2, y2, lit) {
    const ns = 'http://www.w3.org/2000/svg';
    // path with right-angle bend
    const midX = (x1 + x2) / 2;
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', lit ? '#10b981' : '#475569');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
  }

  // controls
  const circuitSel = select({
    label: 'Circuit',
    options: Object.entries(CIRCUITS).map(([k, v]) => ({ value: k, label: v.name })),
    value: state.circuit,
    onChange: (v) => {
      state.circuit = v;
      applyDefaults();
      // reset inputs to known names
      state.inputs = { A: 0, B: 0, Cin: 0 };
      render();
      buildGateControls();
    },
  });
  ctrlPanel.appendChild(circuitSel.el);

  const gateControlsWrap = document.createElement('div');
  gateControlsWrap.style.display = 'grid';
  gateControlsWrap.style.gap = 'var(--space-2)';
  ctrlPanel.appendChild(gateControlsWrap);

  function buildGateControls() {
    gateControlsWrap.innerHTML = '';
    const c = CIRCUITS[state.circuit];
    for (const gname of c.gates) {
      const sel = select({
        label: gname + ' type',
        options: ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR'].map((k) => ({ value: k, label: k })),
        value: state.gates[gname],
        onChange: (v) => { state.gates[gname] = v; render(); },
      });
      gateControlsWrap.appendChild(sel.el);
    }
  }
  buildGateControls();

  const allInB = button({ label: 'All inputs 1', primary: true, onClick: () => { for (const k of Object.keys(state.inputs)) state.inputs[k] = 1; render(); } });
  const allOutB = button({ label: 'All inputs 0', onClick: () => { for (const k of Object.keys(state.inputs)) state.inputs[k] = 0; render(); } });
  ctrlPanel.appendChild(row(allInB, allOutB));

  render();
  return () => {};
}
