export default {
  id: 'atmosphere',
  subject: 'earth-space',
  title: { en: 'Atmospheric Layers', id: 'Lapisan Atmosfer' },
  description: {
    en: 'Drag a probe up from the surface to space. Read pressure, temperature, and air density at every altitude. The temperature reverses three times — that\'s how the troposphere, stratosphere, mesosphere, and thermosphere reveal themselves.',
    id: 'Seret probe ke atas dari permukaan ke ruang angkasa. Baca tekanan, suhu, dan kerapatan udara pada setiap ketinggian. Suhu berbalik tiga kali — itulah cara troposfer, stratosfer, mesosfer, dan termosfer terlihat.',
  },
  objectives: {
    en: [
      'Identify the four main atmospheric layers from temperature.',
      'See pressure drop exponentially with altitude.',
      'Locate the ozone layer, jet stream, and ISS.',
    ],
    id: [
      'Mengenali empat lapisan utama atmosfer dari suhu.',
      'Melihat tekanan turun eksponensial terhadap ketinggian.',
      'Menemukan lapisan ozon, jet stream, dan ISS.',
    ],
  },
  tryThis: {
    en: [
      'Probe at 12 km — what layer? Pressure?',
      "Find Mt Everest, the ozone layer, the ISS — what altitudes?",
      'Where is the temperature actually warmest?',
    ],
    id: [
      'Probe di 12 km — lapisan apa? Tekanan?',
      'Cari G. Everest, lapisan ozon, ISS — pada ketinggian berapa?',
      'Di mana suhunya paling tinggi sebenarnya?',
    ],
  },
  topics: ['atmosphere', 'meteorology'],
  load: () => import('./sim.js'),
};
