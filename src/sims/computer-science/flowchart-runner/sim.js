import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Each preset is a flowchart: nodes placed on a (col, row) grid, edges between
// them, and a pseudocode listing. A node either runs (process / io / terminal)
// or tests a condition (decision). `line` is the pseudocode line it maps to.
const B = (en, id) => ({ en, id });

const PRESETS = {
  max3: {
    name: B('Largest of three numbers', 'Terbesar dari tiga bilangan'),
    inputs: [{ k: 'a', v: 7 }, { k: 'b', v: 12 }, { k: 'c', v: 5 }],
    vars: ['a', 'b', 'c', 'max'],
    cols: 6, rows: 8,
    pseudo: {
      en: ['START', 'INPUT a, b, c', 'max ← a', 'IF b > max THEN', '    max ← b', 'IF c > max THEN', '    max ← c', 'OUTPUT max', 'END'],
      id: ['MULAI', 'BACA a, b, c', 'max ← a', 'JIKA b > max MAKA', '    max ← b', 'JIKA c > max MAKA', '    max ← c', 'TULIS max', 'SELESAI'],
    },
    nodes: [
      { id: 'start', type: 'start', c: 2.5, r: 0.5, text: B('Start', 'Mulai'), line: 0, next: 'in' },
      { id: 'in', type: 'io', c: 2.5, r: 1.5, text: B('Input a, b, c', 'Baca a, b, c'), line: 1, next: 'p1', run: (v, inp) => { v.a = inp.a; v.b = inp.b; v.c = inp.c; } },
      { id: 'p1', type: 'process', c: 2.5, r: 2.5, text: B('max ← a', 'max ← a'), line: 2, next: 'd1', run: (v) => { v.max = v.a; } },
      { id: 'd1', type: 'decision', c: 2.5, r: 3.7, text: B('b > max?', 'b > max?'), line: 3, cond: (v) => v.b > v.max, yes: 'p2', no: 'd2' },
      { id: 'p2', type: 'process', c: 4.6, r: 3.7, text: B('max ← b', 'max ← b'), line: 4, next: 'd2', run: (v) => { v.max = v.b; } },
      { id: 'd2', type: 'decision', c: 2.5, r: 5.1, text: B('c > max?', 'c > max?'), line: 5, cond: (v) => v.c > v.max, yes: 'p3', no: 'out' },
      { id: 'p3', type: 'process', c: 4.6, r: 5.1, text: B('max ← c', 'max ← c'), line: 6, next: 'out', run: (v) => { v.max = v.c; } },
      { id: 'out', type: 'io', c: 2.5, r: 6.5, text: B('Output max', 'Tulis max'), line: 7, next: 'end', run: (v, inp, out) => { out.push(v.max); } },
      { id: 'end', type: 'end', c: 2.5, r: 7.5, text: B('End', 'Selesai'), line: 8 },
    ],
    edges: [
      { from: 'start', to: 'in' }, { from: 'in', to: 'p1' }, { from: 'p1', to: 'd1' },
      { from: 'd1', to: 'p2', out: 'right', in: 'left', label: 'yes' },
      { from: 'd1', to: 'd2', label: 'no' },
      { from: 'p2', to: 'd2', pts: [[4.6, 4.4], [2.5, 4.4]] },
      { from: 'd2', to: 'p3', out: 'right', in: 'left', label: 'yes' },
      { from: 'd2', to: 'out', label: 'no' },
      { from: 'p3', to: 'out', pts: [[4.6, 5.85], [2.5, 5.85]] },
      { from: 'out', to: 'end' },
    ],
  },
  sum: {
    name: B('Sum 1..n', 'Jumlah 1..n'),
    inputs: [{ k: 'n', v: 5 }],
    vars: ['n', 'i', 'sum'],
    cols: 6, rows: 7.4,
    pseudo: {
      en: ['START', 'INPUT n', 'i ← 1, sum ← 0', 'WHILE i ≤ n DO', '    sum ← sum + i', '    i ← i + 1', 'END WHILE', 'OUTPUT sum', 'END'],
      id: ['MULAI', 'BACA n', 'i ← 1, sum ← 0', 'SELAMA i ≤ n LAKUKAN', '    sum ← sum + i', '    i ← i + 1', 'AKHIR SELAMA', 'TULIS sum', 'SELESAI'],
    },
    nodes: [
      { id: 'start', type: 'start', c: 2.2, r: 0.5, text: B('Start', 'Mulai'), line: 0, next: 'in' },
      { id: 'in', type: 'io', c: 2.2, r: 1.5, text: B('Input n', 'Baca n'), line: 1, next: 'p1', run: (v, inp) => { v.n = inp.n; } },
      { id: 'p1', type: 'process', c: 2.2, r: 2.5, text: B('i ← 1, sum ← 0', 'i ← 1, sum ← 0'), line: 2, next: 'd1', run: (v) => { v.i = 1; v.sum = 0; } },
      { id: 'd1', type: 'decision', c: 2.2, r: 3.8, text: B('i ≤ n?', 'i ≤ n?'), line: 3, cond: (v) => v.i <= v.n, yes: 'p2', no: 'out' },
      { id: 'p2', type: 'process', c: 2.2, r: 5.0, text: B('sum ← sum + i', 'sum ← sum + i'), line: 4, next: 'p3', run: (v) => { v.sum = v.sum + v.i; } },
      { id: 'p3', type: 'process', c: 2.2, r: 6.0, text: B('i ← i + 1', 'i ← i + 1'), line: 5, next: 'd1', run: (v) => { v.i = v.i + 1; } },
      { id: 'out', type: 'io', c: 4.6, r: 5.0, text: B('Output sum', 'Tulis sum'), line: 7, next: 'end', run: (v, inp, out) => { out.push(v.sum); } },
      { id: 'end', type: 'end', c: 4.6, r: 6.0, text: B('End', 'Selesai'), line: 8 },
    ],
    edges: [
      { from: 'start', to: 'in' }, { from: 'in', to: 'p1' }, { from: 'p1', to: 'd1' },
      { from: 'd1', to: 'p2', label: 'yes' },
      { from: 'd1', to: 'out', out: 'right', in: 'top', label: 'no', pts: [[4.6, 3.8]] },
      { from: 'p2', to: 'p3' },
      { from: 'p3', to: 'd1', out: 'bottom', in: 'left', pts: [[2.2, 6.75], [0.55, 6.75], [0.55, 3.8]] },
      { from: 'out', to: 'end' },
    ],
  },
  evenodd: {
    name: B('Even or odd', 'Genap atau ganjil'),
    inputs: [{ k: 'n', v: 7 }],
    vars: ['n', 'r'],
    cols: 6, rows: 7,
    pseudo: {
      en: ['START', 'INPUT n', 'r ← n mod 2', 'IF r = 0 THEN', '    OUTPUT "even"', 'ELSE', '    OUTPUT "odd"', 'END'],
      id: ['MULAI', 'BACA n', 'r ← n mod 2', 'JIKA r = 0 MAKA', '    TULIS "genap"', 'JIKA TIDAK', '    TULIS "ganjil"', 'SELESAI'],
    },
    nodes: [
      { id: 'start', type: 'start', c: 3, r: 0.5, text: B('Start', 'Mulai'), line: 0, next: 'in' },
      { id: 'in', type: 'io', c: 3, r: 1.5, text: B('Input n', 'Baca n'), line: 1, next: 'p1', run: (v, inp) => { v.n = inp.n; } },
      { id: 'p1', type: 'process', c: 3, r: 2.5, text: B('r ← n mod 2', 'r ← n mod 2'), line: 2, next: 'd1', run: (v) => { v.r = ((v.n % 2) + 2) % 2; } },
      { id: 'd1', type: 'decision', c: 3, r: 3.8, text: B('r = 0?', 'r = 0?'), line: 3, cond: (v) => v.r === 0, yes: 'oe', no: 'oo' },
      { id: 'oe', type: 'io', c: 1.3, r: 5.0, text: B('Output "even"', 'Tulis "genap"'), line: 4, next: 'end', run: (v, inp, out) => { out.push(getLocale() === 'id' ? 'genap' : 'even'); } },
      { id: 'oo', type: 'io', c: 4.7, r: 5.0, text: B('Output "odd"', 'Tulis "ganjil"'), line: 6, next: 'end', run: (v, inp, out) => { out.push(getLocale() === 'id' ? 'ganjil' : 'odd'); } },
      { id: 'end', type: 'end', c: 3, r: 6.3, text: B('End', 'Selesai'), line: 7 },
    ],
    edges: [
      { from: 'start', to: 'in' }, { from: 'in', to: 'p1' }, { from: 'p1', to: 'd1' },
      { from: 'd1', to: 'oe', out: 'left', in: 'top', label: 'yes', pts: [[1.3, 3.8]] },
      { from: 'd1', to: 'oo', out: 'right', in: 'top', label: 'no', pts: [[4.7, 3.8]] },
      { from: 'oe', to: 'end', pts: [[1.3, 5.7], [3, 5.7]] },
      { from: 'oo', to: 'end', pts: [[4.7, 5.7], [3, 5.7]] },
    ],
  },
  fizzbuzz: {
    name: B('FizzBuzz (lite)', 'FizzBuzz (ringan)'),
    inputs: [{ k: 'n', v: 15 }],
    vars: ['n', 'i'],
    cols: 7, rows: 10,
    pseudo: {
      en: ['START', 'INPUT n', 'i ← 1', 'WHILE i ≤ n DO', '    IF i mod 15 = 0 THEN OUTPUT "FizzBuzz"', '    ELSE IF i mod 3 = 0 THEN OUTPUT "Fizz"', '    ELSE IF i mod 5 = 0 THEN OUTPUT "Buzz"', '    ELSE OUTPUT i', '    i ← i + 1', 'END WHILE', 'END'],
      id: ['MULAI', 'BACA n', 'i ← 1', 'SELAMA i ≤ n LAKUKAN', '    JIKA i mod 15 = 0 MAKA TULIS "FizzBuzz"', '    JIKA TIDAK, JIKA i mod 3 = 0 MAKA TULIS "Fizz"', '    JIKA TIDAK, JIKA i mod 5 = 0 MAKA TULIS "Buzz"', '    JIKA TIDAK TULIS i', '    i ← i + 1', 'AKHIR SELAMA', 'SELESAI'],
    },
    nodes: [
      { id: 'start', type: 'start', c: 1.6, r: 0.5, text: B('Start', 'Mulai'), line: 0, next: 'in' },
      { id: 'in', type: 'io', c: 1.6, r: 1.5, text: B('Input n', 'Baca n'), line: 1, next: 'p1', run: (v, inp) => { v.n = inp.n; } },
      { id: 'p1', type: 'process', c: 1.6, r: 2.5, text: B('i ← 1', 'i ← 1'), line: 2, next: 'd1', run: (v) => { v.i = 1; } },
      { id: 'd1', type: 'decision', c: 1.6, r: 3.8, text: B('i ≤ n?', 'i ≤ n?'), line: 3, cond: (v) => v.i <= v.n, yes: 'd2', no: 'end' },
      { id: 'd2', type: 'decision', c: 1.6, r: 5.0, text: B('i mod 15 = 0?', 'i mod 15 = 0?'), line: 4, cond: (v) => v.i % 15 === 0, yes: 'o1', no: 'd3' },
      { id: 'o1', type: 'io', c: 4.1, r: 5.0, text: B('Output "FizzBuzz"', 'Tulis "FizzBuzz"'), line: 4, next: 'inc', run: (v, inp, out) => { out.push('FizzBuzz'); } },
      { id: 'd3', type: 'decision', c: 1.6, r: 6.2, text: B('i mod 3 = 0?', 'i mod 3 = 0?'), line: 5, cond: (v) => v.i % 3 === 0, yes: 'o2', no: 'd4' },
      { id: 'o2', type: 'io', c: 4.1, r: 6.2, text: B('Output "Fizz"', 'Tulis "Fizz"'), line: 5, next: 'inc', run: (v, inp, out) => { out.push('Fizz'); } },
      { id: 'd4', type: 'decision', c: 1.6, r: 7.4, text: B('i mod 5 = 0?', 'i mod 5 = 0?'), line: 6, cond: (v) => v.i % 5 === 0, yes: 'o3', no: 'o4' },
      { id: 'o3', type: 'io', c: 4.1, r: 7.4, text: B('Output "Buzz"', 'Tulis "Buzz"'), line: 6, next: 'inc', run: (v, inp, out) => { out.push('Buzz'); } },
      { id: 'o4', type: 'io', c: 1.6, r: 8.6, text: B('Output i', 'Tulis i'), line: 7, next: 'inc', run: (v, inp, out) => { out.push(v.i); } },
      { id: 'inc', type: 'process', c: 4.1, r: 8.6, text: B('i ← i + 1', 'i ← i + 1'), line: 8, next: 'd1', run: (v) => { v.i = v.i + 1; } },
      { id: 'end', type: 'end', c: 6.0, r: 3.8, text: B('End', 'Selesai'), line: 10 },
    ],
    edges: [
      { from: 'start', to: 'in' }, { from: 'in', to: 'p1' }, { from: 'p1', to: 'd1' },
      { from: 'd1', to: 'd2', label: 'yes' },
      { from: 'd1', to: 'end', out: 'right', in: 'left', label: 'no' },
      { from: 'd2', to: 'o1', out: 'right', in: 'left', label: 'yes' },
      { from: 'd2', to: 'd3', label: 'no' },
      { from: 'd3', to: 'o2', out: 'right', in: 'left', label: 'yes' },
      { from: 'd3', to: 'd4', label: 'no' },
      { from: 'd4', to: 'o3', out: 'right', in: 'left', label: 'yes' },
      { from: 'd4', to: 'o4', label: 'no' },
      { from: 'o1', to: 'inc', out: 'right', in: 'right', pts: [[5.6, 5.0], [5.6, 8.6]] },
      { from: 'o2', to: 'inc', out: 'right', in: 'right', pts: [[5.6, 6.2], [5.6, 8.6]] },
      { from: 'o3', to: 'inc', out: 'right', in: 'right', pts: [[5.6, 7.4], [5.6, 8.6]] },
      { from: 'o4', to: 'inc', out: 'right', in: 'left' },
      { from: 'inc', to: 'd1', out: 'bottom', in: 'left', pts: [[4.1, 9.4], [0.3, 9.4], [0.3, 3.8]] },
    ],
  },
  gcd: {
    name: B('GCD by subtraction', 'FPB dengan pengurangan'),
    inputs: [{ k: 'a', v: 48 }, { k: 'b', v: 18 }],
    vars: ['a', 'b'],
    cols: 7, rows: 7.2,
    pseudo: {
      en: ['START', 'INPUT a, b', 'WHILE a ≠ b DO', '    IF a > b THEN', '        a ← a − b', '    ELSE', '        b ← b − a', 'END WHILE', 'OUTPUT a', 'END'],
      id: ['MULAI', 'BACA a, b', 'SELAMA a ≠ b LAKUKAN', '    JIKA a > b MAKA', '        a ← a − b', '    JIKA TIDAK', '        b ← b − a', 'AKHIR SELAMA', 'TULIS a', 'SELESAI'],
    },
    nodes: [
      { id: 'start', type: 'start', c: 2.5, r: 0.5, text: B('Start', 'Mulai'), line: 0, next: 'in' },
      { id: 'in', type: 'io', c: 2.5, r: 1.5, text: B('Input a, b', 'Baca a, b'), line: 1, next: 'd1', run: (v, inp) => { v.a = inp.a; v.b = inp.b; } },
      { id: 'd1', type: 'decision', c: 2.5, r: 2.9, text: B('a ≠ b?', 'a ≠ b?'), line: 2, cond: (v) => v.a !== v.b, yes: 'd2', no: 'out' },
      { id: 'out', type: 'io', c: 4.8, r: 2.9, text: B('Output a', 'Tulis a'), line: 8, next: 'end', run: (v, inp, out) => { out.push(v.a); } },
      { id: 'end', type: 'end', c: 6.3, r: 2.9, text: B('End', 'Selesai'), line: 9 },
      { id: 'd2', type: 'decision', c: 2.5, r: 4.4, text: B('a > b?', 'a > b?'), line: 3, cond: (v) => v.a > v.b, yes: 'pa', no: 'pb' },
      { id: 'pa', type: 'process', c: 1.0, r: 5.7, text: B('a ← a − b', 'a ← a − b'), line: 4, next: 'd1', run: (v) => { v.a = v.a - v.b; } },
      { id: 'pb', type: 'process', c: 4.3, r: 5.7, text: B('b ← b − a', 'b ← b − a'), line: 6, next: 'd1', run: (v) => { v.b = v.b - v.a; } },
    ],
    edges: [
      { from: 'start', to: 'in' }, { from: 'in', to: 'd1' },
      { from: 'd1', to: 'out', out: 'right', in: 'left', label: 'no' },
      { from: 'out', to: 'end', out: 'right', in: 'left' },
      { from: 'd1', to: 'd2', label: 'yes' },
      { from: 'd2', to: 'pa', out: 'left', in: 'top', label: 'yes', pts: [[1.0, 4.4]] },
      { from: 'd2', to: 'pb', out: 'right', in: 'top', label: 'no', pts: [[4.3, 4.4]] },
      { from: 'pa', to: 'd1', out: 'bottom', in: 'left', pts: [[1.0, 6.5], [0.3, 6.5], [0.3, 2.9]] },
      { from: 'pb', to: 'd1', out: 'bottom', in: 'left', pts: [[4.3, 6.5], [0.3, 6.5], [0.3, 2.9]] },
    ],
  },
};

