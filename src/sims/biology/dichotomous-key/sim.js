import { createCanvas, loop } from '../../../lib/canvas.js';
import { button, toggle, select, row } from '../../../lib/controls.js';
import { dragHandle } from '../../../lib/handle.js';
import { labPanel } from '../../../lib/lab.js';
import { getLocale } from '../../../i18n/index.js';

const T = (en, id) => (getLocale() === 'id' ? id : en);

// Twelve organisms and the features a key may ask about.
const ORGANISMS = [
  { id: 'frog',      name: { en: 'Frog',        id: 'Katak' },         group: { en: 'amphibian', id: 'amfibi' },        traits: ['animal', 'backbone', 'legs', 'moistSkin'] },
  { id: 'snake',     name: { en: 'Snake',       id: 'Ular' },          group: { en: 'reptile', id: 'reptil' },          traits: ['animal', 'backbone', 'scales'] },
  { id: 'sparrow',   name: { en: 'Sparrow',     id: 'Burung gereja' }, group: { en: 'bird', id: 'burung' },             traits: ['animal', 'backbone', 'feathers', 'legs', 'wings'] },
  { id: 'cat',       name: { en: 'Cat',         id: 'Kucing' },        group: { en: 'mammal', id: 'mamalia' },          traits: ['animal', 'backbone', 'fur', 'milk', 'legs'] },
  { id: 'shark',     name: { en: 'Shark',       id: 'Hiu' },           group: { en: 'fish', id: 'ikan' },               traits: ['animal', 'backbone', 'scales', 'gills', 'aquatic'] },
  { id: 'dolphin',   name: { en: 'Dolphin',     id: 'Lumba-lumba' },   group: { en: 'mammal', id: 'mamalia' },          traits: ['animal', 'backbone', 'milk', 'aquatic'] },
  { id: 'butterfly', name: { en: 'Butterfly',   id: 'Kupu-kupu' },     group: { en: 'insect', id: 'serangga' },         traits: ['animal', 'legs', 'sixLegs', 'wings', 'exoskeleton'] },
  { id: 'spider',    name: { en: 'Spider',      id: 'Laba-laba' },     group: { en: 'arachnid', id: 'arakhnida' },      traits: ['animal', 'legs', 'eightLegs', 'exoskeleton'] },
  { id: 'earthworm', name: { en: 'Earthworm',   id: 'Cacing tanah' },  group: { en: 'annelid worm', id: 'cacing gelang' }, traits: ['animal', 'segments', 'moistSkin'] },
  { id: 'mushroom',  name: { en: 'Mushroom',    id: 'Jamur' },         group: { en: 'fungus', id: 'fungi' },            traits: ['spores'] },
  { id: 'fern',      name: { en: 'Fern',        id: 'Paku-pakuan' },   group: { en: 'fern (plant)', id: 'tumbuhan paku' }, traits: ['green', 'spores'] },
  { id: 'mango',     name: { en: 'Mango tree',  id: 'Pohon mangga' },  group: { en: 'flowering plant', id: 'tumbuhan berbunga' }, traits: ['green', 'flowers'] },
];
const QUESTIONS = [
  { key: 'animal',      en: 'Does it move from place to place by itself?',          id: 'Apakah ia bergerak berpindah tempat sendiri?' },
  { key: 'backbone',    en: 'Does it have a backbone?',                               id: 'Apakah ia punya tulang belakang?' },
  { key: 'feathers',    en: 'Is its body covered in feathers?',                       id: 'Apakah tubuhnya ditutupi bulu seperti burung?' },
  { key: 'fur',         en: 'Is its body covered in fur or hair?',                    id: 'Apakah tubuhnya ditutupi rambut?' },
  { key: 'milk',        en: 'Does it feed its young with milk?',                      id: 'Apakah ia menyusui anaknya?' },
  { key: 'scales',      en: 'Is its body covered in scales?',                         id: 'Apakah tubuhnya ditutupi sisik?' },
  { key: 'gills',       en: 'Does it breathe with gills all its life?',               id: 'Apakah ia bernapas dengan insang seumur hidup?' },
  { key: 'aquatic',     en: 'Does it live in water all its life?',                    id: 'Apakah ia hidup di air seumur hidup?' },
  { key: 'legs',        en: 'Does it have legs?',                                     id: 'Apakah ia punya kaki?' },
  { key: 'sixLegs',     en: 'Does it have exactly six legs?',                         id: 'Apakah kakinya tepat enam?' },
  { key: 'eightLegs',   en: 'Does it have eight legs?',                               id: 'Apakah kakinya delapan?' },
  { key: 'wings',       en: 'Does it have wings?',                                    id: 'Apakah ia punya sayap?' },
  { key: 'exoskeleton', en: 'Does it have a hard outer skeleton?',                    id: 'Apakah ia punya rangka luar yang keras?' },
  { key: 'segments',    en: 'Is its body made of many rings (segments)?',             id: 'Apakah tubuhnya beruas-ruas?' },
  { key: 'moistSkin',   en: 'Does it have smooth, moist skin?',                       id: 'Apakah kulitnya licin dan lembap?' },
  { key: 'green',       en: 'Is it green and makes its own food from sunlight?',     id: 'Apakah ia hijau dan membuat makanan sendiri dari cahaya matahari?' },
  { key: 'flowers',     en: 'Does it make flowers and fruit?',                        id: 'Apakah ia berbunga dan berbuah?' },
  { key: 'spores',      en: 'Does it spread by tiny spores?',                         id: 'Apakah ia menyebar dengan spora?' },
];
const Q = (key) => QUESTIONS.find((q) => q.key === key);
const ORG = (id) => ORGANISMS.find((o) => o.id === id);
const has = (org, key) => org.traits.includes(key);

