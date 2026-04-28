export default {
  id: 'orbital-mechanics',
  subject: 'physics',
  title: { en: 'Orbital Mechanics (Kepler)', id: 'Mekanika Orbit (Kepler)' },
  description: {
    en: 'Drag a planet, then drag again to set its initial velocity, and let go. Watch it carve out an ellipse with the sun at one focus — Kepler\'s first law. Try to get a circular orbit, an escape trajectory, or a comet-like ellipse.',
    id: 'Seret planet, lalu seret sekali lagi untuk mengatur kecepatan awalnya, kemudian lepaskan. Amati ia membentuk elips dengan matahari di salah satu fokusnya — hukum Kepler pertama. Cobalah orbit lingkaran, lintasan lepas, atau elips mirip komet.',
  },
  objectives: {
    en: [
      'Apply Kepler\'s 1st law: orbits are ellipses with the sun at a focus.',
      'See Kepler\'s 2nd law: equal areas swept in equal time.',
      'Connect total energy sign to bound vs unbound trajectories.',
    ],
    id: [
      'Menerapkan hukum Kepler 1: orbit adalah elips dengan matahari di salah satu fokus.',
      'Melihat hukum Kepler 2: luas yang disapu sama dalam waktu sama.',
      'Mengaitkan tanda energi total dengan lintasan terikat vs tak terikat.',
    ],
  },
  tryThis: {
    en: [
      'Aim a perpendicular launch at just the right speed — does it circle?',
      'Slightly faster — does the orbit get more elongated?',
      'Faster than escape velocity — does it leave forever?',
    ],
    id: [
      'Bidik peluncuran tegak lurus pada kecepatan tepat — apakah menjadi lingkaran?',
      'Sedikit lebih cepat — apakah orbit memanjang?',
      'Lebih cepat dari kecepatan lepas — apakah benda pergi selamanya?',
    ],
  },
  topics: ['gravity', 'orbits'],
  load: () => import('./sim.js'),
};
