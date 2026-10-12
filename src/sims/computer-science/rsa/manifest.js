export default {
  id: 'rsa',
  subject: 'computer-science',
  title: { en: 'RSA Public-Key Crypto (toy)', id: 'Kriptografi Kunci-Publik RSA (mainan)' },
  description: {
    en: "Pick two small primes p and q. The simulator computes n = p·q, the totient φ(n), an exponent e, the inverse d, and lets you encrypt and decrypt a number. Real RSA uses 1024+ bit primes — but the math is identical.",
    id: 'Pilih dua bilangan prima kecil p dan q. Simulator menghitung n = p·q, totient φ(n), eksponen e, invers d, dan memungkinkan Anda mengenkripsi dan mendekripsi sebuah bilangan. RSA nyata memakai prima 1024+ bit — tapi matematikanya sama.',
  },
  details: () => import('./details.js'),
  topics: ['cryptography', 'security'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
