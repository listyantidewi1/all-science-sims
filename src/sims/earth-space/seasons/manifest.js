export default {
  id: 'seasons',
  subject: 'earth-space',
  title: { en: 'Seasons & Axial Tilt', id: 'Musim & Kemiringan Sumbu' },
  description: {
    en: 'Move Earth around its orbit and watch how the same axial tilt produces different sunlight patterns at different times of year. Read approximate day length at any latitude.',
    id: 'Gerakkan Bumi di sepanjang orbitnya dan amati bagaimana kemiringan sumbu yang sama menghasilkan pola sinar matahari berbeda pada tiap waktu dalam setahun. Baca perkiraan panjang siang pada lintang manapun.',
  },
  details: () => import('./details.js'),
  topics: ['earth', 'orbit', 'climate'],
  grade: [6, 7, 8, 9],
  load: () => import('./sim.js'),
};
