export default {
  id: 'titration',
  subject: 'chemistry',
  title: { en: 'Acid-Base Titration', id: 'Titrasi Asam-Basa' },
  description: {
    en: 'Drip a strong base into a strong or weak acid and watch the pH curve trace out as the equivalence point sweeps past. Pick an indicator and see when its color flips.',
    id: 'Teteskan basa kuat ke asam kuat atau lemah lalu amati kurva pH terbentuk saat melewati titik ekuivalen. Pilih indikator dan lihat kapan warnanya berubah.',
  },
  details: () => import('./details.js'),
  topics: ['acids', 'bases', 'titration'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
