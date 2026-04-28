export default {
  id: 'time-series',
  subject: 'data-science',
  title: { en: 'Time Series Smoothing', id: 'Penghalusan Deret Waktu' },
  description: {
    en: 'Noisy data over time. Compare moving average, exponential smoothing (EMA), and Savitzky-Golay filter on the same series. Each strikes a different bargain between responsiveness and noise rejection.',
    id: 'Data berisik sepanjang waktu. Bandingkan rata-rata bergerak, penghalusan eksponensial (EMA), dan filter Savitzky-Golay pada deret yang sama. Tiap metode menukar respons dengan penolakan derau secara berbeda.',
  },
  objectives: {
    en: [
      'See lag introduced by larger windows.',
      'Compare moving-average vs EMA characteristics.',
      "Recognize a smoothing trade-off: noise rejection vs responsiveness.",
    ],
    id: [
      'Melihat lag yang diperkenalkan oleh jendela yang lebih besar.',
      'Membandingkan ciri rata-rata bergerak vs EMA.',
      'Mengenali trade-off penghalusan: penolakan derau vs responsivitas.',
    ],
  },
  tryThis: {
    en: [
      'Window 5 vs 20 — does lag increase?',
      'EMA α = 0.05 — very smooth but laggy?',
      'Add a step function — see how each smoother reacts.',
    ],
    id: [
      'Jendela 5 vs 20 — apakah lag meningkat?',
      'EMA α = 0,05 — sangat halus tapi lag besar?',
      'Tambahkan fungsi langkah — amati reaksi tiap penghalus.',
    ],
  },
  topics: ['time-series', 'signal-processing'],
  load: () => import('./sim.js'),
};
