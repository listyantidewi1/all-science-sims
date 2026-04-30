export default {
  id: 'circuits',
  subject: 'physics',
  title: { en: 'Series & Parallel Circuits', id: 'Rangkaian Seri & Paralel' },
  description: {
    en: 'Three light bulbs, a battery, switches you can flip. Choose series or parallel, watch how each bulb\'s brightness changes when you remove one. Live readouts of total resistance, current, and per-bulb power show the math behind the iconic "if one Christmas-light dies, do they all go out?" question.',
    id: 'Tiga bohlam, baterai, dan sakelar yang bisa dibalik. Pilih seri atau paralel, amati bagaimana terang tiap bohlam berubah saat Anda mencabut satu. Bacaan langsung resistansi total, arus, dan daya tiap bohlam menunjukkan matematika di balik pertanyaan ikonik "kalau satu lampu Natal mati, semuanya padam?"',
  },
  objectives: {
    en: [
      'Series resistance: R_total = R₁ + R₂ + R₃.',
      'Parallel resistance: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'See voltage divide in series, current divide in parallel.',
    ],
    id: [
      'Resistansi seri: R_total = R₁ + R₂ + R₃.',
      'Resistansi paralel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃.',
      'Melihat tegangan terbagi di seri, arus terbagi di paralel.',
    ],
  },
  tryThis: {
    en: [
      'Series, all 3 same — bulbs share voltage equally; remove one → all dark.',
      'Parallel, all 3 same — each bulb at full brightness; remove one → others unchanged.',
      'Mix bulb resistances in series — the one with highest R drops the most voltage.',
    ],
    id: [
      'Seri, ketiganya sama — bohlam berbagi tegangan sama; cabut satu → semua gelap.',
      'Paralel, ketiganya sama — tiap bohlam terang penuh; cabut satu → yang lain tak berubah.',
      'Campur R bohlam di seri — yang R tertinggi turun tegangan terbanyak.',
    ],
  },
  topics: ['electronics', 'circuits'],
  load: () => import('./sim.js'),
};
