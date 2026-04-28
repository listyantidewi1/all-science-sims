export default {
  id: 'rsa',
  subject: 'computer-science',
  title: { en: 'RSA Public-Key Crypto (toy)', id: 'Kriptografi Kunci-Publik RSA (mainan)' },
  description: {
    en: "Pick two small primes p and q. The simulator computes n = p·q, the totient φ(n), an exponent e, the inverse d, and lets you encrypt and decrypt a number. Real RSA uses 1024+ bit primes — but the math is identical.",
    id: 'Pilih dua bilangan prima kecil p dan q. Simulator menghitung n = p·q, totient φ(n), eksponen e, invers d, dan memungkinkan Anda mengenkripsi dan mendekripsi sebuah bilangan. RSA nyata memakai prima 1024+ bit — tapi matematikanya sama.',
  },
  objectives: {
    en: [
      'Apply RSA: c = m^e mod n; m = c^d mod n.',
      'See why factoring n is the hard problem.',
      "Connect public key (e, n) and private key (d, n).",
    ],
    id: [
      'Menerapkan RSA: c = m^e mod n; m = c^d mod n.',
      'Melihat mengapa memfaktorkan n adalah masalah yang sulit.',
      'Mengaitkan kunci publik (e, n) dan kunci privat (d, n).',
    ],
  },
  tryThis: {
    en: [
      'p=11, q=13 — encrypt m=42, then decrypt.',
      'Try to factor n by hand — for small p,q it\'s easy.',
      'Pick a different e — does d still exist?',
    ],
    id: [
      'p=11, q=13 — enkripsi m=42, lalu dekripsi.',
      'Coba faktorkan n secara manual — untuk p,q kecil, mudah.',
      'Pilih e berbeda — apakah d tetap ada?',
    ],
  },
  topics: ['cryptography', 'security'],
  load: () => import('./sim.js'),
};
