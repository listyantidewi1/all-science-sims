export default {
  id: 'inclined-plane',
  subject: 'physics',
  title: { en: 'Inclined Plane with Friction', id: 'Bidang Miring dengan Gesekan' },
  description: {
    en: 'A block on a ramp. Drag the angle slider, set the friction coefficient, and watch the block slide, stick, or accelerate. Live free-body diagram showing the resolved gravity components, normal force, and friction.',
    id: 'Balok di atas bidang miring. Geser sudut, atur koefisien gesekan, dan amati balok meluncur, diam, atau memercepat. Diagram benda bebas langsung menampilkan komponen gravitasi terurai, gaya normal, dan gesekan.',
  },
  objectives: {
    en: [
      'Resolve gravity into parallel (mg sin θ) and perpendicular (mg cos θ) components.',
      'Find the angle at which the block first starts to slide: tan θ = μ_s.',
      'Compute acceleration when sliding: a = g(sin θ − μ_k cos θ).',
    ],
    id: [
      'Menguraikan gravitasi ke komponen sejajar (mg sin θ) dan tegak lurus (mg cos θ).',
      'Mencari sudut saat balok mulai meluncur: tan θ = μ_s.',
      'Menghitung percepatan saat meluncur: a = g(sin θ − μ_k cos θ).',
    ],
  },
  tryThis: {
    en: [
      'μ_s = 0.4 — block stays put until tan θ ≈ 21.8°.',
      'Frictionless — even tiny angle accelerates the block.',
      'μ_s > tan θ — block sticks regardless of mass.',
    ],
    id: [
      'μ_s = 0,4 — balok tetap diam sampai tan θ ≈ 21,8°.',
      'Tanpa gesekan — sudut sekecil apa pun memercepat balok.',
      'μ_s > tan θ — balok tetap diam, tak peduli massa.',
    ],
  },
  topics: ['mechanics', 'forces'],
  load: () => import('./sim.js'),
};
