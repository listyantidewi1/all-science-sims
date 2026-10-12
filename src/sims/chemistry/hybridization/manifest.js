export default {
  id: 'hybridization',
  subject: 'chemistry',
  title: { en: 'Hybridization (sp, sp², sp³)', id: 'Hibridisasi (sp, sp², sp³)' },
  description: {
    en: 'Carbon\'s atomic orbitals mix to form hybrid orbitals — sp (linear), sp² (trigonal planar), or sp³ (tetrahedral). Pick a hybridization and rotate the 3D model: the geometry follows immediately.',
    id: 'Orbital atom karbon bercampur menjadi orbital hibrid — sp (linear), sp² (trigonal planar), atau sp³ (tetrahedral). Pilih hibridisasi lalu putar model 3D: geometri langsung mengikuti.',
  },
  details: () => import('./details.js'),
  topics: ['bonding', 'orbitals'],
  load: () => import('./sim.js'),
};
