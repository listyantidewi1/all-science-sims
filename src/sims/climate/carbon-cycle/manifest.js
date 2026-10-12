export default {
  id: 'carbon-cycle',
  subject: 'climate',
  title: { en: 'Carbon Cycle', id: 'Siklus Karbon' },
  description: {
    en: 'Carbon flows between four reservoirs — atmosphere, surface ocean, deep ocean, and land biosphere — driven by photosynthesis, respiration, ocean exchange, and human emissions. Drag the emission rate and watch each pool evolve over a century. The atmospheric pool is what drives global temperature.',
    id: 'Karbon mengalir di antara empat reservoir — atmosfer, lautan permukaan, lautan dalam, dan biosfer darat — didorong oleh fotosintesis, respirasi, pertukaran laut, dan emisi manusia. Geser laju emisi dan amati tiap pool berevolusi selama seabad. Pool atmosfer mendorong suhu global.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'biogeochemistry'],
  grade: [8, 9, 10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
