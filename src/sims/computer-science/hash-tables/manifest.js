export default {
  id: 'hash-tables',
  subject: 'computer-science',
  title: { en: 'Hash Tables & Collisions', id: 'Tabel Hash & Tumbukan' },
  description: {
    en: 'Hash any string into a small table. Watch how a tiny range of buckets fills up, and see collisions handled by chaining (linked list) or open addressing (linear probe). The load-factor / lookup-cost trade-off, made visible.',
    id: 'Hash string apa pun ke tabel kecil. Amati rentang bucket kecil terisi, dan lihat tumbukan ditangani lewat chaining (linked list) atau open addressing (linear probe). Trade-off load factor / biaya lookup, terlihat.',
  },
  objectives: {
    en: [
      'Read hash function output and bucket index = h(key) mod N.',
      'Distinguish chaining from open addressing.',
      'See lookup cost rise sharply as load factor approaches 1.',
    ],
    id: [
      'Membaca output fungsi hash dan indeks bucket = h(kunci) mod N.',
      'Membedakan chaining dari open addressing.',
      'Melihat biaya lookup melonjak saat load factor mendekati 1.',
    ],
  },
  tryThis: {
    en: [
      'Insert names — watch buckets fill.',
      'Switch to open addressing and try to fill the table — what happens?',
      'Resize from 16 buckets to 4 — does collision rate explode?',
    ],
    id: [
      'Sisipkan nama — amati bucket terisi.',
      'Beralih ke open addressing dan coba isi penuh — apa yang terjadi?',
      'Ubah ukuran dari 16 ke 4 bucket — apakah tumbukan meledak?',
    ],
  },
  topics: ['data-structures', 'hashing'],
  load: () => import('./sim.js'),
};
