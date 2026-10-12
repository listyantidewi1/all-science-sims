export default {
  id: 'rock-cycle',
  subject: 'earth-space',
  title: { en: 'Rock Cycle', id: 'Siklus Batuan' },
  description: {
    en: 'Particles representing minerals flow between three rock types — igneous, sedimentary, metamorphic — and back to magma. Click any process arrow (cooling, weathering, lithification, heat & pressure, melting) and watch each particle\'s journey through deep time.',
    id: 'Partikel yang mewakili mineral mengalir antara tiga jenis batuan — beku, sedimen, metamorf — dan kembali ke magma. Klik panah proses (pendinginan, pelapukan, litifikasi, panas & tekanan, peleburan) dan amati perjalanan tiap partikel melintasi waktu geologis.',
  },
  details: () => import('./details.js'),
  topics: ['geology'],
  load: () => import('./sim.js'),
};
