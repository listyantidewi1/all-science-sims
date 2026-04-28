import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = {
    sst: 28,           // °C
    latitude: 15,      // degrees
    shear: 5,          // wind shear m/s
  };

  let particles = [];

  function intensity() {
    if (params.sst < 26.5) return 0;
    if (Math.abs(params.latitude) < 5) return 0;
    const sstFactor = (params.sst - 26) / 6;
    const coriolisFactor = Math.min(1, Math.abs(params.latitude) / 25);
    const shearFactor = Math.max(0, 1 - params.shear / 20);
    return Math.max(0, Math.min(1, sstFactor * coriolisFactor * shearFactor));
  }

  function category() {
    const i = intensity();
    if (i < 0.05) return { name: 'Tropical disturbance', winds: 0 };
    if (i < 0.2) return { name: 'Tropical depression', winds: 50 };
    if (i < 0.4) return { name: 'Tropical storm', winds: 80 };
    if (i < 0.55) return { name: 'Cat 1', winds: 130 };
    if (i < 0.7) return { name: 'Cat 2', winds: 165 };
    if (i < 0.82) return { name: 'Cat 3', winds: 200 };
    if (i < 0.92) return { name: 'Cat 4', winds: 230 };
    return { name: 'Cat 5', winds: 270 };
  }

  function spawn() {
    particles = [];
    const inten = intensity();
    if (inten <= 0) return;
    for (let i = 0; i < 200; i++) {
      const r = Math.random() * 0.45;
      const ang = Math.random() * Math.PI * 2;
      particles.push({ r, ang, life: Math.random() * 5 });
    }
  }

  function step(dt) {
    const inten = intensity();
    const cycSpeed = inten * 4;
    // direction depends on hemisphere (Coriolis sign)
    const sign = params.latitude >= 0 ? 1 : -1;
    for (const p of particles) {
      p.ang += dt * cycSpeed * sign / Math.max(0.05, p.r);
      p.r += dt * 0.005 * (1 - p.r * 2);
      p.life += dt;
      if (p.r < 0.02) {
        // pulled into eye, respawn at edge
        p.r = 0.45 + Math.random() * 0.05;
        p.ang = Math.random() * Math.PI * 2;
      }
      if (p.life > 8) {
        p.life = 0;
        p.r = 0.4 + Math.random() * 0.1;
      }
    }
    if (particles.length === 0 && inten > 0) spawn();
    if (particles.length > 0 && inten === 0) particles = [];
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    // ocean background colored by SST
    const sstHue = 200 - (params.sst - 24) * 8;
    ctx.fillStyle = `hsl(${sstHue} 70% 25%)`;
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const inten = intensity();

    // arms / cloud bands as trailing curves
    ctx.strokeStyle = `rgba(255,255,255,${0.2 + inten * 0.4})`;
    ctx.lineWidth = 2;
    const arms = Math.round(2 + inten * 4);
    const sign = params.latitude >= 0 ? 1 : -1;
    for (let a = 0; a < arms; a++) {
      ctx.beginPath();
      let started = false;
      for (let r = 0.05; r < 0.5; r += 0.005) {
        const ang = a * Math.PI * 2 / arms - r * 8 * sign + Math.PI * 0.5;
        const x = cx + Math.cos(ang) * r * Math.min(W, H);
        const y = cy + Math.sin(ang) * r * Math.min(W, H);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // particles
    for (const p of particles) {
      const x = cx + Math.cos(p.ang) * p.r * Math.min(W, H);
      const y = cy + Math.sin(p.ang) * p.r * Math.min(W, H);
      ctx.fillStyle = `rgba(255,255,255,${0.6 - p.r * 0.5})`;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // eye
    if (inten > 0.4) {
      const eyeR = (1 - inten) * 30 + 8;
      ctx.fillStyle = '#0b1220';
      ctx.beginPath();
      ctx.arc(cx, cy, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.stroke();
    }

    // info
    const cat = category();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = inten > 0.5 ? '#ef4444' : inten > 0 ? '#fbbf24' : '#94a3b8';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(cat.name, 16, 30);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(`Sustained winds ~${cat.winds} km/h`, 16, 50);
    ctx.font = '10px var(--font-mono)';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(`SST ${params.sst}°C   lat ${params.latitude}°   shear ${params.shear} m/s`, 16, 64);
  }

  // controls
  const sstS = slider({ label: 'Sea surface temp (°C)', min: 20, max: 32, step: 0.5, value: params.sst, format: (v) => v.toFixed(1),
    onInput: (v) => { params.sst = v; if (intensity() > 0 && particles.length === 0) spawn(); } });
  const latS = slider({ label: 'Latitude (°)', min: -30, max: 30, step: 0.5, value: params.latitude, format: (v) => v.toFixed(1),
    onInput: (v) => { params.latitude = v; if (intensity() > 0 && particles.length === 0) spawn(); } });
  const shS = slider({ label: 'Wind shear (m/s)', min: 0, max: 30, step: 0.5, value: params.shear, format: (v) => v.toFixed(1),
    onInput: (v) => { params.shear = v; if (intensity() > 0 && particles.length === 0) spawn(); } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [['Cat 5', { sst: 30, latitude: 18, shear: 2 }], ['Tropical depression', { sst: 27, latitude: 12, shear: 12 }], ['Equator', { sst: 29, latitude: 0, shear: 5 }], ['Cool water', { sst: 24, latitude: 20, shear: 5 }]]) {
    const b = button({ label: name, onClick: () => { Object.assign(params, p); sstS.value = params.sst; latS.value = params.latitude; shS.value = params.shear; spawn(); } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(sstS.el, latS.el, shS.el, presetRow);

  spawn();
  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
