export default {
  id: 'enzyme-activity',
  subject: 'biology',
  title: { en: 'Enzyme Activity', id: 'Aktivitas Enzim' },
  description: {
    en: 'Tune temperature and pH on a generic enzyme and watch its catalytic rate rise to a peak then crash as the protein denatures. Compare a few common enzymes at once.',
    id: 'Atur suhu dan pH pada enzim dan amati laju katalitiknya naik ke puncak lalu jatuh ketika protein terdenaturasi. Bandingkan beberapa enzim umum sekaligus.',
  },
  objectives: {
    en: [
      'Read an optimum from a temperature/pH curve.',
      'Explain why enzymes lose activity outside their range.',
      'Predict why pepsin and trypsin work in different parts of the gut.',
    ],
    id: [
      'Membaca titik optimum dari kurva suhu/pH.',
      'Menjelaskan mengapa enzim kehilangan aktivitas di luar rentangnya.',
      'Memprediksi mengapa pepsin dan tripsin bekerja di bagian usus berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Find pepsin\'s optimum pH — does it match the stomach (~2)?',
      'Heat past 50 °C — does any enzyme survive?',
      'Add an inhibitor — how does the curve change?',
    ],
    id: [
      'Temukan pH optimum pepsin — sesuai dengan lambung (~2)?',
      'Panaskan hingga di atas 50 °C — apakah ada enzim yang bertahan?',
      'Tambahkan inhibitor — bagaimana kurva berubah?',
    ],
  },
  topics: ['enzymes', 'biochemistry'],
  load: () => import('./sim.js'),
};
