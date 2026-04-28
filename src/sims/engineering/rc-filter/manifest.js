export default {
  id: 'rc-filter',
  subject: 'engineering',
  title: { en: 'RC Low-Pass Filter', id: 'Tapis Low-Pass RC' },
  description: {
    en: 'A resistor and capacitor in series — the simplest filter in electronics. Drag along the Bode plot to read gain and phase at any frequency, or watch a real waveform get smoothed in time as the cutoff frequency changes. Cutoff f_c = 1 / (2πRC) is the —3 dB point.',
    id: 'Resistor dan kapasitor secara seri — tapis paling sederhana dalam elektronika. Geser di atas plot Bode untuk membaca penguatan dan fasa di tiap frekuensi, atau amati gelombang nyata dihaluskan saat frekuensi cutoff berubah. Cutoff f_c = 1 / (2πRC) adalah titik —3 dB.',
  },
  objectives: {
    en: [
      'Compute cutoff frequency f_c = 1 / (2πRC).',
      'Read gain in dB and phase shift from the Bode plot.',
      'See how higher frequencies are progressively attenuated.',
    ],
    id: [
      'Menghitung frekuensi cutoff f_c = 1 / (2πRC).',
      'Membaca penguatan dB dan pergeseran fasa dari plot Bode.',
      'Melihat frekuensi tinggi diredam secara progresif.',
    ],
  },
  tryThis: {
    en: [
      'R = 1kΩ, C = 1μF → f_c ≈ 159 Hz.',
      'Drive at 10× cutoff — output shrinks by ~20 dB (×0.1) and lags 84°.',
      'Drive at f_c — output is at —3 dB, 45° behind.',
    ],
    id: [
      'R = 1kΩ, C = 1μF → f_c ≈ 159 Hz.',
      'Berikan input di 10× cutoff — output mengecil ~20 dB dan terlambat 84°.',
      'Berikan input di f_c — output di —3 dB, terlambat 45°.',
    ],
  },
  topics: ['electronics', 'filters'],
  load: () => import('./sim.js'),
};
