export default {
  id: 'black-hole',
  subject: 'earth-space',
  title: { en: 'Black Hole Gravitational Lens', id: 'Lensa Gravitasi Lubang Hitam' },
  description: {
    en: 'Drag a star around behind a black hole and watch its image bend. Pass directly behind the singularity and a perfect Einstein ring snaps into existence — light itself curving around spacetime.',
    id: 'Seret bintang di belakang lubang hitam dan amati bayangannya membelok. Lewatkan tepat di belakang singularitas dan cincin Einstein sempurna muncul — cahaya itu sendiri membelok di sekitar ruang-waktu.',
  },
  details: () => import('./details.js'),
  topics: ['general-relativity', 'lensing'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
