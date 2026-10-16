export default {
  id: 'seesaw-lever',
  subject: 'physics',
  title: { en: 'Seesaw Balance', id: 'Jungkat-jungkit' },
  description: {
    en: 'A seesaw with a weight on each side. Slide the weights along the plank to the numbered marks and change how heavy they are. The seesaw tips towards the stronger side. Can you make it balance? Hint: a small weight far from the middle can balance a big weight close to it.',
    id: 'Jungkat-jungkit dengan satu beban di tiap sisi. Geser beban di sepanjang papan ke tanda bernomor dan ubah beratnya. Jungkat-jungkit miring ke sisi yang lebih kuat. Bisakah kamu membuatnya seimbang? Petunjuk: beban kecil yang jauh dari tengah bisa menyeimbangkan beban besar yang dekat.',
  },
  topics: ['forces', 'levers', 'balance', 'simple machines'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
