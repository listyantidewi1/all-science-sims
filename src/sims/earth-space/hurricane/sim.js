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

  // Saffir–Simpson category thresholds (1-minute sustained wind, m/s).
  const SS_THRESHOLDS = [33, 43, 50, 58, 70];

  // Maximum sustained wind (m/s) that the three ingredients allow.
  function maxWind() {
    if (params.sst < 26.5) return 0;                 // too cool: no cyclone forms
    if (Math.abs(params.latitude) < 5) return 0;     // no Coriolis: no spin
    // Potential intensity vs SST (empirical DeMaria & Kaplan 1994 fit, m/s):
    // ≈58 m/s at 26.5 °C, 67 at 28 °C, 84 at 30 °C, 108 at 32 °C.
    const vPot = 28.2 + 55.8 * Math.exp(0.1813 * (params.sst - 30));
    const sstRamp = Math.min(1, params.sst - 26);    // storms just above the threshold stay weak
    const coriolisFactor = Math.min(1, Math.abs(params.latitude) / 15);
    const shearFactor = Math.max(0, 1 - params.shear / 16);
    return vPot * sstRamp * coriolisFactor * shearFactor;
  }
  // 0..1 visual strength (spin speed, number of cloud bands, eye size, colours)
  function intensity() {
    return Math.max(0, Math.min(1, maxWind() / 80));
  }

  function category() {
    const v = maxWind();
    if (v <= 0) return { name: 'Tropical disturbance', winds: 0 };
    if (v < 17) return { name: 'Tropical depression', winds: v };
    if (v < SS_THRESHOLDS[0]) return { name: 'Tropical storm', winds: v };
    let cat = 1;
    while (cat < 5 && v >= SS_THRESHOLDS[cat]) cat++;
    return { name: `Cat ${cat}`, winds: v };
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
    ctx.font = 'bold 16px system-ui, -apple-system, Roboto, sans-serif';
    ctx.fillText(cat.name, 16, 30);
    ctx.fillStyle = '#fff';
    ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
    ctx.fillText(`Sustained winds ~${cat.winds.toFixed(0)} m/s (${(cat.winds * 3.6).toFixed(0)} km/h)`, 16, 50);
    ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
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
