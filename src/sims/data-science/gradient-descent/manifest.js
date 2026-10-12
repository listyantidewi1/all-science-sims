export default {
  id: 'gradient-descent',
  subject: 'data-science',
  title: { en: 'Gradient Descent', id: 'Penurunan Gradien' },
  description: {
    en: 'Click anywhere on a 2D loss landscape to drop a marble; it rolls downhill following the negative gradient. Tune the learning rate too high and it overshoots; too low and it crawls. The single most important optimization algorithm, watchable.',
    id: 'Klik di mana saja pada landskap loss 2D untuk menjatuhkan bola; ia menggelinding turun mengikuti gradien negatif. Atur learning rate terlalu tinggi dan ia melompati minimum; terlalu rendah dan ia merayap. Algoritma optimasi paling penting, terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['optimization', 'machine-learning'],
  hasLab: true,
  load: () => import('./sim.js'),
};
