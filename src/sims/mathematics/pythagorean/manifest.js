export default {
  id: 'pythagorean',
  subject: 'mathematics',
  title: { en: 'Pythagorean Theorem (visual proof)', id: 'Teorema Pythagoras (bukti visual)' },
  description: {
    en: 'Drag the corners of a right triangle and watch the squares on its three sides resize. The two small squares always — visibly, by area — add up to the big one. The classic 2,500-year-old theorem, made obvious.',
    id: 'Seret sudut segitiga siku-siku dan amati persegi pada ketiga sisinya menyesuaikan ukuran. Dua persegi kecil selalu — terlihat, dari luasnya — bersama membentuk persegi besar. Teorema 2.500 tahun yang lama, dibuat jelas.',
  },
  details: () => import('./details.js'),
  topics: ['geometry', 'theorems'],
  grade: [7, 8, 9],
  load: () => import('./sim.js'),
};
