export default {
  id: 'hurricane',
  subject: 'earth-space',
  title: { en: 'Hurricane Formation', id: 'Pembentukan Badai Tropis' },
  description: {
    en: 'A swirling storm above warm ocean. Slide sea surface temperature, Coriolis (latitude), and wind shear to see the storm intensify, weaken, or dissipate. Below 26.5°C, hurricanes can\'t form. Too much shear, and they\'re torn apart.',
    id: 'Badai berputar di atas laut hangat. Atur suhu permukaan laut, Coriolis (lintang), dan geseran angin untuk melihat badai menguat, melemah, atau bubar. Di bawah 26,5°C, badai tropis tidak dapat terbentuk. Terlalu banyak geseran, mereka tercabik.',
  },
  details: () => import('./details.js'),
  topics: ['meteorology', 'climate'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
