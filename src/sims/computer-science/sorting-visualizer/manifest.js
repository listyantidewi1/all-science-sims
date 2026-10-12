export default {
  id: 'sorting-visualizer',
  subject: 'computer-science',
  title: { en: 'Sorting Visualizer', id: 'Visualisasi Pengurutan' },
  description: {
    en: 'Step through bubble, insertion, selection, merge, and quick sort on the same array. Compare comparison and swap counts to feel why O(n²) hurts at scale.',
    id: 'Telusuri bubble, insertion, selection, merge, dan quick sort pada array yang sama. Bandingkan jumlah perbandingan dan pertukaran untuk merasakan mengapa O(n²) menyiksa pada data besar.',
  },
  details: () => import('./details.js'),
  topics: ['algorithms', 'complexity'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
