export default {
  id: 'venn-diagrams',
  subject: 'mathematics',
  title: { en: 'Venn Diagrams', id: 'Diagram Venn' },
  description: {
    en: 'Three overlapping sets create seven regions plus the universal background. Click any region to highlight it; the corresponding set-builder expression is generated automatically. Try the seven canonical operations (union, intersection, difference, symmetric difference, complement, …) and see them render across the diagram.',
    id: 'Tiga himpunan tumpang tindih menciptakan tujuh wilayah plus latar universal. Klik wilayah mana pun untuk menyorotnya; ekspresi set-builder terbentuk otomatis. Coba tujuh operasi kanonik (gabungan, irisan, selisih, simetris, komplemen, …) dan lihat hasilnya.',
  },
  details: () => import('./details.js'),
  topics: ['set-theory'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