// The fixed key used in Identify mode.
const q = (key, yes, no) => ({ q: key, yes, no });
const KEY = q('animal',
  q('backbone',
    q('feathers', 'sparrow',
      q('milk', q('aquatic', 'dolphin', 'cat'),
        q('scales', q('gills', 'shark', 'snake'), 'frog'))),
    q('legs', q('sixLegs', 'butterfly', 'spider'), 'earthworm')),
  q('green', q('flowers', 'mango', 'fern'), 'mushroom'));

// ---- icons -----------------------------------------------------------------
function drawOrganism(ctx, id, cx, cy, s, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const P = Math.PI;
  switch (id) {
    case 'frog':
      ctx.fillStyle = '#4ade80';
      ctx.beginPath(); ctx.ellipse(0, s * 0.15, s * 0.8, s * 0.55, 0, 0, 2 * P); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-s * 0.4, -s * 0.4, s * 0.25, s * 0.25, 0, 0, 2 * P); ctx.ellipse(s * 0.4, -s * 0.4, s * 0.25, s * 0.25, 0, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-s * 0.4, -s * 0.42, s * 0.13, 0, 2 * P); ctx.arc(s * 0.4, -s * 0.42, s * 0.13, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-s * 0.4, -s * 0.42, s * 0.06, 0, 2 * P); ctx.arc(s * 0.4, -s * 0.42, s * 0.06, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#22c55e'; ctx.lineWidth = s * 0.16;
      ctx.beginPath(); ctx.moveTo(-s * 0.6, s * 0.4); ctx.lineTo(-s * 0.95, s * 0.7); ctx.moveTo(s * 0.6, s * 0.4); ctx.lineTo(s * 0.95, s * 0.7);
      ctx.moveTo(-s * 0.3, s * 0.6); ctx.lineTo(-s * 0.5, s * 0.85); ctx.moveTo(s * 0.3, s * 0.6); ctx.lineTo(s * 0.5, s * 0.85); ctx.stroke();
      break;
    case 'snake':
      ctx.strokeStyle = '#a3e635'; ctx.lineWidth = s * 0.28;
      ctx.beginPath(); ctx.moveTo(-s * 0.9, s * 0.5);
      ctx.bezierCurveTo(-s * 0.9, -s * 0.5, -s * 0.1, -s * 0.5, 0, 0.1 * s);
      ctx.bezierCurveTo(s * 0.1, s * 0.7, s * 0.8, s * 0.7, s * 0.8, -s * 0.1); ctx.stroke();
      ctx.fillStyle = '#a3e635'; ctx.beginPath(); ctx.ellipse(s * 0.8, -s * 0.3, s * 0.26, s * 0.2, 0, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 0.88, -s * 0.36, s * 0.05, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = s * 0.06; ctx.beginPath(); ctx.moveTo(s * 1.05, -s * 0.3); ctx.lineTo(s * 1.25, -s * 0.3); ctx.stroke();
      break;
    case 'sparrow':
      ctx.fillStyle = '#a16207';
      ctx.beginPath(); ctx.ellipse(0, s * 0.15, s * 0.7, s * 0.45, -0.3, 0, 2 * P); ctx.fill();
      ctx.beginPath(); ctx.arc(s * 0.55, -s * 0.3, s * 0.3, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#d6d3d1'; ctx.beginPath(); ctx.ellipse(-s * 0.05, s * 0.25, s * 0.45, s * 0.25, -0.3, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#78350f'; ctx.beginPath(); ctx.moveTo(-s * 0.55, s * 0.05); ctx.lineTo(-s * 1.05, -s * 0.15); ctx.lineTo(-s * 1.0, s * 0.3); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-s * 0.05, -s * 0.05, s * 0.45, s * 0.18, -0.5, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(s * 0.82, -s * 0.3); ctx.lineTo(s * 1.1, -s * 0.22); ctx.lineTo(s * 0.82, -s * 0.15); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 0.62, -s * 0.38, s * 0.06, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = s * 0.07; ctx.beginPath(); ctx.moveTo(-s * 0.1, s * 0.58); ctx.lineTo(-s * 0.15, s * 0.9); ctx.moveTo(s * 0.2, s * 0.58); ctx.lineTo(s * 0.2, s * 0.9); ctx.stroke();
      break;
    case 'cat':
      ctx.fillStyle = '#9ca3af';
      ctx.beginPath(); ctx.ellipse(s * 0.1, s * 0.4, s * 0.75, s * 0.42, 0, 0, 2 * P); ctx.fill();
      ctx.beginPath(); ctx.arc(-s * 0.45, -s * 0.2, s * 0.42, 0, 2 * P); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.8, -s * 0.4); ctx.lineTo(-s * 0.75, -s * 0.85); ctx.lineTo(-s * 0.5, -s * 0.55); ctx.closePath();
      ctx.moveTo(-s * 0.1, -s * 0.4); ctx.lineTo(-s * 0.15, -s * 0.85); ctx.lineTo(-s * 0.4, -s * 0.55); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = s * 0.14;
      ctx.beginPath(); ctx.moveTo(s * 0.8, s * 0.3); ctx.quadraticCurveTo(s * 1.2, s * 0.1, s * 1.1, -s * 0.4); ctx.stroke();
      ctx.lineWidth = s * 0.12; ctx.beginPath(); ctx.moveTo(-s * 0.2, s * 0.7); ctx.lineTo(-s * 0.2, s * 0.95); ctx.moveTo(s * 0.5, s * 0.7); ctx.lineTo(s * 0.5, s * 0.95); ctx.stroke();
      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(-s * 0.6, -s * 0.25, s * 0.07, 0, 2 * P); ctx.arc(-s * 0.3, -s * 0.25, s * 0.07, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = s * 0.03;
      ctx.beginPath(); ctx.moveTo(-s * 0.9, -s * 0.05); ctx.lineTo(-s * 1.2, -s * 0.1); ctx.moveTo(-s * 0.9, s * 0.05); ctx.lineTo(-s * 1.2, s * 0.1); ctx.stroke();
      break;
    case 'shark':
      ctx.fillStyle = '#64748b';
      ctx.beginPath(); ctx.ellipse(0, 0.1 * s, s * 0.95, s * 0.35, 0, 0, 2 * P); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.2, -s * 0.2); ctx.lineTo(s * 0.05, -s * 0.8); ctx.lineTo(s * 0.3, -s * 0.2); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.85, 0.1 * s); ctx.lineTo(-s * 1.25, -s * 0.4); ctx.lineTo(-s * 1.15, 0.1 * s); ctx.lineTo(-s * 1.25, s * 0.55); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.05, s * 0.35); ctx.lineTo(-s * 0.3, s * 0.75); ctx.lineTo(s * 0.2, s * 0.4); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#cbd5e1'; ctx.beginPath(); ctx.ellipse(s * 0.1, s * 0.25, s * 0.7, s * 0.18, 0, 0, P); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 0.65, -s * 0.02, s * 0.06, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = s * 0.04;
      ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(s * (0.35 + i * 0.08), -s * 0.1); ctx.lineTo(s * (0.33 + i * 0.08), s * 0.15); } ctx.stroke();
      break;
    case 'dolphin':
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath(); ctx.moveTo(-s * 1.0, -s * 0.1);
      ctx.bezierCurveTo(-s * 0.6, -s * 0.7, s * 0.5, -s * 0.7, s * 1.05, -s * 0.05);
      ctx.bezierCurveTo(s * 0.6, s * 0.45, -s * 0.5, s * 0.5, -s * 1.0, 0.1 * s); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.15, -s * 0.45); ctx.lineTo(0, -s * 0.9); ctx.lineTo(s * 0.25, -s * 0.45); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-s * 0.95, 0); ctx.lineTo(-s * 1.3, -s * 0.4); ctx.lineTo(-s * 1.1, 0); ctx.lineTo(-s * 1.3, s * 0.4); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#dbeafe'; ctx.beginPath(); ctx.ellipse(0, s * 0.2, s * 0.7, s * 0.15, 0, 0, P); ctx.fill();
      ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(s * 0.6, -s * 0.15, s * 0.06, 0, 2 * P); ctx.fill();
      break;
    case 'butterfly':
      ctx.fillStyle = '#fb923c';
      ctx.beginPath(); ctx.ellipse(-s * 0.5, -s * 0.3, s * 0.5, s * 0.42, 0.3, 0, 2 * P); ctx.ellipse(s * 0.5, -s * 0.3, s * 0.5, s * 0.42, -0.3, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#f97316';
      ctx.beginPath(); ctx.ellipse(-s * 0.4, s * 0.4, s * 0.38, s * 0.35, -0.3, 0, 2 * P); ctx.ellipse(s * 0.4, s * 0.4, s * 0.38, s * 0.35, 0.3, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#1f2937'; ctx.beginPath(); ctx.arc(-s * 0.55, -s * 0.3, s * 0.12, 0, 2 * P); ctx.arc(s * 0.55, -s * 0.3, s * 0.12, 0, 2 * P); ctx.fill();
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = s * 0.14; ctx.beginPath(); ctx.moveTo(0, -s * 0.6); ctx.lineTo(0, s * 0.7); ctx.stroke();
      ctx.lineWidth = s * 0.04; ctx.beginPath(); ctx.moveTo(0, -s * 0.6); ctx.lineTo(-s * 0.3, -s * 1.0); ctx.moveTo(0, -s * 0.6); ctx.lineTo(s * 0.3, -s * 1.0); ctx.stroke();
      ctx.lineWidth = s * 0.05;
      ctx.beginPath(); for (let i = -1; i <= 1; i++) { ctx.moveTo(-s * 0.05, s * i * 0.25); ctx.lineTo(-s * 0.35, s * (i * 0.25 + 0.3)); ctx.moveTo(s * 0.05, s * i * 0.25); ctx.lineTo(s * 0.35, s * (i * 0.25 + 0.3)); } ctx.stroke();
      break;
    case 'spider':
      ctx.strokeStyle = '#1f2937'; ctx.lineWidth = s * 0.09;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = -0.9 + i * 0.6, L = s * 0.95;
        ctx.moveTo(-s * 0.2, 0); ctx.lineTo(-s * 0.2 - L * Math.cos(a) * 0.6, L * Math.sin(a) * 0.6 - s * 0.15); ctx.lineTo(-s * 0.2 - L * Math.cos(a), L * Math.sin(a) + s * 0.5);
        ctx.moveTo(s * 0.2, 0); ctx.lineTo(s * 0.2 + L * Math.cos(a) * 0.6, L * Math.sin(a) * 0.6 - s * 0.15); ctx.lineTo(s * 0.2 + L * Math.cos(a), L * Math.sin(a) + s * 0.5);
      }
      ctx.stroke();
      ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.ellipse(0, s * 0.2, s * 0.45, s * 0.5, 0, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#4b5563'; ctx.beginPath(); ctx.arc(0, -s * 0.45, s * 0.28, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#f87171'; ctx.beginPath(); ctx.arc(-s * 0.1, -s * 0.52, s * 0.05, 0, 2 * P); ctx.arc(s * 0.1, -s * 0.52, s * 0.05, 0, 2 * P); ctx.fill();
      break;
    case 'earthworm':
      ctx.strokeStyle = '#f9a8d4'; ctx.lineWidth = s * 0.3;
      ctx.beginPath(); ctx.moveTo(-s * 1.0, s * 0.3); ctx.bezierCurveTo(-s * 0.6, -s * 0.6, s * 0.0, s * 0.9, s * 0.5, 0); ctx.bezierCurveTo(s * 0.7, -s * 0.4, s * 1.0, -s * 0.2, s * 1.05, -s * 0.5); ctx.stroke();
      ctx.strokeStyle = '#be185d'; ctx.lineWidth = s * 0.03;
      ctx.beginPath();
      for (let i = 0; i < 9; i++) { const x = -s * 0.85 + i * s * 0.17, y = s * 0.3 - Math.sin((i / 9) * P) * s * 0.3; ctx.moveTo(x, y - s * 0.15); ctx.lineTo(x, y + s * 0.15); }
      ctx.stroke();
      ctx.fillStyle = '#db2777'; ctx.beginPath(); ctx.ellipse(-s * 0.1, s * 0.05, s * 0.18, s * 0.16, 0, 0, 2 * P); ctx.fill();
      break;
    case 'mushroom':
      ctx.fillStyle = '#f5f5f4'; ctx.beginPath(); ctx.roundRect(-s * 0.25, -s * 0.1, s * 0.5, s * 1.0, s * 0.15); ctx.fill();
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.ellipse(0, -s * 0.2, s * 0.95, s * 0.6, 0, P, 2 * P); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-s * 0.4, -s * 0.5, s * 0.1, 0, 2 * P); ctx.arc(s * 0.25, -s * 0.6, s * 0.12, 0, 2 * P); ctx.arc(s * 0.6, -s * 0.3, s * 0.08, 0, 2 * P); ctx.fill();
      break;
    case 'fern':
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = s * 0.08;
      for (let k = -1; k <= 1; k++) {
        ctx.beginPath(); ctx.moveTo(0, s * 0.95); ctx.quadraticCurveTo(k * s * 0.5, 0, k * s * 0.8, -s * 0.8); ctx.stroke();
        for (let i = 1; i <= 6; i++) {
          const t = i / 7, x = (2 * (1 - t) * t * k * s * 0.5 + t * t * k * s * 0.8), y = (1 - t) * (1 - t) * s * 0.95 + t * t * -s * 0.8;
          const len = s * 0.3 * (1 - t * 0.6);
          ctx.beginPath(); ctx.moveTo(x - len, y + len * 0.2); ctx.lineTo(x, y); ctx.lineTo(x + len, y + len * 0.2); ctx.stroke();
        }
      }
      break;
    case 'mango':
      ctx.fillStyle = '#92400e'; ctx.fillRect(-s * 0.12, s * 0.1, s * 0.24, s * 0.85);
      ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(-s * 0.4, -s * 0.1, s * 0.5, 0, 2 * P); ctx.arc(s * 0.4, -s * 0.1, s * 0.5, 0, 2 * P); ctx.arc(0, -s * 0.5, s * 0.55, 0, 2 * P); ctx.fill();
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(-s * 0.45, s * 0.1, s * 0.11, s * 0.15, 0, 0, 2 * P); ctx.ellipse(s * 0.4, -s * 0.05, s * 0.11, s * 0.15, 0, 0, 2 * P); ctx.ellipse(0, -s * 0.35, s * 0.11, s * 0.15, 0, 0, 2 * P); ctx.fill();
      break;
    default: break;
  }
  ctx.restore();
}

