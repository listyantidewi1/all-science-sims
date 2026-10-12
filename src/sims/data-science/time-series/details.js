// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See lag introduced by larger windows.',
      'Compare moving-average vs EMA characteristics.',
      "Recognize a smoothing trade-off: noise rejection vs responsiveness.",
    ],
    id: [
      'Melihat lag yang diperkenalkan oleh jendela yang lebih besar.',
      'Membandingkan ciri rata-rata bergerak vs EMA.',
      'Mengenali trade-off penghalusan: penolakan derau vs responsivitas.',
    ],
  },  tryThis: {
    en: [
      'Window 5 vs 20 — does lag increase?',
      'EMA α = 0.05 — very smooth but laggy?',
      'Add a step function — see how each smoother reacts.',
    ],
    id: [
      'Jendela 5 vs 20 — apakah lag meningkat?',
      'EMA α = 0,05 — sangat halus tapi lag besar?',
      'Tambahkan fungsi langkah — amati reaksi tiap penghalus.',
    ],
  },};
