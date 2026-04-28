export default {
  id: 'harmonic-series',
  subject: 'music',
  title: { en: 'Harmonic Series', id: 'Deret Harmonik' },
  description: {
    en: 'Every tone you hear from a string or pipe is built from a fundamental plus its integer-multiple overtones. Toggle each harmonic on or off, set its weight, and watch the resulting waveform shape — a clarinet (odd harmonics only) versus a sawtooth (all harmonics) sounds and looks different. Click Play to hear it.',
    id: 'Setiap nada dari dawai atau pipa tersusun dari frekuensi dasar plus harmoniknya. Aktif/nonaktifkan tiap harmonik, atur bobotnya, dan lihat bentuk gelombang hasilnya — klarinet (hanya harmonik ganjil) versus gelombang gergaji (semua harmonik) terasa beda. Klik Play untuk mendengar.',
  },
  objectives: {
    en: [
      'Build a sawtooth, square, or clarinet-like timbre from sine harmonics.',
      'See the Fourier-series construction with your own ears.',
      'Learn why timbre depends on the relative weights of overtones.',
    ],
    id: [
      'Bangun timbre gergaji, kotak, atau seperti klarinet dari harmonik sinus.',
      'Lihat dan dengar konstruksi deret Fourier secara langsung.',
      'Memahami mengapa timbre bergantung pada bobot relatif harmonik.',
    ],
  },
  tryThis: {
    en: [
      'Preset "sawtooth": every harmonic with weight 1/n.',
      'Preset "square": only odd harmonics with weight 1/n.',
      'Preset "clarinet": odd harmonics only, but stronger lows.',
    ],
    id: [
      'Preset "gergaji": semua harmonik dengan bobot 1/n.',
      'Preset "kotak": hanya harmonik ganjil dengan bobot 1/n.',
      'Preset "klarinet": harmonik ganjil saja, frekuensi rendah lebih kuat.',
    ],
  },
  topics: ['acoustics', 'fourier'],
  load: () => import('./sim.js'),
};
