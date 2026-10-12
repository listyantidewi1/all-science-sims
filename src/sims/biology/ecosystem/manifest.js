export default {
  id: 'ecosystem',
  subject: 'biology',
  title: { en: 'Predator-Prey Ecosystem', id: 'Ekosistem Pemangsa-Mangsa' },
  description: {
    en: 'A 2D world of grass, rabbits, and foxes. Rabbits eat grass and breed; foxes hunt rabbits. Tweak births and deaths and watch boom-and-bust cycles emerge.',
    id: 'Dunia 2D berisi rumput, kelinci, dan rubah. Kelinci memakan rumput dan beranak; rubah memburu kelinci. Atur laju kelahiran dan kematian, lalu amati siklus naik-turun populasi.',
  },
  details: () => import('./details.js'),
  topics: ['ecology', 'agent-based'],
  hasLab: true,
  load: () => import('./sim.js'),
};
