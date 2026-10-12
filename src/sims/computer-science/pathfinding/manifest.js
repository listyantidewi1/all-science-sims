export default {
  id: 'pathfinding',
  subject: 'computer-science',
  title: { en: 'Pathfinding Visualizer', id: 'Visualisasi Pencarian Jalur' },
  description: {
    en: 'Drag to draw walls, then race breadth-first search against A*. Watch BFS explore in expanding rings while A* heads straight for the goal.',
    id: 'Seret untuk menggambar dinding, lalu adu kecepatan BFS dengan A*. Amati BFS mengeksplorasi dalam cincin yang membesar, sementara A* langsung menuju tujuan.',
  },
  details: () => import('./details.js'),
  topics: ['algorithms', 'search', 'graphs'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
