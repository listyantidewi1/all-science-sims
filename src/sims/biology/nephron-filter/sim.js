import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Daily-balance model (both kidneys together).
const GFR = 180;            // L/day of filtrate
const TM_GLUCOSE = 1800;    // mmol/day maximum glucose reabsorption (threshold 10 mmol/L)
const SOLUTE_LOAD = 600;    // mOsm/day of urea + salts that must leave in the urine
function kidney(intake, glucose, adh) {
  const filteredGlc = GFR * glucose;
  const glcOut = Math.max(0, filteredGlc - TM_GLUCOSE);
  const need = clamp(intake + 0.3 - 0.9, 0.5, 20);      // intake + metabolic water − sweat/breath
  let V = adh ? need : Math.max(need, GFR * 0.15 * 0.5);  // without ADH half of the distal flow escapes
  V += glcOut / 300;                                      // osmotic diuresis
  const osm = clamp((SOLUTE_LOAD + glcOut) / V, 50, 1200);
  return { V, osm, glcOut, glcConc: glcOut / V, waterReab: 100 * (1 - V / GFR) };
}

// Tubule path in unit coordinates (x of 0..0.66 is the diagram area).
const TUBULE = [
  { to: [0.19, 0.27], tag: 'capsule' },
  { to: [0.24, 0.31], tag: 'pct' }, { to: [0.28, 0.26], tag: 'pct' }, { to: [0.32, 0.32], tag: 'pct' }, { to: [0.36, 0.27], tag: 'pct' }, { to: [0.40, 0.33], tag: 'pct' },
  { to: [0.42, 0.40], tag: 'desc' }, { to: [0.42, 0.84], tag: 'desc' },
  { to: [0.45, 0.88], tag: 'turn' },
  { to: [0.48, 0.84], tag: 'asc' }, { to: [0.48, 0.40], tag: 'asc' },
  { to: [0.50, 0.33], tag: 'dct' }, { to: [0.54, 0.28], tag: 'dct' }, { to: [0.58, 0.33], tag: 'dct' }, { to: [0.62, 0.28], tag: 'dct' },
  { to: [0.64, 0.34], tag: 'cd' }, { to: [0.64, 0.90], tag: 'cd' },
  { to: [0.64, 0.97], tag: 'urine' },
];
const TUBULE_START = [0.19, 0.265];
// Blood path: afferent arteriole → glomerulus squiggle → efferent → peritubular capillary → vein.
const BLOOD = [
  { to: [0.13, 0.20] }, { to: [0.17, 0.19] }, { to: [0.22, 0.24] }, { to: [0.16, 0.24] }, { to: [0.22, 0.19] },
  { to: [0.26, 0.15] }, { to: [0.31, 0.10] }, { to: [0.56, 0.10] }, { to: [0.56, 0.80] }, { to: [0.60, 0.85] }, { to: [0.66, 0.88] },
];
const BLOOD_START = [0.02, 0.20];
const CAPILLARY = [[0.26, 0.15], [0.31, 0.10], [0.56, 0.10], [0.56, 0.80]]; // where reabsorbed particles go
const TYPES = {
  water:   { color: '#60a5fa', r: 1.0, small: true },
  glucose: { color: '#facc15', r: 1.3, small: true },
  salt:    { color: '#f1f5f9', r: 0.9, small: true },
  urea:    { color: '#a16207', r: 1.0, small: true },
  protein: { color: '#c084fc', r: 1.9, small: false },
  cell:    { color: '#ef4444', r: 2.6, small: false },
};

