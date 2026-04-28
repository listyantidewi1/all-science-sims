export default {
  id: 'pi-polygons',
  subject: 'mathematics',
  title: { en: "Archimedes' π from Polygons", id: 'π Archimedes dari Poligon' },
  description: {
    en: 'Sandwich the unit circle between an inscribed and a circumscribed regular n-gon. Their perimeters bracket 2π — and converge to it as n grows. Archimedes used this in 250 BC to prove π is between 3.1408 and 3.1428.',
    id: 'Apit lingkaran satuan antara n-gon teratur di dalam dan di luarnya. Keliling keduanya mengapit 2π — dan menyatu padanya saat n bertambah. Archimedes memakai ini pada 250 SM untuk membuktikan π antara 3,1408 dan 3,1428.',
  },
  objectives: {
    en: [
      'Bracket π between two computable bounds.',
      'See convergence rate slow but reliable.',
      'Recognize an early example of the calculus idea of limits.',
    ],
    id: [
      'Mengapit π antara dua batas yang dapat dihitung.',
      'Melihat laju konvergensi yang lambat tapi andal.',
      'Mengenali contoh awal gagasan limit dalam kalkulus.',
    ],
  },
  tryThis: {
    en: [
      'n=6 — what bracket? Compare with Archimedes (n=96).',
      'Pump n to 1000 — how many digits of π are stable?',
      'Watch outer perimeter approach from above, inner from below.',
    ],
    id: [
      'n=6 — apa batas atas-bawahnya? Bandingkan dengan Archimedes (n=96).',
      'Naikkan n ke 1000 — berapa digit π yang stabil?',
      'Amati keliling luar mendekati dari atas, dalam dari bawah.',
    ],
  },
  topics: ['geometry', 'pi'],
  load: () => import('./sim.js'),
};
