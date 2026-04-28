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
    light: 0.6,    // 0..1
    co2: 0.04,     // fraction (0..0.1, real atmosphere ~0.04%)
    temp: 25,      // °C
  };
  let bubbles = [];
  let lastEmit = 0;

  function rate() {
    // Light: saturating
    const fL = 1 - Math.exp(-params.light * 4);
    // CO2: similar saturation, real air ~0.04 (4%) max for sim
    const fC = 1 - Math.exp(-params.co2 * 30);
    // Temperature: bell curve around 25 with sharp drop above 40
    const fT = Math.exp(-Math.pow((params.temp - 25) / 12, 2)) * (params.temp > 50 ? 0.05 : 1);
    return Math.min(fL, fC, fT);
  }

  function limitingFactor() {
    const fL = 1 - Math.exp(-params.light * 4);
    const fC = 1 - Math.exp(-params.co2 * 30);
    const fT = Math.exp(-Math.pow((params.temp - 25) / 12, 2)) * (params.temp > 50 ? 0.05 : 1);
    const m = Math.min(fL, fC, fT);
    if (m === fL) return 'Light';
    if (m === fC) return 'CO₂';
    return 'Temperature';
  }

  function step(dt) {
    const r = rate();
    lastEmit += dt;
    const period = r > 0.01 ? 0.5 / r : 99;
    while (lastEmit > period) {
      bubbles.push({
        x: cv.width / 2 + (Math.random() - 0.5) * 80,
        y: cv.height - 60,
        size: 4 + Math.random() * 4,
      });
      lastEmit -= period;
    }
    for (const b of bubbles) {
      b.y -= 60 * dt;
      b.x += Math.sin(b.y * 0.05 + b.size) * 0.5;
    }
    bubbles = bubbles.filter((b) => b.y > 30);
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // background sky / underwater
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, `hsl(${200 + params.light * 30}, ${60 - params.temp / 2}%, ${30 + params.light * 30}%)`);
    grad.addColorStop(0.4, `hsl(200, 70%, ${20 + params.light * 20}%)`);
    grad.addColorStop(1, '#0c2747');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // sun (intensity)
    const sunR = 30 + params.light * 30;
    const sx = W - 60, sy = 60;
    ctx.fillStyle = `rgba(252, 211, 77, ${0.3 + params.light * 0.6})`;
    ctx.beginPath();
    ctx.arc(sx, sy, sunR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(sx, sy, 14 * params.light + 4, 0, Math.PI * 2);
    ctx.fill();

    // CO2 dots in water
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    const co2dots = Math.round(params.co2 * 800);
    for (let i = 0; i < co2dots; i++) {
      ctx.beginPath();
      ctx.arc((i * 137) % W, 100 + ((i * 91) % (H - 150)), 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // plant
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(W / 2, H);
    ctx.lineTo(W / 2, H - 200);
    ctx.stroke();
    for (let i = 0; i < 6; i++) {
      const yy = H - 30 - i * 30;
      const side = i % 2 === 0 ? -1 : 1;
      ctx.fillStyle = `hsl(${110 + params.temp / 5}, 60%, ${30 + params.light * 15}%)`;
      ctx.beginPath();
      ctx.ellipse(W / 2 + side * 30, yy, 30, 12, side * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // bubbles
    for (const b of bubbles) {
      ctx.fillStyle = 'rgba(186, 230, 253, 0.8)';
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.stroke();
    }

    // info
    const r = rate();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 280, 60);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(`Photosynthesis rate: ${(r * 100).toFixed(0)}%`, 16, 28);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`Limiting factor: ${limitingFactor()}`, 16, 48);
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`Light ${(params.light*100).toFixed(0)}%   CO₂ ${(params.co2*100).toFixed(1)}%   T ${params.temp}°C`, 16, 65);
  }

  // controls
  const lightS = slider({ label: 'Light intensity', min: 0, max: 1, step: 0.01, value: params.light, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.light = v; } });
  const co2S = slider({ label: 'CO₂ concentration', min: 0, max: 0.1, step: 0.001, value: params.co2, format: (v) => `${(v*100).toFixed(1)}%`,
    onInput: (v) => { params.co2 = v; } });
  const tS = slider({ label: 'Temperature (°C)', min: 0, max: 60, step: 1, value: params.temp,
    onInput: (v) => { params.temp = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, p] of [
    ['Optimal', { light: 0.8, co2: 0.06, temp: 25 }],
    ['Dim', { light: 0.1, co2: 0.04, temp: 25 }],
    ['Drought', { light: 0.9, co2: 0.005, temp: 35 }],
    ['Heatwave', { light: 0.8, co2: 0.04, temp: 50 }],
  ]) {
    const b = button({ label: name, onClick: () => { Object.assign(params, p); lightS.value = p.light; co2S.value = p.co2; tS.value = p.temp; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(lightS.el, co2S.el, tS.el, presetRow);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
