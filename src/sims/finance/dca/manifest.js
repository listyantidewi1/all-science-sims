export default {
  id: 'dca',
  subject: 'finance',
  title: { en: 'Dollar-Cost Averaging vs Lump Sum', id: 'Dollar-Cost Averaging vs Lump Sum' },
  description: {
    en: 'You have $12,000 to invest. Drop it all in today, or spread $1,000/month for a year? Run hundreds of simulated stock paths and see which strategy wins more often — and by how much.',
    id: 'Anda punya Rp120jt. Investasikan semuanya hari ini, atau cicil Rp10jt/bulan selama setahun? Jalankan ratusan simulasi pasar dan lihat strategi mana yang lebih sering menang — dan seberapa banyak.',
  },
  details: () => import('./details.js'),
  topics: ['investing', 'strategy'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
