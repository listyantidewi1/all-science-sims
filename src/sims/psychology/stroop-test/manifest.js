export default {
  id: 'stroop-test',
  subject: 'psychology',
  title: { en: 'Stroop Test', id: 'Tes Stroop' },
  description: {
    en: 'Color words printed in mismatched ink — name the INK color, not the word. The classic Stroop effect: when word and color disagree, your brain takes longer to suppress reading. Run timed trials and watch your reaction time double on incongruent stimuli.',
    id: 'Kata warna dicetak dengan tinta yang tidak cocok — sebutkan warna TINTA, bukan kata. Efek Stroop klasik: saat kata dan warna berbeda, otak butuh lebih lama menekan kebiasaan membaca. Jalankan uji terjadwal dan amati waktu reaksi Anda lipat dua pada stimulus tak kongruen.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'cognitive-control'],
  grade: [8, 9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
