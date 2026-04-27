import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    saltLeft: 30,
    saltRight: 60,
    waterLeft: 200,
    waterRight: 200,
    flowSpeed: 1.0,
  };

  let waterParticles = [];   // {x, y, side}
  let saltParticles = [];

  function reset() {
    waterParticles = [];
    saltParticles = [];
    populate();
  }
  function populate() {
    waterParticles = [];
    saltParticles = [];
    for (let i = 0; i < params.waterLeft; i++) waterParticles.push(makeParticle('left', 'water'));
    for (let i = 0; i < params.waterRight; i++) waterParticles.push(makeParticle('right', 'water'));
    for (let i = 0; i < params.saltLeft; i++) saltParticles.push(makeParticle('left', 'salt'));
    for (let i = 0; i < params.saltRight; i++) saltParticles.push(makeParticle('right', 'salt'));
  }
  function makeParticle(side, kind) {
    return {
      x: side === 'left' ? Math.random() * 0.45 : 0.55 + Math.random() * 0.45,
      y: 0.05 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      side, kind,
    };
  }

  function step(dt) {
    // ensure correct counts of salt
    matchCount(saltParticles, 'left', 'salt', params.saltLeft);
    matchCount(saltParticles, 'right', 'salt', params.saltRight);

    // Concentration-driven imbalance: water moves from low-solute side to high-solute side.
    // Simple rule: each frame, with probability proportional to salt diff, swap one water across.
    const concL = params.saltLeft / Math.max(1, countSide(waterParticles, 'left') + params.saltLeft);
    const concR = params.saltRight / Math.max(1, countSide(waterParticles, 'right') + params.saltRight);
    const drive = (concR - concL) * params.flowSpeed; // positive: water moves right→left? No: water moves to higher concentration. concR > concL means right is more concentrated, so water flows right.
    // We'll move water from low-conc side to high-conc side
    if (Math.random() < Math.abs(drive) * 0.6 * dt * 60) {
      const from = drive > 0 ? 'left' : 'right';
      const to = drive > 0 ? 'right' : 'left';
      // find a water particle on `from` side and move to `to`
      const candidates = [];
      for (let i = 0; i < waterParticles.length; i++) {
        if (waterParticles[i].side === from) candidates.push(i);
      }
      if (candidates.length > 1) {
        const idx = candidates[Math.floor(Math.random() * candidates.length)];
        waterParticles[idx].side = to;
        waterParticles[idx].x = to === 'left' ? Math.random() * 0.45 : 0.55 + Math.random() * 0.45;
      }
    }

    // jitter all particles
    for (const p of [...waterParticles, ...saltParticles]) {
      p.x += p.vx * dt * 0.3;
      p.y += p.vy * dt * 0.3;
      // bounce within compartment
      const xMin = p.side === 'left' ? 0.02 : 0.55;
      const xMax = p.side === 'left' ? 0.45 : 0.98;
      if (p.x < xMin) { p.x = xMin; p.vx = -p.vx; }
      if (p.x > xMax) { p.x = xMax; p.vx = -p.vx; }
      if (p.y < 0.02) { p.y = 0.02; p.vy = -p.vy; }
      if (p.y > 0.98) { p.y = 0.98; p.vy = -p.vy; }
      if (Math.random() < 0.05) { p.vx += (Math.random() - 0.5) * 0.5; p.vy += (Math.random() - 0.5) * 0.5; }
    }
  }

  function matchCount(arr, side, kind, target) {
    let count = 0;
    for (const p of arr) if (p.side === side && p.kind === kind) count++;
    while (count < target) { arr.push(makeParticle(side, kind)); count++; }
    while (count > target) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].side === side && arr[i].kind === kind) { arr.splice(i, 1); count--; break; }
      }
    }
  }
  function countSide(arr, side) {
    let n = 0;
    for (const p of arr) if (p.side === side) n++;
    return n;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // beaker
    ctx.fillStyle = '#0c4a6e';
    ctx.fillRect(0, 0, W, H);

    // membrane
    ctx.fillStyle = '#374151';
    ctx.fillRect(W * 0.5 - 4, 0, 8, H);
    // dashed pores
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 30; i++) {
      ctx.fillRect(W * 0.5 - 3, (i + 0.5) * H / 30, 6, 4);
    }

    // particles
    for (const p of waterParticles) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const p of saltParticles) {
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const wL = countSide(waterParticles, 'left'), wR = countSide(waterParticles, 'right');
    const concL = (params.saltLeft / Math.max(1, wL + params.saltLeft) * 100).toFixed(0);
    const concR = (params.saltRight / Math.max(1, wR + params.saltRight) * 100).toFixed(0);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 200, 50);
    ctx.fillRect(W - 208, 8, 200, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`Left: ${wL} water, ${params.saltLeft} salt`, 16, 28);
    ctx.fillText(`${concL}% solute`, 16, 46);
    ctx.fillText(`Right: ${wR} water, ${params.saltRight} salt`, W - 200, 28);
    ctx.fillText(`${concR}% solute`, W - 200, 46);

    let arrow = null;
    if (concR > concL) arrow = 'right';
    else if (concL > concR) arrow = 'left';
    if (arrow) {
      ctx.strokeStyle = '#22d3ee';
      ctx.fillStyle = '#22d3ee';
      ctx.lineWidth = 4;
      const cy = H / 2;
      const cx = W / 2;
      ctx.beginPath();
      if (arrow === 'right') {
        ctx.moveTo(cx - 30, cy + 50); ctx.lineTo(cx + 30, cy + 50);
      } else {
        ctx.moveTo(cx + 30, cy + 50); ctx.lineTo(cx - 30, cy + 50);
      }
      ctx.stroke();
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText('water flow', cx - 28, cy + 70);
    }
  }

  // controls
  const sLS = slider({ label: 'Salt left', min: 0, max: 200, step: 1, value: params.saltLeft,
    onInput: (v) => { params.saltLeft = v; } });
  const sRS = slider({ label: 'Salt right', min: 0, max: 200, step: 1, value: params.saltRight,
    onInput: (v) => { params.saltRight = v; } });
  const speedS = slider({ label: 'Diffusion rate', min: 0, max: 3, step: 0.05, value: params.flowSpeed, format: (v) => v.toFixed(2),
    onInput: (v) => { params.flowSpeed = v; } });
  const isoB = button({ label: 'Make isotonic', primary: true, onClick: () => {
    params.saltRight = params.saltLeft;
    sRS.value = params.saltRight;
  } });
  const resetB = button({ label: 'Reset', onClick: reset });
  ctrlPanel.append(sLS.el, sRS.el, speedS.el, row(isoB, resetB));

  populate();
  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
