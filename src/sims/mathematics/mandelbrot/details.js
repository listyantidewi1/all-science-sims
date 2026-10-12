// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
