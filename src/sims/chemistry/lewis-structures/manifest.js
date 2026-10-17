export default {
  id: 'lewis-structures',
  subject: 'chemistry',
  title: { en: 'Lewis Structure Builder', id: 'Pembangun Struktur Lewis' },
  description: {
    en: 'Choose a molecule (H₂O, CO₂, NH₃, CH₄, O₂, N₂, HCl, SO₂, BF₃ or PCl₅) and build its Lewis structure yourself: click between two atoms to add single, double or triple bonds and click an atom to add lone pairs. The sim counts the valence electrons you have used, checks the octet on every atom, computes formal charges, and names the VSEPR shape once the structure is right. A show-answer button rescues you when you get stuck.',
    id: 'Pilih molekul (H₂O, CO₂, NH₃, CH₄, O₂, N₂, HCl, SO₂, BF₃, atau PCl₅) dan bangun sendiri struktur Lewisnya: klik di antara dua atom untuk menambah ikatan tunggal, rangkap dua, atau rangkap tiga, dan klik sebuah atom untuk menambah pasangan elektron bebas. Simulasi menghitung elektron valensi yang sudah kamu pakai, memeriksa oktet tiap atom, menghitung muatan formal, dan menamai bentuk VSEPR setelah strukturnya benar. Tombol lihat jawaban menolong jika kamu buntu.',
  },
  topics: ['bonding', 'lewis-structures', 'octet-rule', 'vsepr'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
