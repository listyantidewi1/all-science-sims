export default {
  id: 'stellar-parallax',
  subject: 'earth-space',
  title: { en: 'Stellar Parallax', id: 'Paralaks Bintang' },
  description: {
    en: 'Earth orbits the Sun once a year, and a nearby star appears to wobble against the distant background. Slide the star\'s distance and watch the parallax angle shrink — the geometric foundation of every astronomical distance measurement.',
    id: 'Bumi mengelilingi Matahari sekali setahun, dan bintang dekat tampak bergoyang terhadap latar yang jauh. Atur jarak bintang dan amati sudut paralaks menyusut — dasar geometris untuk setiap pengukuran jarak astronomis.',
  },
  details: () => import('./details.js'),
  topics: ['astronomy', 'distance'],
  hasLab: true,
  load: () => import('./sim.js'),
};
