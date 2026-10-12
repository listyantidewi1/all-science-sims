export default {
  id: 'inflation',
  subject: 'finance',
  title: { en: 'Inflation Eraser', id: 'Penghapus Inflasi' },
  description: {
    en: 'How much will $1 today be worth in 30 years at 3% inflation? Plug in your own rate and time horizon — and see real returns evaporate when nominal rates barely beat inflation.',
    id: 'Berapa nilai Rp1 hari ini setelah 30 tahun dengan inflasi 3%? Masukkan tingkat dan horizon Anda — lalu lihat return riil menguap saat suku nominal hampir tidak melampaui inflasi.',
  },
  details: () => import('./details.js'),
  topics: ['inflation', 'real-return'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
