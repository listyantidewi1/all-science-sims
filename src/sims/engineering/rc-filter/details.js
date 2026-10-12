// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
