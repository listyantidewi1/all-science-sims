export default {
  id: 'sir-epidemic',
  subject: 'social-science',
  title: { en: 'SIR Epidemic Model', id: 'Model Epidemi SIR' },
  description: {
    en: 'Susceptible, Infected, Recovered. Tune R₀ and recovery time and watch an outbreak spread, peak, and burn out. Add vaccination to bend the curve in real time.',
    id: 'Susceptible (rentan), Infected (terinfeksi), Recovered (sembuh). Atur R₀ dan waktu pemulihan, lalu amati wabah merebak, memuncak, dan padam. Tambahkan vaksinasi untuk membengkokkan kurva secara langsung.',
  },
  details: () => import('./details.js'),
  topics: ['epidemiology', 'public-health'],
  grade: [10, 11, 12, 13],
  hasLab: true,
  load: () => import('./sim.js'),
};
