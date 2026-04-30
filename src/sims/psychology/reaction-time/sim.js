import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { mode: 'simple' };
  const state = {
    phase: 'idle',     // idle | waiting | go | result
    color: null,       // 'green' | 'red'
    showAt: 0,
    showedAt: 0,
    trials: [],
    lastResult: null,
  };

  function reset() { state.phase = 'idle'; state.color = null; state.lastResult = null; }
  function startTrial() {
    state.phase = 'waiting';
    state.lastResult = null;
    const wait = 800 + Math.random() * 2400;
    state.showAt = performance.now() + wait;
    if (params.mode === 'choice') state.color = Math.random() < 0.5 ? 'green' : 'red';
    else state.color = 'green';
  }

  function step() {
    if (state.phase === 'waiting' && performance.now() >= state.showAt) {
      state.phase = 'go';
      state.showedAt = performance.now();
    }
  }

  function click() {
    if (state.phase === 'idle' || state.phase === 'result') {
      startTrial();
    } else if (state.phase === 'waiting') {
      // false start
      state.lastResult = { ms: null, error: 'too early' };
      state.phase = 'result';
    } else if (state.phase === 'go') {
      const ms = performance.now() - state.showedAt;
      // Choice mode: only count green
      if (params.mode === 'choice' && state.color === 'red') {
        state.lastResult = { ms, error: 'should not react to red' };
      } else {
        state.lastResult = { ms };
        state.trials.push({ ms, color: state.color });
      }
      state.phase = 'result';
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    let bg = '#0b1220';
    if (state.phase === 'go') bg = state.color === 'green' ? '#10b981' : '#ef4444';
    else if (state.phase === 'waiting') bg = '#1e293b';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px var(--font-sans)';
    if (state.phase === 'idle') {
      ctx.fillText('Click anywhere to start', W / 2, H / 2);
    } else if (state.phase === 'waiting') {
      ctx.font = '18px var(--font-sans)';
      ctx.fillText('Wait for the flash…', W / 2, H / 2);
    } else if (state.phase === 'go') {
      if (params.mode === 'choice' && state.color === 'red') ctx.fillText('RED — do NOT click', W / 2, H / 2);
      else ctx.fillText('CLICK!', W / 2, H / 2);
    } else {
      const r = state.lastResult;
      if (r.error) {
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`✗ ${r.error}`, W / 2, H / 2 - 24);
      } else {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 56px var(--font-sans)';
        ctx.fillText(`${r.ms.toFixed(0)} ms`, W / 2, H / 2 - 24);
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '14px var(--font-sans)';
      ctx.fillText('Click to try again', W / 2, H / 2 + 30);
    }
    ctx.textAlign = 'left';

    // Stats
    if (state.trials.length > 0) {
      const ms = state.trials.map((t) => t.ms);
      const mean = ms.reduce((a, b) => a + b, 0) / ms.length;
      const sorted = [...ms].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(8, 8, 320, 80);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px var(--font-mono)';
      ctx.fillText(`Trials: ${state.trials.length}    mode: ${params.mode}`, 16, 28);
      ctx.font = '11px var(--font-mono)';
      ctx.fillText(`mean   = ${mean.toFixed(0)} ms`, 16, 46);
      ctx.fillText(`median = ${median.toFixed(0)} ms`, 16, 62);
      ctx.fillText(`fastest = ${sorted[0].toFixed(0)} ms    slowest = ${sorted[sorted.length - 1].toFixed(0)} ms`, 16, 78);

      // Histogram
      const padX = 30, hY = H - 90, hW = W - padX * 2, hH = 60;
      ctx.strokeStyle = 'rgba(120,130,150,0.4)';
      ctx.strokeRect(padX, hY, hW, hH);
      const max = Math.max(700, sorted[sorted.length - 1]);
      const min = Math.min(150, sorted[0]);
      const bins = 30;
      const counts = new Array(bins).fill(0);
      for (const m of ms) {
        const b = Math.floor((m - min) / (max - min) * bins);
        if (b >= 0 && b < bins) counts[b]++;
      }
      const peak = Math.max(...counts);
      for (let i = 0; i < bins; i++) {
        const bw = hW / bins;
        const bh = (counts[i] / Math.max(1, peak)) * (hH - 4);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(padX + i * bw + 1, hY + hH - bh - 2, bw - 2, bh);
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${min.toFixed(0)} ms`, padX, hY + hH + 14);
      ctx.fillText(`${max.toFixed(0)} ms`, padX + hW - 60, hY + hH + 14);
      ctx.fillText('reaction time distribution', padX, hY - 4);
    }
  }

  cv.canvas.addEventListener('click', click);

  // controls
  const modeSel = select({
    label: 'Mode',
    options: [
      { value: 'simple', label: 'Simple (any stimulus)' },
      { value: 'choice', label: 'Choice (only green)' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; state.trials = []; reset(); },
  });
  const resetB = button({ label: 'Reset trials', primary: true, onClick: () => { state.trials = []; reset(); } });
  ctrlPanel.append(modeSel.el, row(resetB));

  const animator = loop(() => { step(); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
