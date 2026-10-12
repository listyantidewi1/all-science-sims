export default {
  id: 'big-o',
  subject: 'computer-science',
  title: { en: 'Big-O Comparison', id: 'Perbandingan Big-O' },
  description: {
    en: 'O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) — slide n and watch them diverge by stunning amounts. The chart your CS professor drew on the board, but interactive.',
    id: 'O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) — geser n dan amati keduanya menyimpang dengan jumlah memukau. Grafik dosen CS Anda di papan tulis, tapi interaktif.',
  },
  details: () => import('./details.js'),
  topics: ['complexity', 'algorithms'],
  hasLab: true,
  load: () => import('./sim.js'),
};
