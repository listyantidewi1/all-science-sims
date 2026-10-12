import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const LETTERS = 'BCDFGHKL';
const CELLS = [0, 1, 2, 3, 5, 6, 7, 8];   // 3x3 grid cells used (center skipped)
const TARGET_RATE = 0.3;
const MODE_COLORS = { letters: '#0ea5e9', positions: '#fbbf24' };

/** Inverse of the standard normal CDF (Acklam's rational approximation). */
function zscore(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const tail = (q) => (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)));
  if (p > 0.97575) return -tail(Math.sqrt(-2 * Math.log(1 - p)));
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q
    / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { N: 2, mode: 'letters', pace: 2000, items: 20 };
  const state = {
    phase: 'idle',    // idle | running | done
    N: 2, mode: 'letters',   // locked at run start so slider changes mid-run are harmless
    seq: [], idx: 0, t0: 0,
    pressed: false,
    counts: { hits: 0, misses: 0, fa: 0, cr: 0 },
    lastMark: null,   // { ok, at } — feedback dot after each item is scored
    runs: [],         // { N, mode, items, hits, misses, fa, cr, acc, dPrime }
  };
  const now = () => performance.now();
  const isTarget = (i) => i >= state.N && state.seq[i] === state.seq[i - state.N];

  function startRun() {
    state.N = params.N;
    state.mode = params.mode;
    const total = params.items + state.N;
    const seq = [];
    for (let i = 0; i < total; i++) {
      let v;
      if (i >= state.N && Math.random() < TARGET_RATE) v = seq[i - state.N];
      else do { v = Math.floor(Math.random() * 8); } while (i >= state.N && v === seq[i - state.N]);
      seq.push(v);
    }
    state.seq = seq;
    state.idx = 0;
    state.t0 = now();
    state.pressed = false;
    state.counts = { hits: 0, misses: 0, fa: 0, cr: 0 };
    state.lastMark = null;
    state.phase = 'running';
  }

  function scoreItem(i) {
    const t = isTarget(i), p = state.pressed, c = state.counts;
    if (t && p) c.hits++; else if (t) c.misses++; else if (p) c.fa++; else c.cr++;
    state.lastMark = { ok: t === p, at: now() };
  }

  function finishRun() {
    const c = state.counts;
    const targets = c.hits + c.misses, nonTargets = c.fa + c.cr;
    const H = (c.hits + 0.5) / (targets + 1), FA = (c.fa + 0.5) / (nonTargets + 1);  // log-linear correction
    state.runs.push({ N: state.N, mode: state.mode, items: state.seq.length, ...c,
      acc: (c.hits + c.cr) / state.seq.length, dPrime: zscore(H) - zscore(FA) });
    state.phase = 'done';
  }

  function respond() {
    if (state.phase === 'running') state.pressed = true;
  }

  function step() {
    if (state.phase !== 'running') return;
    if (now() - state.t0 >= params.pace) {
      scoreItem(state.idx);
      state.idx++;
      state.pressed = false;
      state.t0 = now();
      if (state.idx >= state.seq.length) finishRun();
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawStimulus(ctx, 0, 0, W * 0.55, H);
    drawChart(ctx, W * 0.55 + 50, 40, W * 0.45 - 80, H * 0.5);
  }

  function drawStimulus(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2 + 10;
    const size = Math.min(w, h) * 0.56;
    const showing = state.phase === 'running' && now() - state.t0 < params.pace * 0.6;
    const v = state.seq[state.idx];
    ctx.lineWidth = 1.5;
    if (state.mode === 'positions') {
      const cell = size / 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const gx = cx - size / 2 + c * cell, gy = cy - size / 2 + r * cell;
        ctx.strokeStyle = 'rgba(148,163,184,0.5)';
        ctx.strokeRect(gx, gy, cell, cell);
        if (showing && CELLS[v] === r * 3 + c) {
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(gx + 6, gy + 6, cell - 12, cell - 12);
        }
      }
    } else {
      ctx.strokeStyle = 'rgba(148,163,184,0.5)';
      ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
      if (showing) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = `bold ${Math.round(size * 0.6)}px ui-monospace, Menlo, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(LETTERS[v], cx, cy);
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
      }
    }
    if (state.pressed) {
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - size / 2 - 8, cy - size / 2 - 8, size + 16, size + 16);
    }
    if (state.lastMark && now() - state.lastMark.at < 600) {
      ctx.fillStyle = state.lastMark.ok ? '#10b981' : '#ef4444';
      ctx.beginPath(); ctx.arc(cx + size / 2 + 22, cy - size / 2, 8, 0, Math.PI * 2); ctx.fill();
    }

    ctx.textAlign = 'center';
    if (state.phase === 'idle') {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText(`Press "Start run" for a ${params.N}-back with ${params.mode}`, cx, cy + size / 2 + 28);
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText('Space / M = match the item N steps back', cx, cy + size / 2 + 46);
    } else if (state.phase === 'done') {
      const r = state.runs[state.runs.length - 1];
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 15px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(`Run done — d′ = ${r.dPrime.toFixed(2)}, accuracy ${(r.acc * 100).toFixed(0)}%`, cx, cy + size / 2 + 28);
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(`hits ${r.hits}  misses ${r.misses}  false alarms ${r.fa}  correct rej. ${r.cr}`, cx, cy + size / 2 + 46);
    } else {
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
      const warm = state.idx < state.N ? '  (warm-up: nothing to match yet)' : '';
      ctx.fillText(`item ${state.idx + 1} of ${state.seq.length}${warm}`, cx, cy + size / 2 + 32);
    }
    ctx.textAlign = 'left';

    const c = state.counts;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 42);
    ctx.fillStyle = MODE_COLORS[state.mode];
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`${state.N}-back   ${state.mode}   ${params.pace} ms / item`, 16, 25);
    ctx.fillStyle = 'rgba(226,232,240,0.9)';
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`hits ${c.hits}   misses ${c.misses}   false alarms ${c.fa}   correct rej. ${c.cr}`, 16, 42);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Sensitivity d′ vs N (one dot per run)', x, y - 8);
    const yMin = -1, yMax = 4.5;
    const x2 = (n) => x + ((n - 0.5) / 4) * w;
    const y2 = (d) => y + h - ((d - yMin) / (yMax - yMin)) * h;
    ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
    for (let d = -1; d <= 4; d++) {
      ctx.strokeStyle = d === 0 ? 'rgba(226,232,240,0.5)' : 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(d)); ctx.lineTo(x + w, y2(d)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${d}`, x - 18, y2(d) + 3);
    }
    ctx.textAlign = 'center';
    for (let n = 1; n <= 4; n++) {
      ctx.fillStyle = 'rgba(226,232,240,0.9)';
      ctx.fillText(`N=${n}`, x2(n), y + h + 14);
      const rs = state.runs.filter((r) => r.N === n);
      if (rs.length > 1) {
        const m = rs.reduce((s, r) => s + r.dPrime, 0) / rs.length;
        ctx.strokeStyle = 'rgba(226,232,240,0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x2(n) - 14, y2(m)); ctx.lineTo(x2(n) + 14, y2(m)); ctx.stroke();
      }
    }
    ctx.textAlign = 'left';
    state.runs.forEach((r, i) => {
      const jitter = ((i * 7) % 11 - 5) * 1.5;
      ctx.fillStyle = MODE_COLORS[r.mode];
      ctx.beginPath(); ctx.arc(x2(r.N) + jitter, y2(Math.max(yMin, Math.min(yMax, r.dPrime))), 5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = MODE_COLORS.letters;
    ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('● letters', x, y + h + 32);
    ctx.fillStyle = MODE_COLORS.positions;
    ctx.fillText('● positions', x + 70, y + h + 32);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.fillText('d′ = z(hit rate) − z(false-alarm rate); 0 = guessing.', x, y + h + 48);
  }

  function onKey(e) {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key === ' ' && tag === 'BUTTON') return;  // let the focused button handle Space
    if (e.key === ' ' || e.key.toLowerCase() === 'm') { e.preventDefault(); respond(); }
  }
  window.addEventListener('keydown', onKey);

  // controls
  const nS = slider({ label: 'N (steps back)', min: 1, max: 4, step: 1, value: params.N, onInput: (v) => { params.N = v; } });
  const modeSel = select({
    label: 'Stimuli',
    options: [{ value: 'letters', label: 'Letters' }, { value: 'positions', label: 'Positions (3×3 grid)' }],
    value: params.mode,
    onChange: (v) => { params.mode = v; if (state.phase !== 'running') state.mode = v; },
  });
  const paceS = slider({ label: 'Pace (ms per item)', min: 1000, max: 3000, step: 250, value: params.pace,
    onInput: (v) => { params.pace = v; } });
  const itemsS = slider({ label: 'Items per run (after warm-up)', min: 10, max: 40, step: 5, value: params.items,
    onInput: (v) => { params.items = v; } });
  const startB = button({ label: 'Start run', primary: true, onClick: startRun });
  const matchB = button({ label: 'Match (Space)', onClick: respond });
  const resetB = button({ label: 'Reset runs', onClick: () => { state.runs = []; if (state.phase === 'done') state.phase = 'idle'; } });
  ctrlPanel.append(nS.el, modeSel.el, paceS.el, itemsS.el, row(startB, matchB, resetB));

  const lab = labPanel({
    title: 'N-back lab — capacity vs N',
    filename: 'n-back-lab.csv',
    columns: [
      { key: 'N',      label: 'N' },
      { key: 'mode',   label: 'stimuli' },
      { key: 'items',  label: 'items' },
      { key: 'hits',   label: 'hits' },
      { key: 'fa',     label: 'false alarms' },
      { key: 'acc',    label: 'accuracy (%)', format: (v) => v.toFixed(0) },
      { key: 'dPrime', label: 'd′',           format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Letters, 20 items, 2 s pace. Run N = 1 and record the finished run.',
      'Repeat for N = 2, 3, and 4 — record each run as soon as it ends.',
      'Plot d′ (y) vs N (x). Where does your curve bend downward?',
      'Switch to positions and repeat N = 2 and 3. Same capacity, or different?',
    ],
    predict: 'How many steps back can you track before d′ falls to about 1? Will positions and letters give the same N?',
    source: () => {
      const r = state.runs[state.runs.length - 1];
      if (!r) return null;
      return { N: r.N, mode: r.mode, items: r.items, hits: r.hits, fa: r.fa, acc: r.acc * 100, dPrime: r.dPrime };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { step(); draw(); });
  animator.start();
  return () => { animator.stop(); window.removeEventListener('keydown', onKey); cv.destroy(); };
}
