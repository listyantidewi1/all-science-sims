export default {
  id: 'fractions',
  subject: 'mathematics',
  title: { en: 'Fractions Visualizer', id: 'Visualisator Pecahan' },
  description: {
    en: 'Three ways to see a fraction at once: a pie, a bar, and a number-line position. Drag the numerator and denominator and watch all three views update together. Add or compare two fractions with a common-denominator highlight, and convert to mixed numbers and decimals.',
    id: 'Tiga cara melihat pecahan sekaligus: pai, batang, dan posisi pada garis bilangan. Geser pembilang dan penyebut dan amati ketiga tampilan terbarui bersama. Tambah atau bandingkan dua pecahan dengan sorotan penyebut sama, dan ubah ke bilangan campuran dan desimal.',
  },
  details: () => import('./details.js'),
  topics: ['arithmetic'],
  grade: [3, 4, 5, 6],
  load: () => import('./sim.js'),
};
