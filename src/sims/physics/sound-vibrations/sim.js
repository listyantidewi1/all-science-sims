import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const INSTRUMENTS = [
  { id: 'drum', name: 'Drum', freqs: [90, 130, 180], wave: 'sine', lower: 'Bigger drum', higher: 'Smaller drum' },
  { id: 'guitar', name: 'Guitar string', freqs: [165, 220, 330], wave: 'triangle', lower: 'Loosen string', higher: 'Tighten string' },
  { id: 'fork', name: 'Tuning fork', freqs: [262, 392, 523], wave: 'sine', lower: 'Longer fork', higher: 'Shorter fork' },
];
const PITCH_WORDS = ['low', 'medium', 'high'];
const WOBBLE_HZ = [3, 5, 8];       // how fast the drawing shakes (slowed down so eyes can follow)
const WAVELENGTH = [130, 75, 42];  // px between wave crests in the trace
const DECAY = 1.6;                 // seconds for a hit to fade

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = { inst: 0, pitch: 1, strength: 0.5, hitAt: 0, sound: true };
  let now = 0;
  const envelope = () => Math.exp(-(now - state.hitAt) / DECAY);
  const inst = () => INSTRUMENTS[state.inst];

  // Audio is optional: created on the first click, and any failure is silent.
  let audio = null;
  function playTone() {
    if (!state.sound) return;
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume().catch(() => {});
      const t0 = audio.currentTime;
      const osc = audio.createOscillator();
      osc.type = inst().wave;
      osc.frequency.value = inst().freqs[state.pitch];
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.05 + 0.2 * state.strength, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + DECAY);
      osc.connect(gain); gain.connect(audio.destination);
      osc.start(t0); osc.stop(t0 + DECAY + 0.05);
    } catch { /* no sound available: the picture still works */ }
  }

  function hit(strength) {
    state.strength = strength;
    state.hitAt = now;
    playTone();
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);
    const env = envelope();
    const amp = state.strength * env;                     // 0..1 how big the wobble is
    const wob = Math.sin(now * WOBBLE_HZ[state.pitch] * Math.PI * 2) * amp;
    const cx = W * 0.5, top = H * 0.06, stageH = H * 0.56;
    const id = inst().id;

    if (id === 'drum') {
      const scale = [1.2, 1, 0.78][state.pitch];
      const rw = W * 0.16 * scale, rh = H * 0.18 * scale, rim = top + stageH * 0.42;
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(cx - rw, rim, rw * 2, rh);
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath(); ctx.ellipse(cx, rim + rh, rw, rh * 0.3, 0, 0, Math.PI); ctx.fill();
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.ellipse(cx, rim, rw, rh * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx - rw, rim);
      ctx.quadraticCurveTo(cx, rim + wob * rh * 0.9, cx + rw, rim);
      ctx.stroke();
    } else if (id === 'guitar') {
      const y = top + stageH * 0.5, x0 = W * 0.2, x1 = W * 0.8;
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x0 - 18, y - 60, 18, 120);
      ctx.fillRect(x1, y - 60, 18, 120);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = [7, 5, 3][state.pitch];
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.quadraticCurveTo(cx, y + wob * stageH * 0.7, x1, y);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = `bold ${Math.round(H * 0.04)}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(['loose', 'medium', 'tight'][state.pitch], x1 + 9, y - 72);
    } else {
      const len = stageH * [0.78, 0.62, 0.48][state.pitch];
      const base = top + stageH * 0.95, pw = 16, gap = 34;
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 10, base - stageH * 0.25, 20, stageH * 0.25);
      ctx.beginPath(); ctx.arc(cx, base - stageH * 0.25, gap + pw, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(cx, base - stageH * 0.25, gap - pw / 2, Math.PI, 0); ctx.fill();
      for (const s of [-1, 1]) {
        const bend = s * wob * 28;
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = pw; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx + s * gap, base - stageH * 0.25);
        ctx.quadraticCurveTo(cx + s * gap, base - stageH * 0.25 - len * 0.6, cx + s * gap + bend, base - stageH * 0.25 - len);
        ctx.stroke();
      }
      ctx.lineCap = 'butt';
    }

    // Wave trace panel
    const py = H * 0.68, ph = H * 0.3, mid = py + ph / 2;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, py, W, ph);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke();
    const A = ph * 0.42 * amp;
    const lam = WAVELENGTH[state.pitch];
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 3) {
      const y = mid - A * Math.sin((x / lam) * Math.PI * 2 - now * 6);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(H * 0.045)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(amp < 0.06 ? 'quiet' : state.strength > 0.75 ? 'LOUD' : 'soft', 16, py + 34);
    ctx.textAlign = 'right';
    ctx.fillText(`${PITCH_WORDS[state.pitch]} pitch`, W - 16, py + 34);
    ctx.textAlign = 'left';
  }

  // Controls
  const instRow = document.createElement('div');
  instRow.className = 'ctrl-row';
  const instBtns = INSTRUMENTS.map((it, i) => bigBtn(it.name, () => { state.inst = i; refresh(); hit(state.strength); }));
  instBtns.forEach((b) => instRow.appendChild(b.el));
  const softB = bigBtn('Hit softly', () => hit(0.4));
  const hardB = bigBtn('Hit hard', () => hit(1));
  hardB.el.style.background = '#dc2626'; hardB.el.style.color = '#fff';
  const lowerB = bigBtn(inst().lower, () => { state.pitch = Math.max(0, state.pitch - 1); refresh(); hit(state.strength); });
  const higherB = bigBtn(inst().higher, () => { state.pitch = Math.min(2, state.pitch + 1); refresh(); hit(state.strength); });
  const soundT = toggle({ label: 'Play sound', key: 'sound', value: true, onChange: (v) => { state.sound = v; } });
  function refresh() {
    instBtns.forEach((b, i) => b.el.classList.toggle('btn--primary', i === state.inst));
    lowerB.label = inst().lower;
    higherB.label = inst().higher;
    lowerB.el.disabled = state.pitch === 0;
    higherB.el.disabled = state.pitch === 2;
  }
  refresh();
  ctrlPanel.append(instRow, row(softB, hardB), row(lowerB, higherB), row(soundT));

  const lab = labPanel({
    title: 'Loud or quiet, high or low',
    filename: 'sound-vibrations-lab.csv',
    columns: [
      { key: 'instrument', label: 'Instrument' },
      { key: 'hit', label: 'Hit' },
      { key: 'loudness', label: 'Loudness' },
      { key: 'pitch', label: 'Pitch' },
    ],
    procedure: [
      'Pick the drum. Hit softly, look at the wave, and record.',
      'Hit hard and record again. Is the wave taller or shorter?',
      'Pick the guitar string. Tighten it and hit. Record. Are the waves closer together?',
      'Try the tuning fork: make it short. Is the sound high or low?',
    ],
    predict: 'Will a hard hit make a taller wave or a shorter wave? Will a tight string sound higher or lower?',
    source: () => ({
      instrument: inst().name,
      hit: state.strength > 0.75 ? 'hard' : 'soft',
      loudness: state.strength > 0.75 ? 'loud' : 'quiet',
      pitch: PITCH_WORDS[state.pitch],
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((_dt, t) => { now = t; draw(); });
  animator.start();
  return () => {
    animator.stop();
    if (audio) { try { audio.close(); } catch { /* already closed */ } }
    cv.destroy();
  };
}
