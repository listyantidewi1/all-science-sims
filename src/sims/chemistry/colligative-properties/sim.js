import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

const KB = 0.512;    // K·kg/mol, water
const KF = 1.86;     // K·kg/mol, water
const R = 0.08206;   // L·atm/(mol·K)
const N_WATER = 1000 / 18.015; // mol of water per kg

const SOLUTES = {
  sucrose: { label: 'Sucrose C₁₂H₂₂O₁₁ (i = 1)', name: 'sucrose', i: 1, Mr: 342.3, ions: ['#fbbf24'] },
  glycol:  { label: 'Ethylene glycol C₂H₆O₂ (i = 1)', name: 'ethylene glycol', i: 1, Mr: 62.07, ions: ['#a78bfa'] },
  nacl:    { label: 'NaCl → Na⁺ + Cl⁻ (i ≈ 2)', name: 'NaCl', i: 2, Mr: 58.44, ions: ['#f87171', '#4ade80'] },
  cacl2:   { label: 'CaCl₂ → Ca²⁺ + 2Cl⁻ (i ≈ 3)', name: 'CaCl₂', i: 3, Mr: 110.98, ions: ['#f87171', '#4ade80', '#4ade80'] },
};
// Normalised Magnus formula: vapour pressure of pure water in atm, exactly 1 at 100 °C.
const pSat = (tC) => Math.exp(17.625 * tC / (tC + 243.04)) / Math.exp(17.625 * 100 / 343.04);

