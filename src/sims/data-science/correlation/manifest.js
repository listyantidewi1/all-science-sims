export default {
  id: 'correlation',
  subject: 'data-science',
  title: { en: 'Correlation Explorer', id: 'Penjelajah Korelasi' },
  description: {
    en: 'Drag points around the canvas and watch the Pearson correlation coefficient r update live, from −1 (perfect anticorrelation) through 0 (no relationship) to +1 (perfect correlation). Click empty space to add a point, right-click to remove. Best-fit regression line draws itself.',
    id: 'Geser titik-titik di kanvas dan amati koefisien korelasi Pearson r terbarui langsung, dari −1 (anti-korelasi sempurna) melalui 0 (tanpa hubungan) sampai +1 (korelasi sempurna). Klik area kosong untuk menambah titik, klik kanan untuk menghapus. Garis regresi terbaik tergambar sendiri.',
  },
  details: () => import('./details.js'),
  topics: ['statistics'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
