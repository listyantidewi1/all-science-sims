export default {
  id: 'biodiversity-index',
  subject: 'biology',
  title: { en: 'Biodiversity Index', id: 'Indeks Keanekaragaman Hayati' },
  description: {
    en: 'Sample two habitats side by side, such as a rainforest and an oil-palm plantation, by clicking 1 m² quadrats on each grid. The sim counts the individuals of every species you catch and computes Simpson’s and Shannon’s diversity indices live from the formulas. Slide the disturbance control to remove species and watch both indices fall.',
    id: 'Ambil sampel dua habitat secara berdampingan, misalnya hutan hujan dan perkebunan kelapa sawit, dengan mengklik kuadrat 1 m² pada tiap grid. Simulasi menghitung individu setiap spesies yang tercakup dan menghitung indeks keanekaragaman Simpson dan Shannon secara langsung dari rumusnya. Geser kontrol gangguan untuk menghilangkan spesies dan amati kedua indeks turun.',
  },
  topics: ['biodiversity', 'species richness', 'Simpson index', 'Shannon index', 'sampling', 'quadrat'],
  grade: [10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
