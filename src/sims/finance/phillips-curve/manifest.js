export default {
  id: 'phillips-curve',
  subject: 'finance',
  title: { en: 'Phillips Curve', id: 'Kurva Phillips' },
  description: {
    en: 'The classic short-run trade-off: low unemployment usually comes with higher inflation, and vice versa. Slide the central-bank stance and watch the economy move along the curve — and see how expectations can shift the curve itself.',
    id: 'Trade-off klasik jangka pendek: pengangguran rendah biasanya datang dengan inflasi tinggi, dan sebaliknya. Atur sikap bank sentral dan amati ekonomi bergerak di kurva — dan lihat bagaimana ekspektasi dapat menggeser kurva itu sendiri.',
  },
  objectives: {
    en: [
      'Read the short-run inflation/unemployment trade-off.',
      'See how a shift in expected inflation moves the whole curve.',
      'Recognize the natural rate of unemployment as where π = πᵉ.',
    ],
    id: [
      'Membaca trade-off jangka pendek inflasi/pengangguran.',
      'Melihat ekspektasi inflasi menggeser kurva sebagai keseluruhan.',
      'Mengenali tingkat pengangguran alami di mana π = πᵉ.',
    ],
  },
  tryThis: {
    en: [
      'Increase expected inflation — does the curve shift up?',
      'Find the natural rate where actual = expected inflation.',
      "Crank loose policy — what happens to inflation?",
    ],
    id: [
      'Naikkan ekspektasi inflasi — apakah kurva bergeser ke atas?',
      'Cari tingkat alami di mana inflasi aktual = ekspektasi.',
      'Naikkan kebijakan longgar — apa yang terjadi pada inflasi?',
    ],
  },
  topics: ['macroeconomics', 'inflation'],
  load: () => import('./sim.js'),
};
