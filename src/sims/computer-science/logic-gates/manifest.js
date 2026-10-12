export default {
  id: 'logic-gates',
  subject: 'computer-science',
  title: { en: 'Logic Gates & Circuits', id: 'Gerbang & Rangkaian Logika' },
  description: {
    en: 'Click input switches and pick gate types in a small circuit. Wires light up green for true and gray for false in real time, and a truth table fills in alongside.',
    id: 'Klik sakelar input dan pilih jenis gerbang pada rangkaian kecil. Kabel menyala hijau untuk benar dan abu-abu untuk salah secara langsung, sementara tabel kebenaran terisi di samping.',
  },
  details: () => import('./details.js'),
  topics: ['logic', 'digital'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
