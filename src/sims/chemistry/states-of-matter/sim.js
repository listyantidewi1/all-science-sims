import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const T_MIN = -20, T_MAX = 260;
const MATERIALS = [
  { id: 'water', name: 'Water', melt: 0, boil: 100, color: '#38bdf8', names: ['Ice', 'Water', 'Steam'] },
  { id: 'chocolate', name: 'Chocolate', melt: 30, boil: 180, color: '#b45309', names: ['Hard chocolate', 'Melted chocolate', 'Chocolate gas'] },
  { id: 'wax', name: 'Candle wax', melt: 55, boil: 230, color: '#facc15', names: ['Hard wax', 'Melted wax', 'Wax gas'] },
];
const COLS = 6, ROWS = 6, N = COLS * ROWS;
const SPACING = 0.11;

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

  const state = { material: 0, T: 25 };
  const mat = () => MATERIALS[state.material];
  const stateIdx = (T, m) => (T < m.melt ? 0 : T < m.boil ? 1 : 2);
  const STATE_WORDS = ['SOLID', 'LIQUID', 'GAS'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Particles live in box-relative coordinates (0..1) so resizing is free.
  const parts = [];
  for (let i = 0; i < N; i++) {
    const c = i % COLS, r = Math.floor(i / COLS);
    const hu = 0.5 + (c - (COLS - 1) / 2) * SPACING;
    const hv = 0.97 - (r + 0.5) * SPACING;
    parts.push({ u: hu, v: hv, hu, hv, vu: 0, vv: 0, ph: Math.random() * Math.PI * 2, ph2: Math.random() * Math.PI * 2 });
  }

  function step(dt, t) {
    const m = mat();
    const s = stateIdx(state.T, m);
    const r = SPACING * 0.42; // particle radius in box units
    if (s === 0) {
      const warmth = clamp((state.T - (m.melt - 60)) / 60, 0, 1);
      const amp = 0.003 + 0.012 * warmth;
      const k = 1 - Math.exp(-8 * dt);
      for (const p of parts) {
        const tu = p.hu + amp * Math.sin(t * 26 + p.ph);
        const tv = p.hv + amp * Math.cos(t * 23 + p.ph2);
        p.u += (tu - p.u) * k; p.v += (tv - p.v) * k;
        p.vu = 0; p.vv = 0;
      }
      return;
    }
    const gas = s === 2;
    const frac = gas ? clamp((state.T - m.boil) / 100, 0, 1) : clamp((state.T - m.melt) / (m.boil - m.melt), 0, 1);
    const target = gas ? 0.9 + 0.9 * frac : 0.22 + 0.33 * frac;
    for (const p of parts) {
      p.vu += (Math.random() - 0.5) * 3 * dt;
      p.vv += (Math.random() - 0.5) * 3 * dt;
      if (!gas) p.vv += 1.6 * dt; // gravity keeps the liquid at the bottom
      const sp = Math.hypot(p.vu, p.vv) || 1e-6;
      const ns = sp + (target - sp) * Math.min(1, 3 * dt);
      p.vu *= ns / sp; p.vv *= ns / sp;
    }
    if (!gas) {
      // Soft repulsion so liquid particles slide past each other instead of piling up.
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const a = parts[i], b = parts[j];
        const dx = b.u - a.u, dy = b.v - a.v;
        const d = Math.hypot(dx, dy) || 1e-6;
        if (d < 2 * r) {
          const push = (2 * r - d) * 0.5;
          const nx = dx / d, ny = dy / d;
          a.u -= nx * push; a.v -= ny * push;
          b.u += nx * push; b.v += ny * push;
        }
      }
    }
    for (const p of parts) {
      p.u += p.vu * dt; p.v += p.vv * dt;
      if (p.u < r) { p.u = r; p.vu = Math.abs(p.vu); }
      if (p.u > 1 - r) { p.u = 1 - r; p.vu = -Math.abs(p.vu); }
      if (p.v < r) { p.v = r; p.vv = Math.abs(p.vv); }
      if (p.v > 1 - r) { p.v = 1 - r; p.vv = -Math.abs(p.vv) * (gas ? 1 : 0.3); }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);
    const m = mat();
    const s = stateIdx(state.T, m);

    // Box of particles
    const bx = W * 0.05, by = H * 0.2, bw = W * 0.58, bh = H * 0.72;
    ctx.fillStyle = s === 2 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    ctx.strokeRect(bx, by, bw, bh);
    const pr = SPACING * 0.42 * Math.min(bw, bh);
    for (const p of parts) {
      const x = bx + p.u * bw, y = by + p.v * bh;
      if (s === 2) {
        ctx.fillStyle = m.color + '55';
        ctx.beginPath(); ctx.arc(x, y, pr * 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = m.color;
      ctx.beginPath(); ctx.arc(x, y, pr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath(); ctx.arc(x - pr * 0.3, y - pr * 0.3, pr * 0.3, 0, Math.PI * 2); ctx.fill();
    }

    // Big state word
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(H * 0.09)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(STATE_WORDS[s], bx + bw / 2, H * 0.1);
    ctx.fillStyle = m.color;
    ctx.font = `bold ${Math.round(H * 0.045)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(m.names[s], bx + bw / 2, H * 0.165);

    // Thermometer
    const tx = W * 0.78, top = H * 0.08, bot = H * 0.68, tw = W * 0.045;
    const yOf = (T) => bot - ((T - T_MIN) / (T_MAX - T_MIN)) * (bot - top);
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath(); ctx.roundRect(tx - tw / 2, top - tw / 2, tw, bot - top + tw, tw / 2); ctx.fill();
    ctx.beginPath(); ctx.arc(tx, bot + tw * 0.9, tw * 1.1, 0, Math.PI * 2); ctx.fill();
    const hot = (state.T - T_MIN) / (T_MAX - T_MIN);
    ctx.fillStyle = hot < 0.3 ? '#3b82f6' : hot < 0.6 ? '#f97316' : '#ef4444';
    ctx.beginPath(); ctx.arc(tx, bot + tw * 0.9, tw * 0.85, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(tx - tw * 0.22, yOf(state.T), tw * 0.44, bot + tw * 0.9 - yOf(state.T));
    ctx.textAlign = 'left';
    ctx.font = `bold ${Math.round(H * 0.038)}px system-ui, -apple-system, Roboto, sans-serif`;
    for (const [T, label, color] of [[m.melt, 'Freezing', '#60a5fa'], [m.boil, 'Boiling', '#f87171']]) {
      const y = yOf(T);
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(tx - tw, y); ctx.lineTo(tx + tw, y); ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillText(`${label} ${T}°`, tx + tw * 1.3, y + 5);
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.round(H * 0.07)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(`${Math.round(state.T)}°C`, tx, H * 0.96);
    ctx.textAlign = 'left';
  }

  // Controls
  const matRow = document.createElement('div');
  matRow.className = 'ctrl-row';
  const matBtns = MATERIALS.map((m, i) => bigBtn(m.name, () => { state.material = i; refresh(); }));
  matBtns.forEach((b) => matRow.appendChild(b.el));
  const tempS = slider({ label: 'Temperature (°C)', key: 'temp', min: T_MIN, max: T_MAX, step: 5, value: state.T,
    format: (v) => `${Math.round(v)}°C`, onInput: (v) => { state.T = v; } });
  const coolB = bigBtn('Cool −', () => tempS.apply(state.T - 10));
  const heatB = bigBtn('Heat +', () => tempS.apply(state.T + 10));
  coolB.el.style.background = '#1d4ed8'; coolB.el.style.color = '#fff';
  heatB.el.style.background = '#dc2626'; heatB.el.style.color = '#fff';
  function refresh() {
    matBtns.forEach((b, i) => b.el.classList.toggle('btn--primary', i === state.material));
  }
  refresh();
  ctrlPanel.append(matRow, row(coolB, heatB), tempS.el);

  const lab = labPanel({
    title: 'Melting and boiling lab',
    filename: 'states-of-matter-lab.csv',
    columns: [
      { key: 'material', label: 'Material' },
      { key: 'T', label: 'Temperature (°C)' },
      { key: 'state', label: 'State' },
    ],
    procedure: [
      'Pick Water. Press Cool until the particles stop moving around. Record.',
      'Press Heat one step at a time. Record when it turns to liquid, and again when it turns to gas.',
      'Pick Chocolate, then Candle wax. Find the temperature where each one melts.',
      'Look at your table: which material melts first when you heat it?',
    ],
    predict: 'Will chocolate melt at a colder or a hotter temperature than ice? Write your guess.',
    source: () => {
      const m = mat();
      return { material: m.name, T: Math.round(state.T), state: STATE_WORDS[stateIdx(state.T, m)].toLowerCase() };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { step(dt, t); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
