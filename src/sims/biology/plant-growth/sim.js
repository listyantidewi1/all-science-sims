import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

const WATER = ['None', 'Some', 'Lots'];
const LIGHT = ['Dark', 'Shade', 'Sun'];
const MAX_DAYS = 30;
const MAX_CM = 30;

function newPot(water, light) {
  return { water, light, days: 0, height: 0, health: 1, wet: 0, dark: 0, sprout: 0, status: 'seed' };
}

// One day passes for one pot. Simple rules a child can discover:
// no water = nothing sprouts and plants dry up; too much water drowns the
// roots after a few days; no light = pale, slow, and dies after a few days.
function stepDay(p) {
  if (p.days >= MAX_DAYS) return;
  p.days++;
  if (p.status === 'dead') return;
  if (p.height === 0) {
    if (p.water > 0) p.sprout++;
    if (p.sprout >= 2) { p.height = 1; p.status = 'healthy'; }
    return;
  }
  let stress = 0;
  if (p.water === 0) stress += 0.3;
  if (p.water === 2) { p.wet++; if (p.wet > 4) stress += 0.2; } else p.wet = 0;
  if (p.light === 0) { p.dark++; if (p.dark > 3) stress += 0.25; } else p.dark = 0;
  p.health = stress === 0 ? Math.min(1, p.health + 0.2) : Math.max(0, p.health - stress);
  const wf = [0, 1, 0.6][p.water];
  const lf = [0.4, 0.6, 1][p.light];
  p.height = Math.min(MAX_CM, p.height + 2.4 * wf * lf * p.health);
  p.status = p.health <= 0 ? 'dead' : p.health < 0.6 ? 'wilted' : 'healthy';
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const pots = [newPot(1, 2), newPot(0, 2)];
  let playing = false;
  let playClock = 0;
  let recordPot = 0;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    if (W < 20 || H < 20) return;
    const pw = W / 2;
    for (let i = 0; i < 2; i++) drawPanel(ctx, pots[i], i * pw, 0, pw, H, i === 0 ? 'Pot A' : 'Pot B');
    ctx.fillStyle = '#fff';
    ctx.fillRect(pw - 2, 0, 4, H);
  }

  function drawPanel(ctx, p, x, y, w, h, name) {
    // Sky depends on the light setting
    ctx.fillStyle = ['#1e293b', '#cbd5e1', '#7dd3fc'][p.light];
    ctx.fillRect(x, y, w, h);
    const groundY = y + h * 0.84;
    ctx.fillStyle = p.light === 0 ? '#14532d' : '#4ade80';
    ctx.fillRect(x, groundY, w, h - (groundY - y));

    // Light icon (sun, sun behind a cloud, or moon)
    const ix = x + w - 60, iy = y + 55;
    if (p.light === 2) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(ix, iy, 26, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 5;
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(ix + Math.cos(a) * 32, iy + Math.sin(a) * 32);
        ctx.lineTo(ix + Math.cos(a) * 42, iy + Math.sin(a) * 42); ctx.stroke();
      }
    } else if (p.light === 1) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(ix + 10, iy - 10, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f1f5f9';
      for (const [dx, dy, r] of [[-18, 10, 18], [0, 4, 22], [18, 10, 17]]) {
        ctx.beginPath(); ctx.arc(ix + dx, iy + dy, r, 0, Math.PI * 2); ctx.fill();
      }
    } else {
      ctx.fillStyle = '#fef9c3';
      ctx.beginPath(); ctx.arc(ix, iy, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1e293b';
      ctx.beginPath(); ctx.arc(ix + 12, iy - 6, 20, 0, Math.PI * 2); ctx.fill();
    }

    // Watering can with drops
    const cx = x + 50, cy = y + 60;
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(cx - 22, cy - 14, 36, 30);
    ctx.beginPath(); ctx.moveTo(cx + 14, cy - 6); ctx.lineTo(cx + 36, cy - 24); ctx.lineTo(cx + 40, cy - 16); ctx.lineTo(cx + 14, cy + 4); ctx.fill();
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(cx - 4, cy - 14, 14, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    const drops = [0, 2, 6][p.water];
    for (let k = 0; k < drops; k++) {
      ctx.beginPath(); ctx.ellipse(cx + 44 + (k % 3) * 12, cy - 4 + Math.floor(k / 3) * 16 + (k % 2) * 6, 4, 7, 0, 0, Math.PI * 2); ctx.fill();
    }

    // Pot
    const px = x + w * 0.45, soilY = y + h * 0.66, potH = groundY - soilY;
    ctx.fillStyle = '#c2410c';
    ctx.beginPath(); ctx.moveTo(px - 60, soilY); ctx.lineTo(px + 60, soilY); ctx.lineTo(px + 44, groundY); ctx.lineTo(px - 44, groundY); ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(px - 66, soilY - 10, 132, 14);
    ctx.fillStyle = '#44403c';
    ctx.fillRect(px - 54, soilY - 8, 108, 10);
    if (p.height === 0) {
      ctx.fillStyle = '#92400e';
      ctx.beginPath(); ctx.ellipse(px, soilY - 8, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
    }

    // Ruler (0 to 30 cm)
    const rx = x + w * 0.82, rTop = y + h * 0.14, rBot = soilY - 8;
    const cm2px = (rBot - rTop) / MAX_CM;
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(rx - 6, rTop - 6, 30, rBot - rTop + 12);
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2;
    ctx.fillStyle = '#92400e';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    for (let c = 0; c <= MAX_CM; c += 5) {
      const yy = rBot - c * cm2px;
      ctx.beginPath(); ctx.moveTo(rx - 6, yy); ctx.lineTo(rx + 8, yy); ctx.stroke();
      ctx.fillText(String(c), rx + 10, yy + 4);
    }

    // Plant
    if (p.height > 0) drawPlant(ctx, p, px, soilY - 8, p.height * cm2px);
    if (p.height > 0 && p.status !== 'dead') {
      ctx.strokeStyle = '#dc2626'; ctx.setLineDash([4, 4]); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px, rBot - p.height * cm2px); ctx.lineTo(rx - 6, rBot - p.height * cm2px); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Words: name, day, how it looks
    ctx.fillStyle = p.light === 0 ? '#f8fafc' : '#1e293b';
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.fillText(name, x + w / 2, y + 34);
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText(`Day ${p.days}`, x + w / 2, y + 60);
    const look = { seed: 'Seed', healthy: 'Healthy', wilted: 'Wilted', dead: 'Dead' }[p.status];
    ctx.fillStyle = '#1e293b';
    ctx.fillText(`${look}  -  ${Math.round(p.height)} cm`, px, groundY + (h - (groundY - y)) / 2 + 7);
    ctx.textAlign = 'left';
  }

  function drawPlant(ctx, p, x0, y0, lenPx) {
    const droop = p.status === 'dead' ? 1 : p.status === 'wilted' ? 0.55 : 0.08;
    const stemColor = p.status === 'dead' ? '#78350f' : p.light === 0 ? '#d9f99d' : '#15803d';
    const leafColor = p.status === 'dead' ? '#92400e' : p.status === 'wilted' ? '#ca8a04' : p.light === 0 ? '#ecfccb' : '#22c55e';
    const bendX = droop * lenPx * 0.7, upY = lenPx * (1 - 0.45 * droop);
    const stem = (t) => ({ x: x0 + bendX * t * t, y: y0 - upY * t + droop * lenPx * 0.25 * t * t });
    ctx.strokeStyle = stemColor;
    ctx.lineWidth = Math.max(3, Math.min(8, lenPx / 25));
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0);
    for (let t = 0.05; t <= 1.001; t += 0.05) { const s = stem(t); ctx.lineTo(s.x, s.y); }
    ctx.stroke();
    const nLeaves = Math.floor(p.height / 4);
    ctx.fillStyle = leafColor;
    for (let k = 1; k <= nLeaves; k++) {
      const s = stem(k / (nLeaves + 1));
      const side = k % 2 ? -1 : 1;
      const size = 9 + Math.min(14, p.height * 0.35);
      ctx.beginPath();
      ctx.ellipse(s.x + side * size * 0.8, s.y + droop * 8, size, size * 0.45, side * (-0.5 + droop * 0.9), 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.height >= 20 && p.status === 'healthy') {
      const top = stem(1);
      ctx.fillStyle = '#f472b6';
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        ctx.beginPath(); ctx.arc(top.x + Math.cos(a) * 11, top.y + Math.sin(a) * 11, 8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#fde047';
      ctx.beginPath(); ctx.arc(top.x, top.y, 8, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ---- Controls -------------------------------------------------------
  function choice(labelText, options, value, onChange) {
    const wrap = document.createElement('div');
    wrap.className = 'ctrl-row';
    const lab = document.createElement('span');
    lab.textContent = labelText;
    lab.style.cssText = 'font-weight:600;align-self:center;min-width:5em';
    wrap.appendChild(lab);
    const btns = options.map((o, i) => {
      const b = button({ label: o, onClick: () => { set(i); onChange(i); } });
      b.el.style.minHeight = '44px';
      wrap.appendChild(b.el);
      return b.el;
    });
    function set(i) { btns.forEach((b, k) => b.classList.toggle('btn--primary', k === i)); }
    set(value);
    return { el: wrap, set };
  }
  const choices = [];
  for (let i = 0; i < 2; i++) {
    const title = document.createElement('div');
    title.textContent = i === 0 ? 'Pot A' : 'Pot B';
    title.style.cssText = 'font-weight:700;font-size:1.1em;margin-top:6px';
    const w = choice('Water', WATER, pots[i].water, (v) => { pots[i].water = v; });
    const l = choice('Light', LIGHT, pots[i].light, (v) => { pots[i].light = v; });
    choices.push(w, l);
    ctrlPanel.append(title, w.el, l.el);
  }
  const big = (b) => { b.el.style.minHeight = '48px'; b.el.style.fontSize = '1.05em'; return b; };
  const nextBtn = big(button({ label: 'Next day', primary: true, onClick: () => pots.forEach(stepDay) }));
  const playBtn = big(button({ label: 'Play days', onClick: () => { playing = !playing; playBtn.label = playing ? 'Pause' : 'Play days'; } }));
  const resetBtn = big(button({ label: 'Start again', onClick: () => {
    for (let i = 0; i < 2; i++) Object.assign(pots[i], newPot(pots[i].water, pots[i].light));
    playing = false; playBtn.label = 'Play days';
  } }));
  ctrlPanel.appendChild(row(nextBtn, playBtn, resetBtn));

  const which = choice('Record', ['Pot A', 'Pot B'], 0, (v) => { recordPot = v; });
  ctrlPanel.appendChild(which.el);
  const lab = labPanel({
    title: 'Plant diary',
    filename: 'plant-growth-lab.csv',
    columns: [
      { key: 'pot',    label: 'Pot' },
      { key: 'water',  label: 'Water' },
      { key: 'light',  label: 'Light' },
      { key: 'days',   label: 'Days' },
      { key: 'height', label: 'Height (cm)', format: (v) => v.toFixed(1) },
      { key: 'looks',  label: 'Plant looks' },
    ],
    procedure: [
      'Pick water and light for Pot A and Pot B. Change only one thing between them.',
      'Guess which pot will grow taller.',
      'Press Next day 10 times. Record both pots.',
      'Try a new mix and compare the heights in your table.',
    ],
    predict: 'Which pot will grow taller? Why do you think so?',
    source: () => {
      const p = pots[recordPot];
      return { pot: recordPot === 0 ? 'A' : 'B', water: WATER[p.water], light: LIGHT[p.light], days: p.days, height: p.height, looks: p.status };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    if (playing) {
      playClock += dt;
      if (playClock > 0.7) { playClock = 0; pots.forEach(stepDay); }
      if (pots.every((p) => p.days >= MAX_DAYS)) { playing = false; playBtn.label = 'Play days'; }
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
