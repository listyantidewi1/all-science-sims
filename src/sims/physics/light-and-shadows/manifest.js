export default {
  id: 'light-and-shadows',
  subject: 'physics',
  title: { en: 'Light and Shadows', id: 'Cahaya dan Bayangan' },
  description: {
    en: 'Drag a torch around a toy and watch its shadow on the wall. Move the torch close and the shadow grows big. Move it far away and the shadow shrinks. Move it up and the shadow moves down! Change the toy to glass or frosted plastic to see a faint shadow or no shadow at all.',
    id: 'Geser senter di sekitar mainan dan lihat bayangannya di dinding. Dekatkan senter, bayangan jadi besar. Jauhkan senter, bayangan mengecil. Naikkan senter, bayangan turun! Ganti mainan menjadi kaca atau plastik buram untuk melihat bayangan samar atau tidak ada bayangan sama sekali.',
  },
  topics: ['light', 'shadows', 'materials'],
  grade: [2, 3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
