import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// River model: steady state along a 10 km stretch, computed as a march downstream.
// Units: distance km; B = organic waste (BOD, mg/L), N = nutrients (mg/L), X = toxin (index),
// DO = dissolved oxygen (mg/L), A = algae (index 0-10).
const LEN = 10, NSEG = 200, DX = LEN / NSEG;
const DO_SAT = 9.0;
const VILLAGE_KM = 2.5, FARM_KM = [4.0, 5.5], FACTORY_KM = 6.0;
const STATIONS = [
  { id: 'A', km: 0.5, en: 'A upstream', id_: 'A hulu' },
  { id: 'B', km: 3.5, en: 'B below village', id_: 'B hilir desa' },
  { id: 'C', km: 7.0, en: 'C below factory', id_: 'C hilir pabrik' },
  { id: 'D', km: 9.5, en: 'D downstream', id_: 'D hilir jauh' },
];
const INDICATORS = [
  { id: 'stonefly',  en: 'Stonefly nymph',     id_: 'Nimfa lalat batu', qEn: 'clean',     qId: 'bersih',       color: '#4ade80' },
  { id: 'shrimp',    en: 'Freshwater shrimp',  id_: 'Udang air tawar',  qEn: 'fair',      qId: 'cukup',        color: '#fbbf24' },
  { id: 'bloodworm', en: 'Bloodworm',          id_: 'Cacing darah',     qEn: 'poor',      qId: 'buruk',        color: '#fb923c' },
  { id: 'sludge',    en: 'Sludge worm',        id_: 'Cacing lumpur',    qEn: 'very poor', qId: 'sangat buruk', color: '#f87171' },
];
function indicatorFor(DO, X) {
  if (DO >= 7 && X < 1) return INDICATORS[0];
  if (DO >= 5 && X < 3) return INDICATORS[1];
  if (DO >= 2.5 && X < 6) return INDICATORS[2];
  return INDICATORS[3];
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { sewage: 0, fert: 0, factory: 0, treat: false };
  const prof = { B: new Float32Array(NSEG), N: new Float32Array(NSEG), X: new Float32Array(NSEG), DO: new Float32Array(NSEG), A: new Float32Array(NSEG), F: new Float32Array(NSEG) };
  const out = { minDO: 9, minKm: 0, fishAll: 0, fishDown: 0 };
  let now = 0;

  // Fish slots: fixed pseudo-random positions so the picture does not flicker.
  const FISH = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 70; i++) FISH.push({ u: 0.02 + 0.96 * rnd(), v: 0.15 + 0.7 * rnd(), thr: 0.08 + 0.9 * rnd(), ph: rnd() * 6.28, size: 0.7 + 0.6 * rnd(), dir: rnd() < 0.5 ? -1 : 1 });

  function compute() {
    const r = params.treat ? 0.1 : 1;
    const Bin = 25 * params.sewage / 100 * r, Nin = 8 * params.fert / 100, Xin = 10 * params.factory / 100 * r;
    let B = 1, N = 0.1, X = 0, DO = 8.6, A = 0.3;
    out.minDO = 99; out.minKm = 0;
    for (let i = 0; i < NSEG; i++) {
      const x = i * DX;
      if (Math.abs(x - VILLAGE_KM) < DX / 2) B += Bin;
      if (x >= FARM_KM[0] && x < FARM_KM[1]) N += Nin * DX / (FARM_KM[1] - FARM_KM[0]);
      if (Math.abs(x - FACTORY_KM) < DX / 2) X += Xin;
      const growth = 1.8 * A * N / (N + 0.5) * (1 - A / 10), death = 0.2 * A, tox = 0.3 * X * A / (X + 2);
      const dA = growth - death - tox;
      const dN = -0.1 * A * N / (N + 0.5);
      const dB = -0.25 * B + 0.6 * death;
      const dDO = -0.25 * B + 0.3 * (DO_SAT - DO) - 0.18 * A;
      A = clamp(A + dA * DX, 0, 10); N = Math.max(0, N + dN * DX); B = Math.max(0, B + dB * DX);
      DO = clamp(DO + dDO * DX, 0, 12); X = Math.max(0, X - 0.04 * X * DX);
      const F = clamp((DO - 3) / 4, 0, 1) * Math.exp(-0.4 * X) * (1 - 0.3 * A / 10);
      prof.B[i] = B; prof.N[i] = N; prof.X[i] = X; prof.DO[i] = DO; prof.A[i] = A; prof.F[i] = F;
      if (DO < out.minDO) { out.minDO = DO; out.minKm = x; }
    }
    let all = 0, down = 0;
    for (const f of FISH) { const i = Math.min(NSEG - 1, Math.floor(f.u * NSEG)); if (prof.F[i] > f.thr) { all++; if (f.u * LEN >= 7) down++; } }
    out.fishAll = all; out.fishDown = down;
  }
  const at = (arr, km) => arr[clamp(Math.round(km / DX), 0, NSEG - 1)];

  // ---- drawing helpers --------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  function waterColor(i) {
    const a = prof.A[i] / 10, b = clamp(prof.B[i] / 20, 0, 1), x = clamp(prof.X[i] / 10, 0, 1);
    let r = 30, g = 90, bl = 200;
    r = r * (1 - a) + 40 * a; g = g * (1 - a) + 170 * a; bl = bl * (1 - a) + 60 * a;   // green with algae
    r = r * (1 - b) + 110 * b; g = g * (1 - b) + 85 * b; bl = bl * (1 - b) + 50 * b;   // brown with sewage
    r = r * (1 - x) + 120 * x; g = g * (1 - x) + 60 * x; bl = bl * (1 - x) + 140 * x;  // purple with toxin
    return `rgb(${r | 0},${g | 0},${bl | 0})`;
  }
  function drawHouse(ctx, x, y, w, h, c) {
    ctx.fillStyle = c; ctx.fillRect(x - w / 2, y - h, w, h);
    ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.moveTo(x - w * 0.6, y - h); ctx.lineTo(x, y - h * 1.6); ctx.lineTo(x + w * 0.6, y - h); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fde68a'; ctx.fillRect(x - w * 0.2, y - h * 0.6, w * 0.4, h * 0.35);
  }
  function drawFish(ctx, x, y, s, dir, alpha) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.scale(dir, 1);
    ctx.fillStyle = '#fb923c';
    ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.45, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-s * 0.8, 0); ctx.lineTo(-s * 1.5, -s * 0.5); ctx.lineTo(-s * 1.5, s * 0.5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 0.5, -s * 0.1, s * 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  function drawInsect(ctx, id, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.lineCap = 'round';
    if (id === 'stonefly') {
      ctx.fillStyle = '#65a30d'; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.9, s * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#65a30d'; ctx.lineWidth = s * 0.08;
      ctx.beginPath(); ctx.moveTo(-s * 0.9, 0); ctx.lineTo(-s * 1.6, -s * 0.4); ctx.moveTo(-s * 0.9, 0); ctx.lineTo(-s * 1.6, s * 0.4);
      ctx.moveTo(s * 0.9, 0); ctx.lineTo(s * 1.5, -s * 0.4); ctx.moveTo(s * 0.9, 0); ctx.lineTo(s * 1.5, s * 0.4);
      for (let i = -1; i <= 1; i++) { ctx.moveTo(i * s * 0.35, -s * 0.2); ctx.lineTo(i * s * 0.35 - s * 0.2, -s * 0.7); ctx.moveTo(i * s * 0.35, s * 0.2); ctx.lineTo(i * s * 0.35 - s * 0.2, s * 0.7); }
      ctx.stroke();
    } else if (id === 'shrimp') {
      ctx.strokeStyle = '#fdba74'; ctx.lineWidth = s * 0.35;
      ctx.beginPath(); ctx.arc(0, s * 0.2, s * 0.8, Math.PI * 1.1, Math.PI * 1.95); ctx.stroke();
      ctx.lineWidth = s * 0.07;
      ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = Math.PI * (1.2 + i * 0.17); const px = Math.cos(a) * s * 0.75, py = s * 0.2 + Math.sin(a) * s * 0.75; ctx.moveTo(px, py); ctx.lineTo(px, py + s * 0.5); } ctx.stroke();
      ctx.beginPath(); ctx.moveTo(s * 0.75, -s * 0.1); ctx.lineTo(s * 1.4, -s * 0.5); ctx.moveTo(s * 0.75, -s * 0.1); ctx.lineTo(s * 1.4, -s * 0.2); ctx.stroke();
    } else if (id === 'bloodworm') {
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = s * 0.22;
      ctx.beginPath(); ctx.moveTo(-s * 1.2, 0); ctx.bezierCurveTo(-s * 0.6, -s * 0.8, 0, s * 0.8, s * 0.6, 0); ctx.quadraticCurveTo(s, -s * 0.5, s * 1.3, -s * 0.1); ctx.stroke();
    } else {
      ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = s * 0.14;
      ctx.beginPath(); ctx.moveTo(-s * 1.2, s * 0.2); ctx.bezierCurveTo(-s * 0.6, -s * 0.9, -s * 0.1, s * 0.9, s * 0.4, -s * 0.2); ctx.bezierCurveTo(s * 0.8, -s * 0.7, s * 1.1, s * 0.3, s * 1.3, 0); ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = Math.max(9, W * 0.016);
    const kmX = (km) => W * 0.03 + (km / LEN) * W * 0.94;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);

    // ---- scenery ----
    const groundY = H * 0.30, riverTop = H * 0.31, riverBot = H * 0.49;
    ctx.fillStyle = '#14532d'; ctx.fillRect(0, groundY - H * 0.03, W, H * 0.04);
    // village
    const vx = kmX(VILLAGE_KM);
    drawHouse(ctx, vx - W * 0.045, groundY - H * 0.03, W * 0.03, H * 0.06, '#e5e7eb');
    drawHouse(ctx, vx, groundY - H * 0.03, W * 0.035, H * 0.075, '#fef3c7');
    drawHouse(ctx, vx + W * 0.045, groundY - H * 0.03, W * 0.03, H * 0.06, '#e5e7eb');
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs); ctx.textAlign = 'center';
    ctx.fillText(T('Village', 'Desa'), vx, groundY - H * 0.17);
    // farm
    const fx0 = kmX(FARM_KM[0]), fx1 = kmX(FARM_KM[1]);
    ctx.fillStyle = '#a16207'; ctx.fillRect(fx0, groundY - H * 0.10, fx1 - fx0, H * 0.075);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2;
    ctx.beginPath(); for (let i = 1; i < 10; i++) { const x = fx0 + (fx1 - fx0) * i / 10; ctx.moveTo(x, groundY - H * 0.10); ctx.lineTo(x, groundY - H * 0.025); } ctx.stroke();
    ctx.fillStyle = '#cbd5e1'; ctx.fillText(T('Farm', 'Sawah'), (fx0 + fx1) / 2, groundY - H * 0.17);
    // factory
    const fcx = kmX(FACTORY_KM);
    ctx.fillStyle = '#475569'; ctx.fillRect(fcx - W * 0.04, groundY - H * 0.12, W * 0.08, H * 0.09);
    ctx.fillStyle = '#334155'; ctx.fillRect(fcx + W * 0.015, groundY - H * 0.20, W * 0.015, H * 0.09);
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    for (let i = 0; i < 3; i++) { const p = ((now * 0.4 + i / 3) % 1); ctx.beginPath(); ctx.arc(fcx + W * 0.022 + p * W * 0.02, groundY - H * 0.21 - p * H * 0.06, W * 0.006 + p * W * 0.008, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = '#cbd5e1'; ctx.fillText(T('Factory', 'Pabrik'), fcx, groundY - H * 0.24);
    // treatment plant
    if (params.treat) {
      ctx.fillStyle = '#0ea5e9'; ctx.fillRect(vx + W * 0.08, groundY - H * 0.07, W * 0.04, H * 0.045);
      ctx.fillRect(fcx + W * 0.055, groundY - H * 0.07, W * 0.04, H * 0.045);
      ctx.fillStyle = '#e0f2fe'; ctx.font = font(fs * 0.8);
      ctx.fillText(T('treatment', 'IPAL'), vx + W * 0.10, groundY - H * 0.085);
      ctx.fillText(T('treatment', 'IPAL'), fcx + W * 0.075, groundY - H * 0.085);
    }
    // pipes / runoff arrows
    const pipe = (x, level, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = Math.max(2, W * 0.006);
      ctx.beginPath(); ctx.moveTo(x, groundY - H * 0.03); ctx.lineTo(x, riverTop + H * 0.02); ctx.stroke();
      if (level > 0) {
        ctx.fillStyle = color; ctx.globalAlpha = clamp(level, 0.15, 1);
        for (let i = 0; i < 3; i++) { const p = (now * 0.8 + i / 3) % 1; ctx.beginPath(); ctx.arc(x, groundY - H * 0.02 + p * (riverTop - groundY + H * 0.05), W * 0.004 + level * W * 0.004, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = 1;
      }
    };
    pipe(vx + W * 0.02, params.sewage / 100 * (params.treat ? 0.1 : 1), '#a16207');
    pipe(fcx, params.factory / 100 * (params.treat ? 0.1 : 1), '#a855f7');
    if (params.fert > 0) {
      ctx.strokeStyle = `rgba(74,222,128,${0.3 + 0.7 * params.fert / 100})`; ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const x = fx0 + (fx1 - fx0) * (i + 0.5) / 5, p = (now * 0.6 + i / 5) % 1;
        ctx.beginPath(); ctx.moveTo(x, groundY - H * 0.02); ctx.lineTo(x, groundY - H * 0.02 + p * (riverTop - groundY + H * 0.04)); ctx.stroke();
      }
    }

    // ---- river ----
    const segW = (W * 0.94) / NSEG;
    for (let i = 0; i < NSEG; i++) { ctx.fillStyle = waterColor(i); ctx.fillRect(kmX(i * DX), riverTop, segW + 1, riverBot - riverTop); }
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) { const x = W * 0.03 + i * W * 0.94 / 40; const y = riverTop + (riverBot - riverTop) * (0.25 + k * 0.25) + Math.sin(i * 0.9 - now * 3 + k) * H * 0.006; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
    }
    // flow arrow
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = font(fs * 0.9); ctx.textAlign = 'left';
    ctx.fillText(T('flow →', 'aliran →'), W * 0.04, riverTop + fs);
    // fish
    for (const f of FISH) {
      const i = Math.min(NSEG - 1, Math.floor(f.u * NSEG));
      if (prof.F[i] <= f.thr) continue;
      const s = Math.max(4, W * 0.009) * f.size;
      drawFish(ctx, kmX(f.u * LEN) + Math.sin(now * 1.5 + f.ph) * s, riverTop + (riverBot - riverTop) * f.v, s, f.dir, 0.95);
    }
    // station markers
    ctx.font = font(fs, true); ctx.textAlign = 'center';
    for (const s of STATIONS) {
      const x = kmX(s.km);
      ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(x, riverTop); ctx.lineTo(x, riverBot + H * 0.02); ctx.stroke(); ctx.setLineDash([]);
    }
    // ---- station cards ----
    const cardY = H * 0.515, cardH = H * 0.13, cardW = Math.min(W * 0.23, W * 0.94 / 4 - 6);
    ctx.textAlign = 'left';
    STATIONS.forEach((s, k) => {
      const cx0 = W * 0.03 + k * (W * 0.94 / 4) + 3;
      const DO = at(prof.DO, s.km), X = at(prof.X, s.km), ind = indicatorFor(DO, X);
      ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(cx0, cardY, cardW, cardH, 8); ctx.fill();
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.9, true);
      ctx.fillText(getLocale() === 'id' ? s.id_ : s.en, cx0 + 8, cardY + fs * 1.2);
      ctx.fillStyle = '#93c5fd'; ctx.font = font(fs * 0.85);
      ctx.fillText(`DO ${DO.toFixed(1)} mg/L`, cx0 + 8, cardY + fs * 2.4);
      drawInsect(ctx, ind.id, cx0 + cardW - fs * 2.6, cardY + fs * 1.6, fs * 0.8);
      ctx.fillStyle = ind.color; ctx.font = font(fs * 0.8);
      const lbl = `${getLocale() === 'id' ? ind.id_ : ind.en} · ${getLocale() === 'id' ? ind.qId : ind.qEn}`;
      ctx.fillText(lbl.length * fs * 0.42 > cardW - 12 ? (getLocale() === 'id' ? ind.qId : ind.qEn) : lbl, cx0 + 8, cardY + fs * 3.6);
    });

    // ---- chart ----
    const gx0 = W * 0.07, gx1 = W * 0.97, gy0 = H * 0.68, gy1 = H * 0.95;
    ctx.fillStyle = '#0f172a'; ctx.fillRect(W * 0.03, gy0 - H * 0.025, W * 0.94, gy1 - gy0 + H * 0.05);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    const yOf = (v, max) => gy1 - clamp(v / max, 0, 1) * (gy1 - gy0);
    const xOf = (i) => gx0 + (i / (NSEG - 1)) * (gx1 - gx0);
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(gx0, yOf(5, 10)); ctx.lineTo(gx1, yOf(5, 10)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(251,191,36,0.9)'; ctx.font = font(fs * 0.75); ctx.textAlign = 'left';
    ctx.fillText(T('5 mg/L: fish limit', '5 mg/L: batas ikan'), gx0 + 4, yOf(5, 10) - 3);
    const line = (arr, max, color, width = 2) => { ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath(); for (let i = 0; i < NSEG; i++) { const y = yOf(arr[i], max); i ? ctx.lineTo(xOf(i), y) : ctx.moveTo(xOf(i), y); } ctx.stroke(); };
    line(prof.A, 10, '#4ade80');
    line(prof.F, 1, '#fb923c', 1.5);
    line(prof.DO, 10, '#38bdf8', 2.5);
    // axis labels
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8); ctx.textAlign = 'right';
    ctx.fillText('10', gx0 - 4, gy0 + fs * 0.4); ctx.fillText('5', gx0 - 4, yOf(5, 10) + fs * 0.4); ctx.fillText('0', gx0 - 4, gy1);
    ctx.textAlign = 'center';
    for (let km = 0; km <= 10; km += 2) ctx.fillText(`${km} km`, gx0 + (km / LEN) * (gx1 - gx0), gy1 + fs);
    // input markers on chart
    ctx.font = font(fs * 0.75);
    [[VILLAGE_KM, '#a16207', T('sewage', 'limbah')], [(FARM_KM[0] + FARM_KM[1]) / 2, '#4ade80', T('fertiliser', 'pupuk')], [FACTORY_KM, '#a855f7', T('factory', 'pabrik')]].forEach(([km, c, l]) => {
      const x = gx0 + (km / LEN) * (gx1 - gx0);
      ctx.strokeStyle = c; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(x, gy0); ctx.lineTo(x, gy1); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = c; ctx.fillText(l, x, gy0 - 4);
    });
    // legend + readouts
    ctx.textAlign = 'left'; ctx.font = font(fs * 0.85, true);
    const lg = [['#38bdf8', T('oxygen (mg/L)', 'oksigen (mg/L)')], ['#4ade80', T('algae (0-10)', 'alga (0-10)')], ['#fb923c', T('fish (0-1)', 'ikan (0-1)')]];
    let lx = gx0 + W * 0.30;
    for (const [c, l] of lg) { ctx.fillStyle = c; ctx.fillRect(lx, gy0 - fs * 1.1, fs * 0.9, fs * 0.5); ctx.fillStyle = '#cbd5e1'; ctx.fillText(l, lx + fs * 1.1, gy0 - fs * 0.6); lx += ctx.measureText(l).width + fs * 2.4; }
    ctx.textAlign = 'right'; ctx.fillStyle = '#f8fafc'; ctx.font = font(fs, true);
    ctx.fillText(`${T('Lowest oxygen', 'Oksigen terendah')}: ${out.minDO.toFixed(1)} mg/L ${T('at', 'di')} ${out.minKm.toFixed(1)} km`, W * 0.97, H * 0.05);
    ctx.fillText(`${T('Fish', 'Ikan')}: ${out.fishAll} / ${FISH.length}   ${T('downstream (7-10 km)', 'hilir (7-10 km)')}: ${out.fishDown}`, W * 0.97, H * 0.05 + fs * 1.4);
    ctx.textAlign = 'left';
  }

  // ---- controls ---------------------------------------------------------------
  const pct = (v) => `${v} %`;
  const sS = slider({ label: 'Village sewage', key: 'sewage', min: 0, max: 100, step: 5, value: 0, format: pct, onInput: (v) => { params.sewage = v; } });
  const fS = slider({ label: 'Fertiliser runoff', key: 'fert', min: 0, max: 100, step: 5, value: 0, format: pct, onInput: (v) => { params.fert = v; } });
  const xS = slider({ label: 'Factory waste', key: 'factory', min: 0, max: 100, step: 5, value: 0, format: pct, onInput: (v) => { params.factory = v; } });
  const tT = toggle({ label: 'Treatment plant (village + factory)', key: 'treat', value: false, onChange: (v) => { params.treat = v; } });
  const reset = button({ label: 'Clean river (reset)', onClick: () => { sS.apply(0); fS.apply(0); xS.apply(0); tT.apply(false); } });
  ctrlPanel.append(sS.el, fS.el, xS.el, row(tT, reset));

  const lab = labPanel({
    title: 'River survey',
    filename: 'river-health-data.csv',
    columns: [
      { key: 'sewage', label: 'Sewage (%)' },
      { key: 'fert', label: 'Fertiliser (%)' },
      { key: 'factory', label: 'Factory (%)' },
      { key: 'treat', label: 'Treatment' },
      { key: 'doD', label: 'DO at D (mg/L)', format: (v) => v.toFixed(1) },
      { key: 'minDO', label: 'Lowest DO (mg/L)', format: (v) => v.toFixed(1) },
      { key: 'fish', label: 'Fish count' },
      { key: 'indicator', label: 'Indicator at D' },
    ],
    procedure: [
      'Record the clean river first (all sliders at 0).',
      'Raise sewage to 50% and then 100%; record each. Where is the lowest oxygen?',
      'Reset. Raise fertiliser to 100%; record. Compare the algae curve and the oxygen at D.',
      'Reset. Raise factory waste to 100%; record. Note DO stays high but fish fall.',
      'Set all three to 100%, record, then switch on the treatment plant and record again.',
    ],
    predict: 'Which pollutant do you expect to lower dissolved oxygen the most? Which will the treatment plant fix?',
    source: () => {
      const DO = at(prof.DO, 9.5), X = at(prof.X, 9.5);
      return { sewage: params.sewage, fert: params.fert, factory: params.factory, treat: params.treat ? 'on' : 'off', doD: DO, minDO: out.minDO, fish: out.fishAll, indicator: indicatorFor(DO, X).en };
    },
  });
  ctrlPanel.appendChild(lab.el);

  compute();
  const animator = loop((dt, t) => { now = t; compute(); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
