export default {
  id: 'outliers',
  subject: 'data-science',
  title: { en: 'Outlier Effects', id: 'Pengaruh Pencilan' },
  description: {
    en: 'A small dataset shows mean and median side by side. Drag any point to drag the mean — the median barely flinches. The classic robustness lesson, in your hand.',
    id: 'Sekumpulan kecil data menampilkan rata-rata dan median berdampingan. Seret titik mana pun dan rata-rata ikut bergerak — median hampir tak bergeming. Pelajaran kekokohan klasik, di tangan Anda.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'robustness'],
  load: () => import('./sim.js'),
};
