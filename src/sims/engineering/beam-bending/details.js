// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See where the maximum bending moment lives for any load position.',
      'Connect the moment diagram to the deflected shape (M = EI·d²w/dx²).',
      'Predict the failure point: it is where |M| is largest.',
    ],
    id: [
      'Melihat di mana momen lentur maksimum untuk setiap posisi beban.',
      'Menghubungkan diagram momen dengan bentuk lendutan (M = EI·d²w/dx²).',
      'Memprediksi titik kegagalan: di tempat |M| terbesar.',
    ],
  },  tryThis: {
    en: [
      'Center the load — moment diagram is symmetric and triangular.',
      'Move the load to one quarter span — find where deflection peaks (it is NOT under the load).',
      'Increase load magnitude — diagrams scale linearly.',
    ],
    id: [
      'Posisikan beban di tengah — diagram momen simetris dan segitiga.',
      'Geser beban ke seperempat bentang — cari titik lendutan terbesar (BUKAN di bawah beban).',
      'Naikkan besar beban — diagram berskala linear.',
    ],
  },};
