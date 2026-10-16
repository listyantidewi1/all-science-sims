export default {
  id: 'forces-shape-motion',
  subject: 'physics',
  title: { en: 'Push, Pull, Squash!', id: 'Dorong, Tarik, Remas!' },
  description: {
    en: 'A ball, a toy car and a lump of clay sit on a table. Tap one, then push it, pull it, push it sideways or squash it. Watch what the force does: the thing speeds up, turns a new way, or changes shape. A label tells you what changed each time.',
    id: 'Sebuah bola, mobil mainan dan segumpal tanah liat ada di atas meja. Ketuk salah satu, lalu dorong, tarik, dorong dari samping, atau remas. Lihat apa yang dilakukan gaya itu: bendanya makin cepat, berbelok, atau berubah bentuk. Sebuah label memberi tahu apa yang berubah setiap kali.',
  },
  topics: ['forces', 'motion', 'push and pull', 'shape'],
  grade: [3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
