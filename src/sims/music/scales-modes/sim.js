import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, row } from '../../../lib/controls.js';

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const SCALES = {
  'major':            { name: 'Major (Ionian)', steps: [0, 2, 4, 5, 7, 9, 11] },
  'natural-minor':    { name: 'Natural minor (Aeolian)', steps: [0, 2, 3, 5, 7, 8, 10] },
  'harmonic-minor':   { name: 'Harmonic minor', steps: [0, 2, 3, 5, 7, 8, 11] },
  'melodic-minor':    { name: 'Melodic minor (asc.)', steps: [0, 2, 3, 5, 7, 9, 11] },
  'dorian':           { name: 'Dorian', steps: [0, 2, 3, 5, 7, 9, 10] },
  'phrygian':         { name: 'Phrygian', steps: [0, 1, 3, 5, 7, 8, 10] },
  'lydian':           { name: 'Lydian', steps: [0, 2, 4, 6, 7, 9, 11] },
  'mixolydian':       { name: 'Mixolydian', steps: [0, 2, 4, 5, 7, 9, 10] },
  'locrian':          { name: 'Locrian', steps: [0, 1, 3, 5, 6, 8, 10] },
  'pentatonic-major': { name: 'Pentatonic major', steps: [0, 2, 4, 7, 9] },
  'pentatonic-minor': { name: 'Pentatonic minor', steps: [0, 3, 5, 7, 10] },
  'blues':            { name: 'Blues', steps: [0, 3, 5, 6, 7, 10] },
  'hungarian-minor':  { name: 'Hungarian minor', steps: [0, 2, 3, 6, 7, 8, 11] },
  'whole-tone':       { name: 'Whole tone', steps: [0, 2, 4, 6, 8, 10] },
  'chromatic':        { name: 'Chromatic', steps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 7 });

  const params = { rootIdx: 0, scaleKey: 'major', octaves: 2 };

  let audioCtx = null;
  function ensure() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playNote(midi, when = 0, dur = 0.4) {
    ensure();
    const f = 261.63 * Math.pow(2, (midi - 60) / 12);
    const t = (audioCtx.currentTime || 0) + when;
    const o = audioCtx.createOscillator();
    o.type = 'triangle'; o.frequency.value = f;
    const g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.02);
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function playScale() {
    const notes = scaleMidiNotes();
    const dur = 0.35;
    for (let i = 0; i < notes.length; i++) playNote(notes[i], i * dur, dur);
  }

  function scaleMidiNotes() {
    const scale = SCALES[params.scaleKey].steps;
    const notes = [];
    const baseMidi = 60 + params.rootIdx;     // middle C + root offset
    for (let oct = 0; oct < params.octaves; oct++) {
      for (const s of scale) notes.push(baseMidi + oct * 12 + s);
    }
    notes.push(baseMidi + params.octaves * 12); // close on the root
    return notes;
  }

  let keyRects = [];
  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30, kbY = 50;
    const kbH = H - kbY - 80;
    const startMidi = 60 + params.rootIdx - 12;
    const endMidi = startMidi + 12 * (params.octaves + 1);
    const totalKeys = endMidi - startMidi + 1;
    const whitePcs = [0, 2, 4, 5, 7, 9, 11];
    const whiteCount = (() => {
      let n = 0;
      for (let m = startMidi; m <= endMidi; m++) if (whitePcs.includes(m % 12)) n++;
      return n;
    })();
    const wKeyW = (W - padX * 2) / whiteCount;
    let wIdx = 0;
    keyRects = [];

    const inScale = new Set();
    for (const m of scaleMidiNotes()) inScale.add(m);

    // White keys first
    for (let m = startMidi; m <= endMidi; m++) {
      if (!whitePcs.includes(m % 12)) continue;
      const x = padX + wIdx * wKeyW;
      const lit = inScale.has(m);
      const isRoot = (m % 12) === params.rootIdx;
      ctx.fillStyle = isRoot && lit ? '#fbbf24' : lit ? '#10b981' : '#fff';
      ctx.fillRect(x, kbY, wKeyW - 1, kbH);
      ctx.strokeStyle = '#0b1220';
      ctx.strokeRect(x, kbY, wKeyW - 1, kbH);
      ctx.fillStyle = '#0b1220';
      ctx.font = '10px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(NOTE_NAMES[m % 12], x + wKeyW / 2, kbY + kbH - 6);
      ctx.textAlign = 'left';
      keyRects.push({ x, y: kbY, w: wKeyW - 1, h: kbH, midi: m });
      wIdx++;
    }
    // Black keys
    wIdx = 0;
    for (let m = startMidi; m <= endMidi; m++) {
      if (!whitePcs.includes(m % 12)) continue;
      const next = m + 1;
      if (next <= endMidi && !whitePcs.includes(next % 12)) {
        const x = padX + wIdx * wKeyW + wKeyW * 0.7;
        const bw = wKeyW * 0.6, bh = kbH * 0.62;
        const lit = inScale.has(next);
        const isRoot = (next % 12) === params.rootIdx;
        ctx.fillStyle = isRoot && lit ? '#fbbf24' : lit ? '#10b981' : '#0b1220';
        ctx.fillRect(x, kbY, bw, bh);
        if (lit) {
          ctx.fillStyle = '#0b1220';
          ctx.font = '9px var(--font-mono)';
          ctx.textAlign = 'center';
          ctx.fillText(NOTE_NAMES[next % 12], x + bw / 2, kbY + bh - 6);
          ctx.textAlign = 'left';
        }
        keyRects.push({ x, y: kbY, w: bw, h: bh, midi: next });
      }
      wIdx++;
    }

    // Header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 320, 36);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`${NOTE_NAMES[params.rootIdx]}  ${SCALES[params.scaleKey].name}`, 16, 30);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    const intervals = SCALES[params.scaleKey].steps.map((s, i, arr) => i === 0 ? '' : (s - arr[i - 1])).slice(1).join('-');
    ctx.fillText(`Steps: ${intervals}`, 340, 30);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click any lit key to hear it · root note is gold', padX, H - 14);
  }

  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    // black keys first
    const sorted = [...keyRects].sort((a, b) => a.h - b.h);
    for (const k of sorted) {
      if (sx >= k.x && sx <= k.x + k.w && sy >= k.y && sy <= k.y + k.h) {
        playNote(k.midi, 0, 0.6);
        return;
      }
    }
  });

  // controls
  const rootSel = select({
    label: 'Root note',
    options: NOTE_NAMES.map((n, i) => ({ value: String(i), label: n })),
    value: String(params.rootIdx),
    onChange: (v) => { params.rootIdx = Number(v); },
  });
  const scaleSel = select({
    label: 'Scale / mode',
    options: Object.entries(SCALES).map(([k, v]) => ({ value: k, label: v.name })),
    value: params.scaleKey,
    onChange: (v) => { params.scaleKey = v; },
  });
  const playB = button({ label: '▶ Play scale', primary: true, onClick: playScale });

  ctrlPanel.append(rootSel.el, scaleSel.el, row(playB));

  const animator = loop(() => draw());
  animator.start();
  return () => {
    if (audioCtx) try { audioCtx.close(); } catch {}
    animator.stop(); cv.destroy();
  };
}
