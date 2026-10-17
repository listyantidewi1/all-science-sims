import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const U_MEV = 931.494;      // MeV per u
const M_H = 1.007825;       // u, hydrogen-1 atom
const M_N = 1.008665;       // u, neutron
// Atomic masses in u (AME values, rounded to 6 decimals).
const NUCLIDES = [
  { sym: 'H', A: 1, Z: 1, m: 1.007825 }, { sym: 'H', A: 2, Z: 1, m: 2.014102, name: 'D' }, { sym: 'H', A: 3, Z: 1, m: 3.016049, name: 'T' },
  { sym: 'He', A: 3, Z: 2, m: 3.016029 }, { sym: 'He', A: 4, Z: 2, m: 4.002602 }, { sym: 'Li', A: 6, Z: 3, m: 6.015123 }, { sym: 'Li', A: 7, Z: 3, m: 7.016003 },
  { sym: 'Be', A: 9, Z: 4, m: 9.012183 }, { sym: 'B', A: 11, Z: 5, m: 11.009305 }, { sym: 'C', A: 12, Z: 6, m: 12.0 }, { sym: 'N', A: 14, Z: 7, m: 14.003074 },
  { sym: 'O', A: 16, Z: 8, m: 15.994915 }, { sym: 'F', A: 19, Z: 9, m: 18.998403 }, { sym: 'Ne', A: 20, Z: 10, m: 19.99244 }, { sym: 'Mg', A: 24, Z: 12, m: 23.985042 },
  { sym: 'Al', A: 27, Z: 13, m: 26.981538 }, { sym: 'Si', A: 28, Z: 14, m: 27.976927 }, { sym: 'S', A: 32, Z: 16, m: 31.972071 }, { sym: 'Ar', A: 40, Z: 18, m: 39.962383 },
  { sym: 'Ca', A: 40, Z: 20, m: 39.962591 }, { sym: 'Fe', A: 56, Z: 26, m: 55.934936 }, { sym: 'Ni', A: 62, Z: 28, m: 61.928345 }, { sym: 'Cu', A: 63, Z: 29, m: 62.929598 },
  { sym: 'Zn', A: 64, Z: 30, m: 63.929142 }, { sym: 'Kr', A: 84, Z: 36, m: 83.911507 }, { sym: 'Sr', A: 88, Z: 38, m: 87.905612 }, { sym: 'Kr', A: 92, Z: 36, m: 91.926173 },
  { sym: 'Sr', A: 94, Z: 38, m: 93.915356 }, { sym: 'Mo', A: 98, Z: 42, m: 97.905404 }, { sym: 'Ag', A: 107, Z: 47, m: 106.905092 }, { sym: 'Sn', A: 120, Z: 50, m: 119.902202 },
  { sym: 'Ba', A: 138, Z: 56, m: 137.905247 }, { sym: 'Xe', A: 140, Z: 54, m: 139.921646 }, { sym: 'Ba', A: 141, Z: 56, m: 140.914411 }, { sym: 'W', A: 184, Z: 74, m: 183.950931 },
  { sym: 'Au', A: 197, Z: 79, m: 196.966569 }, { sym: 'Pb', A: 208, Z: 82, m: 207.976652 }, { sym: 'Bi', A: 209, Z: 83, m: 208.980399 }, { sym: 'U', A: 235, Z: 92, m: 235.04393 },
  { sym: 'U', A: 238, Z: 92, m: 238.050788 }, { sym: 'Pu', A: 239, Z: 94, m: 239.052163 },
];
const byName = (sym, A) => NUCLIDES.find((n) => n.sym === sym && n.A === A);
const label = (n) => `${n.sym}-${n.A}`;
const bindingMeV = (n) => (n.Z * M_H + (n.A - n.Z) * M_N - n.m) * U_MEV;

