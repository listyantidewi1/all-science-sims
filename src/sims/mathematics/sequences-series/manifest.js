export default {
  id: 'sequences-series',
  subject: 'mathematics',
  title: { en: 'Sequences and Series', id: 'Barisan dan Deret' },
  description: {
    en: 'Build an arithmetic or geometric sequence from its first term and its difference or ratio, and watch the terms grow as bars and as points on a graph while the partial sum S_n is computed from the formula. Then switch to finance mode: compare simple and compound interest side by side, and explore how the interest rate and the number of periods change the monthly payment of a loan or annuity.',
    id: 'Bangun barisan aritmetika atau geometri dari suku pertama dan beda atau rasionya, lalu amati suku-sukunya tumbuh sebagai batang dan sebagai titik pada grafik sementara jumlah parsial S_n dihitung dari rumus. Kemudian beralih ke mode keuangan: bandingkan bunga tunggal dan bunga majemuk berdampingan, dan selidiki bagaimana suku bunga serta banyak periode mengubah angsuran sebuah pinjaman atau anuitas.',
  },
  topics: ['sequences', 'series', 'arithmetic', 'geometric', 'compound interest', 'annuity'],
  grade: [10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
