export default {
  id: 'reaction-time',
  subject: 'psychology',
  title: { en: 'Reaction Time Test', id: 'Tes Waktu Reaksi' },
  description: {
    en: 'Wait for the screen to flash green, then click as fast as you can. Your reaction time gets logged across many trials so you can see your average and distribution. Compare simple-reaction (one stimulus) vs choice-reaction (red/green: only react to green) — the choice version takes ~150 ms longer.',
    id: 'Tunggu layar berkedip hijau, lalu klik secepat mungkin. Waktu reaksi Anda dicatat di banyak percobaan sehingga Anda dapat melihat rata-rata dan distribusinya. Bandingkan reaksi sederhana (satu stimulus) vs reaksi pilihan (merah/hijau: hanya bereaksi pada hijau) — versi pilihan butuh ~150 ms lebih lama.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'psychometrics'],
  load: () => import('./sim.js'),
};
