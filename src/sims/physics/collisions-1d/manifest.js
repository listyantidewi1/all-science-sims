export default {
  id: 'collisions-1d',
  subject: 'physics',
  title: { en: '1D Collisions', id: 'Tumbukan 1D' },
  description: {
    en: 'Two balls on a frictionless track. Set their masses and initial velocities, pick elastic, inelastic, or "perfectly sticky", and watch momentum conserve while kinetic energy may or may not.',
    id: 'Dua bola di lintasan tanpa gesekan. Atur massa dan kecepatan awal, pilih elastis, tak elastis, atau "lengket sempurna", lalu amati momentum kekal sementara energi kinetik mungkin tidak.',
  },
  objectives: {
    en: [
      'Apply conservation of momentum: m₁v₁ + m₂v₂ = const.',
      'Distinguish elastic (KE conserved) from inelastic (KE lost).',
      'Predict final velocities from masses and elasticity.',
    ],
    id: [
      'Menerapkan kekekalan momentum: m₁v₁ + m₂v₂ = tetap.',
      'Membedakan elastis (KE kekal) dari tak elastis (KE hilang).',
      'Memprediksi kecepatan akhir dari massa dan elastisitas.',
    ],
  },
  tryThis: {
    en: [
      'Equal masses, elastic — they swap velocities.',
      'Heavy hits stationary light — light flies forward at ~2v.',
      'Perfectly inelastic — they stick. How much KE is lost?',
    ],
    id: [
      'Massa sama, elastis — keduanya bertukar kecepatan.',
      'Berat menabrak ringan diam — yang ringan terbang ~2v ke depan.',
      'Tak elastis sempurna — keduanya menempel. Berapa KE yang hilang?',
    ],
  },
  topics: ['mechanics', 'momentum'],
  load: () => import('./sim.js'),
};
