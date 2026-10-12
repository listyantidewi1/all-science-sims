export default {
  id: 'methane-vs-co2',
  subject: 'climate',
  title: { en: 'Methane vs CO₂', id: 'Metana vs CO₂' },
  description: {
    en: 'A pulse of methane is ~80× more warming than the same mass of CO₂ over 20 years — but methane decays from the atmosphere with a 12-year e-folding time, while CO₂ lingers for centuries. Compare equal-mass pulses across 20- and 100-year horizons and watch the integrated radiative forcing build up.',
    id: 'Sebuah pulsa metana ~80× lebih hangat daripada CO₂ dengan massa sama selama 20 tahun — tetapi metana meluruh dari atmosfer dengan waktu e-folding 12 tahun, sedangkan CO₂ bertahan ratusan tahun. Bandingkan pulsa massa sama melintasi cakrawala 20 dan 100 tahun dan amati paksaan radiatif terintegrasi terbentuk.',
  },
  details: () => import('./details.js'),
  topics: ['climate', 'radiative-forcing'],
  grade: [10, 11, 12, 13],
  load: () => import('./sim.js'),
};
