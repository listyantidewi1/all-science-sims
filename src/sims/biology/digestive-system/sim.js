import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Design units: 800 x 450. The child stands on the left; the info card is on the right.
const STAGES = [
  { id: 'mouth', name: 'Mouth', job: 'Teeth chew. Spit (saliva) makes it soft.', timeText: '1 minute', hours: 0, color: '#f472b6', width: 18, secs: 2,
    path: [[200, 78], [200, 92]] },
  { id: 'esophagus', name: 'Food pipe', job: 'Squeezes the food down to the stomach.', timeText: '10 seconds', hours: 0, color: '#fb923c', width: 12, secs: 2,
    path: [[200, 92], [200, 150], [212, 168]] },
  { id: 'stomach', name: 'Stomach', job: 'Churns the food. Acid breaks it up into soup.', timeText: '3 hours', hours: 3, color: '#ef4444', width: 56, secs: 3,
    path: [[212, 168], [232, 190], [222, 212], [196, 222]] },
  { id: 'small', name: 'Small intestine', job: 'Takes the good parts into the blood.', timeText: '5 hours', hours: 5, color: '#facc15', width: 15, secs: 4,
    path: [[196, 222], [172, 238], [228, 250], [168, 264], [232, 278], [170, 292], [226, 304], [196, 312], [160, 302]] },
  { id: 'large', name: 'Large intestine', job: 'Takes back water. Leftovers get firm.', timeText: '1 day (24 hours)', hours: 24, color: '#a3e635', width: 24, secs: 4,
    path: [[160, 302], [152, 230], [250, 230], [252, 316], [206, 330]] },
  { id: 'out', name: 'Out!', job: 'What is left leaves the body.', timeText: '', hours: 0, color: '#94a3b8', width: 10, secs: 1.5,
    path: [[206, 330], [206, 352]] },
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });
  const st = { stage: -1, progress: 0, playing: false, info: null, t: 0, flash: 0 };
  const S = () => cv.width / 800;

  function eat() { st.stage = 0; st.progress = 0; st.info = 0; st.flash = 1; }
  function step() {
    if (st.stage < 0) { eat(); return; }
    if (st.stage >= STAGES.length - 1) { st.progress = 1; st.playing = false; return; }
    st.stage++; st.progress = 0; st.info = st.stage; st.flash = 1;
  }
  function update(dt) {
    st.t += dt;
    st.flash = Math.max(0, st.flash - dt);
    if (st.stage < 0) return;
    const sg = STAGES[st.stage];
    if (st.progress < 1) st.progress = Math.min(1, st.progress + dt / sg.secs);
    else if (st.playing) { if (st.stage < STAGES.length - 1) step(); else st.playing = false; }
  }

  function along(path, u) {
    const segs = [];
    let total = 0;
    for (let i = 1; i < path.length; i++) { const d = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]); segs.push(d); total += d; }
    let dist = u * total;
    for (let i = 1; i < path.length; i++) {
      if (dist <= segs[i - 1] || i === path.length - 1) {
        const k = segs[i - 1] ? Math.min(1, dist / segs[i - 1]) : 0;
        return [path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k];
      }
      dist -= segs[i - 1];
    }
    return path[path.length - 1];
  }

  function hoursSoFar() {
    let h = 0;
    for (let i = 0; i < st.stage; i++) h += STAGES[i].hours;
    if (st.stage >= 0) h += STAGES[st.stage].hours * st.progress;
    return Math.round(h);
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.scale(S(), S());
    ctx.fillStyle = '#ecfeff'; ctx.fillRect(0, 0, 800, 450);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // Body outline
    ctx.fillStyle = '#fde7cf'; ctx.strokeStyle = '#d4a27a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(200, 48, 36, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(185, 82); ctx.lineTo(215, 82); ctx.lineTo(215, 96); ctx.lineTo(185, 96); ctx.closePath(); ctx.fill();
    roundBody(ctx, 130, 96, 140, 250, 40); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 26; ctx.strokeStyle = '#fde7cf';
    ctx.beginPath(); ctx.moveTo(135, 120); ctx.lineTo(90, 230); ctx.moveTo(265, 120); ctx.lineTo(310, 230); ctx.stroke();
    ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(172, 340); ctx.lineTo(166, 440); ctx.moveTo(228, 340); ctx.lineTo(234, 440); ctx.stroke();
    // Face: eyes and a mouth that chews
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.arc(188, 42, 3.5, 0, Math.PI * 2); ctx.arc(212, 42, 3.5, 0, Math.PI * 2); ctx.fill();
    const chewing = st.stage === 0 && st.progress < 1;
    const open = chewing ? 4 + Math.abs(Math.sin(st.t * 10)) * 6 : 3;
    ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.ellipse(200, 66, 12, open, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(190, 62, 20, 3);

    // Blood vessel next to the small intestine
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(128, 232); ctx.lineTo(128, 320); ctx.stroke();

    // Organs (tubes), active one glows
    for (let i = 0; i < STAGES.length; i++) {
      const sg = STAGES[i];
      const active = i === st.stage || i === st.info;
      if (sg.id === 'mouth') continue;
      ctx.save();
      if (active) { ctx.shadowColor = sg.color; ctx.shadowBlur = 18; }
      ctx.strokeStyle = active ? sg.color : shade(sg.color);
      ctx.lineWidth = sg.width;
      if (sg.id === 'stomach') {
        const wob = i === st.stage && st.progress < 1 ? Math.sin(st.t * 8) * 3 : 0;
        ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.ellipse(220, 192, 34 + wob, 30 - wob, -0.4, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.beginPath(); ctx.moveTo(sg.path[0][0], sg.path[0][1]);
        for (let k = 1; k < sg.path.length; k++) ctx.lineTo(sg.path[k][0], sg.path[k][1]);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Stage effects
    if (st.stage >= 0 && st.progress < 1) {
      const sg = STAGES[st.stage];
      ctx.fillStyle = 'rgba(56,189,248,0.9)';
      if (sg.id === 'mouth') for (let k = 0; k < 4; k++) { const a = st.t * 3 + k; ctx.beginPath(); ctx.arc(200 + Math.cos(a) * 20, 70 + ((a * 9) % 20), 3, 0, Math.PI * 2); ctx.fill(); }
      if (sg.id === 'esophagus') { const [x, y] = along(sg.path, st.progress); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 11, 5, 0, 0, Math.PI * 2); ctx.stroke(); }
      if (sg.id === 'stomach') for (let k = 0; k < 6; k++) { const a = st.t * 2 + k * 1.1; ctx.fillStyle = 'rgba(190,255,120,0.9)'; ctx.beginPath(); ctx.arc(220 + Math.cos(a) * 20, 192 + Math.sin(a * 1.3) * 16, 4, 0, Math.PI * 2); ctx.fill(); }
      if (sg.id === 'small') for (let k = 0; k < 5; k++) { const u = (st.t * 0.5 + k * 0.2) % 1; const y = 240 + k * 16; ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.moveTo(165 - u * 30, y - 5); ctx.lineTo(155 - u * 30, y); ctx.lineTo(165 - u * 30, y + 5); ctx.closePath(); ctx.fill(); }
      if (sg.id === 'large') for (let k = 0; k < 5; k++) { const u = (st.t * 0.6 + k * 0.2) % 1; ctx.fillStyle = 'rgba(56,189,248,0.9)'; ctx.beginPath(); ctx.arc(252 + u * 30, 240 + k * 18, 4, 0, Math.PI * 2); ctx.fill(); }
    }

    // The bite of food
    if (st.stage >= 0) {
      const sg = STAGES[st.stage];
      const [x, y] = along(sg.path, st.progress);
      const r = st.stage < 2 ? 9 : st.stage < 4 ? 7 : 5;
      ctx.fillStyle = st.stage >= 2 ? '#a16207' : '#d97706'; ctx.strokeStyle = '#78350f'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      if (sg.id === 'out' && st.progress >= 1) { ctx.fillStyle = '#1e293b'; ctx.font = 'bold 16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Out!', 206, 380); }
    }

    // Stage list / buttons on the right
    for (let i = 0; i < STAGES.length; i++) {
      const sg = STAGES[i], y = 30 + i * 46;
      const here = i === st.stage, chosen = i === st.info;
      ctx.fillStyle = here ? sg.color : chosen ? '#e2e8f0' : '#f8fafc';
      ctx.strokeStyle = chosen ? '#334155' : '#cbd5e1'; ctx.lineWidth = chosen ? 3 : 1.5;
      roundBody(ctx, 380, y, 170, 40, 10); ctx.fill(); ctx.stroke();
      ctx.fillStyle = sg.color; ctx.beginPath(); ctx.arc(402, y + 20, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = here ? '#fff' : '#1e293b'; ctx.font = 'bold 15px system-ui, sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(sg.name, 420, y + 25);
    }
    // Info card
    const info = st.info != null ? STAGES[st.info] : null;
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    roundBody(ctx, 570, 30, 210, 180, 14); ctx.fill(); ctx.stroke();
    ctx.textAlign = 'left';
    if (info) {
      ctx.fillStyle = info.color; ctx.fillRect(570, 30, 210, 10);
      ctx.fillStyle = '#1e293b'; ctx.font = 'bold 22px system-ui, sans-serif'; ctx.fillText(info.name, 586, 72);
      ctx.font = '500 14px system-ui, sans-serif'; ctx.fillStyle = '#334155';
      wrapText(ctx, info.job, 586, 100, 180, 20);
      if (info.timeText) { ctx.font = 'bold 15px system-ui, sans-serif'; ctx.fillStyle = '#0f766e'; ctx.fillText(`Food stays: ${info.timeText}`, 586, 180); }
    } else {
      ctx.fillStyle = '#334155'; ctx.font = '500 15px system-ui, sans-serif';
      wrapText(ctx, 'Press Eat to start. Click an organ to read its job.', 586, 70, 180, 22);
    }
    // Clock
    ctx.fillStyle = '#fff'; roundBody(ctx, 570, 230, 210, 60, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText(`${hoursSoFar()} hours`, 586, 268);
    ctx.font = '500 12px system-ui, sans-serif'; ctx.fillStyle = '#64748b'; ctx.fillText('since eating', 700, 268);
    ctx.font = 'bold 15px system-ui, sans-serif'; ctx.fillStyle = '#334155';
    ctx.fillText(st.stage < 0 ? '' : st.progress < 1 ? `Now in: ${STAGES[st.stage].name}` : st.stage === STAGES.length - 1 ? 'All done! Press Eat again.' : 'Press Step to go on.', 570, 320);
    ctx.restore();
  }

  function shade(hex) { return hex + '88'; }
  function roundBody(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }
  function wrapText(ctx, text, x, y, maxW, lh) {
    let line = '';
    for (const word of text.split(' ')) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); y += lh; line = word; } else line = test;
    }
    if (line) ctx.fillText(line, x, y);
  }

  // Click an organ (on the body or in the list) to read its job.
  function distToPath(path, x, y) {
    let best = Infinity;
    for (let i = 1; i < path.length; i++) {
      const [ax, ay] = path[i - 1], [bx, by] = path[i];
      const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy || 1;
      const k = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2));
      best = Math.min(best, Math.hypot(x - (ax + dx * k), y - (ay + dy * k)));
    }
    return best;
  }
  function onPointerDown(e) {
    const r = cv.canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) / S(), y = (e.clientY - r.top) / S();
    for (let i = 0; i < STAGES.length; i++) {
      const ly = 30 + i * 46;
      if (x >= 380 && x <= 550 && y >= ly && y <= ly + 40) { st.info = i; return; }
    }
    if (Math.hypot(x - 220, y - 192) < 40) { st.info = 2; return; }
    if (Math.hypot(x - 200, y - 68) < 26) { st.info = 0; return; }
    for (let i = 0; i < STAGES.length; i++) if (distToPath(STAGES[i].path, x, y) < STAGES[i].width / 2 + 8) { st.info = i; return; }
  }
  cv.canvas.addEventListener('pointerdown', onPointerDown);
  cv.canvas.style.touchAction = 'manipulation';

  const big = (b) => { b.el.style.minHeight = '48px'; b.el.style.fontSize = '1.05rem'; b.el.style.padding = '10px 22px'; return b; };
  const eatBtn = big(button({ label: 'Eat', primary: true, onClick: () => { eat(); } }));
  const stepBtn = big(button({ label: 'Step', onClick: () => { st.playing = false; step(); } }));
  const playBtn = big(button({ label: 'Play', onClick: () => {
    st.playing = !st.playing;
    if (st.playing && (st.stage < 0 || (st.stage === STAGES.length - 1 && st.progress >= 1))) eat();
    playBtn.label = st.playing ? 'Pause' : 'Play';
  } }));
  ctrlPanel.appendChild(row(eatBtn, stepBtn, playBtn));

  const lab = labPanel({
    title: 'Where is the food? What happens there?',
    filename: 'digestive-system-lab.csv',
    columns: [
      { key: 'organ', label: 'Organ' },
      { key: 'job', label: 'What it does' },
      { key: 'hours', label: 'Time (hours)', format: (v) => (v === 0 ? 'less than 1' : String(v)) },
    ],
    procedure: [
      'Press Eat. Watch the bite go into the mouth.',
      'Press Step to move to the next organ. Read its job.',
      'Press Record for each organ the food visits.',
      'Add up the hours. How long does food stay in the body?',
    ],
    source: () => {
      const i = st.info != null ? st.info : st.stage;
      if (i == null || i < 0) return null;
      const sg = STAGES[i];
      return { organ: sg.name, job: sg.job, hours: sg.hours };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { update(dt); draw(); });
  animator.start();
  return () => {
    animator.stop();
    st.playing = false;
    cv.canvas.removeEventListener('pointerdown', onPointerDown);
    cv.destroy();
  };
}
