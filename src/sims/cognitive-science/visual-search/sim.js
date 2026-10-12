import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = { mode: 'feature', N: 20 };
  const state = { items: [], targetIdx: -1, startTime: 0, trials: [], result: null };

  function makeTrial() {
    state.items = [];
    const target = { shape: 'O', color: '#ef4444' };
    const distractor = params.mode === 'feature'
      ? { shape: 'O', color: '#0ea5e9' }
      : null;
    for (let i = 0; i < params.N; i++) {
      const x = 60 + Math.random() * (cv.width - 120);
      const y = 60 + Math.random() * (cv.height - 120);
      let item;
      if (params.mode === 'feature') {
        item = { ...distractor, x, y };
      } else {
        // Conjunction: half blue Os, half red Xs (target = red O is unique combo)
        const tBlueO = Math.random() < 0.5;
        item = tBlueO ? { shape: 'O', color: '#0ea5e9', x, y } : { shape: 'X', color: '#ef4444', x, y };
      }
      state.items.push(item);
    }
    state.targetIdx = Math.floor(Math.random() * state.items.length);
    state.items[state.targetIdx] = { shape: 'O', color: '#ef4444', x: state.items[state.targetIdx].x, y: state.items[state.targetIdx].y };
    state.startTime = performance.now();
    state.result = null;
  }
  makeTrial();

  function clickAt(sx, sy) {
    if (state.result) { makeTrial(); return; }
    let hit = -1;
    for (let i = 0; i < state.items.length; i++) {
      const it = state.items[i];
      if (Math.hypot(sx - it.x, sy - it.y) < 18) { hit = i; break; }
    }
    if (hit < 0) return;
    const correct = hit === state.targetIdx;
    const ms = performance.now() - state.startTime;
    state.result = { correct, ms };
    if (correct) state.trials.push({ ms, N: params.N, mode: params.mode });
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Items
    for (const it of state.items) {
      ctx.fillStyle = it.color;
      ctx.font = 'bold 28px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(it.shape, it.x, it.y);
      ctx.textAlign = 'left';
    }

    if (state.result) {
      ctx.fillStyle = state.result.correct ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.fillRect(W * 0.35, H * 0.4, W * 0.3, 80);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(state.result.correct ? `Found in ${state.result.ms.toFixed(0)} ms` : 'Wrong target', W / 2, H * 0.45);
      ctx.font = '12px var(--font-sans)';
      ctx.fillText('Click anywhere for next trial', W / 2, H * 0.48 + 20);
      ctx.textAlign = 'left';
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(8, 8, 320, 36);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.fillText(`Find the RED O    N=${params.N}    mode: ${params.mode}`, 16, 30);
    }

    // Stats: average ms by N, separated by mode
    if (state.trials.length > 0) {
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(8, H - 70, 380, 60);
      const featureT = state.trials.filter((t) => t.mode === 'feature').map((t) => t.ms);
      const conjT = state.trials.filter((t) => t.mode === 'conjunction').map((t) => t.ms);
      const avg = (a) => a.length ? (a.reduce((x, y) => x + y, 0) / a.length).toFixed(0) : '–';
      ctx.fillStyle = '#0ea5e9';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(`Feature search avg:     ${avg(featureT)} ms (n=${featureT.length})`, 16, H - 48);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Conjunction search avg: ${avg(conjT)} ms (n=${conjT.length})`, 16, H - 30);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`Conjunction RT scales with N; feature pop-out is roughly constant.`, 16, H - 14);
    }
  }

  cv.canvas.addEventListener('click', (e) => {
    const r = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - r.left) * cv.width / r.width;
    const sy = (e.clientY - r.top) * cv.height / r.height;
    clickAt(sx, sy);
  });

  // controls
  const modeSel = select({
    label: 'Search type',
    options: [
      { value: 'feature',     label: 'Feature search (pop-out)' },
      { value: 'conjunction', label: 'Conjunction search' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; makeTrial(); },
  });
  const NS = slider({ label: 'Set size N', min: 4, max: 60, step: 1, value: params.N,
    onInput: (v) => { params.N = v; makeTrial(); } });
  const reB = button({ label: 'New trial', primary: true, onClick: makeTrial });
  const resetB = button({ label: 'Reset stats', onClick: () => { state.trials = []; } });
  ctrlPanel.append(modeSel.el, NS.el, row(reB, resetB));

  // Lab — set size and search type vs mean reaction time (only trials at the current N and mode).
  const lab = labPanel({
    title: 'Visual search lab — RT vs set size',
    filename: 'visual-search-lab.csv',
    columns: [
      { key: 'mode',   label: 'search type' },
      { key: 'N',      label: 'set size N' },
      { key: 'n',      label: 'trials' },
      { key: 'meanRT', label: 'mean RT (ms)', format: (v) => v.toFixed(0) },
      { key: 'bestRT', label: 'fastest RT (ms)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Feature search, N = 8. Click the red O as fast as you can; click again for the next trial. Do 5 trials, then record.',
      'Still in Feature search, set N = 16, 32 and 60. Do 5 trials at each and record. Only trials at the current N and mode are averaged.',
      'Switch to Conjunction search and repeat N = 8, 16, 32, 60 with 5 trials each, recording each.',
      'Plot mean RT vs N for both search types. Feature search should be nearly flat; conjunction search should rise roughly linearly.',
      'Estimate the slope of the conjunction line in ms per item — classic lab values are 20–40 ms/item.',
    ],
    predict: 'Will doubling the number of distractors double your search time in feature search? In conjunction search?',
    source: () => {
      const rts = state.trials.filter((t) => t.mode === params.mode && t.N === params.N).map((t) => t.ms);
      if (rts.length === 0) throw new Error('No trials yet at this N and search type');
      return {
        mode: params.mode,
        N: params.N,
        n: rts.length,
        meanRT: rts.reduce((a, b) => a + b, 0) / rts.length,
        bestRT: Math.min(...rts),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
