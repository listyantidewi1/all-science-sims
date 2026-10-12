export default {
  id: 'visual-search',
  subject: 'cognitive-science',
  title: { en: 'Visual Search', id: 'Pencarian Visual' },
  description: {
    en: 'Find the target shape among distractors as fast as you can. Two regimes: "feature search" (one feature differs — pop-out, finding takes constant time regardless of N) and "conjunction search" (must combine two features — slow, scales linearly with N). Compare your reaction times.',
    id: 'Temukan bentuk target di antara pengecoh secepat mungkin. Dua rezim: "pencarian fitur" (satu fitur berbeda — pop-out, waktu konstan terlepas N) dan "pencarian konjungsi" (harus gabungkan dua fitur — lambat, skala linear dengan N). Bandingkan waktu reaksi Anda.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'visual-processing'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
