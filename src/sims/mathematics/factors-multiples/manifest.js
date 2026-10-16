export default {
  id: 'factors-multiples',
  subject: 'mathematics',
  title: { en: 'Factors and Multiples', id: 'Faktor dan Kelipatan (FPB & KPK)' },
  description: {
    en: 'Pick two numbers and watch a long number strip light up: blue for the multiples of one, orange for the multiples of the other, and glowing green where they meet. The first glowing number is the lowest common multiple (LCM). Below, tiles show every factor of each number, the shared factors turn green, and the biggest shared one is the greatest common divisor (GCD). A prime factor tree breaks each number down into primes.',
    id: 'Pilih dua bilangan dan lihat pita bilangan panjang menyala: biru untuk kelipatan bilangan pertama, jingga untuk kelipatan bilangan kedua, dan hijau menyala di tempat keduanya bertemu. Bilangan menyala yang pertama adalah kelipatan persekutuan terkecil (KPK). Di bawahnya, ubin menunjukkan semua faktor tiap bilangan, faktor yang sama berubah hijau, dan yang terbesar adalah faktor persekutuan terbesar (FPB). Pohon faktor memecah setiap bilangan menjadi bilangan prima.',
  },
  topics: ['number', 'factors', 'multiples', 'primes'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
