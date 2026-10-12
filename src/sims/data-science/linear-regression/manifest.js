export default {
  id: 'linear-regression',
  subject: 'data-science',
  title: { en: 'Linear Regression Playground', id: 'Lab Regresi Linear' },
  description: {
    en: 'Click to add data points, drag your guess line by adjusting slope and intercept, and watch the best-fit line update in real time. Compare your line\'s error to the optimum.',
    id: 'Klik untuk menambah titik data, atur kemiringan dan titik potong garis tebakan Anda, lalu saksikan garis kuadrat terkecil diperbarui langsung. Bandingkan galat garis Anda dengan optimum.',
  },
  details: () => import('./details.js'),
  topics: ['statistics', 'regression'],
  grade: [9, 10, 11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
