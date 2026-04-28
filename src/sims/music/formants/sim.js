import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';

// Approximate "vowel chart" reference points (typical adult male formants).
const VOWELS = [
  { sym: '/i/', label: 'as in "see"',  F1: 280, F2: 2250 },
  { sym: '/e/', label: 'as in "set"',  F1: 530, F2: 1840 },
  { sym: '/æ/', label: 'as in "cat"',  F1: 660, F2: 1720 },
  { sym: '/a/', label: 'as in "ah"',   F1: 730, F2: 1090 },
  { sym: '/o/', label: 'as in "oh"',   F1: 540, F2: 850 },
  { sym: '/u/', label: 'as in "boot"', F1: 300, F2: 870 },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    F1: 730,
    F2: 1090,
    pitch: 120,    // glottal source f0
  };

  // Audio: source = sawtooth at pitch, two band-pass biquad filters at F1 and F2 in series.
  let audioCtx = null;
  let src = null, bp1 = null, bp2 = null, gain = null;
  let playing = false;

  function startAudio() {
    if (playing) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    src = audioCtx.createOscillator();
    src.type = 'sawtooth';
    src.frequency.value = params.pitch;
    bp1 = audioCtx.createBiquadFilter();
    bp1.type = 'bandpass'; bp1.Q.value = 8; bp1.frequency.value = params.F1;
    bp2 = audioCtx.createBiquadFilter();
    bp2.type = 'bandpass'; bp2.Q.value = 8; bp2.frequency.value = params.F2;
    gain = audioCtx.createGain();
    gain.gain.value = 0.30;
    src.connect(bp1); bp1.connect(bp2); bp2.connect(gain); gain.connect(audioCtx.destination);
    src.start();
    playing = true;
    playB.label = '⏸ Stop';
  }
  function stopAudio() {
    if (!playing) return;
    try { src.stop(); } catch {}
    src = bp1 = bp2 = gain = null;
    playing = false;
    playB.label = '▶ Play';
  }
  function syncAudio() {
    if (playing) {
      bp1.frequency.value = params.F1;
      bp2.frequency.value = params.F2;
      src.frequency.value = params.pitch;
    }
  }

  let plot = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    // Plot space — F1 on Y axis (inverted, low at top), F2 on X axis (high at left)
    const padX = 60, padY = 50;
    const w = W - padX - 30, h = H - padY - 50;
    plot = { x: padX, y: padY, w, h, F1min: 200, F1max: 900, F2min: 600, F2max: 2500 };
    const F2x = (f2) => padX + ((plot.F2max - f2) / (plot.F2max - plot.F2min)) * w;
    const F1y = (f1) => padY + ((f1 - plot.F1min) / (plot.F1max - plot.F1min)) * h;

    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(padX, padY, w, h);

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let f = 200; f <= 900; f += 100) {
      ctx.beginPath(); ctx.moveTo(padX, F1y(f)); ctx.lineTo(padX + w, F1y(f)); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${f}`, padX - 32, F1y(f) + 3);
    }
    for (let f = 800; f <= 2500; f += 200) {
      ctx.beginPath(); ctx.moveTo(F2x(f), padY); ctx.lineTo(F2x(f), padY + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.fillText(`${f}`, F2x(f) - 12, padY - 6);
    }

    // axis labels
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('F2 (Hz) →  high front     low back', padX + w / 2 - 80, padY - 22);
    ctx.save(); ctx.translate(padX - 50, padY + h / 2 + 30); ctx.rotate(-Math.PI / 2);
    ctx.fillText('F1 (Hz) ↓  closed     open', 0, 0); ctx.restore();

    // Vowel reference dots
    for (const v of VOWELS) {
      const px = F2x(v.F2), py = F1y(v.F1);
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px var(--font-mono)';
      ctx.fillText(v.sym, px + 12, py + 5);
      ctx.font = '10px var(--font-sans)';
      ctx.fillStyle = 'rgba(120,130,150,0.85)';
      ctx.fillText(v.label, px + 12, py + 18);
    }

    // Current point
    const cx = F2x(params.F2), cy = F1y(params.F1);
    ctx.fillStyle = '#f97316';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Closest vowel guess
    let best = null, bestD = Infinity;
    for (const v of VOWELS) {
      const d = Math.hypot(F2x(v.F2) - cx, F1y(v.F1) - cy);
      if (d < bestD) { bestD = d; best = v; }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(`F1 = ${params.F1.toFixed(0)} Hz   F2 = ${params.F2.toFixed(0)} Hz`, 16, 28);
    if (best) {
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 16px var(--font-sans)';
      ctx.fillText(`closest vowel: ${best.sym}`, 16, 52);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the orange dot · click Play to hear it', padX, H - 12);
  }

  // Drag the formant point
  const drag = dragHandle(cv.canvas, {
    hitTest(sx, sy) {
      if (!plot) return null;
      const F2x = (f2) => plot.x + ((plot.F2max - f2) / (plot.F2max - plot.F2min)) * plot.w;
      const F1y = (f1) => plot.y + ((f1 - plot.F1min) / (plot.F1max - plot.F1min)) * plot.h;
      const cx = F2x(params.F2), cy = F1y(params.F1);
      if (Math.hypot(sx - cx, sy - cy) < 18) return 'F';
      // Or anywhere in the plot — start dragging.
      if (sx >= plot.x && sx <= plot.x + plot.w && sy >= plot.y && sy <= plot.y + plot.h) return 'F';
      return null;
    },
    onDrag(_id, sx, sy) {
      if (!plot) return;
      const F2 = plot.F2max - ((sx - plot.x) / plot.w) * (plot.F2max - plot.F2min);
      const F1 = plot.F1min + ((sy - plot.y) / plot.h) * (plot.F1max - plot.F1min);
      params.F1 = Math.max(plot.F1min, Math.min(plot.F1max, F1));
      params.F2 = Math.max(plot.F2min, Math.min(plot.F2max, F2));
      f1S.value = params.F1; f2S.value = params.F2;
      syncAudio();
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  // Controls
  const f1S = slider({ label: 'F1 (Hz)', min: 200, max: 900, step: 1, value: params.F1,
    onInput: (v) => { params.F1 = v; syncAudio(); } });
  const f2S = slider({ label: 'F2 (Hz)', min: 600, max: 2500, step: 1, value: params.F2,
    onInput: (v) => { params.F2 = v; syncAudio(); } });
  const pS = slider({ label: 'Glottal pitch (Hz)', min: 80, max: 250, step: 1, value: params.pitch,
    onInput: (v) => { params.pitch = v; syncAudio(); } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const v of VOWELS) {
    const b = button({ label: v.sym, onClick: () => {
      params.F1 = v.F1; params.F2 = v.F2;
      f1S.value = v.F1; f2S.value = v.F2;
      syncAudio();
    } });
    presetRow.appendChild(b.el);
  }
  const playB = button({ label: '▶ Play', primary: true, onClick: () => { playing ? stopAudio() : startAudio(); } });

  ctrlPanel.append(f1S.el, f2S.el, pS.el, presetRow, row(playB));

  const animator = loop(() => draw());
  animator.start();
  return () => {
    stopAudio();
    if (audioCtx) try { audioCtx.close(); } catch {}
    animator.stop(); drag.destroy(); cv.destroy();
  };
}
