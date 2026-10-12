export default {
  id: 'hash-tables',
  subject: 'computer-science',
  title: { en: 'Hash Tables & Collisions', id: 'Tabel Hash & Tumbukan' },
  description: {
    en: 'Hash any string into a small table. Watch how a tiny range of buckets fills up, and see collisions handled by chaining (linked list) or open addressing (linear probe). The load-factor / lookup-cost trade-off, made visible.',
    id: 'Hash string apa pun ke tabel kecil. Amati rentang bucket kecil terisi, dan lihat tumbukan ditangani lewat chaining (linked list) atau open addressing (linear probe). Trade-off load factor / biaya lookup, terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['data-structures', 'hashing'],
  load: () => import('./sim.js'),
};
