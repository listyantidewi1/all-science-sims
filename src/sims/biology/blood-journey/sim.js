import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

// The double loop as a figure-8 through the heart, in fractions of the canvas.
// Segment tags: 'toLungs' (blue), 'lungs' (loading O2), 'toBody' (red), 'body' (unloading O2).
const PATH = [
  { x: 0.54, y: 0.50, tag: 'toLungs' },  // right side of heart
  { x: 0.67, y: 0.42, tag: 'toLungs' },
  { x: 0.67, y: 0.22, tag: 'toLungs' },
  { x: 0.60, y: 0.14, tag: 'lungs' },    // enter lungs
  { x: 0.40, y: 0.14, tag: 'toBody' },   // leave lungs
  { x: 0.33, y: 0.22, tag: 'toBody' },
  { x: 0.33, y: 0.42, tag: 'toBody' },
  { x: 0.46, y: 0.50, tag: 'toBody' },   // left side of heart
  { x: 0.33, y: 0.58, tag: 'toBody' },
  { x: 0.33, y: 0.78, tag: 'toBody' },
  { x: 0.40, y: 0.86, tag: 'body' },     // enter body
  { x: 0.60, y: 0.86, tag: 'toLungs' },  // leave body
  { x: 0.67, y: 0.78, tag: 'toLungs' },
  { x: 0.67, y: 0.58, tag: 'toLungs' },
  { x: 0.54, y: 0.50, tag: 'toLungs' },  // back at right side of heart
];
const N_CELLS = 10;
const ACTIVITIES = [
  { key: 'rest', bpm: 70, en: 'Resting', id: 'Istirahat' },
  { key: 'walk', bpm: 100, en: 'Walking', id: 'Berjalan' },
  { key: 'run', bpm: 150, en: 'Running', id: 'Berlari' },
];
const FACTS = {
  heart: { en: 'The heart is a muscle pump the size of your fist. It beats about 100,000 times a day.', id: 'Jantung adalah pompa otot sebesar kepalan tanganmu. Jantung berdetak sekitar 100.000 kali sehari.' },
  lungs: { en: 'In the lungs, blood picks up oxygen and drops off carbon dioxide, which you breathe out.', id: 'Di paru-paru, darah mengambil oksigen dan melepaskan karbon dioksida, yang kamu hembuskan.' },
  body: { en: 'Muscles, brain and organs take oxygen from the blood to make energy, and give back carbon dioxide.', id: 'Otot, otak, dan organ mengambil oksigen dari darah untuk menghasilkan energi, dan mengembalikan karbon dioksida.' },
  red: { en: 'Bright red blood is full of oxygen. Arteries carry it away from the heart.', id: 'Darah merah terang penuh dengan oksigen. Arteri membawanya menjauh dari jantung.' },
  blue: { en: 'Dark blood has given its oxygen away. Veins carry it back to the heart. (Real blood is dark red, not blue!)', id: 'Darah gelap sudah melepaskan oksigennya. Vena membawanya kembali ke jantung. (Darah sungguhan merah gelap, bukan biru!)' },
};

function bigBtn(label, onClick) {
  const b = button({ label, onClick });
  b.el.style.minHeight = '44px';
  b.el.style.fontSize = '1rem';
  b.el.style.padding = '10px 16px';
  return b;
}

