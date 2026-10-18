import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const D2R = Math.PI / 180;
const MAXSIDE = 12;
const SPECIAL = [
  { deg: 30, sin: '1/2', cos: '√3/2', tan: '√3/3' },
  { deg: 45, sin: '√2/2', cos: '√2/2', tan: '1' },
  { deg: 60, sin: '√3/2', cos: '1/2', tan: '√3' },
];
const fmt = (v, d = 3) => (Number.isFinite(v) ? v.toFixed(d) : '—');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const st = {
    mode: 'triangle',   // 'triangle' | 'tree'
    adj: 8, opp: 6,     // triangle legs (units)
    angle: 'A',         // which acute angle is θ: 'A' (bottom-left) or 'B' (top)
    snap: true,
    d: 20, elev: 35, eye: 1.6,   // clinometer: distance (m), angle of elevation (°), eye height (m)
  };
  let geo = {};   // screen geometry from the last draw

  // ---- maths -------------------------------------------------------------
  function tri() {
    const hyp = Math.hypot(st.adj, st.opp);
    const thetaA = Math.atan2(st.opp, st.adj);                 // angle at A
    const theta = st.angle === 'A' ? thetaA : Math.PI / 2 - thetaA;
    const opp = st.angle === 'A' ? st.opp : st.adj;
    const adj = st.angle === 'A' ? st.adj : st.opp;
    return { hyp, theta, deg: theta / D2R, opp, adj, sin: opp / hyp, cos: adj / hyp, tan: opp / adj };
  }
  function tree() {
    const th = st.elev * D2R;
    const rise = st.d * Math.tan(th);
    return { theta: th, deg: st.elev, opp: rise, adj: st.d, hyp: Math.hypot(st.d, rise), height: st.eye + rise, sin: Math.sin(th), cos: Math.cos(th), tan: Math.tan(th) };
  }
  const special = (deg) => SPECIAL.find((s) => Math.abs(s.deg - deg) < 0.05) || null;
  // Snap to 30°/45°/60° when within 2.5°. When `keepDeg` names a special angle the triangle was already at
  // (dragging A = resizing), stay on it so a fast drag of A does not fall off the special angle.
  function applySnap(keepDeg = null) {
    if (!st.snap) return;
    const deg = Math.atan2(st.opp, st.adj) / D2R;
    const sp = special(keepDeg) || SPECIAL.find((s) => Math.abs(deg - s.deg) < 2.5);
    if (sp) st.opp = clamp(st.adj * Math.tan(sp.deg * D2R), 0.5, MAXSIDE);
  }
  // Set the angle at A exactly: scale the horizontal leg instead of clipping the vertical one when it would leave [0.5, MAXSIDE].
  function setAngleA(degA) {
    const t = Math.tan(degA * D2R);
    let opp = st.adj * t;
    if (opp > MAXSIDE) { opp = MAXSIDE; st.adj = clamp(MAXSIDE / t, 0.5, MAXSIDE); }
    if (opp < 0.5) { opp = 0.5; st.adj = clamp(0.5 / t, 0.5, MAXSIDE); }
    st.opp = clamp(opp, 0.5, MAXSIDE);
    adjS.value = st.adj; oppS.value = st.opp;
  }
  function syncSliders() {
    adjS.value = st.adj; oppS.value = st.opp;
    thS.value = Math.round(Math.atan2(st.opp, st.adj) / D2R * 10) / 10;
  }

  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  const mono = (px) => `${Math.round(px)}px ui-monospace, Menlo, Consolas, monospace`;

  function label(ctx, txt, x, y, color, fs, align = 'center') {
    ctx.font = font(fs, true); ctx.textAlign = align; ctx.textBaseline = 'middle';
    const w = ctx.measureText(txt).width + 10;
    const lx = align === 'center' ? x - w / 2 : align === 'left' ? x : x - w;
    ctx.fillStyle = 'rgba(11,18,32,0.85)'; ctx.beginPath(); ctx.roundRect(lx, y - fs * 0.8, w, fs * 1.6, 5); ctx.fill();
    ctx.fillStyle = color; ctx.fillText(txt, x, y);
    ctx.textBaseline = 'alphabetic';
  }
  function angleArc(ctx, x, y, r, a0, a1, color, txt, fs, ccw = true) {
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, r, a0, a1, ccw); ctx.stroke();
    ctx.fillStyle = color.replace(')', ',0.25)').replace('rgb(', 'rgba(');
    ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1, ccw); ctx.closePath(); ctx.fill();
    const am = (a0 + a1) / 2;
    ctx.fillStyle = color; ctx.font = font(fs, true); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(txt, x + Math.cos(am) * (r + fs * 1.1), y + Math.sin(am) * (r + fs * 1.1));
    ctx.textBaseline = 'alphabetic';
  }

  function drawTriangle(ctx, W, H) {
    const fs = Math.max(9, Math.min(13, W * 0.016));
    const s = Math.min((W * 0.56) / (MAXSIDE + 1), (H * 0.78) / (MAXSIDE + 1));
    const Ax = W * 0.05 + s * (MAXSIDE - st.adj), Ay = H * 0.86;    // A slides horizontally, C fixed
    const Cx = W * 0.05 + s * MAXSIDE, Cy = Ay;
    const Bx = Cx, By = Ay - s * st.opp;
    geo = { s, Ax, Ay, Bx, By, Cx, Cy };
    const t = tri();
    const atA = st.angle === 'A';
    // sides: colours by role
    const cOpp = '#f472b6', cAdj = '#38bdf8', cHyp = '#fbbf24';
    const colBC = atA ? cOpp : cAdj, colAC = atA ? cAdj : cOpp;
    ctx.fillStyle = 'rgba(148,163,184,0.08)';
    ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Cx, Cy); ctx.lineTo(Bx, By); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = colAC; ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Cx, Cy); ctx.stroke();
    ctx.strokeStyle = colBC; ctx.beginPath(); ctx.moveTo(Cx, Cy); ctx.lineTo(Bx, By); ctx.stroke();
    ctx.strokeStyle = cHyp; ctx.beginPath(); ctx.moveTo(Ax, Ay); ctx.lineTo(Bx, By); ctx.stroke();
    // right-angle marker
    const m = Math.min(14, s * 0.6);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(Cx - m, Cy); ctx.lineTo(Cx - m, Cy - m); ctx.lineTo(Cx, Cy - m); ctx.stroke();
    // angle arcs
    const thA = Math.atan2(st.opp, st.adj);
    const rA = Math.min(s * 2.2, Math.hypot(Cx - Ax, 0) * 0.45);
    if (atA) angleArc(ctx, Ax, Ay, rA, 0, -thA, 'rgb(52,211,153)', `θ = ${fmt(t.deg, 1)}°`, fs);
    else {
      const rB = Math.min(s * 2.2, (Ay - By) * 0.45);
      angleArc(ctx, Bx, By, rB, Math.PI / 2, Math.PI - thA, 'rgb(52,211,153)', `θ = ${fmt(t.deg, 1)}°`, fs, false);
    }
    // side labels: role + length
    const nameOpp = T('opposite', 'depan'), nameAdj = T('adjacent', 'samping'), nameHyp = T('hypotenuse', 'miring');
    label(ctx, `${atA ? nameAdj : nameOpp} = ${fmt(st.adj, 2)}`, (Ax + Cx) / 2, Ay + fs * 1.4, colAC, fs);
    label(ctx, `${atA ? nameOpp : nameAdj} = ${fmt(st.opp, 2)}`, Cx + fs * 0.8, (Cy + By) / 2, colBC, fs, 'left');
    const hx = (Ax + Bx) / 2, hy = (Ay + By) / 2;
    label(ctx, `${nameHyp} = ${fmt(t.hyp, 2)}`, hx - fs * 1.2, hy - fs * 1.3, cHyp, fs, 'right');
    // vertices
    const dot = (x, y, name, drag) => {
      ctx.fillStyle = drag ? '#fff' : '#94a3b8'; ctx.beginPath(); ctx.arc(x, y, drag ? 9 : 5, 0, Math.PI * 2); ctx.fill();
      if (drag) { ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.stroke(); }
      ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs, true); ctx.textAlign = 'center';
      ctx.fillText(name, x + (name === 'A' ? -fs : name === 'B' ? fs : fs), y + (name === 'B' ? -fs * 0.8 : fs * 1.6));
    };
    dot(Ax, Ay, 'A', true); dot(Bx, By, 'B', true); dot(Cx, Cy, 'C', false);
    ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    ctx.fillText(T('Drag A left/right and B up/down', 'Seret A ke kiri/kanan dan B ke atas/bawah'), W * 0.03, H * 0.97);

    // ---- panel ----
    const px = W * 0.64, pw = W * 0.34;
    let yy = H * 0.04;
    const line = (txt, color = '#e2e8f0', bold = false, mn = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = mn ? mono(fs) : font(fs, bold); ctx.textAlign = 'left';
      ctx.fillText(txt, px, yy += fs * gap, pw);
    };
    const sp = special(t.deg);
    line(T(`Ratios for θ at ${st.angle}`, `Perbandingan untuk θ di ${st.angle}`), '#34d399', true, false, 1.2);
    line(`θ = ${fmt(t.deg, 1)}°${sp ? '  ' + T('(special angle)', '(sudut istimewa)') : ''}`, '#a7f3d0', false, true);
    yy += fs * 0.5;
    line(`sin θ = ${T('opp', 'de')}/${T('hyp', 'mi')} = ${fmt(t.opp, 2)}/${fmt(t.hyp, 2)} = ${fmt(t.sin)}${sp ? ' = ' + sp.sin : ''}`, cOpp, false, true);
    line(`cos θ = ${T('adj', 'sa')}/${T('hyp', 'mi')} = ${fmt(t.adj, 2)}/${fmt(t.hyp, 2)} = ${fmt(t.cos)}${sp ? ' = ' + sp.cos : ''}`, cAdj, false, true);
    line(`tan θ = ${T('opp', 'de')}/${T('adj', 'sa')} = ${fmt(t.opp, 2)}/${fmt(t.adj, 2)} = ${fmt(t.tan)}${sp ? ' = ' + sp.tan : ''}`, '#c4b5fd', false, true);
    yy += fs * 0.5;
    line(`sin²θ + cos²θ = ${fmt(t.sin * t.sin + t.cos * t.cos, 4)}`, '#94a3b8', false, true, 1.4);
    line(`tan θ = sin θ / cos θ = ${fmt(t.sin / Math.max(1e-9, t.cos))}`, '#94a3b8', false, true, 1.4);
    line(`${T('hyp', 'miring')}² = ${fmt(st.adj, 2)}² + ${fmt(st.opp, 2)}² → ${T('hyp', 'miring')} = ${fmt(t.hyp)}`, '#94a3b8', false, true, 1.4);
    yy += fs * 0.5;
    line(T('Other acute angle', 'Sudut lancip lainnya') + `: 90° − θ = ${fmt(90 - t.deg, 1)}°`, '#cbd5e1', false, false, 1.4);
    line(T('sin θ = cos(90° − θ): swap opposite ↔ adjacent', 'sin θ = cos(90° − θ): tukar depan ↔ samping'), '#cbd5e1', false, false, 1.3);
    if (st.snap) line(T('Snap: 30°, 45°, 60° give exact values', 'Kunci: 30°, 45°, 60° memberi nilai eksak'), '#64748b', false, false, 1.5);
  }

  function drawTree(ctx, W, H) {
    const fs = Math.max(9, Math.min(13, W * 0.016));
    const t = tree();
    const ground = H * 0.86;
    const ox = W * 0.13;                      // observer x (fixed, leaves room for the eye-height label)
    const s = Math.min((W * 0.5) / st.d, (H * 0.74) / Math.max(3, t.height + 0.5));
    const eyeY = ground - s * st.eye;
    const tx = ox + s * st.d;                 // tree x
    const topY = eyeY - s * t.opp;
    geo = { s, ox, eyeY, tx, topY, ground };
    const cs = Math.min(s, (ground - topY) / 4);   // canopy scale: keeps the foliage above the ground for tiny rises
    // ground
    ctx.fillStyle = '#14532d'; ctx.fillRect(0, ground, W, H - ground);
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, ground); ctx.lineTo(W, ground); ctx.stroke();
    // tree
    ctx.fillStyle = '#92400e'; ctx.fillRect(tx - Math.max(3, cs * 0.35), topY + cs * 1.2, Math.max(6, cs * 0.7), ground - topY - cs * 1.2);
    ctx.fillStyle = '#16a34a';
    ctx.beginPath(); ctx.moveTo(tx, topY); ctx.lineTo(tx - Math.max(10, cs * 1.6), topY + cs * 2.4); ctx.lineTo(tx + Math.max(10, cs * 1.6), topY + cs * 2.4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(tx, topY + cs * 1.2); ctx.lineTo(tx - Math.max(13, cs * 2.2), topY + cs * 3.6); ctx.lineTo(tx + Math.max(13, cs * 2.2), topY + cs * 3.6); ctx.closePath(); ctx.fill();
    // person
    const ph = Math.max(14, s * st.eye);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(ox, ground); ctx.lineTo(ox, ground - ph * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox - ph * 0.22, ground); ctx.lineTo(ox, ground - ph * 0.3); ctx.lineTo(ox + ph * 0.22, ground); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox - ph * 0.2, ground - ph * 0.45); ctx.lineTo(ox + ph * 0.25, ground - ph * 0.55); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(ox, eyeY, Math.max(4, ph * 0.13), 0, Math.PI * 2); ctx.fill();
    ctx.lineCap = 'butt';
    // triangle: eye → base of tree at eye level → top
    ctx.setLineDash([5, 5]); ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox, eyeY); ctx.lineTo(tx, eyeY); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#f472b6'; ctx.beginPath(); ctx.moveTo(tx, eyeY); ctx.lineTo(tx, topY); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ox, eyeY); ctx.lineTo(tx, topY); ctx.stroke();
    // right-angle mark + angle arc
    const m = Math.min(12, s * 0.8);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(tx - m, eyeY); ctx.lineTo(tx - m, eyeY - m); ctx.lineTo(tx, eyeY - m); ctx.stroke();
    angleArc(ctx, ox, eyeY, Math.min(W * 0.08, s * st.d * 0.4), 0, -t.theta, 'rgb(52,211,153)', `θ = ${st.elev}°`, fs);
    // labels
    label(ctx, `${T('distance', 'jarak')} d = ${st.d} m`, (ox + tx) / 2, eyeY + fs * 1.4, '#38bdf8', fs);
    label(ctx, `${T('rise', 'naik')} = d·tan θ = ${fmt(t.opp, 2)} m`, tx + fs * 0.8, (eyeY + topY) / 2, '#f472b6', fs, 'left');
    label(ctx, `${T('eye', 'mata')} ${st.eye.toFixed(2)} m`, ox - fs * 0.8, (ground + eyeY) / 2, '#cbd5e1', fs * 0.9, 'right');
    // sight-line label sits above-left of the midpoint, or to the right when the triangle is narrow (large θ)
    const narrow = (ox + tx) / 2 < W * 0.26;
    label(ctx, `${T('sight line', 'garis pandang')} = ${fmt(t.hyp, 2)} m`, (ox + tx) / 2 + (narrow ? fs : -fs), (eyeY + topY) / 2 - fs * 1.2, '#fbbf24', fs, narrow ? 'left' : 'right');
    // drag dots
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(tx, topY, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, ground, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = font(fs * 0.85); ctx.textAlign = 'left';
    ctx.fillText(T('Drag the observer (distance) or the tree top (angle)', 'Seret pengamat (jarak) atau puncak pohon (sudut)'), W * 0.03, H * 0.97);

    // panel
    const px = W * 0.66, pw = W * 0.32;
    let yy = H * 0.03;
    const line = (txt, color = '#e2e8f0', bold = false, mn = false, gap = 1.5) => {
      ctx.fillStyle = color; ctx.font = mn ? mono(fs) : font(fs, bold); ctx.textAlign = 'left';
      ctx.fillText(txt, px, yy += fs * gap, pw);
    };
    line(T('Clinometer: height of a tree', 'Klinometer: tinggi pohon'), '#34d399', true, false, 1.2);
    line(T('Measure d and the angle of elevation θ.', 'Ukur d dan sudut elevasi θ.'), '#cbd5e1', false, false, 1.4);
    yy += fs * 0.4;
    line(`tan θ = ${T('rise', 'naik')} / d`, '#c4b5fd', false, true, 1.4);
    line(`${T('rise', 'naik')} = d·tan θ = ${st.d}·${fmt(t.tan)} = ${fmt(t.opp, 2)} m`, '#f472b6', false, true, 1.4);
    line(`${T('height', 'tinggi')} = ${T('eye', 'mata')} + ${T('rise', 'naik')}`, '#e2e8f0', false, true, 1.4);
    line(`       = ${st.eye.toFixed(2)} + ${fmt(t.opp, 2)} = ${fmt(t.height, 2)} m`, '#fff', true, true, 1.4);
    yy += fs * 0.4;
    line(`sin θ = ${fmt(t.sin)}   cos θ = ${fmt(t.cos)}`, '#94a3b8', false, true, 1.4);
    line(`${T('sight line', 'garis pandang')} = d / cos θ = ${fmt(t.hyp, 2)} m`, '#fbbf24', false, true, 1.4);
    yy += fs * 0.4;
    line(T('Tip: at θ = 45° the rise equals the distance.', 'Tip: pada θ = 45° kenaikan sama dengan jarak.'), '#64748b', false, false, 1.4);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (st.mode === 'tree') drawTree(ctx, W, H); else drawTriangle(ctx, W, H);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  // ---- dragging --------------------------------------------------------
  let dragRef = { x: 0, d: st.d, s: 1, deg: null };
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (st.mode === 'tree') {
        if (Math.hypot(x - geo.tx, y - geo.topY) < 20) return 'top';
        if (Math.hypot(x - geo.ox, y - geo.ground) < 22) return 'obs';
        return null;
      }
      if (Math.hypot(x - geo.Bx, y - geo.By) < 20) return 'B';
      if (Math.hypot(x - geo.Ax, y - geo.Ay) < 20) return 'A';
      return null;
    },
    onStart(id, x) {
      // the observer drag is relative to where it started: the scene re-scales while d changes, so an
      // absolute pointer→d mapping would feed back on itself
      dragRef = { x, d: st.d, s: geo.s, deg: Math.atan2(st.opp, st.adj) / D2R };
    },
    onDrag(id, x, y) {
      if (!geo.s) return;
      if (id === 'A') { st.adj = clamp((geo.Cx - x) / geo.s, 0.5, MAXSIDE); applySnap(dragRef.deg); syncSliders(); }
      else if (id === 'B') { st.opp = clamp((geo.Ay - y) / geo.s, 0.5, MAXSIDE); applySnap(); syncSliders(); }
      else if (id === 'obs') { st.d = Math.round(clamp(dragRef.d + (dragRef.x - x) / dragRef.s, 2, 60)); dS.value = st.d; }
      else if (id === 'top') {
        const ang = Math.atan2(geo.eyeY - y, Math.max(1, geo.tx - geo.ox)) / D2R;
        st.elev = Math.round(clamp(ang, 5, 80)); elevS.value = st.elev;
      }
    },
    handles: () => {
      if (!geo.s) return [];
      if (st.mode === 'tree') return [
        { id: 'top', x: geo.tx, y: geo.topY, label: `Tree top, angle of elevation ${st.elev}° (drag up/down)` },
        { id: 'obs', x: geo.ox, y: geo.ground, label: `Observer, distance ${st.d} m (drag left/right)` },
      ];
      return [
        { id: 'A', x: geo.Ax, y: geo.Ay, label: `Vertex A, adjacent side ${fmt(st.adj, 2)} (drag left/right)` },
        { id: 'B', x: geo.Bx, y: geo.By, label: `Vertex B, opposite side ${fmt(st.opp, 2)} (drag up/down)` },
      ];
    },
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- controls --------------------------------------------------------
  const modeS = select({
    label: 'Mode', key: 'mode', value: st.mode,
    options: [{ value: 'triangle', label: 'Right triangle' }, { value: 'tree', label: 'Clinometer: tree height' }],
    onChange: (v) => { st.mode = v; syncVis(); },
  });
  const angS = select({
    label: 'Angle θ at vertex', key: 'vertex', value: st.angle,
    options: [{ value: 'A', label: 'A (bottom-left)' }, { value: 'B', label: 'B (top)' }],
    onChange: (v) => { st.angle = v; },
  });
  const adjS = slider({ label: 'Side AC (horizontal leg)', key: 'ac', min: 0.5, max: MAXSIDE, step: 0.1, value: st.adj, format: (v) => v.toFixed(1), onInput: (v) => { st.adj = v; thS.value = Math.round(Math.atan2(st.opp, st.adj) / D2R * 10) / 10; } });
  const oppS = slider({ label: 'Side BC (vertical leg)', key: 'bc', min: 0.5, max: MAXSIDE, step: 0.1, value: st.opp, format: (v) => v.toFixed(1), onInput: (v) => { st.opp = v; thS.value = Math.round(Math.atan2(st.opp, st.adj) / D2R * 10) / 10; } });
  const thS = slider({
    label: 'Angle at A (°)', key: 'theta', min: 5, max: 85, step: 0.5, value: Math.round(Math.atan2(st.opp, st.adj) / D2R * 10) / 10, format: (v) => v.toFixed(1),
    onInput: (v) => { setAngleA(v); },
  });
  const snapT = toggle({ label: 'Snap to 30° / 45° / 60°', key: 'snap', value: st.snap, onChange: (v) => { st.snap = v; } });
  const dS = slider({ label: 'Distance to tree d (m)', key: 'distance', min: 2, max: 60, step: 1, value: st.d, onInput: (v) => { st.d = v; } });
  const elevS = slider({ label: 'Angle of elevation θ (°)', key: 'elevation', min: 5, max: 80, step: 1, value: st.elev, onInput: (v) => { st.elev = v; } });
  const eyeS = slider({ label: 'Eye height (m)', key: 'eye', min: 1, max: 2, step: 0.05, value: st.eye, format: (v) => v.toFixed(2), onInput: (v) => { st.eye = v; } });
  ctrlPanel.append(modeS.el, angS.el, adjS.el, oppS.el, thS.el, row(snapT), dS.el, elevS.el, eyeS.el);
  function syncVis() {
    const tr = st.mode === 'triangle';
    for (const c of [angS, adjS, oppS, thS, snapT]) c.el.style.display = tr ? '' : 'none';
    for (const c of [dS, elevS, eyeS]) c.el.style.display = tr ? 'none' : '';
  }
  syncVis();

  const lab = labPanel({
    title: 'Trig ratios lab',
    filename: 'trig-ratios-data.csv',
    columns: [
      { key: 'theta', label: 'θ (°)', format: (v) => v.toFixed(1) },
      { key: 'opp', label: 'opposite', format: (v) => v.toFixed(2) },
      { key: 'adj', label: 'adjacent', format: (v) => v.toFixed(2) },
      { key: 'hyp', label: 'hypotenuse', format: (v) => v.toFixed(2) },
      { key: 'sin', label: 'sin θ', format: (v) => v.toFixed(3) },
      { key: 'cos', label: 'cos θ', format: (v) => v.toFixed(3) },
      { key: 'tan', label: 'tan θ', format: (v) => v.toFixed(3) },
    ],
    procedure: [
      'Set the angle at A to 30° (use the slider or let it snap). Record. Then drag A to make the triangle twice as big at the same angle and record again. Which columns change?',
      'Record at 45° and 60°. Compare sin 30° with cos 60°, and sin 60° with cos 30°.',
      'Record at 10°, 20°, …, 80°. Which ratio can exceed 1? Which two always stay below 1?',
      'Switch θ to vertex B without moving anything and record. How do opposite and adjacent swap?',
      'Clinometer mode: stand 20 m from the tree at θ = 35° and record (height ≈ 15.6 m). Move to d = 10 m: the sim keeps θ, so the tree shrinks. Raise θ until the height is 15.6 m again (about 54–55°) and record.',
    ],
    predict: 'If you double every side of a right triangle without changing its angles, what happens to sin θ, cos θ and tan θ? Write your prediction first.',
    source: () => {
      const t = st.mode === 'tree' ? tree() : tri();
      if (!Number.isFinite(t.hyp)) return null;
      return { theta: t.deg, opp: t.opp, adj: t.adj, hyp: t.hyp, sin: t.sin, cos: t.cos, tan: t.tan };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => { draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
