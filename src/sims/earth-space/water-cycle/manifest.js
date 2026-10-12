export default {
  id: 'water-cycle',
  subject: 'earth-space',
  title: { en: 'Hydrologic Cycle', id: 'Siklus Hidrologi' },
  description: {
    en: 'A particle-based water cycle. Sun heats the ocean and lakes — molecules evaporate, rise, condense into clouds, fall as rain or snow, and run back to the sea. Tune solar intensity and watch the cycle race or stall.',
    id: 'Siklus air berbasis partikel. Matahari memanaskan laut dan danau — molekul menguap, naik, mengembun menjadi awan, turun sebagai hujan atau salju, dan mengalir kembali ke laut. Atur intensitas matahari dan amati siklus berlari atau berhenti.',
  },
  details: () => import('./details.js'),
  topics: ['hydrology', 'climate'],
  grade: [3, 4, 5, 6, 7],
  load: () => import('./sim.js'),
};
