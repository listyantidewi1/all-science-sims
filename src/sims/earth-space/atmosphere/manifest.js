export default {
  id: 'atmosphere',
  subject: 'earth-space',
  title: { en: 'Atmospheric Layers', id: 'Lapisan Atmosfer' },
  description: {
    en: 'Drag a probe up from the surface to space. Read pressure, temperature, and air density at every altitude. The temperature reverses three times — that\'s how the troposphere, stratosphere, mesosphere, and thermosphere reveal themselves.',
    id: 'Seret probe ke atas dari permukaan ke ruang angkasa. Baca tekanan, suhu, dan kerapatan udara pada setiap ketinggian. Suhu berbalik tiga kali — itulah cara troposfer, stratosfer, mesosfer, dan termosfer terlihat.',
  },
  details: () => import('./details.js'),
  topics: ['atmosphere', 'meteorology'],
  grade: [7, 8, 9, 10],
  load: () => import('./sim.js'),
};
