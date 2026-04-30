export default {
  id: 'visual-search',
  subject: 'cognitive-science',
  title: { en: 'Visual Search', id: 'Pencarian Visual' },
  description: {
    en: 'Find the target shape among distractors as fast as you can. Two regimes: "feature search" (one feature differs — pop-out, finding takes constant time regardless of N) and "conjunction search" (must combine two features — slow, scales linearly with N). Compare your reaction times.',
    id: 'Temukan bentuk target di antara pengecoh secepat mungkin. Dua rezim: "pencarian fitur" (satu fitur berbeda — pop-out, waktu konstan terlepas N) dan "pencarian konjungsi" (harus gabungkan dua fitur — lambat, skala linear dengan N). Bandingkan waktu reaksi Anda.',
  },
  objectives: {
    en: [
      'Experience the feature pop-out: a red O among blue Os jumps out instantly.',
      'Feel conjunction search: red O among blue Os AND red Xs takes serial scanning.',
      'See that pop-out reaction time is roughly flat vs N; conjunction grows with N.',
    ],
    id: [
      'Mengalami pop-out fitur: O merah di antara O biru langsung menonjol.',
      'Merasakan pencarian konjungsi: butuh pemindaian serial.',
      'Melihat waktu reaksi pop-out kira-kira datar vs N; konjungsi tumbuh dengan N.',
    ],
  },
  tryThis: {
    en: [
      'Feature search, N=10 — fast (~500 ms).',
      'Feature search, N=40 — still fast! (pop-out)',
      'Conjunction search, N=10 — slow; N=40 — much slower.',
    ],
    id: [
      'Pencarian fitur, N=10 — cepat (~500 ms).',
      'Pencarian fitur, N=40 — masih cepat! (pop-out)',
      'Pencarian konjungsi, N=10 — lambat; N=40 — jauh lebih lambat.',
    ],
  },
  topics: ['attention', 'visual-processing'],
  load: () => import('./sim.js'),
};
