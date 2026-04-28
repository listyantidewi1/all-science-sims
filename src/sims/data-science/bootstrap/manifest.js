export default {
  id: 'bootstrap',
  subject: 'data-science',
  title: { en: 'Bootstrap Resampling', id: 'Resampling Bootstrap' },
  description: {
    en: 'You have one small sample. To estimate uncertainty in a statistic, resample WITH REPLACEMENT thousands of times and look at the spread of the statistic across resamples. Watch a confidence interval for the mean assemble itself, no theoretical math required.',
    id: 'Anda punya satu sampel kecil. Untuk memperkirakan ketakpastian sebuah statistik, lakukan resampling DENGAN PENGEMBALIAN ribuan kali dan amati sebaran statistiknya. Saksikan interval kepercayaan untuk rata-rata terbentuk sendiri, tanpa matematika teoritis.',
  },
  objectives: {
    en: [
      'Apply non-parametric uncertainty estimation.',
      'Read 95% CI from the 2.5th–97.5th percentile of bootstrap means.',
      'Compare to the parametric formula s/√n.',
    ],
    id: [
      'Menerapkan estimasi ketakpastian non-parametrik.',
      'Membaca 95% CI dari persentil 2,5–97,5 rata-rata bootstrap.',
      'Membandingkan dengan rumus parametrik s/√n.',
    ],
  },
  tryThis: {
    en: [
      'Sample size 10 — wide CI?',
      'Sample size 100 — does CI shrink as 1/√n?',
      "Compare bootstrap CI to s/√n — they should be similar.",
    ],
    id: [
      'Ukuran sampel 10 — CI lebar?',
      'Ukuran sampel 100 — apakah CI menyusut sebagai 1/√n?',
      'Bandingkan CI bootstrap dengan s/√n — seharusnya mirip.',
    ],
  },
  topics: ['statistics', 'inference'],
  load: () => import('./sim.js'),
};
