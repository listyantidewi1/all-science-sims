import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

// Each particle has a state: ocean, vapor, cloud, rain, ground
export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    solar: 0.7,        // 0..1
    nParticles: 200,
  };

  let particles = [];

  function reset() {
    particles = [];
    for (let i = 0; i < params.nParticles; i++) {
      particles.push({
        x: Math.random() * cv.width,
        y: cv.height * 0.7 + Math.random() * cv.height * 0.3,
        state: 'ocean',
        timer: 0,
      });
    }
  }
  reset();

  const SEA_LEVEL = () => cv.height * 0.7;
  const CLOUD_LEVEL = () => cv.height * 0.25;

  function step(dt) {
    while (particles.length < params.nParticles) {
      particles.push({ x: Math.random() * cv.width, y: SEA_LEVEL() + Math.random() * cv.height * 0.3, state: 'ocean', timer: 0 });
    }
    while (particles.length > params.nParticles) particles.pop();

    for (const p of particles) {
      p.timer += dt;
      if (p.state === 'ocean') {
        // Random chance to evaporate, scaled by solar
        if (Math.random() < 0.0008 * params.solar * 60 * dt) {
          p.state = 'vapor';
          p.timer = 0;
        }
        // sloshing
        p.x += (Math.random() - 0.5) * 4 * dt * 30;
        p.y += (Math.random() - 0.5) * 1 * dt * 30;
        if (p.y < SEA_LEVEL()) p.y = SEA_LEVEL();
      } else if (p.state === 'vapor') {
        p.y -= 80 * dt * (params.solar * 0.5 + 0.5);
        p.x += (Math.random() - 0.5) * 50 * dt;
        if (p.y < CLOUD_LEVEL()) {
          p.state = 'cloud';
          p.timer = 0;
        }
      } else if (p.state === 'cloud') {
        // wander in cloud area
        p.x += (Math.random() - 0.5) * 30 * dt;
        p.y += Math.sin(p.timer * 2) * 8 * dt;
        if (p.x < 0) p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
        if (p.y < CLOUD_LEVEL() - 60) p.y = CLOUD_LEVEL() - 60;
        if (p.y > CLOUD_LEVEL() + 30) p.y = CLOUD_LEVEL() + 30;
        // chance to precipitate, higher with cooler/lower sun (approximation)
        if (p.timer > 4 + (1 - params.solar) * 4 && Math.random() < 0.01) {
          p.state = 'rain';
          p.timer = 0;
        }
      } else if (p.state === 'rain') {
        p.y += 200 * dt;
        if (p.y >= SEA_LEVEL()) {
          // landing — if x in middle land area, become ground; else ocean
          if (p.x > cv.width * 0.35 && p.x < cv.width * 0.7) {
            p.state = 'ground';
            p.timer = 0;
          } else {
            p.state = 'ocean';
            p.timer = 0;
          }
        }
      } else if (p.state === 'ground') {
        // slowly run off downhill back to ocean
        p.x += (p.x < cv.width / 2 ? -1 : 1) * 30 * dt;
        if (p.x < cv.width * 0.34 || p.x > cv.width * 0.71) {
          p.state = 'ocean';
        }
        // small chance to evaporate from ground too
        if (Math.random() < 0.0003 * params.solar * 60 * dt) {
          p.state = 'vapor';
        }
      }
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Sky gradient (light depends on solar)
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, `hsl(210 ${50 - params.solar * 20}% ${30 + params.solar * 30}%)`);
    sky.addColorStop(0.6, `hsl(210 60% ${15 + params.solar * 15}%)`);
    sky.addColorStop(1, '#0c1f3d');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Sun
    ctx.fillStyle = `rgba(252, 211, 77, ${0.5 + params.solar * 0.4})`;
    ctx.beginPath();
    ctx.arc(W - 80, 80, 30 + params.solar * 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(W - 80, 80, 14, 0, Math.PI * 2);
    ctx.fill();

    // Land (mountain in middle)
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(W * 0.34, SEA_LEVEL());
    ctx.lineTo(W * 0.5, SEA_LEVEL() - 100);
    ctx.lineTo(W * 0.71, SEA_LEVEL());
    ctx.lineTo(W * 0.34, SEA_LEVEL());
    ctx.fill();
    // mountain peaks brighter
    ctx.fillStyle = '#bbf7d0';
    ctx.beginPath();
    ctx.moveTo(W * 0.5 - 12, SEA_LEVEL() - 80);
    ctx.lineTo(W * 0.5, SEA_LEVEL() - 100);
    ctx.lineTo(W * 0.5 + 12, SEA_LEVEL() - 80);
    ctx.fill();

    // Ocean
    ctx.fillStyle = '#0c4a6e';
    ctx.fillRect(0, SEA_LEVEL(), W * 0.34, H - SEA_LEVEL());
    ctx.fillRect(W * 0.71, SEA_LEVEL(), W - W * 0.71, H - SEA_LEVEL());

    // Particles
    for (const p of particles) {
      let color, size;
      if (p.state === 'ocean')      { color = '#3b82f6'; size = 2; }
      else if (p.state === 'vapor') { color = 'rgba(255,255,255,0.5)'; size = 2; }
      else if (p.state === 'cloud') { color = 'rgba(241, 245, 249, 0.85)'; size = 4; }
      else if (p.state === 'rain')  { color = '#60a5fa'; size = 2; }
      else                          { color = '#22d3ee'; size = 2; }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // legend
    const counts = { ocean: 0, vapor: 0, cloud: 0, rain: 0, ground: 0 };
    for (const p of particles) counts[p.state]++;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 28);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px var(--font-sans)';
    ctx.fillText(`Ocean ${counts.ocean}  Vapor ${counts.vapor}  Cloud ${counts.cloud}  Rain ${counts.rain}  Ground ${counts.ground}`, 16, 26);
  }

  // controls
  const sS = slider({ label: 'Solar intensity', min: 0, max: 1, step: 0.01, value: params.solar, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.solar = v; } });
  const nS = slider({ label: 'Particles', min: 50, max: 500, step: 10, value: params.nParticles,
    onInput: (v) => { params.nParticles = v; } });
  const resetB = button({ label: 'Reset', primary: true, onClick: reset });
  ctrlPanel.append(sS.el, nS.el, row(resetB));

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
