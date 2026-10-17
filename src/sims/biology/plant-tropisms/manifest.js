export default {
  id: 'plant-tropisms',
  subject: 'biology',
  title: { en: 'Plant Growth Responses', id: 'Gerak Tumbuh Tumbuhan' },
  description: {
    en: 'Grow a seedling in a chamber and move the lamp around it: auxin piles up on the shaded side (shown as colour), that side elongates faster and the shoot bends towards the light. Rotate the chamber and watch the shoot bend up and the root bend down. Remove or cover the tip to test where the signal comes from, and read the growth-rate vs auxin curve to see why the same hormone makes shoots bend one way and roots the other.',
    id: 'Tumbuhkan kecambah dalam kotak dan gerakkan lampu di sekelilingnya: auksin menumpuk di sisi yang teduh (ditunjukkan sebagai warna), sisi itu memanjang lebih cepat dan batang membengkok ke arah cahaya. Putar kotak dan amati batang membengkok ke atas sementara akar membengkok ke bawah. Buang atau tutup ujungnya untuk menguji dari mana sinyal berasal, dan baca kurva laju tumbuh terhadap auksin untuk melihat mengapa hormon yang sama membuat batang dan akar membengkok ke arah berlawanan.',
  },
  topics: ['tropism', 'phototropism', 'gravitropism', 'auxin', 'plant hormones', 'growth'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
