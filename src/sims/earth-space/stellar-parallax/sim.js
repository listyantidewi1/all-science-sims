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
    distancePc: 10,    // parsec
    autoplay: true,
    speed: 0.5,        // years per second
  };

  let t = 0;

  function parallaxArcsec() { return 1 / params.distancePc; }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);

    // Stars (background)
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 80; i++) {
      ctx.fillRect((i * 137) % W, (i * 91) % H, 1, 1);
    }

    // Top half: orbital diagram (Sun + Earth at two positions)
    const orbitCx = W * 0.22, orbitCy = H * 0.35;
    const orbitR = Math.min(W, H) * 0.16;
    // Sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(orbitCx, orbitCy, 10, 0, Math.PI * 2);
    ctx.fill();
    // orbit
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.beginPath();
    ctx.arc(orbitCx, orbitCy, orbitR, 0, Math.PI * 2);
    ctx.stroke();
    // Earth current
    const ang = t * Math.PI * 2;
    const ex = orbitCx + Math.cos(ang) * orbitR;
    const ey = orbitCy + Math.sin(ang) * orbitR;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fill();
    // Earth at +6 months
    const ex2 = orbitCx + Math.cos(ang + Math.PI) * orbitR;
    const ey2 = orbitCy + Math.sin(ang + Math.PI) * orbitR;
    ctx.fillStyle = 'rgba(59,130,246,0.4)';
    ctx.beginPath();
    ctx.arc(ex2, ey2, 4, 0, Math.PI * 2);
    ctx.fill();

    // Target star at distance
    const starX = W * 0.85;
    const starY = H * 0.35;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(starX, starY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Sight lines from each Earth position to the star
    ctx.strokeStyle = 'rgba(96,165,250,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ex, ey); ctx.lineTo(starX, starY);
    ctx.moveTo(ex2, ey2); ctx.lineTo(starX, starY);
    ctx.stroke();

    // Background field of distant stars (right side)
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (let i = 0; i < 25; i++) {
      const x = starX + 80 + (i * 47) % 150;
      const y = starY + ((i * 31) % 200) - 100;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Sun', orbitCx - 10, orbitCy + 22);
    ctx.fillText('Earth (now)', ex + 8, ey - 6);
    ctx.fillText('Earth (+6 mo)', ex2 + 8, ey2 - 6);
    ctx.fillText('Target star', starX + 12, starY - 6);

    // Bottom half: what observer sees (the apparent star wobble)
    const obsY = H * 0.78;
    const obsCx = W / 2;
    const fieldW = 240, fieldH = 100;
    ctx.fillStyle = '#020617';
    ctx.fillRect(obsCx - fieldW / 2, obsY - fieldH / 2, fieldW, fieldH);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.strokeRect(obsCx - fieldW / 2, obsY - fieldH / 2, fieldW, fieldH);
    // Background stars (fixed)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (let i = 0; i < 12; i++) {
      const x = obsCx - fieldW / 2 + 20 + (i * 18) % (fieldW - 40);
      const y = obsY - fieldH / 2 + 15 + (i * 23) % (fieldH - 30);
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    // Target star wobbling — exaggerate parallax visually
    const wobbleAmp = Math.min(80, 60 / Math.max(1, params.distancePc) * 30);
    const wx = obsCx + Math.cos(ang) * wobbleAmp;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(wx, obsY, 5, 0, Math.PI * 2);
    ctx.fill();
    // ghost positions
    ctx.fillStyle = 'rgba(16,185,129,0.3)';
    ctx.beginPath();
    ctx.arc(obsCx + wobbleAmp, obsY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(obsCx - wobbleAmp, obsY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('What we see (telescope view, exaggerated)', obsCx - fieldW / 2, obsY - fieldH / 2 - 6);

    // Info
    const p = parallaxArcsec();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(8, 8, 320, 56);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    ctx.fillText(`Distance: ${params.distancePc.toFixed(2)} pc (${(params.distancePc * 3.26).toFixed(2)} ly)`, 16, 28);
    ctx.fillText(`Parallax: ${p.toFixed(4)} arcsec`, 16, 46);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px var(--font-mono)';
    ctx.fillText(`d (pc) = 1 / p (arcsec)`, 16, 62);
  }

  // controls
  const dS = slider({ label: 'Distance (parsec)', min: 1, max: 200, step: 0.5, value: params.distancePc, format: (v) => v.toFixed(1),
    onInput: (v) => { params.distancePc = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, d] of [['Proxima (1.3)', 1.3], ['Sirius (2.6)', 2.6], ['Vega (7.7)', 7.7], ['Polaris (133)', 133]]) {
    const b = button({ label: name, onClick: () => { params.distancePc = d; dS.value = d; } });
    presetRow.appendChild(b.el);
  }
  ctrlPanel.append(dS.el, presetRow);

  const animator = loop((dt) => { t += dt * params.speed; draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
