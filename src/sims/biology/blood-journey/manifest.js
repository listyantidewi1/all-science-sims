export default {
  id: 'blood-journey',
  subject: 'biology',
  title: { en: 'Blood Journey', id: 'Perjalanan Darah' },
  description: {
    en: 'Follow a drop of blood around the body. It leaves the heart, picks up oxygen in the lungs and turns bright red, goes back to the heart, then travels to the muscles and organs where it gives the oxygen away and turns dark. Move the heart-rate slider from resting to running and watch the blood speed up. Tap the heart, lungs or body for a quick fact.',
    id: 'Ikuti setetes darah berkeliling tubuh. Darah keluar dari jantung, mengambil oksigen di paru-paru dan berubah merah terang, kembali ke jantung, lalu pergi ke otot dan organ tempat ia melepaskan oksigen dan menjadi gelap. Geser pengatur denyut jantung dari istirahat ke berlari dan lihat darah bergerak lebih cepat. Ketuk jantung, paru-paru, atau tubuh untuk fakta singkat.',
  },
  topics: ['circulatory system', 'heart', 'human body', 'oxygen'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
