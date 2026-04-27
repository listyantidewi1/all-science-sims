import { select } from '../../../lib/controls.js';

// Each organelle: id, label EN/ID, description EN/ID, SVG path or shape, only-in (animal | plant | both)
const ORGANELLES = [
  { id: 'membrane', label: { en: 'Cell membrane', id: 'Membran sel' },
    desc: { en: 'Selective barrier controlling what enters and leaves the cell.',
            id: 'Pembatas selektif yang mengatur zat masuk-keluar sel.' },
    where: 'both' },
  { id: 'wall', label: { en: 'Cell wall', id: 'Dinding sel' },
    desc: { en: 'Rigid cellulose wall that gives plant cells their shape.',
            id: 'Dinding selulosa kaku yang memberi bentuk pada sel tumbuhan.' },
    where: 'plant' },
  { id: 'nucleus', label: { en: 'Nucleus', id: 'Nukleus' },
    desc: { en: 'Stores DNA and directs protein synthesis.',
            id: 'Menyimpan DNA dan mengarahkan sintesis protein.' },
    where: 'both' },
  { id: 'mito', label: { en: 'Mitochondria', id: 'Mitokondria' },
    desc: { en: 'Site of cellular respiration — turns glucose into ATP.',
            id: 'Tempat respirasi sel — mengubah glukosa menjadi ATP.' },
    where: 'both' },
  { id: 'chloro', label: { en: 'Chloroplast', id: 'Kloroplas' },
    desc: { en: 'Captures sunlight to make sugar via photosynthesis.',
            id: 'Menangkap cahaya matahari untuk membuat gula lewat fotosintesis.' },
    where: 'plant' },
  { id: 'er', label: { en: 'Endoplasmic reticulum', id: 'Retikulum endoplasma' },
    desc: { en: 'Network for synthesizing proteins (rough) and lipids (smooth).',
            id: 'Jaringan untuk sintesis protein (kasar) dan lipid (halus).' },
    where: 'both' },
  { id: 'golgi', label: { en: 'Golgi apparatus', id: 'Aparatus Golgi' },
    desc: { en: 'Modifies, packages, and ships proteins and lipids.',
            id: 'Memodifikasi, mengemas, dan mengirim protein serta lipid.' },
    where: 'both' },
  { id: 'ribo', label: { en: 'Ribosomes', id: 'Ribosom' },
    desc: { en: 'Read mRNA and assemble proteins.',
            id: 'Membaca mRNA dan merakit protein.' },
    where: 'both' },
  { id: 'vac-large', label: { en: 'Central vacuole', id: 'Vakuola pusat' },
    desc: { en: 'Large fluid-filled sac that maintains plant cell turgor.',
            id: 'Kantong besar berisi cairan yang menjaga turgor sel tumbuhan.' },
    where: 'plant' },
  { id: 'vac-small', label: { en: 'Vacuoles', id: 'Vakuola' },
    desc: { en: 'Small storage vesicles for water, ions, and waste.',
            id: 'Vesikel kecil untuk menyimpan air, ion, dan limbah.' },
    where: 'animal' },
  { id: 'lyso', label: { en: 'Lysosome', id: 'Lisosom' },
    desc: { en: 'Digests waste and worn-out parts inside the cell.',
            id: 'Mencerna limbah dan bagian sel yang sudah usang.' },
    where: 'animal' },
];

