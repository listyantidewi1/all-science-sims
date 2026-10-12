export default {
  id: 'auctions',
  subject: 'finance',
  title: { en: 'First-Price vs Second-Price Auctions', id: 'Lelang Harga Pertama vs Kedua' },
  description: {
    en: 'A treasure with random private values is auctioned to N bidders. Run thousands of rounds to compare first-price (winner pays their own bid) and second-price (winner pays the runner-up bid). The famous Vickrey result: in second-price, bidding your true value is dominant.',
    id: 'Sebuah harta dengan nilai pribadi acak dilelang ke N peserta. Jalankan ribuan putaran untuk membandingkan harga pertama (pemenang bayar tawarannya sendiri) dan harga kedua (pemenang bayar tawaran runner-up). Hasil Vickrey terkenal: pada harga kedua, menawar nilai sejati adalah strategi dominan.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'mechanism-design'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
