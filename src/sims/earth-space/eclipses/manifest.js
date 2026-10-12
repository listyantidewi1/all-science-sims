export default {
  id: 'eclipses',
  subject: 'earth-space',
  title: { en: 'Eclipse Geometry', id: 'Geometri Gerhana' },
  description: {
    en: 'Drag the Moon to line it up with the Sun and Earth. Solar and lunar eclipses are just shadow geometry — see umbra and penumbra cones meet planet or moon.',
    id: 'Seret Bulan agar segaris dengan Matahari dan Bumi. Gerhana matahari dan bulan hanyalah geometri bayangan — amati kerucut umbra dan penumbra mengenai planet atau bulan.',
  },
  details: () => import('./details.js'),
  topics: ['astronomy', 'shadows'],
  grade: [4, 5, 6, 7, 8],
  load: () => import('./sim.js'),
};
