export default {
  id: 'molarity-dilution',
  subject: 'chemistry',
  title: { en: 'Molarity and Dilution', id: 'Molaritas dan Pengenceran' },
  description: {
    en: 'Weigh out a solute (table salt, glucose or blue copper(II) sulfate), dissolve it in a volumetric flask of 100 to 1000 mL and read the molarity M = n/V as the colour and particle density change. Then pipette a measured volume of the stock into a second flask, fill to the mark, and check that moles are conserved: M₁V₁ = M₂V₂.',
    id: 'Timbang zat terlarut (garam dapur, glukosa, atau tembaga(II) sulfat biru), larutkan dalam labu ukur 100 sampai 1000 mL dan baca molaritas M = n/V sambil mengamati warna dan kerapatan partikel berubah. Lalu pipet volume tertentu larutan induk ke labu kedua, isi sampai tanda batas, dan periksa bahwa mol kekal: M₁V₁ = M₂V₂.',
  },
  topics: ['solutions', 'stoichiometry', 'concentration'],
  grade: [10, 11],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
