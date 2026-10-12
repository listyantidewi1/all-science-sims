export default {
  id: 'k-means',
  subject: 'data-science',
  title: { en: 'K-Means Clustering', id: 'Klastering K-Means' },
  description: {
    en: 'Click to drop points, choose k, and step through the assign-and-update algorithm one iteration at a time. Watch centroids drift to the cluster centers.',
    id: 'Klik untuk menempatkan titik, pilih k, dan jalankan algoritma assign-and-update satu iterasi pada satu waktu. Amati centroid bergeser ke pusat klaster.',
  },
  details: () => import('./details.js'),
  topics: ['clustering', 'unsupervised'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
