export default {
  id: 'caesar-cipher',
  subject: 'computer-science',
  title: { en: 'Caesar Cipher', id: 'Sandi Caesar' },
  description: {
    en: 'Type a message and shift the alphabet to encrypt or decrypt. Two visual wheels show how each letter maps to its substitute. Try every shift to see brute-force decryption.',
    id: 'Ketik pesan dan geser alfabet untuk mengenkripsi atau mendekripsi. Dua roda alfabet memperlihatkan pemetaan tiap huruf. Coba semua pergeseran untuk melihat dekripsi brute-force.',
  },
  details: () => import('./details.js'),
  topics: ['cryptography', 'security'],
  load: () => import('./sim.js'),
};
