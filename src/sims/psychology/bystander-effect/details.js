// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Explain diffusion of responsibility and why it lowers each individual\'s chance of helping.',
      'Distinguish the probability that one person helps from the probability that anyone helps.',
      'Compare a simulated model with the Darley & Latané (1968) findings.',
    ],
    id: [
      'Menjelaskan difusi tanggung jawab dan mengapa hal itu menurunkan peluang tiap individu menolong.',
      'Membedakan peluang satu orang menolong dari peluang ada siapa pun yang menolong.',
      'Membandingkan model simulasi dengan temuan Darley & Latané (1968).',
    ],
  },
  tryThis: {
    en: [
      'Set diffusion to 0 and run 200 trials — does the simulation match the naive expectation?',
      'Raise diffusion until the simulated curve passes near the three Darley & Latané points.',
      'Watch single trials at group size 6: how long does it take before anyone moves?',
    ],
    id: [
      'Atur difusi ke 0 dan jalankan 200 percobaan — apakah simulasi cocok dengan dugaan naif?',
      'Naikkan difusi sampai kurva simulasi melewati dekat tiga titik Darley & Latané.',
      'Amati percobaan tunggal pada ukuran kelompok 6: berapa lama sebelum ada yang bergerak?',
    ],
  },
};
