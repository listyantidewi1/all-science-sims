import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row, slider } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { mode: 'forward', flashMs: 800, gapMs: 200 };
  const state = {
    phase: 'idle',     // idle | showing | input | result
    seq: [],
    showIdx: 0,
    showStart: 0,
    typed: '',
    spanLen: 4,
    history: [],       // {len, mode, correct}
  };

  function startTrial() {
    state.seq = [];
    for (let i = 0; i < state.spanLen; i++) state.seq.push(Math.floor(Math.random() * 10));
    state.showIdx = 0;
    state.showStart = performance.now();
    state.typed = '';
    state.phase = 'showing';
  }

  function step() {
    if (state.phase === 'showing') {
      const elapsed = performance.now() - state.showStart;
      if (elapsed > params.flashMs + params.gapMs) {
        state.showIdx++;
        state.showStart = performance.now();
        if (state.showIdx >= state.seq.length) state.phase = 'input';
      }
    }
  }

  function submitInput() {
    const expected = params.mode === 'forward' ? state.seq.join('') : state.seq.slice().reverse().join('');
    const correct = state.typed === expected;
    state.history.push({ len: state.spanLen, mode: params.mode, correct });
    state.phase = 'result';
    if (correct && state.spanLen < 12) state.spanLen++;
    setTimeout(() => { state.phase = 'idle'; }, 1500);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    if (state.phase === 'idle') {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(`Click "Start trial" to see ${state.spanLen} digits`, W / 2, H / 2);
      ctx.textAlign = 'left';
    } else if (state.phase === 'showing') {
      const elapsed = performance.now() - state.showStart;
      if (elapsed < params.flashMs && state.showIdx < state.seq.length) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 200px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(state.seq[state.showIdx], W / 2, H / 2 + 60);
        ctx.textAlign = 'left';
      }
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '12px var(--font-mono)';
      ctx.fillText(`${state.showIdx + 1} of ${state.seq.length}`, W - 100, 30);
    } else if (state.phase === 'input') {
      ctx.fillStyle = '#fff';
      ctx.font = '18px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(params.mode === 'forward' ? 'Type the digits in order' : 'Type the digits in REVERSE order', W / 2, H * 0.35);
      ctx.font = 'bold 80px var(--font-mono)';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(state.typed || '_', W / 2, H * 0.6);
      ctx.font = '13px var(--font-sans)';
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.fillText('Press Enter to submit · Backspace to fix', W / 2, H * 0.75);
      ctx.textAlign = 'left';
    } else if (state.phase === 'result') {
      const last = state.history[state.history.length - 1];
      ctx.fillStyle = last.correct ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.fillRect(0, H * 0.4, W, H * 0.2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 36px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(last.correct ? '✓ Correct' : '✗ Wrong', W / 2, H * 0.5 + 12);
      ctx.font = '14px var(--font-mono)';
      ctx.fillText(`expected: ${params.mode === 'forward' ? state.seq.join('') : state.seq.slice().reverse().join('')}`, W / 2, H * 0.5 + 40);
      ctx.textAlign = 'left';
    }

    // Stats
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Span: ${state.spanLen} digits    Mode: ${params.mode}`, 16, 28);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    const correctTrials = state.history.filter((h) => h.correct).length;
    const maxSpan = state.history.filter((h) => h.correct).reduce((max, h) => Math.max(max, h.len), 0);
    ctx.fillText(`Correct: ${correctTrials} / ${state.history.length}    Max span achieved: ${maxSpan}`, 16, 48);
    ctx.fillText(`Miller's "7±2" — average adult forward span is 7`, 16, 64);
  }

  // Keyboard for input
  function onKey(e) {
    if (state.phase !== 'input') return;
    if (e.key >= '0' && e.key <= '9') {
      state.typed += e.key;
    } else if (e.key === 'Backspace') {
      state.typed = state.typed.slice(0, -1);
    } else if (e.key === 'Enter') {
      submitInput();
    }
  }
  window.addEventListener('keydown', onKey);

  // controls
  const modeSel = select({
    label: 'Mode',
    options: [
      { value: 'forward',  label: 'Forward' },
      { value: 'backward', label: 'Backward (reverse)' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; },
  });
  const spanS = slider({ label: 'Starting span', min: 3, max: 10, step: 1, value: state.spanLen,
    onInput: (v) => { state.spanLen = v; } });
  const flashS = slider({ label: 'Flash duration (ms)', min: 300, max: 1500, step: 50, value: params.flashMs,
    onInput: (v) => { params.flashMs = v; } });
  const startB = button({ label: 'Start trial', primary: true, onClick: startTrial });
  const submitB = button({ label: 'Submit (Enter)', onClick: submitInput });
  const resetB = button({ label: 'Reset', onClick: () => { state.history = []; state.spanLen = 4; state.phase = 'idle'; } });

  // 0–9 number pad
  const padRow = document.createElement('div');
  padRow.className = 'ctrl-row';
  for (let d = 0; d <= 9; d++) {
    const b = button({ label: String(d), onClick: () => {
      if (state.phase === 'input') state.typed += String(d);
    } });
    padRow.appendChild(b.el);
  }

  ctrlPanel.append(modeSel.el, spanS.el, flashS.el, padRow, row(startB, submitB, resetB));

  const animator = loop(() => { step(); draw(); });
  animator.start();
  return () => { animator.stop(); window.removeEventListener('keydown', onKey); cv.destroy(); };
}
