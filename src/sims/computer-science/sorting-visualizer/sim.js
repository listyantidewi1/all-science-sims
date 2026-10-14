import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Each algorithm yields step descriptors so the renderer can highlight them.
// Step shape: { type: 'compare'|'swap'|'set'|'mark', i, j?, value?, range? }

function* bubbleSort(a) {
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      yield { type: 'compare', i: j, j: j + 1 };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { type: 'swap', i: j, j: j + 1 };
      }
    }
    yield { type: 'mark', i: n - 1 - i };
  }
  yield { type: 'mark', i: 0 };
}

function* insertionSort(a) {
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0) {
      yield { type: 'compare', i: j, j: i };
      if (a[j] > key) {
        a[j + 1] = a[j];
        yield { type: 'set', i: j + 1, value: a[j] };
        j--;
      } else break;
    }
    a[j + 1] = key;
    yield { type: 'set', i: j + 1, value: key };
  }
}

function* selectionSort(a) {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', i: min, j };
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      yield { type: 'swap', i, j: min };
    }
    yield { type: 'mark', i };
  }
}

function* mergeSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return;
  const mid = (lo + hi) >> 1;
  yield* mergeSort(a, lo, mid);
  yield* mergeSort(a, mid + 1, hi);
  const tmp = [];
  let i = lo, j = mid + 1;
  while (i <= mid && j <= hi) {
    yield { type: 'compare', i, j };
    if (a[i] <= a[j]) tmp.push(a[i++]); else tmp.push(a[j++]);
  }
  while (i <= mid) tmp.push(a[i++]);
  while (j <= hi) tmp.push(a[j++]);
  for (let k = 0; k < tmp.length; k++) {
    a[lo + k] = tmp[k];
    yield { type: 'set', i: lo + k, value: tmp[k] };
  }
}

function* quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return;
  const pivot = a[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    yield { type: 'compare', i: j, j: hi };
    if (a[j] <= pivot) {
      i++;
      if (i !== j) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { type: 'swap', i, j };
      }
    }
  }
  if (i + 1 !== hi) {
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]];
    yield { type: 'swap', i: i + 1, j: hi };
  }
  yield* quickSort(a, lo, i);
  yield* quickSort(a, i + 2, hi);
}

