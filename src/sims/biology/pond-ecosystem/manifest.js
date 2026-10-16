export default {
  id: 'pond-ecosystem',
  subject: 'biology',
  title: { en: 'Pond Life', id: 'Kehidupan Kolam' },
  description: {
    en: 'A pond is a small world. Sunlight, water temperature and clean water are the non-living parts. Algae, water fleas, small fish and big fish are the living parts, and each one eats the one before it. Move the sliders and watch the populations rise and fall over the days. Try the "what happens if…" presets: a cloudy week, a hot summer, a fertiliser spill.',
    id: 'Kolam adalah dunia kecil. Sinar matahari, suhu air, dan air bersih adalah komponen tak hidup. Alga, kutu air, ikan kecil, dan ikan besar adalah komponen hidup, dan masing-masing memakan yang sebelumnya. Geser pengaturnya dan lihat jumlah makhluk hidup naik dan turun dari hari ke hari. Coba pilihan "apa yang terjadi jika…": minggu mendung, musim panas terik, tumpahan pupuk.',
  },
  topics: ['ecosystem', 'food chain', 'biotic and abiotic', 'pollution'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
