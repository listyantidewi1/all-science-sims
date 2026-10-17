export default {
  id: 'colligative-properties',
  subject: 'chemistry',
  title: { en: 'Colligative Properties', id: 'Sifat Koligatif Larutan' },
  description: {
    en: 'Dissolve sucrose, ethylene glycol, table salt or calcium chloride in water and read how the boiling point rises, the freezing point falls, the vapour pressure drops and the osmotic pressure builds, all in proportion to i × molality. A sketched phase diagram shows the liquid range widening, and a U-tube with a semipermeable membrane shows osmosis pushing water into the solution. Presets for road salt and antifreeze connect the formulas to everyday numbers.',
    id: 'Larutkan sukrosa, etilen glikol, garam dapur, atau kalsium klorida dalam air dan baca bagaimana titik didih naik, titik beku turun, tekanan uap turun, dan tekanan osmotik terbentuk, semuanya sebanding dengan i × molalitas. Sketsa diagram fase menunjukkan rentang cair yang melebar, dan pipa U dengan membran semipermeabel memperlihatkan osmosis mendorong air ke dalam larutan. Preset garam jalan dan antibeku menghubungkan rumus dengan angka sehari-hari.',
  },
  topics: ['solutions', 'colligative properties', 'phase changes'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
