export default {
  id: 'triangle-centers',
  subject: 'mathematics',
  title: { en: 'Triangle Centers', id: 'Pusat-Pusat Segitiga' },
  description: {
    en: 'Drag any triangle vertex and watch four classical "centers" follow: centroid, circumcenter, incenter, orthocenter. Three of them — except the incenter — always lie on the Euler line.',
    id: 'Seret titik sudut segitiga mana pun dan amati empat "pusat" klasik mengikuti: sentroid, sirkumsenter, insenter, ortosenter. Tiga di antaranya — kecuali insenter — selalu berada pada garis Euler.',
  },
  objectives: {
    en: [
      'Identify centroid (medians), circumcenter (perpendicular bisectors), incenter (angle bisectors), orthocenter (altitudes).',
      'See the Euler line: centroid, circumcenter, orthocenter are collinear.',
      'Recognize that for equilateral triangles all four centers coincide.',
    ],
    id: [
      'Mengenali sentroid (median), sirkumsenter (garis bagi tegak lurus), insenter (garis bagi sudut), ortosenter (garis tinggi).',
      'Melihat garis Euler: sentroid, sirkumsenter, dan ortosenter segaris.',
      'Mengenali bahwa pada segitiga sama sisi keempat pusat berimpit.',
    ],
  },
  tryThis: {
    en: [
      'Make an equilateral triangle — do all four centers stack?',
      'Drag to make an obtuse triangle — does the orthocenter step outside?',
      'Find the Euler line — does the incenter sit on it?',
    ],
    id: [
      'Buat segitiga sama sisi — apakah keempat pusat berimpit?',
      'Buat segitiga tumpul — apakah ortosenter keluar dari segitiga?',
      'Cari garis Euler — apakah insenter berada di sana?',
    ],
  },
  topics: ['geometry', 'triangles'],
  load: () => import('./sim.js'),
};
