export default {
  id: 'stroop-test',
  subject: 'psychology',
  title: { en: 'Stroop Test', id: 'Tes Stroop' },
  description: {
    en: 'Color words printed in mismatched ink — name the INK color, not the word. The classic Stroop effect: when word and color disagree, your brain takes longer to suppress reading. Run timed trials and watch your reaction time double on incongruent stimuli.',
    id: 'Kata warna dicetak dengan tinta yang tidak cocok — sebutkan warna TINTA, bukan kata. Efek Stroop klasik: saat kata dan warna berbeda, otak butuh lebih lama menekan kebiasaan membaca. Jalankan uji terjadwal dan amati waktu reaksi Anda lipat dua pada stimulus tak kongruen.',
  },
  objectives: {
    en: [
      'Experience automatic processing (reading) interfering with controlled processing (color naming).',
      'Compare congruent vs incongruent reaction times.',
      'See why "automatic" tasks are hard to override.',
    ],
    id: [
      'Mengalami proses otomatis (membaca) mengganggu proses terkendali (menamai warna).',
      'Membandingkan waktu reaksi kongruen vs tak kongruen.',
      'Memahami mengapa tugas "otomatis" sulit ditekan.',
    ],
  },
  tryThis: {
    en: [
      'Run 20 incongruent trials — your reaction time will be slower than congruent trials.',
      'Try matching tasks (same word + color) — fast and easy.',
      'Compare your average to the typical 30–50% slowdown for incongruent.',
    ],
    id: [
      'Jalankan 20 percobaan tak kongruen — waktu reaksi lebih lambat.',
      'Coba percobaan kongruen (kata + warna sama) — cepat dan mudah.',
      'Bandingkan rata-rata Anda dengan perlambatan tipikal 30-50%.',
    ],
  },
  topics: ['attention', 'cognitive-control'],
  load: () => import('./sim.js'),
};
