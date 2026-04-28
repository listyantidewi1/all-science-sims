export default {
  id: 'npv',
  subject: 'finance',
  title: { en: 'NPV / Discounted Cash Flow', id: 'NPV / Arus Kas Terdiskonto' },
  description: {
    en: 'A project pays out cash flows over the next N years. Today\'s value is each one divided by (1+r)ⁿ. The discount rate slider lets you instantly tell whether a project is worth it — and find the rate at which it\'s break-even (the IRR).',
    id: 'Sebuah proyek menghasilkan arus kas selama N tahun mendatang. Nilai hari ini = tiap arus dibagi (1+r)ⁿ. Slider tingkat diskonto langsung memberi tahu apakah proyek layak — dan menemukan tingkat impas (IRR).',
  },
  objectives: {
    en: [
      'Apply NPV = Σ CF_t / (1+r)^t.',
      'Identify IRR as the rate that makes NPV = 0.',
      'Distinguish "negative now, positive later" projects from "positive now, negative later".',
    ],
    id: [
      'Menerapkan NPV = Σ CF_t / (1+r)^t.',
      'Mengenali IRR sebagai tingkat yang membuat NPV = 0.',
      'Membedakan proyek "negatif sekarang, positif nanti" dari "positif sekarang, negatif nanti".',
    ],
  },
  tryThis: {
    en: [
      'Initial investment $1000, $300/year for 5 years — what is NPV at 8%?',
      'Find the discount rate where NPV = 0 (the IRR).',
      'Push rate to 30% — does NPV go negative?',
    ],
    id: [
      'Investasi awal Rp10jt, kas masuk Rp3jt/tahun selama 5 tahun — berapa NPV pada 8%?',
      'Cari tingkat diskonto di mana NPV = 0 (IRR).',
      'Naikkan tingkat ke 30% — apakah NPV jadi negatif?',
    ],
  },
  topics: ['valuation', 'corporate-finance'],
  load: () => import('./sim.js'),
};
