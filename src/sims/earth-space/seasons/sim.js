import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, button, row } from '../../../lib/controls.js';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    tilt: 23.5,        // degrees
    dayOfYear: 80,     // 0..364
    latitude: 0,       // observer latitude
    autoplay: true,
    speed: 30,         // days per second
  };

  function declination() {
    // Solar declination approximation (degrees).
    return params.tilt * Math.sin((2 * Math.PI / 365) * (params.dayOfYear - 81));
  }

  function dayLengthHours() {
    const phi = params.latitude * Math.PI / 180;
    const dec = declination() * Math.PI / 180;
    const cosH = -Math.tan(phi) * Math.tan(dec);
    if (cosH >= 1) return 0;
    if (cosH <= -1) return 24;
    const H = Math.acos(cosH);
    return (2 * H) * 12 / Math.PI;
  }

  function step(dt) {
    if (params.autoplay) {
      params.dayOfYear = (params.dayOfYear + dt * params.speed) % 365;
      doySlider.value = Math.round(params.dayOfYear);
    }
  }

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Background — orbit view (top-down) on the left half, observer view on right
    const halfW = W / 2;

    // ORBIT VIEW
    const cx = halfW / 2, cy = H / 2;
    const orbitR = Math.min(halfW, H) * 0.35;
    // sun
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
    // orbit path
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
    ctx.stroke();
    // earth
    const ang = (params.dayOfYear / 365) * Math.PI * 2 - Math.PI / 2;
    const ex = cx + Math.cos(ang) * orbitR;
    const ey = cy + Math.sin(ang) * orbitR;
    drawEarth(ctx, ex, ey, 24, params.tilt);
    // labels — solstices / equinoxes
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = '11px var(--font-sans)';
    label('Mar equinox', cx, cy - orbitR - 8, ctx);
    label('Jun solstice', cx + orbitR + 4, cy, ctx, 'left');
    label('Sep equinox', cx, cy + orbitR + 14, ctx);
    label('Dec solstice', cx - orbitR - 4, cy, ctx, 'right');

    // OBSERVER VIEW (right half)
    const ox = halfW + 30, oy = 30, ow = halfW - 60, oh = H - 60;
    ctx.strokeStyle = 'rgba(120,130,150,0.4)';
    ctx.strokeRect(ox, oy, ow, oh);
    // Sky color based on day length
    const dh = dayLengthHours();
    const lightness = 0.4 + 0.4 * (dh / 24);
    ctx.fillStyle = `hsl(210 70% ${lightness * 100}%)`;
    ctx.fillRect(ox + 1, oy + 1, ow - 2, oh - 2);
    // Sun arc — mid-day altitude depends on (90 - lat + dec) at noon
    const phi = params.latitude;
    const dec = declination();
    const noonAlt = 90 - Math.abs(phi - dec); // simplified
    // Draw sun along an arc
    const arcCY = oy + oh - 30;
    const arcR = ow * 0.35;
    const arcCX = ox + ow / 2;
    ctx.strokeStyle = 'rgba(255,200,80,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(arcCX, arcCY, arcR, Math.PI, 2 * Math.PI);
    ctx.stroke();
    // sun position based on altitude (simplified)
    const altRad = Math.max(0, noonAlt) * Math.PI / 180;
    const sx = arcCX;
    const sy = arcCY - Math.sin(altRad) * arcR;
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(sx, sy, 12, 0, Math.PI * 2);
    ctx.fill();
    // ground
    ctx.fillStyle = '#15803d';
    ctx.fillRect(ox + 1, arcCY, ow - 2, oh - (arcCY - oy));

    // Readouts
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px var(--font-sans)';
    ctx.fillText(dateLabel(), ox + 12, oy + 22);
    ctx.font = '13px var(--font-sans)';
    ctx.fillText(`Latitude: ${phi.toFixed(0)}°`, ox + 12, oy + 40);
    ctx.fillText(`Solar declination: ${dec.toFixed(1)}°`, ox + 12, oy + 58);
    ctx.fillText(`Day length: ${dh.toFixed(1)} h`, ox + 12, oy + 76);
    ctx.fillText(`Noon altitude: ${Math.max(0, noonAlt).toFixed(1)}°`, ox + 12, oy + 94);
  }

  function dateLabel() {
    // Convert dayOfYear to month/day approximate
    const d = Math.floor(params.dayOfYear);
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let r = d, m = 0;
    while (m < 12 && r >= monthLengths[m]) { r -= monthLengths[m]; m++; }
    return `${MONTHS[m] || 'Dec'} ${r + 1}`;
  }

  function drawEarth(ctx, x, y, radius, tiltDeg) {
    const tilt = tiltDeg * Math.PI / 180;
    // earth sphere
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    // continents hint (simple cap)
    ctx.fillStyle = 'rgba(34,197,94,0.7)';
    ctx.beginPath();
    ctx.arc(x, y - radius * 0.2, radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
    // tilted axis
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(tilt) * (radius + 8), y - Math.cos(tilt) * (radius + 8));
    ctx.lineTo(x - Math.sin(tilt) * (radius + 8), y + Math.cos(tilt) * (radius + 8));
    ctx.stroke();
    // small "N" cap
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + Math.sin(tilt) * (radius - 3), y - Math.cos(tilt) * (radius - 3), 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function label(text, x, y, ctx, align = 'center') {
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
    ctx.textAlign = 'left';
  }

  // controls
  const tiltS = slider({
    label: 'Axial tilt (°)', min: 0, max: 45, step: 0.5, value: params.tilt, format: (v) => v.toFixed(1),
    onInput: (v) => { params.tilt = v; },
  });
  const doySlider = slider({
    label: 'Day of year', min: 0, max: 364, step: 1, value: params.dayOfYear,
    onInput: (v) => { params.dayOfYear = v; },
  });
  const latS = slider({
    label: 'Observer latitude (°)', min: -85, max: 85, step: 1, value: params.latitude,
    onInput: (v) => { params.latitude = v; },
  });
  const speedS = slider({
    label: 'Days / second', min: 5, max: 120, step: 1, value: params.speed,
    onInput: (v) => { params.speed = v; },
  });
  const playT = toggle({ label: 'Auto-advance', value: params.autoplay, onChange: (v) => { params.autoplay = v; } });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const [name, doy] of [['Mar 20', 79], ['Jun 21', 172], ['Sep 22', 265], ['Dec 21', 355]]) {
    const b = button({ label: name, onClick: () => { params.dayOfYear = doy; doySlider.value = doy; } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(tiltS.el, doySlider.el, latS.el, speedS.el, playT.el, presetRow);

  const animator = loop((dt) => { step(dt); draw(); });
  animator.start();
  return () => { animator.stop(); cv.destroy(); };
}
