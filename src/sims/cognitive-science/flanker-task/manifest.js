export default {
  id: 'flanker-task',
  subject: 'cognitive-science',
  title: { en: 'Eriksen Flanker Task', id: 'Tugas Flanker Eriksen' },
  description: {
    en: 'Report the direction of the central arrow while ignoring the arrows beside it. Flankers that point the same way (congruent) barely matter; flankers that point the other way (incongruent) slow you down and cause errors — the congruency effect, a classic measure of selective attention and response conflict. Spread the flankers further apart and the effect shrinks; change the proportion of congruent trials and watch how expectation modulates control.',
    id: 'Laporkan arah panah tengah sambil mengabaikan panah di sampingnya. Flanker yang searah (kongruen) hampir tidak berpengaruh; flanker yang berlawanan arah (inkongruen) memperlambat Anda dan menyebabkan kesalahan — efek kongruensi, ukuran klasik atensi selektif dan konflik respons. Rentangkan flanker lebih jauh dan efeknya menyusut; ubah proporsi percobaan kongruen dan amati bagaimana ekspektasi memodulasi kendali.',
  },
  details: () => import('./details.js'),
  topics: ['attention', 'cognitive-control'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
