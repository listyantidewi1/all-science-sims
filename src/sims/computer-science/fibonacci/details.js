// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
