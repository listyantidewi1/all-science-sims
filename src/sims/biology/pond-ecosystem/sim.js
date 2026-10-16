import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const DAYS_PER_SEC = 2;
const START = { A: 50, F: 30, S: 15, B: 5 };     // populations on a 0..100-ish scale
const PRESETS = [
  { key: 'clean', sun: 70, temp: 26, pol: 0, en: 'Clean sunny pond', id: 'Kolam bersih dan cerah' },
  { key: 'cloudy', sun: 20, temp: 26, pol: 0, en: 'What if… a cloudy week?', id: 'Jika… minggu mendung?' },
  { key: 'hot', sun: 70, temp: 36, pol: 0, en: 'What if… a hot summer?', id: 'Jika… musim panas terik?' },
  { key: 'fert', sun: 70, temp: 26, pol: 60, en: 'What if… a fertiliser spill?', id: 'Jika… tumpahan pupuk?' },
  { key: 'waste', sun: 70, temp: 26, pol: 100, en: 'What if… factory waste?', id: 'Jika… limbah pabrik?' },
];

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tx = (o) => (getLocale() === 'id' ? o.id : o.en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { sun: 70, temp: 26, pol: 0 };     // sunlight %, °C, pollution %
  const P = { ...START };
  const state = { day: 0, sinceChange: 0, acc: 0 };
  let now = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  // Decorative creatures: fixed random seeds so they do not jump around between frames.
  const seeds = Array.from({ length: 60 }, (_, i) => ({ x: ((i * 0.618) % 1), y: ((i * 0.377 + 0.1) % 1), ph: i * 1.7, dir: i % 2 ? 1 : -1 }));

  // --- model (per day) ---------------------------------------------------
  function deriv(sun, temp, pol) {
    const { A, F, S, B } = P;
    const tf = Math.exp(-(((temp - 26) / 10) ** 2));                       // algae like about 26 °C
    const oxy = Math.max(0.05, 1 - 0.5 * pol) * (temp > 30 ? Math.max(0.3, 1 - (temp - 30) / 12) : 1);   // warm or dirty water: less oxygen
    const heat = temp > 32 ? (temp - 32) * 0.05 : 0;
    const K = 100 * (1 + 0.6 * pol);                                        // fertiliser feeds algae
    return {
      dA: A * (0.9 * sun * tf + 0.03) * (1 - A / K) - 0.012 * F * A,
      dF: F * (0.012 * A * oxy - 0.28 - 0.1 * pol) - 0.015 * S * F,
      dS: S * (0.012 * F * oxy - 0.22 - 0.1 * pol - heat) - 0.02 * B * S,
      dB: B * (0.016 * S * oxy - 0.18 - 0.2 * pol - heat),
    };
  }
  function step(dt) {
    state.acc += dt * DAYS_PER_SEC;
    const h = 0.05;
    let n = 0;
    while (state.acc >= h && n < 20) {
      const d = deriv(params.sun / 100, params.temp, params.pol / 100);
      P.A = clamp(P.A + d.dA * h, 0.5, 200);
      P.F = clamp(P.F + d.dF * h, 0.3, 200);
      P.S = clamp(P.S + d.dS * h, 0.2, 200);
      P.B = clamp(P.B + d.dB * h, 0.1, 200);
      state.acc -= h; state.day += h; n++;
    }
    state.sinceChange += dt;
  }
  const smallFish = () => Math.round(P.S);
  const bigFish = () => Math.round(P.B);
  const oxygenPct = () => Math.round(100 * Math.max(0.05, 1 - 0.5 * params.pol / 100) * (params.temp > 30 ? Math.max(0.3, 1 - (params.temp - 30) / 12) : 1));

  // --- drawing -----------------------------------------------------------
  function drawFish(ctx, x, y, s, color, dir) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.ellipse(x, y, s, s * 0.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x - dir * s * 0.9, y); ctx.lineTo(x - dir * s * 1.6, y - s * 0.5); ctx.lineTo(x - dir * s * 1.6, y + s * 0.5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#0b1220'; ctx.beginPath(); ctx.arc(x + dir * s * 0.5, y - s * 0.12, Math.max(1, s * 0.1), 0, Math.PI * 2); ctx.fill();
  }
  function drawScene(ctx, x, y, w, h) {
    const sun = params.sun / 100, pol = params.pol / 100;
    // sky
    const sky = ctx.createLinearGradient(0, y, 0, y + h * 0.3);
    sky.addColorStop(0, `rgb(${Math.round(40 + 60 * sun)},${Math.round(80 + 100 * sun)},${Math.round(140 + 100 * sun)})`);
    sky.addColorStop(1, '#94a3b8');
    ctx.fillStyle = sky; ctx.fillRect(x, y, w, h * 0.3);
    // sun / clouds
    ctx.fillStyle = `rgba(250,204,21,${0.3 + 0.7 * sun})`;
    ctx.beginPath(); ctx.arc(x + w * 0.82, y + h * 0.12, h * (0.05 + 0.05 * sun), 0, Math.PI * 2); ctx.fill();
    if (sun < 0.6) {
      ctx.fillStyle = `rgba(226,232,240,${0.9 - sun})`;
      for (let i = 0; i < 3; i++) {
        const cx = x + w * (0.15 + i * 0.3) + Math.sin(now * 0.2 + i) * w * 0.02, cy = y + h * 0.1;
        ctx.beginPath(); ctx.arc(cx, cy, h * 0.06, 0, Math.PI * 2); ctx.arc(cx + h * 0.07, cy - h * 0.02, h * 0.07, 0, Math.PI * 2); ctx.arc(cx + h * 0.15, cy, h * 0.055, 0, Math.PI * 2); ctx.fill();
      }
    }
    // thermometer-ish temperature cue
    ctx.fillStyle = '#f8fafc'; ctx.font = font(h * 0.055, true); ctx.textAlign = 'left';
    ctx.fillText(`${params.temp} °C`, x + w * 0.03, y + h * 0.1);
    // bank
    ctx.fillStyle = '#65a30d'; ctx.fillRect(x, y + h * 0.27, w, h * 0.05);
    // water: blue tinted green by algae and brown by pollution
    const algae = clamp(P.A / 120, 0, 1);
    const r = Math.round(30 + 70 * pol + 10 * algae), g = Math.round(90 + 90 * algae - 30 * pol), b = Math.round(170 - 110 * algae - 90 * pol);
    const wg = ctx.createLinearGradient(0, y + h * 0.3, 0, y + h);
    wg.addColorStop(0, `rgb(${r},${g},${b})`); wg.addColorStop(1, `rgb(${Math.round(r * 0.5)},${Math.round(g * 0.5)},${Math.round(b * 0.5)})`);
    ctx.fillStyle = wg; ctx.fillRect(x, y + h * 0.3, w, h * 0.7);
    // pollution: pipe + dark plume
    if (pol > 0.02) {
      ctx.fillStyle = '#475569'; ctx.fillRect(x, y + h * 0.22, w * 0.08, h * 0.06);
      ctx.fillStyle = `rgba(69,26,3,${0.25 + 0.5 * pol})`;
      ctx.beginPath(); ctx.moveTo(x + w * 0.08, y + h * 0.3); ctx.quadraticCurveTo(x + w * (0.1 + 0.3 * pol), y + h * 0.45, x + w * (0.05 + 0.4 * pol), y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + h * 0.3); ctx.fill();
    }
    ctx.save(); ctx.beginPath(); ctx.rect(x, y + h * 0.3, w, h * 0.7); ctx.clip();
    // algae blobs
    const nA = Math.round(clamp(P.A / 160, 0, 1) * 40);
    ctx.fillStyle = 'rgba(34,197,94,0.75)';
    for (let i = 0; i < nA; i++) { const s = seeds[i]; ctx.beginPath(); ctx.arc(x + w * s.x, y + h * (0.33 + s.y * 0.62), h * 0.012 + h * 0.01 * Math.sin(now + s.ph), 0, Math.PI * 2); ctx.fill(); }
    // water fleas
    const nF = Math.round(clamp(P.F / 50, 0, 1) * 25);
    ctx.fillStyle = '#fb923c';
    for (let i = 0; i < nF; i++) { const s = seeds[(i + 20) % 60]; const jx = Math.sin(now * 3 + s.ph) * w * 0.01, jy = Math.cos(now * 2.3 + s.ph) * h * 0.01; ctx.beginPath(); ctx.ellipse(x + w * s.x + jx, y + h * (0.35 + s.y * 0.6) + jy, h * 0.012, h * 0.008, 0, 0, Math.PI * 2); ctx.fill(); }
    // small fish
    const nS = Math.min(20, smallFish());
    for (let i = 0; i < nS; i++) { const s = seeds[(i + 37) % 60]; const fx = x + w * ((s.x + s.dir * now * 0.02 + 10) % 1); drawFish(ctx, fx, y + h * (0.4 + s.y * 0.5) + Math.sin(now * 2 + s.ph) * h * 0.01, h * 0.022, '#38bdf8', s.dir); }
    // big fish
    const nB = Math.min(10, bigFish());
    for (let i = 0; i < nB; i++) { const s = seeds[(i + 5) % 60]; const fx = x + w * ((s.x + s.dir * now * 0.012 + 10) % 1); drawFish(ctx, fx, y + h * (0.5 + s.y * 0.4) + Math.sin(now * 1.3 + s.ph) * h * 0.01, h * 0.045, '#f43f5e', s.dir); }
    ctx.restore();
    // frame
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
  }
  function drawBars(ctx, x, y, w, h) {
    const rows = [
      { label: T('algae', 'alga'), v: P.A, max: 160, color: '#22c55e', unit: '' },
      { label: T('water fleas', 'kutu air'), v: P.F, max: 60, color: '#fb923c', unit: '' },
      { label: T('small fish', 'ikan kecil'), v: P.S, max: 30, color: '#38bdf8', unit: '' },
      { label: T('big fish', 'ikan besar'), v: P.B, max: 20, color: '#f43f5e', unit: '' },
    ];
    const rh = h / rows.length;
    rows.forEach((r, i) => {
      const yy = y + i * rh;
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(rh * 0.26, true); ctx.textAlign = 'left';
      ctx.fillText(r.label, x, yy + rh * 0.3);
      ctx.textAlign = 'right'; ctx.fillStyle = r.color;
      ctx.fillText(String(Math.round(r.v)), x + w, yy + rh * 0.3);
      ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(x, yy + rh * 0.42, w, rh * 0.32, 6); ctx.fill();
      ctx.fillStyle = r.color; ctx.beginPath(); ctx.roundRect(x, yy + rh * 0.42, Math.max(4, w * clamp(r.v / r.max, 0, 1)), rh * 0.32, 6); ctx.fill();
    });
  }
  function statusLine() {
    const pol = params.pol, sun = params.sun, temp = params.temp;
    if (pol >= 50) return T('Fertiliser feeds the algae, but the rotting bloom uses up the oxygen. Fish suffocate.', 'Pupuk memberi makan alga, tetapi alga yang membusuk menghabiskan oksigen. Ikan mati lemas.');
    if (pol >= 20) return T('Dirty water holds less oxygen. The big fish struggle first.', 'Air kotor menyimpan lebih sedikit oksigen. Ikan besar paling dulu kesulitan.');
    if (temp >= 32) return T('Hot water holds little oxygen and stresses the fish.', 'Air panas menyimpan sedikit oksigen dan membuat ikan tertekan.');
    if (temp <= 18) return T('Cold water: algae grow slowly, so the whole chain shrinks.', 'Air dingin: alga tumbuh lambat, sehingga seluruh rantai mengecil.');
    if (sun <= 35) return T('Little sunlight: the algae cannot make much food, so everything above them shrinks.', 'Sinar matahari sedikit: alga tidak bisa membuat banyak makanan, jadi semua di atasnya mengecil.');
    return T('A healthy pond: lots of algae, fewer fleas, fewer small fish, only a few big fish.', 'Kolam sehat: alga banyak, kutu air lebih sedikit, ikan kecil lebih sedikit, ikan besar hanya beberapa.');
  }
  function wrap(ctx, text, maxW) {
    const words = text.split(' '), lines = []; let cur = '';
    for (const wd of words) { const t = cur ? cur + ' ' + wd : wd; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = wd; } else cur = t; }
    if (cur) lines.push(cur);
    return lines;
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawScene(ctx, W * 0.02, H * 0.04, W * 0.58, H * 0.72);
    drawBars(ctx, W * 0.64, H * 0.04, W * 0.33, H * 0.6);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(H * 0.036); ctx.textAlign = 'left';
    ctx.fillText(`${T('Day', 'Hari')} ${Math.floor(state.day)}   ·   ${T('oxygen in water', 'oksigen di air')}: ${oxygenPct()}%`, W * 0.64, H * 0.69);
    ctx.fillText(`${T('since last change', 'sejak perubahan terakhir')}: ${Math.floor(state.sinceChange)} s`, W * 0.64, H * 0.74);
    // status text
    ctx.font = font(H * 0.04); ctx.fillStyle = '#fef3c7';
    const lines = wrap(ctx, statusLine(), W * 0.94);
    lines.slice(0, 2).forEach((ln, i) => ctx.fillText(ln, W * 0.03, H * 0.84 + i * H * 0.055));
    ctx.fillStyle = '#64748b'; ctx.font = font(H * 0.03);
    ctx.fillText(T('1 second ≈ 2 days in the pond', '1 detik ≈ 2 hari di kolam'), W * 0.03, H * 0.97);
    ctx.textAlign = 'left';
  }

  // --- controls ------------------------------------------------------------
  const changed = () => { state.sinceChange = 0; };
  const sunS = slider({ label: T('Sunlight', 'Sinar matahari'), key: 'sun', min: 0, max: 100, step: 5, value: 70, format: (v) => `${v}%`, onInput: (v) => { params.sun = v; changed(); } });
  const tempS = slider({ label: T('Water temperature', 'Suhu air'), key: 'temp', min: 15, max: 40, step: 1, value: 26, format: (v) => `${v} °C`, onInput: (v) => { params.temp = v; changed(); } });
  const polS = slider({ label: T('Pollution', 'Pencemaran'), key: 'pollution', min: 0, max: 100, step: 5, value: 0, format: (v) => `${v}%`, onInput: (v) => { params.pol = v; changed(); } });
  const presetSel = select({
    label: T('What happens if…', 'Apa yang terjadi jika…'), key: 'preset', value: 'clean',
    options: PRESETS.map((p) => ({ value: p.key, label: tx(p) })),
    onChange: (v) => {
      const p = PRESETS.find((k) => k.key === v); if (!p) return;
      params.sun = p.sun; params.temp = p.temp; params.pol = p.pol;
      sunS.value = p.sun; tempS.value = p.temp; polS.value = p.pol; changed();
    },
  });
  presetSel.el.querySelector('select').style.minHeight = '44px';
  const resetB = bigBtn(T('Restart the pond', 'Mulai ulang kolam'), () => { Object.assign(P, START); state.day = 0; changed(); });
  ctrlPanel.append(sunS.el, tempS.el, polS.el, presetSel.el, row(resetB));

  const lab = labPanel({
    title: 'Pond investigation',
    filename: 'pond-ecosystem-data.csv',
    columns: [
      { key: 'sun', label: 'Sunlight (%)' },
      { key: 'temp', label: 'Water temp (°C)' },
      { key: 'pol', label: 'Pollution (%)' },
      { key: 'wait', label: 'Seconds since change', format: (v) => v.toFixed(0) },
      { key: 'algae', label: 'Algae' },
      { key: 'small', label: 'Small fish' },
      { key: 'big', label: 'Big fish' },
    ],
    procedure: [
      'Start with the clean sunny pond. Wait 60 seconds, then Record.',
      'Set pollution to 30%. Wait 60 seconds and Record. Then try 60% and 100%.',
      'Put pollution back to 0 and set sunlight to 20%. Wait 60 seconds and Record.',
      'Look at your table: which change was worst for the big fish?',
    ],
    predict: 'If you add pollution, what will happen to the algae and to the fish? Will they both go down?',
    source: () => ({ sun: params.sun, temp: params.temp, pol: params.pol, wait: state.sinceChange, algae: Math.round(P.A), small: smallFish(), big: bigFish() }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
