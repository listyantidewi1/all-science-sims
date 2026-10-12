import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Design units: 800 x 450. Track: 20 m from x = 120 to x = 780 (33 px per metre).
const SURFACES = [
  { name: 'Ice', mu: 0.05, color: '#bae6fd', detail: '#ffffff' },
  { name: 'Smooth wood', mu: 0.15, color: '#d6a86b', detail: '#b07f45' },
  { name: 'Carpet', mu: 0.4, color: '#e06666', detail: '#b73b3b' },
  { name: 'Sand', mu: 0.7, color: '#f3d58a', detail: '#c9a24d' },
];
const PUSHES = [
  { name: 'Small', v: 2 },
  { name: 'Medium', v: 3 },
  { name: 'Big', v: 4 },
];
const RAMPS = ['None', 'Low', 'High'];
const RAMP_H = [0, 0.1, 0.2]; // metres of height
const TRACK_M = 20;
const X0 = 120, PX_PER_M = 33, TRACK_Y = 300;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { surface: 1, push: 1, ramp: 0 };
  const st = { phase: 'ready', t: 0, x: 0, v: 0, dist: null, last: null, wheel: 0, lastSetup: null };

  function startPush() {
    st.t = 0; st.x = 0; st.wheel = 0;
    if (st.dist != null) st.last = st.dist;
    st.dist = null;
    const vp = PUSHES[p.push].v;
    st.v = Math.sqrt(vp * vp + 2 * 10 * RAMP_H[p.ramp]);
    st.phase = p.ramp > 0 ? 'ramp' : 'rolling';
  }

  function update(dt) {
    st.t += dt;
    if (st.phase === 'ramp') {
      if (st.t >= 0.7) { st.phase = 'rolling'; st.t = 0; }
      st.wheel += 6 * dt;
    } else if (st.phase === 'rolling') {
      dt *= 1.6; // play the roll a little faster than real time
      const a = SURFACES[p.surface].mu * 10;
      st.v -= a * dt;
      if (st.v <= 0) {
        st.v = 0; st.phase = 'stopped';
        st.dist = Math.min(TRACK_M, Math.round(st.x * 10) / 10);
        st.lastSetup = { surface: SURFACES[p.surface].name, push: PUSHES[p.push].name, ramp: RAMPS[p.ramp], dist: st.dist };
      }
      st.x += st.v * dt;
      if (st.x >= TRACK_M) { st.x = TRACK_M; st.v = 0; st.phase = 'stopped'; st.dist = TRACK_M; st.lastSetup = { surface: SURFACES[p.surface].name, push: PUSHES[p.push].name, ramp: RAMPS[p.ramp], dist: TRACK_M }; }
      st.wheel += st.v * dt * 3;
    }
  }

  function carPose() {
    const rampH = RAMP_H[p.ramp] * 250;
    const rampLen = rampH * 2.2;
    if (st.phase === 'ramp') {
      const u = (st.t / 0.7) ** 2;
      return { x: X0 - rampLen + u * rampLen, y: TRACK_Y - rampH + u * rampH, angle: Math.atan2(rampH, rampLen) };
    }
    if (st.phase === 'ready' && p.ramp > 0) return { x: X0 - rampLen, y: TRACK_Y - rampH, angle: Math.atan2(rampH, rampLen) };
    return { x: X0 + st.x * PX_PER_M, y: TRACK_Y, angle: 0 };
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const s = W / 800;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.scale(s, s);
    const sky = ctx.createLinearGradient(0, 0, 0, TRACK_Y);
    sky.addColorStop(0, '#bfdbfe'); sky.addColorStop(1, '#eff6ff');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, 800, TRACK_Y);
    ctx.fillStyle = '#86efac'; ctx.fillRect(0, TRACK_Y, 800, 150);

    // Surface strip
    const surf = SURFACES[p.surface];
    ctx.fillStyle = surf.color; ctx.fillRect(X0 - 10, TRACK_Y, 800 - X0 + 10, 26);
    ctx.fillStyle = surf.detail;
    if (p.surface === 0) { for (let x = X0; x < 800; x += 60) { ctx.globalAlpha = 0.7; ctx.fillRect(x + 10, TRACK_Y + 6, 30, 4); } ctx.globalAlpha = 1; }
    if (p.surface === 1) { for (let x = X0; x < 800; x += 70) ctx.fillRect(x, TRACK_Y, 3, 26); }
    if (p.surface === 2) { for (let x = X0; x < 800; x += 8) for (let y = TRACK_Y + 3; y < TRACK_Y + 26; y += 8) ctx.fillRect(x + (y % 16 ? 0 : 4), y, 3, 3); }
    if (p.surface === 3) { for (let x = X0; x < 800; x += 11) for (let y = TRACK_Y + 2; y < TRACK_Y + 26; y += 7) { ctx.beginPath(); ctx.arc(x + (y % 14 ? 0 : 5), y, 1.6, 0, Math.PI * 2); ctx.fill(); } }
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 20px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(surf.name, X0, TRACK_Y - 60);
    ctx.font = '600 15px system-ui, sans-serif'; ctx.fillStyle = '#475569';
    ctx.fillText(`${PUSHES[p.push].name} push` + (p.ramp ? ` + ${RAMPS[p.ramp].toLowerCase()} ramp` : ''), X0, TRACK_Y - 40);

    // Ramp
    const rampH = RAMP_H[p.ramp] * 250, rampLen = rampH * 2.2;
    if (p.ramp > 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.moveTo(X0 - rampLen - 8, TRACK_Y - rampH); ctx.lineTo(X0, TRACK_Y); ctx.lineTo(X0 - rampLen - 8, TRACK_Y); ctx.closePath(); ctx.fill();
    }

    // Ruler with big numbers
    ctx.fillStyle = '#fef08a'; ctx.fillRect(X0, TRACK_Y + 36, TRACK_M * PX_PER_M, 34);
    ctx.strokeStyle = '#854d0e'; ctx.lineWidth = 2; ctx.strokeRect(X0, TRACK_Y + 36, TRACK_M * PX_PER_M, 34);
    ctx.fillStyle = '#422006'; ctx.textAlign = 'center';
    for (let m = 0; m <= TRACK_M; m++) {
      const x = X0 + m * PX_PER_M;
      ctx.fillRect(x - 1, TRACK_Y + 36, 2, m % 2 === 0 ? 12 : 6);
      if (m % 2 === 0) { ctx.font = 'bold 16px system-ui, sans-serif'; ctx.fillText(String(m), x, TRACK_Y + 64); }
    }
    ctx.font = '600 13px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('metres', X0, TRACK_Y + 88);

    // Previous result (faded flag)
    if (st.last != null) drawFlag(ctx, X0 + st.last * PX_PER_M, 'rgba(100,116,139,0.6)', `last: ${st.last.toFixed(1)} m`, 18);
    // Current result
    if (st.dist != null) drawFlag(ctx, X0 + st.dist * PX_PER_M, '#dc2626', `${st.dist.toFixed(1)} m`, 28);

    // Car
    const c = carPose();
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.angle);
    const g = ctx.createLinearGradient(0, -40, 0, 0);
    g.addColorStop(0, '#60a5fa'); g.addColorStop(1, '#2563eb');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(64, -12); ctx.lineTo(64, -22); ctx.lineTo(48, -24); ctx.lineTo(38, -40); ctx.lineTo(14, -40); ctx.lineTo(6, -24); ctx.lineTo(0, -22); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e0f2fe'; ctx.fillRect(16, -37, 20, 12);
    for (const wx of [14, 50]) {
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(wx, -8, 10, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 3; ctx.beginPath();
      ctx.moveTo(wx, -8); ctx.lineTo(wx + Math.cos(st.wheel) * 7, -8 + Math.sin(st.wheel) * 7); ctx.stroke();
    }
    // Hand pushing at the start
    const pushing = (st.phase === 'ramp' && st.t < 0.3) || (st.phase === 'rolling' && st.t < 0.35 && p.ramp === 0);
    if (pushing || st.phase === 'ready') {
      ctx.fillStyle = '#f9c9a3';
      ctx.beginPath(); ctx.ellipse(-16, -22, 14, 11, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(-60, -28, 40, 12);
    }
    ctx.restore();

    ctx.textAlign = 'center'; ctx.fillStyle = '#1e293b'; ctx.font = 'bold 18px system-ui, sans-serif';
    if (st.phase === 'ready') ctx.fillText('Press Push!', 450, 60);
    else if (st.phase === 'stopped') ctx.fillText(`The car stopped after ${st.dist.toFixed(1)} m. Friction stopped it.`, 450, 60);
    else ctx.fillText('Rolling...', 450, 60);
    ctx.restore();
  }

  function drawFlag(ctx, x, color, text, size) {
    ctx.fillStyle = color;
    ctx.fillRect(x - 2, TRACK_Y - 90, 4, 90);
    ctx.beginPath(); ctx.moveTo(x, TRACK_Y - 90); ctx.lineTo(x + 34, TRACK_Y - 78); ctx.lineTo(x, TRACK_Y - 66); ctx.closePath(); ctx.fill();
    ctx.font = `bold ${size}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(text, Math.min(740, Math.max(60, x)), TRACK_Y - 100);
  }

  // Controls: big buttons that show which option is active.
  const big = (b) => { b.el.style.minHeight = '44px'; b.el.style.fontSize = '1rem'; b.el.style.padding = '10px 18px'; return b; };
  const group = (list, get, set) => {
    const btns = list.map((it, i) => big(button({ label: it.name, onClick: () => { set(i); refresh(); } })));
    const refresh = () => btns.forEach((b, i) => b.el.classList.toggle('btn--primary', get() === i));
    refresh();
    return row(...btns);
  };
  const labelled = (text, el) => {
    const wrap = document.createElement('div'); wrap.className = 'ctrl';
    const lab = document.createElement('label'); lab.textContent = text;
    wrap.append(lab, document.createElement('span'), el); el.style.gridColumn = '1 / -1';
    return wrap;
  };
  ctrlPanel.appendChild(labelled('Surface', group(SURFACES, () => p.surface, (i) => { p.surface = i; })));
  ctrlPanel.appendChild(labelled('Push', group(PUSHES, () => p.push, (i) => { p.push = i; })));
  const rampS = slider({ label: 'Ramp', key: 'ramp', min: 0, max: 2, step: 1, value: 0, format: (v) => RAMPS[v], onInput: (v) => { p.ramp = v; if (st.phase !== 'rolling' && st.phase !== 'ramp') st.phase = 'ready'; } });
  ctrlPanel.appendChild(rampS.el);
  const pushBtn = big(button({ label: 'Push!', primary: true, onClick: () => { if (st.phase !== 'rolling' && st.phase !== 'ramp') startPush(); } }));
  pushBtn.el.style.fontSize = '1.2rem';
  const resetBtn = big(button({ label: 'Reset', onClick: () => { st.phase = 'ready'; st.x = 0; st.v = 0; st.dist = null; st.last = null; st.lastSetup = null; } }));
  ctrlPanel.appendChild(row(pushBtn, resetBtn));

  const lab = labPanel({
    title: 'How far did the car go?',
    filename: 'push-pull-friction-lab.csv',
    columns: [
      { key: 'surface', label: 'Surface' },
      { key: 'push', label: 'Push' },
      { key: 'ramp', label: 'Ramp' },
      { key: 'dist', label: 'Distance (m)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Pick a surface and a push size.',
      'Press Push! Wait until the car stops.',
      'Read the ruler and press Record.',
      'Change only one thing. Push again and compare.',
    ],
    source: () => (st.lastSetup ? { ...st.lastSetup } : null),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { update(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
