export default {
  id: 'enzyme-activity',
  subject: 'biology',
  title: { en: 'Enzyme Activity', id: 'Aktivitas Enzim' },
  description: {
    en: 'Tune temperature and pH on a generic enzyme and watch its catalytic rate rise to a peak then crash as the protein denatures. Compare a few common enzymes at once.',
    id: 'Atur suhu dan pH pada enzim dan amati laju katalitiknya naik ke puncak lalu jatuh ketika protein terdenaturasi. Bandingkan beberapa enzim umum sekaligus.',
  },
  details: () => import('./details.js'),
  topics: ['enzymes', 'biochemistry'],
  hasLab: true,
  load: () => import('./sim.js'),
};