const MAX_STEPS = 400;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const traceWrap = document.createElement('div');
  traceWrap.style.cssText = 'padding:var(--space-3) var(--space-4);border-top:1px solid var(--color-border)';
  rootEl.appendChild(traceWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 10 });

  const state = {
    presetKey: 'max3',
    inputs: {},
    vars: {},
    outputs: [],
    cur: 'start',
    lastEdge: null,
    steps: 0,
    done: false,
    limitHit: false,
    running: false,
    speed: 2,
    acc: 0,
    trace: [],
    changed: new Set(),
    flash: 0,
  };
  const preset = () => PRESETS[state.presetKey];
  const nodeById = (id) => preset().nodes.find((n) => n.id === id);

  function reset() {
    const p = preset();
    state.vars = {};
    for (const v of p.vars) state.vars[v] = undefined;
    state.outputs = [];
    state.cur = 'start';
    state.lastEdge = null;
    state.steps = 0;
    state.done = false;
    state.limitHit = false;
    state.running = false;
    state.trace = [];
    state.changed.clear();
    runB.label = T('Run', 'Jalankan');
    renderTrace();
  }

  function stepOnce() {
    if (state.done || !state.cur) return;
    const n = nodeById(state.cur);
    if (!n) { state.done = true; return; }
    const before = { ...state.vars };
    const outBefore = state.outputs.length;
    let nextId = null, branch = '';
    if (n.type === 'decision') {
      const r = !!n.cond(state.vars);
      nextId = r ? n.yes : n.no;
      branch = r ? 'yes' : 'no';
    } else {
      if (n.run) n.run(state.vars, state.inputs, state.outputs);
      nextId = n.next ?? null;
    }
    state.steps++;
    state.changed.clear();
    for (const k of preset().vars) if (before[k] !== state.vars[k]) state.changed.add(k);
    state.flash = 1;
    const label = T(n.text.en, n.text.id) + (branch ? ` → ${branch === 'yes' ? T('yes', 'ya') : T('no', 'tidak')}` : '');
    state.trace.push({
      step: state.steps,
      block: label,
      vars: { ...state.vars },
      out: state.outputs.slice(outBefore).join(' '),
    });
    state.lastEdge = nextId ? { from: n.id, to: nextId, branch } : null;
    state.cur = nextId;
    if (n.type === 'end' || !nextId) { state.done = true; state.running = false; }
    if (state.steps >= MAX_STEPS && !state.done) { state.done = true; state.limitHit = true; state.running = false; }
    if (state.done) runB.label = T('Run', 'Jalankan');
    renderTrace();
  }

  // ---------- geometry ----------
  function layout() {
    const W = cv.width, H = cv.height;
    const p = preset();
    const fx = W * 0.02, fy = H * 0.07, fw = W * 0.54, fh = H * 0.91;
    const cw = fw / p.cols, ch = fh / p.rows;
    return { W, H, fx, fy, fw, fh, cw, ch, px: W * 0.585, pw: W * 0.395 };
  }
  function nodeBox(n, g) {
    const x = g.fx + n.c * g.cw, y = g.fy + n.r * g.ch;
    let w, h;
    if (n.type === 'decision') { w = 2.3 * g.cw; h = 0.92 * g.ch; }
    else if (n.type === 'start' || n.type === 'end') { w = 1.3 * g.cw; h = 0.56 * g.ch; }
    else { w = 2.0 * g.cw; h = 0.62 * g.ch; }
    return { x, y, w, h };
  }
  function anchor(box, side) {
    switch (side) {
      case 'top': return { x: box.x, y: box.y - box.h / 2 };
      case 'left': return { x: box.x - box.w / 2, y: box.y };
      case 'right': return { x: box.x + box.w / 2, y: box.y };
      default: return { x: box.x, y: box.y + box.h / 2 };
    }
  }
  function edgePoints(e, g) {
    const a = nodeBox(nodeById(e.from), g), b = nodeBox(nodeById(e.to), g);
    const p0 = anchor(a, e.out || 'bottom'), p1 = anchor(b, e.in || 'top');
    const mid = (e.pts || []).map(([c, r]) => ({ x: g.fx + c * g.cw, y: g.fy + r * g.ch }));
    return [p0, ...mid, p1];
  }

  // ---------- drawing ----------
  function draw() {
    const ctx = cv.ctx;
    const g = layout();
    const { W, H } = g;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const p = preset();
    const fs = clamp(Math.min(g.ch * 0.34, g.cw * 0.33), 7, 15);
    const font = `${fs}px system-ui, -apple-system, Roboto, sans-serif`;

    // title
    ctx.fillStyle = '#94a3b8';
    ctx.font = `600 ${clamp(W * 0.016, 9, 15)}px system-ui, sans-serif`;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(T(p.name.en, p.name.id), g.fx, H * 0.035);

    // edges
    const cur = state.cur;
    for (const e of p.edges) {
      const pts = edgePoints(e, g);
      const hot = state.lastEdge && state.lastEdge.from === e.from && state.lastEdge.to === e.to;
      ctx.strokeStyle = hot ? '#fbbf24' : '#64748b';
      ctx.lineWidth = hot ? 3 : 1.5;
      ctx.beginPath();
      pts.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
      ctx.stroke();
      // arrow head
      const q1 = pts[pts.length - 1], q0 = pts[pts.length - 2];
      const ang = Math.atan2(q1.y - q0.y, q1.x - q0.x);
      const al = clamp(g.cw * 0.12, 5, 10);
      ctx.fillStyle = hot ? '#fbbf24' : '#64748b';
      ctx.beginPath();
      ctx.moveTo(q1.x, q1.y);
      ctx.lineTo(q1.x - al * Math.cos(ang - 0.45), q1.y - al * Math.sin(ang - 0.45));
      ctx.lineTo(q1.x - al * Math.cos(ang + 0.45), q1.y - al * Math.sin(ang + 0.45));
      ctx.closePath(); ctx.fill();
      if (e.label) {
        const lbl = e.label === 'yes' ? T('yes', 'ya') : T('no', 'tidak');
        ctx.fillStyle = e.label === 'yes' ? '#34d399' : '#f87171';
        ctx.font = `600 ${fs * 0.85}px system-ui, sans-serif`;
        const s = pts[0], d = pts[1];
        const horiz = Math.abs(d.y - s.y) < Math.abs(d.x - s.x);
        ctx.textAlign = horiz ? (d.x > s.x ? 'left' : 'right') : 'left';
        const lx = horiz ? s.x + (d.x > s.x ? 4 : -4) : s.x + 4;
        const ly = horiz ? s.y - fs * 0.6 : s.y + fs * 0.7;
        ctx.fillText(lbl, lx, ly);
      }
    }

    // nodes
    ctx.font = font;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const n of p.nodes) {
      const b = nodeBox(n, g);
      const isCur = n.id === cur && !state.done;
      const isEndDone = state.done && n.type === 'end' && !state.limitHit && state.cur === null;
      let fill = '#1e293b', stroke = '#94a3b8';
      if (n.type === 'decision') { fill = '#3b2f6b'; stroke = '#a78bfa'; }
      if (n.type === 'io') { fill = '#0e3a4a'; stroke = '#22d3ee'; }
      if (n.type === 'start' || n.type === 'end') { fill = '#14352a'; stroke = '#34d399'; }
      if (isCur || isEndDone) { stroke = '#fbbf24'; }
      ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = isCur ? 3 : 1.5;
      if (isCur) { ctx.shadowColor = 'rgba(251,191,36,0.8)'; ctx.shadowBlur = 14; }
      ctx.beginPath();
      if (n.type === 'decision') {
        ctx.moveTo(b.x, b.y - b.h / 2); ctx.lineTo(b.x + b.w / 2, b.y); ctx.lineTo(b.x, b.y + b.h / 2); ctx.lineTo(b.x - b.w / 2, b.y); ctx.closePath();
      } else if (n.type === 'io') {
        const k = b.w * 0.12;
        ctx.moveTo(b.x - b.w / 2 + k, b.y - b.h / 2); ctx.lineTo(b.x + b.w / 2, b.y - b.h / 2); ctx.lineTo(b.x + b.w / 2 - k, b.y + b.h / 2); ctx.lineTo(b.x - b.w / 2, b.y + b.h / 2); ctx.closePath();
      } else if (n.type === 'start' || n.type === 'end') {
        ctx.roundRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, b.h / 2);
      } else {
        ctx.rect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
      }
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f1f5f9';
      ctx.fillText(T(n.text.en, n.text.id), b.x, b.y + 0.5);
    }

    // ---------- right panel: pseudocode ----------
    const px = g.px, pw = g.pw;
    const lines = p.pseudo[getLocale() === 'id' ? 'id' : 'en'];
    const pfs = clamp(Math.min(W * 0.0155, (H * 0.46) / (lines.length + 1) * 0.72), 7, 14);
    const lh = pfs * 1.45;
    let y = H * 0.07;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${pfs}px system-ui, sans-serif`;
    ctx.fillText(T('Pseudocode', 'Pseudokode'), px, y); y += lh * 1.1;
    const curNode = cur ? nodeById(cur) : null;
    const hiLine = state.done && !state.limitHit ? lines.length - 1 : (curNode ? curNode.line : -1);
    ctx.font = `${pfs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    lines.forEach((ln, i) => {
      if (i === hiLine) {
        ctx.fillStyle = 'rgba(251,191,36,0.22)';
        ctx.fillRect(px - 4, y - lh / 2, pw + 4, lh);
      }
      ctx.fillStyle = '#64748b';
      ctx.fillText(String(i + 1).padStart(2, ' '), px, y);
      ctx.fillStyle = i === hiLine ? '#fde68a' : '#e2e8f0';
      ctx.fillText(ln, px + pfs * 2.2, y);
      y += lh;
    });

    // ---------- variables table ----------
    y += lh * 0.6;
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${pfs}px system-ui, sans-serif`;
    ctx.fillText(T('Variables', 'Variabel'), px, y); y += lh * 1.1;
    const colW = Math.min(pw / Math.max(1, p.vars.length), pfs * 6);
    p.vars.forEach((k, i) => {
      const x = px + i * colW;
      const v = state.vars[k];
      const chg = state.changed.has(k) && state.flash > 0;
      ctx.fillStyle = chg ? `rgba(52,211,153,${0.15 + 0.35 * state.flash})` : 'rgba(148,163,184,0.10)';
      ctx.fillRect(x, y - lh / 2, colW - 4, lh * 2);
      ctx.fillStyle = '#94a3b8'; ctx.font = `${pfs * 0.9}px ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(k, x + (colW - 4) / 2, y);
      ctx.fillStyle = v === undefined ? '#475569' : '#f8fafc';
      ctx.font = `700 ${pfs * 1.1}px ui-monospace, monospace`;
      ctx.fillText(v === undefined ? '?' : String(v), x + (colW - 4) / 2, y + lh);
      ctx.textAlign = 'left';
    });
    y += lh * 2.4;

    // ---------- output + status ----------
    ctx.fillStyle = '#94a3b8'; ctx.font = `600 ${pfs}px system-ui, sans-serif`;
    ctx.fillText(T('Output', 'Keluaran'), px, y); y += lh * 1.1;
    ctx.fillStyle = '#22d3ee'; ctx.font = `${pfs}px ui-monospace, monospace`;
    const outStr = state.outputs.length ? state.outputs.join(' ') : '—';
    wrapText(ctx, outStr, px, y, pw, lh, 3); y += lh * 3.2;
    ctx.fillStyle = state.done ? (state.limitHit ? '#f87171' : '#34d399') : '#fbbf24';
    ctx.font = `600 ${pfs}px system-ui, sans-serif`;
    const status = state.limitHit ? T('Stopped: step limit reached (infinite loop?)', 'Berhenti: batas langkah tercapai (perulangan tak hingga?)')
      : state.done ? T('Finished', 'Selesai')
        : state.steps === 0 ? T('Ready — press Step or Run', 'Siap — tekan Langkah atau Jalankan') : (state.running ? T('Running…', 'Berjalan…') : T('Paused', 'Jeda'));
    ctx.fillText(`${T('Steps', 'Langkah')}: ${state.steps}  ·  ${status}`, px, Math.min(y, H - lh));
  }

  function wrapText(ctx, text, x, y, maxW, lh, maxLines) {
    const words = text.split(' ');
    let line = '', n = 0;
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y + n * lh); n++; line = w;
        if (n >= maxLines - 1) { line += '…'; break; }
      } else line = test;
    }
    ctx.fillText(line, x, y + n * lh);
  }

  // ---------- trace table (DOM) ----------
  function renderTrace() {
    const p = preset();
    const rows = state.trace;
    let html = `<div style="display:flex;align-items:center;gap:var(--space-2);flex-wrap:wrap;margin-bottom:6px">
      <strong style="font-size:var(--type-sm)">${T('Trace table', 'Tabel penelusuran')}</strong>
      <span style="color:var(--color-muted);font-size:var(--type-xs)">${rows.length} ${T('rows', 'baris')}</span></div>`;
    html += '<div style="max-height:220px;overflow:auto;border:1px solid var(--color-border);border-radius:var(--radius-1)">';
    html += '<table style="width:100%;border-collapse:collapse;font-family:var(--font-mono, ui-monospace, monospace);font-size:12px"><thead><tr>';
    const th = (s) => `<th style="position:sticky;top:0;background:var(--color-surface-2);text-align:left;padding:4px 8px;color:var(--color-muted);border-bottom:1px solid var(--color-border)">${s}</th>`;
    html += th('#') + th(T('Block', 'Blok')) + p.vars.map(th).join('') + th(T('Output', 'Keluaran'));
    html += '</tr></thead><tbody>';
    if (!rows.length) html += `<tr><td colspan="${p.vars.length + 3}" style="padding:8px;color:var(--color-muted)">${T('No steps yet. Press Step.', 'Belum ada langkah. Tekan Langkah.')}</td></tr>`;
    for (let i = Math.max(0, rows.length - 60); i < rows.length; i++) {
      const r = rows[i];
      const last = i === rows.length - 1;
      html += `<tr style="${last ? 'background:rgba(251,191,36,0.14)' : ''}"><td style="padding:3px 8px;color:var(--color-muted)">${r.step}</td><td style="padding:3px 8px">${esc(r.block)}</td>`;
      for (const k of p.vars) html += `<td style="padding:3px 8px">${r.vars[k] === undefined ? '' : esc(String(r.vars[k]))}</td>`;
      html += `<td style="padding:3px 8px;color:#0891b2">${esc(r.out)}</td></tr>`;
    }
    html += '</tbody></table></div>';
    traceWrap.innerHTML = html;
    traceWrap.appendChild(exportRow);
  }
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function exportTrace() {
    if (!state.trace.length) return;
    const p = preset();
    const head = ['step', 'block', ...p.vars, 'output'];
    const cell = (v) => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const lines = [head.join(',')];
    for (const r of state.trace) lines.push([r.step, r.block, ...p.vars.map((k) => r.vars[k]), r.out].map(cell).join(','));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `flowchart-trace-${state.presetKey}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }
  const exportB = button({ label: '↓ Export trace (CSV)', onClick: exportTrace });
  const exportRow = row(exportB);
  exportRow.style.marginTop = '6px';

  // ---------- controls ----------
  const inputsWrap = document.createElement('div');
  inputsWrap.style.cssText = 'display:grid;gap:var(--space-2)';
  function buildInputs() {
    inputsWrap.innerHTML = '';
    state.inputs = {};
    for (const inp of preset().inputs) {
      state.inputs[inp.k] = inp.v;
      const wrap = document.createElement('div');
      wrap.className = 'ctrl';
      const lab = document.createElement('label');
      lab.textContent = `Input ${inp.k}`;
      const field = document.createElement('input');
      field.type = 'number'; field.value = inp.v; field.step = 1; field.min = -999; field.max = 999;
      field.className = 'btn';
      field.style.cssText = 'width:100%;grid-column:1 / -1;font-family:var(--font-mono, monospace)';
      field.setAttribute('aria-label', `Input ${inp.k}`);
      field.addEventListener('input', () => {
        const n = Math.round(Number(field.value));
        state.inputs[inp.k] = Number.isFinite(n) ? clamp(n, -999, 999) : 0;
        reset();
      });
      wrap.append(lab, document.createElement('span'), field);
      inputsWrap.appendChild(wrap);
    }
  }

  const presetSel = select({
    label: 'Algorithm', key: 'alg',
    options: Object.entries(PRESETS).map(([k, v]) => ({ value: k, label: v.name.en })),
    value: state.presetKey,
    onChange: (v) => { state.presetKey = v; buildInputs(); reset(); },
  });
  const speedS = slider({ label: 'Speed (steps / s)', key: 'speed', min: 0.5, max: 10, step: 0.5, value: state.speed, format: (v) => v.toFixed(1), onInput: (v) => { state.speed = v; } });
  const runB = button({
    label: 'Run', primary: true,
    onClick: () => {
      if (state.done) reset();
      state.running = !state.running;
      runB.label = state.running ? T('Pause', 'Jeda') : T('Run', 'Jalankan');
    },
  });
  const stepB = button({ label: 'Step', onClick: () => { if (state.done) reset(); state.running = false; runB.label = T('Run', 'Jalankan'); stepOnce(); } });
  const resetB = button({ label: 'Reset', onClick: () => reset() });
  ctrlPanel.append(presetSel.el, inputsWrap, row(runB, stepB, resetB), speedS.el);

  const lab = labPanel({
    title: 'Algorithm lab',
    filename: 'flowchart-runner-data.csv',
    columns: [
      { key: 'algorithm', label: 'Algorithm' },
      { key: 'inputs', label: 'Inputs' },
      { key: 'steps', label: 'Steps executed' },
      { key: 'output', label: 'Output' },
      { key: 'finished', label: 'Finished?' },
    ],
    procedure: [
      'Choose an algorithm and type the inputs. Predict the output before running.',
      'Press Step until the End block lights up. Record the row.',
      'Change one input and repeat. How does the number of steps change?',
      'For Sum 1..n, record n = 1, 2, 4, 8. Is the number of steps proportional to n?',
      'Export the trace table and check one row by hand.',
    ],
    predict: 'How many steps will GCD by subtraction take for a = 48, b = 18? And for a = 1, b = 30?',
    source: () => {
      if (!state.steps) return null;
      const p = preset();
      return {
        algorithm: p.name.en,
        inputs: p.inputs.map((i) => `${i.k}=${state.inputs[i.k]}`).join(' '),
        steps: state.steps,
        output: state.outputs.join(' '),
        finished: state.done && !state.limitHit ? 'yes' : 'no',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  buildInputs();
  reset();

  const animator = loop((dt) => {
    if (state.running && !state.done) {
      state.acc += dt * state.speed;
      while (state.acc >= 1 && state.running && !state.done) { state.acc -= 1; stepOnce(); }
    } else state.acc = 0;
    state.flash = Math.max(0, state.flash - dt * 1.5);
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
