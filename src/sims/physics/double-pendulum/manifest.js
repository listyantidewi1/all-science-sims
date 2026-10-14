export default {
  id: 'double-pendulum',
  subject: 'physics',
  title: { en: 'Double Pendulum (Chaos)', id: 'Bandul Ganda (Kekacauan)' },
  description: {
    en: 'Two pendulums hinged together — the simplest system that exhibits true chaos. Drag either bob, release, and run two pendulums side-by-side with starting angles that differ by only 0.00001 rad (about 0.0006°) to watch them diverge wildly.',
    id: 'Dua bandul yang disatukan sendinya — sistem paling sederhana yang menunjukkan kekacauan sejati. Seret salah satu bola, lepaskan, dan jalankan dua bandul berdampingan dengan sudut awal yang hanya berbeda 0,00001 rad (sekitar 0,0006°) untuk melihat keduanya menyimpang jauh.',
  },
  details: () => import('./details.js'),
  topics: ['chaos', 'mechanics'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
