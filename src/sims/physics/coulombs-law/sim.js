import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const K = 8.99e9;            // N·m²/C²
const SPAN_M = 1.2;          // metres shown across the stage
const X1 = 0.1;              // q1 fixed position (m)
const R_MIN = 0.05;          // closest allowed separation (m)

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 3 / 2 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Charges in μC, positions in metres. q1 fixed; q2 slides on the line; q3 moves in the plane.
  const params = { q1: 5, q2: 5, q3: -5, third: false, loglog: false };
  const pos = { x2: 0.5, x3: 0.5, y3: 0.15 };

  // ---- physics -----------------------------------------------------------
  function forceOn(a, b) {
    // Force on charge a due to charge b (N), as a vector in metres-space (y up).
    const dx = a.x - b.x, dy = a.y - b.y;
    const r2 = Math.max(dx * dx + dy * dy, 1e-6);
    const r = Math.sqrt(r2);
    const F = K * (a.q * 1e-6) * (b.q * 1e-6) / r2;   // positive → repulsive (points from b to a)
    return { fx: F * dx / r, fy: F * dy / r, mag: Math.abs(F), signed: F, r };
  }
  function calc() {
    const c1 = { q: params.q1, x: X1, y: 0 };
    const c2 = { q: params.q2, x: pos.x2, y: 0 };
    const c3 = { q: params.q3, x: pos.x3, y: pos.y3 };
    const f21 = forceOn(c2, c1), f12 = forceOn(c1, c2);
    const out = { c1, c2, c3, f21, f12, r: f21.r, F: f21.signed, parts2: [f21], net1: f12, net2: f21, net3: null };
    if (params.third) {
      const f23 = forceOn(c2, c3), f13 = forceOn(c1, c3), f31 = forceOn(c3, c1), f32 = forceOn(c3, c2);
      out.parts2 = [f21, f23];
      out.net2 = { fx: f21.fx + f23.fx, fy: f21.fy + f23.fy };
      out.net1 = { fx: f12.fx + f13.fx, fy: f12.fy + f13.fy };
      out.net3 = { fx: f31.fx + f32.fx, fy: f31.fy + f32.fy };
      out.net2.mag = Math.hypot(out.net2.fx, out.net2.fy);
      out.net1.mag = Math.hypot(out.net1.fx, out.net1.fy);
      out.net3.mag = Math.hypot(out.net3.fx, out.net3.fy);
    }
    return out;
  }
  function fmtF(F) {
    const a = Math.abs(F);
    if (!Number.isFinite(a)) return '—';
    if (a >= 1000) return (F / 1000).toPrecision(3) + ' kN';
    if (a >= 1) return F.toPrecision(3) + ' N';
    if (a >= 1e-3) return (F * 1e3).toPrecision(3) + ' mN';
    return (F * 1e6).toPrecision(3) + ' μN';
  }

  // ---- geometry ----------------------------------------------------------
  function geom() {
    const W = cv.width, H = cv.height;
    const stageH = H * 0.56;
    const pad = W * 0.05;
    const pxm = (W - 2 * pad) / SPAN_M;                 // px per metre
    const lineY = stageH * 0.62;
    const toX = (xm) => pad + xm * pxm;
    const toY = (ym) => lineY - ym * pxm;
    const rad = clamp(W * 0.022, 8, 18);
    return { W, H, stageH, pad, pxm, lineY, toX, toY, rad, plot: { x: W * 0.08, y: stageH + H * 0.06, w: W * 0.88, h: H * 0.44 - H * 0.12 } };
  }

  // ---- drawing -----------------------------------------------------------
  function arrow(ctx, x0, y0, x1, y1, color, width) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, hs = Math.min(12, 4 + width * 2.2);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * hs * 0.8, y1 - uy * hs * 0.8); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - ux * hs - uy * hs * 0.5, y1 - uy * hs + ux * hs * 0.5);
    ctx.lineTo(x1 - ux * hs + uy * hs * 0.5, y1 - uy * hs - ux * hs * 0.5);
    ctx.closePath(); ctx.fill();
  }
  function drawCharge(ctx, g, x, y, q, label) {
    const r = g.rad;
    ctx.fillStyle = q > 0 ? '#ef4444' : q < 0 ? '#3b82f6' : '#64748b';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(r * 1.3)}px system-ui, sans-serif`;
    ctx.fillText(q > 0 ? '+' : q < 0 ? '−' : '0', x, y + 1);
    ctx.fillStyle = '#cbd5e1'; ctx.font = `${Math.round(clamp(g.W * 0.028, 10, 14))}px system-ui, sans-serif`;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`${label} = ${q > 0 ? '+' : ''}${q} μC`, x, y + r + clamp(g.W * 0.035, 12, 18));
  }

  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H, stageH } = g;
    if (W < 10 || H < 10) return;
    const c = calc();
    const fs = clamp(W * 0.026, 10, 14);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#111a2e'; ctx.fillRect(0, stageH, W, H - stageH);

    // Line and metre ruler
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(g.pad, g.lineY); ctx.lineTo(W - g.pad, g.lineY); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'center';
    for (let xm = 0; xm <= SPAN_M + 1e-9; xm += 0.1) {
      const x = g.toX(xm);
      const major = Math.round(xm * 10) % 5 === 0;
      ctx.beginPath(); ctx.moveTo(x, g.lineY); ctx.lineTo(x, g.lineY + (major ? 8 : 4)); ctx.stroke();
      if (major) ctx.fillText(xm.toFixed(1) + ' m', x, g.lineY + 8 + fs);
    }

    // Force arrows: scale so the largest arrow is ~22% of width
    const arrows = [];
    const x1 = g.toX(c.c1.x), y1 = g.toY(0), x2 = g.toX(c.c2.x), y2 = g.toY(0);
    let fmax = Math.max(Math.hypot(c.net1.fx, c.net1.fy), Math.hypot(c.net2.fx, c.net2.fy), 1e-12);
    if (c.net3) fmax = Math.max(fmax, c.net3.mag);
    const pxPerN = (W * 0.22) / fmax;
    const addArrow = (x, y, f, color, width, offset) => {
      const len = Math.hypot(f.fx, f.fy) * pxPerN;
      if (len < 1) return;
      const ux = f.fx / Math.hypot(f.fx, f.fy), uy = -f.fy / Math.hypot(f.fx, f.fy); // canvas y is down
      arrows.push({ x0: x + ux * offset, y0: y + uy * offset, x1: x + ux * (offset + len), y1: y + uy * (offset + len), color, width });
    };
    if (params.third) {
      for (const p of c.parts2) addArrow(x2, y2, p, 'rgba(251,191,36,0.55)', 2, g.rad);
    }
    addArrow(x1, y1, c.net1, '#f59e0b', params.third ? 4 : 3, g.rad);
    addArrow(x2, y2, c.net2, '#f59e0b', params.third ? 4 : 3, g.rad);
    if (c.net3) addArrow(g.toX(c.c3.x), g.toY(c.c3.y), c.net3, '#f59e0b', 4, g.rad);
    // Dashed construction lines from q3
    if (params.third) {
      ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(g.toX(c.c3.x), g.toY(c.c3.y)); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(g.toX(c.c3.x), g.toY(c.c3.y)); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.setLineDash([]);
    }
    for (const a of arrows) arrow(ctx, a.x0, a.y0, a.x1, a.y1, a.color, a.width);

    // r bracket
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5;
    const by = g.lineY - g.rad - fs * 1.6;
    ctx.beginPath(); ctx.moveTo(x1, by); ctx.lineTo(x2, by); ctx.moveTo(x1, by - 4); ctx.lineTo(x1, by + 4); ctx.moveTo(x2, by - 4); ctx.lineTo(x2, by + 4); ctx.stroke();
    ctx.fillStyle = '#38bdf8'; ctx.font = `${fs}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(`r = ${c.r.toFixed(3)} m`, (x1 + x2) / 2, by - 5);

    // Charges
    drawCharge(ctx, g, x1, y1, params.q1, 'q₁');
    drawCharge(ctx, g, x2, y2, params.q2, 'q₂');
    if (params.third) drawCharge(ctx, g, g.toX(c.c3.x), g.toY(c.c3.y), params.q3, 'q₃');

    // Readout
    ctx.textAlign = 'left'; ctx.fillStyle = '#e2e8f0'; ctx.font = `${fs}px system-ui, sans-serif`;
    const lh = fs * 1.35;
    let ty = lh;
    ctx.fillText(`F = k·q₁q₂/r² = ${fmtF(c.F)}  ${c.F > 0 ? T('(repulsive)', '(tolak-menolak)') : c.F < 0 ? T('(attractive)', '(tarik-menarik)') : ''}`, 8, ty); ty += lh;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`q₁q₂ = ${(params.q1 * params.q2).toFixed(1)} μC²   r² = ${(c.r * c.r).toFixed(4)} m²   k = 8.99×10⁹`, 8, ty); ty += lh;
    if (params.third) {
      const f23 = c.parts2[1];
      ctx.fillText(T('on q₂: ', 'pada q₂: ') + `|F₂₁| = ${fmtF(c.parts2[0].mag)}, |F₂₃| = ${fmtF(f23.mag)}, |F_net| = ${fmtF(c.net2.mag)}`, 8, ty); ty += lh;
    }
    // Scale bar
    const barN = (W * 0.15) / pxPerN;
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W - g.pad - W * 0.15, lh * 0.8); ctx.lineTo(W - g.pad, lh * 0.8); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.textAlign = 'right'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
    ctx.fillText(T('scale: ', 'skala: ') + fmtF(barN), W - g.pad, lh * 0.8 + fs * 1.1);

    drawPlot(ctx, g, c, fs);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  function drawPlot(ctx, g, c, fs) {
    const p = g.plot;
    const rows = lab.getRows().filter((r) => Number.isFinite(r.r) && Number.isFinite(r.F) && r.r > 0 && Math.abs(r.F) > 0);
    const log = params.loglog;
    const q12 = Math.abs(params.q1 * params.q2) * 1e-12;
    // axis ranges
    const rLo = log ? Math.log10(R_MIN) : 0, rHi = log ? Math.log10(1.2) : 1.2;
    let fHi;
    if (log) {
      fHi = Math.log10(Math.max(K * 100e-12 / (R_MIN * R_MIN), 1));
    } else {
      fHi = Math.max(1e-9, ...rows.map((r) => Math.abs(r.F)), q12 > 0 ? K * q12 / (0.1 * 0.1) : 0) * 1.1;
    }
    const fLo = log ? Math.log10(K * 1e-12 / (1.2 * 1.2)) : 0;
    const X = (r) => p.x + ((log ? Math.log10(Math.max(r, 1e-9)) : r) - rLo) / (rHi - rLo) * p.w;
    const Y = (F) => {
      const v = log ? Math.log10(Math.max(Math.abs(F), 1e-12)) : Math.abs(F);
      return p.y + p.h - clamp((v - fLo) / (fHi - fLo), -0.05, 1.05) * p.h;
    };
    ctx.strokeStyle = 'rgba(148,163,184,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y + p.h); ctx.lineTo(p.x + p.w, p.y + p.h); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    // x ticks
    const xt = log ? [0.05, 0.1, 0.2, 0.5, 1.0] : [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
    for (const r of xt) { const x = X(r); ctx.beginPath(); ctx.moveTo(x, p.y + p.h); ctx.lineTo(x, p.y + p.h + 4); ctx.stroke(); ctx.fillText(r.toFixed(log ? 2 : 1), x, p.y + p.h + fs); }
    ctx.textAlign = 'right';
    if (log) {
      for (let e = Math.ceil(fLo); e <= Math.floor(fHi); e++) { const y = Y(10 ** e); ctx.beginPath(); ctx.moveTo(p.x - 4, y); ctx.lineTo(p.x, y); ctx.stroke(); ctx.fillText(`10^${e}`, p.x - 6, y + fs * 0.35); }
    } else {
      for (let i = 0; i <= 4; i++) { const F = fHi * i / 4; const y = Y(F); ctx.beginPath(); ctx.moveTo(p.x - 4, y); ctx.lineTo(p.x, y); ctx.stroke(); ctx.fillText(fmtF(F), p.x - 6, y + fs * 0.35); }
    }
    ctx.textAlign = 'left'; ctx.fillStyle = '#cbd5e1'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
    ctx.fillText(log ? T('|F| vs r (log-log) — recorded points', '|F| vs r (log-log) — titik rekaman') : T('|F| vs r — recorded points', '|F| vs r — titik rekaman'), p.x, p.y - fs * 0.5);
    ctx.textAlign = 'right'; ctx.fillStyle = '#94a3b8';
    ctx.fillText('r (m)', p.x + p.w, p.y + p.h + fs * 2.1);
    // theory curve for current q1 q2
    if (q12 > 0) {
      ctx.strokeStyle = 'rgba(56,189,248,0.7)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
      ctx.beginPath();
      let first = true;
      for (let i = 0; i <= 120; i++) {
        const r = log ? 10 ** (rLo + (rHi - rLo) * i / 120) : R_MIN + (1.2 - R_MIN) * i / 120;
        const F = K * q12 / (r * r);
        const x = X(r), y = Y(F);
        if (y < p.y - 2) { first = true; continue; }
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(56,189,248,0.9)'; ctx.textAlign = 'right';
      ctx.fillText(T(`k·|q₁q₂|/r² for current charges`, `k·|q₁q₂|/r² untuk muatan saat ini`), p.x + p.w, p.y + fs * 1.1);
    }
    // points
    for (const r of rows) {
      const x = X(r.r), y = Y(r.F);
      if (x < p.x || x > p.x + p.w || y < p.y - 4 || y > p.y + p.h + 4) continue;
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 1; ctx.stroke();
    }
    // live marker
    const lx = X(c.r), ly = Y(c.F);
    if (ly > p.y - 4) { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(lx, ly, 6, 0, Math.PI * 2); ctx.stroke(); }
    if (rows.length === 0) {
      ctx.fillStyle = '#64748b'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.9}px system-ui, sans-serif`;
      ctx.fillText(T('Record measurements in the lab panel to plot points here', 'Catat pengukuran di panel lab untuk menggambar titik di sini'), p.x + p.w / 2, p.y + p.h * 0.5);
    }
  }

  // ---- dragging ----------------------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geom();
      const hit = (xm, ym) => Math.hypot(x - g.toX(xm), y - g.toY(ym)) < g.rad + 10;
      if (params.third && hit(pos.x3, pos.y3)) return 'q3';
      if (hit(pos.x2, 0)) return 'q2';
      return null;
    },
    onDrag(id, x, y) {
      const g = geom();
      const xm = (x - g.pad) / g.pxm;
      if (id === 'q2') pos.x2 = clamp(xm, X1 + R_MIN, SPAN_M - 0.05);
      else if (id === 'q3') {
        pos.x3 = clamp(xm, 0, SPAN_M);
        pos.y3 = clamp((g.lineY - y) / g.pxm, -(g.stageH * 0.3) / g.pxm, (g.lineY - g.stageH * 0.3) / g.pxm);
        if (Math.hypot(pos.x3 - pos.x2, pos.y3) < R_MIN) pos.y3 = R_MIN;
      }
    },
    handles: () => {
      const g = geom();
      const list = [{ id: 'q2', x: g.toX(pos.x2), y: g.toY(0), label: T('Charge q2 (drag along the line to change r)', 'Muatan q2 (seret sepanjang garis untuk mengubah r)') }];
      if (params.third) list.push({ id: 'q3', x: g.toX(pos.x3), y: g.toY(pos.y3), label: T('Charge q3 (drag anywhere)', 'Muatan q3 (seret ke mana saja)') });
      return list;
    },
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls ----------------------------------------------------------
  const q1S = slider({ label: 'q₁ (μC)', key: 'q1', min: -10, max: 10, step: 0.5, value: params.q1, format: (v) => (v > 0 ? '+' : '') + v.toFixed(1), onInput: (v) => { params.q1 = v; } });
  const q2S = slider({ label: 'q₂ (μC)', key: 'q2', min: -10, max: 10, step: 0.5, value: params.q2, format: (v) => (v > 0 ? '+' : '') + v.toFixed(1), onInput: (v) => { params.q2 = v; } });
  const rS = slider({ label: 'Separation r (m)', key: 'r', min: R_MIN, max: 1.05, step: 0.01, value: pos.x2 - X1, format: (v) => v.toFixed(2), onInput: (v) => { pos.x2 = X1 + v; } });
  const thirdT = toggle({ label: 'Third charge q₃ (superposition)', key: 'third', value: false, onChange: (v) => { params.third = v; q3S.el.style.display = v ? '' : 'none'; } });
  const q3S = slider({ label: 'q₃ (μC)', key: 'q3', min: -10, max: 10, step: 0.5, value: params.q3, format: (v) => (v > 0 ? '+' : '') + v.toFixed(1), onInput: (v) => { params.q3 = v; } });
  q3S.el.style.display = 'none';
  const logT = toggle({ label: 'Log-log plot', key: 'loglog', value: false, onChange: (v) => { params.loglog = v; } });
  const resetB = button({ label: 'Reset positions', onClick: () => { pos.x2 = 0.5; pos.x3 = 0.5; pos.y3 = 0.15; rS.value = 0.4; } });
  ctrlPanel.append(q1S.el, q2S.el, rS.el, row(thirdT, logT, resetB), q3S.el);

  const lab = labPanel({
    title: "Coulomb's law lab — force vs distance",
    filename: 'coulombs-law-data.csv',
    columns: [
      { key: 'q1', label: 'q₁ (μC)', format: (v) => v.toFixed(1) },
      { key: 'q2', label: 'q₂ (μC)', format: (v) => v.toFixed(1) },
      { key: 'r', label: 'r (m)', format: (v) => v.toFixed(3) },
      { key: 'F', label: 'F (N)', format: (v) => v.toExponential(3) },
      { key: 'Fr2', label: 'F·r² (N·m²)', format: (v) => v.toExponential(3) },
    ],
    procedure: [
      'Set q₁ = q₂ = +5 μC. Drag q₂ (or use the r slider) to r = 0.10 m and click Record.',
      'Record again at r = 0.20, 0.30, 0.50, 0.70 and 1.00 m.',
      'Check the F·r² column: it should be constant. Why?',
      'Switch on the log-log plot. Estimate the slope from two points: Δ(log F)/Δ(log r). Is it −2?',
      'Keep r = 0.30 m and change q₂ to +2.5 and +10 μC. Record each; is F proportional to q₂?',
    ],
    predict: 'If you double the separation, by what factor will the force change? And if you double one charge?',
    source: () => {
      const c = calc();
      if (!Number.isFinite(c.F)) return null;
      return { q1: params.q1, q2: params.q2, r: c.r, F: c.F, Fr2: c.F * c.r * c.r };
    },
  });
  ctrlPanel.appendChild(lab.el);

  // keep the r slider in sync with drags
  let lastR = -1;
  const animator = loop(() => {
    const r = pos.x2 - X1;
    if (Math.abs(r - lastR) > 1e-6) { rS.value = r.toFixed(2); lastR = r; }
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
