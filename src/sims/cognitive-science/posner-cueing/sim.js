import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const FIX_MS = 500;       // fixation before the cue
const CUE_MS = 100;       // how long the cued box stays bright
const TIMEOUT_MS = 2000;  // no response -> counted as an error
const FEEDBACK_MS = 700;
const TYPES = ['valid', 'neutral', 'invalid'];
const COLORS = { valid: '#10b981', neutral: '#0ea5e9', invalid: '#ef4444' };

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { soa: 300, validity: 80, auto: false };
  const emptyStats = () => Object.fromEntries(TYPES.map((k) => [k, { n: 0, sum: 0, err: 0 }]));
  const state = {
    running: false,
    phase: 'idle',    // idle | fixation | cue | target | feedback
    t0: 0,            // when the current phase began
    cueSide: -1,      // 0 left, 1 right, -1 both boxes (neutral)
    targetSide: 0,
    type: 'valid',
    simRT: 0,
    last: null,       // { rt, correct }
    stats: emptyStats(),
  };
  const now = () => performance.now();
  const meanRT = (s) => (s.n - s.err > 0 ? s.sum / (s.n - s.err) : null);

  function newTrial() {
    state.targetSide = Math.random() < 0.5 ? 0 : 1;
    if (Math.random() < 0.2) { state.type = 'neutral'; state.cueSide = -1; }
    else if (Math.random() * 100 < params.validity) { state.type = 'valid'; state.cueSide = state.targetSide; }
    else { state.type = 'invalid'; state.cueSide = 1 - state.targetSide; }
    // Simulated participant: attention needs ~250 ms to settle on the cued
    // box; a valid cue then saves time, an invalid cue costs a reorienting.
    const shift = Math.min(1, params.soa / 250);
    const offset = { valid: -25, neutral: 0, invalid: 35 }[state.type] * shift;
    state.simRT = 340 + offset + (Math.random() - 0.5) * 60;
    state.phase = 'fixation';
    state.t0 = now();
  }

  function respond(side) {
    if (state.phase !== 'target') return;
    const rt = now() - state.t0;
    const correct = side === state.targetSide;
    const s = state.stats[state.type];
    s.n++;
    if (correct) s.sum += rt; else s.err++;
    state.last = { rt, correct };
    state.phase = 'feedback';
    state.t0 = now();
  }

  function step() {
    const t = now() - state.t0;
    if (state.phase === 'fixation' && t >= FIX_MS) { state.phase = 'cue'; state.t0 = now(); }
    else if (state.phase === 'cue' && t >= params.soa) { state.phase = 'target'; state.t0 = now(); }
    else if (state.phase === 'target') {
      if (params.auto && t >= state.simRT) respond(Math.random() < 0.04 ? 1 - state.targetSide : state.targetSide);
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
    const pw = W * 0.58;
    drawTask(ctx, 0, 0, pw, H);
    drawChart(ctx, pw + 40, 40, W - pw - 60, H - 120);
  }

  function drawTask(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    const box = Math.min(w, h) * 0.24;
    const off = w * 0.27;
    const cueOn = state.phase === 'cue' && now() - state.t0 < CUE_MS;
    for (let side = 0; side < 2; side++) {
      const bx = cx + (side === 0 ? -off : off);
      const lit = cueOn && (state.cueSide === side || state.cueSide === -1);
      ctx.strokeStyle = lit ? '#ffffff' : 'rgba(148,163,184,0.6)';
      ctx.lineWidth = lit ? 5 : 2;
      ctx.strokeRect(bx - box / 2, cy - box / 2, box, box);
      if (state.phase === 'target' && state.targetSide === side) {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(bx, cy, box * 0.22, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy);
    ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 10);
    ctx.stroke();

    ctx.textAlign = 'center';
    if (state.phase === 'idle') {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText('Press "Start block"', cx, cy + box * 0.5 + 34);
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.font = '12px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText('F / ←  = left box,   J / →  = right box', cx, cy + box * 0.5 + 54);
    } else if (state.phase === 'feedback' && state.last) {
      ctx.fillStyle = state.last.correct ? '#10b981' : '#ef4444';
      ctx.font = 'bold 22px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(state.last.correct ? `${state.last.rt.toFixed(0)} ms` : 'error', cx, cy + box * 0.5 + 38);
      ctx.fillStyle = COLORS[state.type];
      ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(`${state.type} cue`, cx, cy + box * 0.5 + 56);
    }
    ctx.textAlign = 'left';

    const total = TYPES.reduce((n, k) => n + state.stats[k].n, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 310, 42);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`SOA ${params.soa} ms   validity ${params.validity}%   trials ${total}`, 16, 25);
    ctx.fillStyle = 'rgba(148,163,184,0.9)';
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(params.auto ? 'simulated participant is responding' : 'respond when the yellow dot appears', 16, 42);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Mean RT by cue type (correct trials)', x, y - 8);
    const means = TYPES.map((k) => meanRT(state.stats[k]));
    const yMax = Math.max(500, ...means.filter((m) => m != null).map((m) => m * 1.25));
    const y2 = (v) => y + h - (v / yMax) * (h - 20);
    ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
    for (let v = 0; v <= yMax; v += 100) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(v)); ctx.lineTo(x + w, y2(v)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${v}`, x - 30, y2(v) + 3);
    }
    const bw = w / 4;
    ctx.textAlign = 'center';
    TYPES.forEach((k, i) => {
      const bx = x + bw * (i + 0.6);
      const m = means[i];
      ctx.fillStyle = COLORS[k];
      if (m != null) ctx.fillRect(bx, y2(m), bw * 0.8, y + h - y2(m));
      ctx.font = 'bold 11px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(m != null ? m.toFixed(0) : '–', bx + bw * 0.4, (m != null ? y2(m) : y + h) - 6);
      ctx.fillStyle = 'rgba(226,232,240,0.9)';
      ctx.font = '11px system-ui, -apple-system, Roboto, sans-serif';
      ctx.fillText(`${k} (n=${state.stats[k].n})`, bx + bw * 0.4, y + h + 14);
    });
    ctx.textAlign = 'left';
    const eff = means[0] != null && means[2] != null ? means[2] - means[0] : null;
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Validity effect (invalid − valid): ${eff != null ? eff.toFixed(0) + ' ms' : '–'}`, x, y + h + 38);
    ctx.fillStyle = 'rgba(148,163,184,0.85)';
    ctx.font = '10px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText('Attention moves to the cued box before the target appears.', x, y + h + 54);
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
  const soaS = slider({ label: 'Cue–target interval SOA (ms)', min: 50, max: 1000, step: 50, value: params.soa,
    onInput: (v) => { params.soa = v; } });
  const valS = slider({ label: 'Cue validity (%)', min: 50, max: 100, step: 5, value: params.validity, format: (v) => `${v}%`,
    onInput: (v) => { params.validity = v; } });
  const autoT = toggle({ label: 'Simulated participant (auto-respond)', value: params.auto, onChange: (v) => { params.auto = v; } });
  const resetB = button({ label: 'Reset stats', onClick: () => { state.stats = emptyStats(); state.last = null; } });
  ctrlPanel.append(row(startB, leftB, rightB), soaS.el, valS.el, row(autoT, resetB));

  const lab = labPanel({
    title: 'Posner cueing lab — validity effect vs SOA',
    filename: 'posner-cueing-lab.csv',
    columns: [
      { key: 'soa',       label: 'SOA (ms)' },
      { key: 'validity',  label: 'validity (%)' },
      { key: 'rtValid',   label: 'RT valid (ms)',   format: (v) => v.toFixed(0) },
      { key: 'rtInvalid', label: 'RT invalid (ms)', format: (v) => v.toFixed(0) },
      { key: 'rtNeutral', label: 'RT neutral (ms)', format: (v) => v.toFixed(0) },
      { key: 'effect',    label: 'effect (ms)',     format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Set SOA = 300 ms, validity = 80%. Run a block of about 40 trials, then record.',
      'Reset stats. Repeat at SOA = 100 ms and SOA = 1000 ms; record each.',
      'Reset stats. Set validity = 50% at SOA = 300 ms and record. Is the effect smaller?',
      'Plot effect (y) vs SOA (x). Where does attention give the largest benefit?',
    ],
    predict: 'Will an uninformative (50%) cue still produce a validity effect? How should the effect depend on SOA?',
    source: () => {
      const v = meanRT(state.stats.valid), inv = meanRT(state.stats.invalid), neu = meanRT(state.stats.neutral);
      return { soa: params.soa, validity: params.validity, rtValid: v, rtInvalid: inv, rtNeutral: neu,
        effect: v != null && inv != null ? inv - v : null };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { step(); draw(); });
  animator.start();
  return () => { animator.stop(); window.removeEventListener('keydown', onKey); cv.destroy(); };
}
