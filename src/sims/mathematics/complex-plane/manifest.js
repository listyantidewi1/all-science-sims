export default {
  id: 'complex-plane',
  subject: 'mathematics',
  title: { en: 'Complex Plane Mappings', id: 'Pemetaan Bidang Kompleks' },
  description: {
    en: 'Drag a complex number z around the plane and watch z², z³, 1/z, e^z, and conj(z) appear simultaneously. Multiplication is rotation + scaling — see it directly.',
    id: 'Seret bilangan kompleks z di bidang dan amati z², z³, 1/z, e^z, dan conj(z) muncul bersamaan. Perkalian adalah rotasi + penskalaan — lihat langsung.',
  },
  objectives: {
    en: [
      'See z² as "double the angle, square the magnitude".',
      'Recognize 1/z as inversion through the unit circle.',
      'Apply Euler: e^(iθ) traces the unit circle.',
    ],
    id: [
      'Melihat z² sebagai "gandakan sudut, kuadratkan magnitudo".',
      'Mengenali 1/z sebagai inversi melalui lingkaran satuan.',
      'Menerapkan Euler: e^(iθ) menelusuri lingkaran satuan.',
    ],
  },
  tryThis: {
    en: [
      'Place z on the unit circle — does z² stay on it?',
      'Move z to (2, 0) — where is 1/z?',
      'Trace z=e^(iθ) by rotating around origin — what curve does z² follow?',
    ],
    id: [
      'Letakkan z pada lingkaran satuan — apakah z² tetap di sana?',
      'Geser z ke (2, 0) — di mana 1/z?',
      'Telusuri z=e^(iθ) dengan memutar di sekitar origin — kurva apa yang ditelusuri z²?',
    ],
  },
  topics: ['complex', 'geometry'],
  load: () => import('./sim.js'),
};
