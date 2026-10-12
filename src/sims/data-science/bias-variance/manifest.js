export default {
  id: 'bias-variance',
  subject: 'data-science',
  title: { en: 'Bias-Variance Tradeoff', id: 'Trade-off Bias-Varian' },
  description: {
    en: 'Fit a polynomial of adjustable degree to noisy points sampled from a smooth curve. Low degree underfits (high bias). High degree overfits (high variance). The sweet spot is somewhere in the middle.',
    id: 'Pasangkan polinomial dengan derajat yang bisa diatur ke titik berisik dari kurva halus. Derajat rendah underfit (bias tinggi). Derajat tinggi overfit (varian tinggi). Titik manis ada di tengah-tengahnya.',
  },
  details: () => import('./details.js'),
  topics: ['regression', 'machine-learning'],
  load: () => import('./sim.js'),
};
