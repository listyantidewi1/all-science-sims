export default {
  id: 'inequality',
  subject: 'social-science',
  title: { en: 'Inequality & Lorenz Curve', id: 'Ketimpangan & Kurva Lorenz' },
  description: {
    en: 'Sort a population by income and the Lorenz curve traces "what fraction of total income does the bottom X% earn?". The Gini coefficient is just twice the area between that curve and equality.',
    id: 'Urutkan populasi berdasarkan pendapatan dan kurva Lorenz menggambar "berapa fraksi pendapatan total yang dimiliki X% terbawah?". Koefisien Gini hanyalah dua kali luas antara kurva itu dan garis kesetaraan.',
  },
  objectives: {
    en: [
      'Read income share at any population percentile.',
      'Connect Gini = 0 to equality and Gini = 1 to one-takes-all.',
      'Compare distribution shapes (uniform, exponential, Pareto).',
    ],
    id: [
      'Membaca pangsa pendapatan pada persentil populasi mana pun.',
      'Mengaitkan Gini = 0 dengan kesetaraan dan Gini = 1 dengan monopoli total.',
      'Membandingkan bentuk distribusi (uniform, eksponensial, Pareto).',
    ],
  },
  tryThis: {
    en: [
      'Switch from uniform to Pareto — does Gini jump?',
      'Drag any individual\'s income up — see the curve bend.',
      'How rich would the top 1% be at Gini = 0.6?',
    ],
    id: [
      'Beralih dari uniform ke Pareto — apakah Gini melonjak?',
      'Geser pendapatan satu individu naik — kurva ikut menekuk.',
      'Seberapa kaya 1% teratas pada Gini = 0,6?',
    ],
  },
  topics: ['economics', 'inequality'],
  load: () => import('./sim.js'),
};
