export default {
  id: 'microscope',
  subject: 'biology',
  title: { en: 'Microscope Simulator', id: 'Simulator Mikroskop' },
  description: {
    en: 'A virtual compound microscope. Choose a slide, click an objective lens to switch magnification, and turn the focus knob until the image is sharp. Six slides are included — onion epidermis, plant stem, blood smear, paramecium, cheek cells, pond water — each at characteristic magnifications.',
    id: 'Mikroskop majemuk virtual. Pilih slide, klik lensa objektif untuk mengganti perbesaran, dan putar kenop fokus hingga gambar tajam. Enam slide tersedia — epidermis bawang, batang tumbuhan, apusan darah, paramaesium, sel pipi, air kolam — masing-masing dengan perbesaran khas.',
  },
  objectives: {
    en: [
      'Total magnification = ocular × objective.',
      'Focus by adjusting the distance between specimen and objective.',
      'Higher magnification → narrower field of view, less depth of field.',
    ],
    id: [
      'Perbesaran total = okuler × objektif.',
      'Fokus dengan mengatur jarak antara spesimen dan objektif.',
      'Perbesaran lebih tinggi → bidang pandang lebih sempit, kedalaman lebih dangkal.',
    ],
  },
  tryThis: {
    en: [
      '4× scanning — find your specimen first.',
      '40× high power — count individual cells.',
      'Defocus — see how blur scales with magnification.',
    ],
    id: [
      '4× pemindaian — cari spesimen Anda dulu.',
      '40× perbesaran tinggi — hitung sel individu.',
      'Tidak fokus — lihat bagaimana kabur berskala dengan perbesaran.',
    ],
  },
  topics: ['cell-biology', 'lab-skills'],
  load: () => import('./sim.js'),
};