const SPOTS = (() => {
  const out = [];
  let seed = 4242;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  for (let i = 0; i < 240; i++) out.push({ x: rnd(), y: rnd(), v: 0.3 + rnd() });
  return out;
})();

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const p = { solute: 'nacl', m: 1.0, tC: 25 };
  const osm = { dh: 0, flow: 0, t: 0 };   // U-tube animation state (fraction of arm height)
  const sol = () => SOLUTES[p.solute];

  // ---- physics -------------------------------------------------------------------
  const im = () => sol().i * p.m;                                  // effective particle molality
  const dTb = () => im() * KB;
  const dTf = () => im() * KF;
  const piAtm = () => im() * R * (p.tC + 273.15);                  // M ≈ m for dilute aqueous solutions
  const xWater = () => N_WATER / (N_WATER + im());
  const pVap = () => xWater() * pSat(p.tC);                        // atm
  const dP = () => pSat(p.tC) - pVap();
  const dhTarget = () => 1 - Math.exp(-piAtm() / 25);              // schematic saturation, 0..1

  function step(dt) {
    osm.t += dt;
    const target = dhTarget();
    const diff = target - osm.dh;
    osm.flow = diff;
    osm.dh += diff * Math.min(1, dt * 1.6);
  }

  // ---- drawing ---------------------------------------------------------------------
  function drawPhaseDiagram(ctx, B, fs) {
    const tf = -dTf(), tb = 100 + dTb();
    const tMin = Math.min(-25, tf - 8), tMax = Math.max(125, tb + 8);
    const pMax = 1.35;
    const X = (t) => B.x + ((t - tMin) / (tMax - tMin)) * B.w;
    const Y = (pr) => B.y + B.h - (Math.min(pMax, Math.max(0, pr)) / pMax) * B.h;
    // axes
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(B.x, B.y + B.h); ctx.lineTo(B.x + B.w, B.y + B.h); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center';
    ctx.fillText(T('temperature (°C) — schematic, not to scale', 'suhu (°C) — skematis, tidak berskala'), B.x + B.w / 2, B.y + B.h + fs * 2.3);
    ctx.save(); ctx.translate(B.x - fs * 1.3, B.y + B.h / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(T('pressure (atm)', 'tekanan (atm)'), 0, 0); ctx.restore();
    // 1 atm line
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(226,232,240,0.5)';
    ctx.beginPath(); ctx.moveTo(B.x, Y(1)); ctx.lineTo(B.x + B.w, Y(1)); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left'; ctx.fillStyle = '#cbd5e1'; ctx.fillText('1 atm', B.x + 4, Y(1) - 3);

    // curves: vaporisation (pure, solution shifted), fusion lines, sublimation
    const curve = (shift, tStart, color, dash) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash);
      ctx.beginPath();
      let first = true;
      for (let t = tStart; t <= tMax; t += (tMax - tMin) / 120) {
        const pr = pSat(t - shift);
        if (pr > pMax) break;
        const x = X(t), y = Y(pr);
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    };
    // sublimation (ice is pure in both cases)
    ctx.strokeStyle = '#93c5fd'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let t = tMin; t <= 0; t += 1) { const pr = pSat(0) * Math.exp(0.11 * t); const x = X(t), y = Y(pr); if (t === tMin) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke();
    curve(0, 0, '#93c5fd', []);
    curve(dTb(), tf, '#fbbf24', [6, 4]);
    // fusion lines (steep, slightly leaning left as for water)
    const fusion = (t0, color, dash) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash);
      // starts on the sublimation curve (ice is pure), leans slightly left like water's fusion line
      ctx.beginPath(); ctx.moveTo(X(t0), Y(pSat(0) * Math.exp(0.11 * Math.min(0, t0)))); ctx.lineTo(X(t0 - 1.5), Y(pMax)); ctx.stroke(); ctx.setLineDash([]);
    };
    fusion(0, '#93c5fd', []);
    fusion(tf, '#fbbf24', [6, 4]);
    // markers on the 1 atm line
    const mark = (t, color, label, dy) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(X(t), Y(1), 4, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'center'; ctx.fillText(label, X(t), Y(1) + dy);
    };
    mark(0, '#93c5fd', '0 °C', fs * 1.3);
    mark(100, '#93c5fd', '100 °C', fs * 1.3);
    mark(tf, '#fbbf24', `${tf.toFixed(1)} °C`, -fs * 0.6);
    mark(tb, '#fbbf24', `${tb.toFixed(1)} °C`, -fs * 0.6);
    // liquid range bar
    ctx.fillStyle = 'rgba(251,191,36,0.15)';
    ctx.fillRect(X(tf), Y(1) - 3, X(tb) - X(tf), 6);
    ctx.textAlign = 'left'; ctx.fillStyle = '#93c5fd';
    ctx.fillText(T('solid: pure water', 'biru: air murni'), B.x + 6, B.y + fs * 1.2);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(T('dashed: solution', 'putus-putus: larutan'), B.x + 6, B.y + fs * 2.4);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(T('liquid range widens by ΔT_f + ΔT_b', 'rentang cair melebar ΔT_f + ΔT_b'), B.x + 6, B.y + fs * 3.6);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('ice', 'es'), X(tMin) + 6, Y(0.9));
    ctx.fillText(T('liquid', 'cair'), X(40), Y(0.9));
    ctx.fillText(T('vapour', 'uap'), X(95), Y(0.25));
  }

  function drawUTube(ctx, B, fs) {
    const armW = B.w * 0.3;
    const lx = B.x, rx = B.x + B.w - armW;
    const bottom = B.y + B.h, floorH = B.h * 0.18;
    const armTop = B.y;
    const baseLevel = B.y + B.h * 0.45;               // equal levels before osmosis
    const dhPx = osm.dh * B.h * 0.36;
    const lLevel = baseLevel + dhPx / 2, rLevel = baseLevel - dhPx / 2;
    const s = sol();
    // glass outline (U shape)
    ctx.strokeStyle = 'rgba(226,232,240,0.85)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lx, armTop); ctx.lineTo(lx, bottom); ctx.lineTo(rx + armW, bottom); ctx.lineTo(rx + armW, armTop);
    ctx.moveTo(lx + armW, armTop); ctx.lineTo(lx + armW, bottom - floorH); ctx.lineTo(rx, bottom - floorH); ctx.lineTo(rx, armTop);
    ctx.stroke();
    // liquids
    ctx.fillStyle = 'rgba(147,197,253,0.35)';
    ctx.fillRect(lx + 1, lLevel, armW - 1, bottom - lLevel - 1);
    ctx.fillRect(lx + armW, bottom - floorH + 1, (rx - lx - armW) / 2, floorH - 2);
    const solColor = s.i === 1 ? 'rgba(251,191,36,0.28)' : 'rgba(251,146,60,0.28)';
    ctx.fillStyle = solColor;
    ctx.fillRect(rx + 1, rLevel, armW - 1, bottom - rLevel - 1);
    ctx.fillRect((lx + armW + rx) / 2, bottom - floorH + 1, (rx - lx - armW) / 2, floorH - 2);
    // membrane
    const mx = (lx + armW + rx) / 2;
    ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([3, 3]); ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(mx, bottom - floorH); ctx.lineTo(mx, bottom); ctx.stroke(); ctx.setLineDash([]);
    // solute particles in the right arm (count ∝ i·m, cannot cross)
    const n = Math.min(SPOTS.length, Math.round(im() * 14));
    const r = Math.max(1.5, armW * 0.035);
    for (let k = 0; k < n; k++) {
      const d = SPOTS[k];
      const col = s.ions[k % s.ions.length];
      ctx.fillStyle = col;
      const yy = rLevel + 4 + ((d.y + osm.t * 0.02 * d.v) % 1) * (bottom - rLevel - 8);
      ctx.beginPath(); ctx.arc(rx + 4 + d.x * (armW - 8), yy, r, 0, Math.PI * 2); ctx.fill();
    }
    // water molecules crossing the membrane (left → right) while flow continues
    const crossing = Math.max(0, Math.min(6, Math.round(osm.flow * 40)));
    ctx.fillStyle = '#bfdbfe';
    for (let k = 0; k < crossing; k++) {
      const ph = (osm.t * 0.8 + k * 0.17) % 1;
      const xx = mx - 18 + ph * 36;
      const yy = bottom - floorH + 4 + ((k * 0.37) % 1) * (floorH - 8);
      ctx.beginPath(); ctx.arc(xx, yy, r * 0.8, 0, Math.PI * 2); ctx.fill();
    }
    // Δh bracket
    if (dhPx > 6) {
      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 1.5;
      const bx = rx + armW + 8;
      ctx.beginPath(); ctx.moveTo(bx, rLevel); ctx.lineTo(bx, lLevel); ctx.moveTo(bx - 4, rLevel); ctx.lineTo(bx + 4, rLevel); ctx.moveTo(bx - 4, lLevel); ctx.lineTo(bx + 4, lLevel); ctx.stroke();
      ctx.fillStyle = '#34d399'; ctx.textAlign = 'left';
      ctx.fillText('Δh ∝ π', bx + 6, (rLevel + lLevel) / 2 + fs * 0.35);
    }
    ctx.textAlign = 'center'; ctx.fillStyle = '#93c5fd';
    ctx.fillText(T('pure water', 'air murni'), lx + armW / 2, armTop - 4);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(T('solution', 'larutan'), rx + armW / 2, armTop - 4);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(T('membrane', 'membran'), mx, bottom + fs * 1.2);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(T(`π = ${piAtm().toFixed(1)} atm ≈ ${(piAtm() * 10.33).toFixed(0)} m of water`, `π = ${piAtm().toFixed(1)} atm ≈ ${(piAtm() * 10.33).toFixed(0)} m kolom air`), B.x + B.w / 2, bottom + fs * 2.4);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    const fs = Math.max(9, Math.min(14, W / 50));
    ctx.font = `${fs}px system-ui, sans-serif`;
    const s = sol();

    // readouts (top)
    ctx.textAlign = 'left';
    let y = fs * 1.5;
    const lx = W * 0.03;
    ctx.fillStyle = '#f8fafc';
    ctx.font = `bold ${fs * 1.1}px system-ui, sans-serif`;
    ctx.fillText(`${s.name}: m = ${p.m.toFixed(2)} mol/kg, i = ${s.i}  →  i·m = ${im().toFixed(2)} mol ${T('particles', 'partikel')}/kg`, lx, y);
    ctx.font = `${fs}px system-ui, sans-serif`;
    y += fs * 1.5;
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`ΔT_b = i·K_b·m = ${s.i} × ${KB} × ${p.m.toFixed(2)} = ${dTb().toFixed(2)} K   →   T_b = ${(100 + dTb()).toFixed(2)} °C`, lx, y);
    y += fs * 1.4;
    ctx.fillStyle = '#93c5fd';
    ctx.fillText(`ΔT_f = i·K_f·m = ${s.i} × ${KF} × ${p.m.toFixed(2)} = ${dTf().toFixed(2)} K   →   T_f = ${(-dTf()).toFixed(2)} °C`, lx, y);
    y += fs * 1.4;
    ctx.fillStyle = '#34d399';
    ctx.fillText(`π = i·M·R·T ≈ ${s.i} × ${p.m.toFixed(2)} × ${R} × ${(p.tC + 273.15).toFixed(0)} = ${piAtm().toFixed(1)} atm   (M ≈ m)`, lx, y);
    y += fs * 1.4;
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(`${T('Raoult', 'Raoult')}: P = x_w·P° = ${xWater().toFixed(4)} × ${(pSat(p.tC) * 101.325).toFixed(2)} kPa = ${(pVap() * 101.325).toFixed(2)} kPa   (ΔP = ${(dP() * 101.325).toFixed(3)} kPa ${T('at', 'pada')} ${p.tC} °C)`, lx, y);

    const top = y + fs * 1.6;
    const PD = { x: W * 0.07, y: top, w: W * 0.40, h: H - top - fs * 3.2 };
    const UT = { x: W * 0.56, y: top + fs * 1.2, w: W * 0.36, h: H - top - fs * 4.4 };
    drawPhaseDiagram(ctx, PD, fs);
    drawUTube(ctx, UT, fs);
  }

  // ---- controls ---------------------------------------------------------------------
  const soluteSel = select({
    label: 'Solute', key: 'solute',
    options: Object.entries(SOLUTES).map(([value, s]) => ({ value, label: s.label })),
    value: p.solute, onChange: (v) => { p.solute = v; },
  });
  const mS = slider({
    label: 'Molality m (mol solute / kg water)', key: 'm', min: 0, max: 8, step: 0.05, value: p.m,
    format: (v) => v.toFixed(2), onInput: (v) => { p.m = v; },
  });
  const tS = slider({
    label: 'Temperature for π and P (°C)', key: 't', min: 0, max: 100, step: 1, value: p.tC,
    format: (v) => v + ' °C', onInput: (v) => { p.tC = v; },
  });
  const preset = (label, solute, m) => button({ label, onClick: () => { soluteSel.apply(solute); mS.apply(m); } });
  ctrlPanel.append(
    soluteSel.el, mS.el, tS.el,
    row(preset('Road salt: NaCl 3 mol/kg', 'nacl', 3), preset('Antifreeze: glycol 8 mol/kg', 'glycol', 8), preset('Seawater: NaCl 0.6 mol/kg', 'nacl', 0.6)),
  );

  const lab = labPanel({
    title: 'Colligative properties lab',
    filename: 'colligative-properties-data.csv',
    columns: [
      { key: 'solute', label: 'Solute' },
      { key: 'm',      label: 'm (mol/kg)',  format: (v) => v.toFixed(2) },
      { key: 'i',      label: 'i' },
      { key: 'dTb',    label: 'ΔT_b (K)',    format: (v) => v.toFixed(3) },
      { key: 'dTf',    label: 'ΔT_f (K)',    format: (v) => v.toFixed(3) },
      { key: 'pi',     label: 'π (atm)',     format: (v) => v.toFixed(2) },
      { key: 'dP',     label: 'ΔP (kPa)',    format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Sucrose: record at m = 0.5, 1.0, 2.0 and 4.0 mol/kg. Is ΔT_f proportional to m?',
      'Switch to NaCl at the same molalities. How many times larger are ΔT_b, ΔT_f and π? Why?',
      'Repeat with CaCl₂ at m = 1.0 and compare the three solutes at equal molality.',
      'Press the road-salt preset. To what temperature does the salt keep a wet road from freezing?',
      'Set T = 37 °C and m = 0.15 (NaCl): record π. Compare it with the osmotic pressure of blood, about 7.6 atm.',
    ],
    predict: 'At equal molality, which solution will have the lowest freezing point: sucrose, NaCl or CaCl₂? By what factor?',
    source: () => ({
      solute: sol().name,
      m: p.m,
      i: sol().i,
      dTb: dTb(),
      dTf: dTf(),
      pi: piAtm(),
      dP: dP() * 101.325,
    }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
