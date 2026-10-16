import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// ---- model -----------------------------------------------------------------
// Rate = rMax · f(T) · S/(S + KS), where f(T) is a bell around the optimum that
// also collapses to zero above a kill temperature (enzyme denaturation).
export const ML_PER_G_SUGAR = 270;   // mL CO2 per g glucose fermented (0.49 g CO2/g, ~24.5 L/mol)
export const KS = 5;                 // g, half-saturation sugar
export const PRESETS = {
  yeast:  { topt: 35, sigma: 10, kill: 58, killW: 6, rMax: 0.016,  checkpoint: 120,    speed: 5,
            name: { en: 'Yeast + sugar in a flask (balloon)', id: 'Ragi + gula dalam labu (balon)' } },
  bread:  { topt: 35, sigma: 10, kill: 58, killW: 6, rMax: 0.016 / 30, checkpoint: 3600, speed: 60,
            name: { en: 'Bread dough (yeast)', id: 'Adonan roti (ragi)' } },
  yoghurt:{ topt: 42, sigma: 7,  kill: 55, killW: 5, rMax: 6e-4,   checkpoint: 21600,  speed: 300,
            name: { en: 'Yoghurt (lactic acid bacteria in milk)', id: 'Yoghurt (bakteri asam laktat dalam susu)' } },
  tempe:  { topt: 30, sigma: 7,  kill: 42, killW: 5, rMax: 5.3e-5, checkpoint: 129600, speed: 1800,
            name: { en: 'Tempe (mould on soybeans)', id: 'Tempe (jamur pada kedelai)' } },
};
export function tempFactor(p, T) {
  const bell = Math.exp(-(((T - p.topt) / p.sigma) ** 2));
  const alive = Math.max(0, Math.min(1, (p.kill - T) / p.killW));
  return bell * alive;
}
export function rate(p, T, S) { return p.rMax * tempFactor(p, T) * (S / (S + KS)); }
export function phFromAcid(a) { return 6.7 - 2.6 * (a / (a + 1.2)); }

