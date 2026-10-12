export default {
  id: 'triangle-centers',
  subject: 'mathematics',
  title: { en: 'Triangle Centers', id: 'Pusat-Pusat Segitiga' },
  description: {
    en: 'Drag any triangle vertex and watch four classical "centers" follow: centroid, circumcenter, incenter, orthocenter. Three of them — except the incenter — always lie on the Euler line.',
    id: 'Seret titik sudut segitiga mana pun dan amati empat "pusat" klasik mengikuti: sentroid, sirkumsenter, insenter, ortosenter. Tiga di antaranya — kecuali insenter — selalu berada pada garis Euler.',
  },
  details: () => import('./details.js'),
  topics: ['geometry', 'triangles'],
  load: () => import('./sim.js'),
};
