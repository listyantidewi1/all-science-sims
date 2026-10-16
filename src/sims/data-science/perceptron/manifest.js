export default {
  id: 'perceptron',
  subject: 'data-science',
  title: { en: 'Perceptron Playground', id: 'Taman Bermain Perceptron' },
  description: {
    en: 'Meet the simplest artificial neuron: two inputs, two weights and a bias. Move the weights by hand and watch the decision line swing, or press Train and let the perceptron rule or gradient descent find the line on its own while the loss curve falls. Then switch to the XOR dataset, watch a single neuron fail, and add a hidden layer of two neurons to see how a tiny network bends the boundary and solves it.',
    id: 'Kenali neuron buatan paling sederhana: dua masukan, dua bobot dan satu bias. Geser bobotnya dengan tangan dan lihat garis keputusan berayun, atau tekan Latih dan biarkan aturan perceptron atau penurunan gradien menemukan garisnya sendiri sementara kurva loss turun. Lalu pindah ke dataset XOR, lihat satu neuron gagal, dan tambahkan lapisan tersembunyi berisi dua neuron untuk melihat bagaimana jaringan kecil membengkokkan batas dan memecahkannya.',
  },
  topics: ['machine learning', 'neural networks', 'perceptron', 'gradient descent', 'loss function'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
