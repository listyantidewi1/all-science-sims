export default {
  id: 'galvanic-cell',
  subject: 'chemistry',
  title: { en: 'Galvanic Cell (Battery)', id: 'Sel Galvanik (Baterai)' },
  description: {
    en: 'Two metal half-cells joined by a salt bridge. The metal with the lower reduction potential gives up electrons to the higher one, lighting an LED in between. Pick zinc, copper, silver, or magnesium and watch the cell voltage emerge from the standard reduction potentials.',
    id: 'Dua sel-setengah logam yang dihubungkan jembatan garam. Logam dengan potensial reduksi lebih rendah memberikan elektron ke yang lebih tinggi, menyalakan LED di antaranya. Pilih seng, tembaga, perak, atau magnesium, lalu amati tegangan sel muncul dari potensial reduksi standar.',
  },
  details: () => import('./details.js'),
  topics: ['electrochemistry', 'redox'],
  hasLab: true,
  load: () => import('./sim.js'),
};
