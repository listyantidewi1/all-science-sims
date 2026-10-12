export default {
  id: 'phillips-curve',
  subject: 'finance',
  title: { en: 'Phillips Curve', id: 'Kurva Phillips' },
  description: {
    en: 'The classic short-run trade-off: low unemployment usually comes with higher inflation, and vice versa. Slide the central-bank stance and watch the economy move along the curve — and see how expectations can shift the curve itself.',
    id: 'Trade-off klasik jangka pendek: pengangguran rendah biasanya datang dengan inflasi tinggi, dan sebaliknya. Atur sikap bank sentral dan amati ekonomi bergerak di kurva — dan lihat bagaimana ekspektasi dapat menggeser kurva itu sendiri.',
  },
  details: () => import('./details.js'),
  topics: ['macroeconomics', 'inflation'],
  load: () => import('./sim.js'),
};
