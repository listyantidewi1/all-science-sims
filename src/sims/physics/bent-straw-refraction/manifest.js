export default {
  id: 'bent-straw-refraction',
  subject: 'physics',
  title: { en: 'The Bent Straw', id: 'Sedotan Bengkok' },
  description: {
    en: 'Put a straw in a glass and pour in water. The straw looks bent at the water surface, even though it is perfectly straight! Change the water level and the angle you look from to see the bend change. Then try the bowl: a hidden coin appears as you add water. Light bends when it leaves water, and your eye is tricked.',
    id: 'Masukkan sedotan ke dalam gelas lalu tuangkan air. Sedotan tampak bengkok di permukaan air, padahal sebenarnya lurus! Ubah tinggi air dan sudut pandangmu untuk melihat bengkokannya berubah. Lalu coba mangkuk: koin yang tersembunyi muncul saat air ditambahkan. Cahaya membelok ketika keluar dari air, dan matamu tertipu.',
  },
  topics: ['light', 'refraction', 'water', 'vision'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
