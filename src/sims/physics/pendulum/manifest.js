export default {
  id: 'pendulum',
  subject: 'physics',
  title: { en: 'Simple Pendulum', id: 'Bandul Sederhana' },
  description: {
    en: 'Swing a pendulum and explore how length, gravity, and initial angle change its period. Compare the small-angle approximation against the full nonlinear motion.',
    id: 'Ayunkan bandul dan pelajari bagaimana panjang, gravitasi, dan sudut awal mengubah periodenya. Bandingkan pendekatan sudut kecil dengan gerak penuh tak linear.',
  },
  objectives: {
    en: [
      'Use T = 2π√(L/g) to predict period for small angles.',
      'Identify which variables affect period and which do not.',
      'See where the small-angle approximation breaks down.',
    ],
    id: [
      'Menggunakan T = 2π√(L/g) untuk memprediksi periode pada sudut kecil.',
      'Mengenali variabel mana yang memengaruhi periode dan mana yang tidak.',
      'Melihat batas keberlakuan pendekatan sudut kecil.',
    ],
  },
  tryThis: {
    en: [
      'Double the length — does the period double?',
      'Set the angle to 80° — how off is the small-angle prediction?',
      'Set gravity to lunar (1.6 m/s²) — measure the new period.',
    ],
    id: [
      'Gandakan panjang tali — apakah periode juga ikut menggandakan?',
      'Atur sudut ke 80° — seberapa meleset prediksi sudut kecil?',
      'Atur gravitasi ke nilai bulan (1,6 m/s²) — ukur periode barunya.',
    ],
  },
  topics: ['oscillation', 'gravity'],
  grade: [10, 11],
  hasLab: true,
  load: () => import('./sim.js'),
};
