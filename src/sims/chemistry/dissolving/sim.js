import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Capacity is in spoonfuls the glass of water can hold at temperature t (°C).
// Sugar: real solubility roughly doubles from 20 °C to 80 °C; salt barely changes.
const SUBS = {
  sugar: { en: 'Sugar', id: 'Gula', color: '#f8fafc', soluble: true, rate: 0.22, perSpoon: 50, cap: (t) => 6 + 0.1 * (t - 20) },
  salt: { en: 'Salt', id: 'Garam', color: '#e2e8f0', soluble: true, rate: 0.3, perSpoon: 50, cap: (t) => 3 + 0.01 * (t - 20) },
  sand: { en: 'Sand', id: 'Pasir', color: '#b45309', soluble: false, mode: 'sink', perSpoon: 50 },
  flour: { en: 'Flour', id: 'Tepung', color: '#fef3c7', soluble: false, mode: 'suspend', perSpoon: 80 },
  oil: { en: 'Oil', id: 'Minyak', color: '#facc15', soluble: false, mode: 'float', perSpoon: 40 },
};
const MAX_PARTICLES = 1200;
const STIR_SECONDS = 3;

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
    sub: 'sugar', temp: 20, stir: 0, stirAngle: 0,
    particles: [], spoons: 0, dissolvedCount: 0,
    status: 'none', spoonT0: 0, lastTime: 0, stirredSince: false, saturatedAt: -1, pourUntil: -1,
  };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const tempFactor = () => Math.pow(1.6, (state.temp - 20) / 20);
  const capacity = () => {
    const s = SUBS[state.sub];
    return s.soluble ? Math.max(0, Math.round(s.cap(state.temp) * s.perSpoon)) : 0;
  };

  // glass geometry (CSS px)
  const geo = () => {
    const W = cv.width, H = cv.height;
    return { gx0: W * 0.33, gx1: W * 0.67, gyT: H * 0.12, gyB: H * 0.9, yW: H * 0.24 };
  };

  function emptyGlass() {
    state.particles.length = 0;
    state.spoons = 0; state.dissolvedCount = 0;
    state.status = 'none'; state.stirredSince = false; state.saturatedAt = -1;
  }

  function addSpoon() {
    const s = SUBS[state.sub];
    if (state.particles.length + s.perSpoon > MAX_PARTICLES) return;
    state.spoons++;
    const spoon = state.spoons;
    for (let i = 0; i < s.perSpoon; i++) {
      state.particles.push({
        u: 0.35 + Math.random() * 0.3, v: 0.02 + Math.random() * 0.06,
        vu: (Math.random() - 0.5) * 0.3, vv: 0.2 + Math.random() * 0.3,
        kind: 'solid', prog: 0, mul: 0.6 + Math.random() * 0.8, spoon,
        size: 0.6 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2,
      });
    }
    state.status = 'dissolving';
    state.spoonT0 = now;
    state.stirredSince = false;
    state.pourUntil = now + 0.7;
  }

  function step(dt) {
    const s = SUBS[state.sub];
    const stir = state.stir;
    if (stir > 0) { state.stir = Math.max(0, stir - dt / STIR_SECONDS); state.stirAngle += dt * 9; }
    const cap = capacity();
    const rate = s.soluble ? s.rate * tempFactor() * (1 + 1.5 * stir) : 0;
    let saturatedNow = false;
    let spoonLeft = 0;
    const cur = state.spoons;
    for (const p of state.particles) {
      // swirl from stirring: tangential around the glass centre plus a kick
      if (stir > 0) {
        const dx = p.u - 0.5, dy = p.v - 0.5;
        const r = Math.hypot(dx, dy) || 1e-3;
        const sw = stir * 1.6;
        p.vu += (-dy / r) * sw * dt * 4 + (Math.random() - 0.5) * sw * dt * 3;
        p.vv += (dx / r) * sw * dt * 2 + (Math.random() - 0.5) * sw * dt * 3 - (p.kind === 'solid' && s.mode !== 'float' ? sw * dt * 1.2 : 0);
      }
      if (p.kind === 'dissolved') {
        p.vu += (Math.random() - 0.5) * 1.2 * dt * (0.5 + tempFactor());
        p.vv += (Math.random() - 0.5) * 1.2 * dt * (0.5 + tempFactor());
        p.vu *= 0.96; p.vv *= 0.96;
      } else if (s.mode === 'float') {
        p.vv -= 1.5 * dt;                 // buoyancy
        p.vu *= 0.95; p.vv *= 0.93;
      } else if (s.mode === 'suspend') {
        p.vv += 0.12 * dt;                // very slow sinking
        p.vu += (Math.random() - 0.5) * 0.3 * dt;
        p.vu *= 0.96; p.vv *= 0.96;
      } else {
        p.vv += 2.2 * dt;                 // gravity for sugar, salt, sand grains
        p.vu *= 0.95; p.vv *= 0.97;
      }
      p.u += p.vu * dt; p.v += p.vv * dt;
      // walls
      if (p.u < 0.03) { p.u = 0.03; p.vu = Math.abs(p.vu) * 0.3; }
      if (p.u > 0.97) { p.u = 0.97; p.vu = -Math.abs(p.vu) * 0.3; }
      if (p.v < 0.02) { p.v = 0.02; p.vv = Math.abs(p.vv) * 0.2; }
      const floor = p.kind === 'solid' && s.mode !== 'float' ? 0.985 - p.size * 0.03 - (Math.sin(p.phase) + 1) * 0.02 : 0.98;
      if (p.v > floor) { p.v = floor; p.vv = 0; p.vu *= 0.5; }
      // dissolving
      if (p.kind === 'solid' && s.soluble) {
        p.prog = Math.min(1, p.prog + rate * p.mul * dt);
        if (p.prog >= 1) {
          if (state.dissolvedCount < cap) {
            p.kind = 'dissolved'; state.dissolvedCount++;
            p.vu = (Math.random() - 0.5) * 0.6; p.vv = -0.3 - Math.random() * 0.4;
          } else saturatedNow = true;
        }
        if (p.spoon === cur) spoonLeft++;
      }
    }
    // timer / status
    if (state.status === 'dissolving') {
      if (s.soluble) {
        if (spoonLeft === 0) { state.status = 'done'; state.lastTime = now - state.spoonT0; }
        else if (saturatedNow) { state.status = 'saturated'; state.lastTime = now - state.spoonT0; }
      } else if (now - state.spoonT0 > 6) { state.status = 'never'; state.lastTime = now - state.spoonT0; }
    } else if (state.status === 'saturated' && !saturatedNow && spoonLeft === 0) {
      // warming the water let the rest dissolve
      state.status = 'done'; state.lastTime = now - state.spoonT0;
    }
    if (saturatedNow && state.saturatedAt < 0) state.saturatedAt = now;
    if (!saturatedNow) state.saturatedAt = -1;
  }

  const font = (px, bold = true) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const s = SUBS[state.sub];
    const { gx0, gx1, gyT, gyB, yW } = geo();
    const gw = gx1 - gx0, wh = gyB - yW;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // table
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, gyB, W, H - gyB);

    // thermometer
    const tx = W * 0.14, ty0 = H * 0.25, ty1 = H * 0.82;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.roundRect(tx - W * 0.012, ty0, W * 0.024, ty1 - ty0, W * 0.012); ctx.fill(); ctx.stroke();
    const tf = clamp((state.temp - 10) / 80, 0, 1);
    const hot = state.temp >= 60, warm = state.temp >= 35;
    const tcol = hot ? '#ef4444' : warm ? '#f97316' : '#38bdf8';
    ctx.fillStyle = tcol;
    ctx.beginPath(); ctx.roundRect(tx - W * 0.006, ty1 - (ty1 - ty0 - W * 0.02) * tf - W * 0.02, W * 0.012, (ty1 - ty0 - W * 0.02) * tf + W * 0.02, W * 0.006); ctx.fill();
    ctx.beginPath(); ctx.arc(tx, ty1 + W * 0.01, W * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(12, W * 0.024)); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(`${state.temp}°C`, tx, ty0 - H * 0.03);
    ctx.font = font(Math.max(10, W * 0.018), false); ctx.fillStyle = tcol;
    ctx.fillText(hot ? T('hot', 'panas') : warm ? T('warm', 'hangat') : T('cold', 'dingin'), tx, ty1 + W * 0.045 + 10);

    // water
    const waterTint = hot ? 'rgba(96,165,250,0.4)' : 'rgba(56,189,248,0.38)';
    ctx.fillStyle = waterTint;
    ctx.beginPath(); ctx.roundRect(gx0, yW, gw, wh, [0, 0, 20, 20]); ctx.fill();
    // flour cloudiness
    if (s.mode === 'suspend' && state.particles.length) {
      let afloat = 0;
      for (const p of state.particles) if (p.v < 0.93) afloat++;
      const a = clamp(afloat / 160, 0, 0.75);
      ctx.fillStyle = `rgba(254,243,199,${a})`;
      ctx.beginPath(); ctx.roundRect(gx0, yW, gw, wh, [0, 0, 20, 20]); ctx.fill();
    }
    // steam
    if (hot) {
      ctx.strokeStyle = 'rgba(226,232,240,0.35)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      for (let k = 0; k < 3; k++) {
        const x = gx0 + gw * (0.3 + 0.2 * k), ph = now * 2 + k;
        ctx.beginPath();
        for (let j = 0; j <= 10; j++) { const yy = yW - 8 - j * H * 0.012; const xx = x + Math.sin(ph + j * 0.6) * W * 0.008; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
        ctx.stroke();
      }
      ctx.lineCap = 'butt';
    }
    // particles
    const px = (p) => gx0 + gw * p.u, py = (p) => yW + wh * p.v;
    const base = Math.max(3, W * 0.007);
    if (s.mode === 'float') {
      // oil layer thickness from how many droplets have reached the top
      let top = 0;
      for (const p of state.particles) if (p.v < 0.08) top++;
      const th = Math.min(wh * 0.25, top * wh * 0.003);
      if (th > 0) { ctx.fillStyle = 'rgba(250,204,21,0.9)'; ctx.fillRect(gx0, yW, gw, th); }
      ctx.fillStyle = 'rgba(250,204,21,0.9)';
      for (const p of state.particles) if (p.v >= 0.08) { ctx.beginPath(); ctx.arc(px(p), py(p), base * p.size * 1.2, 0, Math.PI * 2); ctx.fill(); }
    } else {
      for (const p of state.particles) {
        if (p.kind === 'dissolved') {
          ctx.fillStyle = 'rgba(255,255,255,0.35)';
          ctx.fillRect(px(p) - 1, py(p) - 1, 2, 2);
        } else {
          const sz = base * p.size * (s.soluble ? (1 - 0.6 * p.prog) : 1) * (s.mode === 'suspend' ? 0.6 : 1);
          ctx.fillStyle = s.color;
          if (state.sub === 'sugar' || state.sub === 'salt') ctx.fillRect(px(p) - sz, py(p) - sz, sz * 2, sz * 2);
          else { ctx.beginPath(); ctx.arc(px(p), py(p), sz, 0, Math.PI * 2); ctx.fill(); }
        }
      }
    }
    // glass outline (drawn over the water)
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(gx0, gyT, gw, gyB - gyT, [4, 4, 22, 22]); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gx0 + 10, gyT + 14); ctx.lineTo(gx0 + 10, gyB - 24); ctx.stroke();
    // spoon
    if (state.stir > 0) {
      const a = state.stirAngle;
      const cx = gx0 + gw / 2 + Math.cos(a) * gw * 0.28, cy = yW + wh * 0.75 + Math.sin(a) * wh * 0.08;
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = Math.max(5, W * 0.01); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + gw * 0.25, gyT - H * 0.08); ctx.stroke();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath(); ctx.ellipse(cx, cy, W * 0.02, W * 0.013, 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.lineCap = 'butt';
    } else if (now < state.pourUntil) {
      ctx.save();
      ctx.translate(gx0 + gw * 0.5, gyT - H * 0.02); ctx.rotate(-0.9);
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = Math.max(5, W * 0.01); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W * 0.11, 0); ctx.stroke();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath(); ctx.ellipse(0, 0, W * 0.022, W * 0.014, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // headline messages
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = font(Math.max(14, W * 0.03));
    const name = T(s.en, s.id);
    let head = '', sub2 = '', col = '#e2e8f0';
    if (state.status === 'none') {
      head = T(`Add a spoonful of ${name.toLowerCase()}`, `Tambahkan sesendok ${name.toLowerCase()}`);
    } else if (!s.soluble) {
      head = T(`${name} does not dissolve`, `${name} tidak larut`);
      sub2 = s.mode === 'sink' ? T('It sinks and stays on the bottom', 'Pasir tenggelam dan tetap di dasar')
        : s.mode === 'suspend' ? T('It makes the water cloudy and slowly settles', 'Tepung membuat air keruh dan perlahan mengendap')
          : T('It floats on top in its own layer', 'Minyak mengapung di atas sebagai lapisan sendiri');
      col = '#fbbf24';
    } else if (state.status === 'dissolving') {
      head = T('Dissolving…', 'Melarut…') + ` ${(now - state.spoonT0).toFixed(1)} s`;
      sub2 = T('The pieces get smaller and spread out', 'Butirannya mengecil dan menyebar');
      col = '#fde047';
    } else if (state.status === 'done') {
      head = T(`All dissolved in ${state.lastTime.toFixed(1)} s!`, `Semua larut dalam ${state.lastTime.toFixed(1).replace('.', ',')} s!`);
      sub2 = T(`The ${name.toLowerCase()} is still there, too small to see`, `${name} masih ada, hanya terlalu kecil untuk dilihat`);
      col = '#4ade80';
    } else if (state.status === 'saturated') {
      head = T('The water is full!', 'Airnya sudah penuh!');
      sub2 = T('No more will dissolve. Try warmer water.', 'Tidak ada lagi yang bisa larut. Coba air yang lebih hangat.');
      col = '#f87171';
    }
    ctx.fillStyle = col; ctx.fillText(head, W * 0.5, H * 0.065);
    if (sub2) { ctx.font = font(Math.max(11, W * 0.019), false); ctx.fillStyle = '#cbd5e1'; ctx.fillText(sub2, W * 0.5, H * 0.105); }

    // "how full is the water" meter for soluble substances
    const mx = W * 0.76, my0 = H * 0.3, mh = H * 0.5, mw = W * 0.05;
    if (s.soluble) {
      const cap = capacity();
      const frac = cap > 0 ? clamp(state.dissolvedCount / cap, 0, 1) : 0;
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(mx, my0, mw, mh, 8); ctx.fill();
      ctx.fillStyle = frac >= 0.999 ? '#f87171' : '#38bdf8';
      ctx.beginPath(); ctx.roundRect(mx, my0 + mh * (1 - frac), mw, mh * frac, 8); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(mx, my0, mw, mh, 8); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(Math.max(10, W * 0.017), false);
      ctx.fillText(T('How full?', 'Sudah penuh?'), mx + mw / 2, my0 - H * 0.08);
      ctx.fillText(T('water can hold', 'air bisa menampung'), mx + mw / 2, my0 - H * 0.045);
      ctx.font = font(Math.max(11, W * 0.02));
      ctx.fillText(`${(cap / s.perSpoon).toFixed(1)} ${T('spoons', 'sendok')}`, mx + mw / 2, my0 - H * 0.012);
      ctx.font = font(Math.max(10, W * 0.017), false);
      ctx.fillText(T(`dissolved: ${(state.dissolvedCount / s.perSpoon).toFixed(1)} spoons`, `larut: ${(state.dissolvedCount / s.perSpoon).toFixed(1).replace('.', ',')} sendok`), mx + mw / 2, my0 + mh + H * 0.05);
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = font(Math.max(10, W * 0.017), false);
    ctx.fillText(T(`${state.spoons} spoonful(s) added`, `${state.spoons} sendok ditambahkan`), gx0 + gw / 2, H * 0.965);
    ctx.textAlign = 'left';
  }

  // controls
  const subBtns = Object.keys(SUBS).map((k) => bigBtn(T(SUBS[k].en, SUBS[k].id), () => setSub(k)));
  function setSub(k) {
    state.sub = k;
    emptyGlass();
    Object.keys(SUBS).forEach((kk, i) => subBtns[i].el.classList.toggle('btn--primary', kk === k));
  }
  setSub('sugar');
  const tempS = slider({
    label: T('Water temperature (°C)', 'Suhu air (°C)'), key: 'temp', min: 10, max: 90, step: 5, value: 20,
    format: (v) => `${v}°C`, onInput: (v) => { state.temp = v; },
  });
  const addBtn = bigBtn(T('Add a spoonful', 'Tambah sesendok'), addSpoon, true);
  const stirBtn = bigBtn(T('Stir!', 'Aduk!'), () => { state.stir = 1; if (state.status === 'dissolving') state.stirredSince = true; });
  const emptyBtn = bigBtn(T('Empty the glass', 'Kosongkan gelas'), emptyGlass);
  ctrlPanel.append(row(...subBtns), tempS.el, row(addBtn, stirBtn, emptyBtn));

  const lab = labPanel({
    title: 'How fast does it dissolve?',
    filename: 'dissolving-data.csv',
    columns: [
      { key: 'substance', label: 'Substance' },
      { key: 'temp', label: 'Water temp (°C)' },
      { key: 'stirred', label: 'Stirred?' },
      { key: 'spoons', label: 'Spoonfuls in glass' },
      { key: 'time', label: 'Time to dissolve (s)' },
    ],
    procedure: [
      'Choose sugar. Set the water to 20 °C. Add one spoonful and wait until it says "All dissolved". Record.',
      'Empty the glass. Add one spoonful again, but press Stir! straight away. Record.',
      'Empty the glass. Set the water to 80 °C and add one spoonful. Record.',
      'Try sand, flour and oil. Wait 6 seconds each and record.',
      'Choose salt at 20 °C. Add spoonfuls one at a time until the water is full. Record how many fitted.',
    ],
    predict: 'Which will dissolve fastest: cold still water, cold stirred water, or hot still water?',
    source: () => {
      if (state.status === 'none') return null;
      const s = SUBS[state.sub];
      const time = state.status === 'done' ? state.lastTime.toFixed(1)
        : state.status === 'never' ? 'never'
          : state.status === 'saturated' ? 'water full'
            : 'still dissolving';
      return { substance: s.en, temp: state.temp, stirred: state.stirredSince || state.stir > 0 ? 'yes' : 'no', spoons: state.spoons, time };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
