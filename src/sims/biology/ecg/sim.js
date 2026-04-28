import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    bpm: 75,
    skipChance: 0,    // chance to skip a beat (arrhythmia)
  };

  let history = [];   // {t, v}
  let t = 0;
  let nextBeat = 0;

  // Build a P-QRS-T waveform sample for one beat (in seconds along beat)
  function ecgWave(phase) {
    // phase 0..1 within a beat
    if (phase < 0.05) return 0;
    if (phase < 0.12) return 0.15 * Math.sin((phase - 0.05) / 0.07 * Math.PI);  // P
    if (phase < 0.20) return 0;
    if (phase < 0.21) return -0.15 * (phase - 0.20) / 0.01;  // Q
    if (phase < 0.23) return 1.0 * (phase - 0.21) / 0.02 - 0.15; // R rise
    if (phase < 0.25) return 1.0 - 1.2 * (phase - 0.23) / 0.02;  // R fall
    if (phase < 0.28) return -0.2 + 0.2 * (phase - 0.25) / 0.03; // S recovery
    if (phase < 0.4) return 0;
    if (phase < 0.55) return 0.3 * Math.sin((phase - 0.4) / 0.15 * Math.PI); // T
    return 0;
  }

  function step(dt) {
    t += dt;
    while (nextBeat <= t) {
      // schedule next beat
      const period = 60 / params.bpm;
      // possibly skip
      if (Math.random() < params.skipChance) {
        nextBeat += period * 2;
      } else {
        nextBeat += period;
      }
    }
    // compute current sample
    const period = 60 / params.bpm;
    const sinceLast = t - (nextBeat - period);
    const phase = sinceLast / period;
    const v = ecgWave(phase);
    history.push({ t, v });
    if (history.length > 1500) history.shift();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Heart on left
    drawHeart(ctx, 30, 30, W * 0.32, H - 60);
    // ECG trace right
    drawECG(ctx, W * 0.36, 30, W - W * 0.36 - 30, H - 60);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 200, 26);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${params.bpm} bpm`, 16, 26);
  }

  function drawHeart(ctx, x, y, w, h) {
    const cx = x + w / 2, cy = y + h / 2;
    const phase = (((t - (nextBeat - 60 / params.bpm)) % (60 / params.bpm)) / (60 / params.bpm)) || 0;
    // beat throb: contract during QRS
    const beat = (phase > 0.20 && phase < 0.30) ? 1 + 0.15 * Math.sin((phase - 0.20) / 0.10 * Math.PI) : 1;
    const r = Math.min(w, h) * 0.32 * beat;
    // heart shape using two arcs + triangle
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(cx, cy + r * 1.0);
    ctx.bezierCurveTo(cx - r * 1.3, cy, cx - r * 1.3, cy - r * 0.7, cx, cy - r * 0.2);
    ctx.bezierCurveTo(cx + r * 1.3, cy - r * 0.7, cx + r * 1.3, cy, cx, cy + r * 1.0);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // glow
    ctx.fillStyle = `rgba(220, 38, 38, ${(beat - 1) * 4})`;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawECG(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    // grid
    for (let xx = x; xx < x + w; xx += 20) {
      ctx.beginPath();
      ctx.moveTo(xx, y); ctx.lineTo(xx, y + h);
      ctx.stroke();
    }
    for (let yy = y; yy < y + h; yy += 20) {
      ctx.beginPath();
      ctx.moveTo(x, yy); ctx.lineTo(x + w, yy);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.strokeRect(x, y, w, h);

    // ECG line
    if (history.length < 2) return;
    const tWindow = 6;
    const tEnd = history[history.length - 1].t;
    const tStart = Math.max(0, tEnd - tWindow);
    const x2 = (tt) => x + ((tt - tStart) / tWindow) * w;
    const y2 = (v) => y + h / 2 - v * (h / 2 - 16);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    for (const h_ of history) {
      if (h_.t < tStart) continue;
      const sx = x2(h_.t), sy = y2(h_.v);
      if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  // controls
  const bpmS = slider({ label: 'Heart rate (bpm)', min: 30, max: 200, step: 1, value: params.bpm,
    onInput: (v) => { params.bpm = v; } });
  const skipS = slider({ label: 'Missed-beat probability', min: 0, max: 0.3, step: 0.01, value: params.skipChance, format: (v) => v.toFixed(2),
    onInput: (v) => { params.skipChance = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, bpm, skip] of [['Resting (75)', 75, 0], ['Sleep (50)', 50, 0], ['Sprint (170)', 170, 0], ['Bradycardia', 45, 0], ['Tachy + skips', 130, 0.1]]) {
    const b = button({ label: name, onClick: () => { params.bpm = bpm; params.skipChance = skip; bpmS.value = bpm; skipS.value = skip; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(bpmS.el, skipS.el, presetRow);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
