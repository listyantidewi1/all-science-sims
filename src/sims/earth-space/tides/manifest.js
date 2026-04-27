export default {
  id: 'tides',
  subject: 'earth-space',
  title: { en: 'Tides', id: 'Pasang Surut' },
  description: {
    en: 'Drag the Moon (and the Sun, when shown) around the Earth and see two tidal bulges form along the Moon-Earth line. Spring and neap tides emerge when the Sun aligns with or is perpendicular to the Moon.',
    id: 'Seret Bulan (dan Matahari, jika ditampilkan) mengelilingi Bumi dan amati dua tonjolan pasang membentuk sumbu Bumi-Bulan. Pasang purnama dan perbani muncul saat Matahari segaris atau tegak lurus dengan Bulan.',
  },
  objectives: {
    en: [
      'See that gravitational gradient produces two bulges, not one.',
      'Identify spring vs neap tides from Sun-Moon-Earth geometry.',
      'Predict why the same coast sees roughly two highs and two lows per day.',
    ],
    id: [
      'Melihat bahwa gradien gravitasi menghasilkan dua tonjolan, bukan satu.',
      'Mengenali pasang purnama vs pasang perbani dari geometri Matahari-Bulan-Bumi.',
      'Memprediksi mengapa pantai yang sama mengalami sekitar dua pasang dan dua surut per hari.',
    ],
  },
  tryThis: {
    en: [
      'Place Moon and Sun in line — what kind of tide?',
      'Place Sun perpendicular to Moon — does the bulge shrink?',
      'Watch a spot on Earth\'s surface as it rotates through both bulges.',
    ],
    id: [
      'Tempatkan Bulan dan Matahari segaris — pasang macam apa?',
      'Tempatkan Matahari tegak lurus terhadap Bulan — apakah tonjolan mengecil?',
      'Amati satu titik di permukaan Bumi saat berputar melewati kedua tonjolan.',
    ],
  },
  topics: ['gravity', 'tides'],
  load: () => import('./sim.js'),
};
