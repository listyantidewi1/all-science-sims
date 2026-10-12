// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See how local rules produce hubs with very high degree.',
      'Recognize a power-law in the degree histogram.',
      'Compare to a uniform random graph (no preferential attachment).',
    ],
    id: [
      'Melihat aturan lokal menghasilkan hub dengan derajat sangat tinggi.',
      'Mengenali power-law pada histogram derajat.',
      'Membandingkan dengan graf acak uniform (tanpa preferential attachment).',
    ],
  },  tryThis: {
    en: [
      'Run preferential attachment to 200 nodes — find the biggest hub.',
      'Switch to uniform — does any node become a giant hub?',
      'Increase m (links per new node) — does diameter shrink?',
    ],
    id: [
      'Jalankan preferential attachment hingga 200 simpul — cari hub terbesar.',
      'Beralih ke uniform — apakah ada simpul yang jadi hub raksasa?',
      'Naikkan m (jumlah link per simpul baru) — apakah diameter mengecil?',
    ],
  },};
