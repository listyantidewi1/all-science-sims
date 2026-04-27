export default {
  id: 'solubility',
  subject: 'chemistry',
  title: { en: 'Solubility & Saturation', id: 'Kelarutan & Kejenuhan' },
  description: {
    en: 'Spoon solute crystals into a beaker of water. Up to a temperature-dependent limit they dissolve; beyond it, the excess settles to the bottom. Heat the water and watch the limit rise.',
    id: 'Sendokkan kristal zat terlarut ke dalam gelas berisi air. Hingga batas yang bergantung suhu, kristal larut; di luar batas itu, sisa kristal mengendap di dasar. Panaskan air dan amati batas naik.',
  },
  objectives: {
    en: [
      'Distinguish unsaturated, saturated, and supersaturated solutions.',
      'Predict how temperature changes solubility.',
      'Read solubility from a curve at a chosen temperature.',
    ],
    id: [
      'Membedakan larutan tidak jenuh, jenuh, dan lewat jenuh.',
      'Memprediksi perubahan kelarutan terhadap suhu.',
      'Membaca kelarutan dari kurva pada suhu tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Add solute past the saturation point — does the rest sink?',
      'Heat the water from 20 °C to 80 °C — what happens to the deposit?',
      'Compare KNO₃ vs NaCl curves — which is more sensitive to temperature?',
    ],
    id: [
      'Tambahkan zat terlarut melebihi batas jenuh — apakah sisanya mengendap?',
      'Panaskan air dari 20 °C ke 80 °C — apa yang terjadi pada endapan?',
      'Bandingkan kurva KNO₃ vs NaCl — mana yang lebih peka suhu?',
    ],
  },
  topics: ['solutions', 'saturation'],
  load: () => import('./sim.js'),
};
