import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const POOL = [
  'apple', 'river', 'candle', 'window', 'garden', 'pencil', 'mirror', 'bridge', 'jacket', 'forest',
  'button', 'ladder', 'rocket', 'pillow', 'hammer', 'island', 'basket', 'camera', 'violin', 'turtle',
  'castle', 'engine', 'feather', 'lantern', 'marble', 'needle', 'orange', 'parrot', 'puzzle', 'ribbon',
  'saddle', 'shadow', 'spider', 'sugar', 'tablet', 'ticket', 'tunnel', 'velvet', 'wagon', 'whistle',
  'anchor', 'blanket', 'cactus', 'dolphin', 'eagle', 'falcon', 'guitar', 'helmet', 'igloo', 'jungle',
  'kettle', 'lemon', 'meadow', 'nickel', 'oyster', 'pepper', 'quiver', 'rabbit', 'silver', 'thunder',
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { n: 12, rate: 1.5, delay: 0 };
  const state = {
    phase: 'idle',      // idle | present | delay | recall | done
    words: [],
    idx: 0,
    timer: 0,
    distractor: 0,
    recalled: new Set(),
    lastScore: null,
    data: {},           // listLength -> { trials, hits[] }
  };

  // Dual-store model: primacy from rehearsal, recency from a short-term
  // buffer that a filled delay empties. Middle recall shrinks with length.
  function model(i, n, delay) {
    const base = Math.min(0.5, 3.5 / n);
    const primacy = 0.55 * Math.exp(-i / 1.6);
    const recency = 0.6 * Math.exp(-(n - 1 - i) / 1.4) * Math.exp(-delay / 10);
    return Math.min(0.98, base + primacy + recency);
  }

  function bucket(n) {
    if (!state.data[n]) state.data[n] = { trials: 0, hits: new Array(n).fill(0) };
    return state.data[n];
  }

  function startList() {
    const pool = POOL.slice().sort(() => Math.random() - 0.5);
    state.words = pool.slice(0, params.n);
    state.idx = 0;
    state.timer = 0;
    state.recalled = new Set();
    state.lastScore = null;
    state.phase = 'present';
    input.value = '';
  }

  function startRecall() {
    state.phase = 'recall';
    state.timer = 0;
    input.disabled = false;
    input.focus();
  }

  function finishRecall() {
    if (state.phase !== 'recall') return;
    const b = bucket(state.words.length);
    b.trials++;
    state.words.forEach((w, i) => { if (state.recalled.has(w)) b.hits[i]++; });
    state.lastScore = state.recalled.size;
    state.phase = 'done';
    input.disabled = true;
  }

  function simulateTrials(count) {
    const b = bucket(params.n);
    for (let k = 0; k < count; k++) {
      b.trials++;
      for (let i = 0; i < params.n; i++) if (Math.random() < model(i, params.n, params.delay)) b.hits[i]++;
    }
  }

  function step(dt) {
    if (state.phase === 'present') {
      state.timer += dt;
      if (state.timer >= params.rate) {
        state.timer = 0;
        state.idx++;
        if (state.idx >= state.words.length) {
          if (params.delay > 0) {
            state.phase = 'delay';
            state.distractor = 300 + Math.floor(Math.random() * 600);
          } else startRecall();
        }
      }
    } else if (state.phase === 'delay') {
      state.timer += dt;
      if (state.timer >= params.delay) startRecall();
    }
  }

  function regionPct(n, from, to) {
    const b = state.data[n];
    if (!b || b.trials === 0 || to <= from) return null;
    let s = 0;
    for (let i = from; i < to; i++) s += b.hits[i];
    return (100 * s) / (b.trials * (to - from));
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawStage(ctx, 0, 0, W * 0.42, H);
    drawChart(ctx, W * 0.42 + 40, 40, W * 0.58 - 70, H - 90);
  }

  function drawStage(ctx, x, y, w, h) {
    ctx.fillStyle = '#111a2e';
    ctx.fillRect(x + 16, y + 16, w - 24, h - 32);
    const cx = x + w / 2;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '13px system-ui, sans-serif';
    if (state.phase === 'idle') {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText('Press "Start list"', cx, h * 0.45);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '13px system-ui, sans-serif';
      ctx.fillText(`${params.n} words, ${params.rate.toFixed(1)} s each`, cx, h * 0.45 + 26);
    } else if (state.phase === 'present') {
      ctx.fillText(`word ${state.idx + 1} / ${state.words.length}`, cx, y + 44);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 44px system-ui, sans-serif';
      ctx.fillText(state.words[state.idx].toUpperCase(), cx, h * 0.5);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(x + 24, h - 40, (w - 40) * (state.idx + state.timer / params.rate) / state.words.length, 4);
    } else if (state.phase === 'delay') {
      ctx.fillText('Filled delay — no rehearsing!', cx, y + 44);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 40px system-ui, sans-serif';
      ctx.fillText(`${Math.ceil(params.delay - state.timer)} s`, cx, h * 0.45);
      ctx.fillStyle = '#fff';
      ctx.font = '15px system-ui, sans-serif';
      ctx.fillText(`Count backwards by 3 from ${state.distractor}`, cx, h * 0.45 + 40);
    } else {
      const done = state.phase === 'done';
      ctx.fillStyle = done ? '#10b981' : '#0ea5e9';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(done ? `Recalled ${state.lastScore} of ${state.words.length}` : 'Type each word you remember', cx, y + 48);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(done ? 'Start another list to add a trial' : 'press Enter after each, then "Done recalling"', cx, y + 68);
      ctx.textAlign = 'left';
      ctx.font = '14px ui-monospace, monospace';
      const cols = 2, colW = (w - 60) / cols;
      state.words.forEach((wd, i) => {
        const hit = state.recalled.has(wd);
        ctx.fillStyle = hit ? '#fbbf24' : (done ? 'rgba(239,68,68,0.6)' : 'rgba(120,130,150,0.25)');
        const label = hit || done ? wd : '•'.repeat(wd.length);
        ctx.fillText(`${i + 1}. ${label}`, x + 36 + (i % cols) * colW, y + 100 + Math.floor(i / cols) * 20);
      });
    }
    ctx.textAlign = 'left';
  }

  function drawChart(ctx, x, y, w, h) {
    const n = params.n;
    const b = state.data[n];
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`Recall probability by list position (n = ${n}, trials = ${b ? b.trials : 0})`, x, y - 8);
    const bw = w / n;
    const y2 = (p) => y + h - p * (h - 10);
    ctx.font = '10px ui-monospace, monospace';
    for (let p = 0; p <= 1; p += 0.25) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(p)); ctx.lineTo(x + w, y2(p)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${(p * 100).toFixed(0)}%`, x - 32, y2(p) + 3);
    }
    // region shading
    ctx.fillStyle = 'rgba(16,185,129,0.08)';
    ctx.fillRect(x, y, bw * 3, h);
    ctx.fillStyle = 'rgba(14,165,233,0.08)';
    ctx.fillRect(x + w - bw * 3, y, bw * 3, h);
    ctx.fillStyle = '#10b981'; ctx.fillText('primacy', x + 4, y + 12);
    ctx.fillStyle = '#0ea5e9'; ctx.fillText('recency', x + w - bw * 3 + 4, y + 12);
    // observed bars
    if (b && b.trials > 0) {
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < n; i++) {
        const p = b.hits[i] / b.trials;
        ctx.fillRect(x + i * bw + 2, y2(p), bw - 4, y + h - y2(p));
      }
    }
    // model overlay
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const px = x + i * bw + bw / 2, py = y2(model(i, n, params.delay));
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    for (let i = 0; i < n; i++) ctx.fillText(String(i + 1), x + i * bw + bw / 2 - 3, y + h + 14);
    ctx.fillStyle = '#fbbf24'; ctx.fillText('■ observed', x + w - 150, y + h + 28);
    ctx.fillStyle = '#a855f7'; ctx.fillText(`— model (delay ${params.delay}s)`, x + w - 85, y + h + 28);
  }

  // Controls
  const nS = slider({ label: 'List length', min: 8, max: 20, step: 1, value: params.n,
    onInput: (v) => { params.n = v; } });
  const rateS = slider({ label: 'Seconds per word', min: 0.5, max: 3, step: 0.1, value: params.rate,
    format: (v) => v.toFixed(1), onInput: (v) => { params.rate = v; } });
  const delayS = slider({ label: 'Delay before recall (s)', min: 0, max: 30, step: 1, value: params.delay,
    onInput: (v) => { params.delay = v; } });
  ctrlPanel.append(nS.el, rateS.el, delayS.el);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'type a word + Enter';
  input.className = 'btn';
  input.disabled = true;
  input.setAttribute('aria-label', 'Recalled word');
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || state.phase !== 'recall') return;
    const w = input.value.trim().toLowerCase();
    if (state.words.includes(w)) state.recalled.add(w);
    input.value = '';
  });
  const startB = button({ label: 'Start list', primary: true, onClick: startList });
  const doneB = button({ label: 'Done recalling', onClick: finishRecall });
  const simB = button({ label: 'Simulate 20 trials', onClick: () => simulateTrials(20) });
  const clearB = button({ label: 'Clear data', onClick: () => { state.data = {}; } });
  ctrlPanel.append(row(startB, input, doneB), row(simB, clearB));

  const lab = labPanel({
    title: 'Serial position lab',
    filename: 'serial-position-lab.csv',
    columns: [
      { key: 'n',       label: 'list length' },
      { key: 'delay',   label: 'delay (s)' },
      { key: 'trials',  label: 'trials' },
      { key: 'primacy', label: 'primacy %', format: (v) => v.toFixed(0) },
      { key: 'middle',  label: 'middle %',  format: (v) => v.toFixed(0) },
      { key: 'recency', label: 'recency %', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'With delay = 0, run (or simulate) at least 5 lists, then record.',
      'Set delay = 20 s, clear data, run 5 more lists, record. Compare recency.',
      'Change list length to 20 and repeat. Which region changes most?',
    ],
    predict: 'Which words will you remember best: first, middle, or last? What will a 20 s delay do?',
    source: () => {
      const n = params.n;
      const b = state.data[n];
      return {
        n, delay: params.delay, trials: b ? b.trials : 0,
        primacy: regionPct(n, 0, 3), middle: regionPct(n, 3, n - 3), recency: regionPct(n, n - 3, n),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
