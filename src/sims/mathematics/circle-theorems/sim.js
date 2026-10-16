import { createCanvas, loop } from '../../../lib/canvas.js';
import { select, button, toggle, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const PI = Math.PI, TAU = 2 * Math.PI, R2D = 180 / Math.PI;
const UNITS_PER_R = 5;                 // lengths are reported in units with radius r = 5
const COL = { circle: '#e2e8f0', A: '#f59e0b', B: '#38bdf8', C: '#34d399', D: '#f472b6', O: '#cbd5e1', arc: '#a78bfa', ok: '#a7f3d0', bad: '#fca5a5' };

const norm = (a) => ((a % TAU) + TAU) % TAU;
// Angle (degrees, 0..180) at vertex V between rays V→P and V→Q.
function angleAt(V, P, Q) {
  const ax = P.x - V.x, ay = P.y - V.y, bx = Q.x - V.x, by = Q.y - V.y;
  const d = Math.hypot(ax, ay) * Math.hypot(bx, by);
  if (d < 1e-9) return 0;
  return Math.acos(Math.max(-1, Math.min(1, (ax * bx + ay * by) / d))) * R2D;
}
const cross = (ax, ay, bx, by) => ax * by - ay * bx;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 18);
  const deg = (v) => `${v.toFixed(1)}°`;

  // Point angles (radians, canvas convention) per mode so switching modes keeps each set-up.
  const state = {
    mode: 'inscribed',
    showHelp: true,
    inscribed: { A: 0.6, B: 2.5, P: 4.4 },
    segment: { A: 0.6, B: 2.5, P: 4.0, Q: 5.0 },
    semicircle: { A: 0.3, P: 4.5 },
    cyclic: { v: [0.5, 1.9, 3.2, 4.9] },
    tangent: { T: 1.9, A: 5.6, B: 3.6 },
    chords: { A: 3.6, B: 0.4, C: 2.3, D: 5.4 },
    tangents: { px: 1.95, py: 0.35 },      // external point, in units of r from the centre
  };

  const geo = () => {
    const W = cv.width, H = cv.height;
    return { cx: W * 0.36, cy: H * 0.52, r: Math.min(H * 0.4, W * 0.24) };
  };
  const pos = (th) => { const g = geo(); return { x: g.cx + g.r * Math.cos(th), y: g.cy + g.r * Math.sin(th) }; };
  const unitLen = (p, q) => { const g = geo(); return Math.hypot(p.x - q.x, p.y - q.y) / g.r * UNITS_PER_R; };

  // ---- drawing primitives ---------------------------------------------------------
  function line(ctx, p, q, color, width = 2, dash = []) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.restore();
  }
  function point(ctx, p, color, label, r = 6) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
    if (label) {
      const g = geo();
      const dx = p.x - g.cx, dy = p.y - g.cy, d = Math.hypot(dx, dy) || 1;
      ctx.fillStyle = color; ctx.font = `bold ${fontPx(0.022)}px ${FONT}`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(label, p.x + (dx / d) * 16, p.y + (dy / d) * 16);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    }
  }
  // Angle marker at V between rays to P and Q (the smaller angle unless reflex), with the value written inside.
  function angleMark(ctx, V, P, Q, color, rad, text, reflex = false) {
    const a1 = Math.atan2(P.y - V.y, P.x - V.x), a2 = Math.atan2(Q.y - V.y, Q.x - V.x);
    let d = norm(a2 - a1);                     // sweep from a1 increasing to a2
    let start = a1, ccw = false;
    if ((d > PI) !== reflex) { start = a2; d = TAU - d; }   // pick the side: small angle unless reflex
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(V.x, V.y, rad, start, start + d, ccw); ctx.stroke();
    ctx.globalAlpha = 0.18; ctx.beginPath(); ctx.moveTo(V.x, V.y); ctx.arc(V.x, V.y, rad, start, start + d, ccw); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
    if (text) {
      const mid = start + d / 2;
      ctx.font = `bold ${fontPx(0.02)}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const tr = rad + fontPx(0.02) * 1.1;
      ctx.fillText(text, V.x + tr * Math.cos(mid), V.y + tr * Math.sin(mid));
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    }
    ctx.restore();
  }
  function rightAngle(ctx, V, P, Q, color, s = 12) {
    const u = { x: P.x - V.x, y: P.y - V.y }, v = { x: Q.x - V.x, y: Q.y - V.y };
    const lu = Math.hypot(u.x, u.y) || 1, lv = Math.hypot(v.x, v.y) || 1;
    const a = { x: V.x + (u.x / lu) * s, y: V.y + (u.y / lu) * s }, b = { x: V.x + (v.x / lv) * s, y: V.y + (v.y / lv) * s };
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + b.x - V.x, a.y + b.y - V.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.restore();
  }
  function highlightArc(ctx, from, to, color) {
    const g = geo();
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 6; ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.r, from, to, false); ctx.stroke(); ctx.restore();
  }
  function wrap(ctx, text, maxW) {
    const words = text.split(' '), lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  // Right-hand information panel: title, theorem statement, measurements, check.
  function infoPanel(ctx, items) {
    const W = cv.width, H = cv.height;
    const x = W * 0.705, w = W * 0.285, fs = fontPx(0.019), lh = fs * 1.4;
    ctx.font = `${fs}px ${FONT}`;
    const lines = [];
    for (const it of items) {
      ctx.font = `${it.bold ? 'bold ' : ''}${it.size ? fontPx(it.size) : fs}px ${FONT}`;
      for (const l of wrap(ctx, it.text, w - 16)) lines.push({ text: l, color: it.color, bold: it.bold, size: it.size });
      if (it.gap) lines.push({ text: '', gap: true });
    }
    const hgt = lines.reduce((s, l) => s + (l.gap ? lh * 0.4 : lh), 0) + 14;
    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath(); ctx.roundRect(x, 10, w, Math.min(hgt, H - 20), 10); ctx.fill();
    let y = 10 + 8 + fs;
    for (const l of lines) {
      if (l.gap) { y += lh * 0.4; continue; }
      ctx.fillStyle = l.color || '#e2e8f0';
      ctx.font = `${l.bold ? 'bold ' : ''}${l.size ? fontPx(l.size) : fs}px ${FONT}`;
      ctx.fillText(l.text, x + 8, y);
      y += lh;
    }
  }
  const checkLine = (diff, tol, unit = '°') => ({
    text: Math.abs(diff) <= tol ? T(`✓ agrees (difference ${Math.abs(diff).toFixed(unit === '°' ? 1 : 2)}${unit})`, `✓ sesuai (selisih ${Math.abs(diff).toFixed(unit === '°' ? 1 : 2)}${unit})`)
                              : T(`✗ differs by ${Math.abs(diff).toFixed(1)}${unit}`, `✗ berbeda ${Math.abs(diff).toFixed(1)}${unit}`),
    color: Math.abs(diff) <= tol ? COL.ok : COL.bad, bold: true,
  });

  // ---- per-mode measurement + drawing. Each returns the lab record. -----------------
  const MODES = {
    inscribed: {
      label: 'Inscribed vs central angle (2×)',
      handles: () => [['A', pos(state.inscribed.A)], ['B', pos(state.inscribed.B)], ['P', pos(state.inscribed.P)]],
      measure() {
        const s = state.inscribed, A = pos(s.A), B = pos(s.B), P = pos(s.P), O = geo();
        const dAB = norm(s.B - s.A);                       // arc A→B increasing
        const pOnAB = norm(s.P - s.A) < dAB;
        const arc = pOnAB ? [s.B, s.A] : [s.A, s.B];          // arc not containing P, increasing from arc[0] to arc[1]
        const central = norm(arc[1] - arc[0]) * R2D;
        const inscribed = angleAt(P, A, B);
        return { A, B, P, O: { x: O.cx, y: O.cy }, arc, central, inscribed };
      },
      draw(ctx) {
        const m = this.measure();
        highlightArc(ctx, m.arc[0], m.arc[1], COL.arc);
        line(ctx, m.P, m.A, COL.A, 2.5); line(ctx, m.P, m.B, COL.A, 2.5);
        line(ctx, m.O, m.A, COL.B, 2.5); line(ctx, m.O, m.B, COL.B, 2.5);
        angleMark(ctx, m.P, m.A, m.B, COL.A, 28, deg(m.inscribed));
        angleMark(ctx, m.O, pos(m.arc[0]), pos(m.arc[1]), COL.B, 22, deg(m.central), m.central > 180);
        point(ctx, m.O, COL.O, 'O', 4); point(ctx, m.A, COL.arc, 'A'); point(ctx, m.B, COL.arc, 'B'); point(ctx, m.P, COL.A, 'P');
        infoPanel(ctx, [
          { text: T('Inscribed angle theorem', 'Teorema sudut keliling'), bold: true, size: 0.022, color: '#fff' },
          { text: T('An angle at the circumference is half the angle at the centre standing on the same arc.', 'Sudut keliling adalah setengah sudut pusat yang menghadap busur yang sama.'), gap: true },
          { text: `∠APB = ${deg(m.inscribed)}`, color: COL.A, bold: true },
          { text: `∠AOB (${T('arc without P', 'busur tanpa P')}) = ${deg(m.central)}`, color: COL.B, bold: true },
          { text: `2 × ${deg(m.inscribed)} = ${deg(2 * m.inscribed)}` },
          checkLine(2 * m.inscribed - m.central, 0.5),
          { text: m.central > 180 ? T('P is on the minor arc, so the central angle is reflex (> 180°).', 'P berada di busur kecil, sehingga sudut pusatnya refleks (> 180°).') : T('Drag P along the arc: ∠APB does not change.', 'Geser P sepanjang busur: ∠APB tidak berubah.'), color: '#cbd5e1' },
        ]);
        return { theorem: 'Inscribed = ½ central', m1: `∠APB = ${deg(m.inscribed)}`, m2: `∠AOB = ${deg(m.central)}`, relation: `2·∠APB = ${deg(2 * m.inscribed)}`, check: Math.abs(2 * m.inscribed - m.central) <= 0.5 ? 'OK' : 'differs' };
      },
    },
    segment: {
      label: 'Angles in the same segment',
      handles: () => [['A', pos(state.segment.A)], ['B', pos(state.segment.B)], ['P', pos(state.segment.P)], ['Q', pos(state.segment.Q)]],
      draw(ctx) {
        const s = state.segment, A = pos(s.A), B = pos(s.B), P = pos(s.P), Q = pos(s.Q);
        const dAB = norm(s.B - s.A);
        const same = (norm(s.P - s.A) < dAB) === (norm(s.Q - s.A) < dAB);
        const a1 = angleAt(P, A, B), a2 = angleAt(Q, A, B);
        line(ctx, A, B, COL.arc, 2.5, [6, 4]);
        line(ctx, P, A, COL.A, 2.5); line(ctx, P, B, COL.A, 2.5);
        line(ctx, Q, A, COL.C, 2.5); line(ctx, Q, B, COL.C, 2.5);
        angleMark(ctx, P, A, B, COL.A, 26, deg(a1)); angleMark(ctx, Q, A, B, COL.C, 26, deg(a2));
        point(ctx, { x: geo().cx, y: geo().cy }, COL.O, 'O', 4);
        point(ctx, A, COL.arc, 'A'); point(ctx, B, COL.arc, 'B'); point(ctx, P, COL.A, 'P'); point(ctx, Q, COL.C, 'Q');
        const diff = same ? a1 - a2 : a1 + a2 - 180;
        infoPanel(ctx, [
          { text: T('Angles in the same segment', 'Sudut dalam tembereng yang sama'), bold: true, size: 0.022, color: '#fff' },
          { text: T('Inscribed angles on the same chord and on the same side of it are equal. On opposite sides they are supplementary.', 'Sudut keliling pada tali busur yang sama dan di sisi yang sama besarnya sama. Di sisi berlawanan keduanya berpelurus.'), gap: true },
          { text: `∠APB = ${deg(a1)}`, color: COL.A, bold: true },
          { text: `∠AQB = ${deg(a2)}`, color: COL.C, bold: true },
          { text: same ? T('P and Q are in the same segment → ∠APB = ∠AQB', 'P dan Q dalam tembereng yang sama → ∠APB = ∠AQB') : T(`P and Q are in opposite segments → ∠APB + ∠AQB = ${deg(a1 + a2)} (180°)`, `P dan Q dalam tembereng berlawanan → ∠APB + ∠AQB = ${deg(a1 + a2)} (180°)`) },
          checkLine(diff, 0.5),
        ]);
        return { theorem: same ? 'Same segment: equal' : 'Opposite segments: supplementary', m1: `∠APB = ${deg(a1)}`, m2: `∠AQB = ${deg(a2)}`, relation: same ? '∠APB = ∠AQB' : `sum = ${deg(a1 + a2)}`, check: Math.abs(diff) <= 0.5 ? 'OK' : 'differs' };
      },
    },
    semicircle: {
      label: 'Angle in a semicircle',
      handles: () => [['A', pos(state.semicircle.A)], ['P', pos(state.semicircle.P)]],
      draw(ctx) {
        const s = state.semicircle, A = pos(s.A), B = pos(s.A + PI), P = pos(s.P), O = { x: geo().cx, y: geo().cy };
        const ang = angleAt(P, A, B);
        line(ctx, A, B, COL.B, 2.5);
        line(ctx, P, A, COL.A, 2.5); line(ctx, P, B, COL.A, 2.5);
        line(ctx, O, P, COL.O, 1.5, [4, 4]);
        rightAngle(ctx, P, A, B, COL.A, 14);
        angleMark(ctx, P, A, B, COL.A, 30, deg(ang));
        point(ctx, O, COL.O, 'O', 4); point(ctx, A, COL.B, 'A'); point(ctx, B, COL.B, 'B'); point(ctx, P, COL.A, 'P');
        infoPanel(ctx, [
          { text: T('Angle in a semicircle (Thales)', 'Sudut dalam setengah lingkaran (Thales)'), bold: true, size: 0.022, color: '#fff' },
          { text: T('If AB is a diameter, every angle APB on the circle is a right angle: the central angle is 180°, so the inscribed angle is 90°.', 'Jika AB diameter, setiap sudut APB pada lingkaran adalah sudut siku-siku: sudut pusatnya 180°, sehingga sudut kelilingnya 90°.'), gap: true },
          { text: `∠APB = ${deg(ang)}`, color: COL.A, bold: true },
          { text: `∠AOB = 180°  →  ½ × 180° = 90°`, color: COL.B },
          checkLine(ang - 90, 0.5),
          { text: T('OP = OA = OB: triangles OAP and OBP are isosceles.', 'OP = OA = OB: segitiga OAP dan OBP sama kaki.'), color: '#cbd5e1' },
        ]);
        return { theorem: 'Angle in a semicircle', m1: `∠APB = ${deg(ang)}`, m2: '∠AOB = 180.0°', relation: '½·180° = 90°', check: Math.abs(ang - 90) <= 0.5 ? 'OK' : 'differs' };
      },
    },
    cyclic: {
      label: 'Cyclic quadrilateral (opposite angles 180°)',
      handles: () => state.cyclic.v.map((th, i) => [`v${i}`, pos(th)]),
      draw(ctx) {
        const order = state.cyclic.v.map((th, i) => ({ th: norm(th), i })).sort((p, q) => p.th - q.th);
        const V = order.map((o) => pos(o.th));
        const names = ['A', 'B', 'C', 'D'], cols = [COL.A, COL.B, COL.C, COL.D];
        const ang = V.map((v, i) => angleAt(v, V[(i + 3) % 4], V[(i + 1) % 4]));
        ctx.save(); ctx.fillStyle = 'rgba(167,139,250,0.12)'; ctx.beginPath();
        V.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y))); ctx.closePath(); ctx.fill(); ctx.restore();
        for (let i = 0; i < 4; i++) line(ctx, V[i], V[(i + 1) % 4], COL.circle, 2.5);
        for (let i = 0; i < 4; i++) angleMark(ctx, V[i], V[(i + 3) % 4], V[(i + 1) % 4], cols[i], 22, deg(ang[i]));
        point(ctx, { x: geo().cx, y: geo().cy }, COL.O, 'O', 4);
        for (let i = 0; i < 4; i++) point(ctx, V[i], cols[i], names[i]);
        const s1 = ang[0] + ang[2], s2 = ang[1] + ang[3];
        infoPanel(ctx, [
          { text: T('Cyclic quadrilateral', 'Segi empat tali busur'), bold: true, size: 0.022, color: '#fff' },
          { text: T('When all four vertices lie on a circle, each pair of opposite angles adds to 180°.', 'Jika keempat titik sudut terletak pada lingkaran, setiap pasang sudut berhadapan berjumlah 180°.'), gap: true },
          { text: `∠A = ${deg(ang[0])}   ∠C = ${deg(ang[2])}`, color: COL.A, bold: true },
          { text: `∠A + ∠C = ${deg(s1)}`, color: COL.A },
          checkLine(s1 - 180, 0.5),
          { text: `∠B = ${deg(ang[1])}   ∠D = ${deg(ang[3])}`, color: COL.B, bold: true },
          { text: `∠B + ∠D = ${deg(s2)}`, color: COL.B },
          checkLine(s2 - 180, 0.5),
          { text: T('Angles A and C stand on arcs that together make the full 360°.', 'Sudut A dan C menghadap busur yang bersama-sama membentuk 360° penuh.'), color: '#cbd5e1' },
        ]);
        return { theorem: 'Cyclic quadrilateral', m1: `∠A = ${deg(ang[0])}, ∠C = ${deg(ang[2])}`, m2: `∠B = ${deg(ang[1])}, ∠D = ${deg(ang[3])}`, relation: `A+C = ${deg(s1)}, B+D = ${deg(s2)}`, check: Math.abs(s1 - 180) <= 0.5 && Math.abs(s2 - 180) <= 0.5 ? 'OK' : 'differs' };
      },
    },
    tangent: {
      label: 'Tangent ⟂ radius & tangent–chord angle',
      handles: () => [['T', pos(state.tangent.T)], ['A', pos(state.tangent.A)], ['B', pos(state.tangent.B)]],
      draw(ctx) {
        const s = state.tangent, g = geo(), O = { x: g.cx, y: g.cy };
        const Tp = pos(s.T), A = pos(s.A), B = pos(s.B);
        const d = { x: -Math.sin(s.T), y: Math.cos(s.T) };           // tangent direction
        const L = g.r * 1.6;
        const E1 = { x: Tp.x + d.x * L, y: Tp.y + d.y * L }, E2 = { x: Tp.x - d.x * L, y: Tp.y - d.y * L };
        // choose the tangent ray on the opposite side of chord TA from B
        const ta = { x: A.x - Tp.x, y: A.y - Tp.y }, tb = { x: B.x - Tp.x, y: B.y - Tp.y };
        const sideB = Math.sign(cross(ta.x, ta.y, tb.x, tb.y)) || 1;
        const sgn = Math.sign(cross(ta.x, ta.y, d.x, d.y)) === sideB ? -1 : 1;
        const ray = { x: Tp.x + sgn * d.x * g.r * 0.7, y: Tp.y + sgn * d.y * g.r * 0.7 };
        const tanChord = angleAt(Tp, A, ray);
        const inscribed = angleAt(B, Tp, A);
        const radiusTangent = angleAt(Tp, O, E1);
        line(ctx, E1, E2, COL.C, 2.5);
        line(ctx, O, Tp, COL.B, 2.5);
        rightAngle(ctx, Tp, O, E1, COL.B, 12);
        line(ctx, Tp, A, COL.A, 2.5);
        line(ctx, B, Tp, COL.D, 2); line(ctx, B, A, COL.D, 2);
        angleMark(ctx, Tp, A, ray, COL.A, 34, deg(tanChord));
        angleMark(ctx, B, Tp, A, COL.D, 26, deg(inscribed));
        point(ctx, O, COL.O, 'O', 4); point(ctx, Tp, COL.C, 'T'); point(ctx, A, COL.A, 'A'); point(ctx, B, COL.D, 'B');
        infoPanel(ctx, [
          { text: T('Tangent theorems', 'Teorema garis singgung'), bold: true, size: 0.022, color: '#fff' },
          { text: T('A tangent is perpendicular to the radius at the contact point. The angle between a tangent and a chord equals the inscribed angle in the alternate segment.', 'Garis singgung tegak lurus jari-jari di titik singgung. Sudut antara garis singgung dan tali busur sama dengan sudut keliling di tembereng berseberangan.'), gap: true },
          { text: `∠(OT, ${T('tangent', 'singgung')}) = ${deg(radiusTangent)}`, color: COL.B, bold: true },
          checkLine(radiusTangent - 90, 0.5),
          { text: `∠(${T('tangent', 'singgung')}, TA) = ${deg(tanChord)}`, color: COL.A, bold: true },
          { text: `∠TBA = ${deg(inscribed)}`, color: COL.D, bold: true },
          checkLine(tanChord - inscribed, 0.5),
          { text: T('Both equal half the arc TA on the tangent side.', 'Keduanya sama dengan setengah busur TA di sisi garis singgung.'), color: '#cbd5e1' },
        ]);
        return { theorem: 'Tangent–chord = alternate segment', m1: `tangent–chord = ${deg(tanChord)}`, m2: `∠TBA = ${deg(inscribed)}`, relation: `OT⟂tangent: ${deg(radiusTangent)}`, check: Math.abs(tanChord - inscribed) <= 0.5 ? 'OK' : 'differs' };
      },
    },
    chords: {
      label: 'Intersecting chords (products equal)',
      handles: () => [['A', pos(state.chords.A)], ['B', pos(state.chords.B)], ['C', pos(state.chords.C)], ['D', pos(state.chords.D)]],
      draw(ctx) {
        const s = state.chords, A = pos(s.A), B = pos(s.B), C = pos(s.C), D = pos(s.D);
        // segment intersection
        const r = { x: B.x - A.x, y: B.y - A.y }, q = { x: D.x - C.x, y: D.y - C.y };
        const den = cross(r.x, r.y, q.x, q.y);
        let X = null;
        if (Math.abs(den) > 1e-9) {
          const t = cross(C.x - A.x, C.y - A.y, q.x, q.y) / den, u = cross(C.x - A.x, C.y - A.y, r.x, r.y) / den;
          if (t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999) X = { x: A.x + r.x * t, y: A.y + r.y * t };
        }
        line(ctx, A, B, COL.A, 2.5); line(ctx, C, D, COL.B, 2.5);
        point(ctx, { x: geo().cx, y: geo().cy }, COL.O, 'O', 4);
        point(ctx, A, COL.A, 'A'); point(ctx, B, COL.A, 'B'); point(ctx, C, COL.B, 'C'); point(ctx, D, COL.B, 'D');
        const items = [
          { text: T('Intersecting chords', 'Tali busur berpotongan'), bold: true, size: 0.022, color: '#fff' },
          { text: T('If chords AB and CD cross at X inside the circle, then AX·XB = CX·XD. Lengths are in units with r = 5.', 'Jika tali busur AB dan CD berpotongan di X di dalam lingkaran, maka AX·XB = CX·XD. Panjang dalam satuan dengan r = 5.'), gap: true },
        ];
        let rec;
        if (X) {
          point(ctx, X, '#fff', null, 4);
          ctx.fillStyle = '#fff'; ctx.font = `bold ${fontPx(0.02)}px ${FONT}`; ctx.fillText('X', X.x + 8, X.y - 8);
          // similar triangles AXC and DXB
          ctx.save(); ctx.fillStyle = 'rgba(245,158,11,0.12)'; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(X.x, X.y); ctx.lineTo(C.x, C.y); ctx.closePath(); ctx.fill();
          ctx.fillStyle = 'rgba(56,189,248,0.12)'; ctx.beginPath(); ctx.moveTo(D.x, D.y); ctx.lineTo(X.x, X.y); ctx.lineTo(B.x, B.y); ctx.closePath(); ctx.fill(); ctx.restore();
          line(ctx, A, C, 'rgba(226,232,240,0.35)', 1.2, [4, 4]); line(ctx, D, B, 'rgba(226,232,240,0.35)', 1.2, [4, 4]);
          const ax = unitLen(A, X), xb = unitLen(X, B), cx_ = unitLen(C, X), xd = unitLen(X, D);
          const p1 = ax * xb, p2 = cx_ * xd;
          const mid = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
          ctx.font = `${fontPx(0.018)}px ${FONT}`; ctx.textAlign = 'center';
          const lbl = (p, q, txt, col) => { const m = mid(p, q, 0.5); ctx.fillStyle = col; ctx.fillText(txt, m.x, m.y - 8); };
          lbl(A, X, ax.toFixed(2), COL.A); lbl(X, B, xb.toFixed(2), COL.A); lbl(C, X, cx_.toFixed(2), COL.B); lbl(X, D, xd.toFixed(2), COL.B);
          ctx.textAlign = 'left';
          items.push(
            { text: `AX·XB = ${ax.toFixed(2)} × ${xb.toFixed(2)} = ${p1.toFixed(2)}`, color: COL.A, bold: true },
            { text: `CX·XD = ${cx_.toFixed(2)} × ${xd.toFixed(2)} = ${p2.toFixed(2)}`, color: COL.B, bold: true },
            checkLine(p1 - p2, 0.05, ''),
            { text: T('Triangles AXC and DXB (shaded) are similar: ∠CAB = ∠CDB on arc CB.', 'Segitiga AXC dan DXB (berbayang) sebangun: ∠CAB = ∠CDB pada busur CB.'), color: '#cbd5e1' },
          );
          rec = { theorem: 'Intersecting chords', m1: `AX·XB = ${p1.toFixed(2)}`, m2: `CX·XD = ${p2.toFixed(2)}`, relation: `AX=${ax.toFixed(2)} XB=${xb.toFixed(2)} CX=${cx_.toFixed(2)} XD=${xd.toFixed(2)}`, check: Math.abs(p1 - p2) <= 0.05 ? 'OK' : 'differs' };
        } else {
          items.push({ text: T('The chords do not cross. Drag the points so that AB and CD intersect inside the circle.', 'Tali busur tidak berpotongan. Geser titik-titik agar AB dan CD berpotongan di dalam lingkaran.'), color: COL.bad, bold: true });
          rec = null;
        }
        infoPanel(ctx, items);
        return rec;
      },
    },
    tangents: {
      label: 'Two tangents from a point',
      handles: () => { const g = geo(); return [['P', { x: g.cx + state.tangents.px * g.r, y: g.cy + state.tangents.py * g.r }]]; },
      draw(ctx) {
        const g = geo(), O = { x: g.cx, y: g.cy };
        const P = { x: g.cx + state.tangents.px * g.r, y: g.cy + state.tangents.py * g.r };
        const dOP = Math.hypot(P.x - O.x, P.y - O.y);
        const phi = Math.acos(clamp(g.r / dOP, -1, 1));
        const thP = Math.atan2(P.y - O.y, P.x - O.x);
        const T1 = pos(thP + phi), T2 = pos(thP - phi);
        const l1 = unitLen(P, T1), l2 = unitLen(P, T2), op = unitLen(O, P);
        const predicted = Math.sqrt(Math.max(0, op * op - UNITS_PER_R * UNITS_PER_R));
        line(ctx, O, P, COL.O, 1.5, [5, 4]);
        line(ctx, O, T1, COL.B, 2); line(ctx, O, T2, COL.B, 2);
        line(ctx, P, T1, COL.C, 2.5); line(ctx, P, T2, COL.C, 2.5);
        rightAngle(ctx, T1, O, P, COL.B, 11); rightAngle(ctx, T2, O, P, COL.B, 11);
        angleMark(ctx, P, T1, T2, COL.C, 30, deg(angleAt(P, T1, T2)));
        angleMark(ctx, O, T1, T2, COL.B, 24, deg(2 * phi * R2D));
        point(ctx, O, COL.O, 'O', 4); point(ctx, T1, COL.B, 'T₁'); point(ctx, T2, COL.B, 'T₂'); point(ctx, P, COL.C, 'P');
        infoPanel(ctx, [
          { text: T('Two tangents from a point', 'Dua garis singgung dari satu titik'), bold: true, size: 0.022, color: '#fff' },
          { text: T('From an external point P the two tangent segments are equal, PT₁ = PT₂ = √(OP² − r²), and OP bisects the angle between them.', 'Dari titik luar P kedua ruas garis singgung sama panjang, PT₁ = PT₂ = √(OP² − r²), dan OP membagi dua sudut di antaranya.'), gap: true },
          { text: `PT₁ = ${l1.toFixed(2)}   PT₂ = ${l2.toFixed(2)}`, color: COL.C, bold: true },
          checkLine(l1 - l2, 0.02, ''),
          { text: `OP = ${op.toFixed(2)}, r = 5 → √(OP² − r²) = ${predicted.toFixed(2)}`, color: '#cbd5e1' },
          { text: `∠T₁PT₂ = ${deg(angleAt(P, T1, T2))},  ∠T₁OT₂ = ${deg(2 * phi * R2D)}  (${T('sum', 'jumlah')} 180°)`, color: COL.B },
        ]);
        return { theorem: 'Two tangents equal', m1: `PT₁ = ${l1.toFixed(2)}`, m2: `PT₂ = ${l2.toFixed(2)}`, relation: `OP = ${op.toFixed(2)}, √(OP²−25) = ${predicted.toFixed(2)}`, check: Math.abs(l1 - l2) <= 0.02 ? 'OK' : 'differs' };
      },
    },
  };

  let lastRecord = null;
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    const g = geo();
    ctx.strokeStyle = COL.circle; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.r, 0, TAU); ctx.stroke();
    lastRecord = MODES[state.mode].draw(ctx);
    if (state.showHelp) {
      ctx.fillStyle = 'rgba(203,213,225,0.7)'; ctx.font = `${fontPx(0.017)}px ${FONT}`;
      ctx.fillText(T('Drag the labelled points. Lengths in units, r = 5.', 'Geser titik-titik berlabel. Panjang dalam satuan, r = 5.'), 10, H - 10);
    }
  }

  // ---- dragging ---------------------------------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      for (const [id, p] of MODES[state.mode].handles()) if (Math.hypot(x - p.x, y - p.y) < 18) return id;
      return null;
    },
    onDrag(id, x, y) {
      const g = geo(), s = state[state.mode];
      if (state.mode === 'tangents') {
        let ux = (x - g.cx) / g.r, uy = (y - g.cy) / g.r;
        const d = Math.hypot(ux, uy) || 1;
        if (d < 1.15) { ux *= 1.15 / d; uy *= 1.15 / d; }
        s.px = clamp(ux, -(g.cx - 12) / g.r, (cv.width * 0.69 - g.cx) / g.r);
        s.py = clamp(uy, -(g.cy - 12) / g.r, (cv.height - g.cy - 12) / g.r);
        return;
      }
      const th = Math.atan2(y - g.cy, x - g.cx);
      if (state.mode === 'cyclic') s.v[Number(id.slice(1))] = th;
      else s[id] = th;
    },
    handles: () => MODES[state.mode].handles().map(([id, p]) => ({ id, x: p.x, y: p.y, label: `Point ${id.replace('v', 'vertex ')} (drag)` })),
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls -----------------------------------------------------------------------
  const modeSel = select({
    label: 'Theorem', key: 'mode',
    options: Object.entries(MODES).map(([value, m]) => ({ value, label: m.label })),
    value: state.mode,
    onChange: (v) => { state.mode = v; },
  });
  const helpT = toggle({ label: 'Show hint', key: 'hint', value: true, onChange: (v) => { state.showHelp = v; } });
  const resetB = button({
    label: 'Reset points',
    onClick: () => {
      Object.assign(state.inscribed, { A: 0.6, B: 2.5, P: 4.4 });
      Object.assign(state.segment, { A: 0.6, B: 2.5, P: 4.0, Q: 5.0 });
      Object.assign(state.semicircle, { A: 0.3, P: 4.5 });
      state.cyclic.v = [0.5, 1.9, 3.2, 4.9];
      Object.assign(state.tangent, { T: 1.9, A: 5.6, B: 3.6 });
      Object.assign(state.chords, { A: 3.6, B: 0.4, C: 2.3, D: 5.4 });
      Object.assign(state.tangents, { px: 1.95, py: 0.35 });
    },
  });
  ctrlPanel.append(modeSel.el, row(helpT, resetB));

  const lab = labPanel({
    title: 'Circle theorems lab — measure and check',
    filename: 'circle-theorems-data.csv',
    columns: [
      { key: 'theorem', label: 'Theorem' },
      { key: 'm1', label: 'Measurement 1' },
      { key: 'm2', label: 'Measurement 2' },
      { key: 'relation', label: 'Relation' },
      { key: 'check', label: 'Check' },
    ],
    procedure: [
      'Inscribed vs central: record three positions of P on the major arc, then one on the minor arc.',
      'Cyclic quadrilateral: record a "fat" and a "thin" quadrilateral. Do both pairs still sum to 180°?',
      'Intersecting chords: record two crossings with very different AX values.',
      'Two tangents: record P near the circle (OP ≈ 6) and far away (OP ≈ 10). Compare PT with √(OP² − 25).',
    ],
    predict: 'If the central angle AOB is 100°, what will the inscribed angle APB be on the major arc? And on the minor arc?',
    source: () => lastRecord,
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
