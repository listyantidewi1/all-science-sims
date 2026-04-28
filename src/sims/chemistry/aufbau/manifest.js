export default {
  id: 'aufbau',
  subject: 'chemistry',
  title: { en: 'Aufbau Principle', id: 'Asas Aufbau' },
  description: {
    en: 'Add electrons one at a time and watch them fill orbitals 1s, 2s, 2p, 3s, 3p, 4s, 3d… following the Aufbau diagonal rule, Hund\'s rule, and the Pauli exclusion principle.',
    id: 'Tambahkan elektron satu per satu dan amati mereka mengisi orbital 1s, 2s, 2p, 3s, 3p, 4s, 3d… mengikuti aturan diagonal Aufbau, aturan Hund, dan asas larangan Pauli.',
  },
  objectives: {
    en: [
      'Apply the Aufbau filling order (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…).',
      "See Hund's rule fill parallel before pairing.",
      "See Pauli's principle: never more than two electrons per orbital.",
    ],
    id: [
      'Menerapkan urutan pengisian Aufbau (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…).',
      'Melihat aturan Hund mengisi sejajar sebelum berpasangan.',
      'Melihat asas Pauli: tidak lebih dari dua elektron per orbital.',
    ],
  },
  tryThis: {
    en: [
      'Build neon (Z=10) — what is the electron configuration?',
      'Add three electrons to a 2p set — do they pair up or spread out?',
      'Build iron (Z=26) — what subshell ends up half-filled?',
    ],
    id: [
      'Bangun neon (Z=10) — apa konfigurasi elektronnya?',
      'Tambahkan tiga elektron ke 2p — apakah mereka berpasangan atau menyebar?',
      'Bangun besi (Z=26) — subkulit mana yang setengah penuh?',
    ],
  },
  topics: ['atoms', 'electrons'],
  load: () => import('./sim.js'),
};
