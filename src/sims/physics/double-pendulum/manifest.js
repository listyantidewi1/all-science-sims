export default {
  id: 'double-pendulum',
  subject: 'physics',
  title: { en: 'Double Pendulum (Chaos)', id: 'Bandul Ganda (Kekacauan)' },
  description: {
    en: 'Two pendulums hinged together — the simplest system that exhibits true chaos. Drag either bob, release, and run two pendulums side-by-side with starting angles that differ by 0.001° to watch them diverge wildly.',
    id: 'Dua bandul yang disatukan sendinya — sistem paling sederhana yang menunjukkan kekacauan sejati. Seret salah satu bola, lepaskan, dan jalankan dua bandul berdampingan dengan sudut awal berbeda 0,001° untuk melihat keduanya menyimpang jauh.',
  },
  objectives: {
    en: [
      'Recognize sensitivity to initial conditions (the "butterfly effect").',
      'Distinguish chaotic motion from periodic motion.',
      'See that deterministic ≠ predictable in practice.',
    ],
    id: [
      'Mengenali sensitivitas terhadap kondisi awal ("efek kupu-kupu").',
      'Membedakan gerak kacau dari gerak periodik.',
      'Melihat bahwa deterministik ≠ dapat diprediksi dalam praktiknya.',
    ],
  },
  tryThis: {
    en: [
      'Run with the ghost pendulum on — at what time do they visibly diverge?',
      'Make masses very different — does it become more or less chaotic?',
      'Drag both bobs to nearly aligned upward — is that motion stable?',
    ],
    id: [
      'Jalankan dengan bandul bayangan aktif — kapan keduanya tampak menyimpang?',
      'Buat massa sangat berbeda — apakah jadi lebih kacau atau lebih teratur?',
      'Seret kedua bola hampir lurus ke atas — apakah gerakannya stabil?',
    ],
  },
  topics: ['chaos', 'mechanics'],
  load: () => import('./sim.js'),
};
