export default {
  id: 'decision-tree',
  subject: 'data-science',
  title: { en: 'Decision Tree Classifier', id: 'Pengklasifikasi Pohon Keputusan' },
  description: {
    en: 'Two classes of points scattered across a 2D plane. The simulator greedily splits the plane on x or y to minimize impurity, recursively, until each leaf is pure. The boundary appears as nested axis-aligned rectangles.',
    id: 'Dua kelas titik tersebar di bidang 2D. Simulator membagi bidang pada x atau y secara serakah untuk meminimalkan ketakmurnian, rekursif, sampai tiap daun murni. Batas keputusan muncul sebagai persegi panjang sejajar sumbu yang bertumpuk.',
  },
  objectives: {
    en: [
      'See greedy splitting reduce Gini impurity step by step.',
      'Recognize axis-aligned decision boundaries.',
      'Watch overfitting at high depth (every point gets its own region).',
    ],
    id: [
      'Melihat pembagian serakah menurunkan ketakmurnian Gini langkah demi langkah.',
      'Mengenali batas keputusan yang sejajar sumbu.',
      'Mengamati overfitting pada kedalaman tinggi (setiap titik dapat region sendiri).',
    ],
  },
  tryThis: {
    en: [
      'Depth 1 — single split. How accurate?',
      'Depth 8 — nearly perfect on training. Overfit?',
      'Add noise to the data — depth 8 still overfits, but accuracy on the true function drops.',
    ],
    id: [
      'Kedalaman 1 — satu pembagian. Seberapa akurat?',
      'Kedalaman 8 — hampir sempurna untuk data latih. Overfit?',
      'Tambah derau pada data — kedalaman 8 tetap overfit, tapi akurasi pada fungsi sejatinya turun.',
    ],
  },
  topics: ['classification', 'machine-learning'],
  load: () => import('./sim.js'),
};
