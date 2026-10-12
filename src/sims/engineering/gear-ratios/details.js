// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Compute gear ratio = N_driven / N_drive (tooth counts).',
      'See that ω_out / ω_in = N_in / N_out and τ_out / τ_in = N_out / N_in (no friction).',
      'Power in = power out (energy conservation).',
    ],
    id: [
      'Menghitung rasio = N_digerakkan / N_penggerak.',
      'Melihat ω_keluar / ω_masuk = N_masuk / N_keluar dan τ_keluar / τ_masuk = N_keluar / N_masuk.',
      'Daya masuk = daya keluar (kekekalan energi).',
    ],
  },  tryThis: {
    en: [
      'Big input gear, small output — speed multiplier, torque divided.',
      'Small input, big output — torque amplifier, slower output.',
      'All three the same — ratio 1:1.',
    ],
    id: [
      'Input besar, output kecil — pengali kecepatan, torsi dibagi.',
      'Input kecil, output besar — pengali torsi, output lebih lambat.',
      'Ketiganya sama — rasio 1:1.',
    ],
  },};
