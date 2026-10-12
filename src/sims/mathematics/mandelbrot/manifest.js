export default {
  id: 'mandelbrot',
  subject: 'mathematics',
  title: { en: 'Mandelbrot Set', id: 'Himpunan Mandelbrot' },
  description: {
    en: "z_{n+1} = z_n² + c. For each point c in the plane, ask: does this stay bounded as we iterate? The answer paints one of mathematics' most famous fractals. Click anywhere to zoom in — there's infinite detail at every scale.",
    id: 'z_{n+1} = z_n² + c. Untuk setiap titik c di bidang, tanyakan: apakah ini tetap terbatas saat diiterasi? Jawabannya melukis salah satu fraktal paling terkenal dalam matematika. Klik di mana saja untuk zoom — detail tak hingga di tiap skala.',
  },
  details: () => import('./details.js'),
  topics: ['fractals', 'complex'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
