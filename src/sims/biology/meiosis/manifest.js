export default {
  id: 'meiosis',
  subject: 'biology',
  title: { en: 'Meiosis', id: 'Meiosis' },
  description: {
    en: 'Step through meiosis I and II — the cell division that makes haploid gametes from a diploid parent. Watch homologous chromosomes pair, cross over, separate, then sister chromatids split. Four cells emerge, each with half the chromosome count and a unique genetic mix.',
    id: 'Telusuri meiosis I dan II — pembelahan sel yang menghasilkan gamet haploid dari induk diploid. Amati kromosom homolog berpasangan, menyilang, berpisah, lalu kromatid kakak terbelah. Empat sel muncul, masing-masing dengan jumlah kromosom separuh dan campuran genetik unik.',
  },
  objectives: {
    en: [
      'Identify the 8 phases: prophase I → telophase II.',
      'See how crossing over (chiasmata) creates genetic recombination.',
      'Understand independent assortment: each gamete is a unique mix.',
    ],
    id: [
      'Mengidentifikasi 8 fase: profase I → telofase II.',
      'Melihat pindah silang (kiasmata) menghasilkan rekombinasi genetik.',
      'Memahami pengelompokan bebas: tiap gamet adalah campuran unik.',
    ],
  },
  tryThis: {
    en: [
      'Step through phase by phase to see chromosome behavior.',
      'Toggle "show recombination" to highlight crossover events.',
      'Compare to mitosis (single division → 2 identical diploid cells).',
    ],
    id: [
      'Telusuri fase demi fase untuk melihat perilaku kromosom.',
      'Aktifkan "tampilkan rekombinasi" untuk menyorot peristiwa pindah silang.',
      'Bandingkan dengan mitosis (satu pembelahan → 2 sel diploid identik).',
    ],
  },
  topics: ['cell-biology', 'genetics'],
  load: () => import('./sim.js'),
};
