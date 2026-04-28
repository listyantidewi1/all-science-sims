export default {
  id: 'tower-of-hanoi',
  subject: 'computer-science',
  title: { en: 'Tower of Hanoi', id: 'Menara Hanoi' },
  description: {
    en: 'Move the entire stack of N disks from peg A to peg C, never placing a larger disk on a smaller one. Solve it by hand by clicking pegs, or hit "Auto-solve" to watch the recursive algorithm at work — moving N disks always takes exactly 2^N − 1 moves, the famous Hanoi count.',
    id: 'Pindahkan tumpukan N cakram dari pasak A ke C, jangan pernah menaruh cakram lebih besar di atas yang lebih kecil. Selesaikan dengan mengklik pasak, atau tekan "Auto-solve" untuk menonton algoritma rekursif bekerja — memindahkan N cakram selalu butuh tepat 2^N − 1 langkah.',
  },
  objectives: {
    en: [
      'See the 2^N − 1 lower bound: 3 disks → 7 moves, 4 disks → 15, 5 disks → 31.',
      'Watch the recursive structure: solving N reduces to solving N−1 twice.',
      'Build intuition for divide-and-conquer thinking.',
    ],
    id: [
      'Melihat batas bawah 2^N − 1: 3 cakram → 7 langkah, 4 → 15, 5 → 31.',
      'Mengamati struktur rekursif: menyelesaikan N berarti menyelesaikan N−1 dua kali.',
      'Membangun intuisi pemikiran bagi-dan-taklukkan.',
    ],
  },
  tryThis: {
    en: [
      'Try 3 disks by hand — see if you can do it in 7 moves.',
      'Crank to 6 disks — auto-solve takes 63 moves.',
      'Compare your move count to the optimum 2^N − 1.',
    ],
    id: [
      'Coba 3 cakram sendiri — bisa Anda 7 langkah?',
      'Naikkan ke 6 cakram — auto-solve 63 langkah.',
      'Bandingkan jumlah langkah Anda dengan optimum 2^N − 1.',
    ],
  },
  topics: ['recursion', 'algorithms'],
  load: () => import('./sim.js'),
};
