export default {
  id: 'plate-tectonics',
  subject: 'earth-space',
  title: { en: 'Plate Tectonics', id: 'Tektonik Lempeng' },
  description: {
    en: 'Pick a plate boundary type — convergent, divergent, or transform — and watch the cross-section animate. See where mountains rise, oceans split, and earthquakes click.',
    id: 'Pilih jenis batas lempeng — konvergen, divergen, atau transform — dan amati animasi penampangnya. Lihat tempat gunung tumbuh, samudra terpecah, dan gempa berdetak.',
  },
  details: () => import('./details.js'),
  topics: ['tectonics', 'earth'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
