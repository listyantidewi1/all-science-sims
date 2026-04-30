export default {
  id: 'venn-diagrams',
  subject: 'mathematics',
  title: { en: 'Venn Diagrams', id: 'Diagram Venn' },
  description: {
    en: 'Three overlapping sets create seven regions plus the universal background. Click any region to highlight it; the corresponding set-builder expression is generated automatically. Try the seven canonical operations (union, intersection, difference, symmetric difference, complement, …) and see them render across the diagram.',
    id: 'Tiga himpunan tumpang tindih menciptakan tujuh wilayah plus latar universal. Klik wilayah mana pun untuk menyorotnya; ekspresi set-builder terbentuk otomatis. Coba tujuh operasi kanonik (gabungan, irisan, selisih, simetris, komplemen, …) dan lihat hasilnya.',
  },
  objectives: {
    en: [
      'Identify the seven regions of a 3-set Venn diagram.',
      'Connect set-builder notation to the visual region.',
      'Apply De Morgan\'s laws and inclusion-exclusion.',
    ],
    id: [
      'Mengidentifikasi tujuh wilayah pada diagram Venn 3-himpunan.',
      'Menghubungkan notasi set-builder dengan wilayah visual.',
      'Menerapkan hukum De Morgan dan inklusi-eksklusi.',
    ],
  },
  tryThis: {
    en: [
      'A ∪ B ∪ C — the entire colored region.',
      'A ∩ B ∩ C — only the central petal.',
      'A − (B ∪ C) — the part of A that overlaps neither.',
    ],
    id: [
      'A ∪ B ∪ C — seluruh area berwarna.',
      'A ∩ B ∩ C — hanya kelopak tengah.',
      'A − (B ∪ C) — bagian A yang tidak tumpang tindih.',
    ],
  },
  topics: ['set-theory'],
  load: () => import('./sim.js'),
};
