export default {
  id: 'particle-model',
  subject: 'chemistry',
  title: { en: 'Particle Model of Matter', id: 'Model Partikel Zat' },
  description: {
    en: 'Particles in a box with a movable piston. Turn up the temperature to see them shake, flow and finally fly free as a solid melts and boils. A thermometer, a pressure gauge that counts wall hits, and a heating curve with flat melting and boiling plateaus for water, ethanol or iron.',
    id: 'Partikel di dalam kotak dengan piston yang bisa digeser. Naikkan suhu untuk melihat partikel bergetar, mengalir, lalu terbang bebas saat zat padat meleleh dan mendidih. Ada termometer, pengukur tekanan yang menghitung tumbukan ke dinding, dan kurva pemanasan dengan garis datar saat meleleh dan mendidih untuk air, etanol atau besi.',
  },
  topics: ['states-of-matter', 'kinetic-theory', 'changes-of-state'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
