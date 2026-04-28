export default {
  id: 'rlc-resonance',
  subject: 'physics',
  title: { en: 'RLC Circuit Resonance', id: 'Resonansi Rangkaian RLC' },
  description: {
    en: 'A resistor, inductor, and capacitor in series, driven by an AC source. Sweep frequency and watch the current peak sharply at the resonant frequency 1/(2π√(LC)) — the principle behind every radio tuner.',
    id: 'Resistor, induktor, dan kapasitor seri yang diberi sumber AC. Sapukan frekuensi dan amati arus memuncak tajam pada frekuensi resonansi 1/(2π√(LC)) — prinsip di balik setiap tuner radio.',
  },
  objectives: {
    en: [
      'Apply f₀ = 1/(2π√(LC)).',
      'Compare reactances X_L = 2πfL and X_C = 1/(2πfC).',
      'See how the Q factor sharpens the resonant peak.',
    ],
    id: [
      'Menerapkan f₀ = 1/(2π√(LC)).',
      'Membandingkan reaktansi X_L = 2πfL dan X_C = 1/(2πfC).',
      'Melihat faktor Q menajamkan puncak resonansi.',
    ],
  },
  tryThis: {
    en: [
      'Find resonance — does current peak when X_L = X_C?',
      'Lower R — does the peak get sharper or wider?',
      'Double L — what happens to f₀?',
    ],
    id: [
      'Cari resonansi — apakah arus memuncak saat X_L = X_C?',
      'Turunkan R — apakah puncak menjadi lebih tajam atau lebih lebar?',
      'Gandakan L — apa yang terjadi pada f₀?',
    ],
  },
  topics: ['ac-circuits', 'resonance'],
  load: () => import('./sim.js'),
};
