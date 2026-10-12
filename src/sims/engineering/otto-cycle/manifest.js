export default {
  id: 'otto-cycle',
  subject: 'engineering',
  title: { en: 'Otto Cycle (4-stroke engine)', id: 'Siklus Otto (mesin 4-tak)' },
  description: {
    en: 'The thermodynamic cycle of a gasoline engine. Watch the piston move through intake, compression, power, and exhaust strokes synchronized with a live P-V diagram. Adjust the compression ratio and see efficiency rise — until you hit the knock limit.',
    id: 'Siklus termodinamika mesin bensin. Amati piston bergerak melalui isap, kompresi, kerja, dan buang yang tersinkron dengan diagram P-V langsung. Atur rasio kompresi dan lihat efisiensi naik — sampai Anda menabrak batas knock.',
  },
  details: () => import('./details.js'),
  topics: ['thermodynamics', 'engines'],
  hasLab: true,
  load: () => import('./sim.js'),
};
