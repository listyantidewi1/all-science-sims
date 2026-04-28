export default {
  id: 'pca',
  subject: 'data-science',
  title: { en: 'Principal Component Analysis', id: 'Analisis Komponen Utama (PCA)' },
  description: {
    en: 'Drag points around the plane and watch PCA find the direction of maximum variance — and its perpendicular runner-up. The two principal axes draw themselves through the cloud.',
    id: 'Seret titik di bidang dan amati PCA menemukan arah variansi maksimum — dan tegak lurusnya yang kedua. Dua sumbu utama menggambar dirinya sendiri menembus awan data.',
  },
  objectives: {
    en: [
      'See PC1 as the direction of maximum variance.',
      'Recognize PCA as eigendecomposition of the covariance matrix.',
      'Connect explained variance ratio to dimensionality reduction.',
    ],
    id: [
      'Melihat PC1 sebagai arah variansi maksimum.',
      'Mengenali PCA sebagai dekomposisi eigen dari matriks kovariansi.',
      'Mengaitkan rasio variansi yang dijelaskan dengan reduksi dimensi.',
    ],
  },
  tryThis: {
    en: [
      'Drag points to a near-line — does PC1 explain ~99%?',
      'Make an isotropic blob — does PC1 dominate or near-equal PC2?',
      'Add an outlier — does it pull PC1 toward it?',
    ],
    id: [
      'Seret titik ke hampir-garis — apakah PC1 menjelaskan ~99%?',
      'Buat awan isotropik — apakah PC1 mendominasi atau mirip PC2?',
      'Tambah pencilan — apakah ia menarik PC1 ke arahnya?',
    ],
  },
  topics: ['linear-algebra', 'unsupervised'],
  load: () => import('./sim.js'),
};
