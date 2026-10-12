export default {
  id: 'push-pull-friction',
  subject: 'physics',
  title: { en: 'Push the Car: Friction', id: 'Dorong Mobil: Gesekan' },
  description: {
    en: 'Give a toy car a small, medium or big push and watch how far it rolls. Change the track: ice, smooth wood, carpet or sand. Add a little ramp for an extra start. A big ruler shows how far the car went before friction stopped it.',
    id: 'Beri mobil mainan dorongan kecil, sedang, atau besar dan lihat sejauh apa ia meluncur. Ganti lintasannya: es, kayu halus, karpet, atau pasir. Tambahkan tanjakan kecil untuk awalan ekstra. Penggaris besar menunjukkan sejauh apa mobil bergerak sebelum gesekan menghentikannya.',
  },
  details: () => import('./details.js'),
  topics: ['forces', 'friction', 'motion'],
  grade: [2, 3, 4, 5],
  hasLab: true,
  load: () => import('./sim.js'),
};
