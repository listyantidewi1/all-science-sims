export default {
  id: 'p-value',
  subject: 'data-science',
  title: { en: 'p-value & Hypothesis Testing', id: 'p-value & Uji Hipotesis' },
  description: {
    en: 'A null hypothesis says "no effect" — the test statistic comes from a known distribution. Drag the observed statistic and watch the tail probability (the p-value) update. Toggle between one-tailed and two-tailed tests. The α threshold is shown as a shaded rejection region.',
    id: 'Hipotesis nol berkata "tanpa efek" — statistik uji berasal dari distribusi tertentu. Tarik statistik teramati dan amati probabilitas ekor (p-value) terbarui. Aktifkan uji satu-arah atau dua-arah. Ambang α ditampilkan sebagai daerah penolakan terbayang.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'inference'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
