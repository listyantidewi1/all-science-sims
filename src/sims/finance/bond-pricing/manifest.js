export default {
  id: 'bond-pricing',
  subject: 'finance',
  title: { en: 'Bond Pricing & Yield Curve', id: 'Penetapan Harga Obligasi & Kurva Yield' },
  description: {
    en: 'A bond is a stream of coupon payments + a face-value repayment. Slide the market yield and watch the price seesaw against it. Plot the same coupon at different maturities and a yield curve falls out.',
    id: 'Obligasi adalah aliran kupon + pembayaran nilai nominal di akhir. Atur yield pasar dan amati harga bergerak berlawanan. Plot kupon yang sama pada berbagai tenor dan kurva yield muncul.',
  },
  details: () => import('./details.js'),
  topics: ['bonds', 'fixed-income'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
