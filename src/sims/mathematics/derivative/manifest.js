export default {
  id: 'derivative',
  subject: 'mathematics',
  title: { en: 'Derivative as Tangent Slope', id: 'Turunan sebagai Kemiringan Garis Singgung' },
  description: {
    en: "Drag a point along a curve and watch its tangent line rotate. The slope of that tangent IS the derivative — and the second curve below traces it out as you move.",
    id: 'Seret titik di sepanjang kurva dan amati garis singgungnya berputar. Kemiringan garis itulah turunannya — dan kurva kedua di bawah menjejakinya saat Anda menggeser.',
  },
  objectives: {
    en: [
      "See the derivative defined geometrically as instantaneous slope.",
      "Identify where f' = 0 (turning points) and where f' is positive/negative.",
      'Compare a function with its derivative side by side.',
    ],
    id: [
      'Melihat turunan didefinisikan secara geometris sebagai kemiringan sesaat.',
      "Mengenali di mana f' = 0 (titik balik) dan di mana f' positif/negatif.",
      'Membandingkan fungsi dengan turunannya secara berdampingan.',
    ],
  },
  tryThis: {
    en: [
      "Drag to the top of the curve — what does f' equal there?",
      "Find where f' is most positive — what does the curve look like?",
      "Switch to sin(x) — what's its derivative shape?",
    ],
    id: [
      "Geser ke puncak kurva — berapa f' di sana?",
      "Cari titik di mana f' paling positif — bagaimana bentuk kurvanya?",
      "Beralih ke sin(x) — bagaimana bentuk turunannya?",
    ],
  },
  topics: ['calculus', 'derivatives'],
  load: () => import('./sim.js'),
};
