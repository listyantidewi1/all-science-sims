export default {
  id: 'inequality',
  subject: 'social-science',
  title: { en: 'Inequality & Lorenz Curve', id: 'Ketimpangan & Kurva Lorenz' },
  description: {
    en: 'Sort a population by income and the Lorenz curve traces "what fraction of total income does the bottom X% earn?". The Gini coefficient is just twice the area between that curve and equality.',
    id: 'Urutkan populasi berdasarkan pendapatan dan kurva Lorenz menggambar "berapa fraksi pendapatan total yang dimiliki X% terbawah?". Koefisien Gini hanyalah dua kali luas antara kurva itu dan garis kesetaraan.',
  },
  details: () => import('./details.js'),
  topics: ['economics', 'inequality'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
