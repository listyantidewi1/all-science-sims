export default {
  id: 'buoyancy',
  subject: 'physics',
  title: { en: 'Buoyancy & Archimedes', id: 'Gaya Apung & Archimedes' },
  description: {
    en: 'Drop blocks of different densities into a tank and watch how deep they float. The submerged volume always equals weight ÷ fluid density — Archimedes\' principle, animated.',
    id: 'Jatuhkan balok dengan kerapatan berbeda ke dalam tangki dan amati seberapa dalam mereka mengapung. Volume tercelup selalu sama dengan berat ÷ kerapatan fluida — asas Archimedes yang teranimasi.',
  },
  objectives: {
    en: [
      'Apply F_buoy = ρ_fluid · g · V_submerged.',
      'Predict floating vs sinking from density alone.',
      'Connect submerged depth to object density.',
    ],
    id: [
      'Menerapkan F_apung = ρ_fluida · g · V_tercelup.',
      'Memprediksi mengapung vs tenggelam hanya dari kerapatan.',
      'Mengaitkan kedalaman tercelup dengan kerapatan benda.',
    ],
  },
  tryThis: {
    en: [
      'Drop a block with density 0.5 — what fraction sticks out?',
      'Pick "ice in water" — does it float lower or higher than wood?',
      'Switch fluid to mercury — which solid metals float?',
    ],
    id: [
      'Jatuhkan balok dengan kerapatan 0,5 — bagian mana yang keluar?',
      'Pilih "es di air" — mengapung lebih rendah atau lebih tinggi dari kayu?',
      'Ganti fluida menjadi raksa — logam padat mana yang mengapung?',
    ],
  },
  topics: ['fluids', 'forces'],
  hasLab: true,
  load: () => import('./sim.js'),
};
