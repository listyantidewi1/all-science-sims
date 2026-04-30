export default {
  id: 'energy-mix',
  subject: 'climate',
  title: { en: 'Energy Mix Optimizer', id: 'Pengoptimal Bauran Energi' },
  description: {
    en: 'Allocate the world\'s electricity between coal, gas, nuclear, hydro, wind, and solar. The dashboard updates CO₂ emissions, average cost, and reliability — three axes you cannot maximize all at once. There\'s no single right answer, just trade-offs you have to choose between.',
    id: 'Alokasikan listrik dunia antara batubara, gas, nuklir, hidro, angin, dan surya. Dasbor memperbarui emisi CO₂, biaya rata-rata, dan keandalan — tiga sumbu yang tidak bisa dimaksimalkan semua sekaligus. Tidak ada satu jawaban benar, hanya trade-off yang harus Anda pilih.',
  },
  objectives: {
    en: [
      'See the cost-emissions-reliability trilemma in numbers.',
      'Understand why "100% renewable" is hard without storage or hydro.',
      'Compare your portfolio to historical and policy-target mixes.',
    ],
    id: [
      'Melihat trilema biaya-emisi-keandalan dalam angka.',
      'Memahami mengapa "100% terbarukan" sulit tanpa penyimpanan atau hidro.',
      'Membandingkan portofolio Anda dengan bauran historis dan target kebijakan.',
    ],
  },
  tryThis: {
    en: [
      'Preset "all coal" — cheap and reliable, terrible CO₂.',
      'Preset "all renewable" — zero CO₂ but reliability score collapses.',
      'Try a Nordic-like 60% hydro + 30% nuclear mix — low CO₂, high reliability, moderate cost.',
    ],
    id: [
      'Preset "semua batubara" — murah dan andal, CO₂ buruk.',
      'Preset "semua terbarukan" — CO₂ nol tetapi skor keandalan runtuh.',
      'Coba bauran ala Nordik 60% hidro + 30% nuklir — CO₂ rendah, andal, biaya sedang.',
    ],
  },
  topics: ['climate', 'energy-policy'],
  hasLab: true,
  load: () => import('./sim.js'),
};
