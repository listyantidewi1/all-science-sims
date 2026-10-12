export default {
  id: 'springs-shm',
  subject: 'physics',
  title: { en: 'Springs & Simple Harmonic Motion', id: 'Pegas & Gerak Harmonik Sederhana' },
  description: {
    en: 'Hang a mass on a spring, drag it down, and let it bob. Side-by-side time and position graphs trace out a perfect sine wave that depends on mass, stiffness, and damping.',
    id: 'Gantungkan beban pada pegas, tarik ke bawah, lalu lepaskan. Grafik waktu dan posisi yang berdampingan menggambar gelombang sinus sempurna yang dipengaruhi massa, kekakuan, dan redaman.',
  },
  details: () => import('./details.js'),
  topics: ['oscillation', 'spring'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
