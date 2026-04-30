export default {
  id: 'reaction-time',
  subject: 'psychology',
  title: { en: 'Reaction Time Test', id: 'Tes Waktu Reaksi' },
  description: {
    en: 'Wait for the screen to flash green, then click as fast as you can. Your reaction time gets logged across many trials so you can see your average and distribution. Compare simple-reaction (one stimulus) vs choice-reaction (red/green: only react to green) — the choice version takes ~150 ms longer.',
    id: 'Tunggu layar berkedip hijau, lalu klik secepat mungkin. Waktu reaksi Anda dicatat di banyak percobaan sehingga Anda dapat melihat rata-rata dan distribusinya. Bandingkan reaksi sederhana (satu stimulus) vs reaksi pilihan (merah/hijau: hanya bereaksi pada hijau) — versi pilihan butuh ~150 ms lebih lama.',
  },
  objectives: {
    en: [
      'Measure your simple reaction time (~250 ms typical).',
      'See the +150 ms cost of adding a yes/no decision.',
      'Watch the distribution: lognormal-ish, with rare slow outliers.',
    ],
    id: [
      'Mengukur waktu reaksi sederhana Anda (~250 ms tipikal).',
      'Melihat biaya +150 ms saat menambah keputusan ya/tidak.',
      'Mengamati distribusi: agak lognormal, dengan beberapa pencilan lambat.',
    ],
  },
  tryThis: {
    en: [
      'Simple mode: react when green appears.',
      'Choice mode: only react to green; ignore red.',
      'Run 30 trials and read your mean and distribution.',
    ],
    id: [
      'Mode sederhana: reaksi saat hijau muncul.',
      'Mode pilihan: hanya bereaksi pada hijau; abaikan merah.',
      'Jalankan 30 percobaan dan baca rata-rata serta distribusi.',
    ],
  },
  topics: ['attention', 'psychometrics'],
  load: () => import('./sim.js'),
};
