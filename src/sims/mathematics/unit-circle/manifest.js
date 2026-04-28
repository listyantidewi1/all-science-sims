export default {
  id: 'unit-circle',
  subject: 'mathematics',
  title: { en: 'Unit Circle Trigonometry', id: 'Trigonometri Lingkaran Satuan' },
  description: {
    en: 'Drag the angle around the unit circle. The point\'s x-coordinate IS the cosine, the y-coordinate IS the sine, and the tangent line gives the tangent. Three functions, one geometry.',
    id: 'Seret sudut di sekeliling lingkaran satuan. Koordinat x titik ITU kosinus, koordinat y ITU sinus, dan garis singgung memberi tangen. Tiga fungsi, satu geometri.',
  },
  objectives: {
    en: [
      'Read sin θ and cos θ off the unit circle directly.',
      'Connect the four quadrants to sign of sin/cos.',
      'See where tan θ blows up (asymptotes).',
    ],
    id: [
      'Membaca sin θ dan cos θ langsung dari lingkaran satuan.',
      'Mengaitkan empat kuadran dengan tanda sin/cos.',
      'Melihat di mana tan θ meledak (asimtot).',
    ],
  },
  tryThis: {
    en: [
      'Set θ to 90° — what are sin, cos, tan?',
      'Find the angle where sin θ = cos θ.',
      'Drag past 360° — does the function curve repeat?',
    ],
    id: [
      'Atur θ ke 90° — berapa sin, cos, tan?',
      'Cari sudut di mana sin θ = cos θ.',
      'Geser melewati 360° — apakah kurva fungsinya berulang?',
    ],
  },
  topics: ['trigonometry', 'geometry'],
  load: () => import('./sim.js'),
};
