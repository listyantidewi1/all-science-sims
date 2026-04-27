export default {
  id: 'cell-explorer',
  subject: 'biology',
  title: { en: 'Interactive Cell Explorer', id: 'Penjelajah Sel Interaktif' },
  description: {
    en: 'Switch between an animal and plant cell and click each organelle to see what it does. Compare which structures appear in only one cell type.',
    id: 'Beralih antara sel hewan dan sel tumbuhan, lalu klik tiap organel untuk melihat fungsinya. Bandingkan struktur yang hanya muncul pada satu jenis sel.',
  },
  objectives: {
    en: [
      'Identify the major organelles of eukaryotic cells.',
      'List the structures unique to plant cells.',
      'Connect each organelle to a specific cellular function.',
    ],
    id: [
      'Mengenali organel utama sel eukariot.',
      'Mendaftar struktur yang khas pada sel tumbuhan.',
      'Menghubungkan tiap organel dengan fungsi sel tertentu.',
    ],
  },
  tryThis: {
    en: [
      'Find three structures in the plant cell that are absent in the animal cell.',
      'Which organelle would you remove to stop the cell from making proteins?',
      'Which organelle plays the same role in plants and animals?',
    ],
    id: [
      'Cari tiga struktur sel tumbuhan yang tidak ada pada sel hewan.',
      'Organel mana yang harus dihilangkan agar sel berhenti membuat protein?',
      'Organel mana yang memiliki peran sama pada tumbuhan dan hewan?',
    ],
  },
  topics: ['cells', 'organelles'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
