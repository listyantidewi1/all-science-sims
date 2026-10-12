export default {
  id: 'cell-explorer',
  subject: 'biology',
  title: { en: 'Interactive Cell Explorer', id: 'Penjelajah Sel Interaktif' },
  description: {
    en: 'Switch between an animal and plant cell and click each organelle to see what it does. Compare which structures appear in only one cell type.',
    id: 'Beralih antara sel hewan dan sel tumbuhan, lalu klik tiap organel untuk melihat fungsinya. Bandingkan struktur yang hanya muncul pada satu jenis sel.',
  },
  details: () => import('./details.js'),
  topics: ['cells', 'organelles'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
