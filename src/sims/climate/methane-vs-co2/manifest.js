export default {
  id: 'methane-vs-co2',
  subject: 'climate',
  title: { en: 'Methane vs CO₂', id: 'Metana vs CO₂' },
  description: {
    en: 'A pulse of methane is ~80× more warming than the same mass of CO₂ over 20 years — but methane decays from the atmosphere with a 12-year e-folding time, while CO₂ lingers for centuries. Compare equal-mass pulses across 20- and 100-year horizons and watch the integrated radiative forcing build up.',
    id: 'Sebuah pulsa metana ~80× lebih hangat daripada CO₂ dengan massa sama selama 20 tahun — tetapi metana meluruh dari atmosfer dengan waktu e-folding 12 tahun, sedangkan CO₂ bertahan ratusan tahun. Bandingkan pulsa massa sama melintasi cakrawala 20 dan 100 tahun dan amati paksaan radiatif terintegrasi terbentuk.',
  },
  objectives: {
    en: [
      'See why GWP is horizon-dependent: 80× over 20 years, 28× over 100 years.',
      'Connect lifetime to integrated forcing: short-lived gases have huge near-term punch.',
      'Understand why methane reductions matter MORE for fast climate action.',
    ],
    id: [
      'Memahami mengapa GWP tergantung horizon: 80× di 20 tahun, 28× di 100 tahun.',
      'Menghubungkan masa hidup dengan paksaan terintegrasi: gas berumur pendek punya pukulan jangka pendek besar.',
      'Memahami mengapa pengurangan metana lebih penting untuk aksi iklim cepat.',
    ],
  },
  tryThis: {
    en: [
      '20-year horizon: methane curve dominates.',
      '100-year horizon: CO₂ catches up; ratio shrinks.',
      '500-year horizon: methane area becomes a small spike, CO₂ wins.',
    ],
    id: [
      'Horizon 20 tahun: kurva metana mendominasi.',
      'Horizon 100 tahun: CO₂ menyusul; rasio menyusut.',
      'Horizon 500 tahun: area metana menjadi puncak kecil, CO₂ menang.',
    ],
  },
  topics: ['climate', 'radiative-forcing'],
  load: () => import('./sim.js'),
};
