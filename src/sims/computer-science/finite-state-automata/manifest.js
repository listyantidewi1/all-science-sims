export default {
  id: 'finite-state-automata',
  subject: 'computer-science',
  title: { en: 'Finite-State Automata', id: 'Otomata Hingga' },
  description: {
    en: 'Three pre-built automata: one accepts strings ending in "01", one accepts even-parity binary strings, one accepts strings divisible by 3 in binary. Type any input and watch the machine step through states; the final state is highlighted accept (green) or reject (red).',
    id: 'Tiga otomata pra-bangun: satu menerima string berakhir "01", satu menerima string biner paritas genap, satu menerima string biner kelipatan 3. Ketik input dan amati mesin melangkah antar state; state akhir disorot diterima (hijau) atau ditolak (merah).',
  },
  details: () => import('./details.js'),
  topics: ['theory', 'automata'],
  grade: [11, 12, 13],
  load: () => import('./sim.js'),
};
