import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';
import { labPanel } from '../../../lib/lab.js';

// Convention: Sun is to the right (positive x). Sunlight travels in -x direction.
// Moon angle θ measured CCW from +x axis around Earth.
// θ = 0    → Moon on far side (full)
// θ = π/2  → first quarter (right half lit when seen from Earth)... actually let's compute properly.

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    angle: Math.PI,    // 0=full, π=new, π/2=first-quarter (looking down on north pole)
    autoplay: false,
    speed: 0.6,        // rad/sec
    dragging: false,
  };

  function phaseName(angDeg) {
    // angDeg in [0,360); 0 = full (Moon opposite Sun), 180 = new (between Sun and Earth)
    const a = ((angDeg % 360) + 360) % 360;
    if (a < 11.25 || a >= 348.75) return 'Full';
    if (a < 78.75)  return 'Waning gibbous';
    if (a < 101.25) return 'Last quarter';
    if (a < 168.75) return 'Waning crescent';
    if (a < 191.25) return 'New';
    if (a < 258.75) return 'Waxing crescent';
    if (a < 281.25) return 'First quarter';
    if (a < 348.75) return 'Waxing gibbous';
    return '?';
  }

  function illuminatedFraction(angRad) {
    // 0=full → 1.0 illuminated, π=new → 0.0
    return (1 - Math.cos(angRad)) / 2 === undefined ? 0 : (1 + Math.cos(angRad)) / 2;
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // background gradient
    const bg = ctx.createLinearGradient(0, 0, W, 0);
    bg.addColorStop(0, '#0b1220');
    bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 50; i++) {
      const x = (i * 137) % W;
      const y = (i * 91) % H;
      ctx.fillRect(x, y, 1, 1);
    }

    // Two views: left = orbit overview, right = view from Earth
    const leftW = W * 0.66;

    // ORBIT VIEW
    const cx = leftW / 2, cy = H / 2;
    const orbitR = Math.min(leftW, H) * 0.35;

    // Sun (off-screen right, with rays)
    const sunX = leftW - 30, sunY = cy;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 50);
    sunGrad.addColorStop(0, '#fff7c2');
    sunGrad.addColorStop(0.4, '#fbbf24');
    sunGrad.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff7c2';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Sunlight arrows
    ctx.strokeStyle = 'rgba(251,191,36,0.5)';
    ctx.lineWidth = 1;
    for (let yy = 40; yy < H - 30; yy += 36) {
      ctx.beginPath();
      ctx.moveTo(leftW - 90, yy);
      ctx.lineTo(leftW - 110, yy);
      ctx.stroke();
    }

    // Earth
    drawEarthIcon(ctx, cx, cy, 28);

    // Orbit path
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.beginPath();
    ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
    ctx.stroke();

    // Moon position. θ=0: full (far from sun, i.e., to the LEFT in our setup since sun is on right)
    // Easier: place sun on the right; Moon at θ=0 is opposite to Sun (left of Earth) → full.
    // θ=π: between Sun and Earth → new.
    const mx = cx + Math.cos(state.angle + Math.PI) * orbitR;
    const my = cy + Math.sin(state.angle + Math.PI) * orbitR;
    drawMoon3D(ctx, mx, my, 18, state.angle);

    // Vector from Sun direction = +x (right)
    // Phase angle from Earth's perspective = state.angle (with our convention)

    // VIEW FROM EARTH (right panel)
    const ex = leftW + (W - leftW) / 2;
    const ey = H / 2;
    const er = Math.min((W - leftW), H) * 0.32;
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(leftW, 0, W - leftW, H);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i < 30; i++) {
      const x = leftW + ((i * 113) % (W - leftW));
      const y = (i * 67) % H;
      ctx.fillRect(x, y, 1, 1);
    }
    drawMoonAsSeen(ctx, ex, ey, er, state.angle);

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '12px var(--font-sans)';
    ctx.fillText('Top-down view', 12, 18);
    ctx.fillText('From Earth', leftW + 12, 18);

    const angDeg = (state.angle * 180 / Math.PI) % 360;
    // Synodic month ≈ 29.53 days. angle 0 → full (day ~14.77); angle π → new (day 0).
    // Map state.angle so day 0 = New (angle = π), day grows CCW around the orbit.
    const SYNODIC = 29.53;
    const a = ((state.angle - Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const day = (a / (Math.PI * 2)) * SYNODIC;

    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(phaseName(angDeg), leftW + 12, H - 40);
    ctx.font = '12px var(--font-sans)';
    const lit = illuminatedFraction(state.angle);
    ctx.fillText(`Illuminated: ${(lit * 100).toFixed(0)}%`, leftW + 12, H - 24);
    ctx.fillText(`Day ${day.toFixed(1)} of ${SYNODIC.toFixed(2)}`, leftW + 12, H - 8);

    // Eclipse alignment indicator — within ~6° of new (solar eclipse possible)
    // or full (lunar eclipse possible). The Moon's orbital tilt actually limits
    // these, but the visual alignment is what we surface here.
    const dNew = Math.min(angDeg, 360 - angDeg, Math.abs(angDeg - 180));
    const isNewAlign = Math.abs(((angDeg + 180) % 360) - 180) < 6;
    const isFullAlign = Math.abs(angDeg) < 6 || Math.abs(angDeg - 360) < 6;
    if (isNewAlign || isFullAlign) {
      ctx.fillStyle = 'rgba(239,68,68,0.85)';
      ctx.fillRect(leftW + 12, 26, 180, 22);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px var(--font-sans)';
      ctx.fillText(isFullAlign ? '☾ Lunar eclipse alignment' : '☉ Solar eclipse alignment', leftW + 18, 41);
    }

    // hint
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '11px var(--font-sans)';
    ctx.fillText('Drag the Moon', cx - 30, cy + orbitR + 24);
  }

  function drawEarthIcon(ctx, x, y, r) {
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(34,197,94,0.8)';
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y + r * 0.1, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    // sunlit half (right)
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x, y - r);
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawMoon3D(ctx, x, y, r, angle) {
    // Sun direction = +x from Moon (Sun is to the right)
    // Lit hemisphere is the +x side relative to Moon center.
    // Draw moon disk. Then darken the side facing away from Sun.
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // dark hemisphere (left side - facing away from sun)
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI / 2, 3 * Math.PI / 2);
    ctx.clip();
    ctx.fillStyle = 'rgba(11,18,32,0.85)';
    ctx.fillRect(x - r, y - r, r, r * 2);
    ctx.restore();
    // outline
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawMoonAsSeen(ctx, x, y, r, angle) {
    // Phase from Earth's perspective:
    // angle = 0 → full (entire visible disc lit)
    // angle = π → new (entire visible disc dark)
    // angle = π/2 → last quarter (left half lit) [observer at Earth, Sun at right, Moon "above"]
    // For a visually pleasing rendering, we draw the lit fraction as an ellipse-on-circle composite.

    // First fill dark moon
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Compute phase: cos(angle) from -1 to 1, where 1=full, -1=new
    const k = Math.cos(angle);
    const litRight = Math.sin(angle) >= 0; // determines which side waxes
    // The terminator is an ellipse with x-radius = r * |k|.
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#f1f5f9';
    if (k >= 0) {
      // gibbous to full (mostly lit). Draw lit semicircle on the proper side, then "subtract" dark ellipse.
      if (litRight) {
        ctx.beginPath();
        ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI / 2, 3 * Math.PI / 2);
        ctx.fill();
      }
      // Add the connecting ellipse (lit) on dark side to fill in gibbous
      ctx.beginPath();
      ctx.ellipse(x, y, r * Math.abs(k), r, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // crescent: lit area is just a thin sliver on one side
      // Draw lit semicircle then carve out the dark ellipse
      if (litRight) {
        ctx.beginPath();
        ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI / 2, 3 * Math.PI / 2);
        ctx.fill();
      }
      // Subtract dark ellipse
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.ellipse(x, y, r * Math.abs(k), r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();

    // Outline
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Drag handler
  function moonScreenPos() {
    const W = cv.width, H = cv.height;
    const leftW = W * 0.66;
    const cx = leftW / 2, cy = H / 2;
    const orbitR = Math.min(leftW, H) * 0.35;
    return {
      x: cx + Math.cos(state.angle + Math.PI) * orbitR,
      y: cy + Math.sin(state.angle + Math.PI) * orbitR,
      cx, cy, orbitR,
    };
  }

  cv.canvas.style.cursor = 'pointer';
  cv.canvas.addEventListener('mousedown', (e) => {
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const m = moonScreenPos();
    if (Math.hypot(sx - m.x, sy - m.y) < 40) {
      state.dragging = true;
      state.autoplay = false;
      autoT.value = false;
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!state.dragging) return;
    const rect = cv.canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * cv.width / rect.width;
    const sy = (e.clientY - rect.top) * cv.height / rect.height;
    const { cx, cy } = moonScreenPos();
    const ang = Math.atan2(sy - cy, sx - cx);
    // ang is screen angle from Earth. State.angle relates via angle = ang - π.
    state.angle = ((ang - Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  });
  window.addEventListener('mouseup', () => { state.dragging = false; });

  function step(dt) {
    if (state.autoplay && !state.dragging) {
      state.angle = (state.angle + state.speed * dt) % (Math.PI * 2);
    }
  }

  // controls
  const angS = slider({
    label: 'Phase angle (°)', min: 0, max: 359, step: 1, value: 180,
    onInput: (v) => { state.angle = v * Math.PI / 180; },
  });
  const autoT = toggle({ label: 'Auto-orbit', value: state.autoplay, onChange: (v) => { state.autoplay = v; } });
  const speedS = slider({
    label: 'Speed (rad/s)', min: 0.1, max: 3, step: 0.05, value: state.speed, format: (v) => v.toFixed(2),
    onInput: (v) => { state.speed = v; },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, deg] of [['New', 180], ['First Q', 270], ['Full', 0], ['Last Q', 90]]) {
    const b = button({ label: name, onClick: () => { state.angle = deg * Math.PI / 180; angS.value = deg; } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(angS.el, autoT.el, speedS.el, presetRow);

  // Lab — connect phase angle to illuminated fraction and synodic day.
  const lab = labPanel({
    title: 'Moon phases lab — phase angle vs illumination',
    filename: 'moon-phases-lab.csv',
    columns: [
      { key: 'angle',  label: 'angle (°)', format: (v) => v.toFixed(0) },
      { key: 'phase',  label: 'phase' },
      { key: 'lit',    label: 'illum %',   format: (v) => v.toFixed(0) },
      { key: 'day',    label: 'day of cycle', format: (v) => v.toFixed(1) },
    ],
    procedure: [
      'Set phase angle = 0° (Full). Record. Predicted: 100% illuminated.',
      'Step to 90° (Last quarter), 180° (New), 270° (First quarter). Record each.',
      'For arbitrary angle θ, illuminated fraction = (1 + cos θ)/2.',
      'Synodic month is 29.53 days. Day of cycle = (θ − 180°)/360° × 29.53 (with day 0 = new moon).',
      'Apply: 7 days after new moon, what phase do you expect to see?',
    ],
    predict: 'You see a half-lit moon, lit on the right (in northern hemisphere). What phase is it?',
    source: () => {
      const angDeg = (state.angle * 180 / Math.PI) % 360;
      const lit = (1 + Math.cos(state.angle)) / 2;
      const a = ((state.angle - Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const day = (a / (Math.PI * 2)) * 29.53;
      return {
        angle: angDeg,
        phase: phaseName(angDeg),
        lit: lit * 100,
        day,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    step(dt);
    angS.value = Math.round(state.angle * 180 / Math.PI) % 360;
    draw();
  });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
