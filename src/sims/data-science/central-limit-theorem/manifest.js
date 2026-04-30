export default {
  id: 'central-limit-theorem',
  subject: 'data-science',
  title: { en: 'Central Limit Theorem', id: 'Teorema Limit Pusat' },
  description: {
    en: 'Pick a wild parent distribution — uniform, exponential, even bimodal — then watch sample means pile into a beautifully Gaussian shape as the sample size grows. The CLT in motion.',
    id: 'Pilih distribusi induk yang ekstrem — uniform, eksponensial, atau bimodal — lalu amati rata-rata sampel membentuk distribusi Gauss yang rapi seiring bertambahnya ukuran sampel. CLT di depan mata.',
  },
  objectives: {
    en: [
      'See that sampling distributions of the mean become roughly normal regardless of parent shape.',
      'Notice how variance shrinks as 1/n.',
      'Estimate when n is "large enough" for the CLT to look clean.',
    ],
    id: [
      'Melihat distribusi rata-rata sampel mendekati normal terlepas dari bentuk induknya.',
      'Mengamati varian menyusut sebanding 1/n.',
      'Memperkirakan kapan n "cukup besar" agar CLT terlihat rapi.',
    ],
  },
  tryThis: {
    en: [
      'Set parent to bimodal and n=2 — does the mean histogram still look bimodal?',
      'Crank n to 30 with exponential — is it Gaussian-ish yet?',
      'Increase samples per second and watch the histogram converge fast.',
    ],
    id: [
      'Atur induk bimodal dan n=2 — apakah histogram rata-rata tetap bimodal?',
      'Naikkan n ke 30 dengan distribusi eksponensial — sudah seperti Gauss?',
      'Tingkatkan sampel per detik dan amati histogram menyatu cepat.',
    ],
  },
  topics: ['statistics', 'sampling'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
