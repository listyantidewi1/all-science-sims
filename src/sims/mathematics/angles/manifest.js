export default {
  id: 'angles',
  subject: 'mathematics',
  title: { en: 'Angle Explorer', id: 'Jelajah Sudut' },
  description: {
    en: 'Drag the arm around and watch the protractor read the angle in degrees. See when an angle is acute, right, obtuse, straight or reflex. Then drag the three corners of a triangle: however you stretch it, its three angles always add up to 180°. Finally cross two lines and discover that opposite angles are always equal.',
    id: 'Geser lengan sudut dan lihat busur derajat membaca besarnya dalam derajat. Lihat kapan sudut disebut lancip, siku-siku, tumpul, lurus atau refleks. Lalu geser ketiga titik sudut segitiga: bagaimana pun kamu menariknya, jumlah ketiga sudutnya selalu 180°. Terakhir, silangkan dua garis dan temukan bahwa sudut yang bertolak belakang selalu sama besar.',
  },
  topics: ['geometry', 'angles', 'measurement'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
