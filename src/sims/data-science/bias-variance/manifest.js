export default {
  id: 'bias-variance',
  subject: 'data-science',
  title: { en: 'Bias-Variance Tradeoff', id: 'Trade-off Bias-Varian' },
  description: {
    en: 'Fit a polynomial of adjustable degree to noisy points sampled from a smooth curve. Low degree underfits (high bias). High degree overfits (high variance). The sweet spot is somewhere in the middle.',
    id: 'Pasangkan polinomial dengan derajat yang bisa diatur ke titik berisik dari kurva halus. Derajat rendah underfit (bias tinggi). Derajat tinggi overfit (varian tinggi). Titik manis ada di tengah-tengahnya.',
  },
  objectives: {
    en: [
      'Distinguish underfitting from overfitting visually.',
      'Read training error vs (true) test error as a function of model complexity.',
      'Pick a model degree that minimizes expected error.',
    ],
    id: [
      'Membedakan underfitting dan overfitting secara visual.',
      'Membaca galat latih vs galat uji (sejati) sebagai fungsi kompleksitas model.',
      'Memilih derajat model yang meminimalkan galat ekspektasi.',
    ],
  },
  tryThis: {
    en: [
      'Set degree to 1 — does the line miss the curve?',
      'Set degree to 12 — does it wiggle through every point?',
      'Resample noise — does the high-degree fit jump around?',
    ],
    id: [
      'Atur derajat ke 1 — apakah garisnya melenceng dari kurva?',
      'Atur derajat ke 12 — apakah garisnya melilit setiap titik?',
      'Resample derau — apakah model tinggi-derajat berubah-ubah?',
    ],
  },
  topics: ['regression', 'machine-learning'],
  load: () => import('./sim.js'),
};
