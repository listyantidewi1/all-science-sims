export default {
  id: 'vectors',
  subject: 'mathematics',
  title: { en: 'Vectors & Operations', id: 'Vektor & Operasinya' },
  description: {
    en: 'Drag two arrows around the plane and watch their sum, difference, dot product, and angle update in real time. The geometric definitions become obvious once you can grab the arrows.',
    id: 'Seret dua panah di bidang dan amati jumlah, selisih, perkalian titik, serta sudutnya diperbarui langsung. Definisi geometris menjadi jelas begitu Anda bisa memegang panahnya.',
  },
  objectives: {
    en: [
      'Apply vector addition: tip-to-tail and parallelogram rule.',
      'Compute dot product = |a||b|cos θ.',
      'See when two vectors are perpendicular (dot = 0).',
    ],
    id: [
      'Menerapkan penjumlahan vektor: kepala-ke-ekor dan jajaran genjang.',
      'Menghitung perkalian titik = |a||b|cos θ.',
      'Melihat kapan dua vektor saling tegak lurus (titik = 0).',
    ],
  },
  tryThis: {
    en: [
      'Make a · b = 0 — what angle is that?',
      'Make a parallel to b — what is the angle? The dot product?',
      'Drag b to the same direction as a, same length — what is a − b?',
    ],
    id: [
      'Buat a · b = 0 — sudut berapa itu?',
      'Sejajarkan a dengan b — berapa sudutnya? Perkalian titiknya?',
      'Seret b ke arah yang sama dengan a dan panjang sama — berapa a − b?',
    ],
  },
  topics: ['linear-algebra', 'geometry'],
  load: () => import('./sim.js'),
};
