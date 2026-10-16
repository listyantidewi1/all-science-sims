export default {
  id: 'function-transformations',
  subject: 'mathematics',
  title: { en: 'Transforming Functions', id: 'Transformasi Fungsi' },
  description: {
    en: 'Pick a parent function (x², |x|, √x, 2ˣ, sin x or 1/x) and move the sliders of y = a·f(b(x − h)) + k to stretch, squash, reflect and slide its graph while the parent stays as a ghost. Drag a point along the parent and watch where its image lands. Switch to composition mode to trace x → g(x) → f(g(x)) between two curves, or to inverse mode to reflect the graph in y = x and run the horizontal-line test.',
    id: 'Pilih fungsi induk (x², |x|, √x, 2ˣ, sin x atau 1/x) dan geser slider y = a·f(b(x − h)) + k untuk meregangkan, memampatkan, mencerminkan dan menggeser grafiknya sementara fungsi induk tetap tampak sebagai bayangan. Geser sebuah titik di sepanjang fungsi induk dan lihat ke mana bayangannya jatuh. Pindah ke mode komposisi untuk melacak x → g(x) → f(g(x)) di antara dua kurva, atau ke mode invers untuk mencerminkan grafik terhadap y = x dan menjalankan uji garis mendatar.',
  },
  topics: ['functions', 'transformations', 'composition', 'inverse functions', 'graphs'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
