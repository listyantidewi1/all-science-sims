import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

const c = 343; // speed of sound, m/s

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    fSrc: 440,
    speed: 60,    // m/s
    running: true,
  };

  // Source moves left-right between -200 m and +200 m past a fixed observer at (0, 8 m).
  let state = { x: -200, vx: 60, t: 0 };

  let audioCtx = null;
  let osc = null, gain = null;
  let playing = false;

  function startAudio() {
    if (playing) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = params.fSrc;
    gain = audioCtx.createGain();
    gain.gain.value = 0.10;
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start();
    playing = true;
    playB.label = '⏸ Stop';
  }
  function stopAudio() {
    if (!playing) return;
    try { osc.stop(); } catch {}
    osc = gain = null;
    playing = false;
    playB.label = '▶ Play';
  }

  function step(dt) {
    if (!params.running) return;
    state.vx = params.speed * Math.sign(state.vx || 1);
    state.x += state.vx * dt;
    if (state.x > 200) state.vx = -Math.abs(state.vx);
    if (state.x < -200) state.vx = Math.abs(state.vx);
    state.t += dt;

    // Doppler: observer at (0, 8)
    const dx = 0 - state.x, dy = 8 - 0;
    const dist = Math.hypot(dx, dy);
    // Velocity component toward observer:
    const vRadial = -(state.vx * dx) / dist;  // positive if moving toward observer
    const fObs = params.fSrc * c / (c - vRadial);

    if (playing) {
      osc.frequency.setTargetAtTime(fObs, audioCtx.currentTime, 0.02);
      // Volume drops with distance
      gain.gain.setTargetAtTime(0.10 / Math.max(1, dist / 30), audioCtx.currentTime, 0.05);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // World coords: 1 m = pxPerM
    const pxPerM = (W - 100) / 400;
    const cxScreen = W / 2;
    const cy = H * 0.6;
    const w2sX = (m) => cxScreen + m * pxPerM;

    // Ground
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, cy + 16, W, H - cy - 16);

    // Observer (ear icon)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cxScreen, cy + 16, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0b1220';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText('👂', cxScreen, cy + 22);
    ctx.textAlign = 'left';

    // Source (siren)
    const sx = w2sX(state.x);
    ctx.fillStyle = state.vx > 0 ? '#10b981' : '#ef4444';
    ctx.beginPath();
    ctx.arc(sx, cy - 30, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText('🚨', sx, cy - 25);
    ctx.textAlign = 'left';

    // Wavefronts (concentric circles emanating from past positions)
    const tmax = 400 / Math.max(20, params.speed); // wave-life seconds
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    const nWaves = 16;
    for (let i = 0; i < nWaves; i++) {
      const tEmit = state.t - i / params.fSrc * 12;   // sample old emission times
      const xEmit = state.x - state.vx * (state.t - tEmit);
      const r = (state.t - tEmit) * c;
      ctx.beginPath();
      ctx.arc(w2sX(xEmit), cy - 30, r * pxPerM, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Doppler-shifted frequency readout
    const dx = 0 - state.x, dy = 8 - 0;
    const dist = Math.hypot(dx, dy);
    const vRadial = -(state.vx * dx) / dist;
    const fObs = params.fSrc * c / (c - vRadial);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`f_source = ${params.fSrc.toFixed(0)} Hz`, 16, 28);
    ctx.fillStyle = fObs > params.fSrc ? '#10b981' : fObs < params.fSrc ? '#ef4444' : '#fbbf24';
    ctx.fillText(`f_observed = ${fObs.toFixed(1)} Hz`, 16, 48);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`v_radial toward listener = ${vRadial.toFixed(1)} m/s`, 16, 66);
  }

  // controls
  const fS = slider({ label: 'Source frequency (Hz)', min: 100, max: 880, step: 1, value: params.fSrc,
    onInput: (v) => { params.fSrc = v; } });
  const speedS = slider({ label: 'Source speed (m/s)', min: 0, max: 200, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; } });
  const playB = button({ label: '▶ Play', primary: true, onClick: () => { playing ? stopAudio() : startAudio(); } });
  const runT = toggle({ label: 'Source moving', value: params.running, onChange: (v) => { params.running = v; } });
  ctrlPanel.append(fS.el, speedS.el, runT.el, row(playB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { stopAudio(); if (audioCtx) try { audioCtx.close(); } catch {} animator.stop(); cv.destroy(); };
}
