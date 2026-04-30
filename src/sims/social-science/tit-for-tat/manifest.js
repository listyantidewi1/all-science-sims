export default {
  id: 'tit-for-tat',
  subject: 'social-science',
  title: { en: 'Tit-for-Tat Tournament', id: 'Turnamen Tit-for-Tat' },
  description: {
    en: 'Axelrod\'s famous tournament: six strategies (Always Cooperate, Always Defect, Tit-for-Tat, Tit-for-Two-Tats, Random, Grim Trigger) play 200-round iterated Prisoner\'s Dilemma round-robin against each other. Run the tournament and watch which strategies survive — Tit-for-Tat\'s simple "do unto others" rule wins.',
    id: 'Turnamen terkenal Axelrod: enam strategi (Selalu Kerja Sama, Selalu Khianati, Tit-for-Tat, Tit-for-Two-Tats, Acak, Grim Trigger) memainkan Dilema Tahanan iteratif 200 putaran round-robin. Jalankan turnamen dan amati strategi mana yang bertahan — aturan sederhana Tit-for-Tat "perlakukan orang seperti mereka memperlakukan Anda" menang.',
  },
  objectives: {
    en: [
      'Understand iterated Prisoner\'s Dilemma payoffs (CC=3, CD=0, DC=5, DD=1).',
      'See why nice + retaliating + forgiving + clear strategies dominate.',
      'Watch how strategies behave against each other in the round-by-round trace.',
    ],
    id: [
      'Memahami payoff Dilema Tahanan iteratif (KK=3, KH=0, HK=5, HH=1).',
      'Memahami mengapa strategi yang baik + membalas + memaafkan + jelas mendominasi.',
      'Mengamati bagaimana strategi berperilaku terhadap satu sama lain.',
    ],
  },
  tryThis: {
    en: [
      'Run the tournament — TfT wins or ties.',
      'Two TfT play each other — perpetual cooperation.',
      'Always-Defect vs TfT — TfT cooperates once, defects forever after.',
    ],
    id: [
      'Jalankan turnamen — TfT menang atau imbang.',
      'Dua TfT bermain — kerja sama abadi.',
      'Selalu-Khianat vs TfT — TfT kerja sama sekali, lalu khianat selamanya.',
    ],
  },
  topics: ['game-theory', 'cooperation'],
  load: () => import('./sim.js'),
};
