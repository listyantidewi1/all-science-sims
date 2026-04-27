export default {
  id: 'osmosis',
  subject: 'biology',
  title: { en: 'Osmosis & Membrane Transport', id: 'Osmosis & Transpor Membran' },
  description: {
    en: 'Two compartments separated by a semi-permeable membrane. Solute particles can\'t cross, but water can. Watch water flow toward the saltier side until concentrations match.',
    id: 'Dua kompartemen yang dipisahkan membran semipermeabel. Partikel zat terlarut tidak bisa melewatinya, tetapi air bisa. Amati air mengalir ke sisi yang lebih asin sampai konsentrasi sama.',
  },
  objectives: {
    en: [
      'Connect concentration difference to direction of water flow.',
      'Explain why a cell in pure water swells.',
      'Distinguish hypotonic, isotonic, and hypertonic environments.',
    ],
    id: [
      'Mengaitkan perbedaan konsentrasi dengan arah aliran air.',
      'Menjelaskan mengapa sel di dalam air murni mengembang.',
      'Membedakan lingkungan hipotonik, isotonik, dan hipertonik.',
    ],
  },
  tryThis: {
    en: [
      'Add salt to one side — which way does water flow?',
      'Make both sides equal — does net flow stop?',
      'Surround a cell with salty water — does it shrink or swell?',
    ],
    id: [
      'Tambah garam di satu sisi — ke arah mana air mengalir?',
      'Buat kedua sisi sama — apakah aliran neto berhenti?',
      'Kelilingi sel dengan air asin — apakah sel mengecil atau membesar?',
    ],
  },
  topics: ['cells', 'transport'],
  load: () => import('./sim.js'),
};
