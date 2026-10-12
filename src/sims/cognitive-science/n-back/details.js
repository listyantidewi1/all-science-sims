// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Describe the N-back task and what it demands of working memory updating.',
      'Classify each response as a hit, miss, false alarm, or correct rejection and compute d′.',
      'Show how performance drops as N rises and relate this to a limited-capacity buffer.',
    ],
    id: [
      'Menjelaskan tugas N-back dan tuntutannya pada pembaruan memori kerja.',
      'Mengklasifikasikan tiap respons sebagai hit, miss, alarm palsu, atau penolakan benar dan menghitung d′.',
      'Menunjukkan penurunan kinerja saat N naik dan mengaitkannya dengan penyangga berkapasitas terbatas.',
    ],
  },
  tryThis: {
    en: [
      'Run N = 1, then 2, 3, and 4 with letters. Where does d′ collapse?',
      'Switch to positions at N = 2. Is spatial N-back easier or harder for you?',
      'Slow the pace to 3 s per item at N = 3. Does extra time help, or does the buffer still overflow?',
    ],
    id: [
      'Jalankan N = 1, lalu 2, 3, dan 4 dengan huruf. Di mana d′ runtuh?',
      'Beralih ke posisi pada N = 2. Apakah N-back spasial lebih mudah atau lebih sulit bagi Anda?',
      'Perlambat tempo ke 3 s per item pada N = 3. Apakah waktu ekstra membantu, atau penyangga tetap meluap?',
    ],
  },
};
