import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const MONO = 'ui-monospace, Menlo, Consolas, monospace';
const SANS = 'system-ui, -apple-system, Roboto, sans-serif';

// Linear expansion coefficients, per °C (real values).
const MATERIALS = [
  { id: 'aluminium', en: 'Aluminium', idn: 'Aluminium', alpha: 23e-6, color: '#cbd5e1' },
  { id: 'brass', en: 'Brass', idn: 'Kuningan', alpha: 19e-6, color: '#eab308' },
  { id: 'copper', en: 'Copper', idn: 'Tembaga', alpha: 17e-6, color: '#f97316' },
  { id: 'steel', en: 'Steel', idn: 'Baja', alpha: 12e-6, color: '#94a3b8' },
  { id: 'glass', en: 'Glass', idn: 'Kaca', alpha: 9e-6, color: '#7dd3fc' },
  { id: 'invar', en: 'Invar (Fe-Ni)', idn: 'Invar (Fe-Ni)', alpha: 1.2e-6, color: '#a3a3a3' },
];
const STEEL = MATERIALS[3], BRASS = MATERIALS[1];
const T0 = 20;            // reference (room) temperature, °C
const EXAG = 100;         // visual exaggeration of the rail expansion
const BALL_D = 30.00;     // mm, at 20 °C
const RING_D = 30.02;     // mm, hole diameter at 20 °C
const STRIP_L = 100;      // mm
const STRIP_T = 1;        // mm, thickness of each layer
const CONTACT_GAP = 4;    // mm, thermostat contact distance from the cold tip

