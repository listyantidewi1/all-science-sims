export default {
  id: 'mirror-reflection',
  subject: 'physics',
  title: { en: 'Mirror Game', id: 'Permainan Cermin' },
  description: {
    en: 'A torch shines a beam of light across the room. Drag and turn the flat mirrors so the beam bounces off them and lands on the target. Watch the dotted line (the normal) at each bounce: the light always leaves at the same angle it came in. Can you solve all three puzzles?',
    id: 'Sebuah senter memancarkan berkas cahaya melintasi ruangan. Geser dan putar cermin datar agar berkas cahaya memantul dan mengenai sasaran. Perhatikan garis putus-putus (garis normal) di setiap pantulan: cahaya selalu keluar dengan sudut yang sama seperti saat masuk. Bisakah kamu menyelesaikan ketiga tekateki?',
  },
  topics: ['light', 'reflection', 'mirrors', 'angles'],
  grade: [5, 6],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
