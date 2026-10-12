export default {
  id: 'conic-sections',
  subject: 'mathematics',
  title: { en: 'Conic Sections', id: 'Irisan Kerucut' },
  description: {
    en: 'A double cone sliced by a tilting plane. Move the plane and the intersection traces a circle, ellipse, parabola, or hyperbola — the four conic sections, all from one shape.',
    id: 'Kerucut ganda diiris bidang yang dimiringkan. Geser bidangnya dan irisannya menjadi lingkaran, elips, parabola, atau hiperbola — empat irisan kerucut, semuanya dari satu bentuk.',
  },
  details: () => import('./details.js'),
  topics: ['geometry', 'conics'],
  load: () => import('./sim.js'),
};
