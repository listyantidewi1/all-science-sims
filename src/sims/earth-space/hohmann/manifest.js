export default {
  id: 'hohmann',
  subject: 'earth-space',
  title: { en: 'Hohmann Transfer Orbit', id: 'Orbit Transfer Hohmann' },
  description: {
    en: 'The most fuel-efficient way to move between two circular orbits. A spacecraft fires once at perihelion to enter an ellipse, drifts halfway, then fires again at aphelion to circularize. Two burns, minimal fuel — the workhorse of interplanetary missions.',
    id: 'Cara paling hemat bahan bakar untuk berpindah antara dua orbit lingkaran. Pesawat menembak sekali di perihelion untuk masuk elips, melayang setengah jalan, lalu menembak lagi di aphelion untuk membuat lingkaran. Dua pembakaran, bahan bakar minimum — andalan misi antarplanet.',
  },
  details: () => import('./details.js'),
  topics: ['astrodynamics', 'orbits'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
