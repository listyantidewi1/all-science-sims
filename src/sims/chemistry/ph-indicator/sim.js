import { createCanvas } from '../../../lib/canvas.js';
import { slider, select, button, row } from '../../../lib/controls.js';

// Each indicator: list of {pH, color} stops; sim interpolates between adjacent stops.
const INDICATORS = {
  universal: {
    name: 'Universal indicator',
    stops: [
      { pH: 0,  c: '#d92c2c' },
      { pH: 3,  c: '#e67a26' },
      { pH: 5,  c: '#e6c12a' },
      { pH: 7,  c: '#7ed957' },
      { pH: 9,  c: '#2d8ce0' },
      { pH: 11, c: '#2a3aa8' },
      { pH: 14, c: '#5a2a8c' },
    ],
  },
  litmus: {
    name: 'Litmus',
    stops: [
      { pH: 0,  c: '#d63434' },
      { pH: 4.5, c: '#d63434' },
      { pH: 8.3, c: '#2d6cd6' },
      { pH: 14, c: '#2d6cd6' },
    ],
  },
  phenolphthalein: {
    name: 'Phenolphthalein',
    stops: [
      { pH: 0,  c: '#f4f4f4' },
      { pH: 8.2, c: '#f4f4f4' },
      { pH: 10, c: '#d8329b' },
      { pH: 14, c: '#a8217a' },
    ],
  },
  methylOrange: {
    name: 'Methyl orange',
    stops: [
      { pH: 0,  c: '#d33b2c' },
      { pH: 3.1, c: '#d33b2c' },
      { pH: 4.4, c: '#e6a52d' },
      { pH: 14, c: '#e6a52d' },
    ],
  },
  bromothymolBlue: {
    name: 'Bromothymol blue',
    stops: [
      { pH: 0,  c: '#e6c92a' },
      { pH: 6.0, c: '#e6c92a' },
      { pH: 7.6, c: '#2d8ce0' },
      { pH: 14, c: '#2d8ce0' },
    ],
  },
};

const PRESETS = [
  { label: 'Lemon juice (pH 2)',     pH: 2 },
  { label: 'Vinegar (pH 2.4)',       pH: 2.4 },
  { label: 'Coffee (pH 5)',          pH: 5 },
  { label: 'Pure water (pH 7)',      pH: 7 },
  { label: 'Baking soda (pH 9)',     pH: 9 },
  { label: 'Soap (pH 10)',           pH: 10 },
  { label: 'Bleach (pH 12.5)',       pH: 12.5 },
];

function colorAt(stops, pH) {
  if (pH <= stops[0].pH) return stops[0].c;
  if (pH >= stops[stops.length - 1].pH) return stops[stops.length - 1].c;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1];
    if (pH >= a.pH && pH <= b.pH) {
      const t = (pH - a.pH) / (b.pH - a.pH);
      return lerpHex(a.c, b.c, t);
    }
  }
  return stops[0].c;
}

function lerpHex(c1, c2, t) {
  const a = hexToRGB(c1), b = hexToRGB(c2);
  const m = (k) => Math.round(a[k] + (b[k] - a[k]) * t);
  return `rgb(${m(0)}, ${m(1)}, ${m(2)})`;
}
function hexToRGB(h) {
  const n = h.replace('#', '');
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
  ];
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const state = {
    pH: 7,
    indicator: 'universal',
  };

  function classify(pH) {
    if (pH < 6.5) return { en: 'Acidic', id: 'Asam' };
    if (pH > 7.5) return { en: 'Basic', id: 'Basa' };
    return { en: 'Neutral', id: 'Netral' };
  }

  function draw() {
    const ctx = cv.ctx;
    const { width: W, height: H } = cv;
    ctx.clearRect(0, 0, W, H);

    // pH color scale strip
    const stripX = 30, stripY = 30, stripW = W - 60, stripH = 28;
    const grad = ctx.createLinearGradient(stripX, 0, stripX + stripW, 0);
    const uni = INDICATORS.universal.stops;
    for (const s of uni) grad.addColorStop(s.pH / 14, s.c);
    ctx.fillStyle = grad;
    ctx.fillRect(stripX, stripY, stripW, stripH);
    ctx.strokeStyle = 'rgba(120,130,150,0.5)';
    ctx.strokeRect(stripX, stripY, stripW, stripH);
    ctx.fillStyle = 'var(--color-fg)';
    ctx.font = '12px var(--font-sans)';
    for (let p = 0; p <= 14; p += 2) {
      const x = stripX + (p / 14) * stripW;
      ctx.fillStyle = 'rgba(120,130,150,0.9)';
      ctx.fillText(String(p), x - 4, stripY + stripH + 14);
      ctx.beginPath();
      ctx.moveTo(x, stripY + stripH);
      ctx.lineTo(x, stripY + stripH + 4);
      ctx.strokeStyle = 'rgba(120,130,150,0.6)';
      ctx.stroke();
    }
    // marker
    const mx = stripX + (state.pH / 14) * stripW;
    ctx.fillStyle = '#0b1220';
    ctx.beginPath();
    ctx.moveTo(mx, stripY - 8);
    ctx.lineTo(mx - 6, stripY - 16);
    ctx.lineTo(mx + 6, stripY - 16);
    ctx.closePath();
    ctx.fill();

    // beaker
    const beakerX = W / 2 - 110, beakerY = 100, beakerW = 220, beakerH = H - 140;
    ctx.strokeStyle = 'rgba(120,130,150,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(beakerX, beakerY);
    ctx.lineTo(beakerX, beakerY + beakerH);
    ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
    ctx.lineTo(beakerX + beakerW, beakerY);
    ctx.stroke();

    // liquid
    const liquidColor = colorAt(INDICATORS[state.indicator].stops, state.pH);
    ctx.fillStyle = liquidColor;
    ctx.fillRect(beakerX + 2, beakerY + 24, beakerW - 4, beakerH - 26);
    // meniscus
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(beakerX + 2, beakerY + 24, beakerW - 4, 4);

    // labels
    ctx.fillStyle = 'var(--color-fg)';
    ctx.font = 'bold 16px var(--font-sans)';
    ctx.fillText(`pH = ${state.pH.toFixed(1)}`, 30, H - 28);
    const cls = classify(state.pH);
    ctx.fillText(`${cls.en} / ${cls.id}`, 30, H - 8);

    ctx.font = '13px var(--font-sans)';
    ctx.fillStyle = 'rgba(120,130,150,0.9)';
    ctx.fillText(INDICATORS[state.indicator].name, beakerX, beakerY - 6);
  }

  // Controls
  const phS = slider({
    label: 'pH', min: 0, max: 14, step: 0.1, value: state.pH, format: (v) => v.toFixed(1),
    onInput: (v) => { state.pH = v; draw(); },
  });
  const indSel = select({
    label: 'Indicator',
    options: Object.entries(INDICATORS).map(([k, v]) => ({ value: k, label: v.name })),
    value: state.indicator,
    onChange: (v) => { state.indicator = v; draw(); },
  });
  const presetRow = document.createElement('div');
  presetRow.className = 'ctrl-row';
  for (const p of PRESETS) {
    const b = button({ label: p.label, onClick: () => { state.pH = p.pH; phS.value = p.pH; draw(); } });
    presetRow.appendChild(b.el);
  }

  ctrlPanel.append(phS.el, indSel.el, presetRow);

  // Redraw on resize via canvas ResizeObserver — use a simple raf loop instead.
  let raf = 0;
  const tick = () => { draw(); raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    cv.destroy();
  };
}
