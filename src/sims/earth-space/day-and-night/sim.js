import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';

const CITIES = [
  { name: 'Jakarta',  lon: 107, color: '#f472b6' },
  { name: 'London',   lon: 0,   color: '#facc15' },
  { name: 'New York', lon: -74, color: '#4ade80' },
];
const TAU = Math.PI * 2;
// Decorative continents: [angle on the globe, distance from centre (0..1), size]
const LAND = [[0.2, 0.55, 0.3], [1.3, 0.3, 0.35], [2.4, 0.6, 0.25], [3.5, 0.45, 0.4], [4.6, 0.65, 0.22], [5.5, 0.25, 0.3]];
const STARS = Array.from({ length: 70 }, (_, i) => [((i * 97) % 101) / 101, ((i * 53) % 89) / 89, 1 + (i % 3)]);

// Local hour of a place <-> its angle on the globe seen from above the North Pole.
// The Sun is to the left, so noon points left (angle pi) and the Earth turns anticlockwise.
const hourToAngle = (h) => Math.PI / 2 + ((h - 6) / 24) * TAU;
const angleToHour = (a) => ((((a - Math.PI / 2) / TAU) * 24 + 6) % 24 + 24) % 24;
const sunHeight = (h) => Math.cos(((h - 12) / 24) * TAU); // 1 at noon, -1 at midnight
const fmt = (h) => `${String(Math.floor(h) % 24).padStart(2, '0')}:${String(Math.round((h % 1) * 60) % 60).padStart(2, '0')}`;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = { city: 0, hour: 9, playing: false };
  let L = null;

  function layout() {
    const W = cv.width, H = cv.height;
    return { W, H, ex: W * 0.33, ey: H * 0.52, R: Math.min(W * 0.12, H * 0.3), sx: W * 0.07, sy: H * 0.52, sr: Math.min(W * 0.06, H * 0.14) };
  }
  function cityAngle(i) {
    const sel = CITIES[state.city];
    return hourToAngle(state.hour) + (CITIES[i].lon - sel.lon) * (Math.PI / 180);
  }
  function cityPos(i, r = 0.93) {
    const a = cityAngle(i);
    return { x: L.ex + Math.cos(a) * L.R * r, y: L.ey - Math.sin(a) * L.R * r };
  }
  function shadowWord(h) {
    const alt = sunHeight(h);
    if (alt <= 0) return 'none';
    const len = 1 / Math.tan(Math.asin(Math.min(1, alt)));
    return len < 0.8 ? 'short' : len < 2 ? 'medium' : 'long';
  }

  function draw() {
    const ctx = cv.ctx;
    L = layout();
    const { W, H, ex, ey, R, sx, sy, sr } = L;
    if (W < 20 || H < 20) return;

    // ---- Left: space, Sun, spinning Earth ----
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(0, 0, W / 2, H);
    ctx.fillStyle = '#e2e8f0';
    for (const [u, v, r] of STARS) { ctx.beginPath(); ctx.arc(u * W * 0.5, v * H, r * 0.6, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = 'rgba(253,224,71,0.25)';
    ctx.lineWidth = 3;
    for (let k = -3; k <= 3; k++) {
      const yy = ey + k * R * 0.3;
      ctx.beginPath(); ctx.moveTo(sx + sr, yy); ctx.lineTo(ex - Math.sqrt(Math.max(0, R * R - (yy - ey) ** 2)) - 6, yy); ctx.stroke();
    }
    const sunGrad = ctx.createRadialGradient(sx, sy, sr * 0.6, sx, sy, sr * 2.2);
    sunGrad.addColorStop(0, 'rgba(253,224,71,0.6)'); sunGrad.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath(); ctx.arc(sx, sy, sr * 2.2, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, TAU); ctx.fill();

    // Earth: ocean, land turning with the spin, then the night half
    const spin = cityAngle(0) - CITIES[0].lon * (Math.PI / 180);
    ctx.save();
    ctx.beginPath(); ctx.arc(ex, ey, R, 0, TAU); ctx.clip();
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(ex - R, ey - R, 2 * R, 2 * R);
    ctx.fillStyle = '#4ade80';
    for (const [a, d, s] of LAND) {
      const ang = spin + a;
      ctx.beginPath(); ctx.ellipse(ex + Math.cos(ang) * R * d, ey - Math.sin(ang) * R * d, R * s, R * s * 0.6, -ang, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = 'rgba(2,6,23,0.72)';
    ctx.beginPath(); ctx.arc(ex, ey, R, -Math.PI / 2, Math.PI / 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(ex, ey, R, 0, TAU); ctx.stroke();
    // spin arrow (anticlockwise)
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(ex, ey, R + 22, -Math.PI / 2 + 0.5, -Math.PI / 2 - 0.4, true); ctx.stroke();
    const ax = ex + Math.cos(-Math.PI / 2 - 0.4) * (R + 22), ay = ey + Math.sin(-Math.PI / 2 - 0.4) * (R + 22);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(ax - 10, ay - 8); ctx.lineTo(ax - 10, ay + 12); ctx.lineTo(ax + 8, ay + 4); ctx.fill();

    // Cities on the rim, plus a colour-matched list saying day or night
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'left';
    for (let i = 0; i < CITIES.length; i++) {
      const p = cityPos(i), sel = i === state.city;
      const h = angleToHour(cityAngle(i));
      ctx.fillStyle = CITIES[i].color;
      ctx.beginPath(); ctx.arc(p.x, p.y, sel ? 13 : 9, 0, TAU); ctx.fill();
      if (sel) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke(); }
      const ly = 62 + i * 26;
      ctx.beginPath(); ctx.arc(26, ly - 5, sel ? 9 : 6, 0, TAU); ctx.fill();
      ctx.fillText(`${CITIES[i].name}: ${sunHeight(h) > 0 ? 'day' : 'night'}`, 42, ly);
    }
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText('Earth spins, seen from above', 16, 30);

    // ---- Right: the ground, the child, the stick and its shadow ----
    const px = W / 2, pw = W / 2, horizon = H * 0.76;
    const alt = sunHeight(state.hour);
    ctx.fillStyle = skyColor(alt);
    ctx.fillRect(px, 0, pw, H);
    if (alt < 0.1) {
      ctx.fillStyle = `rgba(255,255,255,${Math.min(1, (0.1 - alt) * 3)})`;
      for (const [u, v, r] of STARS) { ctx.beginPath(); ctx.arc(px + u * pw, v * horizon * 0.8, r * 0.5, 0, TAU); ctx.fill(); }
    }
    const fromNoon = ((state.hour - 12 + 36) % 24) - 12; // -12..12 hours
    const sunX = px + pw * (0.5 + 0.8 * fromNoon / 12);
    const sunY = horizon - alt * H * 0.6;
    if (alt > -0.08) {
      ctx.fillStyle = '#fde047';
      ctx.beginPath(); ctx.arc(sunX, sunY, 26, 0, TAU); ctx.fill();
    } else {
      const mx = px + pw * (0.1 + 0.8 * ((state.hour + 6) % 24) / 12);
      ctx.fillStyle = '#fef9c3';
      ctx.beginPath(); ctx.arc(mx, horizon + alt * H * 0.6, 20, 0, TAU); ctx.fill();
      ctx.fillStyle = skyColor(alt);
      ctx.beginPath(); ctx.arc(mx + 10, horizon + alt * H * 0.6 - 6, 17, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = alt > 0 ? '#4ade80' : '#14532d';
    ctx.fillRect(px, horizon, pw, H - horizon);

    const cx = px + pw * 0.42, stickX = cx + 40, stickH = H * 0.24;
    if (alt > 0) {
      const len = Math.min(pw * 0.45, stickH / Math.tan(Math.asin(Math.min(1, alt))));
      const dir = sunX > stickX ? -1 : 1;
      ctx.strokeStyle = 'rgba(15,23,42,0.55)';
      ctx.lineCap = 'round';
      ctx.lineWidth = 9;
      ctx.beginPath(); ctx.moveTo(stickX, horizon + 6); ctx.lineTo(stickX + dir * len, horizon + 6); ctx.stroke();
      ctx.lineWidth = 22;
      ctx.beginPath(); ctx.moveTo(cx, horizon + 8); ctx.lineTo(cx + dir * len * 0.9, horizon + 8); ctx.stroke();
    }
    // the child
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, horizon - stickH * 0.55); ctx.lineTo(cx, horizon - 18);
    ctx.moveTo(cx, horizon - 18); ctx.lineTo(cx - 16, horizon);
    ctx.moveTo(cx, horizon - 18); ctx.lineTo(cx + 16, horizon);
    ctx.moveTo(cx, horizon - stickH * 0.5); ctx.lineTo(cx - 20, horizon - stickH * 0.3);
    ctx.moveTo(cx, horizon - stickH * 0.5); ctx.lineTo(stickX, horizon - stickH * 0.45);
    ctx.stroke();
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath(); ctx.arc(cx, horizon - stickH * 0.55 - 16, 16, 0, TAU); ctx.fill();
    ctx.fillStyle = '#f87171';
    ctx.fillRect(cx - 12, horizon - stickH * 0.55, 24, stickH * 0.3);
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(stickX, horizon); ctx.lineTo(stickX, horizon - stickH); ctx.stroke();

    // Big readout
    const dark = alt < 0.1;
    ctx.fillStyle = dark ? '#f8fafc' : '#0f172a';
    ctx.textAlign = 'left';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(CITIES[state.city].name, px + 16, 30);
    ctx.font = 'bold 34px system-ui, sans-serif';
    ctx.fillText(fmt(state.hour), px + 16, 66);
    ctx.font = 'bold 20px system-ui, sans-serif';
    const word = shadowWord(state.hour);
    ctx.fillText(alt > 0 ? 'Day' : 'Night', px + 16, 94);
    ctx.fillText(word === 'none' ? 'No shadow' : `Shadow: ${word}`, px + 16, H - 14);
  }

  function skyColor(alt) {
    const stops = [[-1, [15, 23, 42]], [-0.12, [15, 23, 42]], [0, [251, 146, 60]], [0.3, [125, 211, 252]], [1, [125, 211, 252]]];
    for (let i = 1; i < stops.length; i++) {
      if (alt <= stops[i][0]) {
        const t = (alt - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0]);
        const c = stops[i - 1][1].map((a, k) => Math.round(a + (stops[i][1][k] - a) * t));
        return `rgb(${c[0]},${c[1]},${c[2]})`;
      }
    }
    return 'rgb(125,211,252)';
  }

  function setHour(h) {
    state.hour = ((h % 24) + 24) % 24;
    timeS.value = state.hour;
  }

  // Drag the chosen city round the globe to turn the Earth by hand
  const dragger = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (!L) return null;
      const p = cityPos(state.city);
      return Math.hypot(x - p.x, y - p.y) < 28 ? 'city' : null;
    },
    onDrag(_id, x, y) {
      const a = Math.atan2(-(y - L.ey), x - L.ex);
      setHour(angleToHour(a));
    },
    handles: () => (L ? [{ id: 'city', ...cityPos(state.city), label: `${CITIES[state.city].name} on the Earth (drag to turn it)` }] : []),
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- Controls ---------------------------------------------------------
  const big = (b) => { b.el.style.minHeight = '46px'; return b; };
  const cityBtns = CITIES.map((c, i) => big(button({ label: c.name, primary: i === state.city, onClick: () => {
    state.city = i;
    cityBtns.forEach((b, k) => b.el.classList.toggle('btn--primary', k === i));
  } })));
  const timeS = slider({ label: 'Time of day', key: 'time', min: 0, max: 24, step: 0.25, value: state.hour, format: fmt,
    onInput: (v) => { state.hour = v % 24; } });
  const playBtn = big(button({ label: 'Play', primary: true, onClick: () => { state.playing = !state.playing; playBtn.label = state.playing ? 'Pause' : 'Play'; } }));
  const presets = [['Sunrise', 6], ['Noon', 12], ['Sunset', 18], ['Midnight', 0]].map(([n, h]) => big(button({ label: n, onClick: () => setHour(h) })));
  ctrlPanel.append(row(...cityBtns), timeS.el, row(playBtn, ...presets));

  const lab = labPanel({
    title: 'Shadow watch',
    filename: 'day-and-night-lab.csv',
    columns: [
      { key: 'city',   label: 'City' },
      { key: 'time',   label: 'Time' },
      { key: 'dn',     label: 'Day or night' },
      { key: 'shadow', label: 'Shadow' },
    ],
    procedure: [
      'Pick a city. Set the time to sunrise and click Record.',
      'Move the time on by 3 hours and record again. Keep going until midnight.',
      'Look at your table: when is the shadow shortest?',
      'Pick a city on the other side of the Earth and compare.',
    ],
    predict: 'When do you think the shadow will be shortest? What happens to it at night?',
    source: () => ({ city: CITIES[state.city].name, time: fmt(state.hour), dn: sunHeight(state.hour) > 0 ? 'day' : 'night', shadow: shadowWord(state.hour) }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    if (state.playing) setHour(state.hour + dt * 1.5);
    draw();
  });
  animator.start();
  return () => { animator.stop(); dragger.destroy(); cv.destroy(); };
}
