export default {
  id: 'conic-sections',
  subject: 'mathematics',
  title: { en: 'Conic Sections', id: 'Irisan Kerucut' },
  description: {
    en: 'A double cone sliced by a tilting plane. Move the plane and the intersection traces a circle, ellipse, parabola, or hyperbola — the four conic sections, all from one shape.',
    id: 'Kerucut ganda diiris bidang yang dimiringkan. Geser bidangnya dan irisannya menjadi lingkaran, elips, parabola, atau hiperbola — empat irisan kerucut, semuanya dari satu bentuk.',
  },
  objectives: {
    en: [
      'Identify each conic by the angle of the cutting plane.',
      'Connect eccentricity to the conic class.',
      'See parabola as the limit between ellipse and hyperbola.',
    ],
    id: [
      'Mengenali tiap irisan kerucut dari sudut bidangnya.',
      'Mengaitkan eksentrisitas dengan kelas irisan kerucut.',
      'Melihat parabola sebagai batas antara elips dan hiperbola.',
    ],
  },
  tryThis: {
    en: [
      'Plane perpendicular to axis — circle.',
      'Tilt slightly — ellipse.',
      'Tilt to parallel-to-side — parabola. Past it — hyperbola (cuts both nappes).',
    ],
    id: [
      'Bidang tegak lurus sumbu — lingkaran.',
      'Miringkan sedikit — elips.',
      'Miringkan sejajar sisi — parabola. Lebih dari itu — hiperbola (memotong kedua kerucut).',
    ],
  },
  topics: ['geometry', 'conics'],
  load: () => import('./sim.js'),
};
