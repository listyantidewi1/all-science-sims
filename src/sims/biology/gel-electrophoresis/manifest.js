export default {
  id: 'gel-electrophoresis',
  subject: 'biology',
  title: { en: 'PCR and Gel Electrophoresis', id: 'PCR dan Elektroforesis Gel' },
  description: {
    en: 'Amplify a DNA sample by PCR, watching the denature–anneal–extend cycle double the copies each round (2ⁿ), then load a DNA ladder, three suspects and a crime-scene sample into an agarose gel. Set the voltage and run time and watch the fragments migrate, short ones furthest, by a log(size) relation; read sizes off the ladder, cut the DNA with a restriction enzyme to split look-alike profiles, and identify the match.',
    id: 'Perbanyak sampel DNA dengan PCR, amati siklus denaturasi–penempelan–pemanjangan menggandakan salinan tiap putaran (2ⁿ), lalu masukkan tangga DNA, tiga tersangka dan sampel TKP ke gel agarosa. Atur tegangan dan waktu lalu lihat fragmen bermigrasi, yang pendek paling jauh, mengikuti hubungan log(ukuran); baca ukuran dari tangga, potong DNA dengan enzim restriksi untuk memisahkan profil yang mirip, dan temukan yang cocok.',
  },
  topics: ['biotechnology', 'PCR', 'electrophoresis', 'DNA profiling'],
  grade: [12],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
