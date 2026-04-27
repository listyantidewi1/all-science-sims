export default {
  id: 'sorting-visualizer',
  subject: 'computer-science',
  title: { en: 'Sorting Visualizer', id: 'Visualisasi Pengurutan' },
  description: {
    en: 'Step through bubble, insertion, selection, merge, and quick sort on the same array. Compare comparison and swap counts to feel why O(n²) hurts at scale.',
    id: 'Telusuri bubble, insertion, selection, merge, dan quick sort pada array yang sama. Bandingkan jumlah perbandingan dan pertukaran untuk merasakan mengapa O(n²) menyiksa pada data besar.',
  },
  objectives: {
    en: [
      'Distinguish O(n²) from O(n log n) sorting visually.',
      'Identify each algorithm by its visual signature.',
      'Reason about how input size scales work performed.',
    ],
    id: [
      'Membedakan pengurutan O(n²) dan O(n log n) secara visual.',
      'Mengenali setiap algoritma dari pola visualnya.',
      'Menalar bagaimana ukuran input mempengaruhi jumlah operasi.',
    ],
  },
  tryThis: {
    en: [
      'Run bubble sort and quicksort on size 60 and compare comparisons.',
      'Watch insertion sort on a nearly-sorted array — it gets very fast.',
      'Predict which is faster on size 8: insertion or quicksort.',
    ],
    id: [
      'Jalankan bubble sort dan quicksort pada ukuran 60 lalu bandingkan jumlah perbandingannya.',
      'Amati insertion sort pada array yang hampir terurut — kecepatannya meningkat tajam.',
      'Tebak mana yang lebih cepat pada ukuran 8: insertion atau quicksort.',
    ],
  },
  topics: ['algorithms', 'complexity'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
