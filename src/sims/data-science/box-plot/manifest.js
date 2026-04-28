export default {
  id: 'box-plot',
  subject: 'data-science',
  title: { en: 'Box Plot & 5-Number Summary', id: 'Plot Kotak & Ringkasan 5-Angka' },
  description: {
    en: 'Type a list of numbers (or pick a preset) and watch the median, quartiles, and outliers fall into place. The box plot shows the 5-number summary visually; the dot plot underneath shows where each value actually sits. Drag the IQR multiplier to see how outlier detection changes.',
    id: 'Ketik daftar angka (atau pilih preset) dan amati median, kuartil, dan pencilan jatuh pada tempatnya. Plot kotak menampilkan ringkasan 5-angka secara visual; plot titik di bawah menampilkan posisi tiap nilai. Geser pengali IQR untuk melihat deteksi pencilan berubah.',
  },
  objectives: {
    en: [
      'Compute the 5-number summary: min, Q1, median, Q3, max.',
      'Read the IQR (Q3 − Q1) and the 1.5×IQR outlier rule.',
      'See how box plots compress a distribution into a quick visual summary.',
    ],
    id: [
      'Menghitung ringkasan 5-angka: min, Q1, median, Q3, max.',
      'Membaca IQR (Q3 − Q1) dan aturan pencilan 1,5×IQR.',
      'Memahami bagaimana plot kotak meringkas distribusi menjadi visual cepat.',
    ],
  },
  tryThis: {
    en: [
      'Symmetric data — box is centered, whiskers equal length.',
      'Skewed data — median sits left or right of center, whiskers asymmetric.',
      'Add an outlier — it sticks out as a dot beyond the whisker.',
    ],
    id: [
      'Data simetris — kotak terpusat, kumis sama panjang.',
      'Data condong — median di kiri/kanan tengah, kumis tak simetris.',
      'Tambah pencilan — muncul sebagai titik di luar kumis.',
    ],
  },
  topics: ['statistics', 'data-viz'],
  load: () => import('./sim.js'),
};
