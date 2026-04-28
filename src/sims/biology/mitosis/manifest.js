export default {
  id: 'mitosis',
  subject: 'biology',
  title: { en: 'Mitosis Stages', id: 'Tahapan Mitosis' },
  description: {
    en: 'Step or auto-play through interphase, prophase, metaphase, anaphase, telophase, and cytokinesis. Chromosomes condense, line up at the equator, are pulled to the poles, and the cell pinches in two.',
    id: 'Telusuri atau auto-play interfase, profase, metafase, anafase, telofase, dan sitokinesis. Kromosom memadat, berbaris di ekuator, ditarik ke kutub, dan sel mencubit menjadi dua.',
  },
  objectives: {
    en: [
      'Order the six stages of cell division.',
      "Identify each stage from the chromosome layout.",
      'Recognize the spindle apparatus and centrosomes.',
    ],
    id: [
      'Mengurutkan enam tahap pembelahan sel.',
      'Mengenali tiap tahap dari tata letak kromosom.',
      'Mengenali aparatus spindel dan sentrosom.',
    ],
  },
  tryThis: {
    en: [
      'Pause at metaphase — what aligns the chromosomes?',
      'Step from anaphase to telophase — what changes first?',
      'Spot the centrosomes — when do they reach the poles?',
    ],
    id: [
      'Jeda saat metafase — apa yang menjajarkan kromosom?',
      'Telusuri dari anafase ke telofase — apa yang berubah lebih dulu?',
      'Cari sentrosom — kapan mereka mencapai kutub?',
    ],
  },
  topics: ['cell-cycle', 'cytology'],
  load: () => import('./sim.js'),
};
