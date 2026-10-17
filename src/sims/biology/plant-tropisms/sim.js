import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Growth rate (relative, 1 = maximum) as a function of log10 auxin concentration (mol/L).
// Shoot: optimum ~10⁻⁶–10⁻⁵, inhibited above ~10⁻⁴. Root: optimum ~10⁻¹⁰, inhibited above ~10⁻⁹.
const gShoot = (x) => Math.exp(-((x + 5.5) ** 2) / (2 * 1.6 * 1.6)) - 0.3 / (1 + Math.exp(-2 * (x + 3.5)));
const gRoot = (x) => { const rise = 1 / (1 + Math.exp(-1.5 * (x + 11.5))); const inh = 1 - 1 / (1 + Math.exp(-2.5 * (x + 9.3))); return rise * inh - 0.3 / (1 + Math.exp(-2 * (x + 8))); };
const SHOOT_BASE = -6;   // log10 M auxin arriving in the shoot growing zone (tip intact)
const ROOT_BASE = -10;   // log10 M in the root elongation zone
const K_SHOOT = 5.5;     // deg per s per unit growth-rate difference
const K_ROOT = 9;
const DEG = Math.PI / 180;

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { light: 90, lightOn: true, tip: 'intact', rot: 0, speed: 1, run: true };
  const S = { phi: 0, psi: 0, Ls: 0.28, Lr: 0.18, t: 0, trial: null, bend60: null, root60: null, fL: 0.5, fR: 0.5, rL: 0.5, rR: 0.5, gL: 0, gR: 0, grL: 0, grR: 0 };

  function resetPlant() { S.phi = 0; S.psi = 0; S.Ls = 0.28; S.Lr = 0.18; S.t = 0; }
  function startTrial() { resetPlant(); S.trial = 0; S.bend60 = null; S.root60 = null; }

  function step(dt) {
    const ds = dt * params.speed;
    const hasTip = params.tip !== 'removed';
    const lightSeen = params.lightOn && params.tip === 'intact';
    const phiAbs = S.phi + params.rot;     // shoot tip direction from true vertical, + = right
    const psiAbs = S.psi + params.rot;     // root tip direction from straight down, + = right
    // Shoot auxin fraction on the right side: light pushes auxin to the shaded side, gravity to the lower side.
    let fR = 0.5;
    if (hasTip) {
      if (lightSeen) fR -= 0.3 * Math.sin((params.light - phiAbs) * DEG);
      fR += 0.25 * Math.sin(phiAbs * DEG);
    }
    fR = clamp(fR, 0.08, 0.92);
    const fL = 1 - fR;
    // Root: statoliths settle on the lower side; for a root tilted right the lower face is the left side.
    const rL = clamp(0.5 + 0.3 * Math.sin(psiAbs * DEG), 0.08, 0.92), rR = 1 - rL;
    const shootConc = hasTip ? SHOOT_BASE : -9.5; // tip removed: very little auxin reaches the zone
    S.gL = gShoot(shootConc + Math.log10(2 * fL)); S.gR = gShoot(shootConc + Math.log10(2 * fR));
    S.grL = gRoot(ROOT_BASE + Math.log10(2 * rL)); S.grR = gRoot(ROOT_BASE + Math.log10(2 * rR));
    S.fL = fL; S.fR = fR; S.rL = rL; S.rR = rR;
    if (params.run) {
      // the side that grows more ends up on the outside of the bend: left faster → bends right (+)
      S.phi = clamp(S.phi + K_SHOOT * (S.gL - S.gR) * ds, -150, 150);
      S.psi = clamp(S.psi + K_ROOT * (S.grL - S.grR) * ds, -150, 150);
      S.Ls = Math.min(0.55, S.Ls + 0.0025 * (S.gL + S.gR) * ds);
      S.Lr = Math.min(0.4, S.Lr + 0.002 * Math.max(0, S.grL + S.grR) * ds);
      S.t += ds;
      if (S.trial != null) {
        S.trial += ds;
        if (S.trial >= 60) { S.bend60 = S.phi; S.root60 = S.psi; S.trial = null; }
      }
    }
  }

  // ---------- geometry ----------
  function scene() {
    const W = cv.width, H = cv.height;
    return { cx: W * 0.33, cy: H * 0.5, bw: W * 0.3, bh: H * 0.62, R: H * 0.46 };
  }
  function lampPos() {
    const s = scene();
    return { x: s.cx + s.R * Math.sin(params.light * DEG), y: s.cy - s.R * Math.cos(params.light * DEG) };
  }
  // Points along an organ of length L (px) starting at (0,0) in box frame, initial direction a0 (rad, screen),
  // bending by `bend` degrees concentrated in the distal 70 %.
  function organPts(L, a0, bend, n, out) {
    let x = 0, y = 0;
    out[0] = 0; out[1] = 0;
    for (let i = 1; i <= n; i++) {
      const s = i / n;
      const u = clamp((s - 0.3) / 0.7, 0, 1);
      const k = u * u * (3 - 2 * u);
      const a = a0 + bend * DEG * k;
      x += Math.cos(a) * L / n; y += Math.sin(a) * L / n;
      out[2 * i] = x; out[2 * i + 1] = y;
    }
  }
  const N = 24;
  const shootPts = new Float64Array(2 * (N + 1)), rootPts = new Float64Array(2 * (N + 1));

  function drawOrgan(ctx, pts, width, color, fLeft, fRight, auxinColorAlpha, fromFrac) {
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i <= N; i++) { if (i === 0) ctx.moveTo(pts[0], pts[1]); else ctx.lineTo(pts[2 * i], pts[2 * i + 1]); }
    ctx.stroke();
    // auxin colour on each side, in the distal growing zone
    const start = Math.floor(N * fromFrac);
    for (const [sideSign, f] of [[-1, fLeft], [1, fRight]]) {
      const alpha = clamp((f - 0.1) / 0.8, 0, 1) * auxinColorAlpha;
      ctx.strokeStyle = `rgba(236,72,153,${alpha.toFixed(3)})`; ctx.lineWidth = Math.max(1.5, width * 0.3);
      ctx.beginPath();
      for (let i = start; i <= N; i++) {
        const j = Math.min(N, Math.max(1, i));
        const dx = pts[2 * j] - pts[2 * j - 2], dy = pts[2 * j + 1] - pts[2 * j - 1];
        const len = Math.hypot(dx, dy) || 1;
        // "right side" normal: for a direction d, right-hand normal in screen coords is (-dy, dx)
        const nx = -dy / len, ny = dx / len;
        const off = width * 0.42 * sideSign;
        const px = pts[2 * i] + nx * off, py = pts[2 * i + 1] + ny * off;
        if (i === start) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }

  function drawScene(ctx) {
    const W = cv.width, H = cv.height, s = scene();
    const fs = Math.max(10, W * 0.014);
    // lamp and rays (absolute frame)
    const lp = lampPos();
    const tipX = s.cx, tipY = s.cy - s.bh * 0.1;
    if (params.lightOn) {
      const g = ctx.createRadialGradient(lp.x, lp.y, 4, lp.x, lp.y, s.R * 1.3);
      g.addColorStop(0, 'rgba(250,204,21,0.28)'); g.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(250,204,21,0.5)'; ctx.lineWidth = 1.5;
      for (let i = -2; i <= 2; i++) {
        const a = Math.atan2(tipY - lp.y, tipX - lp.x) + i * 0.08;
        ctx.beginPath(); ctx.moveTo(lp.x, lp.y); ctx.lineTo(lp.x + Math.cos(a) * s.R * 0.95, lp.y + Math.sin(a) * s.R * 0.95); ctx.stroke();
      }
    }
    // box (rotated)
    ctx.save();
    ctx.translate(s.cx, s.cy); ctx.rotate(params.rot * DEG);
    ctx.fillStyle = 'rgba(30,41,59,0.9)'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.rect(-s.bw / 2, -s.bh / 2, s.bw, s.bh); ctx.fill(); ctx.stroke();
    const soilY = s.bh * 0.15;
    ctx.fillStyle = '#5b3a1e'; ctx.fillRect(-s.bw / 2 + 1.5, soilY, s.bw - 3, s.bh / 2 - soilY - 1.5);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(-s.bw / 2 + (i + 0.5) * s.bw / 12, soilY + ((i * 37) % 70) / 100 * (s.bh / 2 - soilY), 3, 0, Math.PI * 2); ctx.fill(); }
    // organs in box frame: shoot from soil surface upward, root downward
    ctx.translate(0, soilY);
    organPts(S.Ls * s.bh, -Math.PI / 2, S.phi, N, shootPts);
    organPts(S.Lr * s.bh, Math.PI / 2, S.psi, N, rootPts);
    const w = Math.max(5, s.bw * 0.045);
    drawOrgan(ctx, rootPts, w * 0.7, '#e7d3b1', S.rL, S.rR, 0.9, 0.35);
    // root hairs
    ctx.strokeStyle = 'rgba(231,211,177,0.6)'; ctx.lineWidth = 1;
    for (let i = 4; i < N - 3; i += 3) { const x = rootPts[2 * i], y = rootPts[2 * i + 1]; ctx.beginPath(); ctx.moveTo(x - w * 0.6, y); ctx.lineTo(x + w * 0.6, y + 2); ctx.stroke(); }
    drawOrgan(ctx, shootPts, w, '#22c55e', S.fL, S.fR, params.tip === 'removed' ? 0.15 : 0.95, 0.3);
    // tip
    const tx = shootPts[2 * N], ty = shootPts[2 * N + 1];
    const tdx = tx - shootPts[2 * N - 2], tdy = ty - shootPts[2 * N - 1];
    const ta = Math.atan2(tdy, tdx);
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(ta + Math.PI / 2);
    if (params.tip === 'removed') {
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-w, 0); ctx.lineTo(w, 0); ctx.stroke();
      ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(34,197,94,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-w * 1.4, -w * 2.4); ctx.quadraticCurveTo(0, -w * 3.6, 0, -w * 0.4); ctx.moveTo(w * 1.4, -w * 2.4); ctx.quadraticCurveTo(0, -w * 3.6, 0, -w * 0.4); ctx.stroke(); ctx.setLineDash([]);
    } else {
      ctx.fillStyle = '#4ade80';
      ctx.beginPath(); ctx.moveTo(0, -w * 0.4); ctx.quadraticCurveTo(-w * 2.2, -w * 1.6, -w * 1.4, -w * 2.8); ctx.quadraticCurveTo(-w * 0.3, -w * 2.2, 0, -w * 0.4); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -w * 0.4); ctx.quadraticCurveTo(w * 2.2, -w * 1.6, w * 1.4, -w * 2.8); ctx.quadraticCurveTo(w * 0.3, -w * 2.2, 0, -w * 0.4); ctx.fill();
      if (params.tip === 'covered') {
        ctx.fillStyle = '#111827'; ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(-w * 1.8, -w * 3.2, w * 3.6, w * 3.2, 4); ctx.fill(); ctx.stroke();
      }
    }
    ctx.restore();
    ctx.restore();
    // lamp
    ctx.fillStyle = params.lightOn ? '#facc15' : '#475569'; ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(lp.x, lp.y, Math.max(10, W * 0.016), 0, Math.PI * 2); ctx.fill(); if (params.lightOn) ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(`${T('lamp', 'lampu')} ${params.light}°`, lp.x, lp.y - Math.max(10, W * 0.016) - 4);
    // lamp track
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.setLineDash([3, 5]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(s.cx, s.cy, s.R, -Math.PI, 0); ctx.stroke(); ctx.setLineDash([]);
    // gravity arrow
    const gx = W * 0.04, gy = H * 0.12;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + H * 0.1); ctx.lineTo(gx - 5, gy + H * 0.1 - 7); ctx.moveTo(gx, gy + H * 0.1); ctx.lineTo(gx + 5, gy + H * 0.1 - 7); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'left'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillText('g', gx + 8, gy + H * 0.06);
    // readouts under the scene
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    const lines = [
      [`${T('shoot bend', 'bengkok batang')} φ = ${S.phi.toFixed(1)}°   ${T('root bend', 'bengkok akar')} ψ = ${S.psi.toFixed(1)}°`, '#e2e8f0'],
      [`${T('shoot auxin left/right', 'auksin batang kiri/kanan')}: ${(S.fL * 100).toFixed(0)} % / ${(S.fR * 100).toFixed(0)} %   (${(2 * S.fL * 10 ** (params.tip === 'removed' ? -9.5 : SHOOT_BASE)).toExponential(1)} / ${(2 * S.fR * 10 ** (params.tip === 'removed' ? -9.5 : SHOOT_BASE)).toExponential(1)} mol/L)`, '#ec4899'],
      [`${T('root auxin left/right', 'auksin akar kiri/kanan')}: ${(S.rL * 100).toFixed(0)} % / ${(S.rR * 100).toFixed(0)} %`, '#f9a8d4'],
      [`t = ${S.t.toFixed(0)} s (1 s ≈ 10 min)   ${S.trial != null ? `${T('trial', 'percobaan')}: ${S.trial.toFixed(0)}/60 s` : S.bend60 != null ? `${T('bend after 60 s', 'bengkok setelah 60 s')} = ${S.bend60.toFixed(1)}°` : T('press "Start 60 s trial"', 'tekan "Start 60 s trial"')}`, '#94a3b8'],
    ];
    let y = H * 0.86;
    for (const [txt, c] of lines) { ctx.fillStyle = c; ctx.fillText(txt, 8, y); y += fs * 1.3; }
  }

  function drawChart(ctx) {
    const W = cv.width, H = cv.height;
    const x0 = W * 0.69, w = W * 0.29, y0 = H * 0.1, h = H * 0.5;
    const fs = Math.max(9, W * 0.012);
    const X = (lx) => x0 + ((lx + 12) / 9) * w;
    const Y = (g) => y0 + h - ((g + 0.35) / 1.4) * h;
    ctx.fillStyle = 'rgba(148,163,184,0.06)'; ctx.fillRect(x0, y0, w, h);
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, Y(0)); ctx.lineTo(x0 + w, Y(0)); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    for (let lx = -12; lx <= -3; lx += 3) ctx.fillText(`10${['⁻¹²', '⁻⁹', '⁻⁶', '⁻³'][(lx + 12) / 3]}`, X(lx), y0 + h + fs * 1.2);
    ctx.fillText(T('auxin concentration (mol/L)', 'konsentrasi auksin (mol/L)'), x0 + w / 2, y0 + h + fs * 2.4);
    ctx.save(); ctx.translate(x0 - fs * 0.6, y0 + h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(T('growth rate', 'laju tumbuh'), 0, 0); ctx.restore();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2e8f0'; ctx.font = `bold ${Math.round(fs * 1.1)}px system-ui, sans-serif`;
    ctx.fillText(T('Growth rate vs auxin', 'Laju tumbuh vs auksin'), x0, y0 - fs * 0.6);
    const plot = (fn, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 90; i++) { const lx = -12 + i * 0.1; const px = X(lx), py = Y(fn(lx)); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
      ctx.stroke();
    };
    plot(gRoot, '#e7d3b1'); plot(gShoot, '#22c55e');
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillStyle = '#22c55e'; ctx.fillText(T('shoot', 'batang'), X(-5.2), Y(1) - 4);
    ctx.fillStyle = '#e7d3b1'; ctx.fillText(T('root', 'akar'), X(-11.6), Y(0.8) - 4);
    ctx.fillStyle = '#e7d3b1'; ctx.fillText(T('inhibition', 'penghambatan'), X(-7.6), Y(-0.3) + fs);
    // markers: L/R sides
    const sc = params.tip === 'removed' ? -9.5 : SHOOT_BASE;
    const marks = [
      [sc + Math.log10(2 * S.fL), S.gL, '#22c55e', 'L'], [sc + Math.log10(2 * S.fR), S.gR, '#22c55e', 'R'],
      [ROOT_BASE + Math.log10(2 * S.rL), S.grL, '#e7d3b1', 'L'], [ROOT_BASE + Math.log10(2 * S.rR), S.grR, '#e7d3b1', 'R'],
    ];
    for (const [lx, g, c, tag] of marks) {
      const px = X(clamp(lx, -12, -3)), py = Y(g);
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0b1220'; ctx.font = `bold ${Math.round(fs * 0.8)}px system-ui, sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(tag, px, py + 3);
    }
    ctx.textAlign = 'left'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillStyle = '#94a3b8';
    const ly = y0 + h + fs * 3.9;
    ctx.fillText(T('L/R markers: auxin on the left/right side of each organ.', 'Penanda L/R: auksin di sisi kiri/kanan tiap organ.'), x0, ly);
    ctx.fillText(T('The side with the higher growth rate becomes the outside of the bend.', 'Sisi dengan laju tumbuh lebih tinggi menjadi sisi luar lengkungan.'), x0, ly + fs * 1.3);
    ctx.fillStyle = '#ec4899';
    ctx.fillText(T('magenta on the seedling = auxin (IAA) level', 'magenta pada kecambah = kadar auksin (IAA)'), x0, ly + fs * 2.6);
    ctx.fillStyle = '#94a3b8';
    const mode = params.tip === 'removed' ? T('tip removed: no auxin source → no bending', 'ujung dibuang: tanpa sumber auksin → tidak membengkok')
      : params.tip === 'covered' ? T('tip covered: light not sensed, gravity still acts', 'ujung ditutup: cahaya tak dirasakan, gravitasi tetap bekerja')
        : T('tip intact: phototropism + gravitropism', 'ujung utuh: fototropisme + gravitropisme');
    ctx.fillText(mode, x0, ly + fs * 3.9);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawScene(ctx);
    drawChart(ctx);
  }

  // ---------- lamp dragging (pointer + keyboard) ----------
  const lampR = () => Math.max(14, cv.width * 0.022);
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) { const lp = lampPos(); return Math.hypot(x - lp.x, y - lp.y) < lampR() ? 'lamp' : null; },
    onDrag(id, x, y) {
      const s = scene();
      const ang = Math.atan2(x - s.cx, s.cy - y) / DEG;
      params.light = Math.round(clamp(ang, -90, 90));
      lightS.value = params.light;
    },
    handles: () => { const lp = lampPos(); return [{ id: 'lamp', x: lp.x, y: lp.y, label: `Lamp, light angle ${params.light}° (drag or use arrow keys)` }]; },
    cursor: 'default', hoverCursor: 'grab', keyStep: 6,
  });

  // ---------- controls ----------
  const lightS = slider({ label: 'Light angle (° from vertical, + = right)', key: 'light', min: -90, max: 90, step: 5, value: params.light, onInput: (v) => { params.light = v; } });
  const rotS = slider({ label: 'Rotate chamber (°)', key: 'rot', min: -90, max: 90, step: 15, value: 0, onInput: (v) => { params.rot = v; } });
  const speedS = slider({ label: 'Speed (×)', key: 'speed', min: 0.5, max: 4, step: 0.5, value: 1, format: (v) => v.toFixed(1), onInput: (v) => { params.speed = v; } });
  const lightT = toggle({ label: 'Lamp on', key: 'lamp', value: true, onChange: (v) => { params.lightOn = v; } });
  const runT = toggle({ label: 'Grow', key: 'run', value: true, onChange: (v) => { params.run = v; } });
  const tipSel = select({ label: 'Shoot tip', key: 'tip', value: 'intact', options: [{ value: 'intact', label: 'intact' }, { value: 'removed', label: 'removed (decapitated)' }, { value: 'covered', label: 'covered with opaque cap' }], onChange: (v) => { params.tip = v; } });
  const trialB = button({ label: 'Start 60 s trial', primary: true, onClick: startTrial });
  const resetB = button({ label: 'Reset seedling', onClick: () => { resetPlant(); S.trial = null; S.bend60 = null; S.root60 = null; } });
  ctrlPanel.append(lightS.el, rotS.el, speedS.el, tipSel.el, row(lightT, runT, trialB, resetB));

  const lab = labPanel({
    title: 'Tropism lab — bend angle after 60 s',
    filename: 'plant-tropisms-data.csv',
    columns: [
      { key: 'light', label: 'Light angle (°)' },
      { key: 'lamp', label: 'Lamp' },
      { key: 'tip', label: 'Tip' },
      { key: 'rot', label: 'Chamber rotation (°)' },
      { key: 'bend', label: 'Shoot bend after 60 s (°)', format: (v) => v.toFixed(1) },
      { key: 'root', label: 'Root bend after 60 s (°)', format: (v) => v.toFixed(1) },
      { key: 'auxL', label: 'Auxin left (%)', format: (v) => v.toFixed(0) },
      { key: 'auxR', label: 'Auxin right (%)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Tip intact, chamber 0°, lamp on at 90°. Press "Start 60 s trial"; when the readout shows "bend after 60 s", Record.',
      'Repeat at light angles 60°, 30°, 0° and −90°. Plot bend angle against light angle.',
      'Light 90°, tip removed: run a trial and Record. Then tip covered: Record. Compare with the intact result.',
      'Lamp off, tip intact, chamber rotated 90°: run a trial and Record both shoot and root bend.',
      'Lamp on at −90° with chamber rotated +90°: do light and gravity agree or compete? Record and explain the angle you get.',
    ],
    predict: 'Will the bend angle after 60 s be proportional to the light angle, or will it level off? What will happen with the tip removed?',
    source: () => {
      if (S.bend60 == null) return null;
      return { light: params.light, lamp: params.lightOn ? 'on' : 'off', tip: params.tip, rot: params.rot, bend: S.bend60, root: S.root60, auxL: S.fL * 100, auxR: S.fR * 100 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
