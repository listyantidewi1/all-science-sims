export default {
  id: 'riemann',
  subject: 'mathematics',
  title: { en: 'Riemann Sums (Integration)', id: 'Jumlah Riemann (Integrasi)' },
  description: {
    en: 'Approximate the area under a curve with rectangles. Slide N from 5 to 200 and watch left, right, and midpoint sums all converge to the same definite integral.',
    id: 'Aproksimasi luas di bawah kurva dengan persegi panjang. Geser N dari 5 ke 200 dan amati jumlah kiri, kanan, dan titik tengah menyatu ke integral tentu yang sama.',
  },
  details: () => import('./details.js'),
  topics: ['calculus', 'integration'],
  load: () => import('./sim.js'),
};
