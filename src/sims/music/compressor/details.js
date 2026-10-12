// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Read the threshold (where compression kicks in) and ratio (how much compression).',
      'See that infinite ratio = a limiter (clips above threshold).',
      'Apply make-up gain to bring the average level back up.',
    ],
    id: [
      'Membaca ambang (saat kompresi mulai) dan rasio (jumlah kompresi).',
      'Melihat bahwa rasio tak hingga = limiter (memotong di atas ambang).',
      'Menerapkan gain makeup untuk mengembalikan level rata-rata.',
    ],
  },  tryThis: {
    en: [
      'Threshold −20 dB, ratio 4:1 — gentle compression.',
      'Ratio ∞ (limiter) — output flat-tops above threshold.',
      'Add makeup gain — quiet parts get louder; perceived volume up.',
    ],
    id: [
      'Ambang −20 dB, rasio 4:1 — kompresi lembut.',
      'Rasio ∞ (limiter) — output mendatar di atas ambang.',
      'Tambah gain makeup — bagian sepi menjadi keras; persepsi volume naik.',
    ],
  },};
