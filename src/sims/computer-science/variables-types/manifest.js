export default {
  id: 'variables-types',
  subject: 'computer-science',
  title: { en: "Variables, Data Types and Operators", id: "Variabel, Tipe Data, dan Operator" },
  description: {
    en: 'Play "Manusia Variabel" (human variables): step through short Python programs and watch labelled memory boxes change as values are read, worked out and stored (x = x + 1, swapping with a temp variable or a, b = b, a, total = total + score in a loop). Type any expression to see its value and type() or the exact Python error, evaluate operators one step at a time in precedence order, compare / // % with a picture, format numbers with f-strings, and test variable names against the naming rules.',
    id: 'Mainkan "Manusia Variabel": jalankan program Python pendek langkah demi langkah dan amati kotak memori berlabel berubah saat nilai dibaca, dihitung, dan disimpan (x = x + 1, menukar nilai dengan variabel temp atau a, b = b, a, total = total + nilai dalam perulangan). Ketik ekspresi apa pun untuk melihat nilai dan type()-nya atau pesan error Python yang persis, hitung operator satu langkah demi satu langkah sesuai prioritasnya, bandingkan / // % lewat gambar, rapikan angka dengan f-string, dan uji nama variabel dengan aturan penamaan.',
  },
  topics: ['programming', 'python', 'variables', 'data-types', 'operators'],
  grade: [10, 11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
