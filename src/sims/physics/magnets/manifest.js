export default {
  id: 'magnets',
  subject: 'physics',
  title: { en: 'Magnets', id: 'Magnet' },
  description: {
    en: 'Drag two bar magnets around. When a red end meets a blue end they snap together. When two red ends (or two blue ends) meet, they push each other away! Then drag a magnet over the tray of things: a nail, a paper clip, a coin, a toy and more. Which ones stick?',
    id: 'Geser dua magnet batang. Ketika ujung merah bertemu ujung biru, keduanya menempel. Ketika dua ujung merah (atau dua ujung biru) bertemu, keduanya saling mendorong! Lalu geser magnet ke atas nampan berisi paku, penjepit kertas, koin, mainan, dan lainnya. Mana yang menempel?',
  },
  topics: ['magnetism', 'forces', 'materials'],
  grade: [3, 4, 5],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