function buildPath(start, pts) {
  const segs = []; let total = 0; let from = start;
  for (const p of pts) {
    const len = Math.hypot((p.to[0] - from[0]) * 16, (p.to[1] - from[1]) * 9);
    segs.push({ from, to: p.to, tag: p.tag || 'blood', start: total, len }); total += len; from = p.to;
  }
  return { segs, total };
}
const TP = buildPath(TUBULE_START, TUBULE), BP = buildPath(BLOOD_START, BLOOD);
function segIndex(path, s) { const S = path.segs; for (let i = S.length - 1; i >= 0; i--) if (s >= S[i].start) return i; return 0; }
function tagRange(path, tag) {
  let a = Infinity, b = -Infinity;
  for (const sg of path.segs) if (sg.tag === tag) { a = Math.min(a, sg.start); b = Math.max(b, sg.start + sg.len); }
  return [a, b];
}
const RANGES = { pct: tagRange(TP, 'pct'), desc: tagRange(TP, 'desc'), asc: tagRange(TP, 'asc'), dct: tagRange(TP, 'dct'), cd: tagRange(TP, 'cd') };

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { intake: 2.0, glucose: 5.0, adh: true };
  let out = kidney(params.intake, params.glucose, params.adh);
  const recompute = () => { out = kidney(params.intake, params.glucose, params.adh); };
  let now = 0;

  // ---- particles ---------------------------------------------------------------
  const POOL = 520;
  const P = [];
  for (let i = 0; i < POOL; i++) P.push({ alive: false, type: 'water', state: 0, s: 0, exitS: 0, x: 0, y: 0, tx: 0, ty: 0, alpha: 1, jit: 0 });
  let emitAcc = 0;
  const stats = { urineWater: 0, urineGlc: 0, window: [] };

  function pickType() {
    const r = Math.random();
    const gShare = 0.08 + 0.22 * clamp((params.glucose - 3) / 17, 0, 1);
    if (r < 0.06) return 'cell';
    if (r < 0.10) return 'protein';
    if (r < 0.10 + gShare) return 'glucose';
    if (r < 0.10 + gShare + 0.12) return 'salt';
    if (r < 0.10 + gShare + 0.20) return 'urea';
    return 'water';
  }
  // Decide where a filtered particle leaves the tubule (or 'urine').
  function fate(type) {
    const r = Math.random();
    const pick = (a, b) => a + Math.random() * (b - a);
    if (type === 'glucose') {
      const reabFrac = clamp(TM_GLUCOSE / Math.max(1, GFR * params.glucose), 0, 1);
      return r < reabFrac ? pick(RANGES.pct[0], RANGES.pct[1]) : -1;
    }
    if (type === 'water') {
      if (r < 0.65) return pick(RANGES.pct[0], RANGES.pct[1]);
      if (r < 0.80) return pick(RANGES.desc[0], RANGES.desc[1]);
      const excretedOfRest = clamp((out.V / GFR) / 0.20, 0, 1);
      return Math.random() < excretedOfRest ? -1 : pick(RANGES.cd[0], RANGES.cd[1]);
    }
    if (type === 'salt') {
      if (r < 0.65) return pick(RANGES.pct[0], RANGES.pct[1]);
      if (r < 0.90) return pick(RANGES.asc[0], RANGES.asc[1]);
      if (r < 0.95) return pick(RANGES.dct[0], RANGES.dct[1]);
      return -1;
    }
    if (type === 'urea') return r < 0.5 ? pick(RANGES.pct[0], RANGES.pct[1]) : -1;
    return -1;
  }
  function closestOnCapillary(x, y) {
    let best = [x, y], bd = Infinity;
    for (let i = 0; i < CAPILLARY.length - 1; i++) {
      const [ax, ay] = CAPILLARY[i], [bx, by] = CAPILLARY[i + 1];
      const dx = (bx - ax) * 16, dy = (by - ay) * 9;
      const t = clamp((((x - ax) * 16) * dx + ((y - ay) * 9) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      const px = ax + (bx - ax) * t, py = ay + (by - ay) * t;
      const d = Math.hypot((px - x) * 16, (py - y) * 9);
      if (d < bd) { bd = d; best = [px, py]; }
    }
    return best;
  }
  function posOn(path, s) {
    const i = segIndex(path, s), sg = path.segs[i], f = clamp((s - sg.start) / sg.len, 0, 1);
    return [sg.from[0] + (sg.to[0] - sg.from[0]) * f, sg.from[1] + (sg.to[1] - sg.from[1]) * f];
  }
  function emit() {
    const p = P.find((q) => !q.alive);
    if (!p) return;
    p.alive = true; p.type = pickType(); p.state = 0; p.s = 0; p.alpha = 1; p.jit = (Math.random() - 0.5) * 2;
  }
  const GLOM_S = BP.segs[1].start; // start of the glomerulus squiggle
  const EFF_S = BP.segs[5].start;  // leaving the glomerulus
  function step(dt) {
    emitAcc += dt * 34;
    while (emitAcc > 1) { emit(); emitAcc -= 1; }
    const vBlood = 3.2, vTub = 3.0;
    for (const p of P) {
      if (!p.alive) continue;
      if (p.state === 0) {                  // in blood
        p.s += vBlood * dt;
        if (TYPES[p.type].small && p.s > GLOM_S && p.s < EFF_S && Math.random() < dt * 2.2) {
          // filtered: jump into the tubule
          p.state = 1; p.s = 0; p.exitS = fate(p.type);
        } else if (p.s >= BP.total) { p.alive = false; }
      } else if (p.state === 1) {           // in tubule
        p.s += vTub * dt;
        if (p.exitS >= 0 && p.s >= p.exitS) {
          const [x, y] = posOn(TP, p.s); p.x = x; p.y = y;
          const [tx, ty] = closestOnCapillary(x, y); p.tx = tx; p.ty = ty;
          p.state = 2;
        } else if (p.s >= TP.total) {
          p.alive = false;
          if (p.type === 'water') stats.urineWater++; else if (p.type === 'glucose') stats.urineGlc++;
        }
      } else {                              // reabsorbed: drift to the capillary and fade
        p.x += (p.tx - p.x) * Math.min(1, dt * 3); p.y += (p.ty - p.y) * Math.min(1, dt * 3);
        p.alpha -= dt * 1.2;
        if (p.alpha <= 0) p.alive = false;
      }
    }
  }

  // ---- drawing ------------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  function strokePath(ctx, start, pts, W, H) {
    ctx.beginPath(); ctx.moveTo(start[0] * W, start[1] * H);
    for (const p of pts) ctx.lineTo(p.to[0] * W, p.to[1] * H);
    ctx.stroke();
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = Math.max(9, W * 0.015);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // cortex / medulla
    ctx.fillStyle = '#131c33'; ctx.fillRect(0, 0, W * 0.67, H * 0.50);
    ctx.fillStyle = '#0e1528'; ctx.fillRect(0, H * 0.50, W * 0.67, H * 0.50);
    ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.9, true); ctx.textAlign = 'left';
    ctx.fillText(T('CORTEX', 'KORTEKS'), W * 0.02, H * 0.47);
    ctx.fillText(T('MEDULLA', 'MEDULA'), W * 0.02, H * 0.56);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    // blood vessels
    ctx.strokeStyle = 'rgba(239,68,68,0.45)'; ctx.lineWidth = Math.max(6, W * 0.018);
    strokePath(ctx, BLOOD_START, BLOOD, W, H);
    // glomerulus ball + Bowman's capsule
    ctx.strokeStyle = 'rgba(239,68,68,0.6)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(W * 0.19, H * 0.215, W * 0.04, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(250,204,21,0.7)'; ctx.lineWidth = Math.max(3, W * 0.006);
    ctx.beginPath(); ctx.arc(W * 0.19, H * 0.215, W * 0.055, Math.PI * 0.15, Math.PI * 1.85, false); ctx.stroke();
    // tubule
    ctx.strokeStyle = 'rgba(250,204,21,0.35)'; ctx.lineWidth = Math.max(8, W * 0.022);
    strokePath(ctx, TUBULE_START, TUBULE, W, H);
    // ADH water arrows out of the collecting duct
    if (params.adh) {
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2; ctx.fillStyle = '#60a5fa';
      for (let i = 0; i < 4; i++) {
        const y = H * (0.45 + i * 0.1), ph = (now * 0.8 + i * 0.25) % 1;
        const x0 = W * 0.625, x1 = W * (0.625 - 0.035 * ph);
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        ctx.beginPath(); ctx.arc(x1, y, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    // particles
    for (const p of P) {
      if (!p.alive) continue;
      let x, y;
      if (p.state === 0) { const q = posOn(BP, p.s); x = q[0]; y = q[1]; }
      else if (p.state === 1) { const q = posOn(TP, p.s); x = q[0]; y = q[1]; }
      else { x = p.x; y = p.y; }
      const t = TYPES[p.type];
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = t.color;
      const r = Math.max(1.5, W * 0.0035) * t.r;
      ctx.beginPath(); ctx.arc(x * W + p.jit * r * 1.5, y * H + p.jit * r, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // labels
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    ctx.fillText(T('from renal artery', 'dari arteri renalis'), W * 0.02, H * 0.17);
    ctx.fillText(T('to renal vein', 'ke vena renalis'), W * 0.53, H * 0.94);
    ctx.fillStyle = '#fca5a5'; ctx.fillText(T('peritubular capillary (reabsorbed substances return here)', 'kapiler peritubular (zat yang diserap kembali masuk ke sini)'), W * 0.31, H * 0.075);
    ctx.fillStyle = '#fde68a';
    ctx.fillText('Glomerulus', W * 0.12, H * 0.33); ctx.fillText(T("+ Bowman's capsule", '+ kapsul Bowman'), W * 0.12, H * 0.33 + fs * 1.1);
    ctx.fillText(T('proximal tubule', 'tubulus proksimal'), W * 0.25, H * 0.40);
    ctx.fillStyle = '#93c5fd'; ctx.font = font(fs * 0.75);
    ctx.fillText(T('65% water, all glucose, salt', '65% air, semua glukosa, garam'), W * 0.25, H * 0.40 + fs * 1.1);
    ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 0.85);
    ctx.fillText(T('loop of Henle', 'lengkung Henle'), W * 0.30, H * 0.65);
    ctx.fillStyle = '#93c5fd'; ctx.font = font(fs * 0.75); ctx.fillText(T('salt + water', 'garam + air'), W * 0.30, H * 0.65 + fs * 1.1);
    ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 0.85);
    ctx.fillText(T('distal tubule', 'tubulus distal'), W * 0.50, H * 0.22);
    ctx.textAlign = 'right';
    ctx.fillText(T('collecting duct', 'saluran pengumpul'), W * 0.615, H * 0.56);
    ctx.fillStyle = params.adh ? '#60a5fa' : '#64748b'; ctx.font = font(fs * 0.75);
    ctx.fillText(params.adh ? T('ADH on: water leaves', 'ADH aktif: air keluar') : T('ADH off: wall waterproof', 'ADH mati: dinding kedap air'), W * 0.615, H * 0.56 + fs * 1.1);
    ctx.textAlign = 'left'; ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 0.85, true);
    ctx.fillText('URINE', W * 0.655, H * 0.965);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.8);
    ctx.fillText(T('filtrate 180 L/day', 'filtrat 180 L/hari'), W * 0.02, H * 0.60);
    ctx.fillText(T('= blood minus cells & proteins', '= darah tanpa sel & protein'), W * 0.02, H * 0.60 + fs * 1.1);
    // legend
    const leg = [['water', T('water', 'air')], ['glucose', T('glucose', 'glukosa')], ['salt', T('salt', 'garam')], ['urea', 'urea'], ['protein', 'protein'], ['cell', T('blood cell', 'sel darah')]];
    let ly = H * 0.70;
    ctx.font = font(fs * 0.8);
    for (const [k, l] of leg) { ctx.fillStyle = TYPES[k].color; ctx.beginPath(); ctx.arc(W * 0.03, ly, Math.max(2, W * 0.0035) * TYPES[k].r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#cbd5e1'; ctx.fillText(l, W * 0.05, ly + fs * 0.35); ly += fs * 1.35; }

    // ---- readout panel ----
    const px = W * 0.69, pw = W * 0.29;
    ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(px, H * 0.04, pw, H * 0.92, 12); ctx.fill();
    ctx.textAlign = 'left'; ctx.fillStyle = '#f8fafc'; ctx.font = font(fs * 1.05, true);
    ctx.fillText(T('Daily balance (both kidneys)', 'Neraca harian (kedua ginjal)'), px + 10, H * 0.04 + fs * 1.6);
    const rows = [
      [T('Filtrate made', 'Filtrat dibuat'), `${GFR} L/day`],
      [T('Water reabsorbed', 'Air diserap kembali'), `${out.waterReab.toFixed(1)} %`],
      [T('Urine volume', 'Volume urine'), `${out.V.toFixed(1)} L/day`],
      [T('Urine concentration', 'Kepekatan urine'), `${out.osm.toFixed(0)} mOsm/L`],
      [T('Glucose in urine', 'Glukosa dalam urine'), out.glcOut > 0 ? `${out.glcConc.toFixed(0)} mmol/L` : T('none', 'tidak ada')],
    ];
    rows.forEach(([l, v], i) => {
      const y = H * 0.04 + fs * 3.4 + i * fs * 2.5;
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.fillText(l, px + 10, y);
      ctx.fillStyle = i === 4 && out.glcOut > 0 ? '#facc15' : '#f8fafc'; ctx.font = font(fs * 1.0, true); ctx.fillText(v, px + 10, y + fs * 1.05);
    });
    // beaker: height ∝ volume (scale 0-15 L), colour by concentration
    const bx = px + pw * 0.62, by = H * 0.50, bw = pw * 0.30, bh = H * 0.32;
    const fill = clamp(out.V / 15, 0.03, 1);
    const k = clamp((out.osm - 50) / 1150, 0, 1);
    const cr = Math.round(253 - 60 * k), cg = Math.round(240 - 110 * k), cb = Math.round(170 - 150 * k);
    ctx.fillStyle = `rgba(${cr},${cg},${cb},0.9)`; ctx.fillRect(bx, by + bh * (1 - fill), bw, bh * fill);
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'center';
    ctx.fillText(T('urine / day', 'urine / hari'), bx + bw / 2, by + bh + fs * 1.1);
    ctx.textAlign = 'left';
    for (const L of [5, 10, 15]) { const y = by + bh * (1 - L / 15); ctx.fillStyle = '#64748b'; ctx.fillRect(bx - 4, y, 4, 1); ctx.fillText(`${L} L`, bx - fs * 1.8, y + fs * 0.35); }
    // glucose test strip
    const sx = px + 10, sy = H * 0.86, sw = pw * 0.5, sh = fs * 1.4;
    ctx.fillStyle = out.glcOut > 0 ? (out.glcConc > 100 ? '#b45309' : '#65a30d') : '#0ea5e9';
    ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 4); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = font(fs * 0.75, true);
    ctx.fillText(out.glcOut > 0 ? T('glucose test: POSITIVE', 'uji glukosa: POSITIF') : T('glucose test: negative', 'uji glukosa: negatif'), sx + 6, sy + sh * 0.7);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7);
    ctx.fillText(out.glcOut > 0 ? T('blood glucose above the 10 mmol/L threshold', 'glukosa darah di atas ambang 10 mmol/L') : T('all filtered glucose was reabsorbed', 'semua glukosa tersaring diserap kembali'), sx, sy + sh + fs * 1.0);
    ctx.textAlign = 'left';
  }

  // ---- controls ---------------------------------------------------------------
  const waterS = slider({ label: 'Water drunk (L/day)', key: 'water', min: 0.5, max: 5, step: 0.1, value: 2, format: (v) => v.toFixed(1), onInput: (v) => { params.intake = v; recompute(); } });
  const glcS = slider({ label: 'Blood glucose (mmol/L)', key: 'glucose', min: 3, max: 20, step: 0.5, value: 5, format: (v) => v.toFixed(1), onInput: (v) => { params.glucose = v; recompute(); } });
  const adhT = toggle({ label: 'ADH released (normal)', key: 'adh', value: true, onChange: (v) => { params.adh = v; recompute(); } });
  const preset = (w, g, a) => () => { waterS.apply(w); glcS.apply(g); adhT.apply(a); };
  const presets = row(
    button({ label: 'Normal', onClick: preset(2, 5, true) }),
    button({ label: 'Diabetes: glucose in urine', onClick: preset(2, 15, true) }),
    button({ label: 'Hot day, little water', onClick: preset(0.8, 5, true) }),
    button({ label: 'Drank a lot', onClick: preset(4, 5, true) }),
    button({ label: 'No ADH', onClick: preset(2, 5, false) }),
  );
  ctrlPanel.append(waterS.el, glcS.el, adhT.el, presets);

  const lab = labPanel({
    title: 'Urine lab',
    filename: 'nephron-filter-data.csv',
    columns: [
      { key: 'intake', label: 'Water intake (L/day)', format: (v) => v.toFixed(1) },
      { key: 'glucose', label: 'Blood glucose (mmol/L)', format: (v) => v.toFixed(1) },
      { key: 'adh', label: 'ADH' },
      { key: 'volume', label: 'Urine volume (L/day)', format: (v) => v.toFixed(2) },
      { key: 'osm', label: 'Concentration (mOsm/L)', format: (v) => v.toFixed(0) },
      { key: 'glcUrine', label: 'Glucose in urine (mmol/L)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Record the Normal preset.',
      'Set water intake to 1, 2, 3 and 4 L/day (ADH on) and record each. Plot urine volume against intake.',
      'Switch ADH off and record. How does the volume compare with the intake?',
      'ADH back on. Raise blood glucose in steps of 1 mmol/L from 8 to 14 and record. At what value does glucose first appear in the urine?',
    ],
    predict: 'If you drink 2 L more water per day, will your urine volume rise by about 2 L, more, or less? What will happen to its colour?',
    source: () => ({ intake: params.intake, glucose: params.glucose, adh: params.adh ? 'on' : 'off', volume: out.V, osm: out.osm, glcUrine: out.glcConc }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
