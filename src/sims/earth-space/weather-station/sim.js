import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Design units: 800 x 450. Scene on the left, four instruments on the right.
// Each season gives ranges for temperature (°C), rain (mm), wind (0–3) and cloud cover (0–100).
const TROPICAL = [
  { name: 'Dry season', temp: [28, 34], rain: [0, 6], dryChance: 0.75, wind: [0, 2], cloud: [0, 40] },
  { name: 'Rainy season', temp: [24, 30], rain: [5, 50], dryChance: 0.1, wind: [0, 3], cloud: [50, 100] },
];
const FOUR = [
  { name: 'Spring', temp: [8, 18], rain: [0, 15], dryChance: 0.4, wind: [1, 3], cloud: [20, 80] },
  { name: 'Summer', temp: [20, 32], rain: [0, 10], dryChance: 0.7, wind: [0, 2], cloud: [0, 50] },
  { name: 'Autumn', temp: [6, 16], rain: [0, 20], dryChance: 0.3, wind: [1, 3], cloud: [40, 100] },
  { name: 'Winter', temp: [-5, 5], rain: [0, 10], dryChance: 0.4, wind: [1, 3], cloud: [40, 100] },
];
const rand = (a, b) => a + Math.random() * (b - a);
const windWord = (w) => (w < 1 ? 'calm' : w < 2 ? 'breezy' : 'windy');
const cloudWord = (c) => (c < 30 ? 'clear' : c < 70 ? 'some' : 'cloudy');

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { four: false, season: 0, showNumbers: false };
  const target = { temp: 30, rain: 0, wind: 1, cloud: 20, dir: 0.5 };
  const shown = { ...target }; // instruments ease toward target
  const st = { day: 1, t: 0, puddle: 0 };
  const drops = Array.from({ length: 80 }, () => ({ x: Math.random() * 520, y: Math.random() * 450 }));

  const seasons = () => (p.four ? FOUR : TROPICAL);

  function newDay(first = false) {
    const sn = seasons()[p.season];
    target.temp = Math.round(rand(sn.temp[0], sn.temp[1]));
    target.rain = Math.random() < sn.dryChance ? 0 : Math.round(rand(sn.rain[0], sn.rain[1]));
    target.wind = Math.round(rand(sn.wind[0], sn.wind[1]) * 10) / 10;
    target.cloud = Math.round(rand(sn.cloud[0], sn.cloud[1]));
    if (target.rain > 0) target.cloud = Math.max(target.cloud, 60);
    target.dir = Math.random() * Math.PI * 2;
    if (!first) st.day++;
    st.puddle = 0;
  }
  newDay(true);

  function update(dt) {
    st.t += dt;
    const k = Math.min(1, dt * 2.5);
    for (const key of ['temp', 'rain', 'wind', 'cloud']) shown[key] += (target[key] - shown[key]) * k;
    let dd = target.dir - shown.dir;
    dd = Math.atan2(Math.sin(dd), Math.cos(dd));
    shown.dir += dd * k;
    st.puddle = Math.min(1, st.puddle + dt * 0.5); // gauge and puddle fill over 2 s
    if (target.rain > 0) {
      const spd = target.temp <= 0 ? 60 : 260 + target.rain * 4;
      for (const d of drops) {
        d.y += spd * dt; d.x += shown.wind * 60 * dt * Math.sign(Math.cos(shown.dir) || 1);
        if (d.y > 330) { d.y = -10; d.x = Math.random() * 520; }
        if (d.x > 520) d.x = 0; if (d.x < 0) d.x = 520;
      }
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.scale(W / 800, W / 800);
    const cloud = shown.cloud / 100;
    const windX = Math.sign(Math.cos(shown.dir) || 1) * shown.wind;
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, 330);
    sky.addColorStop(0, mix('#3b82f6', '#64748b', cloud)); sky.addColorStop(1, mix('#bfdbfe', '#cbd5e1', cloud));
    ctx.fillStyle = sky; ctx.fillRect(0, 0, 520, 330);
    // Sun
    if (cloud < 0.85) {
      ctx.globalAlpha = 1 - cloud * 0.6;
      ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(420, 70, 34, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fde047'; ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + st.t * 0.3; ctx.beginPath(); ctx.moveTo(420 + Math.cos(a) * 42, 70 + Math.sin(a) * 42); ctx.lineTo(420 + Math.cos(a) * 54, 70 + Math.sin(a) * 54); ctx.stroke(); }
      ctx.globalAlpha = 1;
    }
    // Clouds: more cover = more and darker clouds, drifting with the wind
    const n = Math.round(cloud * 7);
    for (let i = 0; i < n; i++) {
      const x = ((i * 97 + st.t * 12 * (windX || 0.3)) % 640 + 640) % 640 - 60;
      const y = 40 + (i % 3) * 38;
      ctx.fillStyle = target.rain > 0 ? '#94a3b8' : '#f8fafc';
      for (const [dx, dy, r] of [[0, 0, 26], [28, -6, 30], [58, 2, 24], [30, 10, 22]]) { ctx.beginPath(); ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2); ctx.fill(); }
    }
    // Ground and puddle
    ctx.fillStyle = target.temp <= 0 && target.rain > 0 ? '#f1f5f9' : '#4ade80'; ctx.fillRect(0, 330, 520, 120);
    const pw = 20 + st.puddle * target.rain * 2.6;
    if (target.rain > 0) { ctx.fillStyle = 'rgba(56,189,248,0.75)'; ctx.beginPath(); ctx.ellipse(340, 400, pw, 6 + pw * 0.12, 0, 0, Math.PI * 2); ctx.fill(); }
    // Tree bends with the wind
    const bend = windX * 18;
    ctx.strokeStyle = '#7c3f12'; ctx.lineWidth = 18; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(130, 340); ctx.quadraticCurveTo(130 + bend * 0.4, 260, 130 + bend, 200); ctx.stroke();
    ctx.fillStyle = target.temp <= 0 ? '#e2e8f0' : '#16a34a';
    const sway = Math.sin(st.t * (2 + shown.wind)) * shown.wind * 4;
    for (const [dx, dy, r] of [[0, 0, 52], [-40, 30, 40], [42, 28, 42], [-10, -40, 36], [30, -30, 34]]) { ctx.beginPath(); ctx.arc(130 + bend + dx + sway, 190 + dy, r, 0, Math.PI * 2); ctx.fill(); }
    // Rain or snow
    if (target.rain > 0) {
      ctx.strokeStyle = 'rgba(191,219,254,0.9)'; ctx.lineWidth = 2; ctx.fillStyle = '#fff';
      for (const d of drops) {
        if (target.temp <= 0) { ctx.beginPath(); ctx.arc(d.x, d.y, 3, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - windX * 3, d.y + 12); ctx.stroke(); }
      }
    }
    // Day label
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; rrect(ctx, 14, 14, 170, 60, 12); ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 26px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`Day ${st.day}`, 28, 44);
    ctx.font = '600 14px system-ui, sans-serif'; ctx.fillStyle = '#475569'; ctx.fillText(seasons()[p.season].name, 28, 64);

    // Instrument panel
    ctx.fillStyle = '#fef9c3'; ctx.fillRect(520, 0, 280, 450);
    drawThermometer(ctx, 560, 30);
    drawRainGauge(ctx, 650, 30);
    drawWind(ctx, 735, 120);
    drawCloudGauge(ctx, 650, 330);
    ctx.restore();
  }

  function drawThermometer(ctx, x, y) {
    const lo = p.four ? -10 : 0, hi = 40, h = 230;
    const yOf = (v) => y + 20 + h - ((v - lo) / (hi - lo)) * h;
    label(ctx, x, y, 'Heat');
    ctx.fillStyle = '#fff'; rrect(ctx, x - 12, y + 16, 24, h + 8, 12); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(x, y + 20 + h + 18, 18, 0, Math.PI * 2); ctx.fill();
    const top = yOf(Math.max(lo, Math.min(hi, shown.temp)));
    ctx.fillRect(x - 6, top, 12, y + 20 + h + 10 - top);
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 14px system-ui, sans-serif'; ctx.textAlign = 'left';
    for (let v = lo; v <= hi; v += 10) { ctx.fillRect(x + 12, yOf(v) - 1, 8, 2); ctx.fillText(String(v), x + 24, yOf(v) + 5); }
    for (let v = lo; v <= hi; v += 5) ctx.fillRect(x + 12, yOf(v) - 1, 4, 2);
    if (p.showNumbers) readout(ctx, x, y + h + 62, `${Math.round(shown.temp)} °C`);
  }
  function drawRainGauge(ctx, x, y) {
    const h = 230, max = 50;
    const yOf = (v) => y + 20 + h - (v / max) * h;
    label(ctx, x, y, 'Rain');
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(x - 22, y + 20, 44, h); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.strokeRect(x - 22, y + 20, 44, h);
    ctx.fillStyle = 'rgba(56,189,248,0.8)'; const lvl = Math.min(max, shown.rain * st.puddle); ctx.fillRect(x - 20, yOf(lvl), 40, y + 20 + h - yOf(lvl));
    ctx.beginPath(); ctx.moveTo(x - 32, y + 8); ctx.lineTo(x + 32, y + 8); ctx.lineTo(x + 22, y + 20); ctx.lineTo(x - 22, y + 20); ctx.closePath(); ctx.fillStyle = '#94a3b8'; ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 14px system-ui, sans-serif'; ctx.textAlign = 'left';
    for (let v = 0; v <= max; v += 10) { ctx.fillRect(x + 22, yOf(v) - 1, 8, 2); ctx.fillText(String(v), x + 34, yOf(v) + 5); }
    if (p.showNumbers) readout(ctx, x, y + h + 62, `${Math.round(shown.rain)} mm`);
  }
  function drawWind(ctx, x, y) {
    label(ctx, x, y - 90, 'Wind');
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y - 60); ctx.lineTo(x, y + 150); ctx.stroke();
    // Vane: arrow pointing where the wind comes from
    ctx.save(); ctx.translate(x, y - 50); ctx.rotate(shown.dir);
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(-14, -8); ctx.lineTo(-14, 8); ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 12px system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('N', x, y - 78); ctx.fillText('S', x, y - 16);
    // Flag: hangs down when calm, flies out when windy
    const lift = Math.min(1, shown.wind / 3);
    const flap = Math.sin(st.t * (3 + shown.wind * 3)) * 6 * lift;
    const side = Math.cos(shown.dir) >= 0 ? -1 : 1;
    ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 36);
    ctx.lineTo(x + side * 56 * lift, y + 36 + (1 - lift) * 50 + flap); ctx.lineTo(x + side * 56 * lift, y + (1 - lift) * 50 + flap); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(windWord(shown.wind), x, y + 180);
  }
  function drawCloudGauge(ctx, x, y) {
    label(ctx, x - 90, y - 10, 'Clouds');
    const frac = shown.cloud / 100;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - 80, y + 50, 40, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.moveTo(x - 80, y + 50); ctx.arc(x - 80, y + 50, 40, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 16px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(cloudWord(shown.cloud), x - 30, y + 56);
    if (p.showNumbers) readout(ctx, x + 20, y + 80, `${Math.round(shown.cloud)} %`);
  }
  function label(ctx, x, y, text) { ctx.fillStyle = '#1e293b'; ctx.font = 'bold 16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(text, x, y + 6); }
  function readout(ctx, x, y, text) { ctx.fillStyle = '#0f766e'; ctx.font = 'bold 15px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(text, x, y); }
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }
  function mix(a, b, u) {
    const ca = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), cb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    return `rgb(${ca.map((c, i) => Math.round(c + (cb[i] - c) * u)).join(',')})`;
  }

  // Controls
  const big = (b) => { b.el.style.minHeight = '44px'; b.el.style.fontSize = '1rem'; b.el.style.padding = '10px 18px'; return b; };
  const seasonRow = document.createElement('div'); seasonRow.className = 'ctrl-row';
  function buildSeasons() {
    seasonRow.innerHTML = '';
    seasons().forEach((sn, i) => {
      const b = big(button({ label: sn.name, primary: i === p.season, onClick: () => { p.season = i; newDay(); buildSeasons(); } }));
      seasonRow.appendChild(b.el);
    });
  }
  buildSeasons();
  const fourT = toggle({ label: 'Four seasons (not tropical)', key: 'four-seasons', value: false, onChange: (v) => { p.four = v; p.season = 0; newDay(); buildSeasons(); } });
  const numT = toggle({ label: 'Show numbers', key: 'numbers', value: false, onChange: (v) => { p.showNumbers = v; } });
  const dayBtn = big(button({ label: 'New day', primary: true, onClick: () => newDay() }));
  dayBtn.el.style.fontSize = '1.15rem';
  ctrlPanel.append(seasonRow, row(dayBtn, fourT, numT));

  const lab = labPanel({
    title: 'My weather diary',
    filename: 'weather-station-lab.csv',
    columns: [
      { key: 'day', label: 'Day' },
      { key: 'season', label: 'Season' },
      { key: 'temp', label: 'Temperature (°C)' },
      { key: 'rain', label: 'Rain (mm)' },
      { key: 'wind', label: 'Wind' },
      { key: 'clouds', label: 'Clouds' },
    ],
    procedure: [
      'Pick a season. Press New day.',
      'Read the thermometer, the rain gauge, the flag and the cloud gauge.',
      'Press Record to write the day in your diary.',
      'Make 5 days. Then change season and make 5 more. Compare.',
    ],
    source: () => ({
      day: st.day, season: seasons()[p.season].name, temp: target.temp, rain: target.rain,
      wind: windWord(target.wind), clouds: cloudWord(target.cloud),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { update(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