export function mount(rootEl) {
  const stage = document.createElement('div');
  stage.style.padding = 'var(--space-3)';
  stage.style.display = 'grid';
  stage.style.gridTemplateColumns = '1fr 280px';
  stage.style.gap = 'var(--space-4)';
  stage.style.minHeight = '420px';
  rootEl.appendChild(stage);

  const ctrlPanel = document.createElement('div');
  ctrlPanel.className = 'sim-controls';
  rootEl.appendChild(ctrlPanel);

  const svgWrap = document.createElement('div');
  svgWrap.style.position = 'relative';
  stage.appendChild(svgWrap);

  const detail = document.createElement('div');
  detail.style.cssText = 'background:var(--color-surface-2);border:1px solid var(--color-border);border-radius:var(--radius-2);padding:var(--space-3);min-height:100px;align-self:start';
  stage.appendChild(detail);

  const state = { cell: 'animal', selected: null };

  function locale() {
    return document.documentElement.lang === 'id' ? 'id' : 'en';
  }

  function showDetail(id) {
    const o = ORGANELLES.find((x) => x.id === id);
    const lang = locale();
    if (!o) {
      detail.innerHTML = `<p style="color:var(--color-muted);font-size:var(--type-sm)">Click an organelle to learn about it.</p>`;
      return;
    }
    detail.innerHTML = `
      <h3 style="margin:0 0 6px;font-size:var(--type-md)">${o.label[lang]}</h3>
      <p style="margin:0;color:var(--color-muted);font-size:var(--type-sm)">${o.desc[lang]}</p>
    `;
  }

  function render() {
    svgWrap.innerHTML = '';
    const isPlant = state.cell === 'plant';
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 600 400');
    svg.setAttribute('width', '100%');
    svg.style.aspectRatio = '3/2';
    svg.style.background = 'var(--color-surface-2)';
    svg.style.borderRadius = '12px';

    // Outer membrane / wall
    if (isPlant) {
      const wall = mk('rect', { x: 20, y: 20, width: 560, height: 360, rx: 18,
        fill: '#a3e09e', stroke: '#3a7d3a', 'stroke-width': 6,
        'data-id': 'wall' });
      svg.appendChild(wall);
      const membrane = mk('rect', { x: 32, y: 32, width: 536, height: 336, rx: 14,
        fill: 'rgba(20,184,166,0.18)', stroke: '#0e9488', 'stroke-width': 2,
        'data-id': 'membrane' });
      svg.appendChild(membrane);
      // Central vacuole
      svg.appendChild(mk('rect', { x: 220, y: 80, width: 240, height: 220, rx: 16,
        fill: 'rgba(59,130,246,0.18)', stroke: '#3b82f6', 'stroke-width': 2,
        'data-id': 'vac-large' }));
    } else {
      const membrane = mk('ellipse', { cx: 300, cy: 200, rx: 270, ry: 170,
        fill: 'rgba(20,184,166,0.18)', stroke: '#0e9488', 'stroke-width': 4,
        'data-id': 'membrane' });
      svg.appendChild(membrane);
    }

    // Nucleus
    svg.appendChild(mk('circle', { cx: 300, cy: 200, r: 50,
      fill: '#a78bfa', stroke: '#7c3aed', 'stroke-width': 2,
      'data-id': 'nucleus' }));
    svg.appendChild(mk('circle', { cx: 305, cy: 195, r: 12, fill: '#5b21b6', 'pointer-events': 'none' }));

    // Mitochondria (2)
    for (const [cx, cy] of [[150, 120], [430, 280]]) {
      svg.appendChild(mk('ellipse', { cx, cy, rx: 28, ry: 14,
        fill: '#fb7185', stroke: '#be123c', 'stroke-width': 2,
        'data-id': 'mito' }));
    }

    // Chloroplasts (plant only) — 4 ellipses
    if (isPlant) {
      for (const [cx, cy] of [[120, 300], [480, 100], [380, 90], [180, 320]]) {
        svg.appendChild(mk('ellipse', { cx, cy, rx: 22, ry: 12,
          fill: '#34d399', stroke: '#047857', 'stroke-width': 2,
          'data-id': 'chloro' }));
      }
    }

    // ER (rough): wavy rectangle near nucleus
    svg.appendChild(mk('path', {
      d: 'M 360 150 q 30 -20 60 0 q 30 -20 60 0 q 30 -20 60 0',
      fill: 'none', stroke: '#f59e0b', 'stroke-width': 14, 'stroke-linecap': 'round',
      'data-id': 'er',
    }));

    // Golgi
    svg.appendChild(mk('path', {
      d: 'M 110 240 q 20 -8 40 0 M 105 255 q 25 -10 50 0 M 100 270 q 30 -12 60 0',
      fill: 'none', stroke: '#fb923c', 'stroke-width': 4, 'stroke-linecap': 'round',
      'data-id': 'golgi',
    }));

    // Ribosomes — small dots
    for (let i = 0; i < 18; i++) {
      const x = 60 + Math.random() * 480;
      const y = 60 + Math.random() * 280;
      svg.appendChild(mk('circle', { cx: x, cy: y, r: 3, fill: '#3b82f6', 'data-id': 'ribo' }));
    }

    // Lysosomes (animal) / small vacuoles (animal)
    if (!isPlant) {
      for (const [cx, cy] of [[200, 320], [450, 130]]) {
        svg.appendChild(mk('circle', { cx, cy, r: 14, fill: '#ec4899',
          stroke: '#9d174d', 'stroke-width': 1.5, 'data-id': 'lyso' }));
      }
      for (const [cx, cy] of [[470, 240], [120, 170]]) {
        svg.appendChild(mk('circle', { cx, cy, r: 16, fill: '#bae6fd',
          stroke: '#0369a1', 'stroke-width': 1.5, 'data-id': 'vac-small' }));
      }
    }

    // Add hover effect via pointer-over
    svg.querySelectorAll('[data-id]').forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('mouseenter', () => { el.style.filter = 'brightness(1.15)'; });
      el.addEventListener('mouseleave', () => { el.style.filter = ''; });
      el.addEventListener('click', () => { state.selected = el.getAttribute('data-id'); showDetail(state.selected); });
    });

    svgWrap.appendChild(svg);
  }

  function mk(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    return el;
  }

  const sel = select({
    label: 'Cell type',
    options: [
      { value: 'animal', label: 'Animal cell' },
      { value: 'plant',  label: 'Plant cell' },
    ],
    value: state.cell,
    onChange: (v) => { state.cell = v; render(); showDetail(state.selected); },
  });
  ctrlPanel.appendChild(sel.el);

  render();
  showDetail(null);

  return () => {};
}
