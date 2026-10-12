import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const ACTIVITIES = {
  rest:    { rate: 15, tidal: 500,  en: 'Resting', id: 'Istirahat' },
  walking: { rate: 24, tidal: 1000, en: 'Walking', id: 'Berjalan' },
  running: { rate: 40, tidal: 2000, en: 'Running', id: 'Berlari' },
};
const BASE_AIR = 2500; // mL left in the lungs after a normal breath out

export function mount(rootEl) {
  const L = (en, id) => (getLocale() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { activity: 'rest', auto: true };
  let phase = 0;        // breath cycles (fractional)
  let ph = 0;           // 0 = breathed out, 1 = breathed in
  let lastPh = 0;
  let flow = 0;         // >0 air in, <0 air out
  let breaths = 0;
  let oneShot = false;  // single breath requested
  let gasT = 0;         // gas-exchange animation clock
  const act = () => ACTIVITIES[params.activity];
  const font = (px, bold) => `${bold ? 'bold ' : ''}${px}px system-ui, -apple-system, Roboto, sans-serif`;

  // Bell-jar geometry (recomputed from canvas size each frame)
  function jar() {
    const W = cv.width, H = cv.height;
    return { x: W * 0.05, y: H * 0.16, w: W * 0.26, h: H * 0.6, amp: H * 0.09 };
  }
  function sheetY() { const j = jar(); return j.y + j.h + ph * j.amp; }

  function step(dt) {
    if (cv.width === 0) return;
    if (params.auto || oneShot) {
      const prev = phase;
      phase += dt * act().rate / 60;
      ph = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
      if (Math.floor(phase) > Math.floor(prev)) { breaths++; if (oneShot) { oneShot = false; ph = 0; phase = Math.floor(phase); } }
    }
    flow = (ph - lastPh) / Math.max(dt, 1e-3);
    lastPh = ph;
    gasT += dt * (0.4 + act().rate / 40);
  }

  function draw(t) {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W === 0 || H === 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const j = jar();
    const a = act();
    const depth = 0.5 + 0.5 * (a.tidal / 2000); // visual depth of balloons

    // ---- Bell-jar model ----
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(13, true); ctx.textAlign = 'center';
    ctx.fillText(L('Bell-jar model', 'Model toples'), j.x + j.w / 2, j.y - 22);
    ctx.strokeStyle = 'rgba(165,243,252,0.8)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(j.x, j.y + j.h); ctx.lineTo(j.x, j.y + 30); ctx.quadraticCurveTo(j.x, j.y, j.x + 30, j.y);
    ctx.lineTo(j.x + j.w - 30, j.y); ctx.quadraticCurveTo(j.x + j.w, j.y, j.x + j.w, j.y + 30); ctx.lineTo(j.x + j.w, j.y + j.h); ctx.stroke();
    // Y tube
    const cx = j.x + j.w / 2;
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(cx, j.y - 14); ctx.lineTo(cx, j.y + j.h * 0.25);
    ctx.lineTo(cx - j.w * 0.18, j.y + j.h * 0.4); ctx.moveTo(cx, j.y + j.h * 0.25); ctx.lineTo(cx + j.w * 0.18, j.y + j.h * 0.4); ctx.stroke();
    // Balloons
    const br = j.w * 0.09 + ph * j.w * 0.1 * depth;
    for (const s of [-1, 1]) {
      ctx.fillStyle = 'rgba(248,113,113,0.85)';
      ctx.beginPath(); ctx.ellipse(cx + s * j.w * 0.18, j.y + j.h * 0.4 + br * 1.1, br * 0.8, br * 1.1, 0, 0, Math.PI * 2); ctx.fill();
    }
    // Rubber sheet (diaphragm) with handle
    const sy = sheetY();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(j.x, j.y + j.h); ctx.quadraticCurveTo(cx, sy + (sy - j.y - j.h) * 0.6, j.x + j.w, j.y + j.h); ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cx, sy, 11, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(11);
    ctx.fillText(L('rubber sheet = diaphragm (drag me)', 'lembar karet = diafragma (seret aku)'), cx, j.y + j.h + j.amp + 30);
    ctx.fillText(L('balloons = lungs', 'balon = paru-paru'), cx, j.y + j.h * 0.4 + br * 2.4 + 14);
    // Air flow arrow at the tube mouth
    if (Math.abs(flow) > 0.05) {
      const dir = flow > 0 ? 1 : -1;
      ctx.fillStyle = flow > 0 ? '#38bdf8' : '#f87171';
      for (const ax of [cx, W * 0.5]) {
        const ay = j.y - 30;
        ctx.beginPath(); ctx.moveTo(ax, ay + dir * 12); ctx.lineTo(ax - 7, ay - dir * 2); ctx.lineTo(ax + 7, ay - dir * 2); ctx.fill();
        ctx.fillRect(ax - 2, ay - 14, 4, 14);
      }
    }

    // ---- Real chest ----
    const bx = W * 0.5, by = j.y;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(13, true);
    ctx.fillText(L('Real chest', 'Dada sungguhan'), bx, by - 22);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.ellipse(bx, by + j.h * 0.5, j.w * 0.55, j.h * 0.55, 0, 0, Math.PI * 2); ctx.fill();
    // Trachea + lungs
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(bx, by - 14); ctx.lineTo(bx, by + j.h * 0.25); ctx.stroke();
    const lr = j.w * 0.14 + ph * j.w * 0.05 * depth;
    for (const s of [-1, 1]) {
      ctx.fillStyle = 'rgba(244,114,182,0.8)';
      ctx.beginPath(); ctx.ellipse(bx + s * j.w * 0.2, by + j.h * 0.42, lr, lr * 1.5, 0, 0, Math.PI * 2); ctx.fill();
    }
    // Ribs
    ctx.strokeStyle = 'rgba(226,232,240,0.45)'; ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      const ry = by + j.h * 0.2 + i * j.h * 0.1;
      ctx.beginPath(); ctx.ellipse(bx, ry, j.w * 0.42 + ph * 6, j.h * 0.05, 0, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
    }
    // Diaphragm: domed up when breathed out, flatter when breathed in
    const dy = by + j.h * 0.72;
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(bx - j.w * 0.5, dy + 10); ctx.quadraticCurveTo(bx, dy - j.h * 0.18 * (1 - ph) + j.h * 0.06 * ph, bx + j.w * 0.5, dy + 10); ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(11);
    ctx.fillText(L('diaphragm', 'diafragma'), bx, dy + 30);

    // ---- Alveolus close-up ----
    const ax = W * 0.8, ay = H * 0.28, ar = Math.min(W, H) * 0.11;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(13, true);
    ctx.fillText(L('Inside one alveolus', 'Di dalam satu alveolus'), ax, j.y - 22);
    // Capillary: blood turns from blue (low oxygen) to red (high oxygen) as it passes
    const grad = ctx.createLinearGradient(ax - ar * 1.5, 0, ax + ar * 1.5, 0);
    grad.addColorStop(0, '#3b82f6'); grad.addColorStop(1, '#ef4444');
    ctx.strokeStyle = grad; ctx.lineWidth = ar * 0.45;
    ctx.beginPath(); ctx.moveTo(ax - ar * 1.6, ay + ar * 1.1); ctx.quadraticCurveTo(ax, ay + ar * 1.9, ax + ar * 1.6, ay + ar * 1.1); ctx.stroke();
    ctx.fillStyle = 'rgba(253,224,71,0.25)';
    ctx.beginPath(); ctx.arc(ax, ay, ar, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fde047'; ctx.lineWidth = 2; ctx.stroke();
    // O2 dots go alveolus -> blood; CO2 dots go blood -> alveolus
    for (let i = 0; i < 6; i++) {
      const u = (gasT * 0.25 + i / 6) % 1;
      const sx = ax - ar * 0.6 + i * ar * 0.25;
      const inY = ay - ar * 0.3 + (i % 2) * ar * 0.4, bloodY = ay + ar * 1.35;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath(); ctx.arc(sx, inY + (bloodY - inY) * u, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath(); ctx.arc(sx + ar * 0.12, bloodY + (inY - bloodY) * u, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.font = font(11); ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8'; ctx.fillText(L('● oxygen → into blood', '● oksigen → masuk darah'), ax - ar * 1.6, ay + ar * 2.3);
    ctx.fillStyle = '#94a3b8'; ctx.fillText(L('● carbon dioxide → out', '● karbon dioksida → keluar'), ax - ar * 1.6, ay + ar * 2.3 + 16);

    // ---- Readouts ----
    const rx = W * 0.66, ry = H * 0.64, rw = W * 0.31;
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(rx, ry, rw, H * 0.33);
    const air = BASE_AIR + a.tidal * ph;
    const state = flow > 0.05 ? L('air IN', 'udara MASUK') : flow < -0.05 ? L('air OUT', 'udara KELUAR') : L('paused', 'jeda');
    const pressure = flow > 0.05 ? L('lower than outside', 'lebih rendah dari luar') : flow < -0.05 ? L('higher than outside', 'lebih tinggi dari luar') : L('same as outside', 'sama dengan luar');
    ctx.fillStyle = '#fff'; ctx.font = font(13, true);
    ctx.fillText(`${L(a.en, a.id)} · ${a.rate} ${L('breaths/min', 'napas/menit')}`, rx + 12, ry + 22);
    ctx.font = font(12); ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${L('Air in lungs', 'Udara di paru-paru')}: ${Math.round(air)} mL`, rx + 12, ry + 44);
    ctx.fillText(`${L('Chest volume', 'Volume dada')}: ${ph > 0.5 ? L('big', 'besar') : L('small', 'kecil')}   ${L('Pressure', 'Tekanan')}: ${pressure}`, rx + 12, ry + 62);
    ctx.fillStyle = flow > 0.05 ? '#38bdf8' : flow < -0.05 ? '#f87171' : '#94a3b8';
    ctx.font = font(13, true); ctx.fillText(state, rx + 12, ry + 84);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(12);
    ctx.fillText(`${L('Air per breath', 'Udara per napas')}: ${a.tidal} mL`, rx + 12, ry + 106);
    ctx.fillText(`${L('Air per minute', 'Udara per menit')}: ${a.rate} × ${a.tidal} = ${a.rate * a.tidal} mL (${(a.rate * a.tidal / 1000).toFixed(1)} L)`, rx + 12, ry + 124);
    ctx.fillStyle = '#fbbf24'; ctx.font = font(13, true);
    ctx.fillText(`${L('Breaths taken', 'Napas diambil')}: ${breaths}`, rx + 12, ry + 148);
    // Volume bar
    ctx.fillStyle = '#334155'; ctx.fillRect(rx + 12, ry + H * 0.33 - 18, rw - 24, 8);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(rx + 12, ry + H * 0.33 - 18, (rw - 24) * (air / 4500), 8);
  }

  // Drag the rubber sheet: sets the breath position by hand and stops auto-breathing.
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const j = jar();
      return Math.hypot(x - (j.x + j.w / 2), y - sheetY()) < 18 ? 'sheet' : null;
    },
    onStart() { params.auto = false; oneShot = false; autoT.value = false; },
    onDrag(_id, _x, y) {
      const j = jar();
      ph = Math.max(0, Math.min(1, (y - (j.y + j.h)) / j.amp));
      phase = Math.acos(1 - 2 * ph) / (Math.PI * 2) + Math.floor(phase);
    },
    handles: () => {
      const j = jar();
      return [{ id: 'sheet', x: j.x + j.w / 2, y: sheetY(), label: L('Diaphragm sheet (drag down to breathe in)', 'Lembar diafragma (seret ke bawah untuk menarik napas)') }];
    },
    cursor: 'grab',
    hoverCursor: 'grab',
  });

  const actSel = select({ label: L('Activity', 'Aktivitas'), key: 'activity', value: params.activity,
    options: Object.keys(ACTIVITIES).map((k) => ({ value: k, label: `${L(ACTIVITIES[k].en, ACTIVITIES[k].id)} (${ACTIVITIES[k].rate}/min)` })),
    onChange: (v) => { params.activity = v; } });
  const autoT = toggle({ label: L('Breathe automatically', 'Bernapas otomatis'), key: 'auto', value: params.auto, onChange: (v) => { params.auto = v; } });
  const once = button({ label: L('One breath', 'Satu napas'), primary: true, onClick: () => { oneShot = true; } });
  const resetB = button({ label: L('Reset counter', 'Reset hitungan'), onClick: () => { breaths = 0; } });
  ctrlPanel.append(actSel.el, row(autoT, once, resetB));

  const lab = labPanel({
    title: L('Breathing lab', 'Lab pernapasan'),
    filename: 'breathing-lungs-lab.csv',
    columns: [
      { key: 'activity', label: L('activity', 'aktivitas') },
      { key: 'rate', label: L('breaths per minute', 'napas per menit') },
      { key: 'tidal', label: L('air per breath (mL)', 'udara per napas (mL)') },
      { key: 'perMin', label: L('air per minute (mL)', 'udara per menit (mL)') },
    ],
    procedure: [
      L('Drag the rubber sheet down and up a few times. Watch the balloons, the pressure and the air arrow.', 'Seret lembar karet turun dan naik beberapa kali. Lihat balon, tekanan, dan panah udara.'),
      L('Turn on automatic breathing at Resting. Count the breaths for 20 seconds; multiply by 3. Record.', 'Nyalakan napas otomatis saat Istirahat. Hitung napas selama 20 detik; kalikan 3. Catat.'),
      L('Switch to Walking, then Running. Record each.', 'Ganti ke Berjalan, lalu Berlari. Catat masing-masing.'),
      L('Check: air per minute = breaths per minute × air per breath. Does your table agree?', 'Cek: udara per menit = napas per menit × udara per napas. Apakah tabelmu cocok?'),
      L('How many times more air per minute does running use than resting?', 'Berapa kali lebih banyak udara per menit saat berlari dibanding istirahat?'),
    ],
    predict: L('When you run, do you think you breathe faster, deeper, or both? About how much more air per minute?', 'Saat berlari, menurutmu napasmu lebih cepat, lebih dalam, atau keduanya? Kira-kira berapa kali lebih banyak udara per menit?'),
    source: () => { const a = act(); return { activity: L(a.en, a.id), rate: a.rate, tidal: a.tidal, perMin: a.rate * a.tidal }; },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { step(dt); draw(t); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
