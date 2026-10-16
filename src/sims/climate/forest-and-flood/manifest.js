export default {
  id: 'forest-and-flood',
  subject: 'climate',
  title: { en: 'Forest, Rain and Flood', id: 'Hutan, Hujan, dan Banjir' },
  description: {
    en: 'Rain falls on a hillside above a village. When the hill is covered with trees, the roots and leaves soak up the rain and hold the soil. When the trees are cut down, the rain rushes straight down, carries the soil away and fills the river until it floods the houses. Move the sliders for forest and rain, watch the river, and press "Plant trees" to protect the village.',
    id: 'Hujan turun di lereng bukit di atas sebuah desa. Saat bukit tertutup pohon, akar dan daun menyerap hujan dan menahan tanah. Saat pohon ditebang, hujan langsung mengalir deras ke bawah, membawa tanah, dan memenuhi sungai sampai membanjiri rumah-rumah. Geser pengatur hutan dan hujan, perhatikan sungainya, dan tekan "Tanam pohon" untuk melindungi desa.',
  },
  topics: ['forests', 'floods', 'erosion', 'water cycle', 'climate mitigation'],
  grade: [3, 4],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
