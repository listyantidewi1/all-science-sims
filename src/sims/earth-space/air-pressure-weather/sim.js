import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const FONT = 'ui-monospace, Menlo, Consolas, monospace';
const TOWNS = [
  { name: 'Mawar', u: 0.22, v: 0.3 }, { name: 'Melati', u: 0.7, v: 0.25 },
  { name: 'Anggrek', u: 0.4, v: 0.7 }, { name: 'Teratai', u: 0.8, v: 0.72 },
];
// Marching-squares segments per cell case (edges a=top, b=right, c=bottom, d=left).
const SEG = [[], 'dc', 'cb', 'db', 'ab', 'adcb', 'ac', 'ad', 'ad', 'ac', 'abdc', 'ab', 'db', 'cb', 'dc', []];
const COMPASS_EN = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const COMPASS_ID = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  // Positions are fractions of the map (u across, v down) so they survive resizes.
  const state = {
    hi: { u: 0.25, v: 0.6, amp: 20 }, lo: { u: 0.72, v: 0.4, amp: 24 },
    coriolis: false, south: false, front: 'none', town: 0,
  };
  let map = null;
  const ASPECT = 1.5; // map is 1.5× wider than tall; v is scaled so distances are fair

  function pressure(u, v) {
    const g = (c) => Math.exp(-((u - c.u) ** 2 + ((v - c.v) * ASPECT) ** 2) / (2 * 0.3 ** 2));
    return 1013 + state.hi.amp * g(state.hi) - state.lo.amp * g(state.lo);
  }
  // Wind at (u, v): from high to low, bent sideways by Coriolis. Returns screen-space direction + km/h.
  function wind(u, v) {
    const e = 0.004;
    let wx = -(pressure(u + e, v) - pressure(u - e, v)) / (2 * e);
    let wy = -(pressure(u, v + e) - pressure(u, v - e)) / (2 * e) / ASPECT;
    if (state.coriolis) {
      const a = (state.south ? -1 : 1) * 1.2; // ~70° to the right (north) or left (south)
      const rx = wx * Math.cos(a) - wy * Math.sin(a), ry = wx * Math.sin(a) + wy * Math.cos(a);
      wx = rx; wy = ry;
    }
    return { x: wx, y: wy, speed: 1.3 * Math.hypot(wx, wy) };
  }
  function windWords(w) {
    const from = { x: -w.x, y: -w.y };
    const bearing = (Math.atan2(from.x, -from.y) * 180 / Math.PI + 360) % 360;
    const idx = Math.round(bearing / 45) % 8;
    const names = getLocale() === 'id' ? COMPASS_ID : COMPASS_EN;
    const s = w.speed;
    const strength = s < 10 ? T('calm', 'tenang') : s < 25 ? T('light', 'lemah') : s < 45 ? T('moderate', 'sedang') : T('strong', 'kencang');
    return { dir: names[idx], strength, text: `${T('from', 'dari')} ${names[idx]}, ${s.toFixed(0)} km/h (${strength})` };
  }
  function weatherAt(p) {
    if (p < 1004) return T('rain', 'hujan');
    if (p < 1011) return T('cloudy', 'berawan');
    return T('sunny', 'cerah');
  }
  const toPx = (u, v) => ({ x: map.x + u * map.w, y: map.y + v * map.h });

  function drawIsobars(ctx) {
    const nx = 48, ny = 32;
    const grid = [];
    for (let j = 0; j <= ny; j++) { grid.push([]); for (let i = 0; i <= nx; i++) grid[j].push(pressure(i / nx, j / ny)); }
    ctx.lineWidth = 1.2;
    for (let level = 972; level <= 1056; level += 4) {
      ctx.strokeStyle = level < 1013 ? 'rgba(96,165,250,0.75)' : level > 1013 ? 'rgba(248,113,113,0.75)' : 'rgba(255,255,255,0.6)';
      ctx.beginPath();
      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          const tl = grid[j][i], tr = grid[j][i + 1], br = grid[j + 1][i + 1], bl = grid[j + 1][i];
          const code = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
          const seg = SEG[code];
          if (!seg.length) continue;
          const x0 = map.x + (i / nx) * map.w, y0 = map.y + (j / ny) * map.h, cw = map.w / nx, ch = map.h / ny;
          const lerp = (p, q) => (level - p) / (q - p);
          const pt = (edge) => edge === 'a' ? [x0 + lerp(tl, tr) * cw, y0]
            : edge === 'b' ? [x0 + cw, y0 + lerp(tr, br) * ch]
              : edge === 'c' ? [x0 + lerp(bl, br) * cw, y0 + ch] : [x0, y0 + lerp(tl, bl) * ch];
          for (let k = 0; k < seg.length; k += 2) {
            const p1 = pt(seg[k]), p2 = pt(seg[k + 1]);
            ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
          }
        }
      }
      ctx.stroke();
    }
    ctx.lineWidth = 1;
  }

  function drawCloud(ctx, x, y, rain) {
    ctx.fillStyle = 'rgba(226,232,240,0.9)';
    ctx.beginPath();
    ctx.arc(x - 8, y, 7, 0, Math.PI * 2); ctx.arc(x, y - 5, 9, 0, Math.PI * 2); ctx.arc(x + 9, y, 7, 0, Math.PI * 2);
    ctx.fill();
    if (rain) {
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
      for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x + k * 7, y + 9); ctx.lineTo(x + k * 7 - 3, y + 17); ctx.stroke(); }
      ctx.lineWidth = 1;
    }
  }

  function drawFront(ctx) {
    if (state.front === 'none') return;
    const cold = state.front === 'cold';
    const L = toPx(state.lo.u, state.lo.v);
    const side = state.south ? -1 : 1;
    const end = { x: L.x + (cold ? -0.26 : 0.24) * map.w, y: L.y + side * 0.32 * map.h };
    const ctrl = { x: L.x + (cold ? -0.02 : 0.2) * map.w, y: L.y + side * 0.18 * map.h };
    ctx.strokeStyle = cold ? '#3b82f6' : '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.quadraticCurveTo(ctrl.x, ctrl.y, end.x, end.y); ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    for (let t = 0.15; t < 1; t += 0.2) {
      const x = (1 - t) ** 2 * L.x + 2 * (1 - t) * t * ctrl.x + t * t * end.x;
      const y = (1 - t) ** 2 * L.y + 2 * (1 - t) * t * ctrl.y + t * t * end.y;
      const dx = 2 * (1 - t) * (ctrl.x - L.x) + 2 * t * (end.x - ctrl.x), dy = 2 * (1 - t) * (ctrl.y - L.y) + 2 * t * (end.y - ctrl.y);
      const len = Math.hypot(dx, dy) || 1, nx = (cold ? 1 : -1) * -dy / len, ny = (cold ? 1 : -1) * dx / len;
      ctx.beginPath();
      if (cold) { ctx.moveTo(x - dx / len * 7, y - dy / len * 7); ctx.lineTo(x + nx * 12, y + ny * 12); ctx.lineTo(x + dx / len * 7, y + dy / len * 7); }
      else ctx.arc(x, y, 7, Math.atan2(ny, nx) - Math.PI / 2, Math.atan2(ny, nx) + Math.PI / 2);
      ctx.fill();
    }
    ctx.lineWidth = 1;
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W <= 0 || H <= 0) return;
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, W, H);
    map = { x: 16, y: 36, w: W * 0.64, h: H - 56 };
    ctx.fillStyle = '#14532d';
    ctx.fillRect(map.x, map.y, map.w, map.h);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = `bold 12px ${FONT}`;
    ctx.fillText(T('Weather map — isobars every 4 hPa (blue = low, red = high)', 'Peta cuaca — isobar tiap 4 hPa (biru = rendah, merah = tinggi)'), map.x, map.y - 10);
    ctx.save();
    ctx.beginPath(); ctx.rect(map.x, map.y, map.w, map.h); ctx.clip();
    drawIsobars(ctx);
    // Wind arrows + clouds on a coarse grid
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 10; i++) {
        const u = (i + 0.5) / 10, v = (j + 0.5) / 7;
        const p = toPx(u, v), w = wind(u, v);
        const len = Math.min(30, 4 + w.speed * 0.5);
        const ang = Math.atan2(w.y, w.x);
        if (p.y < map.y + map.h - 20 && w.speed > 3) {
          ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(p.x - Math.cos(ang) * len / 2, p.y - Math.sin(ang) * len / 2);
          const tx = p.x + Math.cos(ang) * len / 2, ty = p.y + Math.sin(ang) * len / 2;
          ctx.lineTo(tx, ty);
          ctx.lineTo(tx - Math.cos(ang - 0.5) * 7, ty - Math.sin(ang - 0.5) * 7);
          ctx.moveTo(tx, ty); ctx.lineTo(tx - Math.cos(ang + 0.5) * 7, ty - Math.sin(ang + 0.5) * 7);
          ctx.stroke();
        }
        const pr = pressure(u, v);
        if (pr < 1008 && (i + j) % 2 === 0) drawCloud(ctx, p.x, p.y - 16, pr < 1002);
      }
    }
    drawFront(ctx);
    ctx.restore();
    // Centres and towns
    for (const [c, letter, col] of [[state.hi, 'H', '#f87171'], [state.lo, 'L', '#60a5fa']]) {
      const p = toPx(c.u, c.v);
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = col; ctx.font = `bold 20px ${FONT}`; ctx.textAlign = 'center';
      ctx.fillText(letter, p.x, p.y + 7);
      ctx.font = `10px ${FONT}`; ctx.fillStyle = '#fff';
      ctx.fillText(`${pressure(c.u, c.v).toFixed(0)} hPa`, p.x, p.y + 30);
    }
    TOWNS.forEach((t, i) => {
      const p = toPx(t.u, t.v);
      ctx.fillStyle = i === state.town ? '#fbbf24' : '#fff';
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.font = `bold 11px ${FONT}`; ctx.textAlign = 'left';
      ctx.fillText(t.name, p.x + 8, p.y + 4);
    });
    ctx.textAlign = 'left';

    // ---- Right panel: barometer + report ----
    const px = map.x + map.w + 20, pw = W - px - 12;
    const town = TOWNS[state.town];
    const p = pressure(town.u, town.v), w = windWords(wind(town.u, town.v));
    const cx = px + pw / 2, cy = 36 + pw * 0.42, r = Math.min(pw * 0.4, (H - 60) * 0.25);
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
    const angOf = (hpa) => Math.PI * 0.75 + ((hpa - 960) / 100) * Math.PI * 1.5;
    ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = `9px ${FONT}`; ctx.textAlign = 'center';
    for (let hpa = 960; hpa <= 1060; hpa += 20) {
      const a = angOf(hpa);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 0.85, cy + Math.sin(a) * r * 0.85); ctx.lineTo(cx + Math.cos(a) * r * 0.95, cy + Math.sin(a) * r * 0.95); ctx.stroke();
      ctx.fillText(String(hpa), cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.7 + 3);
    }
    ctx.fillStyle = '#60a5fa'; ctx.fillText(T('RAIN', 'HUJAN'), cx - r * 0.32, cy + r * 0.3);
    ctx.fillStyle = '#f87171'; ctx.fillText(T('FAIR', 'CERAH'), cx + r * 0.32, cy + r * 0.3);
    const na = angOf(Math.max(960, Math.min(1060, p)));
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(na) * r * 0.8, cy + Math.sin(na) * r * 0.8); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#fff'; ctx.font = `bold 13px ${FONT}`;
    ctx.fillText(`${p.toFixed(0)} hPa`, cx, cy - r * 0.3);
    ctx.textAlign = 'left';
    let ty = cy + r + 24;
    const line = (txt, col = '#fff', bold = false) => { ctx.fillStyle = col; ctx.font = `${bold ? 'bold ' : ''}11px ${FONT}`; ctx.fillText(txt, px, ty); ty += 16; };
    line(`${T('Town', 'Kota')}: ${town.name}`, '#fbbf24', true);
    line(`${T('Pressure', 'Tekanan')}: ${p.toFixed(0)} hPa`);
    line(`${T('Wind', 'Angin')}: ${w.text}`);
    line(`${T('Weather', 'Cuaca')}: ${weatherAt(p)}`);
    ty += 6;
    if (state.front === 'cold') {
      line(T('Cold front (blue triangles):', 'Front dingin (segitiga biru):'), '#60a5fa', true);
      line(T('cold air pushes under warm air →', 'udara dingin mendesak di bawah udara hangat →'));
      line(T('tall clouds, heavy showers, then', 'awan tinggi, hujan deras, lalu'));
      line(T('cooler and clearer.', 'lebih dingin dan cerah.'));
    } else if (state.front === 'warm') {
      line(T('Warm front (red half-circles):', 'Front hangat (setengah lingkaran merah):'), '#f87171', true);
      line(T('warm air slides up over cold air →', 'udara hangat naik di atas udara dingin →'));
      line(T('wide clouds, steady light rain,', 'awan luas, hujan ringan terus-menerus,'));
      line(T('then warmer.', 'lalu lebih hangat.'));
    } else {
      line(T('Wind blows from H to L. Close', 'Angin bertiup dari H ke L. Isobar'), 'rgba(255,255,255,0.7)');
      line(T('isobars = strong wind.', 'yang rapat = angin kencang.'), 'rgba(255,255,255,0.7)');
    }
  }

  // ---- Drag the H and L centres ----
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (!map) return null;
      for (const id of ['lo', 'hi']) { const p = toPx(state[id].u, state[id].v); if (Math.hypot(x - p.x, y - p.y) < 20) return id; }
      return null;
    },
    onDrag(id, x, y) {
      state[id].u = Math.max(0.02, Math.min(0.98, (x - map.x) / map.w));
      state[id].v = Math.max(0.02, Math.min(0.98, (y - map.y) / map.h));
    },
    handles: () => (map ? ['hi', 'lo'].map((id) => ({ id, ...toPx(state[id].u, state[id].v), label: id === 'hi' ? T('High pressure centre', 'Pusat tekanan tinggi') : T('Low pressure centre', 'Pusat tekanan rendah') })) : []),
    cursor: 'default', hoverCursor: 'grab',
  });

  // ---- Controls ----
  const townSel = select({ label: T('Barometer town', 'Kota barometer'), key: 'town', value: '0',
    options: TOWNS.map((t, i) => ({ value: String(i), label: t.name })), onChange: (v) => { state.town = Number(v); } });
  const hiS = slider({ label: T('HIGH strength (hPa above 1013)', 'Kekuatan TINGGI (hPa di atas 1013)'), key: 'high', min: 4, max: 36, step: 1, value: state.hi.amp, onInput: (v) => { state.hi.amp = v; } });
  const loS = slider({ label: T('LOW depth (hPa below 1013)', 'Kedalaman RENDAH (hPa di bawah 1013)'), key: 'low', min: 4, max: 40, step: 1, value: state.lo.amp, onInput: (v) => { state.lo.amp = v; } });
  const corT = toggle({ label: T('Coriolis effect (Earth spins)', 'Efek Coriolis (Bumi berputar)'), key: 'coriolis', value: false, onChange: (v) => { state.coriolis = v; } });
  const hemiSel = select({ label: T('Hemisphere', 'Belahan bumi'), key: 'hemisphere', value: 'north',
    options: [{ value: 'north', label: T('Northern', 'Utara') }, { value: 'south', label: T('Southern', 'Selatan') }], onChange: (v) => { state.south = v === 'south'; } });
  const frontSel = select({ label: T('Front', 'Front'), key: 'front', value: 'none',
    options: [{ value: 'none', label: T('None', 'Tidak ada') }, { value: 'cold', label: T('Cold front', 'Front dingin') }, { value: 'warm', label: T('Warm front', 'Front hangat') }],
    onChange: (v) => { state.front = v; } });
  ctrlPanel.append(townSel.el, hiS.el, loS.el, row(corT), hemiSel.el, frontSel.el);

  const lab = labPanel({
    title: T('Weather station lab', 'Lab stasiun cuaca'),
    filename: 'air-pressure-weather-lab.csv',
    columns: [
      { key: 'town', label: T('town', 'kota') },
      { key: 'p', label: T('pressure (hPa)', 'tekanan (hPa)'), format: (v) => v.toFixed(0) },
      { key: 'wind', label: T('wind (direction, strength)', 'angin (arah, kekuatan)') },
      { key: 'weather', label: T('weather', 'cuaca') },
    ],
    procedure: [
      T('Record the pressure and weather at all four towns without moving anything.', 'Rekam tekanan dan cuaca di keempat kota tanpa memindahkan apa pun.'),
      T('Drag the LOW onto Anggrek. Record Anggrek again. What changed?', 'Geser pusat RENDAH ke Anggrek. Rekam Anggrek lagi. Apa yang berubah?'),
      T('Make the LOW deeper with the slider. Record a town halfway between H and L — is the wind stronger?', 'Perdalam pusat RENDAH dengan slider. Rekam kota di tengah antara H dan L — apakah anginnya lebih kencang?'),
      T('Turn on the Coriolis effect. Record the same town. Did the wind direction change?', 'Nyalakan efek Coriolis. Rekam kota yang sama. Apakah arah anginnya berubah?'),
      T('Choose a cold front, then a warm front. Write down the weather each one brings.', 'Pilih front dingin, lalu front hangat. Tuliskan cuaca yang dibawa masing-masing.'),
    ],
    predict: T('If the barometer at a town starts falling, what weather do you expect next? Why?', 'Jika barometer di sebuah kota mulai turun, cuaca apa yang kamu perkirakan berikutnya? Mengapa?'),
    source: () => {
      const t = TOWNS[state.town];
      const p = pressure(t.u, t.v), w = windWords(wind(t.u, t.v));
      return { town: t.name, p, wind: `${w.dir}, ${w.strength}`, weather: weatherAt(p) };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop(() => draw());
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
