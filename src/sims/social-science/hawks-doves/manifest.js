export default {
  id: 'hawks-doves',
  subject: 'social-science',
  title: { en: 'Hawks vs Doves', id: 'Elang vs Merpati' },
  description: {
    en: "Maynard Smith's classic evolutionary game. Hawks fight over resources; doves share. The proportion of each strategy in the population shifts according to who's getting more payoff — settling at an evolutionary stable strategy.",
    id: 'Permainan evolusi klasik Maynard Smith. Elang berebut sumber daya; merpati berbagi. Proporsi tiap strategi dalam populasi berubah menurut siapa yang mendapat untung lebih banyak — berakhir di strategi stabil evolusi.',
  },
  objectives: {
    en: [
      'See replicator dynamics: strategies grow if they out-perform the average.',
      'Find the ESS (evolutionary stable strategy) ratio of hawks.',
      'See how raising the cost of fighting reduces hawks.',
    ],
    id: [
      'Melihat dinamika replicator: strategi tumbuh bila lebih baik dari rata-rata.',
      'Menemukan rasio ESS (strategi stabil evolusi) elang.',
      'Melihat bagaimana menaikkan biaya pertarungan menurunkan jumlah elang.',
    ],
  },
  tryThis: {
    en: [
      'Set V = 4, C = 6 — what fraction of hawks at equilibrium?',
      'Set C < V — does the population go all hawks?',
      'Start at 100% hawks — does it stay there?',
    ],
    id: [
      'Atur V = 4, C = 6 — berapa fraksi elang saat seimbang?',
      'Atur C < V — apakah populasi jadi 100% elang?',
      'Mulai dari 100% elang — apakah tetap di situ?',
    ],
  },
  topics: ['evolution', 'game-theory'],
  load: () => import('./sim.js'),
};
