export default {
  id: 'bootstrap',
  subject: 'data-science',
  title: { en: 'Bootstrap Resampling', id: 'Resampling Bootstrap' },
  description: {
    en: 'You have one small sample. To estimate uncertainty in a statistic, resample WITH REPLACEMENT thousands of times and look at the spread of the statistic across resamples. Watch a confidence interval for the mean assemble itself, no theoretical math required.',
    id: 'Anda punya satu sampel kecil. Untuk memperkirakan ketakpastian sebuah statistik, lakukan resampling DENGAN PENGEMBALIAN ribuan kali dan amati sebaran statistiknya. Saksikan interval kepercayaan untuk rata-rata terbentuk sendiri, tanpa matematika teoritis.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'inference'],
  hasLab: true,
  load: () => import('./sim.js'),
};
