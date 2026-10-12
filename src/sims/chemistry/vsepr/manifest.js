export default {
  id: 'vsepr',
  subject: 'chemistry',
  title: { en: 'VSEPR Molecular Geometry', id: 'Geometri Molekul VSEPR' },
  description: {
    en: 'Pick the number of bonded atoms and lone pairs around a central atom. The molecule rearranges into the lowest-repulsion 3D shape — linear, trigonal, tetrahedral, octahedral and beyond.',
    id: 'Pilih jumlah atom yang terikat dan pasangan elektron bebas pada atom pusat. Molekul akan menata diri ke bentuk 3D dengan tolakan paling kecil — linear, trigonal, tetrahedral, oktahedral, dan seterusnya.',
  },
  details: () => import('./details.js'),
  topics: ['bonding', 'geometry'],
  load: () => import('./sim.js'),
};
