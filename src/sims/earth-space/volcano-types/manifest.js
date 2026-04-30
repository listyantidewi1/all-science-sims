export default {
  id: 'volcano-types',
  subject: 'earth-space',
  title: { en: 'Volcano Types', id: 'Tipe Gunung Api' },
  description: {
    en: 'Magma viscosity and gas content determine what kind of volcano you get. Sweep the two sliders to morph between the four big types — shield, cinder cone, stratovolcano, lava dome — and see the cone profile, eruption style (effusive vs explosive), and a representative example from Earth.',
    id: 'Viskositas magma dan kandungan gas menentukan tipe gunung api. Geser dua slider untuk berubah antara empat tipe besar — perisai, kerucut bara, stratovolkano, kubah lava — dan lihat profil kerucut, gaya letusan (lelehan vs eksplosif), dan contoh nyata di Bumi.',
  },
  objectives: {
    en: [
      'Connect viscosity & gas content to eruption style.',
      'Identify shield (Hawaii), stratovolcano (Mt Fuji), cinder cone (Paricutin), lava dome.',
      'Understand why silica-rich magma traps gas → explosive eruptions.',
    ],
    id: [
      'Menghubungkan viskositas & gas dengan gaya letusan.',
      'Mengidentifikasi perisai (Hawaii), stratovolkano (Gunung Fuji), kerucut bara (Paricutin), kubah lava.',
      'Memahami mengapa magma kaya silika menjebak gas → letusan eksplosif.',
    ],
  },
  tryThis: {
    en: [
      'Low viscosity, low gas — Hawaiian shield, broad gentle slopes.',
      'High viscosity, high gas — Plinian stratovolcano, towering ash column.',
      'High viscosity, low gas — lava dome, slow extrusion.',
    ],
    id: [
      'Viskositas rendah, gas rendah — perisai Hawaii, lereng landai.',
      'Viskositas tinggi, gas tinggi — stratovolkano Plinian, kolom abu menjulang.',
      'Viskositas tinggi, gas rendah — kubah lava, ekstrusi lambat.',
    ],
  },
  topics: ['geology', 'volcanology'],
  load: () => import('./sim.js'),
};
