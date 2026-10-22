import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { N: 100, B: 0.1, A_cm2: 100, f: 50, dc: false, running: true };
  const state = { t: 0 };      // physical time (s)

  const omega = () => 2 * Math.PI * params.f;
  const area = () => params.A_cm2 * 1e-4;
  const fluxMax = () => params.N * params.B * area();          // Wb
  const emfPeak = () => fluxMax() * omega();                   // V
  const flux = (t) => fluxMax() * Math.cos(omega() * t);
  const emfRaw = (t) => emfPeak() * Math.sin(omega() * t);
  const emfOut = (t) => (params.dc ? Math.abs(emfRaw(t)) : emfRaw(t));
  // slow motion so the coil never turns faster than 0.6 rev/s on screen
  const slowmo = () => Math.min(1, 0.6 / Math.max(params.f, 1e-9));

  function step(dt) {
    if (!params.running) return;
    state.t += dt * slowmo();
    const period = 1 / Math.max(params.f, 1e-9);
    if (state.t > 1e6 * period) state.t -= Math.floor(state.t / period) * period;
  }

  // ---- drawing helpers -----------------------------------------------------
  const fmt = (v, d = 3) => (Number.isFinite(v) ? v.toPrecision(d) : '—');
  function fmtSI(v, unit, digits = 3) {
    if (!Number.isFinite(v)) return '—';
    const a = Math.abs(v);
    if (a === 0) return `0 ${unit}`;
    const table = [[1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'μ']];
    for (const [f, p] of table) if (a >= f * 0.9995) return `${(v / f).toPrecision(digits)} ${p}${unit}`;
    return `${v.toExponential(2)} ${unit}`;
  }
  function drawArrow(ctx, x0, y0, x1, y1, color, width = 1.5) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, hs = 6;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * hs * 0.6, y1 - uy * hs * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * hs - uy * hs * 0.5, y1 - uy * hs + ux * hs * 0.5);
    ctx.lineTo(x1 - ux * hs + uy * hs * 0.5, y1 - uy * hs - ux * hs * 0.5); ctx.closePath(); ctx.fill();
  }

  // Oblique projection: 3-D (x right along axle, y up, z toward viewer) → screen
  function project(cx, cy, x, y, z) {
    return { x: cx + x + z * 0.45, y: cy - y + z * 0.25 };
  }

  function drawGenerator(ctx, W, H, fs) {
    const leftW = W * 0.55;
    const cx = leftW * 0.4, cy = H * 0.5;
    const th = omega() * state.t;                  // θ = ωt; θ = 0 → coil face-on to B (flux max)
    const L = leftW * 0.3;                         // coil length along the axle (px)
    const half = Math.min(H * 0.22, leftW * 0.16) * (0.6 + 0.4 * Math.sqrt(params.A_cm2 / 500));   // half-width, grows with A
    const eps = emfRaw(state.t);
    const rel = emfPeak() > 0 ? eps / emfPeak() : 0;

    // pole pieces (N above, S below): B points down on screen
    const poleW = L * 1.5, poleH = H * 0.09;
    ctx.fillStyle = '#ef4444'; ctx.fillRect(cx - poleW / 2, cy - half - poleH - H * 0.07, poleW, poleH);
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(cx - poleW / 2, cy + half + H * 0.07, poleW, poleH);
    ctx.fillStyle = '#fff'; ctx.font = `bold ${fs * 1.3}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('N', cx, cy - half - poleH / 2 - H * 0.07);
    ctx.fillText('S', cx, cy + half + H * 0.07 + poleH / 2);
    ctx.textBaseline = 'alphabetic';
    // field lines (behind the coil)
    const nB = clamp(Math.round(2 + params.B * 10), 2, 12);
    for (let i = 0; i < nB; i++) {
      const x = cx - poleW / 2 + poleW * (i + 0.5) / nB;
      drawArrow(ctx, x, cy - half - H * 0.065, x, cy + half + H * 0.06, 'rgba(148,163,184,0.35)', 1);
    }
    ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(`B = ${fmt(params.B, 2)} T ↓`, cx + poleW / 2 + 6, cy - half - H * 0.02);

    // axle
    const axleEnd = leftW * 0.98;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cx - L / 2 - 16, cy); ctx.lineTo(axleEnd, cy); ctx.stroke();

    // coil: corners in 3-D; normal rotates about x-axis. θ=0 → coil in the horizontal plane (normal up, along B)
    const c = Math.cos(th), s = Math.sin(th);
    const corner = (sx, sw) => project(cx, cy, sx * L / 2, sw * half * s, sw * half * c);
    const P = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
    // draw the back long side first (smaller z), then front
    const sides = [{ a: P[0], b: P[1], z: -c }, { a: P[3], b: P[2], z: c }];
    sides.sort((u, w) => u.z - w.z);
    const coilColor = (back) => (back ? '#b45309' : '#f59e0b');
    ctx.lineWidth = clamp(3 + Math.log10(params.N) * 1.2, 3, 7);
    // short sides
    ctx.strokeStyle = '#d97706';
    ctx.beginPath(); ctx.moveTo(P[1].x, P[1].y); ctx.lineTo(P[2].x, P[2].y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(P[0].x, P[0].y); ctx.lineTo(P[3].x, P[3].y); ctx.stroke();
    for (let i = 0; i < sides.length; i++) {
      const sd = sides[i];
      ctx.strokeStyle = coilColor(i === 0);
      ctx.beginPath(); ctx.moveTo(sd.a.x, sd.a.y); ctx.lineTo(sd.b.x, sd.b.y); ctx.stroke();
    }
    // current direction arrows on the front long side (direction follows sign of ε)
    const front = sides[1];
    if (Math.abs(rel) > 0.08) {
      const dir = rel > 0 ? 1 : -1;
      const mx = (front.a.x + front.b.x) / 2, my = (front.a.y + front.b.y) / 2;
      const ux = (front.b.x - front.a.x), uy = (front.b.y - front.a.y), ul = Math.hypot(ux, uy) || 1;
      for (const k of [-0.25, 0.25]) {
        const x0 = mx + ux * k, y0 = my + uy * k;
        drawArrow(ctx, x0 - dir * 10 * ux / ul, y0 - dir * 10 * uy / ul, x0 + dir * 10 * ux / ul, y0 + dir * 10 * uy / ul, '#22c55e', 2);
      }
    }
    // normal vector and angle label
    // normal n̂ makes angle θ with B (which points down on screen): θ = 0 → n̂ ∥ B, Φ = +NBA
    const nTip = project(cx, cy, 0, -half * 0.9 * c, half * 0.9 * s);
    drawArrow(ctx, cx, cy, nTip.x, nTip.y, 'rgba(56,189,248,0.9)', 1.5);
    ctx.fillStyle = '#38bdf8'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(`θ = ${((th * 180 / Math.PI) % 360).toFixed(0)}°`, nTip.x + 6, nTip.y);

    // slip rings / commutator on the axle
    const rx = leftW * 0.72, ringR = H * 0.045;
    ctx.lineWidth = 2;
    if (!params.dc) {
      for (const dx of [-ringR * 0.7, ringR * 0.7]) {
        ctx.strokeStyle = '#cbd5e1'; ctx.fillStyle = '#334155';
        ctx.beginPath(); ctx.ellipse(rx + dx, cy, ringR * 0.3, ringR, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.8}px system-ui, sans-serif`;
      ctx.fillText(T('slip rings', 'cincin geser'), rx, cy - ringR - fs * 0.6);
    } else {
      ctx.strokeStyle = '#cbd5e1'; ctx.fillStyle = '#334155';
      ctx.beginPath(); ctx.ellipse(rx, cy, ringR * 0.45, ringR, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // split: a gap rotating with the coil
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 3;
      // gaps sit under the top/bottom brushes at θ = 0 and θ = π, exactly when ε changes sign
      const gapA = th + Math.PI / 2;
      ctx.beginPath(); ctx.ellipse(rx, cy, ringR * 0.45, ringR, 0, gapA - 0.15, gapA + 0.15); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(rx, cy, ringR * 0.45, ringR, 0, gapA + Math.PI - 0.15, gapA + Math.PI + 0.15); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.8}px system-ui, sans-serif`;
      ctx.fillText(T('commutator', 'komutator'), rx, cy - ringR - fs * 0.6);
    }
    // brushes
    ctx.fillStyle = '#475569';
    const bxs = params.dc ? [rx, rx] : [rx - ringR * 0.7, rx + ringR * 0.7];
    const bys = params.dc ? [cy - ringR - 2, cy + ringR + 2] : [cy + ringR + 2, cy + ringR + 2];
    const dirs = params.dc ? [-1, 1] : [1, 1];
    for (let i = 0; i < 2; i++) ctx.fillRect(bxs[i] - 4, dirs[i] > 0 ? bys[i] : bys[i] - 10, 8, 10);
    // wires to bulb
    const bulbX = leftW * 0.88, bulbY = cy + H * 0.25;
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (params.dc) {
      ctx.moveTo(rx, cy - ringR - 10); ctx.lineTo(rx + ringR * 2, cy - ringR - 10); ctx.lineTo(rx + ringR * 2, bulbY - 14); ctx.lineTo(bulbX - 6, bulbY - 14);
      ctx.moveTo(rx, cy + ringR + 12); ctx.lineTo(rx, bulbY + 10); ctx.lineTo(bulbX - 6, bulbY + 10);
    } else {
      ctx.moveTo(rx - ringR * 0.7, cy + ringR + 12); ctx.lineTo(rx - ringR * 0.7, bulbY + 10); ctx.lineTo(bulbX - 6, bulbY + 10);
      ctx.moveTo(rx + ringR * 0.7, cy + ringR + 12); ctx.lineTo(rx + ringR * 0.7, bulbY - 14); ctx.lineTo(bulbX - 6, bulbY - 14);
    }
    ctx.stroke();
    // bulb: brightness follows |ε| / ε_peak
    const bright = clamp(Math.abs(rel), 0, 1);
    const br = H * 0.05;
    if (bright > 0.05) {
      const glow = ctx.createRadialGradient(bulbX, bulbY, br * 0.3, bulbX, bulbY, br * (1.6 + bright * 1.4));
      glow.addColorStop(0, `rgba(253,224,71,${0.7 * bright})`); glow.addColorStop(1, 'rgba(253,224,71,0)');
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(bulbX, bulbY, br * 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = `rgba(${Math.round(60 + 190 * bright)},${Math.round(60 + 160 * bright)},${Math.round(40 + 60 * bright)},1)`;
    ctx.beginPath(); ctx.arc(bulbX, bulbY, br, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.fillRect(bulbX - br * 0.45, bulbY + br * 0.9, br * 0.9, br * 0.5);
    ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center'; ctx.font = `${fs * 0.85}px system-ui, sans-serif`;
    ctx.fillText(`|ε| = ${fmt(Math.abs(emfOut(state.t)), 3)} V`, bulbX, bulbY + br * 1.6 + fs);
  }

  function drawGraph(ctx, x, y, w, h, fn, peak, color, label, unit, fs, rectified) {
    const period = 1 / Math.max(params.f, 1e-9);
    const span = 2 * period;
    const t1 = state.t, t0 = t1 - span;
    const yMid = rectified ? y + h - 4 : y + h / 2;
    const amp = rectified ? h - 8 : h / 2 - 4;
    const Y = (v) => yMid - (peak > 0 ? v / peak : 0) * amp;
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, yMid); ctx.lineTo(x + w, yMid); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
    // period ticks
    ctx.fillStyle = '#94a3b8'; ctx.font = `${fs * 0.8}px system-ui, sans-serif`; ctx.textAlign = 'center';
    for (let k = 0; k <= 2; k++) {
      const xx = x + w * k / 2;
      ctx.beginPath(); ctx.moveTo(xx, yMid - 3); ctx.lineTo(xx, yMid + 3); ctx.stroke();
      if (k < 2) ctx.fillText(k === 0 ? `−2T` : `−T`, xx, y + h + fs);
    }
    ctx.fillText(T('now', 'kini'), x + w, y + h + fs);
    ctx.textAlign = 'left'; ctx.fillStyle = color;
    ctx.fillText(label, x + 4, y + fs * 0.9);
    ctx.textAlign = 'right'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${rectified ? '' : '±'}${fmtSI(peak, unit)}`, x + w, y + fs * 0.9);
    // curve
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
    const n = Math.max(60, Math.round(w));
    for (let i = 0; i <= n; i++) {
      const t = t0 + span * i / n;
      const yy = Y(fn(t));
      i ? ctx.lineTo(x + w * i / n, yy) : ctx.moveTo(x + w * i / n, yy);
    }
    ctx.stroke();
    const yNow = Y(fn(t1));
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + w, yNow, 4, 0, Math.PI * 2); ctx.fill();
    ctx.textAlign = 'left';
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const fs = clamp(W * 0.024, 10, 14), lh = fs * 1.4;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawGenerator(ctx, W, H, fs);

    const gx = W * 0.6, gw = W * 0.37;
    const narrow = gw < 260;
    const gy1 = H * 0.08, gh = narrow ? H * 0.22 : H * 0.27;
    drawGraph(ctx, gx, gy1, gw, gh, flux, fluxMax(), '#38bdf8', 'Φ = NBA cos ωt', 'Wb', fs, false);
    const gy2 = narrow ? H * 0.4 : H * 0.47;
    drawGraph(ctx, gx, gy2, gw, gh, emfOut, emfPeak(), '#fbbf24', params.dc ? 'ε = |NBAω sin ωt|' : 'ε = NBAω sin ωt', 'V', fs, params.dc);

    // readouts
    ctx.textAlign = 'left'; ctx.font = `${fs}px system-ui, sans-serif`;
    let ty = gy2 + gh + fs * 2.4;
    const line = (txt, color = '#e2e8f0') => { ctx.fillStyle = color; ctx.fillText(txt, gx, ty); ty += lh; };
    if (narrow) {
      line(`ω = 2πf = ${fmt(omega(), 3)} rad/s`, '#94a3b8');
      line(`Φ_max = NBA = ${fmtSI(fluxMax(), 'Wb')}`, '#94a3b8');
      line(`ε_peak = NBAω = ${fmt(emfPeak(), 3)} V`, '#fbbf24');
      line(`ε_rms = ${fmt(emfPeak() / Math.SQRT2, 3)} V`, '#fbbf24');
    } else {
      line(`ω = 2πf = ${fmt(omega(), 3)} rad/s   Φ_max = NBA = ${fmtSI(fluxMax(), 'Wb')}`, '#94a3b8');
      line(`ε_peak = NBAω = ${fmt(emfPeak(), 3)} V   ε_rms = ${fmt(emfPeak() / Math.SQRT2, 3)} V`, '#fbbf24');
    }
    const sm = slowmo();
    if (ty < H - 4) line(sm < 0.999 ? T(`slow motion ×${(1 / sm).toFixed(0)}`, `gerak lambat ×${(1 / sm).toFixed(0)}`) : T('real time', 'waktu nyata'), '#64748b');
    ctx.textAlign = 'left';
  }

  // ---- controls ----------------------------------------------------------
  const nS = slider({ label: 'Turns N', key: 'turns', min: 1, max: 500, step: 1, value: params.N, onInput: (v) => { params.N = v; } });
  const bS = slider({ label: 'Field B (T)', key: 'b-tesla', min: 0.01, max: 1, step: 0.01, value: params.B, format: (v) => v.toFixed(2), onInput: (v) => { params.B = v; } });
  const aS = slider({ label: 'Coil area A (cm²)', key: 'area-cm2', min: 10, max: 500, step: 10, value: params.A_cm2, onInput: (v) => { params.A_cm2 = v; } });
  const fS = slider({ label: 'Rotation f (Hz)', key: 'freq-hz', min: 0.5, max: 60, step: 0.5, value: params.f, format: (v) => v.toFixed(1), onInput: (v) => { const th = omega() * state.t; params.f = v; state.t = th / omega(); } });
  const dcT = toggle({ label: 'DC with commutator', key: 'commutator', value: false, onChange: (v) => { params.dc = v; } });
  const runB = button({ label: 'Pause / Play', onClick: () => { params.running = !params.running; } });
  ctrlPanel.append(nS.el, bS.el, aS.el, fS.el, row(dcT, runB));

  const lab = labPanel({
    title: 'Generator lab — what sets the peak EMF?',
    filename: 'ac-generator-data.csv',
    columns: [
      { key: 'N', label: 'N', format: (v) => v.toFixed(0) },
      { key: 'B', label: 'B (T)', format: (v) => v.toFixed(2) },
      { key: 'A', label: 'A (cm²)', format: (v) => v.toFixed(0) },
      { key: 'f', label: 'f (Hz)', format: (v) => v.toFixed(1) },
      { key: 'omega', label: 'ω (rad/s)', format: (v) => v.toFixed(1) },
      { key: 'fluxMax', label: 'NBA (Wb)', format: (v) => v.toExponential(3) },
      { key: 'emf0', label: 'ε_peak (V)', format: (v) => v.toPrecision(4) },
      { key: 'emfRms', label: 'ε_rms (V)', format: (v) => v.toPrecision(4) },
    ],
    procedure: [
      'Set N = 100, B = 0.10 T, A = 100 cm², f = 50 Hz. Record. Confirm ε_peak = NBAω = 31.4 V by hand.',
      'Change only N: 50, 100, 200, 400. Record each. Plot ε_peak against N.',
      'Reset N = 100. Change only f: 10, 20, 40 Hz. Record each. Is ε_peak ∝ f?',
      'Change only B, then only A, recording each time. Which quantities is ε_peak proportional to?',
      'Switch on the commutator. Does ε_peak change? What changes in the graph?',
    ],
    predict: 'Which will raise the peak voltage more: doubling the number of turns or doubling the rotation frequency? What else changes in each case?',
    source: () => {
      const e0 = emfPeak();
      if (!Number.isFinite(e0)) return null;
      return { N: params.N, B: params.B, A: params.A_cm2, f: params.f, omega: omega(), fluxMax: fluxMax(), emf0: e0, emfRms: e0 / Math.SQRT2 };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
