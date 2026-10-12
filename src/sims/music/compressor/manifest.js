export default {
  id: 'compressor',
  subject: 'music',
  title: { en: 'Dynamics Compressor', id: 'Kompresor Dinamika' },
  description: {
    en: 'A dynamics compressor reduces the level of loud signals so the soft and loud parts of a recording are closer together. Drag the threshold and ratio handles, watch the input-output transfer curve bend, and see a sample drum loop\'s dynamics get tamed.',
    id: 'Kompresor dinamika mengurangi level sinyal keras sehingga bagian lembut dan keras suatu rekaman lebih dekat. Tarik gagang ambang dan rasio, amati kurva transfer input-output membengkok, dan lihat dinamika loop drum sampel ditundukkan.',
  },
  details: () => import('./details.js'),
  topics: ['acoustics', 'audio-engineering'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
