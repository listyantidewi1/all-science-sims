import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 4 / 3 });

  const params = {
    n: 80,         // particle count
    T: 300,        // K — drives speed: v ∝ sqrt(T)
    Vfrac: 1.0,    // volume fraction (0.3 .. 1.0) — shrinks the right wall
  };

  let particles = [];
  let collisionsPerSec = 0;
  let collisions = 0;
  let lastTick = 0;

  const RADIUS = 4;

  function box() {
    const w = cv.width, h = cv.height;
    const padX = 30, padY = 30;
    const fullW = w - padX * 2;
    return {
      x: padX,
      y: padY,
      w: fullW * params.Vfrac,
      h: h - padY * 2,
    };
  }

  function spawn() {
    const b = box();
    particles = [];
    const speed = Math.sqrt(params.T) * 6;
    for (let i = 0; i < params.n; i++) {
      const a = Math.random() * Math.PI * 2;
      particles.push({
        x: b.x + RADIUS + Math.random() * (b.w - RADIUS * 2),
        y: b.y + RADIUS + Math.random() * (b.h - RADIUS * 2),
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
      });
    }
  }
  spawn();

  function rescaleSpeeds() {
    // Set RMS speed to sqrt(T)*targetScale.
    let sum2 = 0;
    for (const p of particles) sum2 += p.vx * p.vx + p.vy * p.vy;
    const currRMS = Math.sqrt(sum2 / Math.max(1, particles.length));
    const targetRMS = Math.sqrt(params.T) * 6;
    if (currRMS < 1e-6) return;
    const r = targetRMS / currRMS;
    for (const p of particles) { p.vx *= r; p.vy *= r; }
  }

  function step(dt) {
    const b = box();

    // Adjust particle count
    while (particles.length < params.n) {
      const speed = Math.sqrt(params.T) * 6;
      const a = Math.random() * Math.PI * 2;
      particles.push({
        x: b.x + RADIUS + Math.random() * (b.w - RADIUS * 2),
        y: b.y + RADIUS + Math.random() * (b.h - RADIUS * 2),
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
      });
    }
    while (particles.length > params.n) particles.pop();

    rescaleSpeeds();

    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      // Walls
      if (p.x < b.x + RADIUS) { p.x = b.x + RADIUS; p.vx = -p.vx; collisions++; }
      if (p.x > b.x + b.w - RADIUS) { p.x = b.x + b.w - RADIUS; p.vx = -p.vx; collisions++; }
      if (p.y < b.y + RADIUS) { p.y = b.y + RADIUS; p.vy = -p.vy; collisions++; }
      if (p.y > b.y + b.h - RADIUS) { p.y = b.y + b.h - RADIUS; p.vy = -p.vy; collisions++; }
      // Keep inside if box shrunk
      if (p.x > b.x + b.w - RADIUS) p.x = b.x + b.w - RADIUS;
    }

    // Compute collision rate as exponential moving average per second
    lastTick += dt;
    if (lastTick > 0.5) {
      const rate = collisions / lastTick;
      collisionsPerSec = collisionsPerSec * 0.5 + rate * 0.5;
      collisions = 0;
      lastTick = 0;
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const b = box();

    // box
    ctx.strokeStyle = 'rgba(120,130,150,0.9)';
    ctx.lineWidth = 2;
    ctx.strokeRect(b.x, b.y, b.w, b.h);

    // particles — color by speed
    for (const p of particles) {
      const sp = Math.hypot(p.vx, p.vy);
      const norm = Math.min(1, sp / (Math.sqrt(800) * 6));
      const r = 60 + 195 * norm;
      const g = 60;
      const blue = 60 + 195 * (1 - norm);
      ctx.fillStyle = `rgb(${r|0},${g},${blue|0})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    // PV = nRT — display each variable plus a derived "PV/nT" check
    // We treat "pressure" ≈ collisionsPerSec / wall length.
    const wallLen = 2 * (b.w + b.h);
    const pseudoP = collisionsPerSec / wallLen * 100;
    const v = b.w * b.h;
    const PV_nT = pseudoP * v / (params.n * params.T);

    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 13px var(--font-sans)';
    const lines = [
      `n = ${params.n}    T = ${params.T} K    V (rel) = ${params.Vfrac.toFixed(2)}`,
      `Pressure ≈ ${pseudoP.toFixed(1)} (collisions/s/length)`,
      `PV / nT = ${PV_nT.toFixed(3)}  (should be roughly constant)`,
    ];
    let y0 = 18;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(b.x + 4, b.y + 4, 360, lines.length * 16 + 6);
    ctx.fillStyle = '#fff';
    for (const line of lines) { ctx.fillText(line, b.x + 10, y0 + b.y); y0 += 16; }
  }

  // controls
  const nS = slider({
    label: 'Particles (n)', min: 10, max: 250, step: 1, value: params.n,
    onInput: (v) => { params.n = v; },
  });
  const tS = slider({
    label: 'Temperature T (K)', min: 100, max: 800, step: 5, value: params.T,
    onInput: (v) => { params.T = v; rescaleSpeeds(); },
  });
  const vS = slider({
    label: 'Volume (V relative)', min: 0.3, max: 1.0, step: 0.01, value: params.Vfrac, format: (v) => v.toFixed(2),
    onInput: (v) => { params.Vfrac = v; },
  });
  const resetB = button({ label: 'Reset', onClick: spawn });

  ctrlPanel.append(nS.el, tS.el, vS.el, row(resetB));

  // Lab — verify Boyle/Charles/Gay-Lussac and that PV/nT ≈ constant.
  function pseudoP() {
    const b = box();
    const wallLen = 2 * (b.w + b.h);
    return collisionsPerSec / wallLen * 100;
  }
  const lab = labPanel({
    title: 'Gas laws lab — PV = nRT',
    filename: 'gas-laws-lab.csv',
    columns: [
      { key: 'n',  label: 'n (particles)' },
      { key: 'T',  label: 'T (K)' },
      { key: 'V',  label: 'V (rel)',     format: (v) => v.toFixed(2) },
      { key: 'P',  label: 'P (units)',   format: (v) => v.toFixed(2) },
      { key: 'PV', label: 'P·V',         format: (v) => v.toFixed(3) },
      { key: 'PVnT', label: 'PV/(nT)',   format: (v) => v.toFixed(4) },
    ],
    procedure: [
      'Boyle\'s law: hold T and n constant. Set V = 1.0, wait, record. Then 0.7, 0.5, 0.3.',
      'Verify: as V drops, P rises so that P·V stays roughly constant.',
      'Charles\'s law: hold V and n constant. Set T = 200, 400, 600, 800 K. Record each.',
      'Verify: V/T constant when P fixed (here it\'s P that grows with T at fixed V).',
      'Combined: change all three. Confirm PV/(nT) ≈ constant — that\'s R.',
    ],
    predict: 'If you halve V at constant T, what should happen to P? Halve T at constant V?',
    source: () => {
      const P = pseudoP();
      const V = params.Vfrac;
      return {
        n: params.n,
        T: params.T,
        V,
        P,
        PV: P * V,
        PVnT: P * V / (params.n * params.T),
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();

  return () => { animator.stop(); cv.destroy(); };
}
