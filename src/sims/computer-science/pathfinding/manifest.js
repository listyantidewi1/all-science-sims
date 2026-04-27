export default {
  id: 'pathfinding',
  subject: 'computer-science',
  title: { en: 'Pathfinding Visualizer', id: 'Visualisasi Pencarian Jalur' },
  description: {
    en: 'Drag to draw walls, then race breadth-first search against A*. Watch BFS explore in expanding rings while A* heads straight for the goal.',
    id: 'Seret untuk menggambar dinding, lalu adu kecepatan BFS dengan A*. Amati BFS mengeksplorasi dalam cincin yang membesar, sementara A* langsung menuju tujuan.',
  },
  objectives: {
    en: [
      'Distinguish uninformed (BFS) from informed (A*) search.',
      'Predict how a heuristic prunes the search space.',
      'Identify scenarios where heuristics give little advantage.',
    ],
    id: [
      'Membedakan pencarian tanpa informasi (BFS) dan dengan informasi (A*).',
      'Memprediksi bagaimana heuristik memangkas ruang pencarian.',
      'Mengenali skenario saat heuristik tidak banyak membantu.',
    ],
  },
  tryThis: {
    en: [
      'Place a wall maze between start and goal — compare cells visited.',
      'Move the goal directly behind a wall — does A* still help?',
      'Switch the algorithm mid-search to compare frontiers.',
    ],
    id: [
      'Buat labirin dinding antara titik awal dan tujuan — bandingkan jumlah sel yang dikunjungi.',
      'Pindahkan tujuan tepat di balik dinding — apakah A* masih membantu?',
      'Ganti algoritma di tengah pencarian untuk membandingkan frontir.',
    ],
  },
  topics: ['algorithms', 'search', 'graphs'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
