import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

const N = 8; // first 8 harmonics

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    fundamental: 220,
    weights: Array.from({ length: N }, (_, i) => i === 0 ? 1 : 0),
  };

  let audioCtx = null;
  let oscs = [];
  let gains = [];
  let masterGain = null;
  let playing = false;

  function ensureAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.18;
    masterGain.connect(audioCtx.destination);
    for (let n = 0; n < N; n++) {
      const o = audioCtx.createOscillator();
      o.type = 'sine';
      o.frequency.value = params.fundamental * (n + 1);
      const g = audioCtx.createGain();
      g.gain.value = 0;
      o.connect(g); g.connect(masterGain);
      o.start();
      oscs.push(o); gains.push(g);
    }
  }
  function syncAudio() {
    if (!audioCtx) return;
    for (let n = 0; n < N; n++) {
      oscs[n].frequency.value = params.fundamental * (n + 1);
      gains[n].gain.value = playing ? params.weights[n] / N : 0;
    }
  }
  function startAudio() {
    ensureAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    playing = true;
    syncAudio();
    playB.label = '⏸ Stop';
  }
  function stopAudio() {
    playing = false;
    if (audioCtx) for (const g of gains) g.gain.value = 0;
    playB.label = '▶ Play';
  }

  function waveAt(t) {
    let v = 0;
    for (let n = 0; n < N; n++) {
      v += params.weights[n] * Math.sin(2 * Math.PI * (n + 1) * t);
    }
    return v;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50;
    const topH = H * 0.55;
    const cy = topH / 2 + 10;

    // baseline
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, cy); ctx.lineTo(W - padX / 2, cy);
    ctx.stroke();

    // sum waveform — show 2 fundamental periods
    const periods = 2;
    const samples = 800;
    const amp = topH / 2 - 16;
    const peak = Math.max(1, params.weights.reduce((a, b) => a + Math.abs(b), 0));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * periods;
      const v = waveAt(t) / peak;
      const sx = padX + (i / samples) * (W - padX * 1.5);
      const sy = cy - v * amp;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText(`Sum (2 periods of f₀ = ${params.fundamental.toFixed(0)} Hz)`, padX, 24);

    // harmonic-amplitude bar chart
    const bx = padX, by = topH + 30;
    const bw = W - padX * 1.5;
    const bh = H - by - 30;
    ctx.strokeStyle = 'rgba(120,130,150,0.25)';
    ctx.strokeRect(bx, by, bw, bh);
    const colW = bw / N;
    for (let n = 0; n < N; n++) {
      const x0 = bx + n * colW + 6;
      const wgt = params.weights[n];
      const h = Math.abs(wgt) * (bh - 16);
      ctx.fillStyle = wgt >= 0 ? '#0ea5e9' : '#ec4899';
      ctx.fillRect(x0, by + bh - h - 2, colW - 12, h);
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`H${n + 1}`, x0 + (colW - 12) / 2 - 8, by + bh - 4);
      ctx.fillText(wgt.toFixed(2), x0 + (colW - 12) / 2 - 12, by + bh - h - 6);
    }
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('Harmonic weights', bx, by - 6);
  }

  function applyPreset(name) {
    if (name === 'sine') params.weights = Array.from({ length: N }, (_, i) => i === 0 ? 1 : 0);
    else if (name === 'sawtooth') params.weights = Array.from({ length: N }, (_, i) => 1 / (i + 1));
    else if (name === 'square') params.weights = Array.from({ length: N }, (_, i) => (i % 2 === 0) ? 1 / (i + 1) : 0);
    else if (name === 'clarinet') params.weights = Array.from({ length: N }, (_, i) => (i % 2 === 0) ? 1 / (i + 1) ** 1.4 : 0);
    rebuildWeightSliders();
    syncAudio();
  }

  // Controls — fundamental, presets, per-harmonic sliders.
  const fS = slider({ label: 'Fundamental f₀ (Hz)', min: 100, max: 600, step: 1, value: params.fundamental,
    onInput: (v) => { params.fundamental = v; syncAudio(); } });
  ctrlPanel.append(fS.el);

  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [label, name] of [['Sine', 'sine'], ['Sawtooth', 'sawtooth'], ['Square', 'square'], ['Clarinet', 'clarinet']]) {
    const b = button({ label, onClick: () => applyPreset(name) });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.appendChild(presetRow);

  const weightWrap = document.createElement('div');
  weightWrap.style.display = 'grid';
  weightWrap.style.gap = 'var(--space-2)';
  ctrlPanel.appendChild(weightWrap);

  const weightSliders = [];
  function rebuildWeightSliders() {
    weightWrap.innerHTML = '';
    weightSliders.length = 0;
    for (let n = 0; n < N; n++) {
      const s = slider({
        label: `H${n + 1}`, min: -1, max: 1, step: 0.01, value: params.weights[n], format: (v) => v.toFixed(2),
        onInput: (v) => { params.weights[n] = v; syncAudio(); },
      });
      weightWrap.appendChild(s.el);
      weightSliders.push(s);
    }
  }
  rebuildWeightSliders();

  const playB = button({ label: '▶ Play', primary: true, onClick: () => { playing ? stopAudio() : startAudio(); } });
  ctrlPanel.appendChild(row(playB));

  const animator = loop(() => draw());
  animator.start();
  return () => {
    stopAudio();
    if (audioCtx) { try { for (const o of oscs) o.stop(); } catch {} try { audioCtx.close(); } catch {} }
    animator.stop(); cv.destroy();
  };
}
