export default {
  id: 'waves-on-string',
  subject: 'physics',
  title: { en: 'Waves on a String', id: 'Gelombang pada Tali' },
  description: {
    en: 'Drive a string at one end and watch standing waves form between fixed or free ends. Tune frequency, tension, and damping to find resonant modes.',
    id: 'Getarkan tali di salah satu ujung dan lihat gelombang berdiri terbentuk di antara ujung tetap atau bebas. Atur frekuensi, tegangan, dan redaman untuk menemukan moda resonansi.',
  },
  details: () => import('./details.js'),
  topics: ['waves', 'resonance'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
