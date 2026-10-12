export default {
  id: 'central-limit-theorem',
  subject: 'data-science',
  title: { en: 'Central Limit Theorem', id: 'Teorema Limit Pusat' },
  description: {
    en: 'Pick a wild parent distribution — uniform, exponential, even bimodal — then watch sample means pile into a beautifully Gaussian shape as the sample size grows. The CLT in motion.',
    id: 'Pilih distribusi induk yang ekstrem — uniform, eksponensial, atau bimodal — lalu amati rata-rata sampel membentuk distribusi Gauss yang rapi seiring bertambahnya ukuran sampel. CLT di depan mata.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'sampling'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
