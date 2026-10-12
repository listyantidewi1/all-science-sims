export default {
  id: 'energy-mix',
  subject: 'climate',
  title: { en: 'Energy Mix Optimizer', id: 'Pengoptimal Bauran Energi' },
  description: {
    en: 'Allocate the world\'s electricity between coal, gas, nuclear, hydro, wind, and solar. The dashboard updates CO₂ emissions, average cost, and reliability — three axes you cannot maximize all at once. There\'s no single right answer, just trade-offs you have to choose between.',
    id: 'Alokasikan listrik dunia antara batubara, gas, nuklir, hidro, angin, dan surya. Dasbor memperbarui emisi CO₂, biaya rata-rata, dan keandalan — tiga sumbu yang tidak bisa dimaksimalkan semua sekaligus. Tidak ada satu jawaban benar, hanya trade-off yang harus Anda pilih.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'energy-policy'],
  grade: [8, 9, 10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
