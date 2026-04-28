export default {
  id: 'stag-hunt',
  subject: 'social-science',
  title: { en: 'Stag Hunt', id: 'Permainan Berburu Rusa' },
  description: {
    en: 'Two hunters face a choice: cooperate on a stag (big payoff, but only if the other shows up) or hunt a hare alone (smaller, guaranteed). The classic coordination game with two stable equilibria — and a tipping point between them.',
    id: 'Dua pemburu menghadapi pilihan: bekerja sama berburu rusa (untung besar, tapi hanya jika lawan datang) atau berburu kelinci sendiri (kecil, pasti). Permainan koordinasi klasik dengan dua kesetimbangan stabil — dan titik balik di antaranya.',
  },
  objectives: {
    en: [
      'Distinguish dominant strategy (PD) from coordination (Stag Hunt).',
      "Recognize there's no \"defect\" — only mistrust drives the failure.",
      'See how a small population shift can flip the equilibrium.',
    ],
    id: [
      'Membedakan strategi dominan (PD) dari koordinasi (Stag Hunt).',
      'Mengenali tidak ada "khianat" — hanya ketidakpercayaan yang menyebabkan kegagalan.',
      'Melihat pergeseran populasi kecil dapat membalik kesetimbangan.',
    ],
  },
  tryThis: {
    en: [
      'Start at 30% stag — does the population converge to all-hare?',
      'Start at 70% stag — does it converge to all-stag?',
      'Find the unstable middle equilibrium.',
    ],
    id: [
      'Mulai di 30% rusa — apakah populasi konvergen ke semua kelinci?',
      'Mulai di 70% rusa — apakah konvergen ke semua rusa?',
      'Cari kesetimbangan tengah yang tidak stabil.',
    ],
  },
  topics: ['game-theory', 'coordination'],
  load: () => import('./sim.js'),
};
