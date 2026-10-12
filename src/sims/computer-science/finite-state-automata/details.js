// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
