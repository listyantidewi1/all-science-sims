// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See exponential decay R(t) = e^(−t/τ).',
      'Understand why spaced repetition produces deeper retention.',
      'Design a review schedule that keeps retention above 80%.',
    ],
    id: [
      'Melihat peluruhan eksponensial R(t) = e^(−t/τ).',
      'Memahami mengapa pengulangan terjadwal menghasilkan retensi lebih dalam.',
      'Merancang jadwal tinjauan yang menjaga retensi di atas 80%.',
    ],
  },  tryThis: {
    en: [
      'No reviews — retention drops to ~20% in a few days.',
      'Reviews at 1 hr, 1 day, 3 days — classic spaced-repetition schedule.',
      'Closely-spaced reviews — diminishing returns.',
    ],
    id: [
      'Tanpa tinjauan — retensi turun ~20% dalam beberapa hari.',
      'Tinjauan di 1 jam, 1 hari, 3 hari — jadwal pengulangan terjadwal klasik.',
      'Tinjauan terlalu rapat — hasil berkurang.',
    ],
  },};