export function mount(rootEl) {
  const T = (en, id) => (getLocale() === 'id' ? id : en);
  const tx = (o) => (getLocale() === 'id' ? o.id : o.en);
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  cv.canvas.style.touchAction = 'none';

  const state = { bpm: 70, running: true, fact: null, factAt: -10, beatPhase: 0, laps: 0, lapTimer: 0 };
  let now = 0;
  const cells = Array.from({ length: N_CELLS }, (_, i) => ({ s: i / N_CELLS }));
  const font = (px, bold) => `${bold ? 'bold ' : ''}${Math.max(9, Math.round(px))}px system-ui, -apple-system, Roboto, sans-serif`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const activityFor = (bpm) => (bpm < 85 ? ACTIVITIES[0] : bpm < 125 ? ACTIVITIES[1] : ACTIVITIES[2]);
  // One lap in the sim takes 6 s at 70 bpm; faster hearts move blood proportionally faster.
  const lapsPerSec = () => state.bpm / 420;
  const realTripSeconds = () => 4200 / Math.max(1, state.bpm);   // about 60 s at rest

  // --- path geometry (recomputed from canvas size each frame; 15 points so it is cheap) ---
  const pts = PATH.map(() => ({ x: 0, y: 0 }));
  const cum = new Array(PATH.length).fill(0);
  let total = 1, sLungs0 = 0, sLungs1 = 0, sBody0 = 0, sBody1 = 0;
  function buildPath() {
    const W = cv.width, H = cv.height;
    for (let i = 0; i < PATH.length; i++) { pts[i].x = PATH[i].x * W; pts[i].y = PATH[i].y * H; }
    cum[0] = 0;
    for (let i = 1; i < pts.length; i++) cum[i] = cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    total = Math.max(1, cum[cum.length - 1]);
    sLungs0 = cum[3] / total; sLungs1 = cum[4] / total; sBody0 = cum[10] / total; sBody1 = cum[11] / total;
  }
  function posAt(s, out) {
    const d = ((s % 1) + 1) % 1 * total;
    let i = 1;
    while (i < cum.length - 1 && cum[i] < d) i++;
    const seg = Math.max(1e-6, cum[i] - cum[i - 1]);
    const u = clamp((d - cum[i - 1]) / seg, 0, 1);
    out.x = pts[i - 1].x + (pts[i].x - pts[i - 1].x) * u;
    out.y = pts[i - 1].y + (pts[i].y - pts[i - 1].y) * u;
    return out;
  }
  // Oxygen level as a function of position along the loop: fills in the lungs, empties in the body.
  function o2At(s) {
    s = ((s % 1) + 1) % 1;
    if (s < sLungs0) return 0;
    if (s < sLungs1) return (s - sLungs0) / Math.max(1e-6, sLungs1 - sLungs0);
    if (s < sBody0) return 1;
    if (s < sBody1) return 1 - (s - sBody0) / Math.max(1e-6, sBody1 - sBody0);
    return 0;
  }
  const mix = (o2) => {
    const r = Math.round(59 + (239 - 59) * o2), g = Math.round(130 + (68 - 130) * o2), b = Math.round(246 + (68 - 246) * o2);
    return `rgb(${r},${g},${b})`;
  };

  function step(dt) {
    if (!state.running) return;
    const ds = lapsPerSec() * dt;
    for (const c of cells) { c.s += ds; if (c.s >= 1) c.s -= 1; }
    state.beatPhase += (state.bpm / 60) * dt;
    state.lapTimer += ds; if (state.lapTimer >= 1) { state.lapTimer -= 1; state.laps++; }
  }

  // --- drawing ---
  const tmp = { x: 0, y: 0 };
  function heartBox() { const W = cv.width, H = cv.height; return { x: W * 0.5, y: H * 0.5, r: Math.min(W, H) * 0.11 }; }
  function lungBox() { const W = cv.width, H = cv.height; return { x: W * 0.5, y: H * 0.14, rx: W * 0.065, ry: H * 0.11 }; }
  function bodyBox() { const W = cv.width, H = cv.height; return { x: W * 0.5, y: H * 0.86, w: W * 0.2, h: H * 0.18 }; }

  function drawHeart(ctx) {
    const { x, y, r } = heartBox();
    const beat = Math.pow(Math.max(0, Math.sin(state.beatPhase * Math.PI * 2)), 6);
    const k = 1 + 0.1 * beat;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, r * 0.9);
    ctx.bezierCurveTo(-r * 1.3, r * 0.1, -r * 1.0, -r * 0.9, 0, -r * 0.35);
    ctx.bezierCurveTo(r * 1.0, -r * 0.9, r * 1.3, r * 0.1, 0, r * 0.9);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -r * 0.3); ctx.lineTo(0, r * 0.75); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = font(r * 0.3, true); ctx.textAlign = 'center';
    ctx.fillText(T('heart', 'jantung'), 0, r * 0.1);
    ctx.font = font(r * 0.2);
    ctx.fillText(T('left', 'kiri'), -r * 0.45, r * 0.4); ctx.fillText(T('right', 'kanan'), r * 0.45, r * 0.4);
    ctx.restore();
  }
  function drawLungs(ctx) {
    const { x, y, rx, ry } = lungBox();
    const br = 1 + 0.04 * Math.sin(now * 1.5);
    ctx.fillStyle = '#f9a8d4';
    [-1, 1].forEach((sg) => { ctx.beginPath(); ctx.ellipse(x + sg * rx * 1.1, y, rx * br, ry * br, 0, 0, Math.PI * 2); ctx.fill(); });
    ctx.strokeStyle = '#be185d'; ctx.lineWidth = 2;
    [-1, 1].forEach((sg) => { ctx.beginPath(); ctx.moveTo(x, y - ry * 1.1); ctx.lineTo(x, y - ry * 0.4); ctx.lineTo(x + sg * rx * 0.9, y); ctx.stroke(); });
    ctx.fillStyle = '#9d174d'; ctx.font = font(ry * 0.3, true); ctx.textAlign = 'center';
    ctx.fillText(T('lungs', 'paru-paru'), x, y + ry * 1.45);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(ry * 0.25);
    ctx.fillText(T('O₂ in, CO₂ out', 'O₂ masuk, CO₂ keluar'), x, y + ry * 1.75);
  }
  function drawBody(ctx) {
    const { x, y, w, h } = bodyBox();
    const pulse = state.bpm / 150;
    ctx.fillStyle = '#9ca3af';
    ctx.beginPath(); ctx.arc(x, y - h * 0.35, h * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.roundRect(x - w * 0.18, y - h * 0.2, w * 0.36, h * 0.38, 8); ctx.fill();
    const swing = Math.sin(now * 6 * pulse) * (state.bpm > 85 ? h * 0.1 : 0);
    ctx.lineWidth = Math.max(4, h * 0.06); ctx.strokeStyle = '#9ca3af'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - w * 0.08, y + h * 0.18); ctx.lineTo(x - w * 0.12 - swing, y + h * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w * 0.08, y + h * 0.18); ctx.lineTo(x + w * 0.12 + swing, y + h * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - w * 0.18, y - h * 0.15); ctx.lineTo(x - w * 0.3, y + swing * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + w * 0.18, y - h * 0.15); ctx.lineTo(x + w * 0.3, y - swing * 0.5); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(h * 0.16, true); ctx.textAlign = 'left';
    ctx.fillText(T('body', 'tubuh'), x + w * 0.4, y - h * 0.1);
    ctx.font = font(h * 0.13);
    ctx.fillText(T('muscles, brain, organs', 'otot, otak, organ'), x + w * 0.4, y + h * 0.1);
    ctx.fillText(T('O₂ out, CO₂ in', 'O₂ keluar, CO₂ masuk'), x + w * 0.4, y + h * 0.3);
  }
  function drawVessels(ctx) {
    const lw = Math.max(8, Math.min(cv.width, cv.height) * 0.04);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = lw;
    for (let i = 1; i < pts.length; i++) {
      const tag = PATH[i - 1].tag;
      let col = '#3b82f6';
      if (tag === 'toBody') col = '#ef4444';
      else if (tag === 'lungs' || tag === 'body') {
        const g = ctx.createLinearGradient(pts[i - 1].x, 0, pts[i].x, 0);
        if (tag === 'lungs') { g.addColorStop(0, '#3b82f6'); g.addColorStop(1, '#ef4444'); } else { g.addColorStop(0, '#ef4444'); g.addColorStop(1, '#3b82f6'); }
        col = g;
      }
      ctx.strokeStyle = col;
      ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
    }
    // flow arrows
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    const arrowAt = [0.08, 0.3, 0.55, 0.8];
    for (const s of arrowAt) {
      posAt(s, tmp); const a = tmp.x, b = tmp.y; posAt(s + 0.01, tmp);
      const ang = Math.atan2(tmp.y - b, tmp.x - a);
      ctx.save(); ctx.translate(a, b); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(lw * 0.5, 0); ctx.lineTo(-lw * 0.25, -lw * 0.35); ctx.lineTo(-lw * 0.25, lw * 0.35); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }
  function drawCells(ctx) {
    const r = Math.max(5, Math.min(cv.width, cv.height) * 0.02);
    for (const c of cells) {
      posAt(c.s, tmp);
      const o2 = o2At(c.s);
      ctx.fillStyle = mix(o2);
      ctx.beginPath(); ctx.arc(tmp.x, tmp.y, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0b1220'; ctx.lineWidth = 1.5; ctx.stroke();
      if (o2 > 0.5) { ctx.fillStyle = '#fff'; ctx.font = font(r * 1.1, true); ctx.textAlign = 'center'; ctx.fillText('O₂', tmp.x, tmp.y + r * 0.4); }
    }
  }
  function drawReadout(ctx) {
    const W = cv.width, H = cv.height;
    const act = activityFor(state.bpm);
    ctx.textAlign = 'left'; ctx.fillStyle = '#f8fafc'; ctx.font = font(H * 0.05, true);
    ctx.fillText(`${tx(act)}: ${state.bpm} bpm`, W * 0.02, H * 0.08);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(H * 0.036);
    ctx.fillText(T('laps per minute (sim)', 'putaran per menit (simulasi)') + `: ${(lapsPerSec() * 60).toFixed(1)}`, W * 0.02, H * 0.14);
    ctx.fillText(T('real body: one trip ≈', 'tubuh sungguhan: satu perjalanan ≈') + ` ${Math.round(realTripSeconds())} s`, W * 0.02, H * 0.19);
    ctx.fillText(T('laps so far', 'putaran sejauh ini') + `: ${state.laps}`, W * 0.02, H * 0.24);
    // pulse trace
    const px = W * 0.02, py = H * 0.34, pw = W * 0.22, ph = H * 0.08;
    ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      const phase = ((state.beatPhase - u * 3) % 1 + 1) % 1;
      const spike = phase < 0.08 ? Math.sin(phase / 0.08 * Math.PI) : phase < 0.14 ? -0.3 * Math.sin((phase - 0.08) / 0.06 * Math.PI) : 0;
      const yy = py - spike * ph;
      if (i === 0) ctx.moveTo(px + u * pw, yy); else ctx.lineTo(px + u * pw, yy);
    }
    ctx.stroke();
    // legend
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(W * 0.78, H * 0.08, H * 0.018, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(W * 0.78, H * 0.14, H * 0.018, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(H * 0.034); ctx.textAlign = 'left';
    ctx.fillText(T('full of oxygen', 'penuh oksigen'), W * 0.8, H * 0.092);
    ctx.fillText(T('low on oxygen', 'sedikit oksigen'), W * 0.8, H * 0.152);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(H * 0.03);
    ctx.fillText(T('tap heart, lungs, body or a tube', 'ketuk jantung, paru-paru, tubuh, atau pipa'), W * 0.76, H * 0.21);
    // fact bubble
    if (state.fact && now - state.factAt < 6) {
      const text = tx(FACTS[state.fact]);
      ctx.font = font(H * 0.04); const bw = W * 0.5, lh = H * 0.05;
      const lines = wrap(ctx, text, bw - 24);
      const bh = lines.length * lh + 18, bx = W * 0.25, byy = H * 0.52 + heartBox().r * 1.3;
      ctx.fillStyle = 'rgba(15,23,42,0.93)'; ctx.beginPath(); ctx.roundRect(bx, byy, bw, bh, 12); ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fef3c7'; ctx.textAlign = 'left';
      lines.forEach((ln, i) => ctx.fillText(ln, bx + 12, byy + 14 + (i + 0.6) * lh));
    }
  }
  function wrap(ctx, text, maxW) {
    const words = text.split(' '), lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur);
    return lines;
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    buildPath();
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    drawVessels(ctx);
    drawLungs(ctx); drawBody(ctx); drawHeart(ctx);
    drawCells(ctx);
    drawReadout(ctx);
    ctx.textAlign = 'left';
  }

  // --- taps ---
  function localPos(e) {
    const r = cv.canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (cv.width / Math.max(1, r.width)), y: (e.clientY - r.top) * (cv.height / Math.max(1, r.height)) };
  }
  function nearestTag(x, y) {
    let best = 1e9, tag = null;
    for (let i = 1; i < pts.length; i++) {
      const ax = pts[i - 1].x, ay = pts[i - 1].y, bx = pts[i].x, by = pts[i].y;
      const L2 = Math.max(1e-6, (bx - ax) ** 2 + (by - ay) ** 2);
      const u = clamp(((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / L2, 0, 1);
      const d = Math.hypot(x - (ax + (bx - ax) * u), y - (ay + (by - ay) * u));
      if (d < best) { best = d; tag = PATH[i - 1].tag; }
    }
    return best < Math.min(cv.width, cv.height) * 0.05 ? tag : null;
  }
  const onDown = (e) => {
    const p = localPos(e);
    const h = heartBox(), l = lungBox(), b = bodyBox();
    let f = null;
    if (Math.hypot(p.x - h.x, p.y - h.y) < h.r * 1.2) f = 'heart';
    else if (Math.abs(p.x - l.x) < l.rx * 2.4 && Math.abs(p.y - l.y) < l.ry * 1.3) f = 'lungs';
    else if (Math.abs(p.x - b.x) < b.w * 0.5 && Math.abs(p.y - b.y) < b.h * 0.6) f = 'body';
    else { const tag = nearestTag(p.x, p.y); if (tag) f = tag === 'toBody' ? 'red' : tag === 'toLungs' ? 'blue' : tag; }
    if (f) { state.fact = f; state.factAt = now; e.preventDefault(); }
  };
  cv.canvas.addEventListener('pointerdown', onDown);

  // --- controls ---
  const bpmS = slider({
    label: T('Heart rate (beats per minute)', 'Denyut jantung (denyut per menit)'), key: 'bpm', min: 50, max: 180, step: 5, value: 70,
    format: (v) => `${v} bpm`,
    onInput: (v) => { state.bpm = v; actSel.value = activityFor(v).key; },
  });
  const actSel = select({
    label: T('Activity', 'Aktivitas'), key: 'activity', value: 'rest',
    options: ACTIVITIES.map((a) => ({ value: a.key, label: `${tx(a)} (${a.bpm} bpm)` })),
    onChange: (v) => { const a = ACTIVITIES.find((k) => k.key === v); if (a) { state.bpm = a.bpm; bpmS.value = a.bpm; } },
  });
  actSel.el.querySelector('select').style.minHeight = '44px';
  const playB = bigBtn(T('Pause', 'Jeda'), () => { state.running = !state.running; playB.label = state.running ? T('Pause', 'Jeda') : T('Play', 'Jalan'); });
  const resetB = bigBtn(T('Reset laps', 'Ulang hitungan'), () => { state.laps = 0; state.lapTimer = 0; });
  ctrlPanel.append(bpmS.el, actSel.el, row(playB, resetB));

  const lab = labPanel({
    title: 'Heart rate and blood speed',
    filename: 'blood-journey-data.csv',
    columns: [
      { key: 'activity', label: 'Activity' },
      { key: 'bpm', label: 'Heart rate (bpm)' },
      { key: 'lpm', label: 'Laps per minute (sim)', format: (v) => v.toFixed(1) },
      { key: 'trip', label: 'One trip in a real body (s)', format: (v) => v.toFixed(0) },
    ],
    procedure: [
      'Choose Resting. Watch one cell go round once. Press Record.',
      'Choose Walking, then Running. Record each one.',
      'Compare the laps per minute. What happens when the heart beats twice as fast?',
      'Feel your own pulse, set the slider to it, and record that too.',
    ],
    predict: 'If the heart beats twice as fast, how many times faster does the blood go round?',
    source: () => ({ activity: activityFor(state.bpm).en, bpm: state.bpm, lpm: lapsPerSec() * 60, trip: realTripSeconds() }),
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt, t) => { now = t; step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.canvas.removeEventListener('pointerdown', onDown); cv.destroy(); };
}
