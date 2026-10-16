import { createCanvas, loop } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);
const TAU = Math.PI * 2, D2R = Math.PI / 180;
const norm = (a) => ((a % TAU) + TAU) % TAU;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TILT = 23.44, INCL = 5.14;
const YEAR = 365.25, SIDEREAL_MONTH = 27.32;
// Convention: top-down view from above the North Pole; angles anticlockwise from +x (screen right).
// Earth angle 0 = 21 December. Earth's axis is tilted towards +x (so at angle 0 the North Pole leans away from the Sun).
// The Moon's line of nodes is fixed along the x axis (nodes at Moon angle 0 and 180°).
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function dateOf(thetaE) {
  const days = (norm(thetaE) / TAU) * YEAR;
  let doy = Math.floor(354 + days) % 365;         // 0-indexed day of year; Dec 21 is index 354
  let m = 0;
  while (doy >= MLEN[m]) { doy -= MLEN[m]; m++; }
  return { m, d: doy + 1 };
}
const PHASES = [
  ['New Moon', 'Bulan baru'], ['Waxing crescent', 'Sabit awal'], ['First quarter', 'Perbani awal'], ['Waxing gibbous', 'Cembung awal'],
  ['Full Moon', 'Purnama'], ['Waning gibbous', 'Cembung akhir'], ['Last quarter', 'Perbani akhir'], ['Waning crescent', 'Sabit akhir'],
];

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const st = { thetaE: Math.PI, thetaM: Math.PI * 1.5, speed: 1, hemi: 'north' };

  // ---- geometry helpers --------------------------------------------------------
  const geo = () => {
    const H = cv.height, W = cv.width;
    return { cx: W * 0.33, cy: H * 0.5, R: H * 0.40, r: H * 0.10, rE: H * 0.032, rM: H * 0.014, rS: H * 0.06 };
  };
  const earthPos = (g) => [g.cx + g.R * Math.cos(st.thetaE), g.cy - g.R * Math.sin(st.thetaE)];
  const moonPos = (g) => { const [ex, ey] = earthPos(g); return [ex + g.r * Math.cos(st.thetaM), ey - g.r * Math.sin(st.thetaM)]; };

  function diagnose() {
    const sunDir = st.thetaE + Math.PI;                     // direction Earth -> Sun
    const e = norm(st.thetaM - sunDir);                     // elongation: 0 new, PI full
    const illum = (1 - Math.cos(e)) / 2;
    const waxing = e < Math.PI;
    const phaseIdx = Math.round(e / (Math.PI / 4)) % 8;
    const dNew = Math.min(e, TAU - e), dFull = Math.abs(e - Math.PI), dQ = Math.min(Math.abs(e - Math.PI / 2), Math.abs(e - 1.5 * Math.PI));
    const tide = Math.min(dNew, dFull) < 20 * D2R ? 'spring' : dQ < 20 * D2R ? 'neap' : 'between';
    const height = INCL * Math.sin(st.thetaM);              // degrees above (+) or below (-) the orbit plane
    const nodeDeg = Math.asin(Math.abs(Math.sin(st.thetaM))) / D2R;
    let eclipse = 'none';
    if (dNew < 8 * D2R && nodeDeg < 17) eclipse = 'solar';
    else if (dFull < 8 * D2R && nodeDeg < 12) eclipse = 'lunar';
    const decl = -TILT * Math.cos(st.thetaE);               // latitude where the Sun is overhead
    const rising = Math.sin(st.thetaE) > 0;                 // declination increasing
    let seasonN;
    if (decl > TILT / 2) seasonN = 'summer'; else if (decl < -TILT / 2) seasonN = 'winter'; else seasonN = rising ? 'spring' : 'autumn';
    const flip = { summer: 'winter', winter: 'summer', spring: 'autumn', autumn: 'spring' };
    const season = st.hemi === 'north' ? seasonN : flip[seasonN];
    // Combined tidal bulge: moon weight 1, sun weight 0.46; quadrupole addition.
    const tx = Math.cos(2 * st.thetaM) + 0.46 * Math.cos(2 * sunDir), ty = Math.sin(2 * st.thetaM) + 0.46 * Math.sin(2 * sunDir);
    const tideAmp = Math.hypot(tx, ty), tideDir = 0.5 * Math.atan2(ty, tx);
    return { e, illum, waxing, phaseIdx, tide, height, nodeDeg, eclipse, decl, season, tideAmp, tideDir, date: dateOf(st.thetaE) };
  }
  const SEASON = { summer: ['summer', 'musim panas'], winter: ['winter', 'musim dingin'], spring: ['spring', 'musim semi'], autumn: ['autumn', 'musim gugur'] };

  // ---- drawing -----------------------------------------------------------------
  const font = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
  function litDisc(ctx, x, y, r, dirToSun, dark, light) {
    // disc with the half facing dirToSun (screen angle, radians, y-down corrected) lit
    ctx.fillStyle = dark; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.fillStyle = light; ctx.beginPath(); ctx.arc(x, y, r, -dirToSun - Math.PI / 2, -dirToSun + Math.PI / 2); ctx.closePath(); ctx.fill();
  }
  function phaseDisc(ctx, x, y, r, d) {
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    if (d.illum > 0.005) {
      // lit half on the right when waxing (northern-hemisphere view), then the terminator ellipse
      ctx.fillStyle = '#fde68a'; ctx.beginPath();
      ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, !d.waxing); ctx.closePath(); ctx.fill();
      ctx.fillStyle = d.illum > 0.5 ? '#fde68a' : '#1e293b';
      ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.01, Math.abs(Math.cos(d.e))) * r, r, 0, 0, TAU); ctx.fill();
    }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  }
  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    const g = geo(), d = diagnose(), fs = Math.max(9, W * 0.015);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    // stars
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    for (let i = 0; i < 60; i++) { const x = ((i * 7919) % 1000) / 1000 * W * 0.66, y = ((i * 104729) % 1000) / 1000 * H; ctx.fillRect(x, y, 1.5, 1.5); }
    // Earth orbit + month ticks
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8); ctx.textAlign = 'center';
    let cum = 0;
    for (let m = 0; m < 12; m++) {
      const doy1 = cum; cum += MLEN[m];
      const th = norm((doy1 - 354 + 365) % 365 / YEAR * TAU);
      const x1 = g.cx + g.R * Math.cos(th), y1 = g.cy - g.R * Math.sin(th);
      ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(g.cx + (g.R + 6) * Math.cos(th), g.cy - (g.R + 6) * Math.sin(th)); ctx.stroke();
      const thMid = norm(((doy1 + MLEN[m] / 2) - 354 + 365) % 365 / YEAR * TAU);
      ctx.fillText((getLocale() === 'id' ? MONTHS_ID : MONTHS_EN)[m], g.cx + (g.R + fs * 1.3) * Math.cos(thMid), g.cy - (g.R + fs * 1.3) * Math.sin(thMid) + fs * 0.35);
    }
    // Sun
    const sg = ctx.createRadialGradient(g.cx, g.cy, g.rS * 0.5, g.cx, g.cy, g.rS * 2.2);
    sg.addColorStop(0, 'rgba(251,191,36,0.6)'); sg.addColorStop(1, 'rgba(251,191,36,0)');
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.rS * 2.2, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.rS, 0, TAU); ctx.fill();
    ctx.fillStyle = '#7c2d12'; ctx.font = font(fs * 0.9, true); ctx.fillText(T('Sun', 'Matahari'), g.cx, g.cy + fs * 0.35);
    // sunlight rays towards Earth
    const [ex, ey] = earthPos(g), [mx, my] = moonPos(g);
    const sunDir = st.thetaE + Math.PI;
    ctx.strokeStyle = 'rgba(251,191,36,0.25)'; ctx.lineWidth = 1;
    for (let k = -2; k <= 2; k++) {
      const off = k * g.rE * 0.9, px = Math.cos(sunDir + Math.PI / 2) * off, py = -Math.sin(sunDir + Math.PI / 2) * off;
      ctx.beginPath(); ctx.moveTo(g.cx + px + Math.cos(st.thetaE) * g.rS, g.cy + py - Math.sin(st.thetaE) * g.rS); ctx.lineTo(ex + px - Math.cos(st.thetaE) * g.rE * 2.2, ey + py + Math.sin(st.thetaE) * g.rE * 2.2); ctx.stroke();
    }
    // line of nodes through Earth
    ctx.strokeStyle = 'rgba(192,132,252,0.6)'; ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.moveTo(ex - g.r * 1.35, ey); ctx.lineTo(ex + g.r * 1.35, ey); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(192,132,252,0.9)'; ctx.font = font(fs * 0.7); ctx.textAlign = 'left';
    ctx.fillText(T('line of nodes', 'garis simpul'), ex + g.r * 1.4, ey + fs * 0.35);
    // Moon orbit
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ex, ey, g.r, 0, TAU); ctx.stroke();
    // tidal bulge
    const a = g.rE * (1.35 + 0.45 * (d.tideAmp - 0.54) / 0.92), b = g.rE * (1.30 - 0.18 * (d.tideAmp - 0.54) / 0.92);
    ctx.fillStyle = 'rgba(56,189,248,0.30)'; ctx.beginPath(); ctx.ellipse(ex, ey, a, b, -d.tideDir, 0, TAU); ctx.fill();
    // Earth: lit half faces the Sun; axis projection along +x
    litDisc(ctx, ex, ey, g.rE, sunDir, '#1e3a8a', '#60a5fa');
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ex - g.rE * 0.9, ey); ctx.lineTo(ex + g.rE * 1.4, ey); ctx.stroke();
    ctx.fillStyle = '#f8fafc'; ctx.font = font(fs * 0.75, true); ctx.textAlign = 'left'; ctx.fillText('N', ex + g.rE * 1.5, ey + fs * 0.3);
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.85, true); ctx.textAlign = 'center'; ctx.fillText(T('Earth', 'Bumi'), ex, ey - g.rE - fs * 0.5);
    // Moon: lit half faces the Sun
    const moonToSun = Math.atan2(-(g.cy - my), g.cx - mx);
    litDisc(ctx, mx, my, g.rM, moonToSun, '#334155', '#e2e8f0');
    ctx.fillStyle = '#e2e8f0'; ctx.font = font(fs * 0.75); ctx.fillText(T('Moon', 'Bulan'), mx, my - g.rM - fs * 0.4);
    // view note
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.8); ctx.textAlign = 'left';
    ctx.fillText(T('View from above the North Pole · orbits run anticlockwise · not to scale', 'Dilihat dari atas Kutub Utara · orbit berlawanan arah jarum jam · tidak sesuai skala'), W * 0.01, H * 0.975);
    ctx.fillText(T('Drag the Earth or the Moon', 'Geser Bumi atau Bulan'), W * 0.01, H * 0.04);

    // ---- side panel ----
    const px = W * 0.67, pw = W * 0.32;
    ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(px, H * 0.03, pw, H * 0.94, 12); ctx.fill();
    const dt = d.date;
    ctx.fillStyle = '#f8fafc'; ctx.font = font(fs * 1.1, true); ctx.textAlign = 'left';
    ctx.fillText(`${dt.d} ${(getLocale() === 'id' ? MONTHS_ID : MONTHS_EN)[dt.m]}  ·  ${T('Moon angle', 'Sudut Bulan')} ${(d.e / D2R).toFixed(0)}°`, px + 10, H * 0.03 + fs * 1.7);
    // phase
    phaseDisc(ctx, px + pw * 0.17, H * 0.19, H * 0.065, d);
    ctx.fillStyle = '#fde68a'; ctx.font = font(fs * 1.0, true);
    ctx.fillText(PHASES[d.phaseIdx][getLocale() === 'id' ? 1 : 0], px + pw * 0.36, H * 0.17);
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.78);
    ctx.fillText(`${(d.illum * 100).toFixed(0)}% ${T('lit', 'terang')} · ${d.waxing ? T('waxing', 'membesar') : T('waning', 'mengecil')}`, px + pw * 0.36, H * 0.17 + fs * 1.3);
    ctx.fillText(T('as seen from the northern hemisphere', 'dilihat dari belahan Bumi utara'), px + pw * 0.36, H * 0.17 + fs * 2.5);
    // tide
    let y = H * 0.33;
    const line = (label, value, color = '#f8fafc') => {
      ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.fillText(label, px + 10, y);
      ctx.fillStyle = color; ctx.font = font(fs * 0.95, true);
      const words = value.split(' '); let cur = ''; let yy = y + fs * 1.1;
      for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > pw - 20 && cur) { ctx.fillText(cur, px + 10, yy); yy += fs * 1.1; cur = w; } else cur = t; }
      ctx.fillText(cur, px + 10, yy); y = yy + fs * 1.6;
    };
    const tideTxt = d.tide === 'spring' ? T('Spring tide: big range (Sun + Moon aligned)', 'Pasang purnama: rentang besar (Matahari + Bulan segaris)')
      : d.tide === 'neap' ? T('Neap tide: small range (pulls at right angles)', 'Pasang perbani: rentang kecil (tarikan tegak lurus)')
        : T('Between spring and neap', 'Antara pasang purnama dan perbani');
    line(T('Tides', 'Pasang laut'), tideTxt, d.tide === 'spring' ? '#38bdf8' : d.tide === 'neap' ? '#a5b4fc' : '#cbd5e1');
    const hTxt = `${Math.abs(d.height).toFixed(1)}° ${d.height >= 0 ? T('above', 'di atas') : T('below', 'di bawah')} ${T('the orbit plane', 'bidang orbit')}`;
    const eclTxt = d.eclipse === 'solar' ? T('SOLAR ECLIPSE possible: new Moon near a node', 'GERHANA MATAHARI mungkin: bulan baru dekat titik simpul')
      : d.eclipse === 'lunar' ? T('LUNAR ECLIPSE possible: full Moon near a node', 'GERHANA BULAN mungkin: purnama dekat titik simpul')
        : (Math.min(d.e, TAU - d.e) < 8 * D2R || Math.abs(d.e - Math.PI) < 8 * D2R)
          ? `${T('No eclipse: Moon is', 'Tak ada gerhana: Bulan')} ${hTxt}`
          : `${T('No eclipse: Moon not new or full', 'Tak ada gerhana: Bulan tidak baru/purnama')} (${hTxt})`;
    line(T('Eclipse', 'Gerhana'), eclTxt, d.eclipse !== 'none' ? '#fbbf24' : '#cbd5e1');
    const hemiTxt = st.hemi === 'north' ? T('northern hemisphere', 'belahan Bumi utara') : T('southern hemisphere', 'belahan Bumi selatan');
    line(`${T('Season', 'Musim')} (${hemiTxt})`, `${SEASON[d.season][getLocale() === 'id' ? 1 : 0]} · ${T('Sun overhead at', 'Matahari tepat di atas')} ${Math.abs(d.decl).toFixed(1)}° ${d.decl >= 0 ? T('N', 'LU') : T('S', 'LS')}`, '#4ade80');
    // Earth tilt side view
    const tx = px + pw * 0.72, ty = H * 0.80, tr = H * 0.075;
    ctx.fillStyle = '#94a3b8'; ctx.font = font(fs * 0.75); ctx.textAlign = 'center';
    ctx.fillText(T('side view: axis tilt 23.4°', 'tampak samping: sumbu miring 23,4°'), tx, ty - tr - fs * 0.9);
    ctx.fillStyle = 'rgba(251,191,36,0.6)'; ctx.font = font(fs * 0.7); ctx.textAlign = 'left';
    ctx.fillText(T('sunlight →', 'cahaya →'), px + 10, ty);
    const lean = -d.decl * D2R;                      // positive = North Pole leans left (towards the Sun)
    ctx.save(); ctx.translate(tx, ty);
    ctx.fillStyle = '#60a5fa'; ctx.beginPath(); ctx.arc(0, 0, tr, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(15,23,42,0.75)'; ctx.beginPath(); ctx.arc(0, 0, tr, -Math.PI / 2, Math.PI / 2); ctx.fill(); // night half (right)
    ctx.rotate(lean);
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -tr * 1.3); ctx.lineTo(0, tr * 1.3); ctx.stroke();
    ctx.strokeStyle = 'rgba(248,250,252,0.6)'; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(-tr, 0); ctx.lineTo(tr, 0); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#f8fafc'; ctx.font = font(fs * 0.75, true); ctx.textAlign = 'center';
    ctx.fillText('N', 0, -tr * 1.4); ctx.fillText('S', 0, tr * 1.4 + fs * 0.7);
    ctx.restore();
    ctx.fillStyle = '#cbd5e1'; ctx.font = font(fs * 0.7); ctx.textAlign = 'left';
    const leanTxt = d.decl > 2 ? T('North Pole leans towards the Sun', 'Kutub Utara condong ke Matahari') : d.decl < -2 ? T('South Pole leans towards the Sun', 'Kutub Selatan condong ke Matahari') : T('neither pole leans towards the Sun', 'tidak ada kutub yang condong ke Matahari');
    ctx.fillText(leanTxt, px + 10, ty + tr + fs * 2.2);
    ctx.textAlign = 'left';
  }

  // ---- interaction -------------------------------------------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      const g = geo(), [mx, my] = moonPos(g), [ex, ey] = earthPos(g);
      if (Math.hypot(x - mx, y - my) < Math.max(g.rM * 2.2, 14)) return 'moon';
      if (Math.hypot(x - ex, y - ey) < Math.max(g.rE * 1.6, 16)) return 'earth';
      return null;
    },
    onDrag(id, x, y) {
      const g = geo();
      if (id === 'earth') { st.thetaE = norm(Math.atan2(-(y - g.cy), x - g.cx)); }
      else { const [ex, ey] = earthPos(g); st.thetaM = norm(Math.atan2(-(y - ey), x - ex)); }
    },
    handles: () => { const g = geo(), [ex, ey] = earthPos(g), [mx, my] = moonPos(g); return [{ id: 'earth', x: ex, y: ey, label: 'Earth (drag around the Sun to change the month)' }, { id: 'moon', x: mx, y: my, label: 'Moon (drag around the Earth to change the phase)' }]; },
    cursor: 'default', hoverCursor: 'grab', keyStep: 6,
  });

  // ---- controls ----------------------------------------------------------------
  const speedS = slider({ label: 'Speed (days per second)', key: 'speed', min: 0, max: 10, step: 0.5, value: 1, format: (v) => v.toFixed(1), onInput: (v) => { st.speed = v; } });
  const hemiSel = select({ label: 'Hemisphere for the season', key: 'hemi', value: 'north', options: [{ value: 'north', label: 'Northern (e.g. Japan, Europe)' }, { value: 'south', label: 'Southern (e.g. Australia)' }], onChange: (v) => { st.hemi = v; } });
  const setPhase = (e) => () => { st.thetaM = norm(st.thetaE + Math.PI + e); };
  const setEarth = (th) => () => { st.thetaE = norm(th); };
  const phaseRow = row(
    button({ label: 'New Moon', onClick: setPhase(0) }),
    button({ label: 'First quarter', onClick: setPhase(Math.PI / 2) }),
    button({ label: 'Full Moon', onClick: setPhase(Math.PI) }),
    button({ label: 'Last quarter', onClick: setPhase(1.5 * Math.PI) }),
    button({ label: 'Spring tide', onClick: setPhase(Math.PI) }),
    button({ label: 'Neap tide', onClick: setPhase(Math.PI / 2) }),
  );
  const eclRow = row(
    button({ label: 'Solar eclipse', onClick: () => { st.thetaE = Math.PI; st.thetaM = 0; } }),
    button({ label: 'Lunar eclipse', onClick: () => { st.thetaE = Math.PI; st.thetaM = Math.PI; } }),
    button({ label: 'March equinox', onClick: setEarth(Math.PI / 2) }),
    button({ label: 'June solstice', onClick: setEarth(Math.PI) }),
    button({ label: 'Sept equinox', onClick: setEarth(1.5 * Math.PI) }),
    button({ label: 'Dec solstice', onClick: setEarth(0) }),
  );
  ctrlPanel.append(speedS.el, hemiSel.el, phaseRow, eclRow);

  const lab = labPanel({
    title: 'Sky diary',
    filename: 'earth-moon-sun-data.csv',
    columns: [
      { key: 'date', label: 'Earth position (date)' },
      { key: 'angle', label: 'Moon angle from Sun (°)' },
      { key: 'phase', label: 'Phase' },
      { key: 'tide', label: 'Tide' },
      { key: 'eclipse', label: 'Eclipse' },
      { key: 'season', label: 'Season (hemisphere)' },
    ],
    procedure: [
      'Set speed to 0. Press New Moon and record. Then drag the Moon to 45°, 90°, 135° and 180° and record each row.',
      'Which Moon angles give spring tides and which give neap tides? Check your table.',
      'Press Solar eclipse and record. Drag the Earth to March, keep the Moon at new Moon, and record again. Why did the eclipse vanish?',
      'Record the season at the June solstice for the northern hemisphere, then switch the hemisphere to southern and record again.',
    ],
    predict: 'At which Moon angle do you expect a full Moon, and will the tides then be spring or neap?',
    source: () => {
      const d = diagnose();
      return {
        date: `${d.date.d} ${MONTHS_EN[d.date.m]}`, angle: Math.round(d.e / D2R), phase: PHASES[d.phaseIdx][0], tide: d.tide,
        eclipse: d.eclipse === 'none' ? `none (Moon ${d.height >= 0 ? '+' : ''}${d.height.toFixed(1)}°)` : `${d.eclipse} possible`,
        season: `${d.season} (${st.hemi})`,
      };
    },
  });
  ctrlPanel.appendChild(lab.el);

  const animator = loop((dt) => {
    if (!drag.isDragging()) {
      st.thetaE = norm(st.thetaE + st.speed * dt * TAU / YEAR);
      st.thetaM = norm(st.thetaM + st.speed * dt * TAU / SIDEREAL_MONTH);
    }
    draw();
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
