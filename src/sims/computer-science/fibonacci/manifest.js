export default {
  id: 'fibonacci',
  subject: 'computer-science',
  title: { en: 'Recursive Fibonacci + Memoization', id: 'Fibonacci Rekursif + Memoisasi' },
  description: {
    en: 'fib(n) = fib(n-1) + fib(n-2), recursively. Without memoization the call tree explodes exponentially — fib(40) makes a hundred million calls. Add memoization and it collapses to O(n). Watch the call tree pruned by a cache.',
    id: 'fib(n) = fib(n-1) + fib(n-2), secara rekursif. Tanpa memoisasi pohon panggilannya meledak eksponensial — fib(40) menghasilkan ratusan juta panggilan. Tambah memoisasi dan jadi O(n). Amati pohon panggilan dipangkas oleh cache.',
  },
  objectives: {
    en: [
      'See exponential blow-up of naive recursion.',
      'Watch memoization prune the call tree.',
      'Compare call counts: naive vs memoized vs iterative.',
    ],
    id: [
      'Melihat ledakan eksponensial rekursi naif.',
      'Mengamati memoisasi memangkas pohon panggilan.',
      'Membandingkan hitungan panggilan: naif vs memoisasi vs iteratif.',
    ],
  },
  tryThis: {
    en: [
      'fib(10) naive — how many calls?',
      'Same n with memoization — how many?',
      "Try n = 30 naive vs memoized.",
    ],
    id: [
      'fib(10) naif — berapa panggilan?',
      'n yang sama dengan memoisasi — berapa?',
      'Coba n = 30 naif vs memoisasi.',
    ],
  },
  topics: ['recursion', 'dynamic-programming'],
  load: () => import('./sim.js'),
};
