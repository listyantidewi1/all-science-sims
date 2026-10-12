export default {
  id: 'stoichiometry',
  subject: 'chemistry',
  title: { en: 'Stoichiometry & Limiting Reagent', id: 'Stoikiometri & Pereaksi Pembatas' },
  description: {
    en: 'Pick a reaction, set how much of each reactant you have, and watch the kitchen-style block diagram show which one runs out first — the limiting reagent. The other reactant has leftover excess. The product yield is computed from the limiting reagent\'s mole count and the balanced stoichiometric coefficients.',
    id: 'Pilih reaksi, atur jumlah tiap pereaksi, dan amati diagram blok ala dapur menunjukkan mana yang habis lebih dulu — pereaksi pembatas. Pereaksi lainnya sisa. Hasil produk dihitung dari jumlah mol pereaksi pembatas dan koefisien stoikiometri seimbang.',
  },
  details: () => import('./details.js'),
  topics: ['stoichiometry'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
