// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
  objectives: {
    en: [
      'Name the five parameters of the drift-diffusion model and what each represents psychologically.',
      'Explain why response times are right-skewed and why errors can be faster or slower than correct responses.',
      'Describe the speed–accuracy tradeoff as a change in boundary separation, not in evidence quality.',
    ],
    id: [
      'Menyebutkan lima parameter model difusi-drift dan makna psikologis masing-masing.',
      'Menjelaskan mengapa waktu respons miring ke kanan dan mengapa kesalahan bisa lebih cepat atau lebih lambat daripada respons benar.',
      'Menggambarkan pertukaran kecepatan–akurasi sebagai perubahan jarak batas, bukan kualitas bukti.',
    ],
  },
  tryThis: {
    en: [
      'Raise the boundary from 0.6 to 2.0 — accuracy climbs, but how much slower do decisions get?',
      'Set drift to 0: evidence is pure noise. What accuracy and RT distribution do you get?',
      'Move the starting point toward the lower bound — do errors become fast and frequent?',
    ],
    id: [
      'Naikkan batas dari 0,6 ke 2,0 — akurasi naik, tetapi seberapa lambat keputusan menjadi?',
      'Atur drift ke 0: bukti murni derau. Akurasi dan distribusi RT apa yang Anda dapat?',
      'Geser titik awal ke arah batas bawah — apakah kesalahan menjadi cepat dan sering?',
    ],
  },
};
