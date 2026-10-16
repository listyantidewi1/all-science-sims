export default {
  id: 'similar-triangles',
  subject: 'mathematics',
  title: { en: 'Similar and Congruent Triangles', id: 'Kesebangunan dan Kekongruenan' },
  description: {
    en: 'Drag the corners of two triangles on a grid and watch their side lengths, side ratios and angles update live. The sim tells you when the triangles are similar (equal angles, equal side ratios) or congruent (exactly the same size) and names the rule that proves it: AA, SSS, SAS or ASA. A "shadow of a tree" preset shows how similar triangles let you measure a tree without climbing it.',
    id: 'Seret titik sudut dua segitiga di atas kisi dan amati panjang sisi, perbandingan sisi, dan besar sudutnya berubah secara langsung. Simulasi memberi tahu kapan kedua segitiga sebangun (sudut sama, perbandingan sisi sama) atau kongruen (ukurannya tepat sama) dan menyebutkan aturan yang membuktikannya: sudut-sudut, sisi-sisi-sisi, sisi-sudut-sisi, atau sudut-sisi-sudut. Pengaturan "bayangan pohon" menunjukkan cara segitiga sebangun dipakai untuk mengukur tinggi pohon tanpa memanjatnya.',
  },
  topics: ['geometry', 'triangles', 'similarity', 'congruence'],
  grade: [9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
