import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    learnRate: 0.18,
    extinctRate: 0.06,
    salivationDecay: 0.7,    // /sec
  };
  const state = {
    associationStrength: 0,    // CR strength: 0..1
    bellRinging: 0,            // visual cue ttl
    foodVisible: 0,
    salivation: 0,
    history: [],               // {trial, type, association} where type: 'paired' | 'bell-only' | 'food-only'
  };

  function pairBellFood() {
    state.bellRinging = 0.6;
    state.foodVisible = 0.6;
    state.associationStrength = Math.min(1, state.associationStrength + params.learnRate);
    state.salivation = Math.min(1, 1.0); // food triggers strong salivation always
    state.history.push({ trial: state.history.length + 1, type: 'paired', association: state.associationStrength });
  }
  function bellOnly() {
    state.bellRinging = 0.6;
    state.foodVisible = 0;
    // CR: salivation jumps proportional to association
    state.salivation = Math.min(1, state.salivation + state.associationStrength);
    // Extinction: each bell-without-food weakens the association.
    state.associationStrength = Math.max(0, state.associationStrength - params.extinctRate);
    state.history.push({ trial: state.history.length + 1, type: 'bell-only', association: state.associationStrength });
  }
  function foodOnly() {
    state.bellRinging = 0;
    state.foodVisible = 0.6;
    state.salivation = 1.0;
    state.history.push({ trial: state.history.length + 1, type: 'food-only', association: state.associationStrength });
  }

  function step(dt) {
    state.bellRinging = Math.max(0, state.bellRinging - dt);
    state.foodVisible = Math.max(0, state.foodVisible - dt);
    state.salivation = Math.max(0, state.salivation - params.salivationDecay * dt);
  }

  let chart = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    drawDog(ctx, 50, 60, W * 0.45 - 100, H * 0.55);
    drawAssociationChart(ctx, W * 0.5, 60, W * 0.5 - 30, H * 0.55);

    const probe = hover.get();
    if (probe && chart) drawCrosshair(ctx, probe, { bounds: chart, color: '#fbbf24', label: probe.label });

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, H - 70, W - 16, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Association strength: ${(state.associationStrength * 100).toFixed(0)}%    Salivation: ${(state.salivation * 100).toFixed(0)}%`, 16, H - 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Trials: ${state.history.length}`, 16, H - 30);
  }

  function drawDog(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    // Bell at top-left
    ctx.fillStyle = state.bellRinging > 0 ? '#fbbf24' : '#94a3b8';
    ctx.font = '60px var(--font-sans)';
    ctx.fillText('🔔', x, y + 80);
    if (state.bellRinging > 0) {
      ctx.strokeStyle = `rgba(251,191,36,${state.bellRinging})`;
      ctx.lineWidth = 3;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(x + 30, y + 50, 30 * i, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Dog (emoji as proxy)
    ctx.font = '120px var(--font-sans)';
    ctx.fillText('🐕', cx - 60, cy + 60);
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillStyle = 'rgba(120,130,150,0.85)';

    // Salivation drops
    if (state.salivation > 0.05) {
      ctx.fillStyle = `rgba(14,165,233,${state.salivation})`;
      const drops = Math.round(state.salivation * 6);
      for (let i = 0; i < drops; i++) {
        const dx = cx - 30 + i * 6;
        const dy = cy + 80 + (i % 2) * 10;
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#0ea5e9';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.fillText('💧 salivating', cx + 50, cy + 90);
    }

    // Food bowl
    ctx.font = '60px var(--font-sans)';
    ctx.fillStyle = state.foodVisible > 0 ? '#fff' : 'rgba(120,130,150,0.4)';
    ctx.fillText('🍖', x + w - 70, y + h - 50);
  }

  function drawAssociationChart(ctx, x, y, w, h) {
    chart = { x, y, w, h };
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Association strength over trials', x + 6, y - 6);

    const N = Math.max(20, state.history.length);
    const x2 = (i) => x + (i / N) * w;
    const y2 = (a) => y + h - a * (h - 16) - 8;

    // Bars
    for (let i = 0; i < state.history.length; i++) {
      const ev = state.history[i];
      const color = ev.type === 'paired' ? '#10b981' : ev.type === 'bell-only' ? '#fbbf24' : '#0ea5e9';
      const bw = w / N;
      ctx.fillStyle = color;
      ctx.fillRect(x2(i) + 1, y + 2, bw - 2, h - 4);
      ctx.globalAlpha = 1;
    }

    // Trace
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < state.history.length; i++) {
      const sx = x2(i + 0.5), sy = y2(state.history[i].association);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Legend
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(x + 8, y + 8, 200, 64);
    const legend = [['#10b981', 'paired'], ['#fbbf24', 'bell only'], ['#0ea5e9', 'food only']];
    for (let i = 0; i < legend.length; i++) {
      ctx.fillStyle = legend[i][0];
      ctx.fillRect(x + 16, y + 22 + i * 16, 14, 4);
      ctx.fillStyle = '#fff';
      ctx.font = '11px var(--font-sans)';
      ctx.fillText(legend[i][1], x + 36, y + 26 + i * 16);
    }
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (!chart) return null;
    if (sx < chart.x || sx > chart.x + chart.w || sy < chart.y || sy > chart.y + chart.h) return null;
    const N = Math.max(20, state.history.length);
    const i = Math.floor(((sx - chart.x) / chart.w) * N);
    if (i < 0 || i >= state.history.length) return null;
    const ev = state.history[i];
    return { x: sx, y: sy, label: [`trial ${i + 1}`, `${ev.type}`, `assoc ${(ev.association * 100).toFixed(0)}%`] };
  });

  // controls
  const lrS = slider({ label: 'Learning rate', min: 0.05, max: 0.5, step: 0.01, value: params.learnRate, format: (v) => v.toFixed(2),
    onInput: (v) => { params.learnRate = v; } });
  const eS = slider({ label: 'Extinction rate', min: 0, max: 0.3, step: 0.01, value: params.extinctRate, format: (v) => v.toFixed(2),
    onInput: (v) => { params.extinctRate = v; } });
  const pairB = button({ label: '🔔 + 🍖 Pair bell & food', primary: true, onClick: pairBellFood });
  const bellB = button({ label: '🔔 Bell only', onClick: bellOnly });
  const foodB = button({ label: '🍖 Food only', onClick: foodOnly });
  const resetB = button({ label: 'Reset', onClick: () => {
    state.associationStrength = 0; state.salivation = 0; state.history = [];
  } });
  ctrlPanel.append(lrS.el, eS.el, row(pairB, bellB), row(foodB, resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
