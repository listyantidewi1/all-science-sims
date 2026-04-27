export default {
  id: 'natural-selection',
  subject: 'biology',
  title: { en: 'Natural Selection', id: 'Seleksi Alam' },
  description: {
    en: 'Color-camouflaged prey reproduce on a colored background while a predator picks off the easiest to see. Watch the population shift toward the camouflaging trait over generations.',
    id: 'Mangsa berkamuflase warna berkembang biak di atas latar berwarna, sementara predator memangsa yang paling mudah terlihat. Amati pergeseran populasi menuju sifat berkamuflase melintasi generasi.',
  },
  objectives: {
    en: [
      'Connect heritable variation, selection, and reproduction to allele frequency change.',
      'Predict how mutation rate and selection strength shape the rate of adaptation.',
      'Distinguish between drift and selection in small populations.',
    ],
    id: [
      'Mengaitkan variasi terwariskan, seleksi, dan reproduksi dengan perubahan frekuensi alel.',
      'Memprediksi pengaruh laju mutasi dan kekuatan seleksi terhadap kecepatan adaptasi.',
      'Membedakan hanyut genetik dan seleksi pada populasi kecil.',
    ],
  },
  tryThis: {
    en: [
      'Set the background to green — does the green trait dominate? How fast?',
      'Turn off selection — does the population still drift?',
      'Switch the background mid-run — watch the population catch up.',
    ],
    id: [
      'Atur latar belakang menjadi hijau — apakah sifat hijau mendominasi? Seberapa cepat?',
      'Matikan seleksi — apakah populasi tetap berfluktuasi?',
      'Ganti latar belakang di tengah simulasi — amati populasi mengejar.',
    ],
  },
  topics: ['evolution', 'selection'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
