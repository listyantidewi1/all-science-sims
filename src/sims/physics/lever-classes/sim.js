import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Each lever: positions (metres along the bar from its left end), effort range, direction of the effort push.
// fulcrum / load are fixed; effort is draggable within effortRange.
const LEVERS = {
  class1: {
    label: { en: 'Class 1: crowbar', id: 'Kelas 1: linggis' }, cls: 1,
    len: 1.2, fulcrum: 0.3, load: 0.0, effortRange: [0.45, 1.2], effort: 1.1, effortDown: true, barColor: '#94a3b8',
  },
  class2: {
    label: { en: 'Class 2: wheelbarrow', id: 'Kelas 2: gerobak dorong' }, cls: 2,
    len: 1.4, fulcrum: 0.0, load: 0.4, effortRange: [0.55, 1.4], effort: 1.3, effortDown: false, barColor: '#b45309',
  },
  class3: {
    label: { en: 'Class 3: tweezers', id: 'Kelas 3: pinset' }, cls: 3,
    len: 0.12, fulcrum: 0.0, load: 0.12, effortRange: [0.02, 0.10], effort: 0.06, effortDown: false, barColor: '#cbd5e1',
  },
  forearm: {
    label: { en: 'Forearm (class 3)', id: 'Lengan bawah (kelas 3)' }, cls: 3,
    len: 0.38, fulcrum: 0.0, load: 0.35, effortRange: [0.02, 0.12], effort: 0.04, effortDown: false, barColor: '#fde68a',
  },
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

  const params = { lever: 'class1', load: 200, effortApplied: 100 };
  const state = { effortPos: LEVERS.class1.effort, theta: 0 };

  const lever = () => LEVERS[params.lever];
  // Physics: moments about the fulcrum.
  function calc() {
    const Lv = lever();
    const dLoad = Math.abs(Lv.load - Lv.fulcrum);
    const dEff = Math.max(1e-6, Math.abs(state.effortPos - Lv.fulcrum));
    const needed = params.load * dLoad / dEff;
    const ma = dEff / Math.max(1e-6, dLoad);
    const lifts = params.effortApplied >= needed - 1e-9 && params.effortApplied > 0;
    return { dLoad, dEff, needed, ma, lifts, momentLoad: params.load * dLoad, momentEff: params.effortApplied * dEff };
  }

  // Geometry: pixels per metre so the bar fills ~76 % of the width.
  function geom() {
    const Lv = lever();
    const W = cv.width, H = cv.height;
    const barPx = W * 0.76;
    const ppm = barPx / Lv.len;
    const x0 = W * 0.12;
    const barY = H * 0.6;
    const fx = x0 + Lv.fulcrum * ppm;
    return { W, H, ppm, x0, barY, fx, fy: barY, Lv };
  }
  // Point on the (tilted) bar at distance s metres from the left end.
  function pt(g, s) {
    const d = (s - g.Lv.fulcrum) * g.ppm;
    return { x: g.fx + d * Math.cos(state.theta), y: g.fy - d * Math.sin(state.theta) };
  }

  function step(dt) {
    const c = calc();
    const Lv = lever();
    const loadRight = Lv.load > Lv.fulcrum;
    const target = c.lifts ? (loadRight ? 0.14 : -0.14) : 0;
    state.theta += (target - state.theta) * Math.min(1, 6 * dt);
  }

  function arrow(ctx, x1, y1, x2, y2, color, width) {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const head = Math.max(6, width * 2.6);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - head * 0.6 * Math.cos(ang), y2 - head * 0.6 * Math.sin(ang)); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(ang - 0.45), y2 - head * Math.sin(ang - 0.45));
    ctx.lineTo(x2 - head * Math.cos(ang + 0.45), y2 - head * Math.sin(ang + 0.45));
    ctx.closePath(); ctx.fill();
    ctx.lineCap = 'butt';
  }

  function fmtM(m) { return m < 0.3 ? `${(m * 100).toFixed(0)} cm` : `${m.toFixed(2)} m`; }

  function draw() {
    const ctx = cv.ctx;
    const g = geom();
    const { W, H, Lv } = g;
    if (W < 10 || H < 10) return;
    const c = calc();
    const fs = clamp(W * 0.021, 10, 16);
    const font = (s, bold) => `${bold ? 'bold ' : ''}${Math.round(s)}px system-ui, -apple-system, Roboto, sans-serif`;

    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const pL = pt(g, Lv.load), pE = pt(g, state.effortPos), pF = pt(g, Lv.fulcrum);
    const pA = pt(g, 0), pB = pt(g, Lv.len);
    const barW = clamp(H * 0.03, 6, 16);

    // Fulcrum support
    if (params.lever === 'class2') {
      // wheel
      const r = clamp(H * 0.09, 14, 44);
      ctx.fillStyle = '#1f2937'; ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(pF.x, pF.y + r, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(pF.x, pF.y + r, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(pF.x, pF.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(pF.x, pF.y); ctx.lineTo(pF.x, pF.y + r); ctx.stroke();
    } else if (params.lever === 'forearm') {
      // upper arm standing above the elbow
      const uw = clamp(W * 0.05, 18, 44), uh = H * 0.28;
      ctx.fillStyle = '#fde68a'; ctx.strokeStyle = '#d97706'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(pF.x - uw / 2, pF.y - uh, uw, uh, uw / 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(pF.x, pF.y, barW * 0.9, 0, Math.PI * 2); ctx.fill();
    } else if (params.lever === 'class3') {
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(pF.x, pF.y, barW * 0.9, 0, Math.PI * 2); ctx.fill();
      // the other arm of the tweezers (mirror image, not simulated)
      ctx.strokeStyle = 'rgba(203,213,225,0.35)'; ctx.lineWidth = barW;
      ctx.beginPath(); ctx.moveTo(pF.x, pF.y);
      const dx = pB.x - pF.x, dy = pB.y - pF.y;
      ctx.lineTo(pF.x + dx, pF.y - dy + H * 0.18); ctx.stroke();
    } else {
      const th = clamp(H * 0.1, 16, 48);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.moveTo(pF.x, pF.y); ctx.lineTo(pF.x - th * 0.6, pF.y + th); ctx.lineTo(pF.x + th * 0.6, pF.y + th); ctx.closePath(); ctx.fill();
    }

    // Bar
    ctx.strokeStyle = Lv.barColor; ctx.lineWidth = barW; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(pA.x, pA.y); ctx.lineTo(pB.x, pB.y); ctx.stroke();
    ctx.lineCap = 'butt';
    if (params.lever === 'class2') {
      // tray around the load
      const tw = g.ppm * 0.45, th = H * 0.1;
      ctx.fillStyle = 'rgba(180,83,9,0.45)';
      ctx.beginPath(); ctx.moveTo(pL.x - tw / 2, pL.y - th); ctx.lineTo(pL.x + tw / 2, pL.y - th); ctx.lineTo(pL.x + tw / 2 - th * 0.3, pL.y - barW / 2); ctx.lineTo(pL.x - tw / 2 + th * 0.3, pL.y - barW / 2); ctx.closePath(); ctx.fill();
    }
    if (params.lever === 'forearm') {
      // biceps: from the upper arm down to the insertion point
      ctx.strokeStyle = c.lifts ? '#ef4444' : '#f87171'; ctx.lineWidth = clamp(barW * 1.4 * (0.6 + 0.4 * clamp(c.needed / 800, 0, 1)), 6, 24); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(pF.x - 4, pF.y - H * 0.25);
      ctx.quadraticCurveTo(pF.x - clamp(W * 0.04, 8, 30), pF.y - H * 0.2, pE.x, pE.y);
      ctx.stroke(); ctx.lineCap = 'butt';
      // hand
      ctx.fillStyle = '#fde68a'; ctx.beginPath(); ctx.arc(pB.x, pB.y, barW * 1.3, 0, Math.PI * 2); ctx.fill();
    }

    // Load block
    const maxF = 500;
    const lb = clamp(H * 0.05 + H * 0.09 * Math.sqrt(params.load / maxF), 12, H * 0.16);
    ctx.fillStyle = '#8b5cf6'; ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 2;
    if (params.lever === 'forearm') { ctx.beginPath(); ctx.arc(pL.x, pL.y - barW / 2 - lb / 2, lb / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
    else { ctx.beginPath(); ctx.roundRect(pL.x - lb / 2, pL.y - barW / 2 - lb, lb, lb, 4); ctx.fill(); ctx.stroke(); }
    // Load arrow (down) from the block
    const la = clamp(H * 0.08 + H * 0.16 * (params.load / maxF), 14, H * 0.25);
    arrow(ctx, pL.x, pL.y + barW, pL.x, pL.y + barW + la, '#a78bfa', clamp(W * 0.006, 2, 5));
    ctx.fillStyle = '#c4b5fd'; ctx.font = font(fs, true); ctx.textAlign = 'left';
    ctx.fillText(`${T('Load', 'Beban')} ${params.load.toFixed(0)} N`, pL.x + fs * 0.8, pL.y + barW + la * 0.6);

    // Effort arrow
    const ea = clamp(H * 0.06 + H * 0.2 * clamp(params.effortApplied / 1000, 0, 1), 12, H * 0.28);
    const effColor = c.lifts ? '#22c55e' : '#f97316';
    const dir = Lv.effortDown ? 1 : -1; // +1: push down on bar (arrow comes from above), -1: push up
    const tipGap = barW * 0.9;
    arrow(ctx, pE.x, pE.y - dir * (tipGap + ea), pE.x, pE.y - dir * tipGap, effColor, clamp(W * 0.007, 2.5, 6));
    ctx.fillStyle = effColor; ctx.font = font(fs, true);
    const neededTxt = `${T('needed', 'perlu')} ${c.needed >= 10000 ? '>9999' : c.needed.toFixed(c.needed < 10 ? 1 : 0)} N`;
    if (Lv.effortDown) {
      ctx.textAlign = 'center';
      const eLabelY = pE.y - tipGap - ea - fs * 0.6;
      ctx.fillText(`${T('Effort', 'Kuasa')} ${params.effortApplied.toFixed(0)} N`, pE.x, eLabelY);
      ctx.font = font(fs * 0.9); ctx.fillText(neededTxt, pE.x, eLabelY - fs * 1.1);
    } else {
      const right = pE.x < W * 0.7;
      ctx.textAlign = right ? 'left' : 'right';
      const lx = pE.x + (right ? 1 : -1) * fs * 0.9, ly = pE.y + tipGap + ea * 0.5;
      ctx.fillText(`${T('Effort', 'Kuasa')} ${params.effortApplied.toFixed(0)} N`, lx, ly);
      ctx.font = font(fs * 0.9); ctx.fillText(neededTxt, lx, ly + fs * 1.1);
    }
    ctx.textAlign = 'center';
    // Handle knob
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = effColor; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(pE.x, pE.y, clamp(W * 0.014, 7, 12), 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Fulcrum label
    ctx.fillStyle = '#fbbf24'; ctx.font = font(fs * 0.95, true); ctx.textAlign = 'center';
    const fulLabelY = params.lever === 'class2' ? pF.y + clamp(H * 0.09, 14, 44) * 2 + fs * 1.3 : pF.y + clamp(H * 0.1, 16, 48) + fs * 1.2;
    ctx.fillText(params.lever === 'forearm' ? T('Fulcrum (elbow)', 'Titik tumpu (siku)') : T('Fulcrum', 'Titik tumpu'), pF.x, params.lever === 'forearm' ? pF.y + fs * 2.2 : fulLabelY);

    // Arm dimension lines (drawn on an untilted baseline below everything)
    const dimY = H * 0.88;
    const xOf = (s) => g.x0 + s * g.ppm;
    const dim = (sa, sb, color, label, dy) => {
      const xa = xOf(sa), xb = xOf(sb);
      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(xa, dimY + dy); ctx.lineTo(xb, dimY + dy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(xa, dimY + dy - 6); ctx.lineTo(xa, dimY + dy + 6); ctx.moveTo(xb, dimY + dy - 6); ctx.lineTo(xb, dimY + dy + 6); ctx.stroke();
      ctx.fillStyle = color; ctx.font = font(fs * 0.9); ctx.textAlign = 'center';
      ctx.fillText(label, (xa + xb) / 2, dimY + dy - 9);
    };
    if (c.dLoad > 0) dim(Lv.fulcrum, Lv.load, '#a78bfa', `${T('load arm', 'lengan beban')} ${fmtM(c.dLoad)}`, 0);
    dim(Lv.fulcrum, state.effortPos, effColor, `${T('effort arm', 'lengan kuasa')} ${fmtM(c.dEff)}`, fs * 2.2);

    // Readout
    ctx.textAlign = 'left';
    const px = W * 0.02, lh = fs * 1.35;
    let y = fs * 1.4;
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true);
    ctx.fillText(T(LEVERS[params.lever].label.en, LEVERS[params.lever].label.id), px, y); y += lh;
    ctx.font = font(fs); ctx.fillStyle = '#cbd5e1';
    const mE = c.momentEff, mL = c.momentLoad;
    ctx.fillText(`${T('Effort × effort arm', 'Kuasa × lengan kuasa')} = ${params.effortApplied.toFixed(0)} × ${c.dEff.toFixed(2)} = ${mE.toFixed(1)} N·m`, px, y); y += lh;
    ctx.fillText(`${T('Load × load arm', 'Beban × lengan beban')} = ${params.load.toFixed(0)} × ${c.dLoad.toFixed(2)} = ${mL.toFixed(1)} N·m`, px, y); y += lh;
    ctx.fillText(`${T('Effort needed', 'Kuasa yang diperlukan')} = ${params.load.toFixed(0)} × ${c.dLoad.toFixed(2)} / ${c.dEff.toFixed(2)} = ${c.needed >= 10000 ? '>9999' : c.needed.toFixed(c.needed < 10 ? 1 : 0)} N`, px, y); y += lh;
    ctx.fillText(`${T('Mechanical advantage', 'Keuntungan mekanis')} = ${c.dEff.toFixed(2)} / ${c.dLoad.toFixed(2)} = ${c.ma.toFixed(2)}`, px, y); y += lh;
    ctx.font = font(fs, true); ctx.fillStyle = effColor;
    ctx.fillText(c.lifts ? T('It lifts!', 'Terangkat!') : T('Not enough effort', 'Kuasa belum cukup'), px, y);

    // Class hint: top right
    const narrow = W < 640;
    ctx.textAlign = 'right'; ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.9);
    const order = { 1: T('load – fulcrum – effort', 'beban – tumpu – kuasa'), 2: T('fulcrum – load – effort', 'tumpu – beban – kuasa'), 3: T('fulcrum – effort – load', 'tumpu – kuasa – beban') }[Lv.cls];
    // (on narrow canvases there is no room; the readout title already names the class)
    if (!narrow) {
      const hx = W - W * 0.02, hy = fs * 1.4;
      ctx.fillText(`${T('Class', 'Kelas')} ${Lv.cls}: ${order}`, hx, hy);
      ctx.fillText(T('Drag the white knob to move the effort', 'Geser bulatan putih untuk memindahkan kuasa'), hx, hy + fs * 1.35);
    }
    ctx.textAlign = 'left';
  }

  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geom(); const p = pt(g, state.effortPos);
      return Math.hypot(x - p.x, y - p.y) < Math.max(18, cv.width * 0.03) ? 'effort' : null;
    },
    onDrag(id, x) {
      const g = geom(); const Lv = g.Lv;
      // Project the pointer x onto the bar (ignore the small tilt).
      const s = Lv.fulcrum + (x - g.fx) / (g.ppm * Math.max(0.5, Math.cos(state.theta)));
      state.effortPos = clamp(s, Lv.effortRange[0], Lv.effortRange[1]);
    },
    handles: () => { const g = geom(); const p = pt(g, state.effortPos); return [{ id: 'effort', x: p.x, y: p.y, label: T('Effort point (drag along the bar)', 'Titik kuasa (geser sepanjang batang)') }]; },
    cursor: 'default', hoverCursor: 'grab',
  });

  // Controls
  const leverSel = select({
    label: T('Lever', 'Tuas'), key: 'lever',
    options: Object.entries(LEVERS).map(([value, L]) => ({ value, label: T(L.label.en, L.label.id) })),
    value: params.lever,
    onChange: (v) => {
      if (!LEVERS[v]) return;
      params.lever = v; state.effortPos = LEVERS[v].effort; state.theta = 0;
      if (v === 'forearm' || v === 'class3') { loadS.apply(Math.min(params.load, 60)); }
    },
  });
  const loadS = slider({ label: T('Load (N)', 'Beban (N)'), key: 'load', min: 5, max: 500, step: 5, value: params.load, format: (v) => v.toFixed(0), onInput: (v) => { params.load = v; } });
  const effS = slider({ label: T('Effort applied (N)', 'Kuasa yang diberikan (N)'), key: 'effort', min: 0, max: 1000, step: 5, value: params.effortApplied, format: (v) => v.toFixed(0), onInput: (v) => { params.effortApplied = v; } });
  const justB = button({ label: T('Set effort = needed', 'Atur kuasa = yang diperlukan'), onClick: () => { const c = calc(); effS.apply(Math.min(1000, Math.ceil(c.needed / 5) * 5)); } });
  const resetB = button({ label: T('Reset effort position', 'Atur ulang posisi kuasa'), onClick: () => { state.effortPos = lever().effort; } });
  ctrlPanel.append(leverSel.el, loadS.el, effS.el, row(justB, resetB));

  const lab = labPanel({
    title: 'Lever lab — arms and effort',
    filename: 'lever-classes-data.csv',
    columns: [
      { key: 'lever', label: 'Lever' },
      { key: 'cls', label: 'Class' },
      { key: 'load', label: 'Load (N)', format: (v) => v.toFixed(0) },
      { key: 'dLoad', label: 'Load arm (m)', format: (v) => v.toFixed(3) },
      { key: 'dEff', label: 'Effort arm (m)', format: (v) => v.toFixed(3) },
      { key: 'needed', label: 'Effort needed (N)', format: (v) => v.toFixed(1) },
      { key: 'ma', label: 'MA', format: (v) => v.toFixed(2) },
    ],
    procedure: [
      'Crowbar: keep the load at 200 N. Record the effort needed with the effort point at the far end of the bar.',
      'Drag the effort point halfway toward the fulcrum and record again. How did the effort change?',
      'Wheelbarrow: record with the handles at the end, then as close to the load as allowed. Is the MA ever below 1?',
      'Tweezers and forearm: record each. Is the effort needed bigger or smaller than the load?',
      'For every row, check: effort needed × effort arm should equal load × load arm.',
    ],
    predict: 'Which lever will need the smallest effort for the same load? Which will need the largest? Write your guesses in order.',
    source: () => {
      const c = calc(); const Lv = lever();
      return { lever: Lv.label.en, cls: Lv.cls, load: params.load, dLoad: c.dLoad, dEff: c.dEff, needed: c.needed, ma: c.ma };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
