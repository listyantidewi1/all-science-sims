export default {
  id: 'inclined-plane',
  subject: 'physics',
  title: { en: 'Inclined Plane with Friction', id: 'Bidang Miring dengan Gesekan' },
  description: {
    en: 'A block on a ramp. Drag the angle slider, set the friction coefficient, and watch the block slide, stick, or accelerate. Live free-body diagram showing the resolved gravity components, normal force, and friction.',
    id: 'Balok di atas bidang miring. Geser sudut, atur koefisien gesekan, dan amati balok meluncur, diam, atau memercepat. Diagram benda bebas langsung menampilkan komponen gravitasi terurai, gaya normal, dan gesekan.',
  },
  details: () => import('./details.js'),
  topics: ['mechanics', 'forces'],
  grade: [10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
