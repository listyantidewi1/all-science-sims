export default {
  id: 'fractals',
  subject: 'computer-science',
  title: { en: 'Fractals & Recursion', id: 'Fraktal & Rekursi' },
  description: {
    en: 'Pick a recursive shape — Sierpinski triangle, Koch snowflake, fractal tree — and slide the depth from 0 to 8 to watch infinite detail emerge from a few self-referencing rules.',
    id: 'Pilih bentuk rekursif — segitiga Sierpinski, kepingan salju Koch, pohon fraktal — lalu geser kedalaman dari 0 ke 8 untuk melihat detail tak hingga muncul dari beberapa aturan saling acu.',
  },
  details: () => import('./details.js'),
  topics: ['recursion', 'fractals'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
