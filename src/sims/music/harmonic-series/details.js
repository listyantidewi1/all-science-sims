// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
