export default {
  id: 'prisoners-dilemma',
  subject: 'social-science',
  title: { en: "Prisoner's Dilemma", id: 'Dilema Tahanan' },
  description: {
    en: 'Pit classic strategies — Always Cooperate, Always Defect, Tit-for-Tat, Random — against each other in iterated rounds. Discover why nice strategies can win.',
    id: 'Adu strategi klasik — Selalu Kooperasi, Selalu Khianat, Tit-for-Tat, Acak — pada banyak putaran. Temukan mengapa strategi ramah bisa menang.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'cooperation'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
