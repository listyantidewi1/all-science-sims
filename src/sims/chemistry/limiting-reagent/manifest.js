export default {
  id: 'limiting-reagent',
  subject: 'chemistry',
  title: { en: 'Limiting Reagent', id: 'Pereaksi Pembatas' },
  description: {
    en: 'Choose a balanced reaction, dial in the moles of each reactant and press React: the particle boxes show which reactant runs out first and what is left over. Read off the limiting reagent, the moles and grams of product, the excess, and use the percent-yield slider to compare theoretical and actual yield.',
    id: 'Pilih reaksi setara, atur jumlah mol tiap pereaksi, dan tekan Reaksikan: kotak partikel menunjukkan pereaksi mana yang habis lebih dulu dan apa yang tersisa. Baca pereaksi pembatas, mol dan gram produk, sisa pereaksi, dan gunakan slider persen hasil untuk membandingkan hasil teoretis dengan hasil nyata.',
  },
  topics: ['stoichiometry', 'chemical reactions', 'mole concept'],
  grade: [10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