export function mount(rootEl) {
  const canvasWrap = document.createElement('div'); rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div'); ctrlPanel.className = 'sim-controls'; rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { scene: 'rail', mat: STEEL, temp: 20, L: 10, gap: 20, heatRing: false };
  const st = { tShown: 20 };   // temperature eases toward the slider for a smooth animation
  let now = 0;

  const dT = () => st.tShown - T0;
  const fmtNum = (v, dp) => (getLocale() === 'id' ? v.toFixed(dp).replace('.', ',') : v.toFixed(dp));
  const alphaStr = (a) => `${fmtNum(a * 1e6, a < 5e-6 ? 1 : 0)}×10⁻⁶ /°C`;
  // ΔL = α L ΔT. L in metres in, metres out.
  const deltaL = (alpha, L, dt) => alpha * L * dt;

  // ---------- drawing helpers ----------
  function thermometer(ctx, x, y, h, W) {
    const w = Math.max(10, W * 0.018);
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(x - w / 2, y, w, h, w / 2); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5; ctx.stroke();
    const frac = Math.max(0, Math.min(1, st.tShown / 300));
    const top = y + h - frac * (h - w);
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.roundRect(x - w * 0.3, top, w * 0.6, y + h - top, 3); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y + h + w * 0.6, w * 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.max(9, W * 0.014)}px ${SANS}`; ctx.textAlign = 'left';
    for (let t = 0; t <= 300; t += 100) {
      const yy = y + h - (t / 300) * (h - w);
      ctx.fillRect(x + w / 2, yy - 0.5, 5, 1);
      ctx.fillText(String(t), x + w / 2 + 8, yy + 4);
    }
    ctx.fillStyle = '#f1f5f9'; ctx.font = `bold ${Math.max(11, W * 0.02)}px ${MONO}`; ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(st.tShown)} °C`, x, y - 10);
  }

  function formulaBox(ctx, x, y, w, lines, W) {
    const lh = Math.max(14, W * 0.024);
    const h = lh * lines.length + 16;
    ctx.fillStyle = 'rgba(17,28,51,0.92)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 8); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
    ctx.textAlign = 'left';
    lines.forEach((ln, i) => {
      ctx.fillStyle = ln.color || '#e2e8f0';
      ctx.font = `${ln.bold ? 'bold ' : ''}${Math.max(10, W * 0.018)}px ${ln.mono ? MONO : SANS}`;
      ctx.fillText(ln.text, x + 10, y + 12 + lh * (i + 0.75));
    });
    return y + h;
  }

  function drawRail(ctx, W, H) {
    const m = p.mat, dt = dT();
    const Lm = p.L, dL = deltaL(m.alpha, Lm, dt);                // metres
    const gapM = p.gap / 1000;
    const closes = dL >= gapM - 1e-12;
    // visual scale: rail = 55% of the width; expansion and gap drawn ×EXAG
    const x0 = W * 0.14, Lpx = W * 0.55, pxPerM = Lpx / Lm;
    const gapPx = gapM * EXAG * pxPerM;
    const dLpx = Math.min(dL * EXAG * pxPerM, gapPx);
    const y = H * 0.56, rh = Math.max(10, H * 0.06);
    // ground + sleepers
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, y + rh, W, H * 0.08);
    ctx.fillStyle = '#5b3a1e';
    for (let i = 0; i < 10; i++) ctx.fillRect(x0 - 20 + i * (Lpx + gapPx + 40) / 9, y + rh - 4, 14, H * 0.09);
    // anchor wall at the left end and the stop at the right (fixed at 20 °C spacing)
    ctx.fillStyle = '#475569';
    ctx.fillRect(x0 - W * 0.03, y - H * 0.12, W * 0.03, rh + H * 0.12 + H * 0.08);
    const stopX = x0 + Lpx + gapPx;
    ctx.fillRect(stopX, y - H * 0.12, W * 0.03, rh + H * 0.12 + H * 0.08);
    // the rail itself
    const bend = closes ? Math.min(1, (dL - gapM) / Math.max(gapM * 0.5 + 0.005, 1e-6)) : 0;
    ctx.fillStyle = m.color;
    if (bend > 0) {
      // buckled: draw as a thick arched path
      const bulge = -H * (0.08 + 0.18 * bend);
      ctx.strokeStyle = m.color; ctx.lineWidth = rh; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.moveTo(x0, y + rh / 2);
      ctx.quadraticCurveTo(x0 + (Lpx + gapPx) / 2, y + rh / 2 + bulge * 2, stopX, y + rh / 2); ctx.stroke();
    } else {
      ctx.fillRect(x0, y, Lpx + dLpx, rh);
    }
    // heat glow
    if (dt > 0) {
      ctx.fillStyle = `rgba(239,68,68,${Math.min(0.45, dt / 600)})`;
      ctx.fillRect(x0, y, Lpx + dLpx, rh);
    } else if (dt < 0) {
      ctx.fillStyle = `rgba(96,165,250,${Math.min(0.45, -dt / 60)})`;
      ctx.fillRect(x0, y, Lpx + dLpx, rh);
    }
    // cold-length marker and ΔL bracket
    ctx.strokeStyle = '#fbbf24'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0 + Lpx, y - H * 0.1); ctx.lineTo(x0 + Lpx, y + rh + 4); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = `${Math.max(10, W * 0.016)}px ${SANS}`; ctx.textAlign = 'center';
    ctx.fillText(T('end at 20 °C', 'ujung pada 20 °C'), x0 + Lpx, y - H * 0.115);
    if (Math.abs(dLpx) > 2 && !closes) {
      ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0 + Lpx, y + rh + H * 0.1); ctx.lineTo(x0 + Lpx + dLpx, y + rh + H * 0.1); ctx.stroke();
      ctx.fillStyle = '#f87171';
      ctx.fillText(`ΔL ×${EXAG}`, x0 + Lpx + dLpx / 2, y + rh + H * 0.16);
    }
    // gap label
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
    ctx.fillText(T(`gap ${fmtNum(p.gap, 0)} mm (drawn ×${EXAG})`, `celah ${fmtNum(p.gap, 0)} mm (digambar ×${EXAG})`), x0 + Lpx + gapPx / 2, y - H * 0.03);
    // L label
    ctx.fillStyle = '#e2e8f0'; ctx.font = `${Math.max(11, W * 0.018)}px ${SANS}`;
    ctx.fillText(`L = ${fmtNum(Lm, 1)} m`, x0 + Lpx / 2, y + rh + H * 0.16);
    // formula
    const dLmm = dL * 1000;
    formulaBox(ctx, W * 0.33, H * 0.05, W * 0.64, [
      { text: 'ΔL = α · L · ΔT', bold: true, mono: true },
      { text: `ΔL = ${alphaStr(m.alpha)} × ${fmtNum(Lm, 1)} m × ${fmtNum(dt, 0)} °C`, mono: true },
      { text: `ΔL = ${fmtNum(dL, 5)} m = ${fmtNum(dLmm, 1)} mm`, mono: true, color: '#fbbf24', bold: true },
      { text: closes
        ? T(`${fmtNum(dLmm, 1)} mm > ${fmtNum(p.gap, 0)} mm gap: the rail pushes the stop and buckles!`, `${fmtNum(dLmm, 1)} mm > celah ${fmtNum(p.gap, 0)} mm: rel mendorong penahan dan melengkung!`)
        : T(`Gap left: ${fmtNum(p.gap - dLmm, 1)} mm of ${fmtNum(p.gap, 0)} mm`, `Sisa celah: ${fmtNum(p.gap - dLmm, 1)} mm dari ${fmtNum(p.gap, 0)} mm`),
        color: closes ? '#f87171' : '#86efac' },
    ], W);
    if (closes) {
      ctx.fillStyle = '#f87171'; ctx.font = `bold ${Math.max(13, W * 0.03)}px ${SANS}`; ctx.textAlign = 'center';
      ctx.fillText(T('Rail buckles!', 'Rel melengkung!'), x0 + (Lpx + gapPx) / 2, y - H * 0.2);
    }
  }

  function drawRingBall(ctx, W, H) {
    const m = p.mat, dt = dT();
    const dBall = BALL_D * (1 + m.alpha * dt);                       // mm
    const dRing = RING_D * (1 + (p.heatRing ? STEEL.alpha * dt : 0)); // ring is steel
    const fits = dBall <= dRing;
    // draw: ring on a stand, ball above it. Visual exaggeration ×EXAG for the size change.
    const cx = W * 0.5, ringY = H * 0.62, R0 = H * 0.17;
    const ringR = R0 * (dRing / RING_D - 1) * EXAG + R0;
    const ballR = R0 * (BALL_D / RING_D) * (1 + (dBall / BALL_D - 1) * EXAG);
    // stand
    ctx.fillStyle = '#475569'; ctx.fillRect(cx - 6, ringY, 12, H * 0.3); ctx.fillRect(cx - W * 0.12, H * 0.9, W * 0.24, H * 0.03);
    // ring
    ctx.strokeStyle = p.heatRing && dt > 0 ? '#f87171' : STEEL.color; ctx.lineWidth = Math.max(8, H * 0.03);
    ctx.beginPath(); ctx.arc(cx, ringY, ringR + ctx.lineWidth / 2, 0, Math.PI * 2); ctx.stroke();
    // ball: it sits in the ring if it fits, otherwise rests on top
    const phase = (Math.sin(now * 1.5) + 1) / 2;
    const ballY = fits ? ringY - R0 * 1.6 + phase * R0 * 3.2 : ringY - ballR - ctx.lineWidth * 0.3;
    ctx.fillStyle = m.color;
    ctx.beginPath(); ctx.arc(cx, fits ? ballY : ballY, ballR, 0, Math.PI * 2); ctx.fill();
    if (dt > 0) { ctx.fillStyle = `rgba(239,68,68,${Math.min(0.5, dt / 500)})`; ctx.fill(); }
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    // labels
    ctx.textAlign = 'center'; ctx.fillStyle = '#e2e8f0'; ctx.font = `${Math.max(11, W * 0.018)}px ${SANS}`;
    ctx.fillText(T(`${m.en} ball`, `Bola ${m.idn.toLowerCase()}`), cx, H * 0.95);
    ctx.fillStyle = fits ? '#86efac' : '#f87171'; ctx.font = `bold ${Math.max(13, W * 0.028)}px ${SANS}`;
    ctx.fillText(fits ? T('Ball passes through', 'Bola lolos melewati cincin') : T('Ball is stuck!', 'Bola tersangkut!'), cx, H * 0.1);
    formulaBox(ctx, W * 0.02, H * 0.16, W * 0.44, [
      { text: T('Ball (at 20 °C: 30.00 mm)', 'Bola (pada 20 °C: 30,00 mm)'), bold: true },
      { text: `ΔD = ${alphaStr(m.alpha)} × ${fmtNum(BALL_D, 2)} mm × ${fmtNum(dt, 0)} °C`, mono: true },
      { text: `D = ${fmtNum(dBall, 3)} mm`, mono: true, color: m.color === '#94a3b8' ? '#e2e8f0' : m.color, bold: true },
    ], W);
    formulaBox(ctx, W * 0.54, H * 0.16, W * 0.44, [
      { text: T('Steel ring hole (at 20 °C: 30.02 mm)', 'Lubang cincin baja (pada 20 °C: 30,02 mm)'), bold: true },
      { text: p.heatRing ? `ΔD = ${alphaStr(STEEL.alpha)} × ${fmtNum(RING_D, 2)} mm × ${fmtNum(dt, 0)} °C` : T('ring kept at 20 °C', 'cincin tetap 20 °C'), mono: true },
      { text: `D = ${fmtNum(dRing, 3)} mm`, mono: true, color: '#cbd5e1', bold: true },
    ], W);
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.max(10, W * 0.015)}px ${SANS}`; ctx.textAlign = 'center';
    ctx.fillText(T(`size change drawn ×${EXAG}`, `perubahan ukuran digambar ×${EXAG}`), cx, H * 0.47);
  }

  function drawBimetal(ctx, W, H) {
    const dt = dT();
    // Curvature of a two-layer strip with equal thickness and (assumed) equal stiffness:
    // κ = 3 (α_brass − α_steel) ΔT / (2 h), h = total thickness.
    const h = 2 * STRIP_T / 1000;                                   // m
    const kappa = 1.5 * (BRASS.alpha - STEEL.alpha) * dt / h;        // 1/m
    const Lm = STRIP_L / 1000;
    const theta = kappa * Lm;                                        // rad, total bend angle
    const defl = Math.abs(theta) < 1e-9 ? 0 : (1 - Math.cos(theta)) / kappa; // m, tip deflection toward steel side
    const deflMm = defl * 1000;
    const open = deflMm >= CONTACT_GAP;
    // geometry: strip clamped at the left, drawn to scale (100 mm = 60% of width)
    const pxPerMm = W * 0.6 / STRIP_L;
    const x0 = W * 0.2, y0 = H * 0.5;
    const thick = Math.max(6, STRIP_T * pxPerMm * 2.5);             // each layer, slightly thickened for visibility
    // clamp
    ctx.fillStyle = '#475569'; ctx.fillRect(x0 - W * 0.06, y0 - H * 0.12, W * 0.06, H * 0.24);
    // strip: parametrize along arc length s, center-line radius 1/κ; bends up (toward steel on top) when hot
    const N = 40;
    const pt = (s, off) => {
      // off: offset perpendicular to the centerline (mm, + = toward steel/top)
      if (Math.abs(kappa) < 1e-6) return { x: x0 + s * pxPerMm, y: y0 - off * pxPerMm };
      const R = 1 / kappa;                                          // m; positive bends toward +off (up)
      const a = s / 1000 * kappa;
      const cxm = 0, cym = R;                                       // centre of curvature in metres, up = +y
      const xm = cxm + R * Math.sin(a), ym = cym - R * Math.cos(a);
      const nx = -Math.sin(a), ny = Math.cos(a);                    // unit normal pointing toward +off
      const X = xm + nx * off / 1000, Y = ym + ny * off / 1000;
      return { x: x0 + X * 1000 * pxPerMm, y: y0 - Y * 1000 * pxPerMm };
    };
    const layer = (lo, hi, color) => {
      ctx.fillStyle = color; ctx.beginPath();
      for (let i = 0; i <= N; i++) { const q = pt(STRIP_L * i / N, hi); i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); }
      for (let i = N; i >= 0; i--) { const q = pt(STRIP_L * i / N, lo); ctx.lineTo(q.x, q.y); }
      ctx.closePath(); ctx.fill();
    };
    const tv = thick / pxPerMm;   // visual layer thickness in mm units
    layer(0, tv, STEEL.color);    // steel on top
    layer(-tv, 0, BRASS.color);   // brass underneath
    if (dt > 0) layer(-tv, tv, `rgba(239,68,68,${Math.min(0.4, dt / 600)})`);
    // cold reference line
    ctx.strokeStyle = 'rgba(251,191,36,0.6)'; ctx.setLineDash([4, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + STRIP_L * pxPerMm, y0); ctx.stroke(); ctx.setLineDash([]);
    // thermostat contact above the tip
    const tipX = x0 + STRIP_L * pxPerMm, contactY = y0 - CONTACT_GAP * pxPerMm - thick;
    ctx.fillStyle = open ? '#f87171' : '#86efac';
    ctx.fillRect(tipX - 14, contactY - 6, 20, 6);
    ctx.fillRect(tipX - 3, contactY - H * 0.25, 6, H * 0.25 - 6);
    // tip and deflection arrow
    const tip = pt(STRIP_L, 0);
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tipX + 18, y0); ctx.lineTo(tipX + 18, tip.y); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.font = `${Math.max(11, W * 0.018)}px ${MONO}`; ctx.textAlign = 'left';
    ctx.fillText(`d = ${fmtNum(deflMm, 1)} mm`, tipX + 24, (y0 + tip.y) / 2 + 4);
    // labels
    ctx.font = `${Math.max(11, W * 0.018)}px ${SANS}`; ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'left';
    const s1 = pt(STRIP_L * 0.5, tv * 1.1), s2 = pt(STRIP_L * 0.5, -tv * 1.1);
    ctx.textAlign = 'center';
    ctx.fillText(T(`steel, α = ${alphaStr(STEEL.alpha)}`, `baja, α = ${alphaStr(STEEL.alpha)}`), s1.x, s1.y - 10);
    ctx.fillText(T(`brass, α = ${alphaStr(BRASS.alpha)}`, `kuningan, α = ${alphaStr(BRASS.alpha)}`), s2.x, s2.y + 20);
    ctx.fillStyle = open ? '#f87171' : '#86efac'; ctx.font = `bold ${Math.max(12, W * 0.024)}px ${SANS}`;
    ctx.fillText(open ? T('Contact open: heater OFF (thermostat)', 'Kontak terbuka: pemanas MATI (termostat)') : T('Contact closed: heater ON', 'Kontak tertutup: pemanas HIDUP'), W * 0.5, H * 0.1);
    const dLb = deltaL(BRASS.alpha, Lm, dt) * 1000, dLs = deltaL(STEEL.alpha, Lm, dt) * 1000;
    formulaBox(ctx, W * 0.02, H * 0.7, W * 0.96, [
      { text: T(`Brass stretches ${fmtNum(dLb, 3)} mm, steel only ${fmtNum(dLs, 3)} mm (L = 100 mm, ΔT = ${fmtNum(dt, 0)} °C), so the strip bends toward the steel.`, `Kuningan memanjang ${fmtNum(dLb, 3)} mm, baja hanya ${fmtNum(dLs, 3)} mm (L = 100 mm, ΔT = ${fmtNum(dt, 0)} °C), sehingga keping melengkung ke arah baja.`) },
      { text: `κ = 3(α_brass − α_steel)ΔT / (2h) = ${fmtNum(kappa, 2)} /m   →   d ≈ (1 − cos(κL))/κ = ${fmtNum(deflMm, 1)} mm`, mono: true, color: '#fbbf24' },
      { text: T('Drawn to scale (layer thickness enlarged). Model assumes equal thickness and stiffness.', 'Digambar sesuai skala (tebal lapisan diperbesar). Model mengasumsikan tebal dan kekakuan yang sama.'), color: '#94a3b8' },
    ], W);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (p.scene === 'rail') drawRail(ctx, W, H);
    else if (p.scene === 'ring') drawRingBall(ctx, W, H);
    else drawBimetal(ctx, W, H);
    thermometer(ctx, W * 0.05, H * 0.1, H * 0.6, W);
    ctx.fillStyle = '#64748b'; ctx.font = `${Math.max(10, W * 0.014)}px ${SANS}`; ctx.textAlign = 'right';
    ctx.fillText(`ΔT = T − 20 °C = ${fmtNum(dT(), 0)} °C`, W * 0.98, H * 0.97);
    ctx.textAlign = 'left';
  }

  function step(dt) {
    const k = 1 - Math.exp(-6 * dt);
    st.tShown += (p.temp - st.tShown) * k;
    if (Math.abs(p.temp - st.tShown) < 0.05) st.tShown = p.temp;
  }

  // ---------- controls ----------
  const sceneSel = select({
    label: T('Scene', 'Adegan'), key: 'scene',
    options: [
      { value: 'rail', label: T('Rail with expansion gap', 'Rel dengan celah pemuaian') },
      { value: 'ring', label: T('Ring and ball', 'Cincin dan bola') },
      { value: 'bimetal', label: T('Bimetal strip (steel/brass)', 'Keping bimetal (baja/kuningan)') },
    ],
    value: 'rail',
    onChange: (v) => { p.scene = v; refreshVisibility(); },
  });
  const matSel = select({
    label: T('Material (α)', 'Bahan (α)'), key: 'material',
    options: MATERIALS.map((m) => ({ value: m.id, label: `${T(m.en, m.idn)} — ${(m.alpha * 1e6).toFixed(m.alpha < 5e-6 ? 1 : 0)}×10⁻⁶ /°C` })),
    value: 'steel',
    onChange: (v) => { p.mat = MATERIALS.find((m) => m.id === v) || STEEL; },
  });
  const tempS = slider({ label: T('Temperature T (°C)', 'Suhu T (°C)'), key: 'temp', min: 0, max: 300, step: 1, value: 20, onInput: (v) => { p.temp = v; } });
  const lenS = slider({ label: T('Rail length L (m)', 'Panjang rel L (m)'), key: 'length', min: 1, max: 30, step: 0.5, value: 10, format: (v) => v.toFixed(1), onInput: (v) => { p.L = v; } });
  const gapS = slider({ label: T('Expansion gap (mm)', 'Celah pemuaian (mm)'), key: 'gap', min: 0, max: 60, step: 1, value: 20, onInput: (v) => { p.gap = v; } });
  const ringT = toggle({ label: T('Heat the ring too', 'Panaskan cincin juga'), key: 'heatring', value: false, onChange: (v) => { p.heatRing = v; } });
  ctrlPanel.append(sceneSel.el, matSel.el, tempS.el, lenS.el, gapS.el, row(ringT));
  function refreshVisibility() {
    lenS.el.style.display = p.scene === 'rail' ? '' : 'none';
    gapS.el.style.display = p.scene === 'rail' ? '' : 'none';
    ringT.el.style.display = p.scene === 'ring' ? '' : 'none';
    matSel.el.style.display = p.scene === 'bimetal' ? 'none' : '';
  }
  refreshVisibility();

  // ---------- lab ----------
  const lab = labPanel({
    title: 'Expansion lab — ΔL = α L ΔT',
    filename: 'thermal-expansion-data.csv',
    columns: [
      { key: 'scene', label: 'Scene' },
      { key: 'material', label: 'Material' },
      { key: 'alpha', label: 'α (×10⁻⁶ /°C)', format: (v) => v.toFixed(1) },
      { key: 'L', label: 'L (mm)', format: (v) => v.toFixed(0) },
      { key: 'dT', label: 'ΔT (°C)', format: (v) => v.toFixed(0) },
      { key: 'dL', label: 'ΔL (mm)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Rail scene, steel, L = 10 m. Set T = 120 °C (ΔT = 100 °C) and record ΔL.',
      'Keep ΔT = 100 °C and double L to 20 m. Record. Did ΔL double?',
      'Back to L = 10 m; set T = 220 °C (ΔT = 200 °C). Record. How does ΔL compare with step 1?',
      'Repeat step 1 with aluminium and with invar. Which gap size would each one need at 300 °C?',
      'Ring and ball: find the lowest temperature at which the steel ball gets stuck. Record it.',
    ],
    predict: 'If you double the length of the rail, what happens to ΔL? And if you double ΔT?',
    source: () => {
      const dt = p.temp - T0;
      if (p.scene === 'rail') {
        return { scene: 'rail', material: p.mat.en, alpha: p.mat.alpha * 1e6, L: p.L * 1000, dT: dt, dL: deltaL(p.mat.alpha, p.L, dt) * 1000 };
      }
      if (p.scene === 'ring') {
        return { scene: 'ball', material: p.mat.en, alpha: p.mat.alpha * 1e6, L: BALL_D, dT: dt, dL: p.mat.alpha * BALL_D * dt };
      }
      return { scene: 'bimetal (brass − steel)', material: 'brass−steel', alpha: (BRASS.alpha - STEEL.alpha) * 1e6, L: STRIP_L, dT: dt, dL: (BRASS.alpha - STEEL.alpha) * STRIP_L * dt };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
