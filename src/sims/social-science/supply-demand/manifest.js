export default {
  id: 'supply-demand',
  subject: 'social-science',
  title: { en: 'Supply & Demand', id: 'Penawaran & Permintaan' },
  description: {
    en: 'Shift supply and demand curves to find the market equilibrium price and quantity. Apply price ceilings and floors and watch shortages and surpluses form.',
    id: 'Geser kurva penawaran dan permintaan untuk menemukan harga dan jumlah keseimbangan. Terapkan harga maksimum dan minimum, lalu amati terbentuknya kekurangan dan surplus.',
  },
  objectives: {
    en: [
      'Read equilibrium price and quantity from a market diagram.',
      'Predict the effect of demand or supply shifts.',
      'Distinguish a binding from a non-binding price control.',
    ],
    id: [
      'Membaca harga dan jumlah keseimbangan dari diagram pasar.',
      'Memprediksi efek pergeseran permintaan atau penawaran.',
      'Membedakan kebijakan harga yang mengikat dan yang tidak.',
    ],
  },
  tryThis: {
    en: [
      'Shift demand right — what happens to price and quantity?',
      'Set a price ceiling below equilibrium. How big is the shortage?',
      'Find a price floor that doesn\'t change the market at all.',
    ],
    id: [
      'Geser permintaan ke kanan — apa yang terjadi pada harga dan jumlah?',
      'Tetapkan harga maksimum di bawah keseimbangan. Seberapa besar kekurangannya?',
      'Cari harga minimum yang tidak mengubah pasar sama sekali.',
    ],
  },
  topics: ['economics', 'markets'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
