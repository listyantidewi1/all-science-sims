export default {
  id: 'separating-mixtures',
  subject: 'chemistry',
  title: { en: 'Separating Mixtures', id: 'Memisahkan Campuran' },
  description: {
    en: 'Choose a mixture such as sand and water, salt and water or ink dyes, then try to separate it by filtering, evaporating, distilling, chromatography, a magnet or decanting. Watch the method in action and find out whether it works and what you end up with.',
    id: 'Pilih campuran seperti pasir dan air, garam dan air, atau zat warna tinta, lalu coba pisahkan dengan penyaringan, penguapan, distilasi, kromatografi, magnet, atau dekantasi. Lihat caranya bekerja dan cari tahu apakah berhasil dan apa yang kamu dapatkan.',
  },
  topics: ['mixtures', 'separation-techniques'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
