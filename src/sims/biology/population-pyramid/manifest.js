export default {
  id: 'population-pyramid',
  subject: 'biology',
  title: { en: 'Population Pyramid', id: 'Piramida Penduduk' },
  description: {
    en: "Stacked bars by 5-year age group, male on the left, female on the right. Shape tells you everything: a wide base = high birth rate (Niger), a column = stable (US), an inverted pyramid = aging (Japan). Tune fertility and mortality and watch a generation grow up.",
    id: 'Batang bertumpuk per kelompok umur 5 tahun, laki-laki di kiri, perempuan di kanan. Bentuknya memberitahu semuanya: dasar lebar = lahir tinggi (Niger), kolom = stabil (AS), piramida terbalik = menua (Jepang). Atur fertilitas dan mortalitas, amati satu generasi tumbuh.',
  },
  details: () => import('./details.js'),
  topics: ['demographics', 'populations'],
  grade: [8, 9, 10, 11],
  load: () => import('./sim.js'),
};
