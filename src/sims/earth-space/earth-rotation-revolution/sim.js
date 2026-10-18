import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const TAU = Math.PI * 2;

const PLANETS = {
  earth: { en: 'Earth', id: 'Bumi', rotHours: 24, yearDays: 365.25, orbitAU: 1, color: '#3b82f6', land: '#22c55e', city: 'Jakarta' },
  mars: { en: 'Mars', id: 'Mars', rotHours: 24.62, yearDays: 687, orbitAU: 1.52, color: '#ea580c', land: '#9a3412', city: 'Camp', cityId: 'Pos' },
};
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const MONTHS_FULL_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_FULL_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function bigBtn(label, onClick, primary = false) {
  const b = button({ label, onClick, primary });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 18px';
  return b;
}

function monthOf(dayOfYear) {
  let d = dayOfYear;
  for (let m = 0; m < 12; m++) { if (d < MONTH_DAYS[m]) return { m, d: Math.floor(d) + 1 }; d -= MONTH_DAYS[m]; }
  return { m: 11, d: 31 };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const state = { view: 'spin', planet: 'earth', hours: 0, speed: 3, playing: true, target: null };
  let now = 0;
  const P = () => PLANETS[state.planet];
  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  // Filled arrowhead with its tip at (x, y) pointing along the unit vector (ux, uy).
  function arrowHead(ctx, x, y, ux, uy, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - ux * size - uy * size * 0.6, y - uy * size + ux * size * 0.6);
    ctx.lineTo(x - ux * size + uy * size * 0.6, y - uy * size - ux * size * 0.6);
    ctx.closePath(); ctx.fill();
  }

  function step(dt) {
    if (state.target != null) {
      const remaining = state.target - state.hours;
      if (remaining <= 0.01) { state.hours = state.target; state.target = null; }
      else {
        // ease toward the target so the motion is visible, then snap
        const move = Math.max(remaining * (1 - Math.exp(-3 * dt)), Math.min(remaining, dt * 2));
        state.hours += move;
      }
      return;
    }
    if (!state.playing) return;
    const rate = state.view === 'spin' ? state.speed * 1.2 : state.speed * 24 * 1.5; // hours of sim time per second
    state.hours += rate * dt;
  }

  // derived values
  const days = () => state.hours / 24;
  const rotations = () => state.hours / P().rotHours;
  const orbits = () => days() / P().yearDays;
  const spinFrac = () => rotations() - Math.floor(rotations());
  const localHour = () => (12 + 24 * spinFrac()) % 24;
  const isDay = () => { const h = localHour(); return h >= 6 && h < 18; };

  function drawPlanetDisc(ctx, x, y, r, angle, p, lit) {
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
    ctx.fillStyle = p.color; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    ctx.translate(x, y); ctx.rotate(angle);
    ctx.fillStyle = p.land;
    const blobs = [[0.35, -0.2, 0.3, 0.22], [-0.4, 0.15, 0.28, 0.2], [0.05, 0.5, 0.35, 0.15], [-0.1, -0.55, 0.22, 0.14], [0.55, 0.35, 0.16, 0.2]];
    for (const [bx, by, bw, bh] of blobs) { ctx.beginPath(); ctx.ellipse(bx * r, by * r, bw * r, bh * r, 0.4, 0, TAU); ctx.fill(); }
    if (p === PLANETS.earth) {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, TAU); ctx.fill(); // polar ice seen from above
    }
    ctx.restore();
    if (lit) {
      // night half (sun is on the left)
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2); ctx.closePath(); ctx.clip();
      ctx.fillStyle = 'rgba(2,6,23,0.72)'; ctx.fillRect(x - r, y - r, 2 * r + 2, 2 * r + 2);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  }

  function drawSpinView(ctx, W, H) {
    const p = P();
    const cx = W * 0.5, cy = H * 0.54, R = H * 0.3;
    // sun at left edge with rays
    const sx = W * 0.06, sr = H * 0.14;
    const grad = ctx.createRadialGradient(sx, cy, sr * 0.5, sx, cy, sr * 2.2);
    grad.addColorStop(0, 'rgba(253,224,71,0.5)'); grad.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(sx, cy, sr, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(253,224,71,0.55)'; ctx.lineWidth = Math.max(2, W * 0.004);
    for (let k = -3; k <= 3; k++) {
      const yy = cy + k * R * 0.28;
      ctx.beginPath(); ctx.moveTo(sx + sr + 6, yy); ctx.lineTo(cx - Math.sqrt(Math.max(0, R * R - (yy - cy) ** 2)) - 6, yy); ctx.stroke();
    }
    ctx.fillStyle = '#fde68a'; ctx.font = font(Math.max(11, W * 0.02)); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(T('Sun', 'Matahari'), sx, cy + sr + H * 0.05);

    // planet seen from above the North Pole; spins counterclockwise
    const ang = -spinFrac() * TAU;
    drawPlanetDisc(ctx, cx, cy, R, ang, p, true);
    // rotation arrow (counterclockwise on screen = decreasing canvas angle)
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.18, 0.35, -0.35, true); ctx.stroke();
    arrowHead(ctx, cx + Math.cos(-0.35) * R * 1.18, cy + Math.sin(-0.35) * R * 1.18, Math.sin(-0.35), -Math.cos(-0.35), 12, '#e2e8f0');
    // city marker on the rim: noon when it points at the Sun (left)
    const ca = Math.PI + ang;
    const mx = cx + Math.cos(ca) * R * 0.93, my = cy + Math.sin(ca) * R * 0.93;
    const day = isDay();
    ctx.fillStyle = day ? '#fde047' : '#f87171';
    ctx.beginPath(); ctx.arc(mx, my, Math.max(6, R * 0.07), 0, TAU); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    // label with a leader line outside the disc
    const lx = cx + Math.cos(ca) * R * 1.22, ly = cy + Math.sin(ca) * R * 1.22;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(lx, ly); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = font(Math.max(11, W * 0.02));
    ctx.textAlign = Math.cos(ca) < 0 ? 'right' : 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(getLocale() === 'id' && p.cityId ? p.cityId : p.city, lx + (Math.cos(ca) < 0 ? -6 : 6), ly);

    // info panel on the right
    const ix = W * 0.88;
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    const h = localHour();
    const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
    ctx.fillStyle = day ? '#fde047' : '#93c5fd';
    ctx.font = font(Math.max(16, W * 0.04));
    ctx.fillText(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, ix, H * 0.3);
    ctx.font = font(Math.max(13, W * 0.028));
    ctx.fillText(day ? T('Day', 'Siang') : T('Night', 'Malam'), ix, H * 0.4);
    // sun / moon icon
    if (day) { ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(ix, H * 0.5, H * 0.045, 0, TAU); ctx.fill(); }
    else {
      ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(ix, H * 0.5, H * 0.045, 0, TAU); ctx.fill();
      ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.arc(ix + H * 0.025, H * 0.485, H * 0.038, 0, TAU); ctx.fill();
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T('Hours this spin', 'Jam pada putaran ini'), ix, H * 0.64);
    ctx.font = font(Math.max(14, W * 0.03));
    ctx.fillText(`${(spinFrac() * p.rotHours).toFixed(1)} / ${p.rotHours} h`, ix, H * 0.71);
    ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T('Spins so far', 'Jumlah putaran'), ix, H * 0.8);
    ctx.font = font(Math.max(14, W * 0.03));
    ctx.fillText(`${Math.floor(rotations())}`, ix, H * 0.87);
    // headline
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(13, W * 0.026));
    ctx.fillText(T(`${T(p.en, p.id)} spins: one spin = one day`, `${T(p.en, p.id)} berputar: satu putaran = satu hari`), W * 0.5, H * 0.08);
  }

  function drawOrbitView(ctx, W, H) {
    const p = P();
    const cx = W * 0.5, cy = H * 0.53;
    const Rmain = H * 0.36;
    const scale = Rmain / p.orbitAU;
    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < 40; i++) { const x = ((i * 97) % 101) / 101 * W, y = ((i * 53) % 89) / 89 * H; ctx.fillRect(x, y, 2, 2); }
    // sun
    const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, H * 0.12);
    sg.addColorStop(0, 'rgba(253,224,71,0.6)'); sg.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.fillStyle = sg; ctx.fillRect(cx - H * 0.12, cy - H * 0.12, H * 0.24, H * 0.24);
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx, cy, H * 0.06, 0, TAU); ctx.fill();
    ctx.fillStyle = '#7c2d12'; ctx.font = font(Math.max(9, W * 0.016)); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(T('Sun', 'Matahari'), cx, cy);
    // other orbit faintly
    for (const key of Object.keys(PLANETS)) {
      const q = PLANETS[key];
      const r = q.orbitAU * scale;
      ctx.strokeStyle = key === state.planet ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)';
      ctx.lineWidth = key === state.planet ? 2 : 1;
      ctx.setLineDash(key === state.planet ? [] : [4, 6]);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    }
    ctx.setLineDash([]);
    // month labels for Earth
    if (state.planet === 'earth') {
      ctx.font = font(Math.max(10, W * 0.018), false);
      ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
      let cum = 0;
      const names = getLocale() === 'id' ? MONTHS_ID : MONTHS_EN;
      for (let m = 0; m < 12; m++) {
        const a0 = -(cum / p.yearDays) * TAU;
        const am = -((cum + MONTH_DAYS[m] / 2) / p.yearDays) * TAU;
        ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a0) * Rmain * 0.96, cy + Math.sin(a0) * Rmain * 0.96); ctx.lineTo(cx + Math.cos(a0) * Rmain * 1.04, cy + Math.sin(a0) * Rmain * 1.04); ctx.stroke();
        const cur = monthOf((days() % p.yearDays + p.yearDays) % p.yearDays).m === m;
        ctx.fillStyle = cur ? '#fde047' : '#cbd5e1';
        ctx.fillText(names[m], cx + Math.cos(am) * Rmain * 1.14, cy + Math.sin(am) * Rmain * 1.14);
        cum += MONTH_DAYS[m];
      }
    }
    // trail
    const oa = -(orbits() % 1) * TAU;
    const r = p.orbitAU * scale;
    ctx.strokeStyle = 'rgba(96,165,250,0.6)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, oa, true); ctx.stroke();
    // planet (small, also spinning)
    const px = cx + Math.cos(oa) * r, py = cy + Math.sin(oa) * r;
    drawPlanetDisc(ctx, px, py, Math.max(8, H * 0.035), -spinFrac() * TAU, p, false);
    // start marker
    ctx.fillStyle = '#fff'; ctx.font = font(Math.max(9, W * 0.015), false); ctx.textAlign = 'left';
    ctx.fillText(T('start', 'mulai'), cx + r + 8, cy + (state.planet === 'earth' ? Rmain * 0.08 : 0) + 14);
    // direction arrow on the orbit: tangent for counterclockwise travel
    const aa = -0.9;
    arrowHead(ctx, cx + Math.cos(aa) * r, cy + Math.sin(aa) * r, Math.sin(aa), -Math.cos(aa), 10, '#e2e8f0');

    // counters (left and right columns)
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    const lx = W * 0.02;
    const dInYear = (days() % p.yearDays + p.yearDays) % p.yearDays;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T('Day of the year', 'Hari ke-'), lx, H * 0.2);
    ctx.fillStyle = '#fde047'; ctx.font = font(Math.max(16, W * 0.04));
    ctx.fillText(`${Math.floor(dInYear) + 1}`, lx, H * 0.29);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T(`of ${Math.round(p.yearDays)} days`, `dari ${Math.round(p.yearDays)} hari`), lx, H * 0.35);
    if (state.planet === 'earth') {
      const mo = monthOf(dInYear);
      ctx.fillStyle = '#93c5fd'; ctx.font = font(Math.max(13, W * 0.026));
      ctx.fillText(`${mo.d} ${(getLocale() === 'id' ? MONTHS_FULL_ID : MONTHS_FULL_EN)[mo.m]}`, lx, H * 0.45);
    } else {
      ctx.fillStyle = '#93c5fd'; ctx.font = font(Math.max(11, W * 0.02), false);
      ctx.fillText(T('(Earth days)', '(hari Bumi)'), lx, H * 0.45);
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T('Years done', 'Tahun selesai'), lx, H * 0.62);
    ctx.fillStyle = '#fde047'; ctx.font = font(Math.max(16, W * 0.04));
    ctx.fillText(`${Math.floor(orbits())}`, lx, H * 0.71);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(11, W * 0.02), false);
    ctx.fillText(T('Spins done', 'Putaran selesai'), lx, H * 0.82);
    ctx.fillStyle = '#fde047'; ctx.font = font(Math.max(16, W * 0.04));
    ctx.fillText(`${Math.floor(rotations())}`, lx, H * 0.91);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(13, W * 0.026));
    ctx.fillText(T(`${T(p.en, p.id)} orbits the Sun: one trip = one year`, `${T(p.en, p.id)} mengelilingi Matahari: satu keliling = satu tahun`), W * 0.5, H * 0.07);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (state.view === 'spin') drawSpinView(ctx, W, H); else drawOrbitView(ctx, W, H);
    // elapsed total time, bottom right
    ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#94a3b8'; ctx.font = font(Math.max(10, W * 0.017), false);
    ctx.fillText(T(`Total: ${Math.floor(state.hours)} hours = ${days().toFixed(1)} days`, `Total: ${Math.floor(state.hours)} jam = ${days().toFixed(1).replace('.', ',')} hari`), W * 0.98, H * 0.97);
    ctx.textAlign = 'left';
  }

  // controls
  const spinBtn = bigBtn(T('Spinning', 'Berputar (rotasi)'), () => setView('spin'));
  const orbitBtn = bigBtn(T('Orbiting', 'Mengorbit (revolusi)'), () => setView('orbit'));
  function setView(v) { state.view = v; spinBtn.el.classList.toggle('btn--primary', v === 'spin'); orbitBtn.el.classList.toggle('btn--primary', v === 'orbit'); }
  setView('spin');
  const earthBtn = bigBtn(T('Earth', 'Bumi'), () => setPlanet('earth'));
  const marsBtn = bigBtn('Mars', () => setPlanet('mars'));
  function setPlanet(k) { state.planet = k; state.hours = 0; state.target = null; earthBtn.el.classList.toggle('btn--primary', k === 'earth'); marsBtn.el.classList.toggle('btn--primary', k === 'mars'); }
  setPlanet('earth');
  const speedS = slider({ label: T('Speed', 'Kecepatan'), key: 'speed', min: 1, max: 10, step: 1, value: 3, format: (v) => `${v}×`, onInput: (v) => { state.speed = v; } });
  const playBtn = bigBtn(T('Pause', 'Jeda'), () => { state.playing = !state.playing; playBtn.el.textContent = state.playing ? T('Pause', 'Jeda') : T('Play', 'Jalankan'); });
  const resetBtn = bigBtn(T('Reset', 'Ulang'), () => { state.hours = 0; state.target = null; });
  const jump = (h) => { state.target = (state.target ?? state.hours) + h; };
  const dayBtn = bigBtn(T('+1 day', '+1 hari'), () => jump(P().rotHours));
  const monthBtn = bigBtn(T('+1 month', '+1 bulan'), () => jump(P().yearDays * 24 / 12));
  const yearBtn = bigBtn(T('+1 year', '+1 tahun'), () => jump(P().yearDays * 24));
  ctrlPanel.append(row(spinBtn, orbitBtn), row(earthBtn, marsBtn), speedS.el, row(playBtn, resetBtn), row(dayBtn, monthBtn, yearBtn));

  const lab = labPanel({
    title: 'How long is a day and a year?',
    filename: 'earth-rotation-revolution-data.csv',
    columns: [
      { key: 'planet', label: 'Planet' },
      { key: 'hours', label: 'Hours passed', format: (v) => v.toFixed(0) },
      { key: 'spins', label: 'Spins done' },
      { key: 'hPerSpin', label: 'Hours per spin (1 day)' },
      { key: 'days', label: 'Days passed', format: (v) => v.toFixed(1) },
      { key: 'years', label: 'Years done' },
      { key: 'dPerYear', label: 'Days per year' },
    ],
    procedure: [
      'Choose Earth and press Reset, then Pause.',
      'Press "+1 day" once. Read the hours passed and the spins done. Record.',
      'Press Reset, then "+1 year" once. Read the days passed and the years done. Record.',
      'Choose Mars and repeat steps 2 and 3.',
      'Compare: how many hours is one Mars day? How many Earth days is one Mars year?',
    ],
    predict: 'Is a day on Mars longer or shorter than on Earth? What about a year?',
    source: () => {
      const p = P();
      const sp = Math.floor(rotations() + 1e-6), yr = Math.floor(orbits() + 1e-6);
      return {
        planet: p.en, hours: state.hours, spins: sp,
        hPerSpin: sp > 0 ? (state.hours / sp).toFixed(1) : '-',
        days: days(), years: yr,
        dPerYear: yr > 0 ? (days() / yr).toFixed(0) : '-',
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
