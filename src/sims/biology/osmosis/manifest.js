export default {
  id: 'osmosis',
  subject: 'biology',
  title: { en: 'Osmosis & Membrane Transport', id: 'Osmosis & Transpor Membran' },
  description: {
    en: 'Two compartments separated by a semi-permeable membrane. Solute particles can\'t cross, but water can. Watch water flow toward the saltier side until concentrations match.',
    id: 'Dua kompartemen yang dipisahkan membran semipermeabel. Partikel zat terlarut tidak bisa melewatinya, tetapi air bisa. Amati air mengalir ke sisi yang lebih asin sampai konsentrasi sama.',
  },
  details: () => import('./details.js'),
  topics: ['cells', 'transport'],
  hasLab: true,
  load: () => import('./sim.js'),
};
