export default {
  id: 'rlc-resonance',
  subject: 'physics',
  title: { en: 'RLC Circuit Resonance', id: 'Resonansi Rangkaian RLC' },
  description: {
    en: 'A resistor, inductor, and capacitor in series, driven by an AC source. Sweep frequency and watch the current peak sharply at the resonant frequency 1/(2π√(LC)) — the principle behind every radio tuner.',
    id: 'Resistor, induktor, dan kapasitor seri yang diberi sumber AC. Sapukan frekuensi dan amati arus memuncak tajam pada frekuensi resonansi 1/(2π√(LC)) — prinsip di balik setiap tuner radio.',
  },
  details: () => import('./details.js'),
  topics: ['ac-circuits', 'resonance'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
