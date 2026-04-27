export default {
  id: 'seasons',
  subject: 'earth-space',
  title: { en: 'Seasons & Axial Tilt', id: 'Musim & Kemiringan Sumbu' },
  description: {
    en: 'Move Earth around its orbit and watch how the same axial tilt produces different sunlight patterns at different times of year. Read approximate day length at any latitude.',
    id: 'Gerakkan Bumi di sepanjang orbitnya dan amati bagaimana kemiringan sumbu yang sama menghasilkan pola sinar matahari berbeda pada tiap waktu dalam setahun. Baca perkiraan panjang siang pada lintang manapun.',
  },
  objectives: {
    en: [
      'Explain why seasons exist (tilt, not distance).',
      'Predict day length at any latitude on a given date.',
      'Identify solstices and equinoxes by the geometry.',
    ],
    id: [
      'Menjelaskan mengapa musim terjadi (kemiringan, bukan jarak).',
      'Memprediksi panjang siang pada lintang apa pun di tanggal tertentu.',
      'Mengidentifikasi titik balik matahari dan ekuinoks dari geometri.',
    ],
  },
  tryThis: {
    en: [
      'Set tilt to 0° — does day length still change with the seasons?',
      'Find the date when the day at 60° N is longest.',
      'Compare day length at the equator across the year.',
    ],
    id: [
      'Atur kemiringan ke 0° — apakah panjang siang masih berubah saat musim?',
      'Cari tanggal ketika siang di 60° LU paling panjang.',
      'Bandingkan panjang siang di khatulistiwa sepanjang tahun.',
    ],
  },
  topics: ['earth', 'orbit', 'climate'],
  grade: [10, 11],
  load: () => import('./sim.js'),
};
