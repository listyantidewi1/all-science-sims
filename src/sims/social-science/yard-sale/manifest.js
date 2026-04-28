export default {
  id: 'yard-sale',
  subject: 'social-science',
  title: { en: 'Yard-Sale Wealth Model', id: 'Model Kekayaan Yard-Sale' },
  description: {
    en: 'Two random people meet, flip a fair coin, and exchange a small fraction of the poorer one\'s wealth. Repeat thousands of times. Even with perfectly fair trades and no luck differential, all wealth ends up in one person\'s hands. Inequality, from nothing.',
    id: 'Dua orang acak bertemu, melempar koin adil, dan menukar sebagian kecil kekayaan yang lebih miskin. Ulangi ribuan kali. Bahkan dengan transaksi adil sempurna tanpa keberuntungan beda, seluruh kekayaan berakhir di satu orang. Ketimpangan, dari ketiadaan.',
  },
  objectives: {
    en: [
      'See "fair" trades produce inequality through pure random walk.',
      'Connect to wealth-distribution research (Boghosian, 2014).',
      'Compare to redistributive taxation as a moderating force.',
    ],
    id: [
      'Melihat transaksi "adil" menghasilkan ketimpangan lewat random walk murni.',
      'Mengaitkan dengan penelitian distribusi kekayaan (Boghosian, 2014).',
      'Membandingkan dengan pajak redistributif sebagai gaya pemoderasi.',
    ],
  },
  tryThis: {
    en: [
      'Run with no tax — does someone become a billionaire?',
      'Add 5% wealth tax — does it stabilize inequality?',
      'Compare Gini after 100, 1000, 10000 trades.',
    ],
    id: [
      'Jalankan tanpa pajak — apakah seseorang jadi miliarder?',
      'Tambah pajak kekayaan 5% — apakah ketimpangan stabil?',
      'Bandingkan Gini setelah 100, 1.000, 10.000 transaksi.',
    ],
  },
  topics: ['economics', 'inequality'],
  load: () => import('./sim.js'),
};
