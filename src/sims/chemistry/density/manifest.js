export default {
  id: 'density',
  subject: 'chemistry',
  title: { en: 'Density Lab', id: 'Lab Massa Jenis' },
  description: {
    en: 'Drag blocks of wood, ice, plastic, aluminium, iron, gold, cork and a mystery material onto a balance to read their mass, then into a measuring cylinder to find their volume from the water that rises. The sim works out density = mass ÷ volume, and a column of oil, water and honey shows where each block settles.',
    id: 'Seret balok kayu, es, plastik, aluminium, besi, emas, gabus dan bahan misteri ke timbangan untuk membaca massanya, lalu ke gelas ukur untuk mencari volumenya dari kenaikan air. Simulasi menghitung massa jenis = massa ÷ volume, dan kolom minyak, air dan madu menunjukkan di mana setiap balok berhenti.',
  },
  topics: ['density', 'matter', 'measurement'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
