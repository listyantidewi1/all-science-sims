export default {
  id: 'anchoring-bias',
  subject: 'psychology',
  title: { en: 'Anchoring Bias', id: 'Bias Penjangkar' },
  description: {
    en: 'Tversky & Kahneman\'s classic finding: when asked to estimate an unknown quantity, people anchor on whatever number they see first — even if the anchor is irrelevant. Pick a question, drag the anchor, and watch the simulated population\'s estimates pull toward it. Strong anchors warp judgment by 50%+.',
    id: 'Temuan klasik Tversky & Kahneman: saat diminta memperkirakan kuantitas tak diketahui, orang berjangkar pada angka yang dilihat pertama — bahkan jika tidak relevan. Pilih pertanyaan, geser jangkar, dan amati estimasi populasi simulasi tertarik ke arahnya. Jangkar kuat membelokkan penilaian 50%+.',
  },
  details: () => import('./details.js'),
  topics: ['biases', 'judgment'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
