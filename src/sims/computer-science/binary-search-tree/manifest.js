export default {
  id: 'binary-search-tree',
  subject: 'computer-science',
  title: { en: 'Binary Search Tree', id: 'Pohon Pencarian Biner' },
  description: {
    en: 'Insert, search, and delete numbers in a BST and watch the tree reorganize. See why ordered insertions create a degenerate tree and balanced insertions stay shallow.',
    id: 'Sisipkan, cari, dan hapus angka pada BST lalu amati pohon menata ulang. Lihat mengapa penyisipan terurut menghasilkan pohon merosot, sedangkan penyisipan seimbang tetap dangkal.',
  },
  objectives: {
    en: [
      'Apply BST insert, search, and delete rules.',
      'Recognize how tree shape determines lookup cost.',
      'Identify pathological vs balanced insertion orders.',
    ],
    id: [
      'Menerapkan aturan sisip, cari, dan hapus pada BST.',
      'Mengenali bagaimana bentuk pohon menentukan biaya pencarian.',
      'Mengidentifikasi urutan penyisipan patologis vs seimbang.',
    ],
  },
  tryThis: {
    en: [
      'Insert 1, 2, 3, 4, 5 in order — what shape is the tree?',
      'Insert the same numbers in order 3, 1, 4, 2, 5 — compare height.',
      'Delete the root — which node replaces it?',
    ],
    id: [
      'Sisipkan 1, 2, 3, 4, 5 berurutan — bagaimana bentuk pohonnya?',
      'Sisipkan angka yang sama dengan urutan 3, 1, 4, 2, 5 — bandingkan tingginya.',
      'Hapus akar — node mana yang menggantikannya?',
    ],
  },
  topics: ['data-structures', 'trees'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
