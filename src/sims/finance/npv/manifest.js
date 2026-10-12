export default {
  id: 'npv',
  subject: 'finance',
  title: { en: 'NPV / Discounted Cash Flow', id: 'NPV / Arus Kas Terdiskonto' },
  description: {
    en: 'A project pays out cash flows over the next N years. Today\'s value is each one divided by (1+r)ⁿ. The discount rate slider lets you instantly tell whether a project is worth it — and find the rate at which it\'s break-even (the IRR).',
    id: 'Sebuah proyek menghasilkan arus kas selama N tahun mendatang. Nilai hari ini = tiap arus dibagi (1+r)ⁿ. Slider tingkat diskonto langsung memberi tahu apakah proyek layak — dan menemukan tingkat impas (IRR).',
  },
  details: () => import('./details.js'),
  topics: ['valuation', 'corporate-finance'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
