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
    N: 3,
    M: 4,
    bpm: 90,    // shared base tempo (cycle takes 60/bpm * lcm/N seconds for top, etc.)
    playing: false,
  };

  let phase = 0;     // 0..1, fraction of a measure (one full pattern)
  let lastBeats = { N: -1, M: -1 };

  let audioCtx = null;
  function ensure() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  function click(freq, when) {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator();
    o.type = 'square';
    o.frequency.value = freq;
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.20, when + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.10);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(when); o.stop(when + 0.12);
  }

  function step(dt) {
    if (!params.playing) return;
    // One "measure" is the time it takes the LCM of (N, M) pulses to complete
    // when each track has its own pulse rate. We define: top track has N beats per measure,
    // bottom track has M beats per measure. Period = 60/bpm * 4 (4-beat measure baseline).
    const measureSec = 60 / params.bpm * 4;
    phase = (phase + dt / measureSec) % 1;
    const beatN = Math.floor(phase * params.N);
    const beatM = Math.floor(phase * params.M);
    const t0 = audioCtx ? audioCtx.currentTime : 0;
    if (beatN !== lastBeats.N) { click(880, t0); lastBeats.N = beatN; }
    if (beatM !== lastBeats.M) { click(440, t0); lastBeats.M = beatM; }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 50;
    // Two horizontal "rails" — top for N, bottom for M.
    const railH = 80;
    const railW = W - padX * 2;
    const topY = 80, botY = topY + railH + 50;

    drawRail(ctx, padX, topY, railW, railH, params.N, '#fbbf24', `${params.N}-pulse`);
    drawRail(ctx, padX, botY, railW, railH, params.M, '#0ea5e9', `${params.M}-pulse`);

    // Combined rhythm strip — show beats from both as ticks on a shared timeline
    const combY = botY + railH + 50;
    const combH = 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, combY, railW, combH);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Combined polyrhythm', padX, combY - 4);

    function tickAt(frac, color, h, label) {
      const sx = padX + frac * railW;
      ctx.fillStyle = color;
      ctx.fillRect(sx - 1, combY + (combH - h) / 2, 2, h);
      if (label) {
        ctx.font = '10px var(--font-mono)';
        ctx.fillText(label, sx + 4, combY + 12);
      }
    }
    for (let i = 0; i < params.N; i++) tickAt(i / params.N, '#fbbf24', combH * 0.85, i === 0 ? '1' : '');
    for (let i = 0; i < params.M; i++) tickAt(i / params.M, '#0ea5e9', combH * 0.6, i === 0 ? '1' : '');

    // playhead
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const px = padX + phase * railW;
    ctx.moveTo(px, topY); ctx.lineTo(px, combY + combH);
    ctx.stroke();

    // Readouts
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(`Polyrhythm  ${params.N} : ${params.M}`, 16, 30);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Tempo: ${params.bpm} bpm   ·   alignment every ${lcm(params.N, params.M)} pulses`, 16, 48);
  }

  function drawRail(ctx, x, y, w, h, n, color, label) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText(label, x, y - 4);
    for (let i = 0; i < n; i++) {
      const px = x + (i / n) * w;
      const beatActive = Math.floor(phase * n) === i;
      ctx.fillStyle = beatActive ? color : color + '55';
      ctx.beginPath();
      ctx.arc(px + (w / n) / 2, y + h / 2, beatActive ? 18 : 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(String(i + 1), px + (w / n) / 2, y + h / 2 + 4);
      ctx.textAlign = 'left';
    }
  }

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  function lcm(a, b) { return a * b / gcd(a, b); }

  // controls
  const NS = slider({ label: 'Top rhythm N', min: 2, max: 11, step: 1, value: params.N,
    onInput: (v) => { params.N = v; lastBeats.N = -1; } });
  const MS = slider({ label: 'Bottom rhythm M', min: 2, max: 11, step: 1, value: params.M,
    onInput: (v) => { params.M = v; lastBeats.M = -1; } });
  const tS = slider({ label: 'Tempo (bpm)', min: 30, max: 240, step: 1, value: params.bpm,
    onInput: (v) => { params.bpm = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, m] of [[3, 2], [3, 4], [4, 5], [5, 7], [7, 11]]) {
    const b = button({ label: `${n}:${m}`, onClick: () => {
      params.N = n; params.M = m; NS.value = n; MS.value = m;
      lastBeats = { N: -1, M: -1 };
    } });
    presetRow.appendChild(b.el);
  }
  const playB = button({ label: '▶ Play', primary: true, onClick: () => {
    if (params.playing) {
      params.playing = false;
      playB.label = '▶ Play';
    } else {
      ensure();
      params.playing = true;
      lastBeats = { N: -1, M: -1 };
      phase = 0;
      playB.label = '⏸ Stop';
    }
  } });

  ctrlPanel.append(NS.el, MS.el, tS.el, presetRow, row(playB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => {
    if (audioCtx) try { audioCtx.close(); } catch {}
    animator.stop(); cv.destroy();
  };
}
