export default {
  id: 'moon-phases',
  subject: 'earth-space',
  title: { en: 'Moon Phases', id: 'Fase Bulan' },
  description: {
    en: 'Drag the Moon around Earth and see two views update together: the lit side from above, and how the Moon appears from Earth. The phase you see is just geometry.',
    id: 'Seret Bulan mengelilingi Bumi dan amati dua tampilan bersamaan: sisi yang terang dari atas, serta bagaimana Bulan tampak dari Bumi. Fase yang terlihat hanyalah geometri.',
  },
  details: () => import('./details.js'),
  topics: ['astronomy', 'moon'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
