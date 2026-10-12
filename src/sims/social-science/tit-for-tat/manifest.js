export default {
  id: 'tit-for-tat',
  subject: 'social-science',
  title: { en: 'Tit-for-Tat Tournament', id: 'Turnamen Tit-for-Tat' },
  description: {
    en: 'Axelrod\'s famous tournament: six strategies (Always Cooperate, Always Defect, Tit-for-Tat, Tit-for-Two-Tats, Random, Grim Trigger) play 200-round iterated Prisoner\'s Dilemma round-robin against each other. Run the tournament and watch which strategies survive — Tit-for-Tat\'s simple "do unto others" rule wins.',
    id: 'Turnamen terkenal Axelrod: enam strategi (Selalu Kerja Sama, Selalu Khianati, Tit-for-Tat, Tit-for-Two-Tats, Acak, Grim Trigger) memainkan Dilema Tahanan iteratif 200 putaran round-robin. Jalankan turnamen dan amati strategi mana yang bertahan — aturan sederhana Tit-for-Tat "perlakukan orang seperti mereka memperlakukan Anda" menang.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'cooperation'],
  load: () => import('./sim.js'),
};
