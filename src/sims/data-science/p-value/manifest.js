export default {
  id: 'p-value',
  subject: 'data-science',
  title: { en: 'p-value & Hypothesis Testing', id: 'p-value & Uji Hipotesis' },
  description: {
    en: 'A null hypothesis says "no effect" — the test statistic comes from a known distribution. Drag the observed statistic and watch the tail probability (the p-value) update. Toggle between one-tailed and two-tailed tests. The α threshold is shown as a shaded rejection region.',
    id: 'Hipotesis nol berkata "tanpa efek" — statistik uji berasal dari distribusi tertentu. Tarik statistik teramati dan amati probabilitas ekor (p-value) terbarui. Aktifkan uji satu-arah atau dua-arah. Ambang α ditampilkan sebagai daerah penolakan terbayang.',
  },
  objectives: {
    en: [
      'Read p-value as the area in the tail beyond the observed statistic.',
      'Distinguish one-tailed vs two-tailed.',
      'See that "p < 0.05" means observed is in the α=0.05 rejection region.',
    ],
    id: [
      'Membaca p-value sebagai luas ekor di luar statistik teramati.',
      'Membedakan satu-arah vs dua-arah.',
      'Melihat bahwa "p < 0,05" berarti teramati di daerah penolakan α=0,05.',
    ],
  },
  tryThis: {
    en: [
      'z = 1.65 (one-tailed) — p ≈ 0.05.',
      'z = 1.96 (two-tailed) — p ≈ 0.05.',
      'z = 3 — p ≈ 0.001 (very strong evidence).',
    ],
    id: [
      'z = 1,65 (satu-arah) — p ≈ 0,05.',
      'z = 1,96 (dua-arah) — p ≈ 0,05.',
      'z = 3 — p ≈ 0,001 (bukti sangat kuat).',
    ],
  },
  topics: ['statistics', 'inference'],
  load: () => import('./sim.js'),
};
