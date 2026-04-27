export default {
  id: 'boids',
  subject: 'computer-science',
  title: { en: 'Boids — Flocking', id: 'Boid — Pergerakan Kawanan' },
  description: {
    en: 'Each "boid" follows three local rules: separate, align with neighbors, and steer toward their center. Out of those, beautiful flocks emerge — Reynolds 1986, the gold standard of emergent behavior.',
    id: 'Setiap "boid" mengikuti tiga aturan lokal: menjaga jarak, menyamakan arah dengan tetangga, dan menuju pusat kawanan. Dari aturan itulah kawanan indah muncul — Reynolds 1986, standar emas perilaku emergent.',
  },
  objectives: {
    en: [
      'Connect three local rules to global flocking behavior.',
      'Recognize emergence: no leader, no global plan.',
      'Tune the rule weights and watch flocks dissolve or tighten.',
    ],
    id: [
      'Menghubungkan tiga aturan lokal dengan perilaku kawanan global.',
      'Mengenali emergence: tanpa pemimpin, tanpa rencana global.',
      'Atur bobot aturan dan amati kawanan bubar atau merapat.',
    ],
  },
  tryThis: {
    en: [
      'Set separation to 0 — do they pile up?',
      'Set alignment high, others low — what shape forms?',
      'Click the canvas to scatter the flock.',
    ],
    id: [
      'Atur separasi ke 0 — apakah mereka menumpuk?',
      'Atur penjajaran tinggi, lainnya rendah — bentuk apa muncul?',
      'Klik kanvas untuk mengacak kawanan.',
    ],
  },
  topics: ['emergence', 'agents'],
  load: () => import('./sim.js'),
};
