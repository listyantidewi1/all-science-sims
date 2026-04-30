export default {
  id: 'distributions',
  subject: 'data-science',
  title: { en: 'Distribution Explorer', id: 'Penjelajah Distribusi' },
  description: {
    en: 'Sample from normal, uniform, exponential, and binomial distributions and watch the histogram converge on the true PDF as you draw more samples.',
    id: 'Sampling dari distribusi normal, uniform, eksponensial, dan binomial lalu amati histogram menyatu menuju PDF sejati ketika sampel ditambahkan.',
  },
  objectives: {
    en: [
      'Recognize the shape of common distributions.',
      'Predict how mean and standard deviation change a normal\'s shape.',
      'See how sample size affects how close a histogram matches the true PDF.',
    ],
    id: [
      'Mengenali bentuk distribusi yang umum.',
      'Memprediksi pengaruh rata-rata dan simpangan baku terhadap bentuk distribusi normal.',
      'Melihat bagaimana ukuran sampel memengaruhi kedekatan histogram dengan PDF sejati.',
    ],
  },
  tryThis: {
    en: [
      'Set σ = 0.1 vs σ = 2 — how does spread change?',
      'Switch to exponential — does the histogram peak match λ?',
      'Drop sample count to 50 — how noisy is the histogram?',
    ],
    id: [
      'Atur σ = 0,1 vs σ = 2 — bagaimana lebar distribusinya berubah?',
      'Beralih ke eksponensial — apakah puncak histogram sesuai λ?',
      'Turunkan jumlah sampel ke 50 — seberapa berisik histogramnya?',
    ],
  },
  topics: ['statistics', 'probability'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
