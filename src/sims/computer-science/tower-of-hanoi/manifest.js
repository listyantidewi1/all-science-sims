export default {
  id: 'tower-of-hanoi',
  subject: 'computer-science',
  title: { en: 'Tower of Hanoi', id: 'Menara Hanoi' },
  description: {
    en: 'Move the entire stack of N disks from peg A to peg C, never placing a larger disk on a smaller one. Solve it by hand by clicking pegs, or hit "Auto-solve" to watch the recursive algorithm at work — moving N disks always takes exactly 2^N − 1 moves, the famous Hanoi count.',
    id: 'Pindahkan tumpukan N cakram dari pasak A ke C, jangan pernah menaruh cakram lebih besar di atas yang lebih kecil. Selesaikan dengan mengklik pasak, atau tekan "Auto-solve" untuk menonton algoritma rekursif bekerja — memindahkan N cakram selalu butuh tepat 2^N − 1 langkah.',
  },
  details: () => import('./details.js'),
  topics: ['recursion', 'algorithms'],
  grade: [5, 6, 7, 8, 9],
  load: () => import('./sim.js'),
};
