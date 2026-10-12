export default {
  id: 'natural-selection',
  subject: 'biology',
  title: { en: 'Natural Selection', id: 'Seleksi Alam' },
  description: {
    en: 'Color-camouflaged prey reproduce on a colored background while a predator picks off the easiest to see. Watch the population shift toward the camouflaging trait over generations.',
    id: 'Mangsa berkamuflase warna berkembang biak di atas latar berwarna, sementara predator memangsa yang paling mudah terlihat. Amati pergeseran populasi menuju sifat berkamuflase melintasi generasi.',
  },
  details: () => import('./details.js'),
  topics: ['evolution', 'selection'],
  grade: [11, 12],
  hasLab: true,
  load: () => import('./sim.js'),
};
