export default {
  id: 'electric-field',
  subject: 'physics',
  title: { en: 'Electric Field & Charges', id: 'Medan Listrik & Muatan' },
  description: {
    en: 'Drop and drag positive and negative charges on a 2D plane and see field vectors, field lines, or equipotentials update live. Move two opposite charges close together to see a clean dipole field.',
    id: 'Letakkan dan seret muatan positif dan negatif pada bidang 2D, lalu amati vektor, garis medan, atau potensial yang langsung diperbarui. Dekatkan dua muatan berlawanan untuk melihat medan dipol yang khas.',
  },
  objectives: {
    en: [
      'Read direction and density of field lines as field strength.',
      'Apply superposition: total field is the vector sum of contributions.',
      'Connect field-line patterns to charge sign and distance.',
    ],
    id: [
      'Membaca arah dan kerapatan garis medan sebagai kuat medan.',
      'Menerapkan superposisi: medan total adalah jumlah vektor kontribusi.',
      'Mengaitkan pola garis medan dengan tanda dan jarak muatan.',
    ],
  },
  tryThis: {
    en: [
      'Place two equal positive charges — find the point where the field is zero.',
      'Build a dipole and rotate it by dragging one charge in a circle.',
      'Toggle equipotentials — where do they cluster densely?',
    ],
    id: [
      'Tempatkan dua muatan positif sama besar — cari titik di mana medannya nol.',
      'Buat dipol dan putar dengan menyeret satu muatan dalam lingkaran.',
      'Aktifkan ekipotensial — di mana garisnya rapat?',
    ],
  },
  topics: ['electromagnetism', 'fields'],
  grade: [11, 12],
  load: () => import('./sim.js'),
};
