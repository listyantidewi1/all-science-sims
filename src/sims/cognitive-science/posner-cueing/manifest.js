export default {
  id: 'posner-cueing',
  subject: 'cognitive-science',
  title: { en: 'Posner Spatial Cueing', id: 'Isyarat Spasial Posner' },
  description: {
    en: 'Fixate the cross while one of two boxes briefly brightens, then a target dot appears in one box. Respond left or right as fast as you can. Most cues are valid (target appears where cued), some are invalid, and some are neutral. Covert attention shifts to the cued box, so valid cues speed responses and invalid cues slow them — the "validity effect". Change the cue validity and the cue–target interval (SOA) and see how the effect grows, shrinks, or reverses.',
    id: 'Tatap tanda silang saat salah satu dari dua kotak menyala sesaat, lalu titik target muncul di salah satu kotak. Respons kiri atau kanan secepat mungkin. Sebagian besar isyarat valid (target muncul di kotak yang diisyaratkan), sebagian tidak valid, dan sebagian netral. Atensi tersembunyi berpindah ke kotak yang diisyaratkan, sehingga isyarat valid mempercepat respons dan isyarat tidak valid memperlambatnya — "efek validitas". Ubah validitas isyarat dan jeda isyarat–target (SOA) dan lihat bagaimana efeknya tumbuh, menyusut, atau berbalik.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'reaction-time'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
