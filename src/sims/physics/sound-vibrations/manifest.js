export default {
  id: 'sound-vibrations',
  subject: 'physics',
  title: { en: 'Sound is Vibration', id: 'Bunyi adalah Getaran' },
  description: {
    en: 'Hit a drum, pluck a guitar string or tap a tuning fork and watch it wobble. A hard hit makes a big wobble and a loud sound. A tight or short string wobbles faster and makes a high sound. Watch the wave and listen to the tone.',
    id: 'Pukul drum, petik senar gitar, atau ketuk garpu tala dan lihat benda itu bergetar. Pukulan keras membuat getaran besar dan bunyi nyaring. Senar yang kencang atau pendek bergetar lebih cepat dan bunyinya tinggi. Lihat gelombangnya dan dengarkan nadanya.',
  },
  topics: ['sound', 'vibration', 'waves'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
