export default {
  id: 'anscombe',
  subject: 'data-science',
  title: { en: "Anscombe's Quartet", id: 'Kuartet Anscombe' },
  description: {
    en: "Four datasets with nearly identical mean, variance, correlation, and regression line — and four wildly different shapes. Anscombe's classic warning: always plot your data.",
    id: 'Empat kumpulan data dengan rata-rata, varian, korelasi, dan garis regresi nyaris sama — namun bentuknya sangat berbeda. Peringatan klasik Anscombe: selalu gambar data Anda.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'visualization'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
