export default {
  id: 'supply-demand',
  subject: 'social-science',
  title: { en: 'Supply & Demand', id: 'Penawaran & Permintaan' },
  description: {
    en: 'Shift supply and demand curves to find the market equilibrium price and quantity. Apply price ceilings and floors and watch shortages and surpluses form.',
    id: 'Geser kurva penawaran dan permintaan untuk menemukan harga dan jumlah keseimbangan. Terapkan harga maksimum dan minimum, lalu amati terbentuknya kekurangan dan surplus.',
  },
  details: () => import('./details.js'),
  topics: ['economics', 'markets'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
