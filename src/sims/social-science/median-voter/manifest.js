export default {
  id: 'median-voter',
  subject: 'social-science',
  title: { en: 'Median Voter Theorem', id: 'Teorema Pemilih Median' },
  description: {
    en: "Voters distributed along a 1D political spectrum vote for the closest candidate. Whoever lands at the median wins. Watch two strategic candidates converge to the center — the classic explanation for why platforms look so similar.",
    id: 'Pemilih tersebar pada spektrum politik 1D dan memilih kandidat terdekat. Yang berada di median menang. Amati dua kandidat strategis bertemu di tengah — penjelasan klasik mengapa platform terlihat begitu serupa.',
  },
  details: () => import('./details.js'),
  topics: ['voting', 'social-choice'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
