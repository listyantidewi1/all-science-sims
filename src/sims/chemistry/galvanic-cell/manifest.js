export default {
  id: 'galvanic-cell',
  subject: 'chemistry',
  title: { en: 'Galvanic Cell (Battery)', id: 'Sel Galvanik (Baterai)' },
  description: {
    en: 'Two metal half-cells joined by a salt bridge. The metal with the lower reduction potential gives up electrons to the higher one, lighting an LED in between. Pick zinc, copper, silver, or magnesium and watch the cell voltage emerge from the standard reduction potentials.',
    id: 'Dua sel-setengah logam yang dihubungkan jembatan garam. Logam dengan potensial reduksi lebih rendah memberikan elektron ke yang lebih tinggi, menyalakan LED di antaranya. Pilih seng, tembaga, perak, atau magnesium, lalu amati tegangan sel muncul dari potensial reduksi standar.',
  },
  objectives: {
    en: [
      'Apply E°_cell = E°_cathode − E°_anode.',
      'Identify oxidation (anode) and reduction (cathode).',
      'Connect electron flow direction to which metal is "more active".',
    ],
    id: [
      'Menerapkan E°_sel = E°_katoda − E°_anoda.',
      'Mengenali oksidasi (anoda) dan reduksi (katoda).',
      'Mengaitkan arah aliran elektron dengan logam mana yang lebih aktif.',
    ],
  },
  tryThis: {
    en: [
      'Zn anode + Cu cathode → 1.10 V (Daniell cell).',
      'Mg + Ag → big voltage; what is it?',
      'Same metal on both sides — voltage zero?',
    ],
    id: [
      'Anoda Zn + katoda Cu → 1,10 V (sel Daniell).',
      'Mg + Ag → tegangan besar; berapa?',
      'Logam sama di kedua sisi — tegangan nol?',
    ],
  },
  topics: ['electrochemistry', 'redox'],
  hasLab: true,
  load: () => import('./sim.js'),
};
