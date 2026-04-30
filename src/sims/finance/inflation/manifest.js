export default {
  id: 'inflation',
  subject: 'finance',
  title: { en: 'Inflation Eraser', id: 'Penghapus Inflasi' },
  description: {
    en: 'How much will $1 today be worth in 30 years at 3% inflation? Plug in your own rate and time horizon — and see real returns evaporate when nominal rates barely beat inflation.',
    id: 'Berapa nilai Rp1 hari ini setelah 30 tahun dengan inflasi 3%? Masukkan tingkat dan horizon Anda — lalu lihat return riil menguap saat suku nominal hampir tidak melampaui inflasi.',
  },
  objectives: {
    en: [
      'Apply real value = nominal / (1 + π)ⁿ.',
      'Compute real return = (1 + r) / (1 + π) − 1.',
      'See decades of low inflation halve purchasing power.',
    ],
    id: [
      'Menerapkan nilai riil = nominal / (1 + π)ⁿ.',
      'Menghitung return riil = (1 + r) / (1 + π) − 1.',
      'Melihat puluhan tahun inflasi rendah menyetengahkan daya beli.',
    ],
  },
  tryThis: {
    en: [
      '3% for 24 years — does $1 become $0.50?',
      'Hyperinflation 100%/year — what happens in a decade?',
      'Find the nominal rate needed to keep real value flat at 7% inflation.',
    ],
    id: [
      '3% selama 24 tahun — apakah Rp1 jadi Rp0,50?',
      'Hiperinflasi 100%/tahun — apa yang terjadi dalam satu dekade?',
      'Cari suku nominal agar nilai riil tetap pada inflasi 7%.',
    ],
  },
  topics: ['inflation', 'real-return'],
  hasLab: true,
  load: () => import('./sim.js'),
};
