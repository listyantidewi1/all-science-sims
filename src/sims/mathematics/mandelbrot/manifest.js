export default {
  id: 'mandelbrot',
  subject: 'mathematics',
  title: { en: 'Mandelbrot Set', id: 'Himpunan Mandelbrot' },
  description: {
    en: "z_{n+1} = z_n² + c. For each point c in the plane, ask: does this stay bounded as we iterate? The answer paints one of mathematics' most famous fractals. Click anywhere to zoom in — there's infinite detail at every scale.",
    id: 'z_{n+1} = z_n² + c. Untuk setiap titik c di bidang, tanyakan: apakah ini tetap terbatas saat diiterasi? Jawabannya melukis salah satu fraktal paling terkenal dalam matematika. Klik di mana saja untuk zoom — detail tak hingga di tiap skala.',
  },
  objectives: {
    en: [
      'Apply the Mandelbrot iteration: z_{n+1} = z_n² + c.',
      'See self-similarity at every zoom level.',
      'Distinguish points in the set (black) from outside (color = escape time).',
    ],
    id: [
      'Menerapkan iterasi Mandelbrot: z_{n+1} = z_n² + c.',
      'Melihat kemiripan diri di setiap level zoom.',
      'Membedakan titik dalam himpunan (hitam) dari luar (warna = waktu lepas).',
    ],
  },
  tryThis: {
    en: [
      'Click on the boundary — zoom into a deep mini-Mandelbrot.',
      'Click into the bulb on the left — find a smaller copy.',
      'Try max iterations 50 vs 500 at deep zoom.',
    ],
    id: [
      'Klik pada batas — zoom ke mini-Mandelbrot yang dalam.',
      'Klik ke gelembung kiri — temukan salinan kecilnya.',
      'Coba iterasi max 50 vs 500 di zoom dalam.',
    ],
  },
  topics: ['fractals', 'complex'],
  load: () => import('./sim.js'),
};
