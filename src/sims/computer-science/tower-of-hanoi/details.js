// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
