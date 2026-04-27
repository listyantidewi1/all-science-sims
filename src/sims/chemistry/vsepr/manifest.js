export default {
  id: 'vsepr',
  subject: 'chemistry',
  title: { en: 'VSEPR Molecular Geometry', id: 'Geometri Molekul VSEPR' },
  description: {
    en: 'Pick the number of bonded atoms and lone pairs around a central atom. The molecule rearranges into the lowest-repulsion 3D shape — linear, trigonal, tetrahedral, octahedral and beyond.',
    id: 'Pilih jumlah atom yang terikat dan pasangan elektron bebas pada atom pusat. Molekul akan menata diri ke bentuk 3D dengan tolakan paling kecil — linear, trigonal, tetrahedral, oktahedral, dan seterusnya.',
  },
  objectives: {
    en: [
      'Predict molecular geometry from steric number.',
      'Distinguish bond pairs from lone pairs in shape determination.',
      'Match a real molecule (H₂O, NH₃, CH₄, SF₆…) to its VSEPR class.',
    ],
    id: [
      'Memprediksi geometri molekul dari bilangan sterik.',
      'Membedakan pasangan ikatan dan pasangan bebas dalam menentukan bentuk.',
      'Mencocokkan molekul nyata (H₂O, NH₃, CH₄, SF₆…) dengan kelas VSEPR-nya.',
    ],
  },
  tryThis: {
    en: [
      'Set 4 bond pairs, 0 lone — what shape? (CH₄)',
      'Set 2 bond pairs, 2 lone — bent? (H₂O)',
      'Add lone pairs to a 5-domain molecule — trigonal bipyramidal becomes seesaw → T-shape → linear.',
    ],
    id: [
      'Atur 4 pasangan ikatan, 0 bebas — bentuknya? (CH₄)',
      'Atur 2 pasangan ikatan, 2 bebas — bentuk bengkok? (H₂O)',
      'Tambahkan pasangan bebas pada 5 domain — trigonal bipiramidal menjadi seesaw → T → linear.',
    ],
  },
  topics: ['bonding', 'geometry'],
  load: () => import('./sim.js'),
};
