export default {
  id: 'linear-regression',
  subject: 'data-science',
  title: { en: 'Linear Regression Playground', id: 'Lab Regresi Linear' },
  description: {
    en: 'Click to add data points, drag your guess line by adjusting slope and intercept, and watch the best-fit line update in real time. Compare your line\'s error to the optimum.',
    id: 'Klik untuk menambah titik data, atur kemiringan dan titik potong garis tebakan Anda, lalu saksikan garis kuadrat terkecil diperbarui langsung. Bandingkan galat garis Anda dengan optimum.',
  },
  objectives: {
    en: [
      'Define slope and y-intercept geometrically.',
      'Use sum of squared residuals to compare two lines.',
      'Recognize that the least-squares line minimizes total squared error.',
    ],
    id: [
      'Mendefinisikan kemiringan dan titik potong-y secara geometris.',
      'Menggunakan jumlah kuadrat residu untuk membandingkan dua garis.',
      'Mengenali bahwa garis kuadrat terkecil meminimalkan total galat kuadrat.',
    ],
  },
  tryThis: {
    en: [
      'Place 5 points along a clear line — match the best-fit line yourself.',
      'Add one wild outlier — how much does it pull the best-fit?',
      'Drag your line to a 1°-off match. How much higher is your error?',
    ],
    id: [
      'Tempatkan 5 titik di sepanjang garis yang jelas — cocokkan garis terbaiknya sendiri.',
      'Tambah satu pencilan ekstrem — seberapa besar pengaruhnya pada garis terbaik?',
      'Geser garis Anda hingga meleset 1° — berapa kenaikan galatnya?',
    ],
  },
  topics: ['statistics', 'regression'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
