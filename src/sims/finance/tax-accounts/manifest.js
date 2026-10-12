export default {
  id: 'tax-accounts',
  subject: 'finance',
  title: { en: 'Tax-Advantaged Accounts', id: 'Akun dengan Keringanan Pajak' },
  description: {
    en: 'You contribute $5,000/year for 30 years. Compare three accounts: taxable brokerage (taxed yearly), traditional 401(k) / pre-tax (taxed at withdrawal), and Roth (taxed up front, never again). The differences are stark — and depend on your tax brackets now vs in retirement.',
    id: 'Anda menyetor Rp50jt/tahun selama 30 tahun. Bandingkan tiga akun: brokerage kena pajak (dipajak tiap tahun), tradisional 401(k) / pra-pajak (dipajak saat penarikan), dan Roth (dipajak di depan, tidak lagi). Perbedaannya tajam — dan bergantung pada bracket pajak Anda sekarang vs saat pensiun.',
  },
  details: () => import('./details.js'),
  topics: ['retirement', 'tax-planning'],
  load: () => import('./sim.js'),
};
