import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';

// Two-octave piano starting at C4. Pitch class index 0..11 = C..B.
const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const KEYS = []; // each: { idx, name, isBlack }
for (let octave = 0; octave < 2; octave++) {
  for (let i = 0; i < 12; i++) {
    const isBlack = [1, 3, 6, 8, 10].includes(i);
    KEYS.push({ idx: octave * 12 + i, name: NOTE_NAMES[i] + (octave + 4), isBlack, pitch: 261.63 * Math.pow(2, (octave * 12 + i) / 12) });
  }
}

// Recognize a chord by sorted pitch-class intervals from the lowest note.
const CHORD_PATTERNS = [
  { pattern: [0, 4, 7], name: 'major' },
  { pattern: [0, 3, 7], name: 'minor' },
  { pattern: [0, 3, 6], name: 'diminished' },
  { pattern: [0, 4, 8], name: 'augmented' },
  { pattern: [0, 5, 7], name: 'sus4' },
  { pattern: [0, 2, 7], name: 'sus2' },
  { pattern: [0, 4, 7, 10], name: 'dominant 7' },
  { pattern: [0, 4, 7, 11], name: 'major 7' },
  { pattern: [0, 3, 7, 10], name: 'minor 7' },
  { pattern: [0, 3, 6, 10], name: 'half-dim 7 (m7♭5)' },
  { pattern: [0, 3, 6, 9], name: 'fully diminished 7' },
  { pattern: [0, 4, 7, 9], name: '6 (major 6)' },
  { pattern: [0, 4, 7, 14 % 12 || 14], name: 'add9' }, // add9 = root,3,5,9
];

function recognizeChord(activeIdxs) {
  if (activeIdxs.length === 0) return { root: null, name: null };
  const sorted = [...activeIdxs].sort((a, b) => a - b);
  const root = sorted[0];
  const intervals = sorted.map((i) => (i - root) % 12).sort((a, b) => a - b);
  // Try every match (set semantics)
  for (const cp of CHORD_PATTERNS) {
    const want = [...new Set(cp.pattern.map((p) => p % 12))].sort((a, b) => a - b);
    const got = [...new Set(intervals)].sort((a, b) => a - b);
    if (want.length === got.length && want.every((v, i) => v === got[i])) {
      return { root, rootName: NOTE_NAMES[root % 12], name: cp.name };
    }
  }
  return { root, rootName: NOTE_NAMES[root % 12], name: null };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 7 });

  // active set of key indices
  const active = new Set();

  let audioCtx = null;
  function ensure() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playChord() {
    if (active.size === 0) return;
    ensure();
    const t0 = audioCtx.currentTime;
    for (const i of active) {
      const k = KEYS[i];
      const o = audioCtx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = k.pitch;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.10, t0 + 0.02);
      g.gain.linearRampToValueAtTime(0, t0 + 1.5);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t0); o.stop(t0 + 1.55);
    }
  }

  // Layout: 14 white keys (2 octaves), black keys overlaid.
  let layout = null;

  function drawKeyboard(ctx, x, y, w, h) {
    const whiteKeys = KEYS.filter((k) => !k.isBlack);
    const wKeyW = w / whiteKeys.length;
    layout = { x, y, w, h, whiteKeys, wKeyW };

    // White keys
    for (let i = 0; i < whiteKeys.length; i++) {
      const k = whiteKeys[i];
      const wx = x + i * wKeyW;
      ctx.fillStyle = active.has(k.idx) ? '#fbbf24' : '#fff';
      ctx.fillRect(wx, y, wKeyW - 1, h);
      ctx.strokeStyle = '#0b1220';
      ctx.lineWidth = 1;
      ctx.strokeRect(wx, y, wKeyW - 1, h);
      ctx.fillStyle = '#0b1220';
      ctx.font = '11px var(--font-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(k.name, wx + wKeyW / 2, y + h - 8);
      ctx.textAlign = 'left';
    }

    // Black keys overlaid
    const bKeyW = wKeyW * 0.6;
    const bKeyH = h * 0.62;
    for (let i = 0; i < KEYS.length; i++) {
      const k = KEYS[i];
      if (!k.isBlack) continue;
      // The black key sits between two white keys; compute its left edge.
      const whiteIdx = whiteKeys.findIndex((w) => w.idx === k.idx + 1) - 1;
      if (whiteIdx < 0) continue;
      const wx = x + whiteIdx * wKeyW + wKeyW - bKeyW / 2;
      ctx.fillStyle = active.has(k.idx) ? '#fbbf24' : '#0b1220';
      ctx.fillRect(wx, y, bKeyW, bKeyH);
      if (active.has(k.idx)) {
        ctx.fillStyle = '#0b1220';
        ctx.font = '10px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(k.name, wx + bKeyW / 2, y + bKeyH - 6);
        ctx.textAlign = 'left';
      }
    }
  }

  function keyAt(sx, sy) {
    if (!layout) return -1;
    const { x, y, w, h, whiteKeys, wKeyW } = layout;
    if (sx < x || sx > x + w || sy < y || sy > y + h) return -1;
    // Black keys first (they sit on top)
    const bKeyW = wKeyW * 0.6;
    const bKeyH = h * 0.62;
    for (let i = 0; i < KEYS.length; i++) {
      const k = KEYS[i];
      if (!k.isBlack) continue;
      const whiteIdx = whiteKeys.findIndex((w) => w.idx === k.idx + 1) - 1;
      if (whiteIdx < 0) continue;
      const wx = x + whiteIdx * wKeyW + wKeyW - bKeyW / 2;
      if (sx >= wx && sx <= wx + bKeyW && sy >= y && sy <= y + bKeyH) return k.idx;
    }
    // White keys
    const i = Math.floor((sx - x) / wKeyW);
    if (i >= 0 && i < whiteKeys.length) return whiteKeys[i].idx;
    return -1;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30;
    const kbY = 50;
    const kbH = H - kbY - 80;
    drawKeyboard(ctx, padX, kbY, W - padX * 2, kbH);

    // Recognize chord
    const r = recognizeChord([...active]);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, W - 16, 32);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    if (r.name) ctx.fillText(`${r.rootName} ${r.name}`, 16, 30);
    else if (active.size > 0) ctx.fillText(`${[...active].length} notes — no standard chord match`, 16, 30);
    else ctx.fillText('Click keys to build a chord', 16, 30);

    // Bottom hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click any key to toggle; click Play to hear the chord', padX, H - 14);
  }

  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const k = keyAt(sx, sy);
    if (k < 0) return;
    if (active.has(k)) active.delete(k); else active.add(k);
  });

  // controls
  const playB = button({ label: '▶ Play chord', primary: true, onClick: playChord });
  const clearB = button({ label: 'Clear', onClick: () => active.clear() });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, idxs] of [
    ['C major',     [0, 4, 7]],
    ['C minor',     [0, 3, 7]],
    ['C dom 7',     [0, 4, 7, 10]],
    ['C maj 7',     [0, 4, 7, 11]],
    ['C dim',       [0, 3, 6]],
    ['F major',     [5, 9, 12]],
    ['G7',          [7, 11, 14, 17]],
  ]) {
    const b = button({ label: name, onClick: () => { active.clear(); for (const i of idxs) active.add(i); } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(row(playB, clearB), presetRow);

  const animator = loop(() => draw());
  animator.start();
  return () => {
    if (audioCtx) try { audioCtx.close(); } catch {}
    animator.stop(); cv.destroy();
  };
}
