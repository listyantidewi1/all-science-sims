export default {
  id: 'electrolyte-conductivity',
  subject: 'chemistry',
  title: { en: 'Electrolytes and Conductivity', id: 'Daya Hantar Listrik Larutan' },
  description: {
    en: 'Lower a conductivity tester into a beaker of NaCl, HCl, NaOH, acetic acid, ammonia, sugar, ethanol or pure water and set the concentration. The particle view shows complete, partial or no dissociation into ions, the bulb glows in proportion to the ion concentration, and an ammeter gives the current so you can classify each solution as a strong, weak or non-electrolyte.',
    id: 'Celupkan alat uji daya hantar ke dalam gelas kimia berisi NaCl, HCl, NaOH, asam asetat, amonia, gula, etanol, atau air murni dan atur konsentrasinya. Tampilan partikel memperlihatkan ionisasi sempurna, sebagian, atau tidak ada; nyala lampu sebanding dengan konsentrasi ion, dan amperemeter menunjukkan arus sehingga kamu dapat menggolongkan tiap larutan sebagai elektrolit kuat, elektrolit lemah, atau nonelektrolit.',
  },
  topics: ['solutions', 'electrolytes', 'acids and bases', 'electrochemistry'],
  grade: [11, 12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
