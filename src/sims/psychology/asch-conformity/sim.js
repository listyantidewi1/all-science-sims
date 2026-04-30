import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    confederates: 5,
    ally: false,
  };
  const state = {
    target: 'B',          // correct answer
    confedAnswer: 'C',     // they say
    yourAnswer: null,
    trials: [],
    seq: 0,
  };

  function newTrial() {
    state.target = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
    // confederates pick a wrong answer (consensus on a single wrong choice)
    const others = ['A', 'B', 'C'].filter((x) => x !== state.target);
    state.confedAnswer = others[Math.floor(Math.random() * 2)];
    state.yourAnswer = null;
    state.seq++;
  }
  newTrial();

  function answer(letter) {
    if (state.yourAnswer != null) return;
    state.yourAnswer = letter;
    const conformed = letter === state.confedAnswer && letter !== state.target;
    const correct = letter === state.target;
    state.trials.push({ correct, conformed, confeds: params.confederates, ally: params.ally });
    setTimeout(newTrial, 1500);
  }

  function lineLengths() {
    // A, B, C — only one matches the target
    const target = 200;
    const lengths = { A: 130, B: target, C: 240 };
    return { target, lengths };
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const { target, lengths } = lineLengths();

    // Target line — top
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 6;
    const cx = W / 2, ty = 100;
    ctx.beginPath();
    ctx.moveTo(cx - target / 2, ty); ctx.lineTo(cx + target / 2, ty);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('Target line', cx, ty - 14);
    ctx.textAlign = 'left';

    // Three candidate lines
    const yLine = 200;
    const positions = [W * 0.25, W * 0.5, W * 0.75];
    const labels = ['A', 'B', 'C'];
    for (let i = 0; i < 3; i++) {
      const len = labels[i] === 'A' ? lengths.A : labels[i] === 'B' ? lengths.B : lengths.C;
      ctx.strokeStyle = state.yourAnswer === labels[i]
        ? (state.yourAnswer === state.target ? '#10b981' : '#ef4444')
        : '#0ea5e9';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(positions[i] - len / 2, yLine); ctx.lineTo(positions[i] + len / 2, yLine);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], positions[i], yLine + 30);
      ctx.textAlign = 'left';
    }

    // Confederate row
    const cy = 300;
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText('Other people in the room (their answers):', 30, cy - 10);
    let cxN = 30;
    for (let i = 0; i < params.confederates; i++) {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(cxN + 25, cy + 30, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(`P${i + 1}`, cxN + 25, cy + 34);
      // Their answer in a speech bubble
      ctx.fillStyle = 'rgba(239,68,68,0.18)';
      ctx.fillRect(cxN, cy + 60, 50, 24);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.fillText(state.confedAnswer, cxN + 25, cy + 78);
      ctx.textAlign = 'left';
      cxN += 56;
    }
    if (params.ally) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cxN + 25, cy + 30, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText('A', cxN + 25, cy + 34);
      ctx.fillStyle = 'rgba(16,185,129,0.18)';
      ctx.fillRect(cxN, cy + 60, 50, 24);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.fillText(state.target, cxN + 25, cy + 78);
      ctx.textAlign = 'left';
    }
    // You
    cxN += 80;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cxN + 25, cy + 30, 24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.textAlign = 'center';
    ctx.fillText('YOU', cxN + 25, cy + 34);
    ctx.textAlign = 'left';

    // Header / stats
    const total = state.trials.length;
    const conformed = state.trials.filter((t) => t.conformed).length;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Trial ${state.seq}    Confederates: ${params.confederates}${params.ally ? ' + 1 ally' : ''}`, 16, 28);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    if (total > 0) {
      ctx.fillText(`You conformed on ${conformed} of ${total} trials (${(conformed / total * 100).toFixed(0)}%)`, 16, 48);
      ctx.fillText(`Asch's original study: ~75% conformed at least once`, 16, 64);
    }
  }

  // controls
  const cS = slider({ label: 'Number of confederates', min: 1, max: 8, step: 1, value: params.confederates,
    onInput: (v) => { params.confederates = v; } });
  const aT = toggle({ label: 'One ally answers correctly', value: params.ally, onChange: (v) => { params.ally = v; } });
  const ansRow = document.createElement('div');
  ansRow.className = 'ctrl-row';
  for (const l of ['A', 'B', 'C']) {
    const b = button({ label: `Answer ${l}`, primary: true, onClick: () => answer(l) });
    ansRow.appendChild(b.el);
  }
  const resetB = button({ label: 'Reset trials', onClick: () => { state.trials = []; state.seq = 0; newTrial(); } });

  ctrlPanel.append(cS.el, aT.el, ansRow, row(resetB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
