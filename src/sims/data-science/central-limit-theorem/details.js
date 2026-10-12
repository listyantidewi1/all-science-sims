// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'See that sampling distributions of the mean become roughly normal regardless of parent shape.',
      'Notice how variance shrinks as 1/n.',
      'Estimate when n is "large enough" for the CLT to look clean.',
    ],
    id: [
      'Melihat distribusi rata-rata sampel mendekati normal terlepas dari bentuk induknya.',
      'Mengamati varian menyusut sebanding 1/n.',
      'Memperkirakan kapan n "cukup besar" agar CLT terlihat rapi.',
    ],
  },  tryThis: {
    en: [
      'Set parent to bimodal and n=2 — does the mean histogram still look bimodal?',
      'Crank n to 30 with exponential — is it Gaussian-ish yet?',
      'Increase samples per second and watch the histogram converge fast.',
    ],
    id: [
      'Atur induk bimodal dan n=2 — apakah histogram rata-rata tetap bimodal?',
      'Naikkan n ke 30 dengan distribusi eksponensial — sudah seperti Gauss?',
      'Tingkatkan sampel per detik dan amati histogram menyatu cepat.',
    ],
  },};
