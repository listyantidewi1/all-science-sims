export default {
  id: 'wheatstone',
  subject: 'engineering',
  title: { en: 'Wheatstone Bridge', id: 'Jembatan Wheatstone' },
  description: {
    en: 'Four resistors in a diamond, a galvanometer across the middle, and a battery on the outside. The galvanometer reads zero when R₁/R₂ = R₃/R₄ — the bridge is "balanced". Drag any resistor and watch the meter swing; this is how strain gauges, RTDs, and unknown-resistance measurement work.',
    id: 'Empat resistor dalam berlian, galvanometer di tengah, dan baterai di luar. Galvanometer membaca nol saat R₁/R₂ = R₃/R₄ — jembatan "seimbang". Geser resistor mana pun dan amati jarum bergerak; inilah cara strain gauge, RTD, dan pengukuran resistansi tak diketahui bekerja.',
  },
  details: () => import('./details.js'),
  topics: ['electronics', 'instrumentation'],
  load: () => import('./sim.js'),
};
