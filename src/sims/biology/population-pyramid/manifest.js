export default {
  id: 'population-pyramid',
  subject: 'biology',
  title: { en: 'Population Pyramid', id: 'Piramida Penduduk' },
  description: {
    en: "Stacked bars by 5-year age group, male on the left, female on the right. Shape tells you everything: a wide base = high birth rate (Niger), a column = stable (US), an inverted pyramid = aging (Japan). Tune fertility and mortality and watch a generation grow up.",
    id: 'Batang bertumpuk per kelompok umur 5 tahun, laki-laki di kiri, perempuan di kanan. Bentuknya memberitahu semuanya: dasar lebar = lahir tinggi (Niger), kolom = stabil (AS), piramida terbalik = menua (Jepang). Atur fertilitas dan mortalitas, amati satu generasi tumbuh.',
  },
  objectives: {
    en: [
      'Read fertility from the bottom bar.',
      'Connect shape to demographic transition.',
      'Predict the dependency ratio (kids + elders / workers).',
    ],
    id: [
      'Membaca fertilitas dari batang dasar.',
      'Mengaitkan bentuk dengan transisi demografi.',
      'Memprediksi rasio ketergantungan (anak + lansia / pekerja).',
    ],
  },
  tryThis: {
    en: [
      'Fertility 4 + low mortality — classic broad-base pyramid.',
      'Fertility 1.5 — does the bottom shrink?',
      'Run for 50 years, fertility 1.2 — what shape?',
    ],
    id: [
      'Fertilitas 4 + mortalitas rendah — piramida dasar lebar klasik.',
      'Fertilitas 1,5 — apakah dasar menyusut?',
      'Jalankan 50 tahun, fertilitas 1,2 — bentuk apa muncul?',
    ],
  },
  topics: ['demographics', 'populations'],
  load: () => import('./sim.js'),
};
