export default {
  id: 'linear-programming',
  subject: 'mathematics',
  title: { en: 'Linear Programming', id: 'Program Linear' },
  description: {
    en: 'Set up to four linear constraints ax + by ≤ c with sliders and watch the feasible region appear as the shaded overlap of their half-planes. Add an objective z = px + qy, drag its level line across the region and see that the best value is always reached at a corner. The corner points are listed with their z values, the optimum is highlighted, and a bakery preset turns a word problem about bread, cake, flour and sugar into a graph.',
    id: 'Atur hingga empat kendala linear ax + by ≤ c dengan penggeser dan lihat daerah penyelesaian muncul sebagai irisan berbayang dari setengah bidangnya. Tambahkan fungsi tujuan z = px + qy, seret garis selidiknya melintasi daerah itu dan lihat bahwa nilai terbaik selalu dicapai di titik pojok. Titik-titik pojok dicantumkan beserta nilai z-nya, nilai optimum ditandai, dan prasetel toko roti mengubah soal cerita tentang roti, kue, tepung dan gula menjadi grafik.',
  },
  topics: ['linear inequalities', 'systems of inequalities', 'feasible region', 'optimization', 'objective function'],
  grade: [10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
