export default {
  id: 'outliers',
  subject: 'data-science',
  title: { en: 'Outlier Effects', id: 'Pengaruh Pencilan' },
  description: {
    en: 'A small dataset shows mean and median side by side. Drag any point to drag the mean — the median barely flinches. The classic robustness lesson, in your hand.',
    id: 'Sekumpulan kecil data menampilkan rata-rata dan median berdampingan. Seret titik mana pun dan rata-rata ikut bergerak — median hampir tak bergeming. Pelajaran kekokohan klasik, di tangan Anda.',
  },
  objectives: {
    en: [
      'Distinguish how mean and median respond to outliers.',
      'Choose the right summary for skewed data.',
      'See standard deviation explode with one extreme value.',
    ],
    id: [
      'Membedakan reaksi rata-rata dan median terhadap pencilan.',
      'Memilih ringkasan yang tepat untuk data yang miring.',
      'Melihat simpangan baku meledak akibat satu nilai ekstrem.',
    ],
  },
  tryThis: {
    en: [
      'Drag one point far to the right — does the median change?',
      'Add three outliers — at what point does the median start moving?',
      'Compare mean and median for income-like data (one rich person, many poor).',
    ],
    id: [
      'Seret satu titik jauh ke kanan — apakah median berubah?',
      'Tambah tiga pencilan — pada titik berapa median mulai bergerak?',
      'Bandingkan rata-rata dan median untuk data mirip pendapatan (satu kaya, banyak miskin).',
    ],
  },
  topics: ['statistics', 'robustness'],
  load: () => import('./sim.js'),
};
