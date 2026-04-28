export default {
  id: 'photoelectric',
  subject: 'physics',
  title: { en: 'Photoelectric Effect', id: 'Efek Fotolistrik' },
  description: {
    en: 'Light hits a metal plate. Below a threshold frequency NOTHING happens, no matter how bright the light. Above the threshold, electrons fly off with energy that depends on frequency, not intensity. The 1905 mystery that won Einstein his Nobel.',
    id: 'Cahaya menabrak pelat logam. Di bawah frekuensi ambang TIDAK ada yang terjadi, seterang apa pun cahayanya. Di atas ambang, elektron terlontar dengan energi yang bergantung pada frekuensi, bukan intensitas. Misteri 1905 yang memenangkan Einstein hadiah Nobel.',
  },
  objectives: {
    en: [
      'Apply KE_max = hf − φ (Einstein\'s equation).',
      'See that frequency, not intensity, determines whether emission happens.',
      'Identify the work function from the threshold frequency.',
    ],
    id: [
      'Menerapkan KE_max = hf − φ (persamaan Einstein).',
      'Melihat bahwa frekuensi, bukan intensitas, menentukan apakah emisi terjadi.',
      'Mengenali fungsi kerja dari frekuensi ambang.',
    ],
  },
  tryThis: {
    en: [
      'Below threshold — does intensity make any electrons fly?',
      'Just above — do they barely fly, or fly fast?',
      'Switch to cesium (low φ) — does threshold drop?',
    ],
    id: [
      'Di bawah ambang — apakah intensitas membuat elektron terbang?',
      'Tepat di atas — apakah hampir tidak terbang, atau terbang cepat?',
      'Beralih ke sesium (φ rendah) — apakah ambang turun?',
    ],
  },
  topics: ['quantum', 'photons'],
  load: () => import('./sim.js'),
};
