export default {
  id: 'riemann',
  subject: 'mathematics',
  title: { en: 'Riemann Sums (Integration)', id: 'Jumlah Riemann (Integrasi)' },
  description: {
    en: 'Approximate the area under a curve with rectangles. Slide N from 5 to 200 and watch left, right, and midpoint sums all converge to the same definite integral.',
    id: 'Aproksimasi luas di bawah kurva dengan persegi panjang. Geser N dari 5 ke 200 dan amati jumlah kiri, kanan, dan titik tengah menyatu ke integral tentu yang sama.',
  },
  objectives: {
    en: [
      'See an integral as a limit of summed rectangles.',
      'Compare left, right, midpoint, and trapezoidal rules.',
      'See N → ∞ converge to the exact area.',
    ],
    id: [
      'Melihat integral sebagai limit jumlah persegi panjang.',
      'Membandingkan aturan kiri, kanan, titik tengah, dan trapesium.',
      'Mengamati N → ∞ menyatu ke luas eksak.',
    ],
  },
  tryThis: {
    en: [
      'N=5 with left rule — over- or under-estimate?',
      'N=100 — is the approximation visibly any worse than 200?',
      "Switch to a function with both signs — does Riemann count negative area?",
    ],
    id: [
      'N=5 dengan aturan kiri — lebih besar atau lebih kecil?',
      'N=100 — apakah hasilnya berbeda nyata dari 200?',
      'Beralih ke fungsi dengan dua tanda — apakah Riemann menghitung luas negatif?',
    ],
  },
  topics: ['calculus', 'integration'],
  load: () => import('./sim.js'),
};
