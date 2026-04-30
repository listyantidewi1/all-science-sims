export default {
  id: 'wheatstone',
  subject: 'engineering',
  title: { en: 'Wheatstone Bridge', id: 'Jembatan Wheatstone' },
  description: {
    en: 'Four resistors in a diamond, a galvanometer across the middle, and a battery on the outside. The galvanometer reads zero when R₁/R₂ = R₃/R₄ — the bridge is "balanced". Drag any resistor and watch the meter swing; this is how strain gauges, RTDs, and unknown-resistance measurement work.',
    id: 'Empat resistor dalam berlian, galvanometer di tengah, dan baterai di luar. Galvanometer membaca nol saat R₁/R₂ = R₃/R₄ — jembatan "seimbang". Geser resistor mana pun dan amati jarum bergerak; inilah cara strain gauge, RTD, dan pengukuran resistansi tak diketahui bekerja.',
  },
  objectives: {
    en: [
      'Apply the balance condition R₁ R₄ = R₂ R₃.',
      'Measure an unknown resistor by adjusting a known one until the bridge balances.',
      'See why the bridge is sensitive — small changes near balance produce big galvanometer deflection.',
    ],
    id: [
      'Menerapkan kondisi seimbang R₁ R₄ = R₂ R₃.',
      'Mengukur resistor tak diketahui dengan mengatur yang diketahui sampai seimbang.',
      'Memahami mengapa jembatan sangat sensitif — perubahan kecil dekat seimbang menghasilkan defleksi besar.',
    ],
  },
  tryThis: {
    en: [
      'All four R equal — perfectly balanced, galvanometer reads 0.',
      'Set R₁ = R₂ = R₃ = 100 Ω, then adjust R₄ to balance with an "unknown" R.',
      'Tiny imbalance — sensitive readout, useful for strain gauges.',
    ],
    id: [
      'Keempat R sama — seimbang sempurna, galvanometer 0.',
      'Atur R₁ = R₂ = R₃ = 100 Ω, lalu atur R₄ untuk menyeimbangkan dengan R "tak diketahui".',
      'Ketidakseimbangan kecil — bacaan sensitif, berguna untuk strain gauge.',
    ],
  },
  topics: ['electronics', 'instrumentation'],
  load: () => import('./sim.js'),
};
