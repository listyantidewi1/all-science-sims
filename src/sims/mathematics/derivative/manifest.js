export default {
  id: 'derivative',
  subject: 'mathematics',
  title: { en: 'Derivative as Tangent Slope', id: 'Turunan sebagai Kemiringan Garis Singgung' },
  description: {
    en: "Drag a point along a curve and watch its tangent line rotate. The slope of that tangent IS the derivative — and the second curve below traces it out as you move.",
    id: 'Seret titik di sepanjang kurva dan amati garis singgungnya berputar. Kemiringan garis itulah turunannya — dan kurva kedua di bawah menjejakinya saat Anda menggeser.',
  },
  details: () => import('./details.js'),
  topics: ['calculus', 'derivatives'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
