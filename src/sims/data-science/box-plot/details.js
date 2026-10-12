// Long-form text for the sim page aside. Kept out of manifest.js so the
// home page does not download every sim's objectives up front.
export default {
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
  },  tryThis: {
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
  },};
