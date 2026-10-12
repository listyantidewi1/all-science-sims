export default {
  id: 'microscope',
  subject: 'biology',
  title: { en: 'Microscope Simulator', id: 'Simulator Mikroskop' },
  description: {
    en: 'A virtual compound microscope. Choose a slide, click an objective lens to switch magnification, and turn the focus knob until the image is sharp. Six slides are included — onion epidermis, plant stem, blood smear, paramecium, cheek cells, pond water — each at characteristic magnifications.',
    id: 'Mikroskop majemuk virtual. Pilih slide, klik lensa objektif untuk mengganti perbesaran, dan putar kenop fokus hingga gambar tajam. Enam slide tersedia — epidermis bawang, batang tumbuhan, apusan darah, paramaesium, sel pipi, air kolam — masing-masing dengan perbesaran khas.',
  },
  details: () => import('./details.js'),
  topics: ['cell-biology', 'lab-skills'],
  grade: [5, 6, 7, 8, 9],
  load: () => import('./sim.js'),
};
