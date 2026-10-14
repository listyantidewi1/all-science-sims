export default {
  id: 'trust-game',
  subject: 'social-science',
  title: { en: 'Trust Game', id: 'Permainan Kepercayaan' },
  description: {
    en: "Player 1 has $10. They send some fraction to Player 2; whatever is sent is tripled. Player 2 then chooses how much to return. Pure self-interest predicts $0 sent, $0 returned. Real humans send 50% on average and get 30% back — trust is a real economic force.",
    id: 'Pemain 1 punya $10. Mereka kirim sebagian ke Pemain 2; yang dikirim dilipatgandakan tiga kali. Pemain 2 lalu memilih berapa yang dikembalikan. Kepentingan diri murni memprediksi $0 dikirim, $0 dikembalikan. Manusia nyata kirim 50% rata-rata dan dapat 30% balik — kepercayaan adalah gaya ekonomi nyata.',
  },
  details: () => import('./details.js'),
  topics: ['game-theory', 'trust'],
  grade: [9, 10, 11, 12],
  load: () => import('./sim.js'),
};
