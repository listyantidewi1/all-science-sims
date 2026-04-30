export default {
  id: 'mental-rotation',
  subject: 'cognitive-science',
  title: { en: 'Mental Rotation (Shepard task)', id: 'Rotasi Mental (tugas Shepard)' },
  description: {
    en: 'Roger Shepard\'s 1971 finding: people mentally "rotate" 3D shapes to compare them — and the time to decide grows linearly with the angle. Try the task: are these two shapes the same (just rotated) or mirror images? Watch your reaction time scale with rotation angle.',
    id: 'Temuan Roger Shepard 1971: orang secara mental "memutar" bentuk 3D untuk membandingkan — dan waktu memutuskan tumbuh linear dengan sudut. Coba tugasnya: apakah dua bentuk sama (hanya diputar) atau cermin? Amati waktu reaksi Anda berskala dengan sudut rotasi.',
  },
  objectives: {
    en: [
      'Experience that mental rotation feels like real rotation (takes time).',
      'See the linear RT-vs-angle relationship across many trials.',
      'Recognize that mirror images cannot be rotated to match — different category.',
    ],
    id: [
      'Mengalami bahwa rotasi mental terasa seperti rotasi nyata (butuh waktu).',
      'Melihat hubungan linear RT vs sudut.',
      'Mengenali bahwa cermin tidak bisa diputar untuk cocok — kategori berbeda.',
    ],
  },
  tryThis: {
    en: [
      'Run 20 trials — your RT correlates with the angle.',
      'Try mirror trials — also RT-vs-angle dependence.',
      'Compare to the typical 60–80°/s rotation rate.',
    ],
    id: [
      'Jalankan 20 percobaan — RT Anda berkorelasi dengan sudut.',
      'Coba percobaan cermin — juga ketergantungan RT-vs-sudut.',
      'Bandingkan dengan laju rotasi tipikal 60-80°/det.',
    ],
  },
  topics: ['spatial-cognition'],
  load: () => import('./sim.js'),
};
