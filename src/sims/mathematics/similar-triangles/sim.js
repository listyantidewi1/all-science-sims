import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// World is measured in grid units; the canvas shows WU × HU units (16:9).
const WU = 24, HU = 13.5;
const ANG_TOL = 1.5;   // degrees
const LEN_TOL = 0.02;  // relative
const SIDE_COL = ['#f59e0b', '#22c55e', '#38bdf8'];   // AB/DE, BC/EF, CA/FD
const ANG_COL = ['#ef4444', '#a78bfa', '#f472b6'];    // A/D, B/E, C/F
const FONT = 'system-ui, -apple-system, Roboto, sans-serif';

const PRESETS = {
  congruent: { A: [3, 10], B: [9, 10], C: [5, 6], D: [14, 10], E: [20, 10], F: [16, 6] },
  similar: { A: [2, 9], B: [5, 9], C: [3, 7], D: [12, 11], E: [18, 11], F: [14, 7] },
  notSimilar: { A: [2.5, 10], B: [8, 10], C: [4, 5.5], D: [13, 10.5], E: [21, 10.5], F: [15, 7.5] },
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
  const u = () => cv.width / WU;   // px per unit

  const state = {
    mode: 'free',
    snap: true,
    pts: {},                       // A..F → {x, y} in units
    shadow: { h: 1.5, s: 2, S: 8 }, // metres: stick height, stick shadow, tree shadow
  };
  const GROUND = 11.6, STICK_X = 8, TREE_X = 21, MAX_H = 10;

  function applyPreset(p) {
    for (const k of Object.keys(p)) state.pts[k] = { x: p[k][0], y: p[k][1] };
  }
  applyPreset(PRESETS.similar);

  // ---- geometry -------------------------------------------------------
  const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
  function angleAt(P, Q, R) { // angle at P between PQ and PR, degrees
    const a = dist(Q, R), b = dist(P, R), c = dist(P, Q);
    if (b < 1e-9 || c < 1e-9) return 0;
    const cosv = clamp((b * b + c * c - a * a) / (2 * b * c), -1, 1);
    return Math.acos(cosv) * 180 / Math.PI;
  }
  function triangles() {
    if (state.mode === 'shadow') {
      const { h, s, S } = state.shadow;
      const H = s > 1e-9 ? h * S / s : 0;
      return {
        t1: [{ x: STICK_X - s, y: GROUND }, { x: STICK_X, y: GROUND }, { x: STICK_X, y: GROUND - h }],
        t2: [{ x: TREE_X - S, y: GROUND }, { x: TREE_X, y: GROUND }, { x: TREE_X, y: GROUND - H }],
        H,
      };
    }
    const p = state.pts;
    return { t1: [p.A, p.B, p.C], t2: [p.D, p.E, p.F], H: null };
  }
  const eqLen = (x, y) => Math.abs(x - y) <= LEN_TOL * Math.max(x, y) + 0.015;
  const eqAng = (x, y) => Math.abs(x - y) <= ANG_TOL;

  function analyse() {
    const { t1, t2, H } = triangles();
    const [A, B, C] = t1, [D, E, F] = t2;
    const s1 = [dist(A, B), dist(B, C), dist(C, A)];   // AB, BC, CA
    const s2 = [dist(D, E), dist(E, F), dist(F, D)];   // DE, EF, FD
    const a1 = [angleAt(A, B, C), angleAt(B, A, C), angleAt(C, A, B)];
    const a2 = [angleAt(D, E, F), angleAt(E, D, F), angleAt(F, D, E)];
    const degenerate = Math.min(...s1, ...s2) < 0.3 || Math.min(...a1, ...a2) < 1.5;
    const ratios = s1.map((v, i) => (v > 1e-9 ? s2[i] / v : 0));
    const angEq = a1.map((v, i) => eqAng(v, a2[i]));
    const lenEq = s1.map((v, i) => eqLen(v, s2[i]));
    const rules = {
      AA: angEq.filter(Boolean).length >= 2,
      SSSr: Math.abs(ratios[0] - ratios[1]) <= LEN_TOL * ratios[0] + 0.005 && Math.abs(ratios[0] - ratios[2]) <= LEN_TOL * ratios[0] + 0.005 && Math.abs(ratios[1] - ratios[2]) <= LEN_TOL * ratios[1] + 0.005,
      SSS: lenEq[0] && lenEq[1] && lenEq[2],
      SAS: lenEq[0] && angEq[1] && lenEq[1],
      ASA: angEq[0] && lenEq[0] && angEq[1],
    };
    if (degenerate) for (const k in rules) rules[k] = false;
    const congruent = rules.SSS || rules.SAS || rules.ASA;
    const similar = rules.AA || rules.SSSr;
    const k = (ratios[0] + ratios[1] + ratios[2]) / 3;
    let verdict, reason;
    if (degenerate) { verdict = 'degenerate'; reason = ''; }
    else if (congruent) { verdict = 'congruent'; reason = rules.SSS ? 'SSS' : rules.SAS ? 'SAS' : 'ASA'; }
    else if (similar) { verdict = 'similar'; reason = rules.AA ? 'AA' : 'SSS'; }
    else { verdict = 'none'; reason = ''; }
    return { t1, t2, s1, s2, a1, a2, ratios, angEq, lenEq, rules, verdict, reason, k, H, degenerate };
  }

  // ---- drawing --------------------------------------------------------
  const toPx = (p) => ({ x: p.x * u(), y: p.y * u() });
  const fontPx = (f) => clamp(Math.round(cv.width * f), 9, 22);

  function drawGrid(ctx) {
    const s = u();
    ctx.lineWidth = 1;
    for (let i = 0; i <= WU; i++) {
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(148,163,184,0.22)' : 'rgba(148,163,184,0.09)';
      ctx.beginPath(); ctx.moveTo(i * s, 0); ctx.lineTo(i * s, cv.height); ctx.stroke();
    }
    for (let j = 0; j <= HU; j++) {
      ctx.strokeStyle = j % 5 === 0 ? 'rgba(148,163,184,0.22)' : 'rgba(148,163,184,0.09)';
      ctx.beginPath(); ctx.moveTo(0, j * s); ctx.lineTo(cv.width, j * s); ctx.stroke();
    }
  }

  function drawTriangle(ctx, tri, names, sides, angs, fill, unit) {
    const P = tri.map(toPx);
    const cx = (P[0].x + P[1].x + P[2].x) / 3, cy = (P[0].y + P[1].y + P[2].y) / 3;
    ctx.fillStyle = fill;
    ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.closePath(); ctx.fill();
    // Sides, colour-coded by correspondence.
    ctx.lineWidth = Math.max(2, u() * 0.09);
    ctx.font = `bold ${fontPx(0.016)}px ${FONT}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < 3; i++) {
      const p = P[i], q = P[(i + 1) % 3];
      ctx.strokeStyle = SIDE_COL[i];
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      let nx = mx - cx, ny = my - cy; const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
      const off = fontPx(0.016) * 1.1;
      ctx.fillStyle = SIDE_COL[i];
      ctx.fillText(sides[i].toFixed(2) + (unit ? ' ' + unit : ''), mx + nx * off, my + ny * off);
    }
    // Angle arcs + vertex names.
    for (let i = 0; i < 3; i++) {
      const p = P[i], q = P[(i + 1) % 3], r = P[(i + 2) % 3];
      const a1 = Math.atan2(q.y - p.y, q.x - p.x), a2 = Math.atan2(r.y - p.y, r.x - p.x);
      let d = a2 - a1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
      const rad = Math.min(u() * 0.9, Math.min(Math.hypot(q.x - p.x, q.y - p.y), Math.hypot(r.x - p.x, r.y - p.y)) * 0.35);
      ctx.strokeStyle = ANG_COL[i]; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(p.x, p.y, rad, a1, a2, d < 0); ctx.stroke();
      const mid = a1 + d / 2;
      ctx.fillStyle = ANG_COL[i];
      ctx.font = `${fontPx(0.015)}px ${FONT}`;
      ctx.fillText(angs[i].toFixed(0) + '°', p.x + Math.cos(mid) * (rad + fontPx(0.015) * 0.9), p.y + Math.sin(mid) * (rad + fontPx(0.015) * 0.9));
      // vertex
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(5, u() * 0.16), 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ANG_COL[i]; ctx.lineWidth = 2; ctx.stroke();
      let vx = p.x - cx, vy = p.y - cy; const vl = Math.hypot(vx, vy) || 1;
      ctx.font = `bold ${fontPx(0.02)}px ${FONT}`;
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(names[i], p.x + vx / vl * fontPx(0.02) * 1.2, p.y + vy / vl * fontPx(0.02) * 1.2);
    }
  }

  function drawShadowScene(ctx, R) {
    const s = u();
    const gy = GROUND * s;
    // sky gradient hint + ground
    ctx.fillStyle = '#14532d';
    ctx.fillRect(0, gy, cv.width, cv.height - gy);
    ctx.strokeStyle = '#86efac'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(cv.width, gy); ctx.stroke();
    // sun
    ctx.fillStyle = '#fde047';
    ctx.beginPath(); ctx.arc(cv.width * 0.93, s * 3.2, s * 0.7, 0, Math.PI * 2); ctx.fill();
    // shadows on the ground
    const { h, s: sh, S } = state.shadow;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect((STICK_X - sh) * s, gy - 3, sh * s, 6);
    ctx.fillRect((TREE_X - S) * s, gy - 3, S * s, 6);
    // stick
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = Math.max(4, s * 0.18); ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(STICK_X * s, gy); ctx.lineTo(STICK_X * s, gy - h * s); ctx.stroke();
    // tree
    const H = R.H;
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = Math.max(6, s * 0.3);
    ctx.beginPath(); ctx.moveTo(TREE_X * s, gy); ctx.lineTo(TREE_X * s, gy - H * s + s * 0.3); ctx.stroke();
    ctx.lineCap = 'butt';
    ctx.fillStyle = 'rgba(34,197,94,0.75)';
    const cr = clamp(H * s * 0.18, s * 0.4, s * 1.6);
    ctx.beginPath(); ctx.arc(TREE_X * s, gy - H * s + cr * 0.6, cr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(22,163,74,0.8)';
    ctx.beginPath(); ctx.arc(TREE_X * s - cr * 0.6, gy - H * s + cr * 1.1, cr * 0.75, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(TREE_X * s + cr * 0.6, gy - H * s + cr * 1.1, cr * 0.75, 0, Math.PI * 2); ctx.fill();
    // sun rays (hypotenuses), dashed and parallel
    ctx.setLineDash([6, 6]); ctx.strokeStyle = '#fde047'; ctx.lineWidth = 1.5;
    for (const [bx, top, tip] of [[STICK_X, h, sh], [TREE_X, H, S]]) {
      const x0 = (bx - tip) * s, y0 = gy, x1 = bx * s, y1 = gy - top * s;
      const dx = x1 - x0, dy = y1 - y0;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 + dx * 0.6, y1 + dy * 0.6); ctx.stroke();
    }
    ctx.setLineDash([]);
    // right-angle marks
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5;
    for (const bx of [STICK_X, TREE_X]) {
      const m = s * 0.3;
      ctx.beginPath(); ctx.moveTo(bx * s - m, gy); ctx.lineTo(bx * s - m, gy - m); ctx.lineTo(bx * s, gy - m); ctx.stroke();
    }
  }

  function drawPanel(ctx, R) {
    const W = cv.width;
    const f = fontPx(0.018), fs = fontPx(0.015);
    const lh = f * 1.35;
    const panelH = state.mode === 'shadow' ? lh * 3.3 : lh * 4.5;
    ctx.fillStyle = 'rgba(15,23,42,0.86)';
    ctx.beginPath(); ctx.roundRect(W * 0.01, 6, W * 0.98, panelH, 8); ctx.fill();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    let y = 6 + lh * 0.7;
    const x0 = W * 0.025;
    // headline
    const V = R.verdict;
    let head, color;
    if (V === 'congruent') { head = T(`Congruent (ABC ≅ DEF) by ${R.reason}: same shape and same size`, `Kongruen (ABC ≅ DEF) menurut ${R.reason === 'SSS' ? 'sisi-sisi-sisi' : R.reason === 'SAS' ? 'sisi-sudut-sisi' : 'sudut-sisi-sudut'}: bentuk dan ukuran sama`); color = '#4ade80'; }
    else if (V === 'similar') { head = T(`Similar (ABC ~ DEF) by ${R.reason === 'AA' ? 'AA' : 'SSS ratio'}, scale factor k = ${R.k.toFixed(2)}`, `Sebangun (ABC ~ DEF) menurut ${R.reason === 'AA' ? 'sudut-sudut' : 'perbandingan sisi-sisi-sisi'}, faktor skala k = ${R.k.toFixed(2)}`); color = '#facc15'; }
    else if (V === 'degenerate') { head = T('Drag the corners apart to make two real triangles', 'Seret titik sudut agar terbentuk dua segitiga sungguhan'); color = '#94a3b8'; }
    else { head = T('Not similar: matching angles differ and side ratios are not all equal', 'Tidak sebangun: sudut bersesuaian berbeda dan perbandingan sisi tidak semuanya sama'); color = '#f87171'; }
    ctx.fillStyle = color; ctx.font = `bold ${f}px ${FONT}`;
    ctx.fillText(head, x0, y);
    y += lh;
    ctx.font = `${fs}px ${FONT}`;
    if (state.mode === 'shadow') {
      const { h, s, S } = state.shadow;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(T(`Both triangles have a right angle and the same sun angle (${R.a1[0].toFixed(0)}°), so they are similar by AA.`, `Kedua segitiga memiliki sudut siku-siku dan sudut matahari yang sama (${R.a1[0].toFixed(0)}°), jadi sebangun menurut sudut-sudut.`), x0, y);
      y += lh;
      ctx.fillStyle = '#fde047';
      ctx.fillText(T(`H / S = h / s  →  H = h × S / s = ${h.toFixed(1)} × ${S.toFixed(1)} / ${s.toFixed(1)} = ${R.H.toFixed(2)} m`, `H / S = h / s  →  H = h × S / s = ${h.toFixed(1)} × ${S.toFixed(1)} / ${s.toFixed(1)} = ${R.H.toFixed(2)} m`), x0, y);
      return;
    }
    // ratios line
    const names = ['DE/AB', 'EF/BC', 'FD/CA'];
    let x = x0;
    ctx.fillStyle = '#cbd5e1'; ctx.fillText(T('Side ratios: ', 'Perbandingan sisi: '), x, y);
    x += ctx.measureText(T('Side ratios: ', 'Perbandingan sisi: ')).width;
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = SIDE_COL[i];
      const txt = `${names[i]} = ${R.s2[i].toFixed(2)}/${R.s1[i].toFixed(2)} = ${R.ratios[i].toFixed(2)}   `;
      ctx.fillText(txt, x, y); x += ctx.measureText(txt).width;
    }
    y += lh; x = x0;
    ctx.fillStyle = '#cbd5e1';
    const angTxt = T('Angles: ', 'Sudut: ');
    ctx.fillText(angTxt, x, y); x += ctx.measureText(angTxt).width;
    const an = [['A', 'D'], ['B', 'E'], ['C', 'F']];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = ANG_COL[i];
      const txt = `∠${an[i][0]}=${R.a1[i].toFixed(0)}° ∠${an[i][1]}=${R.a2[i].toFixed(0)}°  `;
      ctx.fillText(txt, x, y); x += ctx.measureText(txt).width;
    }
    y += lh;
    // rule checklist
    x = x0;
    const items = [
      ['AA', T('AA (2 angles)', 'Sd-Sd (2 sudut)'), R.rules.AA],
      ['SSSr', T('SSS ratio', 'S-S-S perbandingan'), R.rules.SSSr],
      ['SSS', T('SSS ≅', 'S-S-S ≅'), R.rules.SSS],
      ['SAS', T('SAS ≅ (AB, ∠B, BC)', 'S-Sd-S ≅ (AB, ∠B, BC)'), R.rules.SAS],
      ['ASA', T('ASA ≅ (∠A, AB, ∠B)', 'Sd-S-Sd ≅ (∠A, AB, ∠B)'), R.rules.ASA],
    ];
    ctx.fillStyle = '#cbd5e1'; const lbl = T('Rules: ', 'Aturan: '); ctx.fillText(lbl, x, y); x += ctx.measureText(lbl).width;
    for (const [, name, ok] of items) {
      ctx.fillStyle = ok ? '#4ade80' : 'rgba(148,163,184,0.7)';
      const txt = `${ok ? '✓' : '✗'} ${name}   `;
      ctx.fillText(txt, x, y); x += ctx.measureText(txt).width;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    const R = analyse();
    if (state.mode === 'shadow') {
      drawShadowScene(ctx, R);
      drawTriangle(ctx, R.t1, ['A', 'B', 'C'], R.s1, R.a1, 'rgba(245,158,11,0.15)', 'm');
      drawTriangle(ctx, R.t2, ['D', 'E', 'F'], R.s2, R.a2, 'rgba(34,197,94,0.12)', 'm');
      // measurement labels
      ctx.font = `bold ${fontPx(0.018)}px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const s = u(), gy = GROUND * s;
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`h = ${state.shadow.h.toFixed(1)} m`, STICK_X * s + s * 1.4, gy - state.shadow.h * s / 2);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`s = ${state.shadow.s.toFixed(1)} m`, (STICK_X - state.shadow.s / 2) * s, gy + s * 0.7);
      ctx.fillText(`S = ${state.shadow.S.toFixed(1)} m`, (TREE_X - state.shadow.S / 2) * s, gy + s * 0.7);
      ctx.fillStyle = '#4ade80';
      ctx.fillText(`H = ${R.H.toFixed(2)} m`, TREE_X * s + s * 1.3, gy - R.H * s / 2);
      ctx.fillStyle = '#cbd5e1'; ctx.font = `${fontPx(0.014)}px ${FONT}`;
      ctx.fillText(T('drag the stick top and the two shadow tips', 'geser ujung tongkat dan kedua ujung bayangan'), W / 2, H - fontPx(0.014));
    } else {
      drawGrid(ctx);
      drawTriangle(ctx, R.t1, ['A', 'B', 'C'], R.s1, R.a1, 'rgba(56,189,248,0.12)', '');
      drawTriangle(ctx, R.t2, ['D', 'E', 'F'], R.s2, R.a2, 'rgba(167,139,250,0.12)', '');
      ctx.fillStyle = '#94a3b8'; ctx.font = `${fontPx(0.013)}px ${FONT}`; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
      ctx.fillText(T('1 grid square = 1 unit · A↔D, B↔E, C↔F', '1 kotak kisi = 1 satuan · A↔D, B↔E, C↔F'), W - 8, H - 6);
    }
    drawPanel(ctx, R);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- dragging -------------------------------------------------------
  const snapTo = (v, q) => Math.round(v / q) * q;
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const r = Math.max(14, u() * 0.45);
      for (const h of handles()) if (Math.hypot(h.x - x, h.y - y) < r) return h.id;
      return null;
    },
    onDrag(id, x, y) {
      const ux = x / u(), uy = y / u();
      if (state.mode === 'shadow') {
        const sh = state.shadow;
        if (id === 'h') {
          let h = clamp(GROUND - uy, 0.5, 4); h = snapTo(h, 0.1);
          sh.h = Math.min(h, snapTo(MAX_H * sh.s / sh.S, 0.1));
        } else if (id === 's') {
          let s = clamp(STICK_X - ux, 0.5, 6); s = snapTo(s, 0.1);
          sh.s = Math.max(s, Math.ceil(sh.h * sh.S / MAX_H * 10) / 10);
        } else if (id === 'S') {
          let S = clamp(TREE_X - ux, 1, 11); S = snapTo(S, 0.1);
          sh.S = Math.min(S, snapTo(MAX_H * sh.s / sh.h, 0.1));
        }
        return;
      }
      const p = state.pts[id];
      if (!p) return;
      let nx = clamp(ux, 0.5, WU - 0.5), ny = clamp(uy, 3, HU - 0.5);
      if (state.snap) { nx = snapTo(nx, 0.5); ny = snapTo(ny, 0.5); }
      p.x = nx; p.y = ny;
    },
    handles,
    keyStep: 16,
    cursor: 'default',
    hoverCursor: 'grab',
  });
  function handles() {
    const s = u();
    if (state.mode === 'shadow') {
      const { h, s: sh, S } = state.shadow;
      return [
        { id: 'h', x: STICK_X * s, y: (GROUND - h) * s, label: 'Stick top (drag up/down to change stick height h)' },
        { id: 's', x: (STICK_X - sh) * s, y: GROUND * s, label: 'Stick shadow tip (drag left/right to change s)' },
        { id: 'S', x: (TREE_X - S) * s, y: GROUND * s, label: 'Tree shadow tip (drag left/right to change S)' },
      ];
    }
    return Object.entries(state.pts).map(([id, p]) => ({ id, x: p.x * s, y: p.y * s, label: `Vertex ${id} (drag to move)` }));
  }

  // ---- controls -------------------------------------------------------
  const modeSel = select({
    label: 'Mode', key: 'mode', value: 'free',
    options: [
      { value: 'free', label: 'Free triangles ABC and DEF' },
      { value: 'shadow', label: 'Tree shadow (indirect measurement)' },
    ],
    onChange: (v) => { state.mode = v; },
  });
  const presetBtn = (label, p) => button({ label, onClick: () => { state.mode = 'free'; modeSel.value = 'free'; applyPreset(p); } });
  const b1 = presetBtn('Congruent', PRESETS.congruent);
  const b2 = presetBtn('Similar ×2', PRESETS.similar);
  const b3 = presetBtn('Not similar', PRESETS.notSimilar);
  const b4 = button({ label: 'Tree shadow', onClick: () => { state.mode = 'shadow'; modeSel.value = 'shadow'; state.shadow = { h: 1.5, s: 2, S: 8 }; } });
  const snapT = toggle({ label: 'Snap corners to half-unit grid', key: 'snap', value: true, onChange: (v) => { state.snap = v; } });
  ctrlPanel.append(modeSel.el, row(b1, b2, b3, b4), row(snapT));

  const lab = labPanel({
    title: 'Similar or congruent? Record ratios and angles',
    filename: 'similar-triangles-data.csv',
    columns: [
      { key: 'mode', label: 'Mode' },
      { key: 'AB', label: 'AB', format: (v) => v.toFixed(2) },
      { key: 'DE', label: 'DE', format: (v) => v.toFixed(2) },
      { key: 'r1', label: 'DE/AB', format: (v) => v.toFixed(2) },
      { key: 'BC', label: 'BC', format: (v) => v.toFixed(2) },
      { key: 'EF', label: 'EF', format: (v) => v.toFixed(2) },
      { key: 'r2', label: 'EF/BC', format: (v) => v.toFixed(2) },
      { key: 'CA', label: 'CA', format: (v) => v.toFixed(2) },
      { key: 'FD', label: 'FD', format: (v) => v.toFixed(2) },
      { key: 'r3', label: 'FD/CA', format: (v) => v.toFixed(2) },
      { key: 'angA', label: '∠A (°)', format: (v) => v.toFixed(1) },
      { key: 'angD', label: '∠D (°)', format: (v) => v.toFixed(1) },
      { key: 'angB', label: '∠B (°)', format: (v) => v.toFixed(1) },
      { key: 'angE', label: '∠E (°)', format: (v) => v.toFixed(1) },
      { key: 'verdict', label: 'Verdict' },
    ],
    procedure: [
      'Press "Similar ×2" and Record. Compare the three ratio columns and the matching angles.',
      'Drag D so that DE = 4.5 while keeping the triangle similar (watch the verdict). Record. What is k now?',
      'Press "Congruent" and Record. What are the ratios when triangles are congruent?',
      'Press "Not similar" and Record. Which ratios differ? Which angles differ?',
      'Open "Tree shadow" (here ABC is the stick triangle and DEF the tree triangle). Record three different stick heights; EF is the calculated tree height.',
    ],
    predict: 'If all three side ratios are equal, will the matching angles also be equal? What if only two ratios are equal?',
    source: () => {
      const R = analyse();
      if (R.degenerate) return null;
      const verdict = R.verdict === 'congruent' ? `congruent (${R.reason})` : R.verdict === 'similar' ? `similar (${R.reason === 'AA' ? 'AA' : 'SSS ratio'}, k=${R.k.toFixed(2)})` : 'not similar';
      return {
        mode: state.mode === 'shadow' ? 'tree shadow (m)' : 'free (units)',
        AB: R.s1[0], DE: R.s2[0], r1: R.ratios[0],
        BC: R.s1[1], EF: R.s2[1], r2: R.ratios[1],
        CA: R.s1[2], FD: R.s2[2], r3: R.ratios[2],
        angA: R.a1[0], angD: R.a2[0], angB: R.a1[1], angE: R.a2[1],
        verdict,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
