export default {
  id: 'earth-moon-sun-positions',
  subject: 'earth-space',
  title: { en: 'Earth, Moon and Sun', id: 'Bumi, Bulan, dan Matahari' },
  description: {
    en: 'Look down on the Sun, Earth and Moon from above the North Pole. Drag the Earth around its orbit to change the month and drag the Moon around the Earth, and the side panel tells you what people on Earth would see: the Moon\'s phase, whether tides are spring or neap, whether an eclipse is possible, and which season it is in the hemisphere you choose. Presets jump straight to a full Moon, a solar eclipse or the June solstice.',
    id: 'Pandanglah Matahari, Bumi, dan Bulan dari atas Kutub Utara. Geser Bumi di orbitnya untuk mengubah bulan dalam tahun dan geser Bulan mengitari Bumi, maka panel samping memberi tahu apa yang dilihat orang di Bumi: fase Bulan, pasang purnama atau pasang perbani, kemungkinan gerhana, dan musim di belahan Bumi yang kamu pilih. Prasetel langsung melompat ke bulan purnama, gerhana matahari, atau titik balik Juni.',
  },
  topics: ['moon phases', 'tides', 'eclipses', 'seasons', 'earth-moon-sun system'],
  grade: [7, 8, 9],
  hasLab: true,
  details: () => import('./details.js'),
  load: () => import('./sim.js'),
};
