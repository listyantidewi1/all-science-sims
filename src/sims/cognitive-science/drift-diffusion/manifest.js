export default {
  id: 'drift-diffusion',
  subject: 'cognitive-science',
  title: { en: 'Drift-Diffusion Decisions', id: 'Keputusan Difusi-Drift' },
  description: {
    en: 'Watch dozens of noisy evidence traces race from a starting point toward an upper (correct) or lower (error) boundary. The drift rate sets how fast evidence favors the right answer, noise jitters each trace, boundary separation sets how cautious the decider is, and non-decision time adds a fixed delay for perception and the motor response. Response-time histograms build up above and below the traces, and a boundary sweep lays bare the speed–accuracy tradeoff.',
    id: 'Amati puluhan lintasan bukti yang bising berpacu dari titik awal menuju batas atas (benar) atau bawah (salah). Laju drift menentukan seberapa cepat bukti mendukung jawaban yang benar, derau menggoyang tiap lintasan, jarak batas menentukan seberapa hati-hati pengambil keputusan, dan waktu non-keputusan menambah jeda tetap untuk persepsi dan respons motorik. Histogram waktu respons terbentuk di atas dan di bawah lintasan, dan sapuan batas memperlihatkan pertukaran kecepatan–akurasi.',
  },
  details: () => import('./details.js'),
  topics: ['decision-making', 'computational-modeling'],
  grade: [13],
  hasLab: true,
  load: () => import('./sim.js'),
};
