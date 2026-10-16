export default {
  id: 'linear-equation-balance',
  subject: 'mathematics',
  title: { en: 'Equation Balance', id: 'Timbangan Persamaan' },
  description: {
    en: 'An equation is a balanced scale: bags that each hide the same unknown number x sit on the pans with unit weights. Take the same thing off both sides, or share both sides into equal groups, and the scale stays level until a single bag is left alone — that is the value of x. Try six ready-made equations or a random one, then switch to inequalities, where the scale tilts toward the heavier side.',
    id: 'Persamaan adalah timbangan yang seimbang: kantong-kantong yang masing-masing menyembunyikan bilangan x yang sama diletakkan di piringan bersama beban satuan. Ambil benda yang sama dari kedua sisi, atau bagi kedua sisi menjadi kelompok yang sama, dan timbangan tetap datar sampai satu kantong tersisa sendirian — itulah nilai x. Coba enam persamaan siap pakai atau persamaan acak, lalu beralih ke pertidaksamaan, yang membuat timbangan miring ke sisi yang lebih berat.',
  },
  topics: ['linear equations', 'inequalities', 'algebra', 'balance model'],
  grade: [7, 8],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
