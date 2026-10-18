import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Box model. Pools in kg N / ha, flows in kg N / ha / yr. Rate constants are per year.
const K = {
  nit: 6,        // nitrification NH4 → NO3
  up: 4,         // assimilation per kg of mineral N, limited by plant demand
  pMax: 900,     // plant pool at which uptake stops
  cons: 0.3,     // plants → animals
  litter: 0.5,   // plants → dead organic matter
  death: 1.0,    // animals → dead organic matter
  ammon: 0.25,   // ammonification of dead organic matter
  harvest: 0.4,  // crop harvest export from plants
  den: 0.6,      // denitrification (dry/aerated soil)
  denWet: 4,     // denitrification when waterlogged
  leach: 1.0,    // leaching per unit rainfall
  lightning: 5,  // kg N/ha/yr per unit rainfall
  freeFix: 20,   // free-living fixers (Azotobacter, cyanobacteria)
};

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { fert: 0, legume: 0, rain: 1, wet: false, speed: 0.5, run: true };
  // Start at the model's steady state for no fertiliser / no legumes / normal rain, so the pools only
  // move when the student changes something.
  const INIT = { NH4: 3.5, NO3: 4.8, P: 43, A: 13, DOM: 138 };
  const S = { ...INIT, year: 0, hist: [], lastHist: -1 };
  const F = {}; // current flows
  let anim = 0;

  function flows() {
    const kden = params.wet ? K.denWet : K.den;
    const mineral = S.NH4 + S.NO3;
    const demand = K.up * mineral * Math.max(0, 1 - S.P / K.pMax);
    F.fixLeg = 2.0 * params.legume;
    F.fixFree = K.freeFix;
    F.lightning = K.lightning * params.rain;
    F.fert = params.fert;
    F.nit = K.nit * S.NH4;
    F.upNH4 = mineral > 0 ? demand * (S.NH4 / mineral) : 0;
    F.upNO3 = demand - F.upNH4;
    F.cons = K.cons * S.P;
    F.litter = K.litter * S.P;
    F.death = K.death * S.A;
    F.ammon = K.ammon * S.DOM;
    F.harvest = K.harvest * S.P;
    F.den = kden * S.NO3;
    F.leach = K.leach * params.rain * S.NO3;
  }
  function integrate(dy) {
    const n = Math.max(1, Math.ceil(dy / 0.01));
    const h = dy / n;
    for (let i = 0; i < n; i++) {
      flows();
      S.NH4 += h * (F.fert + F.ammon - F.nit - F.upNH4);
      S.NO3 += h * (F.lightning + F.nit - F.upNO3 - F.den - F.leach);
      S.P += h * (F.fixLeg + F.fixFree + F.upNH4 + F.upNO3 - F.cons - F.litter - F.harvest);
      S.A += h * (F.cons - F.death);
      S.DOM += h * (F.litter + F.death - F.ammon);
      for (const k of ['NH4', 'NO3', 'P', 'A', 'DOM']) if (!(S[k] > 0)) S[k] = 0;
      S.year += h;
      if (S.year - S.lastHist >= 0.1) {
        S.hist.push({ y: S.year, NO3: S.NO3, leach: F.leach });
        if (S.hist.length > 400) S.hist.shift();
        S.lastHist = S.year;
      }
    }
    flows();
  }
  function reset() {
    Object.assign(S, INIT); S.year = 0; S.hist = []; S.lastHist = -1;
    flows();
  }
  const bloomIndex = () => 100 * (1 - Math.exp(-F.leach / 40));
  function bloomRisk() {
    const l = F.leach;
    if (l < 10) return ['low', 'rendah', '#22c55e'];
    if (l < 40) return ['moderate', 'sedang', '#facc15'];
    if (l < 80) return ['high', 'tinggi', '#f97316'];
    return ['severe', 'parah', '#ef4444'];
  }

  // ---------- diagram geometry (fractions of the diagram area) ----------
  const BOX = {
    atm: { x: 0.5, y: 0.09, w: 0.86, h: 0.12, color: '#38bdf8', name: ['Atmosphere N₂ (78 %)', 'Atmosfer N₂ (78 %)'] },
    plants: { x: 0.2, y: 0.46, w: 0.26, h: 0.15, color: '#10b981', name: ['Plants', 'Tumbuhan'], pool: 'P' },
    animals: { x: 0.68, y: 0.38, w: 0.24, h: 0.13, color: '#f472b6', name: ['Animals', 'Hewan'], pool: 'A' },
    dom: { x: 0.74, y: 0.63, w: 0.3, h: 0.14, color: '#d97706', name: ['Decomposers / dead matter', 'Pengurai / bahan mati'], pool: 'DOM' },
    nh4: { x: 0.22, y: 0.85, w: 0.26, h: 0.14, color: '#f59e0b', name: ['Soil NH₄⁺ (ammonium)', 'NH₄⁺ tanah (amonium)'], pool: 'NH4' },
    no3: { x: 0.56, y: 0.87, w: 0.26, h: 0.14, color: '#a78bfa', name: ['Soil NO₃⁻ (nitrate)', 'NO₃⁻ tanah (nitrat)'], pool: 'NO3' },
    fert: { x: 0.05, y: 0.68, w: 0.1, h: 0.12, color: '#e2e8f0', name: ['Fertiliser', 'Pupuk'] },
    harvest: { x: 0.05, y: 0.46, w: 0.1, h: 0.12, color: '#94a3b8', name: ['Harvest', 'Panen'] },
    water: { x: 0.93, y: 0.9, w: 0.12, h: 0.14, color: '#0ea5e9', name: ['River', 'Sungai'] },
  };
  // from, to, flow key, color, label, control-point offset (fraction) for a curved arrow
  const ARROWS = [
    { a: 'atm', b: 'plants', f: 'fixLeg', c: '#10b981', l: ['fixation: Rhizobium (legumes)', 'fiksasi: Rhizobium (legum)'], cx: -0.12, cy: 0, lt: 0.28 },
    { a: 'atm', b: 'plants', f: 'fixFree', c: '#34d399', l: ['fixation: free-living bacteria', 'fiksasi: bakteri bebas'], cx: 0.0, cy: 0.03 },
    { a: 'atm', b: 'no3', f: 'lightning', c: '#facc15', l: ['lightning', 'petir'], cx: 0.1, cy: 0 },
    { a: 'fert', b: 'nh4', f: 'fert', c: '#e2e8f0', l: ['fertiliser (Haber)', 'pupuk (Haber)'], cx: 0, cy: 0.05 },
    { a: 'nh4', b: 'no3', f: 'nit', c: '#f59e0b', l: ['nitrification', 'nitrifikasi'], cx: 0, cy: 0.06 },
    { a: 'nh4', b: 'plants', f: 'upNH4', c: '#22d3ee', l: ['assimilation', 'asimilasi'], cx: -0.06, cy: 0 },
    { a: 'no3', b: 'plants', f: 'upNO3', c: '#22d3ee', l: ['assimilation', 'asimilasi'], cx: -0.08, cy: -0.04 },
    { a: 'plants', b: 'animals', f: 'cons', c: '#f472b6', l: ['eating', 'makan'], cx: 0, cy: -0.05 },
    { a: 'plants', b: 'dom', f: 'litter', c: '#d97706', l: ['litter', 'serasah'], cx: 0.05, cy: 0.05 },
    { a: 'animals', b: 'dom', f: 'death', c: '#d97706', l: ['death, waste', 'mati, kotoran'], cx: 0.04, cy: 0 },
    { a: 'dom', b: 'nh4', f: 'ammon', c: '#b45309', l: ['ammonification', 'amonifikasi'], cx: 0, cy: 0.1 },
    { a: 'no3', b: 'atm', f: 'den', c: '#a78bfa', l: ['denitrification', 'denitrifikasi'], cx: 0.06, cy: 0 },
    { a: 'no3', b: 'water', f: 'leach', c: '#ef4444', l: ['leaching / runoff', 'pelindian / limpasan'], cx: 0, cy: 0.06 },
    { a: 'plants', b: 'harvest', f: 'harvest', c: '#94a3b8', l: ['harvest (export)', 'panen (ekspor)'], cx: 0, cy: -0.06 },
  ];

  function dgm() { return { x0: 0, y0: 0, w: cv.width * 0.66, h: cv.height }; }
  function boxPx(id) {
    const d = dgm(), b = BOX[id];
    return { cx: d.x0 + b.x * d.w, cy: d.y0 + b.y * d.h, w: b.w * d.w * 0.5, h: b.h * d.h };
  }
  function edgePoint(from, to) {
    // point on the border of box `from` in the direction of box `to`
    const dx = to.cx - from.cx, dy = to.cy - from.cy;
    const sx = Math.abs(dx) > 1e-6 ? (from.w / 2) / Math.abs(dx) : 1e9;
    const sy = Math.abs(dy) > 1e-6 ? (from.h / 2) / Math.abs(dy) : 1e9;
    const s = Math.min(sx, sy);
    return { x: from.cx + dx * s, y: from.cy + dy * s };
  }
  function quad(p0, p1, p2, t) {
    const u = 1 - t;
    return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
  }

  function drawArrow(ctx, ar) {
    const A = boxPx(ar.a), B = boxPx(ar.b);
    const d = dgm();
    const p0 = edgePoint(A, B), p2 = edgePoint(B, A);
    const mid = { x: (p0.x + p2.x) / 2 + ar.cx * d.w, y: (p0.y + p2.y) / 2 + ar.cy * d.h };
    const rate = F[ar.f] || 0;
    const lw = clamp(1 + rate / 25, 1, 9);
    ctx.strokeStyle = ar.c; ctx.lineWidth = lw; ctx.globalAlpha = rate > 0.5 ? 0.85 : 0.25;
    ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.quadraticCurveTo(mid.x, mid.y, p2.x, p2.y); ctx.stroke();
    // head
    const q = quad(p0, mid, p2, 0.96);
    const ang = Math.atan2(p2.y - q.y, p2.x - q.x);
    const hs = 6 + lw;
    ctx.fillStyle = ar.c;
    ctx.beginPath(); ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p2.x - hs * Math.cos(ang - 0.5), p2.y - hs * Math.sin(ang - 0.5));
    ctx.lineTo(p2.x - hs * Math.cos(ang + 0.5), p2.y - hs * Math.sin(ang + 0.5));
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    // moving dots: count ∝ rate
    const nDots = Math.min(10, Math.ceil(rate / 15));
    if (rate > 0.5) {
      ctx.fillStyle = '#fff';
      for (let i = 0; i < nDots; i++) {
        const t = ((anim * 0.25) + i / nDots) % 1;
        const p = quad(p0, mid, p2, t);
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1.5, lw * 0.45), 0, Math.PI * 2); ctx.fill();
      }
    }
    // label along the curve (default: midpoint; `lt` moves it to avoid a neighbouring label)
    const lp = quad(p0, mid, p2, ar.lt ?? 0.5);
    const fs = Math.max(8, cv.width * 0.0125);
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    const txt = `${T(ar.l[0], ar.l[1])} ${rate.toFixed(0)}`;
    const tw = ctx.measureText(txt).width;
    ctx.fillStyle = 'rgba(11,18,32,0.8)';
    ctx.fillRect(lp.x - tw / 2 - 3, lp.y - fs * 0.9, tw + 6, fs * 1.25);
    ctx.fillStyle = ar.c;
    ctx.fillText(txt, lp.x, lp.y);
  }

  function drawBox(ctx, id) {
    const b = BOX[id], P = boxPx(id);
    const fs = Math.max(9, cv.width * 0.014);
    ctx.fillStyle = 'rgba(15,23,42,0.95)';
    ctx.strokeStyle = b.color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(P.cx - P.w / 2, P.cy - P.h / 2, P.w, P.h, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = b.color; ctx.textAlign = 'center';
    ctx.font = `bold ${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillText(T(b.name[0], b.name[1]), P.cx, P.cy - (b.pool ? fs * 0.3 : -fs * 0.35));
    if (b.pool) {
      ctx.fillStyle = '#e2e8f0'; ctx.font = `${Math.round(fs * 1.05)}px ui-monospace, monospace`;
      ctx.fillText(`${S[b.pool].toFixed(0)} kg N/ha`, P.cx, P.cy + fs * 1.0);
    }
    if (id === 'fert') {
      ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      ctx.fillText(`${params.fert} kg/ha/yr`, P.cx, P.cy + fs * 1.0);
    }
    if (id === 'harvest') {
      ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      ctx.fillText(`${F.harvest.toFixed(0)} kg/ha/yr`, P.cx, P.cy + fs * 1.0);
    }
    if (id === 'water') {
      // algae tint proportional to bloom index
      const g = bloomIndex() / 100;
      ctx.fillStyle = `rgba(74,222,128,${0.15 + 0.7 * g})`;
      ctx.beginPath(); ctx.roundRect(P.cx - P.w / 2 + 3, P.cy + P.h * 0.05, P.w - 6, P.h * 0.4, 4); ctx.fill();
    }
    if (id === 'atm' && params.legume > 0) {
      ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
      ctx.fillText(`${T('legume cover', 'tutupan legum')} ${params.legume}%`, P.cx, P.cy + fs * 1.0);
    }
    if (id === 'no3' && params.wet) {
      ctx.fillStyle = '#38bdf8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
      ctx.fillText(T('waterlogged: anaerobic', 'tergenang: anaerob'), P.cx, P.cy + P.h / 2 + fs);
    }
  }

  function drawPanel(ctx) {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.67, w = W * 0.31;
    const fs = Math.max(10, W * 0.015);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.1)}px system-ui, sans-serif`;
    ctx.fillText(`${T('Year', 'Tahun')} ${S.year.toFixed(1)}`, x0, fs * 1.6);
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    const totalIn = F.fixLeg + F.fixFree + F.lightning + F.fert;
    const lines = [
      [`${T('inputs', 'masukan')}: ${totalIn.toFixed(0)} kg N/ha/yr`, '#94a3b8'],
      [`  ${T('fixation', 'fiksasi')} ${(F.fixLeg + F.fixFree).toFixed(0)} · ${T('lightning', 'petir')} ${F.lightning.toFixed(0)} · ${T('fertiliser', 'pupuk')} ${F.fert.toFixed(0)}`, '#94a3b8'],
      [`${T('soil nitrate', 'nitrat tanah')}: ${S.NO3.toFixed(1)} kg N/ha`, '#a78bfa'],
      [`${T('nitrate runoff', 'limpasan nitrat')}: ${F.leach.toFixed(1)} kg N/ha/yr`, '#ef4444'],
      [`${T('denitrification', 'denitrifikasi')}: ${F.den.toFixed(1)} kg N/ha/yr`, '#a78bfa'],
      [`${T('harvest export', 'ekspor panen')}: ${F.harvest.toFixed(0)} kg N/ha/yr`, '#94a3b8'],
      [`${T('fertiliser lost', 'pupuk hilang')}: ${params.fert > 0 ? Math.min(999, 100 * (F.leach + F.den) / params.fert).toFixed(0) + ' %' : '—'}`, '#f97316'],
    ];
    let y = fs * 3.2;
    for (const [t, c] of lines) { ctx.fillStyle = c; ctx.fillText(t, x0, y); y += fs * 1.35; }
    // bloom risk gauge
    const risk = bloomRisk();
    y += fs * 0.3;
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillText(`${T('algal bloom risk', 'risiko ledakan alga')}: `, x0, y);
    ctx.fillStyle = risk[2];
    ctx.fillText(T(risk[0], risk[1]), x0 + ctx.measureText(`${T('algal bloom risk', 'risiko ledakan alga')}: `).width, y);
    y += fs * 0.6;
    ctx.fillStyle = 'rgba(148,163,184,0.2)'; ctx.fillRect(x0, y, w, fs * 0.8);
    ctx.fillStyle = risk[2]; ctx.fillRect(x0, y, w * bloomIndex() / 100, fs * 0.8);
    ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('runoff kg N/ha/yr: <10 low · 10–40 moderate · 40–80 high · >80 severe', 'limpasan kg N/ha/thn: <10 rendah · 10–40 sedang · 40–80 tinggi · >80 parah'), x0, y + fs * 1.8);
    // time chart: soil NO3 and runoff
    const gy = y + fs * 2.8, gh = H - gy - fs * 2.4, gx = x0 + fs * 2.2, gw = w - fs * 2.4;
    if (gh > 20) {
      ctx.fillStyle = 'rgba(148,163,184,0.06)'; ctx.fillRect(gx, gy, gw, gh);
      const hist = S.hist;
      const yMax = 150;
      const yEnd = Math.max(5, S.year), yStart = Math.max(0, yEnd - 20);
      ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right';
      for (let i = 0; i <= 3; i++) {
        const yy = gy + gh - (i / 3) * gh;
        ctx.beginPath(); ctx.moveTo(gx, yy); ctx.lineTo(gx + gw, yy); ctx.stroke();
        ctx.fillText(String(Math.round((i / 3) * yMax)), gx - 3, yy + 3);
      }
      ctx.textAlign = 'center';
      ctx.fillText(`${T('years', 'tahun')} ${yStart.toFixed(0)}–${yEnd.toFixed(0)}`, gx + gw / 2, gy + gh + fs * 1.1);
      const plot = (key, color) => {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
        let started = false;
        for (const p of hist) {
          if (p.y < yStart) continue;
          const px = gx + ((p.y - yStart) / (yEnd - yStart)) * gw;
          const py = gy + gh - clamp(p[key] / yMax, 0, 1) * gh;
          if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };
      plot('NO3', '#a78bfa'); plot('leach', '#ef4444');
      ctx.textAlign = 'left'; ctx.font = `${Math.round(fs * 0.8)}px system-ui, sans-serif`;
      ctx.fillStyle = '#a78bfa'; ctx.fillText(T('soil NO₃⁻ (kg/ha)', 'NO₃⁻ tanah (kg/ha)'), gx + 4, gy + fs * 0.9);
      ctx.fillStyle = '#ef4444'; ctx.fillText(T('runoff (kg/ha/yr)', 'limpasan (kg/ha/tahun)'), gx + 4, gy + fs * 1.9);
    }
    ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // sky / soil bands in the diagram area
    const d = dgm();
    ctx.fillStyle = 'rgba(56,189,248,0.05)'; ctx.fillRect(d.x0, 0, d.w, H * 0.2);
    ctx.fillStyle = 'rgba(120,72,20,0.18)'; ctx.fillRect(d.x0, H * 0.74, d.w, H * 0.26);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(d.x0, H * 0.74); ctx.lineTo(d.x0 + d.w, H * 0.74); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(Math.max(9, W * 0.012))}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(T('soil', 'tanah'), d.x0 + 6, H * 0.74 + 14);
    for (const ar of ARROWS) drawArrow(ctx, ar);
    for (const id of Object.keys(BOX)) drawBox(ctx, id);
    drawPanel(ctx);
    ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(Math.max(9, W * 0.012))}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(T('pools: kg N/ha · arrows: kg N/ha/yr (thickness ∝ flow)', 'cadangan: kg N/ha · panah: kg N/ha/tahun (tebal ∝ aliran)'), 6, H - 6);
  }

  // ---------- controls ----------
  const fertS = slider({ label: 'Fertiliser (kg N/ha/yr)', key: 'fert', min: 0, max: 300, step: 10, value: params.fert, onInput: (v) => { params.fert = v; } });
  const legS = slider({ label: 'Legume cover (%)', key: 'legume', min: 0, max: 100, step: 5, value: params.legume, onInput: (v) => { params.legume = v; } });
  const rainS = slider({ label: 'Rainfall (× normal)', key: 'rain', min: 0.5, max: 2, step: 0.1, value: params.rain, format: (v) => v.toFixed(1), onInput: (v) => { params.rain = v; } });
  const speedS = slider({ label: 'Speed (years per s)', key: 'speed', min: 0.1, max: 2, step: 0.1, value: params.speed, format: (v) => v.toFixed(1), onInput: (v) => { params.speed = v; } });
  const wetT = toggle({ label: 'Waterlogged soil (anaerobic)', key: 'wet', value: false, onChange: (v) => { params.wet = v; } });
  const runT = toggle({ label: 'Run', key: 'run', value: true, onChange: (v) => { params.run = v; } });
  const resetB = button({ label: 'Reset pools', onClick: reset });
  ctrlPanel.append(fertS.el, legS.el, rainS.el, speedS.el, row(wetT, runT, resetB));

  const lab = labPanel({
    title: 'Nitrogen budget lab',
    filename: 'nitrogen-cycle-data.csv',
    columns: [
      { key: 'fert', label: 'Fertiliser (kg N/ha/yr)' },
      { key: 'legume', label: 'Legumes (%)' },
      { key: 'rain', label: 'Rain (×)', format: (v) => v.toFixed(1) },
      { key: 'wet', label: 'Waterlogged' },
      { key: 'year', label: 'Year', format: (v) => v.toFixed(1) },
      { key: 'nh4', label: 'Soil NH4 (kg/ha)', format: (v) => v.toFixed(1) },
      { key: 'no3', label: 'Soil NO3 (kg/ha)', format: (v) => v.toFixed(1) },
      { key: 'plant', label: 'Plant N (kg/ha)', format: (v) => v.toFixed(0) },
      { key: 'runoff', label: 'Nitrate runoff (kg/ha/yr)', format: (v) => v.toFixed(1) },
      { key: 'den', label: 'Denitrification (kg/ha/yr)', format: (v) => v.toFixed(1) },
      { key: 'risk', label: 'Bloom risk' },
    ],
    procedure: [
      'Fertiliser 0, legumes 0, rain 1.0. Let it run a few years to confirm the pools are steady, then Record.',
      'Set fertiliser to 100. Wait until steady (10–15 years; raise Speed to save time) and Record. Repeat for 200 and 300.',
      'Plot runoff against fertiliser. Is it a straight line through the origin? What fraction of fertiliser is lost?',
      'Fertiliser 0, legumes 50 %. Record when steady. Compare plant N and runoff with the 100 kg fertiliser row.',
      'Fertiliser 200: record with rain 0.5 and 2.0, then with Waterlogged on. Which change cuts runoff the most, and where does the nitrogen go instead?',
    ],
    predict: 'If fertiliser is doubled from 100 to 200 kg N/ha/yr, will the crop (plant N) double? Will the nitrate runoff double? Write your prediction with reasons.',
    source: () => {
      const r = bloomRisk();
      return { fert: params.fert, legume: params.legume, rain: params.rain, wet: params.wet ? 'yes' : 'no', year: S.year, nh4: S.NH4, no3: S.NO3, plant: S.P, runoff: F.leach, den: F.den, risk: r[0] };
    },
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  const animator = loop((dt, t) => { anim = t; if (params.run) integrate(dt * params.speed); else flows(); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
