// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Connect step direction to negative gradient.',
      'See learning rate trade-off: speed vs stability.',
      'Distinguish convex vs non-convex landscapes (multiple minima).',
    ],
    id: [
      'Mengaitkan arah langkah dengan negatif gradien.',
      'Melihat trade-off learning rate: kecepatan vs kestabilan.',
      'Membedakan landskap konveks vs non-konveks (banyak minimum).',
    ],
  },  tryThis: {
    en: [
      'Lower learning rate to 0.005 — does it slow to a crawl?',
      'Raise learning rate to 0.5 — does it bounce out?',
      'Switch to multi-modal — does the start point matter?',
    ],
    id: [
      'Turunkan learning rate ke 0,005 — apakah merayap?',
      'Naikkan learning rate ke 0,5 — apakah memantul keluar?',
      'Beralih ke multi-modal — apakah titik awal penting?',
    ],
  },};
