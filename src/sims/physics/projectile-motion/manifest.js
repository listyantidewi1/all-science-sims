export default {
  id: 'projectile-motion',
  subject: 'physics',
  title: { en: 'Projectile Motion', id: 'Gerak Parabola' },
  description: {
    en: 'Launch a projectile and watch how angle, speed, and gravity shape its trajectory. Compare ranges and peak heights with and without air drag.',
    id: 'Luncurkan proyektil dan amati bagaimana sudut, kecepatan, dan gravitasi membentuk lintasannya. Bandingkan jangkauan dan ketinggian puncak dengan atau tanpa hambatan udara.',
  },
  objectives: {
    en: [
      'Predict how launch angle affects horizontal range.',
      'Decompose velocity into horizontal and vertical components.',
      'Explain how gravity changes vertical velocity but not horizontal.',
    ],
    id: [
      'Memprediksi pengaruh sudut peluncuran terhadap jangkauan horizontal.',
      'Menguraikan kecepatan menjadi komponen horizontal dan vertikal.',
      'Menjelaskan bagaimana gravitasi mengubah kecepatan vertikal namun tidak horizontal.',
    ],
  },
  tryThis: {
    en: [
      'Find the launch angle that gives the longest range.',
      'Set air drag to 0 — does the optimal angle change?',
      'Match a target by tweaking only the speed.',
    ],
    id: [
      'Cari sudut peluncuran yang memberi jangkauan terjauh.',
      'Atur hambatan udara ke 0 — apakah sudut optimal berubah?',
      'Capai target dengan hanya mengubah kecepatan.',
    ],
  },
  topics: ['kinematics', 'gravity'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
