export default {
  id: 'water-cycle',
  subject: 'earth-space',
  title: { en: 'Hydrologic Cycle', id: 'Siklus Hidrologi' },
  description: {
    en: 'A particle-based water cycle. Sun heats the ocean and lakes — molecules evaporate, rise, condense into clouds, fall as rain or snow, and run back to the sea. Tune solar intensity and watch the cycle race or stall.',
    id: 'Siklus air berbasis partikel. Matahari memanaskan laut dan danau — molekul menguap, naik, mengembun menjadi awan, turun sebagai hujan atau salju, dan mengalir kembali ke laut. Atur intensitas matahari dan amati siklus berlari atau berhenti.',
  },
  objectives: {
    en: [
      'Identify evaporation, condensation, precipitation, runoff.',
      'Connect solar input to total cycle throughput.',
      'See where water can be temporarily stored (clouds, snow, ground).',
    ],
    id: [
      'Mengenali evaporasi, kondensasi, presipitasi, aliran permukaan.',
      'Mengaitkan input matahari dengan throughput siklus total.',
      'Melihat di mana air dapat tersimpan sementara (awan, salju, tanah).',
    ],
  },
  tryThis: {
    en: [
      'Crank up the sun — does evaporation explode?',
      'Cool the planet — does it stop raining?',
      'Watch the same particle make a full loop.',
    ],
    id: [
      'Naikkan matahari — apakah evaporasi meledak?',
      'Dinginkan planet — apakah hujan berhenti?',
      'Amati partikel yang sama menyelesaikan satu loop penuh.',
    ],
  },
  topics: ['hydrology', 'climate'],
  load: () => import('./sim.js'),
};
