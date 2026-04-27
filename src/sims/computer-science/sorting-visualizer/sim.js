import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

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
    arr: [],
    iter: null,
    highlight: { i: -1, j: -1 },
    sorted: new Set(),
    counts: { compare: 0, swap: 0, set: 0 },
    running: false,
    accum: 0,
    lastTime: 0,
  };

  function newArray() {
    state.arr = Array.from({ length: state.size }, () => Math.floor(Math.random() * 100) + 1);
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
    ctx.font = '13px var(--font-sans)';
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
  const playB = button({ label: 'Run', primary: true, onClick: () => {
    if (!state.iter) start();
    else state.running = !state.running;
    playB.label = state.running ? 'Pause' : 'Run';
  } });
  const shuffleB = button({ label: 'Shuffle', onClick: newArray });

  ctrlPanel.append(sizeS.el, speedS.el, algoSel.el, row(playB, shuffleB));

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
