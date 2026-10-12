export default {
  id: 'photosynthesis',
  subject: 'biology',
  title: { en: 'Photosynthesis Rate', id: 'Laju Fotosintesis' },
  description: {
    en: 'Tune light intensity, CO₂ concentration, and temperature on a virtual leaf. Bubbles of oxygen rise from a submerged plant at a rate set by whichever factor is most limiting — Liebig\'s law of the minimum, made visible.',
    id: 'Atur intensitas cahaya, konsentrasi CO₂, dan suhu pada daun virtual. Gelembung oksigen naik dari tanaman tenggelam dengan laju yang dibatasi faktor paling kritis — hukum minimum Liebig, yang terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['biology', 'plants'],
  hasLab: true,
  load: () => import('./sim.js'),
};
