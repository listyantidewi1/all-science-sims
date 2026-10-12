export default {
  id: 'maze-generation',
  subject: 'computer-science',
  title: { en: 'Maze Generation', id: 'Pembangkitan Labirin' },
  description: {
    en: 'Pick an algorithm — recursive backtracking, Prim\'s, or Wilson\'s — and watch a maze carve itself, cell by cell. Each algorithm has its own visual signature: long corridors, balanced trees, or unbiased random walks.',
    id: 'Pilih algoritma — backtracking rekursif, Prim, atau Wilson — dan amati labirin terbentuk sendiri, sel demi sel. Tiap algoritma punya tanda visualnya sendiri: koridor panjang, pohon seimbang, atau jalan acak tak bias.',
  },
  details: () => import('./details.js'),
  topics: ['algorithms', 'graphs'],
  load: () => import('./sim.js'),
};
