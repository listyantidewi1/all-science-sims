export default {
  id: 'stag-hunt',
  subject: 'social-science',
  title: { en: 'Stag Hunt', id: 'Permainan Berburu Rusa' },
  description: {
    en: 'Two hunters face a choice: cooperate on a stag (big payoff, but only if the other shows up) or hunt a hare alone (smaller, guaranteed). The classic coordination game with two stable equilibria — and a tipping point between them.',
    id: 'Dua pemburu menghadapi pilihan: bekerja sama berburu rusa (untung besar, tapi hanya jika lawan datang) atau berburu kelinci sendiri (kecil, pasti). Permainan koordinasi klasik dengan dua kesetimbangan stabil — dan titik balik di antaranya.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'coordination'],
  load: () => import('./sim.js'),
};
