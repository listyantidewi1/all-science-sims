export default {
  id: 'rock-cycle',
  subject: 'earth-space',
  title: { en: 'Rock Cycle', id: 'Siklus Batuan' },
  description: {
    en: 'Particles representing minerals flow between three rock types — igneous, sedimentary, metamorphic — and back to magma. Click any process arrow (cooling, weathering, lithification, heat & pressure, melting) and watch each particle\'s journey through deep time.',
    id: 'Partikel yang mewakili mineral mengalir antara tiga jenis batuan — beku, sedimen, metamorf — dan kembali ke magma. Klik panah proses (pendinginan, pelapukan, litifikasi, panas & tekanan, peleburan) dan amati perjalanan tiap partikel melintasi waktu geologis.',
  },
  objectives: {
    en: [
      'Identify the three rock families and the processes that connect them.',
      'See that no rock type is "permanent" — all transform given enough time.',
      'Understand that one rock can take many paths through the cycle.',
    ],
    id: [
      'Mengidentifikasi tiga keluarga batuan dan proses yang menghubungkannya.',
      'Melihat bahwa tidak ada jenis batuan yang "permanen" — semuanya berubah seiring waktu.',
      'Memahami bahwa satu batu dapat menempuh banyak jalan melintasi siklus.',
    ],
  },
  tryThis: {
    en: [
      'Crank weathering — sedimentary pile grows.',
      'Crank metamorphism — sedimentary turns metamorphic.',
      'Crank melting — every rock returns to magma.',
    ],
    id: [
      'Naikkan pelapukan — tumpukan sedimen tumbuh.',
      'Naikkan metamorfisme — sedimen berubah menjadi metamorf.',
      'Naikkan peleburan — setiap batu kembali menjadi magma.',
    ],
  },
  topics: ['geology'],
  load: () => import('./sim.js'),
};
