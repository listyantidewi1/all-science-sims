export default {
  id: 'auctions',
  subject: 'finance',
  title: { en: 'First-Price vs Second-Price Auctions', id: 'Lelang Harga Pertama vs Kedua' },
  description: {
    en: 'A treasure with random private values is auctioned to N bidders. Run thousands of rounds to compare first-price (winner pays their own bid) and second-price (winner pays the runner-up bid). The famous Vickrey result: in second-price, bidding your true value is dominant.',
    id: 'Sebuah harta dengan nilai pribadi acak dilelang ke N peserta. Jalankan ribuan putaran untuk membandingkan harga pertama (pemenang bayar tawarannya sendiri) dan harga kedua (pemenang bayar tawaran runner-up). Hasil Vickrey terkenal: pada harga kedua, menawar nilai sejati adalah strategi dominan.',
  },
  objectives: {
    en: [
      'Distinguish first-price from second-price (Vickrey) auctions.',
      'See bidders shade bids in first-price auctions.',
      "Verify that revenue equivalence roughly holds in expectation.",
    ],
    id: [
      'Membedakan lelang harga pertama dari harga kedua (Vickrey).',
      'Melihat penawar menahan tawaran pada lelang harga pertama.',
      'Memverifikasi bahwa kesetaraan pendapatan kira-kira berlaku di harapan.',
    ],
  },
  tryThis: {
    en: [
      'N=2 bidders — average revenue should match in both formats.',
      'N=10 — does first-price approach valuation?',
      'Try truth-telling in first-price — does it win less revenue?',
    ],
    id: [
      'N=2 penawar — pendapatan rata-rata sama di kedua format.',
      'N=10 — apakah harga pertama mendekati nilai sejati?',
      'Coba jujur di harga pertama — apakah pendapatan turun?',
    ],
  },
  topics: ['game-theory', 'mechanism-design'],
  load: () => import('./sim.js'),
};
