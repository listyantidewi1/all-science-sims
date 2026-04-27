export default {
  id: 'ecosystem',
  subject: 'biology',
  title: { en: 'Predator-Prey Ecosystem', id: 'Ekosistem Pemangsa-Mangsa' },
  description: {
    en: 'A 2D world of grass, rabbits, and foxes. Rabbits eat grass and breed; foxes hunt rabbits. Tweak births and deaths and watch boom-and-bust cycles emerge.',
    id: 'Dunia 2D berisi rumput, kelinci, dan rubah. Kelinci memakan rumput dan beranak; rubah memburu kelinci. Atur laju kelahiran dan kematian, lalu amati siklus naik-turun populasi.',
  },
  objectives: {
    en: [
      'Connect individual rules to oscillating populations.',
      'Recognize that predator booms lag prey booms.',
      'Find conditions that lead to extinction.',
    ],
    id: [
      'Mengaitkan aturan individu dengan osilasi populasi.',
      'Mengenali bahwa lonjakan pemangsa mengikuti lonjakan mangsa.',
      'Menemukan kondisi yang berujung kepunahan.',
    ],
  },
  tryThis: {
    en: [
      'Drop fox energy gain — does the system collapse?',
      'Lower grass regrowth — what happens to rabbits?',
      'Crank predator reproduction high — who survives long-term?',
    ],
    id: [
      'Turunkan energi yang didapat rubah — apakah sistem runtuh?',
      'Turunkan laju tumbuh rumput — apa yang terjadi pada kelinci?',
      'Naikkan reproduksi rubah tinggi — siapa yang bertahan jangka panjang?',
    ],
  },
  topics: ['ecology', 'agent-based'],
  load: () => import('./sim.js'),
};
