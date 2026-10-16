import { createCanvas, loop } from '../../../lib/canvas.js';
import { toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const TARIFF = 1445;        // Rp per kWh (typical PLN household tariff)
const SOLAR_KWH = 4;        // kWh/day from a ~1 kWp rooftop system in Indonesia
// watts × hours per day
const APPLIANCES = [
  { key: 'lights', en: 'Lights (8 bulbs)', id: 'Lampu (8 bohlam)', watts: 320, ledWatts: 56, hours: 6, room: 'all' },
  { key: 'ac', en: 'Air conditioner', id: 'AC', watts: 800, hours: 8, room: 'bed' },
  { key: 'fan', en: 'Fan', id: 'Kipas', watts: 50, hours: 10, room: 'living' },
  { key: 'tv', en: 'TV', id: 'TV', watts: 100, hours: 5, room: 'living' },
  { key: 'fridge', en: 'Fridge', id: 'Kulkas', watts: 45, hours: 24, room: 'kitchen' },
  { key: 'heater', en: 'Water heater', id: 'Pemanas air', watts: 1500, hours: 1, room: 'kitchen' },
];

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}
const rp = (n) => 'Rp ' + String(Math.round(Math.max(0, n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tx = (o) => (getLocale() === 'id' ? o.id : o.en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const on = Object.fromEntries(APPLIANCES.map((a) => [a.key, true]));
  const state = { led: false, solar: false, wheel: 0, won: false, wonAt: -10, flash: null, flashAt: -10 };
  let now = 0;
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const kwhOf = (a) => ((state.led && a.ledWatts != null ? a.ledWatts : a.watts) * a.hours) / 1000;
  const useKwh = () => APPLIANCES.reduce((s, a) => s + (on[a.key] ? kwhOf(a) : 0), 0);
  const solarKwh = () => (state.solar ? Math.min(SOLAR_KWH, useKwh()) : 0);
  const netKwh = () => Math.max(0, useKwh() - solarKwh());
  const BASELINE = APPLIANCES.reduce((s, a) => s + (a.watts * a.hours) / 1000, 0);   // everything on, old bulbs, no solar
  const TARGET = BASELINE / 2;
  const monthly = (kwh) => kwh * 30 * TARIFF;
  const challengeOk = () => netKwh() <= TARGET && on.fridge;

  // --- layout: house occupies left 62%, meter right ---
  function houseBox() { const W = cv.width, H = cv.height; return { x: W * 0.03, y: H * 0.08, w: W * 0.58, h: H * 0.86 }; }
  function roomRects() {
    const { x, y, w, h } = houseBox();
    const top = y + h * 0.3, rh = h * 0.6;
    return {
      living: { x: x + w * 0.03, y: top, w: w * 0.36, h: rh },
      bed: { x: x + w * 0.41, y: top, w: w * 0.28, h: rh },
      kitchen: { x: x + w * 0.71, y: top, w: w * 0.26, h: rh },
    };
  }
  function applianceHits() {
    const r = roomRects(), u = houseBox().h;
    return [
      { key: 'tv', x: r.living.x + r.living.w * 0.5, y: r.living.y + r.living.h * 0.62, r: u * 0.09 },
      { key: 'fan', x: r.living.x + r.living.w * 0.15, y: r.living.y + r.living.h * 0.25, r: u * 0.07 },
      { key: 'lights', x: r.bed.x + r.bed.w * 0.25, y: r.bed.y + r.bed.h * 0.12, r: u * 0.06 },
      { key: 'ac', x: r.bed.x + r.bed.w * 0.7, y: r.bed.y + r.bed.h * 0.18, r: u * 0.08 },
      { key: 'fridge', x: r.kitchen.x + r.kitchen.w * 0.3, y: r.kitchen.y + r.kitchen.h * 0.6, r: u * 0.1 },
      { key: 'heater', x: r.kitchen.x + r.kitchen.w * 0.75, y: r.kitchen.y + r.kitchen.h * 0.3, r: u * 0.07 },
    ];
  }

  function drawHouse(ctx) {
    const { x, y, w, h } = houseBox();
    const rooms = roomRects();
    // roof
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath(); ctx.moveTo(x - w * 0.02, y + h * 0.3); ctx.lineTo(x + w * 0.5, y); ctx.lineTo(x + w * 1.02, y + h * 0.3); ctx.closePath(); ctx.fill();
    if (state.solar) {
      ctx.fillStyle = '#1e3a8a';
      for (let i = 0; i < 4; i++) {
        const t0 = 0.12 + i * 0.09, t1 = t0 + 0.08;
        const px0 = x + w * t0, py0 = y + h * 0.3 - (t0 / 0.5) * h * 0.3 + h * 0.03;
        const px1 = x + w * t1, py1 = y + h * 0.3 - (t1 / 0.5) * h * 0.3 + h * 0.03;
        ctx.beginPath(); ctx.moveTo(px0, py0); ctx.lineTo(px1, py1); ctx.lineTo(px1 + w * 0.02, py1 + h * 0.08); ctx.lineTo(px0 + w * 0.02, py0 + h * 0.08); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 1; ctx.stroke();
      }
      // sun
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x + w * 0.9, y + h * 0.05, h * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fef08a'; ctx.font = font(h * 0.04, true); ctx.textAlign = 'center';
      ctx.fillText(`☀ +${SOLAR_KWH} kWh/${T('day', 'hari')}`, x + w * 0.3, y + h * 0.1);
    }
    // walls / floor
    ctx.fillStyle = '#fef3c7'; ctx.fillRect(x, y + h * 0.3, w, h * 0.6);
    ctx.fillStyle = '#92400e'; ctx.fillRect(x - w * 0.02, y + h * 0.9, w * 1.04, h * 0.04);
    for (const [name, r] of Object.entries(rooms)) {
      ctx.fillStyle = name === 'bed' ? '#e0e7ff' : name === 'kitchen' ? '#dcfce7' : '#fde68a';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2; ctx.strokeRect(r.x, r.y, r.w, r.h);
      // light glow
      if (on.lights) {
        ctx.fillStyle = state.led ? 'rgba(254,249,195,0.55)' : 'rgba(253,224,71,0.5)';
        ctx.beginPath(); ctx.moveTo(r.x + r.w * 0.25, r.y); ctx.lineTo(r.x + r.w * 0.05, r.y + r.h); ctx.lineTo(r.x + r.w * 0.45, r.y + r.h); ctx.closePath(); ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(15,23,42,0.45)'; ctx.fillRect(r.x, r.y, r.w, r.h);
      }
      // bulb
      ctx.fillStyle = on.lights ? (state.led ? '#fefce8' : '#fde047') : '#64748b';
      ctx.beginPath(); ctx.arc(r.x + r.w * 0.25, r.y + r.h * 0.12, r.h * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#334155'; ctx.font = font(r.h * 0.07); ctx.textAlign = 'left';
      ctx.fillText(name === 'bed' ? T('bedroom', 'kamar tidur') : name === 'kitchen' ? T('kitchen', 'dapur') : T('living room', 'ruang tamu'), r.x + 6, r.y + r.h - 6);
    }
    const hits = applianceHits();
    for (const hit of hits) {
      const a = APPLIANCES.find((k) => k.key === hit.key), isOn = on[hit.key], s = hit.r;
      ctx.save(); ctx.translate(hit.x, hit.y);
      if (hit.key === 'tv') {
        ctx.fillStyle = '#1f2937'; ctx.fillRect(-s, -s * 0.65, s * 2, s * 1.3);
        ctx.fillStyle = isOn ? '#60a5fa' : '#0f172a'; ctx.fillRect(-s * 0.9, -s * 0.55, s * 1.8, s * 1.1);
        if (isOn) { ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(Math.sin(now * 2) * s * 0.3, 0, s * 0.2, 0, Math.PI * 2); ctx.fill(); }
      } else if (hit.key === 'fan') {
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -s * 1.1); ctx.lineTo(0, -s * 0.4); ctx.stroke();
        ctx.fillStyle = isOn ? '#94a3b8' : '#64748b';
        const rot = isOn ? now * 12 : 0;
        for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(Math.cos(rot + i * 2.09) * s * 0.4, Math.sin(rot + i * 2.09) * s * 0.4, s * 0.45, s * 0.2, rot + i * 2.09, 0, Math.PI * 2); ctx.fill(); }
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2); ctx.fill();
      } else if (hit.key === 'lights') {
        // bulb in bedroom already drawn; draw a switch plate as the tap target
        ctx.fillStyle = '#f8fafc'; ctx.fillRect(-s * 0.5, -s * 0.5, s, s);
        ctx.fillStyle = isOn ? '#22c55e' : '#94a3b8'; ctx.fillRect(-s * 0.2, isOn ? -s * 0.35 : -s * 0.05, s * 0.4, s * 0.4);
      } else if (hit.key === 'ac') {
        ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.roundRect(-s * 1.3, -s * 0.45, s * 2.6, s * 0.9, 6); ctx.fill();
        ctx.fillStyle = isOn ? '#22c55e' : '#64748b'; ctx.fillRect(s * 0.8, -s * 0.2, s * 0.3, s * 0.15);
        if (isOn) {
          ctx.strokeStyle = 'rgba(96,165,250,0.8)'; ctx.lineWidth = 2;
          for (let i = 0; i < 3; i++) { const ph = (now * 0.8 + i / 3) % 1; ctx.globalAlpha = 1 - ph; ctx.beginPath(); ctx.moveTo(-s * 0.8, s * 0.5 + ph * s * 1.5); ctx.quadraticCurveTo(0, s * 0.9 + ph * s * 1.5, s * 0.8, s * 0.5 + ph * s * 1.5); ctx.stroke(); }
          ctx.globalAlpha = 1;
        }
      } else if (hit.key === 'fridge') {
        ctx.fillStyle = isOn ? '#e2e8f0' : '#94a3b8'; ctx.beginPath(); ctx.roundRect(-s * 0.6, -s * 1.1, s * 1.2, s * 2.2, 6); ctx.fill();
        ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-s * 0.6, -s * 0.4); ctx.lineTo(s * 0.6, -s * 0.4); ctx.stroke();
        ctx.fillStyle = '#475569'; ctx.fillRect(s * 0.3, -s * 0.9, s * 0.1, s * 0.35); ctx.fillRect(s * 0.3, -s * 0.2, s * 0.1, s * 0.6);
        if (!isOn) { ctx.fillStyle = '#ef4444'; ctx.font = font(s * 0.45, true); ctx.textAlign = 'center'; ctx.fillText(T('food spoils!', 'makanan basi!'), 0, -s * 1.3); }
      } else if (hit.key === 'heater') {
        ctx.fillStyle = isOn ? '#fca5a5' : '#cbd5e1'; ctx.beginPath(); ctx.roundRect(-s * 0.6, -s * 0.9, s * 1.2, s * 1.8, s * 0.5); ctx.fill();
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, s * 0.9); ctx.lineTo(0, s * 1.5); ctx.stroke();
        if (isOn) { ctx.strokeStyle = 'rgba(248,113,113,0.8)'; ctx.lineWidth = 2; for (let i = -1; i <= 1; i++) { const ph = (now + i * 0.3) % 1; ctx.beginPath(); ctx.moveTo(i * s * 0.3, -s * 1.0 - ph * s * 0.6); ctx.quadraticCurveTo(i * s * 0.3 + s * 0.15, -s * 1.2 - ph * s * 0.6, i * s * 0.3, -s * 1.4 - ph * s * 0.6); ctx.stroke(); } }
      }
      ctx.restore();
      // label with watts, and a dim overlay when off
      ctx.fillStyle = isOn ? '#166534' : '#64748b'; ctx.font = font(s * 0.4, true); ctx.textAlign = 'center';
      const watts = state.led && a.ledWatts != null ? a.ledWatts : a.watts;
      ctx.fillText(`${tx(a)} · ${watts} W`, hit.x, hit.y + s * 1.75);
      ctx.fillText(isOn ? T('ON', 'NYALA') : T('OFF', 'MATI'), hit.x, hit.y + s * 2.2);
      if (state.flash === hit.key && now - state.flashAt < 0.5) {
        ctx.strokeStyle = `rgba(250,204,21,${1 - (now - state.flashAt) / 0.5})`; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(hit.x, hit.y, s * (1.3 + (now - state.flashAt)), 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = font(h * 0.035); ctx.textAlign = 'left';
    ctx.fillText(T('tap an appliance to switch it on or off', 'ketuk peralatan untuk menyalakan atau mematikannya'), x, y + h * 0.99);
  }

  function drawMeter(ctx) {
    const W = cv.width, H = cv.height;
    const mx = W * 0.65, my = H * 0.06, mw = W * 0.33, mh = H * 0.88;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(mx, my, mw, mh, 14); ctx.fill();
    const use = useKwh(), net = netKwh();
    // dial
    const cx = mx + mw / 2, cy = my + mh * 0.25, r = Math.min(mw * 0.4, mh * 0.18);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = r * 0.18; ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); ctx.stroke();
    const frac = clamp(net / BASELINE, 0, 1);
    ctx.strokeStyle = frac > 0.5 ? '#ef4444' : frac > 0.25 ? '#f59e0b' : '#22c55e';
    ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * frac); ctx.stroke();
    // target tick
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; const ta = Math.PI * 1.5;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(ta) * r * 0.85, cy + Math.sin(ta) * r * 0.85); ctx.lineTo(cx + Math.cos(ta) * r * 1.15, cy + Math.sin(ta) * r * 1.15); ctx.stroke();
    ctx.fillStyle = '#f8fafc'; ctx.font = font(r * 0.45, true); ctx.textAlign = 'center';
    ctx.fillText(`${net.toFixed(1)} kWh`, cx, cy - r * 0.05);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(r * 0.25);
    ctx.fillText(T('per day from the grid', 'per hari dari jaringan'), cx, cy + r * 0.25);
    // spinning disc
    state.wheel += (net / BASELINE) * 4 * 0.016;
    const dx = mx + mw * 0.5, dy = my + mh * 0.42, dr = r * 0.22;
    ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.arc(dx, dy, dr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(dx, dy); ctx.arc(dx, dy, dr, state.wheel, state.wheel + 0.5); ctx.closePath(); ctx.fill();
    // numbers
    ctx.textAlign = 'left'; const lx = mx + mw * 0.08; let ly = my + mh * 0.52; const lh = mh * 0.055;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(lh * 0.6);
    ctx.fillText(`${T('appliances use', 'peralatan memakai')}: ${use.toFixed(1)} kWh/${T('day', 'hari')}`, lx, ly); ly += lh;
    if (state.solar) { ctx.fillStyle = '#fde047'; ctx.fillText(`${T('solar makes', 'surya menghasilkan')}: −${solarKwh().toFixed(1)} kWh/${T('day', 'hari')}`, lx, ly); ly += lh; }
    ctx.fillStyle = '#e2e8f0'; ctx.fillText(`${T('per month', 'per bulan')}: ${(net * 30).toFixed(0)} kWh`, lx, ly); ly += lh;
    ctx.fillStyle = '#fbbf24'; ctx.font = font(lh * 0.8, true);
    ctx.fillText(`${T('bill', 'tagihan')}: ${rp(monthly(net))}`, lx, ly + lh * 0.2); ly += lh * 1.6;
    // challenge
    ctx.fillStyle = '#94a3b8'; ctx.font = font(lh * 0.55);
    ctx.fillText(T('Challenge: cut the bill by half', 'Tantangan: potong tagihan setengahnya'), lx, ly); ly += lh * 0.8;
    ctx.fillText(`${T('target', 'target')} ≤ ${rp(monthly(TARGET))} (${TARGET.toFixed(1)} kWh/${T('day', 'hari')})`, lx, ly); ly += lh * 0.7;
    const bw = mw * 0.84, bh = lh * 0.6;
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.roundRect(lx, ly, bw, bh, 6); ctx.fill();
    ctx.fillStyle = challengeOk() ? '#22c55e' : '#ef4444'; ctx.beginPath(); ctx.roundRect(lx, ly, bw * clamp(net / BASELINE, 0.02, 1), bh, 6); ctx.fill();
    ctx.strokeStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(lx + bw * 0.5, ly - 3); ctx.lineTo(lx + bw * 0.5, ly + bh + 3); ctx.stroke();
    ly += bh + lh * 0.9;
    ctx.font = font(lh * 0.7, true);
    if (challengeOk()) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText(T('You did it! Bill cut in half.', 'Berhasil! Tagihan terpotong setengah.'), lx, ly);
      // stars
      for (let i = 0; i < 3; i++) { const sx = lx + i * lh * 1.1 + lh * 0.4, sy = ly + lh * 1.0, sr = lh * 0.35 * (1 + 0.1 * Math.sin(now * 4 + i)); star(ctx, sx, sy, sr, '#facc15'); }
    } else if (!on.fridge) {
      ctx.fillStyle = '#f87171'; ctx.fillText(T('Keep the fridge on: food would spoil!', 'Kulkas harus menyala: makanan bisa basi!'), lx, ly);
    } else {
      ctx.fillStyle = '#fca5a5'; ctx.fillText(`${T('still', 'masih')} ${(net - TARGET).toFixed(1)} kWh/${T('day', 'hari')} ${T('too much', 'terlalu banyak')}`, lx, ly);
    }
  }
  function star(ctx, x, y, r, color) {
    ctx.fillStyle = color; ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
    ctx.closePath(); ctx.fill();
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawHouse(ctx);
    drawMeter(ctx);
    ctx.textAlign = 'left';
  }

  // --- input ---
  function localPos(e) {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / Math.max(1, r.width)), y: (e.clientY - r.top) * (cv.height / Math.max(1, r.height)) };
  }
  const toggles = {};
  function setOn(key, v) { on[key] = v; if (toggles[key]) toggles[key].value = v; state.flash = key; state.flashAt = now; }
  const onDown = (e) => {
    const p = localPos(e);
    for (const h of applianceHits()) if (Math.hypot(p.x - h.x, p.y - h.y) < h.r * 1.6) { setOn(h.key, !on[h.key]); e.preventDefault(); return; }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // --- controls ---
  for (const a of APPLIANCES) {
    toggles[a.key] = toggle({ label: tx(a), key: a.key, value: true, onChange: (v) => { on[a.key] = v; state.flash = a.key; state.flashAt = now; } });
    toggles[a.key].el.style.minHeight = '44px';
  }
  const ledT = toggle({ label: T('LED bulbs', 'Bohlam LED'), key: 'led', value: false, onChange: (v) => { state.led = v; } });
  const solarT = toggle({ label: T('Rooftop solar panels', 'Panel surya di atap'), key: 'solar', value: false, onChange: (v) => { state.solar = v; } });
  ledT.el.style.minHeight = '44px'; solarT.el.style.minHeight = '44px';
  const allOn = bigBtn(T('Everything on (start again)', 'Nyalakan semua (mulai lagi)'), () => {
    for (const a of APPLIANCES) setOn(a.key, true);
    ledT.apply(false); solarT.apply(false);
  });
  ctrlPanel.append(row(...APPLIANCES.slice(0, 3).map((a) => toggles[a.key])), row(...APPLIANCES.slice(3).map((a) => toggles[a.key])), row(ledT, solarT), row(allOn));

  const lab = labPanel({
    title: 'Energy saving plans',
    filename: 'save-energy-home-data.csv',
    columns: [
      { key: 'on', label: 'Switched on' },
      { key: 'led', label: 'LED?' },
      { key: 'solar', label: 'Solar?' },
      { key: 'kwh', label: 'kWh per day', format: (v) => v.toFixed(2) },
      { key: 'bill', label: 'Bill per month (Rp)', format: (v) => Math.round(v).toLocaleString('id-ID') },
    ],
    procedure: [
      'Switch everything on, old bulbs, no solar. Record this as your starting point.',
      'Switch off ONE appliance at a time (then back on). Record each one. Which saves the most?',
      'Turn on LED bulbs and record. Then add solar panels and record.',
      'Find a plan that wins the challenge with the fridge still on. Record it.',
    ],
    predict: 'Which appliance do you think uses the most electricity in a day? Which uses the least?',
    source: () => ({
      on: APPLIANCES.filter((a) => on[a.key]).map((a) => a.en).join(' + ') || 'nothing',
      led: state.led ? 'yes' : 'no', solar: state.solar ? 'yes' : 'no',
      kwh: netKwh(), bill: monthly(netKwh()),
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
