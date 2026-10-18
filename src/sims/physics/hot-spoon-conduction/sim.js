import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// 1-D heat conduction along each spoon (explicit finite differences).
// Each spoon is N segments from the bowl (index 0, in the water) to the end
// of the handle. Segments i < N_WATER are held at the water temperature; the
// rest exchange heat with their neighbours (diffusivity ALPHA·material factor)
// and lose a little to the room air (H_AIR). Butter sits at segment BUTTER_I
// and slides off once that segment reaches MELT.
// The material factors are compressed from reality (steel ≈ 100× wood) so
// that wood and plastic show a visible warm patch above the water line, but
// the ordering, and the "never melts on an insulator" result, are realistic.
const N = 20;
const N_WATER = 7;
const BUTTER_I = 15;
const ROOM = 25;        // °C
const MELT = 35;        // °C, butter
const ALPHA = 0.004;    // spoon-lengths² per second, metal
const H_AIR = 0.012;    // 1/s
const DX = 1 / N;
const SPOONS = [
  { id: 'metal', en: 'Metal', id_: 'Logam', factor: 1, color: '#9ca3af', dark: '#4b5563', lean: -0.48 },
  { id: 'wood', en: 'Wood', id_: 'Kayu', factor: 0.012, color: '#a16207', dark: '#713f12', lean: 0 },
  { id: 'plastic', en: 'Plastic', id_: 'Plastik', factor: 0.02, color: '#f1f5f9', dark: '#94a3b8', lean: 0.48 },
];

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

  const spoons = SPOONS.map((s) => ({ ...s, temp: new Float64Array(N).fill(ROOM), next: new Float64Array(N), butter: { on: true, fellAt: null, dropY: 0, dropV: 0, landed: false } }));
  const state = { running: false, time: 0, waterC: 90, fast: false, queue: [], flash: null, flashAt: -10 };
  let now = 0;

  const name = (s) => (getLocale() === 'id' ? s.id_ : s.en);

  function start() {
    for (const s of spoons) {
      s.temp.fill(ROOM);
      s.butter = { on: true, fellAt: null, dropY: 0, dropV: 0, landed: false };
    }
    state.time = 0; state.running = true; state.queue = []; state.flash = null;
  }

  function step(dt) {
    if (!state.running) return;
    const h = dt * (state.fast ? 4 : 1);
    state.time += h;
    for (const s of spoons) {
      const a = ALPHA * s.factor, Tm = s.temp, Tn = s.next;
      for (let i = 0; i < N; i++) {
        if (i < N_WATER) { Tn[i] = state.waterC; continue; }
        const l = Tm[i - 1], r = i < N - 1 ? Tm[i + 1] : Tm[i];
        Tn[i] = Tm[i] + h * (a * (l - 2 * Tm[i] + r) / (DX * DX) - H_AIR * (Tm[i] - ROOM));
      }
      s.temp.set(Tn);
      const b = s.butter;
      if (b.on && Tm[BUTTER_I] >= MELT) {
        b.on = false; b.fellAt = state.time;
        state.queue.push({ material: name(s), waterC: state.waterC, time: Math.round(state.time) });
        state.flash = `${name(s)}: ${T('butter fell at', 'mentega jatuh pada')} ${Math.round(state.time)} s — ${T('press Record!', 'tekan Record!')}`;
        state.flashAt = now;
      }
      if (!b.on && !b.landed) {
        b.dropV += 900 * dt; b.dropY += b.dropV * dt;
      }
    }
    // After two minutes, anything still holding its butter is a result too.
    if (state.time >= 120 && !state.reported) {
      state.reported = true;
      for (const s of spoons) if (s.butter.on) state.queue.push({ material: name(s), waterC: state.waterC, time: 'did not fall (120 s)' });
      state.flash = T('2 minutes: the other butters did not fall — press Record for each.', '2 menit: mentega lainnya tidak jatuh — tekan Record untuk masing-masing.');
      state.flashAt = now;
    }
    if (state.time < 120) state.reported = false;
  }

  function heatColor(temp) {
    const f = Math.max(0, Math.min(1, (temp - ROOM) / (100 - ROOM)));
    return { f, rgba: `rgba(239,68,68,${(f * 0.95).toFixed(3)})`, glow: `rgba(251,191,36,${(Math.max(0, f - 0.5) * 1.2).toFixed(3)})` };
  }

  // Geometry: bowl at the cup bottom, handle rising at angle `lean` from vertical.
  function geom(s) {
    const W = cv.width, H = cv.height;
    const idx = SPOONS.indexOf(SPOONS.find((k) => k.id === s.id));
    const x0 = W * (0.42 + idx * 0.08), y0 = H * 0.9;
    const len = H * 0.72;
    const ux = Math.sin(s.lean), uy = -Math.cos(s.lean);
    return { x0, y0, len, ux, uy, at: (i) => ({ x: x0 + ux * len * (i + 0.5) / N, y: y0 + uy * len * (i + 0.5) / N }) };
  }

  function drawSpoon(ctx, s) {
    const W = cv.width;
    const g = geom(s);
    const lw = W * 0.02;
    ctx.lineCap = 'round';
    // bowl
    const b0 = g.at(0.5);
    ctx.fillStyle = s.color; ctx.beginPath(); ctx.ellipse(b0.x, b0.y, lw * 1.5, lw * 1.0, s.lean, 0, Math.PI * 2); ctx.fill();
    const hc0 = heatColor(s.temp[0]);
    ctx.fillStyle = hc0.rgba; ctx.beginPath(); ctx.ellipse(b0.x, b0.y, lw * 1.5, lw * 1.0, s.lean, 0, Math.PI * 2); ctx.fill();
    for (let i = 1; i < N; i++) {
      const p = g.at(i - 0.5), q = g.at(i + 0.5);
      ctx.strokeStyle = s.color; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      const hc = heatColor(s.temp[i]);
      ctx.strokeStyle = hc.rgba;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      if (hc.f > 0.5) { ctx.strokeStyle = hc.glow; ctx.lineWidth = lw * 0.4; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    }
    ctx.lineCap = 'butt';
  }

  function drawButter(ctx, s) {
    const W = cv.width, H = cv.height;
    const g = geom(s), b = s.butter;
    const p = g.at(BUTTER_I);
    const size = W * 0.028;
    const temp = s.temp[BUTTER_I];
    // perpendicular offset so the pat sits on the spoon's side
    const nx = -g.uy, ny = g.ux;
    const side = s.lean <= 0 ? 1 : -1;
    let bx = p.x + nx * side * size * 0.7, by = p.y + ny * side * size * 0.7;
    const tableY = H * 0.95;
    if (!b.on) {
      by += b.dropY;
      if (by >= tableY) { by = tableY; b.landed = true; }
    }
    const sag = b.on ? Math.max(0, Math.min(1, (temp - 30) / (MELT - 30))) : 1;
    ctx.save();
    ctx.translate(bx, by);
    if (b.on) ctx.rotate(s.lean);
    ctx.fillStyle = '#fde68a';
    if (b.landed) { ctx.beginPath(); ctx.ellipse(0, 0, size * 1.1, size * 0.28, 0, 0, Math.PI * 2); ctx.fill(); }
    else {
      const w = size * (1 + 0.3 * sag), hgt = size * (0.8 - 0.35 * sag);
      ctx.beginPath(); ctx.roundRect(-w / 2, -hgt / 2, w, hgt, size * 0.15); ctx.fill();
      ctx.fillStyle = '#fef3c7'; ctx.fillRect(-w / 2 + 2, -hgt / 2 + 2, w * 0.4, hgt * 0.25);
    }
    ctx.restore();
    // temperature at the butter spot
    ctx.fillStyle = '#e2e8f0';
    ctx.font = `bold ${Math.max(11, Math.round(H * 0.04))}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.textAlign = s.lean < 0 ? 'right' : s.lean > 0 ? 'left' : 'center';
    const lx = p.x + (s.lean < 0 ? -size * 1.3 : s.lean > 0 ? size * 1.3 : 0), ly = s.lean === 0 ? p.y - size * 1.2 : p.y + 4;
    ctx.fillText(`${Math.round(temp)} °C`, lx, ly);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // table
    ctx.fillStyle = '#3f2a14'; ctx.fillRect(0, H * 0.95, W, H * 0.05);
    const cupX = W * 0.35, cupW = W * 0.3, cupY = H * 0.56, cupH = H * 0.39, waterY = H * 0.62;
    // cup back
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(cupX, cupY, cupW, cupH, [6, 6, 22, 22]); ctx.fill();
    // spoons (submerged parts drawn first, then water over them)
    for (const s of spoons) drawSpoon(ctx, s);
    // water with temperature colour
    const wf = Math.max(0, Math.min(1, (state.waterC - 40) / 60));
    ctx.fillStyle = `rgba(${Math.round(56 + 183 * wf)},${Math.round(189 - 120 * wf)},${Math.round(248 - 180 * wf)},0.55)`;
    ctx.beginPath(); ctx.roundRect(cupX, waterY, cupW, cupY + cupH - waterY, [0, 0, 22, 22]); ctx.fill();
    // steam
    if (state.waterC >= 60) {
      ctx.strokeStyle = `rgba(226,232,240,${(0.15 + 0.5 * wf).toFixed(2)})`; ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        const ph = now * 1.5 + i * 2.1, x = cupX + cupW * (0.25 + 0.25 * i) + Math.sin(ph) * 6;
        const y0 = waterY - 6 - ((now * 0.3 + i * 0.33) % 1) * H * 0.12;
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.quadraticCurveTo(x + 8, y0 - H * 0.03, x, y0 - H * 0.06); ctx.stroke();
      }
      ctx.lineCap = 'butt';
    }
    // cup walls + handle
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(cupX, cupY, cupW, cupH, [6, 6, 22, 22]); ctx.stroke();
    ctx.beginPath(); ctx.arc(cupX + cupW + W * 0.01, cupY + cupH * 0.45, cupH * 0.22, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    // water temperature label on the cup
    const fs = Math.max(12, Math.round(H * 0.045));
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(`${T('Water', 'Air')} ${state.waterC} °C`, cupX + cupW / 2, cupY + cupH - fs * 0.6);
    // butter pats + readings
    for (const s of spoons) drawButter(ctx, s);
    // names above each handle
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    for (const s of spoons) {
      const g = geom(s), tip = g.at(N - 0.5);
      ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center';
      ctx.fillText(name(s), tip.x + g.ux * fs * 1.2, tip.y + g.uy * fs * 1.2 + fs * 0.35);
    }
    // stopwatch
    ctx.textAlign = 'left';
    ctx.fillStyle = '#facc15';
    ctx.font = `bold ${Math.round(fs * 1.3)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(`${T('Time', 'Waktu')}: ${Math.floor(state.time)} s${state.fast ? ' (×4)' : ''}`, W * 0.03, H * 0.1);
    // colour legend
    const lgX = W * 0.03, lgY = H * 0.15, lgW = W * 0.14, lgH = Math.max(8, H * 0.03);
    const grad = ctx.createLinearGradient(lgX, 0, lgX + lgW, 0);
    grad.addColorStop(0, '#64748b'); grad.addColorStop(1, '#ef4444');
    ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(lgX, lgY, lgW, lgH, lgH / 2); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.75)}px system-ui, -apple-system, Roboto, sans-serif`;
    ctx.fillText(T('cool', 'dingin'), lgX, lgY + lgH + fs * 0.8);
    ctx.textAlign = 'right'; ctx.fillText(T('hot', 'panas'), lgX + lgW, lgY + lgH + fs * 0.8);
    // message
    ctx.textAlign = 'center';
    ctx.font = `bold ${fs}px system-ui, -apple-system, Roboto, sans-serif`;
    if (!state.running) {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T('Set the water temperature, then press Start.', 'Atur suhu air, lalu tekan Mulai.'), W * 0.5, H * 0.1);
    } else if (state.flash && now - state.flashAt < 6) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText(state.flash, W * 0.5, H * 0.1);
    } else if (state.queue.length) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText(`${state.queue.length} ${T('result(s) waiting — press Record', 'hasil menunggu — tekan Record')}`, W * 0.5, H * 0.1);
    } else {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(T('Which butter will fall first?', 'Mentega mana yang jatuh lebih dulu?'), W * 0.5, H * 0.1);
    }
    ctx.textAlign = 'left';
  }

  // Controls
  const tempS = slider({
    label: T('Water temperature (°C)', 'Suhu air (°C)'), key: 'water-c', min: 40, max: 100, step: 10, value: 90,
    format: (v) => `${v} °C`, onInput: (v) => { state.waterC = v; },
  });
  const startB = bigBtn(T('Start (fresh water + new butter)', 'Mulai (air baru + mentega baru)'), () => start(), true);
  const fastT = toggle({ label: T('Fast (×4)', 'Cepat (×4)'), key: 'fast', value: false, onChange: (v) => { state.fast = v; } });
  ctrlPanel.append(tempS.el, row(startB, fastT));

  const lab = labPanel({
    title: 'Which spoon gets hot?',
    filename: 'hot-spoon-conduction-data.csv',
    columns: [
      { key: 'material', label: 'Spoon material' },
      { key: 'waterC', label: 'Water (°C)' },
      { key: 'time', label: 'Time for butter to fall (s)' },
    ],
    procedure: [
      'Set the water to 90 °C and press Start. Wait for a butter pat to fall, then press Record.',
      'Keep watching (use Fast). After 2 minutes, press Record again for each spoon whose butter did not fall.',
      'Set the water to 60 °C, press Start, and repeat.',
      'Try 40 °C. Does any butter fall?',
      'Look at your table. Which material conducts heat best? How does the water temperature change the time?',
    ],
    predict: 'Which spoon\'s butter will fall first: metal, wood or plastic? Will the butter on every spoon fall eventually?',
    source: () => (state.queue.length ? state.queue.shift() : null),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
