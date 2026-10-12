export default {
  id: 'projectile-motion',
  subject: 'physics',
  title: { en: 'Projectile Motion', id: 'Gerak Parabola' },
  description: {
    en: 'Launch a projectile and watch how angle, speed, and gravity shape its trajectory. Compare ranges and peak heights with and without air drag.',
    id: 'Luncurkan proyektil dan amati bagaimana sudut, kecepatan, dan gravitasi membentuk lintasannya. Bandingkan jangkauan dan ketinggian puncak dengan atau tanpa hambatan udara.',
  },
  details: () => import('./details.js'),
  topics: ['kinematics', 'gravity'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
