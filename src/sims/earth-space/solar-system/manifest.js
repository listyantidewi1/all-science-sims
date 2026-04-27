export default {
  id: 'solar-system',
  subject: 'earth-space',
  title: { en: 'Solar System Orrery', id: 'Tata Surya Orrery' },
  description: {
    en: 'Watch the eight planets orbit the Sun at speeds proportional to their real orbital periods. Toggle orbits, adjust speed, and see how outer planets crawl while Mercury races.',
    id: 'Amati delapan planet mengorbit Matahari dengan kecepatan sesuai periode orbit aslinya. Aktifkan jejak orbit, atur kecepatan, dan lihat planet-planet luar bergerak lambat sementara Merkurius berputar cepat.',
  },
  objectives: {
    en: [
      'Compare orbital periods across the solar system.',
      'Recognize that distance from the Sun strongly affects orbital period.',
      "Use a model to estimate planet positions at a given time.",
    ],
    id: [
      'Membandingkan periode orbit antar planet di tata surya.',
      'Mengenali bahwa jarak dari Matahari sangat memengaruhi periode orbit.',
      'Menggunakan model untuk memperkirakan posisi planet pada waktu tertentu.',
    ],
  },
  tryThis: {
    en: [
      'How many Mercury orbits fit into one Earth year?',
      'Set time to 165 years — where is Neptune relative to where it started?',
      'Pause and try to predict Mars\' position 6 months later.',
    ],
    id: [
      'Berapa kali Merkurius mengorbit dalam satu tahun Bumi?',
      'Atur waktu ke 165 tahun — di mana Neptunus dibanding posisi awalnya?',
      'Jeda lalu prediksikan posisi Mars 6 bulan kemudian.',
    ],
  },
  topics: ['astronomy', 'orbits'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
