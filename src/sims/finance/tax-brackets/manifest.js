export default {
  id: 'tax-brackets',
  subject: 'finance',
  title: { en: 'Progressive Tax Brackets', id: 'Tarif Pajak Progresif' },
  description: {
    en: "Slide your income through a progressive tax schedule. The marginal rate (your next dollar) and the effective rate (your average) are usually different — and people confuse them all the time.",
    id: 'Geser pendapatan Anda melalui jadwal pajak progresif. Tarif marginal (untuk Rp berikutnya) dan tarif efektif (rata-rata) biasanya berbeda — dan orang sering keliru.',
  },
  details: () => import('./details.js'),
  topics: ['tax', 'public-finance'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
