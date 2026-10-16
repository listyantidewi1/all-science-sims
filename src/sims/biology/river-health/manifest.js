export default {
  id: 'river-health',
  subject: 'biology',
  title: { en: 'River Health', id: 'Kesehatan Sungai' },
  description: {
    en: 'A river flows past a village, a farm and a factory. Turn up the sewage, the fertiliser runoff and the factory waste, and watch dissolved oxygen fall, algae bloom and fish disappear downstream. Sample the indicator insects at four stations to judge water quality, then switch on a treatment plant and see how far the river recovers.',
    id: 'Sebuah sungai mengalir melewati desa, sawah, dan pabrik. Naikkan limbah rumah tangga, pupuk yang terbawa hujan, dan limbah pabrik, lalu amati oksigen terlarut turun, alga meledak, dan ikan menghilang di hilir. Ambil sampel serangga indikator di empat stasiun untuk menilai mutu air, kemudian nyalakan instalasi pengolahan limbah dan lihat sejauh mana sungai pulih.',
  },
  topics: ['ecosystems', 'water pollution', 'dissolved oxygen', 'eutrophication', 'bioindicators'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
