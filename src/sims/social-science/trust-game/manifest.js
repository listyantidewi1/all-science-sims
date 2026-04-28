export default {
  id: 'trust-game',
  subject: 'social-science',
  title: { en: 'Trust Game', id: 'Permainan Kepercayaan' },
  description: {
    en: "Player 1 has $10. They send some fraction to Player 2; whatever is sent is tripled. Player 2 then chooses how much to return. Pure self-interest predicts $0 sent, $0 returned. Real humans send 50% on average and get 30% back — trust is a real economic force.",
    id: 'Pemain 1 punya Rp100rb. Mereka kirim sebagian ke Pemain 2; yang dikirim dilipatgandakan tiga kali. Pemain 2 lalu memilih berapa yang dikembalikan. Kepentingan diri murni memprediksi Rp0 dikirim, Rp0 dikembalikan. Manusia nyata kirim 50% rata-rata dan dapat 30% balik — kepercayaan adalah gaya ekonomi nyata.',
  },
  objectives: {
    en: [
      'Compare game-theoretic prediction (zero) to empirical results.',
      'See multiplier × trust × reciprocity as a triangle.',
      "Track total social welfare over many rounds.",
    ],
    id: [
      'Membandingkan prediksi teori-permainan (nol) dengan hasil empiris.',
      'Melihat pengganda × kepercayaan × timbal balik sebagai segitiga.',
      'Melacak kesejahteraan sosial total selama banyak putaran.',
    ],
  },
  tryThis: {
    en: [
      'Trust 100%, return 33% — both players profit equally.',
      "Trust 100%, return 0 — Player 2 wins big, but the game collapses if repeated.",
      "Trust 0% — total welfare = $10 forever.",
    ],
    id: [
      'Kepercayaan 100%, kembalikan 33% — keduanya untung sama.',
      'Kepercayaan 100%, kembalikan 0 — Pemain 2 untung besar, tapi permainan runtuh jika diulang.',
      'Kepercayaan 0% — kesejahteraan total = Rp100rb selamanya.',
    ],
  },
  topics: ['game-theory', 'trust'],
  load: () => import('./sim.js'),
};
