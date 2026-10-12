// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Distinguish underfitting from overfitting visually.',
      'Read training error vs (true) test error as a function of model complexity.',
      'Pick a model degree that minimizes expected error.',
    ],
    id: [
      'Membedakan underfitting dan overfitting secara visual.',
      'Membaca galat latih vs galat uji (sejati) sebagai fungsi kompleksitas model.',
      'Memilih derajat model yang meminimalkan galat ekspektasi.',
    ],
  },  tryThis: {
    en: [
      'Set degree to 1 — does the line miss the curve?',
      'Set degree to 12 — does it wiggle through every point?',
      'Resample noise — does the high-degree fit jump around?',
    ],
    id: [
      'Atur derajat ke 1 — apakah garisnya melenceng dari kurva?',
      'Atur derajat ke 12 — apakah garisnya melilit setiap titik?',
      'Resample derau — apakah model tinggi-derajat berubah-ubah?',
    ],
  },};
