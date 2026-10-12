export default {
  id: 'function-plotter',
  subject: 'mathematics',
  title: { en: 'Function Plotter', id: 'Penggambar Fungsi' },
  description: {
    en: 'Slide the coefficients of a polynomial, or pick sin/cos/exp/log, and watch the curve respond. The simplest place to build intuition for what each parameter does.',
    id: 'Geser koefisien polinomial, atau pilih sin/cos/exp/log, lalu amati kurva merespons. Tempat termudah untuk membangun intuisi tentang peran tiap parameter.',
  },
  details: () => import('./details.js'),
  topics: ['algebra', 'graphing'],
  load: () => import('./sim.js'),
};
