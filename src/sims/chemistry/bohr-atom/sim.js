import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row, toggle } from '../../../lib/controls.js';

// Element symbols up to Kr
const ELEMENTS = [
  null, 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
  'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
  'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr',
];

// Bohr-style shell capacities used here: 2, 8, 8, 18 (simplified KLMN; ignores subshell ordering past 4s/3d).
const SHELL_CAP = [2, 8, 8, 18];

function shellsForZ(z) {
  const shells = [];
  let remaining = z;
  for (let i = 0; i < SHELL_CAP.length && remaining > 0; i++) {
    const take = Math.min(remaining, SHELL_CAP[i]);
    shells.push(take);
    remaining -= take;
  }
  return shells;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 1 });

  const params = { z: 11, animate: true, speed: 0.6 };
  let t = 0;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const shells = shellsForZ(params.z);
    const maxShell = shells.length;
    const baseR = 50;
    const stepR = Math.min(60, (Math.min(W, H) / 2 - 80) / maxShell);

    // glow background
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) / 2);
    grad.addColorStop(0, 'rgba(16,185,129,0.06)');
    grad.addColorStop(1, 'rgba(11,18,32,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // shells
    for (let i = 0; i < maxShell; i++) {
      const r = baseR + i * stepR;
      ctx.strokeStyle = 'rgba(120,130,150,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      // shell label (n)
      ctx.fillStyle = 'rgba(120,130,150,0.6)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`n=${i + 1}`, cx + r + 4, cy + 3);
    }

    // electrons
    for (let s = 0; s < shells.length; s++) {
      const r = baseR + s * stepR;
      const count = shells[s];
      const phase = t * params.speed * (s % 2 === 0 ? 1 : -1) / (s + 1);
      const isOuter = s === shells.length - 1;
      for (let e = 0; e < count; e++) {
        const ang = (e / count) * Math.PI * 2 + phase;
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        ctx.fillStyle = isOuter ? '#fbbf24' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isOuter ? '#b45309' : '#1e3a8a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // nucleus
    const nucGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, 30);
    nucGrad.addColorStop(0, '#fde047');
    nucGrad.addColorStop(0.5, '#ef4444');
    nucGrad.addColorStop(1, '#7f1d1d');
    ctx.fillStyle = nucGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();
    // labels
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.textAlign = 'center';
    ctx.fillText(ELEMENTS[params.z] || '?', cx, cy + 5);
    ctx.textAlign = 'left';

    // info
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, 280, 70);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-sans)';
    ctx.fillText(`${ELEMENTS[params.z]}    Z = ${params.z}`, 14, 26);
    ctx.font = '12px var(--font-sans)';
    ctx.fillText(`Shells: ${shells.join(', ')}`, 14, 44);
    const valence = shells[shells.length - 1] || 0;
    const noble = [2, 10, 18, 36].includes(params.z);
    ctx.fillText(`Valence: ${valence}${noble ? '   ✓ noble (full)' : ''}`, 14, 62);
  }

  // controls
  const zS = slider({
    label: 'Atomic number Z', min: 1, max: 36, step: 1, value: params.z,
    onInput: (v) => { params.z = v; },
  });
  const animT = toggle({ label: 'Animate orbits', value: params.animate, onChange: (v) => { params.animate = v; } });

  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, z] of [['H', 1], ['He', 2], ['Na', 11], ['Cl', 17], ['Ar', 18], ['Fe', 26]]) {
    const b = button({ label: name, onClick: () => { params.z = z; zS.value = z; } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(zS.el, animT.el, presetRow);

  const animator = loop((dt) => {
    if (params.animate) t += dt;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
