import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const G = 9.8;
const P_ATM = 101325; // Pa
const LIQUIDS = [
  { id: 'water', label: { en: 'Water', id: 'Air' }, rho: 1000, color: '#2563eb' },
  { id: 'oil', label: { en: 'Cooking oil', id: 'Minyak goreng' }, rho: 800, color: '#ca8a04' },
  { id: 'salt', label: { en: 'Salt water (sea)', id: 'Air garam (laut)' }, rho: 1030, color: '#0e7490' },
];
const BOTTLE_H = 1.0;                 // m
const HOLE_HEIGHTS = [0.75, 0.5, 0.25]; // m above the ground
const SEA_DEPTH = 40;                 // m, diver scene

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { scene: 'bottle', liquid: 'water', level: 1.0 /* m */ };
  // Probe depth below the surface (m) per scene; the probe's horizontal position is a fraction of the container width.
  const state = { probeDepthBottle: 0.5, probeDepthSea: 10, probeFrac: 0.5, t: 0 };

  const liquid = () => LIQUIDS.find((l) => l.id === params.liquid);
  const probeDepth = () => (params.scene === 'bottle' ? Math.min(state.probeDepthBottle, params.level) : state.probeDepthSea);
  const pressure = (h, rho = liquid().rho) => rho * G * Math.max(0, h);

  function geomBottle() {
    const W = cv.width, H = cv.height;
    const groundY = H * 0.9;
    const pxPerM = H * 0.78 / BOTTLE_H;
    const bx0 = W * 0.08, bw = clamp(W * 0.17, 40, 220);
    const bx1 = bx0 + bw;
    const topY = groundY - BOTTLE_H * pxPerM;
    const surfY = groundY - params.level * pxPerM;
    return { W, H, groundY, pxPerM, bx0, bx1, bw, topY, surfY };
  }
  function geomSea() {
    const W = cv.width, H = cv.height;
    const surfY = H * 0.14;
    const bedY = H * 0.93;
    const pxPerM = (bedY - surfY) / SEA_DEPTH;
    return { W, H, surfY, bedY, pxPerM, x0: 0, x1: W * 0.62 };
  }
  function probePos() {
    if (params.scene === 'bottle') {
      const g = geomBottle();
      return { x: g.bx0 + g.bw * state.probeFrac, y: g.surfY + probeDepth() * g.pxPerM };
    }
    const g = geomSea();
    return { x: g.x0 + (g.x1 - g.x0) * state.probeFrac, y: g.surfY + probeDepth() * g.pxPerM };
  }

  const fmtP = (P) => P >= 1e6 ? `${(P / 1e6).toFixed(3)} MPa` : `${(P / 1000).toFixed(P < 10000 ? 2 : 1)} kPa`;
  const font = (s, bold) => `${bold ? 'bold ' : ''}${Math.round(s)}px system-ui, -apple-system, Roboto, sans-serif`;

  function drawProbe(ctx, p, fs, label) {
    const r = clamp(cv.width * 0.014, 7, 12);
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(p.x, p.y - r - fs * 1.2); ctx.lineTo(p.x, p.y - r); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // pressure arrows all around the probe (pressure acts in every direction)
    const L = clamp(cv.height * 0.025 + cv.height * 0.1 * clamp(pressure(probeDepth()) / (params.scene === 'bottle' ? 12000 : 450000), 0, 1), 6, cv.height * 0.14);
    ctx.strokeStyle = '#f87171'; ctx.lineWidth = 2;
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4;
      const x0 = p.x + Math.cos(a) * (r + L + 3), y0 = p.y + Math.sin(a) * (r + L + 3);
      const x1 = p.x + Math.cos(a) * (r + 3), y1 = p.y + Math.sin(a) * (r + 3);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + Math.cos(a + 2.6) * 6, y1 + Math.sin(a + 2.6) * 6); ctx.lineTo(x1 + Math.cos(a - 2.6) * 6, y1 + Math.sin(a - 2.6) * 6); ctx.closePath(); ctx.fillStyle = '#f87171'; ctx.fill();
    }
    ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 0.95, true); ctx.textAlign = 'center';
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((ln, i) => ctx.fillText(ln, p.x, p.y + r + L + fs * (1.2 + 1.1 * i)));
  }

  function drawBottle(ctx, fs) {
    const g = geomBottle();
    const { W, H, groundY, pxPerM, bx0, bx1, bw, topY, surfY } = g;
    const liq = liquid();
    // ground
    ctx.fillStyle = '#1f2937'; ctx.fillRect(0, groundY, W, H - groundY);
    // liquid
    ctx.fillStyle = liq.color; ctx.globalAlpha = 0.85;
    ctx.fillRect(bx0, surfY, bw, groundY - surfY);
    ctx.globalAlpha = 1;
    // bottle walls
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx0, topY - 6); ctx.lineTo(bx0, groundY); ctx.lineTo(bx1, groundY); ctx.lineTo(bx1, topY - 6); ctx.stroke();
    // depth ruler (left of bottle) in metres below the surface
    ctx.strokeStyle = '#94a3b8'; ctx.fillStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.font = font(fs * 0.8); ctx.textAlign = 'right';
    for (let d = 0; d <= params.level + 1e-9; d += 0.25) {
      const y = surfY + d * pxPerM;
      ctx.beginPath(); ctx.moveTo(bx0 - 10, y); ctx.lineTo(bx0 - 4, y); ctx.stroke();
      ctx.fillText(`${d.toFixed(2)} m`, bx0 - 13, y + fs * 0.33);
    }
    // surface label
    ctx.textAlign = 'left'; ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85);
    ctx.fillText(T('surface h = 0', 'permukaan h = 0'), bx1 + 6, surfY - 4);
    // holes and jets
    HOLE_HEIGHTS.forEach((yh, i) => {
      const hy = groundY - yh * pxPerM;
      const h = params.level - yh; // depth of hole below surface
      ctx.fillStyle = '#0b1220';
      ctx.beginPath(); ctx.arc(bx1, hy, 4, 0, Math.PI * 2); ctx.fill();
      if (h > 0.005) {
        const P = pressure(h);
        // pressure arrow inside the bottle pointing at the hole, length ∝ P
        const al = clamp(bw * 0.9 * (P / pressure(BOTTLE_H, 1030)), 6, bw * 0.9);
        ctx.strokeStyle = '#fca5a5'; ctx.fillStyle = '#fca5a5'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(bx1 - al, hy); ctx.lineTo(bx1 - 8, hy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx1 - 2, hy); ctx.lineTo(bx1 - 9, hy - 4); ctx.lineTo(bx1 - 9, hy + 4); ctx.closePath(); ctx.fill();
        // jet: horizontal launch at v = sqrt(2 g h), falls yh to the ground
        const v = Math.sqrt(2 * G * h);
        const tf = Math.sqrt(2 * yh / G);
        const range = v * tf;
        ctx.strokeStyle = liq.color === '#ca8a04' ? '#fbbf24' : '#93c5fd'; ctx.lineWidth = clamp(3 + 4 * h, 2, 8); ctx.lineCap = 'round';
        ctx.beginPath();
        for (let k = 0; k <= 24; k++) {
          const t = tf * k / 24;
          const x = bx1 + v * t * pxPerM, y = hy + 0.5 * G * t * t * pxPerM;
          if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.lineCap = 'butt';
        // moving droplets so the jet reads as flowing
        ctx.fillStyle = '#e0f2fe';
        for (let k = 0; k < 3; k++) {
          const t = ((state.t * 1.2 + k / 3 + i * 0.17) % 1) * tf;
          ctx.beginPath(); ctx.arc(bx1 + v * t * pxPerM, hy + 0.5 * G * t * t * pxPerM, 2.5, 0, Math.PI * 2); ctx.fill();
        }
        // splash mark and range
        const rx = bx1 + range * pxPerM;
        ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(rx, groundY - 6); ctx.lineTo(rx, groundY + 2); ctx.stroke();
        ctx.fillStyle = '#bfdbfe'; ctx.font = font(fs * 0.8); ctx.textAlign = 'center';
        ctx.fillText(`${range.toFixed(2)} m`, rx, groundY + fs * (1.1 + 0.95 * (i % 2)));
        // hole label
        ctx.fillStyle = '#fecaca'; ctx.font = font(fs * 0.8); ctx.textAlign = 'left';
        ctx.fillText(`h=${h.toFixed(2)} m  P=${fmtP(P)}  v=${v.toFixed(2)} m/s`, bx1 + 10, hy - 6);
      } else {
        ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.8); ctx.textAlign = 'left';
        ctx.fillText(T('above the liquid', 'di atas zat cair'), bx1 + 10, hy - 6);
      }
    });
    // probe
    const p = probePos();
    const h = probeDepth();
    drawProbe(ctx, p, fs, [`h = ${h.toFixed(2)} m`, `P = ${fmtP(pressure(h))}`]);
    // readout, top right
    ctx.textAlign = 'right';
    const rx = W * 0.98; let y = fs * 1.4; const lh = fs * 1.35;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    ctx.fillText(`${T(liq.label.en, liq.label.id)}  ρ = ${liq.rho} kg/m³`, rx, y); y += lh;
    ctx.font = font(fs); ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`P = ρ g h = ${liq.rho} × ${G} × ${h.toFixed(2)}`, rx, y); y += lh;
    ctx.fillStyle = '#4ade80'; ctx.font = font(fs * 1.05, true);
    ctx.fillText(`P = ${pressure(h).toFixed(0)} Pa = ${fmtP(pressure(h))}`, rx, y); y += lh;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85);
    ctx.fillText(T(`+${(liq.rho * G / 1000).toFixed(2)} kPa for every metre of depth`, `+${(liq.rho * G / 1000).toFixed(2)} kPa untuk setiap meter kedalaman`), rx, y); y += lh;
    ctx.fillText(T('Jet speed √(2gh) does not depend on ρ', 'Laju pancaran √(2gh) tidak bergantung pada ρ'), rx, y); y += lh;
    ctx.fillText(T('Drag the yellow probe', 'Geser sensor kuning'), rx, y);
    ctx.textAlign = 'left';
  }

  function drawSea(ctx, fs) {
    const g = geomSea();
    const { W, H, surfY, bedY, pxPerM, x0, x1 } = g;
    const liq = liquid();
    // sky, sea gradient, seabed
    ctx.fillStyle = '#1e3a8a'; ctx.fillRect(0, 0, W, surfY);
    const grad = ctx.createLinearGradient(0, surfY, 0, bedY);
    grad.addColorStop(0, liq.color); grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad; ctx.fillRect(0, surfY, W, bedY - surfY);
    ctx.fillStyle = '#44403c'; ctx.fillRect(0, bedY, W, H - bedY);
    // waves
    ctx.strokeStyle = '#bfdbfe'; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 0; x <= W; x += 4) ctx.lineTo(x, surfY + Math.sin(x / 18 + state.t * 2) * 2);
    ctx.stroke();
    // boat
    const bx = W * 0.3;
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.moveTo(bx - 30, surfY - 4); ctx.lineTo(bx + 30, surfY - 4); ctx.lineTo(bx + 20, surfY + 8); ctx.lineTo(bx - 20, surfY + 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fef3c7'; ctx.fillRect(bx - 8, surfY - 24, 16, 20);
    // depth ruler every 10 m with pressure lines
    ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    for (let d = 0; d <= SEA_DEPTH; d += 10) {
      const y = surfY + d * pxPerM;
      ctx.strokeStyle = 'rgba(226,232,240,0.35)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(W < 640 ? `${d} m  ${fmtP(pressure(d))}` : `${d} m   ${fmtP(pressure(d))}   ${T('total', 'mutlak')} ${((pressure(d) + P_ATM) / P_ATM).toFixed(1)} atm`, 8, y - 4);
    }
    // diver (the probe)
    const p = probePos();
    const h = probeDepth();
    const r = clamp(W * 0.014, 7, 12);
    // body
    ctx.strokeStyle = '#111827'; ctx.lineWidth = r * 0.9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(p.x - r * 2.2, p.y + r * 0.6); ctx.lineTo(p.x + r * 2.4, p.y + r * 0.2); ctx.stroke();
    ctx.strokeStyle = '#facc15'; ctx.lineWidth = r * 0.5;
    ctx.beginPath(); ctx.moveTo(p.x - r * 2.2, p.y + r * 0.6); ctx.lineTo(p.x - r * 3.4, p.y + r * 1.4); ctx.stroke();
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#9ca3af'; ctx.fillRect(p.x - r * 0.3, p.y - r * 0.9, r * 2.0, r * 0.7);
    // bubbles
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let k = 0; k < 4; k++) {
      const ph = (state.t * 0.5 + k * 0.25) % 1;
      const by = p.y - r - ph * Math.max(10, p.y - surfY - 10);
      if (by > surfY) { ctx.beginPath(); ctx.arc(p.x + r * 2.8 + Math.sin(ph * 12 + k) * 4, by, 2 + k * 0.6, 0, Math.PI * 2); ctx.fill(); }
    }
    drawProbe(ctx, { x: p.x + r * 2.6, y: p.y }, fs, [`h = ${h.toFixed(1)} m`, `P = ${fmtP(pressure(h))}`]);
    // readout, right side
    ctx.textAlign = 'right';
    const rx = W * 0.98; let y = surfY + fs * 1.6; const lh = fs * 1.35;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    const narrow = W < 640;
    ctx.fillText(`${T(liq.label.en, liq.label.id)}  ρ = ${liq.rho} kg/m³`, rx, y); y += lh;
    ctx.font = font(fs); ctx.fillStyle = '#cbd5e1';
    if (!narrow) { ctx.fillText(`P = ρ g h = ${liq.rho} × ${G} × ${h.toFixed(1)}`, rx, y); y += lh; }
    ctx.fillStyle = '#4ade80'; ctx.font = font(fs * 1.05, true);
    ctx.fillText(`${T('gauge', 'hidrostatis')} P = ${fmtP(pressure(h))}`, rx, y); y += lh;
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs);
    ctx.fillText(narrow ? `${T('absolute', 'mutlak')} = ${fmtP(pressure(h) + P_ATM)}` : `${T('absolute', 'mutlak')} = P + 101.3 kPa = ${fmtP(pressure(h) + P_ATM)}`, rx, y); y += lh;
    ctx.fillText(`= ${((pressure(h) + P_ATM) / P_ATM).toFixed(2)} atm`, rx, y); y += lh;
    if (!narrow) {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.85);
      ctx.fillText(T(`every 10 m adds ${(liq.rho * G * 10 / 1000).toFixed(0)} kPa ≈ ${(liq.rho * G * 10 / P_ATM).toFixed(2)} atm`, `setiap 10 m menambah ${(liq.rho * G * 10 / 1000).toFixed(0)} kPa ≈ ${(liq.rho * G * 10 / P_ATM).toFixed(2)} atm`), rx, y); y += lh;
      ctx.fillText(T('Drag the diver up and down', 'Geser penyelam naik-turun'), rx, y);
    }
    ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = clamp(W * 0.021, 10, 16);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (params.scene === 'bottle') drawBottle(ctx, fs); else drawSea(ctx, fs);
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const p = probePos();
      const r = Math.max(20, cv.width * 0.035);
      if (params.scene === 'sea') return Math.abs(x - p.x) < r * 2 && Math.abs(y - p.y) < r ? 'probe' : null;
      return Math.hypot(x - p.x, y - p.y) < r ? 'probe' : null;
    },
    onDrag(id, x, y) {
      if (params.scene === 'bottle') {
        const g = geomBottle();
        state.probeFrac = clamp((x - g.bx0) / g.bw, 0.12, 0.88);
        state.probeDepthBottle = clamp((y - g.surfY) / g.pxPerM, 0, params.level);
      } else {
        const g = geomSea();
        state.probeFrac = clamp((x - g.x0) / (g.x1 - g.x0), 0.15, 0.85);
        state.probeDepthSea = clamp((y - g.surfY) / g.pxPerM, 0, SEA_DEPTH);
      }
    },
    handles: () => { const p = probePos(); return [{ id: 'probe', x: p.x, y: p.y, label: params.scene === 'bottle' ? T('Pressure probe (drag up/down)', 'Sensor tekanan (geser naik/turun)') : T('Diver (drag up/down)', 'Penyelam (geser naik/turun)') }]; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // Controls
  const sceneSel = select({
    label: T('Scene', 'Adegan'), key: 'scene',
    options: [{ value: 'bottle', label: T('Bottle with holes', 'Botol berlubang') }, { value: 'sea', label: T('Diver in the sea', 'Penyelam di laut') }],
    value: params.scene,
    onChange: (v) => { if (v === 'bottle' || v === 'sea') params.scene = v; },
  });
  const liqSel = select({
    label: T('Liquid', 'Zat cair'), key: 'liquid',
    options: LIQUIDS.map((l) => ({ value: l.id, label: `${T(l.label.en, l.label.id)} (${l.rho} kg/m³)` })),
    value: params.liquid,
    onChange: (v) => { if (LIQUIDS.some((l) => l.id === v)) params.liquid = v; },
  });
  const levelS = slider({ label: T('Liquid level in bottle (m)', 'Tinggi zat cair dalam botol (m)'), key: 'level', min: 0.2, max: 1.0, step: 0.05, value: params.level, format: (v) => v.toFixed(2), onInput: (v) => { params.level = v; } });
  const diverB = button({ label: T('Diver scene (sea water, 10 m)', 'Adegan penyelam (air laut, 10 m)'), onClick: () => { sceneSel.apply('sea'); liqSel.apply('salt'); state.probeDepthSea = 10; } });
  const bottleB = button({ label: T('Bottle scene (water, full)', 'Adegan botol (air, penuh)'), onClick: () => { sceneSel.apply('bottle'); liqSel.apply('water'); levelS.apply(1.0); state.probeDepthBottle = 0.5; } });
  ctrlPanel.append(sceneSel.el, liqSel.el, levelS.el, row(bottleB, diverB));

  const lab = labPanel({
    title: 'Pressure vs depth lab — P = ρgh',
    filename: 'liquid-pressure-depth-data.csv',
    columns: [
      { key: 'scene', label: 'Scene' },
      { key: 'liquid', label: 'Liquid' },
      { key: 'rho', label: 'ρ (kg/m³)', format: (v) => v.toFixed(0) },
      { key: 'h', label: 'Depth h (m)', format: (v) => v.toFixed(2) },
      { key: 'P', label: 'P = ρgh (Pa)', format: (v) => v.toFixed(0) },
      { key: 'P_kPa', label: 'P (kPa)', format: (v) => v.toFixed(2) },
      { key: 'P_abs', label: 'Absolute (kPa)', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Bottle, water, full: drag the probe to 0.25 m, 0.50 m, 0.75 m and 1.00 m. Record each.',
      'Plot P against h. Is it a straight line? What is its slope in kPa per metre?',
      'Keep the probe at 0.50 m and record for oil and for salt water. How does P depend on ρ?',
      'Diver scene: record at 10 m, 20 m and 30 m. How many kPa does each 10 m add?',
      'Check one row by hand: ρ × 9.8 × h should give the P column.',
    ],
    predict: 'If you double the depth of the probe, what happens to the pressure? What if you switch from water to oil at the same depth?',
    source: () => {
      const liq = liquid(); const h = probeDepth(); const P = pressure(h);
      return { scene: params.scene === 'bottle' ? 'Bottle' : 'Sea', liquid: liq.label.en, rho: liq.rho, h, P, P_kPa: P / 1000, P_abs: (P + P_ATM) / 1000 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { state.t = t; draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