const ALGOS = {
  bubble:    { name: 'Bubble sort',    fn: bubbleSort },
  insertion: { name: 'Insertion sort', fn: insertionSort },
  selection: { name: 'Selection sort', fn: selectionSort },
  merge:     { name: 'Merge sort',     fn: mergeSort },
  quick:     { name: 'Quick sort',     fn: quickSort },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    size: 30,
    speed: 30, // steps per second
    algo: 'quick',
    input: 'random', // 'random' | 'nearly' | 'reversed'
    arr: [],
    iter: null,
    highlight: { i: -1, j: -1 },
    sorted: new Set(),
    counts: { compare: 0, swap: 0, set: 0 },
    running: false,
    accum: 0,
    lastTime: 0,
  };

  function makeArray(n, kind) {
    const vals = Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1);
    if (kind === 'random') return vals;
    vals.sort((a, b) => a - b);
    if (kind === 'reversed') return vals.reverse();
    // nearly sorted: displace a handful of elements (about 5% of n, at least one) by 1–3 positions
    const moves = Math.max(1, Math.round(n * 0.05));
    for (let s = 0; s < moves; s++) {
      const i = Math.floor(Math.random() * (n - 1));
      const j = Math.min(n - 1, i + 1 + Math.floor(Math.random() * 3));
      [vals[i], vals[j]] = [vals[j], vals[i]];
    }
    return vals;
  }

  function newArray() {
    state.arr = makeArray(state.size, state.input);
    state.iter = null;
    state.highlight = { i: -1, j: -1 };
    state.sorted = new Set();
    state.counts = { compare: 0, swap: 0, set: 0 };
    state.running = false;
    playB.label = 'Run';
  }

  function start() {
    state.iter = ALGOS[state.algo].fn(state.arr.slice ? state.arr : state.arr);
    // Generators above mutate state.arr in-place since we pass it by reference.
    state.iter = ALGOS[state.algo].fn(state.arr);
    state.counts = { compare: 0, swap: 0, set: 0 };
    state.sorted = new Set();
    state.running = true;
    playB.label = 'Pause';
  }

  function step() {
    if (!state.iter) return false;
    const r = state.iter.next();
    if (r.done) { state.iter = null; state.running = false; playB.label = 'Run';
      // mark all as sorted
      for (let i = 0; i < state.arr.length; i++) state.sorted.add(i);
      return false;
    }
    const ev = r.value;
    if (ev.type === 'compare') { state.counts.compare++; state.highlight = { i: ev.i, j: ev.j }; }
    else if (ev.type === 'swap') { state.counts.swap++; state.highlight = { i: ev.i, j: ev.j }; }
    else if (ev.type === 'set') { state.counts.set++; state.highlight = { i: ev.i, j: -1 }; }
    else if (ev.type === 'mark') { state.sorted.add(ev.i); }
    return true;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const n = state.arr.length;
    const pad = 16;
    const barW = (W - pad * 2) / n;
    const maxV = Math.max(...state.arr, 1);
    const accent = 'rgb(139, 92, 246)';
    const compareCol = '#f59e0b';
    const sortedCol = '#10b981';

    for (let i = 0; i < n; i++) {
      const v = state.arr[i];
      const h = ((H - 60) * v) / maxV;
      const x = pad + i * barW;
      const y = H - 24 - h;
      let fill = accent;
      if (state.sorted.has(i)) fill = sortedCol;
      if (i === state.highlight.i || i === state.highlight.j) fill = compareCol;
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, Math.max(1, barW - 1), h);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.95)';
    ctx.font = '13px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(`${ALGOS[state.algo].name}  ·  n = ${n}`, 12, 18);
    const cs = state.counts;
    ctx.fillText(`compares: ${cs.compare}   swaps: ${cs.swap}   writes: ${cs.set}`, 12, 36);
  }

  // controls
  const sizeS = slider({
    label: 'Array size', min: 8, max: 100, step: 1, value: state.size,
    onInput: (v) => { state.size = v; newArray(); },
  });
  const speedS = slider({
    label: 'Steps / second', min: 5, max: 400, step: 5, value: state.speed,
    onInput: (v) => { state.speed = v; },
  });
  const algoSel = select({
    label: 'Algorithm',
    options: Object.entries(ALGOS).map(([k, v]) => ({ value: k, label: v.name })),
    value: state.algo,
    onChange: (v) => { state.algo = v; newArray(); },
  });
  const inputSel = select({
    label: 'Input order',
    key: 'input',
    options: [
      { value: 'random', label: 'Random' },
      { value: 'nearly', label: 'Nearly sorted' },
      { value: 'reversed', label: 'Reversed' },
    ],
    value: state.input,
    onChange: (v) => { state.input = v; newArray(); },
  });
  const playB = button({ label: 'Run', primary: true, onClick: () => {
    if (!state.iter) start();
    else state.running = !state.running;
    playB.label = state.running ? 'Pause' : 'Run';
  } });
  const shuffleB = button({ label: 'Shuffle', onClick: newArray });

  ctrlPanel.append(sizeS.el, speedS.el, algoSel.el, inputSel.el, row(playB, shuffleB));

  // Lab — algorithm and array size vs comparison / swap / write counts of a completed sort.
  const lab = labPanel({
    title: 'Sorting lab — n vs comparisons and swaps',
    filename: 'sorting-visualizer-lab.csv',
    columns: [
      { key: 'algo',     label: 'algorithm' },
      { key: 'n',        label: 'n' },
      { key: 'compares', label: 'compares' },
      { key: 'swaps',    label: 'swaps' },
      { key: 'writes',   label: 'writes' },
    ],
    procedure: [
      'Pick Bubble sort, array size 10, steps/second 400. Click Run and wait until every bar is green, then Record.',
      'Repeat for n = 20, 40, 80 (Shuffle gives a new array each time). Does doubling n double or quadruple the compares?',
      'Switch to Merge sort and repeat n = 10, 20, 40, 80. Compare its growth with Bubble sort.',
      'Do the same for Quick sort. Shuffle and re-run at n = 40 three times — how much do the counts vary?',
      'Plot compares vs n for each algorithm. Which curves look like n², which like n log n?',
    ],
    predict: 'Going from n = 40 to n = 80, by what factor will Bubble sort\'s comparisons grow? And Merge sort\'s?',
    source: () => {
      const done = !state.iter && state.arr.length > 0 && state.sorted.size === state.arr.length;
      if (!done) throw new Error('Run the sort to completion first');
      return {
        algo: ALGOS[state.algo].name,
        n: state.arr.length,
        compares: state.counts.compare,
        swaps: state.counts.swap,
        writes: state.counts.set,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  newArray();

  let raf = 0;
  let last = 0;
  let acc = 0;
  function tick(ts) {
    if (!last) last = ts;
    const dt = (ts - last) / 1000;
    last = ts;
    if (state.running && state.iter) {
      acc += dt;
      const stepsPerFrame = Math.max(1, Math.floor(state.speed * acc));
      for (let s = 0; s < stepsPerFrame; s++) {
        if (!step()) break;
      }
      acc = 0;
    }
    draw();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    cv.destroy();
  };
}
