export default {
  id: 'double-circulation',
  subject: 'biology',
  title: { en: 'Two Loops of Blood', id: 'Peredaran Darah Ganda' },
  description: {
    en: 'Watch blood travel twice through the heart on every round trip: a short loop to the lungs to pick up oxygen and a long loop around the body to deliver it. Follow the colour of the blood particles, see the four chambers squeeze and the valves snap open and shut, then raise the heart rate, narrow an artery or block a coronary artery and read what happens to the blood pressure and the output of the heart.',
    id: 'Amati darah melewati jantung dua kali dalam setiap putaran: lintasan pendek ke paru-paru untuk mengambil oksigen dan lintasan panjang ke seluruh tubuh untuk mengantarkannya. Ikuti warna partikel darah, lihat keempat ruang jantung memompa dan katup membuka-menutup, lalu naikkan denyut jantung, sempitkan pembuluh nadi, atau sumbat arteri koroner dan baca akibatnya pada tekanan darah dan curah jantung.',
  },
  topics: ['circulatory system', 'heart', 'blood pressure', 'double circulation', 'cardiovascular disease'],
  grade: [8],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
