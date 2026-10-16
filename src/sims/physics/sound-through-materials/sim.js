import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Bell and ear are DIST metres apart; the wavefront crosses the screen in real
// time at the medium's speed of sound, so the stopwatch reads DIST / speed.
const DIST = 1000; // m
const MEDIA = [
  { id: 'air', en: 'Air', id_: 'Udara', speed: 343, dots: 0.055, fill: '#0f2a4a', carries: true },
  { id: 'water', en: 'Water', id_: 'Air', speed: 1480, dots: 0.038, fill: '#0c3d6e', carries: true },
  { id: 'steel', en: 'Steel rod', id_: 'Batang baja', speed: 5100, dots: 0.028, fill: '#3b4252', carries: true },
  { id: 'vacuum', en: 'Vacuum jar', id_: 'Tabung hampa', speed: 0, dots: 0, fill: '#0b1220', carries: false },
];
const VACUUM_WAIT = 4; // s before we say "nothing arrived"

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
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

  const state = {
    medium: MEDIA[0], pitch: 3, loud: 3,
    ringing: false, ringAt: 0, arrived: false, arrivedAt: 0, failed: false,
    last: null,  // last completed ring for the lab
  };
  let now = 0;

  const name = (m) => (getLocale() === 'id' ? m.id_ : m.en);
  const travelTime = () => (state.medium.speed > 0 ? DIST / state.medium.speed : Infinity);
  // Region between bell and ear (fractions of the canvas)
  const X0 = 0.2, X1 = 0.8, Y0 = 0.3, Y1 = 0.74;

  function ring() {
    state.ringing = true; state.ringAt = now; state.arrived = false; state.failed = false;
  }

  function step() {
    if (!state.ringing) return;
    const el = now - state.ringAt;
    const tt = travelTime();
    if (!state.arrived && !state.failed) {
      if (state.medium.carries && el >= tt) {
        state.arrived = true; state.arrivedAt = now;
        state.last = { medium: name(state.medium), time: Number(tt.toFixed(2)), heard: 'yes' };
      } else if (!state.medium.carries && el >= VACUUM_WAIT) {
        state.failed = true;
        state.last = { medium: name(state.medium), time: 'never', heard: 'no' };
      }
    }
    if (el > Math.max(tt + 3, VACUUM_WAIT + 3) && Number.isFinite(tt + 3)) state.ringing = false;
    if (!state.medium.carries && el > VACUUM_WAIT + 3) state.ringing = false;
  }

  // Wave description for drawing
  function wave() {
    const W = cv.width, H = cv.height;
    const lambda = W * (0.16 / state.pitch);               // px: higher pitch → shorter wavelength
    const amp = H * 0.02 * state.loud;                     // px: louder → taller
    const omega = 2 * Math.PI * (1.2 + state.pitch * 0.6); // rad/s for the drawn oscillation
    return { lambda, amp, omega };
  }
  function frontX() {
    // fraction across the region reached by the sound so far (0..1); NaN-safe
    if (!state.ringing || !state.medium.carries) return 0;
    const tt = travelTime();
    if (!Number.isFinite(tt) || tt <= 0) return 0;
    return Math.max(0, Math.min(1, (now - state.ringAt) / tt));
  }

  function drawBell(ctx) {
    const W = cv.width, H = cv.height;
    const bx = W * 0.1, by = H * 0.5, s = Math.min(W * 0.08, H * 0.2);
    const el = now - state.ringAt;
    const swing = state.ringing && el < 1.2 ? Math.sin(el * 25) * 0.25 * (1 - el / 1.2) : 0;
    ctx.save();
    ctx.translate(bx, by - s);
    ctx.rotate(swing);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(-s * 0.12, 0);
    ctx.bezierCurveTo(-s * 0.7, s * 0.1, -s * 0.55, s * 1.1, -s * 0.85, s * 1.25);
    ctx.lineTo(s * 0.85, s * 1.25);
    ctx.bezierCurveTo(s * 0.55, s * 1.1, s * 0.7, s * 0.1, s * 0.12, 0);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#b45309'; ctx.beginPath(); ctx.arc(0, s * 1.3, s * 0.14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(0, -s * 0.05, s * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // hanger
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx, by - s * 1.05); ctx.lineTo(bx, H * 0.12); ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.max(11, Math.round(H * 0.04))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(T('Bell', 'Bel'), bx, by + s * 0.65);
  }

  function drawEar(ctx) {
    const W = cv.width, H = cv.height;
    const ex = W * 0.9, ey = H * 0.5, s = Math.min(W * 0.07, H * 0.18);
    const heard = state.arrived && now - state.arrivedAt < 1.5;
    ctx.strokeStyle = '#fcd9b6'; ctx.lineWidth = Math.max(4, s * 0.12); ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(ex - s * 0.1, ey - s * 0.6);
    ctx.bezierCurveTo(ex - s * 0.9, ey - s * 0.9, ex - s * 0.9, ey + s * 0.3, ex - s * 0.3, ey + s * 0.3);
    ctx.bezierCurveTo(ex - s * 0.05, ey + s * 0.6, ex + s * 0.2, ey + s * 0.3, ex + s * 0.1, ey);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ex - s * 0.1, ey - s * 0.6);
    ctx.bezierCurveTo(ex + s * 0.6, ey - s * 0.7, ex + s * 0.5, ey + s * 0.4, ex - s * 0.1, ey + s * 0.1);
    ctx.stroke();
    ctx.lineCap = 'butt';
    if (heard) {
      const k = (now - state.arrivedAt) / 1.5;
      ctx.strokeStyle = `rgba(74,222,128,${(1 - k).toFixed(2)})`; ctx.lineWidth = 3;
      for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(ex - s * 0.3, ey - s * 0.2, s * (0.9 + i * 0.35 + k * 0.6), Math.PI * 0.7, Math.PI * 1.3); ctx.stroke(); }
    }
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.max(11, Math.round(H * 0.04))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(T('Ear', 'Telinga'), ex, ey + s * 1.1);
    // loudness bar at the ear
    const bw = Math.max(10, W * 0.025), bh = H * 0.3, bx0 = ex - bw / 2, by0 = H * 0.86;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(bx0, by0 - bh, bw, bh, bw / 2); ctx.fill();
    let level = 0;
    if (state.arrived) { const k = Math.min(1, (now - state.arrivedAt) / 0.3); level = (state.loud / 5) * k; }
    if (level > 0) { ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.roundRect(bx0, by0 - bh * level, bw, bh * level, bw / 2); ctx.fill(); }
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${Math.max(10, Math.round(H * 0.033))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(T('loudness', 'kekerasan'), ex, by0 + H * 0.045);
  }

  function drawMedium(ctx) {
    const W = cv.width, H = cv.height;
    const m = state.medium;
    const rx = X0 * W, ry = Y0 * H, rw = (X1 - X0) * W, rh = (Y1 - Y0) * H;
    const { lambda, amp, omega } = wave();
    const fx = frontX();
    // container
    ctx.fillStyle = m.fill;
    if (m.id === 'steel') { ctx.beginPath(); ctx.roundRect(rx, ry + rh * 0.3, rw, rh * 0.4, 8); ctx.fill(); }
    else { ctx.beginPath(); ctx.roundRect(rx, ry, rw, rh, 16); ctx.fill(); }
    if (m.id === 'vacuum') {
      ctx.strokeStyle = 'rgba(203,213,225,0.7)'; ctx.lineWidth = 4; ctx.setLineDash([]);
      ctx.beginPath(); ctx.roundRect(rx, ry, rw, rh, 16); ctx.stroke();
      ctx.fillStyle = 'rgba(203,213,225,0.08)'; ctx.fillRect(rx + rw * 0.05, ry + rh * 0.1, rw * 0.06, rh * 0.8);
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.font = `${Math.max(11, Math.round(H * 0.04))}px system-ui, -apple-system, Roboto, sans-serif`;
      ctx.fillText(T('no particles here', 'tidak ada partikel di sini'), rx + rw / 2, ry + rh * 0.55);
    }
    // particles (longitudinal wobble where the wave has reached)
    if (m.dots > 0) {
      const sp = Math.max(8, Math.min(W, H) * m.dots);
      const yTop = m.id === 'steel' ? ry + rh * 0.3 + sp * 0.6 : ry + sp * 0.6;
      const yBot = m.id === 'steel' ? ry + rh * 0.7 - sp * 0.4 : ry + rh - sp * 0.4;
      const frontPx = rx + rw * fx;
      ctx.fillStyle = m.id === 'steel' ? '#cbd5e1' : m.id === 'water' ? '#7dd3fc' : '#94a3b8';
      const r = Math.max(1.5, sp * 0.12);
      for (let y = yTop; y <= yBot; y += sp) {
        for (let x = rx + sp * 0.6; x < rx + rw - sp * 0.3; x += sp) {
          let dx = 0;
          if (state.ringing && x <= frontPx) dx = Math.min(sp * 0.4, amp * 0.5) * Math.sin((2 * Math.PI * (x - rx)) / lambda - omega * (now - state.ringAt));
          ctx.beginPath(); ctx.arc(x + dx, y, r, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    // the drawn wave (picture of the sound) up to the front
    if (state.ringing && m.carries && fx > 0) {
      const yMid = ry + rh / 2;
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
      ctx.beginPath();
      const xEnd = rx + rw * fx;
      for (let x = rx; x <= xEnd; x += 2) {
        const y = yMid - amp * Math.sin((2 * Math.PI * (x - rx)) / lambda - omega * (now - state.ringAt));
        if (x === rx) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // wavefront marker
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(xEnd, yMid, 6, 0, Math.PI * 2); ctx.fill();
    }
    // distance label
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
    ctx.font = `${Math.max(11, Math.round(H * 0.038))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(`← 1 km →`, rx + rw / 2, ry + rh + H * 0.06);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.max(12, Math.round(H * 0.045))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(name(m) + (m.speed ? `  —  ${m.speed} m/s` : ''), rx + rw / 2, ry - H * 0.04);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawMedium(ctx);
    drawBell(ctx);
    drawEar(ctx);
    // stopwatch / message (top)
    const fs = Math.max(12, Math.round(H * 0.05));
    ctx.textAlign = 'center';
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    let text, color = '#facc15';
    if (!state.ringing) { text = T('Press "Ring the bell"', 'Tekan "Bunyikan bel"'); color = '#e2e8f0'; }
    else if (state.arrived) { text = `${T('Travel time', 'Waktu rambat')}: ${travelTime().toFixed(2)} s — ${T('heard!', 'terdengar!')}`; color = '#4ade80'; }
    else if (state.failed) { text = T('No sound arrives — a vacuum has nothing to carry it', 'Tidak ada bunyi yang sampai — ruang hampa tidak punya apa pun untuk membawanya'); color = '#fb923c'; }
    else { text = `${T('Time', 'Waktu')}: ${(now - state.ringAt).toFixed(2)} s`; }
    ctx.fillStyle = color;
    ctx.fillText(text, W * 0.5, H * 0.12);
    ctx.textAlign = 'left';
  }

  // Controls
  const medSel = select({
    label: T('What is in between?', 'Apa yang ada di antaranya?'), key: 'medium',
    options: MEDIA.map((m) => ({ value: m.id, label: name(m) })),
    value: 'air',
    onChange: (v) => { state.medium = MEDIA.find((m) => m.id === v) || MEDIA[0]; state.ringing = false; state.arrived = false; state.failed = false; },
  });
  const ringB = bigBtn(T('Ring the bell', 'Bunyikan bel'), () => ring(), true);
  const pitchS = slider({
    label: T('Pitch (low → high)', 'Nada (rendah → tinggi)'), key: 'pitch', min: 1, max: 5, step: 1, value: 3,
    format: (v) => (v <= 2 ? T('low', 'rendah') : v >= 4 ? T('high', 'tinggi') : T('middle', 'sedang')), onInput: (v) => { state.pitch = v; },
  });
  const loudS = slider({
    label: T('Loudness (quiet → loud)', 'Kekerasan (lembut → keras)'), key: 'loud', min: 1, max: 5, step: 1, value: 3,
    format: (v) => (v <= 2 ? T('quiet', 'lembut') : v >= 4 ? T('loud', 'keras') : T('middle', 'sedang')), onInput: (v) => { state.loud = v; },
  });
  ctrlPanel.append(row(medSel, ringB), row(pitchS, loudS));

  const lab = labPanel({
    title: 'How fast does sound travel?',
    filename: 'sound-through-materials-data.csv',
    columns: [
      { key: 'medium', label: 'Medium' },
      { key: 'time', label: 'Travel time over 1 km (s)' },
      { key: 'heard', label: 'Heard at the ear?' },
    ],
    procedure: [
      'Choose Air and ring the bell. When the sound arrives, press Record.',
      'Do the same for Water and for the Steel rod.',
      'Choose the Vacuum jar, ring the bell and wait. Press Record.',
      'Put the media in order from fastest to slowest. Which kind of material is fastest: gas, liquid or solid?',
      'Ring again in air with Loudness at maximum. Does the travel time change?',
    ],
    predict: 'Which will carry the sound fastest: air, water or steel? Will any sound get through the vacuum jar?',
    source: () => state.last,
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
