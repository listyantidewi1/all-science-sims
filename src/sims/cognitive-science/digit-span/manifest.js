export default {
  id: 'digit-span',
  subject: 'cognitive-science',
  title: { en: 'Digit Span (Working Memory)', id: 'Digit Span (Memori Kerja)' },
  description: {
    en: 'A sequence of digits flashes on the screen. Type them back. Each correct trial extends the sequence by one. Most adults max out around 7 ± 2 digits — Miller\'s "magical number". Try forward and backward variants and find your own working-memory capacity.',
    id: 'Sebuah urutan digit berkedip di layar. Ketik kembali. Setiap percobaan benar memperpanjang urutan satu digit. Kebanyakan orang dewasa mencapai sekitar 7 ± 2 digit — "angka ajaib" Miller. Coba versi maju dan mundur dan temukan kapasitas memori kerja Anda.',
  },
  details: () => import('./details.js'),
  topics: ['memory', 'working-memory'],
  grade: [8, 9, 10, 11, 12],
  load: () => import('./sim.js'),
};
