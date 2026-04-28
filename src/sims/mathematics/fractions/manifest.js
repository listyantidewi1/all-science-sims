export default {
  id: 'fractions',
  subject: 'mathematics',
  title: { en: 'Fractions Visualizer', id: 'Visualisator Pecahan' },
  description: {
    en: 'Three ways to see a fraction at once: a pie, a bar, and a number-line position. Drag the numerator and denominator and watch all three views update together. Add or compare two fractions with a common-denominator highlight, and convert to mixed numbers and decimals.',
    id: 'Tiga cara melihat pecahan sekaligus: pai, batang, dan posisi pada garis bilangan. Geser pembilang dan penyebut dan amati ketiga tampilan terbarui bersama. Tambah atau bandingkan dua pecahan dengan sorotan penyebut sama, dan ubah ke bilangan campuran dan desimal.',
  },
  objectives: {
    en: [
      'Connect a/b to "a parts out of b equal pieces".',
      'Find common denominators when adding or comparing fractions.',
      'Convert improper fractions to mixed numbers (and back).',
    ],
    id: [
      'Menghubungkan a/b dengan "a bagian dari b potongan sama".',
      'Mencari penyebut sama saat menambah atau membandingkan pecahan.',
      'Mengonversi pecahan tak biasa ke bilangan campuran (dan sebaliknya).',
    ],
  },
  tryThis: {
    en: [
      '1/2 + 1/3 — common denominator 6 → 3/6 + 2/6 = 5/6.',
      '7/4 — improper; equals 1¾.',
      'Compare 5/8 vs 3/5 — common denom 40, so 25/40 vs 24/40.',
    ],
    id: [
      '1/2 + 1/3 — penyebut sama 6 → 3/6 + 2/6 = 5/6.',
      '7/4 — tak biasa; setara dengan 1¾.',
      'Bandingkan 5/8 vs 3/5 — penyebut sama 40, jadi 25/40 vs 24/40.',
    ],
  },
  topics: ['arithmetic'],
  load: () => import('./sim.js'),
};
