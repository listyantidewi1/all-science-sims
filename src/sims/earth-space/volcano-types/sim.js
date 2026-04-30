import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row, toggle } from '../../../lib/controls.js';

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    visc: 0.2,    // low = basaltic, high = rhyolitic
    gas: 0.3,
    erupting: false,
  };

  let particles = []; // ash/lava particles
  let t = 0;

  function classify() {
    if (params.visc < 0.35 && params.gas < 0.35) return { name: 'Shield volcano (e.g. Mauna Loa)', color: '#dc2626', style: 'Effusive (gentle lava flows)' };
    if (params.visc < 0.5 && params.gas > 0.6) return { name: 'Cinder cone (e.g. Paricutín)', color: '#f97316', style: 'Strombolian (lava fountains, scoria)' };
    if (params.visc > 0.6 && params.gas > 0.5) return { name: 'Stratovolcano (e.g. Mt Fuji, Krakatoa)', color: '#fbbf24', style: 'Plinian (ash column, pyroclastic flow)' };
    if (params.visc > 0.6 && params.gas < 0.35) return { name: 'Lava dome (e.g. Mt St Helens dome)', color: '#a855f7', style: 'Endogenous (slow extrusion)' };
    return { name: 'Composite / mixed', color: '#94a3b8', style: 'Mixed eruption style' };
  }

  function step(dt) {
    t += dt;
    if (params.erupting) {
      // Spawn particles based on viscosity & gas.
      const rate = params.gas * 60 + 10;
      const count = Math.floor(rate * dt);
      for (let i = 0; i < count; i++) {
        const explosive = params.gas > 0.5 ? 1 : 0.4;
        const vel = explosive * (300 + Math.random() * 200);
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
        particles.push({
          x: 0, y: 0,
          vx: Math.cos(ang) * vel * (1 - params.visc * 0.5),
          vy: Math.sin(ang) * vel,
          age: 0,
          color: params.gas > 0.5 ? '#94a3b8' : '#dc2626',  // ash gray vs lava red
          life: 2 + Math.random() * 2,
        });
      }
    }
    for (const p of particles) {
      p.age += dt;
      p.vy += 200 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
    particles = particles.filter((p) => p.age < p.life && p.y < 500);
  }

  function profile(x) {
    // Volcano cross-section: viscosity controls slope.
    // Shield (low visc): broad, low slope. Stratovolcano: steep.
    const slope = 0.2 + params.visc * 0.6;
    const height = 200 + params.gas * 40 + (params.visc - 0.2) * 300;
    return Math.max(0, height - Math.abs(x) * slope * 0.8);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const groundY = H - 80;

    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, groundY);
    sky.addColorStop(0, '#1e3a8a');
    sky.addColorStop(1, '#475569');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, groundY);

    // Volcano profile
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    for (let x = -W / 2; x <= W / 2; x += 4) {
      ctx.lineTo(cx + x, groundY - profile(x));
    }
    ctx.lineTo(W, groundY);
    ctx.closePath();
    ctx.fill();
    // Layers
    if (params.visc > 0.5) {
      // Stratified
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      for (let layer = 0; layer < 6; layer++) {
        ctx.beginPath();
        for (let x = -W / 2; x <= W / 2; x += 4) {
          const p = profile(x) - layer * 25;
          if (p > 0) ctx.lineTo(cx + x, groundY - p);
        }
        ctx.stroke();
      }
    }

    // Eruption — particles
    const ventY = groundY - profile(0);
    ctx.save();
    ctx.translate(cx, ventY);
    for (const p of particles) {
      const alpha = 1 - p.age / p.life;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Ground
    ctx.fillStyle = '#3f3f46';
    ctx.fillRect(0, groundY, W, H - groundY);

    // Header card
    const c = classify();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 380, 80);
    ctx.fillStyle = c.color;
    ctx.font = 'bold 14px var(--font-mono)';
    ctx.fillText(c.name, 16, 30);
    ctx.fillStyle = '#fff';
    ctx.font = '12px var(--font-mono)';
    ctx.fillText(c.style, 16, 50);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`viscosity ${params.visc.toFixed(2)}    gas ${params.gas.toFixed(2)}`, 16, 70);

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Toggle "Erupt" to launch particles. Style depends on viscosity × gas content.', 16, H - 12);
  }

  // controls
  const vS = slider({ label: 'Magma viscosity', min: 0, max: 1, step: 0.01, value: params.visc, format: (v) => v.toFixed(2),
    onInput: (v) => { params.visc = v; } });
  const gS = slider({ label: 'Gas content', min: 0, max: 1, step: 0.01, value: params.gas, format: (v) => v.toFixed(2),
    onInput: (v) => { params.gas = v; } });
  const erT = toggle({ label: 'Erupting', value: params.erupting, onChange: (v) => { params.erupting = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [n, p] of [['Shield', { visc: 0.15, gas: 0.2 }], ['Cinder cone', { visc: 0.35, gas: 0.75 }], ['Stratovolcano', { visc: 0.75, gas: 0.7 }], ['Lava dome', { visc: 0.85, gas: 0.2 }]]) {
    const b = button({ label: n, onClick: () => { Object.assign(params, p); vS.value = params.visc; gS.value = params.gas; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(vS.el, gS.el, erT.el, presetRow);

  const animator = loop((dt) => { step(Math.min(0.05, dt)); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
