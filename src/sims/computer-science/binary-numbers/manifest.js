export default {
  id: 'binary-numbers',
  subject: 'computer-science',
  title: { en: 'Binary Numbers', id: 'Bilangan Biner' },
  description: {
    en: 'A row of 8 bit-toggles. Click any bit to flip it; the decimal value updates live, and each "place value" (128, 64, 32, 16, 8, 4, 2, 1) is shown above its bit. Switch to 16- or 32-bit mode and watch how the place values double leftward forever. Bonus: hex view alongside.',
    id: 'Sebaris 8 sakelar bit. Klik bit mana pun untuk membaliknya; nilai desimal terbarui langsung, dan tiap "nilai tempat" (128, 64, 32, 16, 8, 4, 2, 1) ditampilkan di atas bitnya. Beralih ke mode 16- atau 32-bit dan amati nilai tempat berlipat ganda ke kiri tanpa henti. Bonus: tampilan heksa di sebelahnya.',
  },
  details: () => import('./details.js'),
  topics: ['number-systems'],
  grade: [5, 6, 7, 8, 9],
  load: () => import('./sim.js'),
};
