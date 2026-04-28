export default {
  id: 'photosynthesis',
  subject: 'biology',
  title: { en: 'Photosynthesis Rate', id: 'Laju Fotosintesis' },
  description: {
    en: 'Tune light intensity, CO₂ concentration, and temperature on a virtual leaf. Bubbles of oxygen rise from a submerged plant at a rate set by whichever factor is most limiting — Liebig\'s law of the minimum, made visible.',
    id: 'Atur intensitas cahaya, konsentrasi CO₂, dan suhu pada daun virtual. Gelembung oksigen naik dari tanaman tenggelam dengan laju yang dibatasi faktor paling kritis — hukum minimum Liebig, yang terlihat.',
  },
  objectives: {
    en: [
      'Identify the limiting factor at any operating point.',
      'See temperature optimum and the drop above it.',
      "See light saturation: more light doesn't always mean faster.",
    ],
    id: [
      'Mengidentifikasi faktor pembatas pada titik operasi mana pun.',
      'Melihat suhu optimum dan penurunan di atasnya.',
      'Melihat kejenuhan cahaya: lebih banyak cahaya tidak selalu berarti lebih cepat.',
    ],
  },
  tryThis: {
    en: [
      'Crank light past 80% — does the rate keep rising?',
      'Lower CO₂ to 5% — what is now limiting?',
      'Heat past 40 °C — does the rate collapse?',
    ],
    id: [
      'Naikkan cahaya melebihi 80% — apakah laju terus naik?',
      'Turunkan CO₂ ke 5% — sekarang apa yang membatasi?',
      'Panaskan melebihi 40 °C — apakah laju runtuh?',
    ],
  },
  topics: ['biology', 'plants'],
  load: () => import('./sim.js'),
};
