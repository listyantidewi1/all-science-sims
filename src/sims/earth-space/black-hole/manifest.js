export default {
  id: 'black-hole',
  subject: 'earth-space',
  title: { en: 'Black Hole Gravitational Lens', id: 'Lensa Gravitasi Lubang Hitam' },
  description: {
    en: 'Drag a star around behind a black hole and watch its image bend. Pass directly behind the singularity and a perfect Einstein ring snaps into existence — light itself curving around spacetime.',
    id: 'Seret bintang di belakang lubang hitam dan amati bayangannya membelok. Lewatkan tepat di belakang singularitas dan cincin Einstein sempurna muncul — cahaya itu sendiri membelok di sekitar ruang-waktu.',
  },
  objectives: {
    en: [
      'See light bending — gravitational lensing.',
      'Recognize an Einstein ring when source, lens, and observer line up.',
      'Predict that a more massive black hole bends light more.',
    ],
    id: [
      'Melihat pembelokan cahaya — lensa gravitasi.',
      'Mengenali cincin Einstein saat sumber, lensa, dan pengamat segaris.',
      'Memprediksi bahwa lubang hitam lebih masif membelokkan cahaya lebih banyak.',
    ],
  },
  tryThis: {
    en: [
      'Drag the star directly behind the black hole — see the ring.',
      'Increase mass — does the ring expand?',
      'Pass at an offset — see the asymmetric two-image lensing.',
    ],
    id: [
      'Seret bintang tepat di belakang lubang hitam — lihat cincinnya.',
      'Naikkan massa — apakah cincin membesar?',
      'Lewatkan dengan offset — amati dua bayangan tak simetris.',
    ],
  },
  topics: ['general-relativity', 'lensing'],
  load: () => import('./sim.js'),
};
