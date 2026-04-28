export default {
  id: 'crystal-lattices',
  subject: 'chemistry',
  title: { en: 'Crystal Lattices (BCC, FCC, HCP)', id: 'Kisi Kristal (BCC, FCC, HCP)' },
  description: {
    en: 'A unit cell rendered in 3D — drag to rotate. Switch between simple cubic, body-centered (Fe), face-centered (Cu, Au), and hexagonal close-packed (Mg, Ti) and feel why the same atoms can pack so differently.',
    id: 'Sel satuan dirender dalam 3D — seret untuk memutar. Beralih antara kubik sederhana, kubus berpusat-badan (Fe), kubus berpusat-muka (Cu, Au), dan tumpukan-padat heksagonal (Mg, Ti), lalu rasakan bagaimana atom yang sama bisa bertumpuk berbeda.',
  },
  objectives: {
    en: [
      'Identify the four common metallic crystal structures.',
      'Compute coordination number and packing fraction.',
      'Connect lattice type to material name.',
    ],
    id: [
      'Mengenali empat struktur kristal logam yang umum.',
      'Menghitung bilangan koordinasi dan fraksi kemasan.',
      'Mengaitkan jenis kisi dengan nama material.',
    ],
  },
  tryThis: {
    en: [
      'Compare BCC vs FCC packing — which is denser?',
      'Find the coordination number of FCC.',
      'Hexagonal close-packed shares packing fraction with FCC — see why.',
    ],
    id: [
      'Bandingkan kemasan BCC vs FCC — mana lebih rapat?',
      'Temukan bilangan koordinasi FCC.',
      'Heksagonal tumpukan-padat berbagi fraksi kemasan dengan FCC — lihat mengapa.',
    ],
  },
  topics: ['solids', 'crystallography'],
  load: () => import('./sim.js'),
};
