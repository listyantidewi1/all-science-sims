export default {
  id: 'voting-methods',
  subject: 'social-science',
  title: { en: 'Voting Methods', id: 'Metode Pemungutan Suara' },
  description: {
    en: 'Five candidates, an editable preference profile, and four voting methods. Plurality, two-round runoff, instant-runoff (IRV), and Borda all tally the same ballots — and pick different winners.',
    id: 'Lima kandidat, profil preferensi yang dapat diubah, dan empat metode pemilihan. Pluralitas, dua-putaran, IRV, dan Borda menghitung surat suara yang sama — dan menghasilkan pemenang berbeda.',
  },
  details: () => import('./details.js'),
  topics: ['voting', 'social-choice'],
  load: () => import('./sim.js'),
};
