export default {
  id: 'photoelectric',
  subject: 'physics',
  title: { en: 'Photoelectric Effect', id: 'Efek Fotolistrik' },
  description: {
    en: 'Light hits a metal plate. Below a threshold frequency NOTHING happens, no matter how bright the light. Above the threshold, electrons fly off with energy that depends on frequency, not intensity. The 1905 mystery that won Einstein his Nobel.',
    id: 'Cahaya menabrak pelat logam. Di bawah frekuensi ambang TIDAK ada yang terjadi, seterang apa pun cahayanya. Di atas ambang, elektron terlontar dengan energi yang bergantung pada frekuensi, bukan intensitas. Misteri 1905 yang memenangkan Einstein hadiah Nobel.',
  },
  details: () => import('./details.js'),
  topics: ['quantum', 'photons'],
  grade: [11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