const REACTIONS = {
  fission1: { kind: 'fission', text: 'U-235 + n → Ba-141 + Kr-92 + 3n', react: [[byName('U', 235), 1], ['n', 1]], prod: [[byName('Ba', 141), 1], [byName('Kr', 92), 1], ['n', 3]] },
  fission2: { kind: 'fission', text: 'U-235 + n → Xe-140 + Sr-94 + 2n', react: [[byName('U', 235), 1], ['n', 1]], prod: [[byName('Xe', 140), 1], [byName('Sr', 94), 1], ['n', 2]] },
  fusion1: { kind: 'fusion', text: 'D + T → He-4 + n', react: [[byName('H', 2), 1], [byName('H', 3), 1]], prod: [[byName('He', 4), 1], ['n', 1]] },
  fusion2: { kind: 'fusion', text: 'D + D → He-3 + n', react: [[byName('H', 2), 2]], prod: [[byName('He', 3), 1], ['n', 1]] },
};
const massOf = (item) => (item === 'n' ? M_N : item.m);
function reactionNumbers(r) {
  const mr = r.react.reduce((s, [it, k]) => s + k * massOf(it), 0);
  const mp = r.prod.reduce((s, [it, k]) => s + k * massOf(it), 0);
  const A = r.react.reduce((s, [it, k]) => s + k * (it === 'n' ? 1 : it.A), 0);
  const dm = mr - mp;
  return { mr, mp, dm, E: dm * U_MEV, A, perA: (dm * U_MEV) / A };
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.max(10, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;

  const p = { mode: 'curve', selected: byName('Fe', 56), reaction: 'fission1', rods: 0.0 };
  let anim = 0;   // seconds within the current reaction animation

  // ---- curve ------------------------------------------------------------
  const curveGeo = () => {
    const W = cv.width, H = cv.height;
    return { W, H, x0: W * 0.09, x1: W * 0.64, y0: H * 0.86, y1: H * 0.16 };
  };
  const XA = (A) => { const g = curveGeo(); return g.x0 + (A / 245) * (g.x1 - g.x0); };
  const YB = (be) => { const g = curveGeo(); return g.y0 - (clamp(be, 0, 9.5) / 9.5) * (g.y0 - g.y1); };

  function drawCurve(ctx, W, H) {
    const g = curveGeo(), fs = H * 0.032;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true); ctx.textAlign = 'left';
    ctx.fillText(T('Binding energy per nucleon', 'Energi ikat per nukleon'), W * 0.03, H * 0.07);
    ctx.font = font(fs * 0.8); ctx.fillStyle = '#94a3b8';
    ctx.fillText('BE = [Z·m(¹H) + N·m_n − M_atom] × 931.494 MeV/u', W * 0.03, H * 0.12);
    // axes
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(g.x0, g.y1); ctx.lineTo(g.x0, g.y0); ctx.lineTo(g.x1, g.y0); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.7); ctx.textAlign = 'center';
    for (let A = 0; A <= 240; A += 40) { ctx.beginPath(); ctx.moveTo(XA(A), g.y0); ctx.lineTo(XA(A), g.y0 + 5); ctx.stroke(); ctx.fillText(String(A), XA(A), g.y0 + fs * 1.1); }
    ctx.fillText(T('mass number A', 'nomor massa A'), (g.x0 + g.x1) / 2, g.y0 + fs * 2.3);
    ctx.textAlign = 'right';
    for (let b = 0; b <= 9; b += 1) { ctx.beginPath(); ctx.moveTo(g.x0 - 5, YB(b)); ctx.lineTo(g.x0, YB(b)); ctx.stroke(); ctx.fillText(String(b), g.x0 - 8, YB(b) + fs * 0.3); }
    ctx.save(); ctx.translate(W * 0.025, (g.y0 + g.y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('BE/A (MeV)', 0, 0); ctx.restore();
    // iron peak guide
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(148,163,184,0.4)';
    ctx.beginPath(); ctx.moveTo(g.x0, YB(8.79)); ctx.lineTo(g.x1, YB(8.79)); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('8.79 MeV: Fe-56 / Ni-62 peak', '8,79 MeV: puncak Fe-56 / Ni-62'), g.x0 + 6, YB(8.79) - 4);
    // connecting line + points
    const sorted = [...NUCLIDES].sort((a, b) => a.A - b.A || a.Z - b.Z);
    ctx.strokeStyle = 'rgba(59,130,246,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    sorted.forEach((n, i) => { const x = XA(n.A), y = YB(bindingMeV(n) / n.A); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    const r = Math.max(3, W * 0.005);
    for (const n of NUCLIDES) {
      const x = XA(n.A), y = YB(bindingMeV(n) / n.A);
      const sel = n === p.selected;
      ctx.fillStyle = sel ? '#fbbf24' : n.A > 200 ? '#f87171' : n.A < 10 ? '#a78bfa' : '#60a5fa';
      ctx.beginPath(); ctx.arc(x, y, sel ? r * 1.8 : r, 0, Math.PI * 2); ctx.fill();
    }
    // selected info panel
    const n = p.selected, BE = bindingMeV(n), dm = BE / U_MEV, N = n.A - n.Z;
    const sx = W * 0.68, sw = W * 0.29;
    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fillRect(sx, H * 0.16, sw, H * 0.7);
    ctx.strokeStyle = '#334155'; ctx.strokeRect(sx, H * 0.16, sw, H * 0.7);
    let sy = H * 0.16 + fs * 1.6;
    const line = (txt, color = '#e2e8f0', bold = false, size = 0.8) => { ctx.fillStyle = color; ctx.font = font(fs * size, bold); ctx.fillText(txt, sx + fs * 0.6, sy); sy += fs * 1.35 * Math.max(size, 0.9); };
    ctx.textAlign = 'left';
    line(`${label(n)}${n.name ? ` (${n.name})` : ''}`, '#fbbf24', true, 1.1);
    line(`Z = ${n.Z}   N = ${N}   A = ${n.A}`);
    line(`M_atom = ${n.m.toFixed(6)} u`, '#cbd5e1');
    line(`Z·m(¹H) + N·m_n = ${(n.Z * M_H + N * M_N).toFixed(6)} u`, '#cbd5e1');
    line(`Δm = ${dm.toFixed(6)} u`, '#f87171', true);
    line(`BE = Δm·c² = ${BE.toFixed(2)} MeV`, '#fbbf24', true);
    line(`BE/A = ${(BE / n.A).toFixed(3)} MeV`, '#fbbf24', true);
    sy += fs * 0.4;
    line(T('Click a point to select a nuclide.', 'Klik sebuah titik untuk memilih nuklida.'), '#94a3b8', false, 0.7);
    line(T('purple A<10 · blue · red A>200', 'ungu A<10 · biru · merah A>200'), '#94a3b8', false, 0.7);
  }

  // ---- fission / fusion animation -------------------------------------
  function nucleusBlob(ctx, x, y, R, A, color, stretch = 1, split = 0) {
    // cluster of small circles representing nucleons
    const n = Math.min(60, Math.max(4, Math.round(Math.sqrt(A) * 4)));
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      const a = i * 2.399963, rr = R * Math.sqrt((i + 0.5) / n) * 0.85;
      let dx = Math.cos(a) * rr * stretch, dy = Math.sin(a) * rr / Math.sqrt(stretch);
      if (split > 0) dx += Math.sign(dx || 1) * split;
      ctx.beginPath(); ctx.arc(x + dx, y + dy, R * 0.22, 0, Math.PI * 2); ctx.fill();
    }
  }
  function neutron(ctx, x, y, r) { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }

  function drawReaction(ctx, W, H) {
    const r = REACTIONS[p.reaction], num = reactionNumbers(r), fs = H * 0.032;
    const isFission = r.kind === 'fission';
    const cycle = 5.0, t = anim % cycle;
    const ax0 = W * 0.03, ax1 = W * 0.55, ay = H * 0.5;
    const R = H * 0.11, nr = Math.max(3, H * 0.012);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true); ctx.textAlign = 'left';
    ctx.fillText(isFission ? T('Nuclear fission', 'Fisi nuklir') : T('Nuclear fusion', 'Fusi nuklir'), ax0, H * 0.07);
    ctx.font = font(fs * 0.95); ctx.fillStyle = '#fbbf24';
    ctx.fillText(r.text, ax0, H * 0.125);
    const cx = (ax0 + ax1) / 2;
    if (isFission) {
      const big = r.react[0][0];
      if (t < 1.5) {
        // neutron approaches
        const u = t / 1.5;
        nucleusBlob(ctx, cx, ay, R, big.A, '#f87171');
        neutron(ctx, ax0 + nr * 2 + u * (cx - R * 0.9 - ax0 - nr * 2), ay, nr);
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(label(big), cx, ay + R + fs * 1.2);
        ctx.fillText('n', ax0 + nr * 2 + u * (cx - R * 0.9 - ax0 - nr * 2), ay - nr - 4);
      } else if (t < 2.5) {
        // excited, deforming compound nucleus
        const u = (t - 1.5) / 1.0;
        const wob = 1 + 0.5 * u + 0.08 * Math.sin(t * 40);
        nucleusBlob(ctx, cx, ay, R * 1.03, big.A + 1, '#fb923c', wob, u * R * 0.25);
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(T('U-236* (excited)', 'U-236* (tereksitasi)'), cx, ay + R + fs * 1.2);
      } else {
        const u = Math.min(1, (t - 2.5) / 2.0);
        const f1 = r.prod[0][0], f2 = r.prod[1][0], nn = r.prod[2][1];
        const sep = u * (ax1 - ax0) * 0.36;
        const R1 = R * Math.cbrt(f1.A / big.A), R2 = R * Math.cbrt(f2.A / big.A);
        nucleusBlob(ctx, cx - sep, ay - u * H * 0.04, R1, f1.A, '#60a5fa');
        nucleusBlob(ctx, cx + sep, ay + u * H * 0.04, R2, f2.A, '#34d399');
        for (let i = 0; i < nn; i++) {
          const ang = -Math.PI / 2 + (i - (nn - 1) / 2) * 1.1;
          neutron(ctx, cx + Math.cos(ang) * u * (ax1 - ax0) * 0.42, ay + Math.sin(ang) * u * H * 0.36, nr);
        }
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(label(f1), cx - sep, ay - u * H * 0.04 + R1 + fs * 1.1);
        ctx.fillText(label(f2), cx + sep, ay + u * H * 0.04 + R2 + fs * 1.1);
        ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.9, true);
        ctx.fillText(`+ ${num.E.toFixed(1)} MeV`, cx, H * 0.2);
      }
    } else {
      const a = r.react[0][0], b = r.react.length > 1 ? r.react[1][0] : r.react[0][0];
      const Ra = R * 0.45 * Math.cbrt(a.A / 2), Rb = R * 0.45 * Math.cbrt(b.A / 2);
      if (t < 2.5) {
        const u = t / 2.5;
        const gap = (1 - u) * (ax1 - ax0) * 0.3 + Ra * 0.9;
        nucleusBlob(ctx, cx - gap, ay, Ra, a.A, '#60a5fa');
        nucleusBlob(ctx, cx + gap, ay, Rb, b.A, '#a78bfa');
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(a.name || label(a), cx - gap, ay + Ra + fs * 1.2);
        ctx.fillText(b.name || label(b), cx + gap, ay + Rb + fs * 1.2);
        if (u > 0.5) { ctx.fillStyle = '#f87171'; ctx.font = font(fs * 0.75); ctx.fillText(T('electric repulsion must be overcome (T > 10⁸ K)', 'tolakan listrik harus diatasi (T > 10⁸ K)'), cx, H * 0.24); }
      } else if (t < 3.2) {
        nucleusBlob(ctx, cx, ay, R * 0.75, 5, '#fb923c', 1 + 0.1 * Math.sin(t * 50));
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(T('compound nucleus', 'inti gabungan'), cx, ay + R + fs * 0.6);
      } else {
        const u = Math.min(1, (t - 3.2) / 1.8);
        const he = r.prod[0][0];
        nucleusBlob(ctx, cx - u * (ax1 - ax0) * 0.18, ay, R * 0.45 * Math.cbrt(he.A / 2), he.A, '#34d399');
        neutron(ctx, cx + u * (ax1 - ax0) * 0.42, ay - u * H * 0.05, nr);
        ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
        ctx.fillText(label(he), cx - u * (ax1 - ax0) * 0.18, ay + R * 0.6 + fs * 1.0);
        ctx.fillText('n', cx + u * (ax1 - ax0) * 0.42, ay - u * H * 0.05 - nr - 4);
        ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.9, true);
        ctx.fillText(`+ ${num.E.toFixed(2)} MeV`, cx, H * 0.2);
      }
    }
    // numbers panel
    const sx = W * 0.6, sw = W * 0.37;
    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fillRect(sx, H * 0.16, sw, H * 0.76);
    ctx.strokeStyle = '#334155'; ctx.strokeRect(sx, H * 0.16, sw, H * 0.76);
    let sy = H * 0.16 + fs * 1.5;
    const line = (txt, color = '#e2e8f0', bold = false, size = 0.78) => { ctx.fillStyle = color; ctx.font = font(fs * size, bold); ctx.textAlign = 'left'; ctx.fillText(txt, sx + fs * 0.6, sy); sy += fs * 1.3; };
    line(T('Reactants', 'Pereaksi'), '#94a3b8', true);
    for (const [it, k] of r.react) line(`${k > 1 ? k + ' × ' : ''}${it === 'n' ? 'n' : label(it)}: ${k > 1 ? k + ' × ' : ''}${massOf(it).toFixed(6)} u`, '#cbd5e1');
    line(T(`total = ${num.mr.toFixed(6)} u`, `total = ${num.mr.toFixed(6)} u`), '#e2e8f0', true);
    sy += fs * 0.3;
    line(T('Products', 'Produk'), '#94a3b8', true);
    for (const [it, k] of r.prod) line(`${k > 1 ? k + ' × ' : ''}${it === 'n' ? 'n' : label(it)}: ${k > 1 ? k + ' × ' : ''}${massOf(it).toFixed(6)} u`, '#cbd5e1');
    line(`total = ${num.mp.toFixed(6)} u`, '#e2e8f0', true);
    sy += fs * 0.3;
    line(`Δm = ${num.dm.toFixed(6)} u`, '#f87171', true, 0.85);
    line(`E = Δm × 931.494 MeV/u = ${num.E.toFixed(2)} MeV`, '#fbbf24', true, 0.85);
    line(`E/A = ${num.perA.toFixed(3)} MeV ${T('per nucleon', 'per nukleon')} (A = ${num.A})`, '#fbbf24', false, 0.78);
    if (isFission) {
      const perKg = (1000 / 235) * 6.022e23 * num.E * 1e6 * 1.602e-19;
      line(T(`1 kg U-235 → ${perKg.toExponential(2)} J`, `1 kg U-235 → ${perKg.toExponential(2)} J`), '#94a3b8', false, 0.72);
    } else {
      const perKg = (1000 / (num.A * 1.0)) * 6.022e23 * num.E * 1e6 * 1.602e-19;
      line(T(`1 kg fuel → ${perKg.toExponential(2)} J`, `1 kg bahan bakar → ${perKg.toExponential(2)} J`), '#94a3b8', false, 0.72);
    }
  }

  // ---- chain reaction ---------------------------------------------------
  const chain = { nuclei: [], neutrons: [], frags: [], gen: new Map(), fissions: 0, kHist: [], inited: false, W: 0, H: 0 };
  const box = () => { const W = cv.width, H = cv.height; return { x: W * 0.05, y: H * 0.17, w: W * 0.6, h: H * 0.74 }; };
  const RODS = 5;
  function chainInit() {
    const b = box();
    chain.nuclei = [];
    const cols = 12, rows = 7;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      chain.nuclei.push({ u: (i + 0.5 + (j % 2) * 0.25) / cols, v: (j + 0.5) / rows, alive: true });
    }
    chain.neutrons = []; chain.frags = []; chain.gen = new Map(); chain.fissions = 0; chain.kHist = [];
    chain.inited = true; chain.W = b.w; chain.H = b.h;
  }
  function fireNeutron() {
    if (!chain.inited) chainInit();
    const b = box();
    const ang = (Math.random() - 0.5) * 0.6;
    chain.neutrons.push({ x: b.x + 2, y: b.y + b.h * (0.3 + 0.4 * Math.random()), vx: Math.cos(ang), vy: Math.sin(ang), gen: 0 });
  }
  function rodRects() {
    const b = box();
    const out = [];
    const rw = b.w * 0.025;
    for (let i = 0; i < RODS; i++) {
      const x = b.x + b.w * ((i + 1) / (RODS + 1)) - rw / 2;
      out.push({ x, y: b.y, w: rw, h: b.h * p.rods });
    }
    return out;
  }
  function chainStep(dt) {
    if (!chain.inited) return;
    const b = box();
    const speed = Math.max(b.w, b.h) * 0.45; // px/s
    const rods = rodRects();
    const nucR = Math.min(b.w / 12, b.h / 7) * 0.26;
    const next = [];
    for (const n of chain.neutrons) {
      n.x += n.vx * speed * dt; n.y += n.vy * speed * dt;
      if (n.x < b.x || n.x > b.x + b.w || n.y < b.y || n.y > b.y + b.h) continue; // leaked
      let absorbed = false;
      for (const r of rods) if (n.x > r.x && n.x < r.x + r.w && n.y > r.y && n.y < r.y + r.h) { absorbed = true; break; }
      if (absorbed) { chain.frags.push({ x: n.x, y: n.y, t: 0, kind: 'abs' }); continue; }
      let hit = null;
      for (const nu of chain.nuclei) {
        if (!nu.alive) continue;
        const nx = b.x + nu.u * b.w, ny = b.y + nu.v * b.h;
        if ((n.x - nx) ** 2 + (n.y - ny) ** 2 < nucR * nucR) { hit = nu; break; }
      }
      if (hit) {
        hit.alive = false;
        chain.fissions++;
        const g = n.gen + 1;
        chain.gen.set(g, (chain.gen.get(g) || 0) + 1);
        const nx = b.x + hit.u * b.w, ny = b.y + hit.v * b.h;
        chain.frags.push({ x: nx, y: ny, t: 0, kind: 'fis' });
        const count = Math.random() < 0.43 ? 3 : 2;   // ν ≈ 2.43 neutrons per fission
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          next.push({ x: nx + Math.cos(a) * nucR * 1.3, y: ny + Math.sin(a) * nucR * 1.3, vx: Math.cos(a), vy: Math.sin(a), gen: g });
        }
        continue;
      }
      next.push(n);
    }
    chain.neutrons = next;
    for (const f of chain.frags) f.t += dt;
    chain.frags = chain.frags.filter((f) => f.t < 0.8);
  }
  function kFactor() {
    // ratio of fissions in the latest completed generation to the one before
    const gens = [...chain.gen.keys()].sort((a, b) => a - b);
    if (gens.length < 2) return null;
    const last = gens[gens.length - 1], prev = gens[gens.length - 2];
    const a = chain.gen.get(prev) || 0, c = chain.gen.get(last) || 0;
    return a > 0 ? c / a : null;
  }
  function drawChain(ctx, W, H) {
    if (!chain.inited) chainInit();
    const b = box(), fs = H * 0.032;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true); ctx.textAlign = 'left';
    ctx.fillText(T('Chain reaction in a block of U-235', 'Reaksi berantai dalam blok U-235'), W * 0.03, H * 0.07);
    ctx.font = font(fs * 0.8); ctx.fillStyle = '#94a3b8';
    ctx.fillText(T('each fission → 2 or 3 neutrons (ν ≈ 2.43); neutrons leaving the block or hitting a rod are lost', 'setiap fisi → 2 atau 3 neutron (ν ≈ 2,43); neutron yang keluar blok atau mengenai batang hilang'), W * 0.03, H * 0.12);
    ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = '#334155'; ctx.strokeRect(b.x, b.y, b.w, b.h);
    const nucR = Math.min(b.w / 12, b.h / 7) * 0.26;
    for (const nu of chain.nuclei) {
      const x = b.x + nu.u * b.w, y = b.y + nu.v * b.h;
      ctx.fillStyle = nu.alive ? '#f87171' : 'rgba(100,116,139,0.35)';
      ctx.beginPath(); ctx.arc(x, y, nu.alive ? nucR : nucR * 0.5, 0, Math.PI * 2); ctx.fill();
    }
    for (const f of chain.frags) {
      const u = f.t / 0.8;
      if (f.kind === 'fis') {
        ctx.strokeStyle = `rgba(251,191,36,${1 - u})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(f.x, f.y, nucR * (1 + 2.5 * u), 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(148,163,184,${1 - u})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, 3 + 4 * u, 0, Math.PI * 2); ctx.fill();
      }
    }
    for (const r of rodRects()) { ctx.fillStyle = '#64748b'; ctx.fillRect(r.x, r.y, r.w, r.h); }
    const nr = Math.max(2.5, H * 0.007);
    for (const n of chain.neutrons) { ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(n.x, n.y, nr, 0, Math.PI * 2); ctx.fill(); }
    // side panel
    const sx = W * 0.68, sw = W * 0.29;
    let sy = H * 0.2;
    const line = (txt, color = '#e2e8f0', bold = false, size = 0.8) => { ctx.fillStyle = color; ctx.font = font(fs * size, bold); ctx.textAlign = 'left'; ctx.fillText(txt, sx, sy); sy += fs * 1.4; };
    const alive = chain.nuclei.filter((n) => n.alive).length;
    line(T(`control rods inserted: ${Math.round(p.rods * 100)} %`, `batang kendali masuk: ${Math.round(p.rods * 100)} %`), '#cbd5e1');
    line(T(`free neutrons: ${chain.neutrons.length}`, `neutron bebas: ${chain.neutrons.length}`), '#cbd5e1');
    line(T(`fissions so far: ${chain.fissions}   fuel left: ${alive}/${chain.nuclei.length}`, `fisi sejauh ini: ${chain.fissions}   bahan bakar tersisa: ${alive}/${chain.nuclei.length}`), '#cbd5e1');
    sy += fs * 0.3;
    const k = kFactor();
    const gens = [...chain.gen.keys()].sort((a, b) => a - b);
    line(T('Multiplication factor', 'Faktor multiplikasi'), '#94a3b8', true);
    line('k = fissions(gen n+1) / fissions(gen n)', '#94a3b8', false, 0.7);
    if (k == null) line(T('k = — (fire a neutron)', 'k = — (tembakkan neutron)'), '#fbbf24', true, 1.0);
    else {
      const col = k > 1.1 ? '#f87171' : k < 0.9 ? '#60a5fa' : '#4ade80';
      line(`k ≈ ${k.toFixed(2)}`, col, true, 1.1);
      line(k > 1.1 ? T('supercritical: grows', 'superkritis: tumbuh') : k < 0.9 ? T('subcritical: dies out', 'subkritis: padam') : T('≈ critical: steady', '≈ kritis: stabil'), col, true, 0.85);
    }
    sy += fs * 0.3;
    line(T('fissions per generation:', 'fisi per generasi:'), '#94a3b8', false, 0.7);
    const shown = gens.slice(-8).map((g) => `${g}:${chain.gen.get(g)}`).join('  ');
    line(shown || '—', '#cbd5e1', false, 0.7);
    if (alive === 0) line(T('Fuel exhausted — press Reset fuel.', 'Bahan bakar habis — tekan Reset fuel.'), '#fbbf24', false, 0.75);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (p.mode === 'curve') drawCurve(ctx, W, H);
    else if (p.mode === 'chain') drawChain(ctx, W, H);
    else drawReaction(ctx, W, H);
    ctx.textAlign = 'left';
  }

  // ---- interaction: click a nuclide on the curve ----------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (p.mode !== 'curve') return null;
      let best = null, bd = Math.max(10, cv.width * 0.014);
      NUCLIDES.forEach((n, i) => {
        const d = Math.hypot(x - XA(n.A), y - YB(bindingMeV(n) / n.A));
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    },
    onStart(id) { if (typeof id === 'number' && NUCLIDES[id]) p.selected = NUCLIDES[id]; },
    handles: () => (p.mode === 'curve' ? NUCLIDES.map((n, i) => ({ id: i, x: XA(n.A), y: YB(bindingMeV(n) / n.A), label: `${label(n)}: BE/A ${(bindingMeV(n) / n.A).toFixed(2)} MeV (press Enter or arrow keys to select)` })) : []),
    cursor: 'default',
    hoverCursor: 'pointer',
  });

  // ---- controls ---------------------------------------------------------
  const modeSel = select({
    label: 'Panel', key: 'panel', value: p.mode,
    options: [
      { value: 'curve', label: 'Binding energy curve' },
      { value: 'fission', label: 'Fission: mass defect → energy' },
      { value: 'fusion', label: 'Fusion: mass defect → energy' },
      { value: 'chain', label: 'Chain reaction & control rods' },
    ],
    onChange: (v) => {
      p.mode = v; anim = 0;
      if (v === 'fission' && REACTIONS[p.reaction].kind !== 'fission') { p.reaction = 'fission1'; rxSel.value = 'fission1'; }
      if (v === 'fusion' && REACTIONS[p.reaction].kind !== 'fusion') { p.reaction = 'fusion1'; rxSel.value = 'fusion1'; }
      updateVisibility();
    },
  });
  const rxSel = select({
    label: 'Reaction', key: 'reaction', value: p.reaction,
    options: Object.entries(REACTIONS).map(([k, r]) => ({ value: k, label: r.text })),
    onChange: (v) => { p.reaction = v; anim = 0; p.mode = REACTIONS[v].kind; modeSel.value = p.mode; updateVisibility(); },
  });
  const rodS = slider({ label: 'Control rod insertion (%)', key: 'rods', min: 0, max: 100, step: 1, value: 0, format: (v) => v.toFixed(0), onInput: (v) => { p.rods = v / 100; } });
  const fireB = button({ label: 'Fire a neutron', primary: true, onClick: fireNeutron });
  const resetB = button({ label: 'Reset fuel', onClick: chainInit });
  const chainRow = row(fireB, resetB);
  ctrlPanel.append(modeSel.el, rxSel.el, rodS.el, chainRow);
  function updateVisibility() {
    const show = (el, on) => { el.style.display = on ? '' : 'none'; };
    show(rxSel.el, p.mode === 'fission' || p.mode === 'fusion');
    show(rodS.el, p.mode === 'chain'); show(chainRow, p.mode === 'chain');
  }
  updateVisibility();

  const lab = labPanel({
    title: 'Nuclear energy lab — mass defect and released energy',
    filename: 'nuclear-binding-energy-data.csv',
    columns: [
      { key: 'reaction', label: 'Reaction / nuclide' },
      { key: 'dm', label: 'Δm (u)', format: (v) => v.toFixed(6) },
      { key: 'E', label: 'E (MeV)', format: (v) => v.toFixed(2) },
      { key: 'perA', label: 'E per nucleon (MeV)', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'On the curve, select He-4, C-12, Fe-56, Ni-62, Sn-120 and U-235; record each (Δm and BE of the nucleus).',
      'Open the fission panel and record U-235 + n → Ba-141 + Kr-92 + 3n. Check Δm by hand from the listed masses.',
      'Record the second fission channel. Do different channels release the same energy?',
      'Open the fusion panel and record D + T and D + D. Compare E per nucleon with fission.',
      'Chain reaction: with rods at 0 %, fire a neutron and note k. Raise the rods until k stays near 1. Describe what each setting does.',
    ],
    predict: 'Which releases more energy per kilogram of fuel, fission of uranium or fusion of hydrogen isotopes? By roughly what factor?',
    source: () => {
      if (p.mode === 'curve') {
        const n = p.selected, BE = bindingMeV(n);
        return { reaction: `BE of ${label(n)} (Z=${n.Z}, N=${n.A - n.Z})`, dm: BE / U_MEV, E: BE, perA: BE / n.A };
      }
      if (p.mode === 'chain') return null;
      const r = REACTIONS[p.reaction], num = reactionNumbers(r);
      return { reaction: r.text, dm: num.dm, E: num.E, perA: num.perA };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    anim += dt;
    if (anim > 1e5) anim = 0;
    if (p.mode === 'chain') chainStep(dt);
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
