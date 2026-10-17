export default {
  id: 'chemical-bonding',
  subject: 'chemistry',
  title: { en: 'Ionic or Covalent?', id: 'Ikatan Ion atau Kovalen?' },
  description: {
    en: 'Pick any two elements from a mini periodic table and watch what their valence electrons do: jump across to make ions and a crystal lattice, get shared in a Lewis-dot overlap, or pool into a sea of electrons between metal cations. The electronegativity difference ΔEN is plotted against the usual 0.4 and 1.7 guideline thresholds, and the sim predicts melting-point class, conductivity and solubility for the compound.',
    id: 'Pilih dua unsur dari tabel periodik mini dan lihat apa yang dilakukan elektron valensinya: melompat membentuk ion dan kisi kristal, dipakai bersama dalam tumpang tindih titik Lewis, atau berkumpul menjadi lautan elektron di antara kation logam. Selisih keelektronegatifan ΔEN digambarkan terhadap ambang pedoman 0,4 dan 1,7, dan simulasi memprediksi kelas titik leleh, daya hantar listrik, dan kelarutan senyawanya.',
  },
  topics: ['bonding', 'electronegativity', 'periodic-table', 'properties'],
  grade: [11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
