export default {
  id: 'double-pendulum',
  subject: 'physics',
  title: { en: 'Double Pendulum (Chaos)', id: 'Bandul Ganda (Kekacauan)' },
  description: {
    en: 'Two pendulums hinged together — the simplest system that exhibits true chaos. Drag either bob, release, and run two pendulums side-by-side with starting angles that differ by 0.001° to watch them diverge wildly.',
    id: 'Dua bandul yang disatukan sendinya — sistem paling sederhana yang menunjukkan kekacauan sejati. Seret salah satu bola, lepaskan, dan jalankan dua bandul berdampingan dengan sudut awal berbeda 0,001° untuk melihat keduanya menyimpang jauh.',
  },
  details: () => import('./details.js'),
  topics: ['chaos', 'mechanics'],
  load: () => import('./sim.js'),
};
