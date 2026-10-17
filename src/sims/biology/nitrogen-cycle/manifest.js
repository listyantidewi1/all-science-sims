export default {
  id: 'nitrogen-cycle',
  subject: 'biology',
  title: { en: 'Nitrogen Cycle', id: 'Siklus Nitrogen' },
  description: {
    en: 'Follow nitrogen as it moves between the atmosphere, soil ammonium and nitrate, plants, animals and decomposers. Animated arrows show fixation by bacteria and lightning, nitrification, assimilation, ammonification and denitrification, with every pool in kg N per hectare. Add fertiliser or plant legumes and read off how much nitrate leaches into the river and how high the algal-bloom risk climbs.',
    id: 'Ikuti perjalanan nitrogen antara atmosfer, amonium dan nitrat tanah, tumbuhan, hewan, dan pengurai. Panah beranimasi menunjukkan fiksasi oleh bakteri dan petir, nitrifikasi, asimilasi, amonifikasi, dan denitrifikasi, dengan setiap cadangan dalam kg N per hektar. Tambahkan pupuk atau tanam legum dan bacalah berapa nitrat yang terlindi ke sungai serta seberapa tinggi risiko ledakan alga.',
  },
  topics: ['nitrogen cycle', 'biogeochemical cycle', 'ecosystem', 'eutrophication', 'fertiliser', 'nitrogen fixation'],
  grade: [10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
