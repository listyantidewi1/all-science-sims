export default {
  id: 'box-plot',
  subject: 'data-science',
  title: { en: 'Box Plot & 5-Number Summary', id: 'Plot Kotak & Ringkasan 5-Angka' },
  description: {
    en: 'Type a list of numbers (or pick a preset) and watch the median, quartiles, and outliers fall into place. The box plot shows the 5-number summary visually; the dot plot underneath shows where each value actually sits. Drag the IQR multiplier to see how outlier detection changes.',
    id: 'Ketik daftar angka (atau pilih preset) dan amati median, kuartil, dan pencilan jatuh pada tempatnya. Plot kotak menampilkan ringkasan 5-angka secara visual; plot titik di bawah menampilkan posisi tiap nilai. Geser pengali IQR untuk melihat deteksi pencilan berubah.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'data-viz'],
  grade: [6, 7, 8, 9, 10],
  load: () => import('./sim.js'),
};
