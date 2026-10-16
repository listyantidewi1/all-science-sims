export default {
  id: 'mean-median-mode',
  subject: 'mathematics',
  title: { en: 'Mean, Median, Mode', id: 'Rerata, Median, Modus' },
  description: {
    en: 'Build a data set on a dot plot by clicking, dragging and nudging dots, and watch the mean (shown as the balance point of a seesaw), median, mode and range update instantly. Add an outlier and see which measure jumps and which barely moves. Switch on a second group to compare two classes side by side on the same scale.',
    id: 'Susun kumpulan data pada diagram titik dengan mengklik, menyeret, dan menggeser titik, lalu amati rerata (ditampilkan sebagai titik seimbang sebuah jungkat-jungkit), median, modus, dan jangkauan berubah seketika. Tambahkan pencilan dan lihat ukuran mana yang melonjak dan mana yang hampir tidak bergerak. Nyalakan kelompok kedua untuk membandingkan dua kelas berdampingan pada skala yang sama.',
  },
  topics: ['statistics', 'data', 'averages'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
