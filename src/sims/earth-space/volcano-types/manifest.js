export default {
  id: 'volcano-types',
  subject: 'earth-space',
  title: { en: 'Volcano Types', id: 'Tipe Gunung Api' },
  description: {
    en: 'Magma viscosity and gas content determine what kind of volcano you get. Sweep the two sliders to morph between the four big types — shield, cinder cone, stratovolcano, lava dome — and see the cone profile, eruption style (effusive vs explosive), and a representative example from Earth.',
    id: 'Viskositas magma dan kandungan gas menentukan tipe gunung api. Geser dua slider untuk berubah antara empat tipe besar — perisai, kerucut bara, stratovolkano, kubah lava — dan lihat profil kerucut, gaya letusan (lelehan vs eksplosif), dan contoh nyata di Bumi.',
  },
  details: () => import('./details.js'),
  topics: ['geology', 'volcanology'],
  grade: [6, 7, 8, 9],
  load: () => import('./sim.js'),
};
