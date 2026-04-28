import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    nA: 30,
    nB: 30,
    T: 300,           // K
    Ea: 40,           // arbitrary units
  };

  const RADIUS = 5;
  let A = [], B = [], C = [];   // particle lists
  let collisions = 0;
  let reactions = 0;
  let reactionsLast = 0;
  let lastTick = 0;
  let rateEMA = 0;

  function spawn(arr, n, color) {
    for (let i = 0; i < n; i++) {
      arr.push({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - 0.5) * Math.sqrt(params.T) * 4,
        vy: (Math.random() - 0.5) * Math.sqrt(params.T) * 4,
        color,
      });
    }
  }
  function reset() {
    A = []; B = []; C = [];
    collisions = 0; reactions = 0; reactionsLast = 0;
    spawn(A, params.nA, '#3b82f6');
    spawn(B, params.nB, '#ef4444');
  }
  reset();

  function step(dt) {
    const meanV = Math.sqrt(params.T) * 4;
    function rescale(arr) {
      let s2 = 0;
      for (const p of arr) s2 += p.vx * p.vx + p.vy * p.vy;
      const cur = Math.sqrt(s2 / Math.max(1, arr.length));
      const target = meanV;
      if (cur < 0.1) return;
      const r = target / cur;
      for (const p of arr) { p.vx *= r; p.vy *= r; }
    }
    rescale(A); rescale(B);

    // ensure counts
    while (A.length < params.nA) spawn(A, 1, '#3b82f6');
    while (B.length < params.nB) spawn(B, 1, '#ef4444');
    while (A.length > params.nA) A.pop();
    while (B.length > params.nB) B.pop();

    function move(arr) {
      for (const p of arr) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < RADIUS) { p.x = RADIUS; p.vx = -p.vx; }
        if (p.x > cv.width - RADIUS) { p.x = cv.width - RADIUS; p.vx = -p.vx; }
        if (p.y < RADIUS) { p.y = RADIUS; p.vy = -p.vy; }
        if (p.y > cv.height - RADIUS) { p.y = cv.height - RADIUS; p.vy = -p.vy; }
      }
    }
    move(A); move(B); move(C);

    // collisions A-B
    for (let i = A.length - 1; i >= 0; i--) {
      for (let j = B.length - 1; j >= 0; j--) {
        const a = A[i], b = B[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < RADIUS * 2) {
          collisions++;
          // kinetic energy of pair
          const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
          const ke = 0.5 * (dvx * dvx + dvy * dvy);
          if (ke > params.Ea) {
            // react: remove A and B, create C at midpoint
            C.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
              vx: (a.vx + b.vx) / 2, vy: (a.vy + b.vy) / 2,
              color: '#10b981' });
            A.splice(i, 1); B.splice(j, 1);
            reactions++;
            break;
          } else {
            // bounce
            a.vx = -a.vx; a.vy = -a.vy;
            b.vx = -b.vx; b.vy = -b.vy;
          }
        }
      }
    }

    // running rate (reactions/sec)
    lastTick += dt;
    if (lastTick > 0.5) {
      const r = (reactions - reactionsLast) / lastTick;
      rateEMA = rateEMA * 0.5 + r * 0.5;
      reactionsLast = reactions;
      lastTick = 0;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, cv.width, cv.height);

    function drawList(arr) {
      for (const p of arr) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    drawList(A); drawList(B); drawList(C);

    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 64);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`A: ${A.length}    B: ${B.length}    C: ${C.length}`, 16, 26);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Collisions: ${collisions}    Reactions: ${reactions}`, 16, 44);
    ctx.fillText(`Rate ≈ ${rateEMA.toFixed(1)} /s    T=${params.T} K   Eₐ=${params.Ea}`, 16, 62);
  }

  // controls
  const nAS = slider({ label: '[A] particles', min: 5, max: 100, step: 1, value: params.nA,
    onInput: (v) => { params.nA = v; } });
  const nBS = slider({ label: '[B] particles', min: 5, max: 100, step: 1, value: params.nB,
    onInput: (v) => { params.nB = v; } });
  const TS = slider({ label: 'Temperature (K)', min: 100, max: 1000, step: 10, value: params.T,
    onInput: (v) => { params.T = v; } });
  const eaS = slider({ label: 'Activation energy Eₐ', min: 0, max: 200, step: 1, value: params.Ea,
    onInput: (v) => { params.Ea = v; } });
  const catB = button({ label: 'Add catalyst (lower Eₐ)', primary: true, onClick: () => {
    params.Ea = Math.max(0, params.Ea * 0.5);
    eaS.value = params.Ea;
  } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(nAS.el, nBS.el, TS.el, eaS.el, row(catB, resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
