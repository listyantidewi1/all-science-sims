export default {
  id: 'complex-plane',
  subject: 'mathematics',
  title: { en: 'Complex Plane Mappings', id: 'Pemetaan Bidang Kompleks' },
  description: {
    en: 'Drag a complex number z around the plane and watch z², z³, 1/z, e^z, and conj(z) appear simultaneously. Multiplication is rotation + scaling — see it directly.',
    id: 'Seret bilangan kompleks z di bidang dan amati z², z³, 1/z, e^z, dan conj(z) muncul bersamaan. Perkalian adalah rotasi + penskalaan — lihat langsung.',
  },
  details: () => import('./details.js'),
  topics: ['complex', 'geometry'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
