export default {
  id: 'yard-sale',
  subject: 'social-science',
  title: { en: 'Yard-Sale Wealth Model', id: 'Model Kekayaan Yard-Sale' },
  description: {
    en: 'Two random people meet, flip a fair coin, and exchange a small fraction of the poorer one\'s wealth. Repeat thousands of times. Even with perfectly fair trades and no luck differential, all wealth ends up in one person\'s hands. Inequality, from nothing.',
    id: 'Dua orang acak bertemu, melempar koin adil, dan menukar sebagian kecil kekayaan yang lebih miskin. Ulangi ribuan kali. Bahkan dengan transaksi adil sempurna tanpa keberuntungan beda, seluruh kekayaan berakhir di satu orang. Ketimpangan, dari ketiadaan.',
  },
  details: () => import('./details.js'),
  topics: ['economics', 'inequality'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
