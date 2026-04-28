export default {
  id: 'hohmann',
  subject: 'earth-space',
  title: { en: 'Hohmann Transfer Orbit', id: 'Orbit Transfer Hohmann' },
  description: {
    en: 'The most fuel-efficient way to move between two circular orbits. A spacecraft fires once at perihelion to enter an ellipse, drifts halfway, then fires again at aphelion to circularize. Two burns, minimal fuel — the workhorse of interplanetary missions.',
    id: 'Cara paling hemat bahan bakar untuk berpindah antara dua orbit lingkaran. Pesawat menembak sekali di perihelion untuk masuk elips, melayang setengah jalan, lalu menembak lagi di aphelion untuk membuat lingkaran. Dua pembakaran, bahan bakar minimum — andalan misi antarplanet.',
  },
  objectives: {
    en: [
      'Compute Δv for each burn using vis-viva equation.',
      'See the half-ellipse transfer with the Sun (or Earth) at one focus.',
      'Predict transfer time = π · √(a³/μ) where a is semi-major.',
    ],
    id: [
      'Menghitung Δv tiap pembakaran dengan persamaan vis-viva.',
      'Melihat transfer setengah-elips dengan Matahari (atau Bumi) di salah satu fokus.',
      'Memprediksi waktu transfer = π · √(a³/μ) dengan a sumbu setengah-besar.',
    ],
  },
  tryThis: {
    en: [
      'Earth (1 AU) → Mars (1.52 AU) — what is total Δv?',
      'Earth → Jupiter — much bigger Δv. Why?',
      'Try equal radii — Δv → 0?',
    ],
    id: [
      'Bumi (1 AU) → Mars (1,52 AU) — berapa total Δv?',
      'Bumi → Jupiter — Δv jauh lebih besar. Mengapa?',
      'Coba jari-jari sama — Δv → 0?',
    ],
  },
  topics: ['astrodynamics', 'orbits'],
  load: () => import('./sim.js'),
};
