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
    n: 5,
    L: 200,        // string length, px
    g: 1500,       // gravity, px/s² (visual scale)
    damping: 0.0,  // air drag
    restitution: 1.0, // for collisions; 1 = perfectly elastic
  };

  // Each ball: theta (rad, 0 = down), omega (rad/s).
  // Lifted ball lock: while user is dragging, store its angle and clamp omega to 0.
  let balls = [];
  let pivots = [];
  let radius = 18;
  let pivotY = 60;
  let dragging = -1;

  function rebuild() {
    balls = [];
    for (let i = 0; i < params.n; i++) balls.push({ theta: 0, omega: 0 });
  }
  rebuild();

  function recomputeLayout() {
    const W = cv.width;
    const spacing = Math.min(50, (W - 80) / Math.max(1, params.n));
    radius = Math.min(20, spacing * 0.42);
    const centerX = W / 2;
    pivots = [];
    for (let i = 0; i < params.n; i++) {
      pivots.push(centerX + (i - (params.n - 1) / 2) * spacing);
    }
    pivotY = 70;
  }

  function ballPos(i) {
    const px = pivots[i];
    const x = px + Math.sin(balls[i].theta) * params.L;
    const y = pivotY + Math.cos(balls[i].theta) * params.L;
    return { x, y };
  }

  function step(dt) {
    // pendulum dynamics for each ball (small or large angle)
    const sub = 4;
    const h = dt / sub;
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < balls.length; i++) {
        if (i === dragging) continue;
        const a = -(params.g / params.L) * Math.sin(balls[i].theta) - params.damping * balls[i].omega;
        balls[i].omega += a * h;
        balls[i].theta += balls[i].omega * h;
      }
      // Collisions: when adjacent balls would overlap, exchange velocities (equal mass elastic).
      for (let i = 0; i < balls.length - 1; i++) {
        const A = ballPos(i);
        const B = ballPos(i + 1);
        const d = B.x - A.x;
        const minDist = 2 * radius;
        if (d < minDist) {
          // approaching?
          const va = balls[i].omega * params.L * Math.cos(balls[i].theta);
          const vb = balls[i + 1].omega * params.L * Math.cos(balls[i + 1].theta);
          if (va > vb) {
            // exchange omega using equal-mass elastic collision (same effective mass).
            const swap = balls[i].omega;
            balls[i].omega = balls[i + 1].omega;
            balls[i + 1].omega = swap;
          }
          // Slight separation to avoid sticking
          balls[i].theta -= 0.005;
          balls[i + 1].theta += 0.005;
        }
      }
    }
  }

  function draw() {
    recomputeLayout();
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // frame: top bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(pivots[0] - radius - 4, 40, pivots[params.n - 1] - pivots[0] + 2 * radius + 8, 12);
    ctx.fillStyle = '#475569';
    ctx.fillRect(pivots[0] - 12, 30, 8, 24);
    ctx.fillRect(pivots[params.n - 1] + 4, 30, 8, 24);

    // strings + balls
    for (let i = 0; i < balls.length; i++) {
      const p = ballPos(i);
      ctx.strokeStyle = 'rgba(120,130,150,0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pivots[i], pivotY - 18);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      // ball
      const grad = ctx.createRadialGradient(p.x - radius * 0.3, p.y - radius * 0.3, 2, p.x, p.y, radius);
      grad.addColorStop(0, '#dbeafe');
      grad.addColorStop(0.4, '#94a3b8');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '12px var(--font-sans)';
    ctx.fillText('Click and drag a ball to lift it. Release to drop.', 12, H - 12);
  }

  // Mouse / drag
  function findBall(sx, sy) {
    for (let i = 0; i < balls.length; i++) {
      const p = ballPos(i);
      if (Math.hypot(sx - p.x, sy - p.y) < radius + 4) return i;
    }
    return -1;
  }
  function localPos(e) {
    const rect = cv.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * cv.width / rect.width,
      y: (e.clientY - rect.top) * cv.height / rect.height,
    };
  }
  cv.canvas.style.cursor = 'grab';
  cv.canvas.addEventListener('mousedown', (e) => {
    const p = localPos(e);
    const idx = findBall(p.x, p.y);
    if (idx >= 0) {
      dragging = idx;
      cv.canvas.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (dragging < 0) return;
    const p = localPos(e);
    const dx = p.x - pivots[dragging];
    const dy = p.y - pivotY;
    const ang = Math.atan2(dx, dy);
    balls[dragging].theta = Math.max(-1.4, Math.min(1.4, ang));
    balls[dragging].omega = 0;
  });
  window.addEventListener('mouseup', () => {
    if (dragging >= 0) {
      balls[dragging].omega = 0;
      dragging = -1;
      cv.canvas.style.cursor = 'grab';
    }
  });

  // controls
  const nS = slider({
    label: 'Number of balls', min: 3, max: 9, step: 1, value: params.n,
    onInput: (v) => { params.n = v; rebuild(); },
  });
  const dampS = slider({
    label: 'Air drag', min: 0, max: 0.6, step: 0.01, value: params.damping, format: (v) => v.toFixed(2),
    onInput: (v) => { params.damping = v; },
  });
  const stopB = button({ label: 'Stop all', primary: true, onClick: () => { for (const b of balls) { b.theta = 0; b.omega = 0; } } });
  const liftLB = button({ label: 'Lift left 1', onClick: () => { balls[0].theta = -0.7; balls[0].omega = 0; } });
  const liftLLB = button({ label: 'Lift left 2', onClick: () => {
    if (balls.length >= 2) { balls[0].theta = -0.7; balls[0].omega = 0; balls[1].theta = -0.55; balls[1].omega = 0; }
  } });

  ctrlPanel.append(nS.el, dampS.el, row(liftLB, liftLLB, stopB));

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
