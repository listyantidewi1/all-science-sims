export default {
  id: 'mental-rotation',
  subject: 'cognitive-science',
  title: { en: 'Mental Rotation (Shepard task)', id: 'Rotasi Mental (tugas Shepard)' },
  description: {
    en: 'Roger Shepard\'s 1971 finding: people mentally "rotate" 3D shapes to compare them — and the time to decide grows linearly with the angle. Try the task: are these two shapes the same (just rotated) or mirror images? Watch your reaction time scale with rotation angle.',
    id: 'Temuan Roger Shepard 1971: orang secara mental "memutar" bentuk 3D untuk membandingkan — dan waktu memutuskan tumbuh linear dengan sudut. Coba tugasnya: apakah dua bentuk sama (hanya diputar) atau cermin? Amati waktu reaksi Anda berskala dengan sudut rotasi.',
  },
  details: () => import('./details.js'),
  topics: ['spatial-cognition'],
  load: () => import('./sim.js'),
};
