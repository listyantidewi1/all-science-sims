import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, select, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// Each particle stands for about 4 mmol/L. Initial counts mimic a resting animal cell:
// Na⁺ 145/12, K⁺ 4/140 mmol/L outside/inside; glucose and O₂ higher outside.
const MM_PER_PARTICLE = 4;
const TYPES = {
  o2: { label: 'O₂', color: '#cbd5e1', r: 0.55, speed: 1.3, out: 24, in: 4, route: ['simple diffusion through bilayer', 'difusi sederhana lewat lapisan ganda'] },
  glc: { label: ['glucose', 'glukosa'], color: '#f59e0b', r: 0.95, speed: 0.8, out: 20, in: 3, route: ['facilitated diffusion: carrier (GLUT)', 'difusi terfasilitasi: pembawa (GLUT)'] },
  na: { label: 'Na⁺', color: '#facc15', r: 0.7, speed: 1.1, out: 36, in: 3, route: ['channel (passive) / pump (active)', 'kanal (pasif) / pompa (aktif)'] },
  k: { label: 'K⁺', color: '#a78bfa', r: 0.75, speed: 1.1, out: 2, in: 35, route: ['channel (passive) / pump (active)', 'kanal (pasif) / pompa (aktif)'] },
};
// Proteins: y as a fraction of the particle-area height
const PROT = {
  kch: { y: 0.2, h: 0.12, color: '#a78bfa' },
  nach: { y: 0.4, h: 0.12, color: '#facc15' },
  glut: { y: 0.6, h: 0.13, color: '#f59e0b' },
  pump: { y: 0.82, h: 0.16, color: '#f472b6' },
};
const PUMP_PERIOD = 1.4;  // s per cycle at temperature 1
const CARRIER_TIME = 0.7; // s per glucose carried

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const lbl = (t) => (Array.isArray(t.label) ? T(t.label[0], t.label[1]) : t.label);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const params = { atp: false, naOpen: false, kOpen: true, temp: 1, labType: 'na' };
  const S = {
    parts: [], atpUsed: 0, time: 0, pumpTimer: 0, pumpState: 'idle', pumpT: 0, pumpStall: false,
    carrier: { busy: false, t: 0, p: null, from: 0 },
    flow: { o2: 0, glc: 0, na: 0, k: 0 }, // exponentially-smoothed net crossings (+ = out→in)
    vesicle: null, // { kind: 'endo'|'exo', t }
    flash: 0,
  };
  // particle region: full width, top 74 % of height; membrane vertical at mid-width
  const area = () => ({ x: 0, y: 0, w: cv.width, h: cv.height * 0.72 });
  const memb = () => ({ x: cv.width / 2, t: Math.max(18, cv.width * 0.05) });
  const pr = (type) => Math.max(2.5, cv.width * 0.009) * TYPES[type].r;
  const side = (p) => (p.x < memb().x ? 'out' : 'in');

  function spawn(type, s) {
    const a = area(), m = memb();
    const x = s === 'out' ? a.x + 10 + Math.random() * (m.x - m.t / 2 - 20) : m.x + m.t / 2 + 10 + Math.random() * (a.w - m.x - m.t / 2 - 20);
    const ang = Math.random() * Math.PI * 2;
    S.parts.push({ type, x, y: 10 + Math.random() * (a.h - 20), vx: Math.cos(ang), vy: Math.sin(ang), state: 'free', tx: 0, ty: 0, timer: 0 });
  }
  function reset() {
    S.parts = []; S.atpUsed = 0; S.time = 0; S.pumpTimer = 0; S.pumpState = 'idle'; S.pumpStall = false;
    S.carrier = { busy: false, t: 0, p: null, from: 0 };
    S.flow = { o2: 0, glc: 0, na: 0, k: 0 }; S.vesicle = null;
    for (const [k, t] of Object.entries(TYPES)) { for (let i = 0; i < t.out; i++) spawn(k, 'out'); for (let i = 0; i < t.in; i++) spawn(k, 'in'); }
  }
  function counts(type) {
    let o = 0, i = 0;
    for (const p of S.parts) if (p.type === type) { if (p.state === 'free' ? side(p) === 'out' : p.homeSide === 'out') o++; else i++; }
    return { out: o, in: i };
  }
  const protY = (id) => area().h * PROT[id].y;
  const protH = (id) => area().h * PROT[id].h;
  const inProt = (id, y) => Math.abs(y - protY(id)) < protH(id) / 2;

  function step(dt) {
    const a = area(), m = memb();
    const sp = Math.max(30, a.w * 0.12) * params.temp;
    S.time += dt;
    for (const k of Object.keys(S.flow)) S.flow[k] *= Math.exp(-dt / 4);
    for (const p of S.parts) {
      if (p.state !== 'free') {
        // being carried/pumped: glide to target
        p.x += (p.tx - p.x) * Math.min(1, dt * 8); p.y += (p.ty - p.y) * Math.min(1, dt * 8);
        continue;
      }
      // random walk
      if (Math.random() < dt * 3) { const ang = Math.random() * Math.PI * 2; p.vx = Math.cos(ang); p.vy = Math.sin(ang); }
      const r = pr(p.type);
      const px = p.x, prevSide = side(p);
      const inM0 = Math.abs(px - m.x) < m.t / 2 + r;
      p.x += p.vx * sp * dt * TYPES[p.type].speed;
      p.y += p.vy * sp * dt * TYPES[p.type].speed;
      if (p.y < r) { p.y = r; p.vy = Math.abs(p.vy); } else if (p.y > a.h - r) { p.y = a.h - r; p.vy = -Math.abs(p.vy); }
      if (p.x < r) { p.x = r; p.vx = Math.abs(p.vx); } else if (p.x > a.w - r) { p.x = a.w - r; p.vx = -Math.abs(p.vx); }
      const inM1 = Math.abs(p.x - m.x) < m.t / 2 + r;
      if (inM1 && !inM0) {
        // entering the membrane zone: decide
        let allowed = false;
        if (p.type === 'o2') allowed = true;
        else if (p.type === 'na') allowed = params.naOpen && inProt('nach', p.y);
        else if (p.type === 'k') allowed = params.kOpen && inProt('kch', p.y);
        else if (p.type === 'glc' && inProt('glut', p.y) && !S.carrier.busy) {
          S.carrier.busy = true; S.carrier.t = 0; S.carrier.p = p; S.carrier.from = prevSide;
          p.state = 'carried'; p.homeSide = prevSide; p.tx = m.x; p.ty = protY('glut');
          continue;
        }
        if (!allowed) { p.x = px; p.vx = -p.vx; }
        else if (p.type !== 'o2') { p.vx = Math.sign(p.vx) || 1; p.vy *= 0.2; } // channels are straight pores
      }
      if (inM1 && p.type === 'o2') { p.x += p.vx * sp * dt * 0.4; } // slower while dissolving through tails
      const newSide = side(p);
      if (newSide !== prevSide) S.flow[p.type] += newSide === 'in' ? 1 : -1;
    }
    // carrier release
    if (S.carrier.busy) {
      S.carrier.t += dt * params.temp;
      if (S.carrier.t >= CARRIER_TIME) {
        const p = S.carrier.p;
        const to = S.carrier.from === 'out' ? 'in' : 'out';
        p.x = to === 'in' ? m.x + m.t / 2 + pr('glc') * 2 : m.x - m.t / 2 - pr('glc') * 2;
        p.vx = to === 'in' ? 1 : -1; p.vy = 0; p.state = 'free';
        S.flow.glc += to === 'in' ? 1 : -1;
        S.carrier.busy = false; S.carrier.p = null;
      }
    }
    // Na⁺/K⁺ pump: 3 Na⁺ in→out, 2 K⁺ out→in per ATP
    if (params.atp) {
      if (S.pumpState === 'idle') {
        S.pumpTimer += dt * params.temp;
        if (S.pumpTimer >= PUMP_PERIOD) {
          S.pumpTimer = 0;
          const py = protY('pump');
          const nas = S.parts.filter((p) => p.type === 'na' && p.state === 'free' && side(p) === 'in').sort((p, q) => Math.hypot(p.x - m.x, p.y - py) - Math.hypot(q.x - m.x, q.y - py)).slice(0, 3);
          const ks = S.parts.filter((p) => p.type === 'k' && p.state === 'free' && side(p) === 'out').sort((p, q) => Math.hypot(p.x - m.x, p.y - py) - Math.hypot(q.x - m.x, q.y - py)).slice(0, 2);
          if (nas.length === 3 && ks.length === 2) {
            S.pumpStall = false;
            nas.forEach((p, i) => { p.state = 'pumped'; p.homeSide = 'in'; p.tx = m.x + 4; p.ty = py - protH('pump') * 0.25 + i * pr('na') * 2.2; });
            ks.forEach((p, i) => { p.state = 'pumped'; p.homeSide = 'out'; p.tx = m.x - 4; p.ty = py + protH('pump') * 0.1 + i * pr('k') * 2.2; });
            S.pumpState = 'loading'; S.pumpT = 0;
          } else S.pumpStall = true;
        }
      } else {
        S.pumpT += dt * params.temp;
        if (S.pumpState === 'loading' && S.pumpT > 0.6) {
          // conformational change: release on opposite sides, one ATP hydrolysed
          for (const p of S.parts) {
            if (p.state !== 'pumped') continue;
            const to = p.type === 'na' ? 'out' : 'in';
            p.x = to === 'in' ? m.x + m.t / 2 + pr(p.type) * 2.5 : m.x - m.t / 2 - pr(p.type) * 2.5;
            p.y = p.ty; p.vx = to === 'in' ? 1 : -1; p.vy = (Math.random() - 0.5); p.state = 'free';
            S.flow[p.type] += to === 'in' ? 1 : -1;
          }
          S.atpUsed++; S.flash = 0.5; S.pumpState = 'idle';
        }
      }
    } else {
      S.pumpStall = false;
      // if ATP is cut while loading, release particles back where they came from
      if (S.pumpState !== 'idle') {
        for (const p of S.parts) if (p.state === 'pumped') { p.state = 'free'; p.x = p.homeSide === 'in' ? m.x + m.t / 2 + pr(p.type) * 2.5 : m.x - m.t / 2 - pr(p.type) * 2.5; p.vx = p.homeSide === 'in' ? 1 : -1; }
        S.pumpState = 'idle';
      }
    }
    if (S.flash > 0) S.flash -= dt;
    if (S.vesicle) { S.vesicle.t += dt; if (S.vesicle.t > 3.2) S.vesicle = null; }
  }

  // ---------- drawing ----------
  function drawParticle(ctx, p) {
    const r = pr(p.type), t = TYPES[p.type];
    ctx.fillStyle = t.color;
    ctx.beginPath();
    if (p.type === 'glc') { for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; const x = p.x + r * Math.cos(a), y = p.y + r * Math.sin(a); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.closePath(); }
    else ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
    if (p.type === 'na' || p.type === 'k') {
      ctx.fillStyle = '#0b1220'; ctx.font = `bold ${Math.round(r * 1.5)}px system-ui, sans-serif`; ctx.textAlign = 'center';
      ctx.fillText('+', p.x, p.y + r * 0.55);
    }
  }
  function drawMembrane(ctx) {
    const a = area(), m = memb();
    const headR = Math.max(3, m.t * 0.14), gap = headR * 2.3;
    const skip = (y) => ['kch', 'nach', 'glut', 'pump'].some((id) => inProt(id, y)) || (S.vesicle && Math.abs(y - a.h * 0.06) < a.h * 0.07 && S.vesicle.t < 2.2 && S.vesicle.kind === 'endo') || (S.vesicle && S.vesicle.kind === 'exo' && S.vesicle.t > 1.6 && Math.abs(y - a.h * 0.06) < a.h * 0.07);
    ctx.lineWidth = Math.max(1, headR * 0.45);
    for (let y = headR; y < a.h; y += gap) {
      if (skip(y)) continue;
      for (const s of [-1, 1]) {
        const hx = m.x + s * (m.t / 2 - headR);
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath(); ctx.moveTo(hx - s * headR * 0.5, y - headR * 0.4); ctx.lineTo(m.x - s * 2, y - headR * 0.4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(hx - s * headR * 0.5, y + headR * 0.4); ctx.lineTo(m.x - s * 2, y + headR * 0.4); ctx.stroke();
        ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(hx, y, headR, 0, Math.PI * 2); ctx.fill();
      }
    }
    // proteins
    const fs = Math.max(8, cv.width * 0.012);
    ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
    for (const [id, P] of Object.entries(PROT)) {
      const y = protY(id), h = protH(id), w = m.t * (id === 'pump' ? 1.5 : 1.15);
      ctx.fillStyle = id === 'pump' ? 'rgba(244,114,182,0.3)' : 'rgba(139,92,246,0.28)';
      ctx.strokeStyle = P.color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(m.x - w / 2, y - h / 2, w, h, 8); ctx.fill(); ctx.stroke();
      let open = true, name = '';
      if (id === 'kch') { open = params.kOpen; name = `K⁺ ${T('channel', 'kanal')} ${open ? T('open', 'buka') : T('closed', 'tutup')}`; }
      if (id === 'nach') { open = params.naOpen; name = `Na⁺ ${T('channel', 'kanal')} ${open ? T('open', 'buka') : T('closed', 'tutup')}`; }
      if (id === 'glut') { name = T('glucose carrier', 'pembawa glukosa') + (S.carrier.busy ? ' ●' : ''); }
      if (id === 'pump') { name = 'Na⁺/K⁺ ' + T('pump', 'pompa') + (params.atp ? (S.pumpStall ? T(' (no substrate)', ' (tak ada substrat)') : ' ATP→ADP') : T(' (no ATP)', ' (tanpa ATP)')); }
      if (id === 'kch' || id === 'nach') {
        // pore
        ctx.fillStyle = open ? '#0b1220' : P.color;
        ctx.fillRect(m.x - w / 2 + 3, y - h * 0.12, w - 6, h * 0.24);
      }
      if (id === 'glut') {
        // carrier flips: draw a notch on the side currently open
        const t = S.carrier.busy ? S.carrier.t / CARRIER_TIME : 0;
        const sideOpen = S.carrier.busy ? (S.carrier.from === 'out' ? (t < 0.5 ? -1 : 1) : (t < 0.5 ? 1 : -1)) : -1;
        ctx.fillStyle = '#0b1220';
        ctx.beginPath(); ctx.ellipse(m.x + sideOpen * w * 0.25, y, w * 0.2, h * 0.25, 0, 0, Math.PI * 2); ctx.fill();
      }
      if (id === 'pump' && S.flash > 0) {
        ctx.fillStyle = `rgba(250,204,21,${S.flash})`; ctx.font = `bold ${Math.round(fs * 1.4)}px system-ui, sans-serif`; ctx.textAlign = 'center';
        ctx.fillText('ATP → ADP + Pᵢ', m.x, y + h / 2 + fs * 1.6);
        ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
      }
      ctx.fillStyle = P.color; ctx.textAlign = 'left';
      ctx.fillText(name, m.x + w / 2 + 6, y - h / 2 + fs);
      if (id === 'pump') { ctx.fillStyle = '#f472b6'; ctx.fillText(T('3 Na⁺ out, 2 K⁺ in per ATP', '3 Na⁺ keluar, 2 K⁺ masuk per ATP'), m.x + w / 2 + 6, y - h / 2 + fs * 2.2); }
    }
  }
  function drawVesicle(ctx) {
    const v = S.vesicle; if (!v) return;
    const a = area(), m = memb();
    const y = a.h * 0.06, R = a.h * 0.055;
    const fs = Math.max(9, cv.width * 0.012);
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(56,189,248,0.12)';
    let cx, phase;
    if (v.kind === 'endo') {
      // membrane dimples inward (toward +x), pinches off, vesicle drifts into the cell
      phase = clamp(v.t / 3.2, 0, 1);
      cx = phase < 0.5 ? m.x + R * (phase / 0.5) : m.x + R + (phase - 0.5) / 0.5 * a.w * 0.18;
      ctx.beginPath();
      if (phase < 0.5) ctx.arc(cx, y, R, Math.PI * 0.55, Math.PI * 1.45, true); else ctx.arc(cx, y, R, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0';
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(cx + Math.cos(i * 1.7) * R * 0.45, y + Math.sin(i * 1.7) * R * 0.45, 3, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'left'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
      ctx.fillText(T('endocytosis: membrane folds in, vesicle pinches off (uses ATP)', 'endositosis: membran melipat ke dalam, vesikel lepas (memakai ATP)'), m.x + m.t, y + R + fs * 1.4);
    } else {
      phase = clamp(v.t / 3.2, 0, 1);
      cx = phase < 0.5 ? m.x + a.w * 0.18 - (phase / 0.5) * (a.w * 0.18 - R) : m.x + R - (phase - 0.5) / 0.5 * R;
      ctx.beginPath();
      if (phase < 0.5) ctx.arc(cx, y, R, 0, Math.PI * 2); else ctx.arc(cx, y, R, Math.PI * 0.55, Math.PI * 1.45, true);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f472b6';
      for (let i = 0; i < 4; i++) {
        const spread = phase > 0.5 ? (phase - 0.5) * 2 : 0;
        ctx.beginPath(); ctx.arc(cx + Math.cos(i * 1.7) * R * 0.45 - spread * a.w * 0.12, y + Math.sin(i * 1.7) * R * 0.45 * (1 + spread), 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#38bdf8'; ctx.textAlign = 'left'; ctx.font = `${Math.round(fs)}px system-ui, sans-serif`;
      ctx.fillText(T('exocytosis: vesicle fuses, contents released outside (uses ATP)', 'eksositosis: vesikel berfusi, isi dilepas ke luar (memakai ATP)'), m.x + m.t, y + R + fs * 1.4);
    }
  }
  function flowText(type) {
    const f = S.flow[type];
    if (f > 0.6) return [T('net out → in', 'neto luar → dalam'), '#22c55e', 1];
    if (f < -0.6) return [T('net in → out', 'neto dalam → luar'), '#f97316', -1];
    return [T('≈ 0 (equilibrium)', '≈ 0 (setimbang)'), '#94a3b8', 0];
  }
  function drawBars(ctx) {
    const W = cv.width, H = cv.height, a = area();
    const y0 = a.h, h = H - a.h;
    ctx.fillStyle = '#111a2e'; ctx.fillRect(0, y0, W, h);
    const keys = Object.keys(TYPES), gw = W / keys.length;
    const fs = Math.max(9, W * 0.013);
    const barMax = 44, barH = h * 0.42, by = y0 + h * 0.62;
    keys.forEach((k, i) => {
      const t = TYPES[k], c = counts(k), gx = i * gw;
      ctx.textAlign = 'left'; ctx.fillStyle = t.color; ctx.font = `bold ${Math.round(fs * 1.1)}px system-ui, sans-serif`;
      ctx.fillText(lbl(t), gx + 8, y0 + fs * 1.4);
      ctx.fillStyle = '#94a3b8'; ctx.font = `${Math.round(fs * 0.85)}px system-ui, sans-serif`;
      ctx.fillText(T(t.route[0], t.route[1]), gx + 8, y0 + fs * 2.5);
      const bw = gw * 0.16;
      const draw1 = (n, x, name) => {
        const hh = clamp(n / barMax, 0, 1) * barH;
        ctx.fillStyle = 'rgba(148,163,184,0.15)'; ctx.fillRect(x, by - barH, bw, barH);
        ctx.fillStyle = t.color; ctx.fillRect(x, by - hh, bw, hh);
        ctx.fillStyle = '#e2e8f0'; ctx.textAlign = 'center'; ctx.font = `${Math.round(fs * 0.9)}px system-ui, sans-serif`;
        ctx.fillText(`${n}`, x + bw / 2, by - hh - 3);
        ctx.fillStyle = '#94a3b8'; ctx.fillText(name, x + bw / 2, by + fs);
        ctx.fillText(`≈${n * MM_PER_PARTICLE} mM`, x + bw / 2, by + fs * 2);
      };
      draw1(c.out, gx + gw * 0.08, T('outside', 'luar'));
      draw1(c.in, gx + gw * 0.08 + bw * 1.5, T('inside', 'dalam'));
      const ft = flowText(k);
      ctx.fillStyle = ft[1]; ctx.textAlign = 'left'; ctx.font = `${Math.round(fs * 0.95)}px system-ui, sans-serif`;
      const tx = gx + gw * 0.08 + bw * 3;
      ctx.fillText(ft[0], tx, by - barH * 0.6);
      if (ft[2] !== 0) {
        const ax = tx + 10, ay = by - barH * 0.25, len = gw * 0.18;
        ctx.strokeStyle = ft[1]; ctx.lineWidth = 3; ctx.beginPath();
        if (ft[2] > 0) { ctx.moveTo(ax, ay); ctx.lineTo(ax + len, ay); ctx.lineTo(ax + len - 8, ay - 6); ctx.moveTo(ax + len, ay); ctx.lineTo(ax + len - 8, ay + 6); }
        else { ctx.moveTo(ax + len, ay); ctx.lineTo(ax, ay); ctx.lineTo(ax + 8, ay - 6); ctx.moveTo(ax, ay); ctx.lineTo(ax + 8, ay + 6); }
        ctx.stroke();
      }
    });
    ctx.textAlign = 'right'; ctx.fillStyle = '#f472b6'; ctx.font = `bold ${Math.round(fs)}px system-ui, sans-serif`;
    ctx.fillText(`ATP ${T('used', 'dipakai')}: ${S.atpUsed}   t = ${S.time.toFixed(0)} s`, W - 8, y0 + fs * 1.4);
    ctx.textAlign = 'left';
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const a = area(), m = memb();
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(56,189,248,0.04)'; ctx.fillRect(0, 0, m.x, a.h);
    ctx.fillStyle = 'rgba(16,185,129,0.05)'; ctx.fillRect(m.x, 0, W - m.x, a.h);
    const fs = Math.max(10, W * 0.016);
    ctx.font = `bold ${Math.round(fs)}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillStyle = '#7dd3fc'; ctx.fillText(T('OUTSIDE the cell (extracellular fluid)', 'LUAR sel (cairan ekstraseluler)'), 10, fs * 1.4);
    ctx.textAlign = 'right'; ctx.fillStyle = '#6ee7b7'; ctx.fillText(T('INSIDE the cell (cytoplasm)', 'DALAM sel (sitoplasma)'), W - 10, fs * 1.4);
    drawMembrane(ctx);
    for (const p of S.parts) drawParticle(ctx, p);
    drawVesicle(ctx);
    drawBars(ctx);
    ctx.fillStyle = '#64748b'; ctx.font = `${Math.round(Math.max(8, W * 0.011))}px system-ui, sans-serif`; ctx.textAlign = 'left';
    ctx.fillText(T('1 particle ≈ 4 mmol/L · bilayer ≈ 7 nm (not to scale)', '1 partikel ≈ 4 mmol/L · lapisan ganda ≈ 7 nm (tidak berskala)'), 10, a.h - 6);
  }

  // ---------- controls ----------
  const atpT = toggle({ label: 'ATP supply (runs Na⁺/K⁺ pump)', key: 'atp', value: false, onChange: (v) => { params.atp = v; } });
  const naT = toggle({ label: 'Na⁺ channel open', key: 'na-open', value: false, onChange: (v) => { params.naOpen = v; } });
  const kT = toggle({ label: 'K⁺ channel open', key: 'k-open', value: true, onChange: (v) => { params.kOpen = v; } });
  const tempS = slider({ label: 'Temperature (particle speed ×)', key: 'temp', min: 0.3, max: 2.5, step: 0.1, value: 1, format: (v) => v.toFixed(1), onInput: (v) => { params.temp = v; } });
  const addO2 = button({ label: '+10 O₂ outside', onClick: () => { for (let i = 0; i < 10; i++) spawn('o2', 'out'); } });
  const addGlc = button({ label: '+10 glucose outside', onClick: () => { for (let i = 0; i < 10; i++) spawn('glc', 'out'); } });
  const endoB = button({ label: 'Endocytosis', onClick: () => { S.vesicle = { kind: 'endo', t: 0 }; } });
  const exoB = button({ label: 'Exocytosis', onClick: () => { S.vesicle = { kind: 'exo', t: 0 }; } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(row(atpT, naT, kT), tempS.el, row(addO2, addGlc), row(endoB, exoB, resetB));

  const labSel = select({ label: 'Lab records particle', key: 'lab', value: 'na', options: Object.keys(TYPES).map((k) => ({ value: k, label: Array.isArray(TYPES[k].label) ? TYPES[k].label[0] : TYPES[k].label })), onChange: (v) => { params.labType = v; } });
  ctrlPanel.appendChild(labSel.el);
  const lab = labPanel({
    title: 'Membrane transport lab',
    filename: 'membrane-transport-data.csv',
    columns: [
      { key: 'particle', label: 'Particle' },
      { key: 't', label: 't (s)', format: (v) => v.toFixed(0) },
      { key: 'inside', label: 'Inside (≈ mmol/L)' },
      { key: 'outside', label: 'Outside (≈ mmol/L)' },
      { key: 'flow', label: 'Net flow direction' },
      { key: 'route', label: 'Route' },
      { key: 'atpOn', label: 'ATP on?' },
      { key: 'atp', label: 'ATP used' },
    ],
    procedure: [
      'Reset. ATP off, Na⁺ channel closed, K⁺ channel open. Set "Lab records particle" to O₂ and Record at t = 0, 20 and 60 s.',
      'Set the lab to K⁺ and record at the same times. Which way does K⁺ leak, and does it ever reverse?',
      'Open the Na⁺ channel. Record Na⁺ at 0, 20 and 60 s with ATP off.',
      'Switch ATP on. Record Na⁺ and K⁺ every 20 s for a minute. Note the ATP used each time: how many ions per ATP?',
      'Add glucose outside once, twice, three times and record glucose each time after 20 s. Does the carrier saturate?',
    ],
    predict: 'With ATP on, will the Na⁺ gradient be rebuilt even while the Na⁺ channel is open? How many ATP will the pump need per minute?',
    source: () => {
      const k = params.labType, c = counts(k), ft = flowText(k), t = TYPES[k];
      return {
        particle: Array.isArray(t.label) ? t.label[0] : t.label, t: S.time,
        inside: `${c.in} (${c.in * MM_PER_PARTICLE})`, outside: `${c.out} (${c.out * MM_PER_PARTICLE})`,
        flow: ft[2] > 0 ? 'outside → inside' : ft[2] < 0 ? 'inside → outside' : 'none (equilibrium)',
        route: t.route[0], atpOn: params.atp ? 'yes' : 'no', atp: S.atpUsed,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  reset();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
