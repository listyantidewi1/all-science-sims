export default {
  id: 'turing-machine',
  subject: 'computer-science',
  title: { en: 'Turing Machine', id: 'Mesin Turing' },
  description: {
    en: 'A read/write head crawls along an infinite tape, following a tiny rule table. Watch a 5-state busy beaver, a binary incrementer, or a unary doubler chug through their programs one step at a time.',
    id: 'Sebuah kepala baca/tulis merayap di pita tak hingga mengikuti tabel aturan kecil. Amati busy-beaver 5-state, penambah biner, atau penggandakan unary menjalankan programnya langkah demi langkah.',
  },
  objectives: {
    en: [
      'Read a Turing machine state table.',
      'See universal computation done with one tape and a finite table.',
      'Distinguish halting from non-halting programs.',
    ],
    id: [
      'Membaca tabel keadaan mesin Turing.',
      'Melihat komputasi universal dengan satu pita dan tabel terbatas.',
      'Membedakan program yang berhenti dan yang tidak.',
    ],
  },
  tryThis: {
    en: [
      'Run the busy beaver — count the 1s on the tape.',
      'Step the binary incrementer one step at a time.',
      "Edit the rule table mid-run — does behavior change?",
    ],
    id: [
      'Jalankan busy beaver — hitung jumlah 1 di pita.',
      'Telusuri penambah biner satu langkah pada satu waktu.',
      'Ubah tabel aturan saat berjalan — apakah perilaku berubah?',
    ],
  },
  topics: ['computation', 'theory'],
  load: () => import('./sim.js'),
};
