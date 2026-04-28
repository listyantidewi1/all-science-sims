export default {
  id: 'bond-pricing',
  subject: 'finance',
  title: { en: 'Bond Pricing & Yield Curve', id: 'Penetapan Harga Obligasi & Kurva Yield' },
  description: {
    en: 'A bond is a stream of coupon payments + a face-value repayment. Slide the market yield and watch the price seesaw against it. Plot the same coupon at different maturities and a yield curve falls out.',
    id: 'Obligasi adalah aliran kupon + pembayaran nilai nominal di akhir. Atur yield pasar dan amati harga bergerak berlawanan. Plot kupon yang sama pada berbagai tenor dan kurva yield muncul.',
  },
  objectives: {
    en: [
      'Compute price = sum of discounted cash flows.',
      'See the inverse relationship: yield up → price down.',
      'Distinguish discount, par, and premium bonds.',
    ],
    id: [
      'Menghitung harga = jumlah arus kas yang didiskonto.',
      'Melihat hubungan terbalik: yield naik → harga turun.',
      'Membedakan obligasi diskon, par, dan premium.',
    ],
  },
  tryThis: {
    en: [
      'Coupon = yield → price equals par ($1000).',
      'Yield jumps from 4% to 6% — how much does a 10-year bond drop?',
      'Drop coupon to 0 — what is a zero-coupon bond worth?',
    ],
    id: [
      'Kupon = yield → harga sama dengan nilai nominal (Rp1.000.000).',
      'Yield naik dari 4% ke 6% — berapa harga obligasi 10-tahun turun?',
      'Turunkan kupon ke 0 — berapa harga obligasi tanpa kupon?',
    ],
  },
  topics: ['bonds', 'fixed-income'],
  load: () => import('./sim.js'),
};
