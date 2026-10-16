export default {
  id: 'energy-skate-park',
  subject: 'physics',
  title: { en: 'Energy Roller Coaster', id: 'Roller Coaster Energi' },
  description: {
    en: 'Shape a roller-coaster track by dragging six control points, place the cart at any height and release it. Live bars show potential energy, kinetic energy, heat from friction and their total, while a speedometer reads the cart\'s speed and a flag marks a point where you can read the energies. Prove to yourself that PE + KE + heat never changes, and predict the top speed with v = √(2gh).',
    id: 'Bentuk lintasan roller coaster dengan menyeret enam titik kendali, letakkan kereta di ketinggian mana pun dan lepaskan. Batang energi menampilkan energi potensial, energi kinetik, kalor akibat gesekan dan jumlahnya secara langsung, sementara spidometer membaca kelajuan kereta dan sebuah bendera menandai titik tempat kamu membaca energinya. Buktikan sendiri bahwa EP + EK + kalor tidak pernah berubah, dan prediksi kelajuan maksimum dengan v = √(2gh).',
  },
  topics: ['energy', 'work', 'conservation of energy', 'friction'],
  grade: [8, 9, 10],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
