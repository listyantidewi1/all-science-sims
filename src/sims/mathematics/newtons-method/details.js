// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      "Apply x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Compare quadratic convergence near a root vs slow start far away.',
      'See cycles, divergence, and basins of attraction.',
    ],
    id: [
      "Menerapkan x_{n+1} = x_n − f(x_n)/f'(x_n).",
      'Membandingkan konvergensi kuadratik dekat akar vs awal lambat di kejauhan.',
      'Melihat siklus, divergensi, dan basin of attraction.',
    ],
  },  tryThis: {
    en: [
      'Click near a root — usually 3-4 iterations.',
      "Click far away — does it overshoot or settle on the wrong root?",
      "Try f(x) = x³ - x — three roots, three basins.",
    ],
    id: [
      'Klik dekat akar — biasanya 3-4 iterasi.',
      'Klik jauh — apakah melompati atau menetap di akar yang salah?',
      'Coba f(x) = x³ - x — tiga akar, tiga basin.',
    ],
  },};
