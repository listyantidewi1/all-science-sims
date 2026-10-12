// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
