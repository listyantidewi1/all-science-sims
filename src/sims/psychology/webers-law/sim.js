import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const STANDARDS = [40, 80, 120, 160]; // standard intensities (arbitrary units)

function gauss() {
  const u = 1 - Math.random(), v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { stimulus: 'line', kTrue: 0.1 };
  const state = { stairs: [], cur: 0, compLeft: true, jitter: [0, 0], feedback: null, feedbackT: 0, trials: 0 };

  function resetStairs() {
    state.stairs = STANDARDS.map((I) => ({ I, delta: 0.3 * I, run: 0, lastDir: 0, reversals: [], trials: 0 }));
    state.trials = 0;
    newTrial();
  }

  // Interleaved staircases: always test the standard with the fewest reversals.
  function newTrial() {
    const min = Math.min(...state.stairs.map((s) => s.reversals.length));
    const cands = state.stairs.map((s, i) => i).filter((i) => state.stairs[i].reversals.length === min);
    state.cur = cands[Math.floor(Math.random() * cands.length)];
    state.compLeft = Math.random() < 0.5;
    state.jitter = [(Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3];
  }

  // 1-up / 2-down staircase: converges on ~71% correct.
  function respond(answer) {
    const s = state.stairs[state.cur];
    const correct = answer !== 'same' && (answer === 'left') === state.compLeft;
    let dir = 0;
    if (correct) {
      s.run++;
      if (s.run >= 2) { dir = -1; s.run = 0; }
    } else { dir = 1; s.run = 0; }
    if (dir !== 0) {
      if (s.lastDir !== 0 && dir !== s.lastDir) s.reversals.push(s.delta);
      s.lastDir = dir;
      s.delta = Math.min(0.8 * s.I, Math.max(0.005 * s.I, s.delta * (dir < 0 ? 0.8 : 1.25)));
    }
    s.trials++;
    state.trials++;
    state.feedback = correct ? 'correct' : 'wrong';
    state.feedbackT = 0.6;
    newTrial();
  }

  function simulateOne() {
    const s = state.stairs[state.cur];
    const sigma = 1.3 * params.kTrue * s.I;
    const left = (state.compLeft ? s.I + s.delta : s.I) + sigma * gauss();
    const right = (state.compLeft ? s.I : s.I + s.delta) + sigma * gauss();
    const d = left - right;
    respond(Math.abs(d) < 0.15 * sigma ? 'same' : (d > 0 ? 'left' : 'right'));
  }

  const jnd = (s) => {
    if (s.reversals.length < 2) return null;
    const last = s.reversals.slice(-6);
    return last.reduce((a, b) => a + b, 0) / last.length;
  };
  function weberFit() {
    let num = 0, den = 0;
    for (const s of state.stairs) { const j = jnd(s); if (j != null) { num += j * s.I; den += s.I * s.I; } }
    return den > 0 ? num / den : null;
  }

  function draw(dt) {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    state.feedbackT = Math.max(0, state.feedbackT - dt);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    drawStimuli(ctx, 0, 0, W * 0.55, H);
    drawChart(ctx, W * 0.55 + 50, 40, W * 0.45 - 80, H - 100);
  }

  function drawStimuli(ctx, x, y, w, h) {
    const s = state.stairs[state.cur];
    const leftI = state.compLeft ? s.I + s.delta : s.I;
    const rightI = state.compLeft ? s.I : s.I + s.delta;
    const cy = y + h * 0.5;
    const centers = [x + w * 0.27, x + w * 0.73];
    [leftI, rightI].forEach((I, i) => {
      const cx = centers[i], yy = cy + state.jitter[i] * h * 0.3;
      ctx.strokeStyle = '#fff';
      ctx.fillStyle = '#fff';
      if (params.stimulus === 'line') {
        const len = I * (w * 0.4 / 200);
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx - len / 2, yy); ctx.lineTo(cx + len / 2, yy); ctx.stroke();
        ctx.lineWidth = 1;
      } else {
        const r = Math.sqrt(I / 200) * h * 0.2;
        ctx.beginPath(); ctx.arc(cx, yy, r, 0, Math.PI * 2); ctx.fill();
      }
    });
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(params.stimulus === 'line' ? 'Which line is longer?' : 'Which circle is larger?', x + w / 2, y + 84);
    ctx.font = '12px ui-monospace, monospace';
    ctx.fillText('LEFT', centers[0], y + h - 24);
    ctx.fillText('RIGHT', centers[1], y + h - 24);
    if (state.feedbackT > 0) {
      ctx.fillStyle = state.feedback === 'correct' ? '#10b981' : '#ef4444';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.fillText(state.feedback === 'correct' ? '✓' : '✗', x + w / 2, cy + 8);
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, 230, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px ui-monospace, monospace';
    ctx.fillText(`trial ${state.trials + 1}   standard I = ${s.I}`, x + 16, y + 26);
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`current ΔI = ${s.delta.toFixed(1)}   reversals: ${s.reversals.length}`, x + 16, y + 46);
  }

  function drawChart(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('JND (ΔI) vs standard intensity (I)', x, y - 8);
    const Imax = 200, Jmax = 60;
    const x2 = (I) => x + (I / Imax) * w;
    const y2 = (J) => y + h - (J / Jmax) * (h - 10);
    ctx.font = '10px ui-monospace, monospace';
    for (let I = 0; I <= Imax; I += 40) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x2(I), y); ctx.lineTo(x2(I), y + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(String(I), x2(I) - 8, y + h + 14);
    }
    for (let J = 0; J <= Jmax; J += 20) {
      ctx.strokeStyle = 'rgba(120,130,150,0.15)';
      ctx.beginPath(); ctx.moveTo(x, y2(J)); ctx.lineTo(x + w, y2(J)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(String(J), x - 24, y2(J) + 3);
    }
    const k = weberFit();
    if (k != null) {
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x2(0), y2(0)); ctx.lineTo(x2(Imax), y2(Math.min(Jmax, k * Imax))); ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = '#0ea5e9';
      ctx.font = 'bold 12px ui-monospace, monospace';
      ctx.fillText(`ΔI = ${k.toFixed(3)} · I   (Weber fraction k)`, x + 8, y + 16);
    }
    for (const s of state.stairs) {
      const j = jnd(s);
      const active = s === state.stairs[state.cur];
      if (j == null) {
        ctx.strokeStyle = active ? '#fbbf24' : 'rgba(251,191,36,0.4)';
        ctx.beginPath(); ctx.arc(x2(s.I), y2(Math.min(Jmax, s.delta)), 5, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(x2(s.I), y2(Math.min(Jmax, j)), active ? 7 : 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '10px ui-monospace, monospace';
        ctx.fillText(`${(j / s.I).toFixed(2)}`, x2(s.I) + 9, y2(Math.min(Jmax, j)) - 4);
      }
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('○ not yet converged   ● JND estimate (label = ΔI/I)', x, y + h + 30);
  }

  // Controls
  const leftB = button({ label: '◀ Left bigger', primary: true, onClick: () => respond('left') });
  const sameB = button({ label: 'Same', onClick: () => respond('same') });
  const rightB = button({ label: 'Right bigger ▶', primary: true, onClick: () => respond('right') });
  const stimSel = select({
    label: 'Stimulus',
    options: [{ value: 'line', label: 'Line length' }, { value: 'circle', label: 'Circle area' }],
    value: params.stimulus,
    onChange: (v) => { params.stimulus = v; resetStairs(); },
  });
  const kS = slider({ label: 'Simulated observer k', min: 0.03, max: 0.3, step: 0.01, value: params.kTrue,
    format: (v) => v.toFixed(2), onInput: (v) => { params.kTrue = v; } });
  const simB = button({ label: 'Auto-answer 20 trials', onClick: () => { for (let i = 0; i < 20; i++) simulateOne(); } });
  const resetB = button({ label: 'Reset', onClick: resetStairs });
  ctrlPanel.append(row(leftB, sameB, rightB), stimSel.el, kS.el, row(simB, resetB));

  const lab = labPanel({
    title: "Weber's law lab",
    filename: 'webers-law-lab.csv',
    columns: [
      { key: 'stimulus', label: 'stimulus' },
      { key: 'I',        label: 'standard I' },
      { key: 'jnd',      label: 'JND (ΔI)',  format: (v) => v.toFixed(1) },
      { key: 'weber',    label: 'ΔI / I',    format: (v) => v.toFixed(3) },
      { key: 'kFit',     label: 'fitted k',  format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Answer trials until every standard shows a filled dot (≥ 2 reversals).',
      'Record once while each standard is current (the header shows the standard I).',
      'Switch to circles, reset, and repeat. Compare the two fitted k values.',
    ],
    predict: 'If the JND at I = 40 is 4 units, what will it be at I = 160?',
    source: () => {
      const s = state.stairs[state.cur];
      const j = jnd(s);
      return { stimulus: params.stimulus, I: s.I, jnd: j, weber: j != null ? j / s.I : null, kFit: weberFit() };
    },
  });
  ctrlPanel.appendChild(lab.el);

  resetStairs();
  const animator = loop((dt) => draw(dt));
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
