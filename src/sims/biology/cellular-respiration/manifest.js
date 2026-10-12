export default {
  id: 'cellular-respiration',
  subject: 'biology',
  title: { en: 'Cellular Respiration', id: 'Respirasi Sel' },
  description: {
    en: 'How cells turn glucose into ATP. Step through glycolysis, the Krebs cycle, and the electron transport chain — counting molecules of ATP, NADH, FADH₂, CO₂ at every stage. The complete budget of aerobic respiration in one diagram.',
    id: 'Bagaimana sel mengubah glukosa menjadi ATP. Telusuri glikolisis, siklus Krebs, dan rantai transpor elektron — menghitung molekul ATP, NADH, FADH₂, CO₂ pada setiap tahap. Anggaran lengkap respirasi aerobik dalam satu diagram.',
  },
  details: () => import('./details.js'),
  topics: ['metabolism', 'cell-biology'],
  load: () => import('./sim.js'),
};
