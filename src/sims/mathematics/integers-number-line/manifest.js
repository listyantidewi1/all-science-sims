export default {
  id: 'integers-number-line',
  subject: 'mathematics',
  title: { en: 'Integers', id: 'Bilangan Bulat' },
  description: {
    en: 'Walk a little figure along a number line from −20 to 20. Adding means keep facing forward, subtracting means turn around, and a negative number means walk backwards. Switch to the thermometer or bank-balance view to see what −7 °C or a debt of 5 coins means, watch multiplication as repeated jumps, then test yourself in quiz mode.',
    id: 'Ajak sebuah tokoh kecil berjalan di garis bilangan dari −20 sampai 20. Menjumlahkan berarti tetap menghadap ke depan, mengurangkan berarti berbalik arah, dan bilangan negatif berarti berjalan mundur. Ganti ke tampilan termometer atau saldo bank untuk melihat arti −7 °C atau utang 5 koin, lihat perkalian sebagai lompatan berulang, lalu uji dirimu dalam mode kuis.',
  },
  topics: ['integers', 'number line', 'negative numbers', 'operations'],
  grade: [7],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
