export default {
  id: 'caesar-cipher',
  subject: 'computer-science',
  title: { en: 'Caesar Cipher', id: 'Sandi Caesar' },
  description: {
    en: 'Type a message and shift the alphabet to encrypt or decrypt. Two visual wheels show how each letter maps to its substitute. Try every shift to see brute-force decryption.',
    id: 'Ketik pesan dan geser alfabet untuk mengenkripsi atau mendekripsi. Dua roda alfabet memperlihatkan pemetaan tiap huruf. Coba semua pergeseran untuk melihat dekripsi brute-force.',
  },
  objectives: {
    en: [
      'Apply a fixed shift cipher to plaintext.',
      'See why a Caesar cipher is trivially breakable (only 25 keys).',
      'Use frequency to guess a shift without knowing it.',
    ],
    id: [
      'Menerapkan sandi geser tetap pada plaintext.',
      'Melihat mengapa sandi Caesar mudah dipecahkan (hanya 25 kunci).',
      'Menggunakan frekuensi huruf untuk menebak pergeseran.',
    ],
  },
  tryThis: {
    en: [
      "Encrypt 'HELLO' with shift 3.",
      'Brute-force "KHOOR" — find the shift.',
      'Look at letter frequencies — which shift gives English-looking text?',
    ],
    id: [
      "Enkripsi 'HALO' dengan pergeseran 3.",
      "Pecahkan 'KDOR' dengan brute-force — temukan pergeserannya.",
      'Amati frekuensi huruf — pergeseran mana yang menghasilkan teks yang mirip bahasa Inggris?',
    ],
  },
  topics: ['cryptography', 'security'],
  load: () => import('./sim.js'),
};
