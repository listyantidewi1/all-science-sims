export default {
  id: 'anchoring-bias',
  subject: 'psychology',
  title: { en: 'Anchoring Bias', id: 'Bias Penjangkar' },
  description: {
    en: 'Tversky & Kahneman\'s classic finding: when asked to estimate an unknown quantity, people anchor on whatever number they see first — even if the anchor is irrelevant. Pick a question, drag the anchor, and watch the simulated population\'s estimates pull toward it. Strong anchors warp judgment by 50%+.',
    id: 'Temuan klasik Tversky & Kahneman: saat diminta memperkirakan kuantitas tak diketahui, orang berjangkar pada angka yang dilihat pertama — bahkan jika tidak relevan. Pilih pertanyaan, geser jangkar, dan amati estimasi populasi simulasi tertarik ke arahnya. Jangkar kuat membelokkan penilaian 50%+.',
  },
  objectives: {
    en: [
      'See how an irrelevant anchor pulls estimates toward itself.',
      'Notice that smarter or more-informed people are still affected (just less).',
      'Predict the bias for any anchor by linear interpolation toward the anchor.',
    ],
    id: [
      'Melihat bagaimana jangkar tak relevan menarik estimasi.',
      'Memperhatikan bahwa orang lebih cerdas/lebih banyak tahu tetap terpengaruh (hanya kurang).',
      'Memprediksi bias untuk jangkar apa pun dengan interpolasi linear.',
    ],
  },
  tryThis: {
    en: [
      'Anchor at the true value — estimates cluster correctly.',
      'Anchor 10× too high — average estimate jumps maybe 30–50%.',
      'Crank "anchor strength" up — the population gets stuck on it.',
    ],
    id: [
      'Jangkar di nilai benar — estimasi terkumpul tepat.',
      'Jangkar 10× terlalu tinggi — rata-rata estimasi melompat 30-50%.',
      'Naikkan "kekuatan jangkar" — populasi terjebak di jangkar.',
    ],
  },
  topics: ['biases', 'judgment'],
  load: () => import('./sim.js'),
};
