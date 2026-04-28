export default {
  id: 'tax-accounts',
  subject: 'finance',
  title: { en: 'Tax-Advantaged Accounts', id: 'Akun dengan Keringanan Pajak' },
  description: {
    en: 'You contribute $5,000/year for 30 years. Compare three accounts: taxable brokerage (taxed yearly), traditional 401(k) / pre-tax (taxed at withdrawal), and Roth (taxed up front, never again). The differences are stark — and depend on your tax brackets now vs in retirement.',
    id: 'Anda menyetor Rp50jt/tahun selama 30 tahun. Bandingkan tiga akun: brokerage kena pajak (dipajak tiap tahun), tradisional 401(k) / pra-pajak (dipajak saat penarikan), dan Roth (dipajak di depan, tidak lagi). Perbedaannya tajam — dan bergantung pada bracket pajak Anda sekarang vs saat pensiun.',
  },
  objectives: {
    en: [
      'Compare taxable, pre-tax (Trad), and Roth growth over 30 years.',
      'See why "tax now vs tax later" depends on your future tax bracket.',
      'Recognize the drag of annual taxes in a taxable account.',
    ],
    id: [
      'Membandingkan pertumbuhan akun kena pajak, pra-pajak (Trad), dan Roth selama 30 tahun.',
      'Melihat mengapa "pajak sekarang vs nanti" bergantung pada bracket masa depan.',
      'Mengenali beban pajak tahunan pada akun kena pajak.',
    ],
  },
  tryThis: {
    en: [
      'Same tax bracket now and later — Trad and Roth tie.',
      'Lower bracket in retirement — Trad wins.',
      'Higher bracket in retirement — Roth wins.',
    ],
    id: [
      'Bracket pajak sekarang dan nanti sama — Trad dan Roth seri.',
      'Bracket lebih rendah saat pensiun — Trad menang.',
      'Bracket lebih tinggi saat pensiun — Roth menang.',
    ],
  },
  topics: ['retirement', 'tax-planning'],
  load: () => import('./sim.js'),
};
