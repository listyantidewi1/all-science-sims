export default {
  id: 'time-series',
  subject: 'data-science',
  title: { en: 'Time Series Smoothing', id: 'Penghalusan Deret Waktu' },
  description: {
    en: 'Noisy data over time. Compare a centred or trailing moving average with exponential smoothing (EMA) on the same series. Each strikes a different bargain between noise rejection, lag and responsiveness.',
    id: 'Data berisik sepanjang waktu. Bandingkan rata-rata bergerak terpusat atau membuntut dengan penghalusan eksponensial (EMA) pada deret yang sama. Tiap metode menukar penolakan derau, lag, dan respons secara berbeda.',
  },
  details: () => import('./details.js'),
  topics: ['time-series', 'signal-processing'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
