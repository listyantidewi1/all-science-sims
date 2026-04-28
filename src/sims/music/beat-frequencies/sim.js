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
    f1: 220,
    f2: 222,
    visualWindow: 1.0,    // seconds shown on canvas
  };

  // WebAudio — built lazily on user gesture so the browser doesn't complain.
  let audioCtx = null;
  let osc1 = null, osc2 = null, gain = null;
  let playing = false;

  function startAudio() {
    if (playing) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    gain = audioCtx.createGain();
    gain.gain.value = 0.18;
    gain.connect(audioCtx.destination);
    osc1 = audioCtx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = params.f1; osc1.connect(gain); osc1.start();
    osc2 = audioCtx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = params.f2; osc2.connect(gain); osc2.start();
    playing = true;
    playB.label = '⏸ Stop';
  }
  function stopAudio() {
    if (!playing) return;
    try { osc1.stop(); osc2.stop(); } catch {}
    osc1 = osc2 = gain = null;
    playing = false;
    playB.label = '▶ Play';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50;
    const slotH = (H - 80) / 3;
    const slots = [{ y: 30 }, { y: 30 + slotH }, { y: 30 + slotH * 2 }];
    const labels = [`y₁ = sin(2π·${params.f1.toFixed(1)}·t)`, `y₂ = sin(2π·${params.f2.toFixed(1)}·t)`, `sum y₁ + y₂`];
    const colors = ['#0ea5e9', '#ec4899', '#10b981'];

    const samples = 800;
    const T = params.visualWindow;
    const beatHz = Math.abs(params.f1 - params.f2);

    for (let s = 0; s < 3; s++) {
      const cy = slots[s].y + slotH / 2;
      const amp = (slotH / 2) - 12;
      ctx.strokeStyle = 'rgba(120,130,150,0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padX, cy); ctx.lineTo(W - padX / 2, cy);
      ctx.stroke();

      ctx.strokeStyle = colors[s];
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const t = (i / samples) * T;
        const y1 = Math.sin(2 * Math.PI * params.f1 * t);
        const y2 = Math.sin(2 * Math.PI * params.f2 * t);
        let v;
        if (s === 0) v = y1;
        else if (s === 1) v = y2;
        else v = (y1 + y2) / 2;
        const sx = padX + (i / samples) * (W - padX * 1.5);
        const sy = cy - v * amp;
        if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Envelope on the sum panel
      if (s === 2) {
        const env = (t) => Math.abs(Math.cos(Math.PI * (params.f1 - params.f2) * t));
        ctx.strokeStyle = 'rgba(251,191,36,0.6)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        for (let i = 0; i <= samples; i++) {
          const t = (i / samples) * T;
          const e = env(t);
          const sx = padX + (i / samples) * (W - padX * 1.5);
          const sy = cy - e * amp;
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i <= samples; i++) {
          const t = (i / samples) * T;
          const e = env(t);
          const sx = padX + (i / samples) * (W - padX * 1.5);
          const sy = cy + e * amp;
          if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = colors[s];
      ctx.font = 'bold 12px var(--font-mono)';
      ctx.fillText(labels[s], padX, slots[s].y + 16);
    }

    // Big beat readout
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W - 240, H - 70, 230, 56);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(`Beat: ${beatHz.toFixed(2)} Hz`, W - 230, H - 48);
    ctx.fillStyle = '#fff';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`one beat every ${(beatHz > 0 ? (1 / beatHz) : 0).toFixed(2)} s`, W - 230, H - 28);
    ctx.fillText(`window: ${params.visualWindow.toFixed(2)} s`, W - 230, H - 14);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click Play to hear it · adjust f₂ vs f₁ to change the beat speed', padX, H - 8);
  }

  // controls
  const f1S = slider({ label: 'f₁ (Hz)', min: 100, max: 880, step: 0.5, value: params.f1, format: (v) => v.toFixed(1),
    onInput: (v) => { params.f1 = v; if (playing) osc1.frequency.value = v; } });
  const f2S = slider({ label: 'f₂ (Hz)', min: 100, max: 880, step: 0.5, value: params.f2, format: (v) => v.toFixed(1),
    onInput: (v) => { params.f2 = v; if (playing) osc2.frequency.value = v; } });
  const wS = slider({ label: 'Visual window (s)', min: 0.05, max: 4.0, step: 0.05, value: params.visualWindow, format: (v) => v.toFixed(2),
    onInput: (v) => { params.visualWindow = v; } });
  const matchB = button({ label: 'Match f₂ → f₁', onClick: () => { params.f2 = params.f1; f2S.value = params.f1; if (playing) osc2.frequency.value = params.f1; } });
  const playB = button({ label: '▶ Play', primary: true, onClick: () => { playing ? stopAudio() : startAudio(); } });
  ctrlPanel.append(f1S.el, f2S.el, wS.el, row(matchB, playB));

  const animator = loop(() => draw());
  animator.start();
  return () => { stopAudio(); if (audioCtx) { try { audioCtx.close(); } catch {} } animator.stop(); cv.destroy(); };
}
