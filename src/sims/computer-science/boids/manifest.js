export default {
  id: 'boids',
  subject: 'computer-science',
  title: { en: 'Boids — Flocking', id: 'Boid — Pergerakan Kawanan' },
  description: {
    en: 'Each "boid" follows three local rules: separate, align with neighbors, and steer toward their center. Out of those, beautiful flocks emerge — Reynolds 1986, the gold standard of emergent behavior.',
    id: 'Setiap "boid" mengikuti tiga aturan lokal: menjaga jarak, menyamakan arah dengan tetangga, dan menuju pusat kawanan. Dari aturan itulah kawanan indah muncul — Reynolds 1986, standar emas perilaku emergent.',
  },
  details: () => import('./details.js'),
  topics: ['emergence', 'agents'],
  load: () => import('./sim.js'),
};
