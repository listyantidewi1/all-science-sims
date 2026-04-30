import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const g = 9.8;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    m1: 5,    // left
    m2: 3,    // right
    running: true,
  };

  // y is the displacement of m1 from equilibrium (positive = m1 fallen, m2 risen).
  let state = { y: 0, vy: 0 };

  function reset() { state = { y: 0, vy: 0 }; }

  function step(dt) {
    if (!params.running) return;
    const a = (params.m1 - params.m2) * g / (params.m1 + params.m2);
    state.vy += a * dt;
    state.y += state.vy * dt;
    // Soft cushioning if the rope runs out
    if (Math.abs(state.y) > 1.5) {
      state.y = Math.sign(state.y) * 1.5;
      state.vy = 0;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Ceiling
    ctx.fillStyle = '#475569';
    ctx.fillRect(W * 0.2, 30, W * 0.6, 8);
    ctx.strokeStyle = '#64748b';
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.moveTo(W * 0.2 + i * 18, 30);
      ctx.lineTo(W * 0.2 + i * 18 - 6, 22);
      ctx.stroke();
    }

    // Pulley
    const px = W / 2, py = 70;
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(px, py, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0b1220';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Mass positions
    const baseY = py + 100; // equilibrium for both
    const pixelsPerM = 80;
    const m1Y = baseY + state.y * pixelsPerM;
    const m2Y = baseY - state.y * pixelsPerM;
    const m1X = px - 70;
    const m2X = px + 70;

    // Ropes
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m1X, m1Y); ctx.lineTo(m1X, py); ctx.lineTo(m2X, py); ctx.lineTo(m2X, m2Y);
    ctx.stroke();

    // Boxes — size scales with mass
    function box(x, y, m, color) {
      const sz = 30 + Math.min(40, m * 4);
      ctx.fillStyle = color;
      ctx.fillRect(x - sz / 2, y, sz, sz);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - sz / 2, y, sz, sz);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(`${m.toFixed(1)} kg`, x, y + sz / 2 + 4);
      ctx.textAlign = 'left';
    }
    box(m1X, m1Y, params.m1, '#0ea5e9');
    box(m2X, m2Y, params.m2, '#ec4899');

    // Live formulas
    const a = (params.m1 - params.m2) * g / (params.m1 + params.m2);
    const T = 2 * params.m1 * params.m2 * g / (params.m1 + params.m2);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`a = (m₁ − m₂)g / (m₁ + m₂) = ${a.toFixed(3)} m/s²`, 16, 28);
    ctx.fillText(`T = 2 m₁ m₂ g / (m₁ + m₂) = ${T.toFixed(2)} N`, 16, 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`m₁g = ${(params.m1 * g).toFixed(2)} N    m₂g = ${(params.m2 * g).toFixed(2)} N`, 16, 66);
    ctx.fillText(`v = ${state.vy.toFixed(2)} m/s`, 16, 82);
  }

  // controls
  const m1S = slider({ label: 'Mass m₁ (kg)', min: 0.5, max: 15, step: 0.1, value: params.m1, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m1 = v; reset(); } });
  const m2S = slider({ label: 'Mass m₂ (kg)', min: 0.5, max: 15, step: 0.1, value: params.m2, format: (v) => v.toFixed(1),
    onInput: (v) => { params.m2 = v; reset(); } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, m1, m2] of [['Equal', 5, 5], ['2:1', 10, 5], ['Tiny diff', 5.1, 5]]) {
    const b = button({ label: n, onClick: () => {
      params.m1 = m1; params.m2 = m2; m1S.value = m1; m2S.value = m2; reset();
    } });
    presetRow.appendChild(b.el);
  }
  const playPauseB = button({ label: 'Pause', primary: true, onClick: () => {
    params.running = !params.running;
    playPauseB.label = params.running ? 'Pause' : 'Play';
  } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(m1S.el, m2S.el, presetRow, row(playPauseB, resetB));

  // Lab — verify a = (m₁−m₂)g/(m₁+m₂) and tension formula across mass pairs.
  const lab = labPanel({
    title: 'Atwood machine lab — Newton\'s 2nd law for a system',
    filename: 'atwood-lab.csv',
    columns: [
      { key: 'm1',   label: 'm₁ (kg)',   format: (v) => v.toFixed(2) },
      { key: 'm2',   label: 'm₂ (kg)',   format: (v) => v.toFixed(2) },
      { key: 'diff', label: 'Δm (kg)',   format: (v) => v.toFixed(2) },
      { key: 'a',    label: 'a (m/s²)',  format: (v) => v.toFixed(3) },
      { key: 'T',    label: 'T (N)',     format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Start with equal masses (m₁ = m₂ = 5 kg). Record. a = 0; T = mg.',
      'Make m₁ = 6, m₂ = 4. Record. Predicted a = (6−4)·9.8/(6+4) = 1.96 m/s².',
      'Increase Δm: try (8, 2), (9, 1). Record each.',
      'For each row, verify the formulas a = (m₁−m₂)g/(m₁+m₂) and T = 2m₁m₂g/(m₁+m₂).',
      'Plot a vs Δm — straight line through origin (with fixed total mass).',
    ],
    predict: 'If m₁ = 10 kg and m₂ = 0 (drop), what is the acceleration? What is the tension?',
    source: () => ({
      m1: params.m1,
      m2: params.m2,
      diff: Math.abs(params.m1 - params.m2),
      a: (params.m1 - params.m2) * g / (params.m1 + params.m2),
      T: 2 * params.m1 * params.m2 * g / (params.m1 + params.m2),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
