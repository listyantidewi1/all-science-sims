export default {
  id: 'time-series',
  subject: 'data-science',
  title: { en: 'Time Series Smoothing', id: 'Penghalusan Deret Waktu' },
  description: {
    en: 'Noisy data over time. Compare moving average, exponential smoothing (EMA), and Savitzky-Golay filter on the same series. Each strikes a different bargain between responsiveness and noise rejection.',
    id: 'Data berisik sepanjang waktu. Bandingkan rata-rata bergerak, penghalusan eksponensial (EMA), dan filter Savitzky-Golay pada deret yang sama. Tiap metode menukar respons dengan penolakan derau secara berbeda.',
  },
  details: () => import('./details.js'),
  topics: ['time-series', 'signal-processing'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
