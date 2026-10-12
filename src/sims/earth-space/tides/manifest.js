export default {
  id: 'tides',
  subject: 'earth-space',
  title: { en: 'Tides', id: 'Pasang Surut' },
  description: {
    en: 'Drag the Moon (and the Sun, when shown) around the Earth and see two tidal bulges form along the Moon-Earth line. Spring and neap tides emerge when the Sun aligns with or is perpendicular to the Moon.',
    id: 'Seret Bulan (dan Matahari, jika ditampilkan) mengelilingi Bumi dan amati dua tonjolan pasang membentuk sumbu Bumi-Bulan. Pasang purnama dan perbani muncul saat Matahari segaris atau tegak lurus dengan Bulan.',
  },
  details: () => import('./details.js'),
  topics: ['gravity', 'tides'],
  load: () => import('./sim.js'),
};
