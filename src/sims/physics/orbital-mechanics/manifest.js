export default {
  id: 'orbital-mechanics',
  subject: 'physics',
  title: { en: 'Orbital Mechanics (Kepler)', id: 'Mekanika Orbit (Kepler)' },
  description: {
    en: 'Drag a planet, then drag again to set its initial velocity, and let go. Watch it carve out an ellipse with the sun at one focus — Kepler\'s first law. Try to get a circular orbit, an escape trajectory, or a comet-like ellipse.',
    id: 'Seret planet, lalu seret sekali lagi untuk mengatur kecepatan awalnya, kemudian lepaskan. Amati ia membentuk elips dengan matahari di salah satu fokusnya — hukum Kepler pertama. Cobalah orbit lingkaran, lintasan lepas, atau elips mirip komet.',
  },
  details: () => import('./details.js'),
  topics: ['gravity', 'orbits'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
