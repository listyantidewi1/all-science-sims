export default {
  id: 'loan-amortization',
  subject: 'finance',
  title: { en: 'Loan Amortization', id: 'Amortisasi Pinjaman' },
  description: {
    en: 'A mortgage or auto loan with fixed monthly payments. Each payment splits between interest (huge at first, tiny at the end) and principal. Slide rate and term to see total interest paid skyrocket.',
    id: 'KPR atau cicilan kendaraan dengan angsuran bulanan tetap. Tiap pembayaran terbagi antara bunga (besar di awal, kecil di akhir) dan pokok. Atur suku bunga dan jangka waktu untuk melihat total bunga membengkak.',
  },
  details: () => import('./details.js'),
  topics: ['loans', 'mortgage'],
  hasLab: true,
  load: () => import('./sim.js'),
};