export function mount(rootEl) {
  const lang = () => (getLocale() === 'id' ? 'id' : 'en');
  const T = (en, id) => (lang() === 'id' ? id : en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = { preset: 'yeast', temp: 35, sugar0: 20, speed: 5 };
  const state = {
    running: false, runTo: null,
    t: 0,            // simulated seconds
    S: 20,           // sugar left (g)
    co2: 0,          // mL produced
    acid: 0,         // g lactic acid (yoghurt)
    cover: 0.02,     // mycelium coverage 0..1 (tempe)
    rateNow: 0,
    real: 0,
  };
  const hist = { t: [], v: [] };
  const bubbles = [];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const P = () => PRESETS[params.preset];

  function reset() {
    state.t = 0; state.S = params.sugar0; state.co2 = 0; state.acid = 0; state.cover = 0.02; state.rateNow = 0;
    state.running = false; state.runTo = null;
    hist.t.length = 0; hist.v.length = 0; bubbles.length = 0;
    pushHist();
  }
  function progressValue() {
    switch (params.preset) {
      case 'yeast': return state.co2;                                   // mL
      case 'bread': return clamp(state.co2 / 500, 0, 1.2) * 100;        // % rise
      case 'yoghurt': return phFromAcid(state.acid);                    // pH
      default: return state.cover * 100;                                // % coverage
    }
  }
  function pushHist() {
    hist.t.push(state.t); hist.v.push(progressValue());
    if (hist.t.length > 700) { hist.t = hist.t.filter((_, i) => i % 2 === 0); hist.v = hist.v.filter((_, i) => i % 2 === 0); }
  }

  function simulate(dtSim) {
    const p = P();
    // substep so that fast time speeds stay accurate
    const n = Math.max(1, Math.ceil(dtSim / 2));
    const h = dtSim / n;
    for (let i = 0; i < n; i++) {
      if (params.preset === 'tempe') {
        const k = p.rMax * tempFactor(p, params.temp);
        state.cover += k * state.cover * (1 - state.cover) * h;
        state.cover = clamp(state.cover, 0, 1);
        state.rateNow = k * state.cover * (1 - state.cover);
      } else {
        const r = rate(p, params.temp, state.S);           // g sugar per s
        const used = Math.min(state.S, r * h);
        state.S -= used;
        if (params.preset === 'yoghurt') state.acid += used;        // ~1 g acid per g lactose
        else state.co2 += used * ML_PER_G_SUGAR;
        state.rateNow = r;
      }
      state.t += h;
    }
  }

  function step(dtReal) {
    state.real += dtReal;
    if (!state.running) return;
    let dtSim = dtReal * params.speed;
    if (state.runTo != null && state.t + dtSim >= state.runTo) { dtSim = Math.max(0, state.runTo - state.t); }
    if (dtSim > 0) simulate(dtSim);
    pushHist();
    if (state.runTo != null && state.t >= state.runTo - 1e-9) { state.running = false; state.runTo = null; syncButtons(); }
    // bubbles (visual only)
    if (params.preset === 'yeast' || params.preset === 'bread') {
      const spawn = (state.rateNow / P().rMax) * 30 * dtReal;          // per real second
      if (Math.random() < spawn && bubbles.length < 40) bubbles.push({ x: Math.random(), y: 0, r: 1.5 + Math.random() * 2.5 });
    }
    for (let i = bubbles.length - 1; i >= 0; i--) { bubbles[i].y += dtReal * 0.5; if (bubbles[i].y > 1) bubbles.splice(i, 1); }
  }

  // ---- drawing -------------------------------------------------------------
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  function fmtTime(s) {
    if (s < 3600) { const m = Math.floor(s / 60), ss = Math.floor(s % 60); return `${m}:${String(ss).padStart(2, '0')}`; }
    const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60);
    return `${hh} h ${String(mm).padStart(2, '0')} min`;
  }
  function tempColor(t) {
    const k = clamp(t / 60, 0, 1);
    return `hsl(${Math.round(220 - 220 * k)}, 85%, 60%)`;
  }

  function drawFlask(ctx, cx, baseY, hgt) {
    const w = hgt * 0.55, neckW = hgt * 0.16, neckH = hgt * 0.3, bodyH = hgt - neckH;
    const liquidTop = baseY - bodyH * 0.75;
    ctx.save();
    // body outline path
    ctx.beginPath();
    ctx.moveTo(cx - neckW / 2, baseY - hgt); ctx.lineTo(cx - neckW / 2, baseY - bodyH);
    ctx.lineTo(cx - w / 2, baseY - 6); ctx.quadraticCurveTo(cx - w / 2, baseY, cx - w / 2 + 6, baseY);
    ctx.lineTo(cx + w / 2 - 6, baseY); ctx.quadraticCurveTo(cx + w / 2, baseY, cx + w / 2, baseY - 6);
    ctx.lineTo(cx + neckW / 2, baseY - bodyH); ctx.lineTo(cx + neckW / 2, baseY - hgt); ctx.closePath();
    ctx.fillStyle = 'rgba(148,163,184,0.10)'; ctx.fill();
    ctx.clip();
    // liquid
    ctx.fillStyle = params.preset === 'bread' ? '#fcd34d' : '#fde68a';
    ctx.globalAlpha = 0.85;
    ctx.fillRect(cx - w, liquidTop, 2 * w, baseY - liquidTop);
    ctx.globalAlpha = 1;
    // bubbles
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (const b of bubbles) {
      const bx = cx - w * 0.35 + b.x * w * 0.7, by = baseY - 8 - b.y * (baseY - 8 - liquidTop);
      ctx.beginPath(); ctx.arc(bx, by, b.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - neckW / 2, baseY - hgt); ctx.lineTo(cx - neckW / 2, baseY - bodyH);
    ctx.lineTo(cx - w / 2, baseY - 6); ctx.quadraticCurveTo(cx - w / 2, baseY, cx - w / 2 + 6, baseY);
    ctx.lineTo(cx + w / 2 - 6, baseY); ctx.quadraticCurveTo(cx + w / 2, baseY, cx + w / 2, baseY - 6);
    ctx.lineTo(cx + neckW / 2, baseY - bodyH); ctx.lineTo(cx + neckW / 2, baseY - hgt);
    ctx.stroke();
    // balloon: volume -> radius (cm) -> px, flask height ~ 15 cm
    const pxPerCm = hgt / 15;
    const rCm = Math.cbrt((3 * Math.max(0, state.co2)) / (4 * Math.PI));
    const r = clamp(rCm * pxPerCm, neckW * 0.55, hgt * 0.5);
    const top = baseY - hgt;
    ctx.fillStyle = '#f472b6';
    ctx.beginPath(); ctx.moveTo(cx - neckW / 2, top); ctx.lineTo(cx + neckW / 2, top); ctx.lineTo(cx + neckW / 2 * 1.1, top - 4); ctx.lineTo(cx - neckW / 2 * 1.1, top - 4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, top - 4 - r * 0.95, r, r * 1.05, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.ellipse(cx - r * 0.35, top - 4 - r * 1.25, r * 0.22, r * 0.35, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = font(Math.max(10, r * 0.35), true); ctx.textAlign = 'center';
    if (r > hgt * 0.12) ctx.fillText(`${Math.round(state.co2)} mL`, cx, top - 4 - r * 0.9);
    if (rCm * pxPerCm > hgt * 0.5) { ctx.fillStyle = '#fca5a5'; ctx.font = font(hgt * 0.06); ctx.fillText(T('balloon full!', 'balon penuh!'), cx, top - 4 - r * 2.1 - 4); }
  }

  function drawBowl(ctx, cx, baseY, hgt) {
    const w = hgt * 1.1;
    const rise = clamp(state.co2 / 500, 0, 1.2);
    const doughH = hgt * 0.32 * (1 + rise);
    // dough (drawn first so bowl rim overlaps)
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath(); ctx.ellipse(cx, baseY - hgt * 0.42, w * 0.38, doughH, 0, Math.PI, 0); ctx.lineTo(cx + w * 0.38, baseY - hgt * 0.42); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    for (const b of bubbles) { ctx.beginPath(); ctx.arc(cx - w * 0.3 + b.x * w * 0.6, baseY - hgt * 0.42 - b.y * doughH * 0.8, b.r, 0, Math.PI * 2); ctx.fill(); }
    // bowl
    ctx.fillStyle = 'rgba(96,165,250,0.35)'; ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - w / 2, baseY - hgt * 0.42); ctx.quadraticCurveTo(cx, baseY + hgt * 0.25, cx + w / 2, baseY - hgt * 0.42); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(147,197,253,0.6)';
    ctx.beginPath(); ctx.ellipse(cx, baseY - hgt * 0.42, w / 2, hgt * 0.06, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(hgt * 0.07, true); ctx.textAlign = 'center';
    ctx.fillText(T(`dough rise: ${Math.round(rise * 100)}%`, `adonan mengembang: ${Math.round(rise * 100)}%`), cx, baseY - hgt * 0.42 - doughH - hgt * 0.08);
  }

  function drawJar(ctx, cx, baseY, hgt) {
    const w = hgt * 0.6, pH = phFromAcid(state.acid);
    const set = clamp((6.7 - pH) / 2.2, 0, 1);
    ctx.fillStyle = 'rgba(148,163,184,0.12)'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(cx - w / 2, baseY - hgt * 0.85, w, hgt * 0.85, 8); ctx.fill(); ctx.stroke();
    ctx.fillStyle = `rgb(${250 - set * 10},${250 - set * 12},${235 - set * 20})`;
    ctx.beginPath(); ctx.roundRect(cx - w / 2 + 3, baseY - hgt * 0.72, w - 6, hgt * 0.72 - 3, 6); ctx.fill();
    // thickness: surface tilt lines
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = baseY - hgt * 0.62 + i * hgt * 0.14;
      ctx.beginPath(); ctx.moveTo(cx - w / 2 + 10, y); ctx.quadraticCurveTo(cx, y + set * 10, cx + w / 2 - 10, y); ctx.stroke();
    }
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(hgt * 0.08, true); ctx.textAlign = 'center';
    ctx.fillText(`pH ${pH.toFixed(2)}`, cx, baseY - hgt * 0.92);
    ctx.font = font(hgt * 0.06); ctx.fillStyle = pH <= 4.6 ? '#4ade80' : '#cbd5e1';
    ctx.fillText(pH <= 4.6 ? T('set: thick yoghurt', 'menggumpal: yoghurt kental') : pH <= 5.5 ? T('thickening…', 'mulai mengental…') : T('still liquid milk', 'masih susu cair'), cx, baseY + hgt * 0.1);
  }

  function drawTray(ctx, cx, baseY, hgt) {
    const w = hgt * 1.2, h = hgt * 0.35, c = state.cover;
    ctx.fillStyle = '#065f46'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(cx - w / 2, baseY - h, w, h, 8); ctx.fill(); ctx.stroke();
    // beans
    const cols = 10, rows = 3;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const bx = cx - w / 2 + (i + 0.5) * (w / cols), by = baseY - h + (j + 0.5) * (h / rows);
      ctx.fillStyle = '#d4a257';
      ctx.beginPath(); ctx.ellipse(bx, by, w / cols * 0.42, h / rows * 0.36, (i + j) % 2 ? 0.4 : -0.3, 0, Math.PI * 2); ctx.fill();
    }
    // mycelium: white fuzz with alpha = coverage, growing from centre outwards
    ctx.save();
    ctx.beginPath(); ctx.roundRect(cx - w / 2, baseY - h, w, h, 8); ctx.clip();
    const rr = Math.sqrt(c) * w * 0.75;
    const g = ctx.createRadialGradient(cx, baseY - h / 2, 0, cx, baseY - h / 2, Math.max(1, rr));
    g.addColorStop(0, `rgba(248,250,252,${0.92 * clamp(c * 1.3, 0, 1)})`);
    g.addColorStop(0.8, `rgba(248,250,252,${0.8 * clamp(c * 1.3, 0, 1)})`);
    g.addColorStop(1, 'rgba(248,250,252,0)');
    ctx.fillStyle = g; ctx.fillRect(cx - w, baseY - h - 10, 2 * w, h + 20);
    ctx.restore();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(hgt * 0.08, true); ctx.textAlign = 'center';
    ctx.fillText(T(`mycelium coverage: ${Math.round(c * 100)}%`, `tutupan miselium: ${Math.round(c * 100)}%`), cx, baseY - h - hgt * 0.08);
    ctx.font = font(hgt * 0.06); ctx.fillStyle = c > 0.9 ? '#4ade80' : '#cbd5e1';
    ctx.fillText(c > 0.9 ? T('firm tempe cake', 'tempe padat') : T('the mould feeds on the beans themselves', 'jamur memakan kedelainya sendiri'), cx, baseY + hgt * 0.1);
  }

  function drawThermometer(ctx, x, y0, y1) {
    const tw = Math.max(8, (y1 - y0) * 0.06);
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(x - tw / 2, y0, tw, y1 - y0, tw / 2); ctx.fill();
    const k = clamp(params.temp / 60, 0, 1);
    ctx.fillStyle = tempColor(params.temp);
    ctx.beginPath(); ctx.roundRect(x - tw / 2 + 2, y1 - (y1 - y0 - 4) * k - 2, tw - 4, (y1 - y0 - 4) * k, tw / 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y1 + tw * 0.6, tw * 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(tw * 1.3, true); ctx.textAlign = 'center';
    ctx.fillText(`${params.temp} °C`, x, y0 - tw * 0.6);
  }

  function drawBell(ctx, gx, gy, gw, gh) {
    const p = P();
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 6); ctx.fill();
    const pad = gw * 0.08, x0 = gx + pad, x1 = gx + gw - pad * 0.5, yb = gy + gh - pad * 0.9, yt = gy + pad * 1.4;
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x1, yb); ctx.moveTo(x0, yb); ctx.lineTo(x0, yt); ctx.stroke();
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const f = tempFactor(p, i), px = x0 + (i / 60) * (x1 - x0), py = yb - f * (yb - yt);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    const fx = x0 + (params.temp / 60) * (x1 - x0), fy = yb - tempFactor(p, params.temp) * (yb - yt);
    ctx.fillStyle = tempColor(params.temp); ctx.beginPath(); ctx.arc(fx, fy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(gw * 0.05); ctx.textAlign = 'left';
    ctx.fillText(T('rate vs temperature', 'laju vs suhu'), gx + 8, gy + gw * 0.06);
    ctx.textAlign = 'right';
    ctx.fillText(T(`${Math.round(tempFactor(p, params.temp) * 100)}% of max · optimum ${p.topt} °C`, `${Math.round(tempFactor(p, params.temp) * 100)}% dari maks · optimum ${p.topt} °C`), gx + gw - 8, gy + gw * 0.06);
    ctx.font = font(gw * 0.042); ctx.textAlign = 'center';
    ctx.fillText('0', x0, yb + gw * 0.05); ctx.fillText('30', (x0 + x1) / 2, yb + gw * 0.05); ctx.fillText('60 °C', x1, yb + gw * 0.05);
  }

  function drawProgress(ctx, gx, gy, gw, gh) {
    ctx.fillStyle = '#111c33'; ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 6); ctx.fill();
    const pad = gw * 0.08, x0 = gx + pad, x1 = gx + gw - pad * 0.5, yb = gy + gh - pad * 0.9, yt = gy + pad * 1.4;
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x1, yb); ctx.moveTo(x0, yb); ctx.lineTo(x0, yt); ctx.stroke();
    const p = P();
    const tMax = Math.max(p.checkpoint, state.t);
    let vMin = 0, vMax, label, color = '#fbbf24';
    if (params.preset === 'yeast') { vMax = Math.max(100, ...hist.v) * 1.1; label = T('CO₂ volume (mL)', 'volume CO₂ (mL)'); }
    else if (params.preset === 'bread') { vMax = 120; label = T('dough rise (%)', 'kenaikan adonan (%)'); }
    else if (params.preset === 'yoghurt') { vMin = 3.5; vMax = 7; label = 'pH'; color = '#38bdf8'; }
    else { vMax = 100; label = T('mycelium coverage (%)', 'tutupan miselium (%)'); color = '#f8fafc'; }
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i < hist.t.length; i++) {
      const px = x0 + (hist.t[i] / tMax) * (x1 - x0), py = yb - clamp((hist.v[i] - vMin) / (vMax - vMin), 0, 1) * (yb - yt);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // checkpoint marker
    const cxp = x0 + (p.checkpoint / tMax) * (x1 - x0);
    ctx.strokeStyle = 'rgba(248,113,113,0.6)'; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(cxp, yt); ctx.lineTo(cxp, yb); ctx.stroke(); ctx.setLineDash([]);
    if (params.preset === 'yoghurt') {
      const y45 = yb - ((4.5 - vMin) / (vMax - vMin)) * (yb - yt);
      ctx.strokeStyle = 'rgba(74,222,128,0.6)'; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(x0, y45); ctx.lineTo(x1, y45); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#4ade80'; ctx.font = font(gw * 0.042); ctx.textAlign = 'left'; ctx.fillText('pH 4.5', x0 + 4, y45 - 3);
    }
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(gw * 0.05); ctx.textAlign = 'left';
    ctx.fillText(label, gx + 8, gy + gw * 0.06);
    ctx.font = font(gw * 0.042); ctx.textAlign = 'right';
    ctx.fillText(vMax >= 10 ? Math.round(vMax).toString() : vMax.toFixed(1), x0 - 3, yt + 4);
    ctx.fillText(vMin.toString(), x0 - 3, yb);
    ctx.textAlign = 'center';
    ctx.fillText(fmtTime(tMax), x1, yb + gw * 0.05);
    ctx.fillStyle = '#fca5a5'; ctx.fillText(T('checkpoint', 'titik catat'), cxp, yt - 2);
  }

  function draw() {
    const ctx = cv.ctx;
    const w = cv.width, h = cv.height;
    if (w < 10 || h < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, w, h);
    const fs = Math.max(10, w * 0.02);
    // header
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 1.15, true); ctx.textAlign = 'left';
    ctx.fillText(P().name[lang()], w * 0.03, h * 0.08);
    ctx.font = font(fs); ctx.fillStyle = state.running ? '#4ade80' : '#94a3b8';
    ctx.fillText(`${T('clock', 'waktu')}: ${fmtTime(state.t)} ${state.running ? '▶' : '❚❚'}  ·  ${T('time speed', 'kecepatan waktu')} ${params.speed}×`, w * 0.03, h * 0.14);
    // apparatus
    const baseY = h * 0.78, hgt = h * 0.42, cx = w * 0.30;
    drawThermometer(ctx, w * 0.06, h * 0.30, h * 0.72);
    if (params.preset === 'yeast') drawFlask(ctx, cx, baseY, hgt);
    else if (params.preset === 'bread') drawBowl(ctx, cx, baseY, hgt);
    else if (params.preset === 'yoghurt') drawJar(ctx, cx, baseY, hgt);
    else drawTray(ctx, cx, baseY, hgt);
    // bench
    ctx.fillStyle = '#1e293b'; ctx.fillRect(w * 0.03, baseY, w * 0.5, 5);
    // readouts under bench
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.95); ctx.textAlign = 'left';
    const p = P();
    let line1, line2;
    if (params.preset === 'tempe') {
      line1 = T('sugar slider not used: the mould digests the beans', 'slider gula tidak dipakai: jamur mencerna kedelai');
      line2 = T(`growth rate: ${(state.rateNow * 3600 * 100).toFixed(1)} % per hour`, `laju tumbuh: ${(state.rateNow * 3600 * 100).toFixed(1)} % per jam`);
    } else {
      line1 = T(`sugar left: ${state.S.toFixed(2)} g of ${params.sugar0} g`, `gula tersisa: ${state.S.toFixed(2)} g dari ${params.sugar0} g`);
      const perMin = state.rateNow * 60;
      line2 = params.preset === 'yoghurt'
        ? T(`rate: ${(perMin * 1000).toFixed(1)} mg lactose → acid per min`, `laju: ${(perMin * 1000).toFixed(1)} mg laktosa → asam per menit`)
        : T(`rate: ${(perMin).toFixed(3)} g sugar/min → ${(perMin * ML_PER_G_SUGAR).toFixed(0)} mL CO₂/min`, `laju: ${(perMin).toFixed(3)} g gula/menit → ${(perMin * ML_PER_G_SUGAR).toFixed(0)} mL CO₂/menit`);
    }
    ctx.fillText(line1, w * 0.03, h * 0.86);
    ctx.fillText(line2, w * 0.03, h * 0.91);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T(`r = r_max × f(T) × S/(S+${KS}) · f(${params.temp} °C) = ${tempFactor(p, params.temp).toFixed(2)}`, `r = r_maks × f(T) × S/(S+${KS}) · f(${params.temp} °C) = ${tempFactor(p, params.temp).toFixed(2)}`), w * 0.03, h * 0.96);
    // right column
    const gx = w * 0.57, gw = w * 0.40;
    drawBell(ctx, gx, h * 0.05, gw, h * 0.40);
    drawProgress(ctx, gx, h * 0.50, gw, h * 0.46);
    ctx.textAlign = 'left';
  }

  // ---- controls ------------------------------------------------------------
  let startB, runToB;
  function syncButtons() {
    if (startB) startB.label = state.running ? 'Pause' : 'Start';
    if (runToB) runToB.label = `Run to ${fmtTime(P().checkpoint)}`;
  }
  const presetSel = select({
    label: 'Preset', key: 'preset',
    options: Object.keys(PRESETS).map((k) => ({ value: k, label: PRESETS[k].name.en })),
    value: params.preset,
    onChange: (v) => {
      params.preset = v;
      params.speed = PRESETS[v].speed; speedSel.value = String(params.speed);
      if (v === 'yoghurt') { params.sugar0 = 10; sugarS.value = 10; }
      if (v === 'yeast' || v === 'bread') { params.sugar0 = 20; sugarS.value = 20; }
      params.temp = PRESETS[v].topt; tempS.value = params.temp;
      reset(); syncButtons();
    },
  });
  const tempS = slider({
    label: 'Temperature (°C)', key: 'temp', min: 0, max: 60, step: 1, value: params.temp,
    onInput: (v) => { params.temp = v; },
  });
  const sugarS = slider({
    label: 'Sugar (g)', key: 'sugar', min: 0, max: 30, step: 1, value: params.sugar0,
    onInput: (v) => { params.sugar0 = v; if (state.t === 0) { state.S = v; } },
  });
  const speedSel = select({
    label: 'Time speed', key: 'speed',
    options: [1, 5, 20, 60, 300, 1800].map((s) => ({ value: String(s), label: `${s}×` })),
    value: String(params.speed),
    onChange: (v) => { params.speed = Number(v) || 1; },
  });
  startB = button({ label: 'Start', primary: true, onClick: () => { state.running = !state.running; state.runTo = null; syncButtons(); } });
  runToB = button({ label: 'Run to 2:00', onClick: () => { if (state.t < P().checkpoint) { state.runTo = P().checkpoint; state.running = true; syncButtons(); } } });
  const resetB = button({ label: 'Reset', onClick: () => { reset(); syncButtons(); } });
  ctrlPanel.append(presetSel.el, tempS.el, sugarS.el, speedSel.el, row(startB, runToB, resetB));
  reset(); syncButtons();

  const lab = labPanel({
    title: 'Fermentation lab: temperature and sugar',
    filename: 'fermentation-data.csv',
    columns: [
      { key: 'preset', label: 'Preset' },
      { key: 'temp', label: 'Temperature (°C)' },
      { key: 'sugar', label: 'Sugar (g)' },
      { key: 'time', label: 'Time' },
      { key: 'co2', label: 'CO₂ / balloon (mL)', format: (v) => (v == null ? '–' : v.toFixed(0)) },
      { key: 'result', label: 'Result' },
    ],
    procedure: [
      'Yeast preset, 20 g sugar. Set 10 °C and press "Run to 2:00". Record the balloon volume.',
      'Reset and repeat at 20, 30, 35, 40, 50 and 60 °C. Plot volume against temperature: where is the peak?',
      'Set 35 °C and repeat with 2, 5, 10 and 20 g of sugar. Does doubling the sugar double the volume?',
      'With 2 g, let the clock run to 10 minutes. What does the CO₂ graph do, and why?',
      'Switch to yoghurt and tempe. Find each microbe\'s best temperature and compare with the yeast.',
    ],
    predict: 'Sketch the balloon volume at 2 minutes against temperature from 0 to 60 °C. Where will the peak be, and will 60 °C give more or less gas than 10 °C?',
    source: () => {
      if (state.t <= 0) return null;
      const isGas = params.preset === 'yeast' || params.preset === 'bread';
      let result;
      if (params.preset === 'yeast') result = `${state.co2.toFixed(0)} mL`;
      else if (params.preset === 'bread') result = `rise ${Math.round(clamp(state.co2 / 500, 0, 1.2) * 100)}%`;
      else if (params.preset === 'yoghurt') result = `pH ${phFromAcid(state.acid).toFixed(2)}`;
      else result = `coverage ${Math.round(state.cover * 100)}%`;
      return { preset: params.preset, temp: params.temp, sugar: params.preset === 'tempe' ? '–' : params.sugar0, time: fmtTime(state.t), co2: isGas ? state.co2 : null, result };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
