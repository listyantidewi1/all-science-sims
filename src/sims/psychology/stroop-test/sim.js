import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

const COLORS = [
  { name: 'RED',    hex: '#ef4444' },
  { name: 'BLUE',   hex: '#0ea5e9' },
  { name: 'GREEN',  hex: '#10b981' },
  { name: 'YELLOW', hex: '#fbbf24' },
  { name: 'PURPLE', hex: '#a855f7' },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { mode: 'incongruent' }; // congruent | incongruent | mixed
  const state = {
    word: null,         // current word (color name) and ink color
    inkColor: null,
    startTime: 0,
    trials: [],         // {congruent, ms}
  };

  function nextTrial() {
    const word = COLORS[Math.floor(Math.random() * COLORS.length)];
    let ink;
    if (params.mode === 'congruent') ink = word;
    else if (params.mode === 'incongruent') {
      do { ink = COLORS[Math.floor(Math.random() * COLORS.length)]; } while (ink === word);
    } else {
      ink = Math.random() < 0.5 ? word : COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    state.word = word;
    state.inkColor = ink;
    state.startTime = performance.now();
  }
  nextTrial();

  function answer(idx) {
    if (state.inkColor === null) return;
    const correct = COLORS[idx] === state.inkColor;
    const ms = performance.now() - state.startTime;
    if (correct) {
      state.trials.push({ congruent: state.word === state.inkColor, ms });
      nextTrial();
    } else {
      // wrong — flash but don't reset timer; just push a "wrong" entry
      state.trials.push({ congruent: state.word === state.inkColor, ms, wrong: true });
      nextTrial();
    }
  }

  function stats() {
    const cong = state.trials.filter((t) => t.congruent && !t.wrong).map((t) => t.ms);
    const incong = state.trials.filter((t) => !t.congruent && !t.wrong).map((t) => t.ms);
    const avg = (a) => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
    return { congN: cong.length, incongN: incong.length, congAvg: avg(cong), incongAvg: avg(incong) };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Big word
    if (state.word) {
      ctx.fillStyle = state.inkColor.hex;
      ctx.font = 'bold 90px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText(state.word.name, W / 2, H * 0.42);
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '13px var(--font-sans)';
      ctx.textAlign = 'center';
      ctx.fillText('Click the button matching the INK color (not the word)', W / 2, H * 0.55);
      ctx.textAlign = 'left';
    }

    // Stats
    const s = stats();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Trials: ${state.trials.length}    mode: ${params.mode}`, 16, 28);
    ctx.font = '11px var(--font-mono)';
    if (s.congN >= 3) {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Congruent  avg: ${s.congAvg.toFixed(0)} ms (n=${s.congN})`, 16, 48);
    }
    if (s.incongN >= 3) {
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Incongruent avg: ${s.incongAvg.toFixed(0)} ms (n=${s.incongN})`, 16, 64);
    }
    if (s.congN >= 3 && s.incongN >= 3) {
      const slow = ((s.incongAvg - s.congAvg) / s.congAvg) * 100;
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`Stroop interference: +${slow.toFixed(1)}%`, 200, 64);
    }
  }

  // controls — color buttons
  const buttonRow = document.createElement('div');
  buttonRow.className = 'ctrl-row';
  for (let i = 0; i < COLORS.length; i++) {
    const c = COLORS[i];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn';
    b.textContent = c.name;
    b.style.background = c.hex;
    b.style.color = 'white';
    b.style.border = 'none';
    b.style.minWidth = '90px';
    b.addEventListener('click', () => answer(i));
    buttonRow.appendChild(b);
  }
  ctrlPanel.appendChild(buttonRow);

  const modeSel = select({
    label: 'Mode',
    options: [
      { value: 'incongruent', label: 'Incongruent (ink ≠ word)' },
      { value: 'congruent',   label: 'Congruent (ink = word)' },
      { value: 'mixed',       label: 'Mixed (random)' },
    ],
    value: params.mode,
    onChange: (v) => { params.mode = v; },
  });
  const resetB = button({ label: 'Reset trials', primary: true, onClick: () => { state.trials = []; } });
  ctrlPanel.append(modeSel.el, row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
