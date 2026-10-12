// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read hash function output and bucket index = h(key) mod N.',
      'Distinguish chaining from open addressing.',
      'See lookup cost rise sharply as load factor approaches 1.',
    ],
    id: [
      'Membaca output fungsi hash dan indeks bucket = h(kunci) mod N.',
      'Membedakan chaining dari open addressing.',
      'Melihat biaya lookup melonjak saat load factor mendekati 1.',
    ],
  },  tryThis: {
    en: [
      'Insert names — watch buckets fill.',
      'Switch to open addressing and try to fill the table — what happens?',
      'Resize from 16 buckets to 4 — does collision rate explode?',
    ],
    id: [
      'Sisipkan nama — amati bucket terisi.',
      'Beralih ke open addressing dan coba isi penuh — apa yang terjadi?',
      'Ubah ukuran dari 16 ke 4 bucket — apakah tumbukan meledak?',
    ],
  },};
