export default {
  id: 'energy-chain',
  subject: 'physics',
  title: { en: 'Energy Chain', id: 'Rantai Energi' },
  description: {
    en: 'Energy never disappears, it just changes form. Pick a torch, a bicycle, a kettle, a radio or a plant and a runner, then drag the energy cards (sun, battery, food, moving, heat, light, sound, electric) into the slots to show how the energy changes along the way. Right cards light up and the device starts working; wrong cards shake and go back.',
    id: 'Energi tidak pernah hilang, hanya berubah bentuk. Pilih senter, sepeda, ketel, radio, atau tumbuhan dan pelari, lalu seret kartu energi (matahari, baterai, makanan, gerak, panas, cahaya, bunyi, listrik) ke kotak untuk menunjukkan bagaimana energi berubah di sepanjang jalan. Kartu yang benar menyala dan alatnya mulai bekerja; kartu yang salah bergetar dan kembali.',
  },
  topics: ['energy', 'energy forms', 'energy transformation'],
  grade: [3, 4, 5],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
