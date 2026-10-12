export default {
  id: 'hawks-doves',
  subject: 'social-science',
  title: { en: 'Hawks vs Doves', id: 'Elang vs Merpati' },
  description: {
    en: "Maynard Smith's classic evolutionary game. Hawks fight over resources; doves share. The proportion of each strategy in the population shifts according to who's getting more payoff — settling at an evolutionary stable strategy.",
    id: 'Permainan evolusi klasik Maynard Smith. Elang berebut sumber daya; merpati berbagi. Proporsi tiap strategi dalam populasi berubah menurut siapa yang mendapat untung lebih banyak — berakhir di strategi stabil evolusi.',
  },
  details: () => import('./details.js'),
  topics: ['evolution', 'game-theory'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
