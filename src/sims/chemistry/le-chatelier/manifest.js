export default {
  id: 'le-chatelier',
  subject: 'chemistry',
  title: { en: "Le Chatelier's Principle", id: 'Asas Le Chatelier' },
  description: {
    en: 'Adjust temperature, pressure, or reagent amounts in a reversible reaction and watch the equilibrium shift. Bars track concentrations as the system finds a new balance.',
    id: 'Atur suhu, tekanan, atau jumlah pereaksi pada reaksi bolak-balik, lalu amati pergeseran kesetimbangan. Batang menampilkan konsentrasi saat sistem mencari keseimbangan baru.',
  },
  objectives: {
    en: [
      'Predict the direction of a shift after a stress.',
      'Apply the principle to exothermic vs endothermic reactions.',
      'Distinguish pressure effects when moles of gas differ on each side.',
    ],
    id: [
      'Memprediksi arah pergeseran setelah gangguan.',
      'Menerapkan asas pada reaksi eksotermik vs endotermik.',
      'Membedakan efek tekanan ketika jumlah mol gas berbeda di kedua sisi.',
    ],
  },
  tryThis: {
    en: [
      'Add reactant — does product concentration rise?',
      'Heat an exothermic reaction — which way does it shift?',
      'Increase pressure when products have more gas moles.',
    ],
    id: [
      'Tambahkan pereaksi — apakah konsentrasi produk naik?',
      'Panaskan reaksi eksotermik — ke arah mana pergeseran?',
      'Naikkan tekanan saat produk memiliki lebih banyak mol gas.',
    ],
  },
  topics: ['equilibrium', 'kinetics'],
  load: () => import('./sim.js'),
};
