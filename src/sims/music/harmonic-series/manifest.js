export default {
  id: 'harmonic-series',
  subject: 'music',
  title: { en: 'Harmonic Series', id: 'Deret Harmonik' },
  description: {
    en: 'Every tone you hear from a string or pipe is built from a fundamental plus its integer-multiple overtones. Toggle each harmonic on or off, set its weight, and watch the resulting waveform shape — a clarinet (odd harmonics only) versus a sawtooth (all harmonics) sounds and looks different. Click Play to hear it.',
    id: 'Setiap nada dari dawai atau pipa tersusun dari frekuensi dasar plus harmoniknya. Aktif/nonaktifkan tiap harmonik, atur bobotnya, dan lihat bentuk gelombang hasilnya — klarinet (hanya harmonik ganjil) versus gelombang gergaji (semua harmonik) terasa beda. Klik Play untuk mendengar.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'fourier'],
  hasLab: true,
  load: () => import('./sim.js'),
};
