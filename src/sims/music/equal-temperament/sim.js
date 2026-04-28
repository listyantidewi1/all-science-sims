import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Intervals: name, semitones from root, just-intonation ratio.
const INTERVALS = [
  { name: 'Unison',          semis: 0,  num: 1,  den: 1  },
  { name: 'Minor 2nd',       semis: 1,  num: 16, den: 15 },
  { name: 'Major 2nd',       semis: 2,  num: 9,  den: 8  },
  { name: 'Minor 3rd',       semis: 3,  num: 6,  den: 5  },
  { name: 'Major 3rd',       semis: 4,  num: 5,  den: 4  },
  { name: 'Perfect 4th',     semis: 5,  num: 4,  den: 3  },
  { name: 'Tritone',         semis: 6,  num: 45, den: 32 },
  { name: 'Perfect 5th',     semis: 7,  num: 3,  den: 2  },
  { name: 'Minor 6th',       semis: 8,  num: 8,  den: 5  },
  { name: 'Major 6th',       semis: 9,  num: 5,  den: 3  },
  { name: 'Minor 7th',       semis: 10, num: 9,  den: 5  },
  { name: 'Major 7th',       semis: 11, num: 15, den: 8  },
  { name: 'Octave',          semis: 12, num: 2,  den: 1  },
];

const ROOT = 261.63; // C4

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    selected: 4, // major 3rd by default
  };

  // WebAudio
  let audioCtx = null;

  function ensureAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  function playInterval(mode, idx) {
    ensureAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const iv = INTERVALS[idx];
    const f1 = ROOT;
    const f2 = mode === 'et' ? ROOT * Math.pow(2, iv.semis / 12) : ROOT * (iv.num / iv.den);
    const start = audioCtx.currentTime;
    const dur = 1.5;
    for (const f of [f1, f2]) {
      const o = audioCtx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.18, start + 0.05);
      g.gain.linearRampToValueAtTime(0, start + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(start);
      o.stop(start + dur + 0.05);
    }
  }

  function centsDiff(idx) {
    const iv = INTERVALS[idx];
    const justCents = 1200 * Math.log2(iv.num / iv.den);
    const etCents = iv.semis * 100;
    return etCents - justCents;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const padX = 30;
    const rowH = (H - 80) / INTERVALS.length;

    // header
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 12px var(--font-mono)';
    ctx.fillText('INTERVAL', padX, 24);
    ctx.fillText('JUST RATIO', padX + 130, 24);
    ctx.fillText('JUST Hz', padX + 240, 24);
    ctx.fillText('ET Hz', padX + 320, 24);
    ctx.fillText('Δ (cents)', padX + 400, 24);
    ctx.fillText('CENTS DIFF (visual)', padX + 490, 24);

    for (let i = 0; i < INTERVALS.length; i++) {
      const iv = INTERVALS[i];
      const y = 36 + i * rowH;
      if (i === params.selected) {
        ctx.fillStyle = 'rgba(217,70,239,0.18)';
        ctx.fillRect(0, y - 2, W, rowH);
      }
      const justF = ROOT * (iv.num / iv.den);
      const etF = ROOT * Math.pow(2, iv.semis / 12);
      const cents = centsDiff(i);

      ctx.fillStyle = '#fff';
      ctx.font = '12px var(--font-sans)';
      ctx.fillText(iv.name, padX, y + 14);
      ctx.font = '12px var(--font-mono)';
      ctx.fillText(`${iv.num}:${iv.den}`, padX + 130, y + 14);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillText(justF.toFixed(2), padX + 240, y + 14);
      ctx.fillStyle = '#ec4899';
      ctx.fillText(etF.toFixed(2), padX + 320, y + 14);
      ctx.fillStyle = Math.abs(cents) < 4 ? '#10b981' : Math.abs(cents) < 12 ? '#fbbf24' : '#ef4444';
      ctx.fillText(`${cents >= 0 ? '+' : ''}${cents.toFixed(1)}`, padX + 400, y + 14);

      // visual cents bar
      const barX = padX + 490, barW = W - barX - 30;
      const barCx = barX + barW / 2;
      ctx.strokeStyle = 'rgba(120,130,150,0.3)';
      ctx.beginPath(); ctx.moveTo(barCx, y + 4); ctx.lineTo(barCx, y + rowH - 4); ctx.stroke();
      const len = Math.max(-1, Math.min(1, cents / 30)) * (barW / 2);
      ctx.fillStyle = cents >= 0 ? '#ec4899' : '#0ea5e9';
      ctx.fillRect(barCx, y + rowH / 2 - 4, len, 8);
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Click a row to select · play "just" or "ET" to hear the difference · root = C4 (261.63 Hz)', padX, H - 14);
  }

  // click on row to select
  cv.canvas.addEventListener('click', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const rowH = (cv.height - 80) / INTERVALS.length;
    const i = Math.floor((sy - 36) / rowH);
    if (i >= 0 && i < INTERVALS.length) params.selected = i;
  });

  const justB = button({ label: '▶ Play just', primary: true, onClick: () => playInterval('just', params.selected) });
  const etB = button({ label: '▶ Play ET', onClick: () => playInterval('et', params.selected) });
  const bothB = button({ label: 'Play both back-to-back', onClick: () => {
    playInterval('just', params.selected);
    setTimeout(() => playInterval('et', params.selected), 1700);
  } });
  ctrlPanel.append(row(justB, etB), row(bothB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); if (audioCtx) { try { audioCtx.close(); } catch {} } cv.destroy(); };
}
