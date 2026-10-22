import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { getLocale } from '../../../i18n/index.js';

const FONT = 'system-ui, -apple-system, Roboto, sans-serif';
const D2R = Math.PI / 180;
const LINE = '#e2e8f0';
const HI = ['#f59e0b', '#38bdf8'];                 // highlighted pair colours
const TRI_COL = ['#ef4444', '#a78bfa', '#f472b6'];  // A, B, C
const DIM = 'rgba(148,163,184,0.25)';

// Angle numbering at a transversal (math orientation, counter-clockwise):
// upper crossing: 1 upper-right, 2 upper-left, 3 lower-left, 4 lower-right; lower crossing: 5..8 likewise.
// Angles 1,3,5,7 equal φ; angles 2,4,6,8 equal 180° − φ.
const PAIRS = {
  corresponding: { pairs: [[1, 5], [2, 6], [3, 7], [4, 8]], equal: true, en: 'Corresponding angles', id: 'Sudut sehadap' },
  altInt: { pairs: [[3, 5], [4, 6]], equal: true, en: 'Alternate interior angles', id: 'Sudut dalam berseberangan' },
  altExt: { pairs: [[1, 7], [2, 8]], equal: true, en: 'Alternate exterior angles', id: 'Sudut luar berseberangan' },
  coInt: { pairs: [[3, 6], [4, 5]], equal: false, en: 'Co-interior angles', id: 'Sudut dalam sepihak' },
  vertical: { pairs: [[1, 3], [2, 4], [5, 7], [6, 8]], equal: true, en: 'Vertical angles', id: 'Sudut bertolak belakang' },
  linear: { pairs: [[1, 2], [2, 3], [3, 4], [4, 1], [5, 6], [6, 7], [7, 8], [8, 5]], equal: false, en: 'Angles on a straight line', id: 'Sudut berpelurus' },
};
// Which named relationship links two angle numbers (first match wins).
export function relationBetween(a, b) {
  for (const [key, rel] of Object.entries(PAIRS)) {
    if (rel.pairs.some(([p, q]) => (p === a && q === b) || (p === b && q === a))) return key;
  }
  return null;
}
export function angleValue(n, phi) { return n % 2 === 1 ? phi : 180 - phi; }

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 22);
  const norm360 = (a) => ((a % 360) + 360) % 360;

  const state = {
    mode: 'parallel',           // parallel | intersect | triangle | quiz
    phi: 62,                    // transversal angle with the parallel lines (deg, 20..160)
    rel: 'corresponding', pairIdx: 0,
    l1: 0, l2: 58,              // intersecting lines directions (deg)
    tri: { A: { x: 0.28, y: 0.72 }, B: { x: 0.78, y: 0.72 }, C: { x: 0.45, y: 0.3 } },  // fractions of the canvas
    tear: 0, tearTarget: 0,
    quiz: null, quizMsg: null,
  };

  // ---- helpers -------------------------------------------------------------
  // Direction (math convention, degrees CCW, y up) → canvas unit vector.
  const dir = (deg) => ({ x: Math.cos(deg * D2R), y: -Math.sin(deg * D2R) });
  const drawLine = (ctx, p, deg, len, color = LINE, width = 2) => {
    const d = dir(deg);
    ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(p.x - d.x * len, p.y - d.y * len); ctx.lineTo(p.x + d.x * len, p.y + d.y * len); ctx.stroke();
  };
  // Wedge at p from direction a0 sweeping CCW (math) by sweep degrees.
  function wedge(ctx, p, a0, sweep, r, fill, stroke) {
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, r, -a0 * D2R, -(a0 + sweep) * D2R, true);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
  }
  function labelAt(ctx, p, deg, dist, txt, color, size, bold = true) {
    const d = dir(deg);
    ctx.font = `${bold ? 'bold ' : ''}${size}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = color; ctx.fillText(txt, p.x + d.x * dist, p.y + d.y * dist);
  }
  function banner(ctx, lines, colors) {
    const W = cv.width, f = fontPx(0.019), lh = f * 1.4;
    ctx.fillStyle = 'rgba(15,23,42,0.86)';
    ctx.beginPath(); ctx.roundRect(W * 0.01, 6, W * 0.98, lh * lines.length + f * 0.6, 8); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    lines.forEach((ln, i) => {
      ctx.font = `${i === 0 ? 'bold ' : ''}${i === 0 ? f : fontPx(0.016)}px ${FONT}`; ctx.fillStyle = colors[i] || '#e2e8f0';
      ctx.fillText(ln, W * 0.025, 6 + f * 0.3 + lh * (i + 0.5));
    });
  }

  // ---- parallel lines -------------------------------------------------------
  function parallelGeom() {
    const W = cv.width, H = cv.height;
    const yA = H * 0.42, yB = H * 0.78, C = { x: W * 0.5, y: (yA + yB) / 2 };
    const d = dir(state.phi);
    // transversal through C: points on each line
    const tA = (yA - C.y) / d.y, tB = (yB - C.y) / d.y;
    const P = [{ x: C.x + d.x * tA, y: yA }, { x: C.x + d.x * tB, y: yB }];
    // handle above the upper line, but never beyond the canvas edge for shallow angles
    const handleT = Math.min((H * 0.2 - C.y) / d.y, (W * 0.46) / Math.max(Math.abs(d.x), 1e-9));
    const handle = { x: C.x + d.x * handleT, y: C.y + d.y * handleT };
    // the transversal must reach past both parallel lines whatever its angle
    const len = Math.min(W * 0.48, (H * 0.3) / Math.max(Math.abs(d.y), 0.05));
    return { yA, yB, C, P, handle, len };
  }
  // region start angle and sweep for angle number n at its crossing
  function regionOf(n) {
    const k = (n - 1) % 4, phi = state.phi;
    return [[0, phi], [phi, 180 - phi], [180, phi], [180 + phi, 180 - phi]][k];
  }
  function drawParallel(ctx, opts = {}) {
    const W = cv.width, H = cv.height;
    const G = parallelGeom();
    const f = fontPx(0.018);
    const r = clamp(W * 0.055, 18, 60);
    const hiSet = opts.highlight || new Map();     // angle number → colour
    const show = opts.show || null;                // set of angle numbers whose value is shown (quiz); null = all
    const hidden = opts.hidden || new Set();
    // parallel lines + arrows
    for (const y of [G.yA, G.yB]) {
      drawLine(ctx, { x: W / 2, y }, 0, W * 0.46);
      ctx.fillStyle = LINE; ctx.beginPath(); ctx.moveTo(W * 0.9, y); ctx.lineTo(W * 0.9 - 10, y - 5); ctx.lineTo(W * 0.9 - 10, y + 5); ctx.closePath(); ctx.fill();
    }
    drawLine(ctx, G.C, state.phi, G.len, '#fbbf24', 2);
    // the eight angles
    for (let n = 1; n <= 8; n++) {
      const p = G.P[n <= 4 ? 0 : 1];
      const [a0, sw] = regionOf(n);
      const col = hiSet.get(n);
      const isHidden = hidden.has(n);
      wedge(ctx, p, a0, sw, col ? r : r * 0.8, col ? col + 'aa' : DIM, col ? col : null);
      const mid = a0 + sw / 2;
      const val = angleValue(n, state.phi);
      let txt = `∠${n}`;
      if (isHidden) txt = `∠${n} = ?`;
      else if (!show || show.has(n)) txt += ` = ${val.toFixed(0)}°`;
      labelAt(ctx, p, mid, r * 1.45 + f * 0.6, txt, col || (isHidden ? '#f87171' : '#cbd5e1'), col || isHidden ? f : fontPx(0.015), !!col || isHidden);
    }
    // handle on the transversal
    if (!opts.noHandle) {
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(G.handle.x, G.handle.y, 9, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fontPx(0.013)}px ${FONT}`; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText(T('arrows mark the two parallel lines · drag the yellow dot to turn the transversal', 'tanda panah menandai dua garis sejajar · seret titik kuning untuk memutar transversal'), W - 8, H - 6);
  }
  function parallelBanner(ctx) {
    const rel = PAIRS[state.rel];
    const pr = rel.pairs[state.pairIdx % rel.pairs.length];
    const v1 = angleValue(pr[0], state.phi), v2 = angleValue(pr[1], state.phi);
    const name = T(rel.en, rel.id);
    const head = rel.equal
      ? T(`${name} are equal: ∠${pr[0]} = ∠${pr[1]} = ${v1.toFixed(0)}°`, `${name} sama besar: ∠${pr[0]} = ∠${pr[1]} = ${v1.toFixed(0)}°`)
      : T(`${name} add up to 180°: ∠${pr[0]} + ∠${pr[1]} = ${v1.toFixed(0)}° + ${v2.toFixed(0)}° = 180°`, `${name} berjumlah 180°: ∠${pr[0]} + ∠${pr[1]} = ${v1.toFixed(0)}° + ${v2.toFixed(0)}° = 180°`);
    const sub = T(`Transversal angle φ = ${state.phi.toFixed(0)}°. Odd-numbered angles are all ${state.phi.toFixed(0)}°, even-numbered angles are all ${(180 - state.phi).toFixed(0)}°.`,
      `Sudut transversal φ = ${state.phi.toFixed(0)}°. Sudut bernomor ganjil semuanya ${state.phi.toFixed(0)}°, sudut bernomor genap semuanya ${(180 - state.phi).toFixed(0)}°.`);
    banner(ctx, [head, sub], [rel.equal ? '#4ade80' : '#fbbf24', '#cbd5e1']);
    return new Map([[pr[0], HI[0]], [pr[1], HI[1]]]);
  }

  // ---- intersecting lines ----------------------------------------------------
  function intersectGeom() {
    const W = cv.width, H = cv.height;
    const C = { x: W / 2, y: H * 0.58 }, len = Math.min(W, H) * 0.42;
    const d1 = dir(state.l1), d2 = dir(state.l2);
    return { C, len, h1: { x: C.x + d1.x * len, y: C.y + d1.y * len }, h2: { x: C.x + d2.x * len, y: C.y + d2.y * len } };
  }
  function intersectAngles() {
    const delta = norm360(state.l2 - state.l1) % 180 || 0.0001;
    // regions CCW from line 1: a (δ), b (180−δ), c (δ), d (180−δ)
    return [[state.l1, delta], [state.l1 + delta, 180 - delta], [state.l1 + 180, delta], [state.l1 + 180 + delta, 180 - delta]];
  }
  function drawIntersect(ctx, opts = {}) {
    const W = cv.width, H = cv.height;
    const G = intersectGeom();
    const regions = intersectAngles();
    const names = ['a', 'b', 'c', 'd'];
    const r = clamp(W * 0.07, 22, 70), f = fontPx(0.02);
    drawLine(ctx, G.C, state.l1, G.len, LINE, 2.5);
    drawLine(ctx, G.C, state.l2, G.len, '#fbbf24', 2.5);
    const cols = ['#ef4444', '#38bdf8', '#ef4444', '#38bdf8'];
    regions.forEach(([a0, sw], i) => {
      const hidden = opts.hidden && opts.hidden.has(i);
      wedge(ctx, G.C, a0, sw, r * (i % 2 ? 0.8 : 1), cols[i] + '66', cols[i]);
      const txt = hidden ? `${names[i]} = ?` : (!opts.show || opts.show.has(i)) ? `${names[i]} = ${sw.toFixed(0)}°` : names[i];
      labelAt(ctx, G.C, a0 + sw / 2, r * 1.35 + f, txt, hidden ? '#f87171' : cols[i], f);
    });
    if (!opts.noHandle) {
      for (const [h, c] of [[G.h1, LINE], [G.h2, '#fbbf24']]) {
        ctx.fillStyle = c; ctx.beginPath(); ctx.arc(h.x, h.y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 2; ctx.stroke();
      }
    }
    if (!opts.quiet) {
      const d = regions[0][1];
      banner(ctx, [
        T(`Vertical angles are equal: a = c = ${d.toFixed(0)}° and b = d = ${(180 - d).toFixed(0)}°`, `Sudut bertolak belakang sama besar: a = c = ${d.toFixed(0)}° dan b = d = ${(180 - d).toFixed(0)}°`),
        T(`Angles on a straight line add to 180°: a + b = ${d.toFixed(0)}° + ${(180 - d).toFixed(0)}° = 180°`, `Sudut berpelurus berjumlah 180°: a + b = ${d.toFixed(0)}° + ${(180 - d).toFixed(0)}° = 180°`),
      ], ['#4ade80', '#fbbf24']);
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fontPx(0.013)}px ${FONT}`; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
      ctx.fillText(T('drag the dots at the ends of the lines', 'seret titik di ujung garis'), W - 8, H - 6);
    }
  }

  // ---- triangle ------------------------------------------------------------------
  function triPts() {
    const W = cv.width, H = cv.height, t = state.tri;
    return [{ x: t.A.x * W, y: t.A.y * H }, { x: t.B.x * W, y: t.B.y * H }, { x: t.C.x * W, y: t.C.y * H }];
  }
  function triAngles(P) {
    const out = [];
    for (let i = 0; i < 3; i++) {
      const p = P[i], q = P[(i + 1) % 3], r = P[(i + 2) % 3];
      const a1 = Math.atan2(-(q.y - p.y), q.x - p.x) / D2R, a2 = Math.atan2(-(r.y - p.y), r.x - p.x) / D2R;
      let sweep = norm360(a2 - a1), start = a1;
      if (sweep > 180) { sweep = 360 - sweep; start = a2; }
      out.push({ start, sweep: Math.max(sweep, 0.01) });
    }
    return out;
  }
  function drawTriangle(ctx, opts = {}) {
    const W = cv.width, H = cv.height;
    const P = triPts();
    const ang = triAngles(P);
    const names = ['A', 'B', 'C'];
    const f = fontPx(0.02);
    const minSide = Math.min(...P.map((p, i) => Math.hypot(p.x - P[(i + 1) % 3].x, p.y - P[(i + 1) % 3].y)));
    const r = clamp(minSide * 0.3, 14, W * 0.07);
    // triangle
    ctx.fillStyle = 'rgba(56,189,248,0.08)'; ctx.strokeStyle = LINE; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.closePath(); ctx.fill(); ctx.stroke();
    const tear = state.tear;
    // baseline for the torn-off corners
    const base = { x: W * 0.5, y: H * 0.93 };
    if (tear > 0.01) {
      ctx.strokeStyle = 'rgba(226,232,240,' + (0.3 + 0.7 * tear) + ')'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(W * 0.2, base.y); ctx.lineTo(W * 0.8, base.y); ctx.stroke(); ctx.setLineDash([]);
    }
    let cum = 0;
    for (let i = 0; i < 3; i++) {
      const hidden = opts.hidden && opts.hidden.has(i);
      // original wedge stays faint; the moving copy carries the colour
      wedge(ctx, P[i], ang[i].start, ang[i].sweep, r, TRI_COL[i] + (tear > 0.5 ? '33' : '99'), TRI_COL[i]);
      const txt = hidden ? `${names[i]} = ?` : (!opts.show || opts.show.has(i)) ? `${names[i]} = ${ang[i].sweep.toFixed(0)}°` : names[i];
      labelAt(ctx, P[i], ang[i].start + ang[i].sweep / 2, r * 1.3 + f * 0.9, txt, hidden ? '#f87171' : TRI_COL[i], f);
      if (tear > 0.01) {
        // interpolate position and rotation toward the baseline
        const tgtStart = cum;
        let dRot = tgtStart - ang[i].start; dRot = ((dRot + 180) % 360 + 360) % 360 - 180;
        const px = P[i].x + (base.x - P[i].x) * tear, py = P[i].y + (base.y - P[i].y) * tear;
        const st = ang[i].start + dRot * tear;
        wedge(ctx, { x: px, y: py }, st, ang[i].sweep, r * (1 + 0.3 * tear), TRI_COL[i] + 'bb', TRI_COL[i]);
        if (tear > 0.95) labelAt(ctx, base, st + ang[i].sweep / 2, r * 1.3 * 0.6, ang[i].sweep.toFixed(0) + '°', '#fff', fontPx(0.014));
      }
      cum += ang[i].sweep;
    }
    // vertex handles
    if (!opts.noHandle) P.forEach((p, i) => { ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = TRI_COL[i]; ctx.lineWidth = 2; ctx.stroke(); });
    if (!opts.quiet) {
      const s = ang.map((a) => a.sweep);
      banner(ctx, [
        T(`∠A + ∠B + ∠C = ${s[0].toFixed(0)}° + ${s[1].toFixed(0)}° + ${s[2].toFixed(0)}° = ${(s[0] + s[1] + s[2]).toFixed(0)}°`, `∠A + ∠B + ∠C = ${s[0].toFixed(0)}° + ${s[1].toFixed(0)}° + ${s[2].toFixed(0)}° = ${(s[0] + s[1] + s[2]).toFixed(0)}°`),
        tear > 0.95
          ? T('The three corners fit together exactly along a straight line: a straight angle is 180°.', 'Ketiga sudut tersusun tepat sepanjang garis lurus: sudut lurus adalah 180°.')
          : T('Drag the vertices, then press "Tear off corners" to line the three angles up.', 'Seret titik sudut, lalu tekan "Sobek sudut" untuk menyusun ketiga sudut berjajar.'),
      ], ['#4ade80', '#cbd5e1']);
    }
  }

  // ---- quiz ----------------------------------------------------------------------
  function newQuiz() {
    const kinds = ['parallel', 'parallel', 'intersect', 'triangle'];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const q = { kind, result: null };
    if (kind === 'parallel') {
      state.phi = Math.random() < 0.5 ? 25 + Math.floor(Math.random() * 50) : 105 + Math.floor(Math.random() * 50);
      q.known = 1 + Math.floor(Math.random() * 8);
      do { q.unknown = 1 + Math.floor(Math.random() * 8); } while (q.unknown === q.known);
      q.answer = angleValue(q.unknown, state.phi);
      const rel = relationBetween(q.known, q.unknown);
      q.rule = rel ? T(PAIRS[rel].en, PAIRS[rel].id) : T('two steps (e.g. vertical then corresponding)', 'dua langkah (misalnya bertolak belakang lalu sehadap)');
      q.equal = angleValue(q.known, state.phi) === q.answer;
      q.text = T(`Lines are parallel. ∠${q.known} = ${angleValue(q.known, state.phi)}°. Find ∠${q.unknown}.`, `Garis-garis sejajar. ∠${q.known} = ${angleValue(q.known, state.phi)}°. Tentukan ∠${q.unknown}.`);
    } else if (kind === 'intersect') {
      state.l1 = Math.floor(Math.random() * 30) - 15;
      state.l2 = state.l1 + 25 + Math.floor(Math.random() * 130);
      q.known = Math.floor(Math.random() * 4);
      do { q.unknown = Math.floor(Math.random() * 4); } while (q.unknown === q.known);
      const reg = intersectAngles();
      q.answer = Math.round(reg[q.unknown][1]);
      q.equal = (q.known % 2) === (q.unknown % 2);
      q.rule = q.equal ? T('Vertical angles', 'Sudut bertolak belakang') : T('Angles on a straight line', 'Sudut berpelurus');
      const nm = ['a', 'b', 'c', 'd'];
      q.text = T(`Two lines cross. ${nm[q.known]} = ${Math.round(reg[q.known][1])}°. Find ${nm[q.unknown]}.`, `Dua garis berpotongan. ${nm[q.known]} = ${Math.round(reg[q.known][1])}°. Tentukan ${nm[q.unknown]}.`);
    } else {
      // random triangle with whole-degree angles: place it from two angles
      const a = 30 + Math.floor(Math.random() * 60), b = 30 + Math.floor(Math.random() * Math.min(60, 150 - a - 20));
      const c = 180 - a - b;
      // build the triangle in abstract units (y up), then scale it to fit the canvas below the banner
      const W = cv.width, H = cv.height;
      const AC = Math.sin(b * D2R) / Math.max(Math.sin(c * D2R), 0.05);
      const pts = [[0, 0], [1, 0], [AC * Math.cos(a * D2R), AC * Math.sin(a * D2R)]];
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      const bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
      const sc = Math.min(W * 0.76 / Math.max(bw, 1e-6), H * 0.6 / Math.max(bh, 1e-6));
      const ox = (W - bw * sc) / 2 - Math.min(...xs) * sc, oy = H * 0.84;
      const toFrac = ([x, y]) => ({ x: (ox + x * sc) / W, y: (oy - y * sc) / H });
      state.tri = { A: toFrac(pts[0]), B: toFrac(pts[1]), C: toFrac(pts[2]) };
      state.tear = 0; state.tearTarget = 0;
      q.unknown = Math.floor(Math.random() * 3);
      const P = triPts(); const ang = triAngles(P);
      q.answer = Math.round(ang[q.unknown].sweep);
      q.rule = T('Angles of a triangle add to 180°', 'Jumlah sudut segitiga 180°');
      const nm = ['A', 'B', 'C'];
      const others = [0, 1, 2].filter((i) => i !== q.unknown);
      q.text = T(`Triangle: ∠${nm[others[0]]} = ${Math.round(ang[others[0]].sweep)}°, ∠${nm[others[1]]} = ${Math.round(ang[others[1]].sweep)}°. Find ∠${nm[q.unknown]}.`, `Segitiga: ∠${nm[others[0]]} = ${Math.round(ang[others[0]].sweep)}°, ∠${nm[others[1]]} = ${Math.round(ang[others[1]].sweep)}°. Tentukan ∠${nm[q.unknown]}.`);
    }
    state.quiz = q;
    answerInput.value = '';
  }
  function checkQuiz() {
    const q = state.quiz; if (!q) return;
    const v = Number(answerInput.value);
    if (!Number.isFinite(v) || answerInput.value === '') { q.result = 'empty'; return; }
    q.result = Math.abs(v - q.answer) <= 0.5 ? 'right' : 'wrong';
    q.tries = (q.tries || 0) + 1;
    if (q.result === 'right' && q.kind === 'triangle') state.tearTarget = 1;
  }
  function drawQuiz(ctx) {
    const q = state.quiz;
    if (!q) { newQuiz(); return; }
    const hidden = new Set([q.unknown]);
    const show = new Set(q.kind === 'triangle' ? [0, 1, 2].filter((i) => i !== q.unknown) : [q.known]);
    if (q.kind === 'parallel') drawParallel(ctx, { show, hidden, noHandle: true, highlight: new Map([[q.known, HI[0]], [q.unknown, '#f87171']]) });
    else if (q.kind === 'intersect') drawIntersect(ctx, { show, hidden, noHandle: true, quiet: true });
    else drawTriangle(ctx, { show, hidden, noHandle: true, quiet: true });
    const lines = [q.text], cols = ['#e2e8f0'];
    if (q.result === 'right') {
      lines.push(T(`Correct! ${q.answer}°. Rule: ${q.rule}${q.equal === false ? ' (add to 180°)' : q.equal === true ? ' (equal)' : ''}.`, `Benar! ${q.answer}°. Aturan: ${q.rule}${q.equal === false ? ' (berjumlah 180°)' : q.equal === true ? ' (sama besar)' : ''}.`));
      cols.push('#4ade80');
    } else if (q.result === 'wrong') {
      lines.push(q.tries >= 2
        ? T(`Not quite. The answer is ${q.answer}°. Rule: ${q.rule}.`, `Belum tepat. Jawabannya ${q.answer}°. Aturan: ${q.rule}.`)
        : T(`Not quite. Hint: ${q.rule}${q.equal === false ? ' add up to 180°' : q.equal === true ? ' are equal' : ''}. Try again.`, `Belum tepat. Petunjuk: ${q.rule}${q.equal === false ? ' berjumlah 180°' : q.equal === true ? ' sama besar' : ''}. Coba lagi.`));
      cols.push('#f87171');
    } else if (q.result === 'empty') {
      lines.push(T('Type a number of degrees in the box below, then press Check.', 'Ketik besar sudut dalam derajat di kotak bawah, lalu tekan Periksa.')); cols.push('#fbbf24');
    } else {
      lines.push(T('Type your answer below and press Check.', 'Ketik jawabanmu di bawah dan tekan Periksa.')); cols.push('#cbd5e1');
    }
    banner(ctx, lines, cols);
  }

  // ---- main draw ----------------------------------------------------------------------
  function step(dt) {
    const k = 1 - Math.exp(-4 * dt);
    state.tear += (state.tearTarget - state.tear) * k;
    if (Math.abs(state.tear - state.tearTarget) < 0.005) state.tear = state.tearTarget;
  }
  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    ctx.setLineDash([]);
    if (state.mode === 'parallel') { const hi = parallelBanner(ctx); drawParallel(ctx, { highlight: hi }); }
    else if (state.mode === 'intersect') drawIntersect(ctx);
    else if (state.mode === 'triangle') drawTriangle(ctx);
    else drawQuiz(ctx);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- dragging ------------------------------------------------------------------------
  function handles() {
    if (state.mode === 'parallel') { const G = parallelGeom(); return [{ id: 'phi', x: G.handle.x, y: G.handle.y, label: `Transversal handle, angle ${state.phi.toFixed(0)} degrees (arrow keys turn it)` }]; }
    if (state.mode === 'intersect') { const G = intersectGeom(); return [{ id: 'l1', x: G.h1.x, y: G.h1.y, label: 'Line 1 end (drag to turn)' }, { id: 'l2', x: G.h2.x, y: G.h2.y, label: 'Line 2 end (drag to turn)' }]; }
    if (state.mode === 'triangle') return triPts().map((p, i) => ({ id: ['A', 'B', 'C'][i], x: p.x, y: p.y, label: `Vertex ${['A', 'B', 'C'][i]} (drag to move)` }));
    return [];
  }
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) { for (const h of handles()) if (Math.hypot(h.x - x, h.y - y) < 20) return h.id; return null; },
    onDrag(id, x, y) {
      if (id === 'phi') {
        const C = parallelGeom().C;
        let a = norm360(Math.atan2(-(y - C.y), x - C.x) / D2R);
        if (a > 180) a -= 180;                       // the handle sits on the upper half
        state.phi = Math.round(clamp(a, 20, 160));   // keeps the far crossing and its labels on the canvas
      } else if (id === 'l1' || id === 'l2') {
        const C = intersectGeom().C;
        const a = Math.round(Math.atan2(-(y - C.y), x - C.x) / D2R);
        if (id === 'l1') state.l1 = a; else state.l2 = a;
        if (norm360(state.l2 - state.l1) % 180 < 5 || norm360(state.l2 - state.l1) % 180 > 175) {
          // keep the lines from collapsing onto each other
          if (id === 'l2') state.l2 = state.l1 + (norm360(state.l2 - state.l1) % 180 < 90 ? 5 : 175); else state.l1 = state.l2 - (norm360(state.l2 - state.l1) % 180 < 90 ? 5 : 175);
        }
      } else if (state.tri[id]) {
        state.tri[id] = { x: clamp(x / cv.width, 0.04, 0.96), y: clamp(y / cv.height, 0.2, 0.86) };
        if (state.tearTarget) state.tearTarget = 0;
      }
    },
    handles,
    keyStep: 6,
    cursor: 'default',
    hoverCursor: 'grab',
  });

  // ---- controls ---------------------------------------------------------------------------
  const modeSel = select({
    label: T('Mode', 'Mode'), key: 'mode', value: 'parallel',
    options: [
      { value: 'parallel', label: T('Parallel lines and a transversal', 'Garis sejajar dan transversal') },
      { value: 'intersect', label: T('Two crossing lines', 'Dua garis berpotongan') },
      { value: 'triangle', label: T('Triangle: angles add to 180°', 'Segitiga: jumlah sudut 180°') },
      { value: 'quiz', label: T('Quiz: find the unknown angle', 'Kuis: cari sudut yang belum diketahui') },
    ],
    onChange: (v) => { state.mode = v; if (v === 'quiz') newQuiz(); if (v !== 'quiz') { state.tearTarget = 0; } syncVisibility(); },
  });
  const relSel = select({
    label: T('Highlight pair', 'Soroti pasangan'), key: 'pair', value: 'corresponding',
    options: [
      { value: 'corresponding', label: T('Corresponding (equal)', 'Sehadap (sama besar)') },
      { value: 'altInt', label: T('Alternate interior (equal)', 'Dalam berseberangan (sama besar)') },
      { value: 'altExt', label: T('Alternate exterior (equal)', 'Luar berseberangan (sama besar)') },
      { value: 'coInt', label: T('Co-interior (add to 180°)', 'Dalam sepihak (berjumlah 180°)') },
      { value: 'vertical', label: T('Vertical (equal)', 'Bertolak belakang (sama besar)') },
      { value: 'linear', label: T('Straight line (add to 180°)', 'Berpelurus (berjumlah 180°)') },
    ],
    onChange: (v) => { state.rel = v; state.pairIdx = 0; },
  });
  const nextPair = button({ label: T('Other pair', 'Pasangan lain'), onClick: () => { state.pairIdx = (state.pairIdx + 1) % PAIRS[state.rel].pairs.length; } });
  const tearBtn = button({ label: T('Tear off corners / put back', 'Sobek sudut / pasang kembali'), primary: true, onClick: () => { state.tearTarget = state.tearTarget ? 0 : 1; } });
  const resetTri = button({ label: T('Reset triangle', 'Atur ulang segitiga'), onClick: () => { state.tri = { A: { x: 0.28, y: 0.72 }, B: { x: 0.78, y: 0.72 }, C: { x: 0.45, y: 0.3 } }; state.tearTarget = 0; } });
  const answerInput = document.createElement('input');
  answerInput.type = 'number'; answerInput.min = '0'; answerInput.max = '180'; answerInput.step = '1';
  answerInput.placeholder = T('degrees', 'derajat'); answerInput.setAttribute('aria-label', T('Your answer in degrees', 'Jawabanmu dalam derajat'));
  answerInput.className = 'btn'; answerInput.style.width = '7em';
  answerInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkQuiz(); });
  const checkBtn = button({ label: T('Check', 'Periksa'), primary: true, onClick: checkQuiz });
  const newBtn = button({ label: T('New question', 'Soal baru'), onClick: newQuiz });

  const rowParallel = row(relSel, nextPair);
  const rowTri = row(tearBtn, resetTri);
  const rowQuiz = row(answerInput, checkBtn, newBtn);
  function syncVisibility() {
    rowParallel.style.display = state.mode === 'parallel' ? '' : 'none';
    rowTri.style.display = state.mode === 'triangle' ? '' : 'none';
    rowQuiz.style.display = state.mode === 'quiz' ? '' : 'none';
  }
  syncVisibility();
  ctrlPanel.append(modeSel.el, rowParallel, rowTri, rowQuiz);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
