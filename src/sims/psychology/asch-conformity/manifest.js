export default {
  id: 'asch-conformity',
  subject: 'psychology',
  title: { en: 'Asch Line Conformity', id: 'Konformitas Garis Asch' },
  description: {
    en: 'Solomon Asch\'s 1951 experiment: subjects look at three lines and pick which one matches a target. Easy — until the rest of the room (confederates) all give the same wrong answer. Now you\'re the subject. Pick what you think — or what they say. Watch how peer pressure scales with group size.',
    id: 'Eksperimen Solomon Asch 1951: subjek melihat tiga garis dan memilih mana yang cocok dengan target. Mudah — sampai semua orang lain di ruangan (konfederasi) memberi jawaban salah yang sama. Sekarang Anda adalah subjeknya. Pilih sesuai pikiran Anda — atau seperti mereka. Amati bagaimana tekanan teman sebaya berskala dengan ukuran grup.',
  },
  details: () => import('./details.js'),
  topics: ['social-psychology', 'conformity'],
  load: () => import('./sim.js'),
};
