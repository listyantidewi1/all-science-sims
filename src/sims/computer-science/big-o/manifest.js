export default {
  id: 'big-o',
  subject: 'computer-science',
  title: { en: 'Big-O Comparison', id: 'Perbandingan Big-O' },
  description: {
    en: 'O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) — slide n and watch them diverge by stunning amounts. The chart your CS professor drew on the board, but interactive.',
    id: 'O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!) — geser n dan amati keduanya menyimpang dengan jumlah memukau. Grafik dosen CS Anda di papan tulis, tapi interaktif.',
  },
  objectives: {
    en: [
      'Recognize the relative growth rates of common complexity classes.',
      'See why exponential and factorial are "intractable" past tiny n.',
      'Compare actual numerical values, not just shapes.',
    ],
    id: [
      'Mengenali laju pertumbuhan relatif kelas kompleksitas umum.',
      'Melihat mengapa eksponensial dan faktorial "intractable" untuk n kecil sekalipun.',
      'Membandingkan nilai numerik nyata, bukan sekadar bentuk.',
    ],
  },
  tryThis: {
    en: [
      'n=20 — what is 2ⁿ vs n²?',
      'n=10 — what is n!?',
      'Set log scale — does it linearize the exponentials?',
    ],
    id: [
      'n=20 — berapa 2ⁿ vs n²?',
      'n=10 — berapa n!?',
      'Atur skala log — apakah eksponensial jadi linear?',
    ],
  },
  topics: ['complexity', 'algorithms'],
  load: () => import('./sim.js'),
};
