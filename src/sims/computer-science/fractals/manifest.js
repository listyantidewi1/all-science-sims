export default {
  id: 'fractals',
  subject: 'computer-science',
  title: { en: 'Fractals & Recursion', id: 'Fraktal & Rekursi' },
  description: {
    en: 'Pick a recursive shape — Sierpinski triangle, Koch snowflake, fractal tree — and slide the depth from 0 to 8 to watch infinite detail emerge from a few self-referencing rules.',
    id: 'Pilih bentuk rekursif — segitiga Sierpinski, kepingan salju Koch, pohon fraktal — lalu geser kedalaman dari 0 ke 8 untuk melihat detail tak hingga muncul dari beberapa aturan saling acu.',
  },
  objectives: {
    en: [
      'Recognize self-similarity at multiple scales.',
      'See how depth controls visual complexity exponentially.',
      'Connect a recursive function to its visual output.',
    ],
    id: [
      'Mengenali kemiripan diri pada banyak skala.',
      'Melihat bagaimana kedalaman mengendalikan kompleksitas visual secara eksponensial.',
      'Menghubungkan fungsi rekursif dengan output visualnya.',
    ],
  },
  tryThis: {
    en: [
      'Set depth = 0, then watch how each step adds detail.',
      'Switch to a fractal tree and bend the branch angle.',
      'Predict how many triangles appear at depth 6.',
    ],
    id: [
      'Atur kedalaman = 0, lalu amati bagaimana tiap langkah menambah detail.',
      'Beralih ke pohon fraktal dan ubah sudut cabang.',
      'Tebak banyak segitiga pada kedalaman 6.',
    ],
  },
  topics: ['recursion', 'fractals'],
  load: () => import('./sim.js'),
};
