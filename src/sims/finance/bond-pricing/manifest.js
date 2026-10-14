export default {
  id: 'bond-pricing',
  subject: 'finance',
  title: { en: 'Bond Pricing & Maturity', id: 'Penetapan Harga Obligasi & Tenor' },
  description: {
    en: 'A bond is a stream of coupon payments + a face-value repayment. Slide the market yield and watch the price seesaw against it. Plot the same coupon at maturities from 1 to 30 years and see how longer bonds swing further from par.',
    id: 'Obligasi adalah aliran kupon + pembayaran nilai nominal di akhir. Atur yield pasar dan amati harga bergerak berlawanan. Plot kupon yang sama pada tenor 1 sampai 30 tahun dan lihat obligasi yang lebih panjang menyimpang lebih jauh dari nilai nominal.',
  },
  details: () => import('./details.js'),
  topics: ['bonds', 'fixed-income'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
