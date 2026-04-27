export default {
  id: 'prisoners-dilemma',
  subject: 'social-science',
  title: { en: "Prisoner's Dilemma", id: 'Dilema Tahanan' },
  description: {
    en: 'Pit classic strategies — Always Cooperate, Always Defect, Tit-for-Tat, Random — against each other in iterated rounds. Discover why nice strategies can win.',
    id: 'Adu strategi klasik — Selalu Kooperasi, Selalu Khianat, Tit-for-Tat, Acak — pada banyak putaran. Temukan mengapa strategi ramah bisa menang.',
  },
  objectives: {
    en: [
      'Read a payoff matrix and compute total scores.',
      'Predict outcomes of one-shot vs iterated games.',
      'Argue why cooperation can emerge despite individual incentives to defect.',
    ],
    id: [
      'Membaca matriks pembayaran dan menghitung skor total.',
      'Memprediksi hasil permainan sekali vs berulang.',
      'Berargumen mengapa kerja sama dapat muncul meskipun ada insentif individu untuk mengkhianati.',
    ],
  },
  tryThis: {
    en: [
      'Run Always Defect vs Always Cooperate over 100 rounds — who wins?',
      'Add noise — does Tit-for-Tat still win?',
      'Pair Tit-for-Tat against itself — what happens?',
    ],
    id: [
      'Jalankan Selalu Khianat vs Selalu Kooperasi selama 100 putaran — siapa menang?',
      'Tambah derau — apakah Tit-for-Tat masih unggul?',
      'Adu Tit-for-Tat melawan dirinya sendiri — apa yang terjadi?',
    ],
  },
  topics: ['game-theory', 'cooperation'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
