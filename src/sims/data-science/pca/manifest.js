export default {
  id: 'pca',
  subject: 'data-science',
  title: { en: 'Principal Component Analysis', id: 'Analisis Komponen Utama (PCA)' },
  description: {
    en: 'Drag points around the plane and watch PCA find the direction of maximum variance — and its perpendicular runner-up. The two principal axes draw themselves through the cloud.',
    id: 'Seret titik di bidang dan amati PCA menemukan arah variansi maksimum — dan tegak lurusnya yang kedua. Dua sumbu utama menggambar dirinya sendiri menembus awan data.',
  },
  details: () => import('./details.js'),
  topics: ['linear-algebra', 'unsupervised'],
  load: () => import('./sim.js'),
};
