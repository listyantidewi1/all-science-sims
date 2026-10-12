export default {
  id: 'bernoulli',
  subject: 'physics',
  title: { en: "Bernoulli's Principle", id: 'Prinsip Bernoulli' },
  description: {
    en: 'A pipe narrows in the middle — the fluid speeds up to maintain volume flow, and pressure drops. Drag the constriction width and watch fluid speed and pressure swap inversely. Same principle that holds airplanes up and pulls shower curtains in.',
    id: 'Pipa menyempit di tengah — fluida memercepat untuk menjaga laju volume, dan tekanan turun. Geser lebar penyempitan dan amati kecepatan fluida dan tekanan saling berganti. Prinsip yang sama yang menahan pesawat terbang dan menarik tirai mandi.',
  },
  details: () => import('./details.js'),
  topics: ['fluid-dynamics'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
