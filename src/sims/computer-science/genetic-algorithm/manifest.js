export default {
  id: 'genetic-algorithm',
  subject: 'computer-science',
  title: { en: 'Genetic Algorithm', id: 'Algoritma Genetika' },
  description: {
    en: 'Type a target sentence and watch a population of random strings evolve toward it. Selection picks the fittest, crossover splices their letters, and mutation flips a few bytes per generation — a working evolution engine in your browser.',
    id: 'Ketik kalimat target dan amati populasi string acak berevolusi menuju target itu. Seleksi memilih yang paling bugar, crossover mencampur huruf-hurufnya, dan mutasi membalik beberapa byte per generasi — mesin evolusi yang bekerja di peramban Anda.',
  },
  details: () => import('./details.js'),
  topics: ['evolution', 'optimization'],
  load: () => import('./sim.js'),
};
