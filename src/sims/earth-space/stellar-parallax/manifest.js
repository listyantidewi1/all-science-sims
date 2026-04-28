export default {
  id: 'stellar-parallax',
  subject: 'earth-space',
  title: { en: 'Stellar Parallax', id: 'Paralaks Bintang' },
  description: {
    en: 'Earth orbits the Sun once a year, and a nearby star appears to wobble against the distant background. Slide the star\'s distance and watch the parallax angle shrink — the geometric foundation of every astronomical distance measurement.',
    id: 'Bumi mengelilingi Matahari sekali setahun, dan bintang dekat tampak bergoyang terhadap latar yang jauh. Atur jarak bintang dan amati sudut paralaks menyusut — dasar geometris untuk setiap pengukuran jarak astronomis.',
  },
  objectives: {
    en: [
      'Apply d (parsec) = 1 / p (arcsec).',
      'See parallax shrink rapidly with distance.',
      "Recognize why we couldn't measure it before precise telescopes (Bessel 1838).",
    ],
    id: [
      'Menerapkan d (parsec) = 1 / p (detik busur).',
      'Melihat paralaks menyusut cepat dengan jarak.',
      'Mengenali mengapa kita tak bisa mengukurnya sebelum teleskop presisi (Bessel 1838).',
    ],
  },
  tryThis: {
    en: [
      'Distance 10 parsec — what is parallax?',
      'Move to 100 pc — does parallax fall by 10×?',
      'Try 1 pc (closer than any real star) — what is the angle?',
    ],
    id: [
      'Jarak 10 parsec — berapa paralaksnya?',
      'Pindah ke 100 pc — apakah paralaks turun 10×?',
      'Coba 1 pc (lebih dekat dari bintang nyata) — berapa sudutnya?',
    ],
  },
  topics: ['astronomy', 'distance'],
  load: () => import('./sim.js'),
};
