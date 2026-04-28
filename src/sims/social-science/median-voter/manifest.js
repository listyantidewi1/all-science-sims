export default {
  id: 'median-voter',
  subject: 'social-science',
  title: { en: 'Median Voter Theorem', id: 'Teorema Pemilih Median' },
  description: {
    en: "Voters distributed along a 1D political spectrum vote for the closest candidate. Whoever lands at the median wins. Watch two strategic candidates converge to the center — the classic explanation for why platforms look so similar.",
    id: 'Pemilih tersebar pada spektrum politik 1D dan memilih kandidat terdekat. Yang berada di median menang. Amati dua kandidat strategis bertemu di tengah — penjelasan klasik mengapa platform terlihat begitu serupa.',
  },
  objectives: {
    en: [
      'See why two candidates converge to the median voter.',
      'Recognize when the theorem fails (multi-peaked preferences).',
      'Connect to first-past-the-post elections.',
    ],
    id: [
      'Melihat mengapa dua kandidat menyatu ke pemilih median.',
      'Mengenali kapan teorema gagal (preferensi multi-puncak).',
      'Mengaitkan dengan pemilu mayoritas sederhana.',
    ],
  },
  tryThis: {
    en: [
      'Drag candidate A toward the right tail — does B chase from the left?',
      'Add 3 candidates — does the simple result hold?',
      'Switch to bimodal voters — does converging center still win?',
    ],
    id: [
      'Geser kandidat A ke ekor kanan — apakah B mengejar dari kiri?',
      'Tambah 3 kandidat — apakah hasil sederhana ini bertahan?',
      'Beralih ke pemilih bimodal — apakah pusat tetap menang?',
    ],
  },
  topics: ['voting', 'social-choice'],
  load: () => import('./sim.js'),
};
