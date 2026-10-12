import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const FIX_MS = 500;
const TIMEOUT_MS = 2000;
const FEEDBACK_MS = 600;
const CONDS = ['congruent', 'neutral', 'incongruent'];
const COLORS = { congruent: '#10b981', neutral: '#0ea5e9', incongruent: '#ef4444' };
const SHORT = { congruent: 'cong', neutral: 'neut', incongruent: 'incong' };

function drawArrow(ctx, x, y, dir, size, color) {
  const s = dir === 0 ? -1 : 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(3, size * 0.16);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x - s * size / 2, y); ctx.lineTo(x + s * size / 2, y);
  ctx.moveTo(x + s * size * 0.1, y - size * 0.38);
  ctx.lineTo(x + s * size / 2, y);
  ctx.lineTo(x + s * size * 0.1, y + size * 0.38);
  ctx.stroke();
}

function drawBar(ctx, x, y, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(3, size * 0.16);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - size / 2, y); ctx.lineTo(x + size / 2, y);
  ctx.stroke();
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { spacing: 40, pCong: 50, auto: false };
  const emptyStats = () => Object.fromEntries(CONDS.map((k) => [k, { n: 0, sum: 0, err: 0 }]));
  const state = {
    running: false,
    phase: 'idle',   // idle | fixation | stimulus | feedback
    t0: 0,
    dir: 0,          // direction of the central arrow: 0 left, 1 right
    cond: 'congruent',
    simRT: 0,
    simErr: 0,
    last: null,
    stats: emptyStats(),
  };
  const now = () => performance.now();
  const meanRT = (s) => (s.n - s.err > 0 ? s.sum / (s.n - s.err) : null);
  const errRate = (s) => (s.n > 0 ? (100 * s.err) / s.n : null);

  function newTrial() {
    state.dir = Math.random() < 0.5 ? 0 : 1;
    if (Math.random() < 0.2) state.cond = 'neutral';
    else state.cond = Math.random() * 100 < params.pCong ? 'congruent' : 'incongruent';
    // Simulated participant: flanker interference decays with distance from
    // the target (the attentional "spotlight" has a finite width).
    const interference = Math.exp(-(params.spacing - 20) / 50);
    const cost = state.cond === 'incongruent' ? 90 * interference : state.cond === 'neutral' ? 10 : 0;
    state.simRT = 380 + cost + (Math.random() - 0.5) * 70;
    state.simErr = state.cond === 'incongruent' ? 0.04 + 0.22 * interference : 0.03;
    state.phase = 'fixation';
    state.t0 = now();
  }

  function respond(d) {
    if (state.phase !== 'stimulus') return;
    const rt = now() - state.t0;
    const correct = d === state.dir;
    const s = state.stats[state.cond];
    s.n++;
    if (correct) s.sum += rt; else s.err++;
    state.last = { rt, correct };
    state.phase = 'feedback';
    state.t0 = now();
  }

  function step() {
    const t = now() - state.t0;
    if (state.phase === 'fixation' && t >= FIX_MS) { state.phase = 'stimulus'; state.t0 = now(); }
    else if (state.phase === 'stimulus') {
      if (params.auto && t >= state.simRT) respond(Math.random() < state.simErr ? 1 - state.dir : state.dir);
      else if (t >= TIMEOUT_MS) respond(-1);
    } else if (state.phase === 'feedback' && t >= FEEDBACK_MS) {
      if (state.running) newTrial(); else state.phase = 'idle';
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const pw = W * 0.55;
    drawTask(ctx, 0, 0, pw, H);
    const rx = pw + 40, rw = W - pw - 60;
    const rts = CONDS.map((k) => meanRT(state.stats[k]));
    const errs = CONDS.map((k) => errRate(state.stats[k]));
    const rtMax = Math.max(500, ...rts.filter((v) => v != null).map((v) => v * 1.25));
    const errMax = Math.max(20, ...errs.filter((v) => v != null).map((v) => v * 1.25));
    bars(ctx, rx, 36, rw, H * 0.34, 'Mean RT (ms, correct trials)', rts, '', rtMax);
    bars(ctx, rx, H * 0.56, rw, H * 0.22, 'Error rate (%)', errs, '%', errMax);
    const eff = rts[0] != null && rts[2] != null ? rts[2] - rts[0] : null;
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Congruency effect (incong − cong): ${eff != null ? eff.toFixed(0) + ' ms' : '–'}`, rx, H * 0.78 + 36);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Wider spacing pushes flankers out of the attentional spotlight.', rx, H * 0.78 + 52);
  }

  function drawTask(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    const size = Math.min(w, h) * 0.11;
    const gap = Math.max(size * 1.05, params.spacing * (w / 600));
    if (state.phase === 'fixation' || state.phase === 'idle') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 10);
      ctx.stroke();
    } else if (state.phase === 'stimulus') {
      for (let i = -2; i <= 2; i++) {
        const px = cx + i * gap;
        if (i === 0) drawArrow(ctx, px, cy, state.dir, size, '#fbbf24');
        else if (state.cond === 'neutral') drawBar(ctx, px, cy, size, '#e2e8f0');
        else drawArrow(ctx, px, cy, state.cond === 'congruent' ? state.dir : 1 - state.dir, size, '#e2e8f0');
      }
    }
    ctx.textAlign = 'center';
    if (state.phase === 'idle') {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText('Press "Start block"', cx, cy + 50);
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText('Report the CENTER arrow:  F / ← = left,  J / → = right', cx, cy + 70);
    } else if (state.phase === 'feedback' && state.last) {
      ctx.fillStyle = state.last.correct ? '#10b981' : '#ef4444';
      ctx.font = 'bold 22px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(state.last.correct ? `${state.last.rt.toFixed(0)} ms` : 'error', cx, cy + 8);
      ctx.fillStyle = COLORS[state.cond];
      ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(state.cond, cx, cy + 28);
    }
    ctx.textAlign = 'left';

    const total = CONDS.reduce((n, k) => n + state.stats[k].n, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 300, 42);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`spacing ${params.spacing}   ${params.pCong}% congruent   trials ${total}`, 16, 25);
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(params.auto ? 'simulated participant is responding' : 'ignore the flankers, answer the middle arrow', 16, 42);
  }

  function bars(ctx, x, y, w, h, title, values, unit, yMax) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(title, x, y - 8);
    const y2 = (v) => y + h - (v / yMax) * (h - 18);
    const bw = w / 3;
    ctx.textAlign = 'center';
    CONDS.forEach((k, i) => {
      const v = values[i];
      const bx = x + bw * (i + 0.15);
      ctx.fillStyle = COLORS[k];
      if (v != null) ctx.fillRect(bx, y2(v), bw * 0.7, y + h - y2(v));
      ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(v != null ? `${v.toFixed(0)}${unit}` : '–', bx + bw * 0.35, (v != null ? y2(v) : y + h) - 5);
      ctx.fillStyle = 'rgba(226,232,240,0.9)';
      ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText(`${SHORT[k]} (n=${state.stats[k].n})`, bx + bw * 0.35, y + h + 13);
    });
    ctx.textAlign = 'left';
  }

  function onKey(e) {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const k = e.key.toLowerCase();
    if (k === 'f' || k === 'arrowleft') { e.preventDefault(); respond(0); }
    else if (k === 'j' || k === 'arrowright') { e.preventDefault(); respond(1); }
  }
  window.addEventListener('keydown', onKey);

  // controls
  const startB = button({ label: 'Start block', primary: true, onClick: () => {
    state.running = !state.running;
    startB.label = state.running ? 'Stop block' : 'Start block';
    if (state.running && state.phase === 'idle') newTrial();
  } });
  const leftB = button({ label: '◀ Left (F)', onClick: () => respond(0) });
  const rightB = button({ label: 'Right (J) ▶', onClick: () => respond(1) });
  const spS = slider({ label: 'Flanker spacing (px)', min: 20, max: 120, step: 5, value: params.spacing,
    onInput: (v) => { params.spacing = v; } });
  const pcS = slider({ label: 'Proportion congruent (%)', min: 0, max: 100, step: 10, value: params.pCong, format: (v) => `${v}%`,
    onInput: (v) => { params.pCong = v; } });
  const autoT = toggle({ label: 'Simulated participant (auto-respond)', value: params.auto, onChange: (v) => { params.auto = v; } });
  const resetB = button({ label: 'Reset stats', onClick: () => { state.stats = emptyStats(); state.last = null; } });
  ctrlPanel.append(row(startB, leftB, rightB), spS.el, pcS.el, row(autoT, resetB));

  const lab = labPanel({
    title: 'Flanker lab — congruency effect vs spacing',
    filename: 'flanker-task-lab.csv',
    columns: [
      { key: 'spacing',  label: 'spacing (px)' },
      { key: 'pCong',    label: '% congruent' },
      { key: 'rtCong',   label: 'RT cong (ms)',   format: (v) => v.toFixed(0) },
      { key: 'rtIncong', label: 'RT incong (ms)', format: (v) => v.toFixed(0) },
      { key: 'effect',   label: 'effect (ms)',    format: (v) => v.toFixed(0) },
      { key: 'errIncong', label: 'err incong (%)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Spacing 20 px, 50% congruent. Run about 40 trials, then record.',
      'Reset stats. Repeat at spacing 60 px and 120 px; record each.',
      'Plot effect (y) vs spacing (x). Does interference fall off with distance?',
      'Reset stats. At spacing 40 px try 20% then 80% congruent. How does expectation change the effect?',
    ],
    predict: 'Will incongruent flankers slow you more when they sit closer to the target? What should happen to the error rate?',
    source: () => {
      const c = meanRT(state.stats.congruent), inc = meanRT(state.stats.incongruent);
      return { spacing: params.spacing, pCong: params.pCong, rtCong: c, rtIncong: inc,
        effect: c != null && inc != null ? inc - c : null, errIncong: errRate(state.stats.incongruent) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { step(); draw(); });
  animator.start();
  return () => { animator.stop(); window.removeEventListener('keydown', onKey); cv.destroy(); };
}
