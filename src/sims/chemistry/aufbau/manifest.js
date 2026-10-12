export default {
  id: 'aufbau',
  subject: 'chemistry',
  title: { en: 'Aufbau Principle', id: 'Asas Aufbau' },
  description: {
    en: 'Add electrons one at a time and watch them fill orbitals 1s, 2s, 2p, 3s, 3p, 4s, 3d… following the Aufbau diagonal rule, Hund\'s rule, and the Pauli exclusion principle.',
    id: 'Tambahkan elektron satu per satu dan amati mereka mengisi orbital 1s, 2s, 2p, 3s, 3p, 4s, 3d… mengikuti aturan diagonal Aufbau, aturan Hund, dan asas larangan Pauli.',
  },
  details: () => import('./details.js'),
  topics: ['atoms', 'electrons'],
  load: () => import('./sim.js'),
};
