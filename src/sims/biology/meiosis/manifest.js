export default {
  id: 'meiosis',
  subject: 'biology',
  title: { en: 'Meiosis', id: 'Meiosis' },
  description: {
    en: 'Step through meiosis I and II — the cell division that makes haploid gametes from a diploid parent. Watch homologous chromosomes pair, cross over, separate, then sister chromatids split. Four cells emerge, each with half the chromosome count and a unique genetic mix.',
    id: 'Telusuri meiosis I dan II — pembelahan sel yang menghasilkan gamet haploid dari induk diploid. Amati kromosom homolog berpasangan, menyilang, berpisah, lalu kromatid kakak terbelah. Empat sel muncul, masing-masing dengan jumlah kromosom separuh dan campuran genetik unik.',
  },
  details: () => import('./details.js'),
  topics: ['cell-biology', 'genetics'],
  load: () => import('./sim.js'),
};
