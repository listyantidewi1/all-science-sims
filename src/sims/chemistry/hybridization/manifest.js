export default {
  id: 'hybridization',
  subject: 'chemistry',
  title: { en: 'Hybridization (sp, sp², sp³)', id: 'Hibridisasi (sp, sp², sp³)' },
  description: {
    en: 'Carbon\'s atomic orbitals mix to form hybrid orbitals — sp (linear), sp² (trigonal planar), or sp³ (tetrahedral). Pick a hybridization and rotate the 3D model: the geometry follows immediately.',
    id: 'Orbital atom karbon bercampur menjadi orbital hibrid — sp (linear), sp² (trigonal planar), atau sp³ (tetrahedral). Pilih hibridisasi lalu putar model 3D: geometri langsung mengikuti.',
  },
  objectives: {
    en: [
      'Match hybridization to molecular geometry.',
      'Connect to common molecules: CH₄ (sp³), C₂H₄ (sp²), C₂H₂ (sp).',
      "See bond angles: 109.5°, 120°, 180°.",
    ],
    id: [
      'Mencocokkan hibridisasi dengan geometri molekul.',
      'Mengaitkan dengan molekul umum: CH₄ (sp³), C₂H₄ (sp²), C₂H₂ (sp).',
      'Melihat sudut ikatan: 109,5°, 120°, 180°.',
    ],
  },
  tryThis: {
    en: [
      'sp³ — methane CH₄ tetrahedral 109.5°.',
      'sp² — ethylene C₂H₄ planar 120° + π bond.',
      'sp — acetylene C₂H₂ linear 180° + 2 π bonds.',
    ],
    id: [
      'sp³ — metana CH₄ tetrahedral 109,5°.',
      'sp² — etilen C₂H₄ planar 120° + ikatan π.',
      'sp — asetilen C₂H₂ linear 180° + 2 ikatan π.',
    ],
  },
  topics: ['bonding', 'orbitals'],
  load: () => import('./sim.js'),
};
