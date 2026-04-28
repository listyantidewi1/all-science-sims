export default {
  id: 'maze-generation',
  subject: 'computer-science',
  title: { en: 'Maze Generation', id: 'Pembangkitan Labirin' },
  description: {
    en: 'Pick an algorithm — recursive backtracking, Prim\'s, or Wilson\'s — and watch a maze carve itself, cell by cell. Each algorithm has its own visual signature: long corridors, balanced trees, or unbiased random walks.',
    id: 'Pilih algoritma — backtracking rekursif, Prim, atau Wilson — dan amati labirin terbentuk sendiri, sel demi sel. Tiap algoritma punya tanda visualnya sendiri: koridor panjang, pohon seimbang, atau jalan acak tak bias.',
  },
  objectives: {
    en: [
      'Distinguish DFS, Prim, and Wilson by texture.',
      'See that a perfect maze (no loops) is a spanning tree.',
      'Recognize how algorithm choice biases corridor length.',
    ],
    id: [
      'Membedakan DFS, Prim, dan Wilson dari teksturnya.',
      'Melihat bahwa labirin sempurna (tanpa loop) adalah pohon merentang.',
      'Mengenali bagaimana pilihan algoritma membias panjang koridor.',
    ],
  },
  tryThis: {
    en: [
      'Run DFS — note the long single corridors.',
      "Run Prim's — see balanced spread.",
      "Run Wilson's — slow start, perfectly unbiased.",
    ],
    id: [
      'Jalankan DFS — perhatikan koridor tunggal yang panjang.',
      'Jalankan Prim — amati penyebaran yang seimbang.',
      'Jalankan Wilson — mulai lambat, tetapi tak bias sempurna.',
    ],
  },
  topics: ['algorithms', 'graphs'],
  load: () => import('./sim.js'),
};
