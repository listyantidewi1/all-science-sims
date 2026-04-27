export default {
  id: 'plate-tectonics',
  subject: 'earth-space',
  title: { en: 'Plate Tectonics', id: 'Tektonik Lempeng' },
  description: {
    en: 'Pick a plate boundary type — convergent, divergent, or transform — and watch the cross-section animate. See where mountains rise, oceans split, and earthquakes click.',
    id: 'Pilih jenis batas lempeng — konvergen, divergen, atau transform — dan amati animasi penampangnya. Lihat tempat gunung tumbuh, samudra terpecah, dan gempa berdetak.',
  },
  objectives: {
    en: [
      'Distinguish three boundary types from their cross-section.',
      'Predict where new crust forms and where it is destroyed.',
      'Connect boundary type to surface features (mountains, ridges, faults).',
    ],
    id: [
      'Membedakan tiga jenis batas lempeng dari penampangnya.',
      'Memprediksi tempat kerak baru terbentuk dan tempat yang hancur.',
      'Mengaitkan jenis batas dengan bentuk permukaan (gunung, punggungan, sesar).',
    ],
  },
  tryThis: {
    en: [
      'In the convergent case, where does the magma rise?',
      'How many earthquakes happen near a transform boundary versus divergent?',
      'Adjust the plate speed and observe how that changes feature growth.',
    ],
    id: [
      'Pada kasus konvergen, di mana magma muncul?',
      'Lebih banyak gempa terjadi di batas transform atau divergen?',
      'Atur kecepatan lempeng dan amati pengaruhnya pada pembentukan fitur.',
    ],
  },
  topics: ['tectonics', 'earth'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
