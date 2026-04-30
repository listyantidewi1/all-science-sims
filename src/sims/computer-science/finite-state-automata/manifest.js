export default {
  id: 'finite-state-automata',
  subject: 'computer-science',
  title: { en: 'Finite-State Automata', id: 'Otomata Hingga' },
  description: {
    en: 'Three pre-built automata: one accepts strings ending in "01", one accepts even-parity binary strings, one accepts strings divisible by 3 in binary. Type any input and watch the machine step through states; the final state is highlighted accept (green) or reject (red).',
    id: 'Tiga otomata pra-bangun: satu menerima string berakhir "01", satu menerima string biner paritas genap, satu menerima string biner kelipatan 3. Ketik input dan amati mesin melangkah antar state; state akhir disorot diterima (hijau) atau ditolak (merah).',
  },
  objectives: {
    en: [
      'Trace a DFA computation: one state at a time, one symbol at a time.',
      'See accept states (double circle) vs reject states.',
      'Connect regular languages to FSAs that recognize them.',
    ],
    id: [
      'Menelusuri komputasi DFA: satu state per simbol.',
      'Melihat state penerima (lingkaran ganda) vs state penolak.',
      'Menghubungkan bahasa reguler dengan FSA yang mengenalinya.',
    ],
  },
  tryThis: {
    en: [
      '"ends in 01" — try 1101, 0001, 010 — only 1101 and 0001 match (end in 01).',
      'Even parity — strings with even number of 1s are accepted.',
      'Divisible by 3 — try "11" (3), "110" (6), "1001" (9).',
    ],
    id: [
      '"berakhir 01" — coba 1101, 0001, 010 — hanya 1101 dan 0001 yang cocok.',
      'Paritas genap — string dengan jumlah 1 genap diterima.',
      'Kelipatan 3 — coba "11" (3), "110" (6), "1001" (9).',
    ],
  },
  topics: ['theory', 'automata'],
  load: () => import('./sim.js'),
};
