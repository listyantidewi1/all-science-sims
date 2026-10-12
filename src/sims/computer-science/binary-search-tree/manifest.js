export default {
  id: 'binary-search-tree',
  subject: 'computer-science',
  title: { en: 'Binary Search Tree', id: 'Pohon Pencarian Biner' },
  description: {
    en: 'Insert, search, and delete numbers in a BST and watch the tree reorganize. See why ordered insertions create a degenerate tree and balanced insertions stay shallow.',
    id: 'Sisipkan, cari, dan hapus angka pada BST lalu amati pohon menata ulang. Lihat mengapa penyisipan terurut menghasilkan pohon merosot, sedangkan penyisipan seimbang tetap dangkal.',
  },
  details: () => import('./details.js'),
  topics: ['data-structures', 'trees'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
