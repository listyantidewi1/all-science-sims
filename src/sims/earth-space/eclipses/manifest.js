export default {
  id: 'eclipses',
  subject: 'earth-space',
  title: { en: 'Eclipse Geometry', id: 'Geometri Gerhana' },
  description: {
    en: 'Drag the Moon to line it up with the Sun and Earth. Solar and lunar eclipses are just shadow geometry — see umbra and penumbra cones meet planet or moon.',
    id: 'Seret Bulan agar segaris dengan Matahari dan Bumi. Gerhana matahari dan bulan hanyalah geometri bayangan — amati kerucut umbra dan penumbra mengenai planet atau bulan.',
  },
  objectives: {
    en: [
      'Distinguish solar from lunar eclipses by geometry.',
      'Identify umbra (total) vs penumbra (partial).',
      'Explain why eclipses don\'t happen every full or new moon.',
    ],
    id: [
      'Membedakan gerhana matahari dan gerhana bulan dari geometrinya.',
      'Mengenali umbra (total) vs penumbra (sebagian).',
      'Menjelaskan mengapa gerhana tidak terjadi setiap purnama atau bulan baru.',
    ],
  },
  tryThis: {
    en: [
      'Place the Moon between Earth and Sun — does Earth get a shadow?',
      'Move the Moon behind Earth — what kind of eclipse is that?',
      'Tilt the Moon\'s orbit slightly off-axis — does an eclipse still happen?',
    ],
    id: [
      'Tempatkan Bulan di antara Bumi dan Matahari — apakah Bumi mendapat bayangan?',
      'Geser Bulan di belakang Bumi — gerhana apa itu?',
      'Miringkan sedikit orbit Bulan dari sumbu — apakah gerhana tetap terjadi?',
    ],
  },
  topics: ['astronomy', 'shadows'],
  load: () => import('./sim.js'),
};
