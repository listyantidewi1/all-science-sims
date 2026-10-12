export default {
  id: 'circuits',
  subject: 'physics',
  title: { en: 'Series & Parallel Circuits', id: 'Rangkaian Seri & Paralel' },
  description: {
    en: 'Three light bulbs, a battery, switches you can flip. Choose series or parallel, watch how each bulb\'s brightness changes when you remove one. Live readouts of total resistance, current, and per-bulb power show the math behind the iconic "if one Christmas-light dies, do they all go out?" question.',
    id: 'Tiga bohlam, baterai, dan sakelar yang bisa dibalik. Pilih seri atau paralel, amati bagaimana terang tiap bohlam berubah saat Anda mencabut satu. Bacaan langsung resistansi total, arus, dan daya tiap bohlam menunjukkan matematika di balik pertanyaan ikonik "kalau satu lampu Natal mati, semuanya padam?"',
  },
  details: () => import('./details.js'),
  topics: ['electronics', 'circuits'],
  hasLab: true,
  load: () => import('./sim.js'),
};
