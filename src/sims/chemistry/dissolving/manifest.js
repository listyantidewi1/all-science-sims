export default {
  id: 'dissolving',
  subject: 'chemistry',
  title: { en: 'Dissolve It!', id: 'Larutkan!' },
  description: {
    en: 'Drop a spoonful of sugar, salt, sand, flour or oil into a glass of water and watch what happens. Sugar and salt disappear into the water, faster when the water is warm or when you stir. Sand sinks, flour makes the water cloudy and oil floats on top. Keep adding sugar and find out when the water is full and no more will dissolve!',
    id: 'Masukkan sesendok gula, garam, pasir, tepung atau minyak ke dalam gelas berisi air dan lihat apa yang terjadi. Gula dan garam menghilang ke dalam air, lebih cepat jika airnya hangat atau jika kamu mengaduk. Pasir tenggelam, tepung membuat air keruh dan minyak mengapung di atas. Terus tambahkan gula dan cari tahu kapan airnya penuh sehingga tidak ada lagi yang bisa larut!',
  },
  topics: ['mixtures', 'solutions', 'dissolving', 'solubility'],
  grade: [4, 5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
