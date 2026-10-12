export default {
  id: 'buoyancy',
  subject: 'physics',
  title: { en: 'Buoyancy & Archimedes', id: 'Gaya Apung & Archimedes' },
  description: {
    en: 'Drop blocks of different densities into a tank and watch how deep they float. The submerged volume always equals weight ÷ fluid density — Archimedes\' principle, animated.',
    id: 'Jatuhkan balok dengan kerapatan berbeda ke dalam tangki dan amati seberapa dalam mereka mengapung. Volume tercelup selalu sama dengan berat ÷ kerapatan fluida — asas Archimedes yang teranimasi.',
  },
  details: () => import('./details.js'),
  topics: ['fluids', 'forces'],
  hasLab: true,
  load: () => import('./sim.js'),
};
