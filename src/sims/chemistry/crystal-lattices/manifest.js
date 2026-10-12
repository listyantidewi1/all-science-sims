export default {
  id: 'crystal-lattices',
  subject: 'chemistry',
  title: { en: 'Crystal Lattices (BCC, FCC, HCP)', id: 'Kisi Kristal (BCC, FCC, HCP)' },
  description: {
    en: 'A unit cell rendered in 3D — drag to rotate. Switch between simple cubic, body-centered (Fe), face-centered (Cu, Au), and hexagonal close-packed (Mg, Ti) and feel why the same atoms can pack so differently.',
    id: 'Sel satuan dirender dalam 3D — seret untuk memutar. Beralih antara kubik sederhana, kubus berpusat-badan (Fe), kubus berpusat-muka (Cu, Au), dan tumpukan-padat heksagonal (Mg, Ti), lalu rasakan bagaimana atom yang sama bisa bertumpuk berbeda.',
  },
  details: () => import('./details.js'),
  topics: ['solids', 'crystallography'],
  grade: [12, 13],
  load: () => import('./sim.js'),
};
