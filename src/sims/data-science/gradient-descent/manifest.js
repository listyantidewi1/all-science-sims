export default {
  id: 'gradient-descent',
  subject: 'data-science',
  title: { en: 'Gradient Descent', id: 'Penurunan Gradien' },
  description: {
    en: 'Click anywhere on a 2D loss landscape to drop a marble; it rolls downhill following the negative gradient. Tune the learning rate too high and it overshoots; too low and it crawls. The single most important optimization algorithm, watchable.',
    id: 'Klik di mana saja pada landskap loss 2D untuk menjatuhkan bola; ia menggelinding turun mengikuti gradien negatif. Atur learning rate terlalu tinggi dan ia melompati minimum; terlalu rendah dan ia merayap. Algoritma optimasi paling penting, terlihat.',
  },
  objectives: {
    en: [
      'Connect step direction to negative gradient.',
      'See learning rate trade-off: speed vs stability.',
      'Distinguish convex vs non-convex landscapes (multiple minima).',
    ],
    id: [
      'Mengaitkan arah langkah dengan negatif gradien.',
      'Melihat trade-off learning rate: kecepatan vs kestabilan.',
      'Membedakan landskap konveks vs non-konveks (banyak minimum).',
    ],
  },
  tryThis: {
    en: [
      'Lower learning rate to 0.005 — does it slow to a crawl?',
      'Raise learning rate to 0.5 — does it bounce out?',
      'Switch to multi-modal — does the start point matter?',
    ],
    id: [
      'Turunkan learning rate ke 0,005 — apakah merayap?',
      'Naikkan learning rate ke 0,5 — apakah memantul keluar?',
      'Beralih ke multi-modal — apakah titik awal penting?',
    ],
  },
  topics: ['optimization', 'machine-learning'],
  hasLab: true,
  load: () => import('./sim.js'),
};
