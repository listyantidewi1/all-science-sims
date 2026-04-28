export default {
  id: 'stoichiometry',
  subject: 'chemistry',
  title: { en: 'Stoichiometry & Limiting Reagent', id: 'Stoikiometri & Pereaksi Pembatas' },
  description: {
    en: 'Pick a reaction, set how much of each reactant you have, and watch the kitchen-style block diagram show which one runs out first — the limiting reagent. The other reactant has leftover excess. The product yield is computed from the limiting reagent\'s mole count and the balanced stoichiometric coefficients.',
    id: 'Pilih reaksi, atur jumlah tiap pereaksi, dan amati diagram blok ala dapur menunjukkan mana yang habis lebih dulu — pereaksi pembatas. Pereaksi lainnya sisa. Hasil produk dihitung dari jumlah mol pereaksi pembatas dan koefisien stoikiometri seimbang.',
  },
  objectives: {
    en: [
      'Convert grams ↔ moles using molar mass.',
      'Identify the limiting reagent: the one with smallest "moles ÷ coefficient".',
      'Compute theoretical yield in grams of product.',
    ],
    id: [
      'Mengonversi gram ↔ mol dengan massa molar.',
      'Mengidentifikasi pereaksi pembatas: yang "mol ÷ koefisien" terkecil.',
      'Menghitung hasil teoretis produk dalam gram.',
    ],
  },
  tryThis: {
    en: [
      'Equal stoichiometric amounts — both run out together, no leftover.',
      'One reactant in excess — the other limits the yield.',
      'Try the burning-magnesium reaction (2 Mg + O₂ → 2 MgO).',
    ],
    id: [
      'Jumlah stoikiometrik sama — kedua habis bersama, tanpa sisa.',
      'Salah satu pereaksi berlebih — yang lain membatasi hasil.',
      'Coba reaksi pembakaran magnesium (2 Mg + O₂ → 2 MgO).',
    ],
  },
  topics: ['stoichiometry'],
  load: () => import('./sim.js'),
};
