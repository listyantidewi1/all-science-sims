export default {
  id: 'slope-intercept',
  subject: 'mathematics',
  title: { en: 'Slope-Intercept y = mx + b', id: 'Bentuk Sumbu y = mx + b' },
  description: {
    en: 'Drag two points on the line and watch the slope m and y-intercept b update in real time. The "rise over run" triangle appears between the two points so the geometric meaning of slope is unmissable. Equation, slope formula, and a "find a point with given x" lookup are all live.',
    id: 'Tarik dua titik pada garis dan amati kemiringan m dan titik potong y b terbarui langsung. Segitiga "naik per turun" muncul di antara dua titik sehingga makna geometris kemiringan tidak terlewat. Persamaan, rumus kemiringan, dan pencarian "titik untuk x tertentu" hidup.',
  },
  details: () => import('./details.js'),
  topics: ['algebra', 'graphs'],
  load: () => import('./sim.js'),
};
