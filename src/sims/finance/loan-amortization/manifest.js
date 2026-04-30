export default {
  id: 'loan-amortization',
  subject: 'finance',
  title: { en: 'Loan Amortization', id: 'Amortisasi Pinjaman' },
  description: {
    en: 'A mortgage or auto loan with fixed monthly payments. Each payment splits between interest (huge at first, tiny at the end) and principal. Slide rate and term to see total interest paid skyrocket.',
    id: 'KPR atau cicilan kendaraan dengan angsuran bulanan tetap. Tiap pembayaran terbagi antara bunga (besar di awal, kecil di akhir) dan pokok. Atur suku bunga dan jangka waktu untuk melihat total bunga membengkak.',
  },
  objectives: {
    en: [
      'Apply the amortization formula M = P · r(1+r)ⁿ / ((1+r)ⁿ−1).',
      'See how early payments are mostly interest.',
      'Compare 15- vs 30-year terms total cost.',
    ],
    id: [
      'Menerapkan rumus amortisasi M = P · r(1+r)ⁿ / ((1+r)ⁿ−1).',
      'Melihat pembayaran awal sebagian besar adalah bunga.',
      'Membandingkan total biaya jangka 15 vs 30 tahun.',
    ],
  },
  tryThis: {
    en: [
      '$300k at 6% for 30 years — total interest paid?',
      'Same loan, 15 years — interest savings?',
      'Drop rate to 3% — how much does monthly payment fall?',
    ],
    id: [
      'Rp3 M pada 6% selama 30 tahun — total bunganya berapa?',
      'Pinjaman sama, 15 tahun — penghematan bunganya?',
      'Turunkan ke 3% — seberapa turun angsuran bulanannya?',
    ],
  },
  topics: ['loans', 'mortgage'],
  hasLab: true,
  load: () => import('./sim.js'),
};
