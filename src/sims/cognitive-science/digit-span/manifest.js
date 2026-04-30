export default {
  id: 'digit-span',
  subject: 'cognitive-science',
  title: { en: 'Digit Span (Working Memory)', id: 'Digit Span (Memori Kerja)' },
  description: {
    en: 'A sequence of digits flashes on the screen. Type them back. Each correct trial extends the sequence by one. Most adults max out around 7 ± 2 digits — Miller\'s "magical number". Try forward and backward variants and find your own working-memory capacity.',
    id: 'Sebuah urutan digit berkedip di layar. Ketik kembali. Setiap percobaan benar memperpanjang urutan satu digit. Kebanyakan orang dewasa mencapai sekitar 7 ± 2 digit — "angka ajaib" Miller. Coba versi maju dan mundur dan temukan kapasitas memori kerja Anda.',
  },
  objectives: {
    en: [
      'Measure your forward digit span (typically 7 ± 2).',
      'Measure backward span (typically 1–2 less than forward).',
      'See how chunking strategies extend effective capacity.',
    ],
    id: [
      'Mengukur digit span maju Anda (tipikal 7 ± 2).',
      'Mengukur span mundur (tipikal 1-2 kurang dari maju).',
      'Melihat strategi chunking memperpanjang kapasitas efektif.',
    ],
  },
  tryThis: {
    en: [
      'Forward — recall as shown.',
      'Backward — recall in reverse order.',
      'Group digits into pairs or triples — capacity expands.',
    ],
    id: [
      'Maju — ingat seperti ditampilkan.',
      'Mundur — ingat urutan terbalik.',
      'Kelompokkan digit menjadi pasangan atau triplet — kapasitas meluas.',
    ],
  },
  topics: ['memory', 'working-memory'],
  load: () => import('./sim.js'),
};
