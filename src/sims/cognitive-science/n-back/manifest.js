export default {
  id: 'n-back',
  subject: 'cognitive-science',
  title: { en: 'N-Back Working Memory', id: 'Memori Kerja N-Back' },
  description: {
    en: 'A stream of letters (or lit squares on a 3×3 grid) appears one at a time. Press Match whenever the current item is the same as the one N steps back. With N = 1 it is easy; by N = 3 or 4 you must constantly update a small buffer while discarding old items — the core of working memory. Hits, misses, and false alarms are scored, and sensitivity d′ is plotted against N across runs so you can see your own capacity limit.',
    id: 'Rangkaian huruf (atau kotak menyala pada kisi 3×3) muncul satu per satu. Tekan Cocok setiap kali item saat ini sama dengan item N langkah sebelumnya. Dengan N = 1 mudah; pada N = 3 atau 4 Anda harus terus memperbarui penyangga kecil sambil membuang item lama — inti dari memori kerja. Hit, miss, dan alarm palsu diskor, dan sensitivitas d′ digambarkan terhadap N lintas percobaan sehingga Anda dapat melihat batas kapasitas Anda sendiri.',
  },
  details: () => import('./details.js'),
  topics: ['working-memory', 'executive-function'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
