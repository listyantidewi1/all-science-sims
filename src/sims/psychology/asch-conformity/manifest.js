export default {
  id: 'asch-conformity',
  subject: 'psychology',
  title: { en: 'Asch Line Conformity', id: 'Konformitas Garis Asch' },
  description: {
    en: 'Solomon Asch\'s 1951 experiment: subjects look at three lines and pick which one matches a target. Easy — until the rest of the room (confederates) all give the same wrong answer. Now you\'re the subject. Pick what you think — or what they say. Watch how peer pressure scales with group size.',
    id: 'Eksperimen Solomon Asch 1951: subjek melihat tiga garis dan memilih mana yang cocok dengan target. Mudah — sampai semua orang lain di ruangan (konfederasi) memberi jawaban salah yang sama. Sekarang Anda adalah subjeknya. Pilih sesuai pikiran Anda — atau seperti mereka. Amati bagaimana tekanan teman sebaya berskala dengan ukuran grup.',
  },
  objectives: {
    en: [
      'See the visual stimulus where the right answer is unambiguous.',
      'Notice the pull when a unanimous group says otherwise.',
      'Recognize: ~75% of people conformed at least once in the original study.',
    ],
    id: [
      'Melihat stimulus visual di mana jawaban benar jelas.',
      'Memperhatikan tarikan saat grup bulat berkata berbeda.',
      'Mengenali: ~75% orang setidaknya sekali konformitas dalam studi asli.',
    ],
  },
  tryThis: {
    en: [
      'Group of 1 confederate — easy to ignore.',
      'Group of 5 confederates all wrong — strong pressure to go along.',
      'One ally who answers correctly — pressure dissolves dramatically.',
    ],
    id: [
      'Grup 1 konfederasi — mudah diabaikan.',
      'Grup 5 konfederasi semua salah — tekanan kuat untuk ikut.',
      'Satu sekutu yang menjawab benar — tekanan runtuh drastis.',
    ],
  },
  topics: ['social-psychology', 'conformity'],
  load: () => import('./sim.js'),
};
