export default {
  id: 'anscombe',
  subject: 'data-science',
  title: { en: "Anscombe's Quartet", id: 'Kuartet Anscombe' },
  description: {
    en: "Four datasets with nearly identical mean, variance, correlation, and regression line — and four wildly different shapes. Anscombe's classic warning: always plot your data.",
    id: 'Empat kumpulan data dengan rata-rata, varian, korelasi, dan garis regresi nyaris sama — namun bentuknya sangat berbeda. Peringatan klasik Anscombe: selalu gambar data Anda.',
  },
  objectives: {
    en: [
      'See that summary statistics can hide structure.',
      'Identify outliers and nonlinearities only visible from the plot.',
      'Adopt the habit of always making a scatter plot first.',
    ],
    id: [
      'Menyadari bahwa statistik ringkasan dapat menyembunyikan struktur.',
      'Mengenali pencilan dan ketaklinearan yang hanya tampak dari grafik.',
      'Membangun kebiasaan selalu membuat scatter plot terlebih dahulu.',
    ],
  },
  tryThis: {
    en: [
      'Read the four sets of stats — are they identical?',
      'Now look at the plots — which one looks like a clean line?',
      'Drag a point in any panel — does its line jump or stay put?',
    ],
    id: [
      'Bacalah empat kumpulan statistik — apakah identik?',
      'Sekarang lihat grafiknya — mana yang seperti garis bersih?',
      'Seret titik di panel mana pun — apakah garisnya melompat atau tetap?',
    ],
  },
  topics: ['statistics', 'visualization'],
  load: () => import('./sim.js'),
};
