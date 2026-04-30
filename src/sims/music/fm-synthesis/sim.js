import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    fc: 220,        // carrier
    ratio: 1,       // modulator/carrier
    I: 2.0,         // modulation index
  };

  let audioCtx = null;
  let carrier = null, modulator = null, modGain = null, gain = null;
  let playing = false;

  function startAudio() {
    if (playing) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    carrier = audioCtx.createOscillator();
    carrier.type = 'sine'; carrier.frequency.value = params.fc;
    modulator = audioCtx.createOscillator();
    modulator.type = 'sine'; modulator.frequency.value = params.fc * params.ratio;
    modGain = audioCtx.createGain();
    modGain.gain.value = params.fc * params.ratio * params.I;
    modulator.connect(modGain); modGain.connect(carrier.frequency);
    gain = audioCtx.createGain(); gain.gain.value = 0.18;
    carrier.connect(gain); gain.connect(audioCtx.destination);
    carrier.start(); modulator.start();
    playing = true;
    playB.label = '⏸ Stop';
  }
  function stopAudio() {
    if (!playing) return;
    try { carrier.stop(); modulator.stop(); } catch {}
    carrier = modulator = modGain = gain = null;
    playing = false;
    playB.label = '▶ Play';
  }
  function syncAudio() {
    if (!playing) return;
    carrier.frequency.value = params.fc;
    modulator.frequency.value = params.fc * params.ratio;
    modGain.gain.value = params.fc * params.ratio * params.I;
  }

  function fm(t) {
    const wc = 2 * Math.PI * params.fc;
    const wm = 2 * Math.PI * params.fc * params.ratio;
    return Math.sin(wc * t + params.I * Math.sin(wm * t));
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50;
    const slotH = (H - 80) / 2;
    drawWave(ctx, padX, 30,           W - padX * 1.5, slotH - 6, (t) => Math.sin(2 * Math.PI * params.fc * t),                    '#0ea5e9', 'carrier (sine)');
    drawWave(ctx, padX, 30 + slotH,   W - padX * 1.5, slotH - 6, fm,                                                                 '#10b981', `FM output  (I = ${params.I.toFixed(2)})`);

    // Big readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`f_c = ${params.fc.toFixed(1)} Hz   ratio = 1:${params.ratio.toFixed(2)}   I = ${params.I.toFixed(2)}`, 16, 28);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`y(t) = sin(2π f_c t + I·sin(2π f_m t))`, 16, 46);
    ctx.fillText(`f_m = ratio · f_c = ${(params.fc * params.ratio).toFixed(1)} Hz`, 16, 60);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click Play to hear FM in real time', padX, H - 12);
  }

  function drawWave(ctx, x, y, w, h, fn, color, label) {
    const cy = y + h / 2;
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x + w, cy); ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const samples = 600;
    const T = 0.05;
    const amp = h / 2 - 8;
    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * T;
      const v = fn(t);
      const sx = x + (i / samples) * w;
      const sy = cy - v * amp;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = 'bold 11px var(--font-mono)';
    ctx.fillText(label, x, y - 4);
  }

  // controls
  const fcS = slider({ label: 'Carrier f_c (Hz)', min: 80, max: 880, step: 1, value: params.fc,
    onInput: (v) => { params.fc = v; syncAudio(); } });
  const rS = slider({ label: 'Ratio (modulator / carrier)', min: 0.25, max: 6, step: 0.05, value: params.ratio, format: (v) => v.toFixed(2),
    onInput: (v) => { params.ratio = v; syncAudio(); } });
  const iS = slider({ label: 'Modulation index I', min: 0, max: 10, step: 0.05, value: params.I, format: (v) => v.toFixed(2),
    onInput: (v) => { params.I = v; syncAudio(); } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Vibrato', { ratio: 1, I: 0.3 }], ['Bell', { ratio: 1, I: 5 }], ['Bass', { ratio: 0.5, I: 3 }], ['Wood', { ratio: 3, I: 2 }]]) {
    const b = button({ label: n, onClick: () => { Object.assign(params, p); rS.value = params.ratio; iS.value = params.I; syncAudio(); } });
    presetRow.appendChild(b.el);
  }
  const playB = button({ label: '▶ Play', primary: true, onClick: () => { playing ? stopAudio() : startAudio(); } });

  ctrlPanel.append(fcS.el, rS.el, iS.el, presetRow, row(playB));

  const animator = loop(() => draw());
  animator.start();
  return () => { stopAudio(); if (audioCtx) try { audioCtx.close(); } catch {} animator.stop(); cv.destroy(); };
}
