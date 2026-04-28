export default {
  id: 'correlation',
  subject: 'data-science',
  title: { en: 'Correlation Explorer', id: 'Penjelajah Korelasi' },
  description: {
    en: 'Drag points around the canvas and watch the Pearson correlation coefficient r update live, from −1 (perfect anticorrelation) through 0 (no relationship) to +1 (perfect correlation). Click empty space to add a point, right-click to remove. Best-fit regression line draws itself.',
    id: 'Geser titik-titik di kanvas dan amati koefisien korelasi Pearson r terbarui langsung, dari −1 (anti-korelasi sempurna) melalui 0 (tanpa hubungan) sampai +1 (korelasi sempurna). Klik area kosong untuk menambah titik, klik kanan untuk menghapus. Garis regresi terbaik tergambar sendiri.',
  },
  objectives: {
    en: [
      'Connect the visual scatter to the numeric r.',
      'Understand that correlation does NOT imply causation.',
      'See the Anscombe-style fragility: one outlier can swing r dramatically.',
    ],
    id: [
      'Menghubungkan visual sebar dengan angka r.',
      'Memahami bahwa korelasi TIDAK berarti sebab-akibat.',
      'Melihat kerapuhan ala Anscombe: satu pencilan dapat menggoyang r secara dramatis.',
    ],
  },
  tryThis: {
    en: [
      'Drag points to a straight line — r approaches +1 or −1.',
      'Scatter randomly — r near 0.',
      'Add one point far from the rest — watch r jump even if the rest is unchanged.',
    ],
    id: [
      'Geser titik ke garis lurus — r mendekati +1 atau −1.',
      'Sebar acak — r dekat 0.',
      'Tambah satu titik jauh dari yang lain — amati r melompat meski yang lain tak berubah.',
    ],
  },
  topics: ['statistics'],
  load: () => import('./sim.js'),
};
