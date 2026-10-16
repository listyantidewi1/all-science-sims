export default {
  id: 'five-senses',
  subject: 'biology',
  title: { en: 'My Five Senses', id: 'Panca Inderaku' },
  description: {
    en: 'Something happens in the picture: a light flashes, a bell rings, a flower smells sweet, a lemon tastes sour, a feather tickles. Which part of your body notices it? Tap the eye, ear, nose, tongue or skin and see if you are right. Then switch to Explore mode and look inside each sense organ to see its parts.',
    id: 'Sesuatu terjadi di gambar: lampu menyala, bel berbunyi, bunga harum, lemon terasa asam, bulu menggelitik. Bagian tubuh mana yang merasakannya? Ketuk mata, telinga, hidung, lidah, atau kulit dan lihat apakah jawabanmu benar. Lalu pindah ke mode Jelajah dan lihat bagian-bagian di dalam setiap alat indra.',
  },
  topics: ['senses', 'human body', 'sense organs'],
  grade: [3, 4],
  hasLab: false,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
