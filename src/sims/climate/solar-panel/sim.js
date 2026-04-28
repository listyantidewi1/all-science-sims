import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, button, row } from '../../../lib/controls.js';
import { hoverProbe, drawCrosshair } from '../../../lib/chart.js';

// Approximate clear-sky solar irradiance vs hour-of-day at given latitude, day-of-year, panel tilt.
// Solar declination δ = 23.44° · sin(2π · (day - 81) / 365)
// Hour angle h = 15° · (hour - 12)
// Sun elevation: sin(α) = sin(lat)·sin(δ) + cos(lat)·cos(δ)·cos(h)
// Sun azimuth (south-facing approx, fine for tilt analysis).
// Panel facing south, tilt β. Angle of incidence θ:
// cos(θ) = sin(α)·cos(β) + cos(α)·sin(β)·cos(γs - γp), assume γs = γp (south-facing & sun-tracking south).
// Power = max(0, cos(θ)) · 1000 W/m² · (1 - cloudCover) · airMassFactor.

function deg2rad(d) { return d * Math.PI / 180; }

function declination(day) { return deg2rad(23.44) * Math.sin(2 * Math.PI * (day - 81) / 365); }

function sunElevation(lat, decl, hour) {
  const h = deg2rad(15 * (hour - 12));
  return Math.asin(
    Math.sin(deg2rad(lat)) * Math.sin(decl) +
    Math.cos(deg2rad(lat)) * Math.cos(decl) * Math.cos(h)
  );
}

function airMassFactor(elev) {
  // Simple Kasten approximation, at low elevations more atmosphere = less power.
  if (elev <= 0) return 0;
  const sinE = Math.sin(elev);
  return Math.exp(-0.18 / Math.max(0.05, sinE));
}

