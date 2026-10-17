export default {
  id: 'hydrocarbon-isomers',
  subject: 'chemistry',
  title: { en: 'Hydrocarbon Builder', id: 'Pembangun Hidrokarbon' },
  description: {
    en: 'Click grid positions to build a carbon chain of 1–8 atoms, cycle each C–C bond through single, double and triple, and hang methyl branches above or below the chain. The sim fills in the hydrogens, writes the molecular formula, names the compound by IUPAC rules (alkanes, alkenes, alkynes and simple branched versions), classifies it as saturated or unsaturated, and shows how many structural isomers exist for each alkane formula up to C₈H₁₈.',
    id: 'Klik posisi pada kisi untuk membangun rantai karbon 1–8 atom, ubah tiap ikatan C–C menjadi tunggal, rangkap dua, atau rangkap tiga, dan gantungkan cabang metil di atas atau di bawah rantai. Simulasi melengkapi hidrogennya, menuliskan rumus molekul, menamai senyawa menurut aturan IUPAC (alkana, alkena, alkuna, dan versi bercabang sederhana), menggolongkannya jenuh atau tak jenuh, dan menunjukkan berapa isomer struktur yang ada untuk tiap rumus alkana hingga C₈H₁₈.',
  },
  topics: ['organic-chemistry', 'hydrocarbons', 'isomers', 'nomenclature'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
