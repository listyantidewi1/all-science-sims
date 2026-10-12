export default {
  id: 'mitosis',
  subject: 'biology',
  title: { en: 'Mitosis Stages', id: 'Tahapan Mitosis' },
  description: {
    en: 'Step or auto-play through interphase, prophase, metaphase, anaphase, telophase, and cytokinesis. Chromosomes condense, line up at the equator, are pulled to the poles, and the cell pinches in two.',
    id: 'Telusuri atau auto-play interfase, profase, metafase, anafase, telofase, dan sitokinesis. Kromosom memadat, berbaris di ekuator, ditarik ke kutub, dan sel mencubit menjadi dua.',
  },
  details: () => import('./details.js'),
  topics: ['cell-cycle', 'cytology'],
  load: () => import('./sim.js'),
};
