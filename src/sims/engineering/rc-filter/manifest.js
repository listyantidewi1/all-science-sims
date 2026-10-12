export default {
  id: 'rc-filter',
  subject: 'engineering',
  title: { en: 'RC Low-Pass Filter', id: 'Tapis Low-Pass RC' },
  description: {
    en: 'A resistor and capacitor in series — the simplest filter in electronics. Drag along the Bode plot to read gain and phase at any frequency, or watch a real waveform get smoothed in time as the cutoff frequency changes. Cutoff f_c = 1 / (2πRC) is the —3 dB point.',
    id: 'Resistor dan kapasitor secara seri — tapis paling sederhana dalam elektronika. Geser di atas plot Bode untuk membaca penguatan dan fasa di tiap frekuensi, atau amati gelombang nyata dihaluskan saat frekuensi cutoff berubah. Cutoff f_c = 1 / (2πRC) adalah titik —3 dB.',
  },
  details: () => import('./details.js'),
  topics: ['electronics', 'filters'],
  grade: [12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
