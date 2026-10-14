export default {
  id: 'fibonacci',
  subject: 'computer-science',
  title: { en: 'Recursive Fibonacci + Memoization', id: 'Fibonacci Rekursif + Memoisasi' },
  description: {
    en: 'fib(n) = fib(n-1) + fib(n-2), recursively. Without memoization the call tree explodes exponentially — fib(40) makes over 300 million calls. Add memoization and it collapses to O(n). Watch the call tree pruned by a cache.',
    id: 'fib(n) = fib(n-1) + fib(n-2), secara rekursif. Tanpa memoisasi pohon panggilannya meledak eksponensial — fib(40) menghasilkan lebih dari 300 juta panggilan. Tambah memoisasi dan jadi O(n). Amati pohon panggilan dipangkas oleh cache.',
  },
  details: () => import('./details.js'),
  topics: ['recursion', 'dynamic-programming'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