function wrapText(ctx, text, maxW) {
  const words = String(text).split(' ');
  const lines = []; let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

export function mount(rootEl) {
  const canvasWrap = document.createElement('div');
  rootEl.appendChild(canvasWrap);
  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);
  const cv = createCanvas(canvasWrap, { aspect: 16 / 9 });

  const L = () => getLocale();
  const name = (id) => ORG(id).name[L()];
  const qText = (key) => Q(key)[L()];

  // ---- state ----------------------------------------------------------------
  const st = {
    mode: 'identify',
    showFacts: false,
    // identify
    mystery: null, node: KEY, path: [], result: null, // result: { id, correct, wrongIndex }
    remaining: ORGANISMS.map((o) => o.id),
    lastIdentify: null,
    // build
    tree: null, selected: null, undo: [], message: '', messageAt: -10,
  };
  let now = 0;

  function pickMystery() {
    let id;
    do { id = ORGANISMS[Math.floor(Math.random() * ORGANISMS.length)].id; } while (id === st.mystery && ORGANISMS.length > 1);
    st.mystery = id; st.node = KEY; st.path = []; st.result = null;
    st.remaining = ORGANISMS.map((o) => o.id);
  }
  // Which organisms are still consistent with the answers so far (for the grey-out).
  function remainingFor(node) {
    const acc = [];
    (function walk(n) { if (typeof n === 'string') acc.push(n); else { walk(n.yes); walk(n.no); } })(node);
    return acc;
  }
  function answer(yes) {
    if (st.mode !== 'identify' || st.result || typeof st.node === 'string') return;
    st.path.push({ q: st.node.q, yes });
    st.node = yes ? st.node.yes : st.node.no;
    st.remaining = remainingFor(st.node);
    if (typeof st.node === 'string') {
      const org = ORG(st.mystery);
      let wrongIndex = -1;
      st.path.forEach((p, i) => { if (wrongIndex < 0 && has(org, p.q) !== p.yes) wrongIndex = i; });
      st.result = { id: st.node, correct: st.node === st.mystery, wrongIndex };
      st.lastIdentify = { organism: ORG(st.mystery).name.en, steps: st.path.length, result: st.result.correct ? 'correct' : 'wrong' };
    }
  }

  // ---- build mode -----------------------------------------------------------
  const leaf = (ids) => ({ ids });
  function resetTree() { st.tree = leaf(ORGANISMS.map((o) => o.id)); st.selected = st.tree; st.undo = []; st.message = ''; }
  const clone = (n) => (n.ids ? { ids: n.ids.slice() } : { q: n.q, yes: clone(n.yes), no: clone(n.no) });
  function leaves(n, acc = []) { if (n.ids) acc.push(n); else { leaves(n.yes, acc); leaves(n.no, acc); } return acc; }
  function depth(n) { return n.ids ? 0 : 1 + Math.max(depth(n.yes), depth(n.no)); }
  function countQ(n) { return n.ids ? 0 : 1 + countQ(n.yes) + countQ(n.no); }
  function splitSelected(key) {
    const sel = st.selected;
    if (!sel || !sel.ids || sel.ids.length < 2) { say(T('Click a group with 2 or more organisms first.', 'Klik dulu kelompok yang berisi 2 makhluk atau lebih.')); return; }
    const yes = sel.ids.filter((id) => has(ORG(id), key)), no = sel.ids.filter((id) => !has(ORG(id), key));
    if (!yes.length || !no.length) { say(T('That question does not separate this group. Try another.', 'Pertanyaan itu tidak memisahkan kelompok ini. Coba yang lain.')); return; }
    st.undo.push(clone(st.tree));
    sel.q = key; sel.yes = leaf(yes); sel.no = leaf(no); delete sel.ids;
    // Select the next unfinished group automatically.
    st.selected = leaves(st.tree).find((l) => l.ids.length > 1) || null;
    if (!st.selected) say(T('Key complete! Every organism has its own branch.', 'Kunci selesai! Setiap makhluk punya cabangnya sendiri.'));
    else say(`${T('Split', 'Terbagi')}: ${yes.length} ${T('yes', 'ya')} / ${no.length} ${T('no', 'tidak')}`);
  }
  function say(m) { st.message = m; st.messageAt = now; }
  function undo() {
    if (!st.undo.length) return;
    st.tree = st.undo.pop();
    st.selected = leaves(st.tree).find((l) => l.ids.length > 1) || null;
    st.message = '';
  }
  // Tree layout: each leaf gets an equal column; internal nodes sit above the middle of their leaves.
  function layout() {
    const W = cv.width, H = cv.height;
    const lv = leaves(st.tree), n = lv.length, d = Math.max(1, depth(st.tree));
    const x0 = W * 0.03, x1 = W * 0.97, colW = (x1 - x0) / n;
    const y0 = H * 0.09, y1 = H * 0.80;
    let col = 0;
    const nodes = [];
    (function place(node, lvl) {
      if (node.ids) { node._x = x0 + colW * (col + 0.5); node._y = y1; node._w = colW; col++; }
      else { place(node.yes, lvl + 1); place(node.no, lvl + 1); node._x = (node.yes._x + node.no._x) / 2; node._y = y0 + (y1 - y0) * (lvl / d); }
      nodes.push(node);
    })(st.tree, 0);
    return nodes;
  }
  function keyText() {
    // Numbered key as text: "1. question — yes: 2, no: Frog".
    const lines = []; let n = 0;
    const number = (node) => { if (!node.ids) { node._n = ++n; number(node.yes); number(node.no); } };
    number(st.tree);
    const ref = (node) => (node.ids ? (node.ids.length === 1 ? name(node.ids[0]) : `{${node.ids.map(name).join(', ')}}`) : `→ ${node._n}`);
    (function emit(node) {
      if (node.ids) return;
      lines.push(`${node._n}. ${qText(node.q)}  ${T('yes', 'ya')}: ${ref(node.yes)}   ${T('no', 'tidak')}: ${ref(node.no)}`);
      emit(node.yes); emit(node.no);
    })(st.tree);
    return lines;
  }

  // ---- drawing --------------------------------------------------------------
  function drawIdentify(ctx, W, H) {
    const fs = Math.max(10, W * 0.018);
    const sysFont = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
    // Left: mystery
    ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(W * 0.02, H * 0.04, W * 0.40, H * 0.64, 12); ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = sysFont(fs, true); ctx.textAlign = 'center';
    ctx.fillText(T('Mystery organism', 'Makhluk misterius'), W * 0.22, H * 0.11);
    drawOrganism(ctx, st.mystery, W * 0.22, H * 0.36, Math.min(W * 0.12, H * 0.2));
    if (st.showFacts) {
      ctx.font = sysFont(fs * 0.85); ctx.textAlign = 'left'; ctx.fillStyle = '#cbd5e1';
      const facts = ORG(st.mystery).traits.map((k) => qText(k).replace(/\?$/, '')).slice(0, 5);
      let y = H * 0.55;
      for (const f of facts) { ctx.fillStyle = '#4ade80'; ctx.fillText('✓', W * 0.04, y); ctx.fillStyle = '#cbd5e1'; ctx.fillText(f, W * 0.07, y); y += fs * 1.15; }
    }
    // Right: candidates grid 4 x 3
    ctx.fillStyle = '#111a2e'; ctx.beginPath(); ctx.roundRect(W * 0.44, H * 0.04, W * 0.54, H * 0.64, 12); ctx.fill();
    ctx.font = sysFont(fs, true); ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${T('Candidates left', 'Kandidat tersisa')}: ${st.remaining.length} / 12`, W * 0.46, H * 0.11);
    ctx.textAlign = 'right'; ctx.fillText(`${T('Steps', 'Langkah')}: ${st.path.length}`, W * 0.96, H * 0.11);
    const gx = W * 0.46, gy = H * 0.15, cw = (W * 0.50) / 4, ch = (H * 0.50) / 3;
    const ico = Math.min(cw, ch) * 0.26;
    ctx.font = sysFont(fs * 0.8); ctx.textAlign = 'center';
    ORGANISMS.forEach((o, i) => {
      const cx = gx + cw * ((i % 4) + 0.5), cy = gy + ch * (Math.floor(i / 4) + 0.5);
      const alive = st.remaining.includes(o.id);
      if (st.result && o.id === st.result.id) {
        ctx.fillStyle = st.result.correct ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)';
        ctx.beginPath(); ctx.roundRect(cx - cw * 0.46, cy - ch * 0.46, cw * 0.92, ch * 0.92, 8); ctx.fill();
      }
      drawOrganism(ctx, o.id, cx, cy - ch * 0.1, ico, alive ? 1 : 0.18);
      ctx.fillStyle = alive ? '#e2e8f0' : '#475569';
      ctx.fillText(o.name[L()], cx, cy + ch * 0.38);
      if (!alive) { ctx.strokeStyle = 'rgba(239,68,68,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - ico, cy - ch * 0.1 - ico); ctx.lineTo(cx + ico, cy - ch * 0.1 + ico); ctx.moveTo(cx + ico, cy - ch * 0.1 - ico); ctx.lineTo(cx - ico, cy - ch * 0.1 + ico); ctx.stroke(); }
    });
    // Bottom: question or result
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(W * 0.02, H * 0.72, W * 0.96, H * 0.25, 12); ctx.fill();
    ctx.textAlign = 'left';
    if (!st.result) {
      ctx.fillStyle = '#fbbf24'; ctx.font = sysFont(fs * 0.9, true);
      ctx.fillText(`${T('Question', 'Pertanyaan')} ${st.path.length + 1}`, W * 0.04, H * 0.79);
      ctx.fillStyle = '#f8fafc'; ctx.font = sysFont(fs * 1.25, true);
      const lines = wrapText(ctx, qText(st.node.q), W * 0.9);
      lines.forEach((ln, i) => ctx.fillText(ln, W * 0.04, H * 0.86 + i * fs * 1.5));
      ctx.fillStyle = '#94a3b8'; ctx.font = sysFont(fs * 0.8);
      ctx.fillText(T('Answer with the Yes / No buttons below.', 'Jawab dengan tombol Ya / Tidak di bawah.'), W * 0.04, H * 0.955);
    } else {
      const r = st.result;
      ctx.fillStyle = r.correct ? '#4ade80' : '#f87171'; ctx.font = sysFont(fs * 1.25, true);
      const head = r.correct
        ? `${T('Correct! It is the', 'Benar! Ini adalah')} ${name(r.id)} (${ORG(r.id).group[L()]}) — ${st.path.length} ${T('steps', 'langkah')}.`
        : `${T('The key says', 'Kunci berkata')}: ${name(r.id)}. ${T('Not quite!', 'Belum tepat!')}`;
      wrapText(ctx, head, W * 0.9).forEach((ln, i) => ctx.fillText(ln, W * 0.04, H * 0.80 + i * fs * 1.5));
      ctx.fillStyle = '#cbd5e1'; ctx.font = sysFont(fs * 0.9);
      const tail = r.correct
        ? T('Record it in the lab, then press New mystery.', 'Catat di lab, lalu tekan Misteri baru.')
        : `${T('Look again at question', 'Lihat lagi pertanyaan')} ${r.wrongIndex + 1}: "${qText(st.path[r.wrongIndex].q)}" — ${T('press Try again.', 'tekan Coba lagi.')}`;
      wrapText(ctx, tail, W * 0.9).forEach((ln, i) => ctx.fillText(ln, W * 0.04, H * 0.91 + i * fs * 1.2));
    }
  }

  function drawBuild(ctx, W, H) {
    const fs = Math.max(10, W * 0.017);
    const sysFont = (px, bold = false) => `${bold ? 'bold ' : ''}${Math.round(px)}px system-ui, -apple-system, Roboto, sans-serif`;
    const nodes = layout();
    const lv = nodes.filter((n) => n.ids);
    // edges
    ctx.lineWidth = Math.max(1.5, W * 0.003);
    for (const n of nodes) {
      if (n.ids) continue;
      for (const [child, yes] of [[n.yes, true], [n.no, false]]) {
        ctx.strokeStyle = yes ? '#4ade80' : '#f87171';
        ctx.beginPath(); ctx.moveTo(n._x, n._y); ctx.lineTo(child._x, child._y - (child.ids ? Math.min(child._w, H * 0.08) * 0.6 : 0)); ctx.stroke();
        ctx.fillStyle = yes ? '#4ade80' : '#f87171'; ctx.font = sysFont(fs * 0.8, true); ctx.textAlign = 'center';
        ctx.fillText(yes ? T('yes', 'ya') : T('no', 'tidak'), (n._x + child._x) / 2 + (yes ? -1 : 1) * fs * 0.9, (n._y + child._y) / 2);
      }
    }
    // question nodes
    let qi = 0;
    (function num(n) { if (!n.ids) { n._n = ++qi; num(n.yes); num(n.no); } })(st.tree);
    for (const n of nodes) {
      if (n.ids) continue;
      const r = fs * 1.1;
      ctx.fillStyle = '#3b82f6'; ctx.beginPath(); ctx.arc(n._x, n._y, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = sysFont(fs, true); ctx.textAlign = 'center'; ctx.fillText(String(n._n), n._x, n._y + fs * 0.35);
    }
    // leaves: a cluster of icons, highlighted when selected
    for (const n of lv) {
      const k = n.ids.length;
      const cols = k > 6 ? 4 : k > 2 ? Math.min(3, k) : k;
      const rows = Math.ceil(k / cols);
      const cell = Math.min(n._w / cols, (H * 0.17) / rows);
      const ico = cell * 0.32;
      const bw = cell * cols + 6, bh = cell * rows + 6;
      const bx = n._x - bw / 2, by = n._y - cell * 0.35;
      ctx.fillStyle = n === st.selected ? 'rgba(251,191,36,0.18)' : k === 1 ? 'rgba(34,197,94,0.12)' : 'rgba(148,163,184,0.10)';
      ctx.strokeStyle = n === st.selected ? '#fbbf24' : k === 1 ? '#22c55e' : '#475569'; ctx.lineWidth = n === st.selected ? 3 : 1.5;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 6); ctx.fill(); ctx.stroke();
      n.ids.forEach((id, i) => {
        const cx = bx + 3 + cell * ((i % cols) + 0.5), cy = by + 3 + cell * (Math.floor(i / cols) + 0.5);
        drawOrganism(ctx, id, cx, cy, ico);
      });
      n._hit = { x: bx, y: by, w: bw, h: bh };
      if (k === 1) { ctx.fillStyle = '#86efac'; ctx.font = sysFont(Math.min(fs * 0.8, n._w * 0.16)); ctx.textAlign = 'center'; ctx.fillText(name(n.ids[0]), n._x, by + bh + fs); }
      else { ctx.fillStyle = '#e2e8f0'; ctx.font = sysFont(fs * 0.8, true); ctx.textAlign = 'center'; ctx.fillText(String(k), n._x, by + bh + fs); }
    }
    // header
    ctx.textAlign = 'left'; ctx.fillStyle = '#94a3b8'; ctx.font = sysFont(fs, true);
    const done = lv.every((l) => l.ids.length === 1);
    ctx.fillText(`${T('Questions used', 'Pertanyaan dipakai')}: ${countQ(st.tree)}   ${T('Longest path', 'Jalur terpanjang')}: ${depth(st.tree)}   ${done ? T('Complete', 'Selesai') : T('Groups left to split', 'Kelompok belum terpisah') + ': ' + lv.filter((l) => l.ids.length > 1).length}`, W * 0.03, H * 0.05);
    if (st.selected) {
      ctx.fillStyle = '#fbbf24'; ctx.font = sysFont(fs * 0.9);
      ctx.textAlign = 'right';
      ctx.fillText(T('Selected group: choose a question below, then press Split', 'Kelompok terpilih: pilih pertanyaan di bawah, lalu tekan Bagi'), W * 0.97, H * 0.96);
    } else if (!done) {
      ctx.fillStyle = '#fbbf24'; ctx.font = sysFont(fs * 0.9); ctx.textAlign = 'right';
      ctx.fillText(T('Click a group to select it', 'Klik sebuah kelompok untuk memilihnya'), W * 0.97, H * 0.96);
    }
    if (st.message && now - st.messageAt < 4) {
      ctx.textAlign = 'left'; ctx.fillStyle = st.message.startsWith(T('Split', 'Terbagi')) || done ? '#4ade80' : '#fca5a5'; ctx.font = sysFont(fs, true);
      ctx.fillText(st.message, W * 0.03, H * 0.96);
    }
  }

  function draw() {
    const ctx = cv.ctx, W = cv.width, H = cv.height;
    if (W < 10 || H < 10) return;
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
    if (st.mode === 'identify') drawIdentify(ctx, W, H); else drawBuild(ctx, W, H);
    ctx.textAlign = 'left';
  }

  // ---- pointer: click a leaf group in Build mode ----------------------------
  const drag = dragHandle(cv.canvas, {
    hitTest(x, y) {
      if (st.mode !== 'identify' && st.tree) {
        const lv = leaves(st.tree);
        for (let i = 0; i < lv.length; i++) {
          const h = lv[i]._hit;
          if (h && lv[i].ids.length > 1 && x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return i;
        }
      }
      return null;
    },
    onStart(i) { const lv = leaves(st.tree); if (lv[i]) { st.selected = lv[i]; st.message = ''; } },
    handles: () => {
      if (st.mode === 'identify' || !st.tree) return [];
      const lv = leaves(st.tree);
      return lv.map((l, i) => (l.ids.length > 1 && l._hit ? { id: i, x: l._x, y: l._y, label: `Group of ${l.ids.length}: ${l.ids.map((id) => ORG(id).name.en).join(', ')} (arrow key selects it)` } : null)).filter(Boolean);
    },
    cursor: 'default',
    hoverCursor: 'pointer',
  });

  // ---- controls -------------------------------------------------------------
  const big = (b) => { b.el.style.minHeight = '44px'; b.el.style.fontSize = '1rem'; b.el.style.padding = '10px 18px'; return b; };
  const modeSel = select({
    label: 'Mode', key: 'mode', value: 'identify',
    options: [{ value: 'identify', label: 'Identify a mystery organism' }, { value: 'build', label: 'Build your own key' }],
    onChange: (v) => { st.mode = v; if (v === 'build' && !st.tree) resetTree(); refreshVisibility(); },
  });
  const yesB = big(button({ label: 'Yes / Ya', primary: true, onClick: () => answer(true) }));
  const noB = big(button({ label: 'No / Tidak', onClick: () => answer(false) }));
  const newB = big(button({ label: 'New mystery', onClick: () => pickMystery() }));
  const retryB = big(button({ label: 'Try again (same organism)', onClick: () => { st.node = KEY; st.path = []; st.result = null; st.remaining = ORGANISMS.map((o) => o.id); } }));
  const factsT = toggle({ label: 'Show fact card', key: 'facts', value: false, onChange: (v) => { st.showFacts = v; } });
  const identifyRow1 = row(yesB, noB);
  const identifyRow2 = row(newB, retryB, factsT);

  const qSel = select({
    label: 'Question to ask the selected group', key: 'q', value: 'backbone',
    options: QUESTIONS.map((qq) => ({ value: qq.key, label: qq.en })),
    onChange: () => {},
  });
  const splitB = big(button({ label: 'Split group', primary: true, onClick: () => splitSelected(qSel.value) }));
  const undoB = big(button({ label: 'Undo', onClick: undo }));
  const resetB = big(button({ label: 'Start over', onClick: resetTree }));
  const buildRow1 = row(splitB, undoB, resetB);
  const keyOut = document.createElement('pre');
  keyOut.style.cssText = 'white-space:pre-wrap;font:0.85rem system-ui,sans-serif;opacity:.85;margin:6px 0 0;line-height:1.4';

  ctrlPanel.append(modeSel.el, identifyRow1, identifyRow2, qSel.el, buildRow1, keyOut);

  function refreshVisibility() {
    const ident = st.mode === 'identify';
    identifyRow1.style.display = ident ? '' : 'none';
    identifyRow2.style.display = ident ? '' : 'none';
    qSel.el.style.display = ident ? 'none' : '';
    buildRow1.style.display = ident ? 'none' : '';
    keyOut.style.display = ident ? 'none' : '';
  }
  refreshVisibility();

  const lab = labPanel({
    title: 'Identification log',
    filename: 'dichotomous-key-data.csv',
    columns: [
      { key: 'mode', label: 'Mode' },
      { key: 'organism', label: 'Organism / group' },
      { key: 'steps', label: 'Steps (or questions used)' },
      { key: 'result', label: 'Result' },
    ],
    procedure: [
      'Identify mode: press New mystery, answer the questions, and Record the organism and the number of steps.',
      'Repeat for at least five different organisms. Which took the most steps? Which the fewest?',
      'Build mode: build a complete key starting with "Does it have a backbone?". Record the number of questions and the longest path.',
      'Build a second key starting with a different question. Which key is shorter?',
    ],
    predict: 'How many yes/no questions do you think are needed to pick one organism out of twelve?',
    source: () => {
      if (st.mode === 'identify') {
        if (!st.result) return null;
        return { mode: 'identify', organism: ORG(st.mystery).name.en, steps: st.path.length, result: st.result.correct ? 'correct' : `wrong (key said ${ORG(st.result.id).name.en})` };
      }
      if (!st.tree || st.tree.ids) return null;
      const complete = leaves(st.tree).every((l) => l.ids.length === 1);
      return { mode: 'build', organism: 'all 12', steps: `${countQ(st.tree)} questions, longest path ${depth(st.tree)}`, result: complete ? 'complete key' : 'incomplete' };
    },
  });
  ctrlPanel.appendChild(lab.el);

  pickMystery();
  let lastKeyText = '';
  const animator = loop((dt, t) => {
    now = t;
    draw();
    if (st.mode !== 'identify' && st.tree) {
      const txt = keyText().join('\n') || T('No questions yet.', 'Belum ada pertanyaan.');
      if (txt !== lastKeyText) { keyOut.textContent = txt; lastKeyText = txt; }
    }
  });
  animator.start();
  return () => { animator.stop(); drag.destroy(); cv.destroy(); };
}
