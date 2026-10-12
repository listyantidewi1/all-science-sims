export default {
  id: 'decision-tree',
  subject: 'data-science',
  title: { en: 'Decision Tree Classifier', id: 'Pengklasifikasi Pohon Keputusan' },
  description: {
    en: 'Two classes of points scattered across a 2D plane. The simulator greedily splits the plane on x or y to minimize impurity, recursively, until each leaf is pure. The boundary appears as nested axis-aligned rectangles.',
    id: 'Dua kelas titik tersebar di bidang 2D. Simulator membagi bidang pada x atau y secara serakah untuk meminimalkan ketakmurnian, rekursif, sampai tiap daun murni. Batas keputusan muncul sebagai persegi panjang sejajar sumbu yang bertumpuk.',
  },
  details: () => import('./details.js'),
  topics: ['classification', 'machine-learning'],
  load: () => import('./sim.js'),
};
