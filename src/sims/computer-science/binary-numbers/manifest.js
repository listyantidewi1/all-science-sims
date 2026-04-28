export default {
  id: 'binary-numbers',
  subject: 'computer-science',
  title: { en: 'Binary Numbers', id: 'Bilangan Biner' },
  description: {
    en: 'A row of 8 bit-toggles. Click any bit to flip it; the decimal value updates live, and each "place value" (128, 64, 32, 16, 8, 4, 2, 1) is shown above its bit. Switch to 16- or 32-bit mode and watch how the place values double leftward forever. Bonus: hex view alongside.',
    id: 'Sebaris 8 sakelar bit. Klik bit mana pun untuk membaliknya; nilai desimal terbarui langsung, dan tiap "nilai tempat" (128, 64, 32, 16, 8, 4, 2, 1) ditampilkan di atas bitnya. Beralih ke mode 16- atau 32-bit dan amati nilai tempat berlipat ganda ke kiri tanpa henti. Bonus: tampilan heksa di sebelahnya.',
  },
  objectives: {
    en: [
      'Convert binary ↔ decimal by summing place values.',
      'See how doubling the bit-width quadruples (etc.) the maximum representable number.',
      'Connect binary to hexadecimal: 4 bits = one hex digit.',
    ],
    id: [
      'Mengonversi biner ↔ desimal dengan menjumlahkan nilai tempat.',
      'Melihat bagaimana menggandakan lebar bit melipatempatkan (dst.) angka maksimum.',
      'Menghubungkan biner dengan heksadesimal: 4 bit = satu digit heksa.',
    ],
  },
  tryThis: {
    en: [
      'Set 8 bits to 11111111 — value 255 = 2⁸ − 1.',
      'Toggle just bit 7 — value 128. Toggle bit 0 — adds 1.',
      'Switch to 16-bit and represent 1024 (one bit on at position 10).',
    ],
    id: [
      'Atur 8 bit ke 11111111 — nilai 255 = 2⁸ − 1.',
      'Aktifkan bit 7 saja — nilai 128. Aktifkan bit 0 — tambah 1.',
      'Beralih ke 16-bit dan representasikan 1024 (satu bit aktif di posisi 10).',
    ],
  },
  topics: ['number-systems'],
  load: () => import('./sim.js'),
};
