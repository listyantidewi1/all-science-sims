export default {
  id: 'gear-ratios',
  subject: 'engineering',
  title: { en: 'Gear Train Ratios', id: 'Rasio Roda Gigi' },
  description: {
    en: 'Three meshed gears in a row. Drag the input RPM dial and watch the output spin — bigger gears turn slower but produce more torque, the iron law of mechanical power transmission. Tooth counts trade speed for force at every stage.',
    id: 'Tiga roda gigi yang bersinggungan. Geser RPM masukan dan amati keluaran berputar — roda gigi lebih besar berputar lebih lambat tapi menghasilkan torsi lebih besar, hukum besi transmisi daya mekanis. Jumlah gigi menukar kecepatan dengan gaya di tiap tahap.',
  },
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
  },
  tryThis: {
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
  },
  topics: ['mechanics', 'machines'],
  hasLab: true,
  load: () => import('./sim.js'),
};
