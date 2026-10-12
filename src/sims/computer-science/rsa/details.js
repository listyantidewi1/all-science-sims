// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
