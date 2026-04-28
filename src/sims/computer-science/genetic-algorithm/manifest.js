export default {
  id: 'genetic-algorithm',
  subject: 'computer-science',
  title: { en: 'Genetic Algorithm', id: 'Algoritma Genetika' },
  description: {
    en: 'Type a target sentence and watch a population of random strings evolve toward it. Selection picks the fittest, crossover splices their letters, and mutation flips a few bytes per generation — a working evolution engine in your browser.',
    id: 'Ketik kalimat target dan amati populasi string acak berevolusi menuju target itu. Seleksi memilih yang paling bugar, crossover mencampur huruf-hurufnya, dan mutasi membalik beberapa byte per generasi — mesin evolusi yang bekerja di peramban Anda.',
  },
  objectives: {
    en: [
      'Apply selection, crossover, mutation to evolve a target.',
      'Connect mutation rate to convergence speed and noise.',
      'See why GA solves spaces too big for brute force.',
    ],
    id: [
      'Menerapkan seleksi, crossover, dan mutasi untuk evolusi.',
      'Mengaitkan laju mutasi dengan kecepatan konvergensi dan derau.',
      'Melihat mengapa GA dapat memecahkan ruang terlalu besar untuk brute force.',
    ],
  },
  tryThis: {
    en: [
      'Set mutation to 0 — does it ever finish?',
      'Set mutation high — does it overshoot the target?',
      'Type a long target — how many generations to converge?',
    ],
    id: [
      'Atur mutasi ke 0 — apakah pernah selesai?',
      'Atur mutasi tinggi — apakah melewati target?',
      'Ketik target panjang — berapa generasi untuk konvergen?',
    ],
  },
  topics: ['evolution', 'optimization'],
  load: () => import('./sim.js'),
};
