export default {
  id: 'logic-gates',
  subject: 'computer-science',
  title: { en: 'Logic Gates & Circuits', id: 'Gerbang & Rangkaian Logika' },
  description: {
    en: 'Click input switches and pick gate types in a small circuit. Wires light up green for true and gray for false in real time, and a truth table fills in alongside.',
    id: 'Klik sakelar input dan pilih jenis gerbang pada rangkaian kecil. Kabel menyala hijau untuk benar dan abu-abu untuk salah secara langsung, sementara tabel kebenaran terisi di samping.',
  },
  objectives: {
    en: [
      'Read AND, OR, XOR, NAND, NOR, NOT truth tables.',
      'Compose gates to build half-adders and full-adders.',
      'Predict an output from inputs without running the simulator.',
    ],
    id: [
      'Membaca tabel kebenaran AND, OR, XOR, NAND, NOR, NOT.',
      'Menyusun gerbang menjadi half-adder dan full-adder.',
      'Memprediksi output dari input tanpa menjalankan simulasi.',
    ],
  },
  tryThis: {
    en: [
      'Build XOR using only AND, OR, and NOT.',
      'Toggle inputs in a half-adder — verify the truth table.',
      'Find an input combo that gives the same output for AND and XOR.',
    ],
    id: [
      'Buat XOR hanya dengan AND, OR, dan NOT.',
      'Gerakkan input pada half-adder — verifikasi tabel kebenarannya.',
      'Cari kombinasi input yang menghasilkan output sama untuk AND dan XOR.',
    ],
  },
  topics: ['logic', 'digital'],
  grade: [10, 11, 12],
  load: () => import('./sim.js'),
};
