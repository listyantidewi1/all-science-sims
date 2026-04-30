export default {
  id: 'springs-shm',
  subject: 'physics',
  title: { en: 'Springs & Simple Harmonic Motion', id: 'Pegas & Gerak Harmonik Sederhana' },
  description: {
    en: 'Hang a mass on a spring, drag it down, and let it bob. Side-by-side time and position graphs trace out a perfect sine wave that depends on mass, stiffness, and damping.',
    id: 'Gantungkan beban pada pegas, tarik ke bawah, lalu lepaskan. Grafik waktu dan posisi yang berdampingan menggambar gelombang sinus sempurna yang dipengaruhi massa, kekakuan, dan redaman.',
  },
  objectives: {
    en: [
      'Apply T = 2π√(m/k) for an ideal spring.',
      'Identify amplitude, period, and frequency from the graph.',
      'See how damping changes amplitude over time.',
    ],
    id: [
      'Menerapkan T = 2π√(m/k) untuk pegas ideal.',
      'Mengenali amplitudo, periode, dan frekuensi dari grafik.',
      'Melihat redaman mengurangi amplitudo seiring waktu.',
    ],
  },
  tryThis: {
    en: [
      'Quadruple the mass — does the period double?',
      'Increase damping until the system barely oscillates.',
      'Drag the mass while it bobs to add energy.',
    ],
    id: [
      'Lipat empat massa — apakah periode menjadi dua kali lipat?',
      'Tambah redaman sampai sistem hampir tidak berosilasi.',
      'Tarik massa sambil bergerak untuk menambah energi.',
    ],
  },
  topics: ['oscillation', 'spring'],
  hasLab: true,
  load: () => import('./sim.js'),
};
