export default {
  id: 'bernoulli',
  subject: 'physics',
  title: { en: "Bernoulli's Principle", id: 'Prinsip Bernoulli' },
  description: {
    en: 'A pipe narrows in the middle — the fluid speeds up to maintain volume flow, and pressure drops. Drag the constriction width and watch fluid speed and pressure swap inversely. Same principle that holds airplanes up and pulls shower curtains in.',
    id: 'Pipa menyempit di tengah — fluida memercepat untuk menjaga laju volume, dan tekanan turun. Geser lebar penyempitan dan amati kecepatan fluida dan tekanan saling berganti. Prinsip yang sama yang menahan pesawat terbang dan menarik tirai mandi.',
  },
  objectives: {
    en: [
      'Apply continuity: A₁v₁ = A₂v₂.',
      'Apply Bernoulli: P + ½ρv² + ρgh = constant.',
      'See the inverse relationship between fluid speed and pressure.',
    ],
    id: [
      'Menerapkan kontinuitas: A₁v₁ = A₂v₂.',
      'Menerapkan Bernoulli: P + ½ρv² + ρgh = konstan.',
      'Melihat hubungan terbalik antara kecepatan fluida dan tekanan.',
    ],
  },
  tryThis: {
    en: [
      'Squeeze pipe to half — speed doubles, pressure drops by ~3× the kinetic energy density.',
      'Make pipe wider in the middle — speed drops, pressure rises.',
      'Tilt the pipe — gravity term changes the picture.',
    ],
    id: [
      'Sempitkan pipa setengah — kecepatan dua kali, tekanan turun ~3× kerapatan energi kinetik.',
      'Lebarkan pipa di tengah — kecepatan turun, tekanan naik.',
      'Miringkan pipa — gravitasi mengubah gambaran.',
    ],
  },
  topics: ['fluid-dynamics'],
  hasLab: true,
  load: () => import('./sim.js'),
};
