export default {
  id: 'coulombs-law',
  subject: 'physics',
  title: { en: "Coulomb's Law", id: 'Hukum Coulomb' },
  description: {
    en: 'Set two point charges between −10 and +10 μC, drag one along the line to change their separation, and watch the electrostatic force vectors stretch and flip as F = k·q₁q₂/r². Record force against distance to build an F–r plot (linear or log-log) and confirm the inverse-square law, then switch on a third charge to see how forces add as vectors.',
    id: 'Atur dua muatan titik antara −10 dan +10 μC, seret salah satunya di sepanjang garis untuk mengubah jaraknya, dan lihat vektor gaya elektrostatik memanjang dan berbalik arah sesuai F = k·q₁q₂/r². Catat gaya terhadap jarak untuk membuat grafik F–r (linear atau log-log) dan buktikan hukum kuadrat terbalik, lalu nyalakan muatan ketiga untuk melihat bagaimana gaya dijumlahkan sebagai vektor.',
  },
  topics: ['electrostatics', 'Coulomb force', 'inverse-square law', 'vectors'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
