export default {
  id: 'beam-bending',
  subject: 'engineering',
  title: { en: 'Beam Bending', id: 'Lendutan Balok' },
  description: {
    en: 'A simply-supported beam carrying a point load. Drag the load along the beam and watch the shear, moment, and deflection diagrams update in real time. The deflection curve and stress concentration come straight from Euler-Bernoulli beam theory.',
    id: 'Balok bertumpuan sederhana yang menanggung beban titik. Geser beban di sepanjang balok dan lihat diagram gaya geser, momen, serta lendutan terbarui langsung. Kurva lendutan dan konsentrasi tegangan langsung dari teori balok Euler-Bernoulli.',
  },
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
  },
  tryThis: {
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
  },
  topics: ['statics', 'mechanics-of-materials'],
  load: () => import('./sim.js'),
};
