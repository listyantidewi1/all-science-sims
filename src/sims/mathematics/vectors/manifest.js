export default {
  id: 'vectors',
  subject: 'mathematics',
  title: { en: 'Vectors & Operations', id: 'Vektor & Operasinya' },
  description: {
    en: 'Drag two arrows around the plane and watch their sum, difference, dot product, and angle update in real time. The geometric definitions become obvious once you can grab the arrows.',
    id: 'Seret dua panah di bidang dan amati jumlah, selisih, perkalian titik, serta sudutnya diperbarui langsung. Definisi geometris menjadi jelas begitu Anda bisa memegang panahnya.',
  },
  details: () => import('./details.js'),
  topics: ['linear-algebra', 'geometry'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
