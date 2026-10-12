// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