function panelOutput(lat, day, hour, tilt, cloud) {
  const decl = declination(day);
  const elev = sunElevation(lat, decl, hour);
  if (elev <= 0) return 0;
  // Angle of incidence (south-facing panel):
  //  cos θ = sin α cos β + cos α sin β
  const beta = deg2rad(tilt);
  const cosTheta = Math.sin(elev) * Math.cos(beta) + Math.cos(elev) * Math.sin(beta);
  const incidence = Math.max(0, cosTheta);
  return 1000 * incidence * airMassFactor(elev) * (1 - cloud);
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const params = {
    lat: 35,        // degrees
    tilt: 35,
    day: 172,       // June 21 (summer solstice in N hemisphere)
    cloud: 0.0,
  };

  let dailyChart = null, yearChart = null;

  function draw() {
    const ctx = cv.ctx;
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);

    const halfW = W / 2;

    // Daily curve (output vs hour) on the left
    const dx = 50, dy = 60, dw = halfW - 70, dh = H - dy - 60;
    dailyChart = { x: dx, y: dy, w: dw, h: dh };
    drawDaily(ctx, dx, dy, dw, dh);

    // Annual energy yield (kWh/m²/day vs day-of-year) on the right
    const yx = halfW + 20, yy = 60, yw = halfW - 50, yh = H - yy - 60;
    yearChart = { x: yx, y: yy, w: yw, h: yh };
    drawAnnual(ctx, yx, yy, yw, yh);

    const probe = hover.get();
    if (probe) {
      const c = probe.kind === 'daily' ? dailyChart : yearChart;
      drawCrosshair(ctx, probe, { bounds: c, color: '#fbbf24', label: probe.label });
    }

    // Top header
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(8, 8, W - 16, 38);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px var(--font-mono)';
    const dailyEnergy = computeDailyEnergy(params.day);
    ctx.fillText(`Latitude ${params.lat}° · Tilt ${params.tilt}° · Day ${params.day} · Cloud ${(params.cloud*100).toFixed(0)}%`, 16, 30);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Daily yield: ${(dailyEnergy / 1000).toFixed(2)} kWh/m²`, W - 280, 30);
  }

  function computeDailyEnergy(day) {
    let total = 0;
    const N = 96;
    for (let i = 0; i < N; i++) {
      const hour = (i / N) * 24;
      total += panelOutput(params.lat, day, hour, params.tilt, params.cloud) * (24 / N);
    }
    return total;
  }

  function drawDaily(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Power output across one day (W/m²)', x + 6, y - 6);

    const Pmax = 1100;
    const x2 = (hr) => x + (hr / 24) * w;
    const y2 = (P) => y + h - (P / Pmax) * (h - 16) - 8;

    // gridlines
    ctx.strokeStyle = 'rgba(120,130,150,0.15)';
    for (let hr = 0; hr <= 24; hr += 3) {
      ctx.beginPath(); ctx.moveTo(x2(hr), y); ctx.lineTo(x2(hr), y + h); ctx.stroke();
      ctx.fillStyle = 'rgba(120,130,150,0.7)';
      ctx.font = '10px var(--font-mono)';
      ctx.fillText(`${hr}`, x2(hr) - 6, y + h + 14);
    }

    // Today's curve
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const hr = (i / 200) * 24;
      const P = panelOutput(params.lat, params.day, hr, params.tilt, params.cloud);
      const sx = x2(hr), sy = y2(P);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // Fill area
    ctx.fillStyle = 'rgba(251,191,36,0.18)';
    ctx.beginPath();
    ctx.moveTo(x, y2(0));
    for (let i = 0; i <= 200; i++) {
      const hr = (i / 200) * 24;
      const P = panelOutput(params.lat, params.day, hr, params.tilt, params.cloud);
      ctx.lineTo(x2(hr), y2(P));
    }
    ctx.lineTo(x + w, y2(0));
    ctx.closePath();
    ctx.fill();

    // Comparison: flat panel (tilt=0)
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const hr = (i / 200) * 24;
      const P = panelOutput(params.lat, params.day, hr, 0, params.cloud);
      const sx = x2(hr), sy = y2(P);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawAnnual(ctx, x, y, w, h) {
    ctx.strokeStyle = 'rgba(120,130,150,0.3)';
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = 'rgba(120,130,150,0.85)';
    ctx.font = 'bold 11px var(--font-sans)';
    ctx.fillText('Daily yield across the year (kWh/m²/day)', x + 6, y - 6);

    const Emax = 10;
    const x2 = (d) => x + (d / 365) * w;
    const y2 = (E) => y + h - (E / Emax) * (h - 16) - 8;

    // current day marker
    ctx.strokeStyle = 'rgba(251,191,36,0.6)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(x2(params.day), y); ctx.lineTo(x2(params.day), y + h);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 365; i += 3) {
      const E = computeDailyEnergy(i) / 1000;
      const sx = x2(i), sy = y2(E);
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // month labels
    ctx.fillStyle = 'rgba(120,130,150,0.7)';
    ctx.font = '10px var(--font-mono)';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let m = 0; m < 12; m++) {
      ctx.fillText(months[m], x + (m / 12) * w + 4, y + h + 14);
    }
  }

  const hover = hoverProbe(cv.canvas, (sx, sy) => {
    if (dailyChart && sx >= dailyChart.x && sx <= dailyChart.x + dailyChart.w && sy >= dailyChart.y && sy <= dailyChart.y + dailyChart.h) {
      const hr = ((sx - dailyChart.x) / dailyChart.w) * 24;
      const P = panelOutput(params.lat, params.day, hr, params.tilt, params.cloud);
      return { kind: 'daily', x: sx, y: sy, label: [`hour ${hr.toFixed(2)}`, `${P.toFixed(0)} W/m²`] };
    }
    if (yearChart && sx >= yearChart.x && sx <= yearChart.x + yearChart.w && sy >= yearChart.y && sy <= yearChart.y + yearChart.h) {
      const day = Math.round(((sx - yearChart.x) / yearChart.w) * 365);
      const E = computeDailyEnergy(day) / 1000;
      return { kind: 'year', x: sx, y: sy, label: [`day ${day}`, `${E.toFixed(2)} kWh/m²/day`] };
    }
    return null;
  });

  // controls
  const latS = slider({ label: 'Latitude (°)', min: -70, max: 70, step: 1, value: params.lat,
    onInput: (v) => { params.lat = v; } });
  const tiltS = slider({ label: 'Panel tilt (°)', min: 0, max: 90, step: 1, value: params.tilt,
    onInput: (v) => { params.tilt = v; } });
  const dayS = slider({ label: 'Day of year', min: 1, max: 365, step: 1, value: params.day,
    onInput: (v) => { params.day = v; } });
  const clS = slider({ label: 'Cloud cover', min: 0, max: 1, step: 0.01, value: params.cloud, format: (v) => `${(v*100).toFixed(0)}%`,
    onInput: (v) => { params.cloud = v; } });
  const ruleB = button({ label: 'Tilt = latitude', primary: true, onClick: () => { params.tilt = Math.abs(params.lat); tiltS.value = params.tilt; } });

  ctrlPanel.append(latS.el, tiltS.el, dayS.el, clS.el, row(ruleB));

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); hover.destroy(); cv.destroy(); };
}
